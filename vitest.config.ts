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

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
  version: string;
};

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
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
    css: false,
  },
});
