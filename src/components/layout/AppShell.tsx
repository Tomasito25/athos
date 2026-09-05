import { Suspense, useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PageSkeleton } from '@/components/ui';
import { RouteAnnouncer } from '@/components/RouteAnnouncer';
import { SkipLink } from '@/components/SkipLink';
import { Toasts } from '@/components/Toasts';
import { SearchDialog } from '@/components/SearchDialog';
import { InstallBanner } from '@/components/InstallBanner';
import { UpdateBanner } from '@/components/UpdateBanner';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useUi } from '@/stores/ui';
import { isFullscreen } from '@/lib/fullscreen';

/**
 * Armazón de la aplicación.
 * Móvil: barra inferior. Escritorio: barra lateral. Modo oración: nada.
 */
export function AppShell() {
  const location = useLocation();
  const prayerMode = useUi((s) => s.prayerMode);
  useKeyboardShortcuts();

  // Al cambiar de página se sale del modo oración: es un estado deliberado,
  // no algo que deba arrastrarse de una pantalla a otra.
  useEffect(() => {
    if (prayerMode) useUi.getState().setPrayerMode(false);
    // Se ignora `prayerMode` a propósito: sólo interesa el cambio de ruta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /*
   * Salir de pantalla completa es salir del modo oración.
   *
   * En Android se sale deslizando desde el borde, y en el escritorio con
   * `Escape`: son gestos del sistema que ATHOS no controla. Si no se
   * escucharan, el usuario vería volver las barras del navegador y seguiría
   * atrapado en un modo oración que ya no parece modo oración.
   */
  useEffect(() => {
    const alCambiar = () => {
      if (!isFullscreen() && useUi.getState().prayerMode) {
        useUi.getState().setPrayerMode(false);
      }
    };
    document.addEventListener('fullscreenchange', alCambiar);
    document.addEventListener('webkitfullscreenchange', alCambiar);
    return () => {
      document.removeEventListener('fullscreenchange', alCambiar);
      document.removeEventListener('webkitfullscreenchange', alCambiar);
    };
  }, []);

  return (
    <div className="app-shell">
      <SkipLink />
      <Sidebar />
      <TopBar />
      <main className="app-main" id="contenido" tabIndex={-1}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <BottomNav />

      <UpdateBanner />
      <InstallBanner />
      <SearchDialog />
      <RouteAnnouncer />
      <Toasts />
      <ScrollRestoration />
    </div>
  );
}
