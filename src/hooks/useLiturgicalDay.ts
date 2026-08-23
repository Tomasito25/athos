/** Día litúrgico de una fecha, según el calendario elegido por el usuario. */
import { useMemo } from 'react';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { toIsoDate } from '@/lib/calendar/jdn';
import { useSettings } from '@/stores/settings';
import type { LiturgicalDay } from '@/types';

export function useLiturgicalDay(iso?: string): LiturgicalDay {
  const calendarStyle = useSettings((s) => s.calendarStyle);
  const date = iso ?? toIsoDate(new Date());
  return useMemo(() => computeLiturgicalDay(date, calendarStyle), [date, calendarStyle]);
}

export function useToday(): string {
  return useMemo(() => toIsoDate(new Date()), []);
}
