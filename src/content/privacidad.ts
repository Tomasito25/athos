/**
 * La política de privacidad.
 *
 * Es una sola fuente para dos sitios: la pantalla de la aplicación
 * (`/privacidad`) y una página estática, `privacidad.html`, que la
 * compilación genera con la misma letra. La estática tiene dirección fija y
 * se lee sin JavaScript, que es lo que piden las tiendas de aplicaciones; la
 * de la aplicación se abre sin salir de ella, que en un iPhone con ATHOS
 * instalada es la única forma de poder volver.
 *
 * No importa nada: la lee también `vite.config.ts`, donde no hay alias.
 */

export interface PrivacySection {
  title: string;
  paragraphs: string[];
}

/** Cuándo se cambió por última vez. Si cambia el fondo, se sube y se anota en el CHANGELOG. */
export const PRIVACY_UPDATED = '2026-10-19';

export const PRIVACY_INTRO =
  'ATHOS no recoge datos de quien la usa. No hay cuentas, ni analítica, ni publicidad, ni cookies, ni ' +
  'servicios de terceros dentro de la aplicación. Esta página explica qué se guarda, dónde, y qué ' +
  'peticiones hace ATHOS a internet, que son pocas y no llevan nada tuyo.';

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: 'Lo que guardas se queda en tu dispositivo',
    paragraphs: [
      'Tus reglas de oración, favoritos, notas, marcadores, oraciones propias, sesiones de la oración de ' +
        'Jesús, el avance de los planes de lectura y las preferencias se guardan en el almacenamiento ' +
        'del navegador de este dispositivo (IndexedDB y localStorage). No se envían a ningún sitio y ATHOS ' +
        'no tiene servidor donde guardarlos.',
      'Por eso tampoco se sincronizan entre dispositivos, y por eso conviene hacer de vez en cuando una ' +
        'copia de seguridad: si el navegador borra los datos del sitio —Safari puede hacerlo con las webs ' +
        'que no se abren en semanas, y también se borran al limpiar el navegador—, sólo la copia los ' +
        'recupera. La copia es un archivo que se genera en el propio dispositivo; tú decides dónde ' +
        'guardarlo.',
      'Esos datos van ligados a la dirección desde la que se abre ATHOS. Si la aplicación cambiara de ' +
        'dirección, habría que exportarlos en la vieja e importarlos en la nueva.',
    ],
  },
  {
    title: 'Las peticiones que hace ATHOS',
    paragraphs: [
      'ATHOS está publicada en GitHub Pages, un servicio de GitHub. Hace a ese servidor —y sólo a ése— ' +
        'tres clases de peticiones:',
      '1. Al instalarla, descarga la aplicación y los textos que necesita para funcionar sin conexión.',
      '2. La primera vez que abres un libro de la Biblia, un icono o un alfabeto que todavía no tiene ' +
        'guardado, lo descarga.',
      '3. Al abrirla, al volver a ella, al recuperar la conexión y cada hora mientras está abierta, ' +
        'pregunta si hay una versión nueva. Es una petición de un archivo, sin nada tuyo dentro.',
      'Ninguna de esas peticiones lleva datos tuyos, pero, como toda petición en internet, el servidor ' +
        've la dirección IP y el navegador desde los que se hace, y GitHub puede guardarlo en sus ' +
        'registros según su propia declaración de privacidad ' +
        '(https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement). ' +
        'ATHOS no tiene acceso a esos registros ni los usa.',
    ],
  },
  {
    title: 'Recordatorios',
    paragraphs: [
      'Si activas los recordatorios, se programan en tu dispositivo y los muestra tu propio navegador. ' +
        'No pasan por ningún servidor de avisos, y por eso no son fiables con la aplicación cerrada: en ' +
        'Android dependen de que Chrome despierte la aplicación, y en iPhone no llegan. La forma de que ' +
        'avisen siempre es exportarlos al calendario del teléfono, que es un archivo que se genera en el ' +
        'dispositivo.',
    ],
  },
  {
    title: 'Enlaces a otros sitios',
    paragraphs: [
      'Algunas fichas enlazan a su fuente: Wikimedia Commons para los iconos, el repositorio de ATHOS ' +
        'para informar de un error. Al tocar uno de esos enlaces sales de ATHOS y se aplica la política ' +
        'de ese sitio.',
    ],
  },
  {
    title: 'Borrar tus datos',
    paragraphs: [
      'En Configuración → Datos puedes borrar todo lo tuyo, o sólo el historial o las sesiones de ' +
        'oración. También se borra todo al eliminar los datos del sitio desde los ajustes del navegador, ' +
        'o al desinstalar la aplicación en Android.',
    ],
  },
  {
    title: 'Menores',
    paragraphs: ['ATHOS no recoge datos de nadie, tampoco de menores.'],
  },
  {
    title: 'Cambios en esta política',
    paragraphs: [
      'Esta página tiene una dirección fija. Si cambia algo de fondo, se anota aquí la fecha y en el ' +
        'registro de cambios del proyecto.',
    ],
  },
];
