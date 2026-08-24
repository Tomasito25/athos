import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconMore, IconSearch, OrthodoxCross } from '@/components/icons';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

/**
 * Barra superior. En el modo oración se reduce a un único botón de salida,
 * para que nada compita con el texto.
 */
/** Nombre de la sección a la que pertenece una ruta. */
function sectionTitle(pathname: string): string {
  const [, primero] = pathname.split('/');
  switch (primero) {
    case 'orar':
      return es.nav.pray;
    case 'leer':
      return es.nav.read;
    case 'calendario':
      return es.nav.calendar;
    case 'biblioteca':
      return es.nav.library;
    case 'favoritos':
      return es.favorites.title;
    case 'buscar':
      return es.search.title;
    case 'configuracion':
      return es.nav.settings;
    case 'mas':
      return es.nav.more;
    default:
      return 'ATHOS';
  }
}

export function TopBar({ title }: { title?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { prayerMode, setPrayerMode, setSearchOpen } = useUi();

  const isRoot = ['/', '/orar', '/leer', '/calendario', '/biblioteca'].includes(location.pathname);

  if (prayerMode) {
    return (
      <header className="app-topbar">
        <span className="spacer" />
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setPrayerMode(false)}>
          {es.prayerMode.exit}
        </button>
      </header>
    );
  }

  return (
    <header className="app-topbar">
      {isRoot ? (
        <span className="icon-btn" aria-hidden="true" style={{ color: 'var(--gold)' }}>
          <OrthodoxCross size={22} />
        </span>
      ) : (
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label={es.app.back}>
          <IconChevronLeft size={22} />
        </button>
      )}

      {/* La barra sitúa; el encabezado de cada página da el título completo. */}
      <p className={`app-topbar__title${isRoot ? ' app-topbar__title--brand' : ''}`}>
        {isRoot ? 'ATHOS' : (title ?? sectionTitle(location.pathname))}
      </p>

      <button
        type="button"
        className="icon-btn"
        onClick={() => setSearchOpen(true)}
        aria-label={es.search.title}
        title={`${es.search.title} — ${es.search.shortcut}`}
      >
        <IconSearch size={21} />
      </button>
      <button
        type="button"
        className="icon-btn"
        onClick={() => navigate('/mas')}
        aria-label={es.nav.more}
      >
        <IconMore size={21} />
      </button>
    </header>
  );
}
