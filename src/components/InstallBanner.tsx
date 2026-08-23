import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconClose, IconInstall } from '@/components/icons';
import { isStandalone, listenForInstallPrompt, promptInstall } from '@/lib/pwa';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

/**
 * Aviso de instalación.
 *
 * Aparece una sola vez, discretamente, y sólo si el navegador ofrece de verdad
 * la instalación y la aplicación no está ya instalada. Si se descarta, no vuelve.
 */
export function InstallBanner() {
  const { installEvent, setInstallEvent, toast } = useUi();
  const dismissed = useSettings((s) => s.installPromptDismissed);
  const setSetting = useSettings((s) => s.set);
  const [visible, setVisible] = useState(false);

  useEffect(() => listenForInstallPrompt(setInstallEvent), [setInstallEvent]);

  useEffect(() => {
    if (!installEvent || dismissed || isStandalone()) return;
    // No se interrumpe nada más entrar: se espera a que el usuario se acomode.
    const timer = setTimeout(() => setVisible(true), 12_000);
    return () => clearTimeout(timer);
  }, [installEvent, dismissed]);

  if (!visible || !installEvent) return null;

  const dismiss = () => {
    setVisible(false);
    setSetting('installPromptDismissed', true);
  };

  return (
    <div className="toast-region">
      <div className="toast">
        <IconInstall size={20} style={{ color: 'var(--gold)', flex: 'none' }} />
        <span className="toast__text">
          {es.install.button}
          <Link to="/configuracion/instalar" style={{ display: 'block' }} className="muted text-sm">
            {es.install.why}
          </Link>
        </span>
        <button
          type="button"
          className="btn btn--sm btn--primary"
          onClick={async () => {
            const accepted = await promptInstall(installEvent);
            setVisible(false);
            setInstallEvent(null);
            if (accepted) toast(es.install.installed);
            else setSetting('installPromptDismissed', true);
          }}
        >
          {es.settings.install}
        </button>
        <button type="button" className="icon-btn" style={{ width: '2rem', height: '2rem' }} onClick={dismiss} aria-label={es.app.close}>
          <IconClose size={16} />
        </button>
      </div>
    </div>
  );
}
