/**
 * El Gran Canon de san Andrés de Creta, entero.
 *
 * Hasta ahora ATHOS tenía los irmoi, el kontakion y la primera estrofa, y
 * decía que el resto faltaba. Aquí está todo, tal como se canta el jueves de
 * la quinta semana de Cuaresma, cuando las cuatro partes que se reparten en
 * las cuatro primeras noches se cantan juntas: los irmoi, los troparios, los
 * de santa María Egipcíaca y los de san Andrés, las doxologías, los
 * theotokía, el kontakion con su ikos y las Bienaventuranzas.
 *
 * El texto se ha traducido del Triodion griego, en la edición digital de la
 * Archidiócesis Ortodoxa Griega de América (glt.goarch.org), estrofa por
 * estrofa y sin saltar ninguna. Donde el griego repite una estrofa, aquí se
 * repite; donde la oda segunda y la tercera traen dos irmoi, porque reúnen dos
 * de las noches de la primera semana, aquí van los dos.
 *
 * La traducción es de ATHOS. Sigue el griego de cerca —el canon está lleno de
 * juegos con la Escritura que una versión libre borraría— y no procede de
 * ningún libro litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const ESTRIBILLO = ref('Ten piedad de mí, oh Dios, ten piedad de mí.');
const A_MARIA = ref('Santa de Dios, intercede por nosotros.');
const A_ANDRES = ref('Santo de Dios, intercede por nosotros.');
const GLORIA = 'Gloria al Padre, y al Hijo, y al Espíritu Santo.';
const AHORA = 'Ahora y siempre, y por los siglos de los siglos. Amén.';

interface Oda {
  id: string;
  title: string;
  irmos: string;
  troparios: string[];
  maria?: string[];
  andres?: string[];
  /** Lo que se dice antes de la doxología, si no es el «Gloria». */
  antesTriadikon?: string;
  triadikon?: string;
  theotokion: string;
  /** Lo que se canta al cerrar la oda. */
  cierre?: TextBlock[];
}

function oda(o: Oda): OfficeSection {
  return s(o.id, o.title, [
    rub('Irmos'),
    t(o.irmos),
    ESTRIBILLO,
    ...o.troparios.map(t),
    ...(o.maria ? [A_MARIA, ...o.maria.map(t)] : []),
    ...(o.andres ? [A_ANDRES, ...o.andres.map(t)] : []),
    ...(o.triadikon ? [rub(o.antesTriadikon ?? GLORIA), t(o.triadikon)] : []),
    rub(o.triadikon ? AHORA : 'Theotokion'),
    t(o.theotokion),
    ...(o.cierre ?? []),
  ]);
}

/** El final que comparten cuatro estrofas seguidas de la oda cuarta; el griego lo escribe entero en cada una. */
const NO_SEA_PRESA =
  'pero recíbeme en el arrepentimiento y llámame de nuevo al conocimiento, para que no sea posesión ni presa del extraño. Salvador, compadécete Tú de mí.';

export const GRAN_CANON: OfficeSection[] = [
  s('sobre', 'El canon del arrepentimiento', [
    rub('Obra de san Andrés de Creta († 740). Es el canon más largo de la Iglesia: casi trescientas estrofas que recorren la Escritura entera, del Génesis al Evangelio, poniendo al alma delante de cada figura bíblica. Se canta en el tono sexto.'),
    rub('Las cuatro primeras noches de la Gran Cuaresma se canta partido en cuatro, en las Completas grandes. Entero se canta en los Maitines del jueves de la quinta semana, que por eso se celebran la tarde del miércoles. Aquí está entero, como se canta ese día.'),
    rub('Después de cada estrofa se repite el estribillo, y en muchos lugares se hace con él una postración:'),
    ESTRIBILLO,
    rub('Las estrofas dedicadas a santa María Egipcíaca llevan su propio estribillo, y las del autor, el suyo. Es la forma de los libros griegos; los eslavos dicen «Venerable madre María, ruega a Dios por nosotros» y «Venerable padre Andrés, ruega a Dios por nosotros».'),
    A_MARIA,
    A_ANDRES,
    rub('Al final de cada oda se vuelve a cantar el irmos.'),
  ]),

  oda({
    id: 'oda-1',
    title: 'Oda 1',
    irmos:
      'Auxiliador y protector se ha hecho para mi salvación. Éste es mi Dios, y le glorificaré; el Dios de mi padre, y le exaltaré, porque gloriosamente se ha glorificado.',
    troparios: [
      '¿Por dónde empezaré a llorar las acciones de mi vida miserable? ¿Qué principio pondré, oh Cristo, a este lamento? Pero Tú, que eres compasivo, dame el perdón de mis culpas.',
      'Ven, alma desdichada, con tu carne: confiésate al Creador de todos, apártate desde ahora de tu insensatez de antes y ofrece a Dios lágrimas de arrepentimiento.',
      'He rivalizado en la transgresión con Adán, el primero que fue formado, y me he visto despojado de Dios, del Reino eterno y de sus delicias, por mis pecados.',
      '¡Ay de ti, alma desdichada! ¿Por qué te has hecho semejante a Eva, la primera? Miraste con malicia y quedaste amargamente herida; tocaste el árbol y probaste temerariamente el alimento insensato.',
      'En lugar de la Eva visible se ha alzado en mí una Eva del pensamiento: la idea apasionada de la carne, que me pone delante lo placentero y siempre me da a gustar el trago amargo.',
      'Con justicia fue arrojado Adán del Edén, por no guardar, oh Salvador, un solo mandamiento tuyo. ¿Y qué padeceré yo, que desprecio siempre tus palabras de vida?',
      'He caído por mi voluntad en el crimen de Caín y me he hecho asesino de la conciencia de mi alma: he dado vida a la carne y he guerreado contra el alma con mis malas obras.',
      'No me he parecido, oh Jesús, a la justicia de Abel: nunca te he ofrecido dones agradables, ni obras según Dios, ni sacrificio puro, ni una vida sin reproche.',
      'Como Caín, también nosotros, alma desdichada, hemos ofrecido al Creador de todos obras sucias, un sacrificio reprobable y una vida inútil; por eso hemos sido condenados.',
      'Como el alfarero, diste vida al barro y me pusiste carne y huesos, aliento y vida. Pero Tú, Creador mío, Redentor mío y Juez, recíbeme arrepentido.',
      'Te declaro, oh Salvador, los pecados que he cometido y las heridas de mi alma y de mi cuerpo, que los pensamientos asesinos, como bandidos, me han dejado dentro.',
      'Aunque he pecado, oh Salvador, sé que amas a los hombres: castigas con compasión y te conmueves con ardor; ves al que llora y corres a su encuentro como el Padre que llama de nuevo al hijo pródigo.',
      'Estoy tendido ante tus puertas, oh Salvador: aunque sea en mi vejez, no me arrojes con las manos vacías al infierno, sino dame antes del fin, como amigo de los hombres, el perdón de mis culpas.',
      'He derrochado mi hacienda en una vida perdida, oh Salvador, y estoy vacío de virtudes y de piedad; hambriento, te clamo: Padre de las misericordias, adelántate y compadécete de mí.',
      'Yo soy el que cayó en manos de los bandidos, que son mis pensamientos: me han herido por entero y estoy lleno de llagas. Pero acércate Tú a mí, oh Cristo Salvador, y cúrame.',
      'El sacerdote me vio y pasó de largo; el levita me vio desnudo en mi desgracia y no hizo caso. Pero Tú, Jesús, que amaneciste de María, acércate y compadécete de mí.',
      'Cordero de Dios, que quitas los pecados de todos: quítame el pesado yugo del pecado y, compasivo, dame lágrimas de compunción.',
      'Es tiempo de arrepentimiento: vengo a Ti, que me formaste. Quítame el pesado yugo del pecado y, compasivo, dame lágrimas de compunción.',
      'No me aborrezcas, oh Salvador, no me arrojes de tu presencia: quítame el pesado yugo del pecado y, compasivo, dame el perdón de mis culpas.',
      'Mis faltas voluntarias e involuntarias, oh Salvador, las manifiestas y las ocultas, las conocidas y las desconocidas: perdónalas todas como Dios, ten misericordia de mí y sálvame.',
      'Desde mi juventud, oh Salvador, he desoído tus mandamientos; he pasado la vida entera entre pasiones, descuidado y perezoso. Por eso te clamo, oh Salvador: aunque sea al final, sálvame.',
      'He derrochado en el pecado la hacienda de mi alma y estoy vacío de virtudes y de piedad; hambriento, te clamo: Tú, que repartes misericordia, adelántate y compadécete de mí.',
      'Me postro ante Ti, Jesús: he pecado contra Ti, ten misericordia de mí. Quítame el pesado yugo del pecado y, como Dios compasivo, recíbeme arrepentido.',
      'No entres en juicio conmigo sacando a la luz lo que he hecho, pidiendo cuenta de mis palabras y examinando mis impulsos; sino, en tu misericordia, pasa por alto mis maldades y sálvame, oh Todopoderoso.',
    ],
    maria: [
      'Dame, María, por la divina providencia de lo alto, tu gracia luminosa, para que escape de la oscuridad de las pasiones y cante con ardor los gozosos relatos de tu vida.',
      'Sometiéndote a las leyes divinas de Cristo, te acercaste a Él dejando los impulsos desenfrenados de los placeres, y con toda piedad alcanzaste todas las virtudes como si fueran una sola.',
    ],
    andres: [
      'Por tus súplicas, Andrés, líbranos de las pasiones deshonrosas, y haz partícipes ahora del Reino de Cristo, te lo pedimos, a los que con fe y amor te cantamos, oh glorioso.',
    ],
    triadikon:
      'Trinidad supraesencial, adorada en la Unidad: quítame el pesado yugo del pecado y, compasiva, dame lágrimas de compunción.',
    theotokion:
      'Theotokos, esperanza y protección de los que te cantan: quítame el pesado yugo del pecado y, como Señora pura, recíbeme arrepentido.',
  }),

  oda({
    id: 'oda-2',
    title: 'Oda 2',
    irmos: 'Atiende, cielo, y hablaré; y cantaré a Cristo, que vino de la Virgen a habitar en la carne.',
    troparios: [
      'Atiende, cielo, y hablaré; tierra, escucha la voz que se arrepiente ante Dios y le canta.',
      'Mírame, oh Dios, Salvador mío, con tus ojos compasivos, y recibe mi ardiente confesión.',
      'He pecado más que todos los hombres; sólo yo he pecado contra Ti. Pero compadécete, como Dios, oh Salvador, de tu criatura.',
      'Me envuelve la tempestad de los males, Señor compasivo; pero extiende también hacia mí tu mano, como a Pedro.',
      'Te presento yo también, oh Misericordioso, las lágrimas de la pecadora: ten piedad de mí, oh Salvador, por tu compasión.',
      'He manchado la túnica de mi carne y he ensuciado, oh Salvador, lo que en mí era a tu imagen y semejanza.',
      'He oscurecido la hermosura del alma con los placeres de las pasiones, y he convertido mi mente entera en polvo.',
      'He desgarrado ahora mi primera vestidura, la que el Creador me tejió en el principio, y por eso yazgo desnudo.',
      'Me he puesto una túnica desgarrada, la que me tejió la serpiente con su consejo, y me avergüenzo.',
      'Miré la hermosura del árbol y mi mente fue engañada; y ahora yazgo desnudo y me avergüenzo.',
      'Sobre mi espalda labraron todos los cabecillas del mal, y alargaron contra mí su iniquidad.',
      'He perdido la belleza de la primera creación y mi decoro, y ahora yazgo desnudo y me avergüenzo.',
      'También a mí me ha cosido el pecado túnicas de piel, después de despojarme de la vestidura que Dios había tejido.',
      'Llevo encima el vestido de la vergüenza, como las hojas de higuera, para reproche de las pasiones que yo mismo escogí.',
      'Me he vestido una túnica manchada y vergonzosamente ensangrentada por el flujo de una vida apasionada y amiga del placer.',
      'He manchado la túnica de mi carne y he ensuciado, oh Salvador, lo que en mí era a tu imagen y semejanza.',
      'He caído bajo el dolor de las pasiones y la corrupción de la materia, y por eso el enemigo me oprime ahora.',
      'He preferido, oh Salvador, una vida apegada a la materia y a las posesiones antes que la pobreza, y ahora llevo encima el pesado yugo.',
      'He adornado la estatua de la carne con el vestido abigarrado de los pensamientos vergonzosos, y soy condenado.',
      'Sólo me he preocupado con esmero del adorno de fuera, y he descuidado la morada de dentro, hecha a imagen de Dios.',
      'Dando forma con los impulsos del placer a la deformidad de mis pasiones, he arruinado la hermosura de la mente.',
      'He manchado con las pasiones, oh Salvador, la belleza de la imagen primera; pero búscala y hállala, como en otro tiempo la dracma.',
      'He pecado, te clamo como la pecadora; sólo yo he pecado contra Ti. Recibe, oh Salvador, también mis lágrimas como ungüento.',
      'He resbalado en la lujuria como David y me he revolcado en el fango; pero lávame también a mí, oh Salvador, con mis lágrimas.',
      'Ten piedad, te clamo como el publicano; oh Salvador, ten piedad de mí: porque ninguno de los hijos de Adán ha pecado contra Ti como yo.',
      'No tengo lágrimas, ni arrepentimiento, ni compunción: dámelos Tú, oh Salvador, que eres Dios.',
      'No me cierres entonces tu puerta, Señor, Señor, sino ábremela, que me arrepiento ante Ti.',
      'Amigo de los hombres, que quieres que todos se salven: llámame Tú de nuevo y recíbeme arrepentido, porque eres bueno.',
      'Escucha los gemidos de mi alma y acoge las gotas que caen de mis ojos: Señor, sálvame.',
    ],
    theotokion: 'Purísima Theotokos, Virgen, la única digna de toda alabanza: suplica sin cesar por nuestra salvación.',
  }),

  oda({
    id: 'oda-2b',
    title: 'Oda 2, segunda parte',
    irmos:
      'Mirad, mirad que yo soy Dios, que hice llover el maná e hice brotar en otro tiempo agua de la roca para mi pueblo en el desierto, con sólo mi diestra y con mi fuerza.',
    troparios: [
      '«Mirad, mirad que yo soy Dios»: escucha, alma mía, al Señor que clama; arráncate de tu pecado de antes y témele como a juez, como a quien juzga y como a Dios.',
      '¿A quién te has parecido, alma tan pecadora? ¡Ay!, a Caín, el primero, y a aquel Lamec: has apedreado el cuerpo con tus fechorías y has matado la mente con impulsos insensatos.',
      'Has recorrido, alma, a todos los que vivieron antes de la Ley, y no te has parecido a Set, ni has imitado a Enós, ni a Enoc, que fue trasladado, ni a Noé: te has quedado pobre de la vida de los justos.',
      'Tú sola, alma mía, has abierto las cataratas de la ira de tu Dios, y has inundado, como la tierra, toda la carne, las obras y la vida; y te has quedado fuera del arca de la salvación.',
      '«He matado a un hombre por una herida que me hizo, y a un joven por un golpe», clamaba Lamec lamentándose. ¿Y tú no tiemblas, alma mía, tú que te has ensuciado y has manchado la carne y la mente?',
      '¡Ay, cómo he rivalizado con Lamec, el homicida de antaño! He matado el alma como a aquel hombre, la mente como al joven, y el cuerpo como a un hermano, igual que Caín el asesino, con los impulsos del placer.',
      'Ideaste, alma, construir una torre y levantar una fortaleza para tus deseos; pero el Creador confundió tus planes y echó por tierra tus artificios.',
      'Estoy herido, estoy golpeado: he aquí las flechas del enemigo, que han acribillado mi alma y mi cuerpo. He aquí las heridas, las llagas y las mutilaciones, que pregonan los golpes de las pasiones que yo mismo escogí.',
      'El Señor hizo llover en otro tiempo fuego de parte del Señor y abrasó la iniquidad desenfrenada de Sodoma; pero tú, alma, has encendido el fuego de la gehena, en el que vas a arder amargamente.',
      'Sabed y ved que yo soy Dios, que escudriño los corazones y castigo los pensamientos, que pongo al descubierto las obras y abraso los pecados, y hago justicia al huérfano, al humilde y al pobre.',
    ],
    maria: [
      'Tendiste tus manos, María, hacia el Dios misericordioso cuando te hundías en el abismo de los males; y Él, como a Pedro, te tendió con amor su mano para ayudarte, porque buscaba de veras tu conversión.',
      'Con todo tu ardor y tu amor corriste hacia Cristo, dando la espalda al camino de pecado de antes; te alimentabas en desiertos sin caminos y cumplías con pureza sus mandamientos divinos.',
    ],
    andres: [
      'Veamos, alma, veamos el amor a los hombres de nuestro Dios y Soberano; y por eso, antes del fin, postrémonos ante Él con lágrimas, clamando: Por las súplicas de Andrés, oh Salvador, ten piedad de nosotros.',
    ],
    triadikon:
      'Trinidad sin principio e increada, Unidad indivisible: recíbeme arrepentido, sálvame a mí, que he pecado. Soy obra tuya: no me desprecies, sino perdóname y líbrame del fuego de la condenación.',
    theotokion:
      'Señora purísima, Madre de Dios, esperanza de los que acuden a ti y puerto de los que están en la tempestad: haz con tus súplicas que tu Hijo, misericordioso y Creador, se apiade también de mí.',
  }),

  oda({
    id: 'oda-3',
    title: 'Oda 3',
    irmos: 'Sobre la piedra inconmovible de tus mandamientos afianza, oh Cristo, a tu Iglesia.',
    troparios: [
      'El Señor, haciendo llover en otro tiempo fuego de parte del Señor, abrasó la tierra de Sodoma.',
      'Ponte a salvo en el monte, alma, como aquel Lot, y refúgiate a tiempo en Segor.',
      'Huye del incendio, alma; huye del fuego de Sodoma; huye de la destrucción de las llamas divinas.',
      'Me confieso ante Ti, oh Salvador: he pecado contra Ti sin medida; pero, compasivo, absuélveme y perdóname.',
      'Sólo yo he pecado contra Ti, he pecado más que todos: oh Cristo Salvador, no me desprecies.',
      'Tú eres el buen Pastor: búscame a mí, el cordero, y no me abandones extraviado.',
      'Tú eres el dulce Jesús, Tú eres mi Creador: en Ti, oh Salvador, seré justificado.',
    ],
    antesTriadikon: 'Santísima Trinidad, Dios nuestro, ten piedad de nosotros.',
    triadikon: 'Oh Trinidad, Unidad, Dios: sálvanos del error, de las tentaciones y de las adversidades.',
    theotokion: 'Alégrate, seno que recibiste a Dios; alégrate, trono del Señor; alégrate, Madre de nuestra vida.',
  }),

  oda({
    id: 'oda-3b',
    title: 'Oda 3, segunda parte',
    irmos:
      'Afianza, Señor, sobre la piedra de tus mandamientos mi corazón vacilante, porque sólo Tú eres santo y Señor.',
    troparios: [
      'Te tengo a Ti por fuente de vida, a Ti que destruyes la muerte, y te clamo desde mi corazón antes del fin: He pecado, ten piedad de mí y sálvame.',
      'He imitado, oh Salvador, a los libertinos del tiempo de Noé, y he heredado su condena: hundirme en el diluvio.',
      'He pecado, Señor, he pecado contra Ti; ten piedad de mí. Porque no hay entre los hombres pecador a quien yo no haya superado en mis faltas.',
      'Has imitado, alma, a aquel Cam que ultrajó a su padre: no has cubierto la vergüenza de tu prójimo caminando de espaldas.',
      'No has heredado, alma desdichada, la bendición de Sem, ni has tenido, como Jafet, una heredad espaciosa en la tierra del perdón.',
      'Sal, alma mía, de la tierra de Jarán, que es el pecado, y ven a la tierra que mana incorrupción siempre viva, la que heredó Abraham.',
      'Has oído, alma mía, cómo Abraham dejó en otro tiempo la tierra de sus padres y se hizo peregrino: imita su decisión.',
      'En la encina de Mambré el patriarca hospedó a los ángeles, y en su vejez obtuvo el fruto de la promesa.',
      'Ya sabes, alma mía desdichada, que Isaac fue ofrecido místicamente al Señor como holocausto nuevo: imita su decisión.',
      'Has oído que Ismael fue expulsado por ser hijo de la esclava: vela, alma mía, no vaya a sucederte algo parecido por tu lujuria.',
      'Te has hecho semejante, alma, a Agar la egipcia: esclavizada en tu voluntad, has dado a luz un nuevo Ismael, la arrogancia.',
      'Conoces, alma mía, la escala de Jacob, que se mostró tendida de la tierra al cielo: ¿por qué no te has dado un apoyo firme, la piedad?',
      'Imita al sacerdote de Dios, el rey solitario, imagen de Cristo, en su modo de vivir en el mundo entre los hombres.',
      'No te vuelvas atrás, alma, para no quedar hecha estatua de sal; que te infunda temor el ejemplo de Sodoma: ponte a salvo arriba, en Segor.',
      'Huye como Lot, alma mía, del incendio del pecado; huye de Sodoma y Gomorra; huye de la llama de todo deseo insensato.',
      'Ten piedad, Señor, ten piedad de mí, te clamo, cuando vengas con tus ángeles a dar a cada uno según sus obras.',
      'No rechaces, Soberano, la súplica de los que te cantan, sino compadécete, amigo de los hombres, y concede el perdón a los que te lo piden con fe.',
    ],
    maria: [
      'Me tienen atrapado, madre, el oleaje y la tormenta de mis faltas; pero sálvame tú ahora y llévame al puerto del divino arrepentimiento.',
      'Presenta ahora, santa, tu súplica a la compasiva Theotokos, y ábreme con tu intercesión las puertas divinas.',
    ],
    andres: [
      'Concédeme también a mí, por tus súplicas, el perdón de mis deudas, oh Andrés, pastor de Creta; porque tú eres el mejor maestro en el misterio del arrepentimiento.',
    ],
    triadikon:
      'Unidad simple e increada, naturaleza sin principio cantada en Trinidad de personas: sálvanos a los que adoramos con fe tu poder.',
    theotokion:
      'Al Hijo, engendrado del Padre fuera del tiempo, lo diste a luz en el tiempo, Madre de Dios, sin conocer varón. ¡Maravilla extraña!: permaneciste Virgen mientras lo amamantabas.',
    cierre: [rub('Y se repite el irmos.')],
  }),

  oda({
    id: 'oda-4',
    title: 'Oda 4',
    irmos:
      'Oyó el profeta tu venida, Señor, y temió: que ibas a nacer de una Virgen y a manifestarte a los hombres, y decía: Oí tu fama y temí. Gloria a tu poder, Señor.',
    troparios: [
      'No desprecies tus obras, no apartes la vista de tu criatura, oh justo Juez. Aunque yo solo he pecado como hombre, más que todo hombre, oh amigo de los hombres, Tú tienes, como Señor de todo, el poder de perdonar los pecados.',
      'Se acerca el fin, alma, se acerca, y no te preocupas ni te preparas. El tiempo se acorta: levántate; el Juez está cerca, a las puertas. Como un sueño, como una flor, corre el tiempo de la vida: ¿por qué nos agitamos en vano?',
      'Despierta, alma mía; repasa las obras que has hecho, ponlas ante tus ojos y deja caer las gotas de tus lágrimas; di con franqueza a Cristo tus obras y tus pensamientos, y serás justificada.',
      'No ha habido en la vida pecado, ni acción, ni maldad, oh Salvador, que yo no haya cometido, con la mente y la palabra, con la voluntad, con la intención, con el juicio y con las obras, pecando como ningún otro jamás.',
      'Por eso he sido condenado, por eso he sido sentenciado yo, desdichado, por mi propia conciencia, que es lo más implacable del mundo. Juez, Redentor mío, que todo lo conoces: perdóname, líbrame y sálvame, a este miserable.',
      'La escala que vio en otro tiempo el más grande de los patriarcas es figura, alma mía, del avance por las obras y de la subida por el conocimiento. Si quieres, pues, vivir en la acción, en el conocimiento y en la contemplación, renuévate.',
      'El patriarca soportó en su pobreza el calor del día y aguantó la helada de la noche, cargando cada día con lo robado, pastoreando, luchando y sirviendo, para poder tomar a sus dos mujeres.',
      'Entiende, alma, que las dos mujeres son la acción y el conocimiento en la contemplación: Lía es la acción, porque tuvo muchos hijos; Raquel, el conocimiento, porque costó mucho trabajo. Porque sin trabajos, alma, no se alcanzan ni la acción ni la contemplación.',
      'Vela, alma mía; lucha con valor como el más grande de los patriarcas, para que adquieras la acción con el conocimiento, para que llegues a ser una mente que ve a Dios, alcances en la contemplación la tiniebla inaccesible y te hagas un gran mercader.',
      'Al engendrar a los doce patriarcas, el más grande de los patriarcas te levantó místicamente, alma mía, una escala para subir por las obras: con toda sabiduría puso a los hijos como peldaños y sus pasos como tramos de subida.',
      'Imitando, alma, a Esaú el aborrecido, has vendido al suplantador la primogenitura de tu primera belleza, has perdido la bendición del padre y, desdichada, has sido suplantada dos veces, en la acción y en el conocimiento. Arrepiéntete, pues, ahora.',
      'Esaú fue llamado Edom por su extrema pasión por las mujeres: abrasado siempre por la incontinencia y manchado por los placeres, recibió el nombre de Edom, que quiere decir ardor del alma amante del pecado.',
      'Has oído, alma mía, de Job, justificado sobre el estercolero, y no has imitado su valor ni has tenido la firmeza de su propósito en todo lo que has conocido, sabido y padecido: te has mostrado impaciente.',
      'El que antes estaba en un trono está ahora desnudo sobre el estercolero, cubierto de llagas; el que tenía muchos hijos y era admirado, de repente se queda sin hijos y sin casa. Pero el estercolero lo tenía por palacio y las llagas por perlas.',
      'Revestido de dignidad real, con diadema y púrpura, hombre de muchos bienes y justo, cargado de riquezas y de ganados, de repente, empobrecido, se vio despojado de la riqueza, de la gloria y del reino.',
      'Si aquél, que era justo e intachable más que todos, no escapó a las trampas y a los fosos del engañador, ¿qué harás tú, alma desdichada y amante del pecado, si te sobreviene algo inesperado?',
      'Tengo el cuerpo manchado, el espíritu sucio, estoy todo cubierto de llagas; pero Tú, Cristo, como médico, cúrame ambos por el arrepentimiento: lávame, purifícame, límpiame y hazme, Salvador mío, más puro que la nieve.',
      'Crucificado por todos, oh Verbo, entregaste tu Cuerpo y tu Sangre: el Cuerpo, para formarme de nuevo; la Sangre, para lavarme. Entregaste el espíritu, oh Cristo, para llevarme a tu Padre.',
      'Obraste la salvación en medio de la tierra, oh Misericordioso, para que fuésemos salvados: voluntariamente fuiste crucificado en el madero, y el Edén, que estaba cerrado, se abrió. Lo de arriba y lo de abajo, la creación y todos los pueblos, salvados, te adoran.',
      'Que la sangre de tu costado sea para mí fuente bautismal, y el agua del perdón que de él brotó, mi bebida; para que por ambos quede purificado, ungido y bebiendo, oh Verbo, como unción y como bebida, tus palabras de vida.',
      'Me he quedado sin la cámara nupcial, sin la boda y sin el banquete. Mi lámpara se apagó por falta de aceite, la sala nupcial se me cerró mientras dormía, el banquete ya se ha comido, y a mí me han atado de pies y manos y me han echado fuera.',
      'La Iglesia ha recibido por cáliz tu costado portador de vida, del que brotó para nosotros el doble manantial del perdón y del conocimiento, figura de las dos Alianzas, la antigua y la nueva, oh Salvador nuestro.',
      `El tiempo de mi vida es corto y está lleno de fatigas y de maldad; ${NO_SEA_PRESA}`,
      'Ahora hablo con arrogancia y tengo el corazón altivo, sin motivo y en vano. No me condenes con el fariseo; dame más bien la humildad del publicano, Tú, el único misericordioso y justo Juez, y cuéntame con él.',
      `He pecado, lo sé, oh Misericordioso, y he ultrajado el vaso de mi carne; ${NO_SEA_PRESA}`,
      `Me he hecho ídolo de mí mismo, manchando mi alma con las pasiones; ${NO_SEA_PRESA}`,
      `No he escuchado tu voz, he desobedecido tu Escritura, oh Legislador; ${NO_SEA_PRESA}`,
    ],
    maria: [
      'Viviendo en el cuerpo una vida incorpórea, santa, recibiste de Dios una gracia inmensa. Protege a los que te honran con fe; por eso te suplicamos: líbranos con tus oraciones de toda clase de pruebas.',
      'Arrastrada al abismo de grandes maldades, no quedaste presa en él, sino que con un pensamiento mejor subiste de manera prodigiosa a la virtud más alta en las obras, María, y dejaste asombrados a los ángeles.',
    ],
    andres: [
      'Andrés, gloria de los Padres, que estás ante la Trinidad más que divina: no dejes de suplicar con tus oraciones para que seamos librados del castigo los que te invocamos con amor como protector divino, oh ornamento de Creta.',
    ],
    triadikon:
      'Te confieso, única Divinidad en Trinidad, indivisa en la esencia y sin confusión en las personas; y como a quien reina y se sienta en un mismo trono, te canto el gran himno que en las alturas se canta tres veces.',
    theotokion:
      'Das a luz y permaneces virgen, y en ambas cosas sigues siendo Virgen por naturaleza. El que nace renueva las leyes de la naturaleza, y el seno concibe sin dolores de parto. Donde Dios quiere, se vence el orden de la naturaleza: porque Él hace todo lo que quiere.',
  }),

  oda({
    id: 'oda-5',
    title: 'Oda 5',
    irmos:
      'Ilumíname, te lo ruego, oh amigo de los hombres, a mí que madrugo desde la noche; guíame también a mí en tus preceptos y enséñame, oh Salvador, a hacer tu voluntad.',
    troparios: [
      'He pasado siempre mi vida en la noche, porque la noche del pecado ha sido para mí tiniebla y niebla espesa; pero hazme, oh Salvador, hijo del día.',
      'Imitando a Rubén, yo, desdichado, he tramado un designio impío e inicuo contra el Dios altísimo, manchando mi lecho como aquél el de su padre.',
      'Me confieso a Ti, oh Cristo Rey: he pecado, he pecado, como los hermanos de José, que vendieron en otro tiempo el fruto de la pureza y de la templanza.',
      'El alma justa fue entregada por sus hermanos; el dulce José fue vendido como esclavo, figura del Señor. Pero tú, alma, te has vendido entera a tus maldades.',
      'Imita, alma desdichada y reprobada, la mente justa y casta de José, y no te entregues al desenfreno con impulsos insensatos, transgrediendo siempre la ley.',
      'Si José habitó un tiempo en la cisterna, oh Soberano Señor, fue como figura de tu sepultura y de tu resurrección. Pero yo, ¿qué podré ofrecerte jamás que se le parezca?',
      'Has oído, alma, de la cesta de Moisés, llevada por las aguas y las olas del río como en una alcoba, que escapó en otro tiempo al drama amargo del designio del faraón.',
      'Si has oído, alma desdichada, de las parteras que en otro tiempo mataban a los varones recién nacidos —la acción viril de la templanza—, nútrete ahora de la sabiduría, como el gran Moisés.',
      'No has herido ni matado, alma desdichada, a la mente egipcia, como el gran Moisés al egipcio. Dime, pues: ¿cómo habitarás por el arrepentimiento el desierto, vacío de pasiones?',
      'El gran Moisés habitó en los desiertos: ven, pues, imita su modo de vida, para que llegues también, alma, a contemplar a Dios manifestado en la zarza.',
      'Imagina, alma, la vara de Moisés que golpea el mar y endurece el abismo, figura de la Cruz divina, por la que también tú podrás realizar grandes cosas.',
      'Aarón ofrecía a Dios un fuego intachable y sin engaño; pero Ofní y Finés, como tú, alma, ofrecían a Dios un fuego extraño: una vida manchada.',
      'Me he vuelto, Señor, duro de corazón como el amargo faraón; soy un Janés y un Jambrés en el alma y en el cuerpo, y tengo la mente sumergida; pero ayúdame.',
      'Desdichado de mí, tengo la mente revuelta en el barro: lávame, oh Soberano, te lo ruego, en el baño de mis lágrimas, y deja la vestidura de mi carne blanca como la nieve.',
      'Si examino mis obras, oh Salvador, veo que he superado en pecados a todo hombre, porque he pecado a sabiendas, no por ignorancia.',
      'Perdona, perdona, Señor, a tu criatura: he pecado, absuélveme, Tú que eres el único puro por naturaleza; fuera de Ti no hay nadie libre de mancha.',
      'Siendo Dios, tomaste por mí mi forma; mostraste prodigios: curaste a los leprosos, robusteciste a los paralíticos y detuviste, oh Salvador, el flujo de la hemorroísa cuando tocó el borde de tu manto.',
      'Imita, alma desdichada, a la hemorroísa: corre, agárrate al borde del manto de Cristo, para que seas librada de tus azotes y le oigas decir: Tu fe te ha salvado.',
      'Imita, alma, a la mujer encorvada hacia el suelo: acércate, cae a los pies de Jesús, para que te enderece y camines derecha por las sendas del Señor.',
      'Tú eres un pozo profundo, oh Soberano: haz brotar para mí agua de tus venas purísimas, para que, como la samaritana, bebiendo ya no tenga sed; porque de Ti manan ríos de vida.',
      'Que mis lágrimas sean para mí Siloé, oh Soberano Señor, para que también yo lave los ojos de mi corazón y te vea con la mente a Ti, la luz anterior a los siglos.',
    ],
    maria: [
      'Deseaste con amor incomparable, bienaventurada, venerar el madero de la Cruz, y se te concedió lo que deseabas: haz, pues, que también yo alcance la gloria de lo alto.',
      'Cruzando la corriente del Jordán, hallaste el descanso libre de dolor, después de huir del placer de la carne; líbranos también a nosotros de él, santa, con tus oraciones.',
    ],
    andres: [
      'A ti, sabio Andrés, el mejor y más escogido de los pastores, te ruego con mucho amor y temor que por tu intercesión alcance la salvación y la vida eterna.',
    ],
    triadikon:
      'Te glorificamos, Trinidad, único Dios: santo, santo, santo eres, Padre, Hijo y Espíritu, esencia simple, Unidad siempre adorada.',
    theotokion:
      'De ti se vistió de mi barro, Madre y Virgen incorrupta que no conociste varón, el Dios que creó los siglos, y unió a sí la naturaleza humana.',
  }),

  oda({
    id: 'oda-6',
    title: 'Oda 6',
    irmos:
      'Clamé con todo mi corazón al Dios compasivo, y me escuchó desde el infierno más hondo, y sacó mi vida de la corrupción.',
    troparios: [
      'Te ofrezco con sinceridad, oh Salvador, las lágrimas de mis ojos y los gemidos de lo hondo, mientras mi corazón clama: Oh Dios, he pecado contra Ti, ten piedad de mí.',
      'Te has apartado, alma, de tu Señor, como Datán y Abirón; pero clama desde lo más hondo del infierno: ¡Perdóname!, para que no te trague la grieta de la tierra.',
      'Como novilla enfurecida, alma, te has hecho semejante a Efraín; salva tu vida como la gacela de los lazos, dándole alas con la acción, con la mente y con la contemplación.',
      'La mano de Moisés nos lo asegura, alma: Dios puede blanquear y purificar una vida leprosa. No desesperes de ti, aunque te hayas llenado de lepra.',
      'Las olas de mis faltas, oh Salvador, se han vuelto sobre mí como en el mar Rojo y me han cubierto de repente, como en otro tiempo a los egipcios y a sus capitanes.',
      'Has tenido, alma, una voluntad ingrata, como Israel en otro tiempo: porque has preferido neciamente al maná divino la glotonería placentera de las pasiones.',
      'Has preferido, alma mía, la carne de cerdo, las ollas y la comida de Egipto al alimento celestial, como el pueblo ingrato de antaño en el desierto.',
      'Has preferido, alma, los pozos de los pensamientos cananeos a la roca del manantial, de la que el río de la sabiduría derrama, como de un cáliz, raudales de teología.',
      'Cuando Moisés, tu siervo, golpeó en figura la roca con la vara, prefiguraba tu costado vivificador, del que todos sacamos, oh Salvador, la bebida de la vida.',
      'Explora, alma, y reconoce como Josué, hijo de Nun, cómo es la tierra de la herencia, y establécete en ella por la observancia de la ley.',
      'Levántate y combate, como Josué contra Amalec, las pasiones de la carne, y vence siempre a los gabaonitas, que son los pensamientos engañosos.',
      'Atraviesa, alma, la corriente del tiempo, como en otro tiempo el arca, y toma posesión de aquella tierra de la promesa: Dios lo manda.',
      'Como salvaste a Pedro cuando gritó, adelántate, oh Salvador, y sálvame: líbrame de la fiera extendiendo tu mano, y sácame del abismo del pecado.',
      'Te conozco como puerto en calma, Soberano, Soberano Cristo; adelántate y líbrame de los abismos sin fondo del pecado y de la desesperación.',
      'Yo soy, oh Salvador, la dracma real que perdiste en otro tiempo; pero enciende la lámpara, oh Verbo, que es tu Precursor, busca y encuentra tu imagen.',
    ],
    maria: [
      'Para apagar el ardor de las pasiones, María, derramabas siempre ríos de lágrimas sobre tu alma encendida; reparte también su gracia conmigo, tu siervo.',
      'Alcanzaste, madre, una impasibilidad celestial por tu altísimo modo de vivir en la tierra; por eso, suplica con tu intercesión que los que te cantamos seamos librados de las pasiones.',
    ],
    andres: [
      'Sabiendo que eres pastor y primado de Creta e intercesor del mundo entero, acudo a ti, Andrés, y te clamo: Sácame, padre, del abismo del pecado.',
    ],
    triadikon:
      '«Soy Trinidad simple e indivisible, distinta en las personas, y soy Unidad unida en la naturaleza», dicen el Padre, el Hijo y el divino Espíritu.',
    theotokion:
      'Tu seno nos dio a luz a Dios, que tomó nuestra forma; ruégale, Theotokos, como a Creador de todo, para que seamos justificados por tu intercesión.',
    cierre: [rub('Y se repite el irmos.')],
  }),

  s('kontakion', 'Kontakion e ikos', [
    rub('Se cantan después de la sexta oda. El kontakion es la estrofa más conocida del canon.'),
    t('Alma mía, alma mía, levántate: ¿por qué duermes? El fin se acerca y vas a turbarte. Despierta, pues, para que se compadezca de ti Cristo Dios, que está en todo lugar y todo lo llena.'),
    rub('Ikos'),
    t('Al ver abierta la casa de curación de Cristo, y la salud que de ella brota para Adán, el diablo sufrió y quedó herido; y, como quien se ve en peligro, se lamentaba y gritaba a sus amigos: ¿Qué haré con el Hijo de María? Me mata el de Belén, que está en todo lugar y todo lo llena.'),
    rub('Después se lee el sinaxario del día, que se abre con estos versos: «Dales, Jesús, caminos de compunción a los que ahora te cantan el Gran Canon».'),
  ]),

  s('bienaventuranzas', 'Las Bienaventuranzas', [
    rub('Sólo el jueves de la quinta semana. Se canta cada bienaventuranza del Evangelio y, tras ella, una estrofa del canon, que sigue recorriendo la Escritura por los Jueces y los Reyes.'),
    rub('En tu Reino acuérdate de nosotros, Señor, cuando vengas en tu Reino.'),
    t('Al ladrón que en la cruz te gritó «Acuérdate de mí», oh Cristo, lo hiciste ciudadano del Paraíso: hazme digno de su arrepentimiento también a mí, que soy indigno.'),
    rub('Bienaventurados los pobres en espíritu, porque de ellos es el Reino de los cielos.'),
    t('Oyes, alma mía, de Manoa, que vio en otro tiempo a Dios en una aparición y recibió de su mujer estéril el fruto de la promesa: imitemos su piedad.'),
    rub('Bienaventurados los que lloran, porque ellos serán consolados.'),
    t('Imitando la flojedad de Sansón, alma, te has dejado rapar la gloria de tus obras, entregando a los extranjeros, por amor al placer, tu vida casta y bienaventurada.'),
    rub('Bienaventurados los mansos, porque ellos heredarán la tierra.'),
    t('El que antes venció a los filisteos con una quijada de asno acabó siendo presa de la lujuria apasionada; pero tú, alma mía, huye de imitarle, de sus obras y de su flojedad.'),
    rub('Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.'),
    t('Barac y Jefté, los caudillos, fueron escogidos jueces de Israel, y con ellos Débora, la de ánimo varonil: hazte fuerte, alma, cobrando valor con sus hazañas.'),
    rub('Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.'),
    t('Conoces, alma mía, el valor de Yael, que en otro tiempo atravesó a Sísara y obró la salvación; oyes hablar de la estaca, que es para ti imagen de la Cruz.'),
    rub('Bienaventurados los limpios de corazón, porque ellos verán a Dios.'),
    t('Ofrece, alma, un sacrificio digno de alabanza: presenta tus obras como una hija más pura que la de Jefté, e inmola a tu Señor, como víctima, las pasiones de la carne.'),
    rub('Bienaventurados los que trabajan por la paz, porque ellos serán llamados hijos de Dios.'),
    t('Piensa, alma mía, en el vellón de Gedeón: recibe el rocío del cielo, inclínate como la gacela y bebe el agua que brota de la Ley cuando se exprime la letra.'),
    rub('Bienaventurados los perseguidos por causa de la justicia, porque de ellos es el Reino de los cielos.'),
    t('Has atraído sobre ti, alma mía, por falta de juicio, la condena del sacerdote Elí, consintiendo que las pasiones obren en ti la iniquidad, como él consintió a sus hijos.'),
    rub('Bienaventurados seréis cuando os injurien y os persigan y digan con mentira toda clase de mal contra vosotros por mi causa.'),
    t('En el libro de los Jueces, alma mía, un levita repartió a su mujer entre las doce tribus, para sacar a la luz el crimen de Benjamín.'),
    rub('Alegraos y regocijaos, porque vuestra recompensa será grande en los cielos.'),
    t('Ana, amante de la castidad, al orar movía los labios en alabanza, pero no se oía su voz; y, siendo estéril, dio a luz un hijo digno de su oración.'),
    rub('Acuérdate de nosotros, Señor, cuando vengas en tu Reino.'),
    t('Entre los jueces fue contado el hijo de Ana, el gran Samuel, criado en Ramá en la casa del Señor: imítalo, alma mía, y juzga tus propias obras antes que las de los demás.'),
    rub('Acuérdate de nosotros, Soberano, cuando vengas en tu Reino.'),
    t('David, escogido como rey, fue ungido como rey con el cuerno del óleo divino. Tú, pues, alma mía, si quieres el Reino de arriba, úngete con el óleo de las lágrimas.'),
    rub('Acuérdate de nosotros, Santo, cuando vengas en tu Reino.'),
    t('Ten piedad de tu criatura, oh Misericordioso; compadécete de la obra de tus manos, y perdona a todos los que han pecado, y a mí, que más que todos he despreciado tus mandatos.'),
    rub(GLORIA),
    t('Adoro al Padre, que engendra sin principio; glorifico al Hijo, engendrado sin principio; canto al Espíritu Santo, que procede sin principio y resplandece junto con el Padre y el Hijo.'),
    rub(AHORA),
    t('Adoramos tu parto, que está por encima de la naturaleza, sin dividir, Madre de Dios, la gloria divina de tu Niño: porque Él, uno en la persona, es confesado doble en las naturalezas.'),
  ]),

  oda({
    id: 'oda-7',
    title: 'Oda 7',
    irmos:
      'Pecamos, cometimos iniquidad, obramos injusticia delante de Ti; no guardamos ni cumplimos lo que nos mandaste. Pero no nos entregues hasta el fin, Dios de nuestros padres.',
    troparios: [
      'He pecado, he faltado y he despreciado tu mandamiento, porque he ido de pecado en pecado y he añadido heridas a mis llagas; pero Tú, compasivo, ten piedad de mí, Dios de nuestros padres.',
      'Te he confesado a Ti, mi Juez, los secretos de mi corazón: mira mi humillación, mira también mi aflicción, atiende ahora a mi causa y ten Tú piedad de mí, compasivo, Dios de nuestros padres.',
      'Cuando Saúl perdió en otro tiempo, alma, las asnas de su padre, encontró de paso el reino y fue proclamado rey. Pero mira que no te olvides de ti misma prefiriendo tus apetitos animales al Reino de Cristo.',
      'David, el antepasado de Dios, pecó en otro tiempo dos veces, alma mía: herido por la flecha del adulterio y atrapado por la lanza del castigo del homicidio. Pero tú estás enferma de obras más graves, por los impulsos de tu propia voluntad.',
      'David añadió en otro tiempo iniquidad a iniquidad, mezclando el adulterio con el homicidio; pero enseguida mostró un arrepentimiento doble. Tú, en cambio, alma, has hecho cosas peores y no te has arrepentido ante Dios.',
      'David compuso en otro tiempo un himno y lo levantó como un icono, en el que reprocha lo que había hecho, clamando: Ten piedad de mí, porque sólo contra Ti he pecado, Dios de todos: purifícame Tú.',
      'Cuando el Arca era llevada sobre un carro, aquel Uzá, al tropezar el novillo, sólo la tocó y experimentó la ira de Dios. Huye, alma, de su atrevimiento y venera como es debido las cosas divinas.',
      'Has oído cómo Absalón se rebeló contra la naturaleza; conoces sus acciones abominables, con las que deshonró el lecho de David, su padre. Y tú has imitado sus impulsos apasionados y amigos del placer.',
      'Has sometido a tu cuerpo tu dignidad, que no conocía esclavitud: has encontrado en el enemigo otro Ajitófel, alma, y te has unido a sus consejos. Pero Cristo mismo los ha deshecho, para que te salves de todos ellos.',
      'Salomón el admirable, lleno de la gracia de la sabiduría, hizo en otro tiempo el mal ante Dios y se apartó de Él. A él te has asemejado, alma, con tu vida maldita.',
      'Arrastrado por los placeres de sus pasiones, se ensuciaba. ¡Ay!, el amante de la sabiduría se hizo amante de mujeres perdidas y extraño a Dios. Y tú, alma, lo has imitado en la mente con placeres vergonzosos.',
      'Has rivalizado, alma, con Roboán, que despreció el consejo recibido de su padre, y también con Jeroboán, el siervo perverso, apóstata de antaño. Huye de imitarlos y clama a Dios: He pecado, compadécete de mí.',
      'Has rivalizado, alma mía, con Ajab en sus impurezas. ¡Ay!, te has hecho guarida de las manchas de la carne y vaso vergonzoso de las pasiones. Pero gime desde lo hondo y di a Dios tus pecados.',
      'Se te cerró el cielo, alma, y te alcanzó el hambre de Dios, cuando, como Ajab, desobedeciste las palabras de Elías el tesbita. Pero hazte semejante a la viuda de Sarepta: alimenta el alma del profeta.',
      'Has amontonado por tu voluntad los crímenes de Manasés, alzando las pasiones como abominaciones y multiplicando, alma, las cosas detestables. Pero imita con ardor su arrepentimiento y adquiere la compunción.',
      'Me postro ante Ti y te ofrezco mis palabras como lágrimas: he pecado como no pecó la pecadora, y he cometido iniquidad como nadie en la tierra. Pero compadécete, Soberano, de tu obra y llámame de nuevo.',
      'He manchado tu imagen y he quebrantado tu mandamiento: toda la belleza se ha oscurecido y las pasiones han apagado la lámpara, oh Salvador. Pero compadécete y devuélveme, como canta David, la alegría.',
      'Vuélvete, arrepiéntete, descubre lo escondido; di a Dios, que todo lo sabe: Tú solo, oh Salvador, conoces mis secretos; ten Tú piedad de mí, como canta David, según tu misericordia.',
      'Mis días se han desvanecido como el sueño del que despierta; por eso lloro en mi lecho como Ezequías, para que se me añadan años de vida. Pero ¿qué Isaías vendrá a ti, alma, sino el Dios de todos?',
    ],
    maria: [
      'Clamando a la purísima Madre de Dios, rechazaste en otro tiempo la furia de las pasiones violentas que te asediaban, y avergonzaste al enemigo que te había hecho caer. Da ahora también a mí, tu siervo, ayuda en la aflicción.',
      'Al que amaste, al que deseaste, por quien consumiste tu carne, santa, pídele ahora por sus siervos: que, siendo propicio con todos nosotros, conceda la paz a los que le veneran.',
    ],
    andres: [
      'Afiánzame, padre, con tu intercesión sobre la roca de la fe, amurallándome con el temor de Dios; dame ahora, Andrés, el arrepentimiento, te lo suplico, y líbrame de la trampa de los enemigos que me buscan.',
    ],
    triadikon:
      'Trinidad simple e indivisible, Unidad santa y consustancial: luces y Luz, tres santos y un solo Santo; así es cantado Dios, la Trinidad. Canta, alma, glorifica a la Vida y a las vidas, al Dios de todos.',
    theotokion:
      'Te cantamos, te bendecimos, te veneramos, Madre de Dios, porque diste a luz a uno de la Trinidad inseparable, el Hijo y Dios, y tú misma nos abriste a los de la tierra las cosas del cielo.',
  }),

  oda({
    id: 'oda-8',
    title: 'Oda 8',
    irmos:
      'A quien glorifican los ejércitos de los cielos y ante quien tiemblan los querubines y los serafines, todo aliento y toda criatura cantadle, bendecidle y exaltadle por todos los siglos.',
    troparios: [
      'He pecado, oh Salvador, ten piedad de mí; despierta mi mente para que me convierta; recíbeme arrepentido, compadécete de mí, que te clamo: He pecado contra Ti, sálvame; he cometido iniquidad, ten piedad de mí.',
      'Elías, el auriga, subido en el carro de las virtudes, fue llevado en otro tiempo como al cielo, por encima de lo terreno. Medita, alma mía, en su subida.',
      'La corriente del Jordán se detuvo en otro tiempo a un lado y a otro con el manto de Elías en manos de Eliseo; pero tú, alma mía, no has participado de esa gracia, por tu incontinencia.',
      'Eliseo, al recibir en otro tiempo el manto de Elías, recibió del Señor una gracia doble; pero tú, alma mía, no has participado de esa gracia, por tu incontinencia.',
      'La sunamita hospedó en otro tiempo al justo con buena voluntad, alma; pero tú no has acogido en tu casa ni al forastero ni al caminante. Por eso serás arrojada fuera de la cámara nupcial, llorando.',
      'Has imitado siempre, alma desdichada, la intención sucia de Guejazí: rechaza su avaricia, aunque sea en la vejez; huye del fuego de la gehena apartándote de tus maldades.',
      'Imitando a Ozías, alma, tienes en ti su lepra por partida doble: porque piensas cosas indebidas y haces cosas inicuas. Deja lo que tienes entre manos y corre al arrepentimiento.',
      'Has oído, alma, de los ninivitas, que se arrepintieron ante Dios con saco y ceniza; no los has imitado, sino que te has mostrado más necia que todos los que pecaron antes de la Ley y después de ella.',
      'Has oído, alma, de Jeremías en la cisterna de fango, que clamaba con lamentos sobre la ciudad de Sión y pedía lágrimas: imita su vida de llanto y serás salvada.',
      'Jonás huyó a Tarsis porque preveía la conversión de los ninivitas: como profeta conocía la compasión de Dios, y por eso se empeñaba en que su profecía no resultara falsa.',
      'Has oído, alma, cómo Daniel cerró en el foso la boca de las fieras; has sabido cómo los jóvenes compañeros de Azarías apagaron con la fe la llama ardiente del horno.',
      'Te he puesto delante, alma, a todos los del Antiguo Testamento como modelo: imita las obras de los justos, que aman a Dios, y huye, en cambio, de los pecados de los malvados.',
      'Justo Juez y Salvador, ten piedad de mí y líbrame del fuego y de la amenaza que con justicia voy a sufrir en el juicio; absuélveme antes del fin por la virtud y el arrepentimiento.',
      'Como el ladrón te grito: Acuérdate; como Pedro lloro amargamente; perdóname, oh Salvador, clamo como el publicano; lloro como la pecadora: recibe mi lamento como recibiste en otro tiempo el de la cananea.',
      'Cura, oh Salvador, la podredumbre de mi pobre alma, Tú, el único médico: ponme el emplasto, el aceite y el vino, que son las obras de arrepentimiento y la compunción con lágrimas.',
      'Imitando también yo a la cananea, clamo al Hijo de David: Ten piedad de mí. Toco el borde de su manto como la hemorroísa; lloro como Marta y María por Lázaro.',
      'Derramo sobre tu cabeza, oh Salvador, el frasco de alabastro de mis lágrimas como ungüento, y te clamo como la pecadora que buscaba misericordia: te presento mi súplica y te pido recibir el perdón.',
      'Aunque nadie ha pecado contra Ti como yo, recíbeme también a mí, Salvador compasivo, que me arrepiento con temor y te clamo con amor: Sólo contra Ti he pecado, he cometido iniquidad, ten piedad de mí.',
      'Perdona, oh Salvador, a tu propia criatura, y busca como pastor a la oveja perdida y extraviada: arrebátame del lobo y hazme cordero de tu rebaño en el pasto de tus ovejas.',
      'Cuando te sientes como Juez compasivo y muestres tu gloria temible, oh Cristo, ¡qué temor habrá entonces!, cuando arda el horno y todos tiemblen ante tu tribunal insoportable.',
    ],
    maria: [
      'La Madre de la Luz sin ocaso te iluminó y te libró de la oscuridad de las pasiones; y tú, María, que recibiste la gracia del Espíritu, ilumina a los que te alaban con fe.',
      'El divino Zósimo, madre, quedó asombrado al ver en ti una maravilla nueva: veía un ángel en un cuerpo, y lleno de estupor cantaba a Cristo por los siglos.',
    ],
    andres: [
      'Tú, Andrés, gloria venerable de Creta, que tienes confianza ante el Señor: intercede, te lo suplico, para que por tus oraciones encuentre ahora la liberación de las cadenas de la iniquidad, oh maestro, gloria de los santos.',
    ],
    antesTriadikon: 'Bendigamos al Padre, al Hijo y al Espíritu Santo.',
    triadikon:
      'Padre sin principio, Hijo igualmente sin principio, Consolador bueno, Espíritu recto; Engendrador del Verbo de Dios, Verbo del Padre sin principio, Espíritu vivo y creador: Trinidad, Unidad, ten piedad de mí.',
    theotokion:
      'Como de un tinte de púrpura, Purísima, se tejió dentro de tu seno la carne de Emmanuel, su púrpura espiritual; por eso te honramos como verdadera Theotokos.',
    cierre: [rub('Alabamos, bendecimos y adoramos al Señor.'), rub('Y se repite el irmos.')],
  }),

  oda({
    id: 'oda-9',
    title: 'Oda 9',
    irmos:
      'El parto de una concepción sin semilla no se puede explicar; incorrupta es la gestación de una Madre que no conoció varón, porque el nacimiento de Dios renueva las naturalezas. Por eso todas las generaciones, con fe recta, te engrandecemos como Madre y Esposa de Dios.',
    troparios: [
      'La mente está herida, el cuerpo debilitado, el espíritu enfermo, la palabra sin fuerzas, la vida muerta, el fin a las puertas. ¿Qué harás, pues, alma mía desdichada, cuando venga el Juez a examinar lo tuyo?',
      'Te he puesto delante, alma, la creación del mundo según Moisés, y desde allí toda la Escritura del canon, que te cuenta la historia de justos e injustos; y tú, alma, has imitado a los segundos, no a los primeros, pecando contra Dios.',
      'La Ley ha quedado sin fuerza, el Evangelio sin efecto, toda la Escritura descuidada en ti; los profetas y toda palabra del justo se han debilitado. Tus heridas, alma, se han multiplicado, y no hay médico que te sane.',
      'Te pongo delante, alma, los ejemplos de la nueva Escritura, que te llevan a la compunción: imita, pues, a los justos, apártate de los pecadores y aplaca a Cristo con oraciones y ayunos, con pureza y dignidad.',
      'Cristo se hizo hombre y llamó al arrepentimiento a ladrones y prostitutas: arrepiéntete, alma. La puerta del Reino ya está abierta, y se te adelantan a arrebatarlo fariseos, publicanos y adúlteros que se convierten.',
      'Cristo se hizo hombre y trató conmigo en la carne; cumplió por su voluntad todo lo que es propio de la naturaleza, menos el pecado, mostrándote, alma, el modelo y la imagen de su condescendencia.',
      'Cristo salvó a los magos, convocó a los pastores, hizo mártires a multitudes de niños, glorificó al anciano y a la anciana viuda. Tú, alma, no has imitado ni sus obras ni su vida: ¡ay de ti cuando seas juzgada!',
      'El Señor ayunó cuarenta días en el desierto, y al final tuvo hambre, mostrando lo que tenía de humano. No te desanimes, alma, si el enemigo te ataca: que sea rechazado lejos de ti con la oración y el ayuno.',
      'Cristo era tentado, el diablo tentaba: le mostraba las piedras para que se convirtieran en panes; lo subió a un monte para ver en un instante todos los reinos del mundo. Teme, alma, la trampa; vela y ora a Dios a toda hora.',
      'La tórtola amante del desierto, la voz del que clama, resonó: la lámpara de Cristo, que predicaba el arrepentimiento. Herodes obró la iniquidad, junto con Herodías. Mira, alma mía, no caigas en los lazos de los inicuos, sino abraza el arrepentimiento.',
      'El Precursor de la gracia habitó en el desierto, y toda Judea y Samaría, al oírle, corrían a él y confesaban sus pecados haciéndose bautizar con ardor. Tú, alma, no los has imitado.',
      'Honroso es el matrimonio y sin mancha el lecho: Cristo bendijo ambas cosas cuando comió en la carne y, en la boda de Caná, convirtió el agua en vino e hizo su primer milagro, para que tú, alma, cambies.',
      'Cristo fortaleció al paralítico, que cargó con su camilla; resucitó al joven muerto, hijo de la viuda, y sanó al siervo del centurión; y al aparecerse a la samaritana te dibujó de antemano, alma, el culto en espíritu.',
      'El Señor curó a la hemorroísa cuando tocó el borde de su manto; purificó a los leprosos; dio luz a los ciegos y enderezó a los cojos; curó a sordos y mudos, y con su palabra sanó a la mujer encorvada hacia el suelo, para que tú te salves, alma desdichada.',
      'Cristo, el Verbo, curando las enfermedades, anunciaba el Evangelio a los pobres; sanó a los lisiados, comía con publicanos, conversaba con pecadores, e hizo volver, tocándola con la mano, el alma de la hija de Jairo, que ya había partido.',
      'El publicano se salvaba, la pecadora recobraba la pureza, y el fariseo, que se jactaba, era condenado. Porque uno decía: Ten piedad; la otra: Compadécete de mí; y el otro se vanagloriaba diciendo: Oh Dios, te doy gracias, y lo demás de aquellas palabras insensatas.',
      'Zaqueo era publicano y, sin embargo, se salvaba; el fariseo Simón se extraviaba; y la pecadora recibía el perdón y la absolución de quien tiene poder para perdonar los pecados. Apresúrate, alma, a imitarla.',
      'No has imitado, alma mía desdichada, a la pecadora, que tomó el frasco de alabastro con ungüento, ungió con lágrimas los pies del Señor y los secó con sus cabellos; y Él rompió el documento de sus antiguas culpas.',
      'Sabes, alma mía, cómo fueron maldecidas las ciudades a las que Cristo dio el Evangelio. Teme el ejemplo, no vayas a ser como ellas: porque el Soberano las comparó con Sodoma y las condenó hasta el infierno.',
      'No te muestres peor, alma mía, por la desesperación, después de oír la fe de la cananea, por la que su hija fue curada por la palabra de Dios. Clama desde lo hondo del corazón a Cristo, como ella: Hijo de David, sálvame también a mí.',
      'Compadécete, sálvame, Hijo de David, ten piedad, Tú que curaste con tu palabra a los endemoniados; y dime, como al ladrón, aquella palabra compasiva: En verdad te digo que estarás conmigo en el Paraíso cuando venga en mi gloria.',
      'Un ladrón te acusaba, el otro te confesaba como Dios: los dos estaban colgados contigo en la cruz. Pero Tú, lleno de compasión, como al ladrón creyente que te reconoció como Dios, ábreme también a mí la puerta de tu Reino glorioso.',
      'La creación se estremecía al verte crucificado; los montes y las rocas se partían de miedo, la tierra temblaba, el infierno quedaba al desnudo y la luz se oscureció en pleno día al verte, Jesús, clavado en la carne.',
      'No me exijas frutos dignos de arrepentimiento, porque mis fuerzas se han agotado; dame un corazón siempre contrito y la pobreza de espíritu, para que te los ofrezca como sacrificio agradable, oh único Salvador.',
      'Juez mío, que me conoces, que has de venir de nuevo con los ángeles a juzgar al mundo entero: mírame entonces con tus ojos compasivos y perdóname; compadécete de mí, Jesús, que he pecado más que toda la naturaleza humana.',
    ],
    maria: [
      'Con tu extraño modo de vivir asombraste a todos, a los coros de los ángeles y a las asambleas de los hombres, viviendo como sin materia y por encima de la naturaleza; por eso, María, caminando como si no tuvieras cuerpo, atravesaste el Jordán a pie.',
      'Haz propicio al Creador, santa madre, en favor de los que te alaban, para que seamos librados de los males y de las aflicciones que nos acosan por todas partes; y, libres de las tentaciones, engrandezcamos sin cesar al Señor que te glorificó.',
    ],
    andres: [
      'Venerable Andrés, padre tres veces bienaventurado, pastor de Creta: no dejes de suplicar por los que te cantamos, para que seamos librados de toda ira, aflicción y corrupción, y de faltas sin medida, los que honramos con fe tu memoria.',
    ],
    triadikon:
      'Glorifiquemos al Padre, exaltemos al Hijo, adoremos con fe al divino Espíritu: Trinidad inseparable, Unidad en la esencia, Luz y luces, Vida y vidas, que da vida e ilumina los confines de la tierra.',
    theotokion:
      'Guarda tu ciudad, purísima Madre de Dios: porque reinando con fe en ti, en ti se hace fuerte, y venciendo por ti pone en fuga toda tentación, despoja a los enemigos y gobierna a los que le están sometidos.',
    cierre: [rub('Y se repite el irmos.')],
  }),
];
