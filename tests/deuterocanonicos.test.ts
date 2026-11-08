/**
 * Los libros que la Reina-Valera no trae.
 *
 * Lo que se protege: que cada deuterocanónico del índice tenga de verdad su
 * archivo de texto con los capítulos que anuncia, que se lea de la traducción
 * correcta y que la ficha diga de dónde sale.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { BIBLE_BOOKS, BLM, RV1909, translationOf } from '@/content/bible';
import { effectiveTranslation } from '@/db/bible';

const archivo = (traduccion: string, libro: string) =>
  resolve(__dirname, '..', 'public/content/bible', traduccion, `${libro}.json`);

describe('los deuterocanónicos', () => {
  const deutero = BIBLE_BOOKS.filter((b) => b.deuterocanonical);

  it('están todos los de la Biblia griega, y Ester y Daniel en su texto griego', () => {
    expect(deutero.map((b) => b.id).sort()).toEqual(
      ['1ES', '1MA', '2MA', '3MA', '4MA', 'BAR', 'DAG', 'ESG', 'JDT', 'LJE', 'MAN', 'SIR', 'TOB', 'WIS'].sort(),
    );
  });

  it('ninguno queda pendiente, y cada uno tiene su archivo con los capítulos que anuncia', () => {
    for (const libro of deutero) {
      expect(libro.status, libro.id).toBe('complete');
      expect(libro.translationId, libro.id).toBe(BLM.id);
      const ruta = archivo(BLM.id, libro.id);
      expect(existsSync(ruta), ruta).toBe(true);
      const datos = JSON.parse(readFileSync(ruta, 'utf8')) as { chapters: Record<string, Record<string, string>> };
      expect(Object.keys(datos.chapters).length, libro.id).toBe(libro.chapters);
      for (const versos of Object.values(datos.chapters)) {
        expect(Object.keys(versos).length, libro.id).toBeGreaterThan(0);
      }
    }
  });

  it('la Carta de Jeremías es un libro aparte, como en la Biblia griega, y no el capítulo 6 de Baruc', () => {
    const baruc = JSON.parse(readFileSync(archivo('blm', 'BAR'), 'utf8'));
    const carta = JSON.parse(readFileSync(archivo('blm', 'LJE'), 'utf8'));
    expect(Object.keys(baruc.chapters)).toEqual(['1', '2', '3', '4', '5']);
    expect(Object.keys(carta.chapters)).toEqual(['1']);
    expect(carta.chapters['1']['1']).toMatch(/Jeremías/);
  });

  it('el resto sigue viniendo de la Reina-Valera', () => {
    for (const libro of BIBLE_BOOKS.filter((b) => !b.deuterocanonical)) {
      expect(libro.translationId, libro.id).toBe(RV1909.id);
    }
  });

  it('pedir la Biblia de ATHOS lleva a cada libro a su traducción', () => {
    expect(effectiveTranslation('WIS')).toBe('blm');
    expect(effectiveTranslation('GEN')).toBe('rv1909');
    // Si se pide una traducción concreta, se respeta.
    expect(effectiveTranslation('WIS', 'otra')).toBe('otra');
  });

  it('la ficha de la traducción dice que es un borrador y que sigue a los Setenta', () => {
    expect(translationOf('SIR')).toBe(BLM);
    expect(BLM.meta.license).toBe('public-domain');
    expect(BLM.meta.notes).toMatch(/borrador/);
    expect(BLM.meta.notes).toMatch(/Setenta/);
  });

  it('el Salmo 151 tiene texto', () => {
    const ps = JSON.parse(readFileSync(archivo('blm', 'PS2'), 'utf8'));
    expect(Object.keys(ps.chapters['1']).length).toBe(7);
  });
});
