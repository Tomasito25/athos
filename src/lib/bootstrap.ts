/**
 * Arranque de ATHOS.
 *
 * Prepara lo imprescindible antes del primer render —tema y base de datos— y
 * deja para más tarde lo que puede esperar: construir el Salterio e indexar
 * la Biblia se hacen cuando el navegador está ocioso, para que la primera
 * pantalla aparezca cuanto antes.
 */
import { applySettingsToDocument, useSettings } from '@/stores/settings';
import { seedContent, seedUserDefaults } from '@/db/seed';
import { requestPersistentStorage } from '@/db/db';
import { loadLectionary } from '@/db/lectionary';

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

  // El tema del sistema puede cambiar mientras la aplicación está abierta.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => applySettingsToDocument(useSettings.getState()));

  useSettings.subscribe((state) => {
    applySettingsToDocument(state);
    void loadLectionary(state.calendarStyle);
  });

  await seedContent();
  await seedUserDefaults();

  // Las lecturas del día son lo primero que se ve en Inicio: se piden ya, sin
  // bloquear el render, y la pantalla se actualiza en cuanto llegan.
  void loadLectionary(settings.calendarStyle);

  // Lo que sigue se importa al usarlo, no arriba: si se importara arriba, su
  // código —y el calendario y el santoral de los que tira— se descargaría y
  // analizaría antes de pintar la primera pantalla.

  // Los recordatorios se programan en cada arranque: antes sólo al tocar el
  // interruptor, y al recargar la aplicación no quedaba ninguno programado.
  idle(() => void import('@/lib/reminders').then((m) => m.startReminders()), 2000);

  // Sin bloquear el arranque.
  idle(() => {
    void requestPersistentStorage();
    void import('@/db/psalter')
      .then((m) => m.ensurePsalterBuilt())
      .catch(() => {
        /* Sin conexión y sin el archivo en caché todavía: se reintentará. */
      });
  });

  // El corpus que no va en el precaché, para que se lea sin conexión.
  idle(() => void import('@/lib/corpus').then((m) => m.scheduleCorpusWarmup()), 6000);

  idle(() => {
    if (!useSettings.getState().autoIndexBible) return;
    void import('@/db/bible').then(async ({ bibleIndexStatus, indexWholeBible }) => {
      const { done, total } = await bibleIndexStatus();
      if (done < total) void indexWholeBible().catch(() => undefined);
    });
  }, 12_000);
}
