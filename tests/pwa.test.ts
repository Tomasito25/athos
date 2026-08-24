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
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.lang).toBe('es');
    expect(manifest.description).toBeTruthy();
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

  it('no reclama los clientes ya abiertos sin avisar', () => {
    expect(sw).not.toMatch(/clientsClaim\(\)/);
  });

  it('sirve la navegación desde index.html cuando no hay red', () => {
    expect(sw).toMatch(/index\.html/);
  });

  it('declara cachés en tiempo de ejecución para las fuentes y el corpus', () => {
    expect(sw).toContain('athos-fonts-v1');
    expect(sw).toContain('athos-content-v1');
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
