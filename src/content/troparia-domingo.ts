/**
 * Los troparios que no dependen del santo del día.
 *
 * Hasta ahora ATHOS sabía qué tropario cantar por un santo —el propio, si lo
 * tenía, o el general de su rango— y por las doce grandes fiestas fijas. Le
 * faltaban dos cosas que se cantan más que todo lo demás junto:
 *
 * - **Los ocho troparios de la Resurrección**, uno por tono, del Octoecos.
 *   Cada domingo del año se canta el del tono de la semana, y es lo primero
 *   que se canta en las Horas de ese día.
 * - **Los de las fiestas móviles**, las que dependen de la Pascua: Lázaro y
 *   Ramos, la Semana Santa, Tomás, la Mitad de Pentecostés, la Ascensión,
 *   Pentecostés y Todos los Santos.
 *
 * Todos son textos fijos, de los más conocidos del rito bizantino, y sus
 * originales griegos son de dominio público. La versión española es una
 * traducción hecha para ATHOS, como la de los demás troparios, y la ficha lo
 * dice.
 */
import type { SourceMeta, TextBlock } from '@/types';

export interface DayHymn {
  /** Cómo se llama en el libro. */
  name: string;
  tone: string;
  blocks: TextBlock[];
}

const t = (content: string): TextBlock => ({ kind: 'text', content });

const TRADUCCION =
  'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';

export const OCTOECHOS_META: SourceMeta = {
  source:
    'Troparios de la Resurrección (ἀπολυτίκια ἀναστάσιμα) del Octoecos. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-01',
  copyright: TRADUCCION,
  notes:
    'Es el tropario de la Resurrección del tono de la semana, el que se canta cada domingo. La traducción es de ATHOS: no procede de un libro litúrgico español publicado.',
};

export const PASCHAL_CYCLE_META: SourceMeta = {
  source:
    'Troparios del Triodion y del Pentecostarion. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-01',
  copyright: TRADUCCION,
  notes:
    'Es el tropario propio de la fiesta móvil de hoy. La traducción es de ATHOS: no procede de un libro litúrgico español publicado.',
};

/* ============================================================
   Los ocho tonos
   ============================================================ */

/** El tropario de la Resurrección de cada tono, del 1 al 8. */
export const RESURRECTION_TROPARIA: Record<number, DayHymn> = {
  1: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 1',
    blocks: [
      t('Sellada la piedra por los judíos y custodiado por los soldados tu purísimo cuerpo, resucitaste al tercer día, oh Salvador, dando la vida al mundo. Por eso las potestades de los cielos te aclamaban, oh Dador de vida: Gloria a tu resurrección, oh Cristo; gloria a tu reino; gloria a tu providencia, oh único amante de los hombres.'),
    ],
  },
  2: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 2',
    blocks: [
      t('Cuando descendiste a la muerte, oh Vida inmortal, diste muerte al Hades con el fulgor de tu divinidad; y cuando resucitaste también a los muertos de las profundidades de la tierra, todas las potestades celestiales clamaban: Dador de vida, Cristo Dios nuestro, gloria a Ti.'),
    ],
  },
  3: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 3',
    blocks: [
      t('Alégrense los cielos, regocíjese la tierra, porque el Señor ha hecho proezas con su brazo: con la muerte pisoteó la muerte, se hizo primogénito de los muertos, nos libró del seno del Hades y concedió al mundo la gran misericordia.'),
    ],
  },
  4: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 4',
    blocks: [
      t('Habiendo aprendido del ángel el luminoso anuncio de la resurrección y rechazado la condena de los primeros padres, las discípulas del Señor decían con alegría a los apóstoles: La muerte ha sido despojada; Cristo Dios ha resucitado, concediendo al mundo la gran misericordia.'),
    ],
  },
  5: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 5',
    blocks: [
      t('Al Verbo, sin principio como el Padre y el Espíritu, nacido de la Virgen para nuestra salvación, cantémosle, fieles, y adorémosle; porque quiso subir en la carne a la cruz, soportar la muerte y resucitar a los muertos con su gloriosa resurrección.'),
    ],
  },
  6: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 6',
    blocks: [
      t('Las potestades angélicas estaban sobre tu sepulcro, y los guardias quedaron como muertos; y María estaba junto al sepulcro buscando tu purísimo cuerpo. Despojaste al Hades sin ser alcanzado por él; saliste al encuentro de la Virgen, dando la vida. Señor resucitado de entre los muertos, gloria a Ti.'),
    ],
  },
  7: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 7',
    blocks: [
      t('Destruiste la muerte con tu cruz, abriste al ladrón el paraíso, cambiaste el llanto de las miróforas y mandaste a tus apóstoles que anunciaran que has resucitado, Cristo Dios, concediendo al mundo la gran misericordia.'),
    ],
  },
  8: {
    name: 'Tropario de la Resurrección',
    tone: 'Tono 8',
    blocks: [
      t('Descendiste de lo alto, oh Compasivo; aceptaste la sepultura de tres días para librarnos de las pasiones. Vida y resurrección nuestra, Señor, gloria a Ti.'),
    ],
  },
};

/* ============================================================
   El ciclo pascual
   ============================================================ */

const LAZARO_Y_RAMOS: DayHymn = {
  name: 'Tropario del Sábado de Lázaro y del Domingo de Ramos',
  tone: 'Tono 1',
  blocks: [
    t('Asegurando antes de tu pasión la resurrección de todos, resucitaste a Lázaro de entre los muertos, Cristo Dios. Por eso también nosotros, como los niños, llevando los signos de la victoria, clamamos a Ti, vencedor de la muerte: Hosanna en las alturas; bendito el que viene en el nombre del Señor.'),
  ],
};

const ESPOSO: DayHymn = {
  name: 'Tropario del Esposo',
  tone: 'Tono 8',
  blocks: [
    t('He aquí que el Esposo viene a medianoche, y bienaventurado el siervo a quien encuentre velando; pero indigno aquel a quien halle negligente. Mira, pues, alma mía, no te dejes vencer por el sueño, no sea que seas entregada a la muerte y quedes fuera del Reino; antes bien, despierta clamando: Santo, Santo, Santo eres, oh Dios; por la intercesión de la Theotokos, ten piedad de nosotros.'),
  ],
};

const PENTECOSTES: DayHymn = {
  name: 'Tropario de Pentecostés',
  tone: 'Tono 8',
  blocks: [
    t('Bendito eres, Cristo Dios nuestro, que hiciste sabios a los pescadores enviándoles el Espíritu Santo, y por medio de ellos pescaste al mundo entero. Amante de los hombres, gloria a Ti.'),
  ],
};

/**
 * Las fiestas móviles con tropario propio, por el identificador de la fiesta.
 *
 * La Pascua y la Semana Luminosa no están: en esos días las Horas no se
 * rezan como siempre, sino que se sustituyen por las Horas de Pascua, y la
 * pantalla lo dice en lugar de poner un tropario.
 */
export const MOVABLE_TROPARIA: Record<string, DayHymn> = {
  lazaro: LAZARO_Y_RAMOS,
  ramos: LAZARO_Y_RAMOS,
  'lunes-santo': ESPOSO,
  'martes-santo': ESPOSO,
  'miercoles-santo': ESPOSO,
  'jueves-santo': {
    name: 'Tropario del Jueves Santo',
    tone: 'Tono 8',
    blocks: [
      t('Cuando los gloriosos discípulos eran iluminados en el lavatorio de la cena, entonces Judas, el impío, enfermo de avaricia, se oscurecía, y te entregaba a Ti, el Juez justo, a jueces sin ley. Mira, tú que amas el dinero, al que por él acabó ahorcado; huye del alma insaciable que se atrevió a tanto contra el Maestro. Señor, bueno con todos, gloria a Ti.'),
    ],
  },
  'viernes-santo': {
    name: 'Tropario del Viernes Santo',
    tone: 'Tono 4',
    blocks: [
      t('Nos rescataste de la maldición de la ley con tu preciosa sangre: clavado en la cruz y traspasado por la lanza, hiciste brotar para los hombres la inmortalidad. Salvador nuestro, gloria a Ti.'),
    ],
  },
  'sabado-santo': {
    name: 'Tropario del Sábado Santo',
    tone: 'Tono 2',
    blocks: [
      t('El noble José, bajando del madero tu purísimo cuerpo, lo envolvió en una sábana limpia con aromas y lo depositó en un sepulcro nuevo.'),
    ],
  },
  tomas: {
    name: 'Tropario del Domingo de Tomás',
    tone: 'Tono 7',
    blocks: [
      t('Estando sellado el sepulcro, Tú, la Vida, saliste de la tumba, Cristo Dios; y estando cerradas las puertas, te presentaste a los discípulos, Tú, resurrección de todos, renovando por ellos en nosotros un espíritu recto, según tu gran misericordia.'),
    ],
  },
  'mitad-pentecostes': {
    name: 'Tropario de la Mitad de Pentecostés',
    tone: 'Tono 8',
    blocks: [
      t('En la mitad de la fiesta, da de beber a mi alma sedienta las aguas de la piedad, oh Salvador, porque a todos clamaste: El que tenga sed, que venga a mí y beba. Fuente de la vida, Cristo Dios nuestro, gloria a Ti.'),
    ],
  },
  ascension: {
    name: 'Tropario de la Ascensión',
    tone: 'Tono 4',
    blocks: [
      t('Subiste en gloria, Cristo Dios nuestro, alegrando a tus discípulos con la promesa del Espíritu Santo, después de haberlos confirmado con tu bendición, porque Tú eres el Hijo de Dios, el Redentor del mundo.'),
    ],
  },
  pentecostes: PENTECOSTES,
  'espiritu-santo': PENTECOSTES,
  'todos-los-santos': {
    name: 'Tropario de Todos los Santos',
    tone: 'Tono 4',
    blocks: [
      t('Adornada con la sangre de tus mártires de todo el mundo como con púrpura y lino fino, tu Iglesia clama a Ti por ellos, Cristo Dios: envía tus misericordias a tu pueblo, da la paz a tu comunidad y a nuestras almas la gran misericordia.'),
    ],
  },
  miroforas: {
    name: 'Tropario de las Miróforas',
    tone: 'Tono 2',
    blocks: [
      t('El noble José, bajando del madero tu purísimo cuerpo, lo envolvió en una sábana limpia con aromas y lo depositó en un sepulcro nuevo; pero al tercer día resucitaste, Señor, concediendo al mundo la gran misericordia.'),
    ],
  },
  'padres-nicea': {
    name: 'Tropario de los Padres del I Concilio',
    tone: 'Tono 8',
    blocks: [
      t('Glorificado en extremo eres, Cristo Dios nuestro, que pusiste a nuestros Padres como lumbreras sobre la tierra y por medio de ellos nos guiaste a todos a la fe verdadera. Muy compasivo, gloria a Ti.'),
    ],
  },
  ortodoxia: {
    name: 'Tropario del Domingo de la Ortodoxia',
    tone: 'Tono 2',
    blocks: [
      t('Veneramos tu purísima imagen, oh Bueno, pidiendo el perdón de nuestras faltas, Cristo Dios; porque quisiste subir voluntariamente en la carne a la cruz para librar de la esclavitud del enemigo a los que Tú formaste. Por eso te aclamamos con acción de gracias: Todo lo llenaste de alegría, Salvador nuestro, al venir a salvar al mundo.'),
    ],
  },
};

/**
 * Fiestas móviles que celebran a un santo que ya tiene ficha: se canta su
 * tropario, el mismo de su fiesta fija.
 */
export const MOVABLE_SAINT_OF: Record<string, string> = {
  palamas: 'gregorio-palamas',
  'adoracion-cruz': 'exaltacion-s',
  'juan-climaco': 'juan-climaco',
  'maria-egipciaca': 'maria-egipcia',
};

/** Fiestas móviles del Señor que, en domingo, desplazan al tropario de la Resurrección. */
export const LORD_MOVABLE_FEASTS = new Set(['ramos', 'pascua', 'tomas', 'pentecostes']);
