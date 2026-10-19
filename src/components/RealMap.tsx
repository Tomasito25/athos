/**
 * Un mapa con la costa de verdad.
 *
 * La costa, los lagos y los ríos salen de Natural Earth, de dominio público,
 * generados una vez (`scripts/build-mapas.mjs`) y guardados en el código: el
 * mapa no descarga nada y se ve igual sin conexión. Encima, los sitios en su
 * longitud y su latitud, y si se quiere, rutas entre ellos.
 *
 * El SVG va en línea, con las variables de color del tema, y debajo de cada
 * mapa la pantalla pone la misma información en una lista: un dibujo con
 * veinte rótulos no se lee con un lector de pantalla.
 */
import type { ReactNode } from 'react';
import type { MapaBase } from '@/content/generated/mapas';
import { proyectar } from '@/lib/mapa';

export interface MapPoint {
  id: string;
  lon: number;
  lat: number;
  label: string;
  /** A qué lado va el rótulo. */
  side?: 'derecha' | 'izquierda' | 'arriba' | 'abajo';
  /** Desplazamiento vertical extra del rótulo, en unidades del dibujo. */
  dy?: number;
  /** Cómo se pinta el punto. */
  look?: 'lleno' | 'hueco' | 'discontinuo' | 'tachado' | 'pequeño';
  /** Fuera del recuadro: se pinta en `en` con una flecha hacia donde está. */
  fuera?: { x: number; y: number };
  /** Si se pincha, a dónde lleva. */
  href?: string;
}

export interface MapRoute {
  id: string;
  points: Array<[number, number]>;
  /** Discontinua, para los tramos que se recorren de vuelta. */
  dashed?: boolean;
}

const ESTILO = {
  lleno: { fill: 'var(--gold)', stroke: 'var(--gold)', r: 10 },
  hueco: { fill: 'var(--surface)', stroke: 'var(--ink-muted)', r: 9 },
  discontinuo: { fill: 'var(--surface)', stroke: 'var(--ink-muted)', r: 9, dash: '4 3' },
  tachado: { fill: 'var(--surface)', stroke: 'var(--red)', r: 9 },
  pequeño: { fill: 'var(--ink-muted)', stroke: 'var(--ink-muted)', r: 6 },
} as const;

const LETRA = 30;

export function RealMap({
  mapa,
  points,
  routes = [],
  title,
  description,
  onSelect,
  selected,
  children,
}: {
  mapa: MapaBase;
  points: MapPoint[];
  routes?: MapRoute[];
  title: string;
  description: string;
  onSelect?: (id: string) => void;
  selected?: string;
  children?: ReactNode;
}) {
  const id = `mapa-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <svg
      viewBox={`0 0 ${mapa.ancho} ${mapa.alto}`}
      className="mapa-real"
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{description}</desc>

      <rect width={mapa.ancho} height={mapa.alto} className="mapa-real__mar" />
      <path d={mapa.tierra} className="mapa-real__tierra" fillRule="evenodd" />
      {mapa.lagos ? <path d={mapa.lagos} className="mapa-real__mar mapa-real__lago" /> : null}
      {mapa.rios ? <path d={mapa.rios} className="mapa-real__rio" /> : null}

      {routes.map((ruta) => (
        <polyline
          key={ruta.id}
          className="mapa-real__ruta"
          strokeDasharray={ruta.dashed ? '10 8' : undefined}
          points={ruta.points.map(([lon, lat]) => proyectar(mapa, lon, lat).join(',')).join(' ')}
        />
      ))}

      {children}

      {points.map((p) => {
        const [x, y] = p.fuera ? [p.fuera.x, p.fuera.y] : proyectar(mapa, p.lon, p.lat);
        const estilo = ESTILO[p.look ?? 'lleno'];
        const lado = p.side ?? 'derecha';
        const separacion = estilo.r + 7;
        const tx = lado === 'derecha' ? x + separacion : lado === 'izquierda' ? x - separacion : x;
        const ty =
          (lado === 'arriba' ? y - separacion - 4 : lado === 'abajo' ? y + separacion + LETRA * 0.8 : y + LETRA * 0.35) +
          (p.dy ?? 0);
        const anchor = lado === 'derecha' ? 'start' : lado === 'izquierda' ? 'end' : 'middle';
        const lineas = p.label.split('\n');
        const elegido = selected === p.id;
        const contenido = (
          <g className={elegido ? 'mapa-real__punto mapa-real__punto--elegido' : 'mapa-real__punto'}>
            <circle
              cx={x}
              cy={y}
              r={elegido ? estilo.r + 4 : estilo.r}
              fill={estilo.fill}
              stroke={estilo.stroke}
              strokeWidth={3}
              strokeDasharray={'dash' in estilo ? estilo.dash : undefined}
            />
            {p.look === 'tachado' ? (
              <line x1={x - 9} y1={y + 9} x2={x + 9} y2={y - 9} stroke={estilo.stroke} strokeWidth={3} />
            ) : null}
            <text x={tx} y={ty} textAnchor={anchor} className="mapa-real__rotulo">
              {lineas.map((linea, i) => (
                <tspan key={linea} x={tx} dy={i === 0 ? 0 : LETRA * 1.1}>
                  {linea}
                </tspan>
              ))}
            </text>
          </g>
        );
        if (onSelect) {
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={p.label.replace('\n', ' ')}
              aria-pressed={elegido}
              onClick={() => onSelect(p.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(p.id);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {contenido}
            </g>
          );
        }
        return <g key={p.id}>{contenido}</g>;
      })}
    </svg>
  );
}
