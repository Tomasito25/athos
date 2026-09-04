/**
 * Las cuatro Horas.
 *
 * Lo que se protege aquí es doble: que cada Hora esté entera —con sus tres
 * salmos y todas las partes en su orden— y que no se presente como lo que no
 * es. Los textos van traducidos para ATHOS a partir del griego, y eso tiene
 * que decirlo la ficha.
 */
import { describe, expect, it } from 'vitest';
import { HORAS_META, HORAS_OFFICES, HORAS_RESUMEN } from '@/content/horas';
import { OFFICES } from '@/content/offices';

/** Los salmos que el Horologion fija para cada Hora. */
const SALMOS: Record<string, number[]> = {
  'hora-primera': [5, 89, 100],
  'hora-tercera': [16, 24, 50],
  'hora-sexta': [53, 54, 90],
  'hora-novena': [83, 84, 85],
};

describe('las cuatro Horas', () => {
  it('están las cuatro, y una sola vez', () => {
    expect(HORAS_OFFICES.map((h) => h.id)).toEqual(Object.keys(SALMOS));
    const ids = OFFICES.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada una entra en la biblioteca con su propia página', () => {
    for (const id of Object.keys(SALMOS)) {
      expect(OFFICES.find((o) => o.id === id)).toBeDefined();
    }
    // Y «Las Horas» sigue existiendo como portada de las cuatro.
    expect(OFFICES.find((o) => o.id === 'horas')).toBeDefined();
  });

  it('lleva los tres salmos que le fija el Horologion', () => {
    for (const hora of HORAS_OFFICES) {
      const salmos = hora.sections.find((s) => s.id === 'salmos');
      expect(salmos, hora.id).toBeDefined();
      const texto = salmos!.blocks.map((b) => b.content).join(' ');
      for (const n of SALMOS[hora.id]!) {
        expect(texto, `${hora.id} · salmo ${n}`).toContain(`Salmo ${n}`);
      }
    }
  });

  it('tiene todas las partes del oficio, en su orden', () => {
    const ORDEN = [
      'sentido',
      'comienzo',
      'salmos',
      'tropario',
      'theotokion',
      'propios',
      'trisagio',
      'kyrie',
      'toda-hora',
      'final',
      'despedida',
    ];
    for (const hora of HORAS_OFFICES) {
      expect(hora.sections.map((s) => s.id), hora.id).toEqual(ORDEN);
    }
  });

  it('cada Hora tiene su tropario, su theotokion y su oración final propios', () => {
    const troparios = new Set<string>();
    const theotokia = new Set<string>();
    const finales = new Set<string>();
    for (const hora of HORAS_OFFICES) {
      const texto = (id: string) =>
        hora
          .sections.find((s) => s.id === id)!
          .blocks.filter((b) => b.kind === 'text')
          .map((b) => b.content)
          .join(' ');
      troparios.add(texto('tropario'));
      theotokia.add(texto('theotokion'));
      finales.add(texto('final'));
    }
    // Cuatro distintos de cada: si dos Horas compartieran texto sería que se
    // ha copiado uno donde iba otro.
    expect(troparios.size).toBe(4);
    expect(theotokia.size).toBe(4);
    expect(finales.size).toBe(4);
  });

  it('dice las cuarenta veces de «Señor, ten piedad»', () => {
    for (const hora of HORAS_OFFICES) {
      const kyrie = hora.sections.find((s) => s.id === 'kyrie')!;
      expect(kyrie.blocks.some((b) => b.times === 40), hora.id).toBe(true);
    }
  });

  it('marca como pendiente lo que cambia cada día en vez de inventarlo', () => {
    for (const hora of HORAS_OFFICES) {
      const propios = hora.sections.find((s) => s.id === 'propios')!;
      const pendiente = propios.blocks.find((b) => b.kind === 'pending');
      expect(pendiente, hora.id).toBeDefined();
      expect(pendiente!.content).toMatch(/Menaion|Octoecos|Triodion/);
    }
  });
});

describe('la procedencia de los textos', () => {
  it('dice que la traducción es de ATHOS y no de un libro español publicado', () => {
    expect(HORAS_META.source).toMatch(/traducidos al español para ATHOS/);
    expect(HORAS_META.notes).toMatch(/No procede de un libro litúrgico español publicado/);
  });

  it('no afirma que sea de uso corriente en las parroquias', () => {
    const todo = `${HORAS_META.source} ${HORAS_META.notes ?? ''}`.toLowerCase();
    expect(todo).not.toContain('uso corriente en las parroquias');
  });

  it('el resumen y los oficios cuentan los mismos salmos', () => {
    for (const resumen of HORAS_RESUMEN) {
      expect(resumen.salmos).toEqual(SALMOS[resumen.id]);
    }
  });
});
