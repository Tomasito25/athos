/** Día litúrgico de una fecha, según el calendario elegido por el usuario. */
import { useMemo } from 'react';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { toIsoDate } from '@/lib/calendar/jdn';
import { useSettings } from '@/stores/settings';
import { useLectionaryStatus } from '@/db/lectionary';
import type { LiturgicalDay } from '@/types';

export function useLiturgicalDay(iso?: string): LiturgicalDay {
  const calendarStyle = useSettings((s) => s.calendarStyle);
  // Al terminar de cargarse el leccionario hay que recalcular: las lecturas
  // completas sustituyen a las de la tabla incorporada.
  const lectionary = useLectionaryStatus((s) => s.version);
  const date = iso ?? toIsoDate(new Date());
  return useMemo(() => {
    // `lectionary` es una marca de invalidación: al terminar de cargarse, el
    // cálculo pasa a leer del leccionario completo y hay que rehacerlo.
    void lectionary;
    return computeLiturgicalDay(date, calendarStyle);
  }, [date, calendarStyle, lectionary]);
}

export function useToday(): string {
  return useMemo(() => toIsoDate(new Date()), []);
}
