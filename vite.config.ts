import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as {
  version: string;
};

/**
 * Ruta base de la que cuelga la aplicación. Por defecto la raíz del dominio;
 * con ATHOS_BASE=/athos/ se puede publicar en una subcarpeta, como hace
 * GitHub Pages en `usuario.github.io/athos/`.
 */
const base = process.env.ATHOS_BASE || '/';

/**
 * Dirección pública completa, cuando se conoce.
 *
 * Las etiquetas Open Graph necesitan una dirección absoluta: una relativa como
 * `icons/og-image.png` no la resuelve ningún servicio que enseñe el enlace. Con
 * ATHOS_URL=https://usuario.github.io se reescriben a absolutas; sin ella se
 * quedan como están, que es lo correcto mientras no se sepa el dominio.
 */
const siteUrl = (process.env.ATHOS_URL || '').replace(/\/+$/, '');

/** Carpeta donde se está compilando, para el alias del manifest. */
let salidaDeLaCompilacion = 'dist';

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
    {
      /**
       * Copia del manifest en `manifest.json`.
       *
       * El nombre estándar es `.webmanifest` y es el que enlaza el documento,
       * pero muchos validadores, rastreadores y herramientas de PWA buscan
       * `/manifest.json` por convención y, al no encontrarlo, dan por hecho que
       * la aplicación no tiene manifest. Dejar las dos direcciones no cuesta
       * nada y evita ese diagnóstico equivocado.
       */
      name: 'athos-manifest-json',
      apply: 'build' as const,
      // La carpeta de salida se toma de la configuración ya resuelta: con
      // `--outDir` puede no ser `dist`, y escribir a ciegas dejaría el alias
      // en un sitio y la compilación en otro.
      configResolved(config: { build: { outDir: string } }) {
        salidaDeLaCompilacion = config.build.outDir;
      },
      closeBundle() {
        const origen = resolve(salidaDeLaCompilacion, 'manifest.webmanifest');
        if (existsSync(origen)) {
          copyFileSync(origen, resolve(salidaDeLaCompilacion, 'manifest.json'));
        }
      },
    },
    {
      // Open Graph con direcciones absolutas, si se sabe cuál es el sitio.
      name: 'athos-og-absoluto',
      transformIndexHtml(html: string) {
        if (!siteUrl) return html;
        const raiz = `${siteUrl}${base}`;
        return html
          .replace('content="icons/og-image.png"', `content="${raiz}icons/og-image.png"`)
          .replace(
            '<meta property="og:type" content="website" />',
            `<meta property="og:url" content="${raiz}" />\n    <meta property="og:type" content="website" />`,
          );
      },
    },
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
        // ATHOS no tiene aplicación nativa: que el navegador no busque una.
        prefer_related_applications: false,
        related_applications: [],
        // Al abrirla de nuevo se reutiliza la ventana que ya está abierta, en
        // vez de dejar una oración a medias en otra.
        launch_handler: { client_mode: ['navigate-existing', 'auto'] },
        // Instalada, abre sus propios enlaces en lugar de mandarlos al navegador.
        handle_links: 'preferred',
        // Edge puede tenerla abierta en su panel lateral mientras se lee otra cosa.
        edge_side_panel: { preferred_width: 420 },
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
          { name: 'Komboskini', short_name: 'Komboskini', url: `${base}orar/komboskini?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
          { name: 'Calendario', short_name: 'Calendario', url: `${base}calendario?source=shortcut`, icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        /**
         * Qué se descarga antes de que el Service Worker se active.
         *
         * Todo lo que entra aquí retrasa la activación, y hasta que el Service
         * Worker no se activa y toma el control, Android no termina de ofrecer
         * la instalación. Así que entra sólo lo que hace falta para que ATHOS
         * arranque y rece: código, tipografía latina, el leccionario y las
         * miniaturas de los iconos.
         *
         * El texto bíblico NO entra, y no es un recorte de funcionalidad: la
         * aplicación lo vuelca a IndexedDB por su cuenta nada más arrancar
         * —`autoIndexBible`— y lo lee de ahí, no de la red. Precacherlo era
         * descargar y guardar los mismos cinco megas dos veces, y costaba
         * quince segundos de espera antes de poder instalar.
         */
        globPatterns: [
          '**/*.{js,css,html,ico,svg,png}',
          'fonts/*-latin.woff2',
          'fonts/*-latin-ext.woff2',
          'content/lectionary/lectionary.json',
          'content/icons/origen.json',
          // De los iconos se precachea la miniatura; la imagen grande se
          // guarda al abrirla, para no cargar la instalación con 2 MB.
          'content/icons/*-mini.webp',
        ],
        // Los iconos declarados en el manifest los añade el propio plugin;
        // excluirlos del glob evita entradas duplicadas en el precaché.
        globIgnores: [
          // El leccionario juliano sólo se descarga si se elige ese calendario.
          'content/lectionary/lectionary-juliano.json',
          // Las capturas las lee el navegador de la ficha de instalación; la
          // aplicación no las usa nunca. Casi un mega que no hace falta tener
          // descargado antes de poder empezar a rezar.
          'icons/screenshot-*.png',
          'icons/og-image.png',
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
        /**
         * El Service Worker toma el control de la página en cuanto se activa.
         *
         * Con `clientsClaim: false` no controlaba nada hasta la siguiente
         * navegación, y Chrome, Brave y Edge no ofrecen instalar una
         * aplicación cuyo Service Worker no controla la página: quien entraba
         * por primera vez no veía el botón de instalar por ningún lado.
         *
         * No compromete la promesa de que las actualizaciones no se aplican
         * solas: de eso se encarga `skipWaiting: false`, que deja la versión
         * nueva esperando hasta que el usuario la acepta. Reclamar clientes y
         * saltarse la espera son cosas distintas.
         */
        clientsClaim: true,
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
            // El corpus lleva huella de versión y no cambia: una vez guardado,
            // se sirve de la caché sin volver a pedirlo por la red.
            urlPattern: ({ url }) => url.pathname.startsWith(`${base}content/`),
            handler: 'CacheFirst',
            options: {
              cacheName: 'athos-content-v2',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false, type: 'module' },
    }),
  ],
});
