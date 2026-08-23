/**
 * Salterio.
 *
 * Los salmos se construyen a partir del texto bíblico aplicando la
 * correspondencia entre la numeración de los Setenta —la litúrgica— y la
 * hebrea de la traducción. El resultado se guarda en la tabla `psalms` para
 * que la búsqueda sin conexión los alcance.
 */
import type { Psalm, TextBlock } from '@/types';
import {
  PSALM_151_NOTE,
  PSALM_NOTES,
  PSALTER_META,
  hebrewNumberFor,
  hebrewSourceFor,
  kathismaOf,
} from '@/content/psalter';
import { db, getSetting, setSetting } from './db';
import { chapterVerses, loadBookFile, DEFAULT_TRANSLATION } from './bible';

const PSALTER_KEY = 'psalter.built';
const PSALM_COUNT = 151;

let building: Promise<void> | null = null;

function buildPsalm(lxx: number, verses: Map<number, { verse: number; text: string }[]>): Psalm {
  const ranges = hebrewSourceFor(lxx);
  const kathisma = kathismaOf(lxx);
  const blocks: TextBlock[] = [];

  if (!ranges) {
    blocks.push({ kind: 'pending', content: PSALM_151_NOTE });
  } else {
    for (const range of ranges) {
      const chapterVerseList = verses.get(range.chapter) ?? [];
      for (const v of chapterVerseList) {
        if (range.fromVerse && v.verse < range.fromVerse) continue;
        if (range.toVerse && v.verse > range.toVerse) continue;
        blocks.push({ kind: 'verse', content: v.text, ref: String(v.verse) });
      }
    }
  }

  const hebrew = hebrewNumberFor(lxx);
  const plain = blocks
    .filter((b) => b.kind === 'verse')
    .map((b) => b.content)
    .join(' ');

  return {
    id: lxx,
    numberLxx: lxx,
    numberHebrew: hebrew ?? lxx,
    title: `Salmo ${lxx}`,
    superscription: PSALM_NOTES[lxx],
    kathisma: kathisma?.number ?? 0,
    stasis: kathisma ? kathisma.stases.findIndex((st) => st.includes(lxx)) + 1 : 0,
    blocks,
    status: ranges ? 'complete' : 'pending',
    meta: PSALTER_META,
    searchText: `salmo ${lxx} ${hebrew ? `(${hebrew} hebreo)` : ''} ${plain}`.toLowerCase(),
  };
}

/** Construye los 151 salmos a partir del texto bíblico. Se ejecuta una vez. */
export async function ensurePsalterBuilt(force = false): Promise<void> {
  if (!force && (await getSetting<boolean>(PSALTER_KEY, false))) {
    if (await db.psalms.count()) return;
  }
  if (building) return building;

  building = (async () => {
    const file = await loadBookFile('PSA', DEFAULT_TRANSLATION);
    const byChapter = new Map<number, { verse: number; text: string }[]>();
    for (const chapter of Object.keys(file.chapters).map(Number)) {
      byChapter.set(
        chapter,
        chapterVerses(file, chapter).map((v) => ({ verse: v.verse, text: v.text })),
      );
    }

    const psalms: Psalm[] = [];
    for (let lxx = 1; lxx <= PSALM_COUNT; lxx++) psalms.push(buildPsalm(lxx, byChapter));

    await db.psalms.bulkPut(psalms);
    await setSetting(PSALTER_KEY, true);
  })().finally(() => {
    building = null;
  });

  return building;
}

export async function getPsalm(lxx: number): Promise<Psalm | undefined> {
  await ensurePsalterBuilt();
  return db.psalms.get(lxx);
}

export async function getPsalms(): Promise<Psalm[]> {
  await ensurePsalterBuilt();
  return db.psalms.orderBy('numberLxx').toArray();
}

export async function getKathismaPsalms(kathisma: number): Promise<Psalm[]> {
  await ensurePsalterBuilt();
  return db.psalms.where('kathisma').equals(kathisma).sortBy('numberLxx');
}

/**
 * Kathisma que corresponde a un día, repartiendo el Salterio en veinte días.
 * Es una ayuda de lectura continua, no la distribución del Typikon, que
 * depende del periodo litúrgico y del día de la semana.
 */
export function suggestedKathisma(date: Date): number {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return ((dayOfYear - 1) % 20) + 1;
}
