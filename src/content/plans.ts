/**
 * Planes de lectura.
 *
 * La Escritura entera está en ATHOS desde el principio, y aun así abrirla es
 * difícil: mil ciento ochenta y nueve capítulos no se empiezan un martes por
 * la tarde. Un plan convierte eso en «hoy toca esto», que es una decisión
 * mucho más pequeña.
 *
 * Los días no se escriben a mano: se calculan repartiendo los capítulos del
 * plan entre los días que dura, de la manera más pareja posible y sin partir
 * ningún capítulo. Así un plan son cuatro líneas de definición en vez de
 * trescientas sesenta y cinco, y cambiar su duración es cambiar un número.
 *
 * Ninguno de estos planes es una obligación de la Iglesia. La Iglesia tiene su
 * propio ciclo de lecturas —el leccionario, que ATHOS trae en Leer → Lecturas
 * del día— y eso es lo que se lee en la Liturgia. Esto es otra cosa: leer
 * seguido por tu cuenta, que también hace falta.
 */
import { BIBLE_BOOKS } from './bible';
import { KATHISMATA } from './psalter';

/** Una pieza de un día: un capítulo de la Escritura o una kathisma entera. */
export type PlanPiece =
  | { kind: 'chapter'; bookId: string; chapter: number }
  | { kind: 'kathisma'; number: number };

export interface PlanDay {
  /** Día 1, 2, 3… */
  number: number;
  /** «Mateo 1–3», «Kathisma 4». */
  label: string;
  /** A dónde lleva: el día entero, para leerlo seguido. */
  path: string;
  /** Lo que se lee ese día, en orden. */
  pieces: PlanPiece[];
}

/** Cómo se agrupan los planes en la lista. */
export type PlanGroup = 'empezar' | 'nuevo' | 'antiguo' | 'entera' | 'salterio';

export const PLAN_GROUPS: Record<PlanGroup, string> = {
  empezar: 'Para empezar',
  nuevo: 'Nuevo Testamento',
  antiguo: 'Antiguo Testamento',
  entera: 'Toda la Escritura',
  salterio: 'El Salterio',
};

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  /** Para qué sirve y qué exige. */
  about: string;
  days: number;
  /** Cuántas piezas por día, de media. Sale del cálculo, no se escribe. */
  perDay: string;
  group: PlanGroup;
  /** Cuántas lecturas a la vez lleva cada día: una, o dos o tres seguidas en paralelo. */
  tracks: number;
}

interface PlanSeed {
  id: string;
  title: string;
  subtitle: string;
  about: string;
  days: number;
  group: PlanGroup;
  /** Ids de libros bíblicos, en orden. */
  books?: string[];
  /**
   * O bien varias lecturas en paralelo: cada una se reparte por su cuenta
   * entre los mismos días, y cada día lleva un tramo de cada una.
   */
  tracks?: string[][];
  /** O bien el Salterio, repartido por kathismata. */
  psalter?: boolean;
}

/**
 * El Antiguo Testamento como lo lee la Iglesia ortodoxa: con los libros de la
 * Biblia griega, y Ester y Daniel en su texto griego, que son los que se leen
 * en el culto. Fuera queda 4 Macabeos, que las Biblias griegas imprimen como
 * apéndice.
 */
const AT_ORTODOXO = BIBLE_BOOKS.filter(
  (b) => b.testament === 'at' && !['EST', 'DAN', '4MA'].includes(b.id),
).map((b) => b.id);

const NT_LIBROS = BIBLE_BOOKS.filter((b) => b.testament === 'nt').map((b) => b.id);

const SEEDS: PlanSeed[] = [
  {
    id: 'evangelios',
    title: 'Los cuatro Evangelios',
    subtitle: 'Un capítulo al día, tres meses',
    about:
      'Ochenta y nueve capítulos, uno cada día. Es por donde conviene empezar si no has leído nunca la Escritura seguida: son cuatro relatos de lo mismo, y leerlos uno detrás de otro enseña más sobre cada uno que leerlos sueltos. Marcos es el más corto y el más rápido; Juan, el más distinto.',
    days: 89,
    group: 'empezar',
    books: ['MAT', 'MRK', 'LUK', 'JHN'],
  },
  {
    id: 'nuevo-testamento',
    title: 'El Nuevo Testamento',
    subtitle: 'Un capítulo al día, algo menos de un año',
    about:
      'Doscientos sesenta capítulos en el orden en que están en el libro: los Evangelios, los Hechos, las cartas de san Pablo, las católicas y el Apocalipsis. Un capítulo diario se lee en cinco o diez minutos.',
    days: 260,
    group: 'nuevo',
    books: [
      'MAT', 'MRK', 'LUK', 'JHN', 'ACT',
      'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH',
      '1TI', '2TI', 'TIT', 'PHM', 'HEB',
      'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV',
    ],
  },
  {
    id: 'salterio-veinte-dias',
    title: 'El Salterio',
    subtitle: 'Una kathisma al día, veinte días',
    about:
      'Los ciento cincuenta salmos repartidos en las veinte kathismata en que los divide la Iglesia, una cada día. En los monasterios el Salterio entero se reza en una semana, y en Cuaresma en dos; veinte días es un ritmo que sostiene alguien que trabaja. Al terminar se vuelve a empezar: así se ha rezado siempre.',
    days: 20,
    group: 'salterio',
    psalter: true,
  },
  {
    id: 'biblia-entera',
    title: 'La Biblia entera',
    subtitle: 'Tres o cuatro capítulos al día, un año',
    about:
      'Del Génesis al Apocalipsis en trescientos sesenta y cinco días. Exige constancia y tiene tramos áridos —el Levítico, las genealogías, los profetas menores—, y precisamente por eso conviene saber antes de empezar que el mérito no está en terminarlo. Si un año es demasiado, empieza por los Evangelios.',
    days: 365,
    group: 'entera',
    books: BIBLE_BOOKS.filter((b) => !b.deuterocanonical).map((b) => b.id),
  },

  /* ---- Añadidos en la 1.30 ---- */
  {
    id: 'juan-21',
    title: 'El Evangelio de san Juan',
    subtitle: 'Un capítulo al día, tres semanas',
    about:
      'Veintiún capítulos en veintiún días. Es el Evangelio que la Iglesia empieza a leer en la Liturgia la noche de Pascua —«En el principio era el Verbo»— y sigue leyendo hasta Pentecostés, y el más hondo de los cuatro. Es un buen primer libro para quien nunca ha leído uno entero.',
    days: 21,
    group: 'empezar',
    books: ['JHN'],
  },
  {
    id: 'proverbios-mes',
    title: 'Proverbios en un mes',
    subtitle: 'Un capítulo cada día del mes',
    about:
      'El libro de los Proverbios tiene treinta y un capítulos: uno por cada día de un mes largo. Son dichos breves sobre la vida de cada día —el trabajo, la lengua, el dinero, la amistad—, y se leen en cinco minutos. Al acabar el mes se puede volver a empezar.',
    days: 31,
    group: 'empezar',
    books: ['PRO'],
  },
  {
    id: 'hechos-y-cartas',
    title: 'Los Hechos y las cartas',
    subtitle: 'Un capítulo y medio al día, cuatro meses',
    about:
      'Los Hechos de los Apóstoles y todas las cartas, en el orden de la Biblia ortodoxa: después de los Hechos, las cartas de Santiago, Pedro, Juan y Judas, y luego las de san Pablo. Es lo que la Iglesia lee como «Apóstol» en la Liturgia, y conviene haberlo leído seguido alguna vez.',
    days: 120,
    group: 'nuevo',
    books: NT_LIBROS.filter((id) => !['MAT', 'MRK', 'LUK', 'JHN', 'REV'].includes(id)),
  },
  {
    id: 'sabiduria',
    title: 'Los libros de la sabiduría',
    subtitle: 'Dos o tres capítulos al día, dos meses',
    about:
      'Job, Proverbios, Eclesiastés, Sabiduría y Eclesiástico: lo que la Biblia dice sobre el sufrimiento, la prudencia, la vanidad de las cosas y el temor de Dios. Los dos últimos están en la Biblia griega que lee la Iglesia y no en la Reina-Valera; ATHOS los trae de la Biblia libre para el mundo.',
    days: 60,
    group: 'antiguo',
    books: ['JOB', 'PRO', 'ECC', 'WIS', 'SIR'],
  },
  {
    id: 'libros-de-la-cuaresma',
    title: 'Los tres libros de la Cuaresma',
    subtitle: 'Génesis, Isaías y Proverbios a la vez, cuarenta días',
    about:
      'En los días de diario de la Gran Cuaresma la Iglesia lee en las Vísperas el Génesis y los Proverbios, y en la Hora Sexta, Isaías: poco cada día, a trozos. Este plan lee los tres libros enteros, en paralelo, en cuarenta días: cada día un tramo del Génesis y otro de Isaías, y casi todos los días un capítulo de los Proverbios. No es la lectura de la Iglesia, sino una manera de conocer de cerca los libros que ella elige para ese tiempo.',
    days: 40,
    group: 'antiguo',
    tracks: [['GEN'], ['ISA'], ['PRO']],
  },
  {
    id: 'biblia-dos-lecturas',
    title: 'La Biblia en un año, en dos lecturas',
    subtitle: 'Antiguo y Nuevo Testamento a la vez, un año',
    about:
      'Cada día, un tramo del Antiguo Testamento y otro del Nuevo: así no se pasan meses en el Levítico sin leer el Evangelio. El Antiguo va con los libros que lee la Iglesia ortodoxa —Tobías, Judit, la Sabiduría, el Eclesiástico, los Macabeos—, y Ester y Daniel en su texto griego. Son unos cuatro capítulos al día.',
    days: 365,
    group: 'entera',
    tracks: [AT_ORTODOXO, NT_LIBROS],
  },
];

/**
 * El nombre corto de un libro.
 *
 * En una lista de trescientos sesenta y cinco días, «Evangelio según San
 * Mateo 1–3» ocupa media pantalla y no dice más que «Mateo 1–3». Se recorta
 * el encabezamiento de los Evangelios y de los Hechos, que son los únicos
 * títulos largos del canon; el resto ya son cortos.
 */
function nombreCorto(nombre: string): string {
  return nombre
    .replace(/^Evangelio según San /, '')
    .replace(/^Hechos de los Apóstoles$/, 'Hechos')
    .replace(/^Cantar de los Cantares$/, 'Cantares')
    .replace(/^Eclesiástico \(Sirácida\)$/, 'Eclesiástico')
    .replace(/^Sabiduría de Salomón$/, 'Sabiduría');
}

/** Todos los capítulos de un plan, en orden y sin partir ninguno. */
function capitulosDe(ids: string[]): Array<{ bookId: string; name: string; chapter: number }> {
  const salida: Array<{ bookId: string; name: string; chapter: number }> = [];
  for (const id of ids) {
    const libro = BIBLE_BOOKS.find((b) => b.id === id);
    if (!libro) continue;
    for (let c = 1; c <= libro.chapters; c += 1) {
      salida.push({ bookId: libro.id, name: nombreCorto(libro.name), chapter: c });
    }
  }
  return salida;
}

/**
 * Cómo se nombra un tramo.
 *
 * «Mateo 1–3» si es un solo libro; «Malaquías 4 · Mateo 1» si el día cruza de
 * uno a otro, que es lo que hace falta ver de un vistazo.
 */
function nombrarTramo(tramo: Array<{ name: string; chapter: number }>): string {
  const partes: string[] = [];
  let i = 0;
  while (i < tramo.length) {
    const libro = tramo[i].name;
    let j = i;
    while (j + 1 < tramo.length && tramo[j + 1].name === libro) j += 1;
    partes.push(
      tramo[i].chapter === tramo[j].chapter
        ? `${libro} ${tramo[i].chapter}`
        : `${libro} ${tramo[i].chapter}–${tramo[j].chapter}`,
    );
    i = j + 1;
  }
  return partes.join(' · ');
}

/** Reparte unos capítulos entre unos días: tramos parejos, sin partir ninguno. */
function repartir<T>(piezas: T[], dias: number): T[][] {
  return Array.from({ length: dias }, (_, i) =>
    piezas.slice(Math.floor((i * piezas.length) / dias), Math.floor(((i + 1) * piezas.length) / dias)),
  );
}

/**
 * Los días de un plan.
 *
 * El reparto usa `Math.floor(i * total / dias)`: da tramos que difieren como
 * mucho en un capítulo entre sí, y no deja ningún día vacío mientras haya al
 * menos tantos capítulos como días. Con varias lecturas en paralelo, cada una
 * se reparte por su cuenta y el día junta un tramo de cada una.
 *
 * Los planes que ya existían salen exactamente igual que antes: el avance de
 * cada uno se guarda por número de día.
 */
export function daysOf(planId: string): PlanDay[] {
  const seed = SEEDS.find((p) => p.id === planId);
  if (!seed) return [];

  if (seed.psalter) {
    return KATHISMATA.map((k, i) => ({
      number: i + 1,
      label: `Kathisma ${k.number}`,
      path: `/leer/planes/${planId}/dia/${i + 1}`,
      pieces: [{ kind: 'kathisma' as const, number: k.number }],
    }));
  }

  const pistas = (seed.tracks ?? [seed.books ?? []]).map((ids) => repartir(capitulosDe(ids), seed.days));
  const dias: PlanDay[] = [];
  for (let i = 0; i < seed.days; i += 1) {
    const tramos = pistas.map((p) => p[i] ?? []).filter((t) => t.length > 0);
    if (tramos.length === 0) continue;
    const numero = dias.length + 1;
    dias.push({
      number: numero,
      label: tramos.map(nombrarTramo).join(' · '),
      path: `/leer/planes/${planId}/dia/${numero}`,
      pieces: tramos.flat().map((c) => ({ kind: 'chapter' as const, bookId: c.bookId, chapter: c.chapter })),
    });
  }
  return dias;
}

export const READING_PLANS: ReadingPlan[] = SEEDS.map((seed) => {
  const dias = daysOf(seed.id);
  const piezas = seed.psalter
    ? 'una kathisma'
    : (() => {
        const total = (seed.tracks ?? [seed.books ?? []]).reduce((n, ids) => n + capitulosDe(ids).length, 0);
        const media = total / Math.max(dias.length, 1);
        return media < 1.5
          ? 'un capítulo'
          : `${media.toFixed(1).replace('.', ',')} capítulos`;
      })();
  return {
    id: seed.id,
    title: seed.title,
    subtitle: seed.subtitle,
    about: seed.about,
    days: dias.length,
    perDay: piezas,
    group: seed.group,
    tracks: seed.tracks?.length ?? 1,
  };
});

export const PLANS_NOTE =
  'Estos planes los propone ATHOS y no son la lectura de la Iglesia: el leccionario, que es lo ' +
  'que se lee en la Liturgia, está en Leer → Lecturas del día y sigue el año litúrgico. Un plan ' +
  'es para leer seguido por tu cuenta, que es otra cosa y también hace falta. Empezar tarde, ' +
  'saltarse días y volver no invalida nada: no hay marcador que rendir a nadie.';
