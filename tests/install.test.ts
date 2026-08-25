/**
 * Llevar ATHOS al teléfono.
 *
 * El código QR no se da por bueno porque «parezca un QR»: se dibuja, se
 * convierte en píxeles y se pasa por un descodificador ajeno a la biblioteca
 * que lo generó. Si lo que se pinta no se lee, la prueba falla.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync } from 'node:fs';
import { get } from 'node:http';
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

  it('si el servidor sólo escucha para este ordenador, no se dibuja QR', async () => {
    // El fallo que esto vigila: el QR anunciaba la IP de red aunque el
    // servidor estuviera atado a 127.0.0.1, y el teléfono se encontraba con
    // ERR_CONNECTION_REFUSED. Saber la IP no es lo mismo que responder en ella.
    const fetcher = (async () =>
      new Response(
        JSON.stringify({ lan: null, reason: 'loopback', bound: '127.0.0.1', command: './run.sh --movil' }),
        { status: 200 },
      )) as unknown as typeof fetch;
    const r = await resolvePhoneUrl({ href: 'http://127.0.0.1:8788/', hostname: '127.0.0.1' }, fetcher);
    expect(r.url).toBeNull();
    expect(r.reason).toBe('loopback');
    // Y se dice qué hacer para que sí funcione.
    expect(r.command).toBe('./run.sh --movil');
  });

  it('si el cortafuegos lo bloquea, tampoco', async () => {
    const fetcher = (async () =>
      new Response(
        JSON.stringify({ lan: null, reason: 'blocked', bound: '0.0.0.0', ip: '192.168.1.42', port: 8788 }),
        { status: 200 },
      )) as unknown as typeof fetch;
    const r = await resolvePhoneUrl({ href: 'http://127.0.0.1:8788/', hostname: '127.0.0.1' }, fetcher);
    expect(r.url).toBeNull();
    expect(r.reason).toBe('blocked');
    expect(r.ip).toBe('192.168.1.42');
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


/* ============================================================
   El servidor local, de verdad
   ------------------------------------------------------------
   Saber la dirección de este ordenador en la red no es lo mismo
   que responder en ella. El servidor anunciaba la IP aunque
   estuviera atado a 127.0.0.1, y el teléfono que escaneaba el
   código se encontraba con ERR_CONNECTION_REFUSED. Aquí se
   arranca el servidor de las dos maneras y se comprueba.
   ============================================================ */
const hayDist = existsSync('dist/index.html');
const procesos: ChildProcess[] = [];

afterAll(() => {
  for (const p of procesos) p.kill();
});

/**
 * Una petición de verdad.
 *
 * `tests/setup.ts` sustituye el `fetch` global por un doble, que es lo que se
 * quiere en casi todas las pruebas pero no aquí: esta habla con un servidor
 * que está corriendo. Se usa `node:http`, que el doble no toca.
 */
function pedir(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = get(url, { timeout: 3000 }, (res) => {
      let body = '';
      res.setEncoding('utf-8');
      res.on('data', (trozo) => {
        body += trozo;
      });
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    });
    req.on('timeout', () => req.destroy(new Error('tiempo agotado')));
    req.on('error', reject);
  });
}

async function servidor(host: string, port: number) {
  const proceso = spawn('python3', ['server.py', '--host', host, '--port', String(port), '--dir', 'dist'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let ruido = '';
  proceso.stdout?.on('data', (d) => {
    ruido += d;
  });
  proceso.stderr?.on('data', (d) => {
    ruido += d;
  });
  procesos.push(proceso);
  // Se espera a que conteste, en vez de dormir una cantidad fija.
  for (let intento = 0; intento < 40; intento += 1) {
    try {
      const r = await pedir(`http://127.0.0.1:${port}/__athos/host.json`);
      if (r.status === 200) return JSON.parse(r.body) as Record<string, unknown>;
    } catch {
      /* todavía no escucha */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`el servidor no arrancó en ${host}:${port}. ${ruido.slice(0, 400)}`);
}

describe.skipIf(!hayDist)('el servidor sólo anuncia lo que puede cumplir', () => {
  it('atado a 127.0.0.1 no ofrece ninguna dirección para el teléfono', async () => {
    const estado = await servidor('127.0.0.1', 8791);
    expect(estado.lan).toBeNull();
    expect(estado.reason).toBe('loopback');
    expect(estado.command).toBe('./run.sh --movil');
  }, 15_000);

  it('abierto a la red, la dirección que anuncia sirve ATHOS', async () => {
    const estado = await servidor('0.0.0.0', 8792);
    if (estado.reason === 'no-ip' || estado.reason === 'blocked') {
      // Sin red o con cortafuegos no hay nada que comprobar, y el servidor ya
      // ha dicho que no ofrece dirección: que es justamente lo correcto.
      expect(estado.lan).toBeNull();
      return;
    }
    expect(estado.lan).toMatch(/^http:\/\/\d+\.\d+\.\d+\.\d+:8792$/);
    expect(String(estado.lan)).not.toContain('127.0.0.1');
    // La prueba de fuego: pedir la aplicación por esa misma dirección.
    const pagina = await pedir(`${estado.lan}/`);
    expect(pagina.status).toBe(200);
    expect(pagina.body).toContain('ATHOS');
  }, 15_000);
});
