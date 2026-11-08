/**
 * Los otros tres akathistos, enteros.
 *
 * Todos están calcados del de la Theotokos: trece kontakia que acaban en
 * «Aleluya» y doce ikoi que acaban con una cadena de saludos y un estribillo.
 * Los tres son de la piedad eslava y se han traducido del eslavo eclesiástico,
 * tal como lo publica el libro de oraciones ruso en la edición digital de
 * Azbuka Very (azbyka.ru), y no de la versión rusa moderna que lo acompaña,
 * que es una obra reciente con sus propios derechos.
 *
 * Hasta la versión 1.25 de estos tres sólo estaban el proimion, los
 * estribillos y alguna estrofa suelta, y dos de los estribillos estaban mal:
 * el de la Pasión no es «Jesús, Dios mío, ten piedad de mí», sino la súplica
 * del buen ladrón. Ahora están enteros y corregidos.
 *
 * Había un cuarto, «por los difuntos», y se ha retirado. Es el que en ruso se
 * llama «за единоумершего»: de autor desconocido, circula sin aprobación de
 * la Iglesia, y el Consejo Editorial del Patriarcado de Moscú advirtió en 2019
 * contra su difusión porque contiene afirmaciones contrarias a la fe. Lo que
 * la Iglesia reza por un difunto es el canon por los difuntos, que está en
 * Biblioteca → Cánones y en la panihida.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

export const akathistMeta = (over: Partial<SourceMeta>): SourceMeta => ({
  tradition: 'Rito bizantino, uso eslavo',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-01',
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

const ALELUYA = 'Aleluya.';

/** Un kontakion: su texto y el Aleluya. */
const kontakion = (n: number, texto: string, extra: TextBlock[] = []): OfficeSection =>
  s(`kontakion-${n}`, `Kontakion ${n}`, [...extra, t(texto), ref(ALELUYA)]);

/** Un ikos: su relato, los saludos y el estribillo. */
const ikos = (n: number, relato: string, saludos: string[], estribillo: string): OfficeSection =>
  s(`ikos-${n}`, `Ikos ${n}`, [t(relato), ...saludos.map(t), ref(estribillo)]);

/** Lo que se hace al terminar, que es igual en los tres. */
const cierre = (extra: TextBlock[] = []): OfficeSection =>
  s('cierre', 'Después del himno', [
    rub('El kontakion 13 se dice tres veces; después se repiten el ikos 1 y el kontakion 1, y se lee la oración.'),
    ...extra,
  ]);

/* ═══════════════ Al Dulcísimo Señor Jesús ═══════════════ */

const JESUS = 'Jesús, Hijo de Dios, ten piedad de mí.';

export const AKATHISTOS_JESUS: OfficeSection[] = [
  s('sobre', 'El akathistos al Nombre', [
    rub('Es el akathistos más rezado después del de la Theotokos, y en la piedad rusa se lee sobre todo los domingos y en la preparación para la Comunión. Su texto eslavo actual es una revisión del siglo XIX de un himno más antiguo.'),
    rub('Está construido enteramente sobre el Nombre: cada saludo de los ikoi empieza llamando a Jesús, y todos terminan con el mismo estribillo:'),
    ref(JESUS),
  ]),
  s('kontakion-1', 'Kontakion 1', [
    t('Caudillo invencible y Señor, vencedor del infierno: librado de la muerte eterna, yo, tu criatura y tu siervo, te dedico cantos de alabanza. Y Tú, que tienes una misericordia inefable, líbrame de toda desgracia, a mí, que te clamo: Jesús, Hijo de Dios, ten piedad de mí.'),
  ]),
  ikos(
    1,
    'Creador de los ángeles y Señor de los ejércitos: abre mi mente perpleja y mi lengua para alabar tu purísimo nombre, como en otro tiempo abriste el oído y la lengua del sordo tartamudo, que hablaba clamando así:',
    [
      'Jesús admirabilísimo, asombro de los ángeles; Jesús poderosísimo, liberación de los primeros padres.',
      'Jesús dulcísimo, gloria de los patriarcas; Jesús gloriosísimo, fortaleza de los fieles.',
      'Jesús amadísimo, cumplimiento de los profetas; Jesús maravillosísimo, fuerza de los mártires.',
      'Jesús apacibilísimo, alegría de los monjes; Jesús misericordiosísimo, dulzura de los presbíteros.',
      'Jesús compasivísimo, templanza de los que ayunan; Jesús suavísimo, gozo de los santos.',
      'Jesús honradísimo, castidad de las vírgenes; Jesús eterno, salvación de los pecadores.',
    ],
    JESUS,
  ),
  kontakion(
    2,
    'Al ver a la viuda que lloraba amargamente, Señor, te conmoviste entonces y resucitaste a su hijo, al que llevaban a enterrar; compadécete así también de mí, amigo de los hombres, y resucita mi alma, muerta por los pecados, que te clama:',
  ),
  ikos(
    2,
    'Buscando entender lo que no se puede entender, Felipe decía: Señor, muéstranos al Padre. Y Tú le respondiste: ¿Tanto tiempo hace que estoy contigo y no has conocido que el Padre está en mí y yo en el Padre? Por eso, oh Inescrutable, te clamo con temor:',
    [
      'Jesús, Dios eterno; Jesús, Rey poderosísimo.',
      'Jesús, Soberano paciente; Jesús, Salvador misericordiosísimo.',
      'Jesús, guardián mío bondadosísimo; Jesús, purifica mis pecados.',
      'Jesús, quita mis iniquidades; Jesús, perdona mis injusticias.',
      'Jesús, esperanza mía, no me abandones; Jesús, ayuda mía, no me rechaces.',
      'Jesús, Creador mío, no me olvides; Jesús, Pastor mío, no me pierdas.',
    ],
    JESUS,
  ),
  kontakion(
    3,
    'Tú, Jesús, que revestiste de la fuerza de lo alto a los apóstoles que esperaban en Jerusalén, revísteme también a mí, desnudo de toda obra buena, con el calor de tu Espíritu Santo, y concédeme cantarte con amor:',
  ),
  ikos(
    3,
    'Rico en misericordia, llamaste, Jesús, a publicanos, pecadores e infieles; no me desprecies tampoco ahora a mí, que soy como ellos, sino recibe este canto como un ungüento precioso:',
    [
      'Jesús, fuerza invencible; Jesús, misericordia sin fin.',
      'Jesús, hermosura resplandeciente; Jesús, amor inefable.',
      'Jesús, Hijo del Dios vivo; Jesús, ten piedad de mí, pecador.',
      'Jesús, escúchame a mí, concebido en iniquidades; Jesús, purifícame a mí, nacido en pecados.',
      'Jesús, instrúyeme a mí, que no sirvo para nada; Jesús, ilumíname a mí, que estoy a oscuras.',
      'Jesús, purifícame a mí, que estoy manchado; Jesús, hazme volver a mí, el pródigo.',
    ],
    JESUS,
  ),
  kontakion(
    4,
    'Pedro, con una tempestad de dudas dentro de sí, se hundía; pero al verte, Jesús, en la carne y caminando sobre las aguas, te reconoció como Dios verdadero y, recibiendo la mano que lo salvaba, dijo:',
  ),
  ikos(
    4,
    'Al oír el ciego que pasabas, Señor, gritaba desde el camino: Jesús, Hijo de David, ten piedad de mí. Y Tú lo llamaste y le abriste los ojos. Ilumina también, por tu misericordia, los ojos espirituales de mi corazón, a mí, que te clamo y te digo:',
    [
      'Jesús, Creador de lo de arriba; Jesús, Redentor de lo de abajo.',
      'Jesús, destructor de lo infernal; Jesús, adorno de toda la creación.',
      'Jesús, consolador de mi alma; Jesús, iluminador de mi mente.',
      'Jesús, alegría de mi corazón; Jesús, salud de mi cuerpo.',
      'Jesús, Salvador mío, sálvame; Jesús, luz mía, ilumíname.',
      'Jesús, líbrame de todo tormento; Jesús, sálvame a mí, indigno.',
    ],
    JESUS,
  ),
  kontakion(
    5,
    'Como en otro tiempo nos redimiste con tu Sangre divina de la maldición de la Ley, Jesús, así líbranos de la red en que la serpiente nos ha enredado con las pasiones de la carne, con las sugestiones de la lujuria y con el mal desaliento, a nosotros, que te clamamos:',
  ),
  ikos(
    5,
    'Viendo los niños de los hebreos, en forma humana, al que con su mano formó al hombre, y reconociéndolo como Soberano, se apresuraron a agasajarlo con ramos, clamando: Hosanna. Nosotros te ofrecemos un canto, diciendo:',
    [
      'Jesús, Dios verdadero; Jesús, Hijo de David.',
      'Jesús, Rey gloriosísimo; Jesús, Cordero sin mancha.',
      'Jesús, Pastor admirable; Jesús, guardián de mi infancia.',
      'Jesús, sustento de mi juventud; Jesús, gloria de mi vejez.',
      'Jesús, esperanza en mi muerte; Jesús, vida después de mi muerte.',
      'Jesús, consuelo mío en tu juicio; Jesús, deseo mío, no me avergüences entonces.',
    ],
    JESUS,
  ),
  kontakion(
    6,
    'Cumpliendo los anuncios y las palabras de los predicadores portadores de Dios, Jesús, apareciste en la tierra; Tú, a quien nada puede contener, viviste con los hombres y cargaste con nuestras dolencias; por eso, curados por tus llagas, hemos aprendido a cantar:',
  ),
  ikos(
    6,
    'Resplandeció en el universo la luz de tu verdad y fue ahuyentado el engaño de los demonios: porque los ídolos, Salvador nuestro, no soportando tu fuerza, cayeron. Y nosotros, que hemos recibido la salvación, te clamamos:',
    [
      'Jesús, verdad que ahuyenta el engaño; Jesús, luz que supera todo resplandor.',
      'Jesús, Rey que vence toda fuerza; Jesús, Dios que permanece en la misericordia.',
      'Jesús, Pan de vida, sáciame, que tengo hambre; Jesús, fuente del entendimiento, dame de beber, que tengo sed.',
      'Jesús, vestido de alegría, vísteme a mí, que soy corruptible; Jesús, amparo de gozo, cúbreme a mí, que soy indigno.',
      'Jesús, que das a los que piden, dame llanto por mis pecados; Jesús, que te dejas encontrar por los que buscan, encuentra mi alma.',
      'Jesús, que abres a los que llaman, abre mi corazón miserable; Jesús, Redentor de los pecadores, borra mis iniquidades.',
    ],
    JESUS,
  ),
  kontakion(
    7,
    'Queriendo revelar el misterio escondido desde siempre, fuiste llevado como oveja al matadero, Jesús, y como cordero mudo ante el que lo esquila; y como Dios resucitaste de entre los muertos, subiste con gloria a los cielos y nos levantaste contigo a nosotros, que clamamos:',
  ),
  ikos(
    7,
    'Una creación admirable mostró el Creador al aparecerse a nosotros: se encarnó de una Virgen sin semilla, resucitó del sepulcro sin romper el sello, y entró con su carne donde estaban los apóstoles con las puertas cerradas. Por eso, maravillados, cantemos:',
    [
      'Jesús, Verbo que nada abarca; Jesús, Verbo que nadie ve.',
      'Jesús, poder incomprensible; Jesús, sabiduría que no se puede pensar.',
      'Jesús, divinidad que no se puede describir; Jesús, señorío que no se puede contar.',
      'Jesús, reino invencible; Jesús, soberanía sin fin.',
      'Jesús, fuerza altísima; Jesús, poder eterno.',
      'Jesús, Creador mío, compadécete de mí; Jesús, Salvador mío, sálvame.',
    ],
    JESUS,
  ),
  kontakion(
    8,
    'Viendo a Dios hecho hombre de modo tan extraño, apartémonos del mundo vano y pongamos la mente en lo divino. Porque para esto bajó Dios a la tierra: para subir al cielo a los que le clamamos:',
  ),
  ikos(
    8,
    'Estaba entero en lo bajo, y en nada se apartó de lo alto el Inabarcable, cuando por su voluntad padeció por nosotros, mató con su muerte nuestra muerte y con su resurrección dio la vida a los que cantan:',
    [
      'Jesús, dulzura del corazón; Jesús, fuerza del cuerpo.',
      'Jesús, claridad del alma; Jesús, agilidad de la mente.',
      'Jesús, alegría de la conciencia; Jesús, esperanza segura.',
      'Jesús, memoria eterna; Jesús, alabanza excelsa.',
      'Jesús, gloria mía exaltada; Jesús, deseo mío, no me rechaces.',
      'Jesús, Pastor mío, búscame; Jesús, Salvador mío, sálvame.',
    ],
    JESUS,
  ),
  kontakion(
    9,
    'Toda la naturaleza de los ángeles glorifica sin cesar en el cielo tu santísimo nombre, Jesús, clamando: Santo, Santo, Santo; y nosotros, pecadores, en la tierra, clamamos con labios de barro:',
  ),
  ikos(
    9,
    'A los oradores más elocuentes los vemos ante Ti, Jesús, Salvador nuestro, mudos como peces: porque no aciertan a decir cómo permaneces Dios inmutable y hombre perfecto. Y nosotros, maravillándonos del misterio, clamamos con fe:',
    [
      'Jesús, Dios eterno; Jesús, Rey de los que reinan.',
      'Jesús, Soberano de los que dominan; Jesús, Juez de vivos y muertos.',
      'Jesús, esperanza de los desesperados; Jesús, consuelo de los que lloran.',
      'Jesús, gloria de los pobres; Jesús, no me condenes según mis obras.',
      'Jesús, purifícame según tu misericordia; Jesús, aleja de mí el desaliento.',
      'Jesús, ilumina los pensamientos de mi corazón; Jesús, dame el recuerdo de la muerte.',
    ],
    JESUS,
  ),
  kontakion(
    10,
    'Queriendo salvar al mundo, Oriente de los orientes, viniste al occidente oscuro de nuestra naturaleza y te humillaste hasta la muerte; por eso tu nombre ha sido exaltado sobre todo nombre, y de todas las familias del cielo y de la tierra oyes:',
  ),
  ikos(
    10,
    'Rey eterno, Consolador, Cristo verdadero: purifícanos de toda mancha, como purificaste a los diez leprosos, y cúranos, como curaste el alma avara de Zaqueo el publicano, para que te clamemos con compunción:',
    [
      'Jesús, tesoro incorruptible; Jesús, riqueza inagotable.',
      'Jesús, alimento que fortalece; Jesús, bebida que no se acaba.',
      'Jesús, vestido de los pobres; Jesús, amparo de las viudas.',
      'Jesús, defensor de los huérfanos; Jesús, ayuda de los que trabajan.',
      'Jesús, guía de los peregrinos; Jesús, piloto de los navegantes.',
      'Jesús, calma de las tempestades; Jesús, Dios, levántame, que he caído.',
    ],
    JESUS,
  ),
  kontakion(
    11,
    'Te ofrezco, indigno, un canto lleno de compunción, y te clamo como la cananea: Jesús, ten piedad de mí. Porque no es una hija lo que tengo, sino una carne cruelmente atormentada por las pasiones y abrasada por la ira: concede la curación a quien te clama:',
  ),
  ikos(
    11,
    'Pablo, que antes te perseguía, oyó la fuerza de la voz que da a conocer a Dios, lámpara que alumbra a los que están en las tinieblas de la ignorancia, y se le aclaró la agudeza del alma; ilumina así también las pupilas oscurecidas de mi alma, a mí, que te clamo:',
    [
      'Jesús, Rey mío fortísimo; Jesús, Dios mío poderosísimo.',
      'Jesús, Señor mío inmortal; Jesús, Creador mío gloriosísimo.',
      'Jesús, guía mío bondadosísimo; Jesús, Pastor mío generosísimo.',
      'Jesús, Soberano mío misericordiosísimo; Jesús, Salvador mío compasivísimo.',
      'Jesús, ilumina mis sentidos, oscurecidos por las pasiones; Jesús, cura mi cuerpo, llagado por los pecados.',
      'Jesús, purifica mi mente de los pensamientos vanos; Jesús, guarda mi corazón de los malos deseos.',
    ],
    JESUS,
  ),
  kontakion(
    12,
    'Dame la gracia, Jesús, que perdonas todas las deudas, y recíbeme arrepentido, como recibiste a Pedro, que te había negado; llámame, que estoy desanimado, como en otro tiempo a Pablo, que te perseguía; y escúchame, que te clamo:',
  ),
  ikos(
    12,
    'Cantando tu encarnación, te alabamos todos, y creemos con Tomás que eres Señor y Dios, sentado con el Padre, y que has de venir a juzgar a vivos y muertos. Concédeme entonces estar a tu derecha, a mí, que te clamo:',
    [
      'Jesús, Rey eterno, ten piedad de mí; Jesús, flor fragante, perfúmame.',
      'Jesús, calor amado, caliéntame; Jesús, templo eterno, cúbreme.',
      'Jesús, vestido luminoso, adórname; Jesús, perla preciosa, hazme brillar.',
      'Jesús, piedra preciosa, ilumíname; Jesús, sol de justicia, alúmbrame.',
      'Jesús, luz santa, resplandece sobre mí; Jesús, líbrame de las dolencias del alma y del cuerpo.',
      'Jesús, arráncame de la mano del adversario; Jesús, líbrame del fuego que no se apaga y de los demás tormentos eternos.',
    ],
    JESUS,
  ),
  kontakion(
    13,
    '¡Oh dulcísimo y generosísimo Jesús! Recibe ahora esta pequeña súplica nuestra, como recibiste las dos moneditas de la viuda, y guarda tu heredad de los enemigos visibles e invisibles, de la invasión de los extranjeros, de la enfermedad y del hambre, de toda aflicción y de toda herida mortal, y arranca del tormento futuro a todos los que te clamamos:',
    [rub('Se dice tres veces.')],
  ),
  cierre([
    rub('Oración'),
    t('Soberano Señor Jesucristo, Dios mío, que por tu inefable amor a los hombres te revestiste, al final de los siglos, de carne de la siempre Virgen María: yo, tu siervo, Soberano, glorifico tu providencia salvadora conmigo; te canto, porque por Ti he conocido al Padre; te bendigo, porque por Ti vino al mundo el Espíritu Santo; me postro ante tu purísima Madre según la carne, que sirvió a un misterio tan temible; alabo los coros de tus ángeles, que cantan y sirven a tu majestad; llamo bienaventurado a Juan el Precursor, que te bautizó, Señor; honro a los profetas que te anunciaron, glorifico a tus santos apóstoles; celebro a los mártires y glorifico a tus sacerdotes; me postro ante tus santos monjes y canto a todos tus justos.'),
    t('Este coro divino, tan grande, tan numeroso e inefable, te lo traigo en oración a Ti, Dios generosísimo, yo, tu siervo, y por eso te pido el perdón de mis pecados: concédemelo por todos tus santos, y sobre todo por tu santa misericordia, porque eres bendito por los siglos. Amén.'),
  ]),
];

/* ═══════════════ A san Nicolás ═══════════════ */

const NICOLAS = 'Alégrate, Nicolás, gran taumaturgo.';

export const AKATHISTOS_NICOLAS: OfficeSection[] = [
  s('sobre', 'El akathistos a san Nicolás', [
    rub('San Nicolás de Mira († c. 343) es, después de la Theotokos, el santo con más iglesias dedicadas del mundo ortodoxo, y este akathistos se reza sobre todo los jueves, día en que la Iglesia lo conmemora junto con los apóstoles.'),
    rub('Recorre su vida y sus milagros: el Concilio de Nicea, los marineros en la tormenta, las tres muchachas sin dote, los generales salvados de la espada. Los ikoi terminan con el estribillo:'),
    ref(NICOLAS),
  ]),
  s('tropario', 'Tropario del santo', [
    rub('Se canta antes de empezar, y es el texto por el que se le conoce:'),
    t('Regla de fe e imagen de mansedumbre, maestro de templanza te mostró a tu grey la verdad de las cosas. Por eso alcanzaste con la humildad lo excelso, y con la pobreza la riqueza. Padre y jerarca Nicolás, intercede ante Cristo Dios para que sean salvadas nuestras almas.'),
  ]),
  s('kontakion-1', 'Kontakion 1', [
    t('Taumaturgo invencible y excelente servidor de Cristo, que derramas sobre el mundo entero el preciadísimo ungüento de la misericordia y un mar inagotable de milagros: te alabo con amor, santo jerarca Nicolás. Y tú, que tienes confianza ante el Señor, líbrame de toda desgracia, para que te clame:'),
    ref(NICOLAS),
  ]),
  ikos(
    1,
    'El Creador de toda la creación te mostró ángel en la forma, siendo terreno por naturaleza; porque, previendo la bondad fecunda de tu alma, bienaventurado Nicolás, enseñó a todos a clamarte así:',
    [
      'Alégrate, purificado desde el seno de tu madre; alégrate, santificado hasta el fin.',
      'Alégrate, tú que con tu nacimiento asombraste a tus padres; alégrate, tú que mostraste la fuerza de tu alma nada más nacer.',
      'Alégrate, jardín de la tierra prometida; alégrate, flor de la plantación divina.',
      'Alégrate, sarmiento virtuoso de la viña de Cristo; alégrate, árbol que da milagros en el paraíso de Jesús.',
      'Alégrate, lirio brotado en el paraíso; alégrate, ungüento de la fragancia de Cristo.',
      'Alégrate, porque por ti se ahuyenta el llanto; alégrate, porque por ti nos llega la alegría.',
    ],
    NICOLAS,
  ),
  kontakion(
    2,
    'Al ver cómo mana tu ungüento, sabio en Dios, somos iluminados en el alma y en el cuerpo, y te reconocemos, Nicolás, como admirable fuente de mirra que da la vida: porque con tus milagros, que por la gracia de Dios brotan como aguas, das de beber a los que claman a Dios con fe:',
  ),
  ikos(
    2,
    'Enseñando el misterio incomprensible de la Santísima Trinidad, estuviste en Nicea con los santos padres como defensor de la confesión de la fe ortodoxa: confesaste al Hijo igual al Padre, coeterno y del mismo trono, y refutaste al insensato Arrio. Por eso los fieles han aprendido a cantarte:',
    [
      'Alégrate, gran columna de la piedad; alégrate, ciudad de refugio de los fieles.',
      'Alégrate, firme apoyo de la ortodoxia; alégrate, portador venerable y alabanza de la Santísima Trinidad.',
      'Alégrate, tú que predicaste al Hijo igual en honor al Padre; alégrate, tú que expulsaste del concilio de los santos al enfurecido Arrio.',
      'Alégrate, padre, gloriosa belleza de los padres; alégrate, sabia hermosura de todos los sabios en Dios.',
      'Alégrate, tú que lanzas palabras de fuego; alégrate, tú que guías bien a tu rebaño.',
      'Alégrate, porque por ti se afianza la fe; alégrate, porque por ti cae la herejía.',
    ],
    NICOLAS,
  ),
  kontakion(
    3,
    'Con la fuerza que se te dio de lo alto enjugaste toda lágrima del rostro de los que sufrían cruelmente, padre Nicolás, portador de Dios: fuiste sustento para los hambrientos, excelente piloto para los que estaban en el abismo del mar, curación para los enfermos, y en todo te mostraste ayuda para todos los que claman a Dios:',
  ),
  ikos(
    3,
    'En verdad, padre Nicolás, tu canto debería venir del cielo y no de la tierra: porque ¿cómo podrá un hombre anunciar la grandeza de tu santidad? Pero nosotros, vencidos por tu amor, te clamamos así:',
    [
      'Alégrate, modelo de los corderos y de los pastores; alégrate, santo purificador de las costumbres.',
      'Alégrate, morada de grandes virtudes; alégrate, casa pura y honrosa de la santidad.',
      'Alégrate, lámpara luminosísima y amada de todos; alégrate, luz dorada y sin mancha.',
      'Alégrate, digno compañero de los ángeles; alégrate, buen guía de los hombres.',
      'Alégrate, regla de la fe piadosa; alégrate, imagen de la mansedumbre espiritual.',
      'Alégrate, porque por ti somos librados de las pasiones del cuerpo; alégrate, porque por ti nos llenamos de las dulzuras del espíritu.',
    ],
    NICOLAS,
  ),
  kontakion(
    4,
    'Una tempestad de perplejidad me turba la mente: ¿cómo cantar dignamente tus milagros, bienaventurado Nicolás? Nadie podría contarlos, aunque tuviera muchas lenguas y quisiera hablar; pero nosotros nos atrevemos a cantar a Dios, que se glorifica admirablemente en ti:',
  ),
  ikos(
    4,
    'Oyeron, sabio en Dios Nicolás, los de cerca y los de lejos la grandeza de tus milagros: que con ligeras alas de gracia sueles adelantarte por el aire a socorrer a los que están en peligro, librando enseguida a todos los que te claman así:',
    [
      'Alégrate, liberación de la tristeza; alégrate, dispensador de la gracia.',
      'Alégrate, tú que ahuyentas los males inesperados; alégrate, tú que plantas los bienes deseados.',
      'Alégrate, pronto consolador de los que están en desgracia; alégrate, temible castigador de los que hacen injusticia.',
      'Alégrate, abismo de milagros derramado por Dios; alégrate, tabla de la ley de Cristo escrita por Dios.',
      'Alégrate, firme levantamiento de los que caen; alégrate, apoyo de los que están en pie con rectitud.',
      'Alégrate, porque por ti queda al desnudo todo engaño; alégrate, porque por ti se cumple toda verdad.',
    ],
    NICOLAS,
  ),
  kontakion(
    5,
    'Te mostraste estrella guiada por Dios, guiando a los que navegaban en un mar furioso, a quienes amenazaba una muerte rápida si no hubieras acudido a los que te llamaban en su ayuda, santo taumaturgo Nicolás: porque increpaste a los demonios, que volaban desvergonzados y querían hundir las naves, y los expulsaste, y enseñaste a los fieles a clamar al Dios que por ti los salva:',
  ),
  ikos(
    5,
    'Las doncellas a las que la pobreza destinaba a un matrimonio infame vieron tu gran misericordia con los pobres, bienaventurado padre Nicolás, cuando de noche, a escondidas, diste a su anciano padre tres bolsas de oro, librándolo a él y a sus hijas de caer en el pecado. Por eso oyes de todos:',
    [
      'Alégrate, tesoro de grandísima misericordia; alégrate, morada del cuidado de los hombres.',
      'Alégrate, alimento y consuelo de los que acuden a ti; alégrate, pan que no se acaba para los hambrientos.',
      'Alégrate, riqueza que Dios da a los que viven pobres en la tierra; alégrate, pronto levantamiento de los necesitados.',
      'Alégrate, tú que escuchas enseguida a los pobres; alégrate, cuidado bondadoso de los afligidos.',
      'Alégrate, tú que diste esposo, sin mancha, a las tres doncellas; alégrate, celoso guardián de la pureza.',
      'Alégrate, esperanza de los desesperados; alégrate, deleite del mundo entero.',
    ],
    NICOLAS,
  ),
  kontakion(
    6,
    'El mundo entero te proclama, bienaventurado Nicolás, pronto defensor en las desgracias: porque muchas veces, en una misma hora, te adelantas a socorrer a los que viajan por tierra y a los que navegan por el mar, y guardas a la vez de los males a todos los que claman a Dios:',
  ),
  ikos(
    6,
    'Brillaste como luz de vida, trayendo la liberación a los generales que iban a sufrir una muerte injusta y que te invocaban, buen pastor Nicolás, cuando, apareciéndote enseguida en sueños al emperador, lo atemorizaste y le mandaste soltarlos sin daño. Por eso, junto con ellos, también nosotros te clamamos con gratitud:',
    [
      'Alégrate, tú que ayudas a los que te invocan con fervor; alégrate, tú que libras de la muerte injusta.',
      'Alégrate, tú que guardas de la calumnia engañosa; alégrate, tú que deshaces los designios injustos.',
      'Alégrate, tú que rompes la mentira como una telaraña; alégrate, tú que exaltas gloriosamente la verdad.',
      'Alégrate, liberación de las cadenas de los inocentes; alégrate, vida devuelta a los muertos.',
      'Alégrate, tú que sacas a la luz la justicia; alégrate, tú que oscureces la injusticia.',
      'Alégrate, porque por ti los inocentes fueron librados de la espada; alégrate, porque por ti gozaron de la luz.',
    ],
    NICOLAS,
  ),
  kontakion(
    7,
    'Queriendo ahuyentar el hedor blasfemo de la herejía, te mostraste, Nicolás, ungüento místico y verdaderamente fragante: apacentaste al pueblo de Mira y llenaste el mundo entero de tu ungüento de gracia. Aleja, pues, también de nosotros el hedor del pecado, que Dios aborrece, para que clamemos a Dios de modo agradable:',
  ),
  ikos(
    7,
    'Te reconocemos como un nuevo Noé, guía del arca de la salvación, santo padre Nicolás, que con tu gobierno dispersas la tempestad de todos los males y traes la calma divina a los que claman así:',
    [
      'Alégrate, puerto tranquilo de los que sufren la tempestad; alégrate, refugio seguro de los que se ahogan.',
      'Alégrate, buen piloto de los que navegan en medio del abismo; alégrate, tú que calmas las tormentas del mar.',
      'Alégrate, guía de los que están en medio de los torbellinos; alégrate, calor de los que están en medio de la helada.',
      'Alégrate, resplandor que disipa la oscuridad de la tristeza; alégrate, lumbrera que ilumina todos los confines de la tierra.',
      'Alégrate, tú que libras a los hombres del abismo del pecado; alégrate, tú que arrojas a Satanás al abismo del infierno.',
      'Alégrate, porque por ti invocamos con confianza el abismo de la misericordia de Dios; alégrate, porque, librados por ti del diluvio de la ira, encontramos la paz con Dios.',
    ],
    NICOLAS,
  ),
  kontakion(
    8,
    'Un milagro extraño se muestra a los que acuden a ti, bienaventurado Nicolás: tu santa iglesia. Porque en ella, aunque ofrezcamos una pequeña oración, recibimos la curación de grandes dolencias, si después de Dios ponemos en ti nuestra esperanza, clamando con fe:',
  ),
  ikos(
    8,
    'Eres verdaderamente ayuda para todos en todo, Nicolás, portador de Dios, y has reunido a todos los que acuden a ti, como libertador, sustento y pronto médico de todos los de la tierra, moviendo a todos a alabarte y clamarte así:',
    [
      'Alégrate, fuente de toda curación; alégrate, ayuda de los que sufren cruelmente.',
      'Alégrate, aurora que brilla para los que vagan en la noche del pecado; alégrate, rocío caído del cielo para los que están en el calor de los trabajos.',
      'Alégrate, tú que das a los necesitados lo que les conviene; alégrate, tú que preparas la abundancia a los que piden.',
      'Alégrate, tú que muchas veces te adelantas a la petición; alégrate, tú que renuevas la fuerza de los ancianos.',
      'Alégrate, tú que reprendes a los muchos que se extravían del camino verdadero; alégrate, fiel servidor de los misterios de Dios.',
      'Alégrate, porque por ti pisoteamos la envidia; alégrate, porque por ti enderezamos nuestra vida.',
    ],
    NICOLAS,
  ),
  kontakion(
    9,
    'Calma todo dolor, gran defensor nuestro Nicolás, preparando las medicinas de la gracia que endulzan nuestras almas y alegran los corazones de todos los que acuden con fervor a tu ayuda y claman a Dios:',
  ),
  ikos(
    9,
    'Vemos avergonzados por ti, sabio en Dios padre Nicolás, a los oradores de los impíos, sabios en vanidades: porque venciste a Arrio, el blasfemo, que dividía la Divinidad, y a Sabelio, que confundía la Santísima Trinidad, y a nosotros nos afianzaste en la ortodoxia. Por eso te clamamos así:',
    [
      'Alégrate, escudo que defiende la piedad; alégrate, espada que corta la impiedad.',
      'Alégrate, maestro de los mandatos divinos; alégrate, destructor de las doctrinas contrarias a Dios.',
      'Alégrate, escala afianzada por Dios por la que subimos al cielo; alégrate, amparo construido por Dios bajo el que muchos se cobijan.',
      'Alégrate, tú que con tus palabras hiciste sabios a los ignorantes; alégrate, tú que con tu ejemplo pusiste en movimiento a los perezosos.',
      'Alégrate, claridad que no se apaga de los mandamientos de Dios; alégrate, rayo luminosísimo de los preceptos del Señor.',
      'Alégrate, porque por tu enseñanza son aplastadas las cabezas de los herejes; alégrate, porque por ti los fieles son hechos dignos de la gloria.',
    ],
    NICOLAS,
  ),
  kontakion(
    10,
    'Queriendo salvar tu alma, sometiste de verdad tu carne al espíritu, padre nuestro Nicolás: primero con el silencio y con la lucha contra los pensamientos, añadiste a la acción la contemplación de Dios, y con la contemplación adquiriste un conocimiento perfecto, con el que conversabas confiadamente con Dios y con los ángeles, clamando siempre:',
  ),
  ikos(
    10,
    'Eres muralla, bienaventurado, para los que alaban tus milagros y para todos los que acuden a tu defensa; líbranos, pues, también a nosotros, pobres en virtudes, de la pobreza, de la desgracia, de las enfermedades y de las diversas necesidades, a los que te clamamos con amor así:',
    [
      'Alégrate, tú que nos arrancas de la pobreza eterna; alégrate, tú que das la riqueza incorruptible.',
      'Alégrate, alimento que no perece para los que tienen hambre de justicia; alégrate, bebida inagotable para los que tienen sed de vida.',
      'Alégrate, tú que guardas de la revuelta y de la guerra; alégrate, tú que libras de las cadenas y del cautiverio.',
      'Alégrate, gloriosísimo defensor en las desgracias; alégrate, grandísimo protector en las pruebas.',
      'Alégrate, tú que arrebataste a muchos de la perdición; alégrate, tú que guardaste sin daño a innumerables.',
      'Alégrate, porque por ti los pecadores escapan de una muerte cruel; alégrate, porque por ti los que se arrepienten alcanzan la vida eterna.',
    ],
    NICOLAS,
  ),
  kontakion(
    11,
    'Ofreciste a la Santísima Trinidad, más que otros, un canto con la mente, la palabra y las obras, bienaventurado Nicolás: porque con mucho examen aclaraste los preceptos de la fe recta, enseñándonos con la fe, la esperanza y el amor a cantar al único Dios en Trinidad:',
  ),
  ikos(
    11,
    'Te vemos, padre Nicolás, escogido por Dios, como un rayo resplandeciente que no se apaga para los que están en la oscuridad de la vida: porque conversas con las luces inmateriales de los ángeles acerca de la Luz increada de la Trinidad, e iluminas las almas de los fieles que te claman así:',
    [
      'Alégrate, resplandor de la Luz de tres soles; alégrate, lucero del Sol que no se pone.',
      'Alégrate, candela encendida con la llama divina; alégrate, porque apagaste la llama demoníaca de la impiedad.',
      'Alégrate, predicación luminosa de la fe recta; alégrate, hermoso resplandor de la luz del Evangelio.',
      'Alégrate, relámpago que quema las herejías; alégrate, trueno que atemoriza a los que escandalizan.',
      'Alégrate, maestro del conocimiento verdadero; alégrate, tú que das a conocer la mente escondida.',
      'Alégrate, porque por ti fue pisoteado el culto a la criatura; alégrate, porque por ti aprendimos a adorar al Creador en Trinidad.',
    ],
    NICOLAS,
  ),
  kontakion(
    12,
    'Conociendo la gracia que Dios te dio, celebramos con alegría tu memoria, como es debido, gloriosísimo padre Nicolás, y acudimos con toda el alma a tu admirable defensa; y no pudiendo contar tus obras gloriosísimas, como no se pueden contar la arena del mar ni la multitud de las estrellas, llenos de asombro clamamos a Dios:',
  ),
  ikos(
    12,
    'Cantando tus milagros, te alabamos, Nicolás digno de toda alabanza: porque en ti se ha glorificado admirablemente Dios, glorificado en la Trinidad. Pero aunque te ofrezcamos salmos y cantos compuestos con toda el alma, santo taumaturgo, nada hacemos que iguale el don de tus milagros, y asombrados te clamamos así:',
    [
      'Alégrate, servidor del Rey de los reyes y Señor de los señores; alégrate, compañero de sus servidores celestiales.',
      'Alégrate, ayuda del pueblo fiel; alégrate, exaltación del linaje cristiano.',
      'Alégrate, tú que llevas en el nombre la victoria; alégrate, insigne portador de corona.',
      'Alégrate, espejo de todas las virtudes; alégrate, firme muralla de todos los que acuden a ti.',
      'Alégrate, toda nuestra esperanza después de Dios y de la Theotokos; alégrate, salud de nuestros cuerpos y salvación de nuestras almas.',
      'Alégrate, porque por ti somos librados de la muerte eterna; alégrate, porque por ti somos hechos dignos de la vida sin fin.',
    ],
    NICOLAS,
  ),
  kontakion(
    13,
    '¡Oh santísimo y admirabilísimo padre Nicolás, consuelo de todos los afligidos! Recibe nuestra ofrenda de ahora y suplica al Señor con tu intercesión, agradable a Dios, que seamos librados de la gehena, para que cantemos contigo:',
    [rub('Se dice tres veces.')],
  ),
  cierre([
    rub('Oración'),
    t('¡Oh santísimo Nicolás, excelentísimo servidor del Señor, ardiente defensor nuestro y pronta ayuda en todas partes en las aflicciones! Ayúdame a mí, pecador y abatido, en esta vida presente; suplica al Señor Dios que me conceda el perdón de todos los pecados que he cometido desde mi juventud, en toda mi vida, de obra, de palabra, de pensamiento y con todos mis sentidos; y a la salida de mi alma, ayúdame, miserable de mí; suplica al Señor Dios, Hacedor de toda la creación, que me libre de los peajes del aire y del tormento eterno, para que glorifique siempre al Padre, y al Hijo, y al Espíritu Santo, y tu misericordiosa intercesión, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),
];

/* ═══════════════ A la Pasión de Cristo ═══════════════ */

const PASION = 'Jesús, Hijo de Dios, acuérdate de nosotros cuando vengas en tu Reino.';

export const AKATHISTOS_PASION: OfficeSection[] = [
  s('sobre', 'El akathistos a la Pasión', [
    rub('Se reza en la Gran Cuaresma, en los oficios de la Pasión que en la Iglesia rusa se celebran los domingos por la tarde, y en la Semana Santa. Recorre la Pasión paso a paso: Getsemaní, el prendimiento, Caifás, Pilato, los azotes, la cruz, el sepulcro. Su texto eslavo estaba ya impreso a finales del siglo XIX.'),
    rub('Sus ikoi son más breves que los de otros akathistos: cinco súplicas, y como estribillo la del buen ladrón:'),
    ref(PASION),
    rub('Como los himnos de la Semana Santa, habla de «los judíos» en el sentido en que lo hace el Evangelio de san Juan: las autoridades que entregaron a Jesús. Y es el propio himno el que dice quién lo crucifica: «yo, Señor, yo te he herido con mis pecados» (kontakion 5).'),
  ]),
  s('kontakion-1', 'Kontakion 1', [
    t('Caudillo invencible y Señor del cielo y de la tierra: al verte a Ti, Rey inmortal, colgado de la cruz, toda la creación se transformó, el cielo se espantó y los cimientos de la tierra se estremecieron. Y nosotros, indignos, ofreciendo una adoración agradecida a tu Pasión por nosotros, te clamamos con el ladrón:'),
    ref(PASION),
  ]),
  ikos(
    1,
    'Para completar los coros de los ángeles, no tomaste la naturaleza de los ángeles, sino que, siendo Dios, te hiciste hombre por mí, y al hombre, muerto por los pecados, le devolviste la vida con tu Cuerpo y tu Sangre vivificadores. Por eso, agradecidos a tan gran amor tuyo, te clamamos:',
    [
      'Jesús, Dios, Amor eterno, que tanto te complaciste en nosotros, nacidos de la tierra;',
      'Jesús, misericordia sin medida, que bajaste hasta los hombres caídos;',
      'Jesús, que te revestiste de nuestra carne y con tu muerte destruiste el poder de la muerte;',
      'Jesús, que nos divinizaste con tus misterios divinos;',
      'Jesús, que con tus padecimientos y tu Cruz redimiste al mundo entero;',
    ],
    PASION,
  ),
  kontakion(
    2,
    'Viéndote el ángel en el huerto de Getsemaní luchar en oración hasta sudar sangre, se te presentó y te fortalecía, cuando nuestros pecados pesaban sobre Ti como una carga pesada: porque Tú, cargando sobre los hombros a Adán perdido, lo presentaste al Padre, orando de rodillas. Por esto te canto con fe y con amor:',
  ),
  ikos(
    2,
    'Los judíos no entendieron el sentido incomprensible de tu Pasión voluntaria: por eso, cuando de noche dijiste a los que te buscaban con antorchas «Yo soy», aunque cayeron por tierra, después te ataron y te llevaron al tribunal. Y nosotros, postrándonos ante Ti en este camino, te decimos con amor:',
    [
      'Jesús, Luz del mundo, odiado por el mundo malvado;',
      'Jesús, que vives en la luz inaccesible, prendido por el poder de las tinieblas;',
      'Jesús, Hijo inmortal de Dios, señalado para la muerte por el hijo de la perdición;',
      'Jesús, en quien no hay engaño, besado con engaño por el traidor;',
      'Jesús, que te das gratis a todos, vendido por unas monedas de plata;',
    ],
    PASION,
  ),
  kontakion(
    3,
    'Con el poder de tu divinidad predijiste a tu discípulo que te negaría tres veces. Y él, aunque después renegó de Ti con juramento, cuando te vio en el patio del sumo sacerdote, a Ti, su Señor y Maestro, se le enterneció el corazón, y salió fuera y lloró amargamente. Mírame también a mí, Señor, y hiere mi corazón endurecido, para que lave con mis lágrimas mis pecados, cantándote:',
  ),
  ikos(
    3,
    'Tú, que tienes de verdad el poder según el orden de Melquisedec, como Sumo Sacerdote para siempre, te presentaste ante el inicuo sumo sacerdote Caifás, Tú, Soberano y Señor de todos. Tú, que recibiste el tormento de tus siervos, recibe de nosotros estas palabras:',
    [
      'Jesús inestimable, comprado por un precio, adquiéreme para tu herencia eterna;',
      'Jesús, deseo de todos, negado por Pedro por miedo, no me rechaces a mí, pecador;',
      'Jesús, Cordero manso, despedazado por jabalíes feroces, arráncame de mis enemigos;',
      'Jesús, Sumo Sacerdote, que entraste con tu propia sangre en el Santo de los Santos, purifícame de las manchas de la carne;',
      'Jesús atado, que tienes poder para atar y desatar, desata mis graves pecados;',
    ],
    PASION,
  ),
  kontakion(
    4,
    'Respirando una tempestad de muerte contra Cristo, los judíos, que escucharon la voz del padre de la mentira y homicida desde el principio, el diablo, te rechazaron a Ti, el Camino recto, la Verdad y la Vida; y nosotros, confesándote a Ti, Cristo, poder de Dios, en quien están escondidos todos los tesoros de la sabiduría y del conocimiento, clamamos:',
  ),
  ikos(
    4,
    'Pilato, al oír tus palabras mansas, te entregó para ser crucificado como digno de muerte, aunque él mismo atestiguaba que no había hallado en Ti culpa alguna: se lavó las manos, pero manchó el corazón. Y nosotros, admirados del misterio de tu Pasión voluntaria, te decimos con compunción:',
    [
      'Jesús, Hijo de Dios e Hijo de la Virgen, atormentado por los hijos de la iniquidad;',
      'Jesús, ultrajado y desnudado, Tú que das hermosura a los lirios del campo y vistes el cielo de nubes;',
      'Jesús, saciado de heridas, Tú que con cinco panes saciaste a cinco mil;',
      'Jesús, Rey de todos, que en lugar del tributo del amor y de la gratitud recibiste crueles tormentos;',
      'Jesús, herido por nosotros todo el día, cura las heridas de nuestras almas;',
    ],
    PASION,
  ),
  kontakion(
    5,
    'Te cubriste entero de tu Sangre divina, Tú que te vistes de luz como de un manto. Sé, en verdad sé con el profeta por qué están rojas tus vestiduras: yo, Señor, yo te he herido con mis pecados. A Ti, pues, herido por mí, te digo con gratitud:',
  ),
  ikos(
    5,
    'Isaías, que habló de Dios, te vio de antemano en el Espíritu lleno de deshonra y de heridas, y espantado clamaba: «Lo vimos, y no tenía aspecto ni hermosura»; y nosotros, contemplándote en la cruz, te decimos con fe y asombro:',
    [
      'Jesús, que soportas la deshonra, Tú que coronaste al hombre de gloria y de honor;',
      'Jesús, a quien los ángeles no pueden mirar, abofeteado en las mejillas;',
      'Jesús, golpeado en la cabeza con una caña, inclina mi cabeza a la humildad;',
      'Jesús, que tuviste tus ojos luminosos oscurecidos por la sangre, aparta mis ojos para que no miren la vanidad;',
      'Jesús, que de los pies a la cabeza no tuviste nada sano, hazme entero y sano;',
    ],
    PASION,
  ),
  kontakion(
    6,
    'Pilato se hizo pregonero de tu inocencia y mostró al pueblo que no había en Ti nada digno de muerte; pero los judíos, como fieras salvajes que han visto sangre, rechinaban contra Ti sus dientes, gritando: «¡Crucifícalo, crucifícalo!»; y nosotros, besando tus purísimas llagas, clamamos:',
  ),
  ikos(
    6,
    'Te mostraste como espectáculo y asombro para los ángeles y para los hombres cuando Pilato dijo de Ti: «He aquí el hombre». Venid, pues, postrémonos ante Jesús, escarnecido por nosotros, clamando:',
    [
      'Jesús, Creador y Juez de todos, juzgado y atormentado por tu propia criatura;',
      'Jesús, dador de la sabiduría, que no diste respuesta a los insensatos;',
      'Jesús, médico de los heridos por los pecados, dame la medicina del arrepentimiento;',
      'Jesús, Pastor herido, hiere a los demonios que me tientan;',
      'Jesús, que tuviste la carne quebrantada, quebranta mi corazón con tu temor;',
    ],
    PASION,
  ),
  kontakion(
    7,
    'Queriendo librar al hombre de la esclavitud del enemigo, te humillaste, Jesús, ante tus enemigos, y como cordero mudo fuiste llevado al matadero, soportando heridas por todas partes, para curar entero al hombre que clama:',
  ),
  ikos(
    7,
    'Mostraste una paciencia admirable cuando los soldados, burlándose de Ti por orden del juez injusto, herían tu purísimo Cuerpo con los golpes más crueles, hasta teñirlo de sangre de los pies a la cabeza. Por eso te clamamos con lágrimas:',
    [
      'Jesús, amigo de los hombres, coronado de espinas por los hombres;',
      'Jesús, impasible en tu divinidad, que soportas los padecimientos para librarnos de las pasiones;',
      'Jesús, Salvador mío, sálvame a mí, que merezco todos los tormentos;',
      'Jesús, abandonado por todos, firmeza mía, afiánzame;',
      'Jesús, ultrajado por todos, alegría mía, alégrame;',
    ],
    PASION,
  ),
  kontakion(
    8,
    'De modo admirable y extraño se te aparecieron Moisés y Elías en el Tabor, hablando de tu partida, que ahora llevas a cabo en Jerusalén. Ellos, que allí vieron tu gloria y aquí nuestra salvación, claman:',
  ),
  ikos(
    8,
    'Perseguido en todas partes, soportaste muchos ultrajes y tormentos por la multitud de mis pecados: unos dicen que eres enemigo del César, otros te condenan como malhechor, otros gritan: «¡Quítalo, quítalo, crucifícalo!». A Ti, Señor, condenado por todos y llevado a la crucifixión, te decimos desde lo hondo del alma:',
    [
      'Jesús, condenado injustamente, Juez nuestro, no nos condenes según nuestras obras;',
      'Jesús, que desfalleces en el camino bajo la Cruz, fuerza mía, no me abandones en la hora de mi aflicción y de mi angustia;',
      'Jesús, que clamas al Padre pidiendo ayuda, Tú que me pones el combate, fortaléceme en mi debilidad;',
      'Jesús, que recibes la deshonra, gloria mía, no me apartes de tu gloria;',
      'Jesús, imagen de la luminosísima persona del Padre, transfigura mi vida impura y oscura;',
    ],
    PASION,
  ),
  kontakion(
    9,
    'Toda la naturaleza se turbó al verte colgado en la cruz: el sol escondió en el cielo sus rayos, la tierra tembló, el velo del templo se rasgó, las piedras se partieron, el infierno devolvió a los muertos; y nosotros nos postramos en el lugar donde estuvieron tus pies purísimos, cantando:',
  ),
  ikos(
    9,
    'Los oradores elocuentes, aunque hablen mucho, no pueden dar gracias dignas a tus divinos padecimientos, amigo de los hombres; pero nuestra alma y nuestro cuerpo, el corazón y todos los miembros, te claman con compunción:',
    [
      'Jesús, clavado en la cruz, clava y anula el documento de nuestros pecados;',
      'Jesús, que desde la cruz extiendes las manos hacia todos, atráeme también a mí, el extraviado;',
      'Jesús, Puerta de las ovejas, traspasado en el costado, hazme entrar por tus llagas en tu cámara nupcial;',
      'Jesús, crucificado en la carne, crucifica mi carne con sus pasiones y sus deseos;',
      'Jesús, que expiras entre tormentos, concédeme que mi corazón no quiera saber otra cosa sino a Ti crucificado;',
    ],
    PASION,
  ),
  kontakion(
    10,
    'Queriendo salvar al mundo, curaste a ciegos, cojos, leprosos, mudos y sordos, y expulsaste a los espíritus malignos; pero los judíos, sin entender, respirando malicia y atormentados por la envidia, te clavaron en la cruz, porque no sabían cantar:',
  ),
  ikos(
    10,
    'Rey eterno, Jesús, padeces entero por mi intemperancia, para hacerme entero puro, dándonos en todo ejemplo para que sigamos tus pasos, clamando:',
    [
      'Jesús, amor insondable, que no tuviste en cuenta el pecado de los que te crucificaron;',
      'Jesús, que oraste en el huerto con fuerte clamor y con lágrimas, enséñanos también a nosotros a orar;',
      'Jesús, que cumpliste todas las profecías sobre Ti, cumple en el bien los deseos de nuestro corazón;',
      'Jesús, que entregaste tu espíritu en manos del Padre, recibe mi espíritu en la hora de mi partida;',
      'Jesús, que no impediste que se repartieran tus vestiduras, separa con mansedumbre mi alma de mi cuerpo;',
    ],
    PASION,
  ),
  kontakion(
    11,
    'Tu purísima Madre te ofrecía un canto lleno de compunción, diciendo: Aunque padeces en la cruz, sé que fuiste engendrado del Padre antes del lucero de la mañana, porque veo que toda la creación padece contigo; entregas tu espíritu al Padre: recibe también mi espíritu y no me abandones a mí, que te clamo:',
  ),
  ikos(
    11,
    'Como una candela que ha recibido la luz, la Virgen purísima, que ardía de amor por Ti junto a tu Cruz, estaba presa del dolor de una madre cuando Tú, verdadero Sol de justicia, te ponías en el sepulcro. Con ella, recibe también estas oraciones de nuestro corazón:',
    [
      'Jesús, que fuiste levantado en el madero para elevar contigo hasta tu Padre a nosotros, los caídos;',
      'Jesús, que diste al discípulo virgen la siempre Virgen como madre, para enseñarnos la virginidad y la pureza;',
      'Jesús, que confiaste el discípulo Teólogo a la que te dio a luz a Ti, Dios Verbo, confíanos también a todos a su protección de madre;',
      'Jesús, vencedor del mundo y del infierno, vence la incredulidad, la soberbia de la vida y la concupiscencia de los ojos, que viven en nosotros;',
      'Jesús, destructor del poder de la muerte, líbrame de la muerte eterna;',
    ],
    PASION,
  ),
  kontakion(
    12,
    'Dame tu gracia, Jesús, Dios mío; recíbeme como recibiste a José y a Nicodemo, para que te presente mi alma como un sudario limpio, unja tu purísimo Cuerpo con los perfumes de las virtudes y te tenga en mi corazón como en un sepulcro, clamando:',
  ),
  ikos(
    12,
    'Cantando tu crucifixión voluntaria, adoramos tus padecimientos, oh Cristo, y creemos con el centurión que eres verdaderamente el Hijo de Dios, que has de venir sobre las nubes con poder y gran gloria. No nos avergüences entonces a nosotros, redimidos con tu Sangre, que te clamamos así:',
    [
      'Jesús, que tanto padeciste, por el llanto de la Virgen tu Madre arráncanos del llanto eterno;',
      'Jesús, abandonado por todos, no me dejes solo en la hora de mi muerte;',
      'Jesús, recíbeme con la Magdalena, que tocaba tus pies;',
      'Jesús, no me condenes con el traidor y con los que te crucificaron;',
      'Jesús, llévame al paraíso con el buen ladrón;',
    ],
    PASION,
  ),
  kontakion(
    13,
    'Oh Jesucristo, Cordero de Dios, que quitas los pecados del mundo: recibe esta pequeña acción de gracias que te ofrecemos con toda el alma; cúranos por tus padecimientos salvadores de toda enfermedad del alma y del cuerpo, protégenos con tu Cruz de los enemigos visibles e invisibles, y no nos abandones al final de nuestra vida, para que, librados de la muerte eterna por tu muerte, te clamemos siempre:',
    [rub('Se dice tres veces.')],
  ),
  cierre([
    rub('Oración'),
    t('Jesucristo, clavado por nosotros en la Cruz, Hijo unigénito de Dios Padre, abismo inagotable de misericordia, de amor y de compasión: sé que por mis pecados, por tu inefable amor a los hombres, quisiste derramar en la Cruz tu Sangre, que yo, miserable e ingrato, he pisoteado hasta ahora con mis obras impuras y he tenido por nada. Por eso, desde lo hondo de mi iniquidad y de mi impureza, mirando con los ojos del espíritu a Ti, mi Redentor crucificado, me arrojo con humildad y con fe en lo hondo de tus llagas, llenas de tu misericordia, pidiendo el perdón de mis pecados y la enmienda de mi vida impura.'),
    t('Sé misericordioso conmigo, Soberano y Juez mío; no me rechaces de tu presencia, sino conviérteme Tú mismo hacia Ti con tu mano todopoderosa y guíame por el camino del verdadero arrepentimiento, para que desde ahora ponga el comienzo de mi salvación. Con tus padecimientos divinos amansa mis pasiones carnales; con tu Sangre derramada purifica las manchas de mi alma; con tu crucifixión crucifícame al mundo, con sus tentaciones y sus deseos; con tu Cruz protégeme de los enemigos invisibles que acechan mi alma. Con tus pies traspasados aparta mis pies de todo mal camino; con tus manos traspasadas aparta mis manos de toda obra que no te agrade. Tú, que fuiste clavado en la carne, clava mi carne a tu temor, para que, apartándome del mal, haga el bien delante de Ti.'),
    t('Tú, que inclinaste la cabeza en la Cruz, inclina hasta la tierra de la humildad mi soberbia encumbrada; con tu corona de espinas protege mis oídos, para que no escuchen lo que no conviene; Tú, que gustaste la hiel con tus labios, pon guarda a mi boca impura; Tú, que tuviste el corazón abierto por la lanza, crea en mí un corazón puro; con todas tus llagas, hiéreme entero dulcemente de amor por Ti, para que te ame a Ti, mi Señor, con toda el alma, con todo el corazón, con todas las fuerzas y con todo el pensamiento.'),
    t('Dame tenerte a Ti, peregrino y pobre, sin dónde reclinar la cabeza; dame tenerte a Ti, el todo bueno, que libras mi alma de la muerte; dame tenerte a Ti, el todo dulce, que me endulzas con tu amor en las aflicciones y en las pruebas; para que al que antes odiaba, irritaba, echaba de mí y clavaba en la Cruz, a Ese ame ahora, lo reciba con alegría y lleve con dulzura su Cruz hasta el fin de mi vida.'),
    t('No permitas desde ahora, oh Redentor mío todo bueno, que se cumpla ni una sola voluntad mía, porque es mala e inútil, para que no vuelva a caer en la dura esclavitud del pecado que reinaba en mí; sino que se cumpla siempre en mí tu voluntad buena, que quiere salvarme. Encomendándome a ella, te pongo delante de los ojos de mi corazón a Ti, mi Señor crucificado, y te pido desde lo hondo del alma que, cuando me separe de este cuerpo de barro, te vea sólo a Ti en tu Cruz, recibiéndome en las manos de tu protección, guardándome de los espíritus malignos del aire y haciéndome habitar con los pecadores que te agradaron por el arrepentimiento. Amén.'),
  ]),
];
