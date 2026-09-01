/**
 * Los troparios generales, por rango.
 *
 * Cuatrocientos diecisiete santos sin tropario no se arreglan escribiendo
 * cuatrocientos diecisiete himnos: eso sería inventarlos, y es justo lo que
 * ATHOS no hace. Pero el hueco tampoco había que dejarlo, porque la Iglesia ya
 * lo tiene resuelto y lleva siglos haciéndolo.
 *
 * En el Horologion figuran los **troparios generales** —τὰ γενικὰ
 * ἀπολυτίκια—, uno por cada rango de santidad: uno para un mártir, otro para
 * un obispo, otro para un monje, otro para una mártir. Cuando un santo no
 * tiene tropario propio, o cuando la parroquia no dispone del Menaion del mes,
 * se canta el general de su rango. No es un apaño: es lo prescrito, y en un
 * monasterio se hace cualquier día del año.
 *
 * Así que cada santo recibe el tropario que la Iglesia le cantaría de verdad,
 * y la ficha dice exactamente qué está leyendo: el general de su rango, no el
 * suyo propio. Lo que falta sigue faltando, y ahora se sabe qué es.
 *
 * Sobre la versión española: los originales griegos son de dominio público y
 * antiquísimos; lo que no está disponible con licencia compatible son las
 * traducciones modernas. Éstas las ha traducido ATHOS del griego, y su ficha
 * lo dice. Traducir un texto que existe no es inventarlo; presentarlo como
 * «versión de uso corriente» cuando es propia, sí lo sería.
 */
import type { SaintCategory, SourceMeta, TextBlock } from '@/types';

export const GENERAL_TROPARION_META: SourceMeta = {
  source:
    'Troparios generales (γενικὰ ἀπολυτίκια) del Horologion bizantino. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-01',
  copyright:
    'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes:
    'No es el tropario propio de este santo, sino el general de su rango, que es lo que la Iglesia canta cuando no se dispone del propio. La traducción es de ATHOS: no procede de un libro litúrgico español publicado.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });

/** A qué rango se atiende primero cuando un santo tiene varios. */
const ORDEN: SaintCategory[] = [
  'apostol',
  'granmartir',
  'martir',
  'neomartir',
  'obispo',
  'padre',
  'monje',
  'profeta',
  'confesor',
  'justo',
];

interface General {
  /** Cómo se llama este tropario en el libro. */
  name: string;
  /** El tono en que se canta. */
  tone: string;
  blocks: TextBlock[];
}

const GENERALES: Partial<Record<SaintCategory, General>> = {
  apostol: {
    name: 'Tropario general de un apóstol',
    tone: 'Tono 3',
    blocks: [
      t('Santo apóstol <em>(nombre)</em>, intercede ante el Dios misericordioso para que conceda a nuestras almas el perdón de los pecados.'),
    ],
  },
  martir: {
    name: 'Tropario general de un mártir',
    tone: 'Tono 4',
    blocks: [
      t('Tu mártir <em>(nombre)</em>, oh Señor, ha recibido de Ti, nuestro Dios, la corona incorruptible por el combate que sostuvo. Porque, teniendo tu fuerza, derribó a los tiranos y quebró el débil atrevimiento de los demonios. Por sus súplicas, oh Cristo Dios, salva nuestras almas.'),
    ],
  },
  granmartir: {
    name: 'Tropario general de un gran mártir',
    tone: 'Tono 4',
    blocks: [
      t('Tu mártir <em>(nombre)</em>, oh Señor, ha recibido de Ti, nuestro Dios, la corona incorruptible por el combate que sostuvo. Porque, teniendo tu fuerza, derribó a los tiranos y quebró el débil atrevimiento de los demonios. Por sus súplicas, oh Cristo Dios, salva nuestras almas.'),
      rub('Para una mártir se dice: «Tu cordera <em>(nombre)</em>, oh Jesús, clama con voz grande: A Ti, mi Esposo, te amo, y buscándote combato».'),
    ],
  },
  neomartir: {
    name: 'Tropario general de un mártir',
    tone: 'Tono 4',
    blocks: [
      t('Tu mártir <em>(nombre)</em>, oh Señor, ha recibido de Ti, nuestro Dios, la corona incorruptible por el combate que sostuvo. Porque, teniendo tu fuerza, derribó a los tiranos y quebró el débil atrevimiento de los demonios. Por sus súplicas, oh Cristo Dios, salva nuestras almas.'),
      rub('Los neomártires —los que padecieron bajo el dominio otomano o en el siglo XX— tienen además troparios propios de cada Iglesia local.'),
    ],
  },
  obispo: {
    name: 'Tropario general de un jerarca',
    tone: 'Tono 4',
    blocks: [
      t('Regla de fe e imagen de mansedumbre, maestro de templanza te mostró a tu grey la verdad de las cosas. Por eso alcanzaste con la humildad lo excelso, y con la pobreza la riqueza. Padre y jerarca <em>(nombre)</em>, intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
    ],
  },
  padre: {
    name: 'Tropario general de un jerarca',
    tone: 'Tono 4',
    blocks: [
      t('Regla de fe e imagen de mansedumbre, maestro de templanza te mostró a tu grey la verdad de las cosas. Por eso alcanzaste con la humildad lo excelso, y con la pobreza la riqueza. Padre y jerarca <em>(nombre)</em>, intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
      rub('Si el Padre no fue obispo sino monje, se canta el tropario general de los monjes.'),
    ],
  },
  monje: {
    name: 'Tropario general de un monje',
    tone: 'Tono 8',
    blocks: [
      t('Con el torrente de tus lágrimas cultivaste el desierto estéril, y con tus gemidos desde lo hondo diste fruto de trabajos hasta el ciento por uno; y fuiste antorcha del mundo, resplandeciendo con milagros, <em>(nombre)</em>, padre nuestro. Intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
      rub('Para una monja se dice: «En ti, madre, se guardó con exactitud lo que es según imagen; porque, tomando la cruz, seguiste a Cristo…».'),
    ],
  },
  profeta: {
    name: 'Tropario general de un profeta',
    tone: 'Tono 2',
    blocks: [
      t('Celebrando la memoria de tu profeta <em>(nombre)</em>, oh Señor, por él te suplicamos: salva nuestras almas.'),
    ],
  },
  confesor: {
    name: 'Tropario general de un confesor',
    tone: 'Tono 8',
    blocks: [
      t('Guía de la ortodoxia, maestro de la piedad y de la pureza, lumbrera del mundo, ornamento de los obispos inspirado por Dios: <em>(nombre)</em>, sabio, con tus enseñanzas iluminaste a todos. Cítara del Espíritu, intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
    ],
  },
  justo: {
    name: 'Tropario general de un justo',
    tone: 'Tono 2',
    blocks: [
      t('El justo vivirá siempre en la memoria: no temerá el rumor de las malas noticias. Su corazón está firme, esperando en el Señor.'),
      rub('Se toma del salmo 111, que la Iglesia canta como tropario para los justos y para los antepasados de Cristo.'),
    ],
  },
};

/**
 * Los troparios propios de las grandes fiestas.
 *
 * Una fiesta del Señor o de la Theotokos no tiene tropario «general»: tiene el
 * suyo, y es de los textos más conocidos de la Iglesia —se canta doce veces al
 * año y se aprende de oído—. Los originales griegos son antiguos y de dominio
 * público; la versión española es, como los generales, traducción de ATHOS.
 *
 * Sólo entran las fiestas cuyo tropario se canta sin variantes. Las
 * conmemoraciones menores del Señor o de la Theotokos —una deposición de
 * reliquia, un traslado— se quedan sin él, y su ficha lo dirá.
 */
const FIESTAS: Record<string, General> = {
  'natividad-senor': {
    name: 'Tropario de la Natividad',
    tone: 'Tono 4',
    blocks: [
      t('Tu Natividad, oh Cristo Dios nuestro, hizo amanecer sobre el mundo la luz del conocimiento; porque en ella los que servían a los astros aprendieron de un astro a adorarte a Ti, Sol de justicia, y a conocerte a Ti, Oriente de lo alto. Señor, gloria a Ti.'),
    ],
  },
  'teofania-señor': {
    name: 'Tropario de la Teofanía',
    tone: 'Tono 1',
    blocks: [
      t('Al ser bautizado Tú, Señor, en el Jordán, se manifestó la adoración de la Trinidad: porque la voz del Padre dio testimonio de Ti, llamándote Hijo amado, y el Espíritu en forma de paloma confirmó la certeza de la palabra. Cristo Dios, que apareciste y alumbraste al mundo, gloria a Ti.'),
    ],
  },
  'encuentro-senor': {
    name: 'Tropario del Encuentro',
    tone: 'Tono 1',
    blocks: [
      t('Alégrate, llena de gracia, Theotokos Virgen, porque de ti amaneció el Sol de justicia, Cristo nuestro Dios, que ilumina a los que están en tinieblas. Alégrate también tú, anciano justo, que recibiste en tus brazos al Libertador de nuestras almas, el que nos concede la resurrección.'),
    ],
  },
  'anunciacion-s': {
    name: 'Tropario de la Anunciación',
    tone: 'Tono 4',
    blocks: [
      t('Hoy es el principio de nuestra salvación y la manifestación del misterio escondido desde los siglos: el Hijo de Dios se hace hijo de la Virgen, y Gabriel anuncia la gracia. Por eso también nosotros clamamos con él a la Theotokos: Alégrate, llena de gracia, el Señor es contigo.'),
    ],
  },
  transfiguracion: {
    name: 'Tropario de la Transfiguración',
    tone: 'Tono 7',
    blocks: [
      t('Te transfiguraste en el monte, oh Cristo Dios, mostrando a tus discípulos tu gloria cuanto podían soportarla. Haz brillar también sobre nosotros, pecadores, tu luz eterna, por las súplicas de la Theotokos. Dador de luz, gloria a Ti.'),
    ],
  },
  dormicion: {
    name: 'Tropario de la Dormición',
    tone: 'Tono 1',
    blocks: [
      t('En tu maternidad conservaste la virginidad; en tu dormición no abandonaste el mundo, oh Theotokos. Pasaste a la vida, siendo Madre de la Vida, y con tus súplicas libras de la muerte nuestras almas.'),
    ],
  },
  'natividad-theotokos': {
    name: 'Tropario de la Natividad de la Theotokos',
    tone: 'Tono 4',
    blocks: [
      t('Tu natividad, oh Theotokos Virgen, anunció el gozo a toda la tierra, porque de ti amaneció el Sol de justicia, Cristo nuestro Dios, que anuló la maldición y dio la bendición, y aboliendo la muerte nos dio la vida eterna.'),
    ],
  },
  'entrada-theotokos-s': {
    name: 'Tropario de la Entrada en el Templo',
    tone: 'Tono 4',
    blocks: [
      t('Hoy es el preludio de la benevolencia de Dios y el anuncio de la salvación de los hombres: en el templo de Dios aparece con claridad la Virgen y anticipa a todos el anuncio de Cristo. A ella clamemos también nosotros con voz grande: Alégrate, cumplimiento de la providencia del Creador.'),
    ],
  },
  'exaltacion-s': {
    name: 'Tropario de la Cruz',
    tone: 'Tono 1',
    blocks: [
      t('Salva, Señor, a tu pueblo y bendice tu heredad; concede la victoria sobre el adversario, y guarda a los tuyos por el poder de tu Cruz.'),
      rub('Es el mismo tropario que se canta en la Procesión de la Preciosa Cruz del 1 de agosto y en el tercer domingo de Cuaresma. La forma antigua pedía la victoria de los emperadores sobre los bárbaros; hoy conviven varias versiones y ésta es una de las corrientes.'),
    ],
  },
  'sinaxis-gabriel': {
    name: 'Tropario de las Potestades incorpóreas',
    tone: 'Tono 4',
    blocks: [
      t('Comandantes de las milicias celestiales, os suplicamos sin cesar nosotros, los indignos, que con vuestras súplicas nos rodeéis con la sombra de las alas de vuestra gloria inmaterial, guardándonos a nosotros, que nos postramos y clamamos con insistencia: Libradnos de los peligros, príncipes de las Potestades de lo alto.'),
    ],
  },
  'milagro-colosas': {
    name: 'Tropario de las Potestades incorpóreas',
    tone: 'Tono 4',
    blocks: [
      t('Comandantes de las milicias celestiales, os suplicamos sin cesar nosotros, los indignos, que con vuestras súplicas nos rodeéis con la sombra de las alas de vuestra gloria inmaterial, guardándonos a nosotros, que nos postramos y clamamos con insistencia: Libradnos de los peligros, príncipes de las Potestades de lo alto.'),
    ],
  },
  'proteccion-theotokos': {
    name: 'Tropario de la Protección',
    tone: 'Tono 4',
    blocks: [
      t('Hoy el pueblo fiel celebra con esplendor, cubierto por tu venida, oh Theotokos; y mirando tu purísima imagen, decimos con compunción: Cúbrenos con tu venerable protección y líbranos de todo mal, rogando a tu Hijo, Cristo nuestro Dios, que salve nuestras almas.'),
    ],
  },
};

export interface GeneralTroparion extends General {
  /** Qué rango se ha usado, para poder decirlo en la ficha. */
  category: SaintCategory;
  /**
   * `true` cuando es el tropario propio de la fiesta y no el general de un
   * rango. Cambia lo que dice la ficha, que es lo único que importa aquí.
   */
  own?: boolean;
}

/**
 * El tropario general que le corresponde a un santo.
 *
 * Se elige por el primero de sus rangos que tenga general, siguiendo el orden
 * de arriba: un obispo mártir se canta como mártir, que es lo que manda el
 * uso; un Padre que fue obispo, como jerarca.
 */
export function generalTroparionFor(
  categories: SaintCategory[],
  saintId?: string,
): GeneralTroparion | null {
  // Una gran fiesta no tiene general: tiene el suyo, y es el que se canta.
  const propio = saintId ? (FIESTAS[saintId] ?? FIESTAS[COMPARTEN[saintId] ?? '']) : undefined;
  if (propio) {
    return { ...propio, category: categories[0] ?? 'justo', own: true };
  }
  for (const rango of ORDEN) {
    if (categories.includes(rango) && GENERALES[rango]) {
      return { ...GENERALES[rango]!, category: rango };
    }
  }
  return null;
}

/**
 * Fiestas que cantan el tropario de otra.
 *
 * No es un atajo: es lo que manda el libro. Las tres fiestas de la Cruz
 * comparten tropario; la clausura de una fiesta repite el oficio del día
 * grande, tropario incluido; y la Sínaxis de la Theotokos cae dentro de los
 * días de la Natividad y canta el de la Natividad.
 */
const COMPARTEN: Record<string, string> = {
  'aparicion-cruz': 'exaltacion-s',
  'procesion-cruz-ago': 'exaltacion-s',
  'exaltacion-cruz': 'exaltacion-s',
  'clausura-dormicion': 'dormicion',
  'sinaxis-theotokos': 'natividad-senor',
};

/** Los propios de las grandes fiestas, para las pruebas y para el índice. */
export const FEAST_TROPARIA = Object.entries(FIESTAS).map(([id, f]) => ({ id, ...f }));

/** Todos los generales, para la pantalla que los explica. */
export const GENERAL_TROPARIA = ORDEN.filter((c) => GENERALES[c]).map((c) => ({
  category: c,
  ...GENERALES[c]!,
}));

export const GENERAL_TROPARION_NOTE =
  'Cuando un santo no tiene su tropario propio incorporado, ATHOS muestra el tropario general de ' +
  'su rango, que es lo que la Iglesia canta en ese caso: hay uno para los mártires, otro para los ' +
  'jerarcas, otro para los monjes. No es un sustituto inventado, es lo prescrito en el Horologion. ' +
  'El nombre del santo se dice en el lugar marcado. La versión española es una traducción hecha ' +
  'para ATHOS a partir del original griego, que es de dominio público.';
