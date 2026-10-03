/**
 * Akathistos y cánones: el índice.
 *
 * Los textos viven en archivos aparte —el Akáthistos a la Theotokos, los
 * otros tres akathistos y cada uno de los cánones largos— porque son extensos
 * y porque cada uno tiene su propia procedencia. Aquí sólo se montan.
 *
 * Todos los originales, griegos o eslavos, son de dominio público y tienen
 * entre tres y quince siglos. Lo que no existe con licencia compatible es una
 * versión española publicada, así que ATHOS la traduce y lo dice en cada
 * ficha. Traducir un texto que existe no es inventarlo; presentarlo como la
 * versión que se canta en las parroquias, sí lo sería.
 *
 * Cada texto se traduce del original, que se consulta entero: el Triodion, el
 * Pentecostario y el Horologion griegos, o el libro de oraciones eslavo. Lo
 * que no se ha podido traducir así queda dicho como pendiente en su ficha.
 */
import type { Akathist, Canon, OfficeSection, SourceMeta } from '@/types';
import { HYMN_ABOUT } from './hymns-about';
import { CANON_DIFUNTO } from './canones-difuntos';
import { AKATHISTOS_META, AKATHISTOS_SECTIONS } from './akathistos-theotokos';
import {
  AKATHISTOS_JESUS,
  AKATHISTOS_NICOLAS,
  AKATHISTOS_PASION,
  akathistMeta,
} from './akathistos-mas';
import {
  CANON_ANGEL,
  CANON_COMUNION,
  CANON_PARACLISIS,
  CANON_PASCUAL,
  GRAN_CANON,
  canonMeta,
  canonMetaEslavo,
} from './canones';




/* ---------------- Akathistos ---------------- */

interface AkathistSeed {
  id: string;
  title: string;
  dedication: string;
  sections: OfficeSection[];
  status: Akathist['status'];
  meta: SourceMeta;
}

const akathistSeeds: AkathistSeed[] = [
  {
    id: 'akathistos-theotokos',
    title: 'Himno Akáthistos a la Santísima Theotokos',
    dedication: 'Theotokos',
    status: 'complete',
    meta: AKATHISTOS_META,
    sections: AKATHISTOS_SECTIONS,
  },
  {
    id: 'akathistos-jesus',
    title: 'Akáthistos al Dulcísimo Señor Jesús',
    dedication: 'Cristo',
    status: 'complete',
    meta: akathistMeta({
      source: 'Libro de oraciones eslavo (edición digital de Azbuka Very, azbyka.ru).',
      notes: 'Está entero: trece kontakia, doce ikos con sus doce invocaciones y la oración final.',
    }),
    sections: AKATHISTOS_JESUS,
  },
  {
    id: 'akathistos-nicolas',
    title: 'Akáthistos a san Nicolás de Mira',
    dedication: 'San Nicolás',
    status: 'complete',
    meta: akathistMeta({
      source: 'Libro de oraciones eslavo (edición digital de Azbuka Very, azbyka.ru).',
      notes: 'Está entero: el tropario del santo, trece kontakia, doce ikos con sus doce saludos y la oración final.',
    }),
    sections: AKATHISTOS_NICOLAS,
  },
  {
    id: 'akathistos-pasion',
    title: 'Akáthistos a la Pasión de Cristo',
    dedication: 'Cristo',
    status: 'complete',
    meta: akathistMeta({
      source: 'Libro de oraciones eslavo, «Акафист Божественным Страстям Христовым» (edición digital de Azbuka Very, azbyka.ru; el texto está también en Wikisource).',
      notes:
        'Está entero: trece kontakia, doce ikos y la oración final. Corrige el estribillo que daba la ficha anterior, que no era el del himno.',
    }),
    sections: AKATHISTOS_PASION,
  },
];

export const AKATHISTS: Akathist[] = akathistSeeds.map((a) => ({
  ...HYMN_ABOUT[a.id],
  ...a,
  searchText: `${a.title} ${a.dedication} ${a.sections
    .flatMap((x) => x.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content))
    .join(' ')}`
    .replace(/<[^>]+>/g, '')
    .toLowerCase(),
}));

/* ---------------- Cánones ---------------- */

interface CanonSeed {
  id: string;
  title: string;
  dedication: string;
  tone?: number;
  odes: OfficeSection[];
  status: Canon['status'];
  meta: SourceMeta;
}

const canonSeeds: CanonSeed[] = [
  {
    id: 'gran-canon-andres',
    title: 'Gran Canon de san Andrés de Creta',
    dedication: 'Arrepentimiento',
    tone: 6,
    status: 'complete',
    meta: canonMeta({
      author: 'San Andrés de Creta († 740)',
      source:
        'Triodion griego, Maitines del jueves de la quinta semana de Cuaresma (edición digital de la Archidiócesis Ortodoxa Griega de América, glt.goarch.org). Se canta partido las cuatro primeras noches de la Gran Cuaresma y entero el jueves de la quinta semana.',
      notes:
        'Está entero, tal como se canta el jueves de la quinta semana: los irmoi y los troparios de las nueve odas, las estrofas de santa María Egipcíaca y de san Andrés, las doxologías y los theotokía, el kontakion con su ikos y las Bienaventuranzas. Son unas doscientas ochenta estrofas.',
    }),
    odes: GRAN_CANON,
  },
  {
    id: 'canon-comunion',
    title: 'Canon de preparación para la Santa Comunión',
    dedication: 'Comunión',
    tone: 2,
    status: 'complete',
    meta: canonMeta({
      source:
        'Akolouthía de la Divina Comunión, del Horologion griego, y Heirmologion (edición digital de la Archidiócesis Ortodoxa Griega de América, glt.goarch.org).',
      notes:
        'Están las ocho odas enteras, con sus irmoi y las veinticinco estrofas del acróstico alfabético, y el kontakion. El estribillo que se daba antes, «Jesús dulcísimo, sálvame», era el de otro canon y se ha corregido.',
    }),
    odes: CANON_COMUNION,
  },
  {
    id: 'canon-angel',
    title: 'Canon al Ángel de la Guarda',
    dedication: 'Ángel custodio',
    tone: 8,
    status: 'complete',
    meta: canonMetaEslavo({
      source:
        'Libro de oraciones eslavo, oficio de preparación para la Comunión (edición digital de Azbuka Very, azbyka.ru).',
      notes:
        'Está entero: el tropario, las ocho odas con sus irmoi y estrofas, el sedalen, el kontakion con su ikos y la oración con que se cierra.',
    }),
    odes: CANON_ANGEL,
  },
  {
    id: 'canon-theotokos-paraclisis',
    title: 'Canon de la Pequeña Paráclesis',
    dedication: 'Theotokos',
    tone: 8,
    status: 'complete',
    meta: canonMeta({
      author: 'Teosteriktos el Monje (siglo IX)',
      source:
        'Horologion griego (edición digital de la Archidiócesis Ortodoxa Griega de América, glt.goarch.org). Se canta las dos primeras semanas de agosto y en cualquier momento de aflicción.',
      notes:
        'Están las ocho odas enteras, con sus irmoi, troparios, doxologías y theotokía, y el kontakion. Los irmoi son los del libro griego. El oficio completo del que forma parte está en Oficios → Paráclesis a la Theotokos.',
    }),
    odes: CANON_PARACLISIS,
  },
  {
    id: 'canon-pascual',
    title: 'Canon Pascual',
    dedication: 'Pascua',
    tone: 1,
    status: 'complete',
    meta: canonMeta({
      author: 'San Juan Damasceno',
      source:
        'Pentecostario griego, Maitines de Pascua (edición digital de la Archidiócesis Ortodoxa Griega de América, glt.goarch.org). Se canta en los Maitines de Pascua y toda la Semana Radiante.',
      notes:
        'Está entero: los irmoi y los troparios de las ocho odas —el canon festivo no tiene segunda—, la hipakoí, el kontakion con su ikos, la novena oda con sus megalinarios y el exapostilario. Hasta la versión 1.25 la ficha sólo traía los irmoi.',
    }),
    odes: CANON_PASCUAL,
  },
  {
    id: 'canon-difuntos',
    title: 'Canon por un difunto',
    dedication: 'Difuntos',
    tone: 8,
    status: 'complete',
    meta: canonMetaEslavo({
      source: 'Libro de oraciones eslavo, «Канон за единоумершего» (edición digital de Azbuka Very, azbyka.ru).',
      notes:
        'Está entero: los salmos y el tropario del comienzo, las ocho odas, el sedalen, el kontakion con su ikos y las oraciones finales. Sustituye al «akathistos por los difuntos», que ATHOS ha retirado porque la Iglesia no lo aprueba.',
    }),
    odes: CANON_DIFUNTO,
  },
];

export const CANONS: Canon[] = canonSeeds.map((c) => ({
  ...HYMN_ABOUT[c.id],
  ...c,
  searchText: `${c.title} ${c.dedication} ${c.odes
    .flatMap((x) => x.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content))
    .join(' ')}`
    .replace(/<[^>]+>/g, '')
    .toLowerCase(),
}));

export const HYMNS_NOTE =
  'El Akáthistos a la Theotokos, el Canon Pascual, el Gran Canon, la Paráclesis y el canon ' +
  'de la Comunión están enteros, traducidos del griego para ATHOS. De los demás está lo que se ' +
  'ha podido traducir del original, y lo que falta queda dicho en cada ficha. ' +
  'Los himnos marcados como pendientes conservan su ficha completa. ATHOS prefiere una ficha ' +
  'honesta a un texto aproximado.';
