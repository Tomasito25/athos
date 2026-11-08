/**
 * Los apotegmas: un dicho de los Padres del desierto para cada día.
 *
 * Los Apophthegmata Patrum son las palabras que los monjes de Egipto, Palestina
 * y Siria de los siglos IV y V dejaron a quien les pedía «una palabra»: casi
 * siempre una frase, a veces un suceso breve. La colección alfabética griega
 * (PG 65) los ordena por el nombre de quien los dijo; de ahí salen casi
 * todos los de esta lista.
 *
 * ## De dónde sale el castellano
 *
 * El original griego es de dominio público; las traducciones modernas, en
 * castellano y en las demás lenguas, tienen derechos. Así que cada dicho va
 * traducido para ATHOS del griego, y sólo entró después de cotejar con la
 * colección que existe y con esa atribución; lo dudoso se dejó fuera, porque
 * aquí vale más un dicho menos que uno inventado. Donde se pudo asegurar, el
 * dicho lleva su número en la colección alfabética. Falta, como en todas las
 * traducciones de ATHOS, que una persona lo revise con el original delante
 * (docs/ANTES-DE-PUBLICAR.md).
 *
 * Como el versículo, el apotegma de un día concreto es siempre el mismo.
 */
import type { SourceMeta } from '@/types';

export type ApophthegmTheme =
  | 'humildad'
  | 'oracion'
  | 'silencio'
  | 'no-juzgar'
  | 'amor'
  | 'arrepentimiento'
  | 'paciencia'
  | 'vigilancia'
  | 'obediencia'
  | 'discernimiento'
  | 'trabajo'
  | 'celda'
  | 'tentacion'
  | 'muerte'
  | 'paz';

/** Los temas, en el orden en que los presenta la página. */
export const APOPHTHEGM_THEMES: Record<ApophthegmTheme, string> = {
  humildad: 'La humildad',
  oracion: 'La oración',
  silencio: 'El silencio',
  'no-juzgar': 'No juzgar',
  amor: 'El amor al prójimo',
  arrepentimiento: 'El arrepentimiento',
  paciencia: 'La paciencia',
  vigilancia: 'La vigilancia',
  obediencia: 'La obediencia',
  discernimiento: 'El discernimiento',
  trabajo: 'El trabajo',
  celda: 'La celda',
  tentacion: 'La tentación',
  muerte: 'El recuerdo de la muerte',
  paz: 'La paz',
};

export interface Apophthegm {
  id: string;
  /** Quién lo dijo, como se le nombra: «Abba Poemen», «Amma Sinclética». */
  abba: string;
  text: string;
  /** Su número en la colección alfabética, cuando se ha podido asegurar: «Poemen 1». */
  ref?: string;
  theme: ApophthegmTheme;
  /** La ficha del santo, si ATHOS la tiene. */
  saintId?: string;
}

export const APOPHTHEGMS_META: SourceMeta = {
  title: 'Apophthegmata Patrum',
  source:
    'Apophthegmata Patrum, colección alfabética griega (PG 65). Traducción al español hecha para ATHOS a partir del original, que es de dominio público',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-10-20',
  copyright:
    'Obra de dominio público en su original. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes:
    'No procede de ninguna traducción española publicada. Cada dicho se cotejó con la colección y su atribución antes de entrar, y los dudosos se dejaron fuera; donde se pudo asegurar, lleva su número en la colección alfabética. Está pendiente la revisión de una persona con el original delante.',
};

/**
 * En el orden en que salen, día tras día: nunca dos seguidos del mismo
 * Padre, y dentro de cada Padre alternando temas. Antonio el Grande y Poemen
 * son los que más tienen, como en la colección.
 */
export const APOPHTHEGMS: Apophthegm[] = [
  {
    id: 'poemen-1',
    abba: 'Abba Poemen',
    theme: 'oracion',
    ref: 'Poemen 183',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «El agua es blanda por naturaleza, y la piedra, dura. Y, sin embargo, un cántaro colgado encima de la piedra, que deja caer el agua gota a gota, acaba agujereándola. Así también la palabra de Dios es suave, y nuestro corazón, duro; pero cuando uno la oye a menudo, el corazón se le abre al temor de Dios».',
  },
  {
    id: 'antonio-1',
    abba: 'Abba Antonio el Grande',
    theme: 'trabajo',
    ref: 'Antonio 1',
    saintId: 'antonio-magno',
    text:
      'Una vez, estando abba Antonio en el desierto, le invadieron el desaliento y una gran oscuridad de pensamientos, y dijo a Dios: «Señor, quiero salvarme, pero mis pensamientos no me dejan. ¿Qué hago?». Salió un poco y vio a uno como él: sentado, trenzaba una cuerda; luego se levantaba a orar; después volvía a sentarse a trabajar, y otra vez a orar. Era un ángel del Señor, que le dijo: «Haz así y te salvarás».',
  },
  {
    id: 'poemen-2',
    abba: 'Abba Poemen',
    theme: 'silencio',
    ref: 'Poemen 27',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Hay quien parece callar, pero en su corazón condena a los demás: ese no para de hablar. Y hay quien habla de la mañana a la noche y guarda silencio; es decir, no dice nada que no sea de provecho».',
  },
  {
    id: 'antonio-2',
    abba: 'Abba Antonio el Grande',
    theme: 'vigilancia',
    ref: 'Antonio 3',
    saintId: 'antonio-magno',
    text:
      'Alguien preguntó a abba Antonio: «¿Qué debo guardar para agradar a Dios?». El anciano le respondió: «Vayas donde vayas, ten siempre a Dios ante tus ojos; hagas lo que hagas, que te respalde el testimonio de las santas Escrituras; y en el lugar donde te asientes, no te marches a la ligera. Guarda estas tres cosas y te salvarás».',
  },
  {
    id: 'poemen-3',
    abba: 'Abba Poemen',
    theme: 'tentacion',
    saintId: 'pimen-grande',
    text:
      'Un hermano fue a ver a abba Poemen y le dijo: «Me vienen muchos pensamientos y me ponen en peligro». El anciano lo sacó al aire libre y le dijo: «Abre tu manto y atrapa los vientos». «No puedo», respondió el hermano. Y el anciano le dijo: «Si eso no puedes, tampoco puedes impedir que los pensamientos vengan; lo que te toca es hacerles frente».',
  },
  {
    id: 'antonio-3',
    abba: 'Abba Antonio el Grande',
    theme: 'arrepentimiento',
    ref: 'Antonio 4',
    saintId: 'antonio-magno',
    text:
      'Abba Antonio dijo a abba Poemen: «Esta es la gran obra del hombre: echarse a sí mismo la culpa de sus faltas delante de Dios y contar con la tentación hasta el último aliento».',
  },
  {
    id: 'poemen-4',
    abba: 'Abba Poemen',
    theme: 'no-juzgar',
    ref: 'Poemen 64',
    saintId: 'pimen-grande',
    text:
      'Un hermano preguntó a abba Poemen: «Si veo a un hermano en pecado, ¿está bien cubrirlo?». El anciano le dijo: «En el momento en que cubrimos el pecado de nuestro hermano, Dios cubre el nuestro; y en el momento en que lo sacamos a la luz, Dios saca a la luz también el nuestro».',
  },
  {
    id: 'antonio-4',
    abba: 'Abba Antonio el Grande',
    theme: 'humildad',
    ref: 'Antonio 7',
    saintId: 'antonio-magno',
    text:
      'Dijo abba Antonio: «Vi todas las trampas del enemigo tendidas sobre la tierra y dije gimiendo: “¿Quién podrá pasar entre ellas?”. Y oí una voz que me decía: “La humildad”».',
  },
  {
    id: 'poemen-5',
    abba: 'Abba Poemen',
    theme: 'arrepentimiento',
    saintId: 'pimen-grande',
    text:
      'Un hermano dijo a abba Poemen: «He cometido un gran pecado y quiero hacer penitencia tres años». «Es mucho», le dijo el anciano. «¿Un año, entonces?». «Es mucho». Los que estaban allí preguntaron: «¿Cuarenta días?». «Es mucho», repitió. Y añadió: «Yo digo que, si uno se arrepiente de todo corazón y no vuelve a cometer ese pecado, Dios lo acoge en tres días».',
  },
  {
    id: 'macario-1',
    abba: 'Abba Macario el Grande',
    theme: 'oracion',
    ref: 'Macario 19',
    saintId: 'macario-egipcio',
    text:
      'Preguntaron a abba Macario: «¿Cómo debemos orar?». El anciano les dijo: «No hace falta hablar mucho. Basta con extender las manos y decir: “Señor, como tú quieras y como tú sabes, ten piedad”. Y si aprieta la lucha: “Señor, ayúdame”. Él sabe lo que nos conviene y tiene misericordia de nosotros».',
  },
  {
    id: 'poemen-6',
    abba: 'Abba Poemen',
    theme: 'amor',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Nadie tiene amor más grande que el que da la vida por su prójimo. Si alguien oye una palabra que le duele y, pudiendo contestar con otra igual, se esfuerza por callar; o si le hacen una injusticia y la soporta sin devolverla, ese da la vida por su prójimo».',
  },
  {
    id: 'juan-colobos-1',
    abba: 'Abba Juan Colobos',
    theme: 'obediencia',
    ref: 'Juan Colobos 1',
    text:
      'Contaban de abba Juan Colobos que se retiró a Escete junto a un anciano de la Tebaida. Su abba plantó un palo seco y le dijo: «Riégalo cada día con un cántaro de agua hasta que dé fruto». El agua estaba tan lejos que salía al anochecer y volvía por la mañana. A los tres años el palo reverdeció y dio fruto. El anciano tomó del fruto, lo llevó a la iglesia y dijo a los hermanos: «Tomad, comed el fruto de la obediencia».',
  },
  {
    id: 'poemen-7',
    abba: 'Abba Poemen',
    theme: 'vigilancia',
    saintId: 'pimen-grande',
    text:
      'Un hermano preguntó a abba Poemen qué quiere decir no devolver mal por mal. El anciano le dijo: «Esta pasión tiene cuatro grados: el primero, en el corazón; el segundo, en el rostro; el tercero, en la lengua; y el cuarto, en no hacer mal por mal. Si puedes purificar tu corazón, no llega al rostro; si llega al rostro, guárdate de hablar; y si llegas a hablar, córtalo pronto, para no devolver mal por mal».',
  },
  {
    id: 'antonio-5',
    abba: 'Abba Antonio el Grande',
    theme: 'amor',
    ref: 'Antonio 9',
    saintId: 'antonio-magno',
    text:
      'Dijo abba Antonio: «La vida y la muerte nos vienen del prójimo. Si ganamos al hermano, ganamos a Dios; pero si escandalizamos al hermano, pecamos contra Cristo».',
  },
  {
    id: 'poemen-8',
    abba: 'Abba Poemen',
    theme: 'discernimiento',
    saintId: 'pimen-grande',
    text:
      'Abba José preguntó a abba Poemen: «¿Cómo hay que ayunar?». Le respondió: «Yo prefiero que se coma cada día, pero poco, sin llegar a saciarse». «Y tú, de joven, ¿no ayunabas dos días seguidos?». «Sí, y tres, y cuatro, y la semana entera. Los Padres, que eran fuertes, lo probaron todo, y vieron que lo bueno es comer cada día, pero poco. Así nos dejaron el camino real, que es ligero».',
  },
  {
    id: 'macario-2',
    abba: 'Abba Macario el Grande',
    theme: 'silencio',
    saintId: 'macario-egipcio',
    text:
      'Abba Macario el Grande, al despedir a los hermanos en Escete después de la asamblea, les decía: «Huid, hermanos». Uno de los ancianos le preguntó: «¿Adónde vamos a huir, más allá de este desierto?». Él se puso el dedo sobre la boca y dijo: «Huid de esto». Luego entró en su celda, cerró la puerta y se quedó sentado.',
  },
  {
    id: 'poemen-9',
    abba: 'Abba Poemen',
    theme: 'humildad',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «El hombre necesita la humildad y el temor de Dios como el aliento que le sale por la nariz».',
  },
  {
    id: 'sisoes-1',
    abba: 'Abba Sisoes',
    theme: 'arrepentimiento',
    saintId: 'sisoes-grande',
    text:
      'Un hermano preguntó a abba Sisoes: «¿Qué hago, abba? He caído». El anciano le dijo: «Levántate». El hermano respondió: «Me levanté y he vuelto a caer». Le dijo el anciano: «Levántate otra vez». El hermano preguntó: «¿Hasta cuándo?». Y el anciano contestó: «Hasta que te lleven de este mundo, sea en el bien o en la caída. Porque el hombre se va tal como se le encuentra».',
  },
  {
    id: 'poemen-10',
    abba: 'Abba Poemen',
    theme: 'trabajo',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Si tres viven juntos, y uno guarda bien el recogimiento, otro está enfermo y da gracias, y el tercero sirve con intención limpia, los tres hacen la misma obra».',
  },
  {
    id: 'antonio-6',
    abba: 'Abba Antonio el Grande',
    theme: 'celda',
    ref: 'Antonio 10',
    saintId: 'antonio-magno',
    text:
      'Dijo abba Antonio: «Como los peces mueren si se quedan mucho tiempo en seco, así los monjes que se entretienen fuera de la celda o pasan el tiempo con la gente del mundo pierden el vigor de la quietud. Por eso, como el pez hacia el mar, apresurémonos nosotros hacia la celda, no sea que, entreteniéndonos fuera, olvidemos la guarda interior».',
  },
  {
    id: 'poemen-11',
    abba: 'Abba Poemen',
    theme: 'paciencia',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «En cualquier dificultad que te venga, la victoria sobre ella está en callar».',
  },
  {
    id: 'arsenio-1',
    abba: 'Abba Arsenio',
    theme: 'silencio',
    ref: 'Arsenio 2',
    saintId: 'arsenio-grande',
    text:
      'Abba Arsenio, ya retirado a la vida solitaria, volvió a orar: «Señor, guíame para que me salve». Y oyó una voz que le decía: «Arsenio, huye, calla, vive en quietud: estas son las raíces de una vida sin pecado».',
  },
  {
    id: 'poemen-12',
    abba: 'Abba Poemen',
    theme: 'paz',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Si te tienes en poco, encontrarás descanso dondequiera que vivas».',
  },
  {
    id: 'juan-colobos-2',
    abba: 'Abba Juan Colobos',
    theme: 'trabajo',
    ref: 'Juan Colobos 2',
    text:
      'Abba Juan Colobos dijo a su hermano mayor: «Quisiera vivir sin preocupaciones, como los ángeles, que no trabajan y sirven a Dios sin cesar». Se quitó el manto y se fue al desierto. A la semana volvió y llamó. Su hermano, sin abrir, preguntó: «¿Quién eres?». «Soy Juan». «Juan se ha hecho ángel; ya no vive entre los hombres». Lo dejó fuera hasta el alba, y al abrir le dijo: «Eres hombre: tienes que trabajar para comer». Él se postró: «Perdóname».',
  },
  {
    id: 'poemen-13',
    abba: 'Abba Poemen',
    theme: 'silencio',
    ref: 'Poemen 58',
    saintId: 'pimen-grande',
    text:
      'Un hermano fue a ver a abba Poemen en la segunda semana de Cuaresma, le abrió sus pensamientos y recobró la paz. Le dijo: «Hoy casi no vengo». «¿Por qué?», preguntó el anciano. «Pensé que, siendo Cuaresma, a lo mejor no me abrías». Abba Poemen le dijo: «No aprendimos a cerrar la puerta de madera, sino la puerta de la lengua».',
  },
  {
    id: 'macario-3',
    abba: 'Abba Macario el Grande',
    theme: 'humildad',
    saintId: 'macario-egipcio',
    text:
      'Un hermano pidió a abba Macario: «Dime cómo salvarme». Le dijo: «Ve al cementerio e insulta a los muertos». Fue, los insultó y volvió. «¿No te dijeron nada?». «No». «Ve mañana y alábalos». Lo hizo. «¿Te respondieron?». «No». Entonces le dijo: «Los ofendiste y no contestaron; los alabaste y no dijeron nada. Así tú, si quieres salvarte, hazte como un muerto: no hagas caso ni de las ofensas de los hombres ni de sus alabanzas, y podrás salvarte».',
  },
  {
    id: 'poemen-14',
    abba: 'Abba Poemen',
    theme: 'tentacion',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Si alguien encierra una serpiente y un escorpión en una vasija y la deja cerrada, con el tiempo mueren. Así pasa con los malos pensamientos que siembran los demonios: con la paciencia desaparecen».',
  },
  {
    id: 'sisoes-2',
    abba: 'Abba Sisoes',
    theme: 'paciencia',
    saintId: 'sisoes-grande',
    text:
      'Un hermano ofendido por otro acudió a abba Sisoes: «Me han hecho daño y quiero vengarme». El anciano le rogaba: «No, hijo; deja a Dios la venganza». Él insistía: «No pararé hasta vengarme». Dijo el anciano: «Oremos, hermano». Y, puesto en pie, dijo: «Oh Dios, ya no necesitamos que cuides de nosotros: nos vengamos nosotros mismos». El hermano cayó a sus pies: «Ya no pleitearé con mi hermano. Perdóname, abba».',
  },
  {
    id: 'poemen-15',
    abba: 'Abba Poemen',
    theme: 'amor',
    saintId: 'pimen-grande',
    text:
      'Unos ancianos fueron a ver a abba Poemen y le preguntaron: «Si vemos que algún hermano se duerme durante el oficio, ¿quieres que lo despertemos para que esté en vela?». Él les dijo: «Yo, cuando veo a un hermano que se duerme, le pongo la cabeza sobre mis rodillas y lo dejo descansar».',
  },
  {
    id: 'agaton-1',
    abba: 'Abba Agatón',
    theme: 'oracion',
    ref: 'Agatón 9',
    text:
      'Los hermanos preguntaron a abba Agatón: «Padre, ¿qué virtud exige más esfuerzo?». Les dijo: «Perdonadme, pero creo que ningún esfuerzo se compara con el de orar a Dios. Cada vez que el hombre quiere orar, los demonios intentan impedírselo, porque saben que sólo la oración les cierra el paso. Cualquier otra obra, si uno persevera en ella, acaba dando descanso; pero la oración exige combate hasta el último aliento».',
  },
  {
    id: 'poemen-16',
    abba: 'Abba Poemen',
    theme: 'vigilancia',
    ref: 'Poemen 85',
    saintId: 'pimen-grande',
    text:
      'Abba Poemen decía de abba Pior que cada día volvía a empezar.',
  },
  {
    id: 'antonio-7',
    abba: 'Abba Antonio el Grande',
    theme: 'discernimiento',
    ref: 'Antonio 13',
    saintId: 'antonio-magno',
    text:
      'Un cazador vio a abba Antonio bromeando con los hermanos y se escandalizó. El anciano le dijo: «Pon una flecha en el arco y ténsalo». Lo hizo. «Ténsalo más». Y lo tensó. «Más todavía». El cazador respondió: «Si lo tenso más de la cuenta, el arco se rompe». Y el anciano: «Así es también en la obra de Dios: si apretamos a los hermanos más de la medida, enseguida se quiebran. De vez en cuando hay que aflojar con ellos».',
  },
  {
    id: 'poemen-17',
    abba: 'Abba Poemen',
    theme: 'discernimiento',
    ref: 'Poemen 184',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Nosotros no aprendimos a matar el cuerpo, sino a matar las pasiones».',
  },
  {
    id: 'arsenio-2',
    abba: 'Abba Arsenio',
    theme: 'oracion',
    ref: 'Arsenio 13',
    saintId: 'arsenio-grande',
    text:
      'Abba Marcos preguntó a abba Arsenio: «¿Por qué huyes de nosotros?». El anciano le respondió: «Dios sabe que os quiero, pero no puedo estar a la vez con Dios y con los hombres. Los miles y miríadas del cielo tienen una sola voluntad; los hombres tienen muchas. No puedo dejar a Dios para irme con los hombres».',
  },
  {
    id: 'poemen-18',
    abba: 'Abba Poemen',
    theme: 'humildad',
    ref: 'Poemen 174',
    saintId: 'pimen-grande',
    text:
      'Un hermano preguntó a abba Poemen: «Viven conmigo unos hermanos; ¿quieres que los dirija?». «No», le dijo el anciano; «tú trabaja primero, y si ellos quieren vivir así, ya se ocuparán». «Pero son ellos, padre, los que quieren que los dirija». Y el anciano respondió: «No. Sé para ellos un modelo, no un legislador».',
  },
  {
    id: 'juan-colobos-3',
    abba: 'Abba Juan Colobos',
    theme: 'tentacion',
    text:
      'Abba Juan Colobos dijo: «Soy como un hombre sentado al pie de un gran árbol, que ve venir contra él muchas fieras y serpientes; cuando ya no puede resistirles, sube al árbol y se salva. Así yo, sentado en mi celda, veo venir contra mí los malos pensamientos, y cuando no tengo fuerzas contra ellos, me refugio en Dios por la oración y me salvo del enemigo».',
  },
  {
    id: 'moises-1',
    abba: 'Abba Moisés el Etíope',
    theme: 'celda',
    ref: 'Moisés 6',
    saintId: 'moises-etiope',
    text:
      'Un hermano fue a Escete a ver a abba Moisés y le pidió una palabra. El anciano le dijo: «Ve, siéntate en tu celda, y tu celda te lo enseñará todo».',
  },
  {
    id: 'macario-4',
    abba: 'Abba Macario el Grande',
    theme: 'tentacion',
    saintId: 'macario-egipcio',
    text:
      'Volvía una vez abba Macario del pantano a su celda cargado de hojas de palma, y le salió al camino el diablo con una hoz. Quiso herirle y no pudo. Le dijo: «Mucho me haces sufrir, Macario, porque no puedo contigo. Lo que tú haces, lo hago yo: tú ayunas, y yo no como nada; tú velas, y yo no duermo nunca. Sólo en una cosa me vences». «¿En cuál?», le preguntó. «En tu humildad. Por eso no puedo contigo».',
  },
  {
    id: 'pambo-1',
    abba: 'Abba Pambo',
    theme: 'muerte',
    ref: 'Pambo 8',
    text:
      'Contaban de abba Pambo que, en la hora de su muerte, dijo a los santos varones que le acompañaban: «Desde que vine a este desierto y me hice la celda, no recuerdo haber comido pan que no ganara con mis manos, ni me he arrepentido de ninguna palabra que haya dicho hasta hoy. Y así me voy a Dios como quien todavía no ha empezado a servirle».',
  },
  {
    id: 'poemen-19',
    abba: 'Abba Poemen',
    theme: 'silencio',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Si guardas silencio, encontrarás descanso en cualquier lugar donde vivas».',
  },
  {
    id: 'sisoes-3',
    abba: 'Abba Sisoes',
    theme: 'humildad',
    saintId: 'sisoes-grande',
    text:
      'Un hermano dijo a abba Sisoes: «Veo que el recuerdo de Dios permanece en mí». El anciano le respondió: «No es gran cosa que tu pensamiento esté con Dios; lo grande es verte por debajo de toda la creación. Esto, junto con el trabajo del cuerpo, lleva a la humildad».',
  },
  {
    id: 'sincletica-1',
    abba: 'Amma Sinclética',
    theme: 'paciencia',
    ref: 'Sinclética 1',
    saintId: 'sinclitica-alejandria',
    text:
      'Amma Sinclética dijo: «A los que nos acercamos a Dios nos esperan al principio lucha y mucho esfuerzo, y después una alegría que no se puede expresar. Los que quieren encender fuego primero se llenan de humo y lloran, y así consiguen lo que buscan. Así también nosotros tenemos que encender en nosotros el fuego divino con lágrimas y esfuerzo».',
  },
  {
    id: 'antonio-8',
    abba: 'Abba Antonio el Grande',
    theme: 'oracion',
    ref: 'Antonio 16',
    saintId: 'antonio-magno',
    text:
      'Un hermano dijo a abba Antonio: «Ruega por mí». El anciano le respondió: «Ni yo tendré compasión de ti ni la tendrá Dios, si tú mismo no pones empeño y no se lo pides a Dios».',
  },
  {
    id: 'agaton-2',
    abba: 'Abba Agatón',
    theme: 'paciencia',
    ref: 'Agatón 19',
    text:
      'Dijo abba Agatón: «El hombre iracundo, aunque resucite muertos, no es grato a Dios».',
  },
  {
    id: 'arsenio-3',
    abba: 'Abba Arsenio',
    theme: 'muerte',
    saintId: 'arsenio-grande',
    text:
      'Cuando abba Arsenio iba a morir, los hermanos lo vieron llorar y le dijeron: «¿De verdad también tú tienes miedo, padre?». Él respondió: «De verdad; el temor que siento en esta hora está conmigo desde que me hice monje». Y así se durmió.',
  },
  {
    id: 'epifanio-1',
    abba: 'Abba Epifanio',
    theme: 'amor',
    saintId: 'epifanio-chipre',
    text:
      'Abba Epifanio, obispo de Chipre, mandó decir a abba Hilarión: «Ven, que nos veamos antes de dejar este cuerpo». Mientras comían, le ofreció un ave. Hilarión le dijo: «Perdóname, desde que tomé el hábito no he comido carne». El obispo respondió: «Y yo, desde que tomé el hábito, no he dejado que nadie se fuera a dormir con algo contra mí, ni me he ido yo a dormir con algo contra nadie». Hilarión le dijo: «Perdóname: tu vida es mejor que la mía».',
  },
  {
    id: 'jose-1',
    abba: 'Abba José de Panefo',
    theme: 'no-juzgar',
    text:
      'Abba Poemen dijo a abba José: «Dime cómo hacerme monje». Él le respondió: «Si quieres encontrar descanso aquí y en la otra vida, di en toda ocasión: “¿Quién soy yo?”, y no juzgues a nadie».',
  },
  {
    id: 'juan-colobos-4',
    abba: 'Abba Juan Colobos',
    theme: 'arrepentimiento',
    text:
      'Abba Juan Colobos dijo: «Hemos dejado la carga ligera, que es acusarnos a nosotros mismos, y nos hemos echado encima la pesada, que es justificarnos».',
  },
  {
    id: 'macario-5',
    abba: 'Abba Macario el Grande',
    theme: 'discernimiento',
    saintId: 'macario-egipcio',
    text:
      'Decía abba Macario: «Si al reprender a alguien te mueve la ira, no haces más que dar gusto a tu propia pasión. No vayas a perderte tú por querer salvar a otro».',
  },
  {
    id: 'matoes-1',
    abba: 'Abba Matoes',
    theme: 'trabajo',
    ref: 'Matoes 1',
    text:
      'Decía abba Matoes: «Prefiero una tarea ligera y constante a otra que al principio cuesta mucho y pronto se abandona».',
  },
  {
    id: 'moises-2',
    abba: 'Abba Moisés el Etíope',
    theme: 'no-juzgar',
    ref: 'Moisés 2',
    saintId: 'moises-etiope',
    text:
      'Un hermano de Escete cometió una falta; se reunió el consejo y mandaron llamar a abba Moisés, que no quería ir. Al fin fue, cargando con una vasija agujereada llena de agua. Le preguntaron: «¿Qué es esto, padre?». Respondió: «Mis pecados se me van escurriendo por detrás y no los veo, y hoy vengo yo a juzgar los pecados de otro». Al oírlo, no dijeron nada al hermano y le perdonaron.',
  },
  {
    id: 'pambo-2',
    abba: 'Abba Pambo',
    theme: 'silencio',
    text:
      'Fue una vez a Escete el arzobispo Teófilo. Los hermanos reunidos dijeron a abba Pambo: «Di al arzobispo una palabra para que se edifique». El anciano respondió: «Si no le edifica mi silencio, tampoco le edificará mi palabra».',
  },
  {
    id: 'poemen-20',
    abba: 'Abba Poemen',
    theme: 'discernimiento',
    saintId: 'pimen-grande',
    text:
      'Un hermano preguntó a abba Poemen: «¿Qué es mejor, hablar o callar?». El anciano le dijo: «El que habla por Dios hace bien, y el que calla por Dios, también».',
  },
  {
    id: 'sisoes-4',
    abba: 'Abba Sisoes',
    theme: 'silencio',
    saintId: 'sisoes-grande',
    text:
      'Abba Sisoes dijo: «Hace treinta años que no ruego a Dios por pecado alguno; lo que le pido es esto: “Señor Jesucristo, guárdame de mi lengua”. Y hasta hoy caigo cada día por ella y peco».',
  },
  {
    id: 'sara-1',
    abba: 'Amma Sara',
    theme: 'tentacion',
    ref: 'Sara 1',
    text:
      'Contaban de amma Sara que pasó trece años combatida por el demonio de la lujuria, y nunca pidió que se le quitara aquella lucha, sino que decía: «Dios mío, dame fuerza».',
  },
  {
    id: 'sincletica-2',
    abba: 'Amma Sinclética',
    theme: 'celda',
    saintId: 'sinclitica-alejandria',
    text:
      'Amma Sinclética dijo: «Muchos viven en el monte y se pierden, porque se portan como la gente del mundo. Uno puede vivir entre mucha gente y guardar por dentro la soledad, y uno puede vivir solo y andar entre el gentío de sus pensamientos».',
  },
  {
    id: 'agaton-3',
    abba: 'Abba Agatón',
    theme: 'paz',
    ref: 'Agatón 4',
    text:
      'Dijo abba Agatón: «Nunca me he ido a dormir guardando algo contra alguien; y, en cuanto he podido, tampoco he dejado que nadie se fuera a dormir guardando algo contra mí».',
  },
  {
    id: 'amonas-1',
    abba: 'Abba Amonas',
    theme: 'paciencia',
    ref: 'Amonas 3',
    text:
      'Dijo abba Amonas: «Pasé catorce años en Escete pidiendo a Dios noche y día que me concediera vencer la ira».',
  },
  {
    id: 'antonio-9',
    abba: 'Abba Antonio el Grande',
    theme: 'amor',
    ref: 'Antonio 24',
    saintId: 'antonio-magno',
    text:
      'A abba Antonio se le reveló en el desierto: «En la ciudad hay uno que se te parece. Es médico de oficio; da lo que le sobra a los necesitados, y cada día canta el trisagio con los ángeles».',
  },
  {
    id: 'arsenio-4',
    abba: 'Abba Arsenio',
    theme: 'humildad',
    ref: 'Arsenio 6',
    saintId: 'arsenio-grande',
    text:
      'Una vez abba Arsenio consultaba a un anciano egipcio sobre sus pensamientos. Otro, al verlo, le dijo: «Abba Arsenio, tú, con tanta formación latina y griega, ¿preguntas a este campesino?». Respondió: «La cultura latina y la griega las conozco; pero el alfabeto de este campesino todavía no lo he aprendido».',
  },
  {
    id: 'besarion-1',
    abba: 'Abba Besarión',
    theme: 'no-juzgar',
    text:
      'El sacerdote echó de la iglesia a un hermano que había pecado. Abba Besarión se levantó y salió con él, diciendo: «También yo soy pecador».',
  },
  {
    id: 'elias-1',
    abba: 'Abba Elías',
    theme: 'muerte',
    ref: 'Elías 1',
    text:
      'Abba Elías dijo: «Yo temo tres cosas: el momento en que mi alma salga del cuerpo, el momento en que me presente ante Dios y el momento en que se pronuncie la sentencia contra mí».',
  },
  {
    id: 'epifanio-2',
    abba: 'Abba Epifanio',
    theme: 'oracion',
    saintId: 'epifanio-chipre',
    text:
      'El abad del monasterio que abba Epifanio tenía en Palestina le mandó decir: «Gracias a tus oraciones cumplimos nuestra regla: rezamos con cuidado tercia, sexta, nona y vísperas». Él los reprendió: «Se ve que las demás horas del día las dejáis sin oración. El verdadero monje debe tener la oración y los salmos en el corazón sin cesar».',
  },
  {
    id: 'hiperequio-1',
    abba: 'Abba Hiperequio',
    theme: 'no-juzgar',
    text:
      'Abba Hiperequio dijo: «Más vale comer carne y beber vino que comerse la carne de los hermanos hablando mal de ellos».',
  },
  {
    id: 'evagrio-1',
    abba: 'Abba Evagrio',
    theme: 'oracion',
    text:
      'Abba Evagrio dijo: «Gran cosa es orar sin distraerse; pero cantar los salmos sin distraerse es todavía más grande».',
  },
  {
    id: 'juan-colobos-5',
    abba: 'Abba Juan Colobos',
    theme: 'amor',
    text:
      'Abba Juan Colobos dijo: «Nadie construye una casa empezando por arriba, sino por los cimientos». Le preguntaron qué quería decir, y respondió: «El cimiento es el prójimo, al que debes ganar: eso es lo primero, porque de ahí dependen todos los mandamientos de Cristo».',
  },
  {
    id: 'jose-2',
    abba: 'Abba José de Panefo',
    theme: 'oracion',
    ref: 'José de Panefo 7',
    text:
      'Abba Lot fue a ver a abba José y le dijo: «Abba, en la medida de mis fuerzas rezo mi pequeño oficio, ayuno un poco, oro, medito y guardo el sosiego, y en lo que puedo purifico mis pensamientos. ¿Qué más puedo hacer?». El anciano se levantó, extendió las manos al cielo, y sus dedos se volvieron como diez lámparas de fuego. Y le dijo: «Si quieres, hazte todo fuego».',
  },
  {
    id: 'macario-6',
    abba: 'Abba Macario el Grande',
    theme: 'vigilancia',
    saintId: 'macario-egipcio',
    text:
      'Decía abba Macario: «Si guardamos memoria del mal que nos han hecho los hombres, perdemos la fuerza de acordarnos de Dios. Pero si recordamos el mal que nos hacen los demonios, seremos invulnerables».',
  },
  {
    id: 'matoes-2',
    abba: 'Abba Matoes',
    theme: 'humildad',
    ref: 'Matoes 2',
    text:
      'Decía abba Matoes: «Cuanto más se acerca el hombre a Dios, más pecador se ve. El profeta Isaías, cuando vio a Dios, se llamó a sí mismo desdichado e impuro».',
  },
  {
    id: 'moises-3',
    abba: 'Abba Moisés el Etíope',
    theme: 'arrepentimiento',
    saintId: 'moises-etiope',
    text:
      'Decía abba Moisés: «Si uno no se tiene en su corazón por pecador, Dios no le escucha». Un hermano le preguntó: «¿Qué es tenerse en el corazón por pecador?». El anciano respondió: «Quien carga con sus propias faltas no ve las de su prójimo».',
  },
  {
    id: 'nisteros-1',
    abba: 'Abba Nisteros el Grande',
    theme: 'discernimiento',
    text:
      'Uno de los padres preguntó a abba Nisteros el Grande, amigo de abba Antonio: «¿Qué obra buena puedo hacer?». Le respondió: «¿No valen igual todas las obras? La Escritura dice que Abraham era hospitalario, y Dios estaba con él; que David era humilde, y Dios estaba con él; que Elías amaba la quietud, y Dios estaba con él. Haz, pues, lo que veas que tu alma desea según Dios, y guarda tu corazón».',
  },
  {
    id: 'pambo-3',
    abba: 'Abba Pambo',
    theme: 'vigilancia',
    text:
      'Decía abba Pambo: «Si tienes corazón, puedes salvarte».',
  },
  {
    id: 'poemen-21',
    abba: 'Abba Poemen',
    theme: 'humildad',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «No te midas a ti mismo; arrímate a quien vive bien».',
  },
  {
    id: 'silvano-1',
    abba: 'Abba Silvano',
    theme: 'vigilancia',
    text:
      'Abba Moisés preguntó a abba Silvano: «¿Puede uno empezar de nuevo cada día?». Abba Silvano le respondió: «Si es trabajador, puede empezar de nuevo a cada hora».',
  },
  {
    id: 'sisoes-5',
    abba: 'Abba Sisoes',
    theme: 'muerte',
    saintId: 'sisoes-grande',
    text:
      'Cuando abba Sisoes estaba a punto de morir, rodeado de los padres, dijo: «Han venido los ángeles a llevarme, y les ruego que me dejen un poco más para arrepentirme». Los ancianos le dijeron: «Tú no necesitas arrepentirte, padre». Y él respondió: «De verdad, no sé si he empezado siquiera a arrepentirme».',
  },
  {
    id: 'sincletica-3',
    abba: 'Amma Sinclética',
    theme: 'humildad',
    saintId: 'sinclitica-alejandria',
    text:
      'Amma Sinclética dijo: «Un tesoro que se enseña se gasta; así también la virtud, cuando se da a conocer y se pregona, desaparece. Como la cera se derrite ante el fuego, así el alma se deshace con los elogios y pierde su vigor».',
  },
  {
    id: 'sara-2',
    abba: 'Amma Sara',
    theme: 'muerte',
    text:
      'Amma Sara dijo: «Cuando pongo el pie para subir la escalera, antes de subir me pongo la muerte delante de los ojos».',
  },
  {
    id: 'teodora-1',
    abba: 'Amma Teodora',
    theme: 'tentacion',
    ref: 'Teodora 2',
    text:
      'Amma Teodora dijo: «Esforcémonos por entrar por la puerta estrecha. Los árboles que no aguantan el invierno y las lluvias no pueden dar fruto. También para nosotros este mundo es invierno, y únicamente a través de muchas tribulaciones y pruebas podremos heredar el Reino de los cielos».',
  },
  {
    id: 'alonio-1',
    abba: 'Abba Alonio',
    theme: 'paz',
    ref: 'Alonio 1',
    text:
      'Dijo abba Alonio: «Si el hombre no dice en su corazón: “En el mundo estamos sólo Dios y yo”, no hallará descanso».',
  },
  {
    id: 'agaton-4',
    abba: 'Abba Agatón',
    theme: 'tentacion',
    ref: 'Agatón 21',
    text:
      'Un hermano consultó a abba Agatón sobre la lujuria. Le respondió: «Ve, arroja tu debilidad delante de Dios y encontrarás descanso».',
  },
  {
    id: 'amonas-2',
    abba: 'Abba Amonas',
    theme: 'obediencia',
    text:
      'Preguntaron a abba Amonas: «¿Cuál es el camino estrecho y angosto?». Respondió: «El camino estrecho y angosto es este: sujetar los propios pensamientos y cortar por Dios la propia voluntad. Eso es lo que significa: “Mira, nosotros lo hemos dejado todo y te hemos seguido”».',
  },
  {
    id: 'antonio-10',
    abba: 'Abba Antonio el Grande',
    theme: 'amor',
    ref: 'Antonio 32',
    saintId: 'antonio-magno',
    text:
      'Dijo abba Antonio: «Yo ya no temo a Dios, sino que lo amo, porque el amor echa fuera el temor».',
  },
  {
    id: 'arsenio-5',
    abba: 'Abba Arsenio',
    theme: 'silencio',
    saintId: 'arsenio-grande',
    text:
      'Dijo abba Arsenio: «Muchas veces hablé y me arrepentí; de haber callado, nunca».',
  },
  {
    id: 'besarion-2',
    abba: 'Abba Besarión',
    theme: 'vigilancia',
    text:
      'Dijo abba Besarión al morir: «El monje debe ser como los querubines y los serafines: todo ojos».',
  },
  {
    id: 'elias-2',
    abba: 'Abba Elías',
    theme: 'arrepentimiento',
    text:
      'Abba Elías dijo: «¿Qué puede el pecado donde hay arrepentimiento? ¿Y de qué sirve el amor donde hay soberbia?».',
  },
  {
    id: 'epifanio-3',
    abba: 'Abba Epifanio',
    theme: 'discernimiento',
    saintId: 'epifanio-chipre',
    text:
      'Abba Epifanio dijo: «Leer las Escrituras es una gran defensa contra el pecado». Y dijo también: «No conocer las Escrituras es un precipicio y un abismo profundo».',
  },
  {
    id: 'evagrio-2',
    abba: 'Abba Evagrio',
    theme: 'muerte',
    text:
      'Abba Evagrio dijo: «Acuérdate siempre de tu salida de este mundo y no olvides el juicio eterno, y no habrá falta en tu alma».',
  },
  {
    id: 'hiperequio-2',
    abba: 'Abba Hiperequio',
    theme: 'vigilancia',
    text:
      'Abba Hiperequio dijo: «Quien no sujeta la lengua en el momento de la ira tampoco sujetará sus pasiones».',
  },
  {
    id: 'jose-3',
    abba: 'Abba José de Panefo',
    theme: 'amor',
    text:
      'Un hermano preguntó a abba José: «¿Qué hago? No soy capaz de llevar una vida dura ni de trabajar para dar limosna». El anciano le dijo: «Si no puedes nada de eso, guarda al menos tu conciencia limpia de todo mal contra tu prójimo, y te salvarás».',
  },
  {
    id: 'juan-colobos-6',
    abba: 'Abba Juan Colobos',
    theme: 'humildad',
    text:
      'Abba Juan Colobos preguntó: «¿Quién vendió a José?». Un hermano respondió: «Sus hermanos». El anciano le dijo: «No: lo vendió su humildad. Podía haber dicho “Soy su hermano” y oponerse, pero calló, y así se vendió por humildad. Y esa misma humildad lo hizo señor de Egipto».',
  },
  {
    id: 'juan-persa-1',
    abba: 'Abba Juan el Persa',
    theme: 'amor',
    text:
      'Una vez llegaron unos malhechores adonde vivía abba Juan el Persa. Él trajo una palangana y quiso lavarles los pies. Ellos, avergonzados, empezaron a arrepentirse.',
  },
  {
    id: 'marcos-discipulo-1',
    abba: 'Abba Marcos, discípulo de abba Silvano',
    theme: 'obediencia',
    ref: 'Marcos, discípulo de Silvano 1',
    text:
      'Abba Silvano quería mucho a su discípulo Marcos, que era copista, por su obediencia, y unos ancianos se lo reprochaban. Él los llevó consigo y fue llamando a cada celda: «Hermano, ven, te necesito». Ninguno salió enseguida. Llamó a Marcos, y salió al instante. En su celda vieron que estaba escribiendo una omega y la había dejado sin acabar. Los ancianos dijeron: «De verdad, abba, al que tú amas lo amamos también nosotros, y Dios lo ama».',
  },
  {
    id: 'macario-7',
    abba: 'Abba Macario el Grande',
    theme: 'amor',
    saintId: 'macario-egipcio',
    text:
      'Decía abba Macario: «Una palabra mala vuelve malos incluso a los buenos, y una palabra buena vuelve buenos incluso a los malos».',
  },
  {
    id: 'matoes-3',
    abba: 'Abba Matoes',
    theme: 'humildad',
    text:
      'Decía abba Matoes: «De joven me decía: “Quizá haga algo bueno”. Ahora que soy viejo, veo que no hay en mí ni una sola obra buena».',
  },
  {
    id: 'moises-4',
    abba: 'Abba Moisés el Etíope',
    theme: 'oracion',
    saintId: 'moises-etiope',
    text:
      'Decía abba Moisés: «Si las obras no concuerdan con la oración, uno se fatiga en vano». Un hermano le preguntó: «¿Qué quiere decir que concuerden las obras y la oración?». Respondió: «Que no volvamos a hacer aquello contra lo que pedimos al orar. Cuando el hombre renuncia a su propia voluntad, Dios se reconcilia con él y acoge su oración».',
  },
  {
    id: 'nisteros-2',
    abba: 'Abba Nisteros el Grande',
    theme: 'vigilancia',
    text:
      'Iba abba Nisteros el Grande por el desierto con un hermano. Vieron una gran serpiente y huyeron. El hermano le dijo: «¿También tú tienes miedo, padre?». El anciano respondió: «No tengo miedo, hijo; pero me convenía huir, porque, si no, no habría escapado del espíritu de vanagloria».',
  },
  {
    id: 'pambo-4',
    abba: 'Abba Pambo',
    theme: 'amor',
    text:
      'Abba Teodoro de Ferme pidió a abba Pambo: «Dime una palabra». Le costó mucho, pero le dijo: «Teodoro, ve y ten misericordia de todos, porque la misericordia alcanza confianza ante Dios».',
  },
  {
    id: 'poemen-22',
    abba: 'Abba Poemen',
    theme: 'discernimiento',
    saintId: 'pimen-grande',
    text:
      'Decía abba Poemen: «Todo lo que pasa de la medida viene de los demonios».',
  },
  {
    id: 'serapion-1',
    abba: 'Abba Serapión',
    theme: 'amor',
    text:
      'Un hermano pidió a abba Serapión: «Dime una palabra». El anciano le contestó: «¿Qué te voy a decir? Has cogido lo que era de las viudas y de los huérfanos y lo has puesto en ese estante». Porque lo había visto lleno de libros.',
  },
  {
    id: 'silvano-2',
    abba: 'Abba Silvano',
    theme: 'humildad',
    text:
      'Abba Silvano dijo: «¡Pobre del hombre cuya fama es mayor que sus obras!».',
  },
  {
    id: 'sisoes-6',
    abba: 'Abba Sisoes',
    theme: 'oracion',
    saintId: 'sisoes-grande',
    text:
      'Abba Sisoes dijo: «Busca a Dios, y no busques dónde habita».',
  },
  {
    id: 'teodoro-1',
    abba: 'Abba Teodoro de Ferme',
    theme: 'discernimiento',
    ref: 'Teodoro de Ferme 1',
    text:
      'Abba Teodoro de Ferme tenía tres buenos libros, de los que sacaban provecho él y los hermanos. Preguntó a abba Macario si debía quedárselos o venderlos y dar el dinero a los pobres. El anciano le dijo: «Esas obras son buenas, pero lo mejor de todo es no poseer nada». Él fue, los vendió y dio el dinero a los pobres.',
  },
  {
    id: 'sara-3',
    abba: 'Amma Sara',
    theme: 'paz',
    text:
      'Amma Sara dijo: «Si pidiera a Dios que todos los hombres pensaran bien de mí, me vería pidiendo perdón a la puerta de cada uno. Más bien le pediré que mi corazón sea puro con todos».',
  },
  {
    id: 'sincletica-4',
    abba: 'Amma Sinclética',
    theme: 'humildad',
    saintId: 'sinclitica-alejandria',
    text:
      'Amma Sinclética dijo: «Imita al publicano, para que no te condenen con el fariseo. Escoge la mansedumbre de Moisés, y tu corazón de roca se convertirá en manantial de agua».',
  },
  {
    id: 'teodora-2',
    abba: 'Amma Teodora',
    theme: 'humildad',
    text:
      'Amma Teodora dijo: «Ni la ascesis, ni las vigilias, ni esfuerzo alguno salvan, sino sólo la humildad verdadera. Un anacoreta que expulsaba demonios les preguntó: —¿Qué os hace salir? ¿El ayuno? —Nosotros no comemos ni bebemos. —¿Las vigilias? —Nosotros no dormimos. —¿Vivir apartado? —Nosotros vivimos en los desiertos. —¿Pues qué os hace salir? —Nada nos vence, sino la humildad».',
  },
];

/**
 * El apotegma que toca un día.
 *
 * Se cuentan los días seguidos desde 1970, no el día del año: así el 1 de
 * enero sigue al 31 de diciembre en la lista, y tampoco al cambiar de año
 * hablan dos días seguidos por boca del mismo Padre.
 */
export function apophthegmFor(date: Date): Apophthegm {
  const dias = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return APOPHTHEGMS[dias % APOPHTHEGMS.length]!;
}
