/**
 * Las Completas, Pequeñas y Grandes, enteras.
 *
 * Hasta la versión 1.25 ATHOS tenía de las Completas Pequeñas las oraciones
 * finales y una descripción de las Grandes. Ahora están las dos enteras.
 *
 * Al cotejarlas con el Horologion salieron dos errores, que se corrigen aquí:
 * los troparios «Ten piedad de nosotros, Señor» no son de las Completas
 * Pequeñas, sino de la segunda parte de las Grandes; y la oración de san
 * Basilio «Señor, Señor, que nos libraste de toda saeta» cierra la primera
 * parte de las Grandes, no las Pequeñas. La oración de san Juan Damasceno
 * ante el lecho no es del oficio, sino de las oraciones antes de dormir, y
 * así se dice.
 *
 * Traducido del Horologion griego (glt.goarch.org, «Μικρὸν Ἀπόδειπνον» y
 * «Μέγα Ἀπόδειπνον»). Lo que sólo tiene el uso eslavo —los troparios de cada
 * día de la semana, la oración por los que nos odian— se ha traducido del
 * Chasoslov eslavo. Los salmos no se copian: se muestran tomados del Salterio
 * de ATHOS. La traducción es de ATHOS y no procede de ningún libro litúrgico
 * español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';
import { TODA_HORA } from './horas';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';
const GLORIA = rub(`Gloria al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`);
const KYRIE_40: TextBlock = { kind: 'text', content: 'Señor, ten piedad.', times: 40 };
const TRADUCCION = rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.');
const TRADUCCION_ESLAVO = rub('Traducción para ATHOS a partir del eslavo eclesiástico; no procede de un libro litúrgico español publicado.');

/** «Venid, adoremos», con que empieza cada parte. */
const VENID: TextBlock[] = [
  t('Venid, adoremos y postrémonos ante nuestro Rey y Dios.'),
  t('Venid, adoremos y postrémonos ante Cristo, nuestro Rey y Dios.'),
  t('Venid, adoremos y postrémonos ante el mismo Cristo, nuestro Rey y nuestro Dios.'),
];

/** Trisagio, «Santísima Trinidad» y Padre Nuestro. */
const TRISAGIO: TextBlock[] = [
  { kind: 'text', content: 'Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.', times: 3 },
  GLORIA,
  t('Santísima Trinidad, ten piedad de nosotros. Señor, purifica nuestros pecados. Soberano, perdona nuestras iniquidades. Santo, visita y sana nuestras enfermedades, por tu nombre.'),
  { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
  GLORIA,
  t('Padre nuestro, que estás en los cielos: santificado sea tu nombre; venga tu Reino; hágase tu voluntad, así en la tierra como en el cielo. El pan nuestro de cada día dánoslo hoy; y perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del maligno.'),
  rub(`Sacerdote: «Porque tuyos son el Reino, el poder y la gloria, del Padre, y del Hijo, y del Espíritu Santo, ${POR_LOS_SIGLOS}». Sin sacerdote se dice: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Amén.`),
];

const SIMBOLO: TextBlock[] = [
  t('Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible.'),
  t('Y en un solo Señor Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, consustancial al Padre, por quien todo fue hecho; que por nosotros los hombres y por nuestra salvación bajó de los cielos, y se encarnó del Espíritu Santo y de María la Virgen, y se hizo hombre; y fue crucificado por nosotros bajo Poncio Pilato, y padeció y fue sepultado; y resucitó al tercer día según las Escrituras, y subió a los cielos y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin.'),
  t('Y en el Espíritu Santo, Señor y dador de vida, que procede del Padre, que junto con el Padre y el Hijo recibe una misma adoración y gloria, que habló por los profetas.'),
  t('Y en la Iglesia, una, santa, católica y apostólica.'),
  t('Confieso un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del siglo venidero. Amén.'),
];

const MAS_HONORABLE = t('Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.');

/** El cierre de la primera y la segunda parte de las Grandes. */
const CIERRE_DE_PARTE: TextBlock[] = [
  KYRIE_40,
  GLORIA,
  MAS_HONORABLE,
  t('En el nombre del Señor, bendice, padre.'),
  rub('Sacerdote:'),
  t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
  ref('Amén.'),
];

const PABLO_EVERGETINO: TextBlock[] = [
  t('Inmaculada, incontaminada, incorrupta, purísima y casta Virgen, Esposa de Dios y Soberana, que por tu admirable alumbramiento uniste a Dios Verbo con los hombres y juntaste con las cosas del cielo la naturaleza caída de nuestro linaje; única esperanza de los desesperados y auxilio de los combatidos, pronta protección de los que acuden a ti y refugio de todos los cristianos: no me desprecies a mí, pecador y manchado, que con pensamientos, palabras y obras vergonzosas me he hecho inútil del todo y, por pereza de la mente, me he vuelto esclavo de los placeres de la vida.'),
  t('Antes bien, como Madre del Dios que ama a los hombres, ten compasión de mí, pecador y pródigo, y acoge esta súplica que te ofrezco con labios impuros. Usando de tu confianza de madre, pide a tu Hijo, Soberano y Señor nuestro, que me abra las entrañas compasivas de su bondad, que pase por alto mis faltas incontables y me convierta al arrepentimiento, y me haga cumplidor probado de sus mandamientos. Y quédate siempre a mi lado, como misericordiosa, compasiva y amante del bien; sé en esta vida mi defensora ardiente y auxiliadora, apartando los asaltos de los enemigos y guiándome hacia la salvación; y en la hora de mi muerte abraza mi alma desdichada y aleja de ella las tenebrosas apariencias de los espíritus malignos.'),
  t('Y en el día terrible del juicio líbrame del castigo eterno, y muéstrame heredero de la gloria inefable de tu Hijo y Dios nuestro; alcánzalo, Señora mía, santísima Theotokos, por tu intercesión y tu amparo, por la gracia y el amor a los hombres de tu Hijo unigénito, Señor y Dios y Salvador nuestro Jesucristo, a quien corresponde toda gloria, honor y adoración, con su Padre sin principio y su santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
];

const ANTIOCO: TextBlock[] = [
  t('Y danos, Soberano, al ir a dormir, descanso de cuerpo y alma; y guárdanos del sombrío sueño del pecado y de todo placer oscuro de la noche. Aplaca los ímpetus de las pasiones, apaga los dardos encendidos del maligno que vienen contra nosotros con engaño. Calma las rebeliones de nuestra carne y adormece todo pensamiento nuestro terreno y material.'),
  t('Y concédenos, oh Dios, mente vigilante, pensamiento casto, corazón sobrio, y un sueño ligero y libre de toda fantasía del enemigo. Levántanos a la hora de la oración afianzados en tus mandamientos y guardando firme dentro de nosotros el recuerdo de tus juicios. Concédenos glorificarte toda la noche, para que cantemos, bendigamos y glorifiquemos tu nombre honorabilísimo y magnífico, del Padre, y del Hijo, y del Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
];

const ESPERANZA: TextBlock[] = [
  t('Gloriosísima, siempre Virgen, bendita Theotokos: presenta nuestra oración a tu Hijo y Dios nuestro, y pídele que por ti salve nuestras almas.'),
  rub('Oración de san Joanicio el Grande:'),
  ref('Mi esperanza es el Padre, mi refugio el Hijo, mi protección el Espíritu Santo. Trinidad Santa, gloria a Ti.'),
  t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
];

/** Las peticiones por todos con que acaban las dos Completas. */
const POR_TODOS: TextBlock[] = [
  rub('El sacerdote, o quien preside, va diciendo, y a cada petición se responde «Señor, ten piedad»:'),
  t('Oremos por la paz del mundo.'),
  t('Por los cristianos piadosos y ortodoxos.'),
  t('Por nuestro arzobispo N. y por toda nuestra hermandad en Cristo.'),
  t('Por nuestro país y por los que lo protegen.'),
  t('Por nuestros padres y hermanos ausentes.'),
  t('Por los que nos sirven y nos han servido.'),
  t('Por los que nos odian y por los que nos aman.'),
  t('Por los que nos han pedido a nosotros, indignos, que oremos por ellos.'),
  t('Por la liberación de los cautivos.'),
  t('Por los que navegan, que lleguen a buen puerto.'),
  t('Por los que yacen enfermos.'),
  t('Oremos también por la abundancia de los frutos de la tierra.'),
  t('Y por todos nuestros padres y hermanos que se durmieron antes que nosotros, los que reposan aquí piadosamente y los ortodoxos de todas partes.'),
  t('Digamos también por nosotros mismos:'),
  { kind: 'text', content: 'Señor, ten piedad.', times: 3 },
  rub('Sacerdote:'),
  t('Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos.'),
  ref('Amén.'),
];

export const COMPLETAS: OfficeSection[] = [
  section('que-es', 'Pequeñas y Grandes', [
    t('Apódeipnon significa literalmente «después de la cena», y eso es: la última oración del día, hecha ya en casa o en el monasterio, antes de acostarse. No es un oficio de la iglesia catedral sino de la celda, y se nota en su tono: casi todo él está en primera persona del singular.'),
    t('Hay dos formas. Las Completas Pequeñas son las de uso diario. Las Grandes se rezan en la Gran Cuaresma y en las vigilias de las grandes fiestas: son mucho más largas, están divididas en tres partes y llevan el canto «Dios está con nosotros».'),
    rub('Primero van las Completas Pequeñas, enteras. Las Grandes empiezan en la sección «Completas Grandes».'),
  ]),

  /* ---------------- Las Completas Pequeñas ---------------- */

  section('comienzo', 'Comienzo', [
    rub('Sacerdote:'),
    t(`Bendito sea nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    ref('Amén.'),
    rub('Sin sacerdote se empieza: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos. Amén».'),
    t('Gloria a Ti, Dios nuestro, gloria a Ti.'),
    t('Rey celestial, Consolador, Espíritu de verdad, que estás en todo lugar y todo lo llenas, tesoro de bienes y dador de vida: ven y habita en nosotros, purifícanos de toda mancha y salva, oh Bueno, nuestras almas.'),
    ...TRISAGIO,
    { kind: 'text', content: 'Señor, ten piedad.', times: 12 },
    GLORIA,
    ...VENID,
  ]),

  section('salmos', 'Los tres salmos', [
    rub('Se leen seguidos, sin canto, tres salmos que dicen lo mismo de tres maneras: el 50, el 69 y el 142.'),
    rub('El 50 es el de la penitencia, el mismo que abre casi todos los oficios. El 69 es un grito breve: «Dios mío, ven en mi auxilio». El 142 es la última súplica del día: «No entres en juicio con tu siervo».'),
    psalm(50),
    psalm(69),
    psalm(142),
  ]),

  section('doxologia', 'La doxología', [
    rub('Se lee, sin canto, la doxología de los días ordinarios, la misma que en Maitines, pero pidiendo la noche en lugar del día:'),
    t('Gloria a Dios en las alturas, y en la tierra paz, buena voluntad entre los hombres.'),
    t('Te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias por tu gran gloria.'),
    t('Señor, Rey, Dios celestial, Padre todopoderoso; Señor, Hijo unigénito, Jesucristo, y Espíritu Santo.'),
    t('Señor Dios, Cordero de Dios, Hijo del Padre, que quitas el pecado del mundo, ten piedad de nosotros; Tú que quitas los pecados del mundo.'),
    t('Recibe nuestra súplica, Tú que estás sentado a la derecha del Padre, y ten piedad de nosotros.'),
    t('Porque sólo Tú eres santo, sólo Tú eres Señor, Jesucristo, para gloria de Dios Padre. Amén.'),
    t('Cada día te bendeciré y alabaré tu nombre por los siglos y por los siglos de los siglos.'),
    rub('El eslavo dice aquí «cada noche».'),
    t('Señor, Tú has sido nuestro refugio de generación en generación. Yo dije: Señor, ten piedad de mí, sana mi alma, porque he pecado contra Ti.'),
    t('Señor, en Ti me refugio: enséñame a hacer tu voluntad, porque Tú eres mi Dios.'),
    t('Porque en Ti está la fuente de la vida, y en tu luz veremos la luz. Extiende tu misericordia a los que te conocen.'),
    t('Concédenos, Señor, guardarnos sin pecado esta noche. Bendito eres, Señor, Dios de nuestros padres, y alabado y glorificado es tu nombre por los siglos. Amén.'),
    t('Que tu misericordia, Señor, venga sobre nosotros, como hemos esperado en Ti.'),
    t('Bendito eres, Señor: enséñame tus preceptos. Bendito eres, Soberano: hazme entender tus preceptos. Bendito eres, Santo: ilumíname con tus preceptos.'),
    t('Señor, tu misericordia es eterna: no desprecies la obra de tus manos. A Ti se debe la alabanza, a Ti se debe el himno, a Ti se debe la gloria, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),

  section('simbolo', 'Símbolo de la Fe', [
    rub('Se recita entero. Que el Credo aparezca aquí, dicho en voz baja antes de dormir, y no sólo en la Liturgia, dice bastante sobre lo que la Iglesia entiende por profesar la fe.'),
    ...SIMBOLO,
  ]),

  section('canon', 'El canon', [
    rub('En el uso eslavo se lee aquí un canon, que cambia según el día: el de la Theotokos del Octoecos en el tono de la semana, a veces con el del santo del Menaion. El Horologion griego no lo pone en las Completas Pequeñas, y en la tradición griega se suele pasar directamente al Trisagio.'),
    rub('Quien reza las Completas en casa puede leer aquí cualquiera de los cánones que están enteros en Biblioteca → Cánones: la Paráclesis a la Theotokos, el canon al Ángel de la Guarda o, la víspera de comulgar, el de la Comunión.'),
    rub('Terminado el canon, en el uso eslavo:'),
    t('Digno es en verdad bendecirte a ti, Theotokos, siempre bienaventurada y purísima, y Madre de nuestro Dios. Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.'),
  ]),

  section('trisagio-troparios', 'Trisagio y troparios', [
    ...TRISAGIO,
    rub('Se dice el tropario del santo del día o de la iglesia. Si es fiesta, sólo el kontakion de la fiesta. Si no, en el Horologion griego, éstos, en el tono cuarto:'),
    t('Dios de nuestros padres, que obras siempre con nosotros según tu clemencia: no apartes de nosotros tu misericordia, sino que, por sus súplicas, guía en paz nuestra vida.'),
    t('Adornada con la sangre de tus mártires de todo el mundo como con púrpura y lino fino, tu Iglesia te clama por ellos, Cristo Dios: envía tus compasiones a tu pueblo, da la paz a tu ciudad, y a nuestras almas la gran misericordia.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo. En el tono octavo:'),
    t('Con los santos da descanso, Cristo, a las almas de tus siervos, donde no hay dolor, ni tristeza, ni gemido, sino vida sin fin.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Por la intercesión, Señor, de todos los santos y de la Theotokos, danos tu paz y ten piedad de nosotros, porque eres el único compasivo.'),
    TRADUCCION,
    rub('El Chasoslov eslavo da para cada noche de la semana un tropario antes de éstos. El domingo por la noche, el de los arcángeles, en el tono cuarto:'),
    t('Jefes de los ejércitos celestiales, os suplicamos siempre nosotros, indignos, que con vuestras súplicas nos protejáis al amparo de las alas de vuestra gloria inmaterial, guardándonos a los que caemos ante vosotros y clamamos con insistencia: libradnos de los peligros, capitanes de las potestades de lo alto.'),
    rub('El lunes por la noche, el del Precursor, en el tono segundo:'),
    t('La memoria del justo se celebra con alabanzas; a ti, Precursor, te basta el testimonio del Señor. Porque te mostraste en verdad más venerable que los profetas, pues fuiste digno de bautizar en las corrientes a Aquel a quien anunciabas. Por eso, habiendo combatido por la verdad, anunciaste con alegría también a los del Hades a Dios manifestado en la carne, que quita el pecado del mundo y nos concede la gran misericordia.'),
    rub('El martes y el jueves por la noche, el de la Cruz, en el tono primero:'),
    t('Salva, Señor, a tu pueblo y bendice tu heredad; concede la victoria sobre el adversario, y guarda a los tuyos por el poder de tu Cruz.'),
    rub('El miércoles por la noche, el de los apóstoles, en el tono tercero, y el de san Nicolás, en el cuarto:'),
    t('Santos apóstoles, interceded ante Dios misericordioso para que conceda a nuestras almas el perdón de los pecados.'),
    t('Regla de fe, imagen de mansedumbre y maestro de templanza te mostró a tu rebaño la verdad de las cosas. Por eso alcanzaste por la humildad lo alto y por la pobreza lo rico. Padre y jerarca Nicolás, intercede ante Cristo Dios para que salve nuestras almas.'),
    rub('El viernes por la noche, en lugar de los troparios de arriba, éstos. El de todos los santos, en el tono segundo:'),
    t('Apóstoles, mártires y profetas, jerarcas, monjes y justos, que llevasteis a buen término el combate y guardasteis la fe, y tenéis confianza ante el Salvador: rogadle, porque es bueno, que salve nuestras almas, os lo suplicamos.'),
    rub('Gloria: «Con los santos da descanso». Ahora y siempre, en el mismo tono:'),
    t('Como primicias de la naturaleza, el universo te ofrece, Señor, Plantador de la creación, a los mártires portadores de Dios: por sus súplicas, y por la Theotokos, guarda en paz profunda a tu Iglesia, a tu ciudad, oh lleno de misericordia.'),
    TRADUCCION_ESLAVO,
  ]),

  section('toda-hora', 'Oración de toda hora', [
    KYRIE_40,
    rub('La misma oración que se dice en las cuatro Horas:'),
    ...TODA_HORA,
  ]),

  section('theotokos-noche', 'Oración a la Theotokos', [
    rub('De Pablo, monje del monasterio de la Theotokos Evergetis, en Constantinopla, en el siglo XI:'),
    ...PABLO_EVERGETINO,
    TRADUCCION,
  ]),

  section('antioco', 'Oración a Cristo', [
    rub('De Antíoco, monje de la laura de San Sabas, en el siglo VII:'),
    ...ANTIOCO,
    TRADUCCION,
  ]),

  section('esperanza', 'Mi esperanza', [
    ...ESPERANZA,
    rub('Sacerdote: «Gloria a Ti, Cristo Dios, esperanza nuestra, gloria a Ti». Y la despedida: «Cristo, nuestro Dios verdadero, por las intercesiones de su purísima Madre, de nuestros venerables padres portadores de Dios y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno y amigo de los hombres». Amén.'),
  ]),

  section('perdon', 'El perdón mutuo', [
    rub('Las Completas no terminan con una bendición sino con una petición de perdón, que en los monasterios se hace en voz alta y con una postración. Es lo último que se dice en el día. Quien preside dice:'),
    t('Bendecid, padres santos, y perdonadme a mí, pecador, todo aquello en que he pecado hoy de palabra, de obra, de pensamiento y con todos mis sentidos.'),
    rub('Y se responde:'),
    t('Dios te perdone, padre santo.'),
    rub('En las casas se dice igual, unos a otros: «Perdonadme, padres y hermanos, a mí, pecador». «Dios te perdone, hermano, y tenga piedad de nosotros».'),
    ...POR_TODOS,
    rub('Después, en los monasterios, cada uno pide perdón a quien preside y se retira a su celda diciendo esta oración, que en el libro eslavo está para que la diga todo el mundo:'),
    t('Perdona, Señor amigo de los hombres, a los que nos odian y nos hacen daño. Haz bien a los que nos hacen bien. Concede a nuestros hermanos y familiares lo que piden para su salvación, y la vida eterna. Visita a los enfermos y dales la curación. Guía a los que están en el mar. Acompaña a los que viajan. Concede el perdón de los pecados a los que nos sirven y tienen misericordia de nosotros. A los que nos han pedido a nosotros, indignos, que oremos por ellos, ten piedad de ellos según tu gran misericordia.'),
    t('Acuérdate, Señor, de nuestros padres y hermanos que se durmieron antes, y dales descanso donde brilla la luz de tu rostro. Acuérdate, Señor, de nuestros hermanos cautivos, y líbralos de toda adversidad. Acuérdate, Señor, de los que traen ofrendas y hacen el bien en tus santas iglesias, y dales lo que piden para su salvación, y la vida eterna. Acuérdate, Señor, también de nosotros, tus siervos humildes, pecadores e indignos; ilumina nuestra mente con la luz de tu conocimiento y guíanos por el sendero de tus mandamientos, por las oraciones de nuestra purísima Señora, la Theotokos y siempre Virgen María, y de todos tus santos, porque bendito eres por los siglos de los siglos. Amén.'),
    TRADUCCION_ESLAVO,
    rub('Después no se habla más hasta el día siguiente. La regla del silencio nocturno no es un castigo: es lo que hace posible que la última palabra del día sea ésa y no otra.'),
  ]),

  section('damasceno', 'Al acostarse', [
    rub('No es parte del oficio: es una de las oraciones antes de dormir del libro de oración eslavo, y muchos la dicen ya en el lecho, después de las Completas. Es de san Juan Damasceno:'),
    t('Soberano amante de los hombres: ¿será este lecho mi sepulcro, o iluminarás todavía con otro día mi alma miserable? He aquí que el sepulcro está delante de mí, he aquí que la muerte se me presenta. Tu juicio temo, Señor, y el castigo sin fin; y sin embargo no dejo de hacer el mal. A Ti, Señor Dios mío, te irrito continuamente, y a tu Madre purísima, y a todas las Potestades celestiales, y a mi santo ángel custodio.'),
    t('Sé, Señor, que soy indigno de tu amor a los hombres, y que merezco toda condena y todo castigo. Pero, Señor, quieras o no, sálvame. Porque salvar a un justo no tiene mérito, ni es maravilla tener piedad de los puros, que son dignos de tu misericordia; muestra en mí, pecador, la maravilla de tu piedad. En eso se manifiesta tu amor a los hombres: en que mi maldad no venza tu bondad y tu misericordia, que no tienen medida. Y dispón de mí como quieras.'),
    TRADUCCION,
  ]),

  /* ---------------- Las Completas Grandes ---------------- */

  section('grandes', 'Completas Grandes', [
    t('Se rezan en la Gran Cuaresma, de lunes a jueves, y en las vigilias de Navidad, Teofanía y Anunciación. Duran más de una hora y están divididas en tres partes, cada una con su propio comienzo y su propio final, de modo que pueden separarse.'),
    rub('En la primera semana de la Cuaresma, de lunes a jueves, se lee en la tercera parte el Gran Canon de san Andrés de Creta repartido en cuatro noches (Biblioteca → Cánones → Gran Canon).'),
    head('Primera parte'),
    rub('Se empieza como las Completas Pequeñas: «Bendito sea nuestro Dios», «Rey celestial», el Trisagio, el Padre Nuestro, doce veces «Señor, ten piedad» y «Venid, adoremos». Siguen tres salmos:'),
    psalm(4),
    psalm(6),
    psalm(12),
    rub('Se repite el versículo: «Ilumina mis ojos, no sea que me duerma en la muerte; no sea que diga mi enemigo: He prevalecido contra él». Gloria, ahora y siempre. Aleluya, aleluya, aleluya, gloria a Ti, oh Dios (tres veces), con postraciones. Y otros tres salmos:'),
    psalm(24),
    psalm(30),
    psalm(90),
    rub('Gloria, ahora y siempre. Aleluya (tres veces). Señor, ten piedad (tres veces). Gloria, ahora y siempre.'),
  ]),

  section('dios-con-nosotros', 'Dios está con nosotros', [
    rub('Versículos de Isaías, capítulos 8 y 9, en la versión griega de los Setenta. Fuera de la Cuaresma se leen sin canto; en la Cuaresma los cantan los dos coros alternándose, despacio y a toda voz, en el tono sexto. Después de cada versículo se repite:'),
    ref('Porque Dios está con nosotros.'),
    t('Dios está con nosotros: sabedlo, naciones, y sed vencidas.'),
    t('Escuchad hasta los confines de la tierra.'),
    t('Vosotros, los poderosos, sed vencidos.'),
    t('Porque si de nuevo os hacéis fuertes, de nuevo seréis vencidos.'),
    t('Y el designio que tracéis, el Señor lo deshará.'),
    t('Y la palabra que digáis no se mantendrá entre vosotros.'),
    t('No temeremos lo que vosotros teméis ni nos turbaremos.'),
    t('Al Señor, nuestro Dios, a Él santifiquemos, y Él será nuestro temor.'),
    t('Y si en Él pongo mi confianza, será para mí santificación.'),
    t('Y confiaré en Él, y por Él seré salvado.'),
    t('Heme aquí, yo y los hijos que Dios me ha dado.'),
    t('El pueblo que andaba en tinieblas vio una gran luz.'),
    t('Vosotros, los que habitáis en la región y en la sombra de la muerte: una luz brillará sobre nosotros.'),
    t('Porque un niño nos ha nacido, un hijo nos ha sido dado.'),
    t('Cuyo principado está sobre su hombro.'),
    t('Y su paz no tiene límite.'),
    t('Y su nombre será llamado Ángel del Gran Consejo.'),
    t('Consejero admirable.'),
    t('Dios fuerte, Soberano, Príncipe de la paz.'),
    t('Padre del siglo venidero.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo. Porque Dios está con nosotros. Ahora y siempre, y por los siglos de los siglos. Amén. Porque Dios está con nosotros. Y al final, todo seguido:'),
    t('Dios está con nosotros: sabedlo, naciones, y sed vencidas, porque Dios está con nosotros.'),
    rub('Donde la Biblia hebrea, y con ella la Reina-Valera, dice «Admirable, Consejero, Dios fuerte», los Setenta dicen «Ángel del Gran Consejo»: de ahí viene el título con que los iconos rotulan a veces a Cristo.'),
    head('Los troparios de la noche'),
    rub('El lector, sin canto:'),
    t('Pasado el día, te doy gracias, Señor. Te pido que la tarde, con la noche, sea sin pecado: concédemelo, Salvador, y sálvame.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Transcurrido el día, te glorifico, Soberano. Te pido que la tarde, con la noche, sea sin tropiezo: concédemelo, Salvador, y sálvame.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Atravesado el día, te canto, oh Santo. Te pido que la tarde, con la noche, esté libre de asechanzas: concédemelo, Salvador, y sálvame.'),
    head('El himno de los ángeles'),
    rub('Los dos coros juntos, en el tono sexto:'),
    t('La naturaleza incorpórea, los querubines, te glorifica con himnos que no callan.'),
    t('Los seres de seis alas, los serafines, te ensalzan con voces incesantes.'),
    t('Y todo el ejército de los ángeles te aclama con cantos tres veces santos.'),
    t('Porque antes de todas las cosas existes Tú, el Padre que es, y tienes contigo, sin principio como Tú, a tu Hijo.'),
    t('Y, llevando contigo, igual en honor, al Espíritu de vida, muestras indivisible a la Trinidad.'),
    t('Santísima Virgen, Madre de Dios, y vosotros, testigos oculares y servidores del Verbo,'),
    t('y todos los coros de los profetas y de los mártires, que tenéis la vida inmortal:'),
    t('interceded con insistencia por todos, porque todos estamos en peligro,'),
    t('para que, librados del engaño del maligno, cantemos el himno de los ángeles:'),
    t('Santo, Santo, Santo, tres veces santo Señor, ten piedad de nosotros y sálvanos. Amén.'),
    TRADUCCION,
  ]),

  section('grandes-intercesion', 'El Símbolo y las invocaciones', [
    rub('Se recita el Símbolo de la Fe, como en las Completas Pequeñas. Después, en el tono sexto:'),
    t('Santísima Señora Theotokos, intercede por nosotros, pecadores. <em>(tres veces)</em>'),
    t('Todas las Potestades celestiales de los santos ángeles y arcángeles, interceded por nosotros, pecadores. <em>(dos veces)</em>'),
    t('San Juan, profeta, Precursor y Bautista de nuestro Señor Jesucristo, intercede por nosotros, pecadores. <em>(dos veces)</em>'),
    t('Santos y gloriosos apóstoles, profetas y mártires, y todos los santos, interceded por nosotros, pecadores.'),
    t('Venerables padres nuestros portadores de Dios, pastores y maestros del mundo, interceded por nosotros, pecadores. <em>(dos veces)</em>'),
    t('Poder invencible, indestructible y divino de la preciosa y vivificante Cruz, no nos abandones a nosotros, pecadores. <em>(dos veces)</em>'),
    t('Oh Dios, sé propicio con nosotros, pecadores. <em>(tres veces)</em>'),
    ref('Y ten piedad de nosotros.'),
    ...TRISAGIO,
    rub('Si es fiesta, sus troparios. Si no, un día éstos, en el tono segundo:'),
    t('Ilumina mis ojos, Cristo Dios, para que no me duerma en la muerte, para que no diga mi enemigo: He prevalecido contra él.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Sé el protector de mi alma, oh Dios, porque camino en medio de muchos lazos: líbrame de ellos y sálvame, oh Bueno, como amigo de los hombres.'),
    rub('Ahora y siempre. Theotokion:'),
    t('Como no tenemos confianza por nuestros muchos pecados, suplica tú al que nació de ti, Virgen Theotokos; porque mucho puede la súplica de una madre para ganar la benevolencia del Soberano. No desprecies, venerabilísima, las súplicas de los pecadores, porque es misericordioso y poderoso para salvar el que aceptó también padecer por nosotros en la carne.'),
    rub('Y al día siguiente éstos, en el tono octavo:'),
    t('Tú conoces, Señor, el insomnio de mis enemigos invisibles, y sabes la debilidad de mi carne miserable, Tú que me formaste. Por eso en tus manos encomiendo mi espíritu. Cúbreme con las alas de tu bondad, para que no me duerma en la muerte; ilumina los ojos de mi mente con el deleite de tus palabras divinas, y despiértame a tiempo para glorificarte, porque eres el único bueno y amigo de los hombres.'),
    rub('Versículo: «Mírame y ten piedad de mí, según el juicio que das a los que aman tu nombre».'),
    t('¡Qué temible es tu juicio, Señor, cuando estén presentes los ángeles, sean traídos los hombres, se abran los libros, se examinen las obras y se escruten los pensamientos! ¿Qué juicio habrá para mí, que fui concebido en pecados? ¿Quién apagará mi llama? ¿Quién iluminará mi oscuridad, si Tú, Señor, no tienes piedad de mí, como amigo de los hombres?'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Dame lágrimas, oh Dios, como un día a la mujer pecadora, y hazme digno de regar tus pies, que me sacaron del camino del extravío, y de ofrecerte como perfume una vida pura, nacida en mí del arrepentimiento, para que también yo oiga tu voz deseada: «Tu fe te ha salvado; vete en paz».'),
    rub('Ahora y siempre. Theotokion:'),
    t('Con tu esperanza, que no defrauda, oh Theotokos, seré salvado; con tu protección, Purísima, no temeré; perseguiré a mis enemigos y los pondré en fuga, revestido sólo de tu amparo como de una coraza. Y pidiendo tu ayuda todopoderosa, te clamo: Señora, sálvame por tus intercesiones, y levántame del sueño tenebroso para glorificarte, por el poder del Hijo de Dios, que se encarnó de ti.'),
    ...CIERRE_DE_PARTE,
    TRADUCCION,
  ]),

  section('basilio-noche', 'La oración de san Basilio', [
    rub('Con ella termina la primera parte. Atribuida a san Basilio el Grande:'),
    t('Señor, Señor, que nos libraste de toda saeta que vuela de día, líbranos de todo lo que anda en las tinieblas. Recibe como sacrificio vespertino la elevación de nuestras manos. Concédenos pasar sin culpa el curso de la noche, sin que nos alcance el mal, y líbranos de toda turbación y de todo temor que nos venga del diablo. Da compunción a nuestras almas, y a nuestra mente cuidado por el examen de tu juicio temible y justo. Clava nuestra carne en tu temor y mortifica nuestros miembros terrenos, para que también en la quietud del sueño quedemos iluminados por la contemplación de tus juicios. Aparta de nosotros toda imaginación indecente y todo deseo dañino. Y levántanos a la hora de la oración afianzados en la fe y adelantados en tus mandamientos. Por la benevolencia y la bondad de tu Hijo unigénito, con quien eres bendito, junto con tu santísimo, bueno y vivificador Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
    TRADUCCION,
  ]),

  section('manases', 'Segunda parte: la oración de Manasés', [
    rub('«Venid, adoremos» (tres veces), con tres postraciones. Dos salmos:'),
    psalm(50),
    psalm(101),
    rub('Y la oración de Manasés, rey de Judá, que es uno de los textos del Antiguo Testamento griego:'),
    t('Señor omnipotente, Dios de nuestros padres, de Abrahán, de Isaac y de Jacob, y de su descendencia justa; Tú que hiciste el cielo y la tierra con todo su ornato; que encadenaste el mar con la palabra de tu mandato; que cerraste el abismo y lo sellaste con tu nombre temible y glorioso; ante quien todas las cosas se estremecen y tiemblan delante de tu poder, porque nadie puede resistir la magnificencia de tu gloria, y es insoportable la ira de tu amenaza contra los pecadores. Pero es inmensa e insondable la misericordia de tu promesa, porque Tú eres el Señor altísimo, compasivo, paciente y de mucha misericordia, y te arrepientes de los males de los hombres.'),
    t('Tú, Señor, según la muchedumbre de tu bondad, prometiste el arrepentimiento y el perdón a los que han pecado contra Ti, y en tu inmensa compasión determinaste la penitencia para los pecadores, para su salvación. Tú, pues, Señor, Dios de los justos, no pusiste el arrepentimiento para los justos, para Abrahán, Isaac y Jacob, que no pecaron contra Ti, sino que pusiste el arrepentimiento para mí, pecador; porque he pecado más que la arena del mar. Mis iniquidades se han multiplicado, Señor, se han multiplicado, y no soy digno de levantar los ojos y ver la altura del cielo por la multitud de mis injusticias.'),
    t('Estoy encorvado bajo el peso de muchas cadenas de hierro, de modo que no puedo levantar la cabeza, y no hay para mí respiro; porque provoqué tu ira e hice lo malo delante de Ti: no cumplí tu voluntad ni guardé tus mandamientos, puse abominaciones y multipliqué los escándalos. Y ahora doblo las rodillas de mi corazón, suplicando tu bondad. He pecado, Señor, he pecado, y reconozco mis iniquidades. Pero pido y te ruego: perdóname, Señor, perdóname, y no me pierdas con mis iniquidades, ni guardes para siempre rencor a mis males, ni me condenes a lo profundo de la tierra; porque Tú, Señor, eres el Dios de los que se arrepienten. Y en mí mostrarás toda tu bondad, porque, indigno como soy, me salvarás según tu gran misericordia, y te alabaré sin cesar todos los días de mi vida. Porque a Ti te alaban todas las potestades de los cielos, y tuya es la gloria por los siglos de los siglos. Amén.'),
    rub('Traducción para ATHOS a partir del original griego de los Setenta, que es de dominio público; no procede de una Biblia española publicada.'),
    ...TRISAGIO,
    rub('Y se cantan en voz baja, en el tono sexto, estos troparios de compunción:'),
    t('Ten piedad de nosotros, Señor, ten piedad de nosotros; porque, sin saber qué alegar en nuestra defensa, los pecadores te ofrecemos esta súplica como a Soberano: ten piedad de nosotros.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Señor, ten piedad de nosotros, porque en Ti hemos confiado. No te enojes demasiado con nosotros ni recuerdes nuestras iniquidades; mira ahora, como compasivo, y líbranos de nuestros enemigos; porque Tú eres nuestro Dios y nosotros tu pueblo, todos obra de tus manos, y tu nombre invocamos.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Ábrenos la puerta de tu compasión, bendita Theotokos; para que, esperando en ti, no perezcamos, sino que por ti nos veamos libres de las desgracias, porque tú eres la salvación del pueblo cristiano.'),
    ...CIERRE_DE_PARTE,
    rub('Y la oración:'),
    t('Soberano Dios, Padre todopoderoso, Señor Hijo unigénito, Jesucristo, y Espíritu Santo, una sola divinidad, un solo poder: ten piedad de mí, pecador, y por los juicios que Tú conoces, sálvame a mí, tu siervo indigno, porque bendito eres por los siglos de los siglos. Amén.'),
    TRADUCCION,
  ]),

  section('senor-de-las-potestades', 'Tercera parte: Señor de las potestades', [
    rub('«Venid, adoremos» (tres veces), con tres postraciones. Dos salmos:'),
    psalm(69),
    psalm(142),
    rub('La doxología, leída, como en las Completas Pequeñas. Después el canon: en la primera semana de la Cuaresma, la parte del Gran Canon que toca cada noche; los demás días, el del día. Al acabar, el Trisagio y el Padre Nuestro, y se canta, en el tono sexto, con los versículos del salmo 150:'),
    ref('Señor de las potestades, quédate con nosotros, porque no tenemos otro auxilio en las tribulaciones sino a Ti. Señor de las potestades, ten piedad de nosotros.'),
    t('Alabad a Dios en sus santos, alabadle en el firmamento de su poder.'),
    t('Alabadle por sus proezas, alabadle por la grandeza de su majestad.'),
    t('Alabadle con son de trompeta, alabadle con salterio y cítara.'),
    t('Alabadle con tímpano y danza, alabadle con cuerdas y flauta.'),
    t('Alabadle con címbalos sonoros, alabadle con címbalos de júbilo. Todo lo que respira alabe al Señor.'),
    rub('Después de cada versículo se repite «Señor de las potestades». Al final los coros cantan, uno «Alabad a Dios en sus santos» y el otro «alabadle en el firmamento de su poder», y los dos juntos, más despacio, una última vez «Señor de las potestades».'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
    t('Señor, si no tuviéramos a tus santos como intercesores y a tu bondad compadecida de nosotros, ¿cómo nos atreveríamos, Salvador, a cantarte a Ti, a quien bendicen sin cesar los ángeles? Tú, que conoces los corazones, perdona nuestras almas.'),
    rub('Ahora y siempre. Theotokion:'),
    t('Muchas son mis faltas, oh Theotokos; a ti me acojo, oh Pura, pidiendo la salvación. Visita mi alma enferma, e intercede ante tu Hijo y Dios nuestro para que me conceda el perdón de los males que he hecho, oh única bendita.'),
    rub('El primer coro:'),
    t('Santísima Theotokos, no me abandones en el tiempo de mi vida; no me confíes a la protección humana, sino ampárame tú misma y ten piedad de mí.'),
    rub('El segundo coro:'),
    t('Toda mi esperanza la pongo en ti, Madre de Dios: guárdame bajo tu amparo.'),
    KYRIE_40,
    rub('La oración de toda hora, «Tú que en todo tiempo y a toda hora», y lo que la sigue, como en las Completas Pequeñas. Sacerdote: «Dios tenga piedad de nosotros y nos bendiga; haga resplandecer su rostro sobre nosotros y nos tenga misericordia».'),
    rub('Se hacen tres grandes postraciones diciendo en cada una una frase de la oración de san Efrén:'),
    t('Señor y Soberano de mi vida: no me des espíritu de ociosidad, de desaliento, de dominio ni de vaniloquio.'),
    t('Concede en cambio a mí, tu siervo, espíritu de castidad, de humildad, de paciencia y de amor.'),
    t('Sí, Señor y Rey: concédeme ver mis propios pecados y no juzgar a mi hermano, porque bendito eres por los siglos de los siglos. Amén.'),
    rub('Después doce inclinaciones, diciendo en cada una: «Oh Dios, sé propicio conmigo, pecador, y ten piedad de mí»; y otra gran postración, con la última frase: «Sí, Señor y Rey…».'),
    ...TRISAGIO,
    { kind: 'text', content: 'Señor, ten piedad.', times: 12 },
    rub('Y las oraciones finales, las mismas de las Completas Pequeñas: la de Pablo el Evergetino a la Theotokos, la de Antíoco a Cristo, «Gloriosísima, siempre Virgen», «Mi esperanza es el Padre» y «Toda mi esperanza».'),
    TRADUCCION,
  ]),

  section('grandes-final', 'El final de las Completas Grandes', [
    rub('En la primera semana de la Cuaresma el sacerdote lee aquí, desde las puertas santas, el Evangelio del día. Después:'),
    t('Paz a todos.'),
    ref('Y con tu espíritu.'),
    t('Inclinemos la cabeza ante el Señor.'),
    ref('A Ti, Señor.'),
    rub('Y con todos inclinados, el sacerdote dice:'),
    t('Soberano de mucha misericordia, Señor Jesucristo, Dios nuestro: por las intercesiones de nuestra purísima Señora, la Theotokos y siempre Virgen María; por el poder de la preciosa y vivificante Cruz; por la protección de las venerables Potestades celestiales incorpóreas; por las súplicas del venerable y glorioso profeta, Precursor y Bautista Juan; de los santos, gloriosos y dignos de toda alabanza apóstoles; de los santos, gloriosos y victoriosos mártires; de nuestros venerables padres portadores de Dios; de los santos y justos antepasados de Dios Joaquín y Ana, y de todos tus santos:'),
    t('haz aceptable nuestra súplica; concédenos el perdón de nuestras faltas; cúbrenos con el amparo de tus alas; aleja de nosotros a todo enemigo y adversario; pacifica nuestra vida. Señor, ten piedad de nosotros y de tu mundo, y salva nuestras almas, porque eres bueno y amigo de los hombres.'),
    ref('Amén.'),
    rub('Sigue el perdón mutuo, como en las Completas Pequeñas: quien preside se postra y pide perdón a todos, y después cada uno, de dos en dos, pide perdón y lo recibe. Mientras tanto se canta. El lunes, el miércoles y el viernes por la noche, en el tono segundo:'),
    t('Proteges, oh Buena, con tu mano poderosa a todos los que se refugian en ti con fe; porque nosotros, pecadores, agobiados por muchas faltas, no tenemos ante Dios otra mediación en los peligros y las aflicciones, Madre del Dios altísimo. Por eso nos postramos ante ti: libra a tus siervos de toda adversidad.'),
    rub('El martes y el jueves por la noche, en el tono primero:'),
    t('Viendo tu muerte injusta, oh Cristo, la Virgen se lamentaba y te gritaba: «Hijo dulcísimo, ¿cómo mueres injustamente? ¿Cómo cuelgas del madero Tú, que suspendiste toda la tierra sobre las aguas? No me dejes sola, Bienhechor de gran misericordia, a mí, tu Madre y tu sierva, te lo suplico».'),
    rub('Se dicen las peticiones por todos y la oración «Perdona, Señor, a los que nos odian», como en las Completas Pequeñas. El libro griego añade en ella una petición por el emperador, «ayuda al rey», que el eslavo no tiene.'),
    rub('Así se celebran las Completas Grandes toda la Cuaresma hasta el Martes Santo por la noche. El Lunes y el Martes Santos, en lugar del canon de la Theotokos, se cantan los triodios propios de las Completas, y al final «Viendo tu muerte injusta».'),
    TRADUCCION,
  ]),
];
