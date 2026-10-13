/**
 * Datos del usuario: favoritos, marcadores, notas, historial, regla de oración
 * y sesiones de la oración de Jesús.
 *
 * Todo permanece en el dispositivo. Ninguna de estas funciones sale a la red.
 */
import type {
  Bookmark,
  Favorite,
  FavoriteKind,
  HistoryEntry,
  JesusPrayerSession,
  Note,
  OfficeLength,
  PrayerRule,
  RuleCompletion,
  RuleItem,
  RuleScope,
  RuleTime,
  UserPrayer,
} from '@/types';
import { db } from './db';
import { addDaysIso, toIsoDate } from '@/lib/calendar/jdn';

const now = () => new Date().toISOString();
export const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/* ============================================================
   Favoritos
   ============================================================ */

export const favoriteId = (kind: FavoriteKind, refId: string) => `${kind}:${refId}`;

export async function isFavorite(kind: FavoriteKind, refId: string): Promise<boolean> {
  return (await db.favorites.get(favoriteId(kind, refId))) !== undefined;
}

export async function toggleFavorite(
  entry: Omit<Favorite, 'id' | 'createdAt'>,
): Promise<boolean> {
  const id = favoriteId(entry.kind, entry.refId);
  const existing = await db.favorites.get(id);
  if (existing) {
    await db.favorites.delete(id);
    return false;
  }
  await db.favorites.put({ ...entry, id, createdAt: now() });
  return true;
}

export async function listFavorites(kind?: FavoriteKind): Promise<Favorite[]> {
  const all = kind
    ? await db.favorites.where('kind').equals(kind).toArray()
    : await db.favorites.toArray();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/* ============================================================
   Marcadores
   ============================================================ */

export async function saveBookmark(entry: Omit<Bookmark, 'id' | 'createdAt'>): Promise<Bookmark> {
  const bookmark: Bookmark = { ...entry, id: newId(), createdAt: now() };
  await db.bookmarks.put(bookmark);
  return bookmark;
}

export async function listBookmarks(): Promise<Bookmark[]> {
  return (await db.bookmarks.toArray()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const removeBookmark = (id: string) => db.bookmarks.delete(id);

/* ============================================================
   Notas
   ============================================================ */

export async function saveNote(
  input: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
): Promise<Note> {
  const stamp = now();
  const existing = input.id ? await db.notes.get(input.id) : undefined;
  const note: Note = {
    ...input,
    id: input.id ?? newId(),
    createdAt: existing?.createdAt ?? stamp,
    updatedAt: stamp,
  };
  await db.notes.put(note);
  return note;
}

export async function notesFor(targetKind: string, targetId: string): Promise<Note[]> {
  return db.notes
    .where('targetId')
    .equals(targetId)
    .filter((n) => n.targetKind === targetKind)
    .toArray();
}

export async function listNotes(): Promise<Note[]> {
  return (await db.notes.toArray()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export const removeNote = (id: string) => db.notes.delete(id);

/* ============================================================
   Historial
   ============================================================ */

const HISTORY_LIMIT = 120;

export async function recordVisit(entry: Omit<HistoryEntry, 'id' | 'visitedAt'>): Promise<void> {
  const existing = await db.history.where('path').equals(entry.path).first();
  if (existing) await db.history.delete(existing.id);
  await db.history.put({ ...entry, id: newId(), visitedAt: now() });

  const count = await db.history.count();
  if (count > HISTORY_LIMIT) {
    const oldest = await db.history.orderBy('visitedAt').limit(count - HISTORY_LIMIT).toArray();
    await db.history.bulkDelete(oldest.map((h) => h.id));
  }
}

export async function listHistory(limit = 30): Promise<HistoryEntry[]> {
  return db.history.orderBy('visitedAt').reverse().limit(limit).toArray();
}

export const clearHistory = () => db.history.clear();

/* ============================================================
   Regla de oración
   ============================================================ */

export async function listRules(): Promise<PrayerRule[]> {
  return db.daily_rules.orderBy('order').toArray();
}

/** Oficio que corresponde a un momento del día. */
export async function ruleForTime(time: RuleTime): Promise<PrayerRule | undefined> {
  const todas = await listRules();
  return todas.find((r) => r.time === time);
}

export async function rulesForScope(scope: RuleScope): Promise<PrayerRule[]> {
  const all = await listRules();
  const specific = all.filter((r) => r.scope === scope);
  return specific.length ? specific : all.filter((r) => r.scope === 'diario');
}

export async function saveRule(rule: Omit<PrayerRule, 'createdAt' | 'updatedAt'> & { createdAt?: string }): Promise<PrayerRule> {
  const stamp = now();
  const saved: PrayerRule = { ...rule, createdAt: rule.createdAt ?? stamp, updatedAt: stamp };
  await db.daily_rules.put(saved);
  return saved;
}

export async function deleteRule(ruleId: string): Promise<void> {
  await db.transaction('rw', [db.daily_rules, db.rule_items, db.rule_completions], async () => {
    await db.daily_rules.delete(ruleId);
    await db.rule_items.where('ruleId').equals(ruleId).delete();
    await db.rule_completions.where('ruleId').equals(ruleId).delete();
  });
}

export async function ruleItems(ruleId: string): Promise<RuleItem[]> {
  return db.rule_items.where('ruleId').equals(ruleId).sortBy('order');
}

export async function saveRuleItem(item: RuleItem): Promise<void> {
  await db.rule_items.put(item);
}

export async function deleteRuleItem(itemId: string): Promise<void> {
  await db.transaction('rw', [db.rule_items, db.rule_completions], async () => {
    await db.rule_items.delete(itemId);
    await db.rule_completions.where('itemId').equals(itemId).delete();
  });
}

export async function reorderRuleItems(items: RuleItem[]): Promise<void> {
  await db.rule_items.bulkPut(items.map((item, index) => ({ ...item, order: index + 1 })));
}

const completionId = (date: string, itemId: string) => `${date}|${itemId}`;

/**
 * Da un oficio por rezado, o lo deshace.
 *
 * Antes había que ir marcando oración por oración, lo que convertía el oficio
 * en una lista de tareas: trece casillas que puntuar mientras se reza. Ahora
 * se marca entero al llegar al final, que es cuando de verdad está rezado.
 *
 * Por dentro se siguen guardando las marcas de cada paso: así el progreso, las
 * estadísticas y todo lo que ya leía esos datos siguen funcionando igual.
 *
 * Se rece en la medida que se rece —breve, habitual o extensa—, el oficio
 * queda rezado: se marcan los pasos del habitual y se apunta la medida.
 */
export async function completeRule(date: string, ruleId: string, length?: OfficeLength): Promise<void> {
  const items = await ruleItems(ruleId);
  const stamp = now();
  const registros: RuleCompletion[] = items.map((item) => ({
    id: completionId(date, item.id),
    date,
    ruleId,
    itemId: item.id,
    completedAt: stamp,
    count: item.target,
    ...(length ? { length } : {}),
  }));
  await db.rule_completions.bulkPut(registros);
}

/**
 * Si un oficio está rezado entero ese día, a la vista de sus marcas.
 *
 * Basta con que estén todos los pasos que tiene ahora, o con una marca que
 * diga la medida: ésa sólo la pone `completeRule`, y así un día rezado no
 * deja de estarlo porque luego se cambien los pasos del oficio.
 */
export function isRulePrayed(marcas: RuleCompletion[], ruleId: string, items: RuleItem[]): boolean {
  const propias = marcas.filter((m) => m.ruleId === ruleId);
  if (propias.some((m) => m.length)) return true;
  if (!items.length) return false;
  const hechas = new Set(propias.map((m) => m.itemId));
  return items.every((i) => hechas.has(i.id));
}

/** La medida con que se rezó, si consta. */
export const prayedLength = (marcas: RuleCompletion[], ruleId: string): OfficeLength | undefined =>
  marcas.find((m) => m.ruleId === ruleId && m.length)?.length;

export interface OfficeDay {
  date: string;
  /** Los oficios rezados enteros ese día, con la medida si consta. */
  prayed: Map<RuleTime, OfficeLength | undefined>;
}

/**
 * Los tres oficios de los últimos días, para ver cómo va la costumbre.
 *
 * No hay puntuación ni racha que perder: sólo qué se rezó cada día.
 */
export async function officeWeek(today: string, days = 7): Promise<OfficeDay[]> {
  const desde = addDaysIso(today, -(days - 1));
  const marcas = await db.rule_completions.where('date').between(desde, today, true, true).toArray();

  const reglas: Array<{ time: RuleTime; ruleId: string; items: RuleItem[] }> = [];
  for (const time of ['manana', 'mediodia', 'noche'] as RuleTime[]) {
    const regla = await ruleForTime(time);
    if (regla) reglas.push({ time, ruleId: regla.id, items: await ruleItems(regla.id) });
  }

  return Array.from({ length: days }, (_, i) => {
    const date = addDaysIso(desde, i);
    const delDia = marcas.filter((m) => m.date === date);
    const prayed = new Map<RuleTime, OfficeLength | undefined>();
    for (const r of reglas) {
      if (isRulePrayed(delDia, r.ruleId, r.items)) prayed.set(r.time, prayedLength(delDia, r.ruleId));
    }
    return { date, prayed };
  });
}

/** Deshace lo anterior: el oficio vuelve a estar sin rezar. */
export async function uncompleteRule(date: string, ruleId: string): Promise<void> {
  const done = await db.rule_completions.where('[date+ruleId]').equals([date, ruleId]).toArray();
  await db.rule_completions.bulkDelete(done.map((d) => d.id));
}

export async function toggleRuleItem(
  date: string,
  ruleId: string,
  itemId: string,
  count?: number,
): Promise<boolean> {
  const id = completionId(date, itemId);
  const existing = await db.rule_completions.get(id);
  if (existing) {
    await db.rule_completions.delete(id);
    return false;
  }
  const record: RuleCompletion = { id, date, ruleId, itemId, completedAt: now(), count };
  await db.rule_completions.put(record);
  return true;
}

export async function completionsOn(date: string): Promise<RuleCompletion[]> {
  return db.rule_completions.where('date').equals(date).toArray();
}

export interface RuleProgress {
  rule: PrayerRule;
  items: RuleItem[];
  completed: Set<string>;
  ratio: number;
}

export async function ruleProgress(date: string, rule: PrayerRule): Promise<RuleProgress> {
  const items = await ruleItems(rule.id);
  const done = await db.rule_completions.where('[date+ruleId]').equals([date, rule.id]).toArray();
  const completed = new Set(done.map((d) => d.itemId));
  return {
    rule,
    items,
    completed,
    ratio: items.length ? completed.size / items.length : 0,
  };
}

/** Progreso conjunto de todas las reglas del día, para el panel de Inicio. */
export async function dayRuleProgress(date: string, scope: RuleScope = 'diario') {
  const rules = await rulesForScope(scope);
  const progress = await Promise.all(rules.map((rule) => ruleProgress(date, rule)));
  const total = progress.reduce((sum, p) => sum + p.items.length, 0);
  const done = progress.reduce((sum, p) => sum + p.completed.size, 0);
  return { progress, total, done, ratio: total ? done / total : 0 };
}

/** Días consecutivos con la regla completada, hasta hoy. */
export async function ruleStreak(today = toIsoDate(new Date())): Promise<number> {
  const rules = await listRules();
  if (!rules.length) return 0;
  const itemsByRule = new Map<string, number>();
  for (const rule of rules) itemsByRule.set(rule.id, (await ruleItems(rule.id)).length);

  let streak = 0;
  const cursor = new Date(today);
  for (let i = 0; i < 400; i++) {
    const iso = toIsoDate(cursor);
    const done = await db.rule_completions.where('date').equals(iso).count();
    const expected = [...itemsByRule.values()].reduce((a, b) => a + b, 0);
    if (expected > 0 && done >= expected) streak += 1;
    else if (i > 0 || done === 0) break;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/* ============================================================
   Oraciones propias del usuario
   ============================================================ */

export async function listUserPrayers(): Promise<UserPrayer[]> {
  return (await db.user_prayers.toArray()).sort((a, b) => a.title.localeCompare(b.title, 'es'));
}

export async function getUserPrayer(id: string): Promise<UserPrayer | undefined> {
  return db.user_prayers.get(id);
}

export async function saveUserPrayer(
  input: Omit<UserPrayer, 'createdAt' | 'updatedAt'> & { createdAt?: string },
): Promise<UserPrayer> {
  const stamp = now();
  const prayer: UserPrayer = { ...input, createdAt: input.createdAt ?? stamp, updatedAt: stamp };
  await db.user_prayers.put(prayer);
  return prayer;
}

export async function deleteUserPrayer(id: string): Promise<void> {
  await db.transaction('rw', [db.user_prayers, db.rule_items], async () => {
    await db.user_prayers.delete(id);
    // Los pasos que la usaban quedan con su título, pero sin enlace roto.
    const pasos = await db.rule_items.filter((i) => i.linkKind === 'user-prayer' && i.linkId === id).toArray();
    await db.rule_items.bulkPut(pasos.map((i) => ({ ...i, linkKind: undefined, linkId: undefined })));
  });
}

/* ============================================================
   Oración de Jesús y komboskini
   ============================================================ */

export async function saveSession(session: Omit<JesusPrayerSession, 'id'>): Promise<void> {
  await db.jesus_prayer_sessions.put({ ...session, id: newId() });
}

export async function listSessions(limit = 60): Promise<JesusPrayerSession[]> {
  return db.jesus_prayer_sessions.orderBy('startedAt').reverse().limit(limit).toArray();
}

export interface PrayerStats {
  today: number;
  week: number;
  total: number;
  sessions: number;
  longestSession: number;
}

export async function prayerStats(today = toIsoDate(new Date())): Promise<PrayerStats> {
  const sessions = await db.jesus_prayer_sessions.toArray();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekStart = toIsoDate(weekAgo);

  let todayCount = 0;
  let weekCount = 0;
  let total = 0;
  let longest = 0;

  for (const s of sessions) {
    const day = s.startedAt.slice(0, 10);
    total += s.count;
    if (day === today) todayCount += s.count;
    if (day >= weekStart) weekCount += s.count;
    longest = Math.max(longest, s.count);
  }

  return { today: todayCount, week: weekCount, total, sessions: sessions.length, longestSession: longest };
}

export const clearSessions = () => db.jesus_prayer_sessions.clear();
