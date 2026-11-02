/**
 * El nombre del tiempo y de la semana, como lo dicen los calendarios
 * ortodoxos. Ninguna jornada del año puede salir como «tiempo ordinario»,
 * que es una noción del rito latino.
 */
import { describe, expect, it } from 'vitest';
import { SEASON_LABELS, computeLiturgicalDay, ordinal, weekLabel } from '@/lib/calendar/liturgical';
import { addDaysIso, isoToJdn, jdnToIso } from '@/lib/calendar/jdn';
import { paschaIso } from '@/lib/calendar/pascha';

const at = (iso: string) => computeLiturgicalDay(iso, 'nuevo');

describe('el tiempo litúrgico', () => {
  it('no hay ningún día de «tiempo ordinario» en dos años', () => {
    const inicio = isoToJdn('2026-01-01');
    for (let i = 0; i < 730; i++) {
      const d = at(jdnToIso(inicio + i));
      expect(SEASON_LABELS[d.season]).toBeTruthy();
      expect(SEASON_LABELS[d.season].toLowerCase()).not.toContain('ordinario');
    }
  });

  it('la Semana Luminosa va de la Pascua al sábado siguiente', () => {
    const pascua = paschaIso(2026);
    expect(at(pascua).season).toBe('semana-luminosa');
    expect(at(addDaysIso(pascua, 6)).season).toBe('semana-luminosa');
    expect(at(addDaysIso(pascua, 7)).season).toBe('pentecostario');
  });

  it('del 25 de diciembre al 4 de enero son los Santos Días', () => {
    expect(at('2026-12-25').season).toBe('dodecaemeron');
    expect(at('2027-01-04').season).toBe('dodecaemeron');
    expect(at('2026-12-24').season).toBe('ayuno-natividad');
  });
});

describe('el nombre de la semana', () => {
  it('el 1 de noviembre de 2026 es el 22.º domingo después de Pentecostés', () => {
    // Pascua el 12 de abril, Pentecostés el 31 de mayo: veintidós semanas.
    expect(weekLabel(at('2026-11-01'))).toBe('22.º domingo después de Pentecostés');
    expect(weekLabel(at('2026-11-02'))).toBe('23.ª semana después de Pentecostés');
  });

  it('Todos los Santos es el primer domingo después de Pentecostés', () => {
    const d = at(addDaysIso(paschaIso(2026), 56));
    expect(weekLabel(d)).toBe('1.er domingo después de Pentecostés');
  });

  it('Tomás es el segundo domingo de Pascua y las Miróforas el tercero', () => {
    const pascua = paschaIso(2026);
    expect(weekLabel(at(addDaysIso(pascua, 7)))).toBe('2.º domingo de Pascua');
    expect(weekLabel(at(addDaysIso(pascua, 14)))).toBe('3.er domingo de Pascua');
    expect(weekLabel(at(addDaysIso(pascua, 8)))).toBe('2.ª semana de Pascua');
  });

  it('el de la Ortodoxia es el primer domingo de la Gran Cuaresma', () => {
    const pascua = paschaIso(2027);
    expect(weekLabel(at(addDaysIso(pascua, -48)))).toBe('1.ª semana de la Gran Cuaresma');
    expect(weekLabel(at(addDaysIso(pascua, -42)))).toBe('1.er domingo de la Gran Cuaresma');
    expect(weekLabel(at(addDaysIso(pascua, -14)))).toBe('5.º domingo de la Gran Cuaresma');
  });

  it('el Triodio, la Semana Santa y la Luminosa no llevan número', () => {
    const pascua = paschaIso(2027);
    expect(weekLabel(at(addDaysIso(pascua, -70)))).toBeNull();
    expect(weekLabel(at(addDaysIso(pascua, -3)))).toBeNull();
    expect(weekLabel(at(addDaysIso(pascua, 3)))).toBeNull();
  });

  it('los domingos siguen contándose después de Pentecostés hasta el Triodio', () => {
    // Pascua de 2027 el 2 de mayo: el Triodio empieza el 21 de febrero.
    expect(weekLabel(at('2027-02-14'))).toBe('37.º domingo después de Pentecostés');
  });

  it('concuerda el ordinal', () => {
    expect(ordinal(1, 'm')).toBe('1.er');
    expect(ordinal(3, 'm')).toBe('3.er');
    expect(ordinal(11, 'm')).toBe('11.º');
    expect(ordinal(13, 'm')).toBe('13.er');
    expect(ordinal(21, 'm')).toBe('21.er');
    expect(ordinal(22, 'm')).toBe('22.º');
    expect(ordinal(1, 'f')).toBe('1.ª');
  });
});
