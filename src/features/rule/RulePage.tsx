/**
 * Regla de oración.
 *
 * Muestra la regla que corresponde a hoy —diaria, dominical, de fiesta o de
 * ayuno— y permite ir marcando cada paso. El progreso se guarda por fecha, de
 * modo que el historial es real y no un contador que se reinicia.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import {
  completionsOn,
  deleteRule,
  listRules,
  ruleItems,
  ruleStreak,
  saveRule,
  toggleRuleItem,
} from '@/db/user';
import { isFastDay } from '@/lib/calendar/fasting';
import {
  Button,
  ButtonLink,
  CheckCircle,
  Empty,
  Loading,
  PageHead,
  Panel,
  ProgressBlocks,
  Section,
  Segmented,
  Tag,
} from '@/components/ui';
import { IconEdit, IconPlus } from '@/components/icons';
import { useUi } from '@/stores/ui';
import type { RuleItem, RuleScope } from '@/types';
import { newId } from '@/db/user';
import es from '@/locales/es';

const SCOPE_OPTIONS: Array<{ value: RuleScope; label: string }> = [
  { value: 'diario', label: es.rule.scopeDaily },
  { value: 'domingo', label: es.rule.scopeSunday },
  { value: 'fiesta', label: es.rule.scopeFeast },
  { value: 'ayuno', label: es.rule.scopeFast },
];

/** Ámbito que corresponde de forma natural al día de hoy. */
function todaysScope(weekday: number, greatFeast: boolean, fasting: boolean): RuleScope {
  if (greatFeast) return 'fiesta';
  if (weekday === 0) return 'domingo';
  if (fasting) return 'ayuno';
  return 'diario';
}

export function RulePage() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const toast = useUi((s) => s.toast);

  const natural = todaysScope(
    day.weekday,
    day.feasts.some((f) => f.rank === 'gran-fiesta' || f.rank === 'pascua'),
    isFastDay(day.fasting),
  );
  const [scope, setScope] = useState<RuleScope>(natural);

  const rules = useAsync(() => listRules(), []);
  const completions = useAsync(() => completionsOn(today), [today]);
  const streak = useAsync(() => ruleStreak(today), [today]);

  const visible = useMemo(() => {
    const all = rules.data ?? [];
    const scoped = all.filter((r) => r.scope === scope);
    return scoped.length ? scoped : all.filter((r) => r.scope === 'diario');
  }, [rules.data, scope]);

  const createRule = async () => {
    const rule = await saveRule({
      id: newId(),
      name: 'Nueva regla',
      scope,
      time: 'manana',
      order: (rules.data?.length ?? 0) + 1,
    });
    rules.reload();
    toast(`«${rule.name}» creada`);
  };

  if (rules.loading) return <Loading />;

  return (
    <div className="page">
      <PageHead
        title={es.rule.title}
        subtitle={es.rule.subtitle}
        actions={
          <Button size="sm" onClick={createRule}>
            <IconPlus size={16} /> {es.rule.newRule}
          </Button>
        }
      />

      <div className="row row--wrap" style={{ marginBottom: 'var(--sp-4)' }}>
        <Segmented value={scope} options={SCOPE_OPTIONS} onChange={setScope} label={es.rule.scope} />
        {scope === natural ? <Tag tone="gold">Hoy</Tag> : null}
      </div>

      {streak.data ? (
        <p className="muted text-sm" style={{ marginBottom: 'var(--sp-4)' }}>
          {streak.data === 1
            ? es.rule.streak_one.replace('{{count}}', '1')
            : es.rule.streak_other.replace('{{count}}', String(streak.data))}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <Empty
          title={es.rule.emptyTitle}
          text={es.rule.emptyText}
          action={<Button variant="primary" onClick={createRule}>{es.rule.newRule}</Button>}
        />
      ) : (
        visible.map((rule) => (
          <RuleCard
            key={rule.id}
            ruleId={rule.id}
            name={rule.name}
            time={rule.time}
            date={today}
            completedIds={new Set((completions.data ?? []).map((c) => c.itemId))}
            onChange={() => {
              completions.reload();
              streak.reload();
            }}
            onDelete={async () => {
              if (!confirm(es.rule.deleteConfirm)) return;
              await deleteRule(rule.id);
              rules.reload();
              toast('Regla eliminada');
            }}
          />
        ))
      )}
    </div>
  );
}

function RuleCard({
  ruleId,
  name,
  time,
  date,
  completedIds,
  onChange,
  onDelete,
}: {
  ruleId: string;
  name: string;
  time: string;
  date: string;
  completedIds: Set<string>;
  onChange: () => void;
  onDelete: () => void;
}) {
  const items = useAsync(() => ruleItems(ruleId), [ruleId]);
  const list = items.data ?? [];
  const done = list.filter((item) => completedIds.has(item.id)).length;

  return (
    <Section>
      <Panel>
        <div className="row row--between" style={{ alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow">
              {time === 'manana' ? es.rule.morning : time === 'noche' ? es.rule.evening : es.rule.day}
            </p>
            <h2 className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>{name}</h2>
          </div>
          <div className="row" style={{ gap: 'var(--sp-1)' }}>
            <Link className="icon-btn" to={`/orar/regla/editar/${ruleId}`} aria-label={es.rule.editRule}>
              <IconEdit size={18} />
            </Link>
          </div>
        </div>

        {list.length > 0 ? (
          <div style={{ margin: 'var(--sp-3) 0' }}>
            <ProgressBlocks value={done / list.length} />
          </div>
        ) : null}

        <div className="list" style={{ marginTop: 'var(--sp-2)' }}>
          {list.map((item) => (
            <RuleItemRow
              key={item.id}
              item={item}
              done={completedIds.has(item.id)}
              onToggle={async () => {
                await toggleRuleItem(date, ruleId, item.id, item.target);
                onChange();
              }}
            />
          ))}
        </div>

        {list.length === 0 ? (
          <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
            Esta regla todavía no tiene pasos.
          </p>
        ) : null}

        <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
          <ButtonLink to={`/orar/regla/editar/${ruleId}`} size="sm">
            {es.rule.editRule}
          </ButtonLink>
          <Button size="sm" variant="danger" onClick={onDelete}>
            {es.app.delete}
          </Button>
        </div>
      </Panel>
    </Section>
  );
}

/** Enlace al texto asociado a un paso, cuando lo tiene. */
function itemLink(item: RuleItem): string | null {
  if (!item.linkKind) return null;
  switch (item.linkKind) {
    case 'prayer':
      return `/orar/oraciones/${item.linkId}`;
    case 'psalm':
      return `/leer/salterio/${item.linkId}`;
    case 'bible':
      return `/leer/biblia/${item.linkId}`;
    case 'akathist':
      return `/biblioteca/akathistos/${item.linkId}`;
    case 'canon':
      return `/biblioteca/canones/${item.linkId}`;
    case 'office':
      return `/biblioteca/liturgia/${item.linkId}`;
    case 'jesus-prayer':
      return `/orar/oracion-de-jesus${item.target ? `?objetivo=${item.target}` : ''}`;
    default:
      return null;
  }
}

function RuleItemRow({
  item,
  done,
  onToggle,
}: {
  item: RuleItem;
  done: boolean;
  onToggle: () => void;
}) {
  const link = itemLink(item);

  return (
    <div className="list-item" style={{ gap: 'var(--sp-3)' }}>
      <button
        type="button"
        className="check-btn"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={`${done ? 'Desmarcar' : 'Marcar'} ${item.title}`}
      >
        <CheckCircle done={done} />
      </button>

      <span className="list-item__body">
        <span
          className="list-item__title"
          style={{ opacity: done ? 0.55 : 1, textDecoration: done ? 'line-through' : 'none' }}
        >
          {item.title}
        </span>
        {item.note ? <span className="list-item__meta">{item.note}</span> : null}
      </span>

      {item.target ? <Tag tone="gold">{item.target}</Tag> : null}
      {link ? (
        <Link to={link} className="btn btn--sm btn--ghost">
          Abrir
        </Link>
      ) : null}
    </div>
  );
}
