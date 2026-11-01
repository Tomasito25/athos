/**
 * La Pascualia: las Pascuas de los próximos años.
 *
 * Una ficha por año con la Pascua y lo que se mueve con ella. Sirve para lo
 * que servía la tabla de los calendarios impresos: saber con tiempo cuándo
 * empieza la Cuaresma, cuándo es Pentecostés o si este año las dos Pascuas,
 * la ortodoxa y la occidental, caen juntas.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { paschalion } from '@/lib/calendar/paschalion';
import { isoToCivil } from '@/lib/calendar/jdn';
import { formatDayMonth } from '@/lib/format';
import { useToday } from '@/hooks/useLiturgicalDay';
import { useSettings } from '@/stores/settings';
import { Notice, PageHead, Section, Tag } from '@/components/ui';
import es from '@/locales/es';

export function PaschalionPage() {
  const today = useToday();
  const estilo = useSettings((s) => s.calendarStyle);
  const ahora = isoToCivil(today).year;
  const [cuantos, setCuantos] = useState(10);
  const anos = useMemo(() => paschalion(ahora, cuantos), [ahora, cuantos]);
  const juntas = anos.filter((a) => a.together).map((a) => a.year);

  return (
    <div className="page">
      <PageHead
        eyebrow={es.nav.calendar}
        title={es.paschalion.title}
        subtitle={es.paschalion.subtitle}
      />

      <Notice>
        {es.paschalion.how}
        {juntas.length ? ` ${es.paschalion.together.replace('{{years}}', juntas.join(', '))}` : ''}
      </Notice>

      <Section title={es.paschalion.years}>
        <div className="paschalion">
          {anos.map((a) => (
            <article key={a.year} className={`paschalion__year${a.year === ahora ? ' paschalion__year--now' : ''}`}>
              <header className="paschalion__head">
                <span className="paschalion__num">{a.year}</span>
                <Link className="paschalion__pascha" to={`/calendario/dia/${a.pascha}`}>
                  {formatDayMonth(a.pascha)}
                </Link>
              </header>
              <p className="paschalion__west">
                {a.together ? es.paschalion.sameDay : es.paschalion.west.replace('{{date}}', formatDayMonth(a.western))}
              </p>
              <dl className="paschalion__dates">
                <div>
                  <dt>{es.paschalion.triodion}</dt>
                  <dd>{formatDayMonth(a.triodion)}</dd>
                </div>
                <div>
                  <dt>{es.paschalion.cleanMonday}</dt>
                  <dd>{formatDayMonth(a.cleanMonday)}</dd>
                </div>
                <div>
                  <dt>{es.paschalion.ascension}</dt>
                  <dd>{formatDayMonth(a.ascension)}</dd>
                </div>
                <div>
                  <dt>{es.paschalion.pentecost}</dt>
                  <dd>{formatDayMonth(a.pentecost)}</dd>
                </div>
                <div className="paschalion__wide">
                  <dt>{es.paschalion.apostles}</dt>
                  <dd>
                    {es.paschalion.days.replace('{{n}}', String(estilo === 'juliano' ? a.apostlesFast.juliano : a.apostlesFast.nuevo))}
                    <span className="paschalion__other">
                      {' '}
                      ·{' '}
                      {(estilo === 'juliano' ? es.paschalion.inNew : es.paschalion.inOld).replace(
                        '{{n}}',
                        String(estilo === 'juliano' ? a.apostlesFast.nuevo : a.apostlesFast.juliano),
                      )}
                    </span>
                  </dd>
                </div>
              </dl>
              {a.together || a.kyriopascha ? (
                <div className="tag-row">
                  {a.together ? <Tag tone="gold">{es.paschalion.togetherTag}</Tag> : null}
                  {a.kyriopascha ? <Tag tone="blue">Kyriopascha</Tag> : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
        {cuantos < 30 ? (
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setCuantos((n) => n + 10)}>
            {es.paschalion.more}
          </button>
        ) : null}
      </Section>
    </div>
  );
}
