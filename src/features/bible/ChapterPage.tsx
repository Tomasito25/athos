/**
 * Un capítulo de la Escritura, presentado como una página de libro:
 * columna estrecha, serif, márgenes amplios, números de versículo discretos.
 */
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { formatReference, getChapter } from '@/db/bible';
import { BIBLE_VERSIONS, BOOKS_BY_ID, TRANSLATIONS, translationOf } from '@/content/bible';
import { greekNote, greekPlaces } from '@/lib/greek-bible';
import { useSettings, type BibleViewChoice } from '@/stores/settings';
import type { BibleVerse } from '@/types';
import { saveBookmark } from '@/db/user';
import { Button, Notice, Segmented, SourceNote, Skeleton, NotFound } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { Headpiece } from '@/components/Ornament';
import { IconBookmark, IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import { useHashScroll } from '@/hooks/useHashScroll';
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

  // La versión que se lee: el español de ATHOS, el griego de la Iglesia o las dos.
  const vista = useSettings((s) => s.bibleView);
  const ponerAjuste = useSettings((s) => s.set);
  const lugares = greekPlaces(bookId, chapterNumber);
  const griego = useAsync(
    async () =>
      vista === 'es' || !lugares.length
        ? []
        : Promise.all(
            lugares.map(async (l) => ({ lugar: l, versos: await getChapter(l.bookId, l.chapter, l.translationId) })),
          ),
    [bookId, chapterNumber, vista],
  );

  const path = `/leer/biblia/${bookId}/${chapterNumber}`;
  useVisitLog(
    book ? { path, title: `${book.name} ${chapterNumber}`, kind: es.bible.title } : null,
  );
  // Las citas y los resultados de búsqueda llevan al versículo (`#v16`), pero
  // nada bajaba hasta él: se quedaba arriba del capítulo.
  useHashScroll([verses.loading, griego.loading]);

  if (!book) {
    return (
      <div className="page">
        <NotFound title="Ese libro no existe"  to={'/leer/biblia'} />
      </div>
    );
  }

  const previous = chapterNumber > 1 ? chapterNumber - 1 : null;
  const next = chapterNumber < book.chapters ? chapterNumber + 1 : null;

  return (
    <article className="page page--reading">
      <header
        className="page-head--ornate"
        style={{ paddingTop: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}
      >
        <Headpiece />
        <Link to={`/leer/biblia/${book.id}`} className="eyebrow" style={{ textDecoration: 'none' }}>
          {book.name}
        </Link>
        <h1
          className="display"
          style={{ fontSize: 'var(--text-2xl)', margin: 'var(--sp-2) 0' }}
          data-tab-title={`${book.name} ${chapterNumber}`}
        >
          {es.bible.chapter.replace('{{n}}', String(chapterNumber))}
        </h1>

        <ReaderToolbar
          favorite={{
            kind: 'bible-chapter',
            refId: `${bookId}.${chapterNumber}`,
            title: `${book.name} ${chapterNumber}`,
            subtitle: translationOf(bookId).abbr,
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
        <div style={{ marginTop: 'var(--sp-3)' }}>
          <Segmented
            value={vista}
            label={es.bible.version}
            options={BIBLE_VERSIONS.map((v) => ({ value: v.id as BibleViewChoice, label: v.label }))}
            onChange={(v) => ponerAjuste('bibleView', v)}
          />
          {vista !== 'es' && greekNote(bookId) ? <p className="rubric" style={{ marginTop: 'var(--sp-2)' }}>{greekNote(bookId)}</p> : null}
        </div>
      </header>

      {vista !== 'es' && book.status !== 'pending' ? (
        <GreekText
          vista={vista}
          bookId={bookId}
          espanol={verses.data ?? []}
          griego={griego.data ?? []}
          loading={griego.loading || verses.loading}
          error={Boolean(griego.error)}
        />
      ) : book.status === 'pending' ? (
        <Notice variant="pending">{es.app.pending}</Notice>
      ) : verses.loading ? (
        <Skeleton title lines={8} />
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

      {vista !== 'grc' ? <SourceNote meta={translationOf(bookId).meta} status={book.status} /> : null}
      {vista !== 'es' && lugares[0] ? <SourceNote meta={TRANSLATIONS[lugares[0].translationId]!.meta} /> : null}
    </article>
  );
}

/** Libros en los que el griego no se puede alinear versículo a versículo con el español. */
const SIN_ALINEAR = new Set(['PSA', 'PS2', 'JER', 'PRO', 'JOL', 'MAL', 'DAN', 'DAG', 'EST', 'ESG', 'NEH', 'EZR']);

/**
 * El texto griego, solo o junto al español.
 *
 * Con «las dos», donde la numeración coincide —todo el Nuevo Testamento y casi
 * todo el Antiguo— cada versículo español lleva debajo el suyo griego. Donde
 * no coincide se ponen los dos textos uno al lado del otro, sin forzar.
 */
function GreekText({
  vista,
  bookId,
  espanol,
  griego,
  loading,
  error,
}: {
  vista: BibleViewChoice;
  bookId: string;
  espanol: BibleVerse[];
  griego: Array<{ lugar: { label?: string }; versos: BibleVerse[] }>;
  loading: boolean;
  error: boolean;
}) {
  if (loading) return <Skeleton title lines={8} />;
  if (error || !griego.some((g) => g.versos.length)) {
    return <Notice variant="warn">{es.bible.greekOffline}</Notice>;
  }

  const bloquesGriegos = griego.map((g, i) => (
    <div key={i} lang="el" className="bible-greek">
      {g.lugar.label ? <p className="eyebrow">{g.lugar.label}</p> : null}
      {g.versos.map((v) => (
        <p key={v.id}>
          <span className="verse-num">{v.verse}</span>
          {v.text}
        </p>
      ))}
    </div>
  ));

  if (vista === 'grc') return <div className="prose book-surface">{bloquesGriegos}</div>;

  if (griego.length === 1 && !SIN_ALINEAR.has(bookId)) {
    const porNumero = new Map(griego[0]!.versos.map((v) => [v.verse, v]));
    const sobran = griego[0]!.versos.filter((v) => !espanol.some((e) => e.verse === v.verse));
    return (
      <div className="prose book-surface bible-parallel">
        {espanol.map((v) => (
          <div key={v.id} id={`v${v.verse}`} className="bible-parallel__verse">
            <p>
              <span className="verse-num">{v.verse}</span>
              {v.text}
            </p>
            {porNumero.get(v.verse) ? (
              <p lang="el" className="bible-parallel__greek">
                {porNumero.get(v.verse)!.text}
              </p>
            ) : null}
          </div>
        ))}
        {sobran.map((v) => (
          <p key={v.id} lang="el" className="bible-parallel__greek">
            <span className="verse-num">{v.verse}</span>
            {v.text}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="bible-columns">
      <div className="prose book-surface">
        {espanol.map((v) => (
          <p key={v.id} id={`v${v.verse}`}>
            <span className="verse-num">{v.verse}</span>
            {v.text}
          </p>
        ))}
      </div>
      <div className="prose book-surface">{bloquesGriegos}</div>
    </div>
  );
}
