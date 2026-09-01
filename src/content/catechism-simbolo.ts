/**
 * Primera parte: la fe. Los doce artículos del Símbolo.
 *
 * Un catecismo ortodoxo se organiza desde san Pablo: «ahora permanecen la fe,
 * la esperanza y el amor, estas tres». La fe se enseña sobre el Símbolo, la
 * esperanza sobre el Padre Nuestro y las Bienaventuranzas, y el amor sobre los
 * mandamientos. Ésta es la primera de las tres.
 *
 * El Símbolo Niceno-Constantinopolitano lo redactaron los Padres de los dos
 * primeros Concilios Ecuménicos: los siete primeros artículos en Nicea el 325,
 * contra Arrio; los cinco restantes en Constantinopla el 381, contra
 * Macedonio. Se divide en doce, y así se explica desde entonces.
 *
 * El texto del Símbolo no se transcribe aquí: está en Orar → Oraciones →
 * Símbolo de la Fe, donde le corresponde. Esto es la explicación, que es prosa
 * de ATHOS y no un documento conciliar.
 */
import type { CatechismEntry } from './catechism';

export const SYMBOL_ENTRIES: CatechismEntry[] = [
  {
    id: 'que-es-el-simbolo',
    question: '¿Qué es el Símbolo de la Fe y de dónde sale?',
    level: 'nuevo',
    answer: [
      'Es el resumen de la fe cristiana en unas doscientas palabras: lo que hay que creer para ser cristiano, dicho de una vez y sin adornos. Se recita en cada Liturgia, en cada bautismo y en la regla de oración de la mañana, y muchos lo saben de memoria sin haberlo estudiado nunca.',
      'No lo escribió una persona. Lo redactaron dos concilios: los siete primeros artículos en Nicea, el año 325, para zanjar si el Hijo es Dios o una criatura; los cinco restantes en Constantinopla, el 381, para zanjar lo mismo del Espíritu Santo. De ahí su nombre completo, Símbolo Niceno-Constantinopolitano.',
      'La palabra «símbolo» no significa aquí «señal de otra cosa». Viene del griego sýmbolon, la contraseña partida en dos que dos personas juntaban para reconocerse. Eso es: la contraseña por la que los cristianos se reconocen entre sí.',
    ],
    seeAlso: [{ label: 'El texto del Símbolo', path: '/orar/oraciones/simbolo-de-la-fe' }],
  },
  {
    id: 'articulo-1',
    question: '¿Qué dice el primer artículo, «Creo en un solo Dios, Padre todopoderoso»?',
    level: 'nuevo',
    answer: [
      'Empieza por «creo» y no por «sabemos», y eso es deliberado. Lo que sigue no se demuestra en un laboratorio ni se sigue de un razonamiento: se recibe. Y se dice en singular —creo, no creemos— porque cada uno responde por sí mismo, aunque lo diga en medio de una iglesia llena.',
      '«Un solo Dios»: no hay dos principios, uno del bien y otro del mal. «Padre»: la primera palabra que la fe dice de Dios no es «juez» ni «creador», sino que es Padre, y lo es eternamente, porque tiene un Hijo desde siempre. «Todopoderoso»: literalmente pantokrátor, el que lo sostiene todo; no el que puede hacer cualquier cosa, sino el que lo mantiene todo en el ser.',
      'Y «creador del cielo y de la tierra, de todo lo visible y lo invisible». Lo invisible son los ángeles, que también son criaturas. La Iglesia lo dice expresamente porque en su tiempo había quien tenía la materia por obra de un dios inferior: aquí se afirma que el mismo Dios hizo el espíritu y el barro, y que los dos son buenos.',
    ],
    scripture: ['Génesis 1, 1', 'Colosenses 1, 16'],
    seeAlso: [{ label: '¿Quién es Dios?', path: '/biblioteca/catecismo/dios' }],
  },
  {
    id: 'articulo-2',
    question: '¿Qué dice el segundo artículo, «Y en un solo Señor Jesucristo»?',
    level: 'catecumeno',
    answer: [
      'Aquí está lo que costó el primer concilio y casi un siglo de destierros. Cinco expresiones, cada una puesta contra un error concreto: «Hijo único de Dios», «nacido del Padre antes de todos los siglos», «Luz de Luz», «Dios verdadero de Dios verdadero», «engendrado, no creado, consustancial al Padre».',
      'Arrio enseñaba que el Hijo era la primera y más alta de las criaturas: «hubo un tiempo en que no era». Suena a sutileza y no lo es. Si el Hijo es criatura, entonces lo que se hizo hombre no era Dios, y no hay unión entre Dios y el hombre: hay un intermediario, y seguimos fuera. Por eso san Atanasio pasó diecisiete años desterrado por una palabra.',
      'Esa palabra es homooúsios, consustancial: de la misma sustancia que el Padre. No parecido, no semejante, no del mismo rango. Lo mismo. «Engendrado, no creado» dice la diferencia: engendrar es dar lo que uno es; crear es hacer algo distinto de uno.',
    ],
    scripture: ['Juan 1, 1-3', 'Hebreos 1, 3'],
    seeAlso: [{ label: 'San Atanasio el Grande', path: '/biblioteca/padres/atanasio' }],
  },
  {
    id: 'articulo-3',
    question: '¿Qué dice el tercer artículo, «Por nosotros bajó de los cielos y se hizo hombre»?',
    level: 'nuevo',
    answer: [
      'El artículo de la Encarnación, y el único del Símbolo ante el cual la Iglesia se arrodilla al recitarlo en Navidad. Dice tres cosas seguidas: por qué bajó, cómo bajó y qué se hizo.',
      'Por qué: «por nosotros los hombres y por nuestra salvación». No por necesidad suya, no para completarse, no porque el mundo se le fuera de las manos. Por nosotros. Es la única razón que da el Símbolo y no da ninguna otra.',
      'Cómo: «se encarnó del Espíritu Santo y de María Virgen». Y qué: «y se hizo hombre». No se disfrazó de hombre ni tomó un cuerpo prestado: se hizo hombre, con alma, mente y voluntad humanas. San Gregorio Nacianceno lo zanjó con una frase que la Iglesia repite desde entonces: lo que no ha sido asumido no ha sido curado. Si Cristo no tomó una mente humana, la mente humana sigue enferma.',
    ],
    scripture: ['Juan 1, 14', 'Filipenses 2, 6-8'],
    seeAlso: [{ label: 'San Gregorio Nacianceno', path: '/biblioteca/padres/gregorio-nacianceno' }],
  },
  {
    id: 'articulo-4',
    question: '¿Qué dice el cuarto artículo, «Fue crucificado en tiempos de Poncio Pilato»?',
    level: 'catecumeno',
    answer: [
      'El Símbolo mete en un artículo de fe el nombre de un funcionario romano de segunda fila. No es un detalle: es una fecha. Fija el acontecimiento en un lugar y en un año concretos, bajo un gobernador que existió y del que hay inscripciones. La fe cristiana se juega en algo que pasó, no en una idea intemporal.',
      '«Padeció y fue sepultado.» La Iglesia insiste en las dos: padeció de verdad —no en apariencia, como sostenían los que no soportaban un Dios sufriente— y fue sepultado de verdad, es decir, murió del todo.',
      'Sobre por qué era necesario, la tradición oriental es más sobria de lo que se suele suponer. No enseña que el Padre exigiera un pago ni que castigara al Hijo en nuestro lugar: esa manera de explicarlo es occidental y tardía, de san Anselmo en adelante. Los Padres griegos lo dicen de otro modo: Cristo entra en la muerte, que era territorio del enemigo, y la revienta desde dentro por ser el único que no le debía nada.',
    ],
    scripture: ['Isaías 53, 5', '1 Corintios 15, 3'],
    disputed:
      'La teología occidental desarrolló desde san Anselmo la explicación de la satisfacción: la ofensa infinita a Dios exigía una reparación infinita. La ortodoxia no la ha condenado, pero no la usa: prefiere el lenguaje de la victoria sobre la muerte y de la curación de la naturaleza humana.',
  },
  {
    id: 'articulo-5',
    question: '¿Qué dice el quinto artículo, «Y resucitó al tercer día»?',
    level: 'nuevo',
    answer: [
      'Es el artículo del que depende todo lo demás, y san Pablo lo dice sin suavizarlo: si Cristo no resucitó, la predicación es vacía, la fe es vacía y los cristianos son los más dignos de lástima de todos los hombres. La Iglesia no ha buscado nunca una salida a esa frase.',
      'No es la reanimación de un cadáver ni la supervivencia de un alma. El cuerpo que sale del sepulcro come con los discípulos y a la vez atraviesa las puertas cerradas: es el mismo cuerpo y ya no está sujeto a las mismas leyes. Eso es lo que la Iglesia espera para todos.',
      '«Según las Escrituras» no remite al Nuevo Testamento, que aún no existía: remite al Antiguo. Es la afirmación de que esto no fue un giro improvisado, sino aquello a lo que apuntaba toda la historia anterior.',
    ],
    scripture: ['1 Corintios 15, 14-17', 'Lucas 24, 39-43'],
    seeAlso: [{ label: 'El Canon Pascual', path: '/biblioteca/canones/canon-pascual' }],
  },
  {
    id: 'articulo-6',
    question: '¿Qué dice el sexto artículo, «Y subió a los cielos»?',
    level: 'catecumeno',
    answer: [
      'La Ascensión no es una despedida ni un regreso al punto de partida. Lo que sube al cielo es un hombre: Cristo no dejó su humanidad en la tierra al marcharse. Por eso los Padres dicen que en la Ascensión la naturaleza humana entra en Dios, y que ahí está la garantía de todo lo demás.',
      '«Sentado a la diestra» no describe una postura ni un mueble. En el lenguaje bíblico la diestra es el sitio del poder compartido: significa que el Hijo reina con el Padre, y que reina como hombre, no sólo como Dios.',
      'Y explica por qué la Iglesia no vive como huérfana: el Señor no se fue, cambió de modo de estar. «Yo estoy con vosotros todos los días hasta el fin del mundo» son las últimas palabras del Evangelio de Mateo, dichas justamente al despedirse.',
    ],
    scripture: ['Hechos 1, 9-11', 'Mateo 28, 20'],
  },
  {
    id: 'articulo-7',
    question: '¿Qué dice el séptimo artículo, «Y vendrá otra vez con gloria»?',
    level: 'catecumeno',
    answer: [
      'La segunda venida, a juzgar a vivos y muertos, «y su reino no tendrá fin». Esa última cláusula se añadió contra un obispo llamado Marcelo, que enseñaba que al final Cristo devolvería el reino y su reinado acabaría. La Iglesia responde que no acaba.',
      'Sobre cuándo, el Evangelio es tajante: nadie lo sabe, ni los ángeles, ni el Hijo según su humanidad. Toda la literatura que fija fechas y descifra señales queda fuera por esa frase, y la Iglesia ortodoxa no ha bendecido nunca ninguno de esos cálculos.',
      'Sobre el juicio, el criterio lo da el mismo Cristo en Mateo 25, y es incómodo por lo concreto: tuve hambre, tuve sed, estaba desnudo, enfermo, preso. No se pregunta por opiniones religiosas. Se pregunta por lo que se hizo con el que estaba delante.',
    ],
    scripture: ['Mateo 24, 36', 'Mateo 25, 31-46'],
    undefined_:
      'La Iglesia no ha definido nada sobre el momento, ni sobre milenios, ni sobre el orden de los acontecimientos finales. Lo que hay en la tradición son imágenes y advertencias, no un calendario.',
  },
  {
    id: 'articulo-8',
    question: '¿Qué dice el octavo artículo, «Y en el Espíritu Santo»?',
    level: 'catecumeno',
    answer: [
      'El artículo del segundo concilio. Cuando el arrianismo ya había sido condenado quedaba el paso siguiente: unos aceptaban que el Hijo es Dios pero rebajaban al Espíritu a criatura. San Basilio demostró que a quien se adora junto al Padre y al Hijo en cada bautismo y en cada doxología no se le puede llamar criatura.',
      'El Símbolo no dice «Dios» del Espíritu con esa palabra, y no por duda: lo dice con cuatro expresiones que significan lo mismo y que nadie podía objetar. Señor. Dador de vida. Que procede del Padre. Que con el Padre y el Hijo recibe una misma adoración y una misma gloria.',
      'Aquí está también el punto que separa a Oriente de Occidente: la Iglesia latina añadió más tarde «y del Hijo» —Filioque—. La ortodoxia sostiene que un símbolo aprobado por un concilio ecuménico no puede modificarlo nadie por su cuenta, y que la fórmula original es la del Evangelio.',
    ],
    scripture: ['Juan 15, 26', '2 Corintios 3, 17'],
    disputed:
      'La Iglesia católica romana y las confesiones protestantes recitan el Símbolo con el Filioque, añadido en Occidente entre los siglos VI y XI. La objeción ortodoxa es doble: de fondo, porque hace del Padre y del Hijo un solo principio del Espíritu; y de forma, porque se añadió sin concilio. Los diálogos recientes han reconocido que buena parte de la disputa es de vocabulario, pero el texto sigue sin unificarse.',
    seeAlso: [{ label: 'San Basilio el Grande', path: '/biblioteca/padres/basilio-magno' }],
  },
  {
    id: 'articulo-9',
    question: '¿Qué dice el noveno artículo, «En la Iglesia una, santa, católica y apostólica»?',
    level: 'catecumeno',
    answer: [
      'Cuatro palabras, y las cuatro se malentienden. **Una**: no una federación de iglesias que se llevan bien, sino un solo cuerpo, porque un cuerpo no se divide sin morir. **Santa**: no por sus miembros, que son pecadores todos, sino por Aquel que la habita; la Iglesia es santa como un hospital es sano, por lo que cura y no por quien entra.',
      '**Católica** no significa «romana» ni «universal por extensión». Viene de kath’ hólon, «según el todo»: la Iglesia es católica porque en la parroquia más pequeña está la Iglesia entera, no un trozo. Una comunidad de veinte personas con su obispo y su Eucaristía no es una sucursal: es la Iglesia.',
      '**Apostólica**: porque enseña lo de los apóstoles y porque sus obispos vienen de ellos por imposición de manos ininterrumpida. Las dos cosas juntas; una sucesión sin la fe no vale, y la fe sin la sucesión se queda sin quien responda de ella.',
    ],
    scripture: ['Efesios 1, 22-23', 'Mateo 16, 18'],
    seeAlso: [{ label: 'Qué es la Iglesia', path: '/biblioteca/catecismo/iglesia' }],
  },
  {
    id: 'articulo-10',
    question: '¿Qué dice el décimo artículo, «Confieso un solo bautismo»?',
    level: 'catecumeno',
    answer: [
      'El Símbolo nombra un solo sacramento, y lo nombra porque hacía falta zanjar algo: si a quien volvía de un cisma había que rebautizarlo. La respuesta es que no. El bautismo se recibe una vez y no se repite, como no se repite un nacimiento.',
      '«Un solo» dice además que es el mismo para todos: no hay un bautismo de primera para los monjes y otro de segunda para los casados. Toda la vida cristiana consiste en desplegar lo que ya se recibió ahí.',
      'Que el Símbolo nombre sólo éste no significa que sea el único misterio. Los otros seis —crismación, eucaristía, arrepentimiento, sacerdocio, matrimonio y santo óleo— están en la Iglesia desde el principio; lo que pasa es que la lista de siete se fijó mucho después, y la tradición oriental nunca ha tenido prisa por cerrarla.',
    ],
    scripture: ['Efesios 4, 5', 'Romanos 6, 3-4'],
    undefined_:
      'El número siete de los Misterios se tomó de Occidente en el siglo XIII y se generalizó después. La tradición oriental lo usa sin haberlo definido nunca en concilio, y algunos Padres cuentan también como misterios la tonsura monástica o la bendición de las aguas.',
    seeAlso: [{ label: 'Los Misterios', path: '/biblioteca/catecismo/misterios' }],
  },
  {
    id: 'articulo-11',
    question: '¿Qué dice el undécimo artículo, «Espero la resurrección de los muertos»?',
    level: 'nuevo',
    answer: [
      'Nótese el cambio de verbo: hasta aquí el Símbolo decía «creo» y ahora dice «espero». Lo que viene no se afirma como un hecho pasado sino como algo que se aguarda, y aguardar es otra cosa que saber.',
      'Y dice resurrección de los **muertos**, no inmortalidad del alma. Son cosas distintas y la Iglesia enseña la primera. El cristianismo no promete escapar del cuerpo: promete recuperarlo. Por eso los cristianos entierran a sus muertos y no los tratan como envases desechados.',
      'Qué clase de cuerpo, san Pablo lo responde sin resolverlo del todo: se siembra corruptible y resucita incorruptible; es el mismo y no es igual, como la espiga es el mismo grano que se enterró. Más allá de eso, la Iglesia no ha querido precisar.',
    ],
    scripture: ['1 Corintios 15, 42-44', 'Job 19, 25-26'],
    undefined_:
      'Cómo será ese cuerpo, qué edad tendrá, qué relación guardará con el que se enterró: nada de eso está definido. Los Padres especularon y se contradijeron entre sí sin que la Iglesia zanjara.',
  },
  {
    id: 'articulo-12',
    question: '¿Qué dice el duodécimo artículo, «Y la vida del siglo venidero»?',
    level: 'catecumeno',
    answer: [
      'No dice «la vida después de la muerte» sino «la vida del siglo venidero»: no es la continuación de ésta en otro sitio, es otro modo de existir, con el mundo entero renovado y no sólo las almas salvadas. San Pablo escribe que la creación misma será liberada de la corrupción.',
      'De en qué consiste, la Iglesia dice poco y con razón. San Pablo, que asegura haber sido arrebatado hasta allí, dice que oyó palabras que al hombre no le es dado expresar. Lo que se afirma es que consiste en ver a Dios y en no dejar de crecer nunca hacia Él; san Gregorio de Nisa llamó a eso epéktasis, y sostuvo que la bienaventuranza no es un reposo sino un ir siempre más adentro, porque Dios es infinito y no hay dónde terminar.',
      'Y termina «Amén», que no es un punto final sino una firma: significa «así es» y «que así sea». Quien lo dice se hace responsable de lo que acaba de decir.',
    ],
    scripture: ['Romanos 8, 21', '1 Corintios 2, 9', 'Apocalipsis 21, 5'],
    seeAlso: [{ label: 'San Gregorio de Nisa', path: '/biblioteca/padres/gregorio-nisa' }],
  },
];
