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
import { QrCode } from '@/components/QrCode';
import { resolvePhoneUrl, type PhoneUrl } from '@/lib/phone-url';
import { IconInstall, IconUpload } from '@/components/icons';
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

  // La dirección que hay que darle al teléfono: la publicada si ATHOS está en
  // un dominio, y si no la de este ordenador en la red local.
  const [phone, setPhone] = useState<PhoneUrl | null>(null);
  useEffect(() => {
    let vigente = true;
    resolvePhoneUrl(window.location).then((r) => {
      if (vigente) setPhone(r);
    });
    return () => {
      vigente = false;
    };
  }, []);

  const platform = detectPlatform();
  const browser = detectBrowser();
  const guideKey = installGuideKey(platform, browser);
  const guide = GUIDES[guideKey];

  // Sin contexto seguro no hay instalación posible, y conviene decirlo antes
  // de que el usuario busque un botón que no va a aparecer.
  const secure = typeof window !== 'undefined' && window.isSecureContext;
  const href = typeof window !== 'undefined' ? window.location.href : '';

  const compartir = async () => {
    const datos = { title: 'ATHOS', text: 'Oración · Tradición · Vida', url: href };
    if (navigator.share) {
      try {
        await navigator.share(datos);
        return;
      } catch {
        /* El usuario canceló: no es un error. */
      }
    }
    try {
      await navigator.clipboard.writeText(href);
      toast(es.install.copied);
    } catch {
      toast(href);
    }
  };

  return (
    <div className="page page--reading">
      <PageHead title={es.install.title} subtitle={es.install.subtitle} />

      {/* ---- Llevarla al teléfono ---- */}
      {!standalone ? (
        <Panel style={{ marginBottom: 'var(--sp-5)' }}>
          <p className="panel__title">{es.install.toPhone}</p>

          {phone?.url ? (
            <>
              <div
                className="row"
                style={{ gap: 'var(--sp-4)', alignItems: 'flex-start', marginTop: 'var(--sp-3)' }}
              >
                <QrCode value={phone.url} size={168} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="text-sm">{es.install.scanIt}</p>
                  <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                    <code style={{ overflowWrap: 'anywhere' }}>{phone.url}</code>
                  </p>
                  <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
                    <Button
                      size="sm"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(phone.url!);
                          toast(es.install.copied);
                        } catch {
                          toast(phone.url!);
                        }
                      }}
                    >
                      {es.install.copyLink}
                    </Button>
                  </div>
                </div>
              </div>

              {phone.reason === 'lan' ? (
                <>
                  <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
                    {es.install.lanSame}
                  </p>
                  {!phone.installable ? (
                    <div style={{ marginTop: 'var(--sp-3)' }}>
                      <Notice variant="warn">{es.install.lanOnly}</Notice>
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          ) : phone?.reason === 'loopback' ? (
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <p className="text-sm" style={{ fontWeight: 600 }}>
                {es.install.loopbackTitle}
              </p>
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                {es.install.loopbackText}
              </p>
              <pre className="command">{phone.command ?? './run.sh --movil'}</pre>
              <div className="btn-row">
                <Button
                  size="sm"
                  onClick={async () => {
                    const orden = phone.command ?? './run.sh --movil';
                    try {
                      await navigator.clipboard.writeText(orden);
                      toast(es.install.copied);
                    } catch {
                      toast(orden);
                    }
                  }}
                >
                  {es.install.copyCommand}
                </Button>
              </div>
            </div>
          ) : phone?.reason === 'blocked' ? (
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <p className="text-sm" style={{ fontWeight: 600 }}>
                {es.install.blockedTitle}
              </p>
              <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                {es.install.blockedText}
              </p>
              {phone.ip ? (
                <p className="muted text-sm" style={{ marginTop: 'var(--sp-2)' }}>
                  <code>
                    {phone.ip}:{phone.port}
                  </code>
                </p>
              ) : null}
            </div>
          ) : phone ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              {es.install.noLan}
            </p>
          ) : null}
        </Panel>
      ) : null}

      {!secure && !standalone ? (
        <div className="stack" style={{ marginBottom: 'var(--sp-5)' }}>
          <Notice variant="warn">
            <div>
              <p style={{ fontWeight: 600 }}>{es.install.insecureTitle}</p>
              <p style={{ marginTop: 'var(--sp-2)' }}>{es.install.insecureText}</p>
              <p style={{ marginTop: 'var(--sp-2)' }}>{es.install.insecureHow}</p>
            </div>
          </Notice>
          <p className="muted text-sm">
            {es.install.currentUrl}: <code>{href}</code>
          </p>
        </div>
      ) : null}

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
          ) : secure ? (
            <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
              Tu navegador no ofrece el botón de instalación automática aquí. Sigue las
              instrucciones de abajo.
            </p>
          ) : null}

          <Button block style={{ marginTop: 'var(--sp-3)' }} onClick={compartir}>
            <IconUpload size={16} /> {es.install.share}
          </Button>
          <p className="field__hint" style={{ marginTop: 'var(--sp-2)' }}>
            {es.install.shareHint}
          </p>
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
