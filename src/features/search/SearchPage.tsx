import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchAll, KIND_LABELS, type SearchOutcome } from '@/db/search';
import { listHistory } from '@/db/user';
import { useAsync } from '@/hooks/useAsync';
import { Empty, ListRow, Loading, Notice, PageHead, Section } from '@/components/ui';
import { highlight, tokenize } from '@/lib/text';
import type { SearchKind } from '@/types';
import es from '@/locales/es';

/**
 * A dónde lleva cada cosa que se puede buscar.
 *
 * La búsqueda vacía enseñaba un campo y nada más, que es un callejón sin
 * salida: quien llega no sabe qué hay dentro. Esto dice qué se puede buscar y
 * deja entrar a cada sitio directamente.
 */
const DONDE_BUSCA: Array<{ kind: SearchKind; path: string }> = [
  { kind: 'prayer', path: '/orar/oraciones' },
  { kind: 'bible', path: '/leer/biblia' },
  { kind: 'psalm', path: '/leer/salterio' },
  { kind: 'saint', path: '/calendario/santos' },
  { kind: 'office', path: '/biblioteca/liturgia' },
  { kind: 'father', path: '/biblioteca/padres' },
  { kind: 'study', path: '/biblioteca/estudio' },
  { kind: 'athos', path: '/biblioteca/athos' },
  { kind: 'icon', path: '/biblioteca/iconos' },
];

/** Resultados completos de la búsqueda, agrupados por categoría. */
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const [busy, setBusy] = useState(false);

  const trimmed = query.trim();

  useEffect(() => {
    if (trimmed.length < 2) return;
    let alive = true;
    const timer = setTimeout(() => {
      setBusy(true);
      searchAll(trimmed, { limitPerGroup: 30 })
        .then((result) => {
          if (alive) setOutcome(result);
        })
        .finally(() => {
          if (alive) setBusy(false);
        });
    }, 120);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [trimmed]);

  const tokens = tokenize(query);
  const visible = trimmed.length < 2 ? null : outcome;
  const enBlanco = trimmed.length < 2;
  const historial = useAsync(() => listHistory(6), []);

  return (
    <div className="page">
      <PageHead title={es.search.title} subtitle={es.search.hint} />

      <input
        type="search"
        className="input"
        value={query}
        placeholder={es.search.placeholder}
        onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {})}
        aria-label={es.search.placeholder}
        autoFocus
      />

      {busy ? <Loading /> : null}

      {visible?.bibleIndexed === false ? (
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <Notice variant="pending">
            {es.search.bibleNotIndexed} <Link to="/leer/biblia">{es.search.indexNow}</Link>
          </Notice>
        </div>
      ) : null}

      {visible && visible.total === 0 ? (
        <Empty title={es.search.noResults.replace('{{query}}', query)} />
      ) : null}

      {/* Sin nada escrito, la pantalla no se queda muda. */}
      {enBlanco ? (
        <>
          {historial.data && historial.data.length > 0 ? (
            <Section title={es.search.recent}>
              <div className="list">
                {historial.data.map((entrada) => (
                  <ListRow
                    key={entrada.id}
                    to={entrada.path}
                    title={entrada.title}
                    meta={entrada.kind}
                  />
                ))}
              </div>
            </Section>
          ) : null}

          <Section title={es.search.whereTitle}>
            <p className="muted text-sm" style={{ margin: 'calc(-1 * var(--sp-2)) 0 var(--sp-3)' }}>
              {es.search.whereText}
            </p>
            <div className="list">
              {DONDE_BUSCA.map(({ kind, path }) => (
                <ListRow key={kind} to={path} title={KIND_LABELS[kind]} />
              ))}
            </div>
          </Section>
        </>
      ) : null}

      {visible?.groups.map((group) => (
        <Section key={group.kind} title={`${group.label} · ${group.total}`}>
          <div className="list">
            {group.results.map((result) => (
              <Link key={result.id} className="list-item" to={result.path}>
                <span className="list-item__body">
                  <span className="list-item__title">{result.title}</span>
                  <span
                    className="list-item__meta"
                    dangerouslySetInnerHTML={{ __html: highlight(result.snippet, tokens) }}
                  />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
