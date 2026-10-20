/** Utilidades de texto compartidas por la búsqueda y la lectura. */

/** Minúsculas sin acentos: «Theotokos» y «theotókos» deben encontrarse igual. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(query: string): string[] {
  return normalize(query).split(' ').filter((token) => token.length > 1);
}

export function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

/**
 * Normaliza como `normalize`, pero recordando de qué posición del texto
 * original sale cada letra de la forma normalizada.
 *
 * `normalize` quita acentos y signos y junta los espacios, y con eso la forma
 * normalizada se va descolocando respecto del texto: el extracto se cortaba
 * por donde caía la coincidencia en la forma normalizada, que en el texto
 * original era otro sitio, y a menudo no enseñaba la parte que coincidía.
 */
function normalizeWithMap(input: string): { text: string; map: number[] } {
  let text = '';
  const map: number[] = [];
  let espacio = true;
  for (let i = 0; i < input.length; i += 1) {
    const descompuesto = input[i]!.toLowerCase().normalize('NFD');
    for (const ch of descompuesto) {
      if (ch >= '\u0300' && ch <= '\u036f') continue;
      if (/[\p{L}\p{N}]/u.test(ch)) {
        text += ch;
        map.push(i);
        espacio = false;
      } else if (!espacio) {
        text += ' ';
        map.push(i);
        espacio = true;
      }
    }
  }
  return { text: text.trimEnd(), map };
}

/**
 * Fragmento alrededor de la coincidencia, para mostrar el contexto.
 *
 * Si la frase buscada aparece entera, se centra en ella; si no, en la primera
 * palabra que aparezca.
 */
export function snippet(text: string, tokens: string[], length = 150): string {
  const clean = stripTags(text).replace(/\s+/g, ' ').trim();
  if (!tokens.length) return clean.slice(0, length);

  const { text: haystack, map } = normalizeWithMap(clean);
  let index = tokens.length > 1 ? haystack.indexOf(tokens.join(' ')) : -1;
  if (index === -1) {
    for (const token of tokens) {
      const found = haystack.indexOf(token);
      if (found !== -1 && (index === -1 || found < index)) index = found;
    }
  }
  if (index === -1) return clean.slice(0, length);

  const enOriginal = map[index] ?? 0;
  let start = Math.max(0, enOriginal - Math.floor(length / 3));
  // Que no empiece a mitad de palabra.
  if (start > 0) {
    const espacio = clean.lastIndexOf(' ', start);
    if (espacio !== -1 && enOriginal - espacio < length / 2) start = espacio + 1;
  }
  const end = Math.min(clean.length, start + length);
  return `${start > 0 ? '…' : ''}${clean.slice(start, end).trim()}${end < clean.length ? '…' : ''}`;
}

/**
 * Puntuación sencilla: cuenta apariciones y premia el título.
 *
 * La frase exacta va primero: quien escribe «venid adoremos» quiere antes el
 * texto que lo dice así, seguido, que el que tiene las dos palabras en
 * párrafos distintos.
 */
export function score(tokens: string[], haystack: string, title: string): number {
  if (!tokens.length) return 0;
  const body = normalize(haystack);
  const head = normalize(title);
  let total = 0;

  for (const token of tokens) {
    if (head.includes(token)) total += 10;
    if (head.startsWith(token)) total += 6;
    const matches = body.split(token).length - 1;
    if (matches === 0 && !head.includes(token)) return 0; // exige todos los términos
    total += Math.min(matches, 8);
  }

  if (tokens.length > 1) {
    const frase = tokens.join(' ');
    if (head.includes(frase)) total += 40;
    else if (body.includes(frase)) total += 25;
  }
  return total;
}

/** Envuelve las coincidencias en <mark>, escapando el resto. */
export function highlight(text: string, tokens: string[]): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  if (!tokens.length) return escaped;

  const pattern = tokens
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const source = escaped.normalize('NFD');
  const regex = new RegExp(`(${pattern})`, 'gi');

  /*
   * Se busca sobre la forma sin acentos —«oracion» tiene que encontrar
   * «oración»— pero lo que se devuelve es el texto original.
   *
   * Quitar los acentos acorta la cadena, así que las posiciones de una y otra
   * no coinciden: hace falta guardar, para cada letra de la forma sin
   * acentos, dónde estaba en el original. Sin este puente el resultado salía
   * entero sin tildes, y en español eso se lee como una falta: «senal de la
   * Cruz», «tradicion», «esta».
   */
  const donde: number[] = [];
  let stripped = '';
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i]!;
    if (ch >= '\u0300' && ch <= '\u036f') continue; // marca de combinación
    donde.push(i);
    stripped += ch;
  }
  donde.push(source.length);

  const marks: Array<[number, number]> = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(stripped))) {
    marks.push([match.index, match.index + match[0].length]);
    if (marks.length > 100) break;
  }
  if (!marks.length) return escaped;

  let out = '';
  let cursor = 0;
  for (const [start, end] of marks) {
    if (start < cursor) continue;
    // `donde[end]` es dónde empieza la letra siguiente: así el corte se lleva
    // los acentos de la última letra marcada, que van detrás de ella.
    out +=
      source.slice(donde[cursor]!, donde[start]!) +
      '<mark>' +
      source.slice(donde[start]!, donde[end]!) +
      '</mark>';
    cursor = end;
  }
  return (out + source.slice(donde[cursor]!)).normalize('NFC');
}
