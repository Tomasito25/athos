/**
 * Los tres oficios del día, las fórmulas griegas y el komboskini.
 */
import { describe, expect, it } from 'vitest';
import { DAILY_OFFICES, OFFICE_BY_TIME, officeForHour } from '@/content/hours';
import { GREEK_FORMULAS } from '@/content/greek';
import { officeNow } from '@/lib/office-time';
import { PRAYERS } from '@/content/prayers';
import { DEFAULT_SETTINGS } from '@/stores/settings';

describe('los tres oficios', () => {
  it('son mañana, mediodía y noche', () => {
    expect(DAILY_OFFICES.map((o) => o.time)).toEqual(['manana', 'mediodia', 'noche']);
    for (const oficio of DAILY_OFFICES) {
      expect(oficio.name.length).toBeGreaterThan(5);
      expect(oficio.greekName.length).toBeGreaterThan(3);
      expect(oficio.description.length).toBeGreaterThan(60);
    }
  });

  it('cada paso tiene título y contenido', () => {
    for (const oficio of DAILY_OFFICES) {
      expect(oficio.steps.length, oficio.name).toBeGreaterThan(8);
      for (const paso of oficio.steps) {
        expect(paso.title.length, `${oficio.name}: ${paso.id}`).toBeGreaterThan(2);
        const tiene =
          Boolean(paso.blocks?.length) ||
          Boolean(paso.prayerId) ||
          Boolean(paso.psalm) ||
          paso.kind === 'jesus-prayer' ||
          paso.kind === 'komboskini';
        expect(tiene, `${oficio.name}: ${paso.title} sin contenido`).toBe(true);
      }
    }
  });

  it('las oraciones que enlazan existen en la biblioteca', () => {
    const ids = new Set(PRAYERS.map((p) => p.id));
    for (const oficio of DAILY_OFFICES) {
      for (const paso of oficio.steps) {
        if (paso.prayerId) {
          expect(ids.has(paso.prayerId), `${oficio.name}: falta ${paso.prayerId}`).toBe(true);
        }
      }
    }
  });

  it('los salmos son los que el Horologion señala para cada hora', () => {
    const salmos = (time: string) =>
      OFFICE_BY_TIME.get(time as never)!
        .steps.filter((p) => p.psalm)
        .map((p) => p.psalm);

    // Hora Sexta: salmos 53, 54 y 90.
    expect(salmos('mediodia')).toEqual([53, 54, 90]);
    // Pequeñas Completas: salmos 50, 69 y 142.
    expect(salmos('noche')).toEqual([50, 69, 142]);
    // La mañana lleva el salmo del arrepentimiento.
    expect(salmos('manana')).toContain(50);
  });

  it('los tres incluyen el Trisagio y el Padre Nuestro', () => {
    for (const oficio of DAILY_OFFICES) {
      const texto = oficio.steps
        .flatMap((p) => p.blocks ?? [])
        .map((b) => b.content)
        .join(' ');
      expect(texto, oficio.name).toContain('Santo Dios, Santo Fuerte');
      expect(texto, oficio.name).toContain('Padre nuestro');
    }
  });

  it('los tres terminan con la despedida', () => {
    for (const oficio of DAILY_OFFICES) {
      expect(oficio.steps.at(-1)!.title).toBe('Despedida');
    }
  });

  it('cada uno propone la oración de Jesús o el komboskini', () => {
    for (const oficio of DAILY_OFFICES) {
      const contadores = oficio.steps.filter(
        (p) => p.kind === 'jesus-prayer' || p.kind === 'komboskini',
      );
      expect(contadores.length, oficio.name).toBeGreaterThan(0);
      for (const paso of contadores) {
        expect(paso.target, `${oficio.name}: sin objetivo`).toBeGreaterThan(0);
      }
    }
  });

  it('lo que no está verificado se marca como pendiente, no se inventa', () => {
    const pendientes = DAILY_OFFICES.flatMap((o) => o.steps)
      .flatMap((p) => p.blocks ?? [])
      .filter((b) => b.kind === 'pending');
    for (const bloque of pendientes) {
      expect(bloque.content).toContain('pendiente de incorporar');
    }
  });
});

describe('la hora decide el oficio', () => {
  const horas = DEFAULT_SETTINGS.officeHours;

  it('reparte el día entero sin huecos', () => {
    for (let hora = 0; hora < 24; hora++) {
      expect(['manana', 'mediodia', 'noche']).toContain(officeNow(hora, horas));
    }
  });

  it('a las siete de la mañana toca el de la mañana', () => {
    expect(officeNow(7, horas)).toBe('manana');
  });

  it('a las dos de la tarde toca el del mediodía', () => {
    expect(officeNow(14, horas)).toBe('mediodia');
  });

  it('a las diez de la noche y a las tres de la madrugada toca el de la noche', () => {
    expect(officeNow(22, horas)).toBe('noche');
    expect(officeNow(3, horas)).toBe('noche');
  });

  it('respeta las horas que fije el usuario', () => {
    const propias = { manana: 6, mediodia: 13, noche: 21 };
    expect(officeNow(6, propias)).toBe('manana');
    expect(officeNow(12, propias)).toBe('manana');
    expect(officeNow(13, propias)).toBe('mediodia');
    expect(officeNow(21, propias)).toBe('noche');
    expect(officeNow(5, propias)).toBe('noche');
  });

  it('la definición del contenido también cubre las veinticuatro horas', () => {
    for (let hora = 0; hora < 24; hora++) {
      expect(officeForHour(hora)).toBeDefined();
    }
  });
});

describe('fórmulas en griego', () => {
  it('cada una trae griego, transliteración y español', () => {
    for (const [clave, formula] of Object.entries(GREEK_FORMULAS)) {
      expect(formula.greek.length, clave).toBeGreaterThan(5);
      expect(formula.roman.length, clave).toBeGreaterThan(5);
      expect(formula.spanish.length, clave).toBeGreaterThan(5);
      // El griego va en alfabeto griego y la transliteración en latino.
      expect(formula.greek, clave).toMatch(/[Ͱ-Ͽἀ-῿]/);
      expect(formula.roman, clave).not.toMatch(/[Ͱ-Ͽἀ-῿]/);
    }
  });

  it('incluye las que se rezan más', () => {
    for (const clave of ['kyrie', 'christe', 'trisagion', 'paterImon', 'jesusPrayer', 'doxa']) {
      expect(GREEK_FORMULAS[clave], clave).toBeDefined();
    }
    expect(GREEK_FORMULAS.kyrie.greek).toContain('Κύριε');
    expect(GREEK_FORMULAS.christe.greek).toContain('Χριστέ');
  });

  it('el español coincide con el de la biblioteca de oraciones', () => {
    const comienzo = PRAYERS.find((p) => p.id === 'comienzo-habitual')!;
    const texto = comienzo.blocks.map((b) => b.content).join(' ');
    expect(texto).toContain(GREEK_FORMULAS.trisagion.spanish);
    expect(texto).toContain(GREEK_FORMULAS.panagiaTrias.spanish);
  });

  it('las fórmulas del oficio llevan su griego', () => {
    const conGriego = DAILY_OFFICES.flatMap((o) => o.steps)
      .flatMap((p) => p.blocks ?? [])
      .filter((b) => b.greek);
    expect(conGriego.length).toBeGreaterThan(20);
    for (const bloque of conGriego) {
      expect(bloque.roman, bloque.content.slice(0, 30)).toBeTruthy();
    }
  });

  it('las repeticiones se declaran donde el oficio las pide', () => {
    const repetidas = DAILY_OFFICES.flatMap((o) => o.steps)
      .flatMap((p) => p.blocks ?? [])
      .filter((b) => b.times);
    expect(repetidas.length).toBeGreaterThan(3);
    // El Trisagio se dice tres veces; el «Señor, ten piedad» del mediodía, cuarenta.
    expect(repetidas.some((b) => b.times === 3)).toBe(true);
    expect(repetidas.some((b) => b.times === 40)).toBe(true);
  });
});


describe('los tres oficios están completos', () => {
  it('ningún paso remite a contenido pendiente', () => {
    // El tropario propio de la Hora Sexta era el último hueco de los oficios.
    for (const oficio of DAILY_OFFICES) {
      for (const paso of oficio.steps) {
        for (const bloque of paso.blocks ?? []) {
          expect(bloque.kind, `${oficio.name} · ${paso.title}`).not.toBe('pending');
          expect(bloque.content, `${oficio.name} · ${paso.title}`).not.toMatch(
            /pendiente de incorporar/i,
          );
        }
      }
    }
  });

  it('la Hora Sexta dice por qué se reza a las doce', () => {
    const sexta = OFFICE_BY_TIME.get('mediodia')!;
    const tropario = sexta.steps.find((p) => p.id === 'd-tropario');
    expect(tropario, 'falta el tropario propio de la hora').toBeDefined();
    const texto = (tropario!.blocks ?? []).map((b) => b.content).join(' ');
    expect(texto).toMatch(/hora sexta/i);
    expect(texto).toMatch(/cruz/i);
    // Y trae su theotokion, que el Typikon pone a continuación.
    expect(texto).toMatch(/Theotokos/i);
  });
});


describe('las conmemoraciones que faltaban', () => {
  it('la mañana hace sitio a los demás antes de la despedida', () => {
    // El libro de oraciones cierra la mañana con los nombres, uno a uno.
    const manana = OFFICE_BY_TIME.get('manana')!;
    const ids = manana.steps.map((p) => p.id);
    expect(ids).toContain('m-vivos');
    // Y va antes de la despedida, no después.
    expect(ids.indexOf('m-vivos')).toBeLessThan(ids.indexOf('m-despedida'));
  });

  it('la noche recuerda a los difuntos', () => {
    const noche = OFFICE_BY_TIME.get('noche')!;
    const ids = noche.steps.map((p) => p.id);
    expect(ids).toContain('n-difuntos');
    expect(ids.indexOf('n-difuntos')).toBeLessThan(ids.indexOf('n-despedida'));
  });

  it('el mediodía, a los que nos hacen bien', () => {
    const ids = OFFICE_BY_TIME.get('mediodia')!.steps.map((p) => p.id);
    expect(ids).toContain('d-bienhechores');
  });

  it('las oraciones que enlazan siguen existiendo', () => {
    const ids = new Set(PRAYERS.map((p) => p.id));
    for (const nueva of ['por-los-vivos', 'por-los-padres-difuntos', 'por-los-bienhechores']) {
      expect(ids.has(nueva), `falta ${nueva}`).toBe(true);
    }
  });
});
