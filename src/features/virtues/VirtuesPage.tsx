/**
 * Las virtudes, en la biblioteca.
 *
 * Arriba, la imagen que las ordena: la casa del alma de san Doroteo de Gaza, con
 * la fe de cimiento, el amor de techo y la humildad de argamasa. Se puede tocar:
 * cada parte lleva a su virtud. Debajo, todas, agrupadas como en el menú de
 * oración, para que en los dos sitios estén en el mismo orden.
 */
import { Link } from 'react-router-dom';
import { ListRow, Section, SourceNote } from '@/components/ui';
import { HubHero } from '@/components/hub';
import { IconLamp } from '@/components/icons';
import { RichText } from '@/components/RichText';
import { VIRTUE_GROUPS, VIRTUE_INFO } from '@/content/prayer-categories';
import { momentById } from '@/content/moments';
import { CASA_DEL_ALMA, VIRTUES_META } from '@/content/virtudes';
import type { VirtueId } from '@/types';
import es from '@/locales/es';

const nombre = (id: VirtueId) => momentById(id)?.name ?? id;

function Parte({ id, papel }: { id: VirtueId; papel: string }) {
  return (
    <Link to={`/biblioteca/virtudes/${id}`} className="soul-house__part" data-part={id}>
      <span className="soul-house__role">{papel}</span>
      <span className="soul-house__virtue">{nombre(id)}</span>
    </Link>
  );
}

/** Las piedras de la casa: san Doroteo nombra éstas, y dice «y las demás». */
const PIEDRAS: VirtueId[] = ['obediencia', 'templanza', 'misericordia', 'mansedumbre'];

function CasaDelAlma() {
  return (
    <figure className="soul-house">
      <div className="soul-house__drawing">
        <Link to="/biblioteca/virtudes/amor" className="soul-house__roof">
          <span className="soul-house__role">{es.virtues.houseRoof}</span>
          <span className="soul-house__virtue">{nombre('amor')}</span>
        </Link>
        <Parte id="discernimiento" papel={es.virtues.houseTies} />
        <div className="soul-house__walls">
          <Parte id="paciencia" papel={es.virtues.houseCorners} />
          <div className="soul-house__stones">
            <span className="soul-house__role">{es.virtues.houseStones}</span>
            <div className="soul-house__stone-grid">
              {PIEDRAS.map((id) => (
                <Link key={id} to={`/biblioteca/virtudes/${id}`} className="soul-house__stone">
                  {nombre(id).replace(/^(La|El) /, '')}
                </Link>
              ))}
            </div>
          </div>
          <Parte id="fortaleza" papel={es.virtues.houseCorners} />
        </div>
        <Parte id="humildad" papel={es.virtues.houseMortar} />
        <Parte id="fe" papel={es.virtues.houseFoundation} />
      </div>
      <figcaption className="source-note" style={{ borderTop: 'none', paddingTop: 0 }}>
        {es.virtues.houseLead}
      </figcaption>
    </figure>
  );
}

export function VirtuesPage() {
  return (
    <div className="page">
      <HubHero icon={IconLamp} title={es.virtues.title} subtitle={es.virtues.subtitle} />

      <Section title={es.virtues.house}>
        <CasaDelAlma />
        <details className="fold">
          <summary>{es.virtues.whole}</summary>
          <div className="prose prose--compact">
            {CASA_DEL_ALMA.map((cita) => (
              <p key={cita.text}>{cita.text}</p>
            ))}
            <p className="source-note" style={{ borderTop: 'none' }}>
              {CASA_DEL_ALMA[0]!.who}, {CASA_DEL_ALMA[0]!.where}
            </p>
          </div>
        </details>
      </Section>

      {VIRTUE_GROUPS.map((grupo) => (
        <Section key={grupo.id} title={grupo.name}>
          <p className="muted text-sm section-lead">
            <RichText>{grupo.note}</RichText>
          </p>
          <div className="list">
            {grupo.virtues.map((id) => (
              <ListRow
                key={id}
                to={`/biblioteca/virtudes/${id}`}
                title={
                  <>
                    {nombre(id)}
                    <span className="pray-row__greek" lang="el">
                      {VIRTUE_INFO[id].greek}
                    </span>
                  </>
                }
                meta={momentById(id)?.description}
              />
            ))}
          </div>
        </Section>
      ))}

      <SourceNote meta={VIRTUES_META} status="complete" />
    </div>
  );
}
