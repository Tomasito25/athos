/**
 * El índice de nombres enlazables.
 *
 * Cuando una reseña dice «san Gregorio Palamás defendió a los hesicastas»,
 * ese nombre tiene una ficha dentro de ATHOS y no había manera de llegar a
 * ella salvo volver atrás y buscarlo. Aquí se reúne todo lo que tiene página
 * propia —santos, Padres, monasterios, oficios, iconos, épocas— para que la
 * prosa pueda enlazarlo sola.
 *
 * Tres cautelas, porque enlazar de más es peor que no enlazar:
 *
 * 1. **Sólo nombres distintivos.** «Juan» no entra; «San Juan Damasceno», sí.
 *    Se exige un mínimo de longitud y más de una palabra, salvo para los
 *    apodos de la lista de abajo, que se escriben a mano uno por uno.
 *
 * 2. **Gana el más largo.** Si en el texto está «San Gregorio de Nisa», se
 *    enlaza entero y no la parte «San Gregorio» de otro.
 *
 * 3. **Nunca el texto litúrgico.** Esto se aplica a la prosa explicativa —la
 *    historia, el catecismo, las vidas, los artículos—, jamás a una oración,
 *    un tropario o un canon. Un texto litúrgico no se decora.
 */
import { ATHOS_ARTICLES, MONASTERIES } from './athos';
import { CHURCH_FATHERS } from './fathers';
import { HISTORY_PERIODS } from './history-all';
import { ICONS } from './icons';
import { OFFICES } from './offices';
import { SAINTS } from './saints';

export type LinkKind =
  | 'padre'
  | 'obra'
  | 'santo'
  | 'monasterio'
  | 'articulo'
  | 'oficio'
  | 'icono'
  | 'epoca';

export interface LinkTarget {
  /** El texto tal como aparecerá escrito. */
  name: string;
  path: string;
  kind: LinkKind;
}

/**
 * Prioridad cuando dos cosas se llaman igual.
 *
 * San Juan Crisóstomo es a la vez santo del 13 de noviembre y Padre de la
 * Iglesia. Desde una reseña que habla de lo que enseñó, la ficha útil es la
 * del Padre: trae la doctrina, las obras y por dónde empezar. La del santo
 * trae la vida y el día de su fiesta, y se llega a ella desde el calendario.
 */
const PRIORIDAD: Record<LinkKind, number> = {
  padre: 1,
  obra: 2,
  monasterio: 3,
  oficio: 4,
  articulo: 5,
  santo: 6,
  icono: 7,
  epoca: 8,
};

/**
 * Los apodos y las formas cortas con que de verdad se les nombra.
 *
 * Van a mano porque son los únicos casos en que se puede enlazar una palabra
 * suelta sin equivocarse. Cualquier añadido aquí tiene que ser inequívoco:
 * «el Teólogo» no entra, porque son tres personas distintas.
 */
export const LINK_ALIASES: LinkTarget[] = [
  { name: 'Crisóstomo', path: '/biblioteca/padres/juan-crisostomo', kind: 'padre' },
  { name: 'Palamás', path: '/biblioteca/padres/gregorio-palamas', kind: 'padre' },
  { name: 'el Damasceno', path: '/biblioteca/padres/juan-damasceno', kind: 'padre' },
  { name: 'Nacianceno', path: '/biblioteca/padres/gregorio-nacianceno', kind: 'padre' },
  { name: 'el Areopagita', path: '/calendario/santos/dionisio-areopagita', kind: 'santo' },
  { name: 'Monte Athos', path: '/biblioteca/athos', kind: 'articulo' },
  { name: 'el Athos', path: '/biblioteca/athos', kind: 'articulo' },
  { name: 'la Montaña Santa', path: '/biblioteca/athos', kind: 'articulo' },
  { name: 'la Gran Laura', path: '/biblioteca/athos/monasterio/megisti-lavra', kind: 'monasterio' },
  { name: 'la Filocalia', path: '/biblioteca/padres/nicodemo-hagiorita', kind: 'padre' },
  { name: 'la Divina Liturgia', path: '/biblioteca/liturgia', kind: 'oficio' },
  { name: 'la Escala', path: '/biblioteca/padres/juan-climaco/climaco-escala', kind: 'padre' },
  { name: 'el Gran Canon', path: '/biblioteca/canones/gran-canon-andres', kind: 'oficio' },
  { name: 'el Símbolo de la Fe', path: '/orar/oraciones/simbolo-de-la-fe', kind: 'oficio' },
  { name: 'la oración de Jesús', path: '/orar/oracion-de-jesus', kind: 'oficio' },
];

/** Un nombre sirve si es largo y tiene más de una palabra: «San Blas» no basta. */
function esDistintivo(nombre: string): boolean {
  return nombre.length >= 12 && nombre.trim().split(/\s+/).length >= 3;
}

/**
 * La prosa no siempre escribe el tratamiento.
 *
 * En la ficha el nombre es «San Cirilo de Alejandría», pero un párrafo de
 * historia dice «Cirilo de Alejandría» a secas, y sin esto no se enlazaría
 * nunca. Así que de cada nombre se registra también la forma sin el «san» o
 * el artículo del principio, siempre que lo que queda siga siendo inequívoco:
 * dos palabras y catorce caracteres. «Cirilo» solo no entra; «Juan Damasceno»
 * sí, porque no hay otro.
 */
function sinTratamiento(nombre: string): string | null {
  // Sólo el tratamiento de santidad, nunca el artículo: quitarle «El» a «El
  // camino de la salvación» deja una frase corriente que aparece en cualquier
  // párrafo, y enlazarla llevaría a un libro que nadie ha nombrado.
  const m = nombre.match(/^(?:San|Santa|Santo|Santos|Santas)\s+(.+)$/i);
  if (!m) return null;
  const resto = m[1];
  if (resto.length < 14 || resto.trim().split(/\s+/).length < 2) return null;
  return resto;
}

/**
 * Nombres que no se enlazan aunque tengan ficha.
 *
 * «Santísima Trinidad» es el título de un icono, y en un párrafo de doctrina
 * la palabra no se refiere a la tabla pintada sino a Dios. Enlazarla al icono
 * sería llevar al lector a un sitio que no ha pedido.
 */
const NO_ENLAZAR = new Set([
  'santísima trinidad',
  'trinidad',
  'theotokos',
  'madre de dios',
  // Títulos de obra que son además frases corrientes: enlazarlos convertiría
  // cualquier párrafo de doctrina en un enlace a un libro que nadie ha citado.
  'el camino de la salvación',
  'que cristo es uno',
  'la oración de Jesús',
]);

/** Se compara sin el tratamiento, para que «La Santísima Trinidad» también caiga. */
function estaVetado(nombre: string): boolean {
  const clave = nombre.toLowerCase();
  if (NO_ENLAZAR.has(clave)) return true;
  const sinArticulo = clave.replace(/^(?:san|santa|santo|santos|santas|los|las|el|la)\s+/, '');
  return NO_ENLAZAR.has(sinArticulo);
}

function reunir(): LinkTarget[] {
  const bruto: LinkTarget[] = [
    ...CHURCH_FATHERS.flatMap((f) => [
      { name: f.name, path: `/biblioteca/padres/${f.id}`, kind: 'padre' as const },
      { name: f.fullName, path: `/biblioteca/padres/${f.id}`, kind: 'padre' as const },
      // Y sus obras: la prosa las nombra por el título —«la Escala», «Contra
      // las herejías»— y hasta ahora eran callejones sin salida.
      ...f.works.map((w) => ({
        name: w.title,
        path: `/biblioteca/padres/${f.id}/${w.id}`,
        kind: 'obra' as const,
      })),
    ]),
    ...SAINTS.flatMap((s) => [
      { name: s.name, path: `/calendario/santos/${s.id}`, kind: 'santo' as const },
      ...(s.fullName ? [{ name: s.fullName, path: `/calendario/santos/${s.id}`, kind: 'santo' as const }] : []),
    ]),
    ...MONASTERIES.map((m) => ({
      name: `monasterio de ${m.name}`,
      path: `/biblioteca/athos/monasterio/${m.id}`,
      kind: 'monasterio' as const,
    })),
    ...ATHOS_ARTICLES.map((a) => ({
      name: a.title,
      path: `/biblioteca/athos/${a.id}`,
      kind: 'articulo' as const,
    })),
    ...OFFICES.map((o) => ({
      name: o.title,
      path: `/biblioteca/liturgia/${o.id}`,
      kind: 'oficio' as const,
    })),
    ...ICONS.map((i) => ({ name: i.name, path: `/biblioteca/iconos/${i.id}`, kind: 'icono' as const })),
    ...HISTORY_PERIODS.map((p) => ({
      name: p.title,
      path: `/biblioteca/historia/${p.id}`,
      kind: 'epoca' as const,
    })),
  ].filter((t) => esDistintivo(t.name));

  // Y las mismas, sin el tratamiento delante.
  const desnudos = bruto.flatMap((t) => {
    const corto = sinTratamiento(t.name);
    return corto ? [{ ...t, name: corto }] : [];
  });

  // Los apodos se añaden después y saltándose el filtro de longitud: para eso
  // están escritos a mano.
  const todos = [...bruto, ...desnudos, ...LINK_ALIASES];

  // Un nombre, un destino: gana el de más prioridad. Los apodos van aparte y
  // siempre ganan, porque son los únicos que alguien ha revisado a mano: «la
  // oración de Jesús» tiene que llevar a la práctica, no al libro que la
  // explica, y eso no lo puede deducir una regla.
  const porNombre = new Map<string, LinkTarget>();
  for (const t of todos) {
    const clave = t.name.toLowerCase();
    if (estaVetado(t.name)) continue;
    const previo = porNombre.get(clave);
    if (!previo || PRIORIDAD[t.kind] < PRIORIDAD[previo.kind]) porNombre.set(clave, t);
  }
  for (const a of LINK_ALIASES) porNombre.set(a.name.toLowerCase(), a);

  // De más largo a más corto: así el buscador encuentra antes «San Gregorio de
  // Nisa» que «San Gregorio Palamás» dentro de la misma frase.
  return [...porNombre.values()].sort((a, b) => b.name.length - a.name.length);
}

export const LINK_TARGETS: LinkTarget[] = reunir();

const PARTE = LINK_TARGETS.map((t) => t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

/**
 * Un solo patrón con todos los nombres.
 *
 * Sin `lookbehind`, que no está en todos los navegadores: los límites de
 * palabra se comprueban a mano mirando el carácter anterior y el siguiente,
 * porque `\b` de JavaScript considera que la «á» no es letra y partiría
 * «Panagía» por la mitad.
 */
const PATRON = PARTE ? new RegExp(PARTE, 'giu') : null;

const LETRA = /[\p{L}\p{M}\p{N}]/u;

/** Del nombre en minúsculas a su destino, para no recorrer la lista por cada acierto. */
const POR_NOMBRE = new Map(LINK_TARGETS.map((t) => [t.name.toLowerCase(), t]));

export interface Trozo {
  text: string;
  /** Si lo lleva, es un enlace. */
  path?: string;
  kind?: LinkKind;
}

/**
 * Parte un texto en trozos, enlazando los nombres que tienen ficha.
 *
 * `omitir` es la ruta de la página actual: nadie quiere un enlace a la página
 * en la que ya está. `maximo` limita cuántos enlaces salen por texto, porque
 * un párrafo con nueve enlaces no se lee, se escanea.
 */
export function linkify(
  texto: string,
  { omitir, maximo = 4 }: { omitir?: string; maximo?: number } = {},
): Trozo[] {
  if (!PATRON) return [{ text: texto }];
  PATRON.lastIndex = 0;

  const trozos: Trozo[] = [];
  const yaPuestos = new Set<string>();
  let cursor = 0;
  let puestos = 0;
  let m: RegExpExecArray | null;

  while ((m = PATRON.exec(texto)) !== null) {
    if (puestos >= maximo) break;
    const inicio = m.index;
    const fin = inicio + m[0].length;

    // Límite de palabra a mano, por lo dicho arriba.
    const antes = inicio > 0 ? texto[inicio - 1] : '';
    const despues = fin < texto.length ? texto[fin] : '';
    if ((antes && LETRA.test(antes)) || (despues && LETRA.test(despues))) continue;

    const destino = POR_NOMBRE.get(m[0].toLowerCase());
    if (!destino) continue;
    if (destino.path === omitir) continue;
    // Una vez por texto: repetir el mismo enlace tres veces no ayuda a nadie.
    if (yaPuestos.has(destino.path)) continue;

    if (inicio > cursor) trozos.push({ text: texto.slice(cursor, inicio) });
    trozos.push({ text: m[0], path: destino.path, kind: destino.kind });
    yaPuestos.add(destino.path);
    puestos += 1;
    cursor = fin;
  }

  if (cursor < texto.length) trozos.push({ text: texto.slice(cursor) });
  return trozos.length > 0 ? trozos : [{ text: texto }];
}

/**
 * La otra ficha de la misma persona.
 *
 * San Gregorio Palamás tiene dos páginas: la del santo, con su vida y el día
 * de su fiesta, y la del Padre, con lo que enseñó y sus obras. Cada una
 * responde a una pregunta distinta y hasta ahora no había manera de pasar de
 * una a otra.
 *
 * No se busca en `LINK_TARGETS` a propósito: ese índice se queda con un solo
 * destino por nombre —el Padre gana al santo— y aquí hace falta justo el que
 * se descartó. Así que se busca en las dos colecciones de origen.
 */
export function otraFicha(nombre: string, desde: LinkKind): LinkTarget | null {
  const claves = [nombre.toLowerCase(), sinTratamiento(nombre)?.toLowerCase()].filter(
    (c): c is string => Boolean(c),
  );
  const casa = (otro: string) => claves.includes(otro.toLowerCase());

  if (desde !== 'padre') {
    const padre = CHURCH_FATHERS.find((f) => casa(f.name) || casa(f.fullName));
    if (padre) {
      return { name: padre.name, path: `/biblioteca/padres/${padre.id}`, kind: 'padre' };
    }
  }
  if (desde !== 'santo') {
    const santo = SAINTS.find((x) => casa(x.name) || (x.fullName ? casa(x.fullName) : false));
    if (santo) {
      return { name: santo.name, path: `/calendario/santos/${santo.id}`, kind: 'santo' };
    }
  }
  return null;
}
