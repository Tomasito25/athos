import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconClose } from '@/components/icons';
import { OrthodoxCross } from '@/components/icons';
import { isStandalone, listenForInstallPrompt, promptInstall } from '@/lib/pwa';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

/**
 * Ofrecimiento de instalación.
 *
 * Aparece nada más entrar, si el navegador ofrece de verdad la instalación y
 * ATHOS no está ya instalada. Al pulsar «Instalar» se abre **el diálogo del
 * navegador**, no una imitación: esto es sólo lo que lo desencadena.
 *
 * No se puede abrir ese diálogo solo al cargar la página: los navegadores
 * exigen un gesto del usuario y descartan la llamada si no lo hay. Por eso hay
 * un botón, y por eso está donde se ve.
 *
 * Si se descarta, no vuelve a aparecer.
 */
export function InstallBanner() {
  const { installEvent, setInstallEvent, toast } = useUi();
  const dismissed = useSettings((s) => s.installPromptDismissed);
  const setSetting = useSettings((s) => s.set);
  const [visible, setVisible] = useState(false);

  useEffect(() => listenForInstallPrompt(setInstallEvent), [setInstallEvent]);

  useEffect(() => {
    if (!installEvent || dismissed || isStandalone()) return;
    // Un instante para que la página termine de pintar; no doce segundos, que
    // era como no ofrecerlo nunca.
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [installEvent, dismissed]);

  /**
   * Mide la hoja y lo anota en una variable CSS.
   *
   * Los avisos viven pegados al mismo borde y en la primera visita coinciden
   * con esto. Apartarlos con un número fijo se rompe en cuanto el texto ocupa
   * una línea más, así que la hoja dice cuánto mide y ellos se colocan encima.
   */
  const medir = useCallback((nodo: HTMLDivElement | null) => {
    const raiz = document.documentElement;
    if (!nodo) {
      raiz.style.removeProperty('--install-sheet-h');
      return;
    }
    const anotar = () => raiz.style.setProperty('--install-sheet-h', `${nodo.offsetHeight}px`);
    anotar();
    // Vigilar el alto es una mejora, no un requisito: donde no exista
    // ResizeObserver la medida inicial basta y la aplicación no se cae.
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(anotar).observe(nodo);
  }, []);

  useEffect(() => {
    if (visible) return;
    document.documentElement.style.removeProperty('--install-sheet-h');
  }, [visible]);

  if (!visible || !installEvent) return null;

  const cerrar = () => {
    setVisible(false);
    setSetting('installPromptDismissed', true);
  };

  return (
    <div className="install-sheet" role="dialog" aria-labelledby="instalar-titulo" ref={medir}>
      <button
        type="button"
        className="install-sheet__close icon-btn"
        onClick={cerrar}
        aria-label={es.app.close}
      >
        <IconClose size={18} />
      </button>

      <div className="install-sheet__body">
        <span className="install-sheet__mark" aria-hidden="true">
          <OrthodoxCross size={34} />
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="install-sheet__title" id="instalar-titulo">
            {es.install.sheetTitle}
          </p>
          <p className="install-sheet__text">{es.install.sheetText}</p>
        </div>
      </div>

      <div className="install-sheet__actions">
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={async () => {
            // Se retira ANTES de llamar: el diálogo del navegador toma el
            // relevo y esta hoja no tiene por qué seguir asomando detrás.
            // Esperar a la respuesta para ocultarla la dejaba visible todo el
            // rato que el usuario tardase en decidir.
            setVisible(false);
            // Aquí es donde el navegador abre SU diálogo. La llamada tiene que
            // salir de este clic: sin gesto del usuario se descarta.
            const accepted = await promptInstall(installEvent);
            setInstallEvent(null);
            if (accepted) toast(es.install.installed);
            else setSetting('installPromptDismissed', true);
          }}
        >
          {es.settings.install}
        </button>
        <button type="button" className="btn btn--ghost btn--block" onClick={cerrar}>
          {es.install.notNow}
        </button>
      </div>

      <Link to="/configuracion/instalar" className="install-sheet__more" onClick={cerrar}>
        {es.install.otherWays}
      </Link>
    </div>
  );
}
