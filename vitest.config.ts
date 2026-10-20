/**
 * Configuración de las pruebas.
 *
 * Va aparte de `vite.config.ts` para que las pruebas no arrastren el plugin de
 * PWA ni la generación del Service Worker, que nada tienen que ver con ellas.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { recentChangelog } from './scripts/changelog.ts';
import { contentVersions } from './scripts/content-versions.ts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
  version: string;
};

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    // Las últimas versiones del registro de cambios, para «Novedades».
    __CHANGELOG__: JSON.stringify(recentChangelog(new URL('./CHANGELOG.md', import.meta.url))),
    // La huella de cada carpeta del corpus: una corrección cambia la dirección.
    __CONTENT_VERSIONS__: JSON.stringify(contentVersions(new URL('./public/content/', import.meta.url))),
    // Correo de contacto, sólo si se da al compilar. Véase src/lib/site.ts.
    __CONTACT_EMAIL__: JSON.stringify(process.env.ATHOS_CONTACTO ?? ''),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // El módulo virtual lo genera el plugin de PWA al compilar; en pruebas se
      // sustituye por un equivalente inerte.
      'virtual:pwa-register/react': fileURLToPath(
        new URL('./tests/mocks/pwa-register.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    // Muchas pruebas siembran el corpus entero y montan la aplicación: con
    // todos los archivos en paralelo, cinco segundos se quedaban cortos y
    // fallaban unas veces sí y otras no.
    testTimeout: 15000,
    css: false,
  },
});
