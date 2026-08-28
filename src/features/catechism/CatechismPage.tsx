/**
 * Catecismo: la portada.
 *
 * Lo primero es elegir a quién sirve lo que se va a leer. Quien no ha pisado
 * una iglesia, quien se prepara para el bautismo y quien lleva años dentro no
 * necesitan lo mismo, y mezclarlo todo es la manera más segura de que nadie
 * encuentre lo suyo.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATECHISM_LEVELS, CATECHISM_META, type CatechismLevel } from '@/content/catechism';
import { CATECHISM_PARTS } from '@/content/catechism-parts';
import { ListRow, PageHead, Panel, Section, Segmented, SourceNote } from '@/components/ui';
import es from '@/locales/es';

type Filtro = CatechismLevel | 'todo';

export function CatechismPage() {
  const [nivel, setNivel] = useState<Filtro>('todo');

  const partes = useMemo(
    () =>
      CATECHISM_PARTS.map((parte) => ({
        parte,
        cuantas:
          nivel === 'todo'
            ? parte.entries.length
            : parte.entries.filter((e) => e.level === nivel).length,
      })).filter((x) => x.cuantas > 0),
    [nivel],
  );

  const total = CATECHISM_PARTS.reduce((n, p) => n + p.entries.length, 0);

  return (
    <div className="page page--reading">
      <PageHead
        eyebrow={es.nav.library}
        title={es.catechism.title}
        subtitle={es.catechism.subtitle.replace('{{count}}', String(total))}
      />

      <Segmented
        value={nivel}
        onChange={setNivel}
        label={es.catechism.forWhom}
        options={[
          { value: 'todo' as const, label: es.catechism.all },
          { value: 'nuevo' as const, label: es.catechism.newcomer },
          { value: 'catecumeno' as const, label: es.catechism.catechumen },
          { value: 'iniciado' as const, label: es.catechism.initiated },
        ]}
      />

      {nivel !== 'todo' ? (
        <Panel variant="quiet" style={{ marginTop: 'var(--sp-4)' }}>
          <p className="text-sm">{CATECHISM_LEVELS[nivel].description}</p>
        </Panel>
      ) : null}

      <Section title={es.catechism.parts}>
        <div className="list">
          {partes.map(({ parte, cuantas }) => (
            <ListRow
              key={parte.id}
              to={`/biblioteca/catecismo/${parte.id}${nivel === 'todo' ? '' : `?nivel=${nivel}`}`}
              title={parte.title}
              meta={parte.summary}
              trailing={<span className="pill-count">{cuantas}</span>}
            />
          ))}
        </div>
      </Section>

      <Panel variant="quiet" style={{ marginTop: 'var(--sp-5)' }}>
        <p className="text-sm">{es.catechism.warning}</p>
        <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
          {es.catechism.askPriest}{' '}
          <Link to="/orar/oraciones/pedir-la-bendicion">{es.catechism.howToAsk}</Link>
        </p>
      </Panel>

      <SourceNote meta={CATECHISM_META} />
    </div>
  );
}
