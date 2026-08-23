/**
 * Salterio ortodoxo.
 *
 * El culto bizantino usa la numeración de los Setenta (LXX), que difiere de la
 * hebrea en casi todo el libro. La traducción incorporada, la Reina-Valera de
 * 1909, sigue la numeración hebrea; aquí se define la correspondencia exacta
 * para que ATHOS pueda mostrar el salmo con su número litúrgico sin alterar
 * el texto de la traducción.
 */
import type { Kathisma, SourceMeta } from '@/types';

export const PSALTER_META: SourceMeta = {
  title: 'Salterio',
  translator: 'Reina-Valera 1909',
  source: 'Reina-Valera 1909 (dominio público); numeración de los Setenta según el uso litúrgico bizantino',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'public-domain',
  dateAdded: '2026-01-01',
  notes:
    'La división en veinte kathismata es la del Horologion. La subdivisión en tres estasis sigue el uso griego habitual.',
};

/** Trozo del texto hebreo que compone un salmo de la numeración griega. */
export interface PsalmSourceRange {
  /** Capítulo en la numeración hebrea de la traducción. */
  chapter: number;
  fromVerse?: number;
  toVerse?: number;
}

/**
 * Correspondencia LXX → hebreo.
 * Salmo 151 no forma parte del canon hebreo y queda pendiente de incorporar.
 */
export function hebrewSourceFor(lxx: number): PsalmSourceRange[] | null {
  if (lxx >= 1 && lxx <= 8) return [{ chapter: lxx }];
  if (lxx === 9) return [{ chapter: 9 }, { chapter: 10 }];
  if (lxx >= 10 && lxx <= 112) return [{ chapter: lxx + 1 }];
  if (lxx === 113) return [{ chapter: 114 }, { chapter: 115 }];
  if (lxx === 114) return [{ chapter: 116, fromVerse: 1, toVerse: 9 }];
  if (lxx === 115) return [{ chapter: 116, fromVerse: 10, toVerse: 19 }];
  if (lxx >= 116 && lxx <= 145) return [{ chapter: lxx + 1 }];
  if (lxx === 146) return [{ chapter: 147, fromVerse: 1, toVerse: 11 }];
  if (lxx === 147) return [{ chapter: 147, fromVerse: 12, toVerse: 20 }];
  if (lxx >= 148 && lxx <= 150) return [{ chapter: lxx }];
  return null; // Salmo 151
}

/** Número hebreo principal de un salmo griego, para mostrarlo junto al título. */
export function hebrewNumberFor(lxx: number): number | null {
  const ranges = hebrewSourceFor(lxx);
  return ranges ? ranges[0].chapter : null;
}

export const PSALM_COUNT = 151;

/** Los veinte kathismata del Horologion, con sus tres estasis. */
export const KATHISMATA: Kathisma[] = [
  { number: 1, psalms: range(1, 8), stases: [range(1, 3), range(4, 6), range(7, 8)] },
  { number: 2, psalms: range(9, 16), stases: [range(9, 10), range(11, 13), range(14, 16)] },
  { number: 3, psalms: range(17, 23), stases: [[17], range(18, 20), range(21, 23)] },
  { number: 4, psalms: range(24, 31), stases: [range(24, 26), range(27, 29), range(30, 31)] },
  { number: 5, psalms: range(32, 36), stases: [range(32, 33), [34], range(35, 36)] },
  { number: 6, psalms: range(37, 45), stases: [range(37, 39), range(40, 42), range(43, 45)] },
  { number: 7, psalms: range(46, 54), stases: [range(46, 48), range(49, 50), range(51, 54)] },
  { number: 8, psalms: range(55, 63), stases: [range(55, 57), range(58, 60), range(61, 63)] },
  { number: 9, psalms: range(64, 69), stases: [range(64, 66), [67], range(68, 69)] },
  { number: 10, psalms: range(70, 76), stases: [range(70, 71), range(72, 73), range(74, 76)] },
  { number: 11, psalms: range(77, 84), stases: [[77], range(78, 80), range(81, 84)] },
  { number: 12, psalms: range(85, 90), stases: [range(85, 87), [88], range(89, 90)] },
  { number: 13, psalms: range(91, 100), stases: [range(91, 93), range(94, 96), range(97, 100)] },
  { number: 14, psalms: range(101, 104), stases: [range(101, 102), [103], [104]] },
  { number: 15, psalms: range(105, 108), stases: [[105], [106], range(107, 108)] },
  { number: 16, psalms: range(109, 117), stases: [range(109, 112), range(113, 114), range(115, 117)] },
  { number: 17, psalms: [118], stases: [[118], [118], [118]] },
  { number: 18, psalms: range(119, 133), stases: [range(119, 123), range(124, 128), range(129, 133)] },
  { number: 19, psalms: range(134, 142), stases: [range(134, 136), range(137, 139), range(140, 142)] },
  { number: 20, psalms: range(143, 150), stases: [range(143, 144), range(145, 147), range(148, 150)] },
];

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

export function kathismaOf(lxx: number): Kathisma | undefined {
  return KATHISMATA.find((k) => k.psalms.includes(lxx));
}

/** Salmos con un lugar propio en el oficio, para orientar al lector. */
export const PSALM_NOTES: Record<number, string> = {
  1: 'Abre el Salterio y el primer kathisma. Se canta en las Vísperas dominicales.',
  3: 'Primero de los Seis Salmos del Orthros.',
  22: 'El Señor es mi pastor. Se canta tras la Comunión en algunas tradiciones.',
  33: 'Bendeciré al Señor en todo tiempo. Se canta al final de la Liturgia.',
  37: 'Segundo de los Seis Salmos del Orthros.',
  50: 'Salmo del arrepentimiento. Se dice a diario en las oraciones de la mañana y en el Orthros.',
  62: 'Tercero de los Seis Salmos del Orthros.',
  87: 'Cuarto de los Seis Salmos. El más sombrío del Salterio.',
  90: 'El que habita al abrigo del Altísimo. Salmo de protección, propio de las Completas.',
  102: 'Quinto de los Seis Salmos. Se canta como primera antífona de la Liturgia.',
  103: 'Salmo de la creación. Abre las Vísperas.',
  117: 'Éste es el día que hizo el Señor. Se canta en la Pascua.',
  118: 'El salmo más extenso. Ocupa por sí solo el kathisma 17 y se canta en los funerales y el Sábado Santo.',
  140: 'Suba mi oración como el incienso. Vísperas.',
  142: 'Último de los Seis Salmos del Orthros.',
  150: 'Cierra el Salterio: todo cuanto respira alabe al Señor.',
};

/** Los Seis Salmos (Exapsalmos) que se leen al comienzo del Orthros. */
export const SIX_PSALMS = [3, 37, 62, 87, 102, 142];

export const PSALM_151_NOTE =
  'El Salmo 151 se conserva en la Septuaginta y se lee en la tradición ortodoxa, pero no ' +
  'forma parte de la Reina-Valera 1909. Contenido pendiente de incorporar.';
