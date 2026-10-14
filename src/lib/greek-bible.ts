/**
 * Dónde está en la Biblia griega cada capítulo de la Biblia de ATHOS.
 *
 * La Reina-Valera sigue la numeración hebrea; la Biblia griega de la Iglesia,
 * la de los Setenta. Casi siempre coinciden, pero no en todo:
 *
 * - los Salmos van uno por detrás a partir del 10, y algunos se juntan o se
 *   parten (el 9 y el 10 hebreos son el 9 griego; el 116 hebreo, el 114 y el
 *   115 griegos…);
 * - Esdras y Nehemías son un solo libro, Esdras B: Nehemías empieza en su
 *   capítulo 11;
 * - Joel tiene cuatro capítulos y Malaquías tres;
 * - Ester y Daniel van en su texto griego, con los añadidos, y Susana y Bel son
 *   libros aparte;
 * - en Jeremías y en el final de los Proverbios el orden de los capítulos es
 *   otro, y aquí se pone el del mismo número, avisando.
 *
 * El Nuevo Testamento coincide capítulo por capítulo.
 */
import { BOOKS_BY_ID } from '@/content/bible';
import { hebrewSourceFor } from '@/content/psalter';

export type GreekTranslationId = 'lxx' | 'grc-nt';

export interface GreekPlace {
  translationId: GreekTranslationId;
  bookId: string;
  chapter: number;
  /** Cómo se llama en la Biblia griega, si no es obvio («Salmo 50»). */
  label?: string;
}

/** Los salmos griegos que contienen un salmo hebreo. */
function salmosGriegos(hebreo: number): number[] {
  const salida: number[] = [];
  for (let lxx = 1; lxx <= 150; lxx += 1) {
    if (hebrewSourceFor(lxx)?.some((r) => r.chapter === hebreo)) salida.push(lxx);
  }
  return salida;
}

const lxx = (bookId: string, chapter: number, label?: string): GreekPlace => ({ translationId: 'lxx', bookId, chapter, label });

export function greekPlaces(bookId: string, chapter: number): GreekPlace[] {
  const libro = BOOKS_BY_ID.get(bookId);
  if (!libro) return [];
  if (libro.testament === 'nt') return [{ translationId: 'grc-nt', bookId, chapter }];

  switch (bookId) {
    case 'PSA':
      return salmosGriegos(chapter).map((n) => lxx('PSA', n, `Salmo ${n} de los Setenta`));
    case 'PS2':
      return [lxx('PSA', 151, 'Salmo 151')];
    case 'EST':
    case 'ESG':
      return [lxx('ESG', chapter)];
    case 'DAN':
      return [lxx('DAG', chapter)];
    case 'DAG':
      if (chapter === 13) return [lxx('SUS', 1, 'Susana')];
      if (chapter === 14) return [lxx('BEL', 1, 'Bel y el dragón')];
      return [lxx('DAG', chapter)];
    case 'NEH':
      return [lxx('EZR', chapter + 10, `Esdras B ${chapter + 10}`)];
    case 'JOL':
      if (chapter === 2) return [lxx('JOL', 2), lxx('JOL', 3)];
      if (chapter === 3) return [lxx('JOL', 4, 'Joel 4 de los Setenta')];
      return [lxx('JOL', chapter)];
    case 'MAL':
      if (chapter === 4) return [lxx('MAL', 3, 'Malaquías 3 de los Setenta')];
      return [lxx('MAL', chapter)];
    case 'PRO':
      // Los Setenta no tienen capítulo 30: su contenido va repartido dentro del 24.
      if (chapter === 30) return [lxx('PRO', 24, 'Proverbios 24 de los Setenta, que contiene este capítulo')];
      return [lxx('PRO', chapter)];
    default:
      return [lxx(bookId, chapter)];
  }
}

/** Lo que conviene saber al leer un libro en griego, si hay algo. */
export function greekNote(bookId: string): string | null {
  switch (bookId) {
    case 'PSA':
      return 'Los Setenta numeran los salmos de otra manera: casi siempre uno menos que la Reina-Valera. Y en el texto griego el título del salmo cuenta como versículo primero.';
    case 'JER':
      return 'En los Setenta, a partir del capítulo 25 el orden de Jeremías es distinto: los oráculos contra las naciones van antes. Aquí se pone el capítulo del mismo número.';
    case 'PRO':
      return 'En los Setenta los últimos capítulos de los Proverbios van en otro orden, y el 30 va repartido dentro del 24. Aquí se pone el capítulo del mismo número, o el que lo contiene.';
    case 'NEH':
      return 'En la Biblia griega, Nehemías es la segunda parte de Esdras B, desde su capítulo 11.';
    case 'EZR':
      return 'En la Biblia griega, Esdras y Nehemías forman un solo libro, Esdras B.';
    case 'JOL':
    case 'MAL':
      return 'Los Setenta reparten este libro en otro número de capítulos.';
    case 'EST':
    case 'DAN':
      return 'En griego, el libro con los añadidos que no trae el texto hebreo.';
    default:
      return null;
  }
}
