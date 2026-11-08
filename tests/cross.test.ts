/**
 * La orientación del supedáneo.
 *
 * El travesaño inferior de la cruz ortodoxa sube hacia la izquierda de quien
 * mira y baja hacia la derecha. La izquierda del que mira es la mano derecha
 * de Cristo, donde estaba el ladrón que se arrepintió y subió al paraíso; el
 * otro extremo apunta abajo. Dibujarla al revés invierte lo que la cruz dice,
 * y estuvo al revés en las cuatro cruces del proyecto hasta que alguien lo vio.
 *
 * En SVG la Y crece hacia abajo: el extremo izquierdo tiene que tener MENOS Y
 * que el derecho.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const leer = (ruta: string) => readFileSync(resolve(process.cwd(), ruta), 'utf-8');

interface Segmento {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Todos los tramos rectos de un dibujo, vengan como vengan escritos:
 *
 *   «M8 14.1l8 3.4»                    componente de React, relativo
 *   «M 160.00 314.00 L 352.00 366.00»  SVG generado, absoluto
 *   «M ${t(160, 314)} L ${t(352, 366)}»  el generador, con sus plantillas
 */
function segmentos(fuente: string): Segmento[] {
  const salida: Segmento[] = [];
  const num = String.raw`(-?[\d.]+)`;

  // Relativo: M x y l dx dy
  for (const m of fuente.matchAll(new RegExp(`M\\s*${num}\\s+${num}\\s*l\\s*${num}\\s+${num}`, 'g'))) {
    const [x1, y1, dx, dy] = m.slice(1).map(Number);
    salida.push({ x1, y1, x2: x1 + dx, y2: y1 + dy });
  }
  // Absoluto: M x y L x y
  for (const m of fuente.matchAll(new RegExp(`M\\s*${num}\\s+${num}\\s*L\\s*${num}\\s+${num}`, 'g'))) {
    const [x1, y1, x2, y2] = m.slice(1).map(Number);
    salida.push({ x1, y1, x2, y2 });
  }
  // Plantillas del generador: M ${t(x, y)} L ${t(x, y)}
  for (const m of fuente.matchAll(/t\((\d+),\s*(\d+)\)\}\s*L\s*\$\{t\((\d+),\s*(\d+)\)/g)) {
    const [x1, y1, x2, y2] = m.slice(1).map(Number);
    salida.push({ x1, y1, x2, y2 });
  }
  return salida;
}

/** El único tramo que no es ni horizontal ni vertical. */
function supedaneo(nombre: string, fuente: string): Segmento {
  const inclinados = segmentos(fuente).filter((s) => s.x1 !== s.x2 && s.y1 !== s.y2);
  expect(inclinados.length, `${nombre}: debería haber un único travesaño inclinado`).toBe(1);
  return inclinados[0];
}

function comprobar(nombre: string, fuente: string) {
  const s = supedaneo(nombre, fuente);
  const [izquierda, derecha] = s.x1 <= s.x2 ? [s.y1, s.y2] : [s.y2, s.y1];
  expect(
    izquierda,
    `${nombre}: el extremo izquierdo (y=${izquierda}) tiene que quedar MÁS ALTO que el ` +
      `derecho (y=${derecha}); en SVG eso significa menos Y`,
  ).toBeLessThan(derecha);
  // Y que se incline de verdad, no que quede casi recto.
  expect(Math.abs(derecha - izquierda), `${nombre}: apenas se inclina`).toBeGreaterThan(1);
}

/** El trozo de archivo donde vive un dibujo concreto. */
function bloque(fuente: string, desde: string, hasta: string): string {
  const inicio = fuente.indexOf(desde);
  expect(inicio, `no encuentro «${desde}»`).toBeGreaterThan(-1);
  const resto = fuente.slice(inicio);
  return resto.slice(0, resto.indexOf(hasta));
}

describe('el supedáneo sube a la izquierda', () => {
  const iconos = leer('src/components/icons.tsx');

  it('en el emblema de la aplicación', () => {
    comprobar('OrthodoxCross', bloque(iconos, 'export const OrthodoxCross', '</Svg>'));
  });

  it('en el icono del momento «al caer en el pecado»', () => {
    comprobar('IconCross', bloque(iconos, 'export const IconCross', '</Svg>'));
  });

  it('en el generador, que manda sobre todos los PNG', () => {
    const gen = leer('scripts/generate-icons.mjs');
    comprobar('generate-icons.mjs', bloque(gen, 'function cross', 'function masterSvg'));
  });

  it('en el SVG maestro y en el favicon ya generados', () => {
    for (const archivo of ['public/icons/icon.svg', 'public/favicon.svg']) {
      comprobar(archivo, leer(archivo));
    }
  });

  it('los cuatro dibujos coinciden entre sí', () => {
    // Si alguien arregla uno y se olvida de otro, esto lo dice.
    const fuentes: Array<[string, string]> = [
      ['OrthodoxCross', bloque(iconos, 'export const OrthodoxCross', '</Svg>')],
      ['IconCross', bloque(iconos, 'export const IconCross', '</Svg>')],
      ['generador', bloque(leer('scripts/generate-icons.mjs'), 'function cross', 'function masterSvg')],
      ['icon.svg', leer('public/icons/icon.svg')],
      ['favicon.svg', leer('public/favicon.svg')],
    ];
    for (const [nombre, fuente] of fuentes) {
      const s = supedaneo(nombre, fuente);
      const sube = (s.x1 <= s.x2 ? s.y1 - s.y2 : s.y2 - s.y1) < 0;
      expect(sube, `${nombre} va al contrario que los demás`).toBe(true);
    }
  });
});
