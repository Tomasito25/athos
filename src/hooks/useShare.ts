/**
 * Compartir, diciendo siempre qué ha pasado.
 *
 * Donde el teléfono tiene hoja de compartir, ella misma es la respuesta.
 * Donde no, se copia el texto y se avisa; y si tampoco se puede copiar, se
 * dice. Los botones del versículo y del apotegma sólo avisaban al copiar: en
 * un navegador que no deja ninguna de las dos cosas, tocarlos no hacía nada.
 */
import { useCallback } from 'react';
import { shareText } from '@/lib/lectura';
import { appUrl } from '@/lib/notifications';
import { useUi } from '@/stores/ui';
import es from '@/locales/es';

export function useShare() {
  const toast = useUi((s) => s.toast);
  return useCallback(
    async (titulo: string, cuerpo: string, url: string) => {
      const resultado = await shareText(titulo, cuerpo, url);
      if (resultado === 'copied') toast(es.reader.copied);
      if (resultado === 'failed') toast(es.reader.shareFailed);
      return resultado;
    },
    [toast],
  );
}

/** La dirección completa de una ruta de ATHOS, la que se pega en un mensaje. */
export const absoluteUrl = (ruta: string) => new URL(appUrl(ruta), window.location.href).href;
