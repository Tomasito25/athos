/**
 * Búsqueda global sin conexión.
 *
 * Recorre las tablas de contenido y el diario del usuario. La Biblia se
 * consulta sólo si está indexada; si no lo está, el grupo correspondiente
 * lo indica en lugar de devolver resultados incompletos en silencio.
 */
import type { SearchGroup, SearchKind, SearchResult } from '@/types';
import { normalize, score, snippet, stripTags, tokenize } from '@/lib/text';
import { db } from './db';
import { formatReference } from './bible';
import { BOOKS_BY_ID } from '@/content/bible';

export const KIND_LABELS: Record<SearchKind, string> = {
  prayer: 'Oraciones',
  psalm: 'Salterio',
  bible: 'Biblia',
  saint: 'Santos',
  father: 'Padres de la Iglesia',
  office: 'Liturgia',
  akathist: 'Akathistos',
  canon: 'Cánones',
  monastery: 'Monasterios',
  icon: 'Iconos',
  athos: 'Monte Athos',
};

/** Orden en que se presentan los grupos de resultados. */
const KIND_ORDER: SearchKind[] = [
  'prayer',
  'bible',
  'psalm',
  'saint',
  'office',
  'akathist',
  'canon',
  'father',
  'athos',
  'monastery',
  'icon',
];

export interface SearchOptions {
  limitPerGroup?: number;
  kinds?: SearchKind[];
}

export interface SearchOutcome {
  groups: SearchGroup[];
  total: number;
  bibleIndexed: boolean;
}

const BIBLE_SCAN_LIMIT = 400;

export async function searchAll(query: string, options: SearchOptions = {}): Promise<SearchOutcome> {
  const tokens = tokenize(query);
  const limit = options.limitPerGroup ?? 8;
  const wanted = new Set(options.kinds ?? KIND_ORDER);

  if (!tokens.length) return { groups: [], total: 0, bibleIndexed: true };

  const buckets = new Map<SearchKind, SearchResult[]>();
  const push = (kind: SearchKind, result: SearchResult) => {
    if (!wanted.has(kind)) return;
    const list = buckets.get(kind) ?? [];
    list.push(result);
    buckets.set(kind, list);
  };

  /* ---- Oraciones ---- */
  if (wanted.has('prayer')) {
    for (const p of await db.prayers.toArray()) {
      const s = score(tokens, p.searchText, p.title);
      if (s > 0) {
        push('prayer', {
          id: p.id,
          kind: 'prayer',
          title: p.title,
          subtitle: p.subtitle,
          snippet: snippet(p.blocks.map((b) => b.content).join(' '), tokens),
          path: `/orar/oraciones/${p.id}`,
          score: s,
        });
      }
    }
  }

  /* ---- Salterio ---- */
  if (wanted.has('psalm')) {
    for (const p of await db.psalms.toArray()) {
      const s = score(tokens, p.searchText, p.title);
      if (s > 0) {
        push('psalm', {
          id: String(p.id),
          kind: 'psalm',
          title: `Salmo ${p.numberLxx}`,
          subtitle: `Kathisma ${p.kathisma} · ${p.numberHebrew} hebreo`,
          snippet: snippet(p.blocks.map((b) => b.content).join(' '), tokens),
          path: `/leer/salterio/${p.numberLxx}`,
          score: s,
        });
      }
    }
  }

  /* ---- Santos ---- */
  if (wanted.has('saint')) {
    for (const s0 of await db.saints.toArray()) {
      const s = score(tokens, s0.searchText, s0.name);
      if (s > 0) {
        push('saint', {
          id: s0.id,
          kind: 'saint',
          title: s0.name,
          subtitle: s0.century ? `Siglo ${s0.century}` : undefined,
          snippet: snippet(s0.biography, tokens),
          path: `/calendario/santos/${s0.id}`,
          score: s,
        });
      }
    }
  }

  /* ---- Padres ---- */
  if (wanted.has('father')) {
    for (const f of await db.church_fathers.toArray()) {
      const s = score(tokens, f.searchText, f.name);
      if (s > 0) {
        push('father', {
          id: f.id,
          kind: 'father',
          title: f.name,
          subtitle: f.century,
          snippet: snippet(f.biography, tokens),
          path: `/biblioteca/padres/${f.id}`,
          score: s,
        });
      }
    }
  }

  /* ---- Oficios, akathistos, cánones ---- */
  if (wanted.has('office')) {
    for (const o of await db.liturgies.toArray()) {
      const s = score(tokens, o.searchText, o.title);
      if (s > 0) {
        push('office', {
          id: o.id,
          kind: 'office',
          title: o.title,
          subtitle: o.subtitle,
          snippet: snippet(o.sections.flatMap((x) => x.blocks.map((b) => b.content)).join(' '), tokens),
          path: `/biblioteca/liturgia/${o.id}`,
          score: s,
        });
      }
    }
  }

  if (wanted.has('akathist')) {
    for (const a of await db.akathists.toArray()) {
      const s = score(tokens, a.searchText, a.title);
      if (s > 0) {
        push('akathist', {
          id: a.id,
          kind: 'akathist',
          title: a.title,
          subtitle: a.dedication,
          snippet: snippet(a.sections.flatMap((x) => x.blocks.map((b) => b.content)).join(' '), tokens),
          path: `/biblioteca/akathistos/${a.id}`,
          score: s,
        });
      }
    }
  }

  if (wanted.has('canon')) {
    for (const c of await db.canons.toArray()) {
      const s = score(tokens, c.searchText, c.title);
      if (s > 0) {
        push('canon', {
          id: c.id,
          kind: 'canon',
          title: c.title,
          subtitle: c.dedication,
          snippet: snippet(c.odes.flatMap((x) => x.blocks.map((b) => b.content)).join(' '), tokens),
          path: `/biblioteca/canones/${c.id}`,
          score: s,
        });
      }
    }
  }

  /* ---- Monte Athos ---- */
  if (wanted.has('monastery')) {
    for (const m of await db.monasteries.toArray()) {
      const s = score(tokens, m.searchText, m.name);
      if (s > 0) {
        push('monastery', {
          id: m.id,
          kind: 'monastery',
          title: m.name,
          subtitle: `${m.rank}.º · ${m.tradition}`,
          snippet: snippet(m.description, tokens),
          path: `/biblioteca/athos/monasterio/${m.id}`,
          score: s,
        });
      }
    }
  }

  if (wanted.has('athos')) {
    for (const a of await db.athos_articles.toArray()) {
      const s = score(tokens, a.searchText, a.title);
      if (s > 0) {
        push('athos', {
          id: a.id,
          kind: 'athos',
          title: a.title,
          snippet: snippet(a.blocks.map((b) => b.content).join(' '), tokens),
          path: `/biblioteca/athos/${a.id}`,
          score: s,
        });
      }
    }
  }

  if (wanted.has('icon')) {
    for (const i of await db.icons.toArray()) {
      const s = score(tokens, i.searchText, i.name);
      if (s > 0) {
        push('icon', {
          id: i.id,
          kind: 'icon',
          title: i.name,
          subtitle: i.place,
          snippet: snippet(i.meaning, tokens),
          path: `/biblioteca/iconos/${i.id}`,
          score: s,
        });
      }
    }
  }

  /* ---- Biblia ---- */
  let bibleIndexed = true;
  if (wanted.has('bible')) {
    const verseCount = await db.bible_verses.count();
    bibleIndexed = verseCount > 0;
    if (bibleIndexed) {
      const needles = tokens;
      const found: SearchResult[] = [];
      await db.bible_verses.each((verse) => {
        if (found.length >= BIBLE_SCAN_LIMIT) return;
        const body = normalize(verse.text);
        if (needles.every((token) => body.includes(token))) {
          const book = BOOKS_BY_ID.get(verse.bookId);
          found.push({
            id: verse.id,
            kind: 'bible',
            title: formatReference(verse.bookId, verse.chapter, verse.verse),
            subtitle: book?.name,
            snippet: snippet(verse.text, tokens, 190),
            path: `/leer/biblia/${verse.bookId}/${verse.chapter}#v${verse.verse}`,
            score: 5 + needles.length,
          });
        }
      });
      for (const result of found) push('bible', result);
    }
  }

  const groups: SearchGroup[] = [];
  let total = 0;
  for (const kind of KIND_ORDER) {
    const results = buckets.get(kind);
    if (!results?.length) continue;
    results.sort((a, b) => b.score - a.score);
    total += results.length;
    groups.push({
      kind,
      label: KIND_LABELS[kind],
      results: results.slice(0, limit),
      total: results.length,
    });
  }

  return { groups, total, bibleIndexed };
}

export { stripTags };
