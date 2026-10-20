/**
 * La pantalla no se apaga mientras se reza.
 *
 * Ya se hacía en el contador de la oración de Jesús; ahora también en los
 * oficios, la Liturgia, los akathistos y los cánones. Y como el contador va a
 * veces dentro de un oficio, el bloqueo no se suelta hasta que no lo quiere
 * nadie: antes, al parar el contador, se apagaba también para el oficio.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { releaseWakeLock, requestWakeLock } from '@/lib/wakelock';

let activos = 0;
const peticiones = vi.fn();

beforeEach(() => {
  activos = 0;
  peticiones.mockClear();
  Object.defineProperty(navigator, 'wakeLock', {
    configurable: true,
    value: {
      request: async () => {
        peticiones();
        activos += 1;
        const centinela = {
          released: false,
          release: async () => {
            if (!centinela.released) activos -= 1;
            centinela.released = true;
          },
        };
        return centinela;
      },
    },
  });
});

afterEach(() => {
  delete (navigator as { wakeLock?: unknown }).wakeLock;
});

describe('el bloqueo de pantalla', () => {
  it('se mantiene mientras lo quiera alguien', async () => {
    const oficio = Symbol('oficio');
    const contador = Symbol('contador');
    await requestWakeLock(oficio);
    await requestWakeLock(contador);
    // Una sola petición al navegador: el segundo comparte la del primero.
    expect(peticiones).toHaveBeenCalledTimes(1);

    await releaseWakeLock(contador);
    expect(activos, 'el contador lo soltó también para el oficio').toBe(1);

    await releaseWakeLock(oficio);
    expect(activos).toBe(0);
  });

  it('soltar a alguien que no lo había pedido no suelta a los demás', async () => {
    const oficio = Symbol('oficio');
    await requestWakeLock(oficio);
    await releaseWakeLock(Symbol('otro'));
    expect(activos).toBe(1);
    await releaseWakeLock(oficio);
  });
});

describe('dónde se pide', () => {
  it('en los oficios, la Liturgia, los akathistos, los cánones y los órdenes de oración', () => {
    for (const archivo of [
      'src/features/office/OfficePage.tsx',
      'src/features/library/OfficePage.tsx',
      'src/features/library/HymnPages.tsx',
      'src/features/prayers/PrayerOrderPage.tsx',
    ]) {
      expect(readFileSync(resolve(process.cwd(), archivo), 'utf-8'), archivo).toContain('useKeepAwake(');
    }
  });
});
