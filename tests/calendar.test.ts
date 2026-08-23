import { describe, expect, it } from 'vitest';
import { computeLiturgicalDay, monthOfLiturgicalDays } from '@/lib/calendar/liturgical';
import { addDaysIso, isoToJdn, jdnToIso } from '@/lib/calendar/jdn';
import { paschaIso } from '@/lib/calendar/pascha';
import { fastingFor } from '@/lib/calendar/fasting';

const at = (iso: string) => computeLiturgicalDay(iso, 'nuevo');
const old = (iso: string) => computeLiturgicalDay(iso, 'juliano');

describe('día litúrgico', () => {
  it('sitúa la Pascua de 2026 y sus fiestas', () => {
    const day = at('2026-04-12');
    expect(day.paschaOffset).toBe(0);
    expect(day.feasts[0].id).toBe('pascua');
    expect(day.fasting.level).toBe('fast-free');
    expect(day.readings?.title).toContain('Pascua');
  });

  it('reconoce el Lunes Puro como comienzo de la Gran Cuaresma', () => {
    const lunesPuro = addDaysIso(paschaIso(2026), -48);
    const day = at(lunesPuro);
    expect(day.season).toBe('gran-cuaresma');
    expect(day.feasts.some((f) => f.id === 'lunes-puro')).toBe(true);
    expect(day.fasting.level).toBe('strict');
  });

  it('calcula Pentecostés cincuenta días después de Pascua', () => {
    const day = at(addDaysIso(paschaIso(2026), 49));
    expect(day.feasts[0].id).toBe('pentecostes');
    expect(day.weekday).toBe(0);
  });

  it('coloca la Ascensión en jueves', () => {
    for (let y = 2020; y <= 2035; y++) {
      const day = at(addDaysIso(paschaIso(y), 39));
      expect(day.weekday).toBe(4);
      expect(day.feasts.some((f) => f.id === 'ascension')).toBe(true);
    }
  });

  it('encuentra la Natividad el 25 de diciembre en calendario nuevo', () => {
    const day = at('2026-12-25');
    expect(day.feasts.some((f) => f.id === 'natividad')).toBe(true);
    expect(day.fasting.level).toBe('fast-free');
  });

  it('desplaza la Natividad al 7 de enero en calendario juliano', () => {
    expect(old('2027-01-07').feasts.some((f) => f.id === 'natividad')).toBe(true);
    expect(old('2026-12-25').feasts.some((f) => f.id === 'natividad')).toBe(false);
  });

  it('el tono acompaña siempre a un domingo del tiempo ordinario', () => {
    const day = at('2026-10-11');
    expect(day.weekday).toBe(0);
    expect(day.tone).toBeGreaterThanOrEqual(1);
    expect(day.tone).toBeLessThanOrEqual(8);
  });

  it('devuelve el santo del día', () => {
    expect(at('2026-11-13').saints.some((s) => s.id === 'juan-crisostomo')).toBe(true);
  });

  it('genera un mes completo sin huecos', () => {
    const days = monthOfLiturgicalDays(2026, 2, 'nuevo');
    expect(days).toHaveLength(28);
    expect(days[0].date).toBe('2026-02-01');
    expect(days.at(-1)!.date).toBe('2026-02-28');
  });

  it('respeta los años bisiestos', () => {
    expect(monthOfLiturgicalDays(2028, 2, 'nuevo')).toHaveLength(29);
  });
});

describe('reglas de ayuno', () => {
  const paschaOf = (y: number) => paschaIso(y);
  const rel = (y: number, offset: number) => at(addDaysIso(paschaOf(y), offset));

  it('la Semana Luminosa entera es sin ayuno', () => {
    for (let o = 0; o <= 6; o++) {
      expect(rel(2026, o).fasting.level).toBe('fast-free');
    }
  });

  it('la semana del Publicano y el Fariseo es sin ayuno, incluido el viernes', () => {
    const viernes = rel(2026, -65);
    expect(viernes.weekday).toBe(5);
    expect(viernes.fasting.level).toBe('fast-free');
  });

  it('en la Semana de Queso se permiten lácteos pero no carne', () => {
    const miercoles = rel(2026, -53);
    expect(miercoles.weekday).toBe(3);
    expect(miercoles.fasting.allowance.dairy).toBe(true);
    expect(miercoles.fasting.allowance.meat).toBe(false);
  });

  it('los días laborables de Cuaresma son de xerofagia y los fines de semana con aceite', () => {
    const martes = rel(2026, -46);
    expect(martes.fasting.level).toBe('xerophagy');
    const domingo = rel(2026, -42);
    expect(domingo.fasting.level).toBe('wine-oil');
  });

  it('el Domingo de Ramos permite pescado', () => {
    expect(rel(2026, -7).fasting.allowance.fish).toBe(true);
  });

  it('el Viernes Santo es el ayuno más estricto', () => {
    const day = rel(2026, -2);
    expect(day.fasting.level).toBe('strict');
    expect(Object.values(day.fasting.allowance).every((v) => v === false)).toBe(true);
  });

  it('miércoles y viernes del Pentecostario permiten pescado', () => {
    const viernes = rel(2026, 12);
    expect(viernes.weekday).toBe(5);
    expect(viernes.fasting.allowance.fish).toBe(true);
    expect(viernes.fasting.allowance.dairy).toBe(false);
  });

  it('la semana de Pentecostés es sin ayuno', () => {
    expect(rel(2026, 52).fasting.level).toBe('fast-free');
  });

  it('el Ayuno de la Dormición cubre del 1 al 14 de agosto', () => {
    expect(at('2026-08-05').fasting.periodId).toBe('dormicion');
    expect(at('2026-08-06').fasting.allowance.fish).toBe(true); // Transfiguración
    expect(at('2026-08-15').fasting.periodId).not.toBe('dormicion');
  });

  it('el Ayuno de la Natividad suprime el pescado a partir del 20 de diciembre', () => {
    expect(at('2026-12-22').fasting.allowance.fish).toBe(false);
    expect(at('2026-11-21').fasting.allowance.fish).toBe(true); // Entrada de la Theotokos
  });

  it('del 25 de diciembre al 4 de enero no hay ayuno', () => {
    expect(at('2026-12-30').fasting.level).toBe('fast-free');
    expect(at('2027-01-02').fasting.level).toBe('fast-free');
    expect(at('2027-01-05').fasting.level).toBe('strict');
  });

  it('la Exaltación de la Cruz es día de ayuno aunque caiga en domingo', () => {
    const day = at('2025-09-14');
    expect(day.weekday).toBe(0);
    expect(day.fasting.level).toBe('wine-oil');
  });

  it('miércoles y viernes ordinarios son de xerofagia', () => {
    const day = at('2026-10-14');
    expect(day.weekday).toBe(3);
    expect(day.fasting.level).toBe('xerophagy');
  });

  it('una gran fiesta en viernes permite pescado', () => {
    // 21 de noviembre de 2025, Entrada de la Theotokos, cae en viernes.
    const day = at('2025-11-21');
    expect(day.weekday).toBe(5);
    expect(day.fasting.allowance.fish).toBe(true);
  });

  it('el Ayuno de los Apóstoles empieza el lunes siguiente a Todos los Santos', () => {
    const inicio = rel(2026, 57);
    expect(inicio.weekday).toBe(1);
    expect(inicio.fasting.periodId).toBe('apostoles');
    expect(rel(2026, 56).fasting.periodId).not.toBe('apostoles');
  });

  it('el Ayuno de los Apóstoles termina en los santos Pedro y Pablo', () => {
    const day = at('2026-06-29');
    expect(day.fasting.periodId).not.toBe('apostoles');
    expect(day.feasts.some((f) => f.id === 'pedro-pablo')).toBe(true);
  });

  it('todos los días del año reciben una regla', () => {
    for (let i = 0; i < 366 * 3; i++) {
      const iso = jdnToIso(isoToJdn('2024-01-01') + i);
      const day = at(iso);
      expect(day.fasting.label.length).toBeGreaterThan(0);
      expect(day.fasting.reason.length).toBeGreaterThan(0);
    }
  });

  it('el motor es puro: la misma entrada da el mismo resultado', () => {
    const ctx = { paschaOffset: 100, nextPaschaOffset: -265, weekday: 3, churchMonthDay: '07-20' };
    expect(fastingFor(ctx)).toEqual(fastingFor(ctx));
  });
});
