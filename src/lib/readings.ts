/**
 * Cómo se nombra y se muestra cada lectura.
 *
 * Vivía dentro de la pantalla de lecturas, y la ficha de un día tenía su
 * propia versión, con dos etiquetas para todo: lo que no era Evangelio se
 * llamaba «Epístola», y así el Evangelio de Maitines o una lectura de
 * Vísperas del libro de los Proverbios salían como epístolas.
 */
import type { ReadingKind, ReadingRef } from '@/types';

/** Cómo se llama cada tipo de lectura en la pantalla. */
export const READING_LABELS: Record<ReadingKind, string> = {
  evangelio: 'Evangelio',
  epistola: 'Epístola',
  'evangelio-maitines': 'Evangelio de Maitines',
  'evangelio-pasion': 'Evangelio de la Pasión',
  visperas: 'Vísperas',
  horas: 'Horas',
  maitines: 'Maitines',
  'bendicion-aguas': 'Bendición de las aguas',
  'procesion-cruz': 'Procesión de la Cruz',
  at: 'Antiguo Testamento',
  salmo: 'Salmo',
  otra: 'Lectura',
};

/** En la Liturgia se leen la Epístola y el Evangelio; lo demás es de otros oficios. */
export const LITURGY_KINDS: ReadingKind[] = ['epistola', 'evangelio'];

export const readingLabel = (kind: ReadingKind) => READING_LABELS[kind] ?? 'Lectura';

// Algunas llegan con un espacio de anchura cero delante del rótulo.
const COMPUESTA = /^\u200b?Composite \d+ - /;

/** Las lecturas de Vísperas hechas de varios pasajes, que el leccionario de origen marca así. */
export const isComposite = (reference: string) => COMPUESTA.test(reference);

/**
 * La referencia tal como se enseña.
 *
 * Un puñado de referencias del leccionario de origen llegan a medio
 * traducir: con un rótulo interno —«Composite 2 - …»—, con los libros de los
 * Reyes en inglés («3 [1] Kings»), con «Matt», o con punto o dos puntos entre
 * capítulo y versículo. Se enseñan como las demás: «1 Reyes 17, 8-24».
 */
export function readingTitle(reference: string): string {
  return reference
    .replace(COMPUESTA, '')
    .replace(/\b3 ?\[1\] Kings\b/g, '1 Reyes')
    .replace(/\b4 ?\[2\] Kings\b/g, '2 Reyes')
    .replace(/\bMatt\b/g, 'Mateo')
    .replace(/ with verses\b/g, ', con sus versículos')
    .replace(/(\d+)[.:](\d+)-(\d+)[.:](\d+)/g, '$1, $2 – $3, $4')
    .replace(/(\d+)[.:](\d+)/g, '$1, $2')
    .replace(/,(?=\d)/g, ', ');
}

/** Las de la Liturgia primero, en su orden; después las de los demás oficios. */
export function splitReadings(readings: ReadingRef[]) {
  const liturgia = LITURGY_KINDS.flatMap((k) => readings.filter((r) => r.kind === k));
  const otras = readings.filter((r) => !LITURGY_KINDS.includes(r.kind));
  return { liturgia, otras };
}

/**
 * Las notas de cada lectura, en español.
 *
 * El leccionario de origen es inglés y su traducción quedó a medias: «san
 * John Chrysostom», «domingo anterior a Elevation», «Boris and Gleb». Se
 * traducen aquí, al enseñarlas, y no en los datos, que se regeneran desde la
 * fuente: así la próxima actualización del leccionario no las deshace.
 */
const NOTAS: Array<[RegExp, string]> = [
  // Notas enteras, primero: las que no se resuelven palabra por palabra.
  [/^either Saint$/, 'de uno de los santos del día'],
  [/^Church$/, 'la Dedicación del templo'],
  [/^Image$/, 'la Imagen no hecha por mano'],
  [/^Earthquake$/, 'el terremoto de Constantinopla'],
  [/^Hierarchs$/, 'los Tres Jerarcas'],
  [/^Forefathers$/, 'los Antepasados de Cristo'],
  [/^Cross$/, 'la Cruz'],
  [/^Protection$/, 'la Protección de la Theotokos'],
  [/^New Year$/, 'el año nuevo eclesiástico'],
  [/^Presanctified$/, 'Presantificados'],
  [/^Vespers$/, 'Vísperas'],
  [/^Boris and Gleb$/, 'los santos Borís y Gleb'],
  [/^(At the )?Blessing of Waters$/i, 'en la bendición de las aguas'],
  [/^New los mártires$/, 'los nuevos mártires'],
  [/^los difuntos, variant$/, 'los difuntos (otra lectura)'],
  [/^Athanasius$/, 'san Atanasio'],
  [/^Sergius$/, 'san Sergio'],
  [/^san Anna$/, 'santa Ana'],
  [/^san Mary$/, 'santa María Egipciaca'],
  // Después, palabra por palabra.
  [/\bEve of\b/g, 'víspera de'],
  [/\bElevation\b/g, 'la Exaltación de la Cruz'],
  [/\band\b/g, 'y'],
  [/\bel profeta Elijah\b/g, 'el profeta Elías'],
  [/\bJohn Chrysostom\b/g, 'Juan Crisóstomo'],
  [/\bJohn Kochurov\b/g, 'Juan Kochúrov'],
  [/\bTikhon\b/g, 'Tijón'],
  [/\bInnocent\b/g, 'Inocencio'],
  [/\bJohn\b/g, 'Juan'],
  [/\bsan James\b/g, 'Santiago'],
  [/\bTheodosius\b/g, 'Teodosio'],
  [/\bGeorge\b/g, 'Jorge'],
  [/\bMark\b/g, 'Marcos'],
  [/\bRaphael\b/g, 'Rafael'],
  [/\bVladimir\b/g, 'Vladímir'],
  [/\bAnthony\b/g, 'Antonio'],
  [/\bSeraphim\b/g, 'Serafín'],
  [/\bSimeon\b/g, 'Simeón'],
  [/\bHerman\b/g, 'Germán'],
  [/\bAlexander\b/g, 'Alejandro'],
  [/\bGregory\b/g, 'Gregorio'],
  [/\bEuthymius\b/g, 'Eutimio'],
  [/\bJude\b/g, 'Judas'],
  [/\bJacob\b/g, 'Jacobo'],
  [/\bPanteleimon\b/g, 'Panteleimón'],
  [/\bSergius\b/g, 'Sergio'],
  [/\bChariton\b/g, 'Caritón'],
  [/\bLuke\b/g, 'Lucas'],
  [/\bDemetrius\b/g, 'Demetrio'],
  [/\bPhilip\b/g, 'Felipe'],
  [/\bMatthew\b/g, 'Mateo'],
  [/\bAndrew\b/g, 'Andrés'],
  [/\bNicholas\b/g, 'Nicolás'],
  [/\bStephen\b/g, 'Esteban'],
  [/\bSabbas\b/g, 'Sabas'],
  [/\bBasil\b/g, 'Basilio'],
  [/\bTheodore\b/g, 'Teodoro'],
];

export function readingNote(note: string): string {
  let salida = note;
  for (const [patron, sustituto] of NOTAS) salida = salida.replace(patron, sustituto);
  return salida;
}
