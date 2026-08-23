/**
 * Siembra del contenido en IndexedDB.
 *
 * Es idempotente y sólo escribe en las tablas de contenido: los datos del
 * usuario nunca se tocan. Se vuelve a ejecutar cuando cambia CONTENT_VERSION.
 */
import {
  AKATHISTS,
  ALL_FEASTS,
  BIBLE_BOOKS,
  CANONS,
  CHURCH_FATHERS,
  CONTENT_VERSION,
  FIXED_READINGS,
  ICONS,
  MONASTERIES,
  MOVABLE_READINGS,
  ATHOS_ARTICLES,
  OFFICES,
  PRAYERS,
  RV1909,
  SAINTS,
} from '@/content';
import type { Habit, PrayerRule, RuleItem } from '@/types';
import { db, getSetting, setSetting } from './db';

const CONTENT_VERSION_KEY = 'content.version';
const DEFAULTS_KEY = 'user.defaultsCreated';

export async function seedContent(force = false): Promise<boolean> {
  const current = await getSetting<number>(CONTENT_VERSION_KEY, 0);
  if (!force && current === CONTENT_VERSION) return false;

  await db.transaction(
    'rw',
    [
      db.prayers,
      db.bible_books,
      db.bible_translations,
      db.saints,
      db.feasts,
      db.liturgical_readings,
      db.liturgies,
      db.akathists,
      db.canons,
      db.church_fathers,
      db.monasteries,
      db.athos_articles,
      db.icons,
      db.settings,
    ],
    async () => {
      await db.prayers.bulkPut(PRAYERS);
      await db.bible_books.bulkPut(BIBLE_BOOKS);
      await db.bible_translations.bulkPut([RV1909]);
      await db.saints.bulkPut(SAINTS);
      await db.feasts.bulkPut(ALL_FEASTS);
      await db.liturgical_readings.bulkPut([...MOVABLE_READINGS, ...FIXED_READINGS]);
      await db.liturgies.bulkPut(OFFICES);
      await db.akathists.bulkPut(AKATHISTS);
      await db.canons.bulkPut(CANONS);
      await db.church_fathers.bulkPut(CHURCH_FATHERS);
      await db.monasteries.bulkPut(MONASTERIES);
      await db.athos_articles.bulkPut(ATHOS_ARTICLES);
      await db.icons.bulkPut(ICONS);
      await db.settings.put({
        key: CONTENT_VERSION_KEY,
        value: CONTENT_VERSION,
        updatedAt: new Date().toISOString(),
      });
    },
  );

  return true;
}

/* ---------- Hábitos y regla de oración iniciales ---------- */

export const BUILT_IN_HABITS: Habit[] = [
  { id: 'oracion-manana', name: 'Oración de la mañana', order: 1, active: true, cadence: 'daily', builtIn: true },
  { id: 'oracion-noche', name: 'Oración de la noche', order: 2, active: true, cadence: 'daily', builtIn: true },
  { id: 'regla', name: 'Regla de oración', order: 3, active: true, cadence: 'daily', builtIn: true },
  { id: 'oracion-jesus', name: 'Oración de Jesús', order: 4, active: true, cadence: 'daily', builtIn: true },
  { id: 'biblia', name: 'Lectura de la Escritura', order: 5, active: true, cadence: 'daily', builtIn: true },
  { id: 'salterio', name: 'Salterio', order: 6, active: false, cadence: 'daily', builtIn: true },
  { id: 'lectura-espiritual', name: 'Lectura espiritual', order: 7, active: true, cadence: 'daily', builtIn: true },
  { id: 'ayuno', name: 'Ayuno', order: 8, active: true, cadence: 'daily', builtIn: true, description: 'Marca los días en que has guardado el ayuno prescrito.' },
  { id: 'liturgia', name: 'Divina Liturgia', order: 9, active: true, cadence: 'weekly', builtIn: true },
  { id: 'confesion', name: 'Confesión', order: 10, active: true, cadence: 'occasional', builtIn: true },
  { id: 'comunion', name: 'Comunión', order: 11, active: true, cadence: 'occasional', builtIn: true },
];

const now = () => new Date().toISOString();

function defaultRules(): { rules: PrayerRule[]; items: RuleItem[] } {
  const stamp = now();
  const rules: PrayerRule[] = [
    { id: 'regla-manana', name: 'Regla de la mañana', scope: 'diario', time: 'manana', order: 1, createdAt: stamp, updatedAt: stamp },
    { id: 'regla-noche', name: 'Regla de la noche', scope: 'diario', time: 'noche', order: 2, createdAt: stamp, updatedAt: stamp },
  ];

  const items: RuleItem[] = [
    { id: 'rm-1', ruleId: 'regla-manana', order: 1, title: 'Señal de la Cruz y silencio', note: 'Antes de hablar, callar.' },
    { id: 'rm-2', ruleId: 'regla-manana', order: 2, title: 'Comienzo habitual', linkKind: 'prayer', linkId: 'comienzo-habitual' },
    { id: 'rm-3', ruleId: 'regla-manana', order: 3, title: 'Al levantarse del sueño', linkKind: 'prayer', linkId: 'al-despertar' },
    { id: 'rm-4', ruleId: 'regla-manana', order: 4, title: 'Salmo 50', linkKind: 'psalm', linkId: '50' },
    { id: 'rm-5', ruleId: 'regla-manana', order: 5, title: 'Símbolo de la Fe', linkKind: 'prayer', linkId: 'simbolo-de-la-fe' },
    { id: 'rm-6', ruleId: 'regla-manana', order: 6, title: 'Oración de Jesús', linkKind: 'jesus-prayer', target: 33 },

    { id: 'rn-1', ruleId: 'regla-noche', order: 1, title: 'Examen del día', linkKind: 'prayer', linkId: 'examen-del-dia' },
    { id: 'rn-2', ruleId: 'regla-noche', order: 2, title: 'Comienzo habitual', linkKind: 'prayer', linkId: 'comienzo-habitual' },
    { id: 'rn-3', ruleId: 'regla-noche', order: 3, title: 'Oración antes del sueño', linkKind: 'prayer', linkId: 'damasceno-noche' },
    { id: 'rn-4', ruleId: 'regla-noche', order: 4, title: 'Perdón antes de dormir', linkKind: 'prayer', linkId: 'perdon-nocturno' },
    { id: 'rn-5', ruleId: 'regla-noche', order: 5, title: 'A la Santísima Theotokos', linkKind: 'prayer', linkId: 'theotokos-noche' },
    { id: 'rn-6', ruleId: 'regla-noche', order: 6, title: 'Oración de Jesús', linkKind: 'jesus-prayer', target: 12 },
  ];

  return { rules, items };
}

/**
 * Crea los hábitos y la regla de oración iniciales una sola vez.
 * Si el usuario los borra, no vuelven a aparecer.
 */
export async function seedUserDefaults(): Promise<boolean> {
  if (await getSetting<boolean>(DEFAULTS_KEY, false)) return false;

  const { rules, items } = defaultRules();
  await db.transaction('rw', [db.habits, db.daily_rules, db.rule_items, db.settings], async () => {
    await db.habits.bulkPut(BUILT_IN_HABITS);
    await db.daily_rules.bulkPut(rules);
    await db.rule_items.bulkPut(items);
  });
  await setSetting(DEFAULTS_KEY, true);
  return true;
}

/** Restablece el contenido sin tocar nada del usuario. */
export async function resetContent(): Promise<void> {
  await seedContent(true);
}
