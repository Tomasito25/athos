/**
 * La Pequeña Paráclesis a la Theotokos, entera.
 *
 * Es el oficio de súplica que más se reza fuera del templo: en agosto, en el
 * ayuno de la Dormición, y en cualquier aflicción, junto a un enfermo o antes
 * de una operación. Puede rezarlo un laico; las letanías y la despedida las
 * dice el sacerdote, y quien reza solo las omite o las sustituye por «Señor,
 * ten piedad».
 *
 * El texto se ha traducido del Horologion griego, en la edición digital de la
 * Archidiócesis Ortodoxa Griega de América (glt.goarch.org), parte por parte:
 * el canon de Teosteriktos con sus ocho odas, los troparios, el kathisma, los
 * antífonos, el Evangelio, las estiqueras, los megalinarios y los himnos
 * finales. Los irmoi son los del libro griego, que en las odas tercera, sexta
 * y novena no coinciden con los que traen los libros eslavos.
 *
 * Los salmos y el Evangelio no se copian aquí: se muestran tomados del
 * Salterio y de la Biblia de ATHOS. La traducción del resto es de ATHOS y no
 * procede de ningún libro litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const reading = (reference: string): TextBlock => ({ kind: 'reading', content: reference, ref: reference });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const ESTRIBILLO = ref('Santísima Theotokos, sálvanos.');
const GLORIA = 'Gloria al Padre, y al Hijo, y al Espíritu Santo.';
const AHORA = 'Ahora y siempre, y por los siglos de los siglos. Amén.';

interface Oda {
  n: number;
  irmos: string;
  troparios: string[];
  gloria: string;
  ahora: string;
}

const oda = ({ n, irmos, troparios, gloria, ahora }: Oda): OfficeSection =>
  s(`oda-${n}`, `Oda ${n}`, [
    rub('Irmos'),
    t(irmos),
    ESTRIBILLO,
    ...troparios.map(t),
    rub(GLORIA),
    t(gloria),
    rub(AHORA),
    t(ahora),
  ]);

const ODA_1 = oda({
  n: 1,
  irmos:
    'Habiendo atravesado el agua como tierra firme y escapado de la maldad de Egipto, el israelita clamaba: Cantemos a nuestro Redentor y Dios.',
  troparios: [
    'Acosado por muchas tentaciones, me refugio en ti buscando la salvación: oh Madre del Verbo y Virgen, sálvame de las dificultades y de los peligros.',
    'Me turban los asaltos de las pasiones y llenan mi alma de un gran desaliento: pacifícala, Doncella, con la calma de tu Hijo y Dios, oh toda inmaculada.',
  ],
  gloria:
    'A ti, que diste a luz al Salvador y Dios, te suplico, Virgen, que sea librado de los males; porque, acudiendo ahora a ti, levanto hacia ti el alma y el pensamiento.',
  ahora:
    'Estoy enfermo del cuerpo y del alma: hazme digno de tu visita divina y de tu cuidado, tú, la única Madre de Dios, porque eres buena y diste a luz al que es bueno.',
});

const ODA_3 = oda({
  n: 3,
  irmos:
    'Señor, que levantaste la bóveda del cielo y edificaste la Iglesia: afiánzame Tú en tu amor, cumbre de todo deseo, apoyo de los fieles, único amigo de los hombres.',
  troparios: [
    'A ti, Madre de Dios, te pongo por defensa y amparo de mi vida: guíame tú, Virgen, a tu puerto, causa de los bienes, apoyo de los fieles, única digna de toda alabanza.',
    'Te suplico, Virgen, que disipes la turbación de mi alma y la tempestad de mi desaliento; porque tú, Esposa de Dios, diste a luz a Cristo, autor de la calma, tú, la única purísima.',
  ],
  gloria:
    'Tú, que diste a luz al Bienhechor, causa de todo bien, derrama sobre todos la riqueza de tus beneficios; porque todo lo puedes, ya que diste a luz a Cristo, poderoso en fuerza, oh bienaventurada en Dios.',
  ahora:
    'Probado por graves enfermedades y por pasiones dolorosas, ayúdame tú, Virgen; porque sé que eres, toda inmaculada, el tesoro de las curaciones, que no se agota ni se acaba.',
});

const ODA_4 = oda({
  n: 4,
  irmos: 'Oí, Señor, el misterio de tu economía; comprendí tus obras y glorifiqué tu divinidad.',
  troparios: [
    'Tú, que diste a luz al Señor, piloto de todo, calma la turbación de mis pasiones y el oleaje de mis faltas, oh Esposa de Dios.',
    'Concédeme, a mí que te invoco, el abismo de tu compasión, tú que diste a luz al Compasivo, Salvador de todos los que te cantan.',
  ],
  gloria:
    'Gozando de tus dones, purísima, te cantamos un himno de acción de gracias, nosotros, que te reconocemos como Madre de Dios.',
  ahora:
    'Nosotros, que te tenemos por esperanza y apoyo y por muralla inconmovible de salvación, oh digna de toda alabanza, somos librados de toda adversidad.',
});

const ODA_5 = oda({
  n: 5,
  irmos:
    'Ilumínanos, Señor, con tus mandamientos, y con tu brazo excelso concédenos tu paz, oh amigo de los hombres.',
  troparios: [
    'Llena de gozo mi corazón, oh Pura, dándome tu alegría sin mancha, tú que diste a luz al autor del gozo.',
    'Líbranos de los peligros, Theotokos pura, tú que diste a luz la redención eterna y la paz que supera todo entendimiento.',
  ],
  gloria:
    'Disipa la niebla de mis faltas, Esposa de Dios, con la claridad de tu resplandor, tú que diste a luz la luz divina, anterior a los siglos.',
  ahora:
    'Cura, oh Pura, la enfermedad de mis pasiones; hazme digno de tu visita y dame la salud por tu intercesión.',
});

const ODA_6 = oda({
  n: 6,
  irmos:
    'Derramaré mi súplica ante el Señor y a Él le contaré mis aflicciones, porque mi alma está llena de males y mi vida se ha acercado al infierno; y como Jonás le ruego: Sácame, oh Dios, de la corrupción.',
  troparios: [
    'Él salvó de la muerte y de la corrupción mi naturaleza, presa de la corrupción y de la muerte, entregándose Él mismo a la muerte: suplica, Virgen, a tu Señor e Hijo que me libre de la maldad de los enemigos.',
    'Sé que eres, Virgen, protectora de la vida y guardiana segurísima, que dispersas el tropel de las tentaciones y ahuyentas los ataques de los demonios; y te pido siempre que me libres de la corrupción de mis pasiones.',
  ],
  gloria:
    'Te tenemos, Doncella, por muralla de refugio, salvación completa de las almas y desahogo en las aflicciones, y en tu luz nos alegramos siempre. Oh Señora, sálvanos también ahora de las pasiones y de los peligros.',
  ahora:
    'Ahora yazgo enfermo en el lecho y no hay curación para mi carne; pero a ti, que diste a luz a Dios, Salvador del mundo y libertador de las enfermedades, te ruego, porque eres buena: levántame de la corrupción de las enfermedades.',
});

const ODA_7 = oda({
  n: 7,
  irmos:
    'Los jóvenes venidos de Judea pisotearon en otro tiempo en Babilonia, por la fe en la Trinidad, la llama del horno, cantando: Dios de nuestros padres, bendito eres.',
  troparios: [
    'Como quisiste, oh Salvador, disponer nuestra salvación, habitaste en el seno de la Virgen, y la mostraste al mundo como protectora. Dios de nuestros padres, bendito eres.',
    'Madre pura, suplica al que diste a luz, que ama la misericordia, que libre de las faltas y de las manchas del alma a los que claman con fe: Dios de nuestros padres, bendito eres.',
  ],
  gloria:
    'A la que te dio a luz la mostraste a los que claman como tesoro de salvación y fuente de incorrupción, torre de seguridad y puerta de arrepentimiento: Dios de nuestros padres, bendito eres.',
  ahora:
    'Dígnate curar, Madre de Dios, las dolencias de los cuerpos y las enfermedades de las almas de los que se acercan con amor a tu amparo divino, tú que nos diste a luz a Cristo Salvador.',
});

const ODA_8 = oda({
  n: 8,
  irmos:
    'Al Rey del cielo, a quien cantan los ejércitos de los ángeles, alabadle y exaltadle por todos los siglos.',
  troparios: [
    'No desprecies, Virgen, a los que necesitan tu ayuda y te cantan y te exaltan, Doncella, por los siglos.',
    'Derramas la abundancia de las curaciones, Virgen, sobre los que te cantan con fe y exaltan tu parto inefable.',
  ],
  gloria:
    'Curas, Virgen, las enfermedades de mi alma y los dolores de mi carne, para que te glorifique a ti, la llena de gracia.',
  ahora:
    'Tú alejas, Virgen, los asaltos de las tentaciones y los ataques de las pasiones; por eso te cantamos por todos los siglos.',
});

const ODA_9 = oda({
  n: 9,
  irmos:
    'Te confesamos verdaderamente Theotokos, Virgen pura, nosotros, los que por ti hemos sido salvados, y te engrandecemos con los coros de los incorpóreos.',
  troparios: [
    'No rechaces el torrente de mis lágrimas, Virgen, tú que diste a luz a Cristo, que ha enjugado toda lágrima de todo rostro.',
    'Llena de alegría mi corazón, Virgen, tú que recibiste la plenitud de la alegría y deshiciste la tristeza del pecado.',
    'Sé, Virgen, puerto y protección de los que acuden a ti, muralla inconmovible, refugio, amparo y alegría.',
  ],
  gloria:
    'Ilumina, Virgen, con los rayos de tu luz, ahuyentando la oscuridad de la ignorancia, a los que con piedad te proclaman Theotokos.',
  ahora:
    'Cura, Virgen, a quien yace humillado en el lugar del sufrimiento, en la enfermedad, y cámbiale la dolencia en salud.',
});

const KONTAKION = t(
  'Protección de los cristianos que no defrauda, mediación ante el Creador que no se rechaza: no desprecies las voces de los pecadores que te suplican, sino adelántate, como buena, a socorrer a los que con fe te claman. Apresúrate a interceder y date prisa en suplicar, oh Theotokos, que proteges siempre a los que te honran.',
);

const NO_CALLAREMOS = t(
  'Nunca callaremos, oh Theotokos, nosotros los indignos, tus proezas: porque si tú no estuvieras delante intercediendo, ¿quién nos habría librado de tantos peligros? ¿Quién nos habría guardado libres hasta ahora? No nos apartaremos de ti, Señora, porque tú salvas siempre a tus siervos de toda clase de males.',
);

const DIASOSON = t(
  'Libra de los peligros a tus siervos, oh Theotokos, porque después de Dios todos nos refugiamos en ti, muralla inquebrantable y protección.',
);

/** La letanía breve que dice el sacerdote después de la tercera y la sexta oda. */
const LETANIA: TextBlock[] = [
  rub('Si hay sacerdote, dice la letanía; quien reza solo dice «Señor, ten piedad» doce veces.'),
  t('Ten piedad de nosotros, oh Dios, según tu gran misericordia; te lo suplicamos: escúchanos y ten piedad.'),
  { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
  t('Oremos también por nuestro arzobispo N. y por toda nuestra hermandad en Cristo.'),
  t('Oremos también por la misericordia, la vida, la paz, la salud, la salvación, la visita, el perdón y la remisión de los pecados de los siervos de Dios, de todos los cristianos piadosos y ortodoxos que viven en esta ciudad o están de paso, y de los fieles y bienhechores de este santo templo.'),
  t('Oremos también por los siervos de Dios N. y N.'),
  t('Porque eres Dios misericordioso y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
];

/** El canon solo, con sus ocho odas: es lo que se muestra en Himnos → Cánones. */
export const PARACLISIS_CANON: OfficeSection[] = [
  s('sobre', 'El canon de súplica', [
    rub('Obra de Teosteriktos el Monje (siglo IX), en el tono octavo. Tiene ocho odas: como casi todos los cánones, salta la segunda, que sólo se canta en Cuaresma.'),
    rub('Antes de cada estrofa se dice el estribillo, y al final de cada oda se repite el irmos:'),
    ESTRIBILLO,
    rub('El oficio completo, con los salmos, el Evangelio y los himnos finales, está en Orar → Oficios → Paráclesis a la Theotokos.'),
  ]),
  ODA_1,
  ODA_3,
  ODA_4,
  ODA_5,
  ODA_6,
  s('kontakion', 'Kontakion', [rub('Se canta después de la sexta oda.'), KONTAKION]),
  ODA_7,
  ODA_8,
  ODA_9,
  s('final', 'Al terminar', [
    rub('Uno de los troparios del comienzo del oficio, que es el que más se reza suelto:'),
    NO_CALLAREMOS,
  ]),
];

/** El oficio entero, de la bendición a la despedida. */
export const PARACLISIS_OFICIO: OfficeSection[] = [
  s('sentido', 'Qué es', [
    rub('Canon de súplica a la Madre de Dios en la aflicción. Hay dos: la Pequeña Paráclesis, que es ésta, y la Grande, que se alterna con ella durante las dos primeras semanas de agosto, en el ayuno de la Dormición. La Pequeña se reza además en cualquier momento de necesidad, y es de los oficios que más se rezan fuera del templo.'),
    rub('Puede rezarla un laico: empieza entonces con «Por las oraciones de nuestros santos padres» y el comienzo habitual, y omite las letanías y la despedida del sacerdote.'),
  ]),
  s('comienzo', 'Comienzo', [
    rub('El sacerdote:'),
    t('Bendito sea nuestro Dios, en todo tiempo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    rub('Se lee el salmo 142:'),
    psalm(142),
  ]),
  s('dios-es-el-senor', 'Dios es el Señor', [
    t('Dios es el Señor y se nos ha manifestado; bendito el que viene en el nombre del Señor.'),
    rub('Se repite después de cada uno de estos versículos:'),
    t('Alabad al Señor e invocad su santo nombre.'),
    t('Todas las naciones me rodearon, y en el nombre del Señor las rechacé.'),
    t('Esto es obra del Señor, y es admirable a nuestros ojos.'),
    rub('Tropario, en el tono cuarto. Dos veces:'),
    t('Acudamos ahora con ardor a la Theotokos, pecadores y humildes, y postrémonos con arrepentimiento, clamando desde lo hondo del alma: Señora, ayúdanos, compadécete de nosotros; apresúrate, que perecemos bajo la multitud de nuestras faltas; no despidas vacíos a tus siervos, porque a ti te tenemos por única esperanza.'),
    rub(`${GLORIA} ${AHORA}`),
    NO_CALLAREMOS,
    rub('Se lee el salmo 50:'),
    psalm(50),
  ]),
  ODA_1,
  ODA_3,
  s('tras-la-tercera', 'Después de la tercera oda', [
    rub('Dos troparios a la Theotokos:'),
    DIASOSON,
    t('Mira con benevolencia, Theotokos digna de toda alabanza, el duro sufrimiento de mi cuerpo, y sana el dolor de mi alma.'),
    ...LETANIA,
    rub('Kathisma, en el tono segundo:'),
    t('Intercesión ardiente y muralla inexpugnable, fuente de misericordia, refugio del mundo, te clamamos con insistencia: Theotokos, Señora, adelántate y líbranos de los peligros, tú, la única que protege enseguida.'),
  ]),
  ODA_4,
  ODA_5,
  ODA_6,
  s('tras-la-sexta', 'Después de la sexta oda', [
    DIASOSON,
    t('Purísima, que en los últimos días diste a luz de manera inexplicable, por una palabra, al Verbo: suplícale, porque tienes la confianza de una madre.'),
    ...LETANIA,
    rub('Kontakion, en el tono segundo:'),
    KONTAKION,
  ]),
  s('evangelio', 'Antífono y Evangelio', [
    rub('Primer antífono de los graduales, en el tono cuarto:'),
    { kind: 'text', content: 'Desde mi juventud me combaten muchas pasiones; pero Tú, Salvador mío, acógeme y sálvame.', times: 2 },
    { kind: 'text', content: 'Los que odiáis a Sión, sed avergonzados por el Señor: como hierba quedaréis secos en el fuego.', times: 2 },
    rub(GLORIA),
    t('Por el Espíritu Santo toda alma recibe la vida y, purificada, es elevada, y resplandece en la Unidad trinitaria de un modo santo y misterioso.'),
    rub(AHORA),
    t('Del Espíritu Santo brotan los ríos de la gracia, que riegan toda la creación para darle vida.'),
    rub('Prokímenon:'),
    t('Recordaré tu nombre de generación en generación.'),
    rub('Versículo:'),
    t('Escucha, hija, mira e inclina tu oído; olvida tu pueblo y la casa de tu padre, y el Rey deseará tu hermosura.'),
    t('Recordaré tu nombre de generación en generación.'),
    rub('El sacerdote:'),
    t('Y para que seamos dignos de escuchar el santo Evangelio, roguemos al Señor nuestro Dios.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
    t('Sabiduría. De pie. Escuchemos el santo Evangelio. La paz sea con todos.'),
    t('Y con tu espíritu.'),
    t('Lectura del santo Evangelio según san Lucas. Estemos atentos.'),
    t('Gloria a Ti, Señor, gloria a Ti.'),
    reading('Lucas 1, 39-49. 56'),
    t('Gloria a Ti, Señor, gloria a Ti.'),
  ]),
  s('estiqueras', 'Después del Evangelio', [
    rub(`${GLORIA} En el tono segundo:`),
    t('Padre, Verbo, Espíritu, Trinidad en la Unidad: borra la multitud de mis culpas.'),
    rub(AHORA),
    t('Por la intercesión de la Theotokos, oh Misericordioso, borra la multitud de mis culpas.'),
    rub('Versículo:'),
    t('Ten piedad de mí, oh Dios, según tu gran misericordia, y según la multitud de tus compasiones borra mi iniquidad.'),
    rub('En el tono sexto:'),
    t('No me encomiendes a una protección humana, santísima Señora, sino recibe la súplica de tu siervo: porque la aflicción me tiene preso, no puedo soportar las flechas de los demonios, no tengo amparo ni sé adónde huir, desdichado de mí, combatido por todas partes, y no tengo más consuelo que tú. Señora del mundo, esperanza y protección de los fieles, no desprecies mi súplica: haz lo que me conviene.'),
    rub('Otros dos troparios a la Theotokos:'),
    t('Nadie que acude a ti sale avergonzado, pura Virgen Theotokos, sino que pide la gracia y recibe el don, según lo que le conviene de lo que pidió.'),
    t('Tú, que cambias la suerte de los afligidos y libras a los enfermos, Virgen Theotokos, salva a la ciudad y al pueblo: paz de los que sufren la guerra, calma de los que sufren la tempestad, única protección de los fieles.'),
  ]),
  s('salva-a-tu-pueblo', 'La oración por el pueblo', [
    rub('El sacerdote:'),
    t('Salva, oh Dios, a tu pueblo y bendice tu heredad; visita a tu mundo con misericordia y compasión; exalta el poder de los cristianos ortodoxos y envía sobre nosotros tus ricas misericordias: por la intercesión de nuestra Señora purísima, la Theotokos y siempre Virgen María; por el poder de la preciosa y vivificante Cruz; por la protección de las venerables Potestades celestiales incorpóreas; por las súplicas del venerable y glorioso profeta, Precursor y Bautista Juan; de los santos, gloriosos y dignos de toda alabanza apóstoles; de nuestros santos padres, grandes jerarcas y maestros ecuménicos Basilio el Grande, Gregorio el Teólogo y Juan Crisóstomo; de Atanasio y Cirilo y de Juan el Misericordioso, patriarcas de Alejandría; de Nicolás de Mira de Licia, de Espiridón, obispo de Trimitunte, y de Nectario de Pentápolis, los taumaturgos; de los santos y gloriosos grandes mártires Jorge el Portador de trofeos, Demetrio el que mana mirra, Teodoro el Recluta, Teodoro el General y Menas el taumaturgo; de los hieromártires Haralambos y Eleuterio; de las santas, gloriosas y grandes mártires Tecla, Bárbara, Anastasia, Kyriakí, Fotiní, Marina, Paraskeví e Irene; de los santos, gloriosos y victoriosos mártires; de nuestros venerables padres portadores de Dios; del santo de este templo; de los santos y justos antepasados de Dios Joaquín y Ana; del santo del día y de todos tus santos: te suplicamos, Señor, el único lleno de misericordia: escúchanos a nosotros, pecadores, que te suplicamos, y ten piedad de nosotros.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 12 },
    t('Por la misericordia, la compasión y el amor a los hombres de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),
  ODA_7,
  ODA_8,
  ODA_9,
  s('megalinarios', 'Megalinarios', [
    rub('En lugar del Magníficat, que en este oficio no se canta:'),
    t('Digno es en verdad bendecirte, oh Theotokos, siempre bienaventurada y del todo inmaculada, y Madre de nuestro Dios.'),
    t('Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin corrupción diste a luz a Dios Verbo, verdadera Theotokos, te engrandecemos.'),
    t('Más alta que los cielos y más pura que los resplandores del sol, a la que nos redimió de la maldición, a la Señora del mundo, honrémosla con himnos.'),
    t('Por mis muchos pecados está enfermo mi cuerpo y enferma también mi alma: acudo a ti, la llena de gracia, esperanza de los desesperados: ayúdame tú.'),
    t('Señora y Madre del Redentor, recibe las súplicas de tus siervos indignos, para que intercedas ante el que nació de ti. Oh Señora del mundo, sé nuestra mediadora.'),
    t('Te cantamos ahora con ardor y alegría esta oda, Theotokos digna de toda alabanza: con el Precursor y todos los santos, suplica, oh Theotokos, que se compadezca de nosotros.'),
    t('Mudos queden los labios de los impíos que no veneran tu icono venerable, el que pintó el santísimo apóstol Lucas, la Hodigitria.'),
    t('Todos los ejércitos de los ángeles, Precursor del Señor, los doce apóstoles, todos los santos, con la Theotokos: interceded para que seamos salvados.'),
  ]),
  s('trisagio', 'Trisagio y troparios', [
    rub('Trisagio, «Santísima Trinidad» y Padre Nuestro, como en el comienzo habitual (Orar → Oraciones). Después, en el tono sexto:'),
    t('Ten piedad de nosotros, Señor, ten piedad de nosotros: porque, faltos de toda defensa, nosotros, los pecadores, te ofrecemos como a Soberano esta súplica: ten piedad de nosotros.'),
    rub(GLORIA),
    t('Señor, ten piedad de nosotros, porque en Ti hemos confiado; no te enojes en exceso con nosotros ni te acuerdes de nuestras iniquidades; míranos también ahora, compasivo, y líbranos de nuestros enemigos: porque Tú eres nuestro Dios y nosotros tu pueblo; todos somos obra de tus manos e invocamos tu nombre.'),
    rub(AHORA),
    t('Ábrenos la puerta de la compasión, bendita Theotokos; que no seamos defraudados los que esperamos en ti; seamos librados por ti de las adversidades, porque tú eres la salvación del pueblo cristiano.'),
  ]),
  s('letania-final', 'Letanía y despedida', [
    rub('Si hay sacerdote, dice la letanía ferviente, con las mismas peticiones de antes y éstas:'),
    t('Oremos también por que sean guardados esta santa iglesia y esta ciudad, y toda ciudad y región, de la ira, la peste, el hambre, el terremoto, la inundación, el fuego, la espada, la invasión de extranjeros, la guerra civil y la muerte repentina; por que nuestro Dios bueno y amigo de los hombres se muestre propicio, benévolo y fácil de aplacar, aparte y disipe toda ira y enfermedad que se levanta contra nosotros, nos libre de la justa amenaza que pesa sobre nosotros y tenga piedad de nosotros.'),
    t('Oremos también por que el Señor nuestro Dios escuche la voz de la súplica de nosotros, pecadores, y tenga piedad de nosotros.'),
    t('Escúchanos, oh Dios, Salvador nuestro, esperanza de todos los confines de la tierra y de los que están lejos en el mar; sé propicio, sé propicio, Soberano, con nuestros pecados, y ten piedad de nosotros.'),
    t('Porque eres Dios misericordioso y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Gloria a Ti, oh Dios, esperanza nuestra; Señor, gloria a Ti.'),
    rub('Despedida:'),
    t('Cristo, nuestro Dios verdadero, por la intercesión de su purísima y del todo inmaculada santa Madre; por el poder de la preciosa y vivificante Cruz; por la protección de las venerables Potestades celestiales incorpóreas; por las súplicas del venerable y glorioso profeta, Precursor y Bautista Juan; de los santos, gloriosos y dignos de toda alabanza apóstoles; de los santos, gloriosos y victoriosos mártires; de nuestros venerables padres portadores de Dios; del santo de este templo; de los santos y justos antepasados de Dios Joaquín y Ana; del santo del día y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno, amigo de los hombres y misericordioso.'),
    rub('Quien reza solo termina con «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos. Amén».'),
  ]),
  s('himnos-finales', 'Himnos finales', [
    rub('Mientras se venera el icono de la Theotokos. En el tono segundo:'),
    t('Proteges, oh Buena, con tu mano poderosa a todos los que se refugian en ti con fe; porque nosotros, pecadores, agobiados por muchas faltas, no tenemos ante Dios otra mediación en los peligros y las aflicciones, Madre del Dios altísimo. Por eso nos postramos ante ti: libra a tus siervos de toda adversidad.'),
    t('Alegría de todos los afligidos, protectora de los que sufren injusticia, alimento de los pobres, consuelo de los forasteros, bastón de los ciegos, visita de los enfermos, amparo y socorro de los agobiados, auxilio de los huérfanos: eso eres tú, purísima Madre del Dios altísimo. Apresúrate, te lo suplicamos, a librar a tus siervos.'),
    rub('En el tono octavo:'),
    t('Señora, recibe las súplicas de tus siervos y líbranos de toda necesidad y aflicción.'),
    rub('En el tono segundo:'),
    t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
  ]),
  s('agosto', 'En agosto', [
    rub('Del 1 al 14 de agosto, en lugar de los himnos finales, se cantan estos exapostilarios de la Dormición, en el tono tercero:'),
    head('La Theotokos a los apóstoles'),
    t('«Apóstoles, reunidos aquí desde los confines de la tierra, sepultad mi cuerpo en el huerto de Getsemaní; y Tú, Hijo y Dios mío, recibe mi espíritu.»'),
    t('Dulzura de los ángeles, alegría de los afligidos, protectora de los cristianos, Virgen, Madre del Señor: socórreme y líbrame de los tormentos eternos.'),
    t('Te tengo por mediadora ante Dios, amigo de los hombres: que no ponga al descubierto mis obras delante de los ángeles. Te lo suplico, Virgen: ayúdame pronto.'),
    t('Torre entretejida de oro, ciudad de doce murallas, trono salpicado de sol, sede del Rey: maravilla incomprensible, ¿cómo amamantas al Soberano?'),
    rub('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos. Amén.'),
  ]),
];
