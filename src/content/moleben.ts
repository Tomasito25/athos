/**
 * El Moleben: el orden común y tres molebens enteros.
 *
 * Hasta la versión 1.25 ATHOS describía el moleben y dejaba pendientes sus
 * propios. Ahora tiene el orden común con sus textos, y enteros los tres que
 * más se piden: el de acción de gracias, el de los enfermos y el de los que
 * se ponen en camino. Cada uno con sus peticiones propias para las dos
 * letanías, sus troparios, su prokímenon, sus lecturas y su oración; el de
 * acción de gracias, además, con el himno «A Ti, Dios, te alabamos».
 *
 * El moleben es un oficio de la tradición eslava, y sus textos están en el
 * Trebnik (el Ritual) eslavo, de donde se han traducido. Las lecturas no se
 * copian: se muestran tomadas de la Biblia de la aplicación. La traducción es
 * de ATHOS y no procede de ningún libro litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const head = (content: string): TextBlock => ({ kind: 'heading', content });
const psalm = (n: number): TextBlock => ({ kind: 'psalm', content: `Salmo ${n}`, ref: String(n) });
const reading = (cita: string): TextBlock => ({ kind: 'reading', content: cita, ref: cita });
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';
const AMEN = ref('Amén.');
const TRADUCCION = rub('Traducción para ATHOS a partir del Trebnik eslavo, que es de dominio público; no procede de un libro litúrgico español publicado.');

/*
 * Los troparios y las oraciones de los enfermos y de los viajeros se exportan:
 * el libro de oraciones los usa tal cual, para que no haya dos traducciones
 * del mismo texto.
 */
export const ENFERMOS_TROPARIO =
  'Tú, el único pronto en socorrer, oh Cristo, muestra pronto desde lo alto tu visita a tu siervo que sufre; líbralo de la dolencia y de la amarga enfermedad, y levántalo para que te cante y te glorifique sin cesar, por las oraciones de la Theotokos, oh único amigo de los hombres.';
export const ENFERMOS_KONTAKION =
  'Como levantaste en otro tiempo, Salvador, a la suegra de Pedro, que yacía en el lecho de la enfermedad herida de muerte, y al paralítico llevado en su camilla, así también ahora, oh Misericordioso, visita y sana al que sufre; porque sólo Tú cargaste con las dolencias y las enfermedades de nuestro linaje, y todo lo puedes, porque eres de mucha misericordia.';
export const VIAJEROS_TROPARIO =
  'Oh Cristo, que eres el camino y la verdad: envía ahora a tus siervos, como en otro tiempo a Tobías, a tu ángel como compañero, que los guarde y los preserve indemnes, para tu gloria, de todo mal, en toda prosperidad, por las oraciones de la Theotokos, oh único amigo de los hombres.';
export const VIAJEROS_KONTAKION =
  'Tú, Salvador, que acompañaste a Lucas y a Cleofás en el camino de Emaús, acompaña también ahora a tus siervos que quieren ponerse en camino, librándolos de toda mala circunstancia; porque Tú, como amigo de los hombres, todo lo puedes cuando quieres.';
export const ENFERMOS_ORACION = `Soberano todopoderoso, Rey santo, que castigas y no haces morir, que sostienes a los que caen y levantas a los abatidos, que remedias las aflicciones corporales de los hombres: te suplicamos, Dios nuestro, visita con tu misericordia a tu siervo N., que está enfermo; perdónale todo pecado, voluntario e involuntario. Sí, Señor: envía desde el cielo tu fuerza curativa, toca su cuerpo, apaga la fiebre, calma el sufrimiento y toda dolencia escondida; sé el médico de tu siervo N.; levántalo del lecho de la enfermedad y del lecho del dolor sano y entero, y devuélvelo a tu Iglesia agradándote y haciendo tu voluntad. Porque a Ti corresponde tener piedad de nosotros y salvarnos, Dios nuestro, y a Ti te damos gloria, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS} Amén.`;
export const VIAJEROS_ORACION = `Jesucristo, Dios nuestro, camino verdadero y vivo, que quisiste ir de camino a Egipto con tu padre putativo José y con la purísima Virgen María, y acompañaste a Lucas y a Cleofás a Emaús: también ahora te rogamos humildemente, Soberano santísimo, acompaña con tu gracia a estos siervos tuyos. Y como a tu siervo Tobías, envíales un ángel custodio y guía, que los guarde y los libre de toda mala circunstancia de los enemigos visibles e invisibles, que los guíe en el cumplimiento de tus mandamientos y los conduzca en paz, con felicidad y con salud; y concédeles llevar a buen término, para tu gloria y de modo que te agrade, todo su buen propósito. Porque a Ti corresponde tener piedad de nosotros y salvarnos, y a Ti te damos gloria, con tu Padre sin principio y con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS} Amén.`;

/** Lo que hay que decir antes de las peticiones propias de la gran letanía. */
const LETANIA_COMIENZO: TextBlock[] = [
  rub('Diácono, o el sacerdote; a cada petición se responde «Señor, ten piedad»:'),
  t('En paz, oremos al Señor.'),
  t('Por la paz de lo alto y por la salvación de nuestras almas, oremos al Señor.'),
  t('Por la paz del mundo entero, por la estabilidad de las santas Iglesias de Dios y por la unión de todos, oremos al Señor.'),
  t('Por esta santa casa y por los que entran en ella con fe, piedad y temor de Dios, oremos al Señor.'),
  t('Por nuestro arzobispo N., por el venerable presbiterio, por el diaconado en Cristo, por todo el clero y el pueblo, oremos al Señor.'),
  rub('Aquí se intercalan las peticiones propias de cada moleben. Después:'),
];

const LETANIA_FINAL: TextBlock[] = [
  t('Por que seamos librados de toda aflicción, ira, peligro y necesidad, oremos al Señor.'),
  t('Socórrenos, sálvanos, ten piedad de nosotros y guárdanos, oh Dios, por tu gracia.'),
  t('Conmemorando a nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María, junto con todos los santos, encomendémonos a nosotros mismos, unos a otros, y toda nuestra vida a Cristo Dios.'),
  ref('A Ti, Señor.'),
  rub('Sacerdote:'),
  t(`Porque a Ti corresponde toda gloria, honor y adoración, al Padre, y al Hijo, y al Espíritu Santo, ${POR_LOS_SIGLOS}`),
  AMEN,
];

const DIOS_ES_EL_SENOR: TextBlock[] = [
  rub('«Dios es el Señor», en el tono del primer tropario, con sus versículos:'),
  ref('Dios es el Señor y se nos ha manifestado: bendito el que viene en el nombre del Señor.'),
  t('Alabad al Señor, porque es bueno, porque es eterna su misericordia.'),
  t('Me rodearon por todas partes, y en el nombre del Señor los rechacé.'),
  t('No moriré, sino que viviré, y contaré las obras del Señor.'),
  t('La piedra que desecharon los constructores se ha convertido en piedra angular; es obra del Señor, y es admirable a nuestros ojos.'),
];

const LETANIA_FERVIENTE_COMIENZO: TextBlock[] = [
  rub('Diácono; a cada petición se responde tres veces «Señor, ten piedad»:'),
  t('Ten piedad de nosotros, oh Dios, según tu gran misericordia; te rogamos: escúchanos y ten piedad.'),
  rub('Y las peticiones propias, en las que se dicen los nombres. Al final:'),
];

export const MOLEBEN: OfficeSection[] = [
  section('sentido', 'Cuándo se pide', [
    rub('Oficio breve de intercesión que se celebra por una necesidad concreta: por un enfermo, por los que viajan, al empezar el curso o una obra, o en acción de gracias. Se pide al sacerdote y dura entre veinte minutos y media hora.'),
    t('Es un oficio de la tradición eslava. Su lugar en la griega lo ocupa la Paráclesis, que tiene la misma forma: salmos, canon, Evangelio y letanía con los nombres.'),
    rub('Los nombres se entregan por escrito antes de empezar, de bautismo y sin apellidos.'),
  ]),

  section('orden', 'El orden común', [
    rub('Sacerdote:'),
    t(`Bendito sea nuestro Dios, siempre, ${POR_LOS_SIGLOS}`),
    AMEN,
    rub('El comienzo habitual: «Gloria a Ti, Dios nuestro», «Rey celestial», el Trisagio, «Santísima Trinidad», el Padre Nuestro (Orar → Oraciones → Comienzo habitual), y «Venid, adoremos» tres veces. Después se lee un salmo, que en el moleben de los enfermos es el 70 y en los demás el 142.'),
    rub('Siguen la gran letanía con las peticiones propias, «Dios es el Señor» con los troparios propios, el salmo 50 y el canon. El canon es el del santo al que se dirige el moleben o, en el moleben a la Theotokos, el de la Paráclesis (Biblioteca → Paráclesis a la Theotokos). En las parroquias, en los molebens por una necesidad, el canon se omite a menudo o se reduce a los irmos.'),
    rub('Después: «Santo es el Señor nuestro Dios», el prokímenon, el Apóstol y el Evangelio propios; la letanía ferviente con las peticiones propias y los nombres; la oración propia, y la despedida. Abajo está cada moleben con todo lo suyo.'),
    psalm(142),
    psalm(50),
  ]),

  section('letania', 'La gran letanía', [
    ...LETANIA_COMIENZO,
    rub('Las peticiones propias de cada moleben están en su sección.'),
    ...LETANIA_FINAL,
  ]),

  section('dios-es-el-senor', 'Dios es el Señor', [...DIOS_ES_EL_SENOR]),

  /* ---------------- Acción de gracias ---------------- */

  section('accion-de-gracias', 'Moleben de acción de gracias', [
    rub('Se celebra para dar gracias por un beneficio recibido: una curación, un viaje que acabó bien, el final de un curso o de una obra, o al empezar el año.'),
    head('En la gran letanía'),
    t('Para que reciba misericordiosamente en su altar celestial la acción de gracias y la súplica que ahora le presentamos nosotros, sus siervos indignos, y tenga piedad de nosotros en su entrañable bondad, oremos al Señor.'),
    t('Para que no desdeñe la acción de gracias que nosotros, sus siervos inútiles, le ofrecemos con corazón humilde por los beneficios recibidos de Él, sino que le sea agradable como incienso fragante y como holocausto abundante, oremos al Señor.'),
    t('Para que también ahora escuche la voz de la súplica de nosotros, sus siervos indignos, y cumpla siempre para bien el buen propósito y el deseo de sus fieles; para que, como generoso, nos colme siempre de beneficios a nosotros y a su santa Iglesia, y conceda el perdón a todos sus fieles, oremos al Señor.'),
    t('Para que libre a su santa Iglesia, a sus siervos N. y a todos nosotros de toda aflicción, desgracia, ira y necesidad, y de todos los enemigos visibles e invisibles, y proteja siempre a sus fieles con la salud, una larga vida y la paz, y con la escolta de sus ángeles, oremos al Señor.'),
    head('Los troparios'),
    rub('Tono cuarto:'),
    t('Agradecidos, nosotros, tus siervos indignos, Señor, por los grandes beneficios que nos has hecho, te glorificamos, te alabamos, te bendecimos, te damos gracias, cantamos y engrandecemos tu bondad, y con amor de siervos te clamamos: Bienhechor, Salvador nuestro, gloria a Ti.'),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo. Tono tercero:'),
    t('Hechos dignos, como siervos inútiles, de tus beneficios y de tus dones gratuitos, Soberano, corremos a Ti con fervor y te ofrecemos, según nuestras fuerzas, acción de gracias; y, glorificándote como bienhechor y Creador, clamamos: Gloria a Ti, Dios generosísimo.'),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén. En el mismo tono:'),
    t('Theotokos, auxilio de los cristianos: nosotros, tus siervos, que hemos alcanzado tu protección, te clamamos agradecidos: Alégrate, purísima Theotokos Virgen, y líbranos siempre de todas las desgracias con tus oraciones, tú, la única que pronto intercedes.'),
    head('Las lecturas'),
    rub('Prokímenon, tono cuarto: «Cantaré al Señor, que me ha hecho bien; cantaré al nombre del Señor altísimo». Versículo: «Mi corazón se alegrará en tu salvación».'),
    reading('Efesios 5, 8-21'),
    reading('Lucas 17, 12-19'),
    head('En la letanía ferviente'),
    ...LETANIA_FERVIENTE_COMIENZO,
    t('Dándote gracias con temor y temblor, como siervos inútiles, por tu entrañable bondad, Salvador y Soberano nuestro, Señor, por los beneficios que has derramado en abundancia sobre tus siervos, nos postramos y te ofrecemos la glorificación como a Dios, y te clamamos con compunción: libra de toda desgracia a tus siervos y, como misericordioso, cumple siempre para bien el deseo de todos nosotros; te rogamos con insistencia: escúchanos y ten piedad.'),
    t('Así como ahora has escuchado con misericordia, Señor, las oraciones de tus siervos y les has mostrado la bondad de tu amor a los hombres, así también en adelante, sin despreciarlas, cumple para tu gloria todos los buenos deseos de tus fieles, y muestra a todos nosotros tu rica misericordia, pasando por alto todos nuestros pecados; te rogamos: escúchanos y ten piedad.'),
    t('Sea agradable, Soberano infinitamente bueno, como incienso fragante y como holocausto abundante, esta acción de gracias nuestra ante la majestad de tu gloria; envía siempre, como generoso, a tus siervos tu rica misericordia y tus compasiones; libra a tu santa Iglesia, y a esta ciudad, de todos los enemigos visibles e invisibles, y concede a todo tu pueblo una vida larga, sin pecado y con salud, y el progreso en todas las virtudes; te rogamos, Rey generosísimo: escúchanos con bondad y ten pronto piedad.'),
    head('La oración'),
    t('Señor Jesucristo, Dios nuestro, Dios de toda misericordia y compasión, cuya misericordia no tiene medida y cuyo amor a los hombres es un abismo insondable: postrándonos ante tu majestad con temor y temblor, como siervos indignos, te ofrecemos ahora humildemente la acción de gracias por los beneficios que has hecho a tus siervos; te glorificamos, te alabamos, te cantamos y te engrandecemos como Señor, Soberano y bienhechor, y, postrándonos, de nuevo te damos gracias, suplicando humildemente tu misericordia inmensa e inefable.'),
    t('Así como ahora te has dignado recibir y cumplir misericordiosamente la súplica de tus siervos, concédenos también en adelante progresar en tu amor, en el amor al prójimo y en todas las virtudes, y que todos tus fieles reciban tus beneficios; libra a tu santa Iglesia y a esta ciudad de toda situación mala, y dales la paz y la tranquilidad; y haznos dignos de darte siempre gracias, de bendecirte y de cantarte a Ti, glorificado en una sola esencia con tu Padre sin principio y con tu santísimo, bueno y consustancial Espíritu. Amén.'),
    head('A Ti, Dios, te alabamos'),
    rub('Al final se canta el himno de acción de gracias que la tradición atribuye a san Ambrosio de Milán, en la forma en que lo canta la Iglesia eslava:'),
    t('A Ti, Dios, te alabamos; a Ti, Señor, te confesamos. A Ti, Padre eterno, te venera toda la tierra. A Ti todos los ángeles, a Ti los cielos y todas las potestades, a Ti los querubines y los serafines te aclaman con voces incesantes: Santo, santo, santo es el Señor, Dios de los ejércitos; llenos están el cielo y la tierra de la majestad de tu gloria.'),
    t('A Ti te alaba el glorioso coro de los apóstoles, a Ti la multitud laudable de los profetas, a Ti te alaba el ejército resplandeciente de los mártires. A Ti te confiesa la santa Iglesia por toda la tierra: al Padre de majestad incomprensible, a tu verdadero y único Hijo, digno de adoración, y al Espíritu Santo Consolador.'),
    t('Tú eres el Rey de la gloria, oh Cristo; Tú eres el Hijo eterno del Padre. Tú, para librar al hombre, no desdeñaste el seno de la Virgen. Tú, vencido el aguijón de la muerte, abriste a los creyentes el Reino de los cielos. Tú estás sentado a la derecha de Dios, en la gloria del Padre; creemos que vendrás como juez.'),
    t('Te rogamos, pues: ayuda a tus siervos, a quienes redimiste con tu preciosa sangre; haznos dignos de reinar con tus santos en tu gloria eterna. Salva, Señor, a tu pueblo y bendice tu heredad; guíalos y exáltalos por los siglos. Todos los días te bendecimos y alabamos tu nombre por los siglos de los siglos. Dígnate, Señor, guardarnos hoy sin pecado. Ten piedad de nosotros, Señor, ten piedad de nosotros. Venga sobre nosotros tu misericordia, Señor, como hemos esperado en Ti. En Ti, Señor, hemos esperado: no seamos confundidos jamás.'),
    TRADUCCION,
  ]),

  /* ---------------- Por los enfermos ---------------- */

  section('enfermos', 'Moleben por los enfermos', [
    rub('Se empieza con el salmo 70: «En Ti, Señor, he esperado».'),
    psalm(70),
    head('En la gran letanía'),
    t('Para que perdone todo pecado, voluntario e involuntario, de sus siervos N., y les sea misericordioso, oremos al Señor.'),
    t('Para que, por la misericordia de su Madre, no recuerde los pecados de su juventud y de su ignorancia, sino que les conceda con misericordia la salud, oremos al Señor.'),
    t('Para que no desprecie las súplicas insistentes de sus siervos, por los que ahora oramos, sino que los escuche con misericordia, les sea propicio, benigno y amigo de los hombres, y les dé la salud, oremos al Señor.'),
    t('Para que, como en otro tiempo levantó al paralítico con la palabra de su gracia divina, levante pronto del lecho de la enfermedad a sus siervos enfermos y los devuelva sanos, oremos al Señor.'),
    t('Para que los visite con la visita de su Espíritu Santo y los cure de toda dolencia y de toda enfermedad que anida en ellos, oremos al Señor.'),
    t('Para que, como escuchó la voz de la cananea, escuche con misericordia a nosotros, sus siervos indignos, que clamamos a Él, y, como a la hija de aquélla, tenga piedad de sus siervos enfermos N. y los cure, oremos al Señor.'),
    head('El tropario y el kontakion'),
    rub('Tropario, tono cuarto:'),
    t(ENFERMOS_TROPARIO),
    rub('Kontakion, tono segundo:'),
    t(ENFERMOS_KONTAKION),
    head('Las lecturas'),
    rub('Prokímenon, tono séptimo: «Ten piedad de mí, Señor, porque estoy débil; sáname, porque mis huesos se han estremecido». Versículo: «Porque en la muerte no hay quien se acuerde de Ti».'),
    reading('Santiago 5, 10-16'),
    reading('Mateo 8, 5-13'),
    head('En la letanía ferviente'),
    ...LETANIA_FERVIENTE_COMIENZO,
    t('Médico de las almas y de los cuerpos: con compunción y con el corazón quebrantado nos postramos ante Ti y te clamamos gimiendo: sana las enfermedades, cura los males del alma y del cuerpo de tus siervos N.; perdónales, porque eres bondadoso, todos los pecados, voluntarios e involuntarios, y levántalos pronto del lecho de la enfermedad; te rogamos: escúchanos y ten piedad.'),
    t('Tú, que no quieres la muerte de los pecadores, sino que se conviertan y vivan: perdona y ten piedad de tus siervos N., oh Misericordioso; reprende la enfermedad, aparta todo mal y toda dolencia, extiende tu mano poderosa y, como a la hija de Jairo, levántalos del lecho de la enfermedad y devuélveles la salud; te rogamos: escúchanos y ten piedad.'),
    t('Tú, que con tu contacto curaste la fiebre de la suegra de Pedro, cura también ahora, en tu bondad, la enfermedad de tus siervos N., que sufren cruelmente, dándoles pronto la salud; te rogamos con insistencia, fuente de las curaciones: escúchanos y ten piedad.'),
    t('Tú, que recibiste las lágrimas de Ezequías, el arrepentimiento de Manasés y de los ninivitas y la confesión de David, y pronto tuviste piedad de ellos: recibe también nuestras súplicas, que te ofrecemos con compunción, Rey infinitamente bueno, y, como generoso, ten piedad de tus siervos que sufren gravemente, dándoles la salud; te rogamos con lágrimas, fuente de la vida y de la inmortalidad: escúchanos y ten pronto piedad.'),
    head('Las oraciones'),
    t(ENFERMOS_ORACION),
    t(`Dios y Señor de los ejércitos, que con misericordia dispones todas las cosas para la salvación del linaje humano: visita también a tu siervo N., que invoca el nombre de tu Cristo, y sánalo de todo pecado de la carne y del alma, de toda tentación y desgracia; aleja de tu siervo todo asalto del enemigo, levántalo del lecho de la enfermedad y devuélvelo a tu santa Iglesia sano de alma y de cuerpo, adornado de buenas obras y de buenas palabras, para que te glorifique con todos, a Ti y a tu Cristo, nuestra esperanza, con quien eres bendito, junto con tu santísimo, bueno y vivificante Espíritu, ${POR_LOS_SIGLOS} Amén.`),
    rub('La primera oración es la misma que se dice en la Unción de los enfermos.'),
    TRADUCCION,
  ]),

  /* ---------------- Por los que se ponen en camino ---------------- */

  section('viajeros', 'Moleben por los que se ponen en camino', [
    rub('Se celebra antes de un viaje, de una mudanza o de cualquier partida.'),
    head('En la gran letanía'),
    t('Para que tenga piedad de sus siervos, les perdone todo pecado, voluntario e involuntario, y bendiga su viaje, oremos al Señor.'),
    t('Para que les envíe un ángel de paz, compañero y guía, que los guarde, los defienda, los proteja y los preserve indemnes de toda mala circunstancia, oremos al Señor.'),
    t('Para que los cubra y los guarde indemnes de todas las asechanzas y adversidades del enemigo, y los acompañe y los devuelva sin daño, oremos al Señor.'),
    t('Para que les conceda un viaje sin pecado y en paz, y un regreso feliz y con salud, en toda piedad y honestidad, oremos al Señor.'),
    t('Para que los guarde indemnes e invencibles ante todos los enemigos visibles e invisibles y ante la maldad de los hombres perversos, oremos al Señor.'),
    t('Para que bendiga su buen propósito y, con su gracia, lo haga prosperar para provecho del alma y del cuerpo, oremos al Señor.'),
    head('Los troparios'),
    rub('Tono segundo:'),
    t(VIAJEROS_TROPARIO),
    rub('Gloria al Padre, y al Hijo, y al Espíritu Santo. En el mismo tono:'),
    t(VIAJEROS_KONTAKION),
    rub('Ahora y siempre, y por los siglos de los siglos. Amén. Tono sexto:'),
    t('Protección de los cristianos que no defrauda, mediación constante ante el Creador: no desprecies las voces de las súplicas de los pecadores, sino adelántate, como buena, a ayudarnos a los que te invocamos con fe; apresúrate a la intercesión y date prisa a la súplica, tú que siempre proteges, Theotokos, a los que te honran.'),
    head('Las lecturas'),
    rub('Prokímenon, tono cuarto: «Esté sobre nosotros el resplandor del Señor nuestro Dios, y endereza la obra de nuestras manos». Versículo: «Líbrame de mis enemigos, Señor; a Ti me acojo».'),
    reading('Hechos 8, 26-39'),
    reading('Juan 14, 1-10'),
    head('En la letanía ferviente'),
    ...LETANIA_FERVIENTE_COMIENZO,
    t('Tú, Señor, que enderezas los pasos de los hombres: mira con misericordia a tus siervos N., y, perdonándoles todo pecado, voluntario e involuntario, bendice el buen propósito de su decisión, y endereza sus salidas y sus entradas y su viaje; te rogamos con insistencia: escúchanos y ten piedad.'),
    t('Señor, que libraste gloriosamente a José de la maldad de sus hermanos, lo condujiste a Egipto y con la bendición de tu bondad lo hiciste prosperar en todo: bendice también a estos siervos tuyos que quieren ponerse en camino, y haz su viaje tranquilo y feliz; te rogamos: escúchanos y ten piedad.'),
    t('Tú, que enviaste un ángel como compañero a Isaac y a Tobías, e hiciste su viaje y su regreso en paz y felicidad: envía también ahora, oh infinitamente bueno, un ángel de paz a tus siervos, por los que te rogamos, que los guíe a toda obra buena, los libre de los enemigos visibles e invisibles y de toda mala circunstancia, y los devuelva con salud, en paz y felicidad, para tu gloria; te rogamos con fervor: escúchanos y ten piedad.'),
    t('Tú, que acompañaste a Lucas y a Cleofás en el camino de Emaús y, dándote a conocer gloriosamente, los hiciste volver con alegría a Jerusalén: acompaña con tu gracia y tu bendición divina también ahora a estos siervos tuyos, por los que te rogamos con insistencia; hazlos prosperar en toda obra buena para gloria de tu santísimo nombre, guardándolos con salud y felicidad y devolviéndolos a su tiempo; te rogamos como a bienhechor generosísimo: escúchanos y ten piedad.'),
    head('La oración'),
    t(VIAJEROS_ORACION),
    rub('El sacerdote asperja con agua bendita la cabeza de los que van a viajar, diciendo:'),
    t('Que el Señor os bendiga desde Sión, y veáis los bienes de Jerusalén todos los días de vuestra vida, y que enderece vuestro camino en paz, para gloria de su santo nombre. Amén.'),
    TRADUCCION,
  ]),

  section('despedida', 'La despedida', [
    rub('Sacerdote:'),
    t('Gloria a Ti, Cristo Dios, esperanza nuestra, gloria a Ti.'),
    rub('Coro: «Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén. Señor, ten piedad (tres veces). Bendice».'),
    t('Cristo, nuestro Dios verdadero, por las intercesiones de su purísima Madre, del santo al que hemos orado y de todos los santos, tenga piedad de nosotros y nos salve, porque es bueno y amigo de los hombres.'),
    AMEN,
    rub('Los fieles besan la cruz y el sacerdote los asperja con agua bendita. En muchas parroquias el coro canta al final «Muchos años» a aquellos por quienes se ha orado.'),
  ]),
];
