/**
 * La pantalla no se apaga mientras se reza un oficio o un akathisto.
 *
 * Ya se hacía con el contador de la oración de Jesús; en un oficio de media
 * hora, con el teléfono en la mano, la pantalla se apagaba a mitad. Se puede
 * quitar en Configuración, y donde el navegador no sabe hacerlo no pasa nada.
 */
import { useEffect, useRef } from 'react';
import { releaseWakeLock, requestWakeLock } from '@/lib/wakelock';
import { useSettings } from '@/stores/settings';

export function useKeepAwake(activo = true): void {
  const quiere = useSettings((s) => s.keepAwakeInOffices);
  const dueno = useRef(Symbol('pantalla'));

  useEffect(() => {
    if (!activo || !quiere) return;
    const yo = dueno.current;
    void requestWakeLock(yo);
    return () => {
      void releaseWakeLock(yo);
    };
  }, [activo, quiere]);
}
