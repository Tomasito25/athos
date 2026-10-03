/**
 * Los dos cánones de la muerte: el que se lee junto al que se muere y el que
 * se lee por el que ya ha muerto.
 *
 * Los dos están en el libro de oraciones eslavo y los dos puede leerlos un
 * laico. Se han traducido del eslavo eclesiástico, tal como lo publica Azbuka
 * Very (azbyka.ru), y no de la versión rusa moderna que lo acompaña.
 *
 * El canon de la separación del alma ocupaba hasta ahora una ficha vacía en
 * Orar → Oraciones; el canon por un difunto sustituye al «akathistos por los
 * difuntos», que se ha retirado porque la Iglesia no lo aprueba (véase
 * `akathistos-mas.ts`). Éste, en cambio, es el que los propios obispos rusos
 * recomiendan leer en su lugar.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const GLORIA = 'Gloria al Padre, y al Hijo, y al Espíritu Santo.';
const AHORA = 'Ahora y siempre, y por los siglos de los siglos. Amén.';

interface Oda {
  n: number;
  irmos: string;
  troparios: string[];
  gloria: string;
  ahora: string;
}

const oda = (estribillo: TextBlock) => ({ n, irmos, troparios, gloria, ahora }: Oda): OfficeSection =>
  s(`oda-${n}`, `Oda ${n}`, [
    rub('Irmos'),
    t(irmos),
    estribillo,
    ...troparios.map(t),
    rub(GLORIA),
    t(gloria),
    rub(AHORA),
    t(ahora),
  ]);

const COMIENZO: TextBlock[] = [
  rub('Si lee un sacerdote, empieza: «Bendito sea nuestro Dios, siempre, ahora y siempre, y por los siglos de los siglos». Si lee un laico: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros. Amén».'),
  rub('Sigue el comienzo habitual: Trisagio, «Santísima Trinidad», Padre Nuestro (Orar → Oraciones → Comienzo habitual), «Señor, ten piedad» doce veces, y tres veces «Venid, adoremos», con una inclinación cada vez.'),
];

/** La estrofa más conocida del Gran Canon, que este canon toma como kontakion. */
const ALMA_MIA =
  'Alma mía, alma mía, levántate: ¿por qué duermes? El fin se acerca y vas a turbarte. Despierta, pues, para que se compadezca de ti Cristo Dios, que está en todo lugar y todo lo llena.';
const ALMA_MIA_IKOS =
  'Al ver abierta la casa de curación de Cristo, y la salud que de ella brota para Adán, el diablo sufrió y quedó herido; y, como quien se ve en peligro, se lamentaba y gritaba a sus amigos: ¿Qué haré con el Hijo de María? Me mata el de Belén, que está en todo lugar y todo lo llena.';

/* ═══════════════ En la separación del alma ═══════════════ */

const odaAgonia = oda(ref('Santísima Theotokos, sálvanos.'));

const SEPARACION: OfficeSection[] = [
  s('sobre', 'Junto al que se muere', [
    rub('Se lee junto al lecho cuando aparecen los signos de la muerte cercana, en nombre del que se muere y ya no puede hablar: por eso las estrofas van en primera persona. Casi todas se dirigen a la Madre de Dios.'),
    rub('Puede leerlo un laico si no hay sacerdote, y conviene hacerlo: se enciende una vela y la lámpara del icono. Las oraciones con que el sacerdote cierra el oficio son suyas y el laico las omite.'),
    ...COMIENZO,
    rub('Después se lee el salmo 50:'),
    psalm(50),
    rub('El canon está en el tono sexto. Antes de cada estrofa se dice:'),
    ref('Santísima Theotokos, sálvanos.'),
  ]),
  odaAgonia({
    n: 1,
    irmos: 'Habiendo caminado Israel por el abismo como por tierra seca, al ver ahogarse al faraón, su perseguidor, clamaba: Cantemos a Dios un himno de victoria.',
    troparios: [
      'Como gotas de lluvia, mis días, malos y pocos, menguando con el correr de los veranos, se van extinguiendo ya poco a poco. Señora, sálvame.',
      'Tú, que por naturaleza te inclinas a la compasión y a las muchas misericordias, Señora, asísteme en esta hora terrible, ayuda invencible.',
      'Un gran temor se apodera ahora de mi alma, un temblor indecible y doloroso, al tener que salir del cuerpo, Purísima: consuélala tú.',
    ],
    gloria:
      'Refugio seguro de los pecadores y de los humildes: muestra en mí tu misericordia, Pura, y líbrame de las manos de los demonios, porque me han rodeado como una jauría de perros.',
    ahora:
      'Éste es el tiempo de la ayuda, éste es el tiempo de tu protección; éste es, Señora, el tiempo por el que día y noche me postraba ante ti y te suplicaba con fervor.',
  }),
  odaAgonia({
    n: 3,
    irmos: 'No hay santo como Tú, Señor Dios mío, que has exaltado el poder de tus fieles, oh Bueno, y nos has afianzado sobre la roca de tu confesión.',
    troparios: [
      'Previendo desde lejos este día, Señora, y pensando siempre en él como si ya hubiera llegado, te suplicaba con lágrimas ardientes que no me olvidaras.',
      'Me rodean leones invisibles, rugiendo, y buscan arrebatarme y despedazarme cruelmente: rompe, Pura, sus dientes y sus fauces, y sálvame.',
      'Ahora que se ha apagado del todo el órgano de la palabra, la lengua se ha trabado y la voz se ha cerrado, te suplico con el corazón quebrantado, Salvadora mía: sálvame.',
    ],
    gloria:
      'Inclina tu oído hacia mí, Madre de Cristo mi Dios, desde la altura de tu gran gloria, oh Buena; escucha mi último gemido y tiéndeme la mano.',
    ahora:
      'No apartes de mí tus muchas misericordias, no cierres tus entrañas amorosas, Pura; asísteme ahora y acuérdate de mí en la hora del juicio.',
  }),
  odaAgonia({
    n: 4,
    irmos: 'Cristo es mi fuerza, mi Dios y Señor, canta con dignidad la venerable Iglesia, clamando con mente pura y celebrando la fiesta en el Señor.',
    troparios: [
      'Pon ahora, oh Buena, un torrente de lágrimas que lave mis pecados, y recibe la contrición de mi corazón; porque pongo en ti mi esperanza, oh Buena, de que de algún modo me libres del terrible tormento del fuego, porque tú misma eres fuente de la gracia, Madre de Dios.',
      'Refugio que no defrauda ni falla a todos los que están en necesidad, Señora purísima: sé tú mi defensora en la hora de la prueba.',
      'Extiende tus manos purísimas y venerabilísimas como alas sagradas de paloma, y cúbreme bajo su amparo y su sombra, Señora.',
    ],
    gloria:
      'Hazme digno, al partir de la tierra, de pasar sin estorbo ante el príncipe del aire, el violento y torturador, que se planta en los caminos temibles y pide cuentas sin razón.',
    ahora:
      'Mira, Señora: me ha alcanzado el temor que temía; mira, me envuelve un gran combate: sé mi ayuda en él, esperanza de mi salvación.',
  }),
  odaAgonia({
    n: 5,
    irmos: 'Con tu luz divina, oh Bueno, ilumina de amor, te lo ruego, las almas de los que madrugan hacia Ti, para que te conozcan a Ti, Verbo de Dios, Dios verdadero, que las llamas desde la oscuridad del pecado.',
    troparios: [
      'No me olvides, oh Buena, ni apartes tu rostro de mí, tu siervo; escúchame, que estoy afligido; atiende a mi alma y líbrala.',
      'Parientes míos según la carne, hermanos según el espíritu, amigos y conocidos de siempre: llorad, suspirad, lamentaos, porque ahora me separo de vosotros.',
      'Ahora no hay nadie que me libre, ni nadie que de verdad me ayude. Ayúdame tú, Señora, para que no quede encerrado en manos de mis enemigos como un hombre sin ayuda.',
    ],
    gloria:
      'Entrad, mis santos ángeles; presentaos ante el tribunal de Cristo, doblad las rodillas del espíritu y clamadle con llanto: Ten piedad, Creador de todos, de la obra de tus manos, oh Bueno, y no la rechaces.',
    ahora:
      'Postraos ante la Señora y purísima Madre de mi Dios y suplicadle que se arrodille con vosotros y lo incline a la misericordia: porque, siendo su Madre y la que lo alimentó, será escuchada.',
  }),
  odaAgonia({
    n: 6,
    irmos: 'Viendo el mar de la vida levantado por la tempestad de las desgracias, he acudido a tu puerto tranquilo y te clamo: Saca mi vida de la corrupción, oh Misericordiosísimo.',
    troparios: [
      'Mis labios callan y mi lengua no habla, pero el corazón dice: porque el fuego de la contrición, que lo consume, arde dentro, y con voces inefables te llama a ti, Virgen.',
      'Mírame desde lo alto, Madre de Dios, y dígnate ahora, con misericordia, bajar a visitarme, para que, viéndote, salga del cuerpo con alegría.',
      'Se rompen las ataduras, se deshacen las leyes que mantenían unido el cuerpo entero, y me causan un sufrimiento insoportable y una gran angustia.',
    ],
    gloria:
      'Ponme, Señora, en las manos sagradas y venerables de los santos ángeles, para que, cubierto con sus alas, no vea la figura deshonrosa, maloliente y oscura de los demonios.',
    ahora:
      'Cámara nupcial venerabilísima de Dios: hazme digno de la cámara nupcial espiritual del cielo, encendiendo mi lámpara, apagada y sin luz, con el aceite santo de tu misericordia.',
  }),
  s('kontakion', 'Kontakion e ikos', [
    rub('En el tono sexto. Son los del Gran Canon de san Andrés:'),
    t(ALMA_MIA),
    rub('Ikos'),
    t(ALMA_MIA_IKOS),
  ]),
  odaAgonia({
    n: 7,
    irmos: 'El ángel hizo del horno un lugar de rocío para los santos jóvenes, y el mandato de Dios, que abrasaba a los caldeos, movió al tirano a clamar: Bendito eres, Dios de nuestros padres.',
    troparios: [
      'La noche de la muerte me ha alcanzado sin estar preparado, oscura y sin luna, y me lanza sin preparación a aquel camino largo y temible: que tu misericordia me acompañe, Señora.',
      'Mira que todos mis días se han desvanecido de verdad en la vanidad, como está escrito, y mis años en el afán; y los lazos de la muerte, verdaderamente amargos, se han adelantado a mi alma y me tienen atrapado.',
      'Que la multitud de mis pecados no pueda vencer tu gran compasión, Señora, sino que tu misericordia me rodee y cubra todas mis iniquidades.',
    ],
    gloria:
      'Llegan los que han de llevarme de aquí y me sujetan por todas partes; y mi alma se resiste y tiene miedo, llena de turbación: consuélala, Pura, con tu presencia.',
    ahora:
      'No he encontrado, Señora, a nadie que se duela conmigo en mi aflicción ni que me consuele, porque mis amigos y conocidos me han abandonado ahora todos a la vez; pero tú, esperanza mía, no me abandones de ningún modo.',
  }),
  odaAgonia({
    n: 8,
    irmos: 'De la llama hiciste brotar rocío para los santos, y con agua abrasaste el sacrificio del justo: porque todo lo haces, oh Cristo, con sólo quererlo. Te exaltamos por todos los siglos.',
    troparios: [
      'Madre amiga de los hombres del Dios amigo de los hombres: mírame con ojos apacibles y misericordiosos cuando mi alma se separe del cuerpo, para que te glorifique por todos los siglos, santa Theotokos.',
      'Hazme digno de escapar de las huestes bárbaras de los incorpóreos, de atravesar los abismos del aire y de subir al cielo, para que te glorifique por los siglos, santa Theotokos.',
      'Tú, que diste a luz al Señor todopoderoso, aleja de mí al príncipe de los amargos peajes, que domina el mundo, cuando haya de morir, para que te glorifique por los siglos, santa Theotokos.',
    ],
    gloria:
      'Cuando suene la gran trompeta final, en la temible y terrible resurrección del juicio, cuando todos resuciten, acuérdate entonces de mí, santa Theotokos.',
    ahora:
      'Palacio excelso de Cristo, el Soberano: envía desde lo alto tu gracia y adelántate a socorrerme ahora, en el día de la aflicción, para que te glorifique por todos los siglos, santa Theotokos.',
  }),
  odaAgonia({
    n: 9,
    irmos: 'Es imposible que los hombres vean a Dios, a quien no se atreven a mirar los coros de los ángeles; pero por ti, Purísima, apareció a los hombres el Verbo encarnado. Engrandeciéndolo con los ejércitos del cielo, te llamamos bienaventurada.',
    troparios: [
      '¡Oh!, ¿cómo veré al Invisible? ¿Cómo soportaré aquella visión terrible? ¿Cómo me atreveré a abrir los ojos? ¿Cómo osaré mirar a mi Soberano, a quien no he dejado de amargar desde mi juventud?',
      'Santa Doncella, Madre de Dios: mira con misericordia mi humillación, recibe esta súplica mía, llena de compunción y la última, y apresúrate a librarme del fuego eterno que atormenta.',
      'Mi alma, que ha profanado los templos santos, al dejar el templo impuro del cuerpo te suplica a ti, templo venerabilísimo de Dios, Doncella, Virgen y Madre, que la libres de las tinieblas exteriores y del cruel ardor de la gehena.',
    ],
    gloria:
      'Viendo cerca el fin de mi vida y pensando en los pensamientos y las obras indignas que mi alma ha cometido, Purísima, soy herido cruelmente por las flechas de la conciencia; pero inclínate con misericordia y sé mi protectora.',
    ahora:
      'Un Hijo se nos ha dado por misericordia, el Hijo de Dios y Rey eterno de los ángeles, que se hizo hombre de tu sangre purísima. Hazlo propicio, Doncella, a mi alma apasionada, que es arrancada cruelmente de este cuerpo miserable.',
  }),
  s('final', 'Al terminar', [
    t('Digno es en verdad bendecirte, oh Theotokos, siempre bienaventurada y del todo inmaculada, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin corrupción diste a luz a Dios Verbo, verdadera Theotokos, te engrandecemos.'),
    rub('Si hay sacerdote, lee después las oraciones de la separación del alma. Si no lo hay, se puede seguir leyendo el Salterio junto al que se muere.'),
  ]),
];

/** El canon en una sola página, para la ficha de Orar → Oraciones. */
export const CANON_SEPARACION_BLOCKS: TextBlock[] = SEPARACION.flatMap((sec, i) => [
  ...(i === 0 ? [] : [head(sec.title)]),
  ...sec.blocks,
]);

/* ═══════════════ Por un difunto ═══════════════ */

const DESCANSO = ref('Da descanso, Señor, al alma de tu siervo difunto.');
const odaDifunto = oda(DESCANSO);

export const CANON_DIFUNTO: OfficeSection[] = [
  s('sobre', 'Por el que ha muerto', [
    rub('Se lee en casa por un difunto concreto, sobre todo en los cuarenta días que siguen a la muerte y en los aniversarios. No sustituye a la panihida, que celebra el sacerdote en la iglesia, pero la acompaña. Donde dice «N.» se dice el nombre de bautismo del difunto; si es una mujer, se cambia lo que haya que cambiar.'),
    ...COMIENZO,
    rub('Se leen los salmos 90 y 50:'),
    psalm(90),
    psalm(50),
  ]),
  s('tropario', 'Tropario', [
    rub('En el tono octavo:'),
    t('Tú, que con la profundidad de tu sabiduría todo lo dispones por amor a los hombres y das a todos lo que les conviene, único Creador: da descanso, Señor, al alma de tu siervo, porque en Ti puso su esperanza, Creador, Hacedor y Dios nuestro.'),
    rub(`${GLORIA} ${AHORA}`),
    t('En ti tenemos muralla y puerto, e intercesora agradable a Dios, al que diste a luz, Theotokos que no conociste esposo, salvación de los fieles.'),
    rub('El canon está en el tono octavo. Antes de cada estrofa se dice:'),
    DESCANSO,
  ]),
  odaDifunto({
    n: 1,
    irmos: 'Habiendo atravesado el agua como tierra seca y escapado de la maldad de Egipto, el israelita clamaba: Cantemos a nuestro Libertador y Dios.',
    troparios: [
      'Abre mi boca, oh Salvador, y dame palabra para orar, oh Misericordioso, por tu siervo difunto N., para que des descanso a su alma, oh Soberano.',
      'Tú, que moriste en la carne, oh Salvador, y fuiste puesto en el sepulcro con los muertos, da descanso al alma de tu siervo en un lugar de verdor, porque eres misericordioso.',
    ],
    gloria: 'Escucha mi voz suplicante, Dios en tres personas, y pon el alma del difunto en el seno de Abraham, oh Libertador.',
    ahora:
      'Purísima Theotokos, que concebiste sin conocer varón y diste a luz: suplica a tu Hijo que dé descanso a tu siervo difunto N.',
  }),
  odaDifunto({
    n: 3,
    irmos: 'Señor, que levantaste la bóveda del cielo y edificaste la Iglesia: afiánzame Tú en tu amor, cumbre de todo deseo, apoyo de los fieles, único amigo de los hombres.',
    troparios: [
      'En un lugar de verdor, en un lugar de descanso, donde se alegran los coros de los santos, da descanso, oh Cristo, único misericordioso, al alma de tu siervo difunto.',
      'Pon, Soberano, donde están los coros de los santos al que te sirvió con todo su corazón y cargó tu yugo sobre sus hombros, porque sólo Tú eres Señor de la vida y de la muerte.',
    ],
    gloria:
      'Padre celestial todopoderoso, Hijo unigénito y Espíritu Santo que procedes: pasa por alto los pecados del difunto y hazlo habitar en la Iglesia de los primogénitos, para que te glorifique con todos los que te agradaron.',
    ahora:
      'Santa Madre del Dios santísimo, Señora de todo, María Theotokos: suplícale con todos los santos que dé descanso al alma de tu siervo en las moradas del cielo.',
  }),
  s('sedalen', 'Sedalen', [
    { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
    rub('En el tono quinto:'),
    t('Da descanso, Salvador nuestro, con los justos a tu siervo, y hazlo habitar en tus atrios, como está escrito, pasando por alto, porque eres bueno, sus pecados voluntarios e involuntarios y todos los que cometió a sabiendas o sin saberlo, oh amigo de los hombres.'),
    rub(`${GLORIA} ${AHORA}`),
    t('Tú, que amaneciste al mundo de una Virgen, Cristo Dios, y por ella nos mostraste hijos de la luz: ten piedad de nosotros.'),
  ]),
  odaDifunto({
    n: 4,
    irmos: 'He oído, Señor, el misterio de tu providencia; he comprendido tus obras y he glorificado tu divinidad.',
    troparios: [
      'Tú, que bajaste a lo más hondo, oh Cristo, y resucitaste contigo a todos los muertos: da descanso, Salvador, al que ha partido de entre nosotros, porque eres generoso.',
      'Nadie hay sin pecado, sino sólo Tú, Soberano: perdona, pues, los pecados al difunto y hazlo habitar en el paraíso.',
    ],
    gloria:
      'Escucha, Trinidad santa, las voces suplicantes que te ofrecemos en la iglesia por el difunto, e ilumina con tu luz, principio de toda divinidad, el alma oscurecida por los apegos vanos.',
    ahora:
      'Diste a luz, Purísima, sin semilla de varón, a Dios perfecto y hombre perfecto, que quita nuestros pecados, oh Virgen. Suplícale, Señora, que conceda el descanso a tu siervo difunto.',
  }),
  odaDifunto({
    n: 5,
    irmos: 'Ilumínanos con tus mandamientos, Señor, y con tu brazo excelso danos tu paz, oh amigo de los hombres.',
    troparios: [
      'Tú, que tienes poder sobre la vida y la muerte, da descanso, Cristo Dios, al que ha partido de entre nosotros: porque Tú, Salvador, eres el descanso y la vida de todos.',
      'Poniendo en Ti, Salvador, su esperanza, el difunto se ha ido de entre nosotros; Tú, Señor, compadécete de él, porque eres Dios lleno de misericordia.',
    ],
    gloria:
      'Ilumínanos, Soberano tres veces santo a quien cantamos, a los que te suplicamos recibir la paz celestial; y pon en las moradas de paz el alma que partió de lo temporal con la esperanza de la vida sin fin.',
    ahora:
      'Suplica a tu Hijo, Purísima, Virgen Señora, que libre al difunto del lugar de la izquierda, porque eres Madre de nuestro Salvador y Dios.',
  }),
  odaDifunto({
    n: 6,
    irmos:
      'Derramaré mi súplica ante el Señor y a Él le contaré mis aflicciones, porque mi alma está llena de males y mi vida se ha acercado al infierno; y como Jonás le ruego: Sácame, oh Dios, de la corrupción.',
    troparios: [
      'Derribaste el infierno, Soberano, y resucitaste a los muertos de todos los siglos: haz ahora habitar, oh Dios, en el seno de Abraham al que ha partido de entre nosotros, perdonándole todos sus pecados, porque eres misericordioso.',
      '«Quebranté, oh Dios, el mandamiento que me diste y me hice mortal; pero Tú, oh Dios, que bajaste al sepulcro y resucitaste las almas de todos los siglos, no me levantes, Soberano, para el tormento, sino para el descanso»: así te clama el difunto por nuestra boca, oh Misericordiosísimo.',
    ],
    gloria:
      'Te suplicamos, Padre sin principio, Hijo y Espíritu Santo: no arrojes al fondo del infierno, oh Dios, Salvador mío, el alma afligida por la malicia de este mundo, que tanto mal hace al alma, y que ha pasado a Ti, su Creador.',
    ahora:
      'Desde el cielo bajó a ti, Purísima, Cristo nuestro Dios como la lluvia sobre el vellón, dando de beber al mundo entero, secando todos los torrentes de la impiedad e inundando toda la tierra con su conocimiento, siempre Virgen: suplícale que dé descanso a tu siervo difunto.',
  }),
  s('kontakion', 'Kontakion e ikos', [
    { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
    rub(`${GLORIA} ${AHORA} Kontakion, en el tono octavo:`),
    t('Con los santos da descanso, oh Cristo, al alma de tu siervo, donde no hay dolor, ni tristeza, ni gemido, sino vida sin fin.'),
    rub('Ikos'),
    t('Tú solo eres inmortal, que creaste y formaste al hombre; y nosotros, los de la tierra, fuimos formados de la tierra y a la misma tierra volveremos, como mandaste Tú, que me formaste y me dijiste: «Tierra eres y a la tierra volverás». Allí iremos todos los hombres, haciendo de nuestro llanto ante la tumba un canto: Aleluya, aleluya, aleluya.'),
  ]),
  odaDifunto({
    n: 7,
    irmos: 'Los jóvenes venidos de Judea pisotearon en otro tiempo en Babilonia, por la fe en la Trinidad, la llama del horno, cantando: Dios de nuestros padres, bendito eres.',
    troparios: [
      'Soberano, Cristo Dios: cuando vengas a juzgar al mundo, perdona el alma de tu siervo, que has recibido de entre nosotros y que clama: Dios de nuestros padres, bendito eres.',
      'En las delicias del paraíso, donde se alegran las almas de los justos que te sirvieron, cuenta con ellos, oh Cristo, el alma de tu siervo, que cantaba: Dios de nuestros padres, bendito eres.',
    ],
    gloria:
      'Tú, que salvaste del fuego a los tres jóvenes de Judea, cantado en tres personas: libra del fuego eterno al difunto, que te cantaba con fe: Dios de nuestros padres, bendito eres.',
    ahora:
      'Tú, que diste a luz a Cristo, Soberano y Dios de todos: libra, Virgen, del poder tenebroso del príncipe del aire el alma del que partió en la fe y cantaba: Dios de nuestros padres, bendito eres.',
  }),
  odaDifunto({
    n: 8,
    irmos:
      'El tirano caldeo, enfurecido, encendió siete veces el horno contra los que adoraban a Dios; pero al verlos salvados por un poder superior, clamaba al Creador y Libertador: Jóvenes, bendecid; sacerdotes, cantad; pueblo, ensalzadle por todos los siglos.',
    troparios: [
      '«He acabado la carrera y he acudido a Ti, Señor», clama ahora el difunto: «perdona mis pecados, Cristo Dios, y no me condenes cuando vengas a juzgar a todos, porque te clamaba con fe: Obras todas del Señor, cantad al Señor y ensalzadle por los siglos».',
      'Al que llevó, Soberano, tu yugo sobre sus hombros y tu carga ligera, aunque no siempre, haz habitar en el lugar de tus santos, a él, que te cantaba, Cristo Salvador: Jóvenes, bendecid; sacerdotes, cantad; pueblo, ensalzadle por los siglos.',
    ],
    gloria:
      'Trinidad santa sin principio, Dios Padre, Hijo y Espíritu Santo: cuenta en el coro de los santos el alma de tu siervo difunto y líbralo del fuego eterno, para que te alabe y te cante por los siglos: Jóvenes, bendecid; sacerdotes, cantad; pueblo, ensalzadle por los siglos.',
    ahora:
      'A ti, Virgen, te anunciaron los coros de los profetas, que te vieron con ojos clarividentes: uno te llamó vara; otro, puerta oriental; otro, monte del que se desprendió una piedra sin intervención de mano humana. Nosotros te confesamos verdaderamente Theotokos, que diste a luz al Dios de todo: suplícale que dé descanso al difunto por todos los siglos.',
  }),
  odaDifunto({
    n: 9,
    irmos:
      'Se espantó de esto el cielo y se asombraron los confines de la tierra: de que Dios se apareciera a los hombres en la carne y de que tu seno se hiciera más amplio que los cielos. Por eso te engrandecen como Theotokos las jerarquías de los ángeles y de los hombres.',
    troparios: [
      'Jesús, Dios mío, Salvador: Tú cargaste con la transgresión de Adán y gustaste la muerte para librar de ella a los hombres, oh Misericordioso. Por eso te suplicamos, oh compasivo: da descanso al difunto, porque eres bueno, en los atrios de tus santos, porque sólo Tú eres todo bondad y misericordia.',
      'No hay entre los hombres nadie que no haya pecado, oh Misericordioso, sino sólo Tú, Jesucristo, que quitas los pecados del mundo entero. Por eso, purificando a tu siervo de sus faltas, ponlo en los atrios de tus santos: porque Tú eres la vida y el descanso, la luz y la alegría de todos los que te han agradado.',
    ],
    gloria:
      'Se asombró toda la naturaleza humana de cómo Tú, Hijo unigénito del Padre sin principio, tomaste carne de una Virgen por obra del Espíritu Santo y padeciste como hombre para dar la vida a los muertos. Por eso te suplicamos con insistencia que, porque eres bueno, hagas habitar en la tierra de los vivos al que acaba de partir de entre nosotros.',
    ahora:
      'Te llamamos, Purísima, Esposa del Padre invisible y Madre del Hijo, que se encarnó de ti por el Espíritu Santo, y te presentamos como intercesora por tu siervo difunto: porque nosotros, los de la tierra, te tenemos por ayuda, y te engrandecemos cantándote con amor.',
  }),
  s('final', 'Al terminar', [
    t('Digno es en verdad bendecirte, oh Theotokos, siempre bienaventurada y del todo inmaculada, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin corrupción diste a luz a Dios Verbo, verdadera Theotokos, te engrandecemos.'),
    rub('Trisagio, «Santísima Trinidad» y Padre Nuestro. Después, estos troparios:'),
    t('Con los espíritus de los justos que han llegado al fin, da descanso, Salvador, al alma de tu siervo, guardándola en la vida bienaventurada que está junto a Ti, oh amigo de los hombres.'),
    t('En tu lugar de descanso, Señor, donde descansan todos tus santos, da descanso también al alma de tu siervo, porque sólo Tú eres amigo de los hombres.'),
    rub(GLORIA),
    t('Tú eres el Dios que bajó al infierno y rompió las cadenas de los encadenados: da Tú mismo descanso también al alma de tu siervo.'),
    rub(AHORA),
    t('Única Virgen pura e inmaculada, que sin semilla diste a luz a Dios: suplica que su alma se salve.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 40 },
    rub('Oración'),
    t('Acuérdate, Señor Dios nuestro, en la fe y la esperanza de la vida eterna, de tu siervo difunto N.; y como eres bueno y amigo de los hombres, que perdonas los pecados y borras las injusticias, absuelve, perdona y remite todos sus pecados voluntarios e involuntarios, y resucítalo en tu santa segunda venida para que participe de tus bienes eternos, por los cuales creyó en Ti, el único Dios verdadero y amigo de los hombres. Porque Tú eres la resurrección, la vida y el descanso de tu siervo N., oh Cristo Dios nuestro, y a Ti te damos gloria, con tu Padre sin principio y con tu santísimo Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Señor Jesucristo, Hijo de Dios: por las oraciones de tu purísima Madre, de nuestros venerables padres portadores de Dios y de todos los santos, ten piedad y da descanso al alma de tu siervo N. por los siglos sin fin, porque eres bueno y amigo de los hombres. Amén.'),
    { kind: 'text', content: 'A tu siervo N., que se ha dormido, eterna memoria.', times: 3 },
    t('Da descanso, Señor, al alma de tu siervo difunto N., y perdónale todo lo que en esta vida pecó como hombre, porque Tú eres Dios amigo de los hombres, y ten piedad de él.'),
  ]),
];
