/**
 * Exportación e importación de los datos del usuario.
 *
 * El formato es JSON legible y versionado. La importación valida la forma de
 * cada registro antes de escribir nada: un archivo corrupto no debe dejar la
 * base a medias.
 */
import type {
  Bookmark,
  Favorite,
  Habit,
  HabitEntry,
  JesusPrayerSession,
  JournalEntry,
  Note,
  PrayerRule,
  RuleCompletion,
  RuleItem,
  SettingRecord,
} from '@/types';
import { db } from './db';

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
    habits: Habit[];
    habit_entries: HabitEntry[];
    journal_entries: JournalEntry[];
    favorites: Favorite[];
    bookmarks: Bookmark[];
    notes: Note[];
    jesus_prayer_sessions: JesusPrayerSession[];
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
      'habits',
      'habit_entries',
      'journal_entries',
      'favorites',
      'bookmarks',
      'notes',
      'jesus_prayer_sessions',
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
      habits: await take('habits', () => db.habits.toArray()),
      habit_entries: await take('habit_entries', () => db.habit_entries.toArray()),
      journal_entries: await take('journal_entries', () => db.journal_entries.toArray()),
      favorites: await take('favorites', () => db.favorites.toArray()),
      bookmarks: await take('bookmarks', () => db.bookmarks.toArray()),
      notes: await take('notes', () => db.notes.toArray()),
      jesus_prayer_sessions: await take('jesus_prayer_sessions', () =>
        db.jesus_prayer_sessions.toArray(),
      ),
      settings: await take('settings', () =>
        // Los ajustes internos de siembra no se exportan.
        db.settings.filter((s) => !s.key.startsWith('content.')).toArray(),
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
  habits: (r) => hasStringId(r) && typeof (r as Habit).name === 'string',
  habit_entries: (r) => hasStringId(r) && typeof (r as HabitEntry).habitId === 'string',
  journal_entries: (r) =>
    hasStringId(r) &&
    typeof (r as JournalEntry).date === 'string' &&
    Array.isArray((r as JournalEntry).tags),
  favorites: (r) => hasStringId(r) && typeof (r as Favorite).kind === 'string',
  bookmarks: (r) => hasStringId(r) && typeof (r as Bookmark).kind === 'string',
  notes: (r) => hasStringId(r) && typeof (r as Note).body === 'string',
  jesus_prayer_sessions: (r) => hasStringId(r) && typeof (r as JesusPrayerSession).count === 'number',
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
    habits: db.habits,
    habit_entries: db.habit_entries,
    journal_entries: db.journal_entries,
    favorites: db.favorites,
    bookmarks: db.bookmarks,
    notes: db.notes,
    jesus_prayer_sessions: db.jesus_prayer_sessions,
    settings: db.settings,
  } as const;

  await db.transaction('rw', Object.values(tables), async () => {
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

  if (backup.data.journal_entries.length) {
    lines.push('## Diario espiritual', '');
    for (const entry of [...backup.data.journal_entries].sort((a, b) => a.date.localeCompare(b.date))) {
      lines.push(`### ${entry.date} — ${entry.title || 'Sin título'}`, '');
      if (entry.encryption) lines.push('_Entrada cifrada; no se exporta en claro._', '');
      else lines.push(entry.body, '');
      if (entry.tags.length) lines.push(`Etiquetas: ${entry.tags.map((t) => `#${t}`).join(' ')}`, '');
    }
  }

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

  if (backup.data.habits.length) {
    lines.push('## Hábitos', '');
    for (const habit of backup.data.habits) {
      const done = backup.data.habit_entries.filter((e) => e.habitId === habit.id && e.done).length;
      lines.push(`- ${habit.name}: ${done} día(s) registrados`);
    }
    lines.push('');
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

/** Borrado completo de los datos del usuario. Deja el contenido intacto. */
export async function wipeUserData(): Promise<void> {
  await db.transaction(
    'rw',
    [
      db.daily_rules,
      db.rule_items,
      db.rule_completions,
      db.habits,
      db.habit_entries,
      db.journal_entries,
      db.favorites,
      db.bookmarks,
      db.notes,
      db.history,
      db.jesus_prayer_sessions,
      db.reading_progress,
      db.settings,
    ],
    async () => {
      await Promise.all([
        db.daily_rules.clear(),
        db.rule_items.clear(),
        db.rule_completions.clear(),
        db.habits.clear(),
        db.habit_entries.clear(),
        db.journal_entries.clear(),
        db.favorites.clear(),
        db.bookmarks.clear(),
        db.notes.clear(),
        db.history.clear(),
        db.jesus_prayer_sessions.clear(),
        db.reading_progress.clear(),
        db.settings.clear(),
      ]);
    },
  );
}
