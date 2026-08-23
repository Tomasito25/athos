import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { Button, ButtonLink, Empty } from '@/components/ui';
import { OrthodoxCross } from '@/components/icons';
import es from '@/locales/es';

/** Pantalla de error: sin tecnicismos, con una salida clara. */
export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

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
            <Button onClick={() => navigate(-1)}>{es.app.back}</Button>
            <ButtonLink to="/" variant="primary">
              {es.nav.home}
            </ButtonLink>
          </div>
        }
      />
    </div>
  );
}
