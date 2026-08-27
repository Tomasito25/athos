/**
 * PWA: manifest, iconos y Service Worker.
 *
 * Se validan los artefactos que `npm run build` deja en `dist/`, que son los
 * que el navegador leerá de verdad al instalar ATHOS. Si no se ha compilado
 * todavía, las pruebas lo dicen en lugar de dar por buena una ausencia.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const built = existsSync(resolve(dist, 'manifest.webmanifest'));

const read = (file: string) => readFileSync(resolve(dist, file), 'utf-8');

/** Ancho y alto de un PNG, leídos de la cabecera IHDR. */
function pngSize(file: string): { width: number; height: number } {
  const buffer = readFileSync(resolve(dist, file));
  expect(buffer.subarray(1, 4).toString('ascii')).toBe('PNG');
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

describe.skipIf(!built)('manifest', () => {
  const manifest = built ? (JSON.parse(read('manifest.webmanifest')) as Record<string, unknown>) : {};

  it('declara los campos que exige la instalación', () => {
    expect(manifest.name).toContain('ATHOS');
    expect(manifest.short_name).toBe('ATHOS');
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe('standalone');
    expect(manifest.lang).toBe('es');
    expect(manifest.description).toBeTruthy();
  });

  it('el ámbito encierra la aplicación, cuelgue de donde cuelgue', () => {
    // Esta prueba exigía scope === '/' y por eso tumbaba la publicación:
    // al servirse en usuario.github.io/athos/ el ámbito TIENE que ser
    // '/athos/'. Lo que hay que comprobar no es el valor, sino la relación.
    const scope = String(manifest.scope);
    const start = String(manifest.start_url);
    const id = String(manifest.id);

    expect(scope.startsWith('/'), `ámbito relativo: ${scope}`).toBe(true);
    expect(scope.endsWith('/'), `el ámbito debe acabar en barra: ${scope}`).toBe(true);
    // Si start_url cae fuera del ámbito, el navegador no instala.
    expect(start.startsWith(scope), `${start} está fuera de ${scope}`).toBe(true);
    expect(id.startsWith(scope), `el identificador ${id} está fuera de ${scope}`).toBe(true);
  });

  it('todo lo que el manifest declara vive dentro del ámbito', () => {
    const scope = String(manifest.scope);
    const atajos = (manifest.shortcuts ?? []) as Array<{ url: string; name: string }>;
    expect(atajos.length, 'sin accesos directos').toBeGreaterThan(0);
    for (const atajo of atajos) {
      expect(atajo.url.startsWith(scope), `el atajo «${atajo.name}» apunta fuera: ${atajo.url}`).toBe(
        true,
      );
    }
  });

  it('lleva color de tema y de fondo', () => {
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('ofrece alternativas de presentación', () => {
    expect(manifest.display_override).toContain('window-controls-overlay');
    expect(manifest.display_override).toContain('standalone');
  });

  it('incluye iconos de 192 y 512 y una versión maskable', () => {
    const icons = manifest.icons as Array<{ src: string; sizes: string; purpose?: string }>;
    const sizes = icons.map((icon) => icon.sizes);
    expect(sizes).toContain('192x192');
    expect(sizes).toContain('512x512');
    expect(icons.some((icon) => icon.purpose === 'maskable')).toBe(true);
  });

  it('los archivos de icono existen y miden lo que dicen', () => {
    const icons = manifest.icons as Array<{ src: string; sizes: string }>;
    for (const icon of icons) {
      const file = icon.src.replace(/^\//, '');
      expect(existsSync(resolve(dist, file)), `falta ${file}`).toBe(true);
      if (icon.sizes !== 'any') {
        const [width, height] = icon.sizes.split('x').map(Number);
        expect(pngSize(file)).toEqual({ width, height });
      }
    }
  });

  it('define atajos de aplicación que apuntan a rutas reales', () => {
    const shortcuts = manifest.shortcuts as Array<{ name: string; url: string }>;
    expect(shortcuts.length).toBeGreaterThanOrEqual(3);
    for (const shortcut of shortcuts) {
      expect(shortcut.url.startsWith('/')).toBe(true);
      expect(shortcut.name.length).toBeGreaterThan(0);
    }
  });

  it('las capturas existen y miden lo que declaran', () => {
    const screenshots = (manifest.screenshots ?? []) as Array<{
      src: string;
      sizes: string;
      form_factor: string;
    }>;
    // Chrome pide al menos una estrecha y una ancha para la ficha enriquecida.
    expect(screenshots.some((s) => s.form_factor === 'narrow')).toBe(true);
    expect(screenshots.some((s) => s.form_factor === 'wide')).toBe(true);

    for (const shot of screenshots) {
      const archivo = shot.src.replace(/^\//, '');
      expect(existsSync(resolve(dist, archivo)), `falta ${archivo}`).toBe(true);
      const [width, height] = shot.sizes.split('x').map(Number);
      expect(pngSize(archivo), archivo).toEqual({ width, height });
    }
  });
});

describe.skipIf(!built)('reconocimiento por herramientas y navegadores', () => {
  it('el manifest está también en /manifest.json', () => {
    // El nombre estándar es .webmanifest y es el que enlaza el documento, pero
    // muchos validadores y rastreadores piden /manifest.json por convención y,
    // al no encontrarlo, concluyen que la aplicación no tiene manifest.
    expect(existsSync(resolve(dist, 'manifest.json')), 'falta manifest.json').toBe(true);
  });

  it('las dos direcciones sirven exactamente lo mismo', () => {
    // Dos manifests que difieran serían peor que uno solo.
    expect(JSON.parse(read('manifest.json'))).toEqual(JSON.parse(read('manifest.webmanifest')));
  });

  it('el documento sigue enlazando el nombre estándar', () => {
    expect(read('index.html')).toMatch(/rel="manifest"\s+href="manifest\.webmanifest"/);
  });

  it('declara que no hay aplicación nativa que preferir', () => {
    const m = JSON.parse(read('manifest.json')) as Record<string, unknown>;
    expect(m.prefer_related_applications).toBe(false);
    expect(m.related_applications).toEqual([]);
  });

  it('instalada, se comporta como una aplicación', () => {
    const m = JSON.parse(read('manifest.json')) as Record<string, unknown>;
    // Reutiliza la ventana abierta en vez de dejar una oración a medias.
    expect(m.launch_handler).toBeTruthy();
    // Y abre sus propios enlaces en lugar de mandarlos al navegador.
    expect(m.handle_links).toBe('preferred');
  });
});

describe.skipIf(!built)('index.html', () => {
  const html = built ? read('index.html') : '';

  it('enlaza el manifest y el icono de Apple', () => {
    expect(html).toMatch(/rel="manifest"/);
    expect(html).toMatch(/rel="apple-touch-icon"/);
  });

  it('declara el color de tema para los dos esquemas', () => {
    expect(html).toMatch(/name="theme-color"[^>]*prefers-color-scheme: light/);
    expect(html).toMatch(/name="theme-color"[^>]*prefers-color-scheme: dark/);
  });

  it('pide el modo aplicación en iOS', () => {
    expect(html).toMatch(/apple-mobile-web-app-capable"\s+content="yes"/);
    expect(html).toMatch(/apple-mobile-web-app-title"\s+content="ATHOS"/);
  });

  it('respeta el área segura de las pantallas con muesca', () => {
    expect(html).toMatch(/viewport-fit=cover/);
  });

  it('trae metadatos de Open Graph', () => {
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
  });

  it('aplica el tema antes del primer pintado', () => {
    expect(html).toContain('athos.appearance');
    expect(html).toContain('prefers-color-scheme: dark');
  });

  it('avisa si falta JavaScript', () => {
    expect(html).toContain('<noscript>');
  });
});

describe.skipIf(!built)('service worker', () => {
  const sw = built ? read('sw.js') : '';

  it('se ha generado', () => {
    expect(sw.length).toBeGreaterThan(1000);
  });

  it('es JavaScript válido', () => {
    // No se ejecuta: sólo se comprueba que el motor puede analizarlo.
    expect(() => new Function(sw)).not.toThrow();
  });

  it('limpia las cachés antiguas al actualizar', () => {
    expect(sw).toMatch(/cleanupOutdatedCaches|cleanup/i);
  });

  it('no se activa por su cuenta: la actualización la decide el usuario', () => {
    // La única llamada a skipWaiting debe estar dentro del receptor del
    // mensaje SKIP_WAITING; nunca en la instalación.
    const llamadas = [...sw.matchAll(/skipWaiting\(\)/g)];
    expect(llamadas).toHaveLength(1);
    expect(sw).toMatch(/SKIP_WAITING[\s\S]{0,60}skipWaiting\(\)/);
  });

  it('toma el control de la página en cuanto se activa', () => {
    // Esta prueba exigía lo contrario. La decisión cambió por un motivo
    // concreto: sin reclamar los clientes, el Service Worker no controlaba
    // nada hasta la siguiente navegación, y Chrome, Brave y Edge no ofrecen
    // instalar una aplicación cuyo Service Worker no controla la página.
    expect(sw).toMatch(/clientsClaim\(\)/);
  });

  it('sirve la navegación desde index.html cuando no hay red', () => {
    expect(sw).toMatch(/index\.html/);
  });

  it('declara cachés en tiempo de ejecución para las fuentes y el corpus', () => {
    expect(sw).toContain('athos-fonts-v1');
    expect(sw).toContain('athos-content-v2');
  });
});

describe.skipIf(!built)('precaché', () => {
  const sw = built ? read('sw.js') : '';
  // Workbox emite las entradas con las claves sin comillas: {url:"…",revision:"…"}
  const entries = built ? [...sw.matchAll(/\burl:"([^"]+)"/g)].map((match) => match[1]) : [];

  it('incluye el documento y el código de la aplicación', () => {
    expect(entries).toContain('index.html');
    expect(entries.some((url) => url.startsWith('assets/') && url.endsWith('.js'))).toBe(true);
    expect(entries.some((url) => url.endsWith('.css'))).toBe(true);
  });

  it('incluye la tipografía latina, para que el libro se lea sin conexión', () => {
    expect(entries.some((url) => url.includes('ebgaramond') && url.includes('latin'))).toBe(true);
    expect(entries.some((url) => url.includes('inter') && url.includes('latin'))).toBe(true);
  });

  it('incluye el texto bíblico completo', () => {
    const libros = entries.filter((url) => url.startsWith('content/bible/'));
    // 66 libros más el índice.
    expect(libros.length).toBeGreaterThanOrEqual(67);
    expect(libros.some((url) => url.endsWith('PSA.json'))).toBe(true);
    expect(libros.some((url) => url.endsWith('JHN.json'))).toBe(true);
  });

  it('cada entrada lleva revisión o huella en el nombre', () => {
    // Sin una de las dos cosas, una actualización dejaría servido el archivo viejo.
    const sinRevision = [...sw.matchAll(/\{url:"([^"]+)",revision:(null|"[^"]*")\}/g)].filter(
      ([, url, revision]) => revision === 'null' && !/-[A-Za-z0-9_-]{8,}\./.test(url),
    );
    expect(sinRevision.map(([, url]) => url)).toEqual([]);
  });
});

describe.skipIf(!built)('salida de la compilación', () => {
  it('no repite entradas en el precaché', () => {
    const urls = [...read('sw.js').matchAll(/\burl:"([^"]+)"/g)].map((m) => m[1]);
    expect(urls.length).toBe(new Set(urls).size);
  });

  it('deja los archivos imprescindibles en dist/', () => {
    for (const file of ['index.html', 'manifest.webmanifest', 'sw.js', 'favicon.ico', 'favicon.svg']) {
      expect(existsSync(resolve(dist, file)), `falta ${file}`).toBe(true);
    }
  });

  it('copia los 66 libros de la traducción incorporada', () => {
    const dir = resolve(dist, 'content/bible/rv1909');
    const files = readdirSync(dir).filter((name) => name.endsWith('.json'));
    expect(files.length).toBe(67); // 66 libros + index.json
  });

  it('el texto bíblico tiene el tamaño esperado', () => {
    const psa = statSync(resolve(dist, 'content/bible/rv1909/PSA.json'));
    expect(psa.size).toBeGreaterThan(100_000);
  });

  it('divide el código en fragmentos en lugar de un único paquete', () => {
    const assets = readdirSync(resolve(dist, 'assets')).filter((name) => name.endsWith('.js'));
    expect(assets.length).toBeGreaterThan(20);
  });

  it('no deja rastro de las herramientas de desarrollo', () => {
    const html = read('index.html');
    expect(html).not.toContain('/src/main.tsx');
    expect(html).not.toContain('@vite/client');
  });
});


/* ============================================================
   Que el navegador ofrezca instalar, y que ATHOS se entere
   ============================================================ */
describe('instalación', () => {
  const raiz = (f: string) => readFileSync(resolve(process.cwd(), f), 'utf-8');

  it('el Service Worker toma el control de la página al activarse', () => {
    // Sin `clientsClaim`, el Service Worker no controlaba nada hasta la
    // siguiente navegación, y Chrome no ofrece instalar una aplicación cuyo
    // Service Worker no controla la página.
    const config = raiz('vite.config.ts');
    expect(config).toMatch(/clientsClaim:\s*true/);
  });

  it('pero la versión nueva sigue esperando a que el usuario la acepte', () => {
    // La comprobación sobre el Service Worker generado la hace «no se activa
    // por su cuenta»; aquí se fija la configuración que la produce.
    // Reclamar clientes y saltarse la espera son cosas distintas: lo primero
    // hace instalable la aplicación, lo segundo la cambiaría bajo los pies de
    // quien está rezando. Sólo se quiere lo primero.
    const config = raiz('vite.config.ts');
    expect(config).toMatch(/skipWaiting:\s*false/);
    expect(config).toMatch(/registerType:\s*'prompt'/);
  });

  it('el evento de instalación se recoge antes de que arranque la aplicación', () => {
    // `beforeinstallprompt` se dispara una sola vez y muy pronto: antes de que
    // React esté montado. Si no hay nadie escuchando, se pierde y ATHOS cree
    // que el navegador no ofrece instalarla.
    const html = raiz('index.html');
    expect(html).toContain("addEventListener('beforeinstallprompt'");
    expect(html).toContain('__athosInstall');
    // Y tiene que estar en el documento, no en el paquete que se carga después.
    const posEscuchador = html.indexOf("addEventListener('beforeinstallprompt'");
    const posModulo = html.indexOf('<script type="module"');
    expect(posEscuchador, 'el escuchador va después del módulo').toBeLessThan(
      posModulo === -1 ? Number.MAX_SAFE_INTEGER : posModulo,
    );
  });

  it('la aplicación mira primero lo que recogió el escuchador temprano', () => {
    const pwa = raiz('src/lib/pwa.ts');
    expect(pwa).toContain('__athosInstall');
    expect(pwa).toContain("'athos:installable'");
  });

  it('las capturas no lastran la primera visita', () => {
    // Sólo las lee el navegador para la ficha de instalación; la aplicación no
    // las usa nunca, y eran casi un mega antes de poder empezar a rezar.
    const config = raiz('vite.config.ts');
    expect(config).toMatch(/globIgnores:[\s\S]*?screenshot/);
  });
});
