/**
 * Canon bíblico ortodoxo.
 *
 * ATHOS distingue entre la *estructura* del canon —que se muestra siempre— y
 * el *texto* disponible. La traducción incorporada es la Reina-Valera de 1909,
 * de dominio público, que sigue el canon hebreo corto: los libros
 * deuterocanónicos de la Septuaginta figuran en la lista con su ficha, pero su
 * texto aparece como pendiente hasta que se incorpore una traducción con
 * licencia compatible.
 */
import type { BibleBook, BibleSection, BibleTranslation, Testament } from '@/types';

export const RV1909: BibleTranslation = {
  id: 'rv1909',
  name: 'Reina-Valera 1909',
  abbr: 'RV1909',
  meta: {
    title: 'La Santa Biblia, versión de Casiodoro de Reina revisada por Cipriano de Valera',
    translator: 'Casiodoro de Reina; revisión de 1909',
    source: 'Edición de 1909 — texto digitalizado en formato USFX (proyecto open-bibles)',
    language: 'es',
    license: 'public-domain',
    copyright: 'Dominio público. Publicada en 1909.',
    dateAdded: '2026-01-01',
    notes:
      'Sigue el canon hebreo corto y la numeración hebrea de los Salmos. ATHOS muestra además la numeración de los Setenta, que es la usada en el culto ortodoxo.',
  },
};

export const SECTION_LABELS: Record<BibleSection, string> = {
  pentateuco: 'Pentateuco',
  historicos: 'Libros históricos',
  sapienciales: 'Libros sapienciales',
  profetas: 'Profetas',
  evangelios: 'Evangelios',
  hechos: 'Hechos de los Apóstoles',
  epistolas: 'Epístolas',
  apocalipsis: 'Apocalipsis',
};

export const TESTAMENT_LABELS: Record<Testament, string> = {
  at: 'Antiguo Testamento',
  nt: 'Nuevo Testamento',
};

interface BookSeed {
  id: string;
  name: string;
  abbr: string;
  testament: Testament;
  section: BibleSection;
  chapters: number;
  deutero?: boolean;
  alt?: string[];
}

/** Orden del canon ortodoxo. `id` coincide con el código USFX del texto. */
const SEED: BookSeed[] = [
  // --- Pentateuco ---
  { id: 'GEN', name: 'Génesis', abbr: 'Gn', testament: 'at', section: 'pentateuco', chapters: 50 },
  { id: 'EXO', name: 'Éxodo', abbr: 'Ex', testament: 'at', section: 'pentateuco', chapters: 40 },
  { id: 'LEV', name: 'Levítico', abbr: 'Lv', testament: 'at', section: 'pentateuco', chapters: 27 },
  { id: 'NUM', name: 'Números', abbr: 'Nm', testament: 'at', section: 'pentateuco', chapters: 36 },
  { id: 'DEU', name: 'Deuteronomio', abbr: 'Dt', testament: 'at', section: 'pentateuco', chapters: 34 },
  // --- Históricos ---
  { id: 'JOS', name: 'Josué', abbr: 'Jos', testament: 'at', section: 'historicos', chapters: 24 },
  { id: 'JDG', name: 'Jueces', abbr: 'Jc', testament: 'at', section: 'historicos', chapters: 21 },
  { id: 'RUT', name: 'Rut', abbr: 'Rt', testament: 'at', section: 'historicos', chapters: 4 },
  { id: '1SA', name: '1 Samuel', abbr: '1 S', testament: 'at', section: 'historicos', chapters: 31, alt: ['1 Reyes (LXX)'] },
  { id: '2SA', name: '2 Samuel', abbr: '2 S', testament: 'at', section: 'historicos', chapters: 24, alt: ['2 Reyes (LXX)'] },
  { id: '1KI', name: '1 Reyes', abbr: '1 R', testament: 'at', section: 'historicos', chapters: 22, alt: ['3 Reyes (LXX)'] },
  { id: '2KI', name: '2 Reyes', abbr: '2 R', testament: 'at', section: 'historicos', chapters: 25, alt: ['4 Reyes (LXX)'] },
  { id: '1CH', name: '1 Crónicas', abbr: '1 Cr', testament: 'at', section: 'historicos', chapters: 29, alt: ['1 Paralipómenos'] },
  { id: '2CH', name: '2 Crónicas', abbr: '2 Cr', testament: 'at', section: 'historicos', chapters: 36, alt: ['2 Paralipómenos'] },
  { id: '1ES', name: '1 Esdras', abbr: '1 Esd', testament: 'at', section: 'historicos', chapters: 9, deutero: true },
  { id: 'EZR', name: 'Esdras', abbr: 'Esd', testament: 'at', section: 'historicos', chapters: 10, alt: ['2 Esdras (LXX)'] },
  { id: 'NEH', name: 'Nehemías', abbr: 'Ne', testament: 'at', section: 'historicos', chapters: 13 },
  { id: 'TOB', name: 'Tobías', abbr: 'Tb', testament: 'at', section: 'historicos', chapters: 14, deutero: true },
  { id: 'JDT', name: 'Judit', abbr: 'Jdt', testament: 'at', section: 'historicos', chapters: 16, deutero: true },
  { id: 'EST', name: 'Ester', abbr: 'Est', testament: 'at', section: 'historicos', chapters: 10 },
  { id: '1MA', name: '1 Macabeos', abbr: '1 M', testament: 'at', section: 'historicos', chapters: 16, deutero: true },
  { id: '2MA', name: '2 Macabeos', abbr: '2 M', testament: 'at', section: 'historicos', chapters: 15, deutero: true },
  { id: '3MA', name: '3 Macabeos', abbr: '3 M', testament: 'at', section: 'historicos', chapters: 7, deutero: true },
  // --- Sapienciales ---
  { id: 'JOB', name: 'Job', abbr: 'Jb', testament: 'at', section: 'sapienciales', chapters: 42 },
  { id: 'PSA', name: 'Salmos', abbr: 'Sal', testament: 'at', section: 'sapienciales', chapters: 150 },
  { id: 'MAN', name: 'Oración de Manasés', abbr: 'Man', testament: 'at', section: 'sapienciales', chapters: 1, deutero: true },
  { id: 'PRO', name: 'Proverbios', abbr: 'Pr', testament: 'at', section: 'sapienciales', chapters: 31 },
  { id: 'ECC', name: 'Eclesiastés', abbr: 'Ec', testament: 'at', section: 'sapienciales', chapters: 12 },
  { id: 'SNG', name: 'Cantar de los Cantares', abbr: 'Ct', testament: 'at', section: 'sapienciales', chapters: 8 },
  { id: 'WIS', name: 'Sabiduría de Salomón', abbr: 'Sb', testament: 'at', section: 'sapienciales', chapters: 19, deutero: true },
  { id: 'SIR', name: 'Eclesiástico (Sirácida)', abbr: 'Si', testament: 'at', section: 'sapienciales', chapters: 51, deutero: true },
  // --- Profetas ---
  { id: 'HOS', name: 'Oseas', abbr: 'Os', testament: 'at', section: 'profetas', chapters: 14 },
  { id: 'AMO', name: 'Amós', abbr: 'Am', testament: 'at', section: 'profetas', chapters: 9 },
  { id: 'MIC', name: 'Miqueas', abbr: 'Mi', testament: 'at', section: 'profetas', chapters: 7 },
  { id: 'JOL', name: 'Joel', abbr: 'Jl', testament: 'at', section: 'profetas', chapters: 3 },
  { id: 'OBA', name: 'Abdías', abbr: 'Abd', testament: 'at', section: 'profetas', chapters: 1 },
  { id: 'JON', name: 'Jonás', abbr: 'Jon', testament: 'at', section: 'profetas', chapters: 4 },
  { id: 'NAM', name: 'Nahúm', abbr: 'Na', testament: 'at', section: 'profetas', chapters: 3 },
  { id: 'HAB', name: 'Habacuc', abbr: 'Ha', testament: 'at', section: 'profetas', chapters: 3 },
  { id: 'ZEP', name: 'Sofonías', abbr: 'So', testament: 'at', section: 'profetas', chapters: 3 },
  { id: 'HAG', name: 'Ageo', abbr: 'Ag', testament: 'at', section: 'profetas', chapters: 2 },
  { id: 'ZEC', name: 'Zacarías', abbr: 'Za', testament: 'at', section: 'profetas', chapters: 14 },
  { id: 'MAL', name: 'Malaquías', abbr: 'Ml', testament: 'at', section: 'profetas', chapters: 4 },
  { id: 'ISA', name: 'Isaías', abbr: 'Is', testament: 'at', section: 'profetas', chapters: 66 },
  { id: 'JER', name: 'Jeremías', abbr: 'Jr', testament: 'at', section: 'profetas', chapters: 52 },
  { id: 'BAR', name: 'Baruc', abbr: 'Ba', testament: 'at', section: 'profetas', chapters: 5, deutero: true },
  { id: 'LAM', name: 'Lamentaciones', abbr: 'Lm', testament: 'at', section: 'profetas', chapters: 5 },
  { id: 'LJE', name: 'Carta de Jeremías', abbr: 'CJr', testament: 'at', section: 'profetas', chapters: 1, deutero: true },
  { id: 'EZK', name: 'Ezequiel', abbr: 'Ez', testament: 'at', section: 'profetas', chapters: 48 },
  { id: 'DAN', name: 'Daniel', abbr: 'Dn', testament: 'at', section: 'profetas', chapters: 12 },
  { id: '4MA', name: '4 Macabeos', abbr: '4 M', testament: 'at', section: 'historicos', chapters: 18, deutero: true },
  // --- Evangelios ---
  { id: 'MAT', name: 'Evangelio según San Mateo', abbr: 'Mt', testament: 'nt', section: 'evangelios', chapters: 28, alt: ['Mateo', 'Matt', 'Matthew', 'San Mateo'] },
  { id: 'MRK', name: 'Evangelio según San Marcos', abbr: 'Mc', testament: 'nt', section: 'evangelios', chapters: 16, alt: ['Marcos', 'Mark', 'San Marcos'] },
  { id: 'LUK', name: 'Evangelio según San Lucas', abbr: 'Lc', testament: 'nt', section: 'evangelios', chapters: 24, alt: ['Lucas', 'Luke', 'San Lucas'] },
  { id: 'JHN', name: 'Evangelio según San Juan', abbr: 'Jn', testament: 'nt', section: 'evangelios', chapters: 21, alt: ['Juan', 'John', 'San Juan'] },
  // --- Hechos ---
  { id: 'ACT', name: 'Hechos de los Apóstoles', abbr: 'Hch', testament: 'nt', section: 'hechos', chapters: 28 },
  // --- Epístolas ---
  { id: 'JAS', name: 'Santiago', abbr: 'St', testament: 'nt', section: 'epistolas', chapters: 5 },
  { id: '1PE', name: '1 Pedro', abbr: '1 P', testament: 'nt', section: 'epistolas', chapters: 5 },
  { id: '2PE', name: '2 Pedro', abbr: '2 P', testament: 'nt', section: 'epistolas', chapters: 3 },
  { id: '1JN', name: '1 Juan', abbr: '1 Jn', testament: 'nt', section: 'epistolas', chapters: 5 },
  { id: '2JN', name: '2 Juan', abbr: '2 Jn', testament: 'nt', section: 'epistolas', chapters: 1 },
  { id: '3JN', name: '3 Juan', abbr: '3 Jn', testament: 'nt', section: 'epistolas', chapters: 1 },
  { id: 'JUD', name: 'Judas', abbr: 'Jds', testament: 'nt', section: 'epistolas', chapters: 1 },
  { id: 'ROM', name: 'Romanos', abbr: 'Rm', testament: 'nt', section: 'epistolas', chapters: 16 },
  { id: '1CO', name: '1 Corintios', abbr: '1 Co', testament: 'nt', section: 'epistolas', chapters: 16 },
  { id: '2CO', name: '2 Corintios', abbr: '2 Co', testament: 'nt', section: 'epistolas', chapters: 13 },
  { id: 'GAL', name: 'Gálatas', abbr: 'Ga', testament: 'nt', section: 'epistolas', chapters: 6 },
  { id: 'EPH', name: 'Efesios', abbr: 'Ef', testament: 'nt', section: 'epistolas', chapters: 6 },
  { id: 'PHP', name: 'Filipenses', abbr: 'Flp', testament: 'nt', section: 'epistolas', chapters: 4 },
  { id: 'COL', name: 'Colosenses', abbr: 'Col', testament: 'nt', section: 'epistolas', chapters: 4 },
  { id: '1TH', name: '1 Tesalonicenses', abbr: '1 Ts', testament: 'nt', section: 'epistolas', chapters: 5 },
  { id: '2TH', name: '2 Tesalonicenses', abbr: '2 Ts', testament: 'nt', section: 'epistolas', chapters: 3 },
  { id: '1TI', name: '1 Timoteo', abbr: '1 Tm', testament: 'nt', section: 'epistolas', chapters: 6 },
  { id: '2TI', name: '2 Timoteo', abbr: '2 Tm', testament: 'nt', section: 'epistolas', chapters: 4 },
  { id: 'TIT', name: 'Tito', abbr: 'Tt', testament: 'nt', section: 'epistolas', chapters: 3 },
  { id: 'PHM', name: 'Filemón', abbr: 'Flm', testament: 'nt', section: 'epistolas', chapters: 1 },
  { id: 'HEB', name: 'Hebreos', abbr: 'Hb', testament: 'nt', section: 'epistolas', chapters: 13 },
  // --- Apocalipsis ---
  { id: 'REV', name: 'Apocalipsis', abbr: 'Ap', testament: 'nt', section: 'apocalipsis', chapters: 22 },
];

export const BIBLE_BOOKS: BibleBook[] = SEED.map((b, i) => ({
  id: b.id,
  name: b.name,
  abbr: b.abbr,
  testament: b.testament,
  section: b.section,
  order: i + 1,
  chapters: b.chapters,
  deuterocanonical: b.deutero,
  alternateNames: b.alt,
  // Los deuterocanónicos no están en la Reina-Valera 1909.
  status: b.deutero ? 'pending' : 'complete',
}));

export const BOOKS_BY_ID = new Map(BIBLE_BOOKS.map((b) => [b.id, b]));

export const NT_ORDER: BibleSection[] = ['evangelios', 'hechos', 'epistolas', 'apocalipsis'];
export const AT_ORDER: BibleSection[] = ['pentateuco', 'historicos', 'sapienciales', 'profetas'];

export const DEUTEROCANON_NOTE =
  'La traducción incorporada (Reina-Valera 1909) sigue el canon hebreo corto y no incluye ' +
  'los libros deuterocanónicos de la Septuaginta. Su ficha se mantiene para que el canon ' +
  'ortodoxo aparezca completo; el texto puede añadirse desde Configuración → Datos.';

/**
 * Resuelve nombres y abreviaturas a un identificador de libro.
 *
 * Se prueba primero lo exacto —identificador, nombre, abreviatura y nombres
 * alternativos— y sólo después la coincidencia parcial, para que «Juan» dé el
 * Evangelio y no la primera epístola que lo lleve en el nombre.
 *
 * Los nombres alternativos existían en el modelo pero no se consultaban aquí:
 * por eso el leccionario no resolvía «Matt», la abreviatura inglesa que
 * orthocal deja sin traducir en los Evangelios de la Pasión.
 */
export function findBook(query: string): BibleBook | undefined {
  const q = query.trim().toLowerCase();
  const exacto = BIBLE_BOOKS.find(
    (b) =>
      b.id.toLowerCase() === q ||
      b.name.toLowerCase() === q ||
      b.abbr.toLowerCase() === q ||
      (b.alternateNames ?? []).some((alt) => alt.toLowerCase() === q),
  );
  return exacto ?? BIBLE_BOOKS.find((b) => b.name.toLowerCase().includes(q));
}
