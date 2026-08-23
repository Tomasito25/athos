/**
 * Instalar ATHOS.
 *
 * Detecta si ya está instalada y, si no, ofrece el botón nativo cuando el
 * navegador lo permite y, en todo caso, las instrucciones manuales de cada
 * plataforma. No promete lo que el navegador no puede hacer.
 */
import { useEffect, useState } from 'react';
import {
  detectBrowser,
  detectPlatform,
  installGuideKey,
  isStandalone,
  listenForInstallPrompt,
  promptInstall,
} from '@/lib/pwa';
import { Button, Notice, PageHead, Panel, Section } from '@/components/ui';
import { IconInstall } from '@/components/icons';
import { useUi } from '@/stores/ui';
import type { BeforeInstallPromptEvent } from '@/stores/ui';
import es from '@/locales/es';

const GUIDES: Record<string, { title: string; steps: string }> = {
  android: { title: es.install.android, steps: es.install.androidSteps },
  ios: { title: es.install.ios, steps: es.install.iosSteps },
  desktop: { title: es.install.desktop, steps: es.install.desktopSteps },
  firefox: { title: es.install.firefox, steps: es.install.firefoxSteps },
};

export function InstallPage() {
  const { installEvent, setInstallEvent, toast } = useUi();
  const [standalone, setStandalone] = useState(isStandalone);
  const [local, setLocal] = useState<BeforeInstallPromptEvent | null>(installEvent);

  useEffect(() => {
    const stop = listenForInstallPrompt((event) => {
      setLocal(event);
      setInstallEvent(event);
      if (!event) setStandalone(true);
    });
    return stop;
  }, [setInstallEvent]);

  const platform = detectPlatform();
  const browser = detectBrowser();
  const guideKey = installGuideKey(platform, browser);
  const guide = GUIDES[guideKey];

  return (
    <div className="page page--reading">
      <PageHead title={es.install.title} subtitle={es.install.subtitle} />

      {standalone ? (
        <Notice>{es.install.installed}</Notice>
      ) : (
        <Panel>
          <div className="row" style={{ gap: 'var(--sp-4)' }}>
            <IconInstall size={28} style={{ color: 'var(--gold)', flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <p className="panel__title">{es.install.button}</p>
              <p className="muted text-sm">{es.install.why}</p>
            </div>
          </div>

          {local ? (
            <Button
              variant="primary"
              block
              style={{ marginTop: 'var(--sp-4)' }}
              onClick={async () => {
                const accepted = await promptInstall(local);
                if (accepted) {
                  toast(es.install.installed);
                  setStandalone(true);
                }
                setLocal(null);
                setInstallEvent(null);
              }}
            >
              {es.settings.install}
            </Button>
          ) : (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              Tu navegador no ofrece el botón de instalación automática aquí. Sigue las
              instrucciones de abajo.
            </p>
          )}
        </Panel>
      )}

      <Section title="Cómo instalarla en tu dispositivo">
        <Panel variant="quiet">
          <p className="panel__title">{guide.title}</p>
          <p>{guide.steps}</p>
        </Panel>
      </Section>

      <Section title="En cualquier otra plataforma">
        <div className="stack stack--tight">
          {Object.entries(GUIDES)
            .filter(([key]) => key !== guideKey)
            .map(([key, item]) => (
              <Panel key={key} variant="quiet">
                <p className="panel__title">{item.title}</p>
                <p className="muted text-sm">{item.steps}</p>
              </Panel>
            ))}
        </div>
      </Section>

      <Section title="Qué cambia al instalarla">
        <ul className="stack stack--tight">
          {[
            'Se abre en su propia ventana, sin la barra del navegador.',
            'Arranca más rápido, porque los recursos ya están en el dispositivo.',
            'Funciona sin conexión, igual que en la pestaña.',
            'Aparece entre las aplicaciones del sistema, con su icono.',
            'No ocupa apenas espacio: no es una aplicación nativa, es la misma web.',
          ].map((line) => (
            <li key={line} className="row">
              <span style={{ color: 'var(--gold)' }}>✤</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      <p className="source-note">
        Detectado: {platform} · {browser}. ATHOS no envía esta información a ningún sitio; sólo se
        usa aquí para mostrarte las instrucciones adecuadas.
      </p>
    </div>
  );
}
