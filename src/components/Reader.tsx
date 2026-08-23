/**
 * Armazón de lectura: el mismo comportamiento para las oraciones, los salmos,
 * la Escritura y los oficios. Evita repetir la barra de herramientas y el
 * panel de notas en cada pantalla.
 */
import { useState, type ReactNode } from 'react';
import { Button, Dialog, FavoriteButton, Panel } from '@/components/ui';
import { IconNote } from '@/components/icons';
import { useFavorite } from '@/hooks/useFavorite';
import { useAsync } from '@/hooks/useAsync';
import { notesFor, removeNote, saveNote } from '@/db/user';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import type { Favorite } from '@/types';
import es from '@/locales/es';

export interface ReaderProps {
  favorite?: Omit<Favorite, 'id' | 'createdAt'> | null;
  note?: { targetKind: string; targetId: string; targetTitle: string; path: string } | null;
  extraActions?: ReactNode;
  children: ReactNode;
}

const FONT_STEPS = [0.85, 0.925, 1, 1.1, 1.25, 1.4, 1.6];

export function ReaderToolbar({ favorite, note, extraActions }: Omit<ReaderProps, 'children'>) {
  const { fontScale, set } = useSettings();
  const togglePrayerMode = useUi((s) => s.togglePrayerMode);
  const prayerMode = useUi((s) => s.prayerMode);
  const { active, toggle } = useFavorite(favorite ?? null);
  const [notesOpen, setNotesOpen] = useState(false);

  const step = (direction: 1 | -1) => {
    const index = FONT_STEPS.findIndex((value) => Math.abs(value - fontScale) < 0.01);
    const current = index === -1 ? 2 : index;
    const next = Math.min(FONT_STEPS.length - 1, Math.max(0, current + direction));
    set('fontScale', FONT_STEPS[next]);
  };

  return (
    <>
      <div className="row row--wrap" style={{ gap: 'var(--sp-1)' }}>
        {favorite ? <FavoriteButton active={active} onToggle={toggle} /> : null}

        {note ? (
          <button
            type="button"
            className="icon-btn"
            onClick={() => setNotesOpen(true)}
            aria-label={es.prayers.addNote}
            title={es.prayers.addNote}
          >
            <IconNote size={20} />
          </button>
        ) : null}

        <button
          type="button"
          className="icon-btn"
          onClick={() => step(-1)}
          aria-label="Reducir el texto"
          title="Reducir el texto"
          disabled={fontScale <= FONT_STEPS[0]}
        >
          <span aria-hidden="true" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-serif)' }}>A</span>
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => step(1)}
          aria-label="Aumentar el texto"
          title="Aumentar el texto"
          disabled={fontScale >= FONT_STEPS.at(-1)!}
        >
          <span aria-hidden="true" style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>A</span>
        </button>

        <Button size="sm" variant="ghost" onClick={togglePrayerMode} aria-pressed={prayerMode}>
          {prayerMode ? es.prayerMode.exit : es.prayerMode.enter}
        </Button>

        {extraActions}
      </div>

      {note ? <NotesDialog open={notesOpen} onClose={() => setNotesOpen(false)} target={note} /> : null}
    </>
  );
}

function NotesDialog({
  open,
  onClose,
  target,
}: {
  open: boolean;
  onClose: () => void;
  target: NonNullable<ReaderProps['note']>;
}) {
  const [draft, setDraft] = useState('');
  const toast = useUi((s) => s.toast);
  const notes = useAsync(() => notesFor(target.targetKind, target.targetId), [
    target.targetKind,
    target.targetId,
    open,
  ]);

  const add = async () => {
    if (!draft.trim()) return;
    await saveNote({
      targetKind: target.targetKind as never,
      targetId: target.targetId,
      targetTitle: target.targetTitle,
      path: target.path,
      body: draft.trim(),
    });
    setDraft('');
    notes.reload();
    toast('Nota guardada');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={es.prayers.yourNotes}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {es.app.close}
          </Button>
          <Button variant="primary" onClick={add} disabled={!draft.trim()}>
            {es.app.save}
          </Button>
        </>
      }
    >
      <div className="stack">
        <textarea
          className="textarea"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={`Sobre «${target.targetTitle}»…`}
          aria-label={es.prayers.addNote}
        />
        {notes.data?.map((entry) => (
          <Panel key={entry.id} variant="sunken">
            <p style={{ whiteSpace: 'pre-wrap' }}>{entry.body}</p>
            <div className="row row--between" style={{ marginTop: 'var(--sp-2)' }}>
              <span className="muted text-sm">
                {new Date(entry.updatedAt).toLocaleDateString('es')}
              </span>
              <Button
                size="sm"
                variant="danger"
                onClick={async () => {
                  await removeNote(entry.id);
                  notes.reload();
                }}
              >
                {es.app.delete}
              </Button>
            </div>
          </Panel>
        ))}
      </div>
    </Dialog>
  );
}
