/**
 * El kontakion del día en las Horas, y los kontakia de los santos.
 *
 * Igual que el tropario, es lógica de calendario fácil de equivocar sin que
 * se note. Se prueba sobre fechas calculadas a partir de la Pascua de cada
 * año para que no caduquen.
 */
import { describe, expect, it } from 'vitest';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { paschaIso } from '@/lib/calendar/pascha';
import { addDaysIso } from '@/lib/calendar/jdn';
import { kontakiaForDay } from '@/lib/calendar/day-kontakia';
import {
  LENTEN_HOURS,
  MOVABLE_KONTAKIA,
  RESURRECTION_KONTAKIA,
  SAINT_KONTAKIA,
  WEEKDAY_KONTAKIA,
} from '@/content/kontakia';
import { MOVABLE_FEASTS } from '@/content/feasts';
import { SAINTS } from '@/content/saints';
import { OFFICES } from '@/content/offices';

const PASCUA = paschaIso(2026);
const dia = (offset: number) => computeLiturgicalDay(addDaysIso(PASCUA, offset), 'nuevo');
const kontakia = (offset: number, hora?: string) => {
  const r = kontakiaForDay(dia(offset), hora);
  if (r.kind !== 'kontakia') throw new Error(`día ${offset}: ${r.kind}`);
  return r;
};

describe('los textos', () => {
  it('hay un kontakion de la Resurrección por tono, distinto en cada uno', () => {
    for (let tono = 1; tono <= 8; tono++) expect(RESURRECTION_KONTAKIA[tono]?.tone).toBe(`Tono ${tono}`);
    expect(new Set(Object.values(RESURRECTION_KONTAKIA).map((k) => k.blocks[0]!.content)).size).toBe(8);
  });

  it('cada día de la semana, de lunes a sábado, tiene el suyo', () => {
    for (let d = 1; d <= 6; d++) expect(WEEKDAY_KONTAKIA[d]!.items.length).toBeGreaterThan(0);
  });

  it('los de los santos y las fiestas apuntan a fichas que existen', () => {
    const ids = new Set(SAINTS.map((s) => s.id));
    for (const id of Object.keys(SAINT_KONTAKIA)) expect(ids.has(id), id).toBe(true);
    const fiestas = new Set(MOVABLE_FEASTS.map((f) => f.id));
    for (const id of Object.keys(MOVABLE_KONTAKIA)) expect(fiestas.has(id), id).toBe(true);
  });

  it('los traducidos del eslavo lo dicen', () => {
    for (const k of [...Object.values(SAINT_KONTAKIA), ...Object.values(MOVABLE_KONTAKIA)]) {
      if (k.eslavo) expect(k.blocks.map((b) => b.content).join(' ')).toContain('eslavo');
    }
    expect(MOVABLE_KONTAKIA['viernes-santo']!.eslavo).toBe(true);
  });
});

describe('qué kontakion toca cada día', () => {
  it('en la Semana Luminosa, el de Pascua', () => {
    for (let d = 0; d <= 6; d++) {
      const r = kontakiaForDay(dia(d));
      expect(r.kind).toBe('luminosa');
      if (r.kind === 'luminosa') expect(r.items[0]!.blocks[0]!.content).toContain('Aunque bajaste al sepulcro');
    }
  });

  it('un día de diario de Cuaresma, lo propio de cada Hora', () => {
    const lunes = kontakiaForDay(dia(-20), 'hora-tercera');
    expect(lunes.kind).toBe('cuaresma');
    if (lunes.kind === 'cuaresma') {
      expect(lunes.blocks.map((b) => b.content).join(' ')).toContain('pescadores');
      expect(lunes.cuartaSemana).toBe(false);
    }
    const primeraLunes = kontakiaForDay(dia(-20), 'hora-primera');
    // El 25 de marzo de 2026 cae en miércoles y es la Anunciación: se toma el de la semana anterior.
    const primeraMiercoles = kontakiaForDay(dia(-25), 'hora-primera');
    if (primeraLunes.kind !== 'cuaresma' || primeraMiercoles.kind !== 'cuaresma') throw new Error('no es Cuaresma');
    expect(primeraLunes.blocks[0]!.content).toContain('Madre de Dios');
    expect(primeraMiercoles.blocks[0]!.content).toContain('Adelántate');
  });

  it('en la cuarta semana se añade el kontakion de la Cruz', () => {
    const r = kontakiaForDay(dia(-27), 'hora-sexta');
    expect(dia(-27).weekday).toBe(1);
    expect(r.kind === 'cuaresma' && r.cuartaSemana).toBe(true);
  });

  it('las cuatro Horas tienen lo suyo para la Cuaresma', () => {
    for (const h of ['hora-primera', 'hora-tercera', 'hora-sexta', 'hora-novena']) {
      expect(LENTEN_HOURS[h], h).toBeDefined();
    }
  });

  it('el domingo ordinario, el de la Resurrección del tono, primero', () => {
    const d = dia(70);
    expect(d.weekday).toBe(0);
    const r = kontakia(70);
    expect(r.items[0]!.origin).toBe('resurreccion');
    expect(r.items[0]!.tone).toBe(`Tono ${d.tone}`);
  });

  it('el Domingo de Ramos desplaza al de la Resurrección', () => {
    const r = kontakia(-7);
    expect(r.items.some((i) => i.origin === 'resurreccion')).toBe(false);
    expect(r.items[0]!.blocks[0]!.content).toContain('pollino');
  });

  it('el Jueves Santo, sólo el del día, aunque haya santos', () => {
    const r = kontakia(-3);
    expect(r.items).toHaveLength(1);
    expect(r.items[0]!.blocks[0]!.content).toContain('traidor');
  });

  it('san Nicolás tiene el suyo el 6 de diciembre', () => {
    const r = kontakiaForDay(computeLiturgicalDay('2026-12-06', 'nuevo'));
    if (r.kind !== 'kontakia') throw new Error(r.kind);
    expect(r.items.some((i) => i.blocks[0]!.content.includes('En Mira'))).toBe(true);
  });

  it('cuando ningún santo del día tiene kontakion, se dice el del día de la semana y se avisa', () => {
    // Se busca un martes del tiempo ordinario sin kontakion propio.
    let hallado = false;
    for (let off = 60; off < 300 && !hallado; off++) {
      const d = dia(off);
      if (d.weekday !== 2 || d.season !== 'tiempo-ordinario' || d.feasts.length > 0) continue;
      if (d.saints.length === 0 || d.saints.some((s) => SAINT_KONTAKIA[s.id])) continue;
      const r = kontakiaForDay(d);
      if (r.kind !== 'kontakia') throw new Error(r.kind);
      expect(r.items[0]!.origin).toBe('semana');
      expect(r.items[0]!.blocks[0]!.content).toContain('Precursor de la gracia');
      expect(r.sinPropio.length).toBeGreaterThan(0);
      hallado = true;
    }
    expect(hallado).toBe(true);
  });
});

describe('las Horas', () => {
  it('ya no dejan el kontakion pendiente: lo eligen según el día y la Hora', () => {
    for (const id of ['hora-primera', 'hora-tercera', 'hora-sexta', 'hora-novena']) {
      const o = OFFICES.find((x) => x.id === id)!;
      expect(o.status).toBe('complete');
      const bloques = o.sections.flatMap((s) => s.blocks);
      expect(bloques.some((b) => b.kind === 'pending')).toBe(false);
      expect(bloques.find((b) => b.kind === 'day-kontakion')?.ref).toBe(id);
    }
  });
});
