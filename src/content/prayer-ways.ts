/**
 * Las formas de rezar.
 *
 * No hay una sola manera de rezar en la Iglesia ortodoxa: se reza con el
 * cuerpo, con la voz, con la mente; a horas fijas y en cualquier momento; con
 * la Iglesia y a solas; con palabras de otros y sin palabras. Esto las recorre
 * todas, en breve, y lleva a donde ATHOS tiene cada una.
 *
 * Es exposición redactada para ATHOS. No cita a los Padres sin decir dónde, ni
 * presenta como regla lo que es costumbre.
 */
import type { SourceMeta } from '@/types';

export const PRAYER_WAYS_META: SourceMeta = {
  source: 'Exposición redactada para ATHOS a partir de la práctica común de la Iglesia ortodoxa',
  tradition: 'Iglesia ortodoxa',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-14',
  notes: 'No es un texto litúrgico ni patrístico. Donde las tradiciones griega y eslava difieren, se dice.',
};

export interface PrayerWay {
  id: string;
  title: string;
  /** Una línea, para el índice. */
  lead: string;
  text: string[];
  links: Array<{ label: string; to: string }>;
}

export const PRAYER_WAYS: PrayerWay[] = [
  {
    id: 'cuerpo',
    title: 'Con el cuerpo',
    lead: 'La señal de la Cruz, estar de pie, inclinarse, postrarse.',
    text: [
      'La oración ortodoxa no es sólo de la cabeza. Se reza de pie, que es la postura de quien espera al Señor y la de los resucitados; quien no puede estar de pie se sienta, y no pasa nada: más vale rezar sentado pensando en Dios que de pie pensando en los pies.',
      'La señal de la Cruz abre y cierra cada oración, y se repite en el Trisagio, en «Gloria al Padre», al nombrar a la Trinidad. Se hace despacio, tocando de verdad la frente, el pecho y los hombros.',
      'Las inclinaciones y las postraciones —las metanoias— dicen con el cuerpo lo que la oración dice con palabras: que uno se rinde ante Dios. Los domingos y en el tiempo de Pascua no se hacen las grandes.',
      'Se reza mirando a los iconos, que no son adorno sino presencia, y se besan al acercarse: suele besarse la mano o el pie del santo, no la cara.',
    ],
    links: [
      { label: 'Metanoias', to: '/orar/metanoias' },
      { label: 'El templo', to: '/biblioteca/templo' },
    ],
  },
  {
    id: 'voz',
    title: 'Con la voz',
    lead: 'Decir las oraciones en voz baja, cantar, leer el Salterio.',
    text: [
      'Las oraciones del libro se dicen mejor en voz baja, de modo que uno se oiga, que sólo con los ojos: la voz sujeta a la mente, que si no se va. Muchos maestros de oración lo aconsejan a quien empieza.',
      'Cantar es rezar dos veces. No hace falta saber música: el tropario del día se puede decir con una melodía sencilla, y en casa basta con eso.',
      'Leer el Salterio en voz alta es una de las oraciones más antiguas de la Iglesia. Una kathisma al día lleva veinte minutos y en veinte días se ha rezado entero.',
    ],
    links: [
      { label: 'Lo propio de hoy', to: '/orar' },
      { label: 'El Salterio', to: '/leer/salterio' },
    ],
  },
  {
    id: 'corazon',
    title: 'Con la mente y el corazón',
    lead: 'La oración de Jesús, la atención, la oración sin libro.',
    text: [
      'La oración de Jesús —«Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador»— se puede decir en cualquier sitio y a cualquier hora: andando, trabajando, esperando. Se dice primero con los labios, luego con la mente, y la tradición habla de un tercer grado en que la oración baja al corazón y se reza sola; eso no se busca, se recibe.',
      'Lo que importa no es cuánto se dice sino con qué atención. Cuando la mente se escapa, se la trae de vuelta sin enfadarse, y se sigue. Eso es todo el ejercicio, y dura toda la vida.',
      'También se reza con las propias palabras, sin libro: dando gracias por el día, pidiendo por alguien, diciendo lo que pesa. El libro enseña a rezar; no sustituye la conversación.',
    ],
    links: [
      { label: 'Oración de Jesús', to: '/orar/oracion-de-jesus' },
      { label: 'Komboskini', to: '/orar/komboskini' },
      { label: 'La oración del corazón', to: '/biblioteca/estudio/oracion-del-corazon' },
      { label: 'Mis oraciones', to: '/orar/mis-oraciones' },
    ],
  },
  {
    id: 'horas',
    title: 'A sus horas',
    lead: 'Mañana y noche, las Horas, la mesa, la breve oración del día.',
    text: [
      'La Iglesia reza a horas fijas, y el que reza en casa hace lo mismo a su medida: por la mañana al levantarse, por la noche antes de acostarse, y si puede a mediodía. Una regla pequeña que se cumple cada día vale más que una larga que se deja.',
      'Hay oraciones para cada momento: antes y después de comer, al salir de casa, antes de un viaje o de un trabajo. Son breves y se dicen de pie, santiguándose.',
      'Entre una hora y otra, la oración breve: la de Jesús, o «Señor, ten piedad», o «Santísima Theotokos, sálvanos». San Serafín de Sarov pedía decir mientras se trabaja la de Jesús por la mañana y «Santísima Theotokos, sálvame, pecador» por la tarde.',
    ],
    links: [
      { label: 'Los tres oficios del día', to: '/orar' },
      { label: 'Oraciones para cada momento', to: '/orar/oraciones' },
      { label: 'Las Horas', to: '/biblioteca/liturgia/horas' },
    ],
  },
  {
    id: 'iglesia',
    title: 'Con la Iglesia',
    lead: 'La Liturgia, los oficios, el rincón de los iconos en casa.',
    text: [
      'La oración principal del cristiano no es la de su cuarto, sino la de la Iglesia reunida: la Divina Liturgia del domingo, donde se recibe la Comunión. Las demás oraciones salen de ella y vuelven a ella.',
      'Los oficios —Vísperas la víspera, Maitines por la mañana— preparan y prolongan la Liturgia. Quien no puede ir a la iglesia puede rezar en casa su forma sin sacerdote.',
      'En casa, la costumbre es tener un rincón de iconos, mirando al este si se puede, con una lamparilla; rezar ahí, a ser posible en familia, y tener allí el agua bendita y la prósfora.',
    ],
    links: [
      { label: 'Maitines en casa', to: '/orar/maitines' },
      { label: 'La Liturgia explicada', to: '/biblioteca/estudio/liturgia-explicada' },
      { label: 'Los oficios', to: '/biblioteca/liturgia' },
    ],
  },
  {
    id: 'demas',
    title: 'Por los demás',
    lead: 'Los nombres de los vivos y los difuntos, los enemigos.',
    text: [
      'Rezar por otros es parte de toda oración ortodoxa. La costumbre es tener una lista con los nombres de bautismo de los vivos y de los difuntos por los que uno reza, y decirlos uno a uno, sin prisa, por la mañana o por la noche.',
      'Se reza también por los que nos hacen daño. Es lo más difícil y lo que más claramente manda el Evangelio.',
      'Y se pide a otros que recen por uno: al sacerdote, a los amigos, a los santos. Nadie se salva solo.',
    ],
    links: [
      { label: 'Por la familia', to: '/orar/oraciones/categoria/familia' },
      { label: 'Por los difuntos', to: '/orar/oraciones/categoria/difuntos' },
      { label: 'Por los enemigos', to: '/orar/oraciones/categoria/enemigos' },
    ],
  },
  {
    id: 'escritura',
    title: 'Con la Escritura',
    lead: 'Las lecturas del día, la lectura seguida.',
    text: [
      'Leer la Escritura es escuchar antes de hablar. La Iglesia señala cada día un pasaje del Apóstol y otro del Evangelio; leerlos es rezar con ella aunque no se pueda ir a la Liturgia.',
      'Leer seguido —un Evangelio entero, un libro entero— enseña lo que los pasajes sueltos no enseñan. Se lee despacio, pidiendo antes entenderlo, y se deja que una frase acompañe el día.',
    ],
    links: [
      { label: 'Las lecturas de hoy', to: '/leer/lecturas' },
      { label: 'Planes de lectura', to: '/leer/planes' },
    ],
  },
  {
    id: 'cuando-cuesta',
    title: 'Cuando cuesta',
    lead: 'La distracción, la sequedad, los días sin ganas.',
    text: [
      'Todos los que rezan se distraen. La distracción no estropea la oración: lo que la estropea es dejarla. Se vuelve a la última frase dicha con atención y se sigue.',
      'Hay temporadas en que rezar no dice nada. La tradición las conoce bien y aconseja lo mismo siempre: no cambiar la regla por eso, rezar menos si hace falta, pero cada día.',
      'Si un día no se puede, no se lo deja del todo: una oración breve, el Padre Nuestro, unas cuantas veces la oración de Jesús. Y al día siguiente se vuelve a empezar, sin hacer cuentas.',
      'La regla de cada uno —cuánto reza, qué, cuándo— se habla con el padre espiritual. Es él quien sabe cuándo alargarla y cuándo acortarla.',
    ],
    links: [
      { label: 'Las tres medidas de los oficios', to: '/orar' },
      { label: 'El padre espiritual', to: '/biblioteca/estudio/primeros-pasos' },
    ],
  },
];
