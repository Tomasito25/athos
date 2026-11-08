/**
 * El templo, parte por parte, con dos dibujos.
 *
 * Arriba la planta y el iconostasio: tocando una parte se lee qué es al lado.
 * Debajo, todas las partes por orden, de la calle al altar, para leerlas de
 * corrido.
 */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HubHero } from '@/components/hub';
import { Section, SourceNote } from '@/components/ui';
import { IconChurch } from '@/components/icons';
import { TEMPLE_META, TEMPLE_PARTS, TEMPLE_ZONES, TEMPLE_ZONE_ORDER, templePart } from '@/content/temple';
import { useHashScroll } from '@/hooks/useHashScroll';
import { ChurchPlan } from './ChurchPlan';
import { Iconostasis } from './Iconostasis';
import es from '@/locales/es';

export function TemplePage() {
  const [elegida, setElegida] = useState('iconostasio');
  const parte = templePart(elegida);
  const ficha = useRef<HTMLElement>(null);

  // En el teléfono la explicación queda debajo de los dibujos: se lleva a la
  // vista al tocar una parte, para no tener que buscarla.
  const elegir = (id: string) => {
    setElegida(id);
    if (window.matchMedia('(max-width: 51.99rem)').matches) {
      requestAnimationFrame(() => ficha.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    }
  };
  useHashScroll([]);

  return (
    <div className="page">
      <HubHero icon={IconChurch} title={es.temple.title} subtitle={es.temple.subtitle} />

      <p className="muted text-sm section-lead">{es.temple.howTo}</p>

      <div className="temple-layout">
        <figure className="temple-figure">
          <ChurchPlan selected={elegida} onSelect={elegir} />
          <figcaption>{es.temple.plan}</figcaption>
        </figure>
        <figure className="temple-figure">
          <Iconostasis selected={elegida} onSelect={elegir} />
          <figcaption>{es.temple.iconostasis}</figcaption>
        </figure>

        {parte ? (
          <aside className="temple-detail" aria-live="polite" ref={ficha}>
            <p className="eyebrow">{TEMPLE_ZONES[parte.zone].title}</p>
            <h2 className="temple-detail__name">{parte.name}</h2>
            {parte.other ? (
              <p className="temple-detail__other" lang="el">
                {parte.other}
              </p>
            ) : null}
            {parte.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </aside>
        ) : null}
      </div>

      {TEMPLE_ZONE_ORDER.map((zona) => (
        <Section key={zona} title={TEMPLE_ZONES[zona].title} id={`templo-${zona}`}>
          <p className="muted text-sm section-lead">{TEMPLE_ZONES[zona].lead}</p>
          <div className="prose book-surface">
            {TEMPLE_PARTS.filter((p) => p.zone === zona).map((p) => (
              <div key={p.id} id={p.id} className="temple-part">
                <h3>
                  {p.name}
                  {p.other ? <span className="temple-part__other"> · {p.other}</span> : null}
                </h3>
                {p.text.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section title={es.temple.related}>
        <div className="shortcut-row">
          <Link className="shortcut" to="/biblioteca/estudio/el-templo">{es.temple.course}</Link>
          <Link className="shortcut" to="/biblioteca/iconos">{es.temple.icons}</Link>
          <Link className="shortcut" to="/biblioteca/estudio/liturgia-explicada">{es.temple.liturgy}</Link>
        </div>
      </Section>

      <SourceNote meta={TEMPLE_META} />
    </div>
  );
}
