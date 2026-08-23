/**
 * Sustituto de `virtual:pwa-register/react` para las pruebas.
 *
 * El módulo real lo genera el plugin de PWA durante la compilación, así que en
 * las pruebas se ofrece un equivalente inerte: nunca hay Service Worker que
 * registrar en jsdom.
 */
import { useState } from 'react';

export function useRegisterSW() {
  const offlineReady = useState(false);
  const needRefresh = useState(false);
  return {
    offlineReady,
    needRefresh,
    updateServiceWorker: async () => {},
  };
}
