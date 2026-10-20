/**
 * Exportación e importación de los datos del usuario.
 *
 * El formato es JSON legible y versionado. La importación valida la forma de
 * cada registro antes de escribir nada: un archivo corrupto no debe dejar la
 * base a medias.
 */
import type {
  Bookmark,
  DiptychName,
  ReadingProgress,
  Favorite,
  JesusPrayerSession,
  Note,
  PrayerRule,
  RuleCompletion,
  RuleItem,
  SettingRecord,
  UserPrayer,
} from '@/types';
import { db, USER_TABLES } from './db';

export const BACKUP_FORMAT = 'athos-backup';
export const BACKUP_VERSION = 1;

export interface AthosBackup {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  app: { name: 'ATHOS'; version: string };
  data: {
    daily_rules: PrayerRule[];
    rule_items: RuleItem[];
    rule_completions: RuleCompletion[];
    favorites: Favorite[];
    bookmarks: Bookmark[];
    notes: Note[];
    jesus_prayer_sessions: JesusPrayerSession[];
    user_prayers: UserPrayer[];
    /** Desde la 1.31: antes el avance de los planes no se copiaba. */
    reading_progress?: ReadingProgress[];
    diptychs?: DiptychName[];
    settings: SettingRecord[];
  };
}

export type BackupSection = keyof AthosBackup['data'];

export async function exportBackup(sections?: BackupSection[]): Promise<AthosBackup> {
  const wanted = new Set<BackupSection>(
    sections ?? [
      'daily_rules',
      'rule_items',
      'rule_completions',
      'favorites',
      'bookmarks',
      'notes',
      'jesus_prayer_sessions',
      'user_prayers',
      'reading_progress',
      'diptychs',
      'settings',
    ],
  );
  const take = async <T>(key: BackupSection, load: () => Promise<T[]>): Promise<T[]> =>
    wanted.has(key) ? load() : [];

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    app: { name: 'ATHOS', version: __APP_VERSION__ },
    data: {
      daily_rules: await take('daily_rules', () => db.daily_rules.toArray()),
      rule_items: await take('rule_items', () => db.rule_items.toArray()),
      rule_completions: await take('rule_completions', () => db.rule_completions.toArray()),
      favorites: await take('favorites', () => db.favorites.toArray()),
      bookmarks: await take('bookmarks', () => db.bookmarks.toArray()),
      notes: await take('notes', () => db.notes.toArray()),
      jesus_prayer_sessions: await take('jesus_prayer_sessions', () =>
        db.jesus_prayer_sessions.toArray(),
      ),
      user_prayers: await take('user_prayers', () => db.user_prayers.toArray()),
      reading_progress: await take('reading_progress', () => db.reading_progress.toArray()),
      diptychs: await take('diptychs', () => db.diptychs.toArray()),
      settings: await take('settings', () =>
        // Los ajustes internos de siembra, de la Biblia guardada y del aviso
        // de copia no se exportan: son de este dispositivo.
        db.settings
          .filter((s) => !/^(content|bible|psalter|backup)\./.test(s.key))
          .toArray(),
      ),
    },
  };
}

/* ---------- Validación ---------- */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  counts: Partial<Record<BackupSection, number>>;
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const hasStringId = (v: unknown) => isObject(v) && typeof v.id === 'string' && v.id.length > 0;

const VALIDATORS: Record<BackupSection, (row: unknown) => boolean> = {
  daily_rules: (r) => hasStringId(r) && typeof (r as PrayerRule).name === 'string',
  rule_items: (r) => hasStringId(r) && typeof (r as RuleItem).ruleId === 'string',
  rule_completions: (r) => hasStringId(r) && typeof (r as RuleCompletion).date === 'string',
  favorites: (r) => hasStringId(r) && typeof (r as Favorite).kind === 'string',
  bookmarks: (r) => hasStringId(r) && typeof (r as Bookmark).kind === 'string',
  notes: (r) => hasStringId(r) && typeof (r as Note).body === 'string',
  jesus_prayer_sessions: (r) => hasStringId(r) && typeof (r as JesusPrayerSession).count === 'number',
  user_prayers: (r) => hasStringId(r) && typeof (r as UserPrayer).title === 'string',
  reading_progress: (r) => hasStringId(r) && typeof (r as ReadingProgress).kind === 'string',
  diptychs: (r) => hasStringId(r) && typeof (r as DiptychName).name === 'string',
  settings: (r) => isObject(r) && typeof r.key === 'string',
};

export function validateBackup(input: unknown): ValidationResult {
  const errors: string[] = [];
  const counts: ValidationResult['counts'] = {};

  if (!isObject(input)) return { valid: false, errors: ['El archivo no contiene un objeto JSON.'], counts };
  if (input.format !== BACKUP_FORMAT) {
    errors.push('El archivo no parece una copia de seguridad de ATHOS.');
  }
  if (typeof input.version !== 'number' || input.version > BACKUP_VERSION) {
    errors.push('La copia procede de una versión más reciente de ATHOS.');
  }
  if (!isObject(input.data)) {
    errors.push('Falta la sección de datos.');
    return { valid: false, errors, counts };
  }

  for (const [section, validator] of Object.entries(VALIDATORS) as Array<
    [BackupSection, (row: unknown) => boolean]
  >) {
    const rows = (input.data as Record<string, unknown>)[section];
    if (rows === undefined) continue;
    if (!Array.isArray(rows)) {
      errors.push(`La sección «${section}» debería ser una lista.`);
      continue;
    }
    const bad = rows.filter((row) => !validator(row)).length;
    if (bad > 0) errors.push(`${bad} registro(s) inválidos en «${section}».`);
    counts[section] = rows.length;
  }

  return { valid: errors.length === 0, errors, counts };
}

export type ImportMode = 'merge' | 'replace';

export interface ImportResult {
  imported: Partial<Record<BackupSection, number>>;
  skipped: string[];
}

/** Importa una copia validada. `replace` vacía cada sección antes de escribir. */
export async function importBackup(
  backup: AthosBackup,
  mode: ImportMode = 'merge',
): Promise<ImportResult> {
  const validation = validateBackup(backup);
  if (!validation.valid) {
    throw new Error(`Copia no válida: ${validation.errors.join(' ')}`);
  }

  const imported: ImportResult['imported'] = {};
  const skipped: string[] = [];

  const tables = {
    daily_rules: db.daily_rules,
    rule_items: db.rule_items,
    rule_completions: db.rule_completions,
    favorites: db.favorites,
    bookmarks: db.bookmarks,
    notes: db.notes,
    jesus_prayer_sessions: db.jesus_prayer_sessions,
    user_prayers: db.user_prayers,
    reading_progress: db.reading_progress,
    diptychs: db.diptychs,
    settings: db.settings,
  } as const;

  await db.transaction('rw', Object.values(tables) as Parameters<typeof db.transaction>[1][], async () => {
    for (const [section, table] of Object.entries(tables) as Array<
      [BackupSection, (typeof tables)[BackupSection]]
    >) {
      const rows = backup.data[section];
      if (!rows?.length) continue;
      if (mode === 'replace') await table.clear();
      await (table as { bulkPut: (rows: unknown[]) => Promise<unknown> }).bulkPut(rows);
      imported[section] = rows.length;
    }
  });

  return { imported, skipped };
}

/* ---------- Markdown ---------- */

export function backupToMarkdown(backup: AthosBackup): string {
  const lines: string[] = [
    '# ATHOS — copia de seguridad',
    '',
    `Exportado el ${new Date(backup.exportedAt).toLocaleString('es')}`,
    '',
  ];

  if (backup.data.daily_rules.length) {
    lines.push('## Reglas de oración', '');
    for (const rule of backup.data.daily_rules) {
      lines.push(`### ${rule.name}`, '');
      const items = backup.data.rule_items
        .filter((i) => i.ruleId === rule.id)
        .sort((a, b) => a.order - b.order);
      for (const item of items) {
        lines.push(`${item.order}. ${item.title}${item.target ? ` — ${item.target} veces` : ''}`);
      }
      lines.push('');
    }
  }

  if (backup.data.user_prayers?.length) {
    lines.push('## Mis oraciones', '');
    for (const oracion of backup.data.user_prayers) {
      lines.push(`### ${oracion.title}`, '', oracion.body, '');
      if (oracion.greek) lines.push(oracion.greek, '');
    }
  }

  if (backup.data.diptychs?.length) {
    for (const [lista, titulo] of [
      ['vivos', '## Por los vivos'],
      ['difuntos', '## Por los difuntos'],
    ] as const) {
      const nombres = backup.data.diptychs.filter((d) => d.list === lista);
      if (!nombres.length) continue;
      lines.push(titulo, '');
      for (const d of nombres) lines.push(`- ${d.name}${d.note ? ` (${d.note})` : ''}`);
      lines.push('');
    }
  }

  if (backup.data.favorites.length) {
    lines.push('## Favoritos', '');
    for (const fav of backup.data.favorites) lines.push(`- ${fav.title} (${fav.kind})`);
    lines.push('');
  }

  if (backup.data.notes.length) {
    lines.push('## Notas', '');
    for (const note of backup.data.notes) {
      lines.push(`### ${note.targetTitle}`, '', note.body, '');
    }
  }

  return lines.join('\n');
}

export function downloadFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Borrado completo de los datos del usuario. Deja el contenido intacto.
 *
 * Recorre USER_TABLES: la lista de lo que es del usuario vive en un solo
 * sitio, y una tabla nueva entra en el borrado al entrar en ella.
 */
export async function wipeUserData(): Promise<void> {
  const tablas = USER_TABLES.map((nombre) => db.table(nombre));
  await db.transaction('rw', tablas, async () => {
    await Promise.all(tablas.map((tabla) => tabla.clear()));
  });
}

/* ---------------- El aviso de copia de seguridad ---------------- */

const ULTIMA_COPIA = 'backup.lastAt';
const APLAZADA_HASTA = 'backup.snoozedUntil';
/** Cada cuánto se recuerda hacer una copia. */
export const BACKUP_EVERY_DAYS = 30;

/** Apunta que se acaba de hacer una copia. */
export async function markBackupDone(cuando = new Date()): Promise<void> {
  await db.settings.put({ key: ULTIMA_COPIA, value: cuando.toISOString(), updatedAt: cuando.toISOString() });
}

/** No volver a recordarlo hasta dentro de `dias`. */
export async function snoozeBackupReminder(dias = BACKUP_EVERY_DAYS, desde = new Date()): Promise<void> {
  const hasta = new Date(desde.getTime() + dias * 86_400_000).toISOString();
  await db.settings.put({ key: APLAZADA_HASTA, value: hasta, updatedAt: desde.toISOString() });
}

/**
 * ¿Toca recordar que se haga una copia?
 *
 * Los datos sólo viven en el dispositivo, y Safari borra los de una web que
 * no se abre en semanas; también se pierden al limpiar el navegador. Se
 * recuerda cuando hay algo que perder —algo rezado, guardado o escrito— y la
 * última copia tiene más de un mes, o no la hay. Si se aplaza, se calla un mes.
 */
export async function backupReminderDue(ahora = new Date()): Promise<boolean> {
  const aplazada = (await db.settings.get(APLAZADA_HASTA))?.value as string | undefined;
  if (aplazada && new Date(aplazada) > ahora) return false;
  const ultima = (await db.settings.get(ULTIMA_COPIA))?.value as string | undefined;
  if (ultima && ahora.getTime() - new Date(ultima).getTime() < BACKUP_EVERY_DAYS * 86_400_000) return false;

  const cuantos = await Promise.all([
    db.rule_completions.count(),
    db.favorites.count(),
    db.bookmarks.count(),
    db.notes.count(),
    db.jesus_prayer_sessions.count(),
    db.reading_progress.count(),
    db.user_prayers.count(),
  ]);
  return cuantos.some((n) => n > 0);
}
