/** Búsqueda global sin conexión y utilidades de texto. */
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { db } from '@/db/db';
import { seedContent } from '@/db/seed';
import { KIND_LABELS, searchAll } from '@/db/search';
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
    // Y lo que se devuelve es el texto tal cual está escrito, con sus tildes:
    // se busca sin acentos, no se contesta sin acentos.
    expect(highlight('oración', ['oracion'])).toBe('<mark>oración</mark>');
  });

  it('conserva los acentos del texto que no se ha marcado', () => {
    expect(highlight('La señal de la Cruz', ['cruz'])).toBe('La señal de la <mark>Cruz</mark>');
    expect(highlight('esta tradición nuestra', ['tradicion'])).toBe(
      'esta <mark>tradición</mark> nuestra',
    );
    // Varias marcas seguidas, con acentos antes, entre y después.
    expect(highlight('álfa béta gámma', ['beta'])).toBe('álfa <mark>béta</mark> gámma');
  });

  it('no pierde ni duplica una letra al marcar', () => {
    const textos = ['Señor, ten piedad', 'Kýrie eléison', 'Anunciación de la Theotokos'];
    for (const texto of textos) {
      for (const token of ['senor', 'eleison', 'anunciacion', 'theotokos']) {
        const salida = highlight(texto, [token]);
        expect(salida.replace(/<\/?mark>/g, '')).toBe(texto);
      }
    }
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

});


describe('la búsqueda en blanco no es un callejón sin salida', () => {
  const leer = (r: string) => readFileSync(resolve(process.cwd(), r), 'utf-8');

  it('todo lo que ofrece lleva a una ruta que existe', () => {
    const pagina = leer('src/features/search/SearchPage.tsx');
    const rutas = leer('src/routes/router.tsx');
    const ofrecidas = [...pagina.matchAll(/path: '(\/[^']+)'/g)].map((m) => m[1]);
    expect(ofrecidas.length).toBeGreaterThan(5);
    for (const ruta of ofrecidas) {
      expect(rutas, `la búsqueda ofrece ${ruta}`).toContain(`path: '${ruta.slice(1)}'`);
    }
  });

  it('lo que ofrece se nombra con la etiqueta de su grupo', () => {
    // Así el nombre de la pantalla y el del grupo de resultados coinciden.
    const pagina = leer('src/features/search/SearchPage.tsx');
    for (const m of pagina.matchAll(/kind: '([a-z]+)'/g)) {
      expect(Object.keys(KIND_LABELS), m[1]).toContain(m[1]);
    }
  });
});
