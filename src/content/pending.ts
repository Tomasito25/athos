/**
 * Qué falta exactamente, y por qué.
 *
 * La pantalla de Fuentes decía «17 pendientes» y ahí se acababa. Con eso no se
 * puede hacer nada: ni saber si falta mucho o poco, ni si es un descuido o un
 * impedimento, ni qué haría falta para arreglarlo.
 *
 * Esto lo desglosa. Las cuentas salen del contenido, así que el día que se
 * incorpore un texto la lista se acorta sola; y cada hueco dice de qué clase
 * es, porque no todos se arreglan igual.
 */
import { AKATHISTS, CANONS } from './hymns';
import { CHURCH_FATHERS } from './fathers';
import { OFFICES } from './offices';
import { PRAYERS } from './prayers';
import { SAINTS } from './saints';
import { generalTroparionFor } from './troparia-general';
import { SAINT_KONTAKIA } from './kontakia';

/** Por qué falta algo. Es lo que decide si se puede arreglar y cómo. */
export type GapKind =
  | 'licencia' // el texto existe en español, pero la versión disponible tiene derechos
  | 'propio' // hace falta el propio de cada santo o de cada día: son cientos
  | 'extension'; // es un texto largo que hay que traducir entero y con cuidado

export const GAP_KINDS: Record<GapKind, { name: string; note: string }> = {
  licencia: {
    name: 'Falta una versión con licencia compatible',
    note: 'El texto existe y se lee en español, pero las traducciones publicadas tienen derechos vigentes. ATHOS no las copia. Se desbloquea aportando una traducción libre o el permiso de quien la tiene. En el caso de la Escritura, la Reina-Valera 1909 que usa la aplicación es de dominio público pero sigue el canon corto y no trae estos libros.',
  },
  propio: {
    name: 'Son cientos de textos propios',
    note: 'No es un texto que falte, sino uno por cada santo y por cada día del año: es el Menaion entero. ATHOS no los escribe. Mientras tanto se muestra el general del rango, que es lo que la Iglesia canta en ese caso.',
  },
  extension: {
    name: 'Traducción larga, por hacer',
    note: 'El original griego es de dominio público y se puede traducir, como se ha hecho con los troparios generales y con la Oración de Manasés. Son textos extensos y traducirlos deprisa sería peor que no tenerlos.',
  },
};

export interface Gap {
  label: string;
  /** Cuántas piezas. Sale del contenido. */
  count: number;
  kind: GapKind;
  /** Qué es lo que falta, dicho con precisión. */
  what: string;
}

const sinTexto = <T extends { status: string }>(rows: T[]) =>
  rows.filter((r) => r.status !== 'complete').length;

export const GAPS: Gap[] = [
  {
    label: 'Troparios propios de los santos',
    count: SAINTS.filter((s) => !generalTroparionFor(s.category, s.id)?.own).length,
    kind: 'propio',
    what: 'El tropario propio de cada conmemoración. Las grandes fiestas y los santos más venerados ya tienen el suyo, traducido del Menaion griego. Los demás no se quedan mudos: se muestra el tropario general de su rango, que es lo que la Iglesia canta cuando no se dispone del propio.',
  },
  {
    label: 'Kontakia propios de los santos',
    count: SAINTS.filter((s) => !SAINT_KONTAKIA[s.id]).length,
    kind: 'propio',
    what: 'El kontakion propio de cada conmemoración. Lo tienen ya las grandes fiestas y los mismos santos que tienen tropario propio. Para los demás, las Horas dicen el kontakion del día de la semana, que es el que trae el Horologion cuando no hay otro, y la ficha del santo lo explica.',
  },
  {
    label: 'Obras de los Padres',
    count: CHURCH_FATHERS.flatMap((f) => f.works).filter((w) => w.status !== 'complete').length,
    kind: 'extension',
    what: 'Cada obra tiene ya el pasaje por el que se la conoce, traducido del original. Lo que falta es el texto íntegro, que son libros enteros: Contra las herejías tiene cinco tomos y la Escala, treinta escalones. De las obras del siglo XX, con derechos vigentes, sólo cabe la cita.',
  },
  {
    label: 'Akathistos',
    count: sinTexto(AKATHISTS),
    kind: 'extension',
    what: 'Los cuatro akathistos están enteros: el de la Theotokos, traducido del griego, y los del Dulcísimo Jesús, san Nicolás y la Pasión, del eslavo.',
  },
  {
    label: 'Cánones',
    count: sinTexto(CANONS),
    kind: 'extension',
    what: 'Los seis cánones están enteros, con todos sus troparios: el Pascual, el Gran Canon, la Paráclesis, el de la Comunión, el del Ángel de la Guarda y el canon por un difunto.',
  },
  {
    label: 'Propios de los oficios',
    count: sinTexto(OFFICES),
    kind: 'propio',
    what: 'Los oficios están enteros en todo lo que tienen de fijo: las tres Liturgias, Vísperas, Maitines, Completas, Medianoche, las cuatro Horas, el Moleben y la Paráclesis. El tropario y el kontakion del día se eligen según el calendario. Lo que cambia cada día y llena cientos de páginas —las estiqueras y los cánones del Octoecos, del Menaion y del Triodion— se indica en su lugar, con el libro del que se toma.',
  },
  {
    label: 'Oraciones',
    count: sinTexto(PRAYERS),
    kind: 'licencia',
    what: 'Las fichas que remitían a un canon sin texto ya lo tienen. Ninguna oración del libro de oración diario está pendiente.',
  },
];

export const PENDING_NOTE =
  'Nada de lo que falta falta por descuido. ATHOS incorpora un texto litúrgico cuando puede ' +
  'hacerlo de una de estas tres maneras: recogiendo una versión española de uso corriente, ' +
  'traduciendo el original griego —que es de dominio público— y diciendo que la traducción es ' +
  'suya, o dejando la ficha con la explicación de qué falta. Lo que no hace, y no va a hacer, es ' +
  'escribir un himno y presentarlo como de la Iglesia. ' +
  'Por eso ninguna de estas cuentas llegará a cero de golpe: bajan cuando se traduce del original, ' +
  'texto a texto. Así se han completado los cánones y los akathistos.';
