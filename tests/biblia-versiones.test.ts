/**
 * Una corrección de la Biblia llega a quien ya la tenía.
 *
 * Los libros se guardaban sin número de versión, en la caché del Service
 * Worker durante un año y además en IndexedDB, y al actualizar no se
 * renovaban. Con la BLM, que sus autores presentan como borrador en revisión,
 * eso era dejar a la gente leyendo para siempre el texto viejo.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { db, getSetting, setSetting } from '@/db/db';
import { contentUrl, contentVersions } from '@/lib/content-url';
import { contentVersions as calcular } from '../scripts/content-versions';
import { renewStaleTranslations } from '@/db/bible';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

const versiculo = (translationId: string, id: string) => ({
  id,
  bookId: id.split('.')[0].replace(/^.*:/, ''),
  chapter: 1,
  verse: 1,
  text: 'texto viejo',
  translationId,
});

describe('la huella del corpus', () => {
  it('cada traducción y el leccionario tienen la suya', () => {
    const versiones = contentVersions();
    for (const grupo of ['bible/rv1909', 'bible/blm', 'bible/lxx', 'bible/grc-nt', 'lectionary', 'icons']) {
      expect(versiones[grupo], grupo).toMatch(/^[0-9a-f]{10}$/);
    }
  });

  it('se calcula del contenido: cambia si cambia un solo archivo', () => {
    const raiz = mkdtempSync(join(tmpdir(), 'athos-huella-'));
    mkdirSync(join(raiz, 'bible/blm'), { recursive: true });
    writeFileSync(join(raiz, 'bible/blm/TOB.json'), '{"a":1}');
    writeFileSync(join(raiz, 'bible/blm/JDT.json'), '{"b":1}');
    const antes = calcular(raiz)['bible/blm'];
    writeFileSync(join(raiz, 'bible/blm/TOB.json'), '{"a":2}');
    const despues = calcular(raiz)['bible/blm'];
    expect(antes).toMatch(/^[0-9a-f]{10}$/);
    expect(despues).not.toBe(antes);
    // Y es la que lleva la compilación.
    expect(calcular(resolve(process.cwd(), 'public/content'))).toEqual(contentVersions());
  });

  it('los libros se piden con la huella de su traducción', () => {
    const v = contentVersions()['bible/blm'];
    expect(contentUrl('bible/blm/TOB.json')).toBe(`/content/bible/blm/TOB.json?v=${v}`);
    expect(contentUrl('content/lectionary/lectionary-juliano.json')).toMatch(/\?v=[0-9a-f]{10}$/);
    // Lo que no tiene carpeta con huella se pide tal cual.
    expect(contentUrl('otra/cosa.json')).toBe('/content/otra/cosa.json');
  });
});

describe('al actualizar', () => {
  it('tira los versículos de la traducción que ha cambiado y deja los demás', async () => {
    const actuales = Object.fromEntries(
      Object.entries(contentVersions())
        .filter(([g]) => g.startsWith('bible/'))
        .map(([g, v]) => [g.slice(6), v]),
    );
    await setSetting('bible.versions', { ...actuales, blm: 'huellavieja' });
    await db.bible_verses.bulkPut([versiculo('blm', 'TOB.1.1'), versiculo('rv1909', 'GEN.1.1')]);
    await setSetting('bible.indexedBooks', ['TOB', 'GEN']);

    expect(await renewStaleTranslations()).toEqual(['blm']);

    expect(await db.bible_verses.get('TOB.1.1')).toBeUndefined();
    expect(await db.bible_verses.get('GEN.1.1')).toBeDefined();
    // Tobías se volverá a indexar; Génesis no hace falta.
    expect(await getSetting('bible.indexedBooks', [])).toEqual(['GEN']);
    expect((await getSetting<Record<string, string>>('bible.versions', {})).blm).toBe(actuales.blm);
  });

  it('si cambia el texto del que sale el Salterio, el Salterio se reconstruye', async () => {
    await setSetting('psalter.built.v2', true);
    await db.psalms.put({ id: 1, numberLxx: 1 } as never);
    await setSetting('bible.versions', {});

    await renewStaleTranslations();

    expect(await db.psalms.count()).toBe(0);
    expect(await getSetting('psalter.built.v2', true)).toBe(false);
  });

  it('quien venía de una versión sin huellas lo renueva todo una vez', async () => {
    await db.bible_verses.bulkPut([versiculo('rv1909', 'JHN.1.1'), versiculo('grc-nt', 'grc-nt:JHN.1.1')]);
    const renovadas = await renewStaleTranslations();
    expect(renovadas).toEqual(expect.arrayContaining(['rv1909', 'blm', 'lxx', 'grc-nt']));
    expect(await db.bible_verses.count()).toBe(0);
    // Y la segunda vez ya no hay nada que renovar.
    expect(await renewStaleTranslations()).toEqual([]);
  });

  it('no toca nada del usuario', async () => {
    await db.favorites.put({ id: 'bible:JHN.3.16', kind: 'bible', refId: 'JHN.3.16', title: 'Jn 3, 16', createdAt: '' } as never);
    await renewStaleTranslations();
    expect(await db.favorites.count()).toBe(1);
  });
});
