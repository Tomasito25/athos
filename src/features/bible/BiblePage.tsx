import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { bibleIndexStatus, indexWholeBible } from '@/db/bible';
import { AT_ORDER, BIBLE_BOOKS, DEUTEROCANON_NOTE, NT_ORDER, RV1909, SECTION_LABELS, TESTAMENT_LABELS } from '@/content/bible';
import { Button, ListRow, Notice, PageHead, Progress, Section, StatusTag, Tag } from '@/components/ui';
import { normalize } from '@/lib/text';
import { useUi } from '@/stores/ui';
import type { BibleSection, Testament } from '@/types';
import es from '@/locales/es';

/** Índice de la Escritura, agrupado por testamento y sección. */
export function BiblePage() {
  const [query, setQuery] = useState('');
  const [indexing, setIndexing] = useState<{ done: number; total: number } | null>(null);
  const status = useAsync(() => bibleIndexStatus(), [indexing?.done]);
  const toast = useUi((s) => s.toast);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return null;
    return BIBLE_BOOKS.filter((book) =>
      normalize(`${book.name} ${book.abbr} ${(book.alternateNames ?? []).join(' ')}`).includes(needle),
    );
  }, [query]);

  const runIndex = async () => {
    setIndexing({ done: 0, total: BIBLE_BOOKS.length });
    await indexWholeBible((progress) => setIndexing(progress));
    setIndexing(null);
    status.reload();
    toast(es.bible.indexed);
  };

  const groups: Array<[Testament, BibleSection[]]> = [
    ['at', AT_ORDER],
    ['nt', NT_ORDER],
  ];

  return (
    <div className="page">
      <PageHead title={es.bible.title} subtitle={`${RV1909.name} · ${es.licenses['public-domain']}`} />

      <input
        type="search"
        className="input"
        placeholder="Buscar un libro…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar un libro"
      />

      {status.data && status.data.done < status.data.total ? (
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <Notice>
            <div style={{ flex: 1 }}>
              <p>{es.bible.indexPrompt}</p>
              {indexing ? (
                <div style={{ marginTop: 'var(--sp-2)' }}>
                  <Progress value={indexing.done / indexing.total} label={es.bible.indexing} />
                </div>
              ) : (
                <Button size="sm" style={{ marginTop: 'var(--sp-2)' }} onClick={runIndex}>
                  {es.search.indexNow}
                </Button>
              )}
            </div>
          </Notice>
        </div>
      ) : null}

      {filtered ? (
        <Section title={`${filtered.length} libros`}>
          <div className="list">
            {filtered.map((book) => (
              <ListRow
                key={book.id}
                to={`/leer/biblia/${book.id}`}
                title={book.name}
                meta={`${book.chapters} capítulos`}
                trailing={<StatusTag status={book.status} />}
              />
            ))}
          </div>
        </Section>
      ) : (
        groups.map(([testament, sections]) => (
          <div key={testament}>
            <h2
              className="display"
              style={{ fontSize: 'var(--text-xl)', margin: 'var(--sp-6) 0 var(--sp-2)' }}
            >
              {TESTAMENT_LABELS[testament]}
            </h2>
            {sections.map((section) => {
              const books = BIBLE_BOOKS.filter(
                (book) => book.testament === testament && book.section === section,
              );
              if (!books.length) return null;
              return (
                <Section key={section} title={SECTION_LABELS[section]}>
                  <div className="grid">
                    {books.map((book) => (
                      <Link
                        key={book.id}
                        className="card"
                        to={`/leer/biblia/${book.id}`}
                        style={{ opacity: book.status === 'pending' ? 0.62 : 1 }}
                      >
                        <span className="card__title">{book.name}</span>
                        <span className="card__text">
                          {book.chapters} {book.chapters === 1 ? 'capítulo' : 'capítulos'}
                        </span>
                        {book.deuterocanonical ? (
                          <span>
                            <Tag>{es.bible.deuterocanon}</Tag>
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </Section>
              );
            })}
          </div>
        ))
      )}

      <p className="source-note">{DEUTEROCANON_NOTE}</p>
    </div>
  );
}
