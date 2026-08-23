import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { dayRuleProgress, prayerStats } from '@/db/user';
import { ListRow, PageHead, Panel, ProgressBlocks, Section } from '@/components/ui';
import { IconChotki, IconPray, IconScroll, OrthodoxCross } from '@/components/icons';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import es from '@/locales/es';

/** Portada de la sección Orar. */
export function PrayHub() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const rule = useAsync(() => dayRuleProgress(today, day.weekday === 0 ? 'domingo' : 'diario'), [today, day.weekday]);
  const stats = useAsync(() => prayerStats(today), [today]);

  const suggested = new Date().getHours() < 15 ? 'manana' : 'noche';
  const suggestedCategory = PRAYER_CATEGORIES.find((c) => c.id === suggested)!;

  return (
    <div className="page">
      <PageHead title={es.nav.pray} subtitle="Oraciones, regla, oración de Jesús y chotki." />

      <Panel>
        <div className="row row--between" style={{ alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow">{es.home.rule}</p>
            <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>
              {rule.data && rule.data.total ? es.rule.progress : es.rule.emptyTitle}
            </p>
          </div>
          <OrthodoxCross size={22} style={{ color: 'var(--gold)', flex: 'none' }} />
        </div>
        {rule.data && rule.data.total > 0 ? (
          <div style={{ marginTop: 'var(--sp-3)' }}>
            <ProgressBlocks value={rule.data.ratio} />
          </div>
        ) : null}
      </Panel>

      <Section title="Empezar ahora">
        <div className="list">
          <ListRow
            to={`/orar/oraciones/categoria/${suggestedCategory.id}`}
            leading={<IconPray size={20} style={{ color: 'var(--gold)' }} />}
            title={suggestedCategory.name}
            meta={suggestedCategory.description}
          />
          <ListRow
            to="/orar/regla"
            leading={<IconScroll size={20} style={{ color: 'var(--gold)' }} />}
            title={es.rule.title}
            meta={es.rule.subtitle}
          />
          <ListRow
            to="/orar/oracion-de-jesus"
            leading={<IconChotki size={20} style={{ color: 'var(--gold)' }} />}
            title={es.jesusPrayer.title}
            meta={
              stats.data?.today
                ? `Hoy: ${stats.data.today}`
                : es.jesusPrayer.text
            }
          />
          <ListRow
            to="/orar/chotki"
            leading={<IconChotki size={20} style={{ color: 'var(--gold)' }} />}
            title={es.jesusPrayer.chotki}
            meta="Contador de nudos con vibración y sonido opcionales"
          />
        </div>
      </Section>

      <Section title={es.prayers.categories} action={{ label: es.prayers.allPrayers, to: '/orar/oraciones' }}>
        <div className="grid">
          {PRAYER_CATEGORIES.slice(0, 6).map((category) => (
            <a key={category.id} className="card" href={`/orar/oraciones/categoria/${category.id}`}>
              <span className="card__title">{category.name}</span>
              <span className="card__text">{category.description}</span>
            </a>
          ))}
        </div>
      </Section>

      <p className="muted text-sm" style={{ marginTop: 'var(--sp-5)' }}>
        {day.fasting.period ? `${day.fasting.period}: ${day.fasting.label}.` : day.fasting.label}
      </p>
    </div>
  );
}
