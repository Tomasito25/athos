/**
 * Los Maitines, enteros en lo que tienen de fijo.
 *
 * El Orthros es el oficio más largo del día. Hasta la versión 1.25 ATHOS
 * tenía su estructura, los Seis Salmos y la Gran Doxología; ahora tiene todo
 * lo que no cambia: el oficio real del comienzo, las doce oraciones de la
 * mañana que el sacerdote reza durante los Seis Salmos, las letanías, las
 * evlogitarias del domingo, el orden del Evangelio, los cánticos bíblicos en
 * los que se apoya el canon, el Magníficat con su estribillo, las Laudes, la
 * Gran Doxología, los troparios del domingo, la oración de la inclinación y la
 * despedida.
 *
 * Lo que cambia con el día —los troparios de «Dios es el Señor», los
 * kathismata, el canon, el exapostilario, las estiqueras de las Laudes— se
 * toma del Octoecos, del Menaion o del Triodion, y aquí se dice dónde va.
 *
 * Traducido del Horologion griego (glt.goarch.org). Los salmos y los
 * cánticos bíblicos no se copian: se muestran tomados del Salterio y de la
 * Biblia de ATHOS. El resto lo ha traducido ATHOS; no procede de ningún libro
 * litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const reading = (reference: string): TextBlock => ({ kind: 'reading', content: reference, ref: reference });
const section = (
  id: string,
  title: string,
  blocks: TextBlock[],
  voice?: OfficeSection['voice'],
): OfficeSection => ({ id, title, blocks, voice });

const AMEN = ref('Amén.');
const SENOR = ref('Señor, ten piedad.');
const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';

const PEQUENA_LETANIA: TextBlock[] = [
  rub('Pequeña letanía. Diácono:'),
  t('Una y otra vez, en paz, oremos al Señor.'),
  SENOR,
  t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
  SENOR,
  t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
  ref('A Ti, Señor.'),
];

const LETANIA_FERVIENTE: TextBlock[] = [
  t('Ten piedad de nosotros, oh Dios, según tu gran misericordia; te rogamos: escúchanos y ten piedad.'),
  t('Oremos también por nuestro arzobispo N.'),
  t('Oremos también por nuestros hermanos, los sacerdotes, los hieromonjes, los hierodiáconos y los monjes, y por toda nuestra hermandad en Cristo.'),
  t('Oremos también por la misericordia, la vida, la paz, la salud, la salvación, la visita, el perdón y la remisión de los pecados de los siervos de Dios, de todos los cristianos piadosos y ortodoxos que viven en esta ciudad o están de paso, de los fieles, administradores y bienhechores de este santo templo.'),
  t('Oremos también por los bienaventurados y siempre recordados fundadores de esta santa iglesia, y por todos nuestros padres y hermanos que se han dormido antes que nosotros, los que reposan aquí piadosamente y los ortodoxos de todas partes.'),
  t('Oremos también por los que traen ofrendas y hacen el bien en este santo y venerabilísimo templo, por los que trabajan en él, por los que cantan, y por el pueblo aquí presente, que espera de Ti la grande y rica misericordia.'),
  rub('Sacerdote:'),
  t(`Porque eres Dios misericordioso y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
  AMEN,
];

/** Las doce oraciones de la mañana, que el sacerdote reza durante los Seis Salmos. */
const ORACIONES_DE_LA_MANANA: [string, string][] = [
  ['Primera', `Te damos gracias, Señor, Dios nuestro, que nos has levantado de nuestros lechos y has puesto en nuestra boca palabras de alabanza para adorarte e invocar tu santo nombre. Te suplicamos por tus compasiones, de las que siempre has usado con nuestra vida: envía también ahora tu ayuda a los que están delante de tu santa gloria y esperan de Ti la rica misericordia, y concédeles servirte siempre con temor y amor, alabar, cantar y adorar tu bondad inefable. Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Segunda', `Desde la noche madruga hacia Ti nuestro espíritu, oh Dios nuestro, porque tus mandamientos son luz sobre la tierra. Haznos entender cómo cumplir la justicia y la santidad en tu temor, porque te glorificamos a Ti, el que verdaderamente es nuestro Dios. Inclina tu oído y escúchanos; acuérdate, Señor, por su nombre, de todos los que están aquí y oran con nosotros, y sálvalos con tu poder. Bendice a tu pueblo y santifica tu heredad; da la paz a tu mundo, a tus Iglesias, a los sacerdotes, a los que nos gobiernan y a todo tu pueblo. Porque bendito y glorificado es tu honorabilísimo y magnífico nombre, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Tercera', `Desde la noche madruga hacia Ti nuestro espíritu, oh Dios, porque tus mandamientos son luz. Enséñanos, oh Dios, tu justicia, tus mandamientos y tus preceptos. Ilumina los ojos de nuestra mente, para que no nos durmamos nunca en el pecado hasta la muerte. Aleja de nuestros corazones toda oscuridad; concédenos el sol de justicia y guarda nuestra vida libre de asechanzas con el sello de tu Espíritu Santo. Endereza nuestros pasos por el camino de la paz; concédenos ver la aurora y el día con alegría, para que te ofrezcamos las oraciones de la mañana. Porque tuyo es el poder, y tuyos son el Reino, la fuerza y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Cuarta', `Soberano Dios, santo e incomprensible, que dijiste que de las tinieblas brillara la luz; que nos has dado descanso en el sueño de la noche y nos has levantado para glorificar y suplicar tu bondad: movido por tu propia compasión, recíbenos también ahora, que te adoramos y te damos gracias según nuestras fuerzas, y concédenos todo lo que pedimos para nuestra salvación. Haznos hijos de la luz y del día y herederos de tus bienes eternos. Acuérdate, Señor, en la multitud de tus compasiones, también de todo tu pueblo, de los que están aquí y oran con nosotros, y de todos nuestros hermanos que en la tierra, en el mar y en todo lugar de tu dominio necesitan de tu amor a los hombres y de tu ayuda, y concede a todos tu gran misericordia; para que, salvados siempre en el alma y en el cuerpo, glorifiquemos con confianza tu nombre admirable y bendito, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Quinta', `Tesoro de los bienes, fuente que nunca se agota, Padre santo, hacedor de maravillas, todopoderoso y Señor de todo: todos te adoramos y te suplicamos, invocando tus misericordias y tus compasiones para que ayuden y sostengan nuestra humildad. Acuérdate, Señor, de los que te suplican; recibe las súplicas de la mañana de todos nosotros como incienso ante Ti, y no rechaces a ninguno de nosotros, sino guárdanos a todos por tus compasiones. Acuérdate, Señor, de los que velan y cantan para gloria tuya, de tu Hijo unigénito, Dios nuestro, y de tu Espíritu Santo; sé su ayuda y su apoyo; recibe sus súplicas en tu altar celeste y espiritual. Porque Tú eres nuestro Dios, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Sexta', `Te damos gracias, Señor, Dios de nuestra salvación, porque todo lo haces para bien de nuestra vida, para que siempre miremos hacia Ti, Salvador y bienhechor de nuestras almas: porque nos has dado descanso en la parte de la noche que ha pasado, nos has levantado de nuestros lechos y nos has puesto en pie para adorar tu nombre venerable. Por eso te suplicamos, Señor: danos gracia y fuerza para que seamos dignos de cantarte con inteligencia y de orar sin cesar con temor y temblor, obrando nuestra salvación con la ayuda de tu Cristo. Acuérdate, Señor, también de los que de noche claman a Ti: escúchalos, ten piedad de ellos y aplasta bajo sus pies a los enemigos invisibles que los combaten. Porque Tú eres el Rey de la paz y el Salvador de nuestras almas, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Séptima', `Dios y Padre de nuestro Señor Jesucristo, que nos has levantado de nuestros lechos y nos has reunido a la hora de la oración: danos gracia al abrir nuestra boca y recibe nuestras acciones de gracias, según nuestras fuerzas; y enséñanos tus preceptos, porque no sabemos orar como conviene si Tú, Señor, no nos guías con tu Espíritu Santo. Por eso te suplicamos: si hasta esta hora hemos pecado de palabra, de obra o de pensamiento, voluntaria o involuntariamente, absuelve, perdona, condona; porque si Tú, Señor, Señor, tienes en cuenta las iniquidades, ¿quién podrá resistir? Porque en Ti está el perdón. Sólo Tú eres santo, ayuda y protector poderoso de nuestra vida, y a Ti se dirige siempre nuestro canto. Bendito y glorificado sea el poder de tu Reino, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Octava', `Señor, Dios nuestro, que has apartado de nosotros la pereza del sueño y nos has llamado con una vocación santa a levantar también de noche nuestras manos y a confesarte por los juicios de tu justicia: recibe nuestras súplicas, nuestras peticiones, nuestras confesiones y nuestro culto nocturno; y concédenos, oh Dios, una fe que no se avergüenza, una esperanza firme, un amor sin fingimiento. Bendice nuestras entradas y nuestras salidas, nuestras acciones, nuestras obras, nuestras palabras y nuestros pensamientos; y concédenos llegar al comienzo del día alabando, cantando y bendiciendo la bondad de tu benevolencia inefable. Porque bendito es tu santísimo nombre y glorificado tu Reino, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Novena', `Haz brillar en nuestros corazones, Soberano amigo de los hombres, la luz pura del conocimiento de tu divinidad, y abre los ojos de nuestra mente para comprender la predicación de tu Evangelio. Pon en nosotros también el temor de tus bienaventurados mandamientos, para que, pisoteando todos los deseos de la carne, llevemos una vida espiritual, pensando y haciendo todo lo que te agrada. Porque Tú eres nuestra santificación, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Décima', `Señor, Dios nuestro, que has concedido a los hombres el perdón por el arrepentimiento y nos has mostrado como modelo del reconocimiento y la confesión de los pecados el arrepentimiento del profeta David para alcanzar el perdón: Tú mismo, Soberano, ten piedad de nosotros, que hemos caído en muchas y grandes faltas, según tu gran misericordia, y según la multitud de tus compasiones borra nuestras iniquidades. Porque hemos pecado contra Ti, Señor, que conoces lo oculto y secreto del corazón de los hombres y eres el único que tiene poder para perdonar los pecados. Crea en nosotros un corazón puro, afiánzanos con un espíritu de gobierno, danos a conocer la alegría de tu salvación y no nos arrojes de tu presencia; sino dígnate, porque eres bueno y amigo de los hombres, que hasta nuestro último aliento te ofrezcamos el sacrificio de justicia y la ofrenda en tus santos altares. Por la misericordia, las compasiones y el amor a los hombres de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS} Amén.`],
  ['Undécima', `Oh Dios, Dios nuestro, que por tu voluntad diste existencia a las potestades espirituales y racionales: te suplicamos y te rogamos, recibe, junto con todas tus criaturas, nuestra glorificación según nuestras fuerzas, y recompénsala con los ricos dones de tu bondad. Porque ante Ti se dobla toda rodilla en el cielo, en la tierra y en los abismos, y todo aliento y toda criatura canta tu gloria incomprensible: porque sólo Tú eres Dios verdadero y lleno de misericordia. Porque te alaban todas las potestades de los cielos, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
  ['Duodécima', `Te alabamos, te cantamos, te bendecimos y te damos gracias, Dios de nuestros padres, porque has hecho pasar la sombra de la noche y nos has mostrado de nuevo la luz del día. Suplicamos a tu bondad: perdona nuestros pecados y recibe nuestra súplica en tu gran compasión, porque nos refugiamos en Ti, Dios misericordioso y todopoderoso. Haz brillar en nuestros corazones el sol verdadero de tu justicia; ilumina nuestra mente y guarda todos nuestros sentidos, para que, caminando con dignidad como de día por el camino de tus mandamientos, lleguemos a la vida eterna, porque en Ti está la fuente de la vida, y seamos dignos de gozar de la luz inaccesible. Porque Tú eres nuestro Dios, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`],
];

export const MAITINES: OfficeSection[] = [
  section('estructura', 'Cómo va', [
    t('El oficio real con los salmos 19 y 20; los Seis Salmos; la gran letanía; «Dios es el Señor» con los troparios; los kathismata del Salterio; los domingos y fiestas, el polieleos, las evlogitarias y el Evangelio de la mañana; el salmo 50; el canon de nueve odas, con el Magníficat antes de la novena; el exapostilario; las Laudes; la Gran Doxología, cantada en domingos y fiestas y leída los demás días; las letanías y la despedida.'),
    rub('En la tradición eslava los Maitines del domingo y de las fiestas se celebran la víspera por la tarde, unidos a las Vísperas, y forman la vigilia de toda la noche. En la griega se celebran por la mañana, antes de la Liturgia.'),
  ]),

  section('comienzo', 'El comienzo y el oficio real', [
    rub('Sacerdote:'),
    t(`Bendito sea nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Comienzo habitual: «Gloria a Ti, oh Dios, gloria a Ti», «Rey celestial», Trisagio y Padre Nuestro (Orar → Oraciones → Comienzo habitual). Señor, ten piedad (doce veces). Gloria, ahora y siempre. Venid, adoremos (tres veces).'),
    rub('Se leen los salmos 19 y 20, que piden por el rey, y que en los días ordinarios abren los Maitines:'),
    psalm(19),
    psalm(20),
    rub('Trisagio, «Santísima Trinidad», Padre Nuestro, y estos troparios. El griego dice «reyes»: estas peticiones vienen del Imperio, y hoy se aplican a quienes gobiernan.'),
    t('Salva, Señor, a tu pueblo y bendice tu heredad, concediendo victorias a los que gobiernan contra los bárbaros, y guardando a tu pueblo con tu Cruz.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Tú, que voluntariamente fuiste elevado en la Cruz, concede tus misericordias, oh Cristo Dios, al nuevo pueblo que lleva tu nombre; alegra con tu poder a los fieles que nos gobiernan, dándoles victoria sobre los enemigos: que tengan tu ayuda, arma de paz, trofeo invencible.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Protección temible que no defrauda: no desprecies, oh Buena, nuestras súplicas, Theotokos digna de toda alabanza; afianza el pueblo de los ortodoxos, salva a los que mandaste gobernar y concédeles desde el cielo la victoria, porque diste a luz a Dios, tú, la única bendita.'),
    rub('El sacerdote dice una letanía breve: «Ten piedad de nosotros, oh Dios, según tu gran misericordia», «Oremos también por los cristianos piadosos y ortodoxos», «Oremos también por nuestro arzobispo N.», con su exclamación. Lector: «En el nombre del Señor, bendice, padre». Sacerdote:'),
    t(`Gloria a la santa, consustancial, vivificante e indivisible Trinidad, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('exapsalmos', 'Los Seis Salmos', [
    rub('Se leen en silencio y a media luz. Está prohibido moverse por la iglesia durante su lectura. Empiezan así:'),
    { kind: 'text', content: 'Gloria a Dios en las alturas, y en la tierra paz, buena voluntad entre los hombres.', times: 3 },
    { kind: 'text', content: 'Señor, abre mis labios, y mi boca proclamará tu alabanza.', times: 2 },
    psalm(3),
    rub('Y de nuevo: «Me acosté y dormí; me desperté, porque el Señor me sostiene».'),
    psalm(37),
    rub('Y de nuevo: «No me abandones, Señor; Dios mío, no te alejes de mí; apresúrate a socorrerme, Señor de mi salvación».'),
    psalm(62),
    rub('Y de nuevo: «En el alba meditaba en Ti, porque te has hecho mi ayuda, y a la sombra de tus alas me alegraré. Mi alma se ha unido a Ti, tu diestra me ha sostenido».'),
    rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Señor, ten piedad (tres veces). Gloria, ahora y siempre.`),
    psalm(87),
    rub('Y de nuevo: «Señor, Dios de mi salvación, de día clamé y de noche ante Ti. Llegue a tu presencia mi oración; inclina tu oído a mi súplica».'),
    psalm(102),
    rub('Y de nuevo: «En todo lugar de su dominio, bendice, alma mía, al Señor».'),
    psalm(142),
    rub('Y de nuevo: «Escúchame, Señor, en tu justicia, y no entres en juicio con tu siervo». «Tu buen Espíritu me guiará por tierra llana».'),
    rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces).`),
  ]),

  section('oraciones-de-la-manana', 'Las doce oraciones de la mañana', [
    rub('Durante los Seis Salmos el sacerdote, ante las puertas santas, lee en voz baja estas doce oraciones. Son el equivalente matutino de las siete oraciones de la luz de las Vísperas, y de las más antiguas del oficio.'),
    ...ORACIONES_DE_LA_MANANA.flatMap(([n, texto]) => [head(n), t(texto)]),
  ], 'sacerdote'),

  section('gran-letania', 'La gran letanía', [
    rub('La misma de las Vísperas y la Liturgia: «En paz, oremos al Señor», con todas sus peticiones (Biblioteca → Oficios → Vísperas). La exclamación:'),
    t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
  ]),

  section('dios-es-el-senor', 'Dios es el Señor', [
    rub('En el tono del tropario del día:'),
    t('Dios es el Señor y se nos ha manifestado; bendito el que viene en el nombre del Señor.'),
    rub('Se repite después de cada versículo:'),
    t('Alabad al Señor, porque es bueno, porque es eterna su misericordia.'),
    t('Todas las naciones me rodearon, y en el nombre del Señor las rechacé.'),
    t('No moriré, sino que viviré y contaré las obras del Señor.'),
    t('La piedra que desecharon los constructores se ha convertido en piedra angular; esto es obra del Señor, y es admirable a nuestros ojos.'),
    rub('Y se canta el tropario del día, dos veces; gloria, y el del santo; ahora y siempre, y el theotokion:'),
    { kind: 'day-troparion', content: 'Tropario del día' },
    rub('En los días ordinarios de Cuaresma, en lugar de «Dios es el Señor» se canta «Aleluya» con los versículos de Isaías 26 y los troparios de la Trinidad.'),
  ]),

  section('kathismata', 'Los kathismata del Salterio', [
    rub('Se leen dos o tres kathismata del Salterio, según el día y el tiempo (Leer → Salterio → Kathismata), y después de cada uno se dicen la pequeña letanía y los kathismata —troparios para sentarse— del Octoecos o del Menaion.'),
    ...PEQUENA_LETANIA,
    rub('Exclamación después del primer kathisma:'),
    t(`Porque tuyo es el poder, y tuyos son el Reino, la fuerza y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}`),
    rub('Después del segundo:'),
    t(`Porque eres Dios bueno y amigo de los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
  ]),

  section('polieleos', 'El polieleos', [
    rub('En las fiestas, y en muchas iglesias todos los domingos, se cantan los salmos 134 y 135 con el estribillo «Aleluya»: es el polieleos, «mucha misericordia», por el estribillo del salmo 135, «porque es eterna su misericordia». Se encienden todas las luces y se abren las puertas santas.'),
    psalm(134),
    psalm(135),
  ]),

  section('evlogitarias', 'Las evlogitarias del domingo', [
    rub('Los domingos, en el tono quinto. Antes de cada estrofa:'),
    ref('Bendito eres, Señor: enséñame tus preceptos.'),
    t('El coro de los ángeles quedó asombrado al verte contado entre los muertos, oh Salvador, tú que destruiste el poder de la muerte, levantaste contigo a Adán y libraste a todos del infierno.'),
    t('¿Por qué mezcláis, discípulas, los ungüentos con lágrimas compasivas? El ángel que resplandecía en el sepulcro dijo a las miróforas: Mirad vosotras el sepulcro y comprended: el Salvador ha resucitado de la tumba.'),
    t('Muy de mañana corrieron las miróforas a tu sepulcro con lamentos; pero el ángel se presentó ante ellas y les dijo: Ha pasado el tiempo del llanto; no lloréis, y anunciad la resurrección a los apóstoles.'),
    t('Las mujeres miróforas, que venían con ungüentos a tu sepulcro, oh Salvador, se lamentaban; pero el ángel les dijo claramente: ¿Por qué contáis entre los muertos al que vive? Porque, como Dios, ha resucitado del sepulcro.'),
    rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo.`),
    t('Adoramos al Padre, y a su Hijo, y al Espíritu Santo, la santa Trinidad en una sola esencia, clamando con los serafines: Santo, santo, santo eres, Señor.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Al dar a luz al dador de la vida, oh Virgen, libraste a Adán del pecado y diste a Eva la alegría en lugar de la tristeza; y el que se encarnó de ti, Dios y hombre, ha devuelto a la vida a los que de ella habían caído.'),
    rub('Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces). Pequeña letanía, y la exclamación «Porque bendito es tu nombre y glorificado tu Reino». Después, la hipakoí del tono, los antífonos graduales y el prokímenon.'),
  ]),

  section('evangelio', 'El Evangelio de la mañana', [
    rub('Diácono: «Oremos al Señor». Sacerdote: «Porque Tú eres santo, Dios nuestro, y descansas en los santos, y a Ti te damos gloria…». Coro: «Amén».'),
    { kind: 'text', content: 'Que todo aliento alabe al Señor.', times: 3 },
    t('Y para que seamos dignos de escuchar el santo Evangelio, roguemos al Señor nuestro Dios.'),
    { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
    t('¡Sabiduría! ¡De pie! Escuchemos el santo Evangelio. Paz a todos.'),
    ref('Y con tu espíritu.'),
    t('Lectura del santo Evangelio según san N. ¡Atendamos!'),
    ref('Gloria a Ti, Señor, gloria a Ti.'),
    rub('Los domingos se lee uno de los once Evangelios de la Resurrección, que se suceden semana tras semana; en las fiestas, el de la fiesta. El sacerdote lo lee desde el altar, por las puertas santas abiertas.'),
    ref('Gloria a Ti, Señor, gloria a Ti.'),
    rub('Los domingos se canta después:'),
    t('Habiendo visto la Resurrección de Cristo, adoremos al santo Señor Jesús, el único sin pecado. Adoramos tu Cruz, oh Cristo, y cantamos y glorificamos tu santa Resurrección: porque Tú eres nuestro Dios, fuera de Ti no conocemos otro, invocamos tu nombre. Venid, fieles todos, adoremos la santa Resurrección de Cristo: porque he aquí que por la Cruz ha venido la alegría al mundo entero. Bendiciendo siempre al Señor, cantamos su Resurrección: porque, soportando por nosotros la Cruz, destruyó la muerte con la muerte.'),
    rub('Se lee el salmo 50:'),
    psalm(50),
    rub('Gloria. En el tono segundo:'),
    t('Por las intercesiones de los apóstoles, oh Misericordioso, borra la multitud de mis culpas.'),
    rub('Ahora y siempre:'),
    t('Por las intercesiones de la Theotokos, oh Misericordioso, borra la multitud de mis culpas.'),
    rub('Versículo: «Ten piedad de mí, oh Dios, según tu gran misericordia, y según la multitud de tus compasiones borra mi iniquidad». En el tono sexto:'),
    t('Jesús, resucitado del sepulcro como había predicho, nos ha dado la vida eterna y la gran misericordia.'),
    rub('En Cuaresma se cantan en su lugar las estiqueras de penitencia: «Ábreme las puertas del arrepentimiento, oh dador de la vida». Después el sacerdote dice la oración «Salva, oh Dios, a tu pueblo», con la conmemoración de los santos, que está entera en la Paráclesis (Biblioteca → Oficios), y se responde «Señor, ten piedad» doce veces.'),
  ]),

  section('canon', 'El canon y los cánticos bíblicos', [
    rub('El canon del día —del Octoecos, del Menaion o del Triodion, a veces dos o tres combinados— se canta en ocho o nueve odas. Cada oda corresponde a un cántico de la Escritura, y en los monasterios y en Cuaresma se canta el cántico entero antes de los troparios. Son éstos:'),
    head('Oda 1 · El cántico de Moisés'),
    reading('Éxodo 15, 1-19'),
    head('Oda 2 · El segundo cántico de Moisés'),
    rub('Sólo en Cuaresma.'),
    reading('Deuteronomio 32, 1-43'),
    head('Oda 3 · La oración de Ana'),
    reading('1 Samuel 2, 1-10'),
    head('Oda 4 · La oración de Habacuc'),
    reading('Habacuc 3, 2-19'),
    head('Oda 5 · La oración de Isaías'),
    reading('Isaías 26, 9-20'),
    rub('Después de la tercera oda se dicen la pequeña letanía y el kathisma del canon.'),
    head('Oda 6 · La oración de Jonás'),
    reading('Jonás 2, 3-10'),
    rub('Después de la sexta oda, la pequeña letanía, el kontakion y el ikos del día y el sinaxario, la lectura de las vidas de los santos del día (en ATHOS, en Calendario y en Santos).'),
    head('Oda 7 · La oración de los tres jóvenes'),
    reading('Daniel (texto griego) 3, 26-56'),
    head('Oda 8 · El himno de los tres jóvenes'),
    reading('Daniel (texto griego) 3, 57-88'),
    rub('Antes del irmos de la octava oda se canta «Alabamos, bendecimos y adoramos al Señor». Los cánticos de Daniel se leen del texto griego, que es el que trae la Biblia de la Iglesia y el que no tienen las Biblias hechas sobre el hebreo.'),
  ]),

  section('magnificat', 'El Magníficat', [
    rub('Antes de la novena oda, el diácono inciensa y exclama: «A la Theotokos y Madre de la Luz honrémosla con himnos y engrandezcámosla». Y se canta el cántico de la Virgen, intercalando después de cada versículo:'),
    ref('Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin corrupción diste a luz a Dios Verbo, verdadera Theotokos, te engrandecemos.'),
    reading('Lucas 1, 46-55'),
    rub('Sigue la novena oda del canon. En los días ordinarios, después del irmos final, se canta «Digno es en verdad». En las grandes fiestas no se canta el Magníficat: la novena oda lleva sus propios estribillos.'),
    head('El cántico de Zacarías'),
    rub('Cuando se canta la novena oda bíblica entera, al Magníficat le sigue el cántico de Zacarías, padre del Precursor:'),
    reading('Lucas 1, 68-79'),
  ]),

  section('despues-del-canon', 'Después del canon', [
    ...PEQUENA_LETANIA,
    rub('Sacerdote:'),
    t(`Porque te alaban todas las potestades de los cielos, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('Los domingos se canta tres veces «Santo es el Señor, nuestro Dios», y se canta el exapostilario del día: los domingos, el que corresponde al Evangelio de la mañana.'),
  ]),

  section('laudes', 'Las Laudes', [
    rub('Se cantan los salmos 148, 149 y 150, «las alabanzas». Empiezan así, en el tono del día:'),
    ref('Que todo aliento alabe al Señor. Alabad al Señor desde los cielos, alabadle en las alturas: a Ti se debe el himno, oh Dios.'),
    psalm(148),
    psalm(149),
    psalm(150),
    rub('En los últimos versículos se intercalan las estiqueras del día. Los domingos, el doxastikón es el evangélico, el que corresponde al Evangelio de la mañana, y el theotokion es siempre éste:'),
    t('Bendita eres sobre todas, oh Virgen Theotokos, porque por el que se encarnó de ti el infierno ha sido cautivado, Adán ha sido llamado de nuevo, la maldición ha quedado abolida, Eva ha sido liberada, la muerte ha muerto y nosotros hemos recibido la vida. Por eso, cantando, clamamos: Bendito eres, Cristo nuestro Dios, que así te has complacido: gloria a Ti.'),
  ]),

  section('gran-doxologia', 'La Gran Doxología', [
    rub('Los domingos y fiestas el sacerdote exclama: «Gloria a Ti, que nos has mostrado la luz», y el coro canta la Gran Doxología. Los demás días la lee el lector, sin canto, y termina de otro modo.'),
    t('Gloria a Dios en las alturas, y en la tierra paz, buena voluntad entre los hombres.'),
    t('Te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias por tu gran gloria.'),
    t('Señor, Rey, Dios celestial, Padre todopoderoso; Señor, Hijo unigénito, Jesucristo, y Espíritu Santo.'),
    t('Señor Dios, Cordero de Dios, Hijo del Padre, que quitas el pecado del mundo, ten piedad de nosotros; Tú que quitas los pecados del mundo.'),
    t('Recibe nuestra súplica, Tú que estás sentado a la derecha del Padre, y ten piedad de nosotros.'),
    t('Porque sólo Tú eres santo, sólo Tú eres Señor, Jesucristo, para gloria de Dios Padre. Amén.'),
    t('Cada día te bendeciré y alabaré tu nombre por los siglos y por los siglos de los siglos.'),
    t('Concédenos, Señor, guardarnos sin pecado este día.'),
    t('Bendito eres, Señor, Dios de nuestros padres, y alabado y glorificado es tu nombre por los siglos. Amén.'),
    t('Que tu misericordia, Señor, venga sobre nosotros, como hemos esperado en Ti.'),
    { kind: 'text', content: 'Bendito eres, Señor: enséñame tus preceptos.', times: 3 },
    t('Señor, Tú has sido nuestro refugio de generación en generación. Yo dije: Señor, ten piedad de mí, sana mi alma, porque he pecado contra Ti.'),
    t('Señor, en Ti me refugio: enséñame a hacer tu voluntad, porque Tú eres mi Dios.'),
    t('Porque en Ti está la fuente de la vida, y en tu luz veremos la luz. Extiende tu misericordia a los que te conocen.'),
    ref('Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros. <em>(tres veces)</em>'),
    rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén. Santo Inmortal, ten piedad de nosotros. Y con voz más alta: Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.`),
    head('El tropario del domingo'),
    rub('Los domingos se canta, según el tono de la semana, uno de estos dos. En los tonos primero, tercero, quinto y séptimo:'),
    t('Hoy ha llegado la salvación al mundo. Cantemos al que resucitó del sepulcro, autor de nuestra vida: porque, destruyendo la muerte con la muerte, nos ha dado la victoria y la gran misericordia.'),
    rub('En los tonos segundo, cuarto, sexto y octavo:'),
    t('Resucitado del sepulcro y rotas las cadenas del infierno, deshiciste la condena de la muerte, Señor, librando a todos de las trampas del enemigo; manifestándote a tus apóstoles, los enviaste a predicar, y por ellos diste tu paz al mundo, oh único lleno de misericordia.'),
    rub('Los días ordinarios, en lugar de cantarla, se lee: la Doxología termina con «A Ti se debe la alabanza, a Ti se debe el himno, a Ti se debe la gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén».'),
  ]),

  section('letanias-finales', 'Las letanías de la mañana', [
    rub('Los domingos y fiestas, primero la letanía ferviente:'),
    t('Digamos todos con toda el alma y con todo el entendimiento, digamos.'),
    ...LETANIA_FERVIENTE,
    rub('Después, la letanía de la mañana. Diácono:'),
    t('Completemos nuestra oración de la mañana al Señor.'),
    SENOR,
    t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
    SENOR,
    t('Pidamos al Señor que todo el día sea perfecto, santo, pacífico y sin pecado.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor un ángel de paz, guía fiel y guardián de nuestras almas y de nuestros cuerpos.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor el perdón y la remisión de nuestros pecados y de nuestras faltas.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor lo que es bueno y provechoso para nuestras almas, y la paz para el mundo.'),
    ref('Concédelo, Señor.'),
    t('Pidamos al Señor acabar en paz y en arrepentimiento el tiempo que nos queda de vida.'),
    ref('Concédelo, Señor.'),
    t('Pidamos un final de nuestra vida cristiano, sin dolor, sin vergüenza y en paz, y una buena defensa ante el temible tribunal de Cristo.'),
    ref('Concédelo, Señor.'),
    t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
    ref('A Ti, Señor.'),
    rub('Sacerdote:'),
    t(`Porque eres Dios de misericordia, de compasión y de amor a los hombres, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
    AMEN,
    t('Paz a todos.'),
    ref('Y con tu espíritu.'),
    rub('Diácono: «Inclinemos la cabeza ante el Señor». Coro: «A Ti, Señor». Sacerdote, en voz baja, la oración de la inclinación:'),
    t(`Señor santo, que habitas en las alturas y miras lo humilde, y con tu ojo que todo lo ve contemplas toda la creación: ante Ti hemos inclinado el cuello del alma y del cuerpo, y te suplicamos, Santo de los santos: extiende tu mano invisible desde tu santa morada y bendícenos a todos; y si en algo hemos pecado, voluntaria o involuntariamente, perdónanos, porque eres Dios bueno y amigo de los hombres, y concédenos tus bienes de este mundo y los de más allá. Porque a Ti te corresponde tener piedad de nosotros y salvarnos, Dios nuestro, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`),
  ]),

  section('aposticas', 'Las apósticas de los días ordinarios', [
    rub('Los días ordinarios, en lugar de la Doxología cantada, se cantan las estiqueras de las apósticas del día, con los versículos de las Vísperas. Después, el lector:'),
    t('Bueno es alabar al Señor y cantar a tu nombre, Altísimo; anunciar por la mañana tu misericordia, y tu fidelidad por la noche.'),
    rub('Trisagio, «Santísima Trinidad», Padre Nuestro, el tropario del día y, en los días ordinarios, la letanía ferviente.'),
  ]),

  section('despedida', 'La despedida', [
    rub('Diácono:'),
    t('¡Sabiduría!'),
    rub('Lector: «Bendice». Sacerdote:'),
    t(`Bendito el que es, Cristo, nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    rub('Lector:'),
    t('Que el Señor Dios afiance la fe santa e inmaculada de los cristianos piadosos y ortodoxos, junto con su santa Iglesia y esta ciudad, por los siglos de los siglos. Amén.'),
    rub('Gloria, ahora y siempre. Señor, ten piedad (tres veces). Santo señor, bendice. Sacerdote:'),
    t('Gloria a Ti, oh Dios, esperanza nuestra; Señor, gloria a Ti.'),
    t('Cristo, nuestro Dios verdadero (el domingo: que resucitó de entre los muertos), por las intercesiones de su purísima y del todo inmaculada santa Madre, de los santos, gloriosos y dignos de toda alabanza apóstoles, del santo de este templo, del santo del día y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno y amigo de los hombres.'),
    t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
    AMEN,
    rub('Si sigue la Liturgia, a la despedida de los Maitines le siguen en muchas iglesias la Hora Prima o la Tercia y la Sexta.'),
  ]),
];
