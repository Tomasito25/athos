/**
 * De la longitud y la latitud al dibujo.
 *
 * La misma proyección con que `scripts/build-mapas.mjs` generó la costa: si
 * fueran distintas, cada ciudad caería en el mar. Y dónde va cada rótulo, que
 * se calcula aquí y no en el componente para que las pruebas puedan comprobar
 * que ninguno pisa a otro.
 */
import type { MapaBase } from '@/content/generated/mapas';

export function proyectar(mapa: MapaBase, lon: number, lat: number): [number, number] {
  const [oeste, , , norte] = mapa.caja;
  return [(lon - oeste) * mapa.cos * mapa.escala, (norte - lat) * mapa.escala];
}

export function dentroDelMapa(mapa: MapaBase, lon: number, lat: number): boolean {
  const [oeste, sur, este, norte] = mapa.caja;
  return lon >= oeste && lon <= este && lat >= sur && lat <= norte;
}

/** Oeste, sur, este, norte, en grados. */
export type Encuadre = [number, number, number, number];

/**
 * El trozo del mapa que se enseña.
 *
 * Con un encuadre más pequeño que el mapa entero se acerca la vista sin
 * generar otra costa; `f` es cuánto, y los puntos y las letras se encogen en
 * esa proporción para verse del mismo tamaño en la pantalla.
 */
export function vista(mapa: MapaBase, encuadre?: Encuadre) {
  if (!encuadre) return { x: 0, y: 0, ancho: mapa.ancho, alto: mapa.alto, f: 1 };
  const [oeste, sur, este, norte] = encuadre;
  const [x0, y0] = proyectar(mapa, oeste, norte);
  const [x1, y1] = proyectar(mapa, este, sur);
  return { x: x0, y: y0, ancho: x1 - x0, alto: y1 - y0, f: (x1 - x0) / mapa.ancho };
}

/** Alto de la letra de los rótulos en un mapa de mil unidades de ancho. */
export const LETRA = 30;

/** Ancho medio de una letra respecto de su alto: lo justo para saber dónde acaba un rótulo. */
const ANCHO_LETRA = 0.56;

export type Aspecto = 'lleno' | 'hueco' | 'discontinuo' | 'tachado' | 'pequeño';

export const RADIO: Record<Aspecto, number> = {
  lleno: 10,
  hueco: 9,
  discontinuo: 9,
  tachado: 9,
  pequeño: 6,
};

export type Lado = 'derecha' | 'izquierda' | 'arriba' | 'abajo';

export interface Caja {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/**
 * Dónde va el rótulo de un punto en (x, y) de radio `r`.
 *
 * A un lado, centrado en vertical; arriba o abajo, centrado en horizontal y
 * con todas sus líneas por encima o por debajo del punto.
 */
export function rotulo(x: number, y: number, texto: string, r: number, f: number, lado: Lado = 'derecha', dy = 0) {
  const letra = LETRA * f;
  const lineas = texto.split('\n');
  const salto = letra * 1.1;
  const separacion = r + 7 * f;
  const anchor: 'start' | 'end' | 'middle' = lado === 'derecha' ? 'start' : lado === 'izquierda' ? 'end' : 'middle';
  const tx = lado === 'derecha' ? x + separacion : lado === 'izquierda' ? x - separacion : x;
  const ty =
    (lado === 'arriba'
      ? y - separacion - 4 * f - (lineas.length - 1) * salto
      : lado === 'abajo'
        ? y + separacion + letra * 0.8
        : y + letra * 0.35 - ((lineas.length - 1) * salto) / 2) +
    dy * f;
  const ancho = Math.max(...lineas.map((l) => l.length)) * ANCHO_LETRA * letra;
  const x0 = anchor === 'start' ? tx : anchor === 'end' ? tx - ancho : tx - ancho / 2;
  const caja: Caja = { x0, x1: x0 + ancho, y0: ty - 0.75 * letra, y1: ty + (lineas.length - 1) * salto + 0.25 * letra };
  return { x: tx, y: ty, anchor, lineas, salto, letra, caja };
}
