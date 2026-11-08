/**
 * La pantalla de arranque, mientras llega la primera pantalla.
 *
 * Al entrar directamente en una página interior —un enlace compartido, un
 * aviso, la recarga—, React monta antes de que haya llegado el código de esa
 * página. Sin esto, React Router dejaba la ventana en blanco ese momento y
 * lo avisaba en la consola. Es el mismo dibujo que trae `index.html`, sin su
 * entrada de nuevo: para quien mira, la espera es una sola.
 */
export function BootScreen() {
  return (
    <div className="boot-screen boot-screen--seguida" role="status" aria-live="polite">
      <div className="boot-mark" aria-hidden="true">
        <svg viewBox="0 0 64 96" width="44" height="66">
          <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <path d="M32 6v84" />
            <path d="M16 20h32" />
            <path d="M8 38h48" />
            <path d="M14 50l36 16" />
          </g>
        </svg>
      </div>
      <p className="boot-word">ATHOS</p>
    </div>
  );
}
