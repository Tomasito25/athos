/**
 * La bienvenida.
 *
 * Quien abre ATHOS por primera vez ve cinco palabras en la barra de abajo y
 * tiene que adivinar qué hay detrás de cada una. Esta tarjeta lo dice en
 * cuatro renglones, con un enlace a cada sitio, y desaparece en cuanto se
 * cierra: no vuelve a salir.
 */
import { Link } from 'react-router-dom';
import { useSettings } from '@/stores/settings';
import { IconBook, IconCalendar, IconClose, IconLibrary, IconPray } from '@/components/icons';
import es from '@/locales/es';

const SECCIONES = [
  { to: '/orar', icon: IconPray, title: es.nav.pray, text: es.welcome.pray },
  { to: '/leer', icon: IconBook, title: es.nav.read, text: es.welcome.read },
  { to: '/calendario', icon: IconCalendar, title: es.nav.calendar, text: es.welcome.calendar },
  { to: '/biblioteca', icon: IconLibrary, title: es.nav.library, text: es.welcome.library },
];

export function WelcomeCard() {
  const cerrada = useSettings((s) => s.welcomeDismissed);
  const set = useSettings((s) => s.set);
  if (cerrada) return null;

  return (
    <section className="welcome" aria-labelledby="bienvenida">
      <button
        type="button"
        className="icon-btn welcome__close"
        aria-label={es.welcome.close}
        onClick={() => set('welcomeDismissed', true)}
      >
        <IconClose size={18} />
      </button>
      <p className="eyebrow">{es.welcome.eyebrow}</p>
      <h2 id="bienvenida" className="welcome__title display">
        {es.welcome.title}
      </h2>
      <ul className="welcome__list">
        {SECCIONES.map(({ to, icon: Icon, title, text }) => (
          <li key={to}>
            <Link to={to} className="welcome__item">
              <span className="welcome__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span>
                <b>{title}</b> · {text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => set('welcomeDismissed', true)}>
          {es.welcome.ok}
        </button>
        <Link to="/configuracion" className="btn btn--ghost btn--sm">
          {es.welcome.settings}
        </Link>
      </div>
    </section>
  );
}
