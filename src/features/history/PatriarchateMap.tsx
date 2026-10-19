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
import { MAP_EPOCHS, SEE_STATUS_LABELS, type SeeStatus } from '@/content/history-maps';
import { MAPAS_BASE } from '@/content/generated/mapas';
import { RealMap, type MapPoint } from '@/components/RealMap';
import { Segmented } from '@/components/ui';

/** Cada rango tiene su forma, además de su color: no se depende sólo del color. */
const ASPECTO: Record<SeeStatus, NonNullable<MapPoint['look']>> = {
  pentarquia: 'lleno',
  patriarcado: 'lleno',
  autocefala: 'hueco',
  separada: 'tachado',
  disputada: 'discontinuo',
};

/** La clave de la leyenda, con la misma forma que en el mapa. */
function Clave({ rango }: { rango: SeeStatus }) {
  const aspecto = ASPECTO[rango];
  const relleno = aspecto === 'lleno' ? 'var(--gold)' : 'var(--surface)';
  const trazo = aspecto === 'lleno' ? 'var(--gold)' : aspecto === 'tachado' ? 'var(--red)' : 'var(--ink-muted)';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill={relleno} stroke={trazo} strokeWidth="1.6" strokeDasharray={aspecto === 'discontinuo' ? '2 1.5' : undefined} />
      {aspecto === 'tachado' ? <line x1="3" y1="11" x2="11" y2="3" stroke={trazo} strokeWidth="1.6" /> : null}
    </svg>
  );
}

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
    look: ASPECTO[sede.status],
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
              <Clave rango={rango} />
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
