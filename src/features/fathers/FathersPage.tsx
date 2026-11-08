/**
 * Los Padres de la Iglesia.
 *
 * Veinticuatro nombres en una lista plana no enseñan nada: parecen todos
 * contemporáneos y todos igual de lejanos. Puestos por épocas se ve lo que
 * importa —que hay etapas, que cada una discutía una cosa distinta, y que la
 * patrística no se acabó en Bizancio— y de paso la lista se vuelve
 * recorrible.
 */
import { useMemo, useState } from 'react';
import { FATHERS_BY_ERA, FATHERS_NOTE } from '@/content/fathers';
import { ListRow, PageHead, Panel, Section, StatusTag } from '@/components/ui';
import { normalize } from '@/lib/text';
import es from '@/locales/es';

export function FathersPage() {
  const [query, setQuery] = useState('');
  const needle = normalize(query);

  const grupos = useMemo(
    () =>
      FATHERS_BY_ERA.map((era) => ({
        ...era,
        fathers: needle
          ? era.fathers.filter((f) => normalize(f.searchText).includes(needle))
          : era.fathers,
      })).filter((era) => era.fathers.length > 0),
    [needle],
  );

  const total = grupos.reduce((suma, era) => suma + era.fathers.length, 0);

  return (
    <div className="page">
      <PageHead
        title={es.library.fathers}
        subtitle="Qué enseñó cada uno, de qué trata cada obra suya y por dónde empezar a leerlo."
      />

      <input
        type="search"
        className="input"
        placeholder={es.fathers.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={es.fathers.search}
      />

      {needle && total === 0 ? (
        <Panel variant="quiet">
          <p className="muted">{es.fathers.noneFound}</p>
        </Panel>
      ) : null}

      {grupos.map((era) => (
        <Section key={era.id} title={era.title}>
          <p className="muted text-sm" style={{ marginBottom: 'var(--sp-3)' }}>
            {era.note}
          </p>
          <div className="list">
            {era.fathers.map((father) => (
              <ListRow
                key={father.id}
                to={`/biblioteca/padres/${father.id}`}
                title={father.name}
                meta={`${father.century} · ${father.teaching[0]?.split('.')[0] ?? father.biography.slice(0, 120)}.`}
                trailing={<StatusTag status={father.status} />}
              />
            ))}
          </div>
        </Section>
      ))}

      <p className="source-note">{FATHERS_NOTE}</p>
    </div>
  );
}
