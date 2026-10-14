/**
 * La Biblia en griego.
 *
 * Cada capítulo español lleva al griego que le corresponde, aunque la
 * numeración de los Setenta sea otra; los versículos griegos no pisan a los
 * españoles en la base de datos; los archivos están, con los libros de la
 * Biblia de la Iglesia; y la búsqueda española no devuelve griego.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { greekPlaces } from '@/lib/greek-bible';
import { chapterVerses } from '@/db/bible';
import { BIBLE_BOOKS, TRANSLATIONS } from '@/content/bible';

const dir = (t: string) => resolve(process.cwd(), 'public/content/bible', t);

describe('dónde cae cada capítulo en la Biblia griega', () => {
  it('los salmos van con la numeración de los Setenta', () => {
    expect(greekPlaces('PSA', 51).map((p) => p.chapter)).toEqual([50]);
    expect(greekPlaces('PSA', 10).map((p) => p.chapter)).toEqual([9]);
    expect(greekPlaces('PSA', 116).map((p) => p.chapter)).toEqual([114, 115]);
    expect(greekPlaces('PSA', 23).map((p) => p.chapter)).toEqual([22]);
    expect(greekPlaces('PRO', 30)[0]).toMatchObject({ bookId: 'PRO', chapter: 24 });
  });

  it('Nehemías es Esdras B, y Susana y Bel van aparte', () => {
    expect(greekPlaces('NEH', 1)[0]).toMatchObject({ bookId: 'EZR', chapter: 11 });
    expect(greekPlaces('DAG', 13)[0]).toMatchObject({ bookId: 'SUS', chapter: 1 });
    expect(greekPlaces('DAG', 14)[0]).toMatchObject({ bookId: 'BEL', chapter: 1 });
    expect(greekPlaces('MAL', 4)[0]).toMatchObject({ bookId: 'MAL', chapter: 3 });
  });

  it('el Nuevo Testamento coincide capítulo por capítulo', () => {
    expect(greekPlaces('JHN', 3)).toEqual([{ translationId: 'grc-nt', bookId: 'JHN', chapter: 3 }]);
  });

  it('cada libro de ATHOS tiene su griego, y existe el archivo', () => {
    for (const libro of BIBLE_BOOKS) {
      const lugares = greekPlaces(libro.id, 1);
      expect(lugares.length, libro.id).toBeGreaterThan(0);
      for (const l of lugares) expect(existsSync(resolve(dir(l.translationId), `${l.bookId}.json`)), `${libro.id} → ${l.bookId}`).toBe(true);
    }
  });

  it('y el capítulo existe en el archivo griego', () => {
    for (const libro of BIBLE_BOOKS) {
      for (let c = 1; c <= libro.chapters; c += 1) {
        for (const l of greekPlaces(libro.id, c)) {
          const archivo = JSON.parse(readFileSync(resolve(dir(l.translationId), `${l.bookId}.json`), 'utf-8'));
          expect(archivo.chapters[String(l.chapter)], `${libro.id} ${c} → ${l.bookId} ${l.chapter}`).toBeTruthy();
        }
      }
    }
  });
});

describe('en la base de datos', () => {
  it('los versículos griegos llevan delante su traducción; los españoles, no', () => {
    const archivo = { id: 'JHN', name: 'Juan', chapters: { '1': { '1': 'Ἐν ἀρχῇ' } } };
    expect(chapterVerses(archivo, 1, 'grc-nt')[0]!.id).toBe('grc-nt:JHN.1.1');
    expect(chapterVerses(archivo, 1, 'rv1909')[0]!.id).toBe('JHN.1.1');
  });

  it('las dos traducciones griegas son de dominio público', () => {
    expect(TRANSLATIONS.lxx?.meta.license).toBe('public-domain');
    expect(TRANSLATIONS['grc-nt']?.meta.license).toBe('public-domain');
  });
});
