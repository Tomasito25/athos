import { useAsync } from '@/hooks/useAsync';
import { listBookmarks, listHistory } from '@/db/user';
import { suggestedKathisma } from '@/db/psalter';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { ListRow, PageHead, Section } from '@/components/ui';
import { IconBook, IconBookmark, IconScroll, OrthodoxCross } from '@/components/icons';
import { isoToDate } from '@/lib/calendar/jdn';
import es from '@/locales/es';

export function ReadHub() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const history = useAsync(() => listHistory(4), []);
  const bookmarks = useAsync(() => listBookmarks(), []);
  const kathisma = suggestedKathisma(isoToDate(today));

  const gospel = day.readings?.readings.find((r) => r.kind === 'evangelio');

  return (
    <div className="page">
      <PageHead title={es.nav.read} subtitle="Escritura, Salterio, lecturas del día y Padres." />

      <Section>
        <div className="list">
          <ListRow
            to="/leer/biblia"
            leading={<IconBook size={20} style={{ color: 'var(--gold)' }} />}
            title={es.bible.title}
            meta="Antiguo y Nuevo Testamento · Reina-Valera 1909"
          />
          <ListRow
            to="/leer/salterio"
            leading={<IconScroll size={20} style={{ color: 'var(--gold)' }} />}
            title={es.psalter.title}
            meta={`${es.psalter.todaySuggestion}: ${es.psalter.kathisma.replace('{{n}}', String(kathisma))}`}
          />
          <ListRow
            to="/leer/lecturas"
            leading={<OrthodoxCross size={20} style={{ color: 'var(--gold)' }} />}
            title={es.home.readings}
            meta={gospel?.reference ?? es.app.pending}
          />
          <ListRow
            to="/biblioteca/padres"
            leading={<IconBook size={20} style={{ color: 'var(--gold)' }} />}
            title={es.library.fathers}
            meta="Crisóstomo, Basilio, Isaac el Sirio, Palamás…"
          />
        </div>
      </Section>

      {bookmarks.data && bookmarks.data.length > 0 ? (
        <Section title={es.favorites.bookmarks}>
          <div className="list">
            {bookmarks.data.slice(0, 5).map((bookmark) => (
              <ListRow
                key={bookmark.id}
                to={bookmark.path}
                leading={<IconBookmark size={18} style={{ color: 'var(--gold)' }} />}
                title={bookmark.title}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {history.data && history.data.length > 0 ? (
        <Section title={es.home.continueReading}>
          <div className="list">
            {history.data.map((entry) => (
              <ListRow key={entry.id} to={entry.path} title={entry.title} meta={entry.kind} />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
