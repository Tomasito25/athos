/**
 * Compartir lo que se lee, y leerlo en voz alta.
 *
 * Las dos cosas sacan el texto de la propia página: lo que el lector tiene
 * delante, sin las rúbricas —son indicaciones, no se dicen—, ni el griego,
 * ni los números de versículo, ni los botones.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { pageParagraphs, shareText, speechChunks } from '@/lib/lectura';

afterEach(() => {
  delete (navigator as { share?: unknown }).share;
});

describe('el texto de la página', () => {
  it('deja fuera rúbricas, griego, números de versículo y notas de procedencia', () => {
    const art = document.createElement('article');
    art.innerHTML = `
      <header><h1>Padre nuestro</h1><div class="row"><button>Compartir</button></div></header>
      <p class="rubric">De pie, ante los iconos:</p>
      <p><span class="verse-num">9</span>Padre nuestro, que estás en los cielos,</p>
      <p lang="el">Πάτερ ἡμῶν</p>
      <ul><li>santificado sea tu nombre.</li></ul>
      <p class="source-note">Fuente: Mateo 6, 9-13</p>`;
    expect(pageParagraphs(art)).toEqual([
      'Padre nuestro',
      'Padre nuestro, que estás en los cielos,',
      'santificado sea tu nombre.',
    ]);
  });
});

describe('compartir', () => {
  it('usa la hoja de compartir del teléfono si la hay', async () => {
    const share = vi.fn(async () => {});
    Object.defineProperty(navigator, 'share', { value: share, configurable: true });
    expect(await shareText('Salmo 50', 'Ten piedad de mí', 'https://x/leer/salterio/50')).toBe('shared');
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://x/leer/salterio/50' }));
  });

  it('si no, copia el texto con el enlace', async () => {
    const escribir = vi.fn(async () => {});
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: escribir }, configurable: true });
    expect(await shareText('Salmo 50', 'Ten piedad de mí', 'https://x/s/50')).toBe('copied');
    expect(escribir).toHaveBeenCalledWith('Salmo 50\n\nTen piedad de mí\n\nhttps://x/s/50');
  });

  it('cerrar la hoja de compartir no es un error', async () => {
    Object.defineProperty(navigator, 'share', {
      value: async () => {
        throw new DOMException('cancelado', 'AbortError');
      },
      configurable: true,
    });
    expect(await shareText('a', 'b', 'c')).toBe('shared');
  });
});

describe('leer en voz alta', () => {
  it('parte los párrafos largos por las frases, para que el motor no los corte', () => {
    const largo = 'Primera frase bastante larga para llenar. '.repeat(10);
    const trozos = speechChunks([largo, 'Corto.'], 120);
    expect(trozos.every((t) => t.length <= 120)).toBe(true);
    expect(trozos.at(-1)).toBe('Corto.');
    expect(trozos.join(' ').replace(/\s+/g, ' ').trim()).toBe(`${largo.trim()} Corto.`);
  });
});
