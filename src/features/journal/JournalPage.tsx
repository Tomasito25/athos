/**
 * Diario espiritual.
 *
 * Privado por diseño: nunca sale del dispositivo. Puede protegerse con un PIN y,
 * si el usuario lo pide, cifrarse con una clave derivada de ese PIN.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { listJournal, newId } from '@/db/user';
import { getLockConfig, useJournalSession, verifyPin } from '@/stores/journal';
import { Button, Empty, Field, ListRow, Loading, PageHead, Panel, Section, Tag } from '@/components/ui';
import { IconLock, IconPlus } from '@/components/icons';
import { normalize } from '@/lib/text';
import { formatLongDate } from '@/lib/format';
import { useToday } from '@/hooks/useLiturgicalDay';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function JournalPage() {
  const navigate = useNavigate();
  const today = useToday();
  const toast = useUi((s) => s.toast);
  const session = useJournalSession();
  const lock = useAsync(() => getLockConfig(), []);
  const entries = useAsync(() => listJournal(), []);
  const [query, setQuery] = useState('');
  const [pin, setPin] = useState('');

  const locked = Boolean(lock.data?.enabled) && !session.unlocked;

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return entries.data ?? [];
    return (entries.data ?? []).filter((entry) =>
      normalize(`${entry.title} ${entry.encryption ? '' : entry.body} ${entry.tags.join(' ')}`).includes(needle),
    );
  }, [entries.data, query]);

  if (lock.loading) return <Loading />;

  if (locked) {
    return (
      <div className="page page--reading">
        <PageHead title={es.journal.title} />
        <Panel style={{ maxWidth: '22rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', color: 'var(--gold)', marginBottom: 'var(--sp-3)' }}>
            <IconLock size={28} style={{ margin: '0 auto' }} />
          </div>
          <p className="text-center muted" style={{ marginBottom: 'var(--sp-4)' }}>
            {es.journal.locked}
          </p>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (await verifyPin(pin)) {
                session.unlock(pin);
                setPin('');
              } else {
                toast(es.journal.pinWrong);
                setPin('');
              }
            }}
          >
            <Field label={es.journal.pin}>
              {(id) => (
                <input
                  id={id}
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  className="input"
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                  autoFocus
                />
              )}
            </Field>
            <Button type="submit" variant="primary" block style={{ marginTop: 'var(--sp-3)' }}>
              {es.journal.unlock}
            </Button>
          </form>
        </Panel>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHead
        title={es.journal.title}
        subtitle={es.journal.subtitle}
        actions={
          <>
            {lock.data?.enabled ? (
              <Button size="sm" variant="ghost" onClick={() => session.lock()}>
                <IconLock size={16} /> {es.journal.lock}
              </Button>
            ) : null}
            <Button size="sm" variant="primary" onClick={() => navigate(`/diario/${newId()}?nueva=1`)}>
              <IconPlus size={16} /> {es.journal.newEntry}
            </Button>
          </>
        }
      />

      <input
        type="search"
        className="input"
        placeholder={es.journal.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={es.journal.search}
      />

      {entries.loading ? <Loading /> : null}

      {!entries.loading && filtered.length === 0 ? (
        <Empty
          title={es.journal.empty}
          text={es.journal.emptyHint}
          action={
            <Button variant="primary" onClick={() => navigate(`/diario/${newId()}?nueva=1`)}>
              {es.journal.newEntry}
            </Button>
          }
        />
      ) : (
        <Section title={`${filtered.length} ${filtered.length === 1 ? 'entrada' : 'entradas'}`}>
          <div className="list">
            {filtered.map((entry) => (
              <ListRow
                key={entry.id}
                to={`/diario/${entry.id}`}
                title={entry.title || 'Sin título'}
                meta={
                  entry.encryption
                    ? 'Entrada cifrada'
                    : entry.body.slice(0, 160)
                }
                trailing={
                  <span className="row" style={{ gap: 4 }}>
                    {entry.encryption ? <IconLock size={15} style={{ color: 'var(--gold)' }} /> : null}
                    <Tag>{entry.date === today ? es.app.today : formatLongDate(entry.date).split(',')[1]?.trim()}</Tag>
                  </span>
                }
              />
            ))}
          </div>
        </Section>
      )}

      <p className="source-note">
        Las entradas se guardan en este dispositivo, en IndexedDB. ATHOS no las envía a ningún sitio.
      </p>
    </div>
  );
}
