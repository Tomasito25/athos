/**
 * Mapa esquemático del Monte Athos.
 *
 * No es un mapa topográfico: sitúa cada monasterio en su costa y a lo largo de
 * la península para orientarse, y así se dice al pie. Un mapa inventado con
 * apariencia de precisión sería peor que ninguno.
 */
import { Link } from 'react-router-dom';
import type { Monastery } from '@/types';

const WIDTH = 320;
const HEIGHT = 620;

export function AthosMap({ monasteries, activeId }: { monasteries: Monastery[]; activeId?: string }) {
  const position = (m: Monastery) => {
    const y = 60 + m.location.along * (HEIGHT - 140);
    // La península se estrecha hacia el sur, donde se alza el monte.
    const halfWidth = 92 * (1 - m.location.along * 0.55);
    const x =
      m.location.side === 'este'
        ? WIDTH / 2 + halfWidth
        : m.location.side === 'oeste'
          ? WIDTH / 2 - halfWidth
          : WIDTH / 2;
    return { x, y };
  };

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        style={{ maxWidth: WIDTH, margin: '0 auto', display: 'block' }}
        role="img"
        aria-label="Mapa esquemático de la península del Monte Athos con sus veinte monasterios"
      >
        <path
          d={`M ${WIDTH / 2 - 100} 40
              C ${WIDTH / 2 - 110} 200, ${WIDTH / 2 - 80} 380, ${WIDTH / 2 - 24} ${HEIGHT - 70}
              L ${WIDTH / 2} ${HEIGHT - 40}
              L ${WIDTH / 2 + 24} ${HEIGHT - 70}
              C ${WIDTH / 2 + 80} 380, ${WIDTH / 2 + 110} 200, ${WIDTH / 2 + 100} 40 Z`}
          fill="var(--surface-sunken)"
          stroke="var(--line-strong)"
          strokeWidth={1.5}
        />

        <text x={WIDTH / 2} y={28} textAnchor="middle" fontSize="11" fill="var(--ink-faint)" letterSpacing="2">
          ISTMO
        </text>
        <text x={WIDTH / 2} y={HEIGHT - 14} textAnchor="middle" fontSize="11" fill="var(--ink-faint)" letterSpacing="2">
          MONTE ATHOS · 2033 m
        </text>

        {monasteries.map((monastery) => {
          const { x, y } = position(monastery);
          const active = monastery.id === activeId;
          const labelLeft = monastery.location.side === 'oeste';
          return (
            <g key={monastery.id}>
              <circle
                cx={x}
                cy={y}
                r={active ? 6 : 4}
                fill={active ? 'var(--gold)' : 'var(--red)'}
                stroke="var(--surface)"
                strokeWidth={1.5}
              />
              <text
                x={labelLeft ? x - 10 : x + 10}
                y={y + 3.5}
                textAnchor={labelLeft ? 'end' : 'start'}
                fontSize="10"
                fill={active ? 'var(--ink-strong)' : 'var(--ink-muted)'}
                fontFamily="var(--font-ui)"
              >
                {monastery.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="source-note" style={{ textAlign: 'center', marginTop: 'var(--sp-2)' }}>
        Esquema orientativo: sitúa cada monasterio en su costa y a lo largo de la península. No son
        coordenadas topográficas.
      </figcaption>
    </figure>
  );
}

export function MonasteryLink({ monastery }: { monastery: Monastery }) {
  return (
    <Link className="card" to={`/biblioteca/athos/monasterio/${monastery.id}`}>
      <span className="eyebrow">{monastery.rank}.º en la jerarquía</span>
      <span className="card__title">{monastery.name}</span>
      <span className="card__text">{monastery.greekName}</span>
      <span className="card__text">
        {monastery.tradition} · {monastery.founded}
      </span>
    </Link>
  );
}
