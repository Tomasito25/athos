import { describe, expect, it } from 'vitest';
import {
  governingPascha,
  paschaGregorianWestern,
  paschaIso,
  paschaJulian,
  toneForOffset,
} from '@/lib/calendar/pascha';
import { gregorianToJdn, isoToJdn, jdnToGregorian, jdnToJulian, julianToJdn } from '@/lib/calendar/jdn';

describe('conversión de calendarios', () => {
  it('ida y vuelta gregoriano ↔ JDN', () => {
    for (const [y, m, d] of [
      [1, 1, 1],
      [1582, 10, 15],
      [1900, 3, 1],
      [2000, 2, 29],
      [2026, 8, 23],
      [2100, 12, 31],
    ] as const) {
      const jdn = gregorianToJdn(y, m, d);
      expect(jdnToGregorian(jdn)).toEqual({ year: y, month: m, day: d });
    }
  });

  it('ida y vuelta juliano ↔ JDN', () => {
    for (const [y, m, d] of [
      [1, 1, 1],
      [1582, 10, 5],
      [2026, 8, 10],
    ] as const) {
      const jdn = julianToJdn(y, m, d);
      expect(jdnToJulian(jdn)).toEqual({ year: y, month: m, day: d });
    }
  });

  it('el desfase juliano es de 13 días en el siglo XXI', () => {
    // 7 de enero gregoriano = 25 de diciembre juliano (Navidad del calendario viejo).
    const jdn = gregorianToJdn(2026, 1, 7);
    expect(jdnToJulian(jdn)).toEqual({ year: 2025, month: 12, day: 25 });
  });

  it('el desfase era de 12 días en el siglo XIX', () => {
    const jdn = gregorianToJdn(1899, 3, 1);
    expect(jdnToJulian(jdn)).toEqual({ year: 1899, month: 2, day: 17 });
  });
});

describe('paschalion ortodoxo', () => {
  // Fechas gregorianas de la Pascua ortodoxa, verificables en cualquier
  // calendario eclesiástico publicado.
  const known: Record<number, string> = {
    2018: '2018-04-08',
    2019: '2019-04-28',
    2020: '2020-04-19',
    2021: '2021-05-02',
    2022: '2022-04-24',
    2023: '2023-04-16',
    2024: '2024-05-05',
    2025: '2025-04-20',
    2026: '2026-04-12',
    2027: '2027-05-02',
    2028: '2028-04-16',
    2029: '2029-04-08',
    2030: '2030-04-28',
    2031: '2031-04-13',
    2032: '2032-05-02',
    2033: '2033-04-24',
    2034: '2034-04-09',
  };

  it.each(Object.entries(known))('Pascua de %s cae el %s', (year, iso) => {
    expect(paschaIso(Number(year))).toBe(iso);
  });

  it('siempre cae en domingo', () => {
    for (let y = 1900; y <= 2200; y++) {
      const jdn = isoToJdn(paschaIso(y));
      expect((jdn + 1) % 7).toBe(0);
    }
  });

  it('en el calendario juliano nunca sale del 22 de marzo – 25 de abril', () => {
    for (let y = 1900; y <= 2200; y++) {
      const { month, day } = paschaJulian(y);
      const ordinal = month === 3 ? day : 31 + day;
      expect(ordinal).toBeGreaterThanOrEqual(22);
      expect(ordinal).toBeLessThanOrEqual(56); // 25 de abril
    }
  });

  it('coincide con la Pascua occidental en los años en que ambas se juntan', () => {
    // 2010, 2011, 2014, 2017 son años de Pascua común.
    for (const y of [2010, 2011, 2014, 2017]) {
      const west = paschaGregorianWestern(y);
      const iso = paschaIso(y);
      expect(iso).toBe(
        `${y}-${String(west.month).padStart(2, '0')}-${String(west.day).padStart(2, '0')}`,
      );
    }
  });

  it('no se puede obtener sumando días fijos al año anterior', () => {
    // Comprobación explícita de que las fechas móviles no son lineales.
    const deltas = new Set<number>();
    for (let y = 2020; y < 2035; y++) {
      deltas.add(isoToJdn(paschaIso(y + 1)) - isoToJdn(paschaIso(y)));
    }
    expect(deltas.size).toBeGreaterThan(1);
  });
});

describe('pascua que gobierna una fecha', () => {
  it('en enero remite a la Pascua del año anterior', () => {
    const jdn = isoToJdn('2026-01-15');
    expect(governingPascha(jdn).year).toBe(2025);
  });

  it('el mismo día de Pascua se gobierna a sí mismo', () => {
    const jdn = isoToJdn('2026-04-12');
    const g = governingPascha(jdn);
    expect(g.year).toBe(2026);
    expect(g.jdn).toBe(jdn);
  });

  it('la víspera de Pascua remite todavía al año anterior', () => {
    const jdn = isoToJdn('2026-04-11');
    expect(governingPascha(jdn).year).toBe(2025);
  });
});

describe('tono del Octoecos', () => {
  it('no hay tono durante la Semana de la Renovación', () => {
    for (let o = 0; o < 7; o++) expect(toneForOffset(o)).toBeNull();
  });

  it('el Domingo de Tomás abre el tono 1', () => {
    expect(toneForOffset(7)).toBe(1);
  });

  it('recorre los ocho tonos y vuelve a empezar', () => {
    expect(toneForOffset(14)).toBe(2);
    expect(toneForOffset(56)).toBe(8);
    expect(toneForOffset(63)).toBe(1);
    expect(toneForOffset(70)).toBe(2);
  });

  it('el ciclo es continuo también antes de la Pascua siguiente', () => {
    for (let o = 7; o < 380; o++) {
      const t = toneForOffset(o)!;
      expect(t).toBeGreaterThanOrEqual(1);
      expect(t).toBeLessThanOrEqual(8);
    }
  });
});
