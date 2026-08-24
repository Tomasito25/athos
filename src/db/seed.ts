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
import { DAILY_OFFICES } from '@/content/hours';
import type { PrayerRule, RuleItem } from '@/types';
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

/* ---------- Los tres oficios del día ---------- */

const now = () => new Date().toISOString();

/**
 * Construye los tres oficios a partir de su definición.
 * Cada paso guarda su propio texto cuando no procede de la biblioteca, de modo
 * que el oficio se lee entero aunque el usuario reordene o quite piezas.
 */
function defaultOffices(): { rules: PrayerRule[]; items: RuleItem[] } {
  const stamp = now();
  const rules: PrayerRule[] = [];
  const items: RuleItem[] = [];

  DAILY_OFFICES.forEach((office, indice) => {
    const ruleId = `oficio-${office.time}`;
    rules.push({
      id: ruleId,
      name: office.name,
      scope: 'diario',
      time: office.time,
      order: indice + 1,
      createdAt: stamp,
      updatedAt: stamp,
    });

    office.steps.forEach((step, posicion) => {
      items.push({
        id: `${ruleId}-${step.id}`,
        ruleId,
        order: posicion + 1,
        title: step.title,
        note: step.note,
        blocks: step.blocks,
        target: step.target,
        linkKind:
          step.kind === 'prayer'
            ? 'prayer'
            : step.kind === 'psalm'
              ? 'psalm'
              : step.kind === 'jesus-prayer'
                ? 'jesus-prayer'
                : step.kind === 'komboskini'
                  ? 'komboskini'
                  : undefined,
        linkId:
          step.kind === 'prayer'
            ? step.prayerId
            : step.kind === 'psalm'
              ? String(step.psalm)
              : undefined,
      });
    });
  });

  return { rules, items };
}

/**
 * Crea los tres oficios del día una sola vez.
 * Si el usuario los borra, no vuelven a aparecer.
 */
export async function seedUserDefaults(): Promise<boolean> {
  if (await getSetting<boolean>(DEFAULTS_KEY, false)) return false;

  const { rules, items } = defaultOffices();
  await db.transaction('rw', [db.daily_rules, db.rule_items, db.settings], async () => {
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
