/**
 * Que se note que se ha cambiado de página.
 *
 * En una aplicación de una sola página el navegador no recarga nada: para
 * quien usa un lector de pantalla, pulsar un enlace no producía ningún aviso
 * —seguía oyendo la pantalla anterior— y el título de la pestaña se quedaba
 * en «ATHOS» para las sesenta y tantas rutas, así que el historial y los
 * marcadores del navegador tampoco distinguían una de otra.
 *
 * El título se saca del `h1` que acaba de pintarse, no de una tabla aparte:
 * lo que se anuncia y lo que se lee en la pestaña es exactamente lo que el
 * usuario ve como encabezado, y no hay dos sitios que puedan discrepar.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import es from '@/locales/es';

/** Cuánto se espera al `h1` de una pantalla que aún está cargándose. */
const ESPERA_MAXIMA = 4000;

export function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [mensaje, setMensaje] = useState('');
  const primera = useRef(true);

  useEffect(() => {
    const main = document.getElementById('contenido');
    if (!main) return;

    let vivo = true;
    let observer: MutationObserver | null = null;
    let limite = 0;

    const encabezado = () => main.querySelector('h1')?.textContent?.trim() || null;

    const aplicar = (texto: string) => {
      if (!vivo) return;
      vivo = false;
      observer?.disconnect();
      window.clearTimeout(limite);

      document.title = texto.includes(es.app.name) ? texto : `${texto} · ${es.app.name}`;
      setMensaje(texto);

      // El foco pasa al contenido para que el lector de pantalla empiece a
      // leer aquí y el siguiente tabulador siga desde la página nueva. En la
      // primera carga no: nadie ha navegado todavía, y robar el foco al
      // entrar es justo lo que no se espera.
      if (!primera.current) main.focus({ preventScroll: true });
      primera.current = false;
    };

    const ahora = encabezado();
    if (ahora) {
      aplicar(ahora);
      return () => {
        vivo = false;
      };
    }

    // La pantalla todavía se está descargando: se avisa en cuanto aparezca.
    observer = new MutationObserver(() => {
      const texto = encabezado();
      if (texto) aplicar(texto);
    });
    observer.observe(main, { childList: true, subtree: true });

    // Y si no llegara nunca, mejor el nombre de la aplicación que el título
    // de la pantalla anterior, que sería sencillamente falso.
    limite = window.setTimeout(() => aplicar(es.app.name), ESPERA_MAXIMA);

    return () => {
      vivo = false;
      observer?.disconnect();
      window.clearTimeout(limite);
    };
  }, [pathname]);

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {mensaje}
    </p>
  );
}
