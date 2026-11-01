/**
 * La Pascualia, contra fechas publicadas.
 */
import { describe, expect, it } from 'vitest';
import { paschalion, paschalionYear } from '@/lib/calendar/paschalion';

describe('la Pascualia', () => {
  it('2025: las dos Pascuas el 20 de abril', () => {
    const a = paschalionYear(2025);
    expect(a.pascha).toBe('2025-04-20');
    expect(a.together).toBe(true);
  });

  it('2026: la ortodoxa el 12 de abril, la occidental el 5', () => {
    const a = paschalionYear(2026);
    expect(a.pascha).toBe('2026-04-12');
    expect(a.western).toBe('2026-04-05');
    expect(a.together).toBe(false);
    expect(a.cleanMonday).toBe('2026-02-23');
    expect(a.pentecost).toBe('2026-05-31');
    expect(a.ascension).toBe('2026-05-21');
  });

  it('2027: Pascua el 2 de mayo y el Triodio el 21 de febrero', () => {
    const a = paschalionYear(2027);
    expect(a.pascha).toBe('2027-05-02');
    expect(a.triodion).toBe('2027-02-21');
  });

  it('el ayuno de los Apóstoles es más largo en el juliano, y puede no existir en el nuevo', () => {
    for (const a of paschalion(2020, 40)) {
      expect(a.apostlesFast.juliano).toBeGreaterThan(a.apostlesFast.nuevo);
      expect(a.apostlesFast.nuevo).toBeGreaterThanOrEqual(0);
    }
    // 2027: Todos los Santos el 27 de junio; en el calendario nuevo no queda
    // más que el lunes 28.
    expect(paschalionYear(2027).apostlesFast.nuevo).toBe(1);
  });

  it('la Kyriopascha: la Anunciación en Pascua, en 1991', () => {
    expect(paschalionYear(1991).kyriopascha).toBe(true);
    expect(paschalionYear(2026).kyriopascha).toBe(false);
  });

  it('la Pascua es siempre domingo', () => {
    for (const a of paschalion(2000, 100)) {
      expect(new Date(`${a.pascha}T12:00:00Z`).getUTCDay(), String(a.year)).toBe(0);
    }
  });
});
