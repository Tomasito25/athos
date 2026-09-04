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

/** Fragmento alrededor de la primera coincidencia, para mostrar el contexto. */
export function snippet(text: string, tokens: string[], length = 150): string {
  const clean = stripTags(text).replace(/\s+/g, ' ').trim();
  if (!tokens.length) return clean.slice(0, length);

  const haystack = normalize(clean);
  let index = -1;
  for (const token of tokens) {
    const found = haystack.indexOf(token);
    if (found !== -1 && (index === -1 || found < index)) index = found;
  }
  if (index === -1) return clean.slice(0, length);

  const start = Math.max(0, index - Math.floor(length / 3));
  const end = Math.min(clean.length, start + length);
  return `${start > 0 ? '…' : ''}${clean.slice(start, end).trim()}${end < clean.length ? '…' : ''}`;
}

/** Puntuación sencilla: cuenta apariciones y premia el título. */
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

export function pluralize(count: number, one: string, many: string): string {
  return count === 1 ? one : many;
}
