/**
 * La bienvenida.
 *
 * Quien abre ATHOS por primera vez ve cinco palabras en la barra de abajo y
 * tiene que adivinar qué hay detrás de cada una. Esta tarjeta lo dice en
 * cuatro renglones, con un enlace a cada sitio, y desaparece en cuanto se
 * cierra: no vuelve a salir.
 *
 * Antes, tres preguntas. La del calendario lo cambia todo —en qué día cae
 * cada fiesta, qué lecturas tocan— y estaba escondida en Configuración: quien
 * sigue el juliano veía durante semanas las fiestas trece días antes sin
 * saber por qué.
 */
import { Link } from 'react-router-dom';
import { Segmented } from '@/components/ui';
import { OFFICE_LENGTHS } from '@/content/office-lengths';
import { useSettings, type GreekMode } from '@/stores/settings';
import type { CalendarStyle, OfficeLength } from '@/types';
import { IconBook, IconCalendar, IconClose, IconLibrary, IconPray } from '@/components/icons';
import es from '@/locales/es';

const SECCIONES = [
  { to: '/orar', icon: IconPray, title: es.nav.pray, text: es.welcome.pray },
  { to: '/leer', icon: IconBook, title: es.nav.read, text: es.welcome.read },
  { to: '/calendario', icon: IconCalendar, title: es.nav.calendar, text: es.welcome.calendar },
  { to: '/biblioteca', icon: IconLibrary, title: es.nav.library, text: es.welcome.library },
];

type Tradicion = 'griega' | 'eslava';

/** Lo que cambia la tradición, por ahora: si las fórmulas salen también en griego. */
const GRIEGO_DE: Record<Tradicion, GreekMode> = { griega: 'ambos', eslava: 'oculto' };

export function WelcomeCard() {
  const cerrada = useSettings((s) => s.welcomeDismissed);
  const set = useSettings((s) => s.set);
  const calendario = useSettings((s) => s.calendarStyle);
  const griego = useSettings((s) => s.greekMode);
  const medidas = useSettings((s) => s.officeLength);
  if (cerrada) return null;

  const tradicion: Tradicion = griego === 'oculto' ? 'eslava' : 'griega';
  const medida: OfficeLength =
    medidas?.manana === medidas?.mediodia && medidas?.mediodia === medidas?.noche
      ? (medidas?.manana ?? 'habitual')
      : 'habitual';

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
      <div className="welcome__questions">
        <p className="welcome__question">{es.welcome.calendarQ}</p>
        <Segmented<CalendarStyle>
          value={calendario}
          label={es.welcome.calendarQ}
          options={[
            { value: 'nuevo', label: es.welcome.calendarNew },
            { value: 'juliano', label: es.welcome.calendarOld },
          ]}
          onChange={(v) => set('calendarStyle', v)}
        />
        <p className="welcome__hint">{es.welcome.calendarHint}</p>

        <p className="welcome__question">{es.welcome.traditionQ}</p>
        <Segmented<Tradicion>
          value={tradicion}
          label={es.welcome.traditionQ}
          options={[
            { value: 'griega', label: es.welcome.traditionGreek },
            { value: 'eslava', label: es.welcome.traditionSlavic },
          ]}
          onChange={(v) => set('greekMode', GRIEGO_DE[v])}
        />
        <p className="welcome__hint">{es.welcome.traditionHint}</p>

        <p className="welcome__question">{es.welcome.measureQ}</p>
        <Segmented<OfficeLength>
          value={medida}
          label={es.welcome.measureQ}
          options={OFFICE_LENGTHS.map((l) => ({ value: l.id, label: l.label }))}
          onChange={(v) => set('officeLength', { manana: v, mediodia: v, noche: v })}
        />
        <p className="welcome__hint">{es.welcome.measureHint}</p>
      </div>

      <h3 className="welcome__subtitle">{es.welcome.whereTitle}</h3>
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
