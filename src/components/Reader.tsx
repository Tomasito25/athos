/**
 * Armazón de lectura: el mismo comportamiento para las oraciones, los salmos,
 * la Escritura y los oficios. Evita repetir la barra de herramientas y el
 * panel de notas en cada pantalla.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button, Dialog, FavoriteButton, Panel } from '@/components/ui';
import { IconNote, IconShare, IconSpeaker, IconStop } from '@/components/icons';
import { pageParagraphs, readAloud, shareText, speechSupported, type Reading } from '@/lib/lectura';
import { releaseWakeLock, requestWakeLock } from '@/lib/wakelock';
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
  const toast = useUi((s) => s.toast);
  const barra = useRef<HTMLDivElement>(null);
  const lectura = useRef<Reading | null>(null);
  const [voz, setVoz] = useState<'parada' | 'leyendo' | 'pausa'>('parada');
  const dueno = useRef(Symbol('voz'));

  /** La página que se lee: el artículo en que está la barra. */
  const pagina = () => barra.current?.closest('article') ?? document.getElementById('contenido');

  const compartir = async () => {
    const raiz = pagina();
    const parrafos = raiz ? pageParagraphs(raiz) : [];
    const titulo = favorite?.title ?? parrafos[0] ?? document.title;
    const cuerpo = parrafos.slice(parrafos[0] === titulo ? 1 : 0).join('\n\n');
    const resultado = await shareText(titulo, cuerpo, window.location.href);
    if (resultado === 'copied') toast(es.reader.copied);
    if (resultado === 'failed') toast(es.reader.shareFailed);
  };

  const leer = () => {
    if (voz === 'leyendo') {
      lectura.current?.pause();
      setVoz('pausa');
      return;
    }
    if (voz === 'pausa') {
      lectura.current?.resume();
      setVoz('leyendo');
      return;
    }
    const raiz = pagina();
    const parrafos = raiz ? pageParagraphs(raiz) : [];
    if (!parrafos.length) return;
    // Mientras se lee, la pantalla no se apaga: si se apaga, el navegador
    // puede dejar de leer.
    void requestWakeLock(dueno.current);
    lectura.current = readAloud(parrafos, {
      onEnd: () => {
        setVoz('parada');
        void releaseWakeLock(dueno.current);
      },
    });
    setVoz('leyendo');
  };

  // Al salir de la página se calla: lo leído es de la página que se deja.
  useEffect(() => () => lectura.current?.stop(), []);

  const step = (direction: 1 | -1) => {
    const index = FONT_STEPS.findIndex((value) => Math.abs(value - fontScale) < 0.01);
    const current = index === -1 ? 2 : index;
    const next = Math.min(FONT_STEPS.length - 1, Math.max(0, current + direction));
    set('fontScale', FONT_STEPS[next]);
  };

  return (
    <>
      <div className="row row--wrap" style={{ gap: 'var(--sp-1)' }} ref={barra}>
        {favorite ? <FavoriteButton active={active} onToggle={toggle} /> : null}

        <button
          type="button"
          className="icon-btn"
          onClick={() => void compartir()}
          aria-label={es.reader.share}
          title={es.reader.share}
        >
          <IconShare size={20} />
        </button>

        {speechSupported() ? (
          <>
            <button
              type="button"
              className="icon-btn"
              onClick={leer}
              aria-label={voz === 'leyendo' ? es.reader.pause : voz === 'pausa' ? es.reader.resume : es.reader.readAloud}
              title={voz === 'leyendo' ? es.reader.pause : voz === 'pausa' ? es.reader.resume : es.reader.readAloud}
              aria-pressed={voz !== 'parada'}
            >
              <IconSpeaker size={20} />
            </button>
            {voz !== 'parada' ? (
              <button
                type="button"
                className="icon-btn"
                onClick={() => lectura.current?.stop()}
                aria-label={es.reader.stop}
                title={es.reader.stop}
              >
                <IconStop size={20} />
              </button>
            ) : null}
          </>
        ) : null}

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
