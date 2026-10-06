/**
 * Cuánto se lleva hoy de cada uno de los tres oficios.
 *
 * Inicio decía «0 de 44», que suma los pasos de los tres oficios y no dice
 * nada útil: no se sabe cuál falta. Esto devuelve el avance de cada oficio por
 * separado, que es lo que se enseña ahora en Inicio y en Orar.
 */
import { useAsync } from '@/hooks/useAsync';
import { ruleForTime, ruleProgress } from '@/db/user';
import { DAILY_OFFICES } from '@/content/hours';
import type { RuleTime } from '@/types';

export interface OfficeProgress {
  ruleId: string;
  ratio: number;
  total: number;
}

export function useOfficeProgress(today: string) {
  return useAsync(async () => {
    const salida = new Map<RuleTime, OfficeProgress>();
    for (const oficio of DAILY_OFFICES) {
      const regla = await ruleForTime(oficio.time);
      if (!regla) continue;
      const p = await ruleProgress(today, regla);
      salida.set(oficio.time, { ruleId: regla.id, ratio: p.ratio, total: p.items.length });
    }
    return salida;
  }, [today]);
}
