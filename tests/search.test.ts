/** Búsqueda global sin conexión y utilidades de texto. */
import { beforeAll, describe, expect, it } from 'vitest';
import { db } from '@/db/db';
import { seedContent } from '@/db/seed';
import { searchAll } from '@/db/search';
import { highlight, normalize, score, snippet, tokenize } from '@/lib/text';

beforeAll(async () => {
  await db.delete();
  await db.open();
  await seedContent();
});

describe('normalización', () => {
  it('ignora acentos y mayúsculas', () => {
    expect(normalize('Theotókos')).toBe(normalize('THEOTOKOS'));
    expect(normalize('oración')).toBe('oracion');
    expect(normalize('Señor, ¡ten piedad!')).toBe('senor ten piedad');
  });

  it('descarta los términos de una sola letra', () => {
    expect(tokenize('a la oración')).toEqual(['la', 'oracion']);
  });
});

describe('puntuación', () => {
  it('premia las coincidencias en el título', () => {
    const enTitulo = score(['pascua'], 'texto cualquiera', 'Domingo de Pascua');
    const enCuerpo = score(['pascua'], 'la pascua del Señor', 'Otro título');
    expect(enTitulo).toBeGreaterThan(enCuerpo);
  });

  it('exige que aparezcan todos los términos', () => {
    expect(score(['pascua', 'inexistente'], 'sólo pascua', 'título')).toBe(0);
  });
});

describe('fragmentos', () => {
  it('recorta alrededor de la coincidencia', () => {
    const largo = `${'palabra '.repeat(40)}misericordia${' palabra'.repeat(40)}`;
    const resultado = snippet(largo, ['misericordia'], 80);
    expect(resultado).toContain('misericordia');
    expect(resultado.length).toBeLessThan(120);
    expect(resultado.startsWith('…')).toBe(true);
  });

  it('quita las etiquetas del texto', () => {
    expect(snippet('<em>tres veces</em>', [])).toBe('tres veces');
  });
});

describe('resaltado', () => {
  it('marca la coincidencia y escapa el resto', () => {
    const salida = highlight('Ten piedad <script>', ['piedad']);
    expect(salida).toContain('<mark>piedad</mark>');
    expect(salida).toContain('&lt;script&gt;');
    expect(salida).not.toContain('<script>');
  });

  it('encuentra la coincidencia aunque el texto lleve acentos', () => {
    expect(highlight('oración', ['oracion'])).toContain('<mark>');
  });

  it('sin términos devuelve el texto escapado', () => {
    expect(highlight('a & b', [])).toBe('a &amp; b');
  });
});

describe('búsqueda global', () => {
  it('agrupa los resultados por categoría', async () => {
    const resultado = await searchAll('misericordia');
    expect(resultado.total).toBeGreaterThan(0);
    expect(resultado.groups.map((g) => g.kind)).toContain('prayer');
    for (const group of resultado.groups) {
      expect(group.results.length).toBeGreaterThan(0);
      expect(group.results.length).toBeLessThanOrEqual(group.total);
    }
  });

  it('encuentra santos por su nombre', async () => {
    const resultado = await searchAll('crisóstomo');
    const santos = resultado.groups.find((g) => g.kind === 'saint');
    expect(santos?.results.some((r) => r.title.includes('Crisóstomo'))).toBe(true);
  });

  it('encuentra monasterios del Athos', async () => {
    const resultado = await searchAll('simonopetra');
    expect(resultado.groups.find((g) => g.kind === 'monastery')?.total).toBe(1);
  });

  it('funciona sin acentos', async () => {
    const con = await searchAll('oración');
    const sin = await searchAll('oracion');
    expect(sin.total).toBe(con.total);
  });

  it('avisa si la Escritura no está indexada, en vez de callarse', async () => {
    const resultado = await searchAll('principio');
    expect(resultado.bibleIndexed).toBe(false);
    expect(resultado.groups.find((g) => g.kind === 'bible')).toBeUndefined();
  });

  it('busca en la Escritura una vez indexada', async () => {
    await db.bible_verses.bulkPut([
      {
        id: 'JHN.1.1',
        bookId: 'JHN',
        chapter: 1,
        verse: 1,
        text: 'EN el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.',
        translationId: 'rv1909',
      },
      {
        id: 'GEN.1.1',
        bookId: 'GEN',
        chapter: 1,
        verse: 1,
        text: 'EN el principio crió Dios los cielos y la tierra.',
        translationId: 'rv1909',
      },
    ]);

    const resultado = await searchAll('principio verbo');
    const biblia = resultado.groups.find((g) => g.kind === 'bible');
    expect(resultado.bibleIndexed).toBe(true);
    expect(biblia?.total).toBe(1);
    expect(biblia?.results[0].path).toBe('/leer/biblia/JHN/1#v1');
    await db.bible_verses.clear();
  });

  it('no devuelve nada con una consulta demasiado corta', async () => {
    expect((await searchAll('a')).total).toBe(0);
  });

  it('puede limitarse a ciertas categorías', async () => {
    const resultado = await searchAll('cruz', { kinds: ['prayer'] });
    expect(resultado.groups.every((g) => g.kind === 'prayer')).toBe(true);
  });

  it('nunca devuelve el cuerpo de una entrada cifrada del diario', async () => {
    await db.journal_entries.put({
      id: 'cifrada',
      date: '2026-08-23',
      title: 'Nota',
      body: 'texto-secreto-en-claro',
      tags: [],
      favorite: false,
      createdAt: '2026-08-23T00:00:00.000Z',
      updatedAt: '2026-08-23T00:00:00.000Z',
      encryption: {
        algorithm: 'AES-GCM',
        kdf: 'PBKDF2-SHA256',
        iterations: 310000,
        salt: 's',
        iv: 'i',
      },
    });
    const resultado = await searchAll('secreto');
    expect(resultado.groups.find((g) => g.kind === 'journal')).toBeUndefined();
    await db.journal_entries.clear();
  });
});
