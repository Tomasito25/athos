/**
 * De la longitud y la latitud al dibujo.
 *
 * La misma proyección con que `scripts/build-mapas.mjs` generó la costa: si
 * fueran distintas, cada ciudad caería en el mar.
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
