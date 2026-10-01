/**
 * El tropario del día en las Horas.
 *
 * Es lógica de calendario y es fácil equivocarla sin que se note: un domingo
 * sin tropario de la Resurrección, un día de Cuaresma con el del santo, un
 * Jueves Santo con el de un santo cualquiera. Se prueba sobre fechas reales,
 * calculadas a partir de la Pascua de cada año para que no caduquen.
 */
import { describe, expect, it } from 'vitest';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { paschaIso } from '@/lib/calendar/pascha';
import { addDaysIso } from '@/lib/calendar/jdn';
import { troparionsForDay } from '@/lib/calendar/day-troparia';
import {
  MOVABLE_SAINT_OF,
  MOVABLE_TROPARIA,
  OCTOECHOS_META,
  PASCHAL_CYCLE_META,
  RESURRECTION_TROPARIA,
} from '@/content/troparia-domingo';
import { MOVABLE_FEASTS } from '@/content/feasts';
import { SAINTS } from '@/content/saints';

const PASCUA = paschaIso(2026);
const dia = (offset: number) => computeLiturgicalDay(addDaysIso(PASCUA, offset), 'nuevo');
const troparios = (offset: number) => {
  const r = troparionsForDay(dia(offset));
  if (r.kind !== 'troparios') throw new Error(`día ${offset}: ${r.kind}`);
  return r.items;
};

describe('los ocho tonos', () => {
  it('hay un tropario de la Resurrección por tono, y cada uno dice su tono', () => {
    for (let tono = 1; tono <= 8; tono++) {
      expect(RESURRECTION_TROPARIA[tono]?.tone).toBe(`Tono ${tono}`);
    }
    const textos = new Set(Object.values(RESURRECTION_TROPARIA).map((t) => t.blocks[0]!.content));
    expect(textos.size).toBe(8);
  });
});

describe('qué tropario toca cada día', () => {
  it('en la Semana Luminosa no hay Horas ordinarias', () => {
    for (let d = 0; d <= 6; d++) expect(troparionsForDay(dia(d)).kind).toBe('luminosa');
  });

  it('un día de diario de Cuaresma se canta el de la Hora, no el del día', () => {
    // Lunes de la cuarta semana: veinte días antes de la Pascua.
    const d = dia(-20);
    expect(d.weekday).toBe(1);
    expect(troparionsForDay(d).kind).toBe('cuaresma');
  });

  it('pero la Anunciación, aunque caiga en Cuaresma, trae su tropario', () => {
    const d = computeLiturgicalDay('2026-03-25', 'nuevo');
    expect(d.season).toBe('gran-cuaresma');
    const r = troparionsForDay(d);
    expect(r.kind).toBe('troparios');
    if (r.kind === 'troparios') expect(r.items[0]!.origin).toBe('fiesta');
  });

  it('un domingo ordinario empieza por el de la Resurrección de su tono', () => {
    const d = computeLiturgicalDay('2026-10-04', 'nuevo');
    expect(d.weekday).toBe(0);
    const r = troparionsForDay(d);
    if (r.kind !== 'troparios') throw new Error(r.kind);
    expect(r.items[0]!.origin).toBe('resurreccion');
    expect(r.items[0]!.tone).toBe(`Tono ${d.tone}`);
    expect(r.items[0]!.meta).toBe(OCTOECHOS_META);
  });

  it('el Domingo de las Miróforas: primero la Resurrección, después la fiesta', () => {
    const items = troparios(14);
    expect(items[0]!.origin).toBe('resurreccion');
    expect(items[1]!.name).toMatch(/Miróforas/);
  });

  it('Tomás y Pentecostés desplazan al tropario de la Resurrección', () => {
    for (const offset of [7, 49]) {
      const items = troparios(offset);
      expect(items.some((i) => i.origin === 'resurreccion'), String(offset)).toBe(false);
      expect(items[0]!.origin, String(offset)).toBe('fiesta-movil');
      expect(items[0]!.meta).toBe(PASCHAL_CYCLE_META);
    }
  });

  it('la Ascensión, que cae en jueves, lleva el suyo', () => {
    expect(troparios(39)[0]!.name).toBe('Tropario de la Ascensión');
  });

  it('en la Semana Santa, el del día y ninguno de santos', () => {
    expect(troparios(-3).map((i) => i.name)).toEqual(['Tropario del Jueves Santo']);
    expect(troparios(-1).map((i) => i.name)).toEqual(['Tropario del Sábado Santo']);
    expect(troparios(-5)[0]!.name).toBe('Tropario del Esposo');
  });

  it('un día de diario corriente da el del santo, propio o general', () => {
    const d = computeLiturgicalDay('2026-10-06', 'nuevo');
    const r = troparionsForDay(d);
    if (r.kind !== 'troparios') throw new Error(r.kind);
    expect(r.items.length).toBeGreaterThan(0);
    expect(r.items.every((i) => ['propio', 'general', 'fiesta'].includes(i.origin))).toBe(true);
  });

  it('no repite el mismo texto dos veces en un día', () => {
    for (let d = -60; d < 300; d += 1) {
      const r = troparionsForDay(dia(d));
      if (r.kind !== 'troparios') continue;
      const textos = r.items.map((i) => i.blocks.map((b) => b.content).join());
      expect(new Set(textos).size, `día ${d}`).toBe(textos.length);
    }
  });
});

describe('las fiestas móviles', () => {
  it('las que celebran a un santo apuntan a una ficha que existe', () => {
    const ids = new Set(SAINTS.map((s) => s.id));
    for (const [fiesta, santo] of Object.entries(MOVABLE_SAINT_OF)) {
      expect(ids.has(santo), `${fiesta} → ${santo}`).toBe(true);
    }
  });

  it('cada tropario móvil es de una fiesta que existe en el calendario', () => {
    const ids = new Set(MOVABLE_FEASTS.map((f) => f.id));
    for (const id of [...Object.keys(MOVABLE_TROPARIA), ...Object.keys(MOVABLE_SAINT_OF)]) {
      expect(ids.has(id), id).toBe(true);
    }
  });
});
