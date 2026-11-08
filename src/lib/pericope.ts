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
 *
 * Hay tres formas que el leccionario trae y que no son la corriente:
 *
 *   - Los libros de un solo capítulo. «Judas 1-10» son los versículos 1 al 10,
 *     no diez capítulos: Judas no tiene más que uno.
 *   - La notación con punto, heredada de orthocal: «1 Corintios 5.6-8», donde
 *     el punto separa capítulo y versículo y la coma separa los tramos, justo
 *     al revés que en la notación española. Se normaliza antes de analizar.
 *   - Las referencias que cruzan de un libro a otro: «1 Corintios 5, 6-8;
 *     Gálatas 3, 13-14». Para esas está `parsePassage`, que devuelve una
 *     perícopa por libro.
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

/**
 * Pasa la notación de orthocal a la española.
 *
 * «17.15-17, 19» usa el punto para separar capítulo y versículo y la coma para
 * separar tramos. ATHOS hace lo contrario, así que se intercambian.
 *
 * Lo que decide es cómo se separa el PRIMER capítulo de su primer versículo,
 * que es donde las dos notaciones se distinguen sin ambigüedad:
 *
 *   «17.15-17, 19»    → punto pegado: notación de orthocal, hay que cambiarla.
 *   «1, 1-10; 20-2.5» → coma: notación española, no se toca; el «2.5» del final
 *                       es un cruce de capítulo y lo resuelve el analizador.
 *
 * Mirar la referencia entera en vez del principio rompía uno de los dos casos,
 * hiciera lo que hiciera.
 */
function normalizarNotacion(resto: string): string {
  if (!/^\d+[.:]\d/.test(resto)) return resto;
  // Se marca el separador de capítulo con un carácter de uso privado para que
  // el intercambio de coma y punto no lo pise, y se restituye al final.
  const MARCA = '\uE000';
  return resto
    .replace(/(\d)[.:](\d)/g, `$1${MARCA}$2`)
    .replace(/,/g, '.') // la coma pasa a separar tramos
    .split(MARCA)
    .join(', '); // y la marca vuelve como coma de capítulo
}

/** Quita las coletillas que el leccionario arrastra: «(LXX)», «(Baruc …)». */
function sinColetillas(texto: string): string {
  return texto.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

/** «Mateo 19, 16-26» → tramos. Los saltos de capítulo van con guion largo. */
export function parsePericope(reference: string): Pericope | null {
  // El espacio de ancho cero se cuela en algunas referencias del leccionario.
  const limpio = sinColetillas(reference.replace(/[\u200b\u00a0]/g, ' ').trim());
  // El nombre del libro puede empezar por cifra: «2 Timoteo».
  const match = limpio.match(/^((?:[1-4]\s)?[^\d]+?)\s+(\d.*)$/);
  if (!match) return null;

  const libro = findBook(match[1].trim());
  if (!libro || libro.status === 'pending') return null;

  let resto = normalizarNotacion(match[2].trim());

  // Judas, Filemón, 2 y 3 Juan y Abdías tienen un solo capítulo: cuando la
  // referencia no nombra capítulo, las cifras son versículos de ese único
  // capítulo. «Judas 1-10» no son diez capítulos.
  if (libro.chapters === 1 && !/,/.test(resto)) {
    resto = `1, ${resto.replace(/;/g, '.')}`;
  }

  const ranges: PericopeRange[] = [];
  let capituloActual = 0;

  for (const trozo of resto.split(';')) {
    const segmento = trozo.trim();
    if (!segmento) continue;

    // Cruce de capítulo escrito a medias: «26, 40-27.2» o, si el capítulo se
    // arrastra del tramo anterior, «35-6.1» —los versículos 35 y siguientes
    // del capítulo en curso hasta el 1 del capítulo 6—.
    const cruceMixto = segmento.match(/^(?:(\d+),\s*)?(\d+)\s*[–-]\s*(\d+)[.:](\d+)$/);
    if (cruceMixto) {
      const c1 = cruceMixto[1] ? Number(cruceMixto[1]) : capituloActual;
      const [v1, c2, v2] = [Number(cruceMixto[2]), Number(cruceMixto[3]), Number(cruceMixto[4])];
      if (!c1 || c2 <= c1) return null;
      ranges.push({ chapter: c1, from: v1 });
      for (let c = c1 + 1; c < c2; c++) ranges.push({ chapter: c });
      ranges.push({ chapter: c2, to: v2 });
      capituloActual = c2;
      continue;
    }

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

/**
 * Una referencia completa, que puede abarcar más de un libro.
 *
 * «1 Corintios 5, 6-8; Gálatas 3, 13-14» son dos perícopas, no una. Se parte
 * por los puntos y coma que empiezan por nombre de libro; los demás siguen
 * perteneciendo al libro anterior y los analiza `parsePericope`.
 *
 * Devuelve `null` si alguna de las partes no se entiende: más vale mostrar el
 * capítulo que recortar la mitad de la lectura y callar la otra mitad.
 */
export function parsePassage(reference: string): Pericope[] | null {
  const limpio = sinColetillas(reference.replace(/[\u200b\u00a0]/g, ' ').trim());
  const partes: string[] = [];

  for (const trozo of limpio.split(';')) {
    const segmento = trozo.trim();
    if (!segmento) continue;
    // Empieza por nombre de libro si no arranca con una cifra suelta seguida
    // de coma o de guion; «2 Timoteo» empieza por cifra pero no es un tramo.
    const esLibroNuevo = /^(?:[1-4]\s)?\p{L}/u.test(segmento);
    if (esLibroNuevo || partes.length === 0) partes.push(segmento);
    else partes[partes.length - 1] += `; ${segmento}`;
  }

  if (!partes.length) return null;

  const salida: Pericope[] = [];
  for (const parte of partes) {
    const pericopa = parsePericope(parte);
    if (!pericopa) return null;
    salida.push(pericopa);
  }
  return salida;
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
