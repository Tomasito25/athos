/**
 * Lo que se lee en una página, para compartirlo o leerlo en voz alta.
 *
 * Se saca del propio documento, de lo que el lector tiene delante, y no de
 * los datos: así sirve igual para una oración, un salmo, un capítulo o un
 * oficio. Se dejan fuera las rúbricas —son indicaciones, no se dicen—, el
 * griego, los números de versículo, los botones y las notas de procedencia.
 */

const FUERA = [
  'header .row',
  'nav',
  'button',
  'dialog',
  '.source-note',
  '.rubric',
  '.eyebrow',
  '.office-nav',
  '.notice',
  '[lang="el"]',
  '[aria-hidden="true"]',
].join(', ');

/** Los párrafos de una página, en orden, sin lo que no se lee. */
export function pageParagraphs(raiz: Element): string[] {
  const salida: string[] = [];
  for (const el of raiz.querySelectorAll('h1, h2, h3, p, li, blockquote')) {
    if (el.closest(FUERA)) continue;
    // Un párrafo dentro de otro elemento que también se recoge saldría dos veces.
    if (el.parentElement?.closest('p, li, blockquote')) continue;
    const copia = el.cloneNode(true) as Element;
    copia.querySelectorAll(`.verse-num, ${FUERA}`).forEach((n) => n.remove());
    const texto = (copia.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (texto) salida.push(texto);
  }
  return salida;
}

/* ---------------- Compartir ---------------- */

export type ShareResult = 'shared' | 'copied' | 'failed';

/**
 * Comparte con lo que tenga el teléfono —WhatsApp, Telegram, el correo—, y
 * donde no se puede, copia el texto con el enlace.
 */
export async function shareText(titulo: string, cuerpo: string, url: string): Promise<ShareResult> {
  const texto = cuerpo.length > 1800 ? `${cuerpo.slice(0, 1800).replace(/\s+\S*$/, '')}…` : cuerpo;
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: titulo, text: `${titulo}\n\n${texto}`, url });
      return 'shared';
    } catch (error) {
      // Cerrar la hoja de compartir no es un fallo.
      if (error instanceof DOMException && error.name === 'AbortError') return 'shared';
    }
  }
  try {
    await navigator.clipboard.writeText(`${titulo}\n\n${texto}\n\n${url}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}

/* ---------------- Leer en voz alta ---------------- */

export const speechSupported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

/**
 * Trozos de un tamaño que los motores de voz aguantan: Chrome corta las
 * frases muy largas a los quince segundos, más o menos.
 */
export function speechChunks(parrafos: string[], maximo = 220): string[] {
  const trozos: string[] = [];
  for (const parrafo of parrafos) {
    if (parrafo.length <= maximo) {
      trozos.push(parrafo);
      continue;
    }
    let actual = '';
    for (const frase of parrafo.split(/(?<=[.;:!?»])\s+/)) {
      if (actual && (actual + ' ' + frase).length > maximo) {
        trozos.push(actual);
        actual = frase;
      } else {
        actual = actual ? `${actual} ${frase}` : frase;
      }
    }
    if (actual) trozos.push(actual);
  }
  return trozos;
}

/** La voz española del dispositivo, si la tiene; de España antes que de otro sitio. */
function vozEspanola(): SpeechSynthesisVoice | null {
  const voces = window.speechSynthesis.getVoices();
  return (
    voces.find((v) => v.lang === 'es-ES') ??
    voces.find((v) => v.lang.toLowerCase().startsWith('es')) ??
    null
  );
}

export interface Reading {
  pause(): void;
  resume(): void;
  stop(): void;
}

/** Lee los párrafos uno detrás de otro con la voz del propio dispositivo. */
export function readAloud(
  parrafos: string[],
  { onEnd, rate = 0.95 }: { onEnd?: () => void; rate?: number } = {},
): Reading {
  const sintesis = window.speechSynthesis;
  sintesis.cancel();
  const trozos = speechChunks(parrafos);
  const voz = vozEspanola();
  let parado = false;
  let i = 0;

  const siguiente = () => {
    if (parado) return;
    if (i >= trozos.length) {
      onEnd?.();
      return;
    }
    const frase = new SpeechSynthesisUtterance(trozos[i]!);
    frase.lang = voz?.lang ?? 'es-ES';
    if (voz) frase.voice = voz;
    frase.rate = rate;
    frase.onend = () => {
      i += 1;
      siguiente();
    };
    frase.onerror = () => {
      i += 1;
      siguiente();
    };
    sintesis.speak(frase);
  };
  siguiente();

  return {
    pause: () => sintesis.pause(),
    resume: () => sintesis.resume(),
    stop: () => {
      parado = true;
      sintesis.cancel();
      onEnd?.();
    },
  };
}
