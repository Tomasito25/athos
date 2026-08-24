import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
  version: string;
};

/**
 * Ruta base de la que cuelga la aplicación. Por defecto la raíz del dominio;
 * con ATHOS_BASE=/athos/ se puede publicar en una subcarpeta, como hace
 * GitHub Pages en `usuario.github.io/athos/`.
 */
const base = process.env.ATHOS_BASE || '/';

export default defineConfig({
  base,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react';
            if (id.includes('dexie')) return 'vendor-db';
            if (id.includes('i18next')) return 'vendor-i18n';
            return 'vendor';
          }
          // El corpus textual se separa del código de la aplicación.
          if (id.includes('/src/content/')) return 'content';
          return undefined;
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      strategies: 'generateSW',
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        id: base,
        name: 'ATHOS — Oración · Tradición · Vida',
        short_name: 'ATHOS',
        description:
          'Horologion digital, libro de oración, biblioteca ortodoxa y calendario litúrgico con las lecturas de cada día. Funciona sin conexión.',
        lang: 'es',
        dir: 'ltr',
        start_url: `${base}?source=pwa`,
        scope: base,
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'any',
        theme_color: '#14100C',
        background_color: '#14100C',
        categories: ['books', 'lifestyle', 'education'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
        // Capturas reales de la aplicación, tomadas con scripts/screenshots.
        // Chrome las usa para la ficha de instalación enriquecida.
        screenshots: [
          { src: 'icons/screenshot-mobile.png', sizes: '540x1170', type: 'image/png', form_factor: 'narrow', label: 'El oficio que toca a esta hora, el santo del día y el ayuno' },
          { src: 'icons/screenshot-mobile-2.png', sizes: '540x1170', type: 'image/png', form_factor: 'narrow', label: 'El oficio de la mañana, con las fórmulas en griego' },
          { src: 'icons/screenshot-desktop.png', sizes: '1280x800', type: 'image/png', form_factor: 'wide', label: 'ATHOS en escritorio' },
          { src: 'icons/screenshot-desktop-2.png', sizes: '1280x800', type: 'image/png', form_factor: 'wide', label: 'El calendario litúrgico' },
        ],
        shortcuts: [
          { name: 'Oraciones', short_name: 'Orar', url: `${base}orar/oraciones?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
          { name: 'Regla de oración', short_name: 'Regla', url: `${base}orar/regla?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
          { name: 'Oración de Jesús', short_name: 'Jesús', url: `${base}orar/oracion-de-jesus?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
          { name: 'Calendario', short_name: 'Calendario', url: `${base}calendario?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        // Se precachea todo lo necesario para que ATHOS funcione sin conexión desde
        // el primer momento: código, tipografía latina y el texto bíblico completo.
        // Los subconjuntos griego y cirílico de las fuentes se cachean al usarse.
        globPatterns: [
          '**/*.{js,css,html,ico,svg,png}',
          'fonts/*-latin.woff2',
          'fonts/*-latin-ext.woff2',
          'content/**/*.json',
          // De los iconos se precachea la miniatura; la imagen grande se
          // guarda al abrirla, para no cargar la instalación con 2 MB.
          'content/icons/*-mini.webp',
        ],
        // Los iconos declarados en el manifest los añade el propio plugin;
        // excluirlos del glob evita entradas duplicadas en el precaché.
        globIgnores: [
          // El leccionario juliano sólo se descarga si se elige ese calendario.
          'content/lectionary/lectionary-juliano.json',
          'icons/icon-192.png',
          'icons/icon-512.png',
          'icons/maskable-192.png',
          'icons/maskable-512.png',
          'icons/icon.svg',
        ],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith(`${base}fonts/`),
            handler: 'CacheFirst',
            options: {
              cacheName: 'athos-fonts-v1',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith(`${base}content/`),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'athos-content-v1',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false, type: 'module' },
    }),
  ],
});
