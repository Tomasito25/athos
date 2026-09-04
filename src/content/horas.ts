/**
 * Las cuatro Horas del día, enteras.
 *
 * Hasta ahora ATHOS tenía una sola ficha que las resumía: los salmos de cada
 * una y su tropario, en cuatro párrafos. Servía para saber qué era la Hora
 * Tercera; no servía para rezarla. Aquí está cada una con la forma completa
 * del Horologion, en el orden en que se dice.
 *
 * Las cuatro tienen el mismo esqueleto —tres salmos, el tropario propio de la
 * hora, el Theotokion propio, el Trisagio, cuarenta veces «Señor, ten
 * piedad», la oración de toda hora y una oración final distinta en cada una—,
 * y por eso el armazón se escribe una vez y cada Hora aporta lo suyo.
 *
 * ## De dónde salen los textos
 *
 * El reparto de los salmos y el orden de las partes son datos documentados del
 * Horologion bizantino. Los troparios, theotokia y oraciones finales son
 * textos fijos de dominio público en su original griego, y aquí van
 * traducidos para ATHOS: la ficha lo dice, y no se presentan como tomados de
 * un libro litúrgico español publicado.
 *
 * Lo que cambia cada día —el kontakion del santo o de la fiesta, que se toma
 * del Menaion, del Octoecos o del Triodion— no se inventa: se marca como
 * pendiente y se dice de dónde habría que tomarlo.
 */
import type { Office, OfficeSection, SourceMeta, TextBlock } from '@/types';
import { GREEK_FORMULAS as G } from './greek';

export const HORAS_META: SourceMeta = {
  source:
    'Horologion bizantino. El reparto de los salmos y el orden de las partes son datos documentados; ' +
    'los troparios, theotokia y oraciones finales van traducidos al español para ATHOS a partir del ' +
    'original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'public-domain',
  dateAdded: '2026-09-04',
  notes:
    'No procede de un libro litúrgico español publicado. Los propios variables del día —kontakia del ' +
    'Menaion, del Octoecos y del Triodion— siguen pendientes de incorporar.',
};

/* ---------------- Utilidades ---------------- */

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});
const gr = (clave: keyof typeof G, times?: number): TextBlock => ({
  kind: 'text',
  content: G[clave].spanish,
  greek: G[clave].greek,
  roman: G[clave].roman,
  times,
});

const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({
  id,
  title,
  blocks,
});

/* ============================================================
   Piezas que las cuatro Horas comparten
   ============================================================ */

/** «Venid, adoremos», tres veces, con que empieza toda Hora. */
const COMIENZO: TextBlock[] = [
  rub('Bendito sea nuestro Dios, ahora y siempre, y por los siglos de los siglos. Amén.'),
  rub('Y el comienzo habitual: Rey celestial, Trisagio, Padre Nuestro. Está entero en Orar → Oraciones → Comienzo habitual.'),
  gr('deute', 3),
];

/** Gloria y Aleluya, que cierran los tres salmos de cada Hora. */
const TRAS_LOS_SALMOS: TextBlock[] = [
  gr('doxa'),
  t('Aleluya, aleluya, aleluya. Gloria a Ti, oh Dios.'),
  rub('Tres veces.'),
  gr('kyrie', 3),
  gr('doxa'),
];

/**
 * «Tú que en todo tiempo y a toda hora».
 *
 * Es la misma oración en las cuatro Horas, y en las cuatro va en el mismo
 * sitio: después de las cuarenta invocaciones y antes de la oración propia.
 */
const TODA_HORA: TextBlock[] = [
  t(
    'Tú que en todo tiempo y a toda hora, en el cielo y en la tierra, eres adorado y glorificado, Cristo Dios, longánime, de gran misericordia y gran compasión, que amas a los justos y te apiadas de los pecadores, que a todos llamas a la salvación por la promesa de los bienes futuros: recibe, Señor, en esta hora nuestras súplicas y endereza nuestra vida hacia tus mandamientos. Santifica nuestras almas, purifica nuestros cuerpos, endereza nuestros pensamientos, limpia nuestras intenciones y líbranos de toda tribulación, mal y dolor. Rodéanos con tus santos ángeles, para que, guardados y guiados por ellos, alcancemos la unidad de la fe y el conocimiento de tu gloria inaccesible, porque bendito eres por los siglos de los siglos. Amén.',
  ),
  gr('kyrie', 3),
  gr('doxa'),
  head('Más honorable que los querubines'),
  t(
    'Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.',
  ),
  rub('En nombre del Señor, bendice, padre.'),
  t('Dios tenga piedad de nosotros y nos bendiga; haga resplandecer su rostro sobre nosotros y nos tenga misericordia.'),
];

// Sin encabezado propio: la sección ya se titula «Despedida».
const CIERRE: TextBlock[] = [gr('apolysis')];

/* ============================================================
   Cada Hora
   ============================================================ */

interface HoraSeed {
  id: string;
  title: string;
  subtitle: string;
  greekName: string;
  /** A qué hora se reza, en el cómputo antiguo y en el nuestro. */
  cuando: string;
  /** Qué se recuerda en ella. */
  memoria: string;
  salmos: [number, number, number];
  /** Por qué esos tres salmos y no otros. */
  porQueEsosSalmos: string;
  tropario: TextBlock[];
  theotokion: { titulo: string; texto: string };
  oracionFinal: { titulo: string; atribucion?: string; texto: string };
}

const HORAS: HoraSeed[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'hora-primera',
    title: 'Hora Primera',
    subtitle: 'Ὥρα Α´ — al amanecer, cuando empieza el día',
    greekName: 'Ὥρα Α´',
    cuando: 'La primera hora del día antiguo: hacia las seis de la mañana, al salir el sol.',
    memoria:
      'Es la hora en que Cristo fue llevado ante Pilato. Se reza al empezar la jornada, para ponerla entera bajo la luz de Dios antes de que se llene de otras cosas.',
    salmos: [5, 89, 100],
    porQueEsosSalmos:
      'El 5 es la oración de la mañana —«de mañana oirás mi voz»—; el 89 mide la brevedad de la vida frente a la eternidad de Dios; el 100 es el propósito del que empieza el día queriendo obrar bien.',
    tropario: [
      t('Por la mañana escucha mi voz, Rey mío y Dios mío.'),
      rub('Con sus versículos, del salmo 5.'),
      t('Presta oído a mis palabras, Señor; atiende a mi clamor.'),
    ],
    theotokion: {
      titulo: '¿Cómo te llamaremos?',
      texto:
        '¿Cómo te llamaremos, oh Llena de gracia? ¿Cielo, porque hiciste brillar al Sol de justicia? ¿Paraíso, porque diste la flor de la incorrupción? ¿Virgen, porque permaneciste incorrupta? ¿Madre pura, porque tuviste en tus santos brazos al Hijo, Dios de todos? Ruégale que salve nuestras almas.',
    },
    oracionFinal: {
      titulo: 'Cristo, luz verdadera',
      texto:
        'Cristo, luz verdadera, que iluminas y santificas a todo hombre que viene al mundo: imprime en nosotros la luz de tu rostro, para que en ella veamos la luz inaccesible; y endereza nuestros pasos al cumplimiento de tus mandamientos, por las súplicas de tu purísima Madre y de todos tus santos. Amén.',
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hora-tercera',
    title: 'Hora Tercera',
    subtitle: 'Ὥρα Γ´ — media mañana, la hora de Pentecostés',
    greekName: 'Ὥρα Γ´',
    cuando: 'La tercera hora del día antiguo: hacia las nueve de la mañana.',
    memoria:
      'A esta hora descendió el Espíritu Santo sobre los apóstoles el día de Pentecostés, y a esta hora fue juzgado Cristo ante Pilato. Las dos memorias van juntas: el don del Espíritu y la condena del Inocente.',
    salmos: [16, 24, 50],
    porQueEsosSalmos:
      'El 16 es la súplica del que se sabe mirado por Dios; el 24 pide que se le enseñen los caminos; y el 50, el salmo del arrepentimiento, prepara para recibir al Espíritu —«no quites de mí tu santo Espíritu» es un versículo suyo, y es el que se repite en el tropario de esta hora—.',
    tropario: [
      t('Señor, que a la hora tercia enviaste tu Santísimo Espíritu sobre tus apóstoles: no nos lo quites, oh Bueno, sino renuévalo en nosotros, que te suplicamos.'),
      rub('Con sus dos versículos, del salmo 50, después de cada repetición.'),
      t('Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.'),
      t('No me eches de tu presencia, y no quites de mí tu santo Espíritu.'),
    ],
    theotokion: {
      titulo: 'Tú eres la vid verdadera',
      texto:
        'Theotokos, tú eres la vid verdadera que engendró el fruto de la vida. A ti te suplicamos: intercede, Soberana, junto con los apóstoles y con todos los santos, para que se tenga misericordia de nuestras almas.',
    },
    oracionFinal: {
      titulo: 'Soberano Dios, Padre todopoderoso',
      atribucion: 'De san Mardario',
      texto:
        'Soberano Dios, Padre todopoderoso; Señor Hijo unigénito, Jesucristo; y Espíritu Santo: una sola Divinidad, un solo Poder. Ten piedad de mí, pecador, y por los designios que Tú conoces sálvame a mí, indigno siervo tuyo, porque bendito eres por los siglos de los siglos. Amén.',
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hora-sexta',
    title: 'Hora Sexta',
    subtitle: 'Ὥρα Ϛ´ — mediodía, la hora de la Cruz',
    greekName: 'Ὥρα Ϛ´',
    cuando: 'La sexta hora del día antiguo: el mediodía.',
    memoria:
      'Es la hora en que Cristo fue clavado en la cruz, y la hora en que las tinieblas cubrieron la tierra. Se reza en mitad de la jornada, cuando el trabajo aprieta y es más fácil olvidarse.',
    salmos: [53, 54, 90],
    porQueEsosSalmos:
      'El 53 y el 54 son gritos del perseguido —«sálvame por tu nombre», «me rodean los terrores de la muerte»— y llevan al pie de la cruz; el 90, «el que habita al abrigo del Altísimo», es la respuesta: el amparo bajo el que se pasa la hora oscura.',
    tropario: [
      t('Tú que en el día sexto y a la hora sexta clavaste en la cruz el pecado que Adán cometió temerariamente en el paraíso: rasga también el documento de nuestras culpas, Cristo Dios, y sálvanos.'),
    ],
    theotokion: {
      titulo: 'Como no tenemos audacia',
      texto:
        'Como no tenemos audacia por causa de nuestros muchos pecados, ruega tú, Virgen Theotokos, a Aquel que de ti nació; porque mucho puede la súplica de una Madre para alcanzar el favor del Soberano. No desprecies las plegarias de los pecadores, oh Purísima, porque es misericordioso y poderoso para salvar Aquel que quiso padecer por nosotros.',
    },
    oracionFinal: {
      titulo: 'Dios y Señor de las potestades',
      atribucion: 'De san Basilio el Grande',
      texto:
        'Dios y Señor de las potestades, Creador de toda la creación: Tú que por la entrañable misericordia de tu compasión enviaste a tu Hijo unigénito, nuestro Señor Jesucristo, para la salvación de nuestro linaje, y por su preciosa Cruz rompiste el documento de nuestros pecados y con ella venciste a los principados y potestades de las tinieblas: recibe Tú mismo, oh Soberano amante de los hombres, también nuestras súplicas de pecadores, y líbranos de toda caída ruinosa y mortal y de toda asechanza visible e invisible de los enemigos que buscan hacernos mal. Clava nuestras carnes en tu temor y no inclines nuestro corazón a palabras o pensamientos de malicia, sino hiere nuestras almas con tu amor, para que, mirando siempre hacia Ti y guiados por tu luz, contemplándote a Ti, luz inaccesible y sempiterna, te tributemos incesante alabanza y acción de gracias, Padre sin principio, con tu Hijo unigénito y tu Espíritu santísimo, bueno y vivificador, ahora y siempre, y por los siglos de los siglos. Amén.',
    },
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hora-novena',
    title: 'Hora Novena',
    subtitle: 'Ὥρα Θ´ — media tarde, la hora de la muerte del Señor',
    greekName: 'Ὥρα Θ´',
    cuando: 'La novena hora del día antiguo: hacia las tres de la tarde.',
    memoria:
      'Es la hora en que Cristo entregó el espíritu. Con ella se cierra el día litúrgico: las Vísperas que vienen después ya pertenecen al día siguiente.',
    salmos: [83, 84, 85],
    porQueEsosSalmos:
      'El 83 es la nostalgia de los atrios de Dios; el 84 anuncia la reconciliación de la tierra con el cielo, que es lo que se cumple en la cruz; el 85 es la súplica del pobre a la hora de la prueba.',
    tropario: [
      t('Tú que a la hora novena por nosotros gustaste la muerte en la carne: mortifica la soberbia de nuestra carne, Cristo Dios, y sálvanos.'),
    ],
    theotokion: {
      titulo: 'Tú que por nosotros naciste de la Virgen',
      texto:
        'Tú que por nosotros naciste de la Virgen y soportaste la crucifixión, oh Bueno; que con tu muerte despojaste a la muerte y como Dios manifestaste la resurrección: no desprecies a los que formaste con tu mano. Muestra tu amor por los hombres, oh Misericordioso; acoge a la Theotokos que te dio a luz y que intercede por nosotros, y salva, Salvador nuestro, a un pueblo desesperado.',
    },
    oracionFinal: {
      titulo: 'Soberano Señor Jesucristo',
      atribucion: 'De san Basilio el Grande',
      texto:
        'Soberano Señor Jesucristo, Dios nuestro, que fuiste longánime con nuestras faltas y nos has traído hasta esta hora, en la que, colgado del árbol vivificante, abriste al buen ladrón el camino del paraíso y con tu muerte destruiste la muerte: ten piedad de nosotros, pecadores e indignos siervos tuyos. Porque hemos pecado y obrado inicuamente, y no somos dignos de levantar los ojos ni de alzar la mirada a lo alto del cielo, pues abandonamos el camino de tu justicia y anduvimos tras la voluntad de nuestro corazón. Pero suplicamos a tu inmensa bondad: perdónanos, Señor, según la muchedumbre de tu misericordia, y sálvanos por tu santo nombre, porque en vanidad se consumieron nuestros días. Líbranos de la mano del adversario, perdona nuestros pecados y mortifica nuestro pensamiento carnal, para que, despojados del hombre viejo, nos revistamos del nuevo y vivamos para Ti, nuestro Soberano y bienhechor; y así, siguiendo tus mandamientos, alcancemos el descanso eterno, donde habitan todos los que se alegran. Porque Tú eres en verdad la verdadera alegría y el gozo de los que te aman, Cristo Dios nuestro, y a Ti damos gloria, con tu Padre sin principio y con tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.',
    },
  },
];

/* ============================================================
   De cada Hora, un oficio entero
   ============================================================ */

const secciones = (hora: HoraSeed): OfficeSection[] => [
  section('sentido', 'Qué se reza en esta hora', [
    rub(hora.cuando),
    t(hora.memoria),
  ]),

  section('comienzo', 'Comienzo', COMIENZO),

  section('salmos', `Los tres salmos · ${hora.salmos.join(', ')}`, [
    rub(hora.porQueEsosSalmos),
    ...hora.salmos.map((n) =>
      rub(`Salmo ${n} — se lee entero. Está en Leer → Salterio → Salmo ${n}.`),
    ),
    ...TRAS_LOS_SALMOS,
  ]),

  section('tropario', 'Tropario de la hora', [
    rub('Es lo propio de esta Hora y no cambia nunca: dice por qué se reza precisamente ahora.'),
    ...hora.tropario,
    gr('doxa'),
  ]),

  section('theotokion', `Theotokion · ${hora.theotokion.titulo}`, [
    rub('El theotokion propio de esta Hora, después del tropario.'),
    t(hora.theotokion.texto),
  ]),

  section('propios', 'Lo que cambia cada día', [
    rub('Aquí van el tropario del santo o de la fiesta y el kontakion del día.'),
    pending(
      'los troparios y kontakia propios del día, que se toman del Menaion, del Octoecos y —en Cuaresma— del Triodion.',
    ),
  ]),

  section('trisagio', 'Trisagio y Padre Nuestro', [
    rub('El comienzo habitual otra vez, ahora hacia el final. Está en Orar → Oraciones → Comienzo habitual.'),
  ]),

  section('kyrie', 'Señor, ten piedad', [
    rub('Cuarenta veces, sin prisa. No es una cuenta que despachar: es el tiempo que la Hora reserva para no decir nada más.'),
    gr('kyrie', 40),
  ]),

  section('toda-hora', 'Oración de toda hora', [
    rub('La misma en las cuatro Horas.'),
    ...TODA_HORA,
  ]),

  section('final', `Oración final · ${hora.oracionFinal.titulo}`, [
    ...(hora.oracionFinal.atribucion ? [rub(hora.oracionFinal.atribucion)] : []),
    t(hora.oracionFinal.texto),
  ]),

  section('despedida', 'Despedida', CIERRE),
];

const plain = (sections: OfficeSection[]) =>
  sections
    .flatMap((s) => [s.title, ...s.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content)])
    .join(' ')
    .replace(/<[^>]+>/g, '')
    .toLowerCase();

/** Las cuatro Horas, como oficios de pleno derecho de la biblioteca. */
export const HORAS_OFFICES: Office[] = HORAS.map((hora, i) => ({
  id: hora.id,
  title: hora.title,
  subtitle: hora.subtitle,
  kind: 'horas' as const,
  order: 100 + i,
  sections: secciones(hora),
  about: `${hora.memoria} ${hora.cuando}`,
  structure:
    'Como las otras tres: el comienzo, tres salmos fijos, el tropario propio de la hora con su ' +
    'theotokion, los propios del día, el Trisagio, cuarenta veces «Señor, ten piedad», la oración ' +
    'de toda hora y una oración final que sólo se dice en esta Hora.',
  status: 'partial' as const,
  meta: HORAS_META,
  searchText: `${hora.title} ${hora.subtitle} ${hora.greekName} ${plain(secciones(hora))}`,
}));

/** Los datos sueltos de cada Hora, para la ficha que las presenta juntas. */
export const HORAS_RESUMEN = HORAS.map((h) => ({
  id: h.id,
  title: h.title,
  greekName: h.greekName,
  cuando: h.cuando,
  memoria: h.memoria,
  salmos: h.salmos,
}));
