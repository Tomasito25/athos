/**
 * Un capítulo de la Escritura, presentado como una página de libro:
 * columna estrecha, serif, márgenes amplios, números de versículo discretos.
 */
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { formatReference, getChapter } from '@/db/bible';
import { BOOKS_BY_ID, RV1909 } from '@/content/bible';
import { saveBookmark } from '@/db/user';
import { Button, Empty, Loading, Notice, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { IconBookmark, IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function ChapterPage() {
  const { bookId = '', chapter = '1' } = useParams();
  const chapterNumber = Number(chapter);
  const book = BOOKS_BY_ID.get(bookId);
  const toast = useUi((s) => s.toast);

  const verses = useAsync(
    () => (book && book.status !== 'pending' ? getChapter(bookId, chapterNumber) : Promise.resolve([])),
    [bookId, chapterNumber, book?.status],
  );

  const path = `/leer/biblia/${bookId}/${chapterNumber}`;
  useVisitLog(
    book ? { path, title: `${book.name} ${chapterNumber}`, kind: es.bible.title } : null,
  );

  if (!book) {
    return (
      <div className="page">
        <Empty title="Ese libro no existe" />
      </div>
    );
  }

  const previous = chapterNumber > 1 ? chapterNumber - 1 : null;
  const next = chapterNumber < book.chapters ? chapterNumber + 1 : null;

  return (
    <article className="page page--reading">
      <header style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
        <Link to={`/leer/biblia/${book.id}`} className="eyebrow" style={{ textDecoration: 'none' }}>
          {book.name}
        </Link>
        <h1 className="display" style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}>
          {es.bible.chapter.replace('{{n}}', String(chapterNumber))}
        </h1>

        <ReaderToolbar
          favorite={{
            kind: 'bible-chapter',
            refId: `${bookId}.${chapterNumber}`,
            title: `${book.name} ${chapterNumber}`,
            subtitle: RV1909.abbr,
            path,
          }}
          note={{
            targetKind: 'bible-verse',
            targetId: `${bookId}.${chapterNumber}`,
            targetTitle: `${book.name} ${chapterNumber}`,
            path,
          }}
          extraActions={
            <button
              type="button"
              className="icon-btn"
              aria-label={es.bible.bookmark}
              title={es.bible.bookmark}
              onClick={async () => {
                await saveBookmark({
                  kind: 'bible',
                  refId: `${bookId}.${chapterNumber}`,
                  title: `${book.name} ${chapterNumber}`,
                  path,
                });
                toast('Marcador guardado');
              }}
            >
              <IconBookmark size={20} />
            </button>
          }
        />
      </header>

      {book.status === 'pending' ? (
        <Notice variant="pending">{es.app.pending}</Notice>
      ) : verses.loading ? (
        <Loading />
      ) : verses.error ? (
        <Notice variant="warn">
          No se ha podido cargar el texto. Si es la primera vez que abres este libro, hace falta
          conexión; después quedará disponible sin ella.
        </Notice>
      ) : (
        <div className="prose book-surface">
          {verses.data?.map((verse) => (
            <p key={verse.id} id={`v${verse.verse}`}>
              <span className="verse-num">{verse.verse}</span>
              {verse.text}
            </p>
          ))}
        </div>
      )}

      <nav
        className="row row--between"
        style={{ marginTop: 'var(--sp-6)', gap: 'var(--sp-3)' }}
        aria-label="Navegación entre capítulos"
      >
        {previous ? (
          <Link className="btn" to={`/leer/biblia/${bookId}/${previous}`}>
            <IconChevronLeft size={16} /> {formatReference(bookId, previous)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="btn" to={`/leer/biblia/${bookId}/${next}`}>
            {formatReference(bookId, next)} <IconChevronRight size={16} />
          </Link>
        ) : (
          <Button disabled>Fin del libro</Button>
        )}
      </nav>

      <SourceNote meta={RV1909.meta} status={book.status} />
    </article>
  );
}
