/**
 * Pantalla completa en el modo oración.
 *
 * Lo que importa aquí no es que funcione —eso depende del navegador— sino que
 * cuando no se pueda, no se rompa nada: en un iPhone la API no existe para
 * nada que no sea un vídeo, y el modo oración tiene que seguir funcionando
 * igual, sin errores y sin prometer lo que no da.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  exitFullscreen,
  fullscreenSupported,
  isFullscreen,
  shouldGoFullscreen,
} from '@/lib/fullscreen';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('cuando el navegador no sabe de pantalla completa', () => {
  it('lo dice en vez de intentarlo', () => {
    const original = document.documentElement.requestFullscreen;
    // jsdom no la trae; se comprueba que se detecta la ausencia.
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: undefined,
      configurable: true,
    });
    expect(fullscreenSupported()).toBe(false);
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: original,
      configurable: true,
    });
  });

  it('salir no falla aunque nunca se hubiera entrado', async () => {
    await expect(exitFullscreen()).resolves.toBeUndefined();
  });

  it('sabe que no está en pantalla completa', () => {
    expect(isFullscreen()).toBe(false);
  });
});

describe('dónde se pide', () => {
  it('sólo con puntero grueso: en el escritorio las barras no estorban igual', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) => ({ matches: q.includes('coarse'), media: q }) as MediaQueryList,
    );
    expect(shouldGoFullscreen()).toBe(true);

    vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) => ({ matches: false, media: q }) as MediaQueryList,
    );
    expect(shouldGoFullscreen()).toBe(false);
  });
});

describe('el modo oración', () => {
  it('marca y desmarca la raíz del documento, con pantalla completa o sin ella', async () => {
    const { useUi } = await import('@/stores/ui');
    useUi.getState().setPrayerMode(true);
    expect(document.documentElement.dataset.prayerMode).toBe('on');

    useUi.getState().setPrayerMode(false);
    expect(document.documentElement.dataset.prayerMode).toBeUndefined();
  });
});
