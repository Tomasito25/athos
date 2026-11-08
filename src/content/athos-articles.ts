/**
 * Siete artículos más sobre la Montaña Santa.
 *
 * Los seis primeros contaban qué es el Athos y de dónde viene. Faltaba lo que
 * de verdad se pregunta quien se asoma: por qué no entran mujeres, quién
 * manda allí, qué hay en la capital, qué es todo lo que no es monasterio, por
 * qué esos iconos y no otros, qué se oye en una vigilia y cómo se llega si uno
 * quisiera ir.
 *
 * Prosa redactada para ATHOS a partir de la historia documentada y del
 * Estatuto de la Comunidad Monástica. No es texto litúrgico ni patrístico.
 */
import type { AthosArticle, SourceMeta, TextBlock } from '@/types';

const meta: SourceMeta = {
  source:
    'Reseñas redactadas para ATHOS a partir del Estatuto de la Comunidad Monástica del Monte Athos, de la Constitución griega y de la historia documentada de la Montaña',
  tradition: 'Monacato athonita',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-08-29',
  notes:
    'Los datos prácticos —permisos, plazos, cupos— cambian con el tiempo y se dan sólo a título orientativo. Antes de organizar un viaje, confírmalos en la Oficina de Peregrinos.',
};

const p = (content: string): TextBlock => ({ kind: 'text', content });
const h = (content: string): TextBlock => ({ kind: 'heading', content });

export const MORE_ATHOS_ARTICLES: AthosArticle[] = [
  {
    id: 'avaton',
    title: 'El ávaton: por qué no entran mujeres',
    topic: 'avaton',
    blocks: [
      p('Es lo primero que pregunta cualquiera y merece una respuesta clara, incluidas las objeciones. El ávaton —de ábatos, intransitable— prohíbe la entrada de mujeres en la península. Está en vigor desde hace más de mil años, lo recoge el Estatuto de la Comunidad Monástica de 1924, la Constitución griega lo protege y la Unión Europea lo aceptó expresamente al admitir a Grecia en 1981.'),
      h('Qué dice la tradición'),
      p('La Montaña se llama el Jardín de la Theotokos. El relato tradicional cuenta que la Madre de Dios, desviada por una tormenta camino de Chipre, desembarcó allí y pidió aquel lugar para sí. De ahí la fórmula que se repite en el Athos: ya hay una mujer en la Montaña, y con ella basta. Como explicación histórica no se sostiene —la leyenda es muy posterior a los primeros monjes—, pero es la que da sentido al uso dentro de la propia tradición.'),
      h('Qué dice la historia'),
      p('La razón práctica es más prosaica y probablemente más cierta: una comunidad de hombres célibes que quiere vivir sin distracción se protege excluyendo aquello que la distraería. La primera prohibición escrita es del emperador Constantino IX Monómaco, en 1046, y prohíbe también la entrada de eunucos, de niños imberbes y de animales hembra. Lo de los animales se sigue observando, con la excepción de los gatos.'),
      h('Las objeciones, que son reales'),
      p('El Parlamento Europeo pidió en 2003 que se levantara, por considerarlo contrario a la igualdad y a la libre circulación; Grecia se negó y el asunto no ha vuelto a plantearse formalmente. Dentro de la propia ortodoxia hay quien sostiene que la norma protege una forma de vida legítima y quien sostiene que es una costumbre medieval que se ha convertido en símbolo de algo distinto de lo que fue. Ninguna de las dos posturas es marginal, y ATHOS no las va a resolver aquí.'),
      h('Excepciones históricas'),
      p('El ávaton se ha roto varias veces por la fuerza de los hechos. Durante la ocupación turca y la guerra civil griega los monasterios acogieron a familias enteras que huían, mujeres incluidas, y nadie lo discutió entonces. Los monjes lo cuentan sin apuro: la ley existe para una vida, no para una emergencia.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'avaton mujeres prohibicion entrada monomaco 1046 jardin theotokos parlamento europeo igualdad'.toLowerCase(),
  },
  {
    id: 'gobierno',
    title: 'Quién manda en la Montaña',
    topic: 'gobierno',
    blocks: [
      p('El Monte Athos no es un monasterio grande ni una diócesis: es un territorio autónomo de unos trescientos treinta y cinco kilómetros cuadrados con gobierno propio, dentro del Estado griego y bajo la jurisdicción espiritual del Patriarcado Ecuménico. Esa doble pertenencia es antigua y funciona porque cada parte se mete en lo suyo.'),
      h('Los veinte y sólo los veinte'),
      p('El territorio está repartido entre los veinte monasterios soberanos. Todo lo que hay en la Montaña —sketes, celdas, ermitas, huertos, bosques— pertenece a alguno de ellos. No se pueden fundar monasterios nuevos ni se puede alterar el número: veinte eran en el siglo XIV y veinte son. El orden jerárquico entre ellos también está fijado y no cambia; la Gran Laura es la primera y Konstamonitu la vigésima desde hace siglos.'),
      h('La Sagrada Comunidad'),
      p('Cada monasterio envía un representante a Karyés, la capital, y esos veinte forman la Sagrada Comunidad, que legisla y juzga. Las decisiones importantes exigen mayorías cualificadas, y las gravísimas, la Doble Asamblea, en la que se sientan junto a los representantes los veinte higúmenos.'),
      h('La Epistasía'),
      p('El gobierno ejecutivo es rotatorio: cuatro monasterios lo ejercen durante un año, y los veinte están agrupados en cinco tétradas que se turnan, de modo que cada monasterio gobierna una vez cada cinco años. Cada tétrada la encabeza uno de los cinco primeros —la Gran Laura, Vatopedi, Ivirón, Hilandar y Dionisiou—, cuyo representante preside como protepistátis. El sello de la Montaña está partido en cuatro trozos, uno por monasterio de la tétrada: sin los cuatro juntos no se sella nada. Es un mecanismo antiguo para que nadie pueda decidir solo.'),
      p('El título de Protos, el primero de la Montaña, es más antiguo: lo llevó hasta el siglo XVI un monje elegido por los higúmenos, con sede en el Protaton de Karyés, y desapareció cuando el gobierno pasó a la Sagrada Comunidad.'),
      h('Grecia y Constantinopla'),
      p('El Estado griego mantiene un gobernador civil en Karyés, con competencias de orden público y de policía. La jurisdicción espiritual es del Patriarcado Ecuménico, que confirma a los higúmenos y resuelve en última instancia los asuntos canónicos. La Constitución griega reconoce el régimen athonita en un artículo propio, el 105, y el Estatuto de 1924 lo desarrolla.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'gobierno sagrada comunidad karyes epistasia protepistatis tetradas protos estatuto 1924 articulo 105 patriarcado gobernador'.toLowerCase(),
  },
  {
    id: 'sketes',
    title: 'Todo lo que no es monasterio',
    topic: 'sketes',
    blocks: [
      p('Si sólo se cuentan los veinte monasterios se pierde más de la mitad de la Montaña. Alrededor de ellos vive gente en formas de vida escalonadas, de la más comunitaria a la más solitaria, y se puede pasar de una a otra a lo largo de los años. Ésa es la particularidad athonita: las tres formas del monacato antiguo —cenobio, laura y eremitorio— siguen conviviendo en un mismo territorio.'),
      h('El skete'),
      p('Doce sketes dependen de los monasterios: tres de la Gran Laura —Santa Ana, Kavsokalyvia y el rumano de Prodromu—, dos de Vatopedi, dos de San Pablo, y uno de Ivirón, de Kutlumusiu, de Pantokrátoros, de Xenofontos y de San Panteleimón. Los hay de dos clases. El skete cenobítico funciona como un monasterio pequeño, con higúmeno y mesa común; Prodromu es de éstos. El skete idiorrítmico es una aldea: casas dispersas por la ladera, cada una con dos o tres monjes y su propia capilla, que sólo se juntan los domingos y en las fiestas en la iglesia central, el kyriakón. Santa Ana y Kavsokalyvia son así, y son de los sitios más poblados de la Montaña.'),
      h('La kellí'),
      p('Una casa de campo con capilla y tierra, arrendada a perpetuidad por un monasterio a un anciano y a dos o tres discípulos. Hay cientos repartidas por la península, muchas en torno a Karyés. En una kellí vivió san Paisios sus últimos años, en Panagouda, recibiendo cada día a decenas de personas.'),
      h('La kalyva y el kathisma'),
      p('La kalyva es más pequeña: una choza con capilla, sin tierra apenas, para uno o dos monjes que viven de un oficio manual —tallar cruces, pintar iconos, hacer incienso—. El kathisma es una casa para uno solo, cerca del monasterio del que depende, donde un monje mayor puede retirarse manteniendo la comida asegurada.'),
      h('La ermita'),
      p('En el extremo sur, en los acantilados de Karoulia y de la Pequeña Santa Ana, viven todavía anacoretas en cuevas y refugios colgados sobre el mar, a los que se llega por sendas con cadenas. Bajan la cesta con una cuerda para recibir pan. Allí vivió san José el Hesicasta, y de su descendencia espiritual salieron los monjes que repoblaron media Montaña en el siglo XX.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'sketes kelli kalyva kathisma ermita karoulia santa ana kavsokalyvia prodromu anacoretas'.toLowerCase(),
  },
  {
    id: 'iconos-athos',
    title: 'Los iconos de la Montaña',
    topic: 'iconos',
    blocks: [
      p('El Athos guarda unas cuantas imágenes de la Madre de Dios en torno a las cuales se ha organizado la memoria de la Montaña. Casi todas tienen un relato de llegada —vinieron por mar, aparecieron en un pozo, sobrevivieron a un incendio— y un nombre que dice qué hacen, no qué son.'),
      h('La Portaítissa, la Guardiana de la Puerta'),
      p('En Ivirón. El relato cuenta que llegó flotando de pie sobre el agua, tras haber sido arrojada al mar por una viuda de Nicea que quería salvarla de los iconoclastas, y que un monje georgiano, san Gabriel, caminó sobre las olas a recogerla. Los monjes la pusieron en el katholikón y a la mañana siguiente estaba en la puerta; la devolvieron y volvió a la puerta. Entendieron el mensaje y allí sigue, en una capilla junto a la entrada.'),
      h('El Axion Estin, «Digno es»'),
      p('En el Protaton de Karyés, la iglesia más antigua de la Montaña. La tradición cuenta que en el siglo X un arcángel, con apariencia de monje, cantó ante este icono, en una celda cercana, el himno «Digno es en verdad bendecirte, oh Theotokos», y lo escribió con el dedo sobre una losa. Desde entonces el himno se canta en la Liturgia de todo el mundo ortodoxo, y el icono sale de Karyés en las grandes ocasiones: es el de la Montaña entera, no el de un monasterio.'),
      h('La Gorgoepíkoos, la que escucha pronto'),
      p('En Dojiaríu. Un monje que pasaba delante con una antorcha ennegreciendo el fresco oyó una voz que le reprochaba el descuido y, al desoírla, quedó ciego; recobró la vista al cabo de años de súplica ante la misma imagen. Es hoy la más invocada de la Montaña para asuntos urgentes.'),
      h('La Trikherousa, la de las tres manos'),
      p('En Hilandar. La tercera mano de plata recuerda la de san Juan Damasceno, que según la tradición le fue cortada por orden del califa a instancias del emperador iconoclasta y se le restituyó tras orar ante esta imagen. Él mandó colgar de ella una mano de plata en agradecimiento, y los copistas posteriores la pintaron como si fuera parte del icono.'),
      h('El cinturón de la Theotokos'),
      p('En Vatopedi. No es un icono sino una reliquia: una faja de lana tejida, según la tradición, por la propia Virgen. Es de las pocas cosas del Athos que salen de la Montaña; en 2011 estuvo un mes en Rusia y la vinieron a ver más de tres millones de personas, con colas de doce horas en Moscú.'),
      h('Los dones de los Magos'),
      p('En San Pablo. Veintiocho placas de oro con motivos filigranados y unas bolitas de incienso y mirra que se guardan en relicarios. Llegaron a la Montaña por vía serbia después de la caída de Constantinopla. También viajan cuando se les pide.'),
      h('Por qué importan estos relatos'),
      p('La Iglesia no obliga a creer ninguna de estas historias: no son artículos de fe y varias tienen versiones distintas según el monasterio que las cuente. Lo que hacen es explicar por qué una comunidad se organiza alrededor de una tabla pintada, y por qué en el Athos el icono no se trata como un cuadro sino como un huésped.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'iconos axion estin digno es protaton portaitissa gorgoepikoos trikherousa cinturon theotokos dones magos vatopedi iviron dojiariu'.toLowerCase(),
  },
  {
    id: 'canto',
    title: 'Lo que se oye en una vigilia',
    topic: 'canto',
    blocks: [
      p('En el Athos no hay órgano, ni armonías a varias voces, ni instrumentos de ninguna clase. Hay un canto a una sola línea melódica sostenido sobre una nota grave continua, el isón, que hacen dos o tres monjes mientras otro lleva la melodía. Suena arcaico porque lo es: es el canto bizantino, y su notación —los neumas— no se escribe en pentagrama sino con signos que indican el intervalo respecto de la nota anterior.'),
      h('Por qué sólo la voz'),
      p('La razón que da la tradición es que la palabra tiene que oírse. El instrumento acompaña y adorna; en el oficio bizantino lo que hay es un texto que se proclama y una melodía que sirve para que ese texto entre y se recuerde. La consecuencia práctica es que quien canta tiene que entender lo que canta.'),
      h('Los ocho tonos'),
      p('Todo el repertorio se organiza en ocho modos que se turnan por semanas a lo largo del año; el libro que los recoge se llama Octoecos, «de ocho tonos», y se atribuye a san Juan Damasceno. El tono de la semana cambia el domingo y determina buena parte de lo que se canta. Es un sistema que permite a una comunidad no repetir nunca exactamente lo mismo sin necesidad de partituras nuevas.'),
      h('La vigilia'),
      p('Las grandes fiestas se celebran con agripnía, vigilia de toda la noche: empieza al ponerse el sol y termina al amanecer, doce o catorce horas seguidas de Vísperas, Maitines y Liturgia sin apenas interrupción. Los monjes se apoyan en los stasídia, los sillones de madera con brazos altos que permiten estar de pie sin desplomarse. Las luces se van apagando y encendiendo según el momento; en el Polieleos se hace girar la lámpara circular del centro de la iglesia.'),
      h('El simandro'),
      p('Antes de cada oficio, un monje recorre el patio golpeando con un mazo una tabla de madera larga que lleva al hombro. Es el simandro, más antiguo en los monasterios de Oriente que las campanas, y en los siglos otomanos, cuando tañerlas estaba a menudo prohibido, fue casi el único llamado. Hoy suena antes que las campanas en todos los monasterios de la Montaña, con un ritmo que imita, dicen los monjes, las palabras de quien llama.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'canto bizantino ison neumas octoecos ocho tonos vigilia agripnia stasidia simandro polieleos'.toLowerCase(),
  },
  {
    id: 'karyes',
    title: 'Karyés y el Protaton',
    topic: 'karyes',
    blocks: [
      p('Karyés no es un monasterio ni pertenece a ninguno: es la capital de la Montaña, el único sitio con calles, tiendas y oficinas. Está en el centro de la península, en un valle de castaños y avellanos —de ahí el nombre, «los nogales»—, a media altura entre las dos costas.'),
      h('La Sagrada Comunidad'),
      p('En Karyés tienen su casa los veinte representantes de los monasterios, cada uno con su konaki, la residencia de su monasterio en la capital. Allí se reúne la Sagrada Comunidad y allí está la Epistasía, el gobierno de turno. A su lado viven el gobernador civil, la policía y la oficina de correos, y un puñado de comercios donde los monjes compran lo que no producen.'),
      h('El Protaton'),
      p('La iglesia más antigua de la Montaña, dedicada a la Dormición, fue la sede del Protos, el primero de los monjes, cuando el Athos aún no tenía gobierno colegiado. Sus frescos, de hacia 1300, son de Manuel Panselinos, el pintor de la escuela macedonia a quien la tradición athonita pone por encima de todos. En el iconostasio está el Axion Estin, el icono de la Montaña entera, y en su archivo se guarda el Tragos, el primer estatuto, firmado por el emperador Juan Tzimiskés en 972.'),
      h('Alrededor'),
      p('Las laderas que rodean Karyés están sembradas de celdas: la de san Sava, donde escribió su Típico; la de Panagouda, donde vivió san Paisios; la del Axion Estin, donde según la tradición se cantó por primera vez el himno. En Karyés funciona también la Athoniada, la escuela heredera de la Academia que en el siglo XVIII fundó Vatopedi.'),
      h('Dafni, el puerto'),
      p('El barco de Ouranúpoli llega a Dafni, en la costa occidental, que tiene poco más que el muelle, la policía y la aduana. De allí sale el autobús que sube a Karyés por la única carretera que cruza la península; desde Karyés se sigue a pie o en las furgonetas de los monasterios.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'karyes capital protaton panselinos axion estin tragos tzimiskes konaki sagrada comunidad dafni puerto athoniada'.toLowerCase(),
  },
  {
    id: 'visita',
    title: 'Cómo se llega, si se quisiera ir',
    topic: 'visita',
    blocks: [
      p('El Athos no es un museo ni un destino turístico, pero tampoco está cerrado: recibe visitantes todos los días del año, con un cupo limitado y un permiso que hay que pedir. Estos son los pasos, a título orientativo. Todo esto cambia, así que conviene confirmarlo antes de comprar un billete.'),
      h('El diamonitirion'),
      p('Es el permiso de entrada, y lo expide la Oficina de Peregrinos de Tesalónica. Se pide con antelación —los meses de verano y las grandes fiestas se llenan con muchos meses de adelanto— indicando el día de entrada. Vale para cuatro días, tres noches, y se puede prorrogar ya dentro. El cupo diario está limitado: un centenar de ortodoxos y una decena de no ortodoxos.'),
      h('Sólo hombres, y mayores de edad'),
      p('Rige el ávaton. Los menores de dieciocho años sólo entran acompañados de su padre. Hay quien viaja con la idea de bordear la península en barco para verla desde el mar; los barcos turísticos salen de Ouranúpoli y están obligados a mantenerse a quinientos metros de la costa.'),
      h('El viaje'),
      p('Se llega a Ouranúpoli, el último pueblo antes de la frontera, y de allí sale el ferry a Dafni, el puerto de la Montaña. Desde Dafni se sube a Karyés y desde Karyés se va a cada monasterio a pie o en las furgonetas que hacen el recorrido. Andar de un monasterio a otro por las sendas antiguas es lo habitual y lo recomendable: las distancias son de dos a cinco horas.'),
      h('Qué se espera de un visitante'),
      p('Se duerme y se come gratis en los monasterios: no se cobra nada y no está bien visto ofrecer dinero, aunque siempre hay un cepillo. Se llega antes del atardecer, porque la puerta se cierra al ponerse el sol y no se vuelve a abrir. Se come en el refectorio con la comunidad, en silencio y mientras un monje lee. No se hacen fotografías dentro de las iglesias ni a los monjes sin permiso. Se va con manga larga y pantalón largo. Y se madruga: los oficios empiezan de noche.'),
      h('Los no ortodoxos'),
      p('Pueden entrar y son acogidos, pero no comulgan, y en algunos monasterios comen en un segundo turno. No es una descortesía: la comunión en la ortodoxia presupone la pertenencia, y allí se aplica sin excepciones.'),
      p('Y una advertencia que dan los propios monjes: quien va buscando ancianos con dones extraordinarios suele volver decepcionado. Lo que hay es un horario, una iglesia fría de noche y gente trabajando.'),
    ],
    status: 'complete',
    meta,
    searchText:
      'visita diamonitirion oficina peregrinos tesalonica ouranupoli dafni karyes ferry permiso cupo'.toLowerCase(),
  },
];

/* ---------------- Cómo se ordenan los artículos ----------------
   Trece artículos en una lista plana obligan a leer doce entradillas para
   saber cuál interesa. Puestos en tres bloques —qué es, cómo se vive, cómo se
   va— se elige de un vistazo. */

export interface AthosGroup {
  id: string;
  title: string;
  note: string;
  /** En este orden. */
  articles: string[];
}

export const ATHOS_GROUPS: AthosGroup[] = [
  {
    id: 'que-es',
    title: 'Qué es la Montaña',
    note: 'De dónde sale, cómo está gobernada y por qué es como es.',
    articles: ['historia', 'geografia', 'gobierno', 'karyes', 'avaton'],
  },
  {
    id: 'como-se-vive',
    title: 'Cómo se vive allí',
    note: 'Las formas de vida, la oración que las sostiene y lo que se oye en la iglesia.',
    articles: ['monacato', 'sketes', 'hesicasmo', 'canto', 'ancianos'],
  },
  {
    id: 'lo-que-se-ve',
    title: 'Lo que se ve y cómo se llega',
    note: 'La arquitectura, los iconos que organizan su memoria y el permiso de entrada.',
    articles: ['arquitectura', 'iconos-athos', 'visita'],
  },
];

/** Una línea que dice de qué va cada artículo, escrita para elegir. */
export const ATHOS_LEAD: Record<string, string> = {
  historia: 'De los primeros ermitaños a la repoblación del siglo XX, pasando por la Filocalia.',
  geografia: 'Cincuenta kilómetros de península, el reloj puesto al ocaso y el calendario juliano.',
  gobierno: 'Veinte monasterios que se turnan el poder, un sello partido en cuatro y el artículo 105.',
  karyes: 'La capital, el Protaton de Panselinos, el icono del Axion Estin y el puerto de Dafni.',
  avaton: 'Por qué no entran mujeres, qué dice la tradición, qué dice la historia y qué objeciones hay.',
  monacato: 'Novicio, rasóforo, gran esquema. Los tres votos y la figura del anciano.',
  sketes: 'Sketes, celdas, kalyvas y ermitas: más de la mitad de la Montaña no son los veinte.',
  hesicasmo: 'La oración del corazón, la disputa con Barlaam y las energías increadas.',
  canto: 'Sin instrumentos, sobre una nota grave continua, y una vigilia que dura toda la noche.',
  ancianos: 'Silvano, Paisios, Porfirio y José el Hesicasta, cuatro voces del siglo XX.',
  arquitectura: 'El recinto cerrado, el katholikón con sus dos coros, la fiala y el refectorio pintado.',
  'iconos-athos': 'El Axion Estin, la Portaítissa, la Gorgoepíkoos, la Trikherousa y el cinturón de la Theotokos.',
  visita: 'El diamonitirion, el cupo diario, el ferry de Ouranúpoli y qué se espera de un visitante.',
};
