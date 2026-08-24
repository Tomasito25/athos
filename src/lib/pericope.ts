/**
 * Perícopas: qué versículos exactos se leen.
 *
 * El leccionario da la referencia ya en español —«Mateo 19, 16-26» o
 * «Lucas 10, 38-42; 11, 27-28»—. Aquí se convierte en tramos concretos para
 * poder mostrar justo esos versículos y no el capítulo entero, que era lo que
 * ATHOS hacía antes.
 *
 * El formato lo produce `scripts/build-lectionary.py`, así que es estable; aun
 * así, si algo no encaja se devuelve `null` y la pantalla muestra el capítulo,
 * que es preferible a mostrar un recorte equivocado.
 */
import { findBook } from '@/content/bible';

export interface PericopeRange {
  chapter: number;
  /** Primer versículo del tramo; sin él, el capítulo entero. */
  from?: number;
  /** Último versículo del tramo; sin él, hasta el final del capítulo. */
  to?: number;
}

export interface Pericope {
  bookId: string;
  bookName: string;
  ranges: PericopeRange[];
}

/** «Mateo 19, 16-26» → tramos. Los saltos de capítulo van con guion largo. */
export function parsePericope(reference: string): Pericope | null {
  const limpio = reference.trim();
  // El nombre del libro puede empezar por cifra: «2 Timoteo».
  const match = limpio.match(/^((?:[1-4]\s)?[^\d]+?)\s+(\d.*)$/);
  if (!match) return null;

  const libro = findBook(match[1].trim());
  if (!libro || libro.status === 'pending') return null;

  const ranges: PericopeRange[] = [];
  let capituloActual = 0;

  for (const trozo of match[2].split(';')) {
    const segmento = trozo.trim();
    if (!segmento) continue;

    // Cruce de capítulo: «4, 17 – 5, 5»
    const cruce = segmento.match(/^(\d+),\s*(\d+)\s*[–-]\s*(\d+),\s*(\d+)$/);
    if (cruce) {
      const [, c1, v1, c2, v2] = cruce.map(Number) as unknown as number[];
      ranges.push({ chapter: c1, from: v1 });
      for (let c = c1 + 1; c < c2; c++) ranges.push({ chapter: c });
      ranges.push({ chapter: c2, to: v2 });
      capituloActual = c2;
      continue;
    }

    // Capítulo con versículos: «19, 16-26» o «19, 16»
    const conCapitulo = segmento.match(/^(\d+),\s*(.+)$/);
    if (conCapitulo) {
      capituloActual = Number(conCapitulo[1]);
      const tramos = versos(conCapitulo[2], capituloActual);
      if (!tramos) return null;
      ranges.push(...tramos);
      continue;
    }

    // Sólo el capítulo: «118»
    if (/^\d+$/.test(segmento)) {
      capituloActual = Number(segmento);
      ranges.push({ chapter: capituloActual });
      continue;
    }

    // Continuación de versículos en el mismo capítulo: «37-38»
    if (capituloActual) {
      const tramos = versos(segmento, capituloActual);
      if (!tramos) return null;
      ranges.push(...tramos);
      continue;
    }

    return null;
  }

  return ranges.length ? { bookId: libro.id, bookName: libro.name, ranges } : null;
}

/** «16-26. 30» dentro de un capítulo ya conocido. */
function versos(texto: string, chapter: number): PericopeRange[] | null {
  const salida: PericopeRange[] = [];
  for (const parte of texto.split('.')) {
    const trozo = parte.trim();
    if (!trozo) continue;
    const rango = trozo.match(/^(\d+)\s*[–-]\s*(\d+)$/);
    if (rango) {
      salida.push({ chapter, from: Number(rango[1]), to: Number(rango[2]) });
      continue;
    }
    if (/^\d+$/.test(trozo)) {
      salida.push({ chapter, from: Number(trozo), to: Number(trozo) });
      continue;
    }
    return null;
  }
  return salida.length ? salida : null;
}

/** ¿Entra este versículo en alguno de los tramos? */
export function inPericope(ranges: PericopeRange[], chapter: number, verse: number): boolean {
  return ranges.some(
    (r) =>
      r.chapter === chapter &&
      (r.from === undefined || verse >= r.from) &&
      (r.to === undefined || verse <= r.to),
  );
}

/** Capítulos que hay que cargar para mostrar la perícopa. */
export function chaptersOf(ranges: PericopeRange[]): number[] {
  return [...new Set(ranges.map((r) => r.chapter))].sort((a, b) => a - b);
}
