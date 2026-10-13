/**
 * Las tres medidas de cada oficio.
 *
 * El oficio de cada día pide un cuarto de hora largo, y quien empieza no
 * suele aguantarlo: lo deja a la semana y se queda sin nada. Por eso cada uno
 * de los tres oficios tiene ahora una forma breve, para coger el hábito o
 * para los días con prisa, y otra extensa, para quien ya tiene costumbre.
 *
 * Ninguna de las dos trae texto nuevo.
 *
 * - **La breve** es la regla que san Serafín de Sarov daba a quien no podía
 *   rezar más: al levantarse, antes de comer y al acostarse, el Padre Nuestro
 *   tres veces, «Theotokos Virgen, alégrate» tres veces y el Símbolo de la Fe
 *   una. Por la mañana, mientras se trabaja, la oración de Jesús; desde la
 *   comida hasta la noche, «Santísima Theotokos, sálvame, pecador». Lo recoge
 *   la vida del santo que escribió el santo mártir Serafín (Chichágov).
 * - **La extensa** junta lo que ya está entero en ATHOS: los órdenes del libro
 *   de oración, las Horas y las Completas del Horologion, las lecturas del
 *   día y cien veces la oración de Jesús.
 *
 * La habitual es la de siempre, la que cada uno puede editar. Las otras dos
 * no se guardan: se rezan tal como vienen, y quien quiera cambiar una la
 * copia a su oficio habitual.
 */
import type { OfficeLength, RuleTime, TextBlock } from '@/types';
import { GREEK_FORMULAS as G } from './greek';
import {
  COMIENZO,
  DESPEDIDA,
  OFFICE_BY_TIME,
  TROPARIO_SEXTA,
  type OfficeStepSeed,
} from './hours';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});

/* ============================================================
   Qué es cada medida
   ============================================================ */

export interface OfficeLengthInfo {
  id: OfficeLength;
  label: string;
  /** Para quién es, en una línea. */
  forWhom: string;
}

export const OFFICE_LENGTHS: OfficeLengthInfo[] = [
  { id: 'breve', label: 'Breve', forWhom: 'Para empezar, o para los días con prisa' },
  { id: 'habitual', label: 'Habitual', forWhom: 'El de cada día, que puedes cambiar a tu gusto' },
  { id: 'extenso', label: 'Extenso', forWhom: 'Para quien ya tiene costumbre de rezar' },
];

export const LENGTH_INFO = new Map(OFFICE_LENGTHS.map((l) => [l.id, l]));

/* ============================================================
   La regla de san Serafín
   ============================================================ */

const FUENTE_SERAFIN = 'la vida de san Serafín de Sarov escrita por el santo mártir Serafín (Chichágov).';

/** Las tres oraciones de la regla, cada una en su paso. */
const REGLA_SERAFIN = (prefijo: string): OfficeStepSeed[] => [
  {
    id: `${prefijo}-padre`,
    title: 'Padre Nuestro',
    kind: 'texto',
    blocks: [rub('Tres veces, en honor de la Santísima Trinidad.'), gr('paterImon', 3)],
  },
  {
    id: `${prefijo}-theotokos`,
    title: 'Theotokos Virgen, alégrate',
    kind: 'texto',
    blocks: [rub('El saludo del arcángel a la Virgen, también tres veces.'), gr('theotokeParthene', 3)],
  },
  {
    id: `${prefijo}-credo`,
    title: 'Símbolo de la Fe',
    kind: 'prayer',
    prayerId: 'simbolo-de-la-fe',
    note: 'Una vez. San Serafín decía que en estas tres oraciones está el fundamento de la fe cristiana.',
  },
];

/* ============================================================
   Las formas breve y extensa de cada oficio
   ============================================================ */

export interface OfficeVariantSeed {
  /** Qué es esta forma, en dos líneas. */
  summary: string;
  /** De dónde sale, para ir detrás de «Fuente:». */
  source: string;
  minutes: number;
  steps: OfficeStepSeed[];
}

/** Las Horas entran sin la explicación del principio ni la despedida, que se dice una vez al final. */
const SECCIONES_HORA = [
  'comienzo',
  'salmos',
  'tropario',
  'theotokion',
  'versiculos',
  'trisagio',
  'kontakion',
  'kyrie',
  'toda-hora',
  'cuaresma',
  'final',
];

/** Las Completas Pequeñas, sin la presentación ni las Grandes. */
const COMPLETAS_PEQUENAS = [
  'comienzo',
  'salmos',
  'doxologia',
  'simbolo',
  'canon',
  'trisagio-troparios',
  'toda-hora',
  'theotokos-noche',
  'antioco',
  'esperanza',
  'perdon',
];

export const OFFICE_VARIANTS: Record<RuleTime, Record<'breve' | 'extenso', OfficeVariantSeed>> = {
  /* ---------------------------------------------------------------- */
  manana: {
    breve: {
      summary:
        'La regla de san Serafín de Sarov: el Padre Nuestro y el «Theotokos Virgen, alégrate» tres veces, y el Símbolo de la Fe una. Él la daba a quien no podía rezar más, y pedía seguir con la oración de Jesús durante la mañana.',
      source: FUENTE_SERAFIN,
      minutes: 6,
      steps: [
        { id: 'mb-inicio', title: 'Señal de la Cruz y silencio', kind: 'texto', blocks: COMIENZO },
        ...REGLA_SERAFIN('mb'),
        {
          id: 'mb-jesus',
          title: 'Oración de Jesús',
          kind: 'jesus-prayer',
          target: 12,
          note: 'San Serafín pedía seguir diciéndola en voz baja durante la mañana, mientras se trabaja; y si hay gente alrededor, sólo en la mente: «Señor, ten piedad».',
        },
        { id: 'mb-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
      ],
    },
    extenso: {
      summary:
        'Las oraciones de la mañana del libro de oración, enteras; la Hora Primera, que es la oración de la Iglesia al amanecer; el Apóstol y el Evangelio del día, y cien veces la oración de Jesús.',
      source: 'el Molitvoslov eslavo (oraciones de la mañana) y el Horologion bizantino (Hora Primera).',
      minutes: 45,
      steps: [
        { id: 'me-oraciones', title: 'Oraciones de la mañana', kind: 'order', orderId: 'manana' },
        {
          id: 'me-primera',
          title: 'Hora Primera',
          kind: 'office',
          officeId: 'hora-primera',
          sections: SECCIONES_HORA.filter((s) => s !== 'comienzo'),
          blocks: [
            rub('El comienzo habitual ya se ha dicho con las oraciones de la mañana: la Hora empieza directamente por «Venid, adoremos».'),
            gr('deute'),
          ],
        },
        {
          id: 'me-lecturas',
          title: 'Lecturas del día',
          kind: 'day-readings',
          note: 'Lo que la Iglesia lee hoy en la Liturgia. Leer cada día un pasaje del Evangelio es uno de los consejos más repetidos de los Padres.',
        },
        {
          id: 'me-jesus',
          title: 'Oración de Jesús',
          kind: 'jesus-prayer',
          target: 100,
          note: 'Cien veces, con el komboskini si lo tienes.',
        },
        { id: 'me-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  mediodia: {
    breve: {
      summary:
        'El tropario de la Hora Sexta y, como pedía san Serafín antes de comer, otra vez su regla. Después, hasta la noche, una sola invocación a la Theotokos dicha por dentro mientras se trabaja.',
      source: FUENTE_SERAFIN,
      minutes: 5,
      steps: [
        { id: 'db-inicio', title: 'Señal de la Cruz', kind: 'texto', blocks: COMIENZO },
        {
          id: 'db-tropario',
          title: 'Tropario de la Hora Sexta',
          kind: 'texto',
          blocks: [rub('A las doce fue clavado el Señor en la cruz; por eso se reza a esta hora.'), ...TROPARIO_SEXTA],
        },
        ...REGLA_SERAFIN('db'),
        {
          id: 'db-santisima',
          title: 'Santísima Theotokos, sálvame',
          kind: 'texto',
          blocks: [
            rub('San Serafín pedía decir esto en voz baja desde la comida hasta la noche, mientras se trabaja:'),
            t('Santísima Theotokos, sálvame, pecador.'),
            rub('Dilo ahora unas cuantas veces, sin prisa, y sigue diciéndolo por dentro durante la tarde. Es la fórmula eslava de la regla, traducida para ATHOS.'),
          ],
        },
        { id: 'db-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
      ],
    },
    extenso: {
      summary:
        'La Hora Tercera y la Hora Sexta del Horologion, enteras y seguidas, como se rezan en la iglesia; la oración de Jesús y dos oraciones del libro de oración por la hora del día y por los que nos hacen bien.',
      source: 'el Horologion bizantino (Horas Tercera y Sexta) y el Molitvoslov eslavo.',
      minutes: 25,
      steps: [
        { id: 'de-tercera', title: 'Hora Tercera', kind: 'office', officeId: 'hora-tercera', sections: SECCIONES_HORA },
        {
          id: 'de-sexta',
          title: 'Hora Sexta',
          kind: 'office',
          officeId: 'hora-sexta',
          sections: SECCIONES_HORA.filter((s) => s !== 'comienzo'),
          blocks: [
            rub('Seguida de la Tercera, la Sexta no repite el comienzo: empieza directamente por «Venid, adoremos».'),
            gr('deute'),
          ],
        },
        { id: 'de-jesus', title: 'Oración de Jesús', kind: 'jesus-prayer', target: 33 },
        { id: 'de-joasaf', title: 'Bendito sea el día y la hora', kind: 'prayer', prayerId: 'ioasaf-cada-hora' },
        { id: 'de-bienhechores', title: 'Por los que nos hacen bien', kind: 'prayer', prayerId: 'por-los-bienhechores' },
        { id: 'de-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  noche: {
    breve: {
      summary:
        'Un momento para repasar el día, la regla de san Serafín —que él pedía repetir al acostarse— y la última oración antes del sueño: «En tus manos, Señor».',
      source: FUENTE_SERAFIN,
      minutes: 5,
      steps: [
        { id: 'nb-inicio', title: 'Señal de la Cruz', kind: 'texto', blocks: COMIENZO },
        { id: 'nb-examen', title: 'Examen del día', kind: 'prayer', prayerId: 'examen-del-dia' },
        ...REGLA_SERAFIN('nb'),
        {
          id: 'nb-manos',
          title: 'En tus manos, Señor',
          kind: 'prayer',
          prayerId: 'oracion-final-noche',
          note: 'Y a dormir, haciendo sobre ti la señal de la cruz.',
        },
        { id: 'nb-despedida', title: 'Despedida', kind: 'texto', blocks: DESPEDIDA },
      ],
    },
    extenso: {
      summary:
        'Las Completas Pequeñas del Horologion, enteras; la oración de Jesús, y las oraciones antes del sueño del libro de oración, enteras, hasta «En tus manos, Señor».',
      source: 'el Horologion bizantino (Completas Pequeñas) y el Molitvoslov eslavo (oraciones antes del sueño).',
      minutes: 60,
      steps: [
        {
          id: 'ne-completas',
          title: 'Completas Pequeñas',
          kind: 'office',
          officeId: 'completas',
          sections: COMPLETAS_PEQUENAS,
          note: 'En la Gran Cuaresma se rezan las Grandes, que están enteras en Biblioteca → Liturgia → Completas.',
        },
        { id: 'ne-jesus', title: 'Oración de Jesús', kind: 'jesus-prayer', target: 100 },
        { id: 'ne-oraciones', title: 'Oraciones antes del sueño', kind: 'order', orderId: 'noche' },
      ],
    },
  },
};

/** Los pasos de un oficio en la medida que se pida. */
export function stepsFor(time: RuleTime, length: OfficeLength): OfficeStepSeed[] {
  if (length === 'habitual') return OFFICE_BY_TIME.get(time)?.steps ?? [];
  return OFFICE_VARIANTS[time][length].steps;
}

/** Lo que se tarda en rezarlo, en minutos. */
export function minutesFor(time: RuleTime, length: OfficeLength): number {
  if (length === 'habitual') return OFFICE_BY_TIME.get(time)?.minutes ?? 0;
  return OFFICE_VARIANTS[time][length].minutes;
}

/** El identificador de una forma que no se guarda, para sus pasos. */
export const variantRuleId = (time: RuleTime, length: OfficeLength) => `oficio-${time}-${length}`;
