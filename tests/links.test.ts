/**
 * Los enlaces internos.
 *
 * Un enlace roto en una aplicación sin conexión no da un 404 del servidor: da
 * una pantalla que dice «eso no existe», y el lector no sabe si es un fallo o
 * si de verdad no está. Así que cada ruta que el contenido nombra tiene que
 * apuntar a algo que exista.
 */
import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SAINTS } from '@/content/saints';
import { CHURCH_FATHERS } from '@/content/fathers';
import { MONASTERIES, ATHOS_ARTICLES } from '@/content/athos';
import { PRAYERS, PRAYER_CATEGORIES } from '@/content/prayers';
import { OFFICES } from '@/content/offices';
import { ICONS } from '@/content/icons';
import { AKATHISTS, CANONS } from '@/content/hymns';
import { HISTORY_PERIODS } from '@/content/history-all';
import { CATECHISM_PARTS } from '@/content/catechism-parts';
import { STUDY_COURSES, STUDY_WORKS } from '@/content/study';
import { LINK_ALIASES, LINK_TARGETS, linkify, otraFicha } from '@/content/links';

/** Todas las rutas que el contenido declara, sacadas del código fuente. */
function rutasDeclaradas(): Array<{ archivo: string; ruta: string }> {
  const dir = resolve(__dirname, '../src/content');
  const salida: Array<{ archivo: string; ruta: string }> = [];
  for (const archivo of readdirSync(dir)) {
    if (!archivo.endsWith('.ts')) continue;
    const texto = readFileSync(resolve(dir, archivo), 'utf8');
    for (const m of texto.matchAll(/path: '(\/[^']*)'/g)) {
      salida.push({ archivo, ruta: m[1] });
    }
  }
  return salida;
}

/** Qué existe de verdad, por prefijo de ruta. */
const EXISTE: Record<string, Set<string>> = {
  '/calendario/santos/': new Set(SAINTS.map((s) => s.id)),
  '/biblioteca/padres/': new Set(CHURCH_FATHERS.map((f) => f.id)),
  '/biblioteca/athos/monasterio/': new Set(MONASTERIES.map((m) => m.id)),
  '/biblioteca/athos/': new Set(ATHOS_ARTICLES.map((a) => a.id)),
  '/orar/oraciones/categoria/': new Set(PRAYER_CATEGORIES.map((c) => c.id)),
  '/orar/oraciones/': new Set([...PRAYERS.map((p) => p.id), 'todas']),
  '/biblioteca/liturgia/': new Set(OFFICES.map((o) => o.id)),
  '/biblioteca/iconos/': new Set(ICONS.map((i) => i.id)),
  '/biblioteca/akathistos/': new Set(AKATHISTS.map((a) => a.id)),
  '/biblioteca/canones/': new Set(CANONS.map((c) => c.id)),
  '/biblioteca/historia/': new Set(HISTORY_PERIODS.map((p) => p.id)),
  '/biblioteca/catecismo/': new Set(CATECHISM_PARTS.map((p) => p.id)),
  '/biblioteca/estudio/obra/': new Set(STUDY_WORKS.map((w) => w.id)),
  '/biblioteca/estudio/': new Set(STUDY_COURSES.map((c) => c.id)),
};

/** Rutas sin parámetro: existen por sí mismas. */
const FIJAS = new Set([
  '/',
  '/orar',
  '/orar/oraciones',
  '/orar/oracion-de-jesus',
  '/orar/komboskini',
  '/orar/regla',
  '/leer',
  '/leer/biblia',
  '/leer/salterio',
  '/leer/lecturas',
  '/calendario',
  '/calendario/santos',
  '/calendario/ayuno',
  '/calendario/fiestas',
  '/biblioteca',
  '/biblioteca/liturgia',
  '/biblioteca/akathistos',
  '/biblioteca/canones',
  '/biblioteca/padres',
  '/biblioteca/athos',
  '/biblioteca/iconos',
  '/biblioteca/historia',
  '/biblioteca/catecismo',
  '/biblioteca/estudio',
  '/favoritos',
]);

/** Rutas con dos segmentos variables, que se comprueban aparte. */
function esObraDeUnPadre(ruta: string): boolean {
  const m = ruta.match(/^\/biblioteca\/padres\/([^/]+)\/([^/]+)$/);
  if (!m) return false;
  const padre = CHURCH_FATHERS.find((f) => f.id === m[1]);
  return Boolean(padre?.works.some((w) => w.id === m[2]));
}

function esOficio(ruta: string): boolean {
  return /^\/orar\/oficio\/(manana|mediodia|noche)$/.test(ruta);
}

function existe(ruta: string): boolean {
  const limpia = ruta.split('#')[0].split('?')[0];
  if (FIJAS.has(limpia)) return true;
  if (esObraDeUnPadre(limpia) || esOficio(limpia)) return true;
  // El prefijo más largo que case manda: /biblioteca/athos/monasterio/ antes
  // que /biblioteca/athos/.
  const prefijos = Object.keys(EXISTE)
    .filter((p) => limpia.startsWith(p))
    .sort((a, b) => b.length - a.length);
  for (const p of prefijos) {
    const resto = limpia.slice(p.length);
    if (resto && !resto.includes('/') && EXISTE[p].has(resto)) return true;
  }
  return false;
}

describe('las rutas que el contenido nombra', () => {
  it('apuntan todas a algo que existe', () => {
    const rotas = rutasDeclaradas().filter(({ ruta }) => !existe(ruta));
    expect(
      rotas,
      `enlaces rotos:\n${rotas.map((r) => `  ${r.archivo} → ${r.ruta}`).join('\n')}`,
    ).toEqual([]);
  });

  it('hay bastantes, no dos de muestra', () => {
    expect(rutasDeclaradas().length).toBeGreaterThan(40);
  });
});

describe('el enlazado automático de la prosa', () => {
  it('enlaza un nombre completo y deja el resto del texto intacto', () => {
    const trozos = linkify('Fue discípulo de San Juan Crisóstomo en Antioquía.');
    expect(trozos.map((t) => t.text).join('')).toBe(
      'Fue discípulo de San Juan Crisóstomo en Antioquía.',
    );
    const enlace = trozos.find((t) => t.path);
    expect(enlace?.text).toBe('San Juan Crisóstomo');
    expect(enlace?.path).toBe('/biblioteca/padres/juan-crisostomo');
  });

  it('nunca pierde ni añade una letra', () => {
    // Lo más importante de todo: el texto reconstruido tiene que ser idéntico.
    const textos = [
      'San Gregorio Palamás y San Máximo el Confesor, en el Monte Athos.',
      'Sin ningún nombre reconocible dentro.',
      '',
      'San Basilio el Grande. San Basilio el Grande otra vez.',
    ];
    for (const texto of textos) {
      expect(linkify(texto).map((t) => t.text).join('')).toBe(texto);
    }
  });

  it('prefiere el nombre más largo cuando dos se solapan', () => {
    const trozos = linkify('Lo escribió San Gregorio de Nisa, no otro.');
    expect(trozos.find((t) => t.path)?.text).toBe('San Gregorio de Nisa');
  });

  it('no parte una palabra por dentro', () => {
    // «Antonio» está dentro de «Antoniano»: no debe enlazarse.
    const trozos = linkify('El calendario Antoniano no existe.');
    expect(trozos.every((t) => !t.path)).toBe(true);
  });

  it('no enlaza dos veces al mismo sitio en el mismo texto', () => {
    const trozos = linkify('San Basilio el Grande escribió. San Basilio el Grande murió joven.');
    expect(trozos.filter((t) => t.path).length).toBe(1);
  });

  it('no enlaza a la página en la que ya estás', () => {
    const trozos = linkify('San Juan Crisóstomo lo dijo.', {
      omitir: '/biblioteca/padres/juan-crisostomo',
    });
    expect(trozos.every((t) => !t.path)).toBe(true);
  });

  it('respeta el tope de enlaces por texto', () => {
    const texto =
      'San Basilio el Grande, San Gregorio Nacianceno, San Juan Crisóstomo, ' +
      'San Atanasio el Grande y San Máximo el Confesor.';
    expect(linkify(texto, { maximo: 2 }).filter((t) => t.path).length).toBe(2);
  });

  it('cuando un nombre es de un Padre y de un santo, manda el Padre', () => {
    // Desde una reseña que habla de doctrina, la ficha útil es la que trae la
    // doctrina; a la del santo se llega por el calendario.
    const trozos = linkify('San Gregorio Palamás defendió a los hesicastas.');
    expect(trozos.find((t) => t.path)?.path).toBe('/biblioteca/padres/gregorio-palamas');
  });
});

describe('el índice de nombres', () => {
  it('no admite nombres cortos salvo los apodos escritos a mano', () => {
    // Hay tres clases de nombre y cada una tiene su listón. Los que salen tal
    // cual del contenido —«San Cirilo de Alejandría»— van con tratamiento y
    // son largos. Los mismos sin el «san» delante —«Cirilo de Alejandría»—
    // pierden una palabra, así que se les exige más longitud. Y los apodos
    // están revisados uno por uno y pueden ser cortos: «Palamás» es una sola
    // persona en toda la tradición.
    const apodos = new Set(LINK_ALIASES.map((a) => a.name.toLowerCase()));
    for (const t of LINK_TARGETS) {
      if (apodos.has(t.name.toLowerCase())) continue;
      const palabras = t.name.trim().split(/\s+/).length;
      const suficiente = t.name.length >= 14 || (t.name.length >= 12 && palabras >= 3);
      expect(suficiente, `«${t.name}» es demasiado corto para enlazarlo sin revisarlo`).toBe(true);
      expect(palabras, `«${t.name}» es una sola palabra`).toBeGreaterThanOrEqual(2);
    }
  });

  it('enlaza también los nombres sin el «san» delante', () => {
    // La prosa histórica escribe «Cirilo de Alejandría» a secas. Sin esto, el
    // nombre más citado de un párrafo sería justo el que no se puede pinchar.
    const trozos = linkify('La fórmula de Cirilo de Alejandría venía de Apolinar.');
    expect(trozos.find((t) => t.path)?.path).toBe('/biblioteca/padres/cirilo-alejandria');
  });

  it('no secuestra palabras que en un texto de doctrina significan otra cosa', () => {
    // «Santísima Trinidad» es el título de un icono; en un párrafo sobre Dios
    // no se refiere a la tabla pintada.
    const trozos = linkify('Dios es la Santísima Trinidad: Padre, Hijo y Espíritu Santo.');
    expect(trozos.every((t) => !t.path)).toBe(true);
  });

  it('los apodos son pocos y todos inequívocos', () => {
    // Si esta lista crece sin control, deja de estar revisada. Cada añadido
    // tiene que referirse a una sola persona o cosa en toda la tradición.
    expect(LINK_ALIASES.length).toBeLessThanOrEqual(20);
    for (const a of LINK_ALIASES) {
      expect(a.name.length, `«${a.name}»`).toBeGreaterThan(5);
    }
  });

  it('todos apuntan a algo que existe', () => {
    const rotos = LINK_TARGETS.filter((t) => !existe(t.path));
    expect(rotos.map((t) => `${t.name} → ${t.path}`)).toEqual([]);
  });

  it('un mismo nombre no lleva a dos sitios', () => {
    const nombres = LINK_TARGETS.map((t) => t.name.toLowerCase());
    expect(new Set(nombres).size).toBe(nombres.length);
  });


  it('un apodo escrito a mano gana a cualquier regla automática', () => {
    // «La oración de Jesús» es además el título de un libro de Briantchaninov.
    // Desde una frase corriente, lo que se busca es la práctica.
    const trozos = linkify('Repetía la oración de Jesús todo el día.');
    expect(trozos.find((t) => t.path)?.path).toBe('/orar/oracion-de-jesus');
  });

  it('no convierte una frase corriente en un enlace a un libro', () => {
    // «El camino de la salvación» es el título de una obra de san Teófano y
    // también algo que dice cualquier párrafo de catecismo.
    const trozos = linkify('Los sacramentos son el camino de la salvación.');
    expect(trozos.every((t) => !t.path)).toBe(true);
  });

  it('enlaza las obras de los Padres cuando se las nombra por su título', () => {
    const trozos = linkify('Lo explicó en Contra las herejías, hacia el año 180.');
    expect(trozos.find((t) => t.path)?.path).toBe(
      '/biblioteca/padres/ireneo-lyon/ireneo-herejias',
    );
  });

  it('están los que más se nombran', () => {
    const porNombre = new Set(LINK_TARGETS.map((t) => t.name.toLowerCase()));
    for (const n of ['san juan crisóstomo', 'san gregorio palamás', 'monte athos', 'crisóstomo']) {
      expect(porNombre.has(n), `falta «${n}»`).toBe(true);
    }
  });
});

describe('las dos fichas de la misma persona', () => {
  it('desde el santo se llega al Padre, y al revés', () => {
    const alPadre = otraFicha('San Gregorio Palamás', 'santo');
    expect(alPadre?.path).toBe('/biblioteca/padres/gregorio-palamas');
    const alSanto = otraFicha('San Gregorio Palamás', 'padre');
    expect(alSanto?.path).toBe('/calendario/santos/gregorio-palamas');
  });

  it('no se empareja consigo mismo', () => {
    const r = otraFicha('San Gregorio Palamás', 'santo');
    expect(r?.kind).not.toBe('santo');
  });

  it('devuelve nada cuando la persona sólo tiene una ficha', () => {
    expect(otraFicha('San Hermilo y Estratónico', 'santo')).toBeNull();
  });

  it('empareja también a los que tienen doble ficha de verdad', () => {
    // Si esto se queda en cero, el emparejamiento ha dejado de funcionar.
    const dobles = SAINTS.filter((s) => otraFicha(s.name, 'santo')?.kind === 'padre');
    expect(dobles.length, 'ningún santo enlaza con su ficha de Padre').toBeGreaterThanOrEqual(5);
  });
});
