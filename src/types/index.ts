/**
 * ATHOS — modelo de datos.
 *
 * Regla fundamental del proyecto: todo contenido religioso lleva su
 * procedencia. Si un texto no está disponible legalmente, se marca como
 * pendiente en lugar de inventarlo.
 */

/* ============================================================
   Procedencia y licencias
   ============================================================ */

export type LicenseId =
  | 'public-domain'
  | 'traditional'
  | 'cc0-1.0'
  | 'cc-by-4.0'
  | 'cc-by-sa-4.0'
  | 'user-imported'
  | 'pending';

export type LanguageCode = 'es' | 'en' | 'el' | 'ru' | 'ro' | 'sr' | 'ka' | 'ar';

/** Metadatos obligatorios de todo contenido (§33 de la especificación). */
export interface SourceMeta {
  title?: string;
  author?: string;
  translator?: string;
  source: string;
  tradition?: string;
  language: LanguageCode;
  license: LicenseId;
  copyright?: string;
  dateAdded: string;
  notes?: string;
}

/**
 * Estado de incorporación de un texto.
 * - `complete`: el texto está íntegro y verificado.
 * - `partial` : hay una parte incorporada; el resto está pendiente.
 * - `pending` : sólo existe la ficha; el texto no se ha incorporado.
 */
export type ContentStatus = 'complete' | 'partial' | 'pending';

/** Un bloque de texto litúrgico. Las rúbricas se marcan aparte del texto orante. */
export interface TextBlock {
  kind: 'text' | 'rubric' | 'heading' | 'verse' | 'refrain' | 'pending';
  content: string;
  /** Número de versículo, estrofa u oda, cuando aplica. */
  ref?: string;
}

/* ============================================================
   Oraciones
   ============================================================ */

export type PrayerCategoryId =
  | 'manana'
  | 'noche'
  | 'antes-comer'
  | 'despues-comer'
  | 'antes-estudiar'
  | 'antes-trabajar'
  | 'antes-viajar'
  | 'arrepentimiento'
  | 'accion-de-gracias'
  | 'tentacion'
  | 'enfermedad'
  | 'familia'
  | 'amigos'
  | 'enemigos'
  | 'difuntos'
  | 'confesion'
  | 'comunion'
  | 'otras';

export interface PrayerCategory {
  id: PrayerCategoryId;
  name: string;
  description: string;
  order: number;
}

export interface Prayer {
  id: string;
  title: string;
  subtitle?: string;
  category: PrayerCategoryId;
  order: number;
  blocks: TextBlock[];
  status: ContentStatus;
  meta: SourceMeta;
  /** Texto plano precalculado para la búsqueda sin conexión. */
  searchText: string;
}

/* ============================================================
   Escritura
   ============================================================ */

export type Testament = 'at' | 'nt';

export type BibleSection =
  | 'pentateuco'
  | 'historicos'
  | 'sapienciales'
  | 'profetas'
  | 'evangelios'
  | 'hechos'
  | 'epistolas'
  | 'apocalipsis';

export interface BibleBook {
  id: string;
  name: string;
  abbr: string;
  testament: Testament;
  section: BibleSection;
  order: number;
  chapters: number;
  /** Libros presentes en la Septuaginta y el canon ortodoxo. */
  deuterocanonical?: boolean;
  alternateNames?: string[];
  status: ContentStatus;
}

export interface BibleChapter {
  /** `${bookId}.${chapter}` */
  id: string;
  bookId: string;
  chapter: number;
  verseCount: number;
  status: ContentStatus;
  translationId: string;
}

export interface BibleVerse {
  /** `${bookId}.${chapter}.${verse}` */
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  translationId: string;
}

export interface BibleTranslation {
  id: string;
  name: string;
  abbr: string;
  meta: SourceMeta;
  /** Verdadero si el usuario la ha importado desde un archivo. */
  imported?: boolean;
}

export interface Psalm {
  /** Numeración de los Setenta (LXX), la usada en el culto ortodoxo. */
  id: number;
  numberLxx: number;
  numberHebrew: number;
  title: string;
  superscription?: string;
  kathisma: number;
  stasis: number;
  blocks: TextBlock[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface Kathisma {
  number: number;
  psalms: number[];
  stases: number[][];
}

/* ============================================================
   Santos y calendario
   ============================================================ */

export type SaintCategory =
  | 'apostol'
  | 'martir'
  | 'granmartir'
  | 'confesor'
  | 'monje'
  | 'obispo'
  | 'profeta'
  | 'justo'
  | 'neomartir'
  | 'padre'
  | 'theotokos'
  | 'senor';

export interface Saint {
  id: string;
  name: string;
  fullName?: string;
  /** Día del calendario fijo: `MM-DD`. */
  day: string;
  /** Días adicionales de conmemoración. */
  otherDays?: string[];
  category: SaintCategory[];
  century?: string;
  place?: string;
  biography: string;
  troparion?: TextBlock[];
  kontakion?: TextBlock[];
  iconId?: string;
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export type FeastRank =
  | 'pascua'
  | 'gran-fiesta'
  | 'fiesta-del-senor'
  | 'fiesta-de-la-theotokos'
  | 'vigilia'
  | 'polieleo'
  | 'menor';

export interface Feast {
  id: string;
  name: string;
  shortName?: string;
  rank: FeastRank;
  /** Fiestas fijas: `MM-DD`. */
  day?: string;
  /** Fiestas móviles: días de diferencia respecto a Pascua. */
  paschaOffset?: number;
  description?: string;
  /** Permite comer pescado aunque caiga en miércoles o viernes. */
  relaxesFast?: boolean;
  iconId?: string;
  status: ContentStatus;
  meta?: SourceMeta;
}

/* ============================================================
   Ayuno
   ============================================================ */

export type FastLevel =
  | 'fast-free'
  | 'dairy'
  | 'fish'
  | 'wine-oil'
  | 'xerophagy'
  | 'strict';

export interface FastAllowance {
  meat: boolean;
  dairy: boolean;
  eggs: boolean;
  fish: boolean;
  oil: boolean;
  wine: boolean;
}

export interface FastingInfo {
  level: FastLevel;
  /** Nombre del periodo, p. ej. «Gran Cuaresma». */
  period: string | null;
  periodId: string | null;
  label: string;
  allowance: FastAllowance;
  reason: string;
}

export interface FastingPeriod {
  id: string;
  name: string;
  description: string;
  /** `movable` se calcula respecto a Pascua; `fixed` respecto al calendario. */
  kind: 'movable' | 'fixed' | 'weekly';
  meta?: SourceMeta;
}

/* ============================================================
   Lecturas
   ============================================================ */

export interface ReadingRef {
  kind: 'evangelio' | 'epistola' | 'at' | 'salmo';
  reference: string;
  /** Identificador interno del pasaje, cuando el texto está incorporado. */
  passageId?: string;
  note?: string;
}

export interface LiturgicalReading {
  /** `pascha:{offset}` o `fixed:{MM-DD}`. */
  id: string;
  key: string;
  title?: string;
  readings: ReadingRef[];
  status: ContentStatus;
  meta?: SourceMeta;
}

/* ============================================================
   Biblioteca litúrgica
   ============================================================ */

export type OfficeKind =
  | 'liturgia'
  | 'visperas'
  | 'maitines'
  | 'completas'
  | 'medianoche'
  | 'horas'
  | 'moleben'
  | 'paraclesis';

export interface Office {
  id: string;
  title: string;
  subtitle?: string;
  kind: OfficeKind;
  order: number;
  sections: OfficeSection[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface OfficeSection {
  id: string;
  title: string;
  blocks: TextBlock[];
  /** Quién dice el texto. */
  voice?: 'sacerdote' | 'diacono' | 'coro' | 'lector' | 'pueblo';
}

export interface Akathist {
  id: string;
  title: string;
  dedication: string;
  sections: OfficeSection[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface Canon {
  id: string;
  title: string;
  dedication: string;
  tone?: number;
  odes: OfficeSection[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface ChurchFather {
  id: string;
  name: string;
  fullName: string;
  century: string;
  feastDay?: string;
  biography: string;
  works: FatherWork[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface FatherWork {
  id: string;
  title: string;
  kind: 'homilia' | 'tratado' | 'carta' | 'sentencias' | 'comentario';
  blocks: TextBlock[];
  status: ContentStatus;
  meta: SourceMeta;
}

/* ============================================================
   Monte Athos e iconografía
   ============================================================ */

export interface Monastery {
  id: string;
  name: string;
  greekName?: string;
  /** Puesto en la jerarquía de los veinte monasterios (1 = Gran Laura). */
  rank: number;
  founded: string;
  tradition: string;
  dedication: string;
  description: string;
  /**
   * Posición esquemática sobre la península para el mapa de la sección Athos.
   * `along` va de 0 (istmo) a 1 (punta del monte). No son coordenadas topográficas.
   */
  location: { side: 'este' | 'oeste' | 'sur'; along: number };
  monks?: string;
  treasures?: string[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export interface AthosArticle {
  id: string;
  title: string;
  topic: 'historia' | 'geografia' | 'hesicasmo' | 'monacato' | 'ancianos' | 'arquitectura';
  blocks: TextBlock[];
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

export type IconCategory = 'cristo' | 'theotokos' | 'santos' | 'fiestas' | 'historicos';

export interface OrthodoxIcon {
  id: string;
  name: string;
  category: IconCategory;
  /** Ruta local o URL. Vacío mientras no haya una imagen con derechos comprobados. */
  image?: string;
  imageCredit?: string;
  history: string;
  meaning: string;
  feastDay?: string;
  place?: string;
  status: ContentStatus;
  meta: SourceMeta;
  searchText: string;
}

/* ============================================================
   Datos del usuario
   ============================================================ */

export type RuleScope = 'diario' | 'domingo' | 'fiesta' | 'ayuno';
export type RuleTime = 'manana' | 'noche' | 'dia';

export interface PrayerRule {
  id: string;
  name: string;
  scope: RuleScope;
  time: RuleTime;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface RuleItem {
  id: string;
  ruleId: string;
  order: number;
  title: string;
  /** Enlace opcional a un texto de la biblioteca. */
  linkKind?: 'prayer' | 'psalm' | 'bible' | 'akathist' | 'canon' | 'office' | 'jesus-prayer';
  linkId?: string;
  /** Repeticiones objetivo, p. ej. 33 oraciones de Jesús. */
  target?: number;
  note?: string;
}

/** Un ítem completado en una fecha concreta. */
export interface RuleCompletion {
  /** `${date}|${itemId}` */
  id: string;
  date: string;
  ruleId: string;
  itemId: string;
  completedAt: string;
  count?: number;
}

export type HabitId =
  | 'oracion-manana'
  | 'oracion-noche'
  | 'biblia'
  | 'salterio'
  | 'oracion-jesus'
  | 'regla'
  | 'ayuno'
  | 'lectura-espiritual'
  | 'liturgia'
  | 'confesion'
  | 'comunion';

export interface Habit {
  id: HabitId | string;
  name: string;
  description?: string;
  order: number;
  active: boolean;
  /** `daily` se espera cada día; `occasional` no penaliza los huecos. */
  cadence: 'daily' | 'weekly' | 'occasional';
  builtIn: boolean;
}

export interface HabitEntry {
  /** `${habitId}|${date}` */
  id: string;
  habitId: string;
  date: string;
  done: boolean;
  note?: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  /** Si está presente, `body` contiene texto cifrado en base64, no texto legible. */
  encryption?: EncryptionEnvelope;
}

export interface EncryptionEnvelope {
  algorithm: 'AES-GCM';
  kdf: 'PBKDF2-SHA256';
  iterations: number;
  salt: string;
  iv: string;
}

export type FavoriteKind =
  | 'prayer'
  | 'psalm'
  | 'verse'
  | 'saint'
  | 'office'
  | 'akathist'
  | 'canon'
  | 'father-work'
  | 'monastery'
  | 'icon'
  | 'athos-article'
  | 'bible-chapter';

export interface Favorite {
  /** `${kind}:${refId}` */
  id: string;
  kind: FavoriteKind;
  refId: string;
  title: string;
  subtitle?: string;
  path: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  kind: 'bible' | 'psalter' | 'office' | 'father-work';
  refId: string;
  title: string;
  path: string;
  position?: number;
  createdAt: string;
}

export interface Note {
  id: string;
  targetKind: FavoriteKind | 'bible-verse' | 'day';
  targetId: string;
  targetTitle: string;
  path: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  path: string;
  title: string;
  kind: string;
  visitedAt: string;
}

export interface JesusPrayerSession {
  id: string;
  startedAt: string;
  endedAt: string;
  count: number;
  target: number | null;
  durationMs: number;
  mode: 'jesus-prayer' | 'chotki';
  /** Fórmula empleada, guardada para que el historial siga siendo legible. */
  formulaId: string;
}

export interface ReadingProgress {
  /** `${planId}` o `bible:${bookId}` */
  id: string;
  kind: 'bible-book' | 'psalter' | 'plan';
  refId: string;
  completed: string[];
  total: number;
  updatedAt: string;
}

export interface SettingRecord<T = unknown> {
  key: string;
  value: T;
  updatedAt: string;
}

/* ============================================================
   Calendario litúrgico (calculado, no almacenado)
   ============================================================ */

export type CalendarStyle = 'nuevo' | 'juliano';

export interface CivilDate {
  year: number;
  month: number;
  day: number;
}

export interface LiturgicalDay {
  /** Fecha civil ISO `YYYY-MM-DD` (gregoriana, la del dispositivo). */
  date: string;
  civil: CivilDate;
  /** Fecha en el calendario eclesiástico elegido, para las fiestas fijas. */
  church: CivilDate;
  calendarStyle: CalendarStyle;
  weekday: number;
  paschaDate: string;
  paschaOffset: number;
  tone: number | null;
  season: LiturgicalSeason;
  feasts: Feast[];
  saints: Saint[];
  fasting: FastingInfo;
  readings: LiturgicalReading | null;
}

export type LiturgicalSeason =
  | 'triodio'
  | 'gran-cuaresma'
  | 'semana-santa'
  | 'pentecostario'
  | 'tiempo-ordinario'
  | 'ayuno-natividad'
  | 'ayuno-apostoles'
  | 'ayuno-dormicion';

/* ============================================================
   Búsqueda
   ============================================================ */

export type SearchKind =
  | 'prayer'
  | 'psalm'
  | 'bible'
  | 'saint'
  | 'father'
  | 'office'
  | 'akathist'
  | 'canon'
  | 'monastery'
  | 'icon'
  | 'athos'
  | 'journal';

export interface SearchResult {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  snippet: string;
  path: string;
  score: number;
}

export interface SearchGroup {
  kind: SearchKind;
  label: string;
  results: SearchResult[];
  total: number;
}
