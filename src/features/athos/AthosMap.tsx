/**
 * El mapa del Monte Athos, con la costa de verdad.
 *
 * La costa y las curvas de nivel salen del relieve de la NASA (SRTM3, de
 * dominio público) y cada monasterio está en sus coordenadas de Wikidata. El
 * mapa va girado para que la península quepa en vertical en un teléfono; la
 * rosa del dibujo dice dónde queda el norte.
 *
 * Antes era un esquema con forma de jarrón, y lo decía al pie. Ahora es un
 * mapa, y también lo dice: de dónde salen la costa, el relieve y las
 * posiciones.
 */
import { Link } from 'react-router-dom';
import type { Monastery } from '@/types';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { MapKey, RealMap } from '@/components/RealMap';
import { proyectar } from '@/lib/mapa';
import { athosMapPoints } from './athos-map-points';

const MAPA = MAPAS_BASE.athos;

/** Un trozo del mapa alrededor de un monasterio, del ancho entero. */
function recorteDe(m: Monastery) {
  const [, y] = proyectar(MAPA, m.coords.lon, m.coords.lat);
  const alto = 760;
  const y0 = Math.max(0, Math.min(MAPA.alto - alto, y - alto / 2));
  return { x: 0, y: y0, ancho: MAPA.ancho, alto };
}

export function AthosMap({
  monasteries,
  activeId,
  selected,
  onSelect,
}: {
  monasteries: Monastery[];
  /** En la ficha de un monasterio: el mapa se acerca a él y apaga los demás. */
  activeId?: string;
  selected?: string;
  onSelect?: (id: string) => void;
}) {
  const activo = monasteries.find((m) => m.id === activeId);
  return (
    <figure className="athos-map">
      <RealMap
        mapa={MAPA}
        points={athosMapPoints(monasteries, activeId)}
        recorte={activo ? recorteDe(activo) : undefined}
        selected={selected ?? activeId}
        onSelect={onSelect}
        title={activo ? `${activo.name} en la península del Athos` : 'La península del Monte Athos'}
        description={
          activo
            ? `Mapa de la parte de la península donde está ${activo.name}, con sus sketes.`
            : 'Mapa de la península del Monte Athos con los veinte monasterios, los doce sketes, Karyés, Dafni y la cumbre.'
        }
      />
      <figcaption className="athos-map__pie">
        <span className="athos-map__clave">
          <span>
            <MapKey look="lleno" /> Monasterio
          </span>
          <span>
            <MapKey look="pequeño" /> Skete
          </span>
          <span>
            <MapKey look="hueco" /> Lugar
          </span>
        </span>
        <span className="source-note">
          Costa y relieve de SRTM (NASA, dominio público), con curvas a 400, 900 y 1.500 metros; posiciones de
          Wikidata. El mapa está girado: el norte, según la rosa.
        </span>
      </figcaption>
    </figure>
  );
}

export function MonasteryLink({ monastery }: { monastery: Monastery }) {
  return (
    <Link className="monastery-row" to={`/biblioteca/athos/monasterio/${monastery.id}`}>
      <span className="monastery-row__rank" aria-hidden="true">
        {monastery.rank}
      </span>
      <span className="monastery-row__body">
        <span className="monastery-row__name">{monastery.name}</span>
        <span className="monastery-row__greek" lang="el">
          {monastery.greekName}
        </span>
      </span>
      <span className="monastery-row__meta">
        <span>{monastery.tradition.replace(/ \(.*\)$/, '')}</span>
        <span>{monastery.founded}</span>
      </span>
      <span className="sr-only">, {monastery.rank}.º en la jerarquía</span>
    </Link>
  );
}
