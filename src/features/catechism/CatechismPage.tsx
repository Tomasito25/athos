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
import { CATECHISM_INDEX, CATECHISM_PARTS } from '@/content/catechism-parts';
import { ListRow, PageHead, Panel, Section, Segmented, SourceNote } from '@/components/ui';
import { normalize } from '@/lib/text';
import { Tailpiece } from '@/components/Ornament';
import es from '@/locales/es';

type Filtro = CatechismLevel | 'todo';

export function CatechismPage() {
  const [nivel, setNivel] = useState<Filtro>('todo');
  const [query, setQuery] = useState('');
  const needle = normalize(query);

  /*
   * Con setenta preguntas repartidas en diez partes, obligar a adivinar en
   * cuál cae la tuya es obligar a abrirlas todas. Al escribir, la portada deja
   * de enseñar partes y enseña preguntas: se busca en el enunciado y en la
   * respuesta, porque muchas veces uno recuerda una palabra del cuerpo y no
   * cómo estaba formulada la pregunta.
   */
  const encontradas = useMemo(() => {
    if (needle.length < 2) return [];
    return CATECHISM_INDEX.filter(({ entry }) => {
      if (nivel !== 'todo' && entry.level !== nivel) return false;
      const texto = normalize(`${entry.question} ${entry.answer.join(' ')}`);
      return texto.includes(needle);
    }).slice(0, 40);
  }, [needle, nivel]);

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
        ornate
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

      <input
        type="search"
        className="input"
        style={{ marginTop: 'var(--sp-4)' }}
        placeholder={es.catechism.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={es.catechism.search}
      />

      {nivel !== 'todo' ? (
        <Panel variant="quiet" style={{ marginTop: 'var(--sp-4)' }}>
          <p className="text-sm">{CATECHISM_LEVELS[nivel].description}</p>
        </Panel>
      ) : null}

      {needle.length >= 2 ? (
        <Section
          title={`${encontradas.length} ${encontradas.length === 1 ? 'pregunta' : 'preguntas'}`}
        >
          {encontradas.length === 0 ? (
            <Panel variant="quiet">
              <p className="muted">{es.catechism.noResults}</p>
            </Panel>
          ) : (
            <div className="list">
              {encontradas.map(({ entry, partId, partTitle }) => (
                <ListRow
                  key={entry.id}
                  to={`/biblioteca/catecismo/${partId}#${entry.id}`}
                  title={entry.question}
                  meta={`${partTitle} · ${entry.answer[0].slice(0, 120)}…`}
                />
              ))}
            </div>
          )}
        </Section>
      ) : null}

      <Section title={needle.length >= 2 ? es.catechism.allParts : es.catechism.parts}>
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

      <Tailpiece />

      <SourceNote meta={CATECHISM_META} />
    </div>
  );
}
