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
import type { CSSProperties, ReactNode } from 'react';
import type { MapaBase } from '@/content/generated/mapas';
import { LETRA, RADIO, proyectar, rotulo, vista, type Aspecto, type Encuadre, type Lado } from '@/lib/mapa';

export interface MapPoint {
  id: string;
  lon: number;
  lat: number;
  label: string;
  /** A qué lado va el rótulo. */
  side?: Lado;
  /** Desplazamiento vertical extra del rótulo, en unidades del dibujo. */
  dy?: number;
  /** Cómo se pinta el punto. */
  look?: Aspecto;
  /** Fuera del recuadro: se pinta en esas unidades del dibujo, con una flecha hacia donde está. */
  fuera?: { x: number; y: number };
  /** Sin rótulo en el dibujo: el nombre queda para el lector de pantalla y para la ficha. */
  quiet?: boolean;
}

/** El nombre de un mar, un lago o un río, en cursiva y sin punto. */
export interface MapWater {
  id: string;
  lon: number;
  lat: number;
  label: string;
}

export interface MapRoute {
  id: string;
  points: Array<[number, number]>;
  /** Discontinua, para los tramos que se recorren de vuelta. */
  dashed?: boolean;
}

const ESTILO = {
  lleno: { fill: 'var(--gold)', stroke: 'var(--gold)' },
  hueco: { fill: 'var(--surface)', stroke: 'var(--ink-muted)' },
  discontinuo: { fill: 'var(--surface)', stroke: 'var(--ink-muted)', dash: '4 3' },
  tachado: { fill: 'var(--surface)', stroke: 'var(--red)' },
  pequeño: { fill: 'var(--ink-muted)', stroke: 'var(--ink-muted)' },
} as const;

/** La muestra de la leyenda: el mismo punto que en el mapa, en pequeño. */
export function MapKey({ look }: { look: Aspecto }) {
  const estilo = ESTILO[look];
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r={look === 'pequeño' ? 3.5 : 5}
        fill={estilo.fill}
        stroke={estilo.stroke}
        strokeWidth="1.6"
        strokeDasharray={'dash' in estilo ? '2 1.5' : undefined}
      />
      {look === 'tachado' ? <line x1="3" y1="11" x2="11" y2="3" stroke={estilo.stroke} strokeWidth="1.6" /> : null}
    </svg>
  );
}

export function RealMap({
  mapa,
  points,
  routes = [],
  waters = [],
  encuadre,
  recorte,
  title,
  description,
  onSelect,
  selected,
  children,
}: {
  mapa: MapaBase;
  points: MapPoint[];
  routes?: MapRoute[];
  waters?: MapWater[];
  /** Oeste, sur, este, norte: la parte del mapa que se enseña. Sin él, entero. */
  encuadre?: Encuadre;
  /**
   * La parte que se enseña, en unidades del dibujo, para los mapas girados,
   * donde un recuadro en grados no es un rectángulo.
   */
  recorte?: { x: number; y: number; ancho: number; alto: number };
  title: string;
  description: string;
  onSelect?: (id: string) => void;
  selected?: string;
  children?: ReactNode;
}) {
  const id = `mapa-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const v = recorte ? { ...recorte, f: recorte.ancho / mapa.ancho } : vista(mapa, encuadre);
  const letra = LETRA * v.f;
  return (
    <svg
      viewBox={`${v.x} ${v.y} ${v.ancho} ${v.alto}`}
      className="mapa-real"
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      style={{ '--f': v.f } as CSSProperties}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{description}</desc>

      <rect x={v.x} y={v.y} width={v.ancho} height={v.alto} className="mapa-real__mar" />
      <path d={mapa.tierra} className="mapa-real__tierra" fillRule="evenodd" />
      {/* Las curvas de nivel, una sobre otra: cuanto más alto, más tinta. */}
      {mapa.relieve?.map((curva, i) => (
        <path key={mapa.niveles?.[i] ?? i} d={curva} className="mapa-real__relieve" fillRule="evenodd" />
      ))}
      {/* El río antes que los lagos: el Jordán no se dibuja cruzando el mar de Galilea. */}
      {mapa.rios ? <path d={mapa.rios} className="mapa-real__rio" /> : null}
      {mapa.lagos ? <path d={mapa.lagos} className="mapa-real__mar mapa-real__lago" /> : null}

      {routes.map((ruta) => (
        <polyline
          key={ruta.id}
          className="mapa-real__ruta"
          strokeDasharray={ruta.dashed ? `${10 * v.f} ${8 * v.f}` : undefined}
          points={ruta.points.map(([lon, lat]) => proyectar(mapa, lon, lat).join(',')).join(' ')}
        />
      ))}

      {waters.map((agua) => {
        const [x, y] = proyectar(mapa, agua.lon, agua.lat);
        return (
          <text key={agua.id} x={x} y={y} textAnchor="middle" className="mapa-real__agua">
            {agua.label.split('\n').map((linea, i) => (
              <tspan key={linea} x={x} dy={i === 0 ? 0 : letra}>
                {linea}
              </tspan>
            ))}
          </text>
        );
      })}

      {children}

      {mapa.giro ? <RosaDelNorte giro={mapa.giro} x={v.x + 70 * v.f} y={v.y + 80 * v.f} f={v.f} /> : null}

      {points.map((p) => {
        const [x, y] = p.fuera ? [p.fuera.x, p.fuera.y] : proyectar(mapa, p.lon, p.lat);
        const aspecto = p.look ?? 'lleno';
        const estilo = ESTILO[aspecto];
        const r = RADIO[aspecto] * v.f;
        const t = rotulo(x, y, p.label, r, v.f, p.side, p.dy);
        const elegido = selected === p.id;
        const contenido = (
          <g className={elegido ? 'mapa-real__punto mapa-real__punto--elegido' : 'mapa-real__punto'}>
            <circle
              cx={x}
              cy={y}
              r={elegido ? r + 4 * v.f : r}
              fill={estilo.fill}
              stroke={estilo.stroke}
              strokeWidth={3 * v.f}
              strokeDasharray={'dash' in estilo ? estilo.dash : undefined}
            />
            {p.look === 'tachado' ? (
              <line x1={x - r} y1={y + r} x2={x + r} y2={y - r} stroke={estilo.stroke} strokeWidth={3 * v.f} />
            ) : null}
            {p.quiet && !elegido ? null : (
              <text x={t.x} y={t.y} textAnchor={t.anchor} className="mapa-real__rotulo">
                {t.lineas.map((linea, i) => (
                  <tspan key={linea} x={t.x} dy={i === 0 ? 0 : t.salto}>
                    {linea}
                  </tspan>
                ))}
              </text>
            )}
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

/**
 * El norte de un mapa girado: una aguja con su «N», girada lo mismo que el
 * dibujo. Sin ella, quien conoce la costa no entiende por qué está de lado.
 */
function RosaDelNorte({ giro, x, y, f }: { giro: number; x: number; y: number; f: number }) {
  const r = 34 * f;
  // La letra, en la punta de la aguja pero derecha, para que se lea.
  const g = (giro * Math.PI) / 180;
  const d = r + 22 * f;
  return (
    <g className="mapa-real__norte" transform={`translate(${x} ${y})`} aria-hidden="true">
      <g transform={`rotate(${giro})`}>
        <circle r={r} className="mapa-real__norte-disco" />
        <path d={`M0 ${-r * 0.8} L${r * 0.26} 0 L0 ${r * 0.16} L${-r * 0.26} 0 Z`} className="mapa-real__norte-aguja" />
        <path d={`M0 ${r * 0.8} L${r * 0.2} 0 L${-r * 0.2} 0 Z`} className="mapa-real__norte-cola" />
      </g>
      <text x={d * Math.sin(g)} y={-d * Math.cos(g) + 9 * f} textAnchor="middle" className="mapa-real__norte-letra">
        N
      </text>
    </g>
  );
}
