import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { recentChangelog } from './scripts/changelog.ts';
import { contentVersions } from './scripts/content-versions.ts';
import { privacyPageHtml } from './scripts/privacy-page.ts';

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

/**
 * Patrón para las reglas de caché en tiempo de ejecución: lo que cuelga de
 * `<base><carpeta>/`.
 *
 * Tiene que ser una expresión regular y no una función. Workbox copia la
 * función tal cual dentro de sw.js, y allí `base` no existe: cada petición a
 * las fuentes, al corpus o a los libros lanzaba un error al buscar su regla,
 * y nada de eso se guardaba nunca. Por eso el icono grande salía roto sin
 * conexión, y las letras griegas o cirílicas nunca quedaban guardadas. Una
 * expresión regular se escribe en sw.js con su valor ya puesto.
 */
const bajoLaBase = (carpeta: string) =>
  new RegExp(`${(base + carpeta + '/').replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}`);

/** Carpeta donde se está compilando, para el alias del manifest. */
let salidaDeLaCompilacion = 'dist';

/**
 * Los trozos del corpus que no hacen falta para arrancar.
 *
 * Los llena el plugin `athos-corpus-diferido` al cerrar el paquete y los lee
 * Workbox al hacer el precaché, que los deja fuera. Véase allí.
 */
const corpusDiferido = new Set<string>();

export default defineConfig({
  base,
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
            return 'vendor';
          }
          // El corpus ya no va en un solo trozo: cada pantalla se lleva lo que
          // usa, y lo que no se abre no se descarga ni se analiza al arrancar.
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
      /**
       * El corpus que no hace falta para arrancar no entra en el precaché.
       *
       * Todo lo que va en el precaché se descarga antes de que el Service
       * Worker se active, y hasta entonces no se ofrece instalar ATHOS. El
       * corpus —oraciones, oficios, vidas, catecismo— es casi la mitad, y le
       * quedaban unos 85 KB al límite de 5 MB: cada texto nuevo acercaba el
       * día en que no cabría.
       *
       * Ahora el precaché lleva lo que hace falta para arrancar y rezar, y el
       * resto del corpus —cada sección en su trozo— se descarga después, en
       * segundo plano, con la lista de `corpus.json` (`src/lib/corpus.ts`).
       * Queda en la caché igual que lo precacheado, y sin conexión se lee
       * igual; sólo cambia cuándo se descarga.
       */
      name: 'athos-corpus-diferido',
      apply: 'build' as const,
      generateBundle(_opciones, paquete) {
        corpusDiferido.clear();
        const trozos = Object.values(paquete).filter(
          (t): t is Extract<typeof t, { type: 'chunk' }> => t.type === 'chunk',
        );
        const porArchivo = new Map(trozos.map((t) => [t.fileName, t]));
        const arranque = new Set<string>();
        const visitar = (archivo: string) => {
          if (arranque.has(archivo)) return;
          arranque.add(archivo);
          for (const importado of porArchivo.get(archivo)?.imports ?? []) visitar(importado);
        };
        for (const t of trozos) if (t.isEntry) visitar(t.fileName);
        for (const t of trozos) {
          if (arranque.has(t.fileName)) continue;
          const reales = t.moduleIds.filter((id) => !id.startsWith('\0'));
          if (reales.length && reales.every((id) => id.includes('/src/content/'))) corpusDiferido.add(t.fileName);
        }
        this.emitFile({
          type: 'asset',
          fileName: 'corpus.json',
          source: JSON.stringify([...corpusDiferido].sort()),
        });
      },
    },
    {
      /**
       * `privacidad.html`: la política de privacidad con dirección fija y sin
       * JavaScript, generada del mismo texto que enseña la aplicación.
       */
      name: 'athos-privacidad',
      apply: 'build' as const,
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'privacidad.html',
          source: privacyPageHtml({
            base,
            contacto: process.env.ATHOS_CONTACTO ?? '',
          }),
        });
      },
    },
    {
      /**
       * Open Graph con direcciones absolutas, si se sabe cuál es el sitio.
       *
       * Corre después de que Vite haya puesto la base a las rutas del
       * documento: `/icons/og-image.png` llega aquí como `/athos/icons/…`, y
       * sólo falta anteponerle el dominio.
       */
      name: 'athos-og-absoluto',
      transformIndexHtml: {
        order: 'post' as const,
        handler(html: string) {
          if (!siteUrl) return html;
          const raiz = `${siteUrl}${base}`;
          return html
            .replace(
              /(<meta property="og:image" content=")\/(?!\/)([^"]*)"/,
              (_, inicio: string, ruta: string) => `${inicio}${siteUrl}/${ruta}"`,
            )
            .replace(
              '<meta property="og:type" content="website" />',
              `<meta property="og:url" content="${raiz}" />\n    <meta property="og:type" content="website" />`,
            );
        },
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
          // La lista del corpus que se descarga después de arrancar.
          'corpus.json',
          'fonts/*-latin.woff2',
          // El español entero cabe en el subconjunto latino. El extendido sólo
          // hace falta para nombres como Popović o Brâncoveanu, y desde la 1.30
          // no se precachea ningún grosor: se guarda la primera vez que se usa,
          // como el griego. Sin conexión y antes de eso, esas pocas letras salen
          // con la letra del sistema. Eran casi 200 KB que había que esperar
          // antes de poder instalar, y con ellos el precaché pasaba de 5 MB.
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
          // Las pantallas de arranque de iOS las lee Safari al añadir la
          // aplicación a la pantalla de inicio, y las guarda él; la aplicación
          // no las pide nunca. Son casi 240 KB.
          'icons/splash-*.png',
          'icons/og-image.png',
          'icons/icon-192.png',
          'icons/icon-512.png',
          'icons/maskable-192.png',
          'icons/maskable-512.png',
          'icons/icon.svg',
        ],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // El corpus se pide con `?v=<huella>` (src/lib/content-url.ts). Lo
        // precacheado ya lleva su revisión: para encontrarlo en el precaché
        // hay que ignorar ese parámetro, o se pediría otra vez a la red.
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/],
        // Fuera del precaché el corpus que no hace falta para arrancar: lo
        // descarga después src/lib/corpus.ts. Véase `athos-corpus-diferido`.
        manifestTransforms: [
          async (entradas) => ({
            manifest: entradas.filter((e) => !corpusDiferido.has(e.url)),
            warnings: [],
          }),
        ],
        navigateFallback: `${base}index.html`,
        // La página de privacidad es un documento aparte, no una ruta de la
        // aplicación: se sirve tal cual, también sin conexión.
        navigateFallbackDenylist: [/^\/api\//, /privacidad\.html$/],
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
        // Los recordatorios con la aplicación cerrada y el toque en los avisos.
        importScripts: ['sw-recordatorios.js'],
        runtimeCaching: [
          {
            urlPattern: bajoLaBase('fonts'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'athos-fonts-v1',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // El corpus que no va en el precaché. Los nombres llevan huella,
            // así que lo guardado no cambia nunca: se sirve de la caché sin
            // volver a la red. Lo descarga src/lib/corpus.ts al arrancar.
            urlPattern: bajoLaBase('assets'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'athos-corpus-v1',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // El corpus se pide con la huella de su carpeta en la dirección
            // (`?v=…`): una vez guardado se sirve de la caché sin volver a la
            // red, y si el texto se corrige, la dirección nueva no está en la
            // caché y se descarga. Antes no llevaba huella y una corrección
            // no llegaba nunca.
            urlPattern: bajoLaBase('content'),
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
