/**
 * Los troparios generales.
 *
 * La regla del proyecto impide escribir el tropario propio de cada santo: eso
 * sería inventar un himno. Lo que sí se puede es dar el que la Iglesia canta
 * cuando no tiene el propio a mano, que es el general de su rango.
 *
 * Lo que estas pruebas vigilan es que ningún santo se quede sin nada, y que
 * en ningún sitio se dé a entender que el general es el suyo.
 */
import { describe, expect, it } from 'vitest';
import { SAINTS } from '@/content/saints';
import {
  GENERAL_TROPARIA,
  GENERAL_TROPARION_META,
  GENERAL_TROPARION_NOTE,
  generalTroparionFor,
} from '@/content/troparia-general';

/** Los que sí lo tienen, sea propio de la ficha, de la fiesta o general. */
const conTroparario = (s: (typeof SAINTS)[number]) =>
  (s.troparion ?? []).some((b) => b.kind !== 'pending') ||
  Boolean(generalTroparionFor(s.category, s.id));

describe('cobertura', () => {
  it('ninguna persona del santoral se queda sin tropario', () => {
    // Los rangos de persona son los que tienen general en el Horologion. Si
    // alguno se queda fuera, es que falta un general, no que falte un himno.
    const personas = SAINTS.filter(
      (s) => !s.category.every((c) => c === 'senor' || c === 'theotokos'),
    );
    const sin = personas.filter((s) => !conTroparario(s));
    expect(
      sin.map((s) => `${s.name} (${s.category.join(', ')})`),
      'santos sin tropario de ninguna clase',
    ).toEqual([]);
    expect(personas.length, 'el santoral se ha quedado corto').toBeGreaterThan(350);
  });

  it('las fiestas que se quedan sin tropario son pocas y son menores', () => {
    // Las grandes fiestas tienen el suyo. Quedan algunas conmemoraciones
    // menores —una deposición de reliquia, un traslado de imagen— cuyo
    // tropario ATHOS no puede dar todavía. Que sean pocas es la garantía de
    // que no se está tapando un hueco grande.
    const sin = SAINTS.filter(
      (s) => s.category.every((c) => c === 'senor' || c === 'theotokos') && !conTroparario(s),
    );
    expect(sin.map((s) => s.name).sort()).toEqual([
      'Concepción de santa Ana',
      'Deposición del cinturón de la Theotokos',
      'Deposición del manto de la Theotokos',
      'Traslado de la Santa Imagen no hecha por mano',
    ]);
  });

  it('las fiestas que comparten tropario lo comparten con la que toca', () => {
    // No es un atajo: las tres fiestas de la Cruz cantan el mismo tropario, y
    // la clausura de una fiesta repite el oficio del día grande.
    const cruz = generalTroparionFor(['senor'], 'procesion-cruz-ago');
    expect(cruz?.name).toMatch(/Cruz/);
    const clausura = generalTroparionFor(['theotokos'], 'clausura-dormicion');
    expect(clausura?.name).toMatch(/Dormición/);
    const sinaxis = generalTroparionFor(['theotokos'], 'sinaxis-theotokos');
    expect(sinaxis?.name).toMatch(/Natividad/);
  });

  it('cada rango que usa el santoral tiene su general', () => {
    const rangos = new Set(SAINTS.flatMap((s) => s.category));
    // Los dos que no son rango de santidad sino de fiesta no llevan tropario
    // general: la fiesta tiene el suyo propio.
    for (const r of ['senor', 'theotokos']) rangos.delete(r as never);
    for (const rango of rangos) {
      expect(generalTroparionFor([rango]), `sin general para «${rango}»`).toBeTruthy();
    }
  });

  it('elige el rango por el orden del uso, no por el orden de la ficha', () => {
    // Un obispo mártir se canta como mártir; un Padre que fue obispo, como
    // jerarca. El orden lo decide la lista, no cómo estén escritas las
    // categorías en la ficha del santo.
    expect(generalTroparionFor(['obispo', 'martir'])?.category).toBe('martir');
    expect(generalTroparionFor(['martir', 'obispo'])?.category).toBe('martir');
    expect(generalTroparionFor(['padre', 'obispo'])?.category).toBe('obispo');
    expect(generalTroparionFor(['apostol', 'martir'])?.category).toBe('apostol');
  });

  it('no inventa un rango que no existe', () => {
    expect(generalTroparionFor([])).toBeNull();
    expect(generalTroparionFor(['senor'])).toBeNull();
  });
});

describe('honradez', () => {
  it('la ficha dice que es una traducción de ATHOS y no un libro publicado', () => {
    expect(GENERAL_TROPARION_META.license).toBe('cc-by-sa-4.0');
    expect(GENERAL_TROPARION_META.source).toMatch(/traducción al español hecha para ATHOS/i);
    expect(GENERAL_TROPARION_META.copyright).toMatch(/dominio público/);
  });

  it('la ficha avisa de que no es el tropario propio del santo', () => {
    expect(GENERAL_TROPARION_META.notes).toMatch(/no es el tropario propio/i);
    expect(GENERAL_TROPARION_NOTE).toMatch(/no tiene su tropario propio/i);
  });

  it('no se atribuye a un libro litúrgico español que no existe', () => {
    // El fallo que esto vigila: heredar «versión de uso corriente en las
    // parroquias» de la plantilla de los textos tradicionales. Es propia.
    expect(GENERAL_TROPARION_META.notes ?? '').not.toMatch(/uso corriente en las parroquias/i);
    expect(GENERAL_TROPARION_META.license).not.toBe('traditional');
  });

  it('todos los generales dicen su tono y traen texto', () => {
    for (const g of GENERAL_TROPARIA) {
      expect(g.tone, g.name).toMatch(/^Tono \d$/);
      expect(g.blocks.some((b) => b.kind === 'text'), g.name).toBe(true);
      expect(g.blocks.every((b) => b.kind !== 'pending'), g.name).toBe(true);
    }
  });

  it('dejan sitio para el nombre del santo', () => {
    // Un tropario general sin el hueco del nombre se lee como si fuera suyo.
    for (const g of GENERAL_TROPARIA) {
      const texto = g.blocks.map((b) => b.content).join(' ');
      const nombraOEsSalmo = /\(nombre\)/.test(texto) || g.category === 'justo';
      expect(nombraOEsSalmo, `${g.name}: sin hueco para el nombre`).toBe(true);
    }
  });
});
