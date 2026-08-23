/**
 * Arranque de ATHOS.
 *
 * Prepara lo imprescindible antes del primer render —tema, idioma, base de
 * datos— y deja para más tarde lo que puede esperar: construir el Salterio e
 * indexar la Biblia se hacen cuando el navegador está ocioso, para que la
 * primera pantalla aparezca cuanto antes.
 */
import { initI18n, applyDocumentLanguage } from '@/lib/i18n';
import { applySettingsToDocument, useSettings } from '@/stores/settings';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { requestPersistentStorage } from '@/db/db';
import { ensurePsalterBuilt } from '@/db/psalter';
import { bibleIndexStatus, indexWholeBible } from '@/db/bible';

const idle = (task: () => void, timeout = 4000) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout });
  } else {
    setTimeout(task, timeout);
  }
};

export async function bootstrap(): Promise<void> {
  const settings = useSettings.getState();

  applySettingsToDocument(settings);
  applyDocumentLanguage(settings.language);
  await initI18n(settings.language);

  // El tema del sistema puede cambiar mientras la aplicación está abierta.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => applySettingsToDocument(useSettings.getState()));

  useSettings.subscribe((state) => applySettingsToDocument(state));

  await seedContent();
  await seedUserDefaults();

  // Sin bloquear el arranque.
  idle(() => {
    void requestPersistentStorage();
    void ensurePsalterBuilt().catch(() => {
      /* Sin conexión y sin el archivo en caché todavía: se reintentará. */
    });
  });

  idle(() => {
    if (!useSettings.getState().autoIndexBible) return;
    void bibleIndexStatus().then(({ done, total }) => {
      if (done < total) void indexWholeBible().catch(() => undefined);
    });
  }, 12_000);
}
