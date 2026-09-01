/**
 * Bajar hasta el elemento que nombra la URL.
 *
 * Las listas largas —una época de la historia, una parte del catecismo— se
 * enlazan por dentro: la portada apunta a un concilio o a una pregunta
 * concreta con una almohadilla. Sin esto, el enlace deja al lector arriba del
 * todo, con veinte entradas por delante y sin saber cuál era la suya.
 *
 * Dos detalles que sólo se ven probándolo en un navegador de verdad:
 *
 * · No sirve `scrollIntoView`, porque la barra superior es fija y taparía
 *   justo el título al que se ha ido; hay que descontar su alto.
 * · No sirve `requestAnimationFrame` para esperar al montaje, porque no se
 *   dispara en una pestaña que no está pintando y entonces el salto no
 *   ocurriría nunca. Un `setTimeout` de cero sí se dispara siempre.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Alto de la barra superior fija, para no dejar el destino debajo de ella. */
const BARRA = 72;

export function useHashScroll(deps: unknown[] = []) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const espera = window.setTimeout(() => {
      const destino = document.getElementById(id);
      if (!destino) return;
      const top = destino.getBoundingClientRect().top + window.scrollY - BARRA;
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    }, 0);
    return () => window.clearTimeout(espera);
    // Las dependencias extra las pone quien llama: cambiar de época o de
    // filtro vuelve a montar la lista y hay que repetir el salto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, ...deps]);
}
