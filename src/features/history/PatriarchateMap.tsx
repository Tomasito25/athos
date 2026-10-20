/**
 * Los patriarcados, época por época, sobre la costa de verdad.
 *
 * La costa sale de Natural Earth (dominio público), generada una vez y
 * guardada en el código: el mapa no descarga nada y se ve sin conexión. Cada
 * sede va en su longitud y su latitud. No se dibujan fronteras.
 *
 * Debajo del dibujo va la misma información en forma de lista. No es una
 * concesión: un mapa con dieciocho puntos y sus rótulos no se lee con un
 * lector de pantalla, y en un móvil estrecho tampoco se lee con los ojos.
 */
import { useState } from 'react';
import { MAP_EPOCHS, SEE_STATUS_LABELS, SEE_STATUS_LOOK } from '@/content/history-maps';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { MapKey, RealMap, type MapPoint } from '@/components/RealMap';
import { Segmented } from '@/components/ui';

export function PatriarchateMap() {
  const [epocaId, setEpocaId] = useState(MAP_EPOCHS[0]!.id);
  const epoca = MAP_EPOCHS.find((e) => e.id === epocaId) ?? MAP_EPOCHS[0]!;
  const rangos = [...new Set(epoca.sees.map((s) => s.status))];

  const puntos: MapPoint[] = epoca.sees.map((sede) => ({
    id: sede.id,
    lon: sede.lon,
    lat: sede.lat,
    label: sede.offMap ? `${sede.label ?? sede.name} ↖` : (sede.label ?? sede.name),
    side: sede.labelSide ?? 'derecha',
    dy: sede.labelDy,
    look: SEE_STATUS_LOOK[sede.status],
    fuera: sede.offMap,
  }));

  return (
    <div className="mapa">
      <Segmented
        value={epocaId}
        label="Época del mapa"
        options={MAP_EPOCHS.map((e) => ({ value: e.id, label: e.year }))}
        onChange={setEpocaId}
      />

      <h3 className="mapa__titulo">{epoca.title}</h3>
      <p className="muted text-sm">{epoca.summary}</p>

      <figure className="mapa__figura">
        <RealMap
          mapa={MAPAS_BASE.mediterraneo}
          points={puntos}
          title={`Sedes de la Iglesia · ${epoca.title}`}
          description={`Mapa del Mediterráneo oriental y de Europa del Este con ${epoca.sees.length} sedes en su sitio. La lista completa está debajo.`}
        />
        <figcaption className="mapa__pie">
          {rangos.map((rango) => (
            <span key={rango} className="mapa__clave">
              <MapKey look={SEE_STATUS_LOOK[rango]} />
              {SEE_STATUS_LABELS[rango]}
            </span>
          ))}
        </figcaption>
      </figure>

      {/* La misma información, legible y buscable. */}
      <dl className="mapa__lista">
        {epoca.sees.map((sede) => (
          <div key={sede.id} className="mapa__entrada">
            <dt>
              {sede.name}
              <span className="mapa__rango">{SEE_STATUS_LABELS[sede.status]}</span>
            </dt>
            <dd>{sede.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
