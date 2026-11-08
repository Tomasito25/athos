/**
 * Nada exportado se queda sin usar.
 *
 * Se habían acumulado unas treinta funciones que no llamaba nadie. Entre
 * ellas las de borrar sólo el historial o sólo las sesiones de oración:
 * existían, pero ningún botón las usaba, así que no se podía hacer. Esta
 * prueba avisa de la siguiente.
 *
 * Es una comprobación por nombre, no un análisis del compilador: si un nombre
 * aparece en otro archivo —o más de una vez en el suyo—, cuenta como usado.
 * Los tipos no se miran: no pesan nada en la aplicación.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const raiz = process.cwd();

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return archivos(ruta);
    return /\.(ts|tsx|mjs)$/.test(nombre) ? [ruta] : [];
  });
}

describe('código sin uso', () => {
  it('cada función o constante exportada se usa en algún sitio', () => {
    const todos = [
      ...archivos(join(raiz, 'src')),
      ...archivos(join(raiz, 'tests')),
      ...archivos(join(raiz, 'scripts')),
      join(raiz, 'vite.config.ts'),
      join(raiz, 'vitest.config.ts'),
    ];
    const textos = new Map(todos.map((ruta) => [ruta, readFileSync(ruta, 'utf-8')]));
    const sinUso: string[] = [];

    for (const ruta of todos.filter((r) => r.startsWith(join(raiz, 'src')))) {
      const texto = textos.get(ruta)!;
      for (const [, nombre] of texto.matchAll(/^export (?:async )?(?:function|const|let|class) (\w+)/gm)) {
        const enSuArchivo = texto.match(new RegExp(`\\b${nombre}\\b`, 'g'))?.length ?? 0;
        const patron = new RegExp(`\\b${nombre}\\b`);
        const fuera = [...textos].some(([otra, t]) => otra !== ruta && patron.test(t));
        if (enSuArchivo < 2 && !fuera) sinUso.push(`${relative(raiz, ruta)}: ${nombre}`);
      }
    }

    expect(sinUso).toEqual([]);
  });
});
