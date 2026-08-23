import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

/**
 * Actualización del Service Worker.
 *
 * La nueva versión nunca se activa sola: una recarga forzada en mitad de una
 * oración sería lo contrario de lo que ATHOS quiere ser. Se avisa y el usuario
 * decide. Los datos de IndexedDB no se tocan al actualizar.
 */
export function UpdateBanner() {
  const toast = useUi((s) => s.toast);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.warn('No se ha podido registrar el Service Worker', error);
    },
  });

  useEffect(() => {
    if (offlineReady) {
      toast(es.app.offlineReady);
      setOfflineReady(false);
    }
  }, [offlineReady, setOfflineReady, toast]);

  useEffect(() => {
    if (!needRefresh) return;
    toast(es.app.updateAvailable, {
      duration: 0,
      action: {
        label: es.app.updateNow,
        run: () => {
          setNeedRefresh(false);
          void updateServiceWorker(true);
        },
      },
    });
  }, [needRefresh, setNeedRefresh, toast, updateServiceWorker]);

  return null;
}
