import { Link, useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { getKathismaPsalms } from '@/db/psalter';
import { KATHISMATA, PSALTER_META } from '@/content/psalter';
import { Blocks, Empty, Loading, PageHead, Rule, SourceNote } from '@/components/ui';
import { ReaderToolbar } from '@/components/Reader';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { useVisitLog } from '@/hooks/useVisitLog';
import es from '@/locales/es';

/** Un kathisma entero, con sus tres estasis, para leerlo de una sentada. */
export function KathismaPage() {
  const { number = '1' } = useParams();
  const kathismaNumber = Number(number);
  const kathisma = KATHISMATA.find((k) => k.number === kathismaNumber);
  const psalms = useAsync(() => getKathismaPsalms(kathismaNumber), [kathismaNumber]);
  const path = `/leer/salterio/kathisma/${kathismaNumber}`;

  useVisitLog({
    path,
    title: es.psalter.kathisma.replace('{{n}}', String(kathismaNumber)),
    kind: es.psalter.title,
  });

  if (!kathisma) {
    return (
      <div className="page">
        <Empty title="Ese kathisma no existe" text="El Salterio se divide en veinte kathismata." />
      </div>
    );
  }

  return (
    <article className="page page--reading">
      <PageHead
        eyebrow={es.psalter.title}
        title={es.psalter.kathisma.replace('{{n}}', String(kathismaNumber))}
        subtitle={`Salmos ${kathisma.psalms[0]}–${kathisma.psalms.at(-1)}`}
      />

      <ReaderToolbar
        favorite={{
          kind: 'psalm',
          refId: `kathisma-${kathismaNumber}`,
          title: es.psalter.kathisma.replace('{{n}}', String(kathismaNumber)),
          path,
        }}
      />

      {psalms.loading ? <Loading /> : null}

      {kathisma.stases.map((stasis, index) => (
        <section key={index} style={{ marginTop: 'var(--sp-6)' }}>
          <p className="eyebrow">{es.psalter.stasis.replace('{{n}}', String(index + 1))}</p>
          {(psalms.data ?? [])
            .filter((psalm) => stasis.includes(psalm.numberLxx))
            .map((psalm) => (
              <div key={psalm.id} style={{ marginTop: 'var(--sp-4)' }}>
                <h2 className="display" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-2)' }}>
                  <Link to={`/leer/salterio/${psalm.numberLxx}`} style={{ textDecoration: 'none' }}>
                    {es.psalter.psalm.replace('{{n}}', String(psalm.numberLxx))}
                  </Link>
                </h2>
                <Blocks blocks={psalm.blocks} />
              </div>
            ))}
          {index < kathisma.stases.length - 1 ? (
            <>
              <Rule />
              <p className="rubric text-center">
                Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de
                los siglos. Amén. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios. <em>(tres veces)</em>
              </p>
            </>
          ) : null}
        </section>
      ))}

      <nav className="row row--between" style={{ marginTop: 'var(--sp-6)' }} aria-label="Navegación entre kathismata">
        {kathismaNumber > 1 ? (
          <Link className="btn" to={`/leer/salterio/kathisma/${kathismaNumber - 1}`}>
            <IconChevronLeft size={16} /> {es.psalter.kathisma.replace('{{n}}', String(kathismaNumber - 1))}
          </Link>
        ) : (
          <span />
        )}
        {kathismaNumber < 20 ? (
          <Link className="btn" to={`/leer/salterio/kathisma/${kathismaNumber + 1}`}>
            {es.psalter.kathisma.replace('{{n}}', String(kathismaNumber + 1))} <IconChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <SourceNote meta={PSALTER_META} />
    </article>
  );
}
