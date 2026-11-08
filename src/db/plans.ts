/**
 * El avance en un plan de lectura.
 *
 * Se guarda qué días están hechos, no cuántos: así saltarse el día 4 y hacer
 * el 5 queda registrado tal cual, sin fingir que el 4 se hizo. Un plan que
 * miente sobre lo que has leído no sirve para nada.
 *
 * Vive en `reading_progress`, la tabla que ya existía en el modelo con un
 * `kind: 'plan'` que hasta ahora nadie usaba.
 */
import { db } from './db';
import { READING_PLANS, daysOf } from '@/content/plans';
import type { ReadingProgress } from '@/types';

const idDe = (planId: string) => `plan:${planId}`;

export async function planProgress(planId: string): Promise<ReadingProgress | undefined> {
  return db.reading_progress.get(idDe(planId));
}

export async function allPlanProgress(): Promise<ReadingProgress[]> {
  return db.reading_progress.where('kind').equals('plan').toArray();
}

/** Marca o desmarca un día. Devuelve el estado en que queda. */
export async function toggleDay(
  planId: string,
  day: number,
  total: number,
): Promise<ReadingProgress> {
  const id = idDe(planId);
  const clave = String(day);
  const previo = await db.reading_progress.get(id);
  const hechos = new Set(previo?.completed ?? []);
  if (hechos.has(clave)) hechos.delete(clave);
  else hechos.add(clave);

  const registro: ReadingProgress = {
    id,
    kind: 'plan',
    refId: planId,
    // Ordenados por número, no por texto: si no, el día 10 se cuela entre el
    // 1 y el 2 y la lista guardada no se puede leer.
    completed: [...hechos].sort((a, b) => Number(a) - Number(b)),
    total,
    updatedAt: new Date().toISOString(),
    startedAt: previo?.startedAt ?? new Date().toISOString(),
  };
  await db.reading_progress.put(registro);
  return registro;
}

/** Vuelve a empezar. El Salterio se termina y se recomienza: es lo normal. */
export async function resetPlan(planId: string): Promise<void> {
  await db.reading_progress.delete(idDe(planId));
}

/**
 * El primer día sin hacer.
 *
 * Es lo que la aplicación ofrece como «hoy toca esto». No es el día de
 * calendario: quien empieza en marzo y falla dos semanas sigue teniendo por
 * delante el día que dejó, no el que le tocaría por fecha.
 */
export function nextDay(progreso: ReadingProgress | undefined, total: number): number | null {
  const hechos = new Set(progreso?.completed ?? []);
  for (let d = 1; d <= total; d += 1) {
    if (!hechos.has(String(d))) return d;
  }
  return null;
}

/**
 * El plan que se está leyendo: el último que se tocó y que no está terminado,
 * con lo que toca hoy. Lo usan Inicio, Leer y el recordatorio de lectura.
 */
export async function currentPlan() {
  const progresos = (await allPlanProgress()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  for (const p of progresos) {
    const plan = READING_PLANS.find((x) => x.id === p.refId);
    if (!plan) continue;
    const dias = daysOf(plan.id);
    const n = nextDay(p, dias.length);
    if (n) return { plan, day: dias[n - 1]!, done: p.completed.length, total: dias.length };
  }
  return null;
}
