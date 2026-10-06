/**
 * Las piezas de las portadas.
 *
 * Cada sección principal —Orar, Leer, Calendario, Biblioteca— tenía su propia
 * manera de empezar y de enseñar a dónde se podía ir: unas con listas largas,
 * otras con tarjetas, otras con botones al pie de la página. Aquí están las
 * dos piezas que ahora comparten todas:
 *
 * - **La cabecera**, con el signo de la sección en un medallón, el título en
 *   oro y una línea que dice qué hay dentro. Es lo que hace que cada portada
 *   se reconozca de un vistazo.
 * - **Las teselas**, para los destinos: un icono, un nombre y una pista, en
 *   rejilla. Se abarcan de un golpe de vista y se tocan con el pulgar sin
 *   apuntar, que es lo que no tenía una lista de diez filas.
 */
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';

type Icono = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export function HubHero({
  icon: Icon,
  title,
  subtitle,
  eyebrow,
  children,
}: {
  icon: Icono;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <header className="hub-hero">
      <span className="hub-hero__medal" aria-hidden="true">
        <Icon size={26} />
      </span>
      <div className="hub-hero__text">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display hub-hero__title">{title}</h1>
        {subtitle ? <p className="hub-hero__sub">{subtitle}</p> : null}
      </div>
      {children ? <div className="hub-hero__extra">{children}</div> : null}
    </header>
  );
}

/** Rejilla de teselas: dos columnas en el móvil, más en cuanto hay sitio. */
export function TileGrid({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  // El envoltorio es el contenedor por el que se cuentan las columnas: una
  // rejilla en la columna estrecha de Inicio no debe tener las mismas que una
  // a todo lo ancho, aunque la pantalla sea la misma.
  return (
    <div className="tile-wrap">
      <div className={compact ? 'tile-grid tile-grid--compact' : 'tile-grid'}>{children}</div>
    </div>
  );
}

export function Tile({
  to,
  icon: Icon,
  title,
  hint,
  badge,
  current = false,
}: {
  to: string;
  icon: Icono;
  title: string;
  hint?: ReactNode;
  /** Una cifra o una palabra en la esquina: cuántas hay, «Ahora»… */
  badge?: ReactNode;
  /** La que corresponde a este momento: se marca en oro. */
  current?: boolean;
}) {
  return (
    <Link to={to} className={current ? 'tile tile--current' : 'tile'}>
      <span className="tile__icon" aria-hidden="true">
        <Icon size={20} />
      </span>
      {badge !== undefined && badge !== null ? <span className="tile__badge">{badge}</span> : null}
      <span className="tile__title">{title}</span>
      {hint ? <span className="tile__hint">{hint}</span> : null}
    </Link>
  );
}
