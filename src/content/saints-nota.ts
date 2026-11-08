/**
 * Lo que el santoral de ATHOS tiene y lo que no, dicho en la pantalla.
 *
 * Aparte del santoral completo: para contar los santos basta el índice, y la
 * lista de santos no tiene por qué cargar todas las vidas para decirlo.
 */
import { SAINT_INDEX } from './saints';
import { SAINT_PROPER_TROPARIA } from './troparia-santos';

export const SAINTS_COVERAGE_NOTE =
  `El santoral de ATHOS reúne ${SAINT_INDEX.length} conmemoraciones con su vida escrita, y no queda ` +
  'ningún día del año sin al menos una. Aun así, esto no es el Menaion: el libro completo trae ' +
  'varios santos cada día, y aquí hay una selección. Las vidas son reseñas históricas redactadas ' +
  'para ATHOS. En cuanto a los troparios: ATHOS tiene el propio de las grandes fiestas y de ' +
  `${new Set(Object.values(SAINT_PROPER_TROPARIA)).size} santos principales; los demás son cientos ` +
  'y no se escriben de memoria. Pero ninguna ficha se queda muda, porque se muestra el tropario ' +
  'general de su rango, que es justo lo que la Iglesia canta cuando no dispone del propio. Todos ' +
  'van traducidos del griego para ATHOS y su ficha lo dice.';
