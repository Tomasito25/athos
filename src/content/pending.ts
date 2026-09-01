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
import { BIBLE_BOOKS } from './bible';
import { AKATHISTS, CANONS } from './hymns';
import { CHURCH_FATHERS } from './fathers';
import { OFFICES } from './offices';
import { PRAYERS } from './prayers';
import { SAINTS } from './saints';

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
    count: SAINTS.length,
    kind: 'propio',
    what: 'El tropario y el kontakion propios de cada conmemoración. Ninguna ficha se queda muda: se muestra el tropario general de su rango, y las grandes fiestas llevan el suyo.',
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
    what: 'El Akáthistos a la Theotokos está entero: las veinticuatro estrofas con sus ciento cuarenta y cuatro saludos, traducidas del griego. De los otros cuatro están el proimion, los estribillos y la forma, que es con lo que se sigue el himno cuando lo canta otro; sus estrofas siguen pendientes.',
  },
  {
    label: 'Cánones',
    count: sinTexto(CANONS),
    kind: 'extension',
    what: 'El Canon Pascual está entero. De los otros cuatro están los irmoi de las nueve odas, los kontakia y los estribillos, que es la parte fija y con la que se canta. Los troparios que van entre irmos e irmos siguen pendientes: el Gran Canon tiene doscientos cincuenta.',
  },
  {
    label: 'Propios de los oficios',
    count: sinTexto(OFFICES),
    kind: 'propio',
    what: 'Los diez oficios tienen ya su estructura, sus salmos y las partes que canta el pueblo. Lo que falta en cada uno es lo variable: los troparios del día, que se toman del Menaion, del Octoecos y del Triodion.',
  },
  {
    label: 'Libros deuterocanónicos',
    count: BIBLE_BOOKS.filter((b) => b.status === 'pending').length,
    kind: 'licencia',
    what: 'Tobías, Judit, Sabiduría, Eclesiástico, Baruc y los Macabeos, entre otros. La ficha de cada uno está y aparece en el índice, para que el canon ortodoxo se vea completo; lo que falta es el texto.',
  },
  {
    label: 'Oraciones',
    count: sinTexto(PRAYERS),
    kind: 'licencia',
    what: 'Cinco fichas remiten a un canon o a un akathistos que todavía no tiene texto. Ninguna oración del libro de oración diario está pendiente.',
  },
];

export const PENDING_NOTE =
  'Nada de lo que falta falta por descuido. ATHOS incorpora un texto litúrgico cuando puede ' +
  'hacerlo de una de estas tres maneras: recogiendo una versión española de uso corriente, ' +
  'traduciendo el original griego —que es de dominio público— y diciendo que la traducción es ' +
  'suya, o dejando la ficha con la explicación de qué falta. Lo que no hace, y no va a hacer, es ' +
  'escribir un himno y presentarlo como de la Iglesia. ' +
  'Por eso ninguna de estas cuentas llegará nunca a cero de golpe: bajan cuando alguien traduce, ' +
  'y traducir doscientas cincuenta estrofas lleva lo que lleva.';
