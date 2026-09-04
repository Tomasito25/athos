import { isRouteErrorResponse, useLocation, useNavigate, useRouteError } from 'react-router-dom';
import { Button, ButtonLink, Empty } from '@/components/ui';
import { OrthodoxCross } from '@/components/icons';
import { hasAppHistory, parentPath } from '@/lib/up-navigation';
import es from '@/locales/es';

/** Pantalla de error: sin tecnicismos, con una salida clara. */
export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  // Aquí se llega muchas veces porque el trozo de código de una pantalla no
  // se pudo descargar: la aplicación se actualizó y el nombre del archivo ya
  // no existe. Recargar es lo que de verdad lo arregla, así que va primero.
  const reload = () => window.location.reload();
  const goBack = () => {
    if (hasAppHistory()) navigate(-1);
    else navigate(parentPath(location.pathname), { replace: true });
  };

  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Error desconocido';

  return (
    <div className="page page--reading" style={{ paddingTop: 'var(--sp-8)' }}>
      <div style={{ textAlign: 'center', color: 'var(--gold)', marginBottom: 'var(--sp-4)' }}>
        <OrthodoxCross size={32} style={{ margin: '0 auto', opacity: 0.6 }} />
      </div>
      <Empty
        title={es.app.error}
        text={message}
        action={
          <div className="btn-row">
            <Button onClick={goBack}>{es.app.back}</Button>
            <Button variant="primary" onClick={reload}>
              {es.app.retry}
            </Button>
            <ButtonLink to="/">{es.nav.home}</ButtonLink>
          </div>
        }
      />
    </div>
  );
}
