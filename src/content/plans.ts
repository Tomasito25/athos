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

export interface PlanDay {
  /** Día 1, 2, 3… */
  number: number;
  /** «Mateo 1–3», «Kathisma 4». */
  label: string;
  /** A dónde lleva. El primer capítulo del día. */
  path: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  /** Para qué sirve y qué exige. */
  about: string;
  days: number;
  /** Cuántas piezas por día, de media. Sale del cálculo, no se escribe. */
  perDay: string;
}

interface PlanSeed {
  id: string;
  title: string;
  subtitle: string;
  about: string;
  days: number;
  /** Ids de libros bíblicos, en orden. */
  books?: string[];
  /** O bien el Salterio, repartido por kathismata. */
  psalter?: boolean;
}

const SEEDS: PlanSeed[] = [
  {
    id: 'evangelios',
    title: 'Los cuatro Evangelios',
    subtitle: 'Un capítulo al día, tres meses',
    about:
      'Ochenta y nueve capítulos, uno cada día. Es por donde conviene empezar si no has leído nunca la Escritura seguida: son cuatro relatos de lo mismo, y leerlos uno detrás de otro enseña más sobre cada uno que leerlos sueltos. Marcos es el más corto y el más rápido; Juan, el más distinto.',
    days: 89,
    books: ['MAT', 'MRK', 'LUK', 'JHN'],
  },
  {
    id: 'nuevo-testamento',
    title: 'El Nuevo Testamento',
    subtitle: 'Un capítulo al día, algo menos de un año',
    about:
      'Doscientos sesenta capítulos en el orden en que están en el libro: los Evangelios, los Hechos, las cartas de san Pablo, las católicas y el Apocalipsis. Un capítulo diario se lee en cinco o diez minutos.',
    days: 260,
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
    psalter: true,
  },
  {
    id: 'biblia-entera',
    title: 'La Biblia entera',
    subtitle: 'Tres o cuatro capítulos al día, un año',
    about:
      'Del Génesis al Apocalipsis en trescientos sesenta y cinco días. Exige constancia y tiene tramos áridos —el Levítico, las genealogías, los profetas menores—, y precisamente por eso conviene saber antes de empezar que el mérito no está en terminarlo. Si un año es demasiado, empieza por los Evangelios.',
    days: 365,
    books: BIBLE_BOOKS.filter((b) => !b.deuterocanonical).map((b) => b.id),
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

/**
 * Los días de un plan.
 *
 * El reparto usa `Math.floor(i * total / dias)`: da tramos que difieren como
 * mucho en un capítulo entre sí, y no deja ningún día vacío mientras haya al
 * menos tantos capítulos como días.
 */
export function daysOf(planId: string): PlanDay[] {
  const seed = SEEDS.find((p) => p.id === planId);
  if (!seed) return [];

  if (seed.psalter) {
    return KATHISMATA.map((k, i) => ({
      number: i + 1,
      label: `Kathisma ${k.number}`,
      path: `/leer/salterio/kathisma/${k.number}`,
    }));
  }

  const capitulos = capitulosDe(seed.books ?? []);
  const dias: PlanDay[] = [];
  for (let i = 0; i < seed.days; i += 1) {
    const desde = Math.floor((i * capitulos.length) / seed.days);
    const hasta = Math.floor(((i + 1) * capitulos.length) / seed.days);
    const tramo = capitulos.slice(desde, hasta);
    if (tramo.length === 0) continue;
    dias.push({
      number: dias.length + 1,
      label: nombrarTramo(tramo),
      path: `/leer/biblia/${tramo[0].bookId}/${tramo[0].chapter}`,
    });
  }
  return dias;
}

export const READING_PLANS: ReadingPlan[] = SEEDS.map((seed) => {
  const dias = daysOf(seed.id);
  const piezas = seed.psalter
    ? 'una kathisma'
    : (() => {
        const total = capitulosDe(seed.books ?? []).length;
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
  };
});

export const PLANS_NOTE =
  'Estos planes los propone ATHOS y no son la lectura de la Iglesia: el leccionario, que es lo ' +
  'que se lee en la Liturgia, está en Leer → Lecturas del día y sigue el año litúrgico. Un plan ' +
  'es para leer seguido por tu cuenta, que es otra cosa y también hace falta. Empezar tarde, ' +
  'saltarse días y volver no invalida nada: no hay marcador que rendir a nadie.';
