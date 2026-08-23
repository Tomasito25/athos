/**
 * ATHOS — base de datos local (IndexedDB a través de Dexie).
 *
 * Dos clases de tablas conviven aquí:
 *   · Contenido — se siembra desde `src/content` y puede regenerarse.
 *   · Datos del usuario — nunca se borran al actualizar la aplicación.
 *
 * El esquema está versionado; añadir tablas o índices exige una versión nueva
 * para que las migraciones respeten lo que el usuario ya tiene guardado.
 */
import Dexie, { type EntityTable } from 'dexie';
import type {
  Akathist,
  AthosArticle,
  BibleBook,
  BibleChapter,
  BibleTranslation,
  BibleVerse,
  Bookmark,
  Canon,
  ChurchFather,
  Favorite,
  Feast,
  Habit,
  HabitEntry,
  HistoryEntry,
  JesusPrayerSession,
  JournalEntry,
  LiturgicalReading,
  Monastery,
  Note,
  Office,
  OrthodoxIcon,
  Prayer,
  PrayerRule,
  Psalm,
  ReadingProgress,
  RuleCompletion,
  RuleItem,
  Saint,
  SettingRecord,
} from '@/types';

export class AthosDatabase extends Dexie {
  // --- Contenido ---
  prayers!: EntityTable<Prayer, 'id'>;
  bible_books!: EntityTable<BibleBook, 'id'>;
  bible_chapters!: EntityTable<BibleChapter, 'id'>;
  bible_verses!: EntityTable<BibleVerse, 'id'>;
  bible_translations!: EntityTable<BibleTranslation, 'id'>;
  psalms!: EntityTable<Psalm, 'id'>;
  saints!: EntityTable<Saint, 'id'>;
  feasts!: EntityTable<Feast, 'id'>;
  liturgical_readings!: EntityTable<LiturgicalReading, 'id'>;
  liturgies!: EntityTable<Office, 'id'>;
  akathists!: EntityTable<Akathist, 'id'>;
  canons!: EntityTable<Canon, 'id'>;
  church_fathers!: EntityTable<ChurchFather, 'id'>;
  monasteries!: EntityTable<Monastery, 'id'>;
  athos_articles!: EntityTable<AthosArticle, 'id'>;
  icons!: EntityTable<OrthodoxIcon, 'id'>;

  // --- Datos del usuario ---
  daily_rules!: EntityTable<PrayerRule, 'id'>;
  rule_items!: EntityTable<RuleItem, 'id'>;
  rule_completions!: EntityTable<RuleCompletion, 'id'>;
  habits!: EntityTable<Habit, 'id'>;
  habit_entries!: EntityTable<HabitEntry, 'id'>;
  journal_entries!: EntityTable<JournalEntry, 'id'>;
  favorites!: EntityTable<Favorite, 'id'>;
  bookmarks!: EntityTable<Bookmark, 'id'>;
  notes!: EntityTable<Note, 'id'>;
  history!: EntityTable<HistoryEntry, 'id'>;
  jesus_prayer_sessions!: EntityTable<JesusPrayerSession, 'id'>;
  reading_progress!: EntityTable<ReadingProgress, 'id'>;
  settings!: EntityTable<SettingRecord, 'key'>;

  constructor(name = 'athos') {
    super(name);

    this.version(1).stores({
      // Contenido
      prayers: 'id, category, order, status',
      bible_books: 'id, testament, section, order',
      bible_chapters: 'id, bookId, chapter, translationId',
      bible_verses: 'id, [bookId+chapter], [translationId+bookId+chapter], translationId',
      bible_translations: 'id',
      psalms: 'id, kathisma, numberLxx, numberHebrew',
      saints: 'id, day, *category, status',
      feasts: 'id, day, paschaOffset, rank',
      liturgical_readings: 'id, key',
      liturgies: 'id, kind, order',
      akathists: 'id, dedication',
      canons: 'id, dedication',
      church_fathers: 'id, century',
      monasteries: 'id, rank',
      athos_articles: 'id, topic',
      icons: 'id, category, feastDay',

      // Datos del usuario
      daily_rules: 'id, scope, time, order',
      rule_items: 'id, ruleId, order',
      rule_completions: 'id, date, ruleId, itemId, [date+ruleId]',
      habits: 'id, order, active',
      habit_entries: 'id, habitId, date, [habitId+date]',
      journal_entries: 'id, date, favorite, *tags, updatedAt',
      favorites: 'id, kind, refId, createdAt',
      bookmarks: 'id, kind, refId, createdAt',
      notes: 'id, targetKind, targetId, updatedAt',
      history: 'id, path, visitedAt, kind',
      jesus_prayer_sessions: 'id, startedAt, mode',
      reading_progress: 'id, kind, refId',
      settings: 'key',
    });
  }
}

export const db = new AthosDatabase();

/** Tablas que contienen datos del usuario y jamás se sobrescriben al sembrar. */
export const USER_TABLES = [
  'daily_rules',
  'rule_items',
  'rule_completions',
  'habits',
  'habit_entries',
  'journal_entries',
  'favorites',
  'bookmarks',
  'notes',
  'history',
  'jesus_prayer_sessions',
  'reading_progress',
  'settings',
] as const;

export const CONTENT_TABLES = [
  'prayers',
  'bible_books',
  'bible_chapters',
  'bible_verses',
  'bible_translations',
  'psalms',
  'saints',
  'feasts',
  'liturgical_readings',
  'liturgies',
  'akathists',
  'canons',
  'church_fathers',
  'monasteries',
  'athos_articles',
  'icons',
] as const;

/* ---------- Ajustes con respaldo en IndexedDB ---------- */

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const record = await db.settings.get(key);
  return record ? (record.value as T) : fallback;
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  await db.settings.put({ key, value, updatedAt: new Date().toISOString() });
}

/** ¿Está IndexedDB realmente disponible? Safari en modo privado la bloquea. */
export async function isStorageAvailable(): Promise<boolean> {
  try {
    await db.open();
    return true;
  } catch {
    return false;
  }
}

/**
 * Solicita almacenamiento persistente para que el navegador no descarte la
 * base de datos cuando falte espacio. Sin esto, los datos de un usuario que no
 * abra la aplicación durante semanas pueden desaparecer.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  if (await navigator.storage.persisted()) return true;
  return navigator.storage.persist();
}

export async function storageEstimate(): Promise<{ usage: number; quota: number } | null> {
  if (!navigator.storage?.estimate) return null;
  const { usage = 0, quota = 0 } = await navigator.storage.estimate();
  return { usage, quota };
}
