/** Formatos de fecha y de texto propios de ATHOS. */
import es from '@/locales/es';
import type { CivilDate, LiturgicalDay } from '@/types';
import { isoToCivil, isoToDate, toIsoDate } from './calendar/jdn';

export const WEEKDAYS = es.weekdays.long;
export const WEEKDAYS_SHORT = es.weekdays.short;
export const WEEKDAYS_NARROW = es.weekdays.narrow;
export const MONTHS = es.months;

export function formatLongDate(iso: string): string {
  const { year, month, day } = isoToCivil(iso);
  const weekday = WEEKDAYS[isoToDate(iso).getDay()];
  return `${weekday}, ${day} de ${MONTHS[month - 1]} de ${year}`;
}

export function formatDayMonth(iso: string): string {
  const { month, day } = isoToCivil(iso);
  return `${day} de ${MONTHS[month - 1]}`;
}

export function formatChurchDate(date: CivilDate): string {
  return `${date.day} de ${MONTHS[date.month - 1]} de ${date.year}`;
}

export function formatMonthDay(monthDay: string): string {
  const [month, day] = monthDay.split('-').map(Number);
  return `${day} de ${MONTHS[month - 1]}`;
}

export function relativeDayLabel(iso: string, today = toIsoDate(new Date())): string | null {
  if (iso === today) return es.app.today;
  const todayDate = isoToDate(today);
  const yesterday = new Date(todayDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(todayDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (iso === toIsoDate(yesterday)) return es.app.yesterday;
  if (iso === toIsoDate(tomorrow)) return es.app.tomorrow;
  return null;
}

export function greeting(now = new Date()): string {
  const hour = now.getHours();
  if (hour < 12) return es.home.greetingMorning;
  if (hour < 20) return es.home.greetingAfternoon;
  return es.home.greetingEvening;
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return `${hours} h ${minutes % 60} min`;
  }
  return minutes ? `${minutes} min ${String(seconds).padStart(2, '0')} s` : `${seconds} s`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['kB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

/** Color con que se marca el ayuno del día en el calendario. */
export function fastTone(day: LiturgicalDay): 'gold' | 'red' | 'blue' | 'green' | undefined {
  switch (day.fasting.level) {
    case 'strict':
    case 'xerophagy':
      return 'red';
    case 'wine-oil':
      return 'blue';
    case 'fish':
    case 'dairy':
      return 'green';
    default:
      return undefined;
  }
}

export function feastTone(day: LiturgicalDay): 'gold' | undefined {
  return day.feasts.some((f) => f.rank === 'pascua' || f.rank === 'gran-fiesta') ? 'gold' : undefined;
}

export function toneLabel(tone: number | null): string {
  return tone === null ? es.home.noTone : es.home.tone.replace('{{tone}}', String(tone));
}
