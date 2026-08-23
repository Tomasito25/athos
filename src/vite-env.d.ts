/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

declare const __APP_VERSION__: string;
declare const __BUILD_DATE__: string;

interface Navigator {
  /** API experimental de vibración, no disponible en todos los navegadores. */
  vibrate?: (pattern: number | number[]) => boolean;
}
