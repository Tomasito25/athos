import { Link, NavLink } from 'react-router-dom';
import { OrthodoxCross } from '@/components/icons';
import { FOOTER_NAV, SIDEBAR_GROUPS } from './navigation';
import es from '@/locales/es';

/** Barra lateral de escritorio: sobria, sin adornos de panel de control. */
export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <Link to="/" className="app-sidebar__brand">
        <OrthodoxCross size={26} />
        <span>
          <span className="app-sidebar__brand-name">ATHOS</span>
          <span className="app-sidebar__brand-sub">{es.app.tagline}</span>
        </span>
      </Link>

      <nav className="app-sidebar__nav" aria-label="Secciones de ATHOS">
        {SIDEBAR_GROUPS.map((group, index) => (
          <div key={group.label ?? index}>
            {group.label ? <p className="app-sidebar__group-label">{group.label}</p> : null}
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className="side-link">
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        {FOOTER_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="side-link">
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
