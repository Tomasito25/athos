/**
 * Los planes de lectura.
 *
 * Los días no se escriben a mano: se calculan. Eso quita trescientas líneas de
 * datos y mete un reparto que hay que vigilar, porque un plan que se salta un
 * capítulo o que repite otro no se nota leyéndolo: se nota tres meses después,
 * cuando falta un trozo del Evangelio.
 */
import { describe, expect, it } from 'vitest';
import { PLANS_NOTE, READING_PLANS, daysOf } from '@/content/plans';
import { nextDay } from '@/db/plans';
import { BIBLE_BOOKS } from '@/content/bible';
import type { ReadingProgress } from '@/types';

describe('el reparto de los días', () => {
  it('ningún plan se queda sin días', () => {
    for (const plan of READING_PLANS) {
      expect(daysOf(plan.id).length, plan.title).toBeGreaterThan(0);
    }
  });

  it('los días van numerados del uno al último, sin saltos', () => {
    for (const plan of READING_PLANS) {
      const dias = daysOf(plan.id);
      dias.forEach((d, i) => {
        expect(d.number, `${plan.title}: numeración rota`).toBe(i + 1);
      });
    }
  });

  it('el plan de los Evangelios cubre los cuatro, capítulo por capítulo', () => {
    const dias = daysOf('evangelios');
    const capitulos = ['MAT', 'MRK', 'LUK', 'JHN']
      .map((id) => BIBLE_BOOKS.find((b) => b.id === id)!.chapters)
      .reduce((a, b) => a + b, 0);
    // Un capítulo por día y ni uno de más.
    expect(dias.length).toBe(capitulos);
    expect(dias[0].label).toBe('Mateo 1');
    expect(dias[dias.length - 1].label).toBe(
      `Juan ${BIBLE_BOOKS.find((b) => b.id === 'JHN')!.chapters}`,
    );
  });

  it('la Biblia entera empieza en el Génesis y acaba en el Apocalipsis', () => {
    const dias = daysOf('biblia-entera');
    expect(dias.length).toBeLessThanOrEqual(365);
    expect(dias[0].label).toMatch(/^Génesis 1/);
    expect(dias[dias.length - 1].label).toMatch(/Apocalipsis/);
  });

  it('reparte parejo: ningún día tiene el doble que otro', () => {
    // El reparto por proporción da tramos que difieren como mucho en uno. Si
    // alguna vez difieren en más, el cálculo se ha roto.
    for (const plan of READING_PLANS) {
      if (plan.id === 'salterio-veinte-dias') continue;
      const tamanos = daysOf(plan.id).map((d) => {
        // «Génesis 1–3» son tres; «Malaquías 4 · Mateo 1» son dos.
        return d.label.split(' · ').reduce((n, parte) => {
          const m = parte.match(/(\d+)–(\d+)$/);
          return n + (m ? Number(m[2]) - Number(m[1]) + 1 : 1);
        }, 0);
      });
      expect(Math.max(...tamanos) - Math.min(...tamanos), plan.title).toBeLessThanOrEqual(1);
    }
  });

  it('cada día lleva a un sitio que se puede abrir', () => {
    for (const plan of READING_PLANS) {
      for (const dia of daysOf(plan.id)) {
        expect(dia.path, `${plan.title} día ${dia.number}`).toMatch(
          /^\/leer\/(biblia\/[A-Z0-9]+\/\d+|salterio\/kathisma\/\d+)$/,
        );
      }
    }
  });

  it('el Salterio va por kathismata, que son veinte', () => {
    const dias = daysOf('salterio-veinte-dias');
    expect(dias.length).toBe(20);
    expect(dias[0].label).toBe('Kathisma 1');
  });

  it('no promete un plan que no exista', () => {
    expect(daysOf('inventado')).toEqual([]);
  });
});

describe('el avance', () => {
  const progreso = (hechos: string[]): ReadingProgress => ({
    id: 'plan:x',
    kind: 'plan',
    refId: 'x',
    completed: hechos,
    total: 10,
    updatedAt: '2026-01-01T00:00:00.000Z',
  });

  it('sin nada hecho, toca el día uno', () => {
    expect(nextDay(undefined, 10)).toBe(1);
    expect(nextDay(progreso([]), 10)).toBe(1);
  });

  it('con días sueltos hechos, toca el primer hueco y no el siguiente al último', () => {
    // Saltarse un día y seguir es lo normal. El plan tiene que llevarte de
    // vuelta al que falta, no darlo por perdido.
    expect(nextDay(progreso(['1', '2', '4']), 10)).toBe(3);
  });

  it('cuando está todo hecho, no hay siguiente', () => {
    const todos = Array.from({ length: 10 }, (_, i) => String(i + 1));
    expect(nextDay(progreso(todos), 10)).toBeNull();
  });
});

describe('lo que se promete', () => {
  it('cada plan explica qué exige antes de empezarlo', () => {
    for (const plan of READING_PLANS) {
      expect(plan.about.length, plan.title).toBeGreaterThan(180);
      expect(plan.subtitle.length, plan.title).toBeGreaterThan(10);
    }
  });

  it('se distingue del leccionario de la Iglesia', () => {
    // Es la confusión que hay que evitar: esto no es lo que se lee en la
    // Liturgia, y decirlo no es una nota al pie sino la mitad del asunto.
    expect(PLANS_NOTE).toMatch(/leccionario/);
    expect(PLANS_NOTE).toMatch(/no son la lectura de la Iglesia/);
  });
});
