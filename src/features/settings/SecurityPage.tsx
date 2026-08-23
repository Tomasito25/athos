/**
 * Seguridad.
 *
 * Sólo se afirma lo que de verdad ocurre: el PIN se guarda como resumen, el
 * cifrado es AES-GCM real con clave derivada del PIN, y la biometría, cuando
 * está disponible, sirve para desbloquear, no para cifrar.
 */
import { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { clearLock, getLockConfig, setLockPin, useJournalSession } from '@/stores/journal';
import { cryptoAvailable, platformAuthenticatorAvailable } from '@/lib/crypto';
import { Button, Field, Notice, PageHead, Panel, Section, Switch } from '@/components/ui';
import { IconLock } from '@/components/icons';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function SecurityPage() {
  const toast = useUi((s) => s.toast);
  const session = useJournalSession();
  const lock = useAsync(() => getLockConfig(), []);
  const biometric = useAsync(() => platformAuthenticatorAvailable(), []);

  const [pin, setPin] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [encrypt, setEncrypt] = useState(true);

  const enabled = Boolean(lock.data?.enabled);

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.security} />

      {!cryptoAvailable() ? (
        <Notice variant="warn">
          Este navegador no ofrece Web Crypto, así que el cifrado no está disponible. ATHOS no
          activará una protección que no puede cumplir.
        </Notice>
      ) : null}

      <Section title={es.journal.lock}>
        <Panel>
          {enabled ? (
            <>
              <div className="row" style={{ gap: 'var(--sp-3)' }}>
                <IconLock size={22} style={{ color: 'var(--gold)' }} />
                <div style={{ flex: 1 }}>
                  <p className="panel__title">El diario está protegido</p>
                  <p className="muted text-sm">
                    {lock.data?.encrypt
                      ? 'Las entradas nuevas se cifran con AES-GCM.'
                      : 'Las entradas se guardan sin cifrar; el PIN sólo oculta la pantalla.'}
                  </p>
                </div>
              </div>
              <Button
                variant="danger"
                style={{ marginTop: 'var(--sp-4)' }}
                onClick={async () => {
                  if (
                    !confirm(
                      'Al quitar el PIN, las entradas ya cifradas seguirán cifradas y no podrán leerse. ¿Continuar?',
                    )
                  )
                    return;
                  await clearLock();
                  session.lock();
                  lock.reload();
                  toast('Bloqueo desactivado');
                }}
              >
                Quitar el bloqueo
              </Button>
            </>
          ) : (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if (pin.length < 4) {
                  toast('Usa al menos cuatro cifras');
                  return;
                }
                if (pin !== confirmation) {
                  toast('Los dos PIN no coinciden');
                  return;
                }
                await setLockPin(pin, encrypt && cryptoAvailable());
                session.unlock(pin);
                setPin('');
                setConfirmation('');
                lock.reload();
                toast(es.journal.pinSet);
              }}
            >
              <div className="stack">
                <Field label={es.journal.pin} hint="Cuatro cifras o más.">
                  {(id) => (
                    <input
                      id={id}
                      type="password"
                      inputMode="numeric"
                      autoComplete="new-password"
                      className="input"
                      value={pin}
                      onChange={(event) => setPin(event.target.value)}
                    />
                  )}
                </Field>
                <Field label={es.journal.pinConfirm}>
                  {(id) => (
                    <input
                      id={id}
                      type="password"
                      inputMode="numeric"
                      autoComplete="new-password"
                      className="input"
                      value={confirmation}
                      onChange={(event) => setConfirmation(event.target.value)}
                    />
                  )}
                </Field>

                <Switch
                  checked={encrypt && cryptoAvailable()}
                  onChange={setEncrypt}
                  title={es.journal.encrypt}
                  description={es.journal.encryptHint}
                />

                <Button type="submit" variant="primary">
                  {es.app.save}
                </Button>
              </div>
            </form>
          )}
        </Panel>
      </Section>

      <Section title={es.journal.biometric}>
        <Panel variant="quiet">
          <p className="muted text-sm">
            {biometric.data
              ? 'Este dispositivo tiene un autenticador de plataforma (huella o rostro). ATHOS puede detectarlo, pero el desbloqueo biométrico todavía no está implementado: la arquitectura está preparada y se documenta como pendiente en el README.'
              : 'Este dispositivo no ofrece un autenticador de plataforma, así que el desbloqueo biométrico no está disponible.'}
          </p>
        </Panel>
      </Section>

      <Section title="Qué protege esto, y qué no">
        <Panel variant="quiet">
          <ul className="stack stack--tight">
            {[
              'El PIN no se guarda: se almacena un resumen SHA-256 con sal.',
              'Si activas el cifrado, el texto de las entradas se cifra con AES-GCM y una clave derivada del PIN con PBKDF2 (310 000 iteraciones).',
              'La clave sólo existe en memoria mientras el diario está desbloqueado. Al recargar la página hay que volver a introducir el PIN.',
              'Si olvidas el PIN, las entradas cifradas se pierden. No hay recuperación posible, y eso es intencionado.',
              'Un PIN corto no resiste a alguien con acceso al dispositivo y tiempo. Protege de una mirada casual, no de un ataque decidido.',
              'Los títulos, las fechas y las etiquetas no se cifran: hacen falta para ordenar y buscar.',
            ].map((line) => (
              <li key={line} className="row">
                <span style={{ color: 'var(--gold)', flex: 'none' }}>✤</span>
                <span className="text-sm">{line}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </Section>
    </div>
  );
}
