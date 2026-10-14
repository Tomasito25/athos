/**
 * Versión instalada, cuándo se miró por última vez si hay otra y el botón de
 * mirarlo ahora. Va en «Acerca de» y en «Novedades».
 */
import { Button, Panel } from '@/components/ui';
import { useUpdate, type UpdateStatus } from '@/stores/update';
import es from '@/locales/es';

const TEXTO: Record<UpdateStatus, string> = {
  idle: es.settings.updateIdle,
  checking: es.settings.updateChecking,
  downloading: es.settings.updateDownloading,
  available: es.settings.updateReady,
  current: es.settings.updateCurrent,
  offline: es.settings.updateOffline,
  unsupported: es.settings.updateUnsupported,
  error: es.settings.updateError,
  applying: es.app.updating,
};

/** «hace 5 minutos», «hace 2 horas», «el 3 de octubre». */
function haceCuanto(iso: string): string {
  const minutos = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutos < 1) return es.settings.justNow;
  if (minutos < 60) return es.settings.minutesAgo.replace('{{n}}', String(minutos));
  const horas = Math.round(minutos / 60);
  if (horas < 24) return es.settings.hoursAgo.replace('{{n}}', String(horas));
  return new Date(iso).toLocaleDateString('es', { day: 'numeric', month: 'long' });
}

export function UpdateStatusPanel() {
  const { status, lastCheck, check, apply } = useUpdate();
  const ocupado = status === 'checking' || status === 'applying';

  return (
    <Panel>
      <p className="panel__title">
        {es.settings.version.replace('{{version}}', __APP_VERSION__)}
        <span className="muted text-sm"> · {__BUILD_DATE__}</span>
      </p>
      <p className="update-status" data-status={status} style={{ marginTop: 'var(--sp-2)' }}>
        <span className="update-status__dot" aria-hidden="true" />
        <span>{TEXTO[status]}</span>
      </p>
      {lastCheck ? (
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-1)' }}>
          {es.settings.lastCheck.replace('{{when}}', haceCuanto(lastCheck))}
        </p>
      ) : null}
      <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
        {status === 'available' ? (
          <Button variant="primary" onClick={() => void apply()}>
            {es.app.updateNow}
          </Button>
        ) : (
          <Button onClick={() => void check()} disabled={ocupado}>
            {status === 'checking' ? es.settings.updateChecking : es.settings.checkUpdates}
          </Button>
        )}
      </div>
    </Panel>
  );
}
