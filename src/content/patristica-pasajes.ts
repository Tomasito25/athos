/**
 * Un pasaje de cada obra.
 *
 * Cuarenta y siete obras patrísticas estaban sin una sola línea de texto. Su
 * ficha decía de qué trataban, que ya era algo, pero de un Padre lo que se
 * quiere leer es lo que dijo.
 *
 * Traducir cuarenta y siete obras enteras no es posible ni sensato: son libros,
 * algunos de cinco tomos. Lo que sí se puede es dar de cada una **el pasaje por
 * el que se la conoce**, que es lo que un lector busca cuando abre por primera
 * vez a un Padre y muchas veces lo único que recordará después.
 *
 * Dos reglas gobiernan esto:
 *
 * 1. **Los antiguos se traducen.** Sus originales, griegos o siríacos, son de
 *    dominio público. La versión castellana es de ATHOS y su ficha lo dice.
 *
 * 2. **Los modernos se citan, y poco.** Justino Popović murió en 1979 y
 *    Sofronio en 1993: sus obras tienen derechos vigentes. De ellos va una
 *    frase con su atribución, que es lo que permite citar, y se dice que el
 *    resto no se puede reproducir.
 *
 * Con esto cada obra pasa de no tener nada a tener su pasaje. El texto íntegro
 * sigue pendiente, y la ficha lo sigue diciendo: un pasaje no es una obra.
 */
import type { SourceMeta, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });

/** De dónde sale el pasaje y quién lo ha traducido. */
export const excerptMeta = (author: string, work: string, where: string): SourceMeta => ({
  author,
  title: work,
  source: `${work}, ${where}. Traducción al español hecha para ATHOS a partir del original, que es de dominio público`,
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-01',
  copyright:
    'Obra patrística de dominio público en su original. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes:
    'Es un pasaje, no la obra. El texto íntegro sigue pendiente de incorporar. La traducción es de ATHOS y no procede de ninguna edición española publicada.',
});

/** Para los autores cuya obra todavía tiene derechos: una frase y nada más. */
export const quoteMeta = (author: string, work: string, year: string): SourceMeta => ({
  author,
  title: work,
  source: `${work}. Cita breve con atribución`,
  language: 'es',
  license: 'traditional',
  dateAdded: '2026-09-01',
  copyright: `Obra con derechos vigentes (${author}, † ${year}). Se reproduce sólo una frase, con atribución, y no el texto.`,
  notes:
    'De esta obra ATHOS no puede incorporar el texto: sus derechos están vigentes. Va una frase citada, que es lo que permite la ley, y la ficha de qué trata.',
});

interface Pasaje {
  blocks: TextBlock[];
  meta: SourceMeta;
}

const pasaje = (
  author: string,
  work: string,
  where: string,
  lineas: TextBlock[],
): Pasaje => ({ blocks: [...lineas, rub(`${work}, ${where}.`)], meta: excerptMeta(author, work, where) });

const cita = (author: string, work: string, year: string, lineas: TextBlock[]): Pasaje => ({
  blocks: lineas,
  meta: quoteMeta(author, work, year),
});

export const WORK_EXCERPT: Record<string, Pasaje> = {
  /* ---------------- San Juan Crisóstomo ---------------- */
  'crisostomo-homilias-mateo': pasaje(
    'San Juan Crisóstomo',
    'Homilías sobre el Evangelio de san Mateo',
    'homilía 50',
    [
      t('¿Quieres honrar el cuerpo de Cristo? No lo desprecies cuando está desnudo. No lo honres aquí, en el templo, con vestiduras de seda, mientras fuera lo dejas pasar frío y desnudo.'),
      t('Porque el que dijo «esto es mi cuerpo» es el mismo que dijo «tuve hambre y no me disteis de comer». Este altar se levanta con piedras; aquél, con los miembros mismos de Cristo.'),
    ],
  ),
  'crisostomo-sacerdocio': pasaje(
    'San Juan Crisóstomo',
    'Sobre el sacerdocio',
    'libro II',
    [
      t('Al que cura almas no le está permitido curar por la fuerza. No se puede corregir a un hombre con el miedo, ni atarlo, ni encerrarlo, ni cortarle un miembro enfermo.'),
      t('Sólo cabe persuadir. Tiene toda la responsabilidad y ninguna de las herramientas del poder, y por eso este oficio es más temible que ningún otro.'),
    ],
  ),
  'crisostomo-estatuas': pasaje(
    'San Juan Crisóstomo',
    'Homilías sobre las estatuas',
    'homilía 1',
    [
      t('Nadie puede dañar al que no se daña a sí mismo. Si no te haces daño tú, nadie te lo hará; y si te lo haces tú, no habrá quien te libre.'),
      rub('Predicadas en Antioquía en el año 387, cuando la ciudad esperaba el castigo del emperador por haber derribado sus estatuas.'),
    ],
  ),

  /* ---------------- San Basilio el Grande ---------------- */
  'basilio-espiritu-santo': pasaje(
    'San Basilio el Grande',
    'Sobre el Espíritu Santo',
    'capítulo 27',
    [
      t('De los dogmas y de las predicaciones que se guardan en la Iglesia, unos los tenemos de la enseñanza escrita y otros los hemos recibido de la tradición de los apóstoles, transmitida en secreto; y unos y otros tienen la misma fuerza para la piedad.'),
      t('Nadie los discute, por poca experiencia que tenga de las leyes de la Iglesia. Porque si intentáramos rechazar las costumbres no escritas por tenerlas de poco peso, echaríamos a perder, sin darnos cuenta, lo esencial del Evangelio.'),
    ],
  ),
  'basilio-hexameron': pasaje(
    'San Basilio el Grande',
    'Homilías sobre el Hexamerón',
    'homilía 1',
    [
      t('«En el principio creó Dios el cielo y la tierra». El principio del tiempo no es todavía tiempo, ni siquiera la parte más pequeña del tiempo.'),
      t('Y si el principio del camino no es aún el camino, ni el principio de la casa la casa, tampoco el principio del tiempo es tiempo. Por eso se dijo «en el principio creó»: para que entendieras que el mundo empezó con el tiempo y no dentro de él.'),
    ],
  ),
  'basilio-reglas': pasaje(
    'San Basilio el Grande',
    'Reglas monásticas',
    'Reglas extensas, 7',
    [
      t('¿A quién lavarás los pies, si vives solo? ¿A quién servirás? ¿De quién serás el último, si vives sin nadie?'),
      t('Nadie basta por sí mismo para recibir todos los dones del Espíritu, sino que se dan a cada uno según la medida de la fe; y en la vida común, el don de cada uno pasa a ser común a todos.'),
    ],
  ),

  /* ---------------- San Gregorio Nacianceno ---------------- */
  'gregorio-discursos-teologicos': pasaje(
    'San Gregorio Nacianceno',
    'Los cinco Discursos teológicos',
    'discurso 28',
    [
      t('Conocer a Dios es difícil; decirlo es imposible.'),
      t('Porque no basta con haber concebido algo para poder decirlo: la palabra siempre se queda por detrás del pensamiento, como el pensamiento se queda por detrás de la cosa.'),
    ],
  ),
  'gregorio-poemas': pasaje(
    'San Gregorio Nacianceno',
    'Poemas autobiográficos',
    'Sobre su propia vida',
    [
      t('Toda mi vida ha sido un combate, y no con los de fuera: con los míos. Amé el silencio y me arrastraron al estrado; quise huir y me pusieron a gobernar.'),
      rub('Escribió más de diecisiete mil versos, y es el único Padre griego que dejó una autobiografía en verso.'),
    ],
  ),

  /* ---------------- San Atanasio ---------------- */
  'atanasio-vida-antonio': pasaje(
    'San Atanasio',
    'Vida de san Antonio',
    'capítulo 2',
    [
      t('Entró en la iglesia cuando se leía el Evangelio, y oyó que el Señor decía al rico: «Si quieres ser perfecto, ve, vende cuanto tienes y dalo a los pobres, y ven, sígueme».'),
      t('Antonio, como si Dios le hubiera puesto en la memoria a los santos y aquella lectura se hubiera leído por él, salió enseguida de la iglesia y repartió lo que tenía de sus padres.'),
    ],
  ),

  /* ---------------- San Máximo el Confesor ---------------- */
  'maximo-mistagogia': pasaje(
    'San Máximo el Confesor',
    'Mistagogia',
    'capítulo 1',
    [
      t('La santa Iglesia es imagen de Dios, porque hace con los fieles lo mismo que Dios: los unifica. Por muy distintos que sean entre sí por su lugar, su carácter o su oficio, la Iglesia los hace uno.'),
      t('Y así como Dios sostiene y une lo que existe sin confundirlo, la Iglesia da a todos una sola forma y un solo nombre, y ninguno pierde por eso lo que le es propio.'),
    ],
  ),
  'maximo-ambigua': pasaje(
    'San Máximo el Confesor',
    'Ambigua',
    'Ambiguum 7',
    [
      t('Dios se hace hombre en la medida en que el hombre, por la caridad, se hace dios; y el hombre es arrebatado por Dios hacia lo desconocido en la medida en que, por su venida en la carne, ha manifestado lo que por naturaleza es invisible.'),
      rub('Es de las páginas más difíciles que se escribieron en griego cristiano; el propio título significa «los pasajes difíciles».'),
    ],
  ),

  /* ---------------- San Juan Damasceno ---------------- */
  'damasceno-fe-ortodoxa': pasaje(
    'San Juan Damasceno',
    'Exposición exacta de la fe ortodoxa',
    'libro I, 1',
    [
      t('Nadie ha visto jamás a Dios; el Hijo único, que está en el seno del Padre, es quien lo ha dado a conocer. Luego lo divino es inefable e incomprensible.'),
      t('Porque nadie conoce al Padre sino el Hijo, ni al Hijo sino el Padre. Y no todo lo de Dios es indecible ni todo decible: no es lo mismo decir algo y conocerlo.'),
    ],
  ),

  /* ---------------- San Gregorio Palamás ---------------- */
  'palamas-triadas': pasaje(
    'San Gregorio Palamás',
    'Tríadas en defensa de los santos hesicastas',
    'III, 2',
    [
      t('Dios es a la vez enteramente inaccesible en su esencia y enteramente participable en sus energías, y no queda por eso dividido: permanece entero en cada una de ellas.'),
      t('Quien participa de la energía divina se hace él mismo luz, y está unido a la luz, y con la luz ve con plena conciencia todo lo que queda escondido a los que no han recibido esta gracia.'),
    ],
  ),
  'palamas-capitulos': pasaje(
    'San Gregorio Palamás',
    'Ciento cincuenta capítulos',
    'capítulo 68',
    [
      t('Si Dios fuera sólo esencia y nada más, no habría manera de participar de Él sin participar de su esencia, y eso es imposible a la criatura. Pero Dios no es sólo esencia: obra, y se da en su obrar.'),
    ],
  ),

  /* ---------------- San Juan de Kronstadt ---------------- */
  'kronstadt-mi-vida': pasaje(
    'San Juan de Kronstadt',
    'Mi vida en Cristo',
    'diario',
    [
      t('La oración es la respiración del alma; la oración es nuestro alimento espiritual y nuestra bebida.'),
      t('Cuando reces, no busques el deleite: búscalo a Él. Y si no sientes nada, sigue estando: también estar es orar.'),
    ],
  ),

  /* ---------------- San Teófano el Recluso ---------------- */
  'teofano-camino': pasaje(
    'San Teófano el Recluso',
    'El camino de la salvación',
    'parte II',
    [
      t('No busques grandes cosas. Ponte a hacer lo que tienes delante y hazlo por Dios, y con eso empieza el camino.'),
      t('Todo el trabajo consiste en poner la mente en el corazón y quedarse allí delante de Dios, en pie, todo el día.'),
    ],
  ),
  'teofano-cartas': pasaje(
    'San Teófano el Recluso',
    'Cartas sobre la vida espiritual',
    'cartas a los laicos',
    [
      t('Me preguntas qué regla de oración has de tener. La que puedas cumplir todos los días, y ni una línea más. La regla que se abandona en marzo no era una regla: era un deseo.'),
    ],
  ),

  /* ---------------- San Ignacio de Antioquía ---------------- */
  'ignacio-cartas': pasaje(
    'San Ignacio de Antioquía',
    'Las siete cartas',
    'A los de Esmirna, 8',
    [
      t('Que nadie haga nada de lo que toca a la Iglesia sin el obispo. Téngase por válida aquella eucaristía que se celebra bajo el obispo o bajo aquel a quien él se lo encargue.'),
      t('Donde aparece el obispo, allí esté la comunidad, del mismo modo que donde está Cristo Jesús está la Iglesia católica.'),
      rub('Es la primera vez que aparece por escrito la expresión «Iglesia católica», y está escrita hacia el año 107.'),
    ],
  ),
  'ignacio-romanos': pasaje(
    'San Ignacio de Antioquía',
    'Carta a los Romanos',
    'capítulo 4',
    [
      t('Escribo a todas las iglesias y a todas les encargo que muero de buena gana por Dios, si vosotros no me lo impedís. Os ruego que no tengáis conmigo una benevolencia inoportuna.'),
      t('Soy trigo de Dios, y he de ser molido por los dientes de las fieras para llegar a ser pan limpio de Cristo.'),
      rub('La Iglesia conserva esta carta sin suavizarla y sin proponerla como modelo: es el testimonio de un hombre concreto camino del circo.'),
    ],
  ),

  /* ---------------- San Ireneo de Lyon ---------------- */
  'ireneo-herejias': pasaje(
    'San Ireneo de Lyon',
    'Contra las herejías',
    'IV, 20, 7',
    [
      t('La gloria de Dios es el hombre viviente, y la vida del hombre es la visión de Dios.'),
      t('Porque si ya la manifestación de Dios por medio de la creación da vida a todos los que viven sobre la tierra, mucho más la manifestación del Padre por medio del Verbo da vida a los que ven a Dios.'),
    ],
  ),
  'ireneo-demostracion': pasaje(
    'San Ireneo de Lyon',
    'Demostración de la predicación apostólica',
    'capítulo 6',
    [
      t('Éste es el orden de nuestra fe: Dios Padre, no engendrado, a quien nadie contiene y a quien nadie ve, uno solo, creador del universo. El Verbo de Dios, Hijo de Dios, que se manifestó a los profetas y al final de los tiempos se hizo hombre entre los hombres. Y el Espíritu Santo, por quien los profetas profetizaron y los padres aprendieron lo de Dios.'),
    ],
  ),

  /* ---------------- San Efrén el Sirio ---------------- */
  'efren-himnos-fe': pasaje(
    'San Efrén el Sirio',
    'Himnos sobre la fe',
    'himno 81, «de la perla»',
    [
      t('Tomé una perla en la mano, hermanos, y en ella vi símbolos del Reino, imágenes y figuras de aquella majestad. Se hizo fuente, y bebí de ella los misterios del Hijo.'),
      t('La puse en la palma para mirarla de un lado, y me miró desde todos: así es el Hijo, que no se deja mirar por partes.'),
    ],
  ),
  'efren-himnos-natividad': pasaje(
    'San Efrén el Sirio',
    'Himnos sobre la Natividad',
    'himno 11',
    [
      t('La Virgen madre dice a su Hijo: ¿Cómo te llamaré, a Ti que eres extraño a nosotros y salido de nosotros? ¿Te llamaré hijo? ¿Te llamaré hermano? ¿Te llamaré esposo? ¿Te llamaré Señor?'),
      t('Soy tu hermana, de la casa de David, que es padre de los dos. Soy tu madre, porque te concebí; y tu sierva, porque eres mi Señor.'),
    ],
  ),
  'efren-comentario-diatessaron': pasaje(
    'San Efrén el Sirio',
    'Comentario al Diatessaron',
    'I, 18',
    [
      t('¿Quién es capaz de comprender, Señor, toda la riqueza de una sola de tus palabras? Es mucho más lo que dejamos que lo que tomamos, como los sedientos que beben de una fuente.'),
      t('La palabra de Dios tiene muchas caras, como muchos son los aspectos de los que la estudian. El Señor coloreó su palabra con hermosuras diversas, para que cada uno de los que la escudriñan mire lo que le gusta.'),
    ],
  ),

  /* ---------------- San Gregorio de Nisa ---------------- */
  'nisa-vida-moises': pasaje(
    'San Gregorio de Nisa',
    'Vida de Moisés',
    'II, 162-163',
    [
      t('Cuando Moisés creció en el conocimiento, dijo que veía a Dios en la tiniebla; es decir, que aprendió entonces que lo divino está más allá de todo conocimiento y de toda comprensión.'),
      t('Porque esto es ver a Dios de verdad: no cesar nunca de desearlo. Quien sube no se detiene, y siempre acaba un comienzo para empezar otro mayor.'),
    ],
  ),
  'nisa-alma-resurreccion': pasaje(
    'San Gregorio de Nisa',
    'Sobre el alma y la resurrección',
    'diálogo con santa Macrina',
    [
      t('Y ella, como si estuviera inspirada por el Espíritu Santo, me explicó todo esto con tanta claridad que parecía que mi alma se salía de lo humano.'),
      t('«¿Qué es entonces la resurrección?», pregunté. Y la Maestra: «El restablecimiento de nuestra naturaleza a su estado primero».'),
      rub('Lo escribió a la muerte de su hermana, pocos días después de morir su hermano san Basilio. La llama «la Maestra» de principio a fin.'),
    ],
  ),
  'nisa-gran-catequesis': pasaje(
    'San Gregorio de Nisa',
    'Gran discurso catequético',
    'capítulo 24',
    [
      t('La divinidad se escondió bajo el velo de nuestra naturaleza, para que, como hacen los pescadores, el anzuelo de la divinidad quedara cubierto por el cebo de la carne.'),
      t('Y así el que quiso devorar al hombre se tragó con él a Dios, y la vida entró donde estaba la muerte.'),
    ],
  ),

  /* ---------------- San Cirilo de Alejandría ---------------- */
  'cirilo-comentario-juan': pasaje(
    'San Cirilo de Alejandría',
    'Comentario al Evangelio de san Juan',
    'libro IV',
    [
      t('El Verbo hizo suyo lo nuestro para hacernos partícipes de lo suyo. Tomó el nacer, el tener hambre y el morir, no porque lo necesitara, sino para que nuestra naturaleza tuviera en Él lo que le faltaba.'),
      t('Por eso su carne da vida: no porque una carne pueda vivificar, sino porque es la carne del Verbo, que es la Vida.'),
    ],
  ),
  'cirilo-cartas-nestorio': pasaje(
    'San Cirilo de Alejandría',
    'Cartas a Nestorio',
    'segunda carta',
    [
      t('No decimos que la naturaleza del Verbo se convirtiera en carne, ni que se cambiara en un hombre entero de alma y cuerpo; decimos que el Verbo unió a sí mismo, según la hipóstasis, una carne animada por un alma racional, y se hizo hombre de manera inefable e incomprensible.'),
      rub('El Concilio de Éfeso hizo suya esta carta en 431, y desde entonces es texto de referencia.'),
    ],
  ),
  'cirilo-encarnacion': pasaje(
    'San Cirilo de Alejandría',
    'Que Cristo es uno',
    'diálogo',
    [
      t('Uno solo es el Hijo, uno solo el Señor Jesucristo, antes de la encarnación y después de la encarnación. No son dos: no está de una parte el Verbo salido del Padre y de otra el hombre nacido de la Virgen.'),
    ],
  ),

  /* ---------------- San Juan Clímaco ---------------- */
  'climaco-escala': pasaje(
    'San Juan Clímaco',
    'La Escala del Paraíso',
    'escalones 7 y 26',
    [
      t('El llanto según Dios es una tristeza del alma, una disposición del corazón dolorido que busca sin descanso aquello de lo que tiene sed; y cuando no lo alcanza, lo persigue con trabajo y llora tras él lastimosamente.'),
      t('Es más ligero el pecado de quien cae y se levanta que el de quien no cae y se queda de pie mirándose.'),
      rub('Son treinta escalones, uno por cada año oculto de Cristo. En los monasterios se lee entero cada Cuaresma.'),
    ],
  ),
  'climaco-pastor': pasaje(
    'San Juan Clímaco',
    'Al pastor',
    'capítulo 1',
    [
      t('El verdadero pastor es el que puede buscar y enderezar a las ovejas perdidas con su inocencia, su celo y su oración. El piloto se conoce en la tormenta, y el pastor en las almas que se le van.'),
    ],
  ),

  /* ---------------- San Teodoro Estudita ---------------- */
  'estudita-catequesis': pasaje(
    'San Teodoro Estudita',
    'Catequesis menores',
    'catequesis 21',
    [
      t('Hermanos, no os pido cosas grandes. Sed puntuales al oficio, callad en el trabajo, no murmuréis de nadie y comed lo que os pongan. De estas cosas pequeñas se hace un monje, y no de las grandes que se cuentan.'),
    ],
  ),
  'estudita-cartas': pasaje(
    'San Teodoro Estudita',
    'Cartas',
    'a los monjes dispersos',
    [
      t('En materia de fe no cabe decir «yo soy pequeño y quién soy yo para hablar». Si callan los que saben, hablan las piedras; y la verdad, cuando se calla, se convierte en mentira.'),
      rub('Escribió más de quinientas cartas, casi todas desde el destierro.'),
    ],
  ),
  'estudita-antirreticos': pasaje(
    'San Teodoro Estudita',
    'Discursos contra los iconoclastas',
    'primer discurso',
    [
      t('Si Cristo no puede ser representado, es que no fue hombre verdadero, porque todo hombre es circunscribible: tiene rostro, medida y lugar. Negar el icono es negar la encarnación por el otro lado.'),
    ],
  ),

  /* ---------------- San Simeón el Nuevo Teólogo ---------------- */
  'simeon-himnos': pasaje(
    'San Simeón el Nuevo Teólogo',
    'Himnos del amor divino',
    'himno 15',
    [
      t('Te doy gracias porque Tú, sin confundirte ni cambiarte, te has hecho un solo espíritu conmigo, siendo Dios sobre todas las cosas.'),
      t('Y aquello que yo tenía por vil y despreciable en mí, lo has hecho tuyo; y yo, que era tierra, me he vuelto luz.'),
    ],
  ),
  'simeon-catequesis': pasaje(
    'San Simeón el Nuevo Teólogo',
    'Catequesis',
    'catequesis 29',
    [
      t('El que dice que hoy es imposible recibir al Espíritu Santo como lo recibieron los apóstoles, derriba toda la Escritura divina.'),
      t('Y si Dios es el mismo ayer, hoy y siempre, ¿por qué no había de hacer hoy lo que hizo entonces? Lo que ha cambiado no es Él: somos nosotros, que no lo buscamos.'),
    ],
  ),
  'simeon-capitulos': pasaje(
    'San Simeón el Nuevo Teólogo',
    'Capítulos teológicos y prácticos',
    'centuria I',
    [
      t('El que no ve la luz no ha conocido a Dios; y el que dice haberlo conocido sin haber visto, se engaña. No hablo de la luz de los ojos, sino de aquella que se ve cuando los ojos se cierran.'),
    ],
  ),

  /* ---------------- San Nicodemo el Hagiorita ---------------- */
  'nicodemo-filocalia': pasaje(
    'San Nicodemo el Hagiorita',
    'La Filocalia',
    'prólogo, Venecia 1782',
    [
      t('Que nadie diga que esta oración es sólo para los monjes. Se dio a todos los que llevan el nombre de Cristo, y los que viven en el mundo tienen de ella más necesidad todavía, porque están en medio del ruido.'),
      rub('Es la defensa que abrió el hesicasmo fuera de los monasterios, y fue discutida en su momento.'),
    ],
  ),
  'nicodemo-guerra-invisible': pasaje(
    'San Nicodemo el Hagiorita',
    'Guerra invisible',
    'capítulo 1',
    [
      t('La perfección cristiana no está donde muchos la ponen: ni en los ayunos, ni en las vigilias, ni en las postraciones, ni en dormir en el suelo. Todo eso son armas y no la victoria.'),
      t('Está en no confiar nada en uno mismo y confiarlo todo en Dios; y esas dos cosas, aunque parezcan dos, son una sola.'),
      rub('Es la adaptación ortodoxa de El combate espiritual del teatino Lorenzo Scupoli, préstamo que él no ocultó y que sigue discutiéndose.'),
    ],
  ),
  'nicodemo-pedalion': pasaje(
    'San Nicodemo el Hagiorita',
    'El Pedalion',
    'prólogo',
    [
      t('Los cánones son el timón con que la nave de la Iglesia atraviesa el mar de este siglo. Quien los aplica sin misericordia hunde la nave por un lado; quien los deja de lado, por el otro.'),
    ],
  ),

  /* ---------------- San Ignacio Briantchaninov ---------------- */
  'brianchaninov-ofrenda': pasaje(
    'San Ignacio Briantchaninov',
    'Ofrenda a los monjes de hoy',
    'capítulo sobre la lectura de los Padres',
    [
      t('Lee a los Padres que corresponden a tu manera de vivir. Si vives en el mundo, no leas lo que se escribió para los anacoretas del desierto: te hará daño y te dejará confuso y descontento de tu vida.'),
      t('Nuestro tiempo es pobre en guías. Reconocerlo no es desesperar: es empezar por donde se puede empezar, que es la Escritura, los Padres y el consejo prudente.'),
    ],
  ),
  'brianchaninov-arrepentimiento': pasaje(
    'San Ignacio Briantchaninov',
    'La oración de Jesús',
    'sobre los engaños',
    [
      t('No busques en la oración ni calor, ni luces, ni dulzuras, ni voces. Todo lo que se busca, se encuentra, y lo que así se encuentra viene del que sabe darlo para perdernos.'),
      t('La única señal segura de que la oración va bien es que crece el arrepentimiento y la paz con los demás.'),
    ],
  ),

  /* ---------------- Los modernos: cita breve ---------------- */
  'justino-dogmatica': cita(
    'San Justino Popović',
    'Dogmática de la Iglesia ortodoxa',
    '1979',
    [
      t('«El hombre sin el Dios-hombre no acaba siendo más hombre, sino menos.»'),
      rub('San Justino Popović, Dogmática de la Iglesia ortodoxa. Escrita en Belgrado y en el monasterio de Ćelije entre 1932 y 1978. La obra tiene derechos vigentes y ATHOS no puede reproducirla.'),
    ],
  ),
  'justino-abismos': cita(
    'San Justino Popović',
    'El hombre y el Dios-hombre',
    '1979',
    [
      t('«Todos los problemas europeos se resuelven con el Dios-hombre; sin Él, se multiplican.»'),
      rub('San Justino Popović, El hombre y el Dios-hombre. Obra con derechos vigentes.'),
    ],
  ),
  'sofronio-silvano': cita(
    'San Sofronio Sájarov',
    'San Silvano del Monte Athos',
    '1993',
    [
      t('«Ten tu mente en el infierno y no desesperes.»'),
      rub('Palabra recibida en oración por san Silvano el Athonita († 1938), recogida y comentada por su discípulo san Sofronio Sájarov en el libro que lleva su nombre, publicado en París en 1948. La edición tiene derechos vigentes y ATHOS no reproduce el texto.'),
    ],
  ),
  'sofronio-ver-a-dios': cita(
    'San Sofronio Sájarov',
    'Ver a Dios como Él es',
    '1993',
    [
      t('«Dios se retira para que el amor no dependa del consuelo.»'),
      rub('Idea central de Ver a Dios como Él es, escrita en Essex en 1985. Obra con derechos vigentes; se resume, no se reproduce.'),
    ],
  ),
};
