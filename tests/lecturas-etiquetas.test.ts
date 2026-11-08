/**
 * Cómo se enseñan las lecturas.
 *
 * El leccionario de origen es inglés y llega con rótulos internos
 * («Composite 2 - …») y notas a medio traducir («san John Chrysostom»). La
 * ficha del día, además, llamaba «Epístola» a todo lo que no era Evangelio.
 * Se comprueba contra el leccionario real, no contra ejemplos.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readingLabel, readingNote, readingTitle, splitReadings } from '@/lib/readings';
import type { ReadingRef } from '@/types';

const datos = JSON.parse(
  readFileSync(resolve(__dirname, '../public/content/lectionary/lectionary.json'), 'utf8'),
) as { readings: Array<Array<{ reference: string; note?: string; kind: string }>> };
const todas = datos.readings.flat();

describe('las referencias', () => {
  it('ninguna se enseña con el rótulo interno ni a medio traducir', () => {
    for (const r of todas) {
      const titulo = readingTitle(r.reference);
      expect(titulo, r.reference).not.toMatch(/Composite|Kings|\bMatt\b|with verses|\d[.:]\d|\u200b/);
    }
  });

  it('las que no estaban en español se escriben como las demás', () => {
    expect(readingTitle('4[2] Kings 2.6-14')).toBe('2 Reyes 2, 6-14');
    expect(readingTitle('Lucas 23:39-43; Matt 27:39-54')).toBe('Lucas 23, 39-43; Mateo 27, 39-54');
    expect(readingTitle('\u200bComposite 18 - 3 [1] Kings 7:51-8:1, 8:4-7, 9-11')).toBe('1 Reyes 7, 51 – 8, 1, 8, 4-7, 9-11');
  });

  it('las compuestas se escriben como las demás', () => {
    expect(readingTitle('Composite 2 - Proverbios 10, 3, 8')).toBe('Proverbios 10, 3, 8');
    expect(readingTitle('Composite 1 - Génesis 17.1-2, 4, 5-7')).toBe('Génesis 17, 1-2, 4, 5-7');
    expect(readingTitle('Composite 16 - Isaías 63.15-64.5, 8-9')).toBe('Isaías 63, 15 – 64, 5, 8-9');
    expect(readingTitle('Composite 12 - 3 [1] Kings 17.1-23')).toBe('1 Reyes 17, 1-23');
    expect(readingTitle('Lucas 6, 37-45')).toBe('Lucas 6, 37-45');
  });
});

describe('las notas', () => {
  const INGLES = /\b(John|James|George|Mark|Saint|either|and|Eve|of|Elevation|Church|Image|Earthquake|Hierarchs|Forefathers|Protection|New|Year|Presanctified|Vespers|Blessing|Waters|variant|Innocent|Tikhon|Seraphim|Nicholas|Basil|Sabbas|Gregory|Athanasius|Sergius|Elijah|Boris)\b/;

  it('ninguna queda con palabras en inglés', () => {
    const notas = new Set(todas.map((r) => r.note).filter((n): n is string => !!n));
    for (const nota of notas) expect(readingNote(nota), nota).not.toMatch(INGLES);
  });

  it('se traducen bien las que más salen', () => {
    expect(readingNote('san John Chrysostom')).toBe('san Juan Crisóstomo');
    expect(readingNote('domingo anterior a Elevation')).toBe('domingo anterior a la Exaltación de la Cruz');
    expect(readingNote('Boris and Gleb')).toBe('los santos Borís y Gleb');
    expect(readingNote('la Theotokos')).toBe('la Theotokos');
  });
});

describe('los nombres de cada lectura', () => {
  it('el Evangelio de Maitines y las de Vísperas no se llaman «Epístola»', () => {
    expect(readingLabel('evangelio-maitines')).toBe('Evangelio de Maitines');
    expect(readingLabel('visperas')).toBe('Vísperas');
  });

  it('las de la Liturgia van primero: la Epístola y luego el Evangelio', () => {
    const lecturas: ReadingRef[] = [
      { kind: 'visperas', reference: 'Proverbios 8, 22-30' },
      { kind: 'evangelio', reference: 'Lucas 6, 37-45' },
      { kind: 'evangelio-maitines', reference: 'Juan 10, 1-9' },
      { kind: 'epistola', reference: 'Filipenses 1, 8-14' },
    ];
    const { liturgia, otras } = splitReadings(lecturas);
    expect(liturgia.map((r) => r.kind)).toEqual(['epistola', 'evangelio']);
    expect(otras.map((r) => r.kind)).toEqual(['visperas', 'evangelio-maitines']);
  });
});
