import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Loading } from '@/components/ui';
import { IconSearch } from '@/components/icons';
import { searchAll } from '@/db/search';
import type { SearchOutcome } from '@/db/search';
import { useUi } from '@/stores/ui';
import { highlight, tokenize } from '@/lib/text';
import es from '@/locales/es';

/** Búsqueda global. Se abre con Ctrl/⌘ + K y funciona sin conexión. */
export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUi();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim();
  const stale = outcome !== null && trimmed.length < 2;

  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || trimmed.length < 2) return;
    let alive = true;
    const timer = setTimeout(() => {
      setBusy(true);
      searchAll(trimmed, { limitPerGroup: 5 })
        .then((result) => {
          if (alive) setOutcome(result);
        })
        .finally(() => {
          if (alive) setBusy(false);
        });
    }, 180);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [trimmed, searchOpen]);

  const close = useCallback(() => {
    setSearchOpen(false);
    setQuery('');
    setOutcome(null);
  }, [setSearchOpen]);

  const go = useCallback(
    (path: string) => {
      close();
      navigate(path);
    },
    [close, navigate],
  );

  const tokens = tokenize(query);
  const visible = stale ? null : outcome;

  return (
    <Dialog open={searchOpen} onClose={close} title={es.search.title}>
      <div className="row" style={{ marginBottom: 'var(--sp-4)' }}>
        <IconSearch size={20} style={{ color: 'var(--ink-muted)', flex: 'none' }} />
        <input
          ref={inputRef}
          type="search"
          className="input"
          placeholder={es.search.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && visible?.groups[0]?.results[0]) {
              go(visible.groups[0].results[0].path);
            }
          }}
          aria-label={es.search.placeholder}
        />
      </div>

      {trimmed.length < 2 ? (
        <p className="muted text-sm">{es.search.hint}</p>
      ) : busy && !visible ? (
        <Loading />
      ) : visible && visible.total === 0 ? (
        <p className="muted text-sm">{es.search.noResults.replace('{{query}}', trimmed)}</p>
      ) : (
        <div className="stack stack--loose">
          {visible?.bibleIndexed === false ? (
            <p className="notice notice--pending">{es.search.bibleNotIndexed}</p>
          ) : null}

          {visible?.groups.map((group) => (
            <section key={group.kind}>
              <div className="section__head">
                <h3 className="section__title">{group.label}</h3>
                <span className="pill-count">{group.total}</span>
              </div>
              <div className="list">
                {group.results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    className="list-item"
                    onClick={() => go(result.path)}
                  >
                    <span className="list-item__body">
                      <span className="list-item__title">{result.title}</span>
                      <span
                        className="list-item__meta"
                        dangerouslySetInnerHTML={{ __html: highlight(result.snippet, tokens) }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}

          {visible && visible.total > 0 ? (
            <button
              type="button"
              className="btn btn--block"
              onClick={() => go(`/buscar?q=${encodeURIComponent(trimmed)}`)}
            >
              {es.search.seeAll.replace('{{count}}', String(visible.total))}
            </button>
          ) : null}
        </div>
      )}
    </Dialog>
  );
}
