/**
 * Lo propio de cada día, dentro de la oración.
 *
 * El akathistos y el canon que tocan cada día salen del reparto de la semana y
 * de la fiesta, y sólo de entre los que ATHOS tiene enteros; los kathismata de
 * los Maitines siguen el Típikon; los oficios ya no mandan a otra pantalla a
 * buscar el comienzo habitual; y lo que se pliega dentro existe.
 */
import { describe, expect, it } from 'vitest';
import { computeLiturgicalDay } from '@/lib/calendar/liturgical';
import { dayDevotion } from '@/lib/calendar/day-devotion';
import { kathismataFor } from '@/lib/calendar/day-kathismata';
import { AKATHISTS, CANONS } from '@/content/hymns';
import { OFFICES } from '@/content/offices';
import { PRAYERS } from '@/content/prayers';
import { PRAYER_ORDERS } from '@/content/prayer-orders';
import { MAITINES_EN_CASA } from '@/content/maitines-casa';
import { withDayExtras } from '@/features/office/dayExtras';
import type { ResolvedStep } from '@/features/office/useOfficeSteps';
import type { TextBlock } from '@/types';

const dia = (iso: string) => computeLiturgicalDay(iso, 'nuevo');

describe('el akathistos y el canon de cada día', () => {
  it('siguen el reparto de la semana', () => {
    // 2026-10-15 es jueves; 2026-10-16, viernes; 2026-10-12, lunes; 2026-10-18, domingo.
    expect(dayDevotion(dia('2026-10-15')).akathist?.id).toBe('akathistos-nicolas');
    expect(dayDevotion(dia('2026-10-16')).akathist?.id).toBe('akathistos-pasion');
    expect(dayDevotion(dia('2026-10-18')).akathist?.id).toBe('akathistos-jesus');
    expect(dayDevotion(dia('2026-10-12')).canon.id).toBe('canon-angel');
    expect(dayDevotion(dia('2026-10-17')).canon.id).toBe('canon-difuntos');
  });

  it('la fiesta manda sobre el día de la semana', () => {
    // La Dormición de 2026 cae en sábado; la Natividad, en viernes.
    expect(dayDevotion(dia('2026-08-15')).akathist?.id).toBe('akathistos-theotokos');
    expect(dayDevotion(dia('2026-12-25')).akathist?.id).toBe('akathistos-jesus');
    expect(dayDevotion(dia('2026-12-06')).akathist?.id).toBe('akathistos-nicolas');
  });

  it('en la Semana Santa y en la Luminosa no se propone akathistos, y se dice por qué', () => {
    // La Pascua de 2027 es el 2 de mayo.
    const viernesSanto = dayDevotion(dia('2027-04-30'));
    expect(viernesSanto.akathist).toBeNull();
    expect(viernesSanto.notice).toMatch(/Semana Santa/);
    expect(dayDevotion(dia('2027-05-04')).notice).toMatch(/Luminosa/);
  });

  it('sólo propone textos que ATHOS tiene enteros, y siempre con su razón', () => {
    const akathistos = new Set(AKATHISTS.map((a) => a.id));
    const canones = new Set(CANONS.map((c) => c.id));
    for (let i = 0; i < 400; i += 1) {
      const d = computeLiturgicalDay(new Date(2026, 0, 1 + i).toISOString().slice(0, 10), 'nuevo');
      const x = dayDevotion(d);
      if (x.akathist) {
        expect(akathistos.has(x.akathist.id), x.akathist.id).toBe(true);
        expect(x.akathist.reason.length).toBeGreaterThan(10);
      }
      expect(canones.has(x.canon.id), x.canon.id).toBe(true);
    }
  });
});

describe('los kathismata de los Maitines', () => {
  it('son los del Típikon para cada día de la semana', () => {
    expect(kathismataFor(dia('2026-10-18')).numbers).toEqual([2, 3]);
    expect(kathismataFor(dia('2026-10-12')).numbers).toEqual([4, 5]);
    expect(kathismataFor(dia('2026-10-16')).numbers).toEqual([19, 20]);
    expect(kathismataFor(dia('2026-10-17')).numbers).toEqual([16, 17]);
  });

  it('en la Semana Luminosa no hay, y se dice', () => {
    const k = kathismataFor(dia('2027-05-04'));
    expect(k.numbers).toEqual([]);
    expect(k.notice).toBeTruthy();
  });
});

describe('los Maitines en casa', () => {
  const bloques = MAITINES_EN_CASA.flatMap((s) => s.blocks);

  it('llevan dentro lo propio del día', () => {
    const tipos = new Set(bloques.map((b) => b.kind));
    expect(tipos.has('day-troparion')).toBe(true);
    expect(tipos.has('day-kathismata')).toBe(true);
    expect(tipos.has('day-canon')).toBe(true);
  });

  it('no llevan nada del sacerdote ni del diácono', () => {
    for (const b of bloques) {
      if (b.kind === 'rubric') expect(b.content, b.content).not.toMatch(/^(Sacerdote|Diácono)[:\s]/);
    }
  });

  it('traen enteros los troparios del oficio real', () => {
    expect(bloques.some((b) => b.content.startsWith('Salva, Señor, a tu pueblo'))).toBe(true);
    expect(bloques.some((b) => b.content.startsWith('Protección temible'))).toBe(true);
  });

  it('están en la biblioteca de oficios', () => {
    expect(OFFICES.find((o) => o.id === 'maitines-en-casa')?.sections.length).toBeGreaterThan(8);
  });
});

describe('no hay que salir a buscar nada', () => {
  const todos: TextBlock[] = [
    ...OFFICES.flatMap((o) => o.sections.flatMap((s) => s.blocks)),
    ...PRAYERS.flatMap((p) => p.blocks),
    ...PRAYER_ORDERS.flatMap((o) => o.sections.flatMap((s) => s.blocks)),
  ];

  it('ningún oficio manda a «Comienzo habitual» en otra pantalla', () => {
    for (const b of todos) expect(b.content, b.content.slice(0, 80)).not.toMatch(/→ Comienzo habitual/);
  });

  it('lo que va plegado dentro existe', () => {
    const existe: Record<string, Set<string>> = {
      canon: new Set(CANONS.map((c) => c.id)),
      akathist: new Set(AKATHISTS.map((a) => a.id)),
      prayer: new Set(PRAYERS.map((p) => p.id)),
      office: new Set(OFFICES.map((o) => o.id)),
    };
    const plegados = todos.filter((b) => b.kind === 'embed');
    expect(plegados.length).toBeGreaterThan(4);
    for (const b of plegados) {
      const [tipo, resto = ''] = (b.ref ?? '').split(':');
      expect(existe[tipo!]?.has(resto.split('#')[0]!), b.ref).toBe(true);
    }
  });
});

describe('lo propio de hoy dentro del oficio', () => {
  const paso = (id: string, title: string): ResolvedStep => ({ item: { id, ruleId: 'r', order: 1, title }, blocks: [] });
  const noche = [paso('n-inicio', 'Comienzo'), paso('n-damasceno', 'Oración antes del sueño'), paso('n-despedida', 'Despedida')];

  it('el tropario va antes de la despedida y el akathistos antes de las oraciones del sueño', () => {
    const lista = withDayExtras(noche, 'noche', 'habitual', { troparion: true, akathist: true });
    expect(lista.map((p) => p.item.id)).toEqual(['n-inicio', 'del-dia-akathistos', 'n-damasceno', 'del-dia-tropario', 'n-despedida']);
  });

  it('la breve no lleva nada añadido, y se puede apagar', () => {
    expect(withDayExtras(noche, 'noche', 'breve', { troparion: true, akathist: true })).toHaveLength(3);
    expect(withDayExtras(noche, 'noche', 'habitual', { troparion: false, akathist: false })).toHaveLength(3);
  });
});
