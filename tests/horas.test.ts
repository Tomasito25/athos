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
    // El orden del Horologion: el kontakion va después del Padre Nuestro, y
    // la oración de san Efrén, en Cuaresma, antes de la oración final.
    const ORDEN = [
      'sentido',
      'comienzo',
      'salmos',
      'tropario',
      'theotokion',
      'versiculos',
      'trisagio',
      'kontakion',
      'kyrie',
      'toda-hora',
      'cuaresma',
      'final',
    ];
    for (const hora of HORAS_OFFICES) {
      const ids = hora.sections.map((s) => s.id);
      // La Primera cierra con el kontakion a la Theotokos antes de despedir.
      const cierre = hora.id === 'hora-primera' ? ['caudilla', 'despedida'] : ['despedida'];
      expect(ids, hora.id).toEqual([...ORDEN, ...cierre]);
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

  it('marca como pendiente el kontakion del día en vez de inventarlo', () => {
    for (const hora of HORAS_OFFICES) {
      const kontakion = hora.sections.find((s) => s.id === 'kontakion')!;
      const pendiente = kontakion.blocks.find((b) => b.kind === 'pending');
      expect(pendiente, hora.id).toBeDefined();
      expect(pendiente!.content).toMatch(/Menaion|Octoecos|Triodion/);
    }
  });

  it('trae los salmos dentro de la Hora, no un aviso de dónde buscarlos', () => {
    for (const hora of HORAS_OFFICES) {
      const salmos = hora.sections.find((s) => s.id === 'salmos')!;
      const enLinea = salmos.blocks.filter((b) => b.kind === 'psalm').map((b) => Number(b.ref));
      expect(enLinea, hora.id).toEqual(SALMOS[hora.id]);
      expect(salmos.blocks.some((b) => /Está en Leer/.test(b.content)), hora.id).toBe(false);
    }
  });

  it('pone el tropario del día y, para la Cuaresma, el propio de la Hora', () => {
    for (const hora of HORAS_OFFICES) {
      const tropario = hora.sections.find((s) => s.id === 'tropario')!;
      expect(tropario.blocks.some((b) => b.kind === 'day-troparion'), hora.id).toBe(true);
      const texto = tropario.blocks.map((b) => b.content).join(' ');
      expect(texto, hora.id).toMatch(/Gran Cuaresma/);
    }
  });

  it('cada Hora tiene sus versículos fijos, y son distintos', () => {
    const vistos = new Set<string>();
    const FRASE: Record<string, string> = {
      'hora-primera': 'Dirige mis pasos según tu palabra',
      'hora-tercera': 'bendito sea el Señor día tras día',
      'hora-sexta': 'Que tus misericordias nos salgan pronto al encuentro',
      'hora-novena': 'No nos entregues para siempre',
    };
    for (const hora of HORAS_OFFICES) {
      const v = hora.sections.find((s) => s.id === 'versiculos')!;
      const texto = v.blocks.filter((b) => b.kind === 'text').map((b) => b.content).join(' ');
      expect(texto, hora.id).toContain(FRASE[hora.id]!);
      vistos.add(texto);
    }
    expect(vistos.size).toBe(4);
  });

  it('en Cuaresma añade la oración de san Efrén, y fuera de ella dice que se omite', () => {
    for (const hora of HORAS_OFFICES) {
      const c = hora.sections.find((s) => s.id === 'cuaresma')!;
      const texto = c.blocks.map((b) => b.content).join(' ');
      expect(texto, hora.id).toContain('Señor y Soberano de mi vida');
      expect(texto, hora.id).toMatch(/Fuera de la Gran Cuaresma/);
      expect(c.blocks.some((b) => b.times === 12), hora.id).toBe(true);
    }
  });

  it('la Primera termina con «A ti, caudilla defensora», como en el Akáthistos', () => {
    const primera = HORAS_OFFICES.find((h) => h.id === 'hora-primera')!;
    const caudilla = primera.sections.find((s) => s.id === 'caudilla')!;
    expect(caudilla.blocks.map((b) => b.content).join(' ')).toContain('A ti, caudilla defensora');
  });

  it('la búsqueda encuentra cada Hora por sus salmos', () => {
    for (const hora of HORAS_OFFICES) {
      for (const n of SALMOS[hora.id]!) {
        expect(hora.searchText, `${hora.id} · ${n}`).toContain(`salmo ${n}`);
      }
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
