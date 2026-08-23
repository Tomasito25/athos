/**
 * Publicación y móvil.
 *
 * ATHOS tiene que poder colgar de una subcarpeta —GitHub Pages sirve los
 * proyectos en `usuario.github.io/repo/`— y su interfaz debe cumplir lo que
 * un teléfono necesita.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const raiz = process.cwd();
const leer = (ruta: string) => readFileSync(resolve(raiz, ruta), 'utf-8');

describe('rutas relativas a la base', () => {
  const html = leer('index.html');

  it('index.html no fija rutas absolutas a los recursos', () => {
    const absolutas = [...html.matchAll(/(?:href|content)="(\/[^"]*)"/g)].map((m) => m[1]);
    expect(absolutas).toEqual([]);
  });

  it('el manifest se enlaza de forma relativa', () => {
    expect(html).toMatch(/rel="manifest"\s+href="manifest\.webmanifest"/);
  });

  it('la configuración de Vite acepta una base distinta de la raíz', () => {
    const config = leer('vite.config.ts');
    expect(config).toContain('ATHOS_BASE');
    expect(config).toContain('base,');
    // Nada dentro del manifest puede estar clavado a la raíz.
    expect(config).not.toMatch(/src: '\/icons\//);
    expect(config).not.toMatch(/url: '\/[a-z]/);
  });

  it('el enrutador respeta la base de la aplicación', () => {
    expect(leer('src/routes/router.tsx')).toContain('basename: import.meta.env.BASE_URL');
  });

  it('el texto bíblico se pide relativo a la base', () => {
    expect(leer('src/db/bible.ts')).toContain('import.meta.env.BASE_URL');
  });
});

describe('metadatos para el móvil', () => {
  const html = leer('index.html');

  it('enlaza pantallas de arranque de iOS para los tamaños habituales', () => {
    const enlaces = [...html.matchAll(/rel="apple-touch-startup-image"/g)];
    expect(enlaces.length).toBeGreaterThanOrEqual(8);
    // Y los archivos existen.
    for (const [, archivo] of html.matchAll(/apple-touch-startup-image" href="([^"]+)"/g)) {
      expect(existsSync(resolve(raiz, 'public', archivo)), `falta ${archivo}`).toBe(true);
    }
  });

  it('cada pantalla de arranque lleva su media query de dispositivo', () => {
    const medias = [...html.matchAll(/apple-touch-startup-image[\s\S]{0,240}?media="([^"]+)"/g)].map(
      (m) => m[1],
    );
    expect(medias.length).toBeGreaterThanOrEqual(8);
    for (const media of medias) {
      expect(media).toMatch(/device-width/);
      expect(media).toMatch(/-webkit-device-pixel-ratio/);
      expect(media).toMatch(/orientation: portrait/);
    }
  });

  it('el área segura y el modo aplicación de iOS están declarados', () => {
    expect(html).toMatch(/viewport-fit=cover/);
    expect(html).toMatch(/apple-mobile-web-app-capable"\s+content="yes"/);
  });
});

describe('interfaz apta para el dedo', () => {
  const css = leer('src/styles/components.css');

  it('los campos nunca bajan de 16px, para que iOS no amplíe la página', () => {
    expect(css).toContain('font-size: max(1rem, var(--text-base))');
  });

  it('los controles crecen con puntero grueso o pantalla estrecha', () => {
    const consultas = [...css.matchAll(/@media \(pointer: coarse\), \(max-width: 30rem\)/g)];
    expect(consultas.length).toBeGreaterThanOrEqual(3);
  });

  it('la casilla de la regla tiene un área táctil mayor que su marca', () => {
    expect(css).toMatch(/\.check-btn\s*\{[^}]*width: 2\.75rem/);
    expect(css).toMatch(/\.check-btn\s*\{[^}]*height: 2\.75rem/);
  });

  it('el pulgar del deslizador se puede agarrar con el dedo', () => {
    expect(css).toMatch(/::-webkit-slider-thumb\s*\{[^}]*width: 1\.5rem/);
  });

  it('el encabezado deja bajar las acciones a otra línea en pantallas estrechas', () => {
    expect(css).toMatch(/@media \(max-width: 34rem\)[\s\S]*?\.page-head__row[\s\S]*?flex-direction: column/);
  });

  it('el control segmentado puede encogerse en lugar de desbordar', () => {
    expect(css).toMatch(/\.segmented\s*\{[^}]*min-width: 0/);
  });
});

describe('scripts de uso', () => {
  it('run.sh ofrece los modos necesarios', () => {
    const run = leer('run.sh');
    for (const opcion of ['--stop', '--status', '--rebuild', '--movil', '--tunel', '--no-browser']) {
      expect(run, `falta ${opcion}`).toContain(opcion);
    }
  });

  it('run.sh explica que sin HTTPS no se puede instalar', () => {
    expect(leer('run.sh')).toMatch(/no.*instalar|NO instalarla/i);
  });

  it('deploy.sh prepara GitHub Pages correctamente', () => {
    const deploy = leer('deploy.sh');
    // Sin .nojekyll, GitHub ignora lo que empieza por guion bajo.
    expect(deploy).toContain('.nojekyll');
    // Sin 404.html, un enlace profundo falla la primera vez.
    expect(deploy).toContain('404.html');
    expect(deploy).toContain('ATHOS_BASE');
  });

  it('el servidor local declara los tipos que exige una PWA', () => {
    const server = leer('server.py');
    expect(server).toContain('application/manifest+json');
    expect(server).toContain('font/woff2');
    expect(server).toContain('Service-Worker-Allowed');
  });
});
