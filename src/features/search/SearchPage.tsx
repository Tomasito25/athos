import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchAll, type SearchOutcome } from '@/db/search';
import { Empty, Loading, Notice, PageHead, Section } from '@/components/ui';
import { highlight, tokenize } from '@/lib/text';
import es from '@/locales/es';

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
