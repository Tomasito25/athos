/**
 * Los nombres para la oración: los vivos y los difuntos.
 *
 * Son los dípticos de cada uno: los nombres que se dicen en la conmemoración
 * de la mañana y de la noche, y en la panihida. ATHOS los pone luego en su
 * sitio dentro de esas oraciones, y si se elige el santo de cada nombre, avisa
 * el día de su fiesta (Configuración → Notificaciones → Santos de tus nombres).
 *
 * Viven sólo en este dispositivo, como todo lo demás, y entran en la copia
 * de seguridad.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { deleteDiptych, listDiptychs, saveDiptych } from '@/db/user';
import { SAINT_INDEX } from '@/content/saints';
import { Button, PageHead, Panel, Section, Segmented } from '@/components/ui';
import { IconTrash } from '@/components/icons';
import { formatMonthDay } from '@/lib/format';
import { normalize } from '@/lib/text';
import { useUi } from '@/stores/ui';
import type { DiptychName } from '@/types';
import es from '@/locales/es';

const POR_ID = new Map(SAINT_INDEX.map((s) => [s.id, s]));

/** Santos cuyo nombre contiene lo escrito: «Juan» → san Juan Crisóstomo, san Juan Bautista… */
function santosPara(texto: string) {
  const buscado = normalize(texto);
  if (buscado.length < 3) return [];
  return SAINT_INDEX.filter((s) => normalize(`${s.name} ${s.fullName ?? ''}`).includes(buscado)).slice(0, 8);
}

export function NamesPage() {
  const toast = useUi((s) => s.toast);
  const nombres = useAsync(() => listDiptychs(), []);
  const [lista, setLista] = useState<DiptychName['list']>('vivos');
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [santo, setSanto] = useState<string | undefined>();
  const [buscaSanto, setBuscaSanto] = useState('');

  const sugerencias = useMemo(() => santosPara(buscaSanto || nombre), [buscaSanto, nombre]);

  const anadir = async () => {
    if (!nombre.trim()) return;
    await saveDiptych({ name: nombre, list: lista, note: nota, saintId: santo });
    setNombre('');
    setNota('');
    setSanto(undefined);
    setBuscaSanto('');
    nombres.reload();
    toast(es.names.added);
  };

  const de = (l: DiptychName['list']) => (nombres.data ?? []).filter((n) => n.list === l);

  return (
    <div className="page page--reading">
      <PageHead eyebrow={es.nav.pray} title={es.names.title} subtitle={es.names.subtitle} />

      <Section title={es.names.addTitle}>
        <Panel>
          <div className="stack stack--tight">
            <Segmented<DiptychName['list']>
              value={lista}
              label={es.names.list}
              options={[
                { value: 'vivos', label: es.names.living },
                { value: 'difuntos', label: es.names.departed },
              ]}
              onChange={setLista}
            />
            <label className="field">
              <span className="field__label">{es.names.name}</span>
              <input
                className="input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={es.names.namePlaceholder}
                autoComplete="off"
              />
            </label>
            <label className="field">
              <span className="field__label">{es.names.note}</span>
              <input className="input" value={nota} onChange={(e) => setNota(e.target.value)} placeholder={es.names.notePlaceholder} />
            </label>
            <label className="field">
              <span className="field__label">{es.names.saint}</span>
              <input
                className="input"
                value={buscaSanto}
                onChange={(e) => setBuscaSanto(e.target.value)}
                placeholder={es.names.saintPlaceholder}
              />
              <span className="field__hint">{es.names.saintHint}</span>
            </label>
            {santo ? (
              <p className="text-sm">
                {POR_ID.get(santo)?.name} · {formatMonthDay(POR_ID.get(santo)?.day ?? '')}{' '}
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSanto(undefined)}>
                  {es.names.noSaint}
                </button>
              </p>
            ) : sugerencias.length ? (
              <div className="row row--wrap" style={{ gap: 'var(--sp-1)' }}>
                {sugerencias.map((s) => (
                  <button key={s.id} type="button" className="btn btn--sm" onClick={() => setSanto(s.id)}>
                    {s.name} · {formatMonthDay(s.day)}
                  </button>
                ))}
              </div>
            ) : null}
            <div>
              <Button variant="primary" onClick={() => void anadir()} disabled={!nombre.trim()}>
                {es.names.add}
              </Button>
            </div>
          </div>
        </Panel>
      </Section>

      {(['vivos', 'difuntos'] as const).map((l) => (
        <Section key={l} title={l === 'vivos' ? es.names.living : es.names.departed}>
          {de(l).length ? (
            <div className="list">
              {de(l).map((n) => (
                <div key={n.id} className="list-item">
                  <span className="list-item__body">
                    <span className="list-item__title">{n.name}</span>
                    <span className="list-item__meta">
                      {[n.note, n.saintId && POR_ID.get(n.saintId) ? `${POR_ID.get(n.saintId)!.name}, ${formatMonthDay(POR_ID.get(n.saintId)!.day)}` : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={es.names.remove.replace('{{name}}', n.name)}
                    onClick={async () => {
                      await deleteDiptych(n.id);
                      nombres.reload();
                    }}
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted text-sm">{l === 'vivos' ? es.names.noneLiving : es.names.noneDeparted}</p>
          )}
        </Section>
      ))}

      <p className="source-note">
        {es.names.where}{' '}
        <Link to="/orar/oraciones/por-los-vivos">{es.names.livingPrayer}</Link>,{' '}
        <Link to="/orar/oraciones/por-los-difuntos">{es.names.departedPrayer}</Link>,{' '}
        <Link to="/orar/oraciones/panihida-ficha">{es.names.panihida}</Link>. {es.names.reminderHint}{' '}
        <Link to="/configuracion/notificaciones">{es.settings.notifications}</Link>.
      </p>
    </div>
  );
}
