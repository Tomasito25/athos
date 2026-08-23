/**
 * Datos del usuario: favoritos, marcadores, notas, historial, regla de oración,
 * hábitos, diario y sesiones de la oración de Jesús.
 *
 * Todo permanece en el dispositivo. Ninguna de estas funciones sale a la red.
 */
import type {
  Bookmark,
  Favorite,
  FavoriteKind,
  Habit,
  HabitEntry,
  HistoryEntry,
  JesusPrayerSession,
  JournalEntry,
  Note,
  PrayerRule,
  RuleCompletion,
  RuleItem,
  RuleScope,
} from '@/types';
import { db } from './db';
import { toIsoDate } from '@/lib/calendar/jdn';

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
   Hábitos
   ============================================================ */

export async function listHabits(activeOnly = false): Promise<Habit[]> {
  const habits = await db.habits.orderBy('order').toArray();
  return activeOnly ? habits.filter((h) => h.active) : habits;
}

export const saveHabit = (habit: Habit) => db.habits.put(habit);

export async function deleteHabit(id: string): Promise<void> {
  await db.transaction('rw', [db.habits, db.habit_entries], async () => {
    await db.habits.delete(id);
    await db.habit_entries.where('habitId').equals(id).delete();
  });
}

const habitEntryId = (habitId: string, date: string) => `${habitId}|${date}`;

export async function toggleHabit(habitId: string, date: string): Promise<boolean> {
  const id = habitEntryId(habitId, date);
  const existing = await db.habit_entries.get(id);
  const done = !existing?.done;
  const entry: HabitEntry = { id, habitId, date, done, updatedAt: now() };
  if (done) await db.habit_entries.put(entry);
  else await db.habit_entries.delete(id);
  return done;
}

export async function setHabit(habitId: string, date: string, done: boolean): Promise<void> {
  const id = habitEntryId(habitId, date);
  if (done) await db.habit_entries.put({ id, habitId, date, done, updatedAt: now() });
  else await db.habit_entries.delete(id);
}

export async function habitEntriesBetween(from: string, to: string): Promise<HabitEntry[]> {
  return db.habit_entries.where('date').between(from, to, true, true).toArray();
}

export async function habitEntriesOn(date: string): Promise<HabitEntry[]> {
  return db.habit_entries.where('date').equals(date).toArray();
}

/* ============================================================
   Diario
   ============================================================ */

export async function listJournal(): Promise<JournalEntry[]> {
  return (await db.journal_entries.toArray()).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJournalEntry(id: string): Promise<JournalEntry | undefined> {
  return db.journal_entries.get(id);
}

export async function saveJournalEntry(
  input: Omit<JournalEntry, 'createdAt' | 'updatedAt'> & { createdAt?: string },
): Promise<JournalEntry> {
  const stamp = now();
  const entry: JournalEntry = { ...input, createdAt: input.createdAt ?? stamp, updatedAt: stamp };
  await db.journal_entries.put(entry);
  return entry;
}

export const deleteJournalEntry = (id: string) => db.journal_entries.delete(id);

export async function journalTags(): Promise<string[]> {
  const entries = await db.journal_entries.toArray();
  return [...new Set(entries.flatMap((e) => e.tags))].sort((a, b) => a.localeCompare(b, 'es'));
}

/* ============================================================
   Oración de Jesús y chotki
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
