import { useRegisterSW } from 'virtual:pwa-register/react';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUi } from '@/stores/ui';
import { useSettings } from '@/stores/settings';
import { markNewsSeen, pendingNews, useUpdate } from '@/stores/update';
import { IconInstall } from '@/components/icons';
import es from '@/locales/es';

/** Cada cuánto se pregunta si hay versión nueva mientras la aplicación está a la vista. */
const CADA = 60 * 60 * 1000;
/** Al volver a la aplicación se pregunta otra vez si hace más de esto. */
const AL_VOLVER = 30 * 60 * 1000;

/**
 * Pantallas en las que se está rezando o leyendo un oficio: ahí el aviso no
 * sale. Se enseña en cuanto se sale de ellas.
 */
const REZANDO = [
  /^\/orar\/oficio\//,
  /^\/orar\/oraciones\/(?!$|todas$|categoria\/)/,
  /^\/orar\/(komboskini|oracion-de-jesus|metanoias|maitines)/,
  /^\/biblioteca\/(liturgia|akathistos|canones)\/[^/]+/,
];

/**
 * Actualización del Service Worker.
 *
 * La nueva versión nunca se activa sola: una recarga forzada en mitad de una
 * oración sería lo contrario de lo que ATHOS quiere ser. Se avisa y el usuario
 * decide. Los datos de IndexedDB no se tocan al actualizar.
 *
 * Antes sólo se miraba si había versión nueva al abrir la aplicación —y el
 * navegador, como mucho una vez al día—, y el aviso era un mensaje que se
 * podía perder entre otros. Ahora:
 *
 * - se pregunta cada hora mientras ATHOS está a la vista, al volver a ella
 *   y al recuperar la conexión;
 * - el aviso es una franja fija con dos botones, que no sale mientras se está
 *   rezando un oficio ni leyendo una oración, y que se puede dejar para luego;
 * - después de actualizar se ofrecen las novedades de la versión;
 * - en «Acerca de» se puede buscar a mano y ver cuándo se miró por última vez.
 */
export function UpdateBanner() {
  const toast = useUi((s) => s.toast);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const registro = useRef<ServiceWorkerRegistration | null>(null);
  const bienvenidaCerrada = useSettings((s) => s.welcomeDismissed);

  const status = useUpdate((s) => s.status);
  const postponed = useUpdate((s) => s.postponed);
  const setStatus = useUpdate((s) => s.setStatus);
  const markChecked = useUpdate((s) => s.markChecked);
  const postpone = useUpdate((s) => s.postpone);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      registro.current = registration ?? null;
    },
    /**
     * La versión nueva ha tomado el control.
     *
     * Si la ha aplicado esta ventana, se recarga ya: es lo que se pidió. Si
     * la aplicó otra, esta ventana se ha quedado con el código viejo y la
     * próxima pantalla que abra puede no existir; pero recargar en mitad de
     * una oración es justo lo que ATHOS promete no hacer. Se apunta, y se
     * recarga al salir de lo que se esté rezando.
     */
    onNeedReload() {
      if (useUpdate.getState().status === 'applying') window.location.reload();
      else useUpdate.setState({ outdated: true });
    },
    onRegisterError(error) {
      console.warn('No se ha podido registrar el Service Worker', error);
    },
  });

  /** Pregunta al servidor si hay una versión nueva del Service Worker. */
  const comprobar = useCallback(async () => {
    const reg = registro.current;
    if (!reg) {
      setStatus('unsupported');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('offline');
      return;
    }
    setStatus('checking');
    try {
      await reg.update();
      markChecked();
      if (reg.waiting) setStatus('available');
      else if (reg.installing) setStatus('downloading');
      else setStatus('current');
    } catch {
      setStatus(navigator.onLine === false ? 'offline' : 'error');
    }
  }, [markChecked, setStatus]);

  // La función del plugin se guarda en una referencia: si cambiara de un
  // render a otro, no debe volver a publicarse en el almacén cada vez.
  const actualizarSW = useRef(updateServiceWorker);
  useEffect(() => {
    actualizarSW.current = updateServiceWorker;
  }, [updateServiceWorker]);

  const aplicar = useCallback(async () => {
    setStatus('applying');
    await actualizarSW.current(true);
  }, [setStatus]);

  // Las funciones viven en el almacén para que «Acerca de» pueda usarlas.
  useEffect(() => {
    useUpdate.setState({ check: comprobar, apply: aplicar });
  }, [comprobar, aplicar]);

  // Cuando el plugin dice que hay una versión esperando, se apunta.
  useEffect(() => {
    if (needRefresh) setStatus('available');
  }, [needRefresh, setStatus]);

  // Comprobaciones: cada hora a la vista, al volver y al recuperar la red.
  useEffect(() => {
    const cada = window.setInterval(() => {
      if (document.visibilityState === 'visible') void comprobar();
    }, CADA);
    const alVolver = () => {
      if (document.visibilityState !== 'visible') return;
      const ultima = useUpdate.getState().lastCheck;
      if (!ultima || Date.now() - new Date(ultima).getTime() > AL_VOLVER) void comprobar();
    };
    const conRed = () => void comprobar();
    document.addEventListener('visibilitychange', alVolver);
    window.addEventListener('online', conRed);
    return () => {
      window.clearInterval(cada);
      document.removeEventListener('visibilitychange', alVolver);
      window.removeEventListener('online', conRed);
    };
  }, [comprobar]);

  useEffect(() => {
    if (offlineReady) {
      toast(es.app.offlineReady);
      setOfflineReady(false);
    }
  }, [offlineReady, setOfflineReady, toast]);

  // Después de actualizar: qué hay de nuevo.
  useEffect(() => {
    if (!pendingNews(__APP_VERSION__, bienvenidaCerrada)) return;
    markNewsSeen(__APP_VERSION__);
    toast(es.app.updatedTo.replace('{{version}}', __APP_VERSION__), {
      duration: 12000,
      action: { label: es.app.seeNews, run: () => navigate('/configuracion/novedades') },
    });
    // Sólo al arrancar: la versión no cambia sin recargar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rezando = REZANDO.some((r) => r.test(pathname));
  const outdated = useUpdate((s) => s.outdated);

  // Se recarga en cuanto no se esté rezando: al llegar el aviso, o al salir
  // del oficio. La dirección ya es la de la pantalla nueva, así que se abre
  // ésa, con la versión nueva.
  useEffect(() => {
    if (outdated && !rezando) window.location.reload();
  }, [outdated, rezando]);
  const visible = (status === 'available' || status === 'applying') && !postponed && !rezando;
  if (!visible) return null;

  return (
    <div className="update-banner" role="status" aria-live="polite">
      <span className="update-banner__icon" aria-hidden="true">
        <IconInstall size={20} />
      </span>
      <div className="update-banner__text">
        <p className="update-banner__title">
          {status === 'applying' ? es.app.updating : es.app.updateAvailable}
        </p>
        {status === 'applying' ? null : <p className="update-banner__hint">{es.app.updateHint}</p>}
      </div>
      {status === 'applying' ? null : (
        <div className="update-banner__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={postpone}>
            {es.app.updateLater}
          </button>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => void aplicar()}>
            {es.app.updateNow}
          </button>
        </div>
      )}
    </div>
  );
}
