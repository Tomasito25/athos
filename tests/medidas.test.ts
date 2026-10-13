/**
 * Las tres medidas de cada oficio.
 *
 * La breve es de verdad breve y la extensa de verdad extensa; los minutos que
 * se anuncian salen de contar las palabras, no de un cálculo a ojo; todo lo
 * que las dos formas nuevas citan existe; y la breve es la regla de san
 * Serafín, con sus tres oraciones y sus veces.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { db } from '@/db/db';
import { seedContent, seedUserDefaults, restoreOffice } from '@/db/seed';
import { getPsalm } from '@/db/psalter';
import { ruleForTime, ruleItems } from '@/db/user';
import { DAILY_OFFICES, stepsToItems, type OfficeStepSeed } from '@/content/hours';
import { OFFICE_VARIANTS, minutesFor, stepsFor } from '@/content/office-lengths';
import { orderById } from '@/content/prayer-orders';
import { GREEK_FORMULAS } from '@/content/greek';
import type { OfficeLength, RuleTime, TextBlock } from '@/types';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
  await seedUserDefaults();
});

const TIEMPOS: RuleTime[] = ['manana', 'mediodia', 'noche'];
const MEDIDAS: OfficeLength[] = ['breve', 'habitual', 'extenso'];

/** Palabras por minuto rezando en voz baja y sin prisa. */
const RITMO = 110;

const cuenta = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

/** Lo que se reza de unos bloques: las rúbricas no se dicen, se leen de pasada. */
async function palabrasDe(bloques: TextBlock[]): Promise<number> {
  let total = 0;
  for (const b of bloques) {
    if (b.kind === 'rubric' || b.kind === 'pending') continue;
    if (b.kind === 'psalm') {
      const salmo = await getPsalm(Number(b.ref));
      total += salmo ? await palabrasDe(salmo.blocks) : 0;
      continue;
    }
    // El tropario y el kontakion del día, y las lecturas: lo que suelen medir.
    if (b.kind === 'day-troparion' || b.kind === 'day-kontakion') {
      total += 60;
      continue;
    }
    if (b.kind === 'day-readings') {
      total += 500;
      continue;
    }
    total += cuenta(b.content) * (b.times ?? 1);
  }
  return total;
}

async function palabrasDelPaso(paso: OfficeStepSeed): Promise<number> {
  const propios = await palabrasDe(paso.blocks ?? []);
  switch (paso.kind) {
    case 'prayer': {
      const p = await db.prayers.get(paso.prayerId ?? '');
      return propios + (p ? await palabrasDe(p.blocks) : 0);
    }
    case 'psalm': {
      const s = await getPsalm(paso.psalm ?? 0);
      return propios + (s ? await palabrasDe(s.blocks) : 0);
    }
    case 'order': {
      const o = orderById(paso.orderId ?? '');
      return propios + (o ? await palabrasDe(o.sections.flatMap((s) => s.blocks)) : 0);
    }
    case 'office': {
      const o = await db.liturgies.get(paso.officeId ?? '');
      const secciones = (o?.sections ?? []).filter((s) => !paso.sections || paso.sections.includes(s.id));
      return propios + (await palabrasDe(secciones.flatMap((s) => s.blocks)));
    }
    case 'day-readings':
      return propios + 500;
    case 'jesus-prayer':
    case 'komboskini':
      return propios + (paso.target ?? 33) * cuenta(GREEK_FORMULAS.jesusPrayer.spanish);
    default:
      return propios;
  }
}

async function minutosCalculados(time: RuleTime, length: OfficeLength): Promise<number> {
  let palabras = 0;
  for (const paso of stepsFor(time, length)) palabras += await palabrasDelPaso(paso);
  return palabras / RITMO;
}

describe('las tres medidas', () => {
  it('cada oficio tiene las tres, y la breve es más corta que la habitual y ésta que la extensa', async () => {
    for (const time of TIEMPOS) {
      const [breve, habitual, extenso] = await Promise.all(MEDIDAS.map((m) => minutosCalculados(time, m)));
      expect(breve, time).toBeLessThan(habitual);
      expect(habitual, time).toBeLessThan(extenso);
    }
  });

  it('los minutos que se anuncian salen de contar las palabras', async () => {
    for (const time of TIEMPOS) {
      for (const length of MEDIDAS) {
        const calculado = await minutosCalculados(time, length);
        const anunciado = minutesFor(time, length);
        // Se anuncia redondeado; basta con que no se aleje más de un cuarto.
        expect(Math.abs(anunciado - calculado) / calculado, `${time} ${length}: ${calculado.toFixed(1)}`).toBeLessThan(0.25);
      }
    }
  });

  it('todo lo que citan las formas nuevas existe', async () => {
    for (const time of TIEMPOS) {
      for (const length of ['breve', 'extenso'] as const) {
        for (const paso of OFFICE_VARIANTS[time][length].steps) {
          const donde = `${time} ${length} ${paso.id}`;
          if (paso.kind === 'prayer') expect(await db.prayers.get(paso.prayerId ?? ''), donde).toBeTruthy();
          if (paso.kind === 'order') expect(orderById(paso.orderId ?? ''), donde).toBeTruthy();
          if (paso.kind === 'office') {
            const oficio = await db.liturgies.get(paso.officeId ?? '');
            expect(oficio, donde).toBeTruthy();
            const ids = new Set(oficio?.sections.map((s) => s.id));
            for (const s of paso.sections ?? []) expect(ids.has(s), `${donde}: ${s}`).toBe(true);
          }
        }
      }
    }
  });

  it('los pasos no repiten identificador dentro de un oficio', () => {
    for (const time of TIEMPOS) {
      const ids = MEDIDAS.flatMap((m) => stepsFor(time, m).map((p) => p.id));
      expect(new Set(ids).size, time).toBe(ids.length);
    }
  });

  it('la breve es la regla de san Serafín: tres Padre Nuestro, tres «Theotokos Virgen» y un Credo', () => {
    for (const time of TIEMPOS) {
      const pasos = stepsFor(time, 'breve');
      const bloques = pasos.flatMap((p) => p.blocks ?? []);
      expect(bloques.find((b) => b.content === GREEK_FORMULAS.paterImon.spanish)?.times, time).toBe(3);
      expect(bloques.find((b) => b.content === GREEK_FORMULAS.theotokeParthene.spanish)?.times, time).toBe(3);
      expect(pasos.filter((p) => p.prayerId === 'simbolo-de-la-fe'), time).toHaveLength(1);
    }
  });
});

describe('hacer propia una forma', () => {
  it('copia la extensa al oficio habitual, y restaurar lo devuelve a su forma de fábrica', async () => {
    await restoreOffice('noche', 'extenso');
    const regla = await ruleForTime('noche');
    const copiados = await ruleItems(regla!.id);
    expect(copiados.map((i) => i.title)).toEqual(OFFICE_VARIANTS.noche.extenso.steps.map((p) => p.title));
    expect(copiados.find((i) => i.linkKind === 'office')?.sections).toContain('perdon');

    await restoreOffice('noche');
    const devueltos = await ruleItems(regla!.id);
    const fabrica = DAILY_OFFICES.find((o) => o.time === 'noche')!.steps;
    expect(devueltos.map((i) => i.id)).toEqual(stepsToItems(regla!.id, fabrica).map((i) => i.id));
  });
});
