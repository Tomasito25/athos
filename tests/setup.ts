import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';
import { cleanup } from '@testing-library/react';
import { webcrypto } from 'node:crypto';
import { afterEach, vi } from 'vitest';

// jsdom no expone Web Crypto; el diario cifrado la necesita.
if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true });
}

// jsdom no implementa estas APIs; varias partes de ATHOS las consultan.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

// jsdom define scrollTo, pero sólo para avisar de que no está implementado.
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
Object.defineProperty(Element.prototype, 'scrollIntoView', { value: vi.fn(), writable: true });

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
}

if (!('IntersectionObserver' in window)) {
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = '';
    thresholds: number[] = [];
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    value: NoopObserver,
    writable: true,
  });
}

// El corpus bíblico se sirve como archivo estático; en las pruebas se responde
// con un salmo mínimo para no depender de la red ni del disco.
const BIBLE_FIXTURE: Record<string, Record<string, string>> = {
  '1': { '1': 'BIENAVENTURADO el varón que no anduvo en consejo de malos.' },
  '51': { '1': 'TEN piedad de mí, oh Dios, conforme á tu misericordia.' },
};

if (!globalThis.fetch || process.env.ATHOS_TEST_FETCH !== 'real') {
  Object.defineProperty(globalThis, 'fetch', {
    writable: true,
    value: vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/content/bible/')) {
        return new Response(
          JSON.stringify({ id: 'PSA', name: 'Salmos', chapters: BIBLE_FIXTURE }),
          { status: 200, headers: { 'content-type': 'application/json' } },
        );
      }
      return new Response('null', { status: 404 });
    }),
  });
}

afterEach(() => {
  cleanup();
});
