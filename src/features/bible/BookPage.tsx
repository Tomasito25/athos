import { Link, useParams } from 'react-router-dom';
import { BOOKS_BY_ID, SECTION_LABELS } from '@/content/bible';
import { Empty, Notice, PageHead, Section } from '@/components/ui';
import es from '@/locales/es';

/** Rejilla de capítulos de un libro. */
export function BookPage() {
  const { bookId = '' } = useParams();
  const book = BOOKS_BY_ID.get(bookId);

  if (!book) {
    return (
      <div className="page">
        <Empty title="Ese libro no existe" />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead
        eyebrow={SECTION_LABELS[book.section]}
        title={book.name}
        subtitle={book.alternateNames?.length ? `También llamado ${book.alternateNames.join(', ')}` : undefined}
      />

      {book.status === 'pending' ? (
        <Notice variant="pending">
          Este libro forma parte del canon ortodoxo, pero no está en la Reina-Valera 1909.{' '}
          {es.app.pending}
        </Notice>
      ) : (
        <Section title={es.bible.chapters}>
          <div
            style={{
              display: 'grid',
              gap: 'var(--sp-2)',
              gridTemplateColumns: 'repeat(auto-fill, minmax(3.25rem, 1fr))',
            }}
          >
            {Array.from({ length: book.chapters }, (_, index) => index + 1).map((chapter) => (
              <Link
                key={chapter}
                to={`/leer/biblia/${book.id}/${chapter}`}
                className="btn"
                style={{ minHeight: '3rem', padding: 0, fontFamily: 'var(--font-serif)' }}
              >
                {chapter}
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
