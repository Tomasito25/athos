import { NavLink } from 'react-router-dom';
import { PRIMARY_NAV } from './navigation';

/** Barra inferior: la navegación principal en móvil, pensada para el pulgar. */
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {PRIMARY_NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className="bottom-nav__item">
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
