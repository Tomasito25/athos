/**
 * Cuánto se lleva hoy de cada uno de los tres oficios.
 *
 * Inicio decía «0 de 44», que suma los pasos de los tres oficios y no dice
 * nada útil: no se sabe cuál falta. Esto devuelve el avance de cada oficio por
 * separado, que es lo que se enseña ahora en Inicio y en Orar.
 *
 * Un oficio rezado en su forma breve o extensa cuenta entero, igual que el
 * habitual: lo que importa es que el de ese momento del día se rezó.
 */
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { isRulePrayed, prayedLength, ruleForTime, ruleProgress } from '@/db/user';
import { DAILY_OFFICES } from '@/content/hours';
import type { OfficeLength, RuleTime } from '@/types';

export interface OfficeProgress {
  ruleId: string;
  ratio: number;
  total: number;
  /** La medida con que se rezó hoy, si se dio por rezado. */
  length?: OfficeLength;
}

export function useOfficeProgress(today: string) {
  return useAsync(async () => {
    const salida = new Map<RuleTime, OfficeProgress>();
    for (const oficio of DAILY_OFFICES) {
      const regla = await ruleForTime(oficio.time);
      if (!regla) continue;
      const p = await ruleProgress(today, regla);
      const marcas = await db.rule_completions.where('[date+ruleId]').equals([today, regla.id]).toArray();
      const rezado = isRulePrayed(marcas, regla.id, p.items);
      salida.set(oficio.time, {
        ruleId: regla.id,
        ratio: rezado ? 1 : p.ratio,
        total: p.items.length,
        length: prayedLength(marcas, regla.id),
      });
    }
    return salida;
  }, [today]);
}
