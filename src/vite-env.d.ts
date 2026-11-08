/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

declare const __APP_VERSION__: string;
declare const __BUILD_DATE__: string;
/** Las últimas versiones de CHANGELOG.md, leídas al compilar. */
/** La huella de cada carpeta de `public/content`, calculada al compilar. */
declare const __CONTENT_VERSIONS__: Record<string, string>;
/** Correo de contacto, si se dio al compilar con ATHOS_CONTACTO. */
declare const __CONTACT_EMAIL__: string;
declare const __CHANGELOG__: Array<{ version: string; sections: Array<{ title: string; items: string[] }> }>;

interface Navigator {
  /** API experimental de vibración, no disponible en todos los navegadores. */
  vibrate?: (pattern: number | number[]) => boolean;
}
