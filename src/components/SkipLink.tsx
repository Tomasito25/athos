/**
 * Saltar al contenido.
 *
 * Quien navega con el teclado entraba en cada pantalla por la barra lateral
 * entera —cinco secciones, favoritos, configuración— antes de llegar al
 * texto. El `main` ya tenía `id="contenido"` y `tabIndex={-1}` esperando a
 * que algo apuntara ahí; esto es ese algo.
 *
 * Se lleva el foco a mano en vez de dejar que el navegador siga el ancla,
 * porque un salto a `#contenido` añadiría una entrada al historial y la
 * flecha de volver dejaría de deshacer lo que el usuario cree que hizo.
 */
import es from '@/locales/es';

export function SkipLink() {
  return (
    <a
      href="#contenido"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();
        document.getElementById('contenido')?.focus();
      }}
    >
      {es.app.skipToContent}
    </a>
  );
}
