/**
 * Akathistos y cánones: el índice.
 *
 * Los textos viven en tres archivos aparte —el Akáthistos a la Theotokos, los
 * otros cuatro akathistos y los cinco cánones— porque son largos y porque cada
 * uno tiene su propia procedencia. Aquí sólo se montan.
 *
 * Todos los originales, griegos o eslavos, son de dominio público y tienen
 * entre seis y quince siglos. Lo que no existe con licencia compatible es una
 * versión española publicada, así que ATHOS la traduce y lo dice en cada
 * ficha. Traducir un texto que existe no es inventarlo; presentarlo como la
 * versión que se canta en las parroquias, sí lo sería.
 *
 * Donde ATHOS no puede traducir con seguridad —las veinticuatro estrofas de un
 * akathistos devocional, los doscientos cincuenta troparios del Gran Canon—,
 * se incorpora lo que sí se sabe y el resto queda dicho como pendiente. Media
 * verdad rellenada con aproximaciones sería un himno inventado.
 */
import type { Akathist, Canon, OfficeSection, SourceMeta } from '@/types';
import { HYMN_ABOUT } from './hymns-about';
import { AKATHISTOS_META, AKATHISTOS_SECTIONS } from './akathistos-theotokos';
import {
  AKATHISTOS_DIFUNTOS,
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
    status: 'partial',
    meta: akathistMeta({
      source: 'Himno de los siglos XIV-XV, del ambiente hesicasta.',
      notes: 'Están el proimion, los estribillos, el primer kontakion y la oración final; las veinticuatro estrofas siguen pendientes.',
    }),
    sections: AKATHISTOS_JESUS,
  },
  {
    id: 'akathistos-nicolas',
    title: 'Akáthistos a san Nicolás de Mira',
    dedication: 'San Nicolás',
    status: 'partial',
    meta: akathistMeta({
      source: 'Himno devocional al taumaturgo de Mira, que se reza los jueves.',
      notes: 'Están los estribillos, la forma del himno y el tropario del santo; las veinticuatro estrofas siguen pendientes.',
    }),
    sections: AKATHISTOS_NICOLAS,
  },
  {
    id: 'akathistos-difuntos',
    title: 'Akáthistos por los difuntos',
    dedication: 'Difuntos',
    status: 'partial',
    meta: akathistMeta({
      source: 'Himno devocional de origen ruso, que se reza en casa por un difunto.',
      notes: 'Están los estribillos y el kontakion del funeral; las veinticuatro estrofas siguen pendientes.',
    }),
    sections: AKATHISTOS_DIFUNTOS,
  },
  {
    id: 'akathistos-pasion',
    title: 'Akáthistos a la Pasión de Cristo',
    dedication: 'Cristo',
    status: 'partial',
    meta: akathistMeta({
      source: 'Himno que se reza en Cuaresma y en la Semana Santa.',
      notes: 'Están los estribillos, la forma y el kontakion final; las veinticuatro estrofas siguen pendientes.',
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
    status: 'partial',
    meta: canonMeta({
      author: 'San Andrés de Creta († 740)',
      source:
        'Triodion. Se canta partido las cuatro primeras noches de la Gran Cuaresma y entero el jueves de la quinta semana.',
      notes:
        'Están los irmoi de las nueve odas, el kontakion y la estrofa inicial, que es con lo que se sigue y se canta el canon. Las cerca de doscientas cincuenta estrofas que van entre irmos e irmos siguen pendientes.',
    }),
    odes: GRAN_CANON,
  },
  {
    id: 'canon-comunion',
    title: 'Canon de preparación para la Santa Comunión',
    dedication: 'Comunión',
    tone: 2,
    status: 'partial',
    meta: canonMeta({
      source: 'Del oficio de preparación para la Comunión, en el libro de oraciones.',
      notes: 'Están el estribillo, el irmos de la primera oda y la estrofa final; los troparios de las nueve odas siguen pendientes.',
    }),
    odes: CANON_COMUNION,
  },
  {
    id: 'canon-angel',
    title: 'Canon al Ángel de la Guarda',
    dedication: 'Ángel custodio',
    status: 'partial',
    meta: canonMeta({
      source: 'Del oficio de preparación para la Comunión, en el libro de oraciones.',
      notes: 'Están el estribillo, la oración al ángel —que es lo que se reza también fuera del canon— y el irmos de la primera oda.',
    }),
    odes: CANON_ANGEL,
  },
  {
    id: 'canon-theotokos-paraclisis',
    title: 'Canon de la Pequeña Paráclesis',
    dedication: 'Theotokos',
    tone: 8,
    status: 'partial',
    meta: canonMeta({
      author: 'Teosteriktos el Monje (siglo IX)',
      source: 'Se canta las dos primeras semanas de agosto y en cualquier momento de aflicción.',
      notes: 'Están los irmoi de las ocho odas, el kontakion y el himno final «No callaremos jamás»; los troparios intermedios siguen pendientes.',
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
      source: 'Pentecostario. Se canta en los Maitines de Pascua y toda la Semana Radiante.',
      notes:
        'Están los irmoi de las ocho odas —el canon festivo no tiene segunda—, el kontakion, el megalinario de la novena y el exapostilario, que es el canon entero tal como se canta.',
    }),
    odes: CANON_PASCUAL,
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
  'El Akáthistos a la Theotokos y el Canon Pascual están enteros, traducidos del griego para ' +
  'ATHOS. De los demás está lo que se ha podido traducir con seguridad —los irmoi, los ' +
  'estribillos, los kontakia— y lo que falta queda dicho en cada ficha. ' +
  'Los himnos marcados como pendientes conservan su ficha completa. ATHOS prefiere una ficha ' +
  'honesta a un texto aproximado.';
