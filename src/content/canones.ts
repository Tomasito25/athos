/**
 * Los cánones.
 *
 * Un canon bizantino son nueve odas, y cada oda empieza por un **irmos**: la
 * estrofa modelo, que fija la melodía y el metro de las que vienen detrás, y
 * que alude siempre al cántico bíblico de esa oda —el de Moisés en el mar, el
 * de Ana, el de Habacuc, el de los tres jóvenes en el horno—. Detrás del irmos
 * van los troparios, que son el cuerpo del canon.
 *
 * Los cinco están enteros, cada uno traducido de su original: el Pascual, el
 * Gran Canon, la Paráclesis y el de la Comunión, del griego; el del Ángel de
 * la Guarda, que sólo existe en los libros eslavos, del eslavo eclesiástico.
 * Los largos viven en su propio archivo y aquí sólo se reexportan.
 *
 * Misma advertencia que en el Akáthistos: el texto es auténtico, la versión
 * castellana es de ATHOS y no procede de ningún libro publicado.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

const base = {
  tradition: 'Rito bizantino',
  language: 'es' as const,
  license: 'cc-by-sa-4.0' as const,
  dateAdded: '2026-09-01',
};

export const canonMeta = (over: Partial<SourceMeta>): SourceMeta => ({
  ...base,
  ...over,
  source: `${over.source ?? ''} Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público.`.trim(),
  copyright:
    'Texto litúrgico tradicional; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes: `${over.notes ?? ''} Lo que es de ATHOS es la traducción: no procede de ningún libro litúrgico español publicado ni se ha cotejado con una edición crítica del griego.`.trim(),
});

/** Lo mismo, para los cánones que sólo existen en los libros eslavos. */
export const canonMetaEslavo = (over: Partial<SourceMeta>): SourceMeta => ({
  ...base,
  ...over,
  source: `${over.source ?? ''} Traducción al español hecha para ATHOS a partir del texto en eslavo eclesiástico, que es de dominio público.`.trim(),
  copyright:
    'Texto litúrgico tradicional; el original eslavo es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes: `${over.notes ?? ''} Lo que es de ATHOS es la traducción: no procede de ningún libro español publicado ni de la versión rusa moderna que suele acompañar al eslavo.`.trim(),
});

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

/* ═══════════════════ Canon Pascual ═══════════════════ */

const ESTRIBILLO_PASCUAL = ref('Cristo ha resucitado de entre los muertos.');

const odaPascual = (n: number, irmos: string, troparios: string[]): OfficeSection =>
  s(`oda-${n}`, `Oda ${n}`, [rub('Irmos'), t(irmos), ESTRIBILLO_PASCUAL, ...troparios.map(t)]);

/**
 * Entero, del Pentecostario griego (glt.goarch.org): los irmoi, los troparios
 * de cada oda, la hipakoí, el kontakion con su ikos y la novena oda con sus
 * megalinarios. Antes estaban sólo los irmoi y la ficha decía «completo».
 */
export const CANON_PASCUAL: OfficeSection[] = [
  s('sobre', 'El canon de la noche de Pascua', [
    rub('Obra de san Juan Damasceno, en el tono primero. Se canta en los Maitines de Pascua y todos los días de la Semana Radiante. Como todos los cánones de las grandes fiestas, no tiene segunda oda.'),
    rub('Antes de cada estrofa se canta el estribillo:'),
    ESTRIBILLO_PASCUAL,
    rub('Al final de cada oda se repite el irmos, se canta tres veces «Cristo ha resucitado de entre los muertos, pisoteando la muerte con la muerte, y a los que estaban en los sepulcros dándoles la vida», y una vez:'),
    t('Jesús, resucitado del sepulcro como había predicho, nos ha dado la vida eterna y la gran misericordia.'),
    rub('Después, el sacerdote dice la letanía breve.'),
  ]),
  odaPascual(
    1,
    'Éste es el día de la Resurrección: resplandezcamos, pueblos. ¡Pascua, Pascua del Señor! Porque de la muerte a la vida y de la tierra al cielo nos ha hecho pasar Cristo Dios, a los que cantamos el himno de victoria.',
    [
      'Purifiquemos los sentidos y veremos a Cristo resplandeciente en la luz inaccesible de la resurrección, y le oiremos decir claramente: Alegraos, mientras cantamos el himno de victoria.',
      'Que los cielos se alegren como es debido, que la tierra se regocije, y que celebre la fiesta el mundo entero, el visible y el invisible: porque Cristo ha resucitado, alegría eterna.',
    ],
  ),
  odaPascual(
    3,
    'Venid, bebamos una bebida nueva, no sacada milagrosamente de una roca estéril, sino de la fuente de incorrupción que brota del sepulcro de Cristo, en quien nos afianzamos.',
    [
      'Ahora todo se ha llenado de luz: el cielo, la tierra y los abismos. Que toda la creación celebre, pues, la Resurrección de Cristo, en la que se ha afianzado.',
      'Ayer era sepultado contigo, oh Cristo; hoy resucito contigo, que has resucitado. Ayer era crucificado contigo: glorifícame Tú contigo, oh Salvador, en tu Reino.',
    ],
  ),
  s('hipakoi', 'Hipakoí', [
    rub('Después de la tercera oda, en el tono cuarto:'),
    t('Las mujeres que acompañaban a María se adelantaron a la aurora y, hallando la piedra quitada del sepulcro, oyeron al ángel: ¿Por qué buscáis entre los muertos, como a un hombre, al que está en la luz eterna? Mirad los lienzos de la sepultura; corred y anunciad al mundo que el Señor ha resucitado y ha dado muerte a la muerte, porque es el Hijo de Dios, que salva al género humano.'),
  ]),
  odaPascual(
    4,
    'Que el divino Habacuc, el que habla de Dios, se ponga con nosotros en la guardia divina y nos muestre al ángel portador de luz que dice con voz clara: Hoy es la salvación del mundo, porque ha resucitado Cristo, como todopoderoso.',
    [
      'Como varón que abrió el seno virginal se mostró Cristo; como mortal, es llamado cordero; sin defecto, porque no gustó mancha alguna, es nuestra Pascua; y como Dios verdadero, es llamado perfecto.',
      'Como cordero de un año, Cristo, corona bendita y buena para nosotros, fue inmolado voluntariamente por todos, Pascua que purifica; y de nuevo, desde el sepulcro, ha brillado para nosotros, hermoso, el sol de justicia.',
      'David, el antepasado de Dios, saltaba y danzaba delante del arca, que era sombra; y nosotros, pueblo santo de Dios, al ver cumplidas las figuras, alegrémonos en Dios, porque ha resucitado Cristo, como todopoderoso.',
    ],
  ),
  odaPascual(
    5,
    'Madruguemos al alba y, en lugar de ungüento, ofrezcamos un himno al Soberano, y veremos a Cristo, sol de justicia, que hace amanecer la vida para todos.',
    [
      'Los que estaban sujetos por las cadenas del infierno, al ver tu compasión sin medida, oh Cristo, se apresuraban hacia la luz con pie gozoso, aclamando la Pascua eterna.',
      'Salgamos con lámparas al encuentro de Cristo, que sale del sepulcro como un esposo, y celebremos con los coros de los ángeles, que aman la fiesta, la Pascua salvadora de Dios.',
    ],
  ),
  odaPascual(
    6,
    'Descendiste a lo más hondo de la tierra y quebrantaste los cerrojos eternos que retenían a los encadenados, oh Cristo; y al tercer día, como Jonás del monstruo marino, resucitaste del sepulcro.',
    [
      'Guardando intactos los sellos, oh Cristo, resucitaste del sepulcro, Tú que al nacer no dañaste los cerrojos de la Virgen; y nos abriste las puertas del Paraíso.',
      'Salvador mío, víctima viva que, por ser Dios, no podía ser inmolada: ofreciéndote voluntariamente al Padre, al resucitar del sepulcro resucitaste contigo a Adán con todo su linaje.',
    ],
  ),
  s('kontakion', 'Kontakion e ikos', [
    rub('Kontakion, en el tono octavo:'),
    t('Aunque bajaste al sepulcro, oh Inmortal, destruiste el poder del infierno y resucitaste vencedor, oh Cristo Dios, diciendo a las mujeres miróforas: Alegraos, y dando la paz a tus apóstoles, Tú que concedes la resurrección a los caídos.'),
    rub('Ikos'),
    t('Al Sol anterior al sol, que se había puesto en el sepulcro, se adelantaron al alba las jóvenes miróforas, buscándolo como al día, y se decían unas a otras: Venid, amigas, ungamos con aromas el Cuerpo portador de vida y sepultado, la carne que levanta a Adán caído, que yace en el sepulcro. Vamos, apresurémonos como los magos, adorémosle y ofrezcámosle los ungüentos como dones al que no está envuelto en pañales, sino en un sudario; y lloremos y clamemos: Oh Soberano, levántate, Tú que concedes la resurrección a los caídos.'),
    rub('Del sinaxario: «Cristo bajó solo a luchar con el infierno, y subió cargado con el gran botín de la victoria».'),
    rub('Después, tres veces:'),
    t('Habiendo visto la Resurrección de Cristo, adoremos al santo Señor Jesús, el único sin pecado. Adoramos tu Cruz, oh Cristo, y cantamos y glorificamos tu santa Resurrección: porque Tú eres nuestro Dios, fuera de Ti no conocemos otro, invocamos tu nombre. Venid, fieles todos, adoremos la santa Resurrección de Cristo: porque he aquí que por la Cruz ha venido la alegría al mundo entero. Bendiciendo siempre al Señor, cantamos su Resurrección: porque, soportando por nosotros la Cruz, destruyó la muerte con la muerte.'),
  ]),
  odaPascual(
    7,
    'El que libró a los jóvenes del horno, hecho hombre, padece como mortal, y por su pasión reviste lo mortal con la hermosura de la incorrupción: el único Dios de nuestros padres, bendito y glorificado sobre todo.',
    [
      'Las mujeres sabias en Dios corrieron tras de Ti con ungüentos; y al que buscaban con lágrimas como a un mortal, lo adoraron con alegría como Dios vivo, y anunciaron, oh Cristo, a tus discípulos la Pascua mística.',
      'Celebramos la muerte de la muerte, la destrucción del infierno, las primicias de otra vida, la eterna; y saltando de gozo cantamos al que es su causa, el único Dios de nuestros padres, bendito y glorificado sobre todo.',
      '¡Qué santa y qué llena de fiesta es esta noche salvadora y luminosa, mensajera del día resplandeciente de la Resurrección, en la que la luz sin tiempo brilló corporalmente para todos desde el sepulcro!',
    ],
  ),
  odaPascual(
    8,
    'Éste es el día señalado y santo, el primero de la semana, rey y señor, fiesta de las fiestas y solemnidad de las solemnidades, en el que bendecimos a Cristo por los siglos.',
    [
      'Venid, en el día señalado de la Resurrección, participemos del fruto nuevo de la vid, de la alegría divina, y del Reino de Cristo, cantándole como a Dios por los siglos.',
      'Alza los ojos en torno, Sión, y mira: he aquí que vienen a ti, como lumbreras que brillan con la luz de Dios, tus hijos, del occidente y del norte, del mar y del oriente, bendiciendo en ti a Cristo por los siglos.',
      'Padre todopoderoso, Verbo y Espíritu, naturaleza una en tres personas, por encima de toda esencia y de toda divinidad: en Ti hemos sido bautizados, y a Ti te bendecimos por todos los siglos.',
    ],
  ),
  s('oda-9', 'Oda 9', [
    rub('En lugar del estribillo, cada estrofa va precedida de un megalinario. El irmos se canta dos veces:'),
    ref('Engrandece, alma mía, al que padeció voluntariamente, fue sepultado y resucitó del sepulcro al tercer día.'),
    t('Ilumínate, ilumínate, nueva Jerusalén, porque la gloria del Señor ha amanecido sobre ti. Danza ahora y alégrate, Sión; y tú, Theotokos pura, gózate en la resurrección de tu Hijo.'),
    ref('Engrandece, alma mía, a Cristo, dador de vida, que resucitó del sepulcro al tercer día.'),
    t('Ilumínate, ilumínate, nueva Jerusalén, porque la gloria del Señor ha amanecido sobre ti. Danza ahora y alégrate, Sión; y tú, Theotokos pura, gózate en la resurrección de tu Hijo.'),
    ref('Un ángel resplandeciente clamaba a las mujeres: Dejad las lágrimas, porque Cristo ha resucitado.'),
    t('¡Oh divina, oh amada, oh dulcísima voz tuya! Porque prometiste sin mentira, oh Cristo, que estarías con nosotros hasta el fin del mundo; y nosotros, los fieles, nos alegramos teniéndola como ancla de la esperanza.'),
    ref('Porque Cristo ha resucitado, ha pisoteado la muerte y ha levantado a los muertos: pueblos, regocijaos.'),
    t('¡Oh Pascua grande y santísima, oh Cristo! ¡Oh Sabiduría, Verbo y Poder de Dios! Concédenos participar de Ti más plenamente en el día sin ocaso de tu Reino.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    ref('Engrandece, alma mía, el poder de la Divinidad en tres personas e indivisible.'),
    t('A una voz te llamamos bienaventurada, Virgen, los fieles: Alégrate, puerta del Señor; alégrate, ciudad viviente; alégrate, tú por quien hoy ha brillado para nosotros la luz de la resurrección de entre los muertos del que nació de ti.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    ref('Alégrate, Virgen, alégrate; alégrate, bendita; alégrate, glorificada, porque tu Hijo ha resucitado del sepulcro al tercer día.'),
    t('Alégrate y regocíjate, puerta divina de la luz: porque Jesús, que se había puesto en el sepulcro, ha amanecido más resplandeciente que el sol y ha iluminado a todos los fieles, Señora llena de la gracia de Dios.'),
    rub('Para cerrar la oda se canta el megalinario del ángel y el irmos:'),
    ref('El ángel clamó a la llena de gracia: Virgen pura, alégrate; y de nuevo te digo: alégrate, tu Hijo ha resucitado del sepulcro al tercer día.'),
    t('Ilumínate, ilumínate, nueva Jerusalén, porque la gloria del Señor ha amanecido sobre ti. Danza ahora y alégrate, Sión; y tú, Theotokos pura, gózate en la resurrección de tu Hijo.'),
  ]),
  s('exapostilario', 'Exapostilario', [
    rub('En el tono segundo, tres veces:'),
    t('Habiéndote dormido en la carne como mortal, oh Rey y Señor, al tercer día resucitaste, levantando a Adán de la corrupción y aboliendo la muerte: Pascua de la incorrupción, salvación del mundo.'),
  ]),
];

/* ═══════════════════ Gran Canon ═══════════════════ */

// Entero, en su propio archivo: son casi trescientas estrofas.
export { GRAN_CANON } from './gran-canon';

/* ═══════════════════ Pequeña Paráclesis ═══════════════════ */

// Entera, con el oficio del que forma parte, en su propio archivo.
export { PARACLISIS_CANON as CANON_PARACLISIS } from './paraclesis';

/* ═══════════════════ Canon al Ángel de la Guarda ═══════════════════ */

export { CANON_ANGEL } from './canon-angel';

/* ═══════════════════ Canon de la Comunión ═══════════════════ */

export { CANON_COMUNION } from './canon-comunion';
