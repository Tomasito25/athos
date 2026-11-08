/**
 * La bienvenida.
 *
 * Tres preguntas, y desaparece en cuanto se cierra: no vuelve a salir. La del
 * calendario lo cambia todo —en qué día cae cada fiesta, qué lecturas tocan— y
 * estaba escondida en Configuración: quien sigue el juliano veía durante semanas
 * las fiestas trece días antes sin saber por qué.
 *
 * Llevaba además una explicación de cada pestaña y una nota bajo cada pregunta,
 * y ocupaba más que la pantalla entera del teléfono: lo primero que veía quien
 * llegaba era una tarjeta que no se acababa. Las pestañas ya dicen qué tienen.
 */
import { Link } from 'react-router-dom';
import { Segmented } from '@/components/ui';
import { OFFICE_LENGTHS } from '@/content/office-lengths';
import { useSettings, type GreekMode } from '@/stores/settings';
import type { CalendarStyle, OfficeLength } from '@/types';
import { IconClose } from '@/components/icons';
import es from '@/locales/es';

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

        <p className="welcome__question">{es.welcome.measureQ}</p>
        <Segmented<OfficeLength>
          value={medida}
          label={es.welcome.measureQ}
          options={OFFICE_LENGTHS.map((l) => ({ value: l.id, label: l.label }))}
          onChange={(v) => set('officeLength', { manana: v, mediodia: v, noche: v })}
        />
      </div>

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
