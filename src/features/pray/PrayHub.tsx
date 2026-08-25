/**
 * Portada de Orar.
 *
 * Los tres oficios del día en primer lugar —con el de ahora destacado—, y
 * debajo lo demás: la biblioteca de oraciones, las propias, el komboskini.
 */
import { Link } from 'react-router-dom';
import { useLiturgicalDay, useToday } from '@/hooks/useLiturgicalDay';
import { useAsync } from '@/hooks/useAsync';
import { listRules, prayerStats, ruleProgress } from '@/db/user';
import { DAILY_OFFICES, OFFICES_STRUCTURE_NOTE } from '@/content/hours';
import { officeNow } from '@/lib/office-time';
import { useSettings } from '@/stores/settings';
import { ListRow, PageHead, Panel, ProgressBlocks, Section, Tag } from '@/components/ui';
import { IconChotki, IconEdit, IconPray, IconScroll } from '@/components/icons';
import { PRAYER_CATEGORIES } from '@/content/prayers';
import type { RuleTime } from '@/types';
import es from '@/locales/es';

export function PrayHub() {
  const today = useToday();
  const day = useLiturgicalDay(today);
  const horas = useSettings((s) => s.officeHours);
  const ahora = officeNow(new Date().getHours(), horas);
  const stats = useAsync(() => prayerStats(today), [today]);

  const progreso = useAsync(async () => {
    const reglas = await listRules();
    const salida = new Map<RuleTime, { id: string; ratio: number; total: number }>();
    for (const regla of reglas) {
      const p = await ruleProgress(today, regla);
      salida.set(regla.time, { id: regla.id, ratio: p.ratio, total: p.items.length });
    }
    return salida;
  }, [today]);

  return (
    <div className="page">
      <PageHead title={es.nav.pray} subtitle={es.office.threeTimes} />

      <Section title={es.office.title}>
        <div className="stack">
          {DAILY_OFFICES.map((oficio) => {
            const estado = progreso.data?.get(oficio.time);
            const esAhora = oficio.time === ahora;
            return (
              <Link
                key={oficio.time}
                to={`/orar/oficio/${oficio.time}`}
                className="panel"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  borderColor: esAhora ? 'var(--gold)' : undefined,
                }}
              >
                <div className="row row--between" style={{ alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 0 }}>
                    <p className="eyebrow" lang="el">
                      {oficio.greekName}
                    </p>
                    <p className="panel__title" style={{ marginTop: 'var(--sp-1)' }}>
                      {oficio.name}
                    </p>
                    <p className="muted text-sm">{oficio.subtitle}</p>
                  </div>
                  {esAhora ? <Tag tone="gold">Ahora</Tag> : null}
                </div>

                {estado && estado.total > 0 ? (
                  <div style={{ marginTop: 'var(--sp-3)' }}>
                    <ProgressBlocks value={estado.ratio} />
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
        <p className="source-note">{OFFICES_STRUCTURE_NOTE}</p>
      </Section>

      <Section title="También">
        <div className="list">
          <ListRow
            to="/orar/oraciones"
            leading={<IconPray size={20} style={{ color: 'var(--gold)' }} />}
            title={es.prayers.title}
            meta={`${PRAYER_CATEGORIES.length} momentos, del despertar a la preparación para la comunión`}
          />
          <ListRow
            to="/orar/mis-oraciones"
            leading={<IconEdit size={20} style={{ color: 'var(--gold)' }} />}
            title={es.office.myPrayers}
            meta="Escribe las tuyas y añádelas a cualquier oficio"
          />
          <ListRow
            to="/orar/oracion-de-jesus"
            leading={<IconChotki size={20} style={{ color: 'var(--gold)' }} />}
            title={es.jesusPrayer.title}
            meta={stats.data?.today ? `Hoy: ${stats.data.today}` : es.jesusPrayer.text}
          />
          <ListRow
            to="/orar/komboskini"
            leading={<IconChotki size={20} style={{ color: 'var(--gold)' }} />}
            title={es.jesusPrayer.chotkiAlt}
            meta="La cuerda de oración, nudo a nudo"
          />
          <ListRow
            to="/orar/regla"
            leading={<IconScroll size={20} style={{ color: 'var(--gold)' }} />}
            title={es.rule.title}
            meta="Reglas propias para domingos, fiestas o tiempos de ayuno"
          />
        </div>
      </Section>

      <Panel variant="quiet" style={{ marginTop: 'var(--sp-5)' }}>
        <p className="text-sm muted">
          {day.fasting.period ? `${day.fasting.period}: ${day.fasting.label}.` : day.fasting.label}
        </p>
      </Panel>
    </div>
  );
}
