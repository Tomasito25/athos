/**
 * Los puntos del mapa de la península, aparte del componente para que las
 * pruebas los comprueben con la misma lista que se dibuja.
 */
import type { Monastery } from '@/types';
import { ATHOS_MAP_LABELS, ATHOS_PLACES, ATHOS_SKETES } from '@/content/athos-lugares';
import type { MapPoint } from '@/components/RealMap';

/** Los puntos del mapa: los veinte, los sketes y los lugares para orientarse. */
export function athosMapPoints(monasteries: Monastery[], activeId?: string): MapPoint[] {
  const enfocado = activeId !== undefined;
  const sketesDe = new Set(
    ATHOS_SKETES.filter((s) => s.monastery === activeId).map((s) => s.id),
  );
  const puntos: MapPoint[] = [];

  for (const s of ATHOS_SKETES) {
    puntos.push({
      id: s.id,
      lon: s.coords.lon,
      lat: s.coords.lat,
      label: `Skete de ${s.name}`,
      look: 'pequeño',
      side: 'derecha',
      quiet: !sketesDe.has(s.id),
    });
  }
  for (const l of ATHOS_PLACES) {
    puntos.push({
      id: l.id,
      lon: l.coords.lon,
      lat: l.coords.lat,
      label: l.name,
      look: l.outside ? 'discontinuo' : 'hueco',
      ...ATHOS_MAP_LABELS[l.id],
      quiet: enfocado && l.id !== 'karyes',
    });
  }
  for (const m of monasteries) {
    puntos.push({
      id: m.id,
      lon: m.coords.lon,
      lat: m.coords.lat,
      label: m.name,
      look: enfocado && m.id !== activeId ? 'pequeño' : 'lleno',
      ...ATHOS_MAP_LABELS[m.id],
      quiet: enfocado && m.id !== activeId,
    });
  }
  return puntos;
}
