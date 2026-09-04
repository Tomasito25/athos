/**
 * La flecha de volver.
 *
 * Lo que se protege aquí no es una lista escrita a mano, sino la tabla de
 * rutas de verdad: se recorre entera y se exige que el padre de cada pantalla
 * sea otra pantalla que exista. Si mañana alguien añade una ruta con un tramo
 * de paso nuevo, esta prueba falla y no se descubre en un móvil.
 */
import { describe, expect, it } from 'vitest';
import type { RouteObject } from 'react-router-dom';
import { routes } from '@/routes/router';
import { SEGMENTOS_PUENTE, parentPath } from '@/lib/up-navigation';

/** Todas las rutas de la tabla, como patrones absolutos. */
function patterns(list: RouteObject[], prefix = ''): string[] {
  const salida: string[] = [];
  for (const route of list) {
    const path = route.path ?? '';
    if (path === '*') continue;
    const full = path.startsWith('/') ? path : `${prefix}/${path}`.replace(/\/+/g, '/');
    if (path) salida.push(full.length > 1 ? full.replace(/\/$/, '') : '/');
    if (route.children) salida.push(...patterns(route.children, full === '/' ? '' : full));
  }
  return salida;
}

const TODAS = patterns(routes);

/** Un patrón casa con una ruta concreta si coinciden segmento a segmento. */
const casa = (pattern: string, path: string): boolean => {
  const a = pattern.split('/').filter(Boolean);
  const b = path.split('/').filter(Boolean);
  return a.length === b.length && a.every((seg, i) => seg.startsWith(':') || seg === b[i]);
};

const existe = (path: string) => path === '/' || TODAS.some((p) => casa(p, path));

/** Sustituye `:param` por un valor cualquiera para tener una ruta concreta. */
const concreta = (pattern: string) =>
  pattern
    .split('/')
    .map((seg) => (seg.startsWith(':') ? 'x' : seg))
    .join('/');

describe('la flecha de volver', () => {
  it('encuentra la tabla de rutas', () => {
    expect(TODAS.length).toBeGreaterThan(40);
    expect(TODAS).toContain('/calendario/santos/:saintId');
  });

  it('sube a una pantalla que existe desde cualquier ruta de la aplicación', () => {
    const huerfanas = TODAS.map(concreta)
      .filter((path) => path !== '/')
      .map((path) => ({ path, padre: parentPath(path) }))
      .filter(({ padre }) => !existe(padre));

    expect(huerfanas).toEqual([]);
  });

  it('nunca devuelve algo fuera de la aplicación, y siempre sube', () => {
    // El inicio es el techo: por encima sólo está salirse, que es justo lo
    // que esta flecha no debe hacer nunca.
    expect(parentPath('/')).toBe('/');

    for (const path of TODAS.map(concreta).filter((p) => p !== '/')) {
      const padre = parentPath(path);
      expect(padre.startsWith('/')).toBe(true);
      expect(padre.length).toBeLessThan(path.length);
    }
  });

  it('salta los tramos que no son pantalla', () => {
    expect(parentPath('/orar/oraciones/categoria/matutinas')).toBe('/orar/oraciones');
    expect(parentPath('/orar/regla/editar/diario')).toBe('/orar/regla');
    expect(parentPath('/biblioteca/athos/monasterio/lavra')).toBe('/biblioteca/athos');
    expect(parentPath('/leer/salterio/kathisma/1')).toBe('/leer/salterio');
    expect(parentPath('/calendario/dia/2026-09-03')).toBe('/calendario');
    expect(parentPath('/orar/oficio/manana')).toBe('/orar');
  });

  it('quita un solo segmento cuando el padre ya es una pantalla', () => {
    expect(parentPath('/calendario/santos/antimo')).toBe('/calendario/santos');
    expect(parentPath('/leer/biblia/juan/3')).toBe('/leer/biblia/juan');
    expect(parentPath('/biblioteca/padres/crisostomo/sacerdocio')).toBe('/biblioteca/padres/crisostomo');
  });

  it('desde una sección de primer nivel lleva al inicio', () => {
    expect(parentPath('/orar')).toBe('/');
    expect(parentPath('/biblioteca')).toBe('/');
  });

  it('no declara tramos de paso que ya no use ninguna ruta', () => {
    const usados = new Set(
      TODAS.flatMap((p) => p.split('/').filter(Boolean)).filter((seg) => !seg.startsWith(':')),
    );
    const sobrantes = [...SEGMENTOS_PUENTE].filter((seg) => !usados.has(seg));
    expect(sobrantes).toEqual([]);
  });
});
