/**
 * El índice de la biblioteca.
 *
 * Nueve tarjetas idénticas no dicen si detrás hay tres páginas o cuatrocientas,
 * ni por dónde conviene empezar. Aquí cada sección declara cuánto tiene y de
 * qué clase es, y las cuentas salen del contenido: si mañana se añaden veinte
 * santos, el número sube solo. Un número escrito a mano se queda viejo el día
 * que alguien añade algo, y entonces miente.
 */
import { AKATHISTS, CANONS } from './hymns';
import { ATHOS_ARTICLES, MONASTERIES } from './athos';
import { CATECHISM_INDEX } from './catechism-parts';
import { CHURCH_FATHERS } from './fathers';
import { COUNCILS, HISTORY_PERIODS } from './history-all';
import { ICONS } from './icons';
import { OFFICES } from './offices';
import { STUDY_COURSES, STUDY_WORKS } from './study';
import es from '@/locales/es';

export interface LibrarySection {
  id: string;
  to: string;
  /** Icono, por su nombre en `components/icons`. */
  icon:
    | 'cross'
    | 'scroll'
    | 'book'
    | 'monastery'
    | 'candle'
    | 'chalice';
  title: string;
  /** Qué hay dentro, en una línea. */
  text: string;
  /** Cuántas piezas. Se calcula del contenido, no se escribe a mano. */
  count: number;
  /** De qué son esas piezas. */
  unit: string;
}

export interface LibraryGroup {
  id: string;
  title: string;
  note: string;
  sections: LibrarySection[];
}

/** Cuántas obras patrísticas hay en fichas, sumando las de todos los Padres. */
const OBRAS_PATRISTICAS = CHURCH_FATHERS.reduce((n, f) => n + f.works.length, 0);

export const LIBRARY_GROUPS: LibraryGroup[] = [
  {
    id: 'entender',
    title: 'Para entender la fe',
    note: 'Si llegas de fuera o llevas poco, empieza por aquí. No hace falta saber nada antes.',
    sections: [
      {
        id: 'catecismo',
        to: '/biblioteca/catecismo',
        icon: 'scroll',
        title: es.catechism.title,
        text: 'Qué cree la Iglesia ortodoxa y por qué, en preguntas con su respuesta. Se filtra según llegues de fuera, seas catecúmeno o lleves años dentro, y se busca por palabra.',
        count: CATECHISM_INDEX.length,
        unit: 'preguntas',
      },
      {
        id: 'historia',
        to: '/biblioteca/historia',
        icon: 'scroll',
        title: es.history.title,
        text: 'De Pentecostés a hoy en ocho épocas, con la ficha de cada Concilio, las rupturas contadas sin vencedores y los conflictos que siguen abiertos.',
        count: COUNCILS.length,
        unit: 'concilios con ficha',
      },
      {
        id: 'estudio',
        to: '/biblioteca/estudio',
        icon: 'book',
        title: es.library.study,
        text: 'Itinerarios con lecciones breves para leer despacio, y el catálogo de las obras que forman la tradición con lo que ATHOS tiene de cada una.',
        count: STUDY_COURSES.length + STUDY_WORKS.length,
        unit: 'lecciones y obras',
      },
    ],
  },
  {
    id: 'rezar',
    title: 'Lo que se reza',
    note: 'Los libros de la Iglesia. Aquí está lo que se canta y lo que se lee en voz alta.',
    sections: [
      {
        id: 'liturgia',
        to: '/biblioteca/liturgia',
        icon: 'cross',
        title: es.library.liturgy,
        text: 'La Liturgia de san Juan Crisóstomo, la de san Basilio, los Presantificados, Vísperas, Maitines y las Horas, cada uno con qué es y cómo está construido.',
        count: OFFICES.length,
        unit: 'oficios',
      },
      {
        id: 'akathistos',
        to: '/biblioteca/akathistos',
        icon: 'scroll',
        title: es.library.akathists,
        text: 'Himnos que se cantan de pie, empezando por el Akáthistos a la Theotokos, el más antiguo y el modelo de todos los demás.',
        count: AKATHISTS.length,
        unit: 'himnos',
      },
      {
        id: 'canones',
        to: '/biblioteca/canones',
        icon: 'scroll',
        title: es.library.canons,
        text: 'El Gran Canon de san Andrés de Creta, el de arrepentimiento, el de preparación para la Comunión y los cánones a los santos.',
        count: CANONS.length,
        unit: 'cánones',
      },
    ],
  },
  {
    id: 'quienes',
    title: 'Quiénes lo dijeron y dónde',
    note: 'Los maestros, los lugares y las imágenes. Es la parte que se puede recorrer sin orden.',
    sections: [
      {
        id: 'padres',
        to: '/biblioteca/padres',
        icon: 'book',
        title: es.library.fathers,
        text: 'De san Ignacio de Antioquía a san Sofronio de Essex, por épocas. De cada uno: qué enseñó, de qué trata cada obra suya, por dónde empezar y qué conviene saber antes.',
        count: CHURCH_FATHERS.length,
        unit: 'Padres',
      },
      {
        id: 'obras',
        to: '/biblioteca/padres',
        icon: 'book',
        title: es.library.works,
        text: 'Cada obra dice de qué trata y cuándo se escribió, tenga texto incorporado o no. Donde falta la traducción, al menos se sabe qué se está echando de menos.',
        count: OBRAS_PATRISTICAS,
        unit: 'obras con ficha',
      },
      {
        id: 'athos',
        to: '/biblioteca/athos',
        icon: 'monastery',
        title: es.library.athos,
        text: 'Los veinte monasterios con lo que son hoy y quién vivió en ellos, y doce artículos: la historia, el gobierno, el ávaton, los sketes, el canto y cómo se llega.',
        count: MONASTERIES.length + ATHOS_ARTICLES.length,
        unit: 'monasterios y artículos',
      },
      {
        id: 'iconos',
        to: '/biblioteca/iconos',
        icon: 'candle',
        title: es.library.icons,
        text: 'Los iconos que la Iglesia venera, qué significa cada elemento y por qué se pintan así y no de otra manera.',
        count: ICONS.length,
        unit: 'iconos',
      },
    ],
  },
];

/** Todas las secciones, sueltas. */
export const LIBRARY_SECTIONS = LIBRARY_GROUPS.flatMap((g) => g.sections);

/** Cuántas épocas de la historia hay escritas; se usa en la portada. */
export const LIBRARY_PERIODS = HISTORY_PERIODS.length;
