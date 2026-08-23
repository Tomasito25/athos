/**
 * Cálculo del día litúrgico.
 *
 * La Pascua es la misma jornada para todas las Iglesias ortodoxas; lo que
 * cambia entre el calendario nuevo y el juliano es la fecha de las fiestas
 * fijas. Por eso el ciclo móvil se calcula sobre el día juliano y el ciclo
 * fijo sobre la fecha eclesiástica que corresponda al estilo elegido.
 */
import type { CalendarStyle, CivilDate, Feast, LiturgicalDay, LiturgicalSeason } from '@/types';
import { FIXED_FEASTS, MOVABLE_FEASTS } from '@/content/feasts';
import { findReading } from '@/content/lectionary';
import { saintsOnDay } from '@/content/saints';
import { fastingFor } from './fasting';
import {
  isoToJdn,
  jdnToGregorian,
  jdnToIso,
  jdnToJulian,
  monthDay,
  weekdayFromJdn,
} from './jdn';
import { governingPascha, paschaJdn, toneForOffset } from './pascha';

const movableByOffset = new Map<number, Feast[]>();
for (const feast of MOVABLE_FEASTS) {
  const key = feast.paschaOffset!;
  const list = movableByOffset.get(key) ?? [];
  list.push(feast);
  movableByOffset.set(key, list);
}

const fixedByDay = new Map<string, Feast[]>();
for (const feast of FIXED_FEASTS) {
  const key = feast.day!;
  const list = fixedByDay.get(key) ?? [];
  list.push(feast);
  fixedByDay.set(key, list);
}

/** Fecha eclesiástica de un día civil según el estilo de calendario. */
export function churchDate(jdn: number, style: CalendarStyle): CivilDate {
  return style === 'juliano' ? jdnToJulian(jdn) : jdnToGregorian(jdn);
}

function seasonFor(o: number, n: number, md: string): LiturgicalSeason {
  if (n >= -6 && n <= -1) return 'semana-santa';
  if (n >= -48 && n <= -7) return 'gran-cuaresma';
  if (n >= -70 && n <= -49) return 'triodio';
  if (o >= 0 && o <= 56) return 'pentecostario';
  if (o >= 57 && md >= '05-01' && md < '06-29') return 'ayuno-apostoles';
  if (md >= '08-01' && md <= '08-14') return 'ayuno-dormicion';
  if (md >= '11-15' && md <= '12-24') return 'ayuno-natividad';
  return 'tiempo-ordinario';
}

export const SEASON_LABELS: Record<LiturgicalSeason, string> = {
  triodio: 'Triodio',
  'gran-cuaresma': 'Gran Cuaresma',
  'semana-santa': 'Semana Santa',
  pentecostario: 'Pentecostario',
  'tiempo-ordinario': 'Tiempo ordinario',
  'ayuno-natividad': 'Ayuno de la Natividad',
  'ayuno-apostoles': 'Ayuno de los Apóstoles',
  'ayuno-dormicion': 'Ayuno de la Dormición',
};

/** Orden de importancia para elegir la fiesta que encabeza el día. */
const RANK_WEIGHT: Record<Feast['rank'], number> = {
  pascua: 0,
  'gran-fiesta': 1,
  'fiesta-del-senor': 2,
  'fiesta-de-la-theotokos': 3,
  vigilia: 4,
  polieleo: 5,
  menor: 6,
};

export function computeLiturgicalDay(iso: string, style: CalendarStyle = 'nuevo'): LiturgicalDay {
  const jdn = isoToJdn(iso);
  const weekday = weekdayFromJdn(jdn);

  const governing = governingPascha(jdn);
  const paschaOffset = jdn - governing.jdn;
  const nextPascha = paschaJdn(governing.year + 1);
  const nextPaschaOffset = jdn - nextPascha;

  const church = churchDate(jdn, style);
  const md = monthDay(church);

  const feasts = [
    ...(movableByOffset.get(nextPaschaOffset) ?? []),
    ...(movableByOffset.get(paschaOffset) ?? []),
    ...(fixedByDay.get(md) ?? []),
  ].sort((a, b) => RANK_WEIGHT[a.rank] - RANK_WEIGHT[b.rank]);

  const saints = saintsOnDay(md);

  const fasting = fastingFor({
    paschaOffset,
    nextPaschaOffset,
    weekday,
    churchMonthDay: md,
    feasts,
    calendarStyle: style,
  });

  return {
    date: iso,
    civil: jdnToGregorian(jdn),
    church,
    calendarStyle: style,
    weekday,
    paschaDate: jdnToIso(governing.jdn),
    paschaOffset,
    tone: toneForOffset(paschaOffset),
    season: seasonFor(paschaOffset, nextPaschaOffset, md),
    feasts,
    saints,
    fasting,
    readings: findReading(paschaOffset, nextPaschaOffset, md),
  };
}

/** Día litúrgico de cada jornada de un mes civil. */
export function monthOfLiturgicalDays(year: number, month: number, style: CalendarStyle): LiturgicalDay[] {
  const days: LiturgicalDay[] = [];
  const total = new Date(year, month, 0).getDate();
  for (let d = 1; d <= total; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push(computeLiturgicalDay(iso, style));
  }
  return days;
}

/** Fiesta principal del día, si la hay. */
export function leadFeast(day: LiturgicalDay): Feast | null {
  return day.feasts[0] ?? null;
}

export const CALENDAR_STYLE_LABELS: Record<CalendarStyle, string> = {
  nuevo: 'Calendario nuevo (juliano revisado)',
  juliano: 'Calendario juliano',
};

export const CALENDAR_STYLE_NOTE: Record<CalendarStyle, string> = {
  nuevo:
    'Las fiestas fijas siguen la fecha civil. La Pascua y todo el ciclo móvil se calculan siempre con el cómputo juliano, común a toda la Iglesia ortodoxa.',
  juliano:
    'Las fiestas fijas se muestran según el calendario juliano, hoy trece días por detrás del civil. La Pascua coincide con la del calendario nuevo.',
};
