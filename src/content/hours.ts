/**
 * Los tres oficios del día.
 *
 * ATHOS propone tres momentos: mañana, mediodía y noche. La estructura de cada
 * uno es la del Horologion —el orden de las oraciones y los salmos que
 * corresponden a cada hora son datos documentados—, y los textos son los que
 * ATHOS ha podido verificar. Lo que falta se marca como pendiente, nunca se
 * rellena con una redacción propia.
 *
 * El del mediodía sigue la Hora Sexta, que se reza a las doce en memoria de la
 * Crucifixión; el de la noche, las Pequeñas Completas. Cada usuario puede
 * cambiar, quitar y añadir pasos: esto es un punto de partida, no una regla
 * impuesta.
 */
import type { RuleTime, SourceMeta, TextBlock } from '@/types';
import { GREEK_FORMULAS as G } from './greek';

const meta: SourceMeta = {
  source: 'Horologion bizantino: oraciones iniciales, Hora Sexta y Pequeñas Completas',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  copyright: 'Textos litúrgicos tradicionales, de dominio público en su original griego.',
  dateAdded: '2026-01-01',
};

/* ---------------- Utilidades de bloque ---------------- */

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const pending = (que: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${que}`,
});

/** Fórmula con su griego y su transliteración. */
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});

/* ============================================================
   Piezas comunes del comienzo y del final
   ============================================================ */

export const COMIENZO: TextBlock[] = [
  rub('Haz la señal de la Cruz y guarda un momento de silencio hasta que se aquieten los sentidos.'),
  t('En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.'),
  gr('doxaSi'),
];

export const TRISAGIO: TextBlock[] = [
  head('Oración al Espíritu Santo'),
  gr('basileuOuranie'),
  rub('Desde Pascua hasta la Ascensión, en su lugar se dice tres veces «Cristo ha resucitado». Entre la Ascensión y Pentecostés se omite.'),
  head('Trisagio'),
  gr('trisagion', 3),
  gr('doxa'),
  gr('panagiaTrias'),
  gr('kyrie', 3),
  gr('doxa'),
  head('Oración del Señor'),
  gr('paterImon'),
  rub('Y la conclusión: Porque tuyo es el reino, y el poder, y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
];

export const INVITATORIO: TextBlock[] = [head('Invitatorio'), gr('deute')];

export const DESPEDIDA: TextBlock[] = [head('Despedida'), gr('apolysis')];

/* ============================================================
   Definición de los tres oficios
   ============================================================ */

export type StepKind =
  | 'texto'
  | 'prayer'
  | 'psalm'
  | 'jesus-prayer'
  | 'komboskini'
  | 'rubrica';

export interface OfficeStepSeed {
  id: string;
  title: string;
  kind: StepKind;
  /** Bloques propios, cuando el paso trae su texto. */
  blocks?: TextBlock[];
  /** Oración de la biblioteca. */
  prayerId?: string;
  /** Salmo, en numeración de los Setenta. */
  psalm?: number;
  /** Repeticiones sugeridas de la oración de Jesús o nudos del komboskini. */
  target?: number;
  note?: string;
}

export interface DailyOfficeSeed {
  time: RuleTime;
  name: string;
  greekName: string;
  subtitle: string;
  /** Franja horaria en que ATHOS lo propone, en horas locales. */
  window: [number, number];
  description: string;
  steps: OfficeStepSeed[];
}

export const DAILY_OFFICES: DailyOfficeSeed[] = [
  /* ---------------------------------------------------------------- */
  {
    time: 'manana',
    name: 'Oficio de la mañana',
    greekName: 'Ἑωθιναὶ Προσευχαί',
    subtitle: 'Al levantarse, antes de cualquier otra cosa',
    window: [4, 12],
    description:
      'Las oraciones matutinas del libro de oración: el comienzo habitual, el salmo del arrepentimiento, el Símbolo de la Fe y las súplicas de los Padres para empezar el día.',
    steps: [
      { id: 'm-inicio', title: 'Señal de la Cruz y silencio', kind: 'texto', blocks: COMIENZO },
      { id: 'm-trisagio', title: 'Comienzo habitual', kind: 'texto', blocks: TRISAGIO },
      { id: 'm-kyrie', title: 'Señor, ten piedad', kind: 'texto', blocks: [gr('kyrie', 12), gr('doxa')] },
      { id: 'm-invitatorio', title: 'Venid, adoremos', kind: 'texto', blocks: INVITATORIO },
      { id: 'm-despertar', title: 'Al levantarse del sueño', kind: 'prayer', prayerId: 'al-despertar' },
      { id: 'm-macario', title: 'Oración de san Macario', kind: 'prayer', prayerId: 'macario-primera' },
      { id: 'm-salmo50', title: 'Salmo 50', kind: 'psalm', psalm: 50, note: 'El salmo del arrepentimiento, que se dice cada mañana.' },
      { id: 'm-credo', title: 'Símbolo de la Fe', kind: 'prayer', prayerId: 'simbolo-de-la-fe' },
      { id: 'm-filareto', title: 'Oración para el día que empieza', kind: 'prayer', prayerId: 'filareto' },
      { id: 'm-angel', title: 'Al Ángel de la Guarda', kind: 'prayer', prayerId: 'angel-guarda-manana' },
      { id: 'm-jesus', title: 'Oración de Jesús', kind: 'jesus-prayer', target: 33 },
      {
        id: 'm-conmemoracion',
        title: 'Conmemoración de los vivos y los difuntos',
        kind: 'rubrica',
        blocks: [
          rub('Nombra aquí, en silencio, a los tuyos.'),
          t('Acuérdate, Señor, de mis padres, hermanos, amigos y bienhechores, y de todos los que me han pedido que rece por ellos.'),
          t('Acuérdate, Señor, de tus siervos que se han dormido, y perdónales todo pecado voluntario e involuntario.'),
        ],
      },
      { id: 'm-entrega', title: 'Entrega del día', kind: 'prayer', prayerId: 'entrega-del-dia' },
      { id: 'm-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    time: 'mediodia',
    name: 'Oficio del mediodía',
    greekName: 'Ὥρα Ἕκτη',
    subtitle: 'La Hora Sexta, cuando el Señor fue crucificado',
    window: [12, 17],
    description:
      'A las doce del día se reza la Hora Sexta, en memoria de la Crucifixión. Sus tres salmos —53, 54 y 90— son los que fija el Horologion. Es un oficio breve, pensado para hacerse un hueco en mitad de la jornada.',
    steps: [
      { id: 'd-inicio', title: 'Comienzo', kind: 'texto', blocks: [...COMIENZO, ...INVITATORIO] },
      { id: 'd-salmo53', title: 'Salmo 53', kind: 'psalm', psalm: 53 },
      { id: 'd-salmo54', title: 'Salmo 54', kind: 'psalm', psalm: 54 },
      { id: 'd-salmo90', title: 'Salmo 90', kind: 'psalm', psalm: 90 },
      { id: 'd-gloria', title: 'Gloria', kind: 'texto', blocks: [gr('doxa'), t('Aleluya, aleluya, aleluya. Gloria a Ti, oh Dios. <em>(tres veces)</em>')] },
      {
        id: 'd-tropario',
        title: 'Tropario de la Hora Sexta',
        kind: 'texto',
        blocks: [
          rub('El Typikon señala aquí el tropario y el theotokion propios de la hora.'),
          pending('el tropario y el theotokion de la Hora Sexta en español.'),
        ],
      },
      { id: 'd-trisagio', title: 'Trisagio y Padre Nuestro', kind: 'texto', blocks: TRISAGIO },
      { id: 'd-kyrie', title: 'Señor, ten piedad', kind: 'texto', blocks: [rub('Cuarenta veces, sin prisa.'), gr('kyrie', 40)] },
      {
        id: 'd-toda-hora',
        title: 'Oración de las Horas',
        kind: 'texto',
        blocks: [
          t('Tú que en todo tiempo y a toda hora, en el cielo y en la tierra, eres adorado y glorificado, Cristo Dios, longánime, de gran misericordia y gran compasión, que amas a los justos y te apiadas de los pecadores, que a todos llamas a la salvación por la promesa de los bienes futuros: recibe, Señor, en esta hora nuestras súplicas y endereza nuestra vida hacia tus mandamientos. Santifica nuestras almas, purifica nuestros cuerpos, endereza nuestros pensamientos, limpia nuestras intenciones y líbranos de toda tribulación, mal y dolor. Rodéanos con tus santos ángeles, para que, guardados y guiados por ellos, alcancemos la unidad de la fe y el conocimiento de tu gloria inaccesible, porque bendito eres por los siglos de los siglos. Amén.'),
        ],
        note: 'Se dice en todas las Horas del día.',
      },
      { id: 'd-jesus', title: 'Oración de Jesús', kind: 'jesus-prayer', target: 12 },
      { id: 'd-trabajo', title: 'Por el trabajo del día', kind: 'prayer', prayerId: 'antes-de-trabajar' },
      { id: 'd-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    time: 'noche',
    name: 'Oficio de la noche',
    greekName: 'Μικρὸν Ἀπόδειπνον',
    subtitle: 'Las Pequeñas Completas, antes del descanso',
    window: [17, 4],
    description:
      'Las Pequeñas Completas se rezan después de la cena, al cerrar la jornada. Sus salmos —50, 69 y 142— son los del Horologion. Se añaden el examen del día y las oraciones nocturnas del libro de oración.',
    steps: [
      { id: 'n-inicio', title: 'Comienzo', kind: 'texto', blocks: [...COMIENZO, ...INVITATORIO] },
      { id: 'n-examen', title: 'Examen del día', kind: 'prayer', prayerId: 'examen-del-dia' },
      { id: 'n-salmo50', title: 'Salmo 50', kind: 'psalm', psalm: 50 },
      { id: 'n-salmo69', title: 'Salmo 69', kind: 'psalm', psalm: 69 },
      { id: 'n-salmo142', title: 'Salmo 142', kind: 'psalm', psalm: 142 },
      { id: 'n-trisagio', title: 'Trisagio y Padre Nuestro', kind: 'texto', blocks: TRISAGIO },
      { id: 'n-credo', title: 'Símbolo de la Fe', kind: 'prayer', prayerId: 'simbolo-de-la-fe' },
      { id: 'n-axion', title: 'Digno es en verdad', kind: 'texto', blocks: [gr('axionEstin')] },
      { id: 'n-damasceno', title: 'Oración antes del sueño', kind: 'prayer', prayerId: 'damasceno-noche' },
      { id: 'n-perdon', title: 'Perdón antes de dormir', kind: 'prayer', prayerId: 'perdon-nocturno' },
      { id: 'n-theotokos', title: 'A la Santísima Theotokos', kind: 'texto', blocks: [gr('theotokeParthene')] },
      { id: 'n-simeon', title: 'Cántico de san Simeón', kind: 'prayer', prayerId: 'simeon-noche' },
      { id: 'n-jesus', title: 'Oración de Jesús', kind: 'jesus-prayer', target: 12 },
      { id: 'n-acostarse', title: 'Al acostarse', kind: 'prayer', prayerId: 'oracion-final-noche' },
      { id: 'n-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
    ],
  },
];

export const OFFICE_BY_TIME = new Map(DAILY_OFFICES.map((o) => [o.time, o]));

export const DAILY_OFFICE_META = meta;

/** Oficio que corresponde a una hora del día. */
export function officeForHour(hour: number): DailyOfficeSeed {
  for (const oficio of DAILY_OFFICES) {
    const [desde, hasta] = oficio.window;
    // La franja de la noche cruza la medianoche.
    const dentro = desde < hasta ? hour >= desde && hour < hasta : hour >= desde || hour < hasta;
    if (dentro) return oficio;
  }
  return DAILY_OFFICES[0];
}

export const OFFICES_STRUCTURE_NOTE =
  'La estructura de cada oficio es la del Horologion: el orden de las oraciones y los salmos ' +
  'de cada hora están documentados. Los textos son los que ATHOS ha podido verificar; lo que ' +
  'falta figura como pendiente. Puedes cambiar, quitar y añadir pasos: esto es un punto de ' +
  'partida, no una regla impuesta.';
