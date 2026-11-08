/**
 * La próxima gran fiesta.
 *
 * Inicio la enseña con los días que faltan: es lo que ordena las semanas de
 * quien vive el año litúrgico —cuándo empieza el ayuno, qué se prepara—, y no
 * estaba en ninguna parte sin abrir el calendario y buscarla mes a mes.
 */
import { computeLiturgicalDay } from './liturgical';
import { addDaysIso } from './jdn';
import type { CalendarStyle } from '@/types';

export interface NextFeast {
  date: string;
  name: string;
  /** Días que faltan: 1 es mañana. */
  days: number;
}

/** Se busca a partir de mañana, hasta poco más de un año. */
export function nextGreatFeast(fromIso: string, style: CalendarStyle, horizon = 400): NextFeast | null {
  for (let i = 1; i <= horizon; i++) {
    const date = addDaysIso(fromIso, i);
    const day = computeLiturgicalDay(date, style);
    const fiesta = day.feasts.find((f) => f.rank === 'pascua' || f.rank === 'gran-fiesta');
    if (fiesta) return { date, name: fiesta.name, days: i };
  }
  return null;
}
