/** Editor de una regla de oración: pasos, orden, enlaces y objetivos. */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import {
  deleteRuleItem,
  newId,
  reorderRuleItems,
  ruleItems,
  saveRule,
  saveRuleItem,
} from '@/db/user';
import {
  Button,
  Dialog,
  Empty,
  Field,
  Loading,
  PageHead,
  Panel,
  Section,
} from '@/components/ui';
import { IconChevronDown, IconPlus, IconTrash } from '@/components/icons';
import { useUi } from '@/stores/ui';
import type { PrayerRule, RuleItem, RuleScope, RuleTime } from '@/types';
import es from '@/locales/es';

const SCOPES: Array<{ value: RuleScope; label: string }> = [
  { value: 'diario', label: es.rule.scopeDaily },
  { value: 'domingo', label: es.rule.scopeSunday },
  { value: 'fiesta', label: es.rule.scopeFeast },
  { value: 'ayuno', label: es.rule.scopeFast },
];

const TIMES: Array<{ value: RuleTime; label: string }> = [
  { value: 'manana', label: es.rule.morning },
  { value: 'noche', label: es.rule.evening },
  { value: 'dia', label: es.rule.day },
];

const LINK_KINDS: Array<{ value: RuleItem['linkKind'] | ''; label: string }> = [
  { value: '', label: es.rule.linkNone },
  { value: 'prayer', label: es.prayers.title },
  { value: 'psalm', label: es.psalter.title },
  { value: 'bible', label: es.bible.title },
  { value: 'akathist', label: es.library.akathists },
  { value: 'canon', label: es.library.canons },
  { value: 'office', label: es.library.liturgy },
  { value: 'jesus-prayer', label: es.jesusPrayer.title },
];

export function RuleEditorPage() {
  const { ruleId = '' } = useParams();
  const rule = useAsync(() => db.daily_rules.get(ruleId), [ruleId]);

  if (rule.loading) return <Loading />;
  if (!rule.data) {
    return (
      <div className="page">
        <Empty title="Esta regla ya no existe" />
      </div>
    );
  }

  return <RuleEditor key={`${ruleId}-${rule.data.updatedAt}`} rule={rule.data} />;
}

function RuleEditor({ rule }: { rule: PrayerRule }) {
  const navigate = useNavigate();
  const toast = useUi((s) => s.toast);
  const ruleId = rule.id;

  const items = useAsync(() => ruleItems(ruleId), [ruleId]);

  const [name, setName] = useState(rule.name);
  const [scope, setScope] = useState<RuleScope>(rule.scope);
  const [time, setTime] = useState<RuleTime>(rule.time);
  const [editing, setEditing] = useState<RuleItem | null>(null);

  const persist = async () => {
    await saveRule({ ...rule, name: name.trim() || 'Regla', scope, time });
    toast('Regla guardada');
    navigate('/orar/regla');
  };

  const move = async (index: number, direction: -1 | 1) => {
    const list = [...(items.data ?? [])];
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    await reorderRuleItems(list);
    items.reload();
  };

  return (
    <div className="page page--reading">
      <PageHead eyebrow={es.rule.title} title={es.rule.editRule} />

      <Panel>
        <div className="stack">
          <Field label={es.rule.ruleName}>
            {(id) => (
              <input
                id={id}
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            )}
          </Field>

          <Field label={es.rule.scope}>
            {(id) => (
              <select
                id={id}
                className="select"
                value={scope}
                onChange={(event) => setScope(event.target.value as RuleScope)}
              >
                {SCOPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field label="Momento del día">
            {(id) => (
              <select
                id={id}
                className="select"
                value={time}
                onChange={(event) => setTime(event.target.value as RuleTime)}
              >
                {TIMES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </Panel>

      <Section
        title="Pasos"
        action={undefined}
      >
        <div className="list">
          {(items.data ?? []).map((item, index) => (
            <div className="list-item" key={item.id}>
              <span className="list-item__body">
                <span className="list-item__title">
                  {index + 1}. {item.title}
                </span>
                <span className="list-item__meta">
                  {item.linkKind ? LINK_KINDS.find((k) => k.value === item.linkKind)?.label : es.rule.linkNone}
                  {item.target ? ` · ${item.target} ${es.rule.target.toLowerCase()}` : ''}
                </span>
              </span>

              <button
                type="button"
                className="icon-btn"
                onClick={() => move(index, -1)}
                aria-label={es.rule.moveUp}
                disabled={index === 0}
              >
                <IconChevronDown size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => move(index, 1)}
                aria-label={es.rule.moveDown}
                disabled={index === (items.data?.length ?? 1) - 1}
              >
                <IconChevronDown size={18} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setEditing(item)}
                aria-label={es.app.edit}
              >
                <IconPlus size={18} style={{ transform: 'rotate(45deg)', opacity: 0 }} />
                <span aria-hidden="true" style={{ position: 'absolute', fontSize: '0.8rem' }}>✎</span>
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={async () => {
                  await deleteRuleItem(item.id);
                  items.reload();
                }}
                aria-label={es.app.delete}
              >
                <IconTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        <Button
          style={{ marginTop: 'var(--sp-3)' }}
          onClick={() =>
            setEditing({
              id: newId(),
              ruleId,
              order: (items.data?.length ?? 0) + 1,
              title: '',
            })
          }
        >
          <IconPlus size={16} /> {es.rule.addItem}
        </Button>
      </Section>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Button variant="primary" onClick={persist}>
          {es.app.save}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/orar/regla')}>
          {es.app.cancel}
        </Button>
      </div>

      <ItemDialog
        item={editing}
        onClose={() => setEditing(null)}
        onSave={async (item) => {
          await saveRuleItem(item);
          setEditing(null);
          items.reload();
        }}
      />
    </div>
  );
}

function ItemDialog({
  item,
  onClose,
  onSave,
}: {
  item: RuleItem | null;
  onClose: () => void;
  onSave: (item: RuleItem) => void;
}) {
  if (!item) return null;
  return <ItemDialogForm key={item.id} item={item} onClose={onClose} onSave={onSave} />;
}

function ItemDialogForm({
  item,
  onClose,
  onSave,
}: {
  item: RuleItem;
  onClose: () => void;
  onSave: (item: RuleItem) => void;
}) {
  const [draft, setDraft] = useState<RuleItem>(item);
  const prayers = useAsync(() => db.prayers.orderBy('order').toArray(), []);

  const update = (patch: Partial<RuleItem>) => setDraft({ ...draft, ...patch });

  return (
    <Dialog
      open
      onClose={onClose}
      title={es.rule.addItem}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {es.app.cancel}
          </Button>
          <Button variant="primary" disabled={!draft.title.trim()} onClick={() => onSave(draft)}>
            {es.app.save}
          </Button>
        </>
      }
    >
      <div className="stack">
        <Field label={es.rule.itemTitle}>
          {(id) => (
            <input
              id={id}
              className="input"
              value={draft.title}
              onChange={(event) => update({ title: event.target.value })}
              placeholder="Salmo 50, oraciones matutinas…"
            />
          )}
        </Field>

        <Field label={es.rule.linkTo}>
          {(id) => (
            <select
              id={id}
              className="select"
              value={draft.linkKind ?? ''}
              onChange={(event) =>
                update({
                  linkKind: (event.target.value || undefined) as RuleItem['linkKind'],
                  linkId: undefined,
                })
              }
            >
              {LINK_KINDS.map((kind) => (
                <option key={kind.value ?? ''} value={kind.value ?? ''}>
                  {kind.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        {draft.linkKind === 'prayer' ? (
          <Field label={es.prayers.title}>
            {(id) => (
              <select
                id={id}
                className="select"
                value={draft.linkId ?? ''}
                onChange={(event) => update({ linkId: event.target.value })}
              >
                <option value="">—</option>
                {(prayers.data ?? []).map((prayer) => (
                  <option key={prayer.id} value={prayer.id}>
                    {prayer.title}
                  </option>
                ))}
              </select>
            )}
          </Field>
        ) : null}

        {draft.linkKind === 'psalm' ? (
          <Field label={es.psalter.psalm.replace('{{n}}', '')} hint="Numeración de los Setenta (1–151)">
            {(id) => (
              <input
                id={id}
                type="number"
                min={1}
                max={151}
                className="input"
                value={draft.linkId ?? ''}
                onChange={(event) => update({ linkId: event.target.value })}
              />
            )}
          </Field>
        ) : null}

        <Field label={es.rule.target} hint="Déjalo vacío si el paso no se cuenta.">
          {(id) => (
            <input
              id={id}
              type="number"
              min={1}
              className="input"
              value={draft.target ?? ''}
              onChange={(event) =>
                update({ target: event.target.value ? Number(event.target.value) : undefined })
              }
            />
          )}
        </Field>

        <Field label="Nota">
          {(id) => (
            <input
              id={id}
              className="input"
              value={draft.note ?? ''}
              onChange={(event) => update({ note: event.target.value || undefined })}
            />
          )}
        </Field>
      </div>
    </Dialog>
  );
}
