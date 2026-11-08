/**
 * Motor de ayuno.
 *
 * Las reglas siguen el Typikon en su lectura habitual (la que recogen los
 * calendarios de la mayoría de las jurisdicciones). Existen variaciones
 * legítimas entre tradiciones: la aplicación muestra siempre el aviso
 * correspondiente y nunca presenta estas reglas como una obligación
 * canónica individual.
 */
import type { CalendarStyle, FastAllowance, FastLevel, FastingInfo, Feast } from '@/types';

export const FAST_LEVELS: Record<FastLevel, { label: string; allowance: FastAllowance }> = {
  'fast-free': {
    label: 'Sin ayuno',
    allowance: { meat: true, dairy: true, eggs: true, fish: true, oil: true, wine: true },
  },
  dairy: {
    label: 'Sin carne · lácteos permitidos',
    allowance: { meat: false, dairy: true, eggs: true, fish: true, oil: true, wine: true },
  },
  fish: {
    label: 'Pescado, vino y aceite',
    allowance: { meat: false, dairy: false, eggs: false, fish: true, oil: true, wine: true },
  },
  'wine-oil': {
    label: 'Vino y aceite',
    allowance: { meat: false, dairy: false, eggs: false, fish: false, oil: true, wine: true },
  },
  xerophagy: {
    label: 'Xerofagia · sin aceite ni vino',
    allowance: { meat: false, dairy: false, eggs: false, fish: false, oil: false, wine: false },
  },
  strict: {
    label: 'Ayuno estricto',
    allowance: { meat: false, dairy: false, eggs: false, fish: false, oil: false, wine: false },
  },
};

export const FASTING_DISCLAIMER =
  'Las normas de ayuno pueden variar según la tradición, jurisdicción y circunstancias ' +
  'personales. Para cuestiones particulares, consulta con tu sacerdote.';

export interface FastingContext {
  /** Días transcurridos desde la última Pascua (≥ 0). */
  paschaOffset: number;
  /** Días que faltan para la próxima Pascua (< 0). */
  nextPaschaOffset: number;
  /** 0 = domingo … 6 = sábado. */
  weekday: number;
  /** `MM-DD` en el calendario eclesiástico del usuario. */
  churchMonthDay: string;
  /** Fiestas del día, para relajar el ayuno cuando corresponde. */
  feasts?: Feast[];
  calendarStyle?: CalendarStyle;
}

const build = (level: FastLevel, period: string | null, periodId: string | null, reason: string): FastingInfo => ({
  level,
  period,
  periodId,
  label: FAST_LEVELS[level].label,
  allowance: FAST_LEVELS[level].allowance,
  reason,
});

const isWeekend = (w: number) => w === 0 || w === 6;
const isWedFri = (w: number) => w === 3 || w === 5;

/** Rango `MM-DD` inclusivo dentro del mismo año civil. */
const between = (md: string, from: string, to: string) => md >= from && md <= to;

export function fastingFor(ctx: FastingContext): FastingInfo {
  const { paschaOffset: o, nextPaschaOffset: n, weekday: w, churchMonthDay: md } = ctx;
  const greatFeast = (ctx.feasts ?? []).some(
    (f) => f.relaxesFast || f.rank === 'gran-fiesta' || f.rank === 'fiesta-del-senor' || f.rank === 'fiesta-de-la-theotokos',
  );

  /* ---- Periodos sin ayuno ---- */
  if (o >= 0 && o <= 6) {
    return build('fast-free', 'Semana de la Renovación', 'renovacion', 'Toda la Semana Luminosa es sin ayuno.');
  }
  if (o >= 49 && o <= 55) {
    return build('fast-free', 'Semana de Pentecostés', 'trinidad', 'La semana posterior a Pentecostés es sin ayuno.');
  }
  if (n >= -69 && n <= -64) {
    return build(
      'fast-free',
      'Semana del Publicano y el Fariseo',
      'publicano',
      'Semana sin ayuno, contra la jactancia del fariseo que ayunaba dos veces por semana.',
    );
  }
  if (between(md, '12-25', '12-31') || between(md, '01-01', '01-04')) {
    return build('fast-free', 'Doce Días de Navidad', 'navidad', 'Desde la Natividad hasta la víspera de la Teofanía no hay ayuno.');
  }

  /* ---- Triodio: semana de Carnaval y de Queso ---- */
  if (n >= -55 && n <= -49) {
    return build(
      'dairy',
      'Semana de Queso',
      'tirofagia',
      'Ya no se come carne; los lácteos y huevos se permiten toda la semana, incluidos miércoles y viernes.',
    );
  }

  /* ---- Gran Cuaresma y Semana Santa ---- */
  if (n >= -48 && n <= -1) {
    const holyWeek = n >= -6;
    const period = holyWeek ? 'Semana Santa' : 'Gran Cuaresma';
    const periodId = holyWeek ? 'semana-santa' : 'gran-cuaresma';

    if (n === -2) return build('strict', period, periodId, 'Viernes Santo: la tradición recomienda abstenerse de alimento hasta después de los oficios.');
    if (n === -1) return build('xerophagy', period, periodId, 'Sábado Santo, en espera de la Resurrección.');
    if (n === -3) return build('wine-oil', period, periodId, 'Jueves Santo, en memoria de la Última Cena.');
    if (holyWeek) return build('xerophagy', period, periodId, 'Días de la Pasión del Señor.');
    if (n === -7) return build('fish', period, periodId, 'Domingo de Ramos: se permite pescado.');
    if (n === -8) return build('wine-oil', period, periodId, 'Sábado de Lázaro: se permiten vino y aceite.');
    if (md === '03-25') return build('fish', period, periodId, 'Anunciación de la Theotokos: se permite pescado aunque sea Cuaresma.');
    if (n === -48) return build('strict', period, periodId, 'Lunes Puro, primer día de la Gran Cuaresma.');
    if (isWeekend(w)) return build('wine-oil', period, periodId, 'Sábados y domingos de Cuaresma: se permiten vino y aceite.');
    return build('xerophagy', period, periodId, 'Días laborables de la Gran Cuaresma: xerofagia.');
  }

  /* ---- Pentecostario: miércoles y viernes con pescado ---- */
  if (o >= 7 && o <= 48 && isWedFri(w)) {
    return build('fish', 'Pentecostario', 'pentecostario', 'Miércoles y viernes del tiempo pascual: se permiten pescado, vino y aceite.');
  }

  /* ---- Ayuno de los Apóstoles ---- */
  // Del lunes siguiente a Todos los Santos hasta la víspera de los santos Apóstoles
  // Pedro y Pablo (29 de junio del calendario eclesiástico).
  if (o >= 57 && md >= '05-01' && md < '06-29') {
    return apostlesFast(w, md, greatFeast);
  }

  /* ---- Ayuno de la Dormición ---- */
  if (between(md, '08-01', '08-14')) {
    if (md === '08-06') return build('fish', 'Ayuno de la Dormición', 'dormicion', 'Transfiguración del Señor: se permite pescado.');
    if (isWeekend(w)) return build('wine-oil', 'Ayuno de la Dormición', 'dormicion', 'Sábados y domingos: vino y aceite.');
    if (w === 2 || w === 4) return build('wine-oil', 'Ayuno de la Dormición', 'dormicion', 'Martes y jueves: vino y aceite.');
    return build('xerophagy', 'Ayuno de la Dormición', 'dormicion', 'Ayuno estricto de catorce días antes de la Dormición.');
  }

  /* ---- Ayuno de la Natividad ---- */
  if (between(md, '11-15', '12-24')) {
    const period = 'Ayuno de la Natividad';
    if (md === '12-24') {
      return isWeekend(w)
        ? build('wine-oil', period, 'natividad', 'Víspera de la Natividad en fin de semana: vino y aceite.')
        : build('strict', period, 'natividad', 'Víspera de la Natividad: ayuno hasta la primera estrella.');
    }
    const strictPhase = md >= '12-20';
    if (greatFeast && !strictPhase) return build('fish', period, 'natividad', 'Gran fiesta dentro del ayuno: se permite pescado.');
    if (isWedFri(w)) return build('xerophagy', period, 'natividad', 'Miércoles y viernes: xerofagia.');
    if (w === 1) return build('xerophagy', period, 'natividad', 'Lunes: xerofagia según el Typikon.');
    if (strictPhase) {
      return build('wine-oil', period, 'natividad', 'Del 20 al 23 de diciembre se suprime el pescado.');
    }
    if (isWeekend(w)) return build('fish', period, 'natividad', 'Sábados y domingos: se permite pescado.');
    return build('wine-oil', period, 'natividad', 'Martes y jueves: vino y aceite.');
  }

  /* ---- Días fijos de ayuno ---- */
  if (md === '01-05') {
    return isWeekend(w)
      ? build('wine-oil', 'Víspera de la Teofanía', 'teofania', 'Víspera de la Teofanía en fin de semana: vino y aceite.')
      : build('strict', 'Víspera de la Teofanía', 'teofania', 'Víspera de la Teofanía: ayuno estricto.');
  }
  if (md === '09-14') {
    return build('wine-oil', 'Exaltación de la Cruz', 'exaltacion', 'Día de ayuno aunque no caiga en miércoles o viernes.');
  }
  if (md === '08-29') {
    return build('wine-oil', 'Degollación de San Juan Bautista', 'degollacion', 'Día de ayuno aunque no caiga en miércoles o viernes.');
  }

  /* ---- Miércoles y viernes de todo el año ---- */
  if (isWedFri(w)) {
    if (greatFeast) {
      return build('fish', 'Miércoles y viernes', 'semanal', 'Gran fiesta: se permiten pescado, vino y aceite.');
    }
    return build(
      'xerophagy',
      'Miércoles y viernes',
      'semanal',
      w === 3
        ? 'Miércoles, en memoria de la traición del Señor.'
        : 'Viernes, en memoria de la Crucifixión.',
    );
  }

  return build('fast-free', null, null, 'No hay ayuno prescrito para este día.');
}

function apostlesFast(w: number, _md: string, greatFeast: boolean): FastingInfo {
  const period = 'Ayuno de los Apóstoles';
  if (greatFeast) return build('fish', period, 'apostoles', 'Gran fiesta dentro del ayuno: se permite pescado.');
  if (isWedFri(w)) return build('xerophagy', period, 'apostoles', 'Miércoles y viernes: xerofagia.');
  if (w === 1) return build('xerophagy', period, 'apostoles', 'Lunes: xerofagia según el Typikon.');
  if (isWeekend(w)) return build('fish', period, 'apostoles', 'Sábados y domingos: se permite pescado.');
  return build('wine-oil', period, 'apostoles', 'Martes y jueves: vino y aceite.');
}

/** ¿Es un día de ayuno en algún grado? */
export function isFastDay(info: FastingInfo): boolean {
  return info.level !== 'fast-free';
}

export const ALLOWANCE_LABELS: Array<{ key: keyof FastAllowance; label: string }> = [
  { key: 'meat', label: 'Carne' },
  { key: 'dairy', label: 'Lácteos' },
  { key: 'eggs', label: 'Huevos' },
  { key: 'fish', label: 'Pescado' },
  { key: 'oil', label: 'Aceite' },
  { key: 'wine', label: 'Vino' },
];
