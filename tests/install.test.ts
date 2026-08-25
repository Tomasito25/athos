/**
 * Llevar ATHOS al teléfono.
 *
 * El código QR no se da por bueno porque «parezca un QR»: se dibuja, se
 * convierte en píxeles y se pasa por un descodificador ajeno a la biblioteca
 * que lo generó. Si lo que se pinta no se lee, la prueba falla.
 */
import { describe, expect, it } from 'vitest';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { qrPath, type QrMatriz } from '@/lib/qr-path';
import { isInstallableFrom, isLocalHost, resolvePhoneUrl } from '@/lib/phone-url';

/**
 * Rasteriza el trazado que dibuja ATHOS.
 *
 * El trazado es una lista de cuadrados de un módulo, así que en vez de un
 * motor SVG basta con leerlo: cada «M<col> <fila>h1v1h-1z» pinta un módulo.
 * Se rasteriza a partir del trazado, no de la matriz, precisamente para que la
 * prueba cubra el paso que hace ATHOS y no sólo el de la biblioteca.
 */
function rasterizar(path: string, size: number, borde: number, escala: number) {
  const total = (size + borde * 2) * escala;
  const pixeles = new Uint8ClampedArray(total * total * 4).fill(255);
  const pintar = (col: number, fila: number) => {
    for (let y = 0; y < escala; y += 1) {
      for (let x = 0; x < escala; x += 1) {
        const px = (borde + col) * escala + x;
        const py = (borde + fila) * escala + y;
        const i = (py * total + px) * 4;
        pixeles[i] = pixeles[i + 1] = pixeles[i + 2] = 0;
      }
    }
  };
  for (const m of path.matchAll(/M(\d+) (\d+)h1v1h-1z/g)) {
    pintar(Number(m[1]), Number(m[2]));
  }
  return { pixeles, total };
}

function leerQr(value: string) {
  const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
  const matriz = qr.modules as unknown as QrMatriz;
  const { pixeles, total } = rasterizar(qrPath(matriz), matriz.size, 1, 4);
  return jsQR(pixeles, total, total)?.data;
}

describe('el código QR lleva a donde dice', () => {
  it('una dirección de red local se lee tal cual', () => {
    expect(leerQr('http://192.168.1.42:8788')).toBe('http://192.168.1.42:8788');
  });

  it('una dirección publicada con ruta también', () => {
    const url = 'https://alfonso.github.io/athos/configuracion/instalar';
    expect(leerQr(url)).toBe(url);
  });

  it('el trazado tiene un módulo por cada punto de la matriz', () => {
    const qr = QRCode.create('http://192.168.1.42:8788', { errorCorrectionLevel: 'M' });
    const matriz = qr.modules as unknown as QrMatriz;
    const dibujados = [...qrPath(matriz).matchAll(/M\d+ \d+h1v1h-1z/g)].length;
    const encendidos = matriz.data.reduce((n, v) => n + (v ? 1 : 0), 0);
    expect(dibujados).toBe(encendidos);
  });
});

describe('qué dirección se le da al teléfono', () => {
  it('reconoce las direcciones locales', () => {
    for (const h of ['localhost', '127.0.0.1', '127.1.2.3', '::1']) {
      expect(isLocalHost(h), h).toBe(true);
    }
    for (const h of ['192.168.1.42', 'athos.example', 'alfonso.github.io']) {
      expect(isLocalHost(h), h).toBe(false);
    }
  });

  it('sabe desde dónde se puede instalar y desde dónde no', () => {
    expect(isInstallableFrom('https://alfonso.github.io/athos/')).toBe(true);
    expect(isInstallableFrom('http://localhost:8788/')).toBe(true);
    // Una IP de la red local por HTTP no es contexto seguro: se puede usar
    // ATHOS, pero el navegador no la instalará.
    expect(isInstallableFrom('http://192.168.1.42:8788/')).toBe(false);
    expect(isInstallableFrom('no es una dirección')).toBe(false);
  });

  it('si ATHOS está publicada, la dirección es la que se está viendo', async () => {
    const r = await resolvePhoneUrl({
      href: 'https://alfonso.github.io/athos/configuracion/instalar',
      hostname: 'alfonso.github.io',
    });
    expect(r.reason).toBe('remote');
    expect(r.installable).toBe(true);
  });

  it('en local se pregunta al servidor por su dirección de red', async () => {
    const fetcher = (async () =>
      new Response(JSON.stringify({ lan: 'http://192.168.1.42:8788' }), {
        status: 200,
      })) as unknown as typeof fetch;
    const r = await resolvePhoneUrl({ href: 'http://127.0.0.1:8788/', hostname: '127.0.0.1' }, fetcher);
    expect(r.url).toBe('http://192.168.1.42:8788');
    expect(r.reason).toBe('lan');
    // Y se sabe que desde ahí no se podrá instalar.
    expect(r.installable).toBe(false);
  });

  it('si el servidor no sabe su dirección, no se inventa un QR', async () => {
    const fetcher = (async () =>
      new Response(JSON.stringify({ lan: null }), { status: 200 })) as unknown as typeof fetch;
    const r = await resolvePhoneUrl({ href: 'http://127.0.0.1:8788/', hostname: '127.0.0.1' }, fetcher);
    expect(r.url).toBeNull();
    expect(r.reason).toBe('none');
  });

  it('si el servidor no responde, tampoco', async () => {
    const fetcher = (async () => {
      throw new Error('sin servidor');
    }) as unknown as typeof fetch;
    const r = await resolvePhoneUrl({ href: 'http://localhost:8788/', hostname: 'localhost' }, fetcher);
    expect(r.url).toBeNull();
  });
});
