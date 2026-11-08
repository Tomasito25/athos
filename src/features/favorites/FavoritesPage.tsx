import { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { listBookmarks, listFavorites, listNotes, removeBookmark, removeNote } from '@/db/user';
import { KIND_LABELS } from '@/db/search';
import { Button, Empty, ListRow, PageHead, Panel, Section, Segmented, SkeletonList } from '@/components/ui';
import { IconTrash } from '@/components/icons';
import es from '@/locales/es';

type Tab = 'favoritos' | 'marcadores' | 'notas';

const TABS: Array<{ value: Tab; label: string }> = [
  { value: 'favoritos', label: es.favorites.title },
  { value: 'marcadores', label: es.favorites.bookmarks },
  { value: 'notas', label: es.favorites.notes },
];

const FAVORITE_LABELS: Record<string, string> = {
  prayer: KIND_LABELS.prayer,
  psalm: KIND_LABELS.psalm,
  verse: KIND_LABELS.bible,
  'bible-chapter': KIND_LABELS.bible,
  saint: KIND_LABELS.saint,
  office: KIND_LABELS.office,
  akathist: KIND_LABELS.akathist,
  canon: KIND_LABELS.canon,
  'father-work': KIND_LABELS.father,
  monastery: KIND_LABELS.monastery,
  icon: KIND_LABELS.icon,
  'athos-article': KIND_LABELS.athos,
};

export function FavoritesPage() {
  const [tab, setTab] = useState<Tab>('favoritos');
  const favorites = useAsync(() => listFavorites(), []);
  const bookmarks = useAsync(() => listBookmarks(), []);
  const notes = useAsync(() => listNotes(), []);

  return (
    <div className="page">
      <PageHead title={es.favorites.title} subtitle={es.favorites.subtitle} />
      <Segmented value={tab} options={TABS} onChange={setTab} label={es.favorites.title} />

      {tab === 'favoritos' ? (
        favorites.loading ? (
          <SkeletonList rows={4} />
        ) : favorites.data?.length ? (
          <Section>
            <div className="list">
              {favorites.data.map((favorite) => (
                <ListRow
                  key={favorite.id}
                  to={favorite.path}
                  title={favorite.title}
                  meta={favorite.subtitle ?? FAVORITE_LABELS[favorite.kind] ?? favorite.kind}
                />
              ))}
            </div>
          </Section>
        ) : (
          <Empty title={es.favorites.empty} text="Pulsa la estrella en cualquier texto para guardarlo aquí." />
        )
      ) : null}

      {tab === 'marcadores' ? (
        bookmarks.data?.length ? (
          <Section>
            <div className="list">
              {bookmarks.data.map((bookmark) => (
                <div className="list-item" key={bookmark.id}>
                  <a className="list-item__body" href={bookmark.path} style={{ textDecoration: 'none' }}>
                    <span className="list-item__title">{bookmark.title}</span>
                    <span className="list-item__meta">
                      {new Date(bookmark.createdAt).toLocaleDateString('es')}
                    </span>
                  </a>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={es.app.delete}
                    onClick={async () => {
                      await removeBookmark(bookmark.id);
                      bookmarks.reload();
                    }}
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        ) : (
          <Empty title="Sin marcadores" text="Guarda tu sitio en la Escritura desde el lector." />
        )
      ) : null}

      {tab === 'notas' ? (
        notes.data?.length ? (
          <Section>
            <div className="stack">
              {notes.data.map((note) => (
                <Panel key={note.id}>
                  <a href={note.path} className="eyebrow" style={{ textDecoration: 'none' }}>
                    {note.targetTitle}
                  </a>
                  <p style={{ whiteSpace: 'pre-wrap', marginTop: 'var(--sp-2)' }}>{note.body}</p>
                  <div className="row row--between" style={{ marginTop: 'var(--sp-3)' }}>
                    <span className="muted text-sm">
                      {new Date(note.updatedAt).toLocaleDateString('es')}
                    </span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={async () => {
                        await removeNote(note.id);
                        notes.reload();
                      }}
                    >
                      {es.app.delete}
                    </Button>
                  </div>
                </Panel>
              ))}
            </div>
          </Section>
        ) : (
          <Empty title="Sin notas" text="Puedes anotar cualquier oración, salmo o pasaje." />
        )
      ) : null}
    </div>
  );
}
