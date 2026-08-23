/**
 * Editor de una entrada del diario, con cifrado opcional.
 *
 * El descifrado ocurre en la carga, de modo que el formulario recibe ya el
 * texto en claro y puede inicializar su estado una sola vez, sin sincronizar
 * nada dentro de un efecto.
 */
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { deleteJournalEntry, getJournalEntry, saveJournalEntry } from '@/db/user';
import { getLockConfig, useJournalSession } from '@/stores/journal';
import { decryptText, encryptText } from '@/lib/crypto';
import { Button, Field, Loading, PageHead, Panel, Tag } from '@/components/ui';
import { IconLock, IconTrash } from '@/components/icons';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useUi } from '@/stores/ui';
import { formatLongDate } from '@/lib/format';
import type { JournalEntry } from '@/types';
import es from '@/locales/es';

interface Loaded {
  entry: JournalEntry | undefined;
  body: string;
  decryptFailed: boolean;
}

export function JournalEntryPage() {
  const { entryId = '' } = useParams();
  const [params] = useSearchParams();
  const today = useToday();
  const session = useJournalSession();

  const isNew = params.get('nueva') === '1';

  const loaded = useAsync<Loaded>(async () => {
    if (isNew) return { entry: undefined, body: '', decryptFailed: false };
    const entry = await getJournalEntry(entryId);
    if (!entry) return { entry: undefined, body: '', decryptFailed: false };
    if (!entry.encryption) return { entry, body: entry.body, decryptFailed: false };
    if (!session.pin) return { entry, body: '', decryptFailed: true };
    try {
      return {
        entry,
        body: await decryptText(entry.body, entry.encryption, session.pin),
        decryptFailed: false,
      };
    } catch {
      return { entry, body: '', decryptFailed: true };
    }
  }, [entryId, isNew, session.pin]);

  const lock = useAsync(() => getLockConfig(), []);

  if (loaded.loading || lock.loading || !loaded.data) return <Loading />;

  return (
    <EntryForm
      key={`${entryId}-${loaded.data.entry?.updatedAt ?? 'nueva'}`}
      entryId={entryId}
      isNew={isNew}
      today={today}
      loaded={loaded.data}
      encrypt={Boolean(lock.data?.enabled && lock.data.encrypt && session.pin)}
      pin={session.pin}
    />
  );
}

function EntryForm({
  entryId,
  isNew,
  today,
  loaded,
  encrypt,
  pin,
}: {
  entryId: string;
  isNew: boolean;
  today: string;
  loaded: Loaded;
  encrypt: boolean;
  pin: string | null;
}) {
  const navigate = useNavigate();
  const toast = useUi((s) => s.toast);

  const [date, setDate] = useState(loaded.entry?.date ?? today);
  const [title, setTitle] = useState(loaded.entry?.title ?? '');
  const [body, setBody] = useState(loaded.body);
  const [tags, setTags] = useState((loaded.entry?.tags ?? []).join(', '));

  const day = useLiturgicalDay(date);

  const save = async () => {
    let storedBody = body;
    let encryption;

    if (encrypt && pin) {
      const result = await encryptText(body, pin);
      storedBody = result.ciphertext;
      encryption = result.envelope;
    }

    await saveJournalEntry({
      id: entryId,
      date,
      title: title.trim(),
      body: storedBody,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      favorite: loaded.entry?.favorite ?? false,
      createdAt: loaded.entry?.createdAt,
      encryption,
    });

    toast('Entrada guardada');
    navigate('/diario');
  };

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.journal.title}
        title={isNew ? es.journal.newEntry : title || 'Entrada'}
        subtitle={formatLongDate(date)}
      />

      <div className="tag-row" style={{ marginBottom: 'var(--sp-4)' }}>
        {day.feasts[0] ? <Tag tone="gold">{day.feasts[0].shortName ?? day.feasts[0].name}</Tag> : null}
        {day.saints[0] ? <Tag>{day.saints[0].name}</Tag> : null}
        {encrypt ? (
          <Tag tone="gold">
            <IconLock size={12} /> Se guardará cifrada
          </Tag>
        ) : null}
      </div>

      {loaded.decryptFailed ? (
        <Panel variant="quiet" style={{ marginBottom: 'var(--sp-4)' }}>
          <p className="notice notice--warn">
            Esta entrada está cifrada y no se ha podido descifrar. Desbloquea el diario con el PIN
            correcto antes de abrirla. Si guardas ahora, sustituirás el contenido cifrado.
          </p>
        </Panel>
      ) : null}

      <div className="stack">
        <Field label={es.journal.entryTitle}>
          {(id) => (
            <input
              id={id}
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Una palabra que resuma el día"
            />
          )}
        </Field>

        <Field label="Fecha">
          {(id) => (
            <input
              id={id}
              type="date"
              className="input"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          )}
        </Field>

        <Field label={es.journal.entryBody}>
          {(id) => (
            <textarea
              id={id}
              className="textarea"
              style={{ minHeight: '16rem', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)' }}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={es.journal.emptyHint}
            />
          )}
        </Field>

        <Field label={es.journal.tags} hint={es.journal.tagsHint}>
          {(id) => (
            <input
              id={id}
              className="input"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="oración, lucha, gratitud"
            />
          )}
        </Field>
      </div>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Button variant="primary" onClick={save}>
          {es.app.save}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/diario')}>
          {es.app.cancel}
        </Button>
        {!isNew ? (
          <Button
            variant="danger"
            onClick={async () => {
              if (!confirm(es.journal.deleteConfirm)) return;
              await deleteJournalEntry(entryId);
              toast('Entrada eliminada');
              navigate('/diario');
            }}
          >
            <IconTrash size={16} /> {es.app.delete}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
