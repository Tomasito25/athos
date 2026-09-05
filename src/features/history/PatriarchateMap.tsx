/**
 * Los patriarcados, época por época.
 *
 * Un esquema, no un mapa a escala: las sedes ocupan su posición relativa
 * sobre una retícula. Se dice en la propia pantalla, porque dibujar de
 * memoria las costas del Mediterráneo sería inventarse una geografía.
 *
 * El SVG va en línea: se adapta al tema claro y oscuro con las mismas
 * variables que el resto, escala sin pixelarse y no añade ni una descarga a
 * una aplicación que tiene que funcionar sin conexión.
 *
 * Debajo del dibujo va la misma información en forma de lista. No es una
 * concesión: un esquema con quince puntos y sus rótulos no se lee con un
 * lector de pantalla, y en un móvil estrecho tampoco se lee con los ojos.
 */
import { useState } from 'react';
import { MAP_EPOCHS, SEE_STATUS_LABELS, type SeeStatus } from '@/content/history-maps';
import { Segmented } from '@/components/ui';

/** Cada rango tiene su color y su forma, para no depender sólo del color. */
const ESTILO: Record<SeeStatus, { fill: string; stroke: string; r: number }> = {
  pentarquia: { fill: 'var(--gold)', stroke: 'var(--gold)', r: 3.4 },
  patriarcado: { fill: 'var(--gold-soft)', stroke: 'var(--gold-soft)', r: 3 },
  autocefala: { fill: 'transparent', stroke: 'var(--ink-muted)', r: 2.6 },
  separada: { fill: 'transparent', stroke: 'var(--danger, #b4472f)', r: 3 },
};

export function PatriarchateMap() {
  const [epocaId, setEpocaId] = useState(MAP_EPOCHS[0]!.id);
  const epoca = MAP_EPOCHS.find((e) => e.id === epocaId) ?? MAP_EPOCHS[0]!;

  const rangos = [...new Set(epoca.sees.map((s) => s.status))];

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
        <svg
          viewBox="0 0 100 88"
          className="mapa__svg"
          role="img"
          aria-labelledby={`mapa-t-${epoca.id} mapa-d-${epoca.id}`}
        >
          <title id={`mapa-t-${epoca.id}`}>{`Sedes de la Iglesia · ${epoca.title}`}</title>
          <desc id={`mapa-d-${epoca.id}`}>
            {`Esquema con ${epoca.sees.length} sedes en su posición relativa. La lista completa está debajo.`}
          </desc>

          {/* Retícula: da sentido de espacio sin fingir que es un mapa. */}
          <g stroke="var(--line-soft)" strokeWidth="0.2">
            {[0, 20, 40, 60, 80].map((y) => (
              <line key={`h${y}`} x1="2" y1={y + 4} x2="98" y2={y + 4} />
            ))}
            {[0, 20, 40, 60, 80, 100].map((x) => (
              <line key={`v${x}`} x1={x} y1="4" x2={x} y2="84" />
            ))}
          </g>

          {/* Las cuatro orientaciones, que es lo único que el esquema promete. */}
          <g fill="var(--ink-faint)" fontSize="3" textAnchor="middle">
            <text x="50" y="3.2">norte</text>
            <text x="50" y="87">sur</text>
          </g>
          <g fill="var(--ink-faint)" fontSize="3">
            <text x="0.5" y="45">O</text>
            <text x="97" y="45">E</text>
          </g>

          {epoca.sees.map((sede) => {
            const estilo = ESTILO[sede.status];
            // El rótulo se va a la izquierda en el margen derecho, para que no
            // se salga del dibujo.
            const aLaIzquierda = sede.x > 68;
            return (
              <g key={sede.id}>
                <circle
                  cx={sede.x}
                  cy={sede.y}
                  r={estilo.r}
                  fill={estilo.fill}
                  stroke={estilo.stroke}
                  strokeWidth="0.7"
                />
                {/* Las sedes fuera de comunión llevan además una barra: se
                    distinguen aunque no se distingan los colores. */}
                {sede.status === 'separada' ? (
                  <line
                    x1={sede.x - 2.2}
                    y1={sede.y + 2.2}
                    x2={sede.x + 2.2}
                    y2={sede.y - 2.2}
                    stroke={estilo.stroke}
                    strokeWidth="0.7"
                  />
                ) : null}
                <text
                  x={aLaIzquierda ? sede.x - 4.6 : sede.x + 4.6}
                  y={sede.y + 1.3}
                  fontSize="3.4"
                  fill="var(--ink)"
                  textAnchor={aLaIzquierda ? 'end' : 'start'}
                >
                  {sede.name}
                </text>
              </g>
            );
          })}
        </svg>

        <figcaption className="mapa__pie">
          {rangos.map((rango) => (
            <span key={rango} className="mapa__clave">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <circle
                  cx="6"
                  cy="6"
                  r={ESTILO[rango].r}
                  fill={ESTILO[rango].fill}
                  stroke={ESTILO[rango].stroke}
                  strokeWidth="1.4"
                />
              </svg>
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
