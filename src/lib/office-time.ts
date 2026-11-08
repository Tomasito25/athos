/** Qué oficio corresponde a cada hora del día. */
import type { RuleTime } from '@/types';

export interface OfficeHours {
  manana: number;
  mediodia: number;
  noche: number;
}

/**
 * La franja de la noche cruza la medianoche: va desde su hora de inicio hasta
 * que empieza la de la mañana.
 */
export function officeNow(hour: number, horas: OfficeHours): RuleTime {
  if (hour >= horas.noche || hour < horas.manana) return 'noche';
  if (hour >= horas.mediodia) return 'mediodia';
  return 'manana';
}
