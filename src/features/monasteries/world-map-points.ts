/**
 * Los puntos del mapa de los monasterios del mundo ortodoxo, aparte del
 * componente para que las pruebas comprueben la misma lista que se dibuja.
 */
import { ATHOS_ON_WORLD_MAP, WORLD_MONASTERIES } from '@/content/monasterios-mundo';
import type { MapPoint } from '@/components/RealMap';

/** El nombre corto con que se rotula cada uno en el mapa. */
const ROTULO: Record<string, string> = {
  sinai: 'Sinaí',
  'mar-saba': 'Mar Saba',
  patmos: 'Patmos',
  pecherska: 'Cuevas de Kiev',
  'san-sergio': 'San Sergio',
  saydnaya: 'Saydnaya',
};

export function worldMapPoints(): MapPoint[] {
  return [
    ...WORLD_MONASTERIES.map((m) => ({
      id: m.id,
      lon: m.coords.lon,
      lat: m.coords.lat,
      label: ROTULO[m.id] ?? m.name,
      look: m.women ? ('hueco' as const) : ('lleno' as const),
      side: m.label.side,
      dy: m.label.dy,
    })),
    {
      id: ATHOS_ON_WORLD_MAP.id,
      lon: ATHOS_ON_WORLD_MAP.coords.lon,
      lat: ATHOS_ON_WORLD_MAP.coords.lat,
      label: ATHOS_ON_WORLD_MAP.name,
      look: 'discontinuo' as const,
      side: ATHOS_ON_WORLD_MAP.label.side,
    },
  ];
}
