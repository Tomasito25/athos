/**
 * Los apotegmas del día.
 *
 * Lo que se vigila: que cada dicho diga quién lo dijo y esté bien escrito,
 * que los días seguidos no repitan Padre, y que la ficha diga de dónde sale
 * el castellano.
 */
import { describe, expect, it } from 'vitest';
import { APOPHTHEGMS, APOPHTHEGMS_META, APOPHTHEGM_THEMES, apophthegmFor } from '@/content/apotegmas';
import { SAINT_INDEX } from '@/content/saints';

describe('los dichos', () => {
  it('hay bastantes para que un año no se repita más de cuatro veces', () => {
    expect(APOPHTHEGMS.length).toBeGreaterThanOrEqual(92);
  });

  it('cada uno tiene su ancla, sin repetir, y su texto, sin repetir', () => {
    const ids = APOPHTHEGMS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    const textos = APOPHTHEGMS.map((a) => a.text);
    expect(new Set(textos).size).toBe(textos.length);
  });

  it('dicen quién los dijo', () => {
    for (const a of APOPHTHEGMS) expect(a.abba, a.id).toMatch(/^(Abba|Amma) [A-ZÁÉÍÓÚ]/);
  });

  it('están escritos como el resto de ATHOS', () => {
    for (const a of APOPHTHEGMS) {
      expect(a.text.length, a.id).toBeGreaterThan(20);
      expect(a.text.length, `${a.id} es demasiado largo para un aviso`).toBeLessThanOrEqual(450);
      // Las españolas, «», y dentro de ellas las inglesas, “”; nunca las rectas.
      expect(a.text, `${a.id}: comillas rectas`).not.toMatch(/"/);
      expect(a.text.split('«').length, `${a.id}: comillas sin cerrar`).toBe(a.text.split('»').length);
      expect(a.text.split('“').length, `${a.id}: comillas sin cerrar`).toBe(a.text.split('”').length);
      // «abba» va en minúscula dentro de la frase; con mayúscula sólo al empezarla.
      expect(a.text, `${a.id}: «Abba» con mayúscula a media frase`).not.toMatch(/[a-záéíóúñ,] (Abba|Amma) /);
      expect(a.text.trim(), a.id).toBe(a.text);
    }
  });

  it('cada tema existe y cada ficha de santo también', () => {
    const santos = new Set(SAINT_INDEX.map((s) => s.id));
    for (const a of APOPHTHEGMS) {
      expect(APOPHTHEGM_THEMES[a.theme], a.id).toBeTruthy();
      if (a.saintId) expect(santos.has(a.saintId), `${a.id}: ${a.saintId}`).toBe(true);
    }
  });

  it('hay variedad de Padres y de temas', () => {
    expect(new Set(APOPHTHEGMS.map((a) => a.abba)).size).toBeGreaterThanOrEqual(15);
    expect(new Set(APOPHTHEGMS.map((a) => a.theme)).size).toBeGreaterThanOrEqual(10);
  });

  it('dos días seguidos no hablan por boca del mismo Padre', () => {
    for (let i = 1; i < APOPHTHEGMS.length; i += 1) {
      expect(APOPHTHEGMS[i]!.abba, APOPHTHEGMS[i]!.id).not.toBe(APOPHTHEGMS[i - 1]!.abba);
    }
  });

  it('la ficha dice que la traducción es de ATHOS y del original', () => {
    expect(APOPHTHEGMS_META.license).toBe('cc-by-sa-4.0');
    expect(APOPHTHEGMS_META.source).toMatch(/PG 65/);
    expect(APOPHTHEGMS_META.source).toMatch(/para ATHOS/);
  });
});

describe('el de cada día', () => {
  it('un día concreto tiene siempre el mismo, a cualquier hora', () => {
    const manana = apophthegmFor(new Date(2026, 9, 20, 7, 0));
    const noche = apophthegmFor(new Date(2026, 9, 20, 23, 59));
    expect(noche.id).toBe(manana.id);
  });

  it('en un año salen todos, y cambian de un día al siguiente', () => {
    const vistos = new Set<string>();
    let anterior = '';
    for (let d = 0; d < 365; d += 1) {
      const dicho = apophthegmFor(new Date(2026, 0, 1 + d));
      expect(dicho.id).not.toBe(anterior);
      anterior = dicho.id;
      vistos.add(dicho.id);
    }
    expect(vistos.size).toBe(Math.min(APOPHTHEGMS.length, 365));
  });
});
