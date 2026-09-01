/**
 * Fuentes y licencias.
 *
 * ATHOS sólo puede ser un proyecto abierto serio si la procedencia de cada
 * texto está a la vista. Esta pantalla reúne todo el corpus con su licencia y
 * señala explícitamente lo que falta.
 */
import { useAsync } from '@/hooks/useAsync';
import { db } from '@/db/db';
import { DEUTEROCANON_NOTE, RV1909 } from '@/content/bible';
import { PRAYER_LICENSE_NOTE } from '@/content/prayers';
import { FATHERS_NOTE } from '@/content/fathers';
import { ICONS_NOTE } from '@/content/icons';
import { HYMNS_NOTE } from '@/content/hymns';
import { LECTIONARY_COVERAGE_NOTE } from '@/content/lectionary';
import { SAINTS_COVERAGE_NOTE } from '@/content/saints';
import { GAPS, GAP_KINDS, PENDING_NOTE } from '@/content/pending';
import { PSALTER_META } from '@/content/psalter';
import { Loading, PageHead, Panel, Section, SourceNote, Tag } from '@/components/ui';
import es from '@/locales/es';

interface Coverage {
  label: string;
  complete: number;
  partial: number;
  pending: number;
}

export function SourcesPage() {
  const coverage = useAsync(async (): Promise<Coverage[]> => {
    const count = async <T extends { status: string }>(
      label: string,
      rows: Promise<T[]>,
    ): Promise<Coverage> => {
      const list = await rows;
      return {
        label,
        complete: list.filter((r) => r.status === 'complete').length,
        partial: list.filter((r) => r.status === 'partial').length,
        pending: list.filter((r) => r.status === 'pending').length,
      };
    };

    return Promise.all([
      count(es.prayers.title, db.prayers.toArray()),
      count(es.saints.title, db.saints.toArray()),
      count(es.library.liturgy, db.liturgies.toArray()),
      count(es.library.akathists, db.akathists.toArray()),
      count(es.library.canons, db.canons.toArray()),
      count(es.library.fathers, db.church_fathers.toArray()),
      count(es.library.monasteries, db.monasteries.toArray()),
      count(es.library.icons, db.icons.toArray()),
      count(es.bible.title, db.bible_books.toArray()),
    ]);
  }, []);

  const NOTES: Array<[string, string]> = [
    [es.prayers.title, PRAYER_LICENSE_NOTE],
    [es.bible.title, DEUTEROCANON_NOTE],
    [es.calendar.readings, LECTIONARY_COVERAGE_NOTE],
    [es.saints.title, SAINTS_COVERAGE_NOTE],
    [`${es.library.akathists} · ${es.library.canons}`, HYMNS_NOTE],
    [es.library.fathers, FATHERS_NOTE],
    [es.library.icons, ICONS_NOTE],
  ];

  return (
    <div className="page page--reading">
      <PageHead
        title={es.settings.sources}
        subtitle="De dónde procede cada texto y qué falta todavía."
      />

      <Section title="Estado del corpus">
        {coverage.loading ? (
          <Loading />
        ) : (
          <div className="list">
            {coverage.data?.map((item) => (
              <div className="list-item" key={item.label}>
                <span className="list-item__body">
                  <span className="list-item__title">{item.label}</span>
                </span>
                <span className="tag-row">
                  {item.complete ? <Tag tone="green">{item.complete} completos</Tag> : null}
                  {item.partial ? <Tag tone="gold">{item.partial} parciales</Tag> : null}
                  {item.pending ? <Tag tone="red">{item.pending} pendientes</Tag> : null}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/*
        Un marcador no sirve de nada: «17 pendientes» no dice si falta mucho o
        poco, ni si es un descuido o un impedimento. Esto lo desglosa y dice
        qué haría falta para cerrar cada hueco.
      */}
      <Section title="Qué falta, y por qué">
        <div className="stack stack--tight">
          {GAPS.filter((g) => g.count > 0).map((gap) => (
            <Panel key={gap.label} variant="quiet">
              <div className="row row--between">
                <p className="panel__title">{gap.label}</p>
                <Tag tone={gap.kind === 'propio' ? 'gold' : undefined}>{gap.count}</Tag>
              </div>
              <p className="text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                {gap.what}
              </p>
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                <strong>{GAP_KINDS[gap.kind].name}.</strong> {GAP_KINDS[gap.kind].note}
              </p>
            </Panel>
          ))}
        </div>
        <p className="source-note">{PENDING_NOTE}</p>
      </Section>

      <Section title="Traducción bíblica">
        <Panel>
          <p className="panel__title">{RV1909.name}</p>
          <SourceNote meta={RV1909.meta} status="complete" />
        </Panel>
      </Section>

      <Section title={es.psalter.title}>
        <Panel>
          <SourceNote meta={PSALTER_META} status="complete" />
        </Panel>
      </Section>

      <Section title="Notas por sección">
        <div className="stack stack--tight">
          {NOTES.map(([label, note]) => (
            <Panel key={label} variant="quiet">
              <p className="eyebrow">{label}</p>
              <p className="text-sm muted" style={{ marginTop: 'var(--sp-2)' }}>
                {note}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section title="Tipografía">
        <Panel variant="quiet">
          <p className="text-sm">
            EB Garamond e Inter, ambas bajo licencia SIL Open Font License 1.1, servidas desde el
            propio dominio para que ATHOS funcione sin conexión y sin consultar servidores ajenos.
          </p>
        </Panel>
      </Section>

      <Section title="Código">
        <Panel variant="quiet">
          <p className="text-sm">
            El código de ATHOS se publica bajo AGPL-3.0-or-later. El contenido religioso conserva la
            licencia que se indica en cada ficha y no queda cubierto por la licencia del código.
          </p>
        </Panel>
      </Section>
    </div>
  );
}
