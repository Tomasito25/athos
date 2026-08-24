/**
 * Oraciones propias.
 *
 * Lo que el usuario escriba aquí puede añadirse a cualquier oficio igual que
 * una oración de la biblioteca. No sale del dispositivo.
 */
import { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { deleteUserPrayer, listUserPrayers, newId, saveUserPrayer } from '@/db/user';
import {
  Button,
  Dialog,
  Empty,
  Field,
  ListRow,
  Loading,
  PageHead,
  Panel,
} from '@/components/ui';
import { IconPlus, IconTrash } from '@/components/icons';
import { useUi } from '@/stores/ui';
import type { UserPrayer } from '@/types';
import es from '@/locales/es';

export function MyPrayersPage() {
  const toast = useUi((s) => s.toast);
  const oraciones = useAsync(() => listUserPrayers(), []);
  const [editando, setEditando] = useState<UserPrayer | null>(null);

  const nueva = () =>
    setEditando({
      id: newId(),
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.nav.pray}
        title={es.office.myPrayers}
        subtitle="Las oraciones que escribas aquí puedes añadirlas a cualquiera de los tres oficios."
        actions={
          <Button size="sm" variant="primary" onClick={nueva}>
            <IconPlus size={16} /> {es.office.newPrayer}
          </Button>
        }
      />

      {oraciones.loading ? <Loading /> : null}

      {!oraciones.loading && !oraciones.data?.length ? (
        <Empty
          title="Todavía no has escrito ninguna"
          text="Puedes copiar una oración de tu libro, escribir la tuya o guardar la que te haya dado tu padre espiritual."
          action={
            <Button variant="primary" onClick={nueva}>
              {es.office.newPrayer}
            </Button>
          }
        />
      ) : (
        <div className="list">
          {oraciones.data?.map((oracion) => (
            <ListRow
              key={oracion.id}
              onClick={() => setEditando(oracion)}
              title={oracion.title}
              meta={oracion.body.slice(0, 120)}
              chevron={false}
              trailing={
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={es.app.delete}
                  onClick={async (evento) => {
                    evento.stopPropagation();
                    if (!confirm(es.office.deletePrayerConfirm)) return;
                    await deleteUserPrayer(oracion.id);
                    oraciones.reload();
                    toast('Oración eliminada');
                  }}
                >
                  <IconTrash size={18} />
                </button>
              }
            />
          ))}
        </div>
      )}

      <Panel variant="quiet" style={{ marginTop: 'var(--sp-6)' }}>
        <p className="text-sm muted">
          Tus oraciones se guardan sólo en este dispositivo y se incluyen cuando exportas tus datos.
        </p>
      </Panel>

      {editando ? (
        <PrayerDialog
          key={editando.id}
          prayer={editando}
          onClose={() => setEditando(null)}
          onSave={async (oracion) => {
            await saveUserPrayer(oracion);
            setEditando(null);
            oraciones.reload();
            toast('Oración guardada');
          }}
        />
      ) : null}
    </div>
  );
}

function PrayerDialog({
  prayer,
  onClose,
  onSave,
}: {
  prayer: UserPrayer;
  onClose: () => void;
  onSave: (prayer: UserPrayer) => void;
}) {
  const [draft, setDraft] = useState(prayer);

  return (
    <Dialog
      open
      onClose={onClose}
      title={es.office.newPrayer}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {es.app.cancel}
          </Button>
          <Button
            variant="primary"
            disabled={!draft.title.trim() || !draft.body.trim()}
            onClick={() => onSave(draft)}
          >
            {es.app.save}
          </Button>
        </>
      }
    >
      <div className="stack">
        <Field label={es.office.prayerTitle}>
          {(id) => (
            <input
              id={id}
              className="input"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Oración a san Nicolás"
            />
          )}
        </Field>
        <Field label={es.office.prayerBody}>
          {(id) => (
            <textarea
              id={id}
              className="textarea"
              style={{ minHeight: '12rem', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)' }}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              placeholder="Deja una línea en blanco entre párrafo y párrafo."
            />
          )}
        </Field>
        <Field label={es.office.prayerGreek} hint={es.office.prayerGreekHint}>
          {(id) => (
            <textarea
              id={id}
              className="textarea"
              style={{ minHeight: '6rem' }}
              lang="el"
              value={draft.greek ?? ''}
              onChange={(e) => setDraft({ ...draft, greek: e.target.value || undefined })}
            />
          )}
        </Field>
      </div>
    </Dialog>
  );
}
