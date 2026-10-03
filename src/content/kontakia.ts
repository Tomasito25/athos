/**
 * Los kontakia: el de cada día, el de la Resurrección, el de las fiestas y el
 * de los santos que tienen tropario propio.
 *
 * El kontakion es el himno breve que en las Horas va después del Padre
 * Nuestro, y en la Liturgia después de la Pequeña Entrada. Hasta la versión
 * 1.25 las Horas decían en ese sitio «pendiente», y ningún santo lo tenía.
 *
 * Están aquí:
 * - los ocho de la Resurrección, uno por tono, del Octoecos;
 * - los de cada día de la semana, que el Horologion da para cuando no hay
 *   santo ni fiesta;
 * - los de las grandes fiestas fijas, del Menaion;
 * - los del ciclo pascual, del Triodion y del Pentecostarion;
 * - los de los santos que en ATHOS tienen tropario propio, del Menaion;
 * - y lo que las Horas de Cuaresma dicen en su lugar.
 *
 * Todo se ha traducido del griego (glt.goarch.org), salvo lo que se dice:
 * los kontakia de la Semana Santa y el de la Samaritana, que en esa
 * colección no están, y el de la Protección, que es fiesta eslava, se han
 * traducido del eslavo eclesiástico. La traducción es de ATHOS y no procede
 * de ningún libro litúrgico español publicado.
 *
 * Los santos que no están aquí no tienen kontakion en ATHOS: no se escribe
 * uno ni se pone el de otro.
 */
import type { SourceMeta, TextBlock } from '@/types';

export interface Kontakion {
  name: string;
  tone: string;
  blocks: TextBlock[];
  /** Si se tradujo del eslavo y no del griego. */
  eslavo?: boolean;
}

const TRADUCCION =
  'Texto litúrgico tradicional; los originales griego y eslavo son de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.';

export const KONTAKION_META: SourceMeta = {
  source:
    'Kontakia del Octoecos, del Menaion, del Triodion y del Pentecostarion bizantinos. Traducción al español hecha para ATHOS a partir del original griego (glt.goarch.org) y, donde se indica, del eslavo eclesiástico',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-03',
  copyright: TRADUCCION,
  notes: 'La traducción es de ATHOS: no procede de un libro litúrgico español publicado.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });

const k = (name: string, tone: string, texto: string, ...notas: string[]): Kontakion => ({
  name,
  tone,
  blocks: [t(texto), ...notas.map(rub)],
});
const eslavo = (name: string, tone: string, texto: string, ...notas: string[]): Kontakion => ({
  ...k(name, tone, texto, ...notas, 'Traducido del eslavo eclesiástico.'),
  eslavo: true,
});

/* ============================================================
   La Resurrección, en los ocho tonos
   ============================================================ */

export const RESURRECTION_KONTAKIA: Record<number, Kontakion> = {
  1: k('Kontakion de la Resurrección', 'Tono 1', 'Resucitaste del sepulcro en gloria, como Dios, y contigo resucitaste al mundo; la naturaleza de los mortales te cantó como a Dios, y la muerte ha desaparecido. Adán danza, Soberano, y Eva, librada ahora de sus cadenas, se alegra clamando: Tú eres, oh Cristo, el que a todos concede la resurrección.'),
  2: k('Kontakion de la Resurrección', 'Tono 2', 'Resucitaste del sepulcro, Salvador todopoderoso, y el Hades, al ver el prodigio, quedó espantado; los muertos se levantaban, la creación, al verlo, se alegra contigo, Adán se regocija con ella, y el mundo, Salvador mío, te canta siempre.'),
  3: k('Kontakion de la Resurrección', 'Tono 3', 'Resucitaste hoy del sepulcro, oh Compasivo, y nos sacaste de las puertas de la muerte. Hoy Adán danza y Eva se alegra, y con ellos los profetas y los patriarcas cantan sin cesar el poder divino de tu dominio.'),
  4: k('Kontakion de la Resurrección', 'Tono 4', 'Mi Salvador y libertador, como Dios, resucitó del sepulcro a los nacidos de la tierra sacándolos de sus cadenas, quebrantó las puertas del Hades y, como Soberano, resucitó al tercer día.'),
  5: k('Kontakion de la Resurrección', 'Tono 5', 'Bajaste al Hades, Salvador mío, y, quebrantando sus puertas como todopoderoso, resucitaste contigo a los muertos como Creador; quebrantaste, oh Cristo, el aguijón de la muerte y libraste a Adán de la maldición, oh amigo de los hombres. Por eso todos te clamamos: Sálvanos, Señor.'),
  6: k('Kontakion de la Resurrección', 'Tono 6', 'Con su mano, que es principio de la vida, Cristo Dios, el Dador de vida, resucitó a todos los muertos de las moradas tenebrosas y concedió la resurrección al linaje de los hombres; porque Él es el Salvador de todos, la resurrección y la vida, y el Dios del universo.'),
  7: k('Kontakion de la Resurrección', 'Tono 7', 'Ya no podrá el poder de la muerte retener a los mortales, porque Cristo ha bajado quebrantando y deshaciendo sus fuerzas. El Hades queda atado, y los profetas a una se alegran diciendo: Ha aparecido el Salvador a los que estaban en la fe; salid, fieles, a la resurrección.'),
  8: k('Kontakion de la Resurrección', 'Tono 8', 'Levantándote del sepulcro, resucitaste a los muertos y levantaste a Adán; Eva danza en tu resurrección, y los confines del mundo celebran tu despertar de entre los muertos, oh lleno de misericordia.'),
};

/* ============================================================
   Cada día de la semana
   ============================================================ */

const ARCANGELES = k('Kontakion de los arcángeles', 'Tono 2', 'Arcángeles de Dios, servidores de la gloria divina, guías de los hombres y príncipes de los incorpóreos: pedid para nosotros lo que nos conviene y la gran misericordia, como arcángeles de los incorpóreos.');
const PRECURSOR = k('Kontakion del Precursor', 'Tono 2', 'Profeta de Dios y Precursor de la gracia: hallamos en la tierra tu cabeza como una rosa santísima, y recibimos siempre curaciones; porque de nuevo, como antes, predicas en el mundo el arrepentimiento.');
const CRUZ = k('Kontakion de la Cruz', 'Tono 4', 'Tú, que voluntariamente fuiste elevado en la Cruz, concede tus misericordias, oh Cristo Dios, al nuevo pueblo que lleva tu nombre; alegra con tu poder a los fieles que nos gobiernan, dándoles victoria sobre los enemigos: que tengan tu ayuda, arma de paz, trofeo invencible.', 'El griego dice «nuestros reyes fieles»; aquí, como en las letanías, «los que nos gobiernan».');
const APOSTOLES = k('Kontakion de los apóstoles', 'Tono 2', 'Tomaste, Señor, a los heraldos firmes que hablaban de Dios, la cumbre de tus discípulos, para que gozaran de tus bienes y de tu descanso; porque recibiste sus fatigas y su muerte por encima de todo holocausto, Tú, el único que conoce los corazones.');
const NICOLAS = k('Kontakion de san Nicolás', 'Tono 3', 'En Mira, oh santo, te mostraste sacerdote; porque, cumpliendo el Evangelio de Cristo, venerable, diste tu vida por tu pueblo y salvaste de la muerte a los inocentes. Por eso fuiste santificado, como gran iniciado en la gracia de Dios.');
const MARTIRES = k('Kontakion de los mártires', 'Tono 8', 'Como primicias de la naturaleza, el mundo te ofrece, Señor, plantador de la creación, a los mártires portadores de Dios. Por sus súplicas, y por la Theotokos, guarda en paz profunda a tu Iglesia, oh lleno de misericordia.');
const DIFUNTOS = k('Kontakion de los difuntos', 'Tono 8', 'Con los santos da descanso, Cristo, a las almas de tus siervos, donde no hay dolor, ni tristeza, ni gemido, sino vida sin fin.');

/** Del lunes (1) al sábado (6). El domingo es el de la Resurrección. */
export const WEEKDAY_KONTAKIA: Record<number, { dedicacion: string; items: Kontakion[] }> = {
  1: { dedicacion: 'El lunes, de los ángeles', items: [ARCANGELES] },
  2: { dedicacion: 'El martes, del Precursor', items: [PRECURSOR] },
  3: { dedicacion: 'El miércoles, de la Cruz', items: [CRUZ] },
  4: { dedicacion: 'El jueves, de los apóstoles y de san Nicolás', items: [APOSTOLES, NICOLAS] },
  5: { dedicacion: 'El viernes, de la Cruz', items: [CRUZ] },
  6: { dedicacion: 'El sábado, de los mártires y de los difuntos', items: [MARTIRES, DIFUNTOS] },
};

/* ============================================================
   El ciclo pascual: Triodion y Pentecostarion
   ============================================================ */

const PASCUA = k('Kontakion de Pascua', 'Tono 8', 'Aunque bajaste al sepulcro, oh Inmortal, destruiste el poder del infierno y resucitaste vencedor, oh Cristo Dios, diciendo a las mujeres miróforas: Alegraos, y dando la paz a tus apóstoles, Tú que concedes la resurrección a los caídos.');
const PENTECOSTES = k('Kontakion de Pentecostés', 'Tono 8', 'Cuando el Altísimo bajó y confundió las lenguas, dividió a las naciones; cuando repartió las lenguas de fuego, llamó a todos a la unidad. Y a una voz glorificamos al Espíritu santísimo.');
const ADORACION_CRUZ = k('Kontakion del domingo de la Cruz', 'Tono 7', 'Ya no guarda la puerta del Edén la espada de fuego, porque sobre ella cayó, como un apagamiento admirable, el leño de la Cruz; el aguijón de la muerte y la victoria del Hades han sido expulsados, y Tú, Salvador mío, te presentaste clamando a los del Hades: Entrad de nuevo en el paraíso.');
const PALAMAS = k('Kontakion de san Gregorio Palamás', 'Tono 8', 'Instrumento sagrado y divino de la sabiduría, trompeta resplandeciente de la teología, te cantamos a una, Gregorio, que hablas de Dios. Tú, que como mente estás ante la Mente primera, guía hacia ella, padre, nuestra mente, para que te clamemos: Alégrate, heraldo de la gracia.');

export const MOVABLE_KONTAKIA: Record<string, Kontakion> = {
  'publicano-fariseo': k('Kontakion del Publicano y el Fariseo', 'Tono 4', 'Huyamos de la jactancia del fariseo y aprendamos la humildad del publicano, clamando con gemidos al Salvador: Sé propicio con nosotros, Tú, el único que perdonas con facilidad.'),
  'hijo-prodigo': k('Kontakion del Hijo Pródigo', 'Tono 3', 'Me aparté neciamente de tu gloria paterna y malgasté en el mal la riqueza que me diste. Por eso te clamo con la voz del pródigo: He pecado contra Ti, Padre compasivo; recíbeme arrepentido y hazme como uno de tus jornaleros.'),
  'sabado-difuntos-carnaval': DIFUNTOS,
  carnaval: k('Kontakion del Juicio Final', 'Tono 1', 'Cuando vengas, oh Dios, a la tierra con gloria, y tiemble el universo, y un río de fuego corra ante el tribunal, y se abran los libros y se hagan públicos los secretos, líbrame entonces del fuego que no se apaga y hazme digno de estar a tu derecha, Juez justísimo.'),
  perdon: k('Kontakion del Domingo del Perdón', 'Tono 6', 'Guía de la sabiduría, dador de la prudencia, educador de los necios y defensor de los pobres: afianza y da entendimiento a mi corazón, Soberano. Dame Tú la palabra, Palabra del Padre; porque no contendré mis labios para clamarte: Misericordioso, ten piedad de mí, que he caído.'),
  ortodoxia: k('Kontakion del Domingo de la Ortodoxia', 'Tono 8', 'El Verbo del Padre, que nada puede abarcar, fue abarcado al encarnarse de ti, oh Theotokos; y, devolviendo a su forma antigua la imagen manchada, la unió a la belleza divina. Confesando la salvación, la representamos de obra y de palabra.'),
  palamas: PALAMAS,
  'adoracion-cruz': ADORACION_CRUZ,
  'juan-climaco': k('Kontakion de san Juan Clímaco', 'Tono 4', 'En la altura de la templanza te puso el Señor, como astro verdadero que no se extravía, para iluminar los confines de la tierra, Juan, padre nuestro y guía.'),
  'maria-egipciaca': k('Kontakion de santa María Egipcíaca', 'Tono 3', 'La que antes estaba llena de toda clase de fornicaciones se muestra hoy esposa de Cristo por el arrepentimiento; deseando la vida de los ángeles, pisotea a los demonios con el arma de la Cruz. Por eso te mostraste esposa del Reino, María gloriosa.'),
  lazaro: k('Kontakion del Sábado de Lázaro', 'Tono 2', 'La alegría de todos, Cristo, la verdad, la luz, la vida, la resurrección del mundo, se ha manifestado por su bondad a los que están en la tierra, y se ha hecho figura de la resurrección, concediendo a todos el perdón divino.'),
  ramos: k('Kontakion del Domingo de Ramos', 'Tono 6', 'Llevado en el trono en el cielo y en el pollino en la tierra, oh Cristo Dios, recibiste la alabanza de los ángeles y el himno de los niños que te clamaban: Bendito eres Tú, que vienes a llamar de nuevo a Adán.'),
  'lunes-santo': eslavo('Kontakion del Lunes Santo', 'Tono 8', 'Jacob lloraba la pérdida de José, y el noble José estaba sentado en el carro, honrado como un rey; porque, no habiéndose hecho entonces esclavo de los placeres de la egipcia, era glorificado por Aquel que ve los corazones de los hombres y envía la corona incorruptible.'),
  'martes-santo': eslavo('Kontakion del Martes Santo', 'Tono 2', 'Pensando, alma, en la hora del fin, y temiendo que se corte la higuera, trabaja con empeño, desdichada, el talento que se te dio, velando y clamando: Que no nos quedemos fuera de la cámara nupcial de Cristo.'),
  'miercoles-santo': eslavo('Kontakion del Miércoles Santo', 'Tono 4', 'Habiendo pecado más que la pecadora, oh Bueno, no te he traído nubes de lágrimas; pero en silencio me postro ante Ti suplicando, besando con amor tus pies purísimos, para que como Soberano me concedas el perdón de las deudas, a mí que te clamo, Salvador: Líbrame de mis obras inmundas.'),
  'jueves-santo': eslavo('Kontakion del Jueves Santo', 'Tono 2', 'Tomando el pan en las manos, el traidor las extiende a escondidas y recibe el precio de Aquel que con sus propias manos formó al hombre; y Judas, el siervo y el engañador, quedó sin enmienda.'),
  'viernes-santo': eslavo('Kontakion del Viernes Santo', 'Tono 8', 'Venid todos, cantemos al que fue crucificado por nosotros; porque María lo vio en el madero y decía: Aunque soportes la cruz, Tú eres mi Hijo y mi Dios.'),
  'sabado-santo': eslavo('Kontakion del Sábado Santo', 'Tono 6', 'El que encerró el abismo aparece muerto y, envuelto en mirra y en una sábana, es puesto en el sepulcro como mortal el Inmortal. Y las mujeres vinieron a ungirlo con mirra, llorando amargamente y clamando: Éste es el sábado bendito sobre todos, en el que Cristo, habiéndose dormido, resucitará al tercer día.'),
  pascua: PASCUA,
  'lunes-renovacion': PASCUA,
  'viernes-fuente': k('Kontakion de la Fuente Vivificante', 'Tono 8', 'De tu fuente inagotable, llena de la gracia de Dios, me concedes, sin dejar de manar, las corrientes de tu gracia, por encima de toda palabra; porque diste a luz al Verbo por encima de todo entendimiento, te suplico que me refresques con tu gracia, para que te clame: Alégrate, agua de salvación.'),
  tomas: k('Kontakion del Domingo de Tomás', 'Tono 8', 'Con su mano curiosa, Tomás exploró tu costado, que da la vida, oh Cristo Dios; porque, cuando entraste estando cerradas las puertas, te clamaba con los demás apóstoles: Tú eres mi Señor y mi Dios.'),
  radonitsa: PASCUA,
  miroforas: k('Kontakion de las Miróforas', 'Tono 2', 'Diciendo «Alegraos» a las miróforas, hiciste cesar el llanto de Eva, nuestra primera madre, por tu resurrección, oh Cristo Dios, y mandaste a tus apóstoles anunciar: El Salvador ha resucitado del sepulcro.'),
  paralitico: k('Kontakion del Paralítico', 'Tono 3', 'Mi alma, Señor, terriblemente paralizada por toda clase de pecados y de obras indignas, levántala con tu cuidado divino, como levantaste en otro tiempo al paralítico, para que, salvado, te clame: Gloria, oh Compasivo, a tu poder, oh Cristo.'),
  'mitad-pentecostes': k('Kontakion de la Mitad de Pentecostés', 'Tono 4', 'A la mitad de la fiesta de la Ley, Tú, Creador y Soberano de todas las cosas, decías a los presentes, oh Cristo Dios: Venid y sacad agua de inmortalidad. Por eso nos postramos ante Ti y clamamos con fe: Concédenos tus compasiones, porque Tú eres la fuente de nuestra vida.'),
  samaritana: eslavo('Kontakion de la Samaritana', 'Tono 8', 'Habiendo venido con fe al pozo, la samaritana te vio a Ti, agua de la sabiduría; y, bebiendo de ella en abundancia, heredó para siempre el Reino de lo alto, ella, la siempre gloriosa.'),
  ciego: k('Kontakion del Ciego de nacimiento', 'Tono 4', 'Ciego en los ojos del alma, vengo a Ti, oh Cristo, como el ciego de nacimiento, clamándote con arrepentimiento: Tú eres la luz resplandeciente de los que están en tinieblas.'),
  ascension: k('Kontakion de la Ascensión', 'Tono 6', 'Cumplida la economía de nuestra salvación y unidas a las del cielo las cosas de la tierra, subiste en gloria, oh Cristo Dios nuestro, sin apartarte en modo alguno, sino permaneciendo inseparable y clamando a los que te aman: Yo estoy con vosotros, y nadie contra vosotros.'),
  'padres-nicea': k('Kontakion de los Padres del I Concilio', 'Tono 8', 'La predicación de los apóstoles y las enseñanzas de los Padres afianzaron en la Iglesia la fe única; y ella, vestida con la túnica de la verdad, tejida de la teología de lo alto, enseña con rectitud y glorifica el gran misterio de la piedad.'),
  'sabado-difuntos-pentecostes': k('Kontakion del Sábado de Difuntos', 'Tono 8', 'A los que han partido de entre nosotros, dejando las cosas pasajeras, hazlos habitar en las moradas de los elegidos y dales descanso con los justos, Salvador inmortal; porque, si como hombres pecaron en la tierra, Tú, como Señor sin pecado, perdónales sus faltas voluntarias e involuntarias, por la mediación de la Theotokos, que te dio a luz, para que a una voz clamemos por ellos: Aleluya.', 'Es el del libro griego. Los libros eslavos cantan este día «Con los santos da descanso».'),
  pentecostes: PENTECOSTES,
  'espiritu-santo': PENTECOSTES,
  'todos-los-santos': MARTIRES,
};

/* ============================================================
   Las fiestas fijas y los santos
   ============================================================ */

const BAUTISTA_SINAXIS = k('Kontakion de la Sinaxis del Precursor', 'Tono 6', 'Temiendo tu presencia corporal, el Jordán se volvía atrás con temblor; y Juan, al cumplir el ministerio espiritual, se retraía con temor. Los órdenes de los ángeles se asombraban viéndote bautizado en la carne en las corrientes, y todos los que estaban en tinieblas quedaban iluminados, cantándote a Ti, que te manifestaste e iluminaste todas las cosas.');
const JUAN_TEOLOGO = k('Kontakion de san Juan el Teólogo', 'Tono 2', '¿Quién contará tus grandezas, virgen? Porque haces brotar milagros, manas curaciones e intercedes por nuestras almas, como teólogo y amigo de Cristo.');
const ARCANGEL = (tono: string, verbo: string) =>
  k('Kontakion del arcángel', tono, `Arcángel de Dios, servidor de la gloria divina, guía de los hombres y príncipe de los incorpóreos: ${verbo} lo que nos conviene y la gran misericordia, como arcángel de los incorpóreos.`);

/** Por el id del santo o de la fiesta fija, como en la ficha. */
export const SAINT_KONTAKIA: Record<string, Kontakion> = {
  /* Fiestas del Señor y de la Theotokos */
  'natividad-senor': k('Kontakion de la Natividad', 'Tono 3', 'La Virgen da hoy a luz al que está por encima de todo ser, y la tierra ofrece una cueva al Inaccesible. Los ángeles con los pastores lo glorifican, y los magos con la estrella van de camino; porque por nosotros ha nacido un Niño nuevo, el Dios de antes de los siglos.'),
  'teofania-señor': k('Kontakion de la Teofanía', 'Tono 4', 'Te has manifestado hoy al mundo, y tu luz, Señor, ha quedado impresa en nosotros, que te cantamos con conocimiento: Has venido, te has manifestado, oh Luz inaccesible.'),
  'encuentro-senor': k('Kontakion del Encuentro', 'Tono 1', 'Tú que santificaste con tu nacimiento el seno virginal y bendijiste, como convenía, las manos de Simeón, te has adelantado también ahora a salvarnos, oh Cristo Dios. Pero da la paz a tu pueblo en medio de las guerras y fortalece a los que nos gobiernan, a quienes amaste, Tú, el único amigo de los hombres.', 'El griego dice «a los reyes que amaste»; aquí, como en las letanías, «los que nos gobiernan».'),
  'anunciacion-s': k('Kontakion de la Anunciación', 'Tono 8', 'A ti, caudilla defensora, los cantos de victoria; a ti, que me libraste de lo terrible, las acciones de gracias te dedico yo, tu ciudad, oh Theotokos. Y tú, que tienes un poder invencible, líbrame de toda clase de peligros, para que te aclame: Alégrate, Esposa no desposada.', 'Es el mismo con que empieza el Akathistos.'),
  transfiguracion: k('Kontakion de la Transfiguración', 'Tono 7', 'Te transfiguraste en el monte, y tus discípulos contemplaron tu gloria, oh Cristo Dios, cuanto podían soportarla, para que, cuando te vieran crucificado, comprendieran que tu pasión era voluntaria y anunciaran al mundo que Tú eres en verdad el resplandor del Padre.'),
  dormicion: k('Kontakion de la Dormición', 'Tono 6', 'A la Theotokos, que no se duerme en sus intercesiones, esperanza inmutable en su protección, no la retuvieron el sepulcro ni la muerte; porque, siendo Madre de la Vida, la trasladó a la vida Aquel que habitó en su seno siempre virgen.'),
  'natividad-theotokos': k('Kontakion de la Natividad de la Theotokos', 'Tono 4', 'Joaquín y Ana fueron librados del oprobio de la esterilidad, y Adán y Eva de la corrupción de la muerte, oh Purísima, por tu santo nacimiento. Lo celebra también tu pueblo, rescatado de la culpa de sus faltas, clamándote: La estéril da a luz a la Theotokos, la que alimenta nuestra vida.'),
  'exaltacion-s': CRUZ,
  'entrada-theotokos-s': k('Kontakion de la Entrada en el Templo', 'Tono 4', 'El templo purísimo del Salvador, la cámara nupcial preciosísima, la Virgen, tesoro sagrado de la gloria de Dios, es llevada hoy a la casa del Señor, e introduce con ella la gracia que está en el Espíritu divino. Los ángeles de Dios la cantan: Ésta es la tienda celestial.'),
  'proteccion-theotokos': eslavo('Kontakion de la Protección', 'Tono 3', 'La Virgen está hoy en la iglesia y, con los coros de los santos, ora invisiblemente a Dios por nosotros. Los ángeles se postran con los obispos, y los apóstoles con los profetas se alegran: porque la Theotokos ruega por nosotros al Dios eterno.'),
  'miguel-arcangel': ARCANGELES,
  'sinaxis-gabriel': ARCANGEL('Tono 4', 'intercede por'),
  'milagro-colosas': ARCANGEL('Tono 2', 'pide para nosotros'),

  /* Santos */
  'basilio-magno': k('Kontakion de san Basilio el Grande', 'Tono 4', 'Te mostraste fundamento inconmovible de la Iglesia, repartiendo a todos los hombres un señorío que nadie puede arrebatar y sellándolo con tus enseñanzas, venerable Basilio, que nos revelaste el cielo.'),
  'juan-bautista-sinaxis': BAUTISTA_SINAXIS,
  'degollacion-s': k('Kontakion de la Degollación del Precursor', 'Tono 5', 'La gloriosa degollación del Precursor fue una disposición divina, para que anunciara también a los del Hades la venida del Salvador. Llore, pues, Herodías, que pidió un asesinato inicuo; porque no amó la ley de Dios ni la vida eterna, sino una vida fingida y pasajera.'),
  'antonio-magno': k('Kontakion de san Antonio el Grande', 'Tono 2', 'Rechazando los alborotos del mundo, acabaste tu vida en la quietud, imitando en todo al Bautista, oh venerabilísimo; por eso te honramos con él, Antonio, padre de los padres.'),
  'atanasio-alejandria': k('Kontakion de san Atanasio y san Cirilo', 'Tono 4', 'Grandísimos jerarcas de la piedad y nobles defensores de la Iglesia de Cristo: guardad a todos los que os cantan. Salva, oh Compasivo, a los que con fe te honran.'),
  'gregorio-teologo': k('Kontakion de san Gregorio el Teólogo', 'Tono 3', 'Con tu lengua de teólogo deshiciste los enredos de los oradores, glorioso, y vestiste a la Iglesia con la túnica de la ortodoxia, tejida de lo alto; vestida con ella, clama con nosotros, tus hijos: Alégrate, padre, mente altísima de la teología.'),
  'tres-jerarcas': k('Kontakion de los Tres Jerarcas', 'Tono 2', 'Tomaste, Señor, a los santos heraldos que hablaban de Dios, la cumbre de los maestros, para que gozaran de tus bienes y de tu descanso; porque recibiste sus trabajos y su fatiga por encima de todo holocausto, Tú, el único que glorifica a sus santos.'),
  'juan-crisostomo': k('Kontakion de san Juan Crisóstomo', 'Tono 6', 'Recibiste del cielo la gracia divina, y con tus labios enseñas a todos a adorar en la Trinidad al único Dios, Juan Crisóstomo, bienaventuradísimo y venerable. Con razón te alabamos, porque eres maestro que hace claras las cosas divinas.'),
  'nicolas-mira-dic': NICOLAS,
  'jorge-trofeoforo': k('Kontakion de san Jorge', 'Tono 4', 'Cultivado por Dios, te mostraste el más precioso cultivador de la piedad, recogiendo para ti las gavillas de las virtudes; porque, habiendo sembrado entre lágrimas, cosechas con alegría; y, habiendo combatido hasta la sangre, alcanzaste a Cristo, y por tus intercesiones, oh santo, concedes a todos el perdón de las faltas.'),
  'demetrio-s': k('Kontakion de san Demetrio', 'Tono 2', 'Con las corrientes de tu sangre, Demetrio, tiñó de púrpura a la Iglesia Dios, que te dio una fuerza invencible y guarda indemne a tu ciudad; porque tú eres su sostén.'),
  'gregorio-palamas': PALAMAS,
  'gregorio-palamas-nov': PALAMAS,
  'constantino-elena': k('Kontakion de los santos Constantino y Elena', 'Tono 3', 'Constantino, hoy, con su madre Elena, muestra la Cruz, el leño venerabilísimo, vergüenza de todos los judíos y arma de los soberanos fieles contra los adversarios; porque por nosotros se mostró como gran señal, temible en las batallas.', 'La frase sobre los judíos es lenguaje de la polémica antigua, la misma que se comenta en el akathistos de la Pasión; se traduce como está, sin suavizarla, y la Iglesia no la entiende como condena de un pueblo.'),
  'pedro-pablo': APOSTOLES,
  'elias-profeta': k('Kontakion del santo profeta Elías', 'Tono 2', 'Profeta y vidente de las grandes obras de Dios, Elías de gran nombre, que con tu palabra detuviste las nubes cargadas de agua: intercede por nosotros ante el único amigo de los hombres.'),
  'nectario-noviembre': k('Kontakion de san Nectario de Egina', 'Tono 8', 'Al astro recién encendido de la ortodoxia, al baluarte recién levantado de la Iglesia, cantémosle con alegría de corazón; porque, glorificado por la acción del Espíritu, hace brotar en abundancia la gracia de las curaciones para los que clamamos: Alégrate, padre Nectario.'),
  'juan-teologo-mayo': JUAN_TEOLOGO,
  'juan-teologo-dormicion': JUAN_TEOLOGO,
  'andres-apostol': k('Kontakion de san Andrés el Primer Llamado', 'Tono 6', 'Al que lleva el nombre de la valentía, al que habla de Dios, al primero llamado de los discípulos del Salvador, al hermano de Pedro, alabémoslo; porque, como entonces a éste, ahora nos clama también a nosotros: Venid, hemos encontrado al que deseábamos.'),
  'cosme-damian': k('Kontakion de los santos anárgiros', 'Tono 2', 'Habiendo recibido la gracia de las curaciones, dais la salud a los que están en necesidad, médicos taumaturgos gloriosos; abatid también, con vuestra visita, la insolencia de los adversarios, sanando al mundo con vuestros milagros.'),
  'espiridón-diciembre': k('Kontakion de san Espiridón', 'Tono 2', 'Herido por el amor de Cristo, sacratísimo, con la mente hecha alas por el resplandor del Espíritu, hallaste en la contemplación la obra, oh lleno de Dios; te hiciste altar divino y pides para todos la iluminación divina.'),
  panteleimon: k('Kontakion de san Panteleimón', 'Tono 5', 'Imitador del Misericordioso, y habiendo recibido de Él la gracia de las curaciones, atleta y mártir de Cristo Dios, sana con tus oraciones las enfermedades de nuestras almas, apartando los tropiezos del enemigo que siempre nos combate, de los que clamamos sin cesar: Sálvanos, Señor.'),
};

/* ============================================================
   Las Horas de Cuaresma
   ============================================================ */

/**
 * En los días de diario de la Gran Cuaresma el Horologion no pone el
 * kontakion del día en las Horas: pone en su lugar estos troparios, distintos
 * en cada Hora. En la cuarta semana se añade el kontakion del domingo de la
 * Cruz.
 */
export interface LentenHour {
  /** Lunes, martes y jueves; miércoles y viernes, si cambia. */
  comun: TextBlock[];
  lunesMartesJueves?: TextBlock[];
  miercolesViernes?: TextBlock[];
}

export const LENTEN_HOURS: Record<string, LentenHour> = {
  'hora-primera': {
    comun: [],
    lunesMartesJueves: [
      t('A la Madre de Dios, gloriosa sobre toda gloria y más santa que los santos ángeles, cantémosla sin cesar con el corazón y con los labios, confesándola Theotokos, porque en verdad dio a luz a Dios encarnado e intercede sin cesar por nuestras almas.'),
    ],
    miercolesViernes: [
      t('Adelántate pronto, antes de que seamos esclavos de los enemigos que te blasfeman y nos amenazan, oh Cristo Dios nuestro; destruye con tu Cruz a los que nos combaten: que sepan cuánto puede la fe de los ortodoxos, por las intercesiones de la Theotokos, oh único amigo de los hombres.'),
    ],
  },
  'hora-tercera': {
    comun: [
      t('Bendito eres, Cristo Dios nuestro, que hiciste sabios a los pescadores enviándoles el Espíritu Santo, y por medio de ellos pescaste al mundo entero. Amante de los hombres, gloria a Ti.'),
      rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
      t('Da a tus siervos, Jesús, un consuelo pronto y firme cuando nuestro espíritu desfallece. No te separes de nuestras almas en las tribulaciones, no te alejes de nuestra mente en los peligros, sino adelántate siempre a socorrernos. Acércate a nosotros, acércate, Tú que estás en todas partes; y como estabas siempre con tus apóstoles, únete también, oh Compasivo, a los que te desean, para que, unidos a Ti, cantemos y glorifiquemos a tu santísimo Espíritu.'),
      rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Esperanza, protección y refugio de los cristianos, muralla inexpugnable, puerto sin tempestad de los atribulados: eso eres tú, Theotokos purísima. Pero, como salvas al mundo con tu intercesión incesante, acuérdate también de nosotros, Virgen digna de todo canto.'),
    ],
  },
  'hora-sexta': {
    comun: [
      t('Obraste la salvación en medio de la tierra, oh Cristo Dios: extendiste en la Cruz tus manos purísimas, reuniendo a todas las naciones, que claman: Señor, gloria a Ti.'),
      rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
      t('Veneramos tu purísima imagen, oh Bueno, pidiendo el perdón de nuestras faltas, Cristo Dios; porque quisiste subir voluntariamente en la carne a la cruz para librar de la esclavitud del enemigo a los que Tú formaste. Por eso te aclamamos con acción de gracias: Todo lo llenaste de alegría, Salvador nuestro, al venir a salvar al mundo.'),
      rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
    ],
    lunesMartesJueves: [
      t('Tú, que eres fuente de compasión, haznos dignos de tu misericordia, oh Theotokos: mira al pueblo que ha pecado, muestra como siempre tu poder; porque, esperando en ti, te clamamos «Alégrate», como en otro tiempo Gabriel, el jefe de los ejércitos incorpóreos.'),
    ],
    miercolesViernes: [
      t('Eres gloriosa sobre toda gloria, Virgen Theotokos, y te cantamos; porque por la Cruz de tu Hijo fue derribado el Hades y murió la muerte; estábamos muertos y fuimos resucitados y hechos dignos de la vida; recibimos el paraíso, el gozo antiguo. Por eso, dando gracias, glorificamos como poderoso a Cristo nuestro Dios, el único lleno de misericordia.'),
    ],
  },
  'hora-novena': {
    comun: [
      t('Viendo el ladrón al autor de la vida colgado en la cruz, decía: Si no fuera Dios encarnado el que está crucificado con nosotros, el sol no habría escondido sus rayos ni la tierra se habría estremecido temblando. Pero Tú, que todo lo soportas, acuérdate de mí, Señor, en tu Reino.'),
      rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.'),
      t('Entre dos ladrones, tu Cruz se halló balanza de justicia: uno bajó al Hades por el peso de su blasfemia; el otro quedó aligerado de sus faltas para conocer a Dios. Oh Cristo Dios, gloria a Ti.'),
      rub('Ahora y siempre, y por los siglos de los siglos. Amén.'),
      t('Viendo en la cruz al Cordero, al Pastor y Salvador del mundo, la que lo dio a luz decía llorando: El mundo se alegra al recibir la redención, pero mis entrañas arden al ver tu crucifixión, que soportas por todos, Hijo y Dios mío.'),
    ],
  },
};

export const LENTEN_CROSS_KONTAKION = ADORACION_CRUZ;
