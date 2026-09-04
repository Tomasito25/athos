/**
 * A dónde ofrecer ir cuando una dirección no lleva a ninguna parte.
 *
 * «Volver» no informa de nada; «Ir al Salterio» sí, y es la diferencia entre
 * un callejón sin salida y una puerta. Las frases viven en el archivo de
 * idioma, como todo lo que se lee en pantalla; aquí sólo está el camino para
 * encontrarlas.
 */
import { parentPath } from '@/lib/up-navigation';
import es from '@/locales/es';

/**
 * La frase del destino: «al Salterio», «a la Biblia».
 *
 * Una ficha suelta —un salmo, un santo— no tiene frase propia, así que se
 * sube de madre en madre hasta la primera pantalla que sí la tenga. Si no
 * hubiera ninguna, queda el inicio, que existe siempre.
 */
export function screenName(path: string): string {
  let actual = path;
  for (let i = 0; i < 8; i += 1) {
    const frase = es.screens[actual];
    if (frase) return frase;
    if (actual === '/') break;
    actual = parentPath(actual);
  }
  return es.screens['/']!;
}
