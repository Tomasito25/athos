/**
 * Instalación y ciclo de vida de la PWA.
 *
 * La detección se hace por capacidades, no por navegador, y todo lo que no
 * exista se degrada en silencio: ATHOS debe seguir funcionando en un navegador
 * que no admita nada de esto.
 */
import type { BeforeInstallPromptEvent } from '@/stores/ui';

export type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'unknown';
export type Browser = 'chromium' | 'safari' | 'firefox' | 'unknown';

export function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua))) {
    return 'ios';
  }
  if (/Windows/i.test(ua)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'macos';
  if (/Linux|X11/i.test(ua)) return 'linux';
  return 'unknown';
}

export function detectBrowser(): Browser {
  const ua = navigator.userAgent;
  if (/Firefox|FxiOS/i.test(ua)) return 'firefox';
  if (/Edg\//i.test(ua) || /Chrome|Chromium|CriOS/i.test(ua)) return 'chromium';
  if (/Safari/i.test(ua)) return 'safari';
  return 'unknown';
}

/** ¿Se está ejecutando ya como aplicación instalada? */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const iosStandalone = (navigator as { standalone?: boolean }).standalone === true;
  return (
    iosStandalone ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches
  );
}

export function supportsInstallPrompt(): boolean {
  return 'BeforeInstallPromptEvent' in window || 'onbeforeinstallprompt' in window;
}

/** Escucha el evento de instalación de los navegadores basados en Chromium. */
export function listenForInstallPrompt(
  onEvent: (event: BeforeInstallPromptEvent | null) => void,
): () => void {
  const handler = (event: Event) => {
    event.preventDefault();
    onEvent(event as BeforeInstallPromptEvent);
  };
  const installed = () => onEvent(null);

  window.addEventListener('beforeinstallprompt', handler);
  window.addEventListener('appinstalled', installed);
  return () => {
    window.removeEventListener('beforeinstallprompt', handler);
    window.removeEventListener('appinstalled', installed);
  };
}

export async function promptInstall(event: BeforeInstallPromptEvent): Promise<boolean> {
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome === 'accepted';
}

/** Instrucciones manuales para cada combinación de sistema y navegador. */
export function installGuideKey(platform: Platform, browser: Browser): string {
  if (platform === 'ios') return 'ios';
  if (browser === 'firefox') return 'firefox';
  if (platform === 'android') return 'android';
  return 'desktop';
}
