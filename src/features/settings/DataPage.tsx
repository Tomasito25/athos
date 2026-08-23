/** Datos: copias de seguridad, almacenamiento e indexación de la Escritura. */
import { useRef, useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import {
  backupToMarkdown,
  downloadFile,
  exportBackup,
  importBackup,
  validateBackup,
  wipeUserData,
  type AthosBackup,
  type ImportMode,
} from '@/db/backup';
import { requestPersistentStorage, storageEstimate } from '@/db/db';
import { bibleIndexStatus, clearBibleIndex, indexWholeBible } from '@/db/bible';
import { ensurePsalterBuilt } from '@/db/psalter';
import { resetContent } from '@/db/seed';
import {
  Button,
  Dialog,
  Notice,
  PageHead,
  Panel,
  Progress,
  Section,
  Switch,
} from '@/components/ui';
import { IconDownload, IconUpload } from '@/components/icons';
import { formatBytes } from '@/lib/format';
import { useSettings } from '@/stores/settings';
import { useUi } from '@/stores/ui';
import { toIsoDate } from '@/lib/calendar/jdn';
import es from '@/locales/es';

export function DataPage() {
  const toast = useUi((s) => s.toast);
  const settings = useSettings();
  const fileInput = useRef<HTMLInputElement>(null);

  const storage = useAsync(() => storageEstimate(), []);
  const persisted = useAsync(
    () => (navigator.storage?.persisted ? navigator.storage.persisted() : Promise.resolve(false)),
    [],
  );
  const index = useAsync(() => bibleIndexStatus(), []);

  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [pending, setPending] = useState<{ backup: AthosBackup; errors: string[] } | null>(null);
  const [mode, setMode] = useState<ImportMode>('merge');

  const exportJson = async () => {
    const backup = await exportBackup();
    downloadFile(
      `athos-${toIsoDate(new Date())}.json`,
      JSON.stringify(backup, null, 2),
      'application/json',
    );
    toast('Copia exportada');
  };

  const exportMarkdown = async () => {
    const backup = await exportBackup();
    downloadFile(`athos-${toIsoDate(new Date())}.md`, backupToMarkdown(backup), 'text/markdown');
    toast('Copia exportada en Markdown');
  };

  const readFile = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const validation = validateBackup(parsed);
      setPending({ backup: parsed as AthosBackup, errors: validation.errors });
    } catch {
      toast('El archivo no es un JSON válido');
    }
  };

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.data} />

      <Section title={es.settings.exportData}>
        <Panel>
          <p className="muted text-sm">
            Se exportan el diario, las reglas, los hábitos, las notas, los favoritos, las sesiones de
            oración y las preferencias. El contenido religioso no se exporta: forma parte de la
            aplicación.
          </p>
          <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
            <Button onClick={exportJson}>
              <IconDownload size={16} /> JSON
            </Button>
            <Button onClick={exportMarkdown}>
              <IconDownload size={16} /> Markdown
            </Button>
          </div>
        </Panel>
      </Section>

      <Section title={es.settings.importData}>
        <Panel>
          <p className="muted text-sm">
            Sólo se aceptan archivos JSON exportados por ATHOS. Antes de escribir nada se comprueba
            que cada registro tenga la forma esperada.
          </p>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void readFile(file);
              event.target.value = '';
            }}
          />
          <Button style={{ marginTop: 'var(--sp-3)' }} onClick={() => fileInput.current?.click()}>
            <IconUpload size={16} /> Elegir archivo
          </Button>
        </Panel>
      </Section>

      <Section title={es.bible.title}>
        <Panel>
          <p className="muted text-sm">
            Indexar la Escritura guarda los {index.data?.total ?? 66} libros en este dispositivo, de
            modo que la búsqueda funcione sin conexión.
          </p>

          {index.data ? (
            <div style={{ margin: 'var(--sp-3) 0' }}>
              <Progress
                value={index.data.total ? index.data.done / index.data.total : 0}
                label={es.bible.indexing}
              />
              <p className="muted text-sm">
                {index.data.done} de {index.data.total} libros
              </p>
            </div>
          ) : null}

          {progress ? (
            <Progress value={progress.done / progress.total} label={es.bible.indexing} />
          ) : null}

          <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
            <Button
              disabled={Boolean(progress)}
              onClick={async () => {
                setProgress({ done: 0, total: index.data?.total ?? 66 });
                await indexWholeBible((p) => setProgress(p));
                setProgress(null);
                index.reload();
                storage.reload();
                toast(es.bible.indexed);
              }}
            >
              {es.search.indexNow}
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await clearBibleIndex();
                index.reload();
                storage.reload();
                toast('Índice borrado');
              }}
            >
              Borrar el índice
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await ensurePsalterBuilt(true);
                toast('Salterio reconstruido');
              }}
            >
              Reconstruir el Salterio
            </Button>
          </div>

          <div style={{ marginTop: 'var(--sp-3)' }}>
            <Switch
              checked={settings.autoIndexBible}
              onChange={(value) => settings.set('autoIndexBible', value)}
              title="Indexar automáticamente"
              description="ATHOS descarga la Escritura en segundo plano tras el primer arranque."
            />
          </div>
        </Panel>
      </Section>

      <Section title={es.settings.storage}>
        <Panel>
          {storage.data ? (
            <>
              <Progress value={storage.data.quota ? storage.data.usage / storage.data.quota : 0} />
              <p className="muted text-sm">
                {es.settings.storageUsed
                  .replace('{{used}}', formatBytes(storage.data.usage))
                  .replace('{{quota}}', formatBytes(storage.data.quota))}
              </p>
            </>
          ) : (
            <p className="muted text-sm">Este navegador no informa del espacio disponible.</p>
          )}

          <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
            {persisted.data ? es.settings.persistentOn : es.settings.persistentOff}
          </p>
          {!persisted.data ? (
            <Button
              size="sm"
              style={{ marginTop: 'var(--sp-2)' }}
              onClick={async () => {
                const granted = await requestPersistentStorage();
                persisted.reload();
                toast(granted ? es.settings.persistentOn : 'El navegador no lo ha concedido');
              }}
            >
              {es.settings.requestPersistent}
            </Button>
          ) : null}
        </Panel>
      </Section>

      <Section title="Contenido">
        <Panel>
          <p className="muted text-sm">
            Regenerar el contenido vuelve a escribir las oraciones, santos, fiestas y demás textos
            que vienen con ATHOS. No toca nada tuyo.
          </p>
          <Button
            style={{ marginTop: 'var(--sp-3)' }}
            onClick={async () => {
              await resetContent();
              toast('Contenido regenerado');
            }}
          >
            {es.settings.resetContent}
          </Button>
        </Panel>
      </Section>

      <Section title="Borrar">
        <Panel>
          <Notice variant="warn">{es.settings.wipeConfirm}</Notice>
          <Button
            variant="danger"
            style={{ marginTop: 'var(--sp-3)' }}
            onClick={async () => {
              if (!confirm(es.settings.wipeConfirm)) return;
              await wipeUserData();
              toast('Datos borrados');
            }}
          >
            {es.settings.wipeData}
          </Button>
        </Panel>
      </Section>

      <Dialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        title={es.settings.importData}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPending(null)}>
              {es.app.cancel}
            </Button>
            <Button
              variant="primary"
              disabled={Boolean(pending?.errors.length)}
              onClick={async () => {
                if (!pending) return;
                try {
                  const result = await importBackup(pending.backup, mode);
                  const count = Object.values(result.imported).reduce((a, b) => a + (b ?? 0), 0);
                  toast(`${count} registros importados`);
                } catch (error) {
                  toast(error instanceof Error ? error.message : 'Error al importar');
                }
                setPending(null);
              }}
            >
              {es.app.confirm}
            </Button>
          </>
        }
      >
        {pending ? (
          <div className="stack">
            {pending.errors.length ? (
              <Notice variant="warn">
                <div>
                  {pending.errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              </Notice>
            ) : (
              <Notice>El archivo es válido.</Notice>
            )}

            <div className="list">
              {Object.entries(pending.backup.data ?? {}).map(([section, rows]) => (
                <div className="list-item" key={section}>
                  <span className="list-item__body">
                    <span className="list-item__title">{section}</span>
                  </span>
                  <span className="pill-count">{Array.isArray(rows) ? rows.length : 0}</span>
                </div>
              ))}
            </div>

            <Switch
              checked={mode === 'replace'}
              onChange={(value) => setMode(value ? 'replace' : 'merge')}
              title="Reemplazar en lugar de combinar"
              description="Si lo activas, cada sección importada sustituirá por completo a la que tengas ahora."
            />
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
