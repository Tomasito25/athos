/**
 * Las partes del catecismo y sus preguntas.
 *
 * El orden es el clásico —Dios, la creación, Cristo, la Iglesia, los
 * Misterios, la vida, las últimas cosas— con una parte final para las
 * preguntas que la gente hace de verdad y los catecismos suelen esquivar.
 */
import type { CatechismPart } from './catechism';
import { EXTRA_ENTRIES, EXTRA_PARTS } from './catechism-more';

const BASE_PARTS: CatechismPart[] = [
  /* ═══════════════════ 1. Antes de empezar ═══════════════════ */
  {
    id: 'empezar',
    title: 'Antes de empezar',
    summary: 'Qué es esto, qué no es, y qué hace falta para entenderlo.',
    entries: [
      {
        id: 'que-es-ortodoxia',
        question: '¿Qué es la Iglesia ortodoxa?',
        level: 'nuevo',
        answer: [
          'La comunidad cristiana que se reconoce en continuidad con la Iglesia de los apóstoles a través de los siete Concilios Ecuménicos, sin haber añadido después definiciones nuevas de fe. «Ortodoxo» significa dos cosas a la vez en griego: recta doctrina y recta alabanza. No son dos cosas distintas: se cree lo que se reza.',
          'No es una organización con un jefe único. Son varias Iglesias locales —Constantinopla, Alejandría, Antioquía, Jerusalén, Rusia, Rumanía, Grecia, Serbia y otras— que comparten la misma fe, los mismos sacramentos y la misma Liturgia, y se reconocen entre sí. Cada una gobierna sus asuntos; ninguna manda sobre las demás.',
          'Cuenta con unos doscientos millones de fieles. En España hay parroquias en casi todas las capitales, la mayoría dependientes de los patriarcados de Constantinopla, Rumanía, Rusia o Serbia.',
        ],
        seeAlso: [{ label: 'Qué es la Iglesia ortodoxa', path: '/biblioteca/estudio' }],
      },
      {
        id: 'no-hace-falta-creer',
        question: 'No creo en nada. ¿Puedo entrar en una iglesia ortodoxa?',
        level: 'nuevo',
        answer: [
          'Sí. Nadie va a preguntarte qué crees ni a pedirte que hagas nada. Se entra, se está, se mira y se sale cuando uno quiera. Es normal ir un tiempo sin decir a nadie por qué se va.',
          'Lo único que no puedes hacer es comulgar, y no por desconfianza: la comunión es la señal de que ya se pertenece, no el medio para pertenecer. Al final del oficio se reparte pan bendito —el antídoron— que sí puede tomar cualquiera.',
          'Si alguien te pregunta, la respuesta «estoy mirando» es perfectamente aceptable y bastante frecuente.',
        ],
        seeAlso: [{ label: 'Qué se hace dentro del templo', path: '/orar/oraciones/como-se-entra-en-el-templo' }],
      },
      {
        id: 'como-se-usa-catecismo',
        question: '¿Por dónde empiezo?',
        level: 'nuevo',
        answer: [
          'Por la parte que responda a lo que hoy te preguntas, no por el principio. Un catecismo no es una novela.',
          'Cada pregunta dice a quién sirve: a quien llega de fuera, a quien se prepara para el bautismo o a quien lleva años dentro. Puedes filtrar por eso. Si algo te resulta demasiado denso, probablemente esté marcado para otro momento y no pasa nada por saltarlo.',
          'Y una advertencia que vale para todo lo que sigue: esto explica, no sustituye. Las decisiones que importan —bautizarse, confesarse, casarse— se hablan con un sacerdote, no se resuelven leyendo.',
        ],
      },
    ],
  },

  /* ═══════════════════ 2. Dios ═══════════════════ */
  {
    id: 'dios',
    title: 'Dios',
    summary: 'Qué se puede decir de Dios, qué no, y por qué se le llama Trinidad.',
    entries: [
      {
        id: 'quien-es-dios',
        question: '¿Quién es Dios?',
        level: 'nuevo',
        answer: [
          'No es una fuerza ni una energía ni una idea. Es alguien: se le puede hablar y responde. Todo lo que existe existe porque Él quiso, y nada lo sostiene salvo su voluntad de que siga existiendo.',
          'La Iglesia enseña que de Dios podemos saber que es y algo de cómo obra, pero no qué es. Su esencia queda fuera del alcance de cualquier criatura, ahora y siempre. Eso no es una laguna que la ciencia llenará algún día: es la diferencia entre creador y criatura.',
          'Por eso la teología ortodoxa avanza tanto negando como afirmando. Decir que Dios es bueno es verdad, pero su bondad no se parece a la nuestra lo bastante como para que la palabra baste.',
        ],
        scripture: ['Éxodo 3, 14', 'Juan 1, 18', '1 Timoteo 6, 16'],
      },
      {
        id: 'trinidad',
        question: '¿Qué significa que Dios es Trinidad?',
        level: 'nuevo',
        answer: [
          'Que Dios es uno solo, y que ese único Dios es Padre, Hijo y Espíritu Santo. No tres dioses. Tampoco un dios que se pone tres máscaras según le convenga.',
          'El lenguaje que la Iglesia fijó en el siglo IV lo dice así: una sola esencia y tres hipóstasis. Comparten enteramente lo que son —no un tercio cada uno—, y se distinguen por su relación mutua: el Padre engendra al Hijo y hace proceder al Espíritu; no al revés.',
          'Ninguna comparación funciona del todo. El trébol, el agua en tres estados, el sol con su luz y su calor: todas fallan en algo, y las tres se han usado para explicar herejías tanto como para explicar la fe. La Trinidad no se entiende como se entiende un mecanismo; se confiesa.',
        ],
        scripture: ['Mateo 28, 19', 'Juan 15, 26', '2 Corintios 13, 13'],
        seeAlso: [{ label: 'Símbolo de la Fe', path: '/orar/oraciones/simbolo-de-la-fe' }],
      },
      {
        id: 'esencia-energias',
        question: 'Si no se puede conocer a Dios, ¿qué conocemos entonces?',
        level: 'iniciado',
        answer: [
          'Sus energías. San Gregorio Palamás distinguió en el siglo XIV entre la esencia divina, inaccesible para siempre, y las energías increadas por las que Dios se comunica y se deja conocer. No son dos partes de Dios ni dos dioses: es Dios entero inaccesible en su ser y Dios entero dado en su obrar.',
          'La distinción no es una sutileza. Sin ella, o se dice que el hombre puede alcanzar la esencia divina —y entonces deja de haber diferencia entre Dios y la criatura—, o se dice que todo lo que nos llega de Dios es creado, y entonces no le conocemos a Él sino a sus efectos.',
          'La luz que los apóstoles vieron en el Tabor es el ejemplo: no un fenómeno luminoso creado, sino la divinidad misma, vista por unos ojos que fueron capacitados para verla.',
        ],
        seeAlso: [{ label: 'San Gregorio Palamás', path: '/biblioteca/padres/gregorio-palamas' }],
      },
      {
        id: 'filioque',
        question: '¿Qué es el Filioque y por qué importa?',
        level: 'catecumeno',
        answer: [
          'El Credo aprobado en Constantinopla el año 381 dice que el Espíritu Santo «procede del Padre». En Occidente se añadió más tarde «y del Hijo» —Filioque en latín—, primero en España, después en el imperio franco, y finalmente en Roma en el siglo XI.',
          'La Iglesia ortodoxa objeta dos cosas. La primera es de procedimiento: un concilio ecuménico prohibió cambiar ese texto, y una parte de la Iglesia lo cambió sin convocar otro. La segunda es de fondo: si el Espíritu procede también del Hijo, el Padre deja de ser la única fuente dentro de la Trinidad, y se difumina lo que distingue a las personas.',
          'La Iglesia católica sostiene que la fórmula expresa correctamente la relación entre el Hijo y el Espíritu y que no introduce dos principios. El diálogo entre ambas sigue abierto y ha habido acercamientos reales; conviene no presentarlo como una diferencia zanjada ni como una insignificancia.',
        ],
        disputed:
          'Es una de las dos grandes diferencias doctrinales con la Iglesia católica, junto con el primado del papa. ATHOS recita el Credo sin el Filioque, que es el texto de 381.',
      },
    ],
  },

  /* ═══════════════════ 3. El hombre ═══════════════════ */
  {
    id: 'hombre',
    title: 'La creación y el hombre',
    summary: 'Para qué existe el hombre, qué le pasó y qué arrastra.',
    entries: [
      {
        id: 'imagen-semejanza',
        question: '¿Qué significa que el hombre está hecho a imagen de Dios?',
        level: 'nuevo',
        answer: [
          'Que no es una cosa más entre las cosas. La imagen es lo que se le dio y no ha perdido: ser libre, poder amar, poder conocer, ser irrepetible. Está en cualquiera, crea o no crea, se porte bien o mal.',
          'La tradición distingue la imagen de la semejanza. La imagen se recibe; la semejanza se llega a tener, y es aquello a lo que se está llamado: parecerse a Dios en el modo de ser, no en la naturaleza.',
          'De ahí se sigue algo práctico: la dignidad de una persona no depende de su utilidad, ni de su salud, ni de su conducta. Está puesta antes y no se la quita nadie.',
        ],
        scripture: ['Génesis 1, 26-27'],
      },
      {
        id: 'pecado-original',
        question: '¿Heredamos la culpa de Adán?',
        level: 'catecumeno',
        answer: [
          'La Iglesia ortodoxa dice que no heredamos su culpa, sino sus consecuencias. Lo que pasa de generación en generación no es la responsabilidad de un acto ajeno —nadie es culpable de lo que no hizo—, sino una naturaleza dañada: mortal, inclinada al mal, con la voluntad dividida.',
          'La palabra que suele usarse en Oriente es «pecado ancestral» más que «pecado original», precisamente para no dar a entender una culpa jurídica transmitida.',
          'Por eso el bautismo de un niño no se entiende como el borrado de una culpa que ese niño tuviera, sino como su injerto en Cristo y en la Iglesia, que es donde esa naturaleza empieza a sanar.',
        ],
        scripture: ['Romanos 5, 12'],
        disputed:
          'La teología occidental, sobre todo desde san Agustín, ha subrayado más la transmisión de la culpa. La diferencia es real, aunque en las últimas décadas las formulaciones católicas se han acercado bastante a la oriental.',
      },
      {
        id: 'para-que-existe-el-hombre',
        question: '¿Para qué existe el hombre?',
        level: 'nuevo',
        answer: [
          'Para unirse a Dios y, al hacerlo, unir a Él la creación entera. La tradición oriental lo llama deificación o théosis, y la frase que lo resume es de san Atanasio: Dios se hizo hombre para que el hombre fuese hecho dios.',
          'No significa que uno vaya a convertirse en Dios por naturaleza. Significa participar de su vida por gracia, como el hierro puesto al fuego se pone incandescente sin dejar de ser hierro. La comparación es de san Máximo el Confesor.',
          'Dicho de otro modo: el cristianismo oriental no propone principalmente evitar el castigo, sino curarse y llegar a ser lo que uno fue creado para ser. El pecado se entiende antes como enfermedad que como delito, y la Iglesia antes como hospital que como tribunal.',
        ],
        seeAlso: [{ label: 'San Atanasio el Grande', path: '/biblioteca/padres/atanasio' }],
      },
    ],
  },

  /* ═══════════════════ 4. Cristo ═══════════════════ */
  {
    id: 'cristo',
    title: 'Jesucristo',
    summary: 'Quién es, qué hizo y por qué la Iglesia dice que resucitó.',
    entries: [
      {
        id: 'quien-es-cristo',
        question: '¿Quién es Jesucristo?',
        level: 'nuevo',
        answer: [
          'La segunda persona de la Trinidad, el Hijo de Dios, hecho hombre. No un hombre excepcional al que Dios adoptó, ni un dios disfrazado de hombre: Dios verdadero y hombre verdadero, en una sola persona.',
          'El Concilio de Calcedonia lo fijó en el año 451 con cuatro palabras que siguen valiendo: sus dos naturalezas están unidas sin confusión, sin cambio, sin división y sin separación. Ni se mezclan hasta hacer una tercera cosa, ni quedan yuxtapuestas como dos sujetos.',
          'Tuvo hambre, se cansó, lloró, tuvo miedo en Getsemaní. Nada de eso es teatro: si su humanidad no fue completa, no fue la nuestra la que Él curó.',
        ],
        scripture: ['Juan 1, 14', 'Filipenses 2, 5-11'],
      },
      {
        id: 'por-que-murio',
        question: '¿Por qué tuvo que morir?',
        level: 'catecumeno',
        answer: [
          'La respuesta oriental no es que Dios necesitara un pago para poder perdonar. Esa manera de plantearlo —la satisfacción debida a un honor ofendido— se desarrolló en Occidente a partir del siglo XI y nunca fue la manera principal de Oriente.',
          'Lo que la tradición oriental subraya es que Cristo entró en la muerte para destruirla desde dentro. La muerte era el enemigo, no el requisito. Al morir alguien que no podía ser retenido por ella, la muerte quedó rota por dentro, como un anzuelo tragado.',
          'Por eso el canto central de la Pascua ortodoxa no dice que la deuda esté saldada, sino que «con la muerte venció a la muerte». Y por eso el icono de la Resurrección no muestra a Cristo saliendo del sepulcro, sino sacando a Adán y Eva del suyo.',
        ],
        scripture: ['Hebreos 2, 14-15', '1 Corintios 15, 54-55'],
        disputed:
          'La teología occidental —san Anselmo primero, y con más fuerza la Reforma protestante— ha usado el lenguaje jurídico: deuda, satisfacción, sustitución penal. La oriental prefiere el terapéutico y el de la victoria sobre la muerte. No son necesariamente incompatibles, y hay teólogos católicos que hoy matizan a Anselmo, pero el acento es claramente distinto.',
      },
      {
        id: 'resurreccion',
        question: '¿La resurrección es un símbolo o pasó de verdad?',
        level: 'nuevo',
        answer: [
          'La Iglesia sostiene que ocurrió: que el mismo cuerpo que fue crucificado y sepultado salió del sepulcro transformado, y que quienes lo vieron no estaban interpretando una experiencia interior, sino contando algo que les había pasado delante.',
          'San Pablo lo dice sin dejar salida: si Cristo no resucitó, la predicación es vacía y la fe también, y los cristianos son los más dignos de lástima de todos los hombres. No ofrece la opción de un símbolo consolador.',
          'Es también la única fiesta que estructura el año entero: la fecha de Pascua determina la Cuaresma, la Ascensión, Pentecostés y buena parte del calendario. Todo lo demás gira alrededor.',
        ],
        scripture: ['1 Corintios 15, 14-19', 'Lucas 24, 39'],
      },
    ],
  },

  /* ═══════════════════ 5. La Iglesia ═══════════════════ */
  {
    id: 'iglesia',
    title: 'El Espíritu Santo y la Iglesia',
    summary: 'Qué es la Iglesia, quién la gobierna y qué autoridad tiene.',
    entries: [
      {
        id: 'que-es-la-iglesia',
        question: '¿Qué es la Iglesia?',
        level: 'nuevo',
        answer: [
          'No un edificio ni una organización, aunque tenga ambas cosas. El Nuevo Testamento la llama cuerpo de Cristo: la comunidad de los que están unidos a Él y, por Él, entre sí. La institución existe para eso, no al revés.',
          'El Credo le atribuye cuatro notas: una, santa, católica y apostólica. Una, porque no hay dos cuerpos de Cristo. Santa, no porque sus miembros lo sean, sino por Aquel que la habita. Católica —del griego «según el todo»— porque es entera en cada lugar, no una sucursal de una central. Apostólica, porque su fe y sus obispos vienen en línea desde los apóstoles.',
          'Se manifiesta plenamente donde se celebra la Eucaristía con el obispo o su presbítero. Una parroquia pequeña reunida el domingo no es un fragmento de la Iglesia: es la Iglesia.',
        ],
        scripture: ['1 Corintios 12, 27', 'Efesios 1, 22-23'],
      },
      {
        id: 'quien-manda',
        question: '¿Quién manda en la Iglesia ortodoxa?',
        level: 'catecumeno',
        answer: [
          'Ningún hombre solo. El Patriarca de Constantinopla tiene el primer puesto de honor y convoca, pero no gobierna a las demás Iglesias ni tiene jurisdicción sobre ellas: es primero entre iguales, no superior.',
          'Cada Iglesia local se gobierna por su sínodo de obispos. Y por encima de los sínodos está el Concilio Ecuménico, que es la instancia máxima, aunque no se reúne desde el siglo VIII.',
          'Esto tiene una consecuencia incómoda que conviene decir: sin una autoridad última que decida, los conflictos entre Iglesias ortodoxas pueden enquistarse durante décadas. La ruptura entre Moscú y Constantinopla a raíz de Ucrania es el ejemplo vivo. La estructura conciliar es lo que la Iglesia cree recibido, no un sistema que funcione siempre bien.',
        ],
        disputed:
          'Ésta es la segunda gran diferencia con la Iglesia católica: allí el papa tiene primado de jurisdicción sobre toda la Iglesia y, en condiciones definidas, infalibilidad. Oriente reconoce a Roma un primado de honor, no de gobierno.',
      },
      {
        id: 'concilios',
        question: '¿Qué son los Concilios Ecuménicos?',
        level: 'catecumeno',
        answer: [
          'Las siete asambleas de obispos de toda la Iglesia que, entre los años 325 y 787, definieron lo que hay que creer cuando estuvo en discusión. Nicea I, Constantinopla I, Éfeso, Calcedonia, Constantinopla II y III, y Nicea II.',
          'No inventaron doctrina: pusieron por escrito lo que la Iglesia ya creía, cuando alguien empezó a enseñar otra cosa. De ahí salen el Credo, la definición de las dos naturalezas de Cristo y la legitimidad de los iconos.',
          'Un concilio no es ecuménico por haberse convocado como tal, sino porque la Iglesia entera lo recibe después. Ha habido concilios numerosos y solemnes que fueron rechazados. Ese criterio —la recepción— es característicamente oriental y explica por qué no hay una lista cerrada indiscutible más allá de los siete.',
        ],
        seeAlso: [{ label: 'Los siete Concilios', path: '/biblioteca/estudio' }],
      },
      {
        id: 'otras-confesiones',
        question: '¿Los católicos y los protestantes se salvan?',
        level: 'catecumeno',
        answer: [
          'La Iglesia ortodoxa afirma dónde están con certeza los medios de salvación —en ella—, y no afirma dónde no está Dios obrando. Esas dos frases no son la misma, y la diferencia es deliberada.',
          'La formulación tradicional es que conocemos dónde está la Iglesia, pero no se nos ha dicho dónde no está el Espíritu. Juzgar la salvación de una persona concreta no le corresponde a nadie más que a Dios, y los Padres son severos con quien se arroga ese papel.',
          'En la práctica, quien viene del catolicismo o del protestantismo y quiere entrar en la Iglesia ortodoxa no siempre es rebautizado: según la confesión de origen y el criterio del obispo, puede recibirse por crismación o por confesión de fe. Eso mismo dice algo sobre cómo se valora lo que ya recibió.',
        ],
        undefined_:
          'La Iglesia no ha definido el estatuto exacto de los sacramentos fuera de sus límites visibles, y las opiniones de teólogos ortodoxos serios difieren bastante entre sí. Desconfía de quien te lo presente como una cuestión resuelta.',
      },
    ],
  },

  /* ═══════════════════ 6. Los Misterios ═══════════════════ */
  {
    id: 'misterios',
    title: 'Los Misterios',
    summary: 'Lo que en Occidente se llama sacramentos: qué son y qué hacen.',
    entries: [
      {
        id: 'que-son-misterios',
        question: '¿Cuántos sacramentos hay?',
        level: 'catecumeno',
        answer: [
          'Se suelen enumerar siete —bautismo, crismación, eucaristía, confesión, unción de enfermos, matrimonio y orden—, pero esa lista se fijó tarde y bajo influencia occidental. Oriente nunca la ha definido dogmáticamente.',
          'La palabra griega es mystérion, misterio, no «sacramento». Y la tradición ha llamado también misterio a la consagración de una iglesia, a la tonsura monástica o al entierro. La cuestión de cuántos son no ha parecido nunca especialmente importante.',
          'Lo que sí se afirma es qué hacen: no son signos que recuerdan algo, sino actos por los que Dios obra de verdad usando materia —agua, pan, vino, aceite— porque el hombre no es un espíritu puro y Dios se hizo carne.',
        ],
      },
      {
        id: 'bautismo',
        question: '¿Qué pasa en el bautismo?',
        level: 'nuevo',
        answer: [
          'La persona muere y renace. Se sumerge tres veces —el rito ortodoxo es por inmersión, también en los niños— y sale injertada en Cristo, incorporada a su cuerpo, con sus pecados perdonados y su naturaleza puesta en camino de curación.',
          'Va seguido inmediatamente de la crismación, que es la unción con el santo myron: el don del Espíritu Santo, lo que en Occidente se separó como confirmación y se retrasó a la adolescencia. En Oriente van juntos, también en los recién nacidos, que además comulgan desde ese mismo día.',
          'Se recibe una sola vez y no se repite, aunque después se peque. Lo que se repite para eso es la confesión.',
        ],
        scripture: ['Romanos 6, 3-4', 'Juan 3, 5'],
      },
      {
        id: 'eucaristia',
        question: '¿Qué es la comunión?',
        level: 'nuevo',
        answer: [
          'El pan y el vino de la Divina Liturgia se convierten en el cuerpo y la sangre de Cristo. La Iglesia ortodoxa lo afirma sin rodeos y sin explicar el cómo: no ha adoptado la teoría de la transubstanciación ni ninguna otra, porque considera que el mecanismo no es asunto nuestro.',
          'Sucede cuando el sacerdote invoca al Espíritu Santo sobre los dones —la epíclesis—, y no en el momento de repetir las palabras de la Cena. Esa diferencia de acento con Occidente es real y antigua.',
          'Se recibe bajo las dos especies, con una cuchara, y también los niños. Es el centro de todo: la Iglesia se hace visible sobre todo cuando comulga.',
        ],
        scripture: ['Juan 6, 53-56', '1 Corintios 11, 27-29'],
        seeAlso: [{ label: 'Cómo se prepara la comunión', path: '/orar/oraciones/preparacion-para-comulgar' }],
      },
      {
        id: 'confesion',
        question: '¿Por qué hay que confesarse con un sacerdote?',
        level: 'nuevo',
        answer: [
          'Porque el pecado no es un asunto privado entre uno y Dios: daña también al cuerpo del que uno forma parte, y se sana dentro de ese cuerpo. El sacerdote no perdona por su cuenta; es testigo, y quien perdona es Cristo. La oración de absolución lo dice expresamente.',
          'Hay además una razón práctica que la tradición ascética repite: lo que se dice en voz alta ante otro pierde el poder que tenía mientras estaba escondido. Confesarse a solas con Dios es, casi siempre, negociar consigo mismo.',
          'El secreto es absoluto y sin excepciones. Y no es una conversación ni una consulta psicológica: uno se acusa a sí mismo, no explica las circunstancias ni habla de terceros.',
        ],
        scripture: ['Juan 20, 22-23', 'Santiago 5, 16'],
        seeAlso: [{ label: 'Cómo es la confesión', path: '/orar/oraciones/como-es-la-confesion' }],
      },
      {
        id: 'matrimonio-divorcio',
        question: '¿Admite la Iglesia ortodoxa el divorcio?',
        level: 'catecumeno',
        answer: [
          'El matrimonio es indisoluble y la Iglesia no lo disuelve. Pero reconoce que un matrimonio puede haber muerto de hecho, y en ese caso puede permitir un segundo —y excepcionalmente un tercer— matrimonio, con un rito distinto que incluye oraciones penitenciales.',
          'No es una anulación: no se declara que no hubiera matrimonio. Es lo que la tradición llama oikonomía, la aplicación misericordiosa de la norma a un caso concreto sin cambiar la norma. La contraria es akribeia, el rigor.',
          'Esa manera de proceder —mantener el ideal y tratar caso por caso a quien no ha podido con él— es característica del cristianismo oriental, y también su punto más criticado desde fuera.',
        ],
        scripture: ['Mateo 19, 6-9'],
        disputed:
          'La Iglesia católica no permite un segundo matrimonio en vida del cónyuge, y en su lugar utiliza la declaración de nulidad, que sostiene que el primero nunca existió. Son soluciones distintas al mismo problema.',
      },
    ],
  },

  /* ═══════════════════ 7. La vida cristiana ═══════════════════ */
  {
    id: 'vida',
    title: 'La vida cristiana',
    summary: 'Qué se hace con todo esto de lunes a sábado.',
    entries: [
      {
        id: 'como-rezar',
        question: '¿Cómo se reza?',
        level: 'nuevo',
        answer: [
          'Poco y todos los días es mejor que mucho un día suelto. Se empieza por una regla corta que se pueda cumplir: unos minutos por la mañana y otros por la noche. Si se falla, se retoma sin dramatizarlo.',
          'Se reza con palabras dadas antes que con las propias. No porque las propias no valgan, sino porque cuando uno está seco, distraído o enfadado, las palabras de la Iglesia sostienen lo que la voluntad no sostiene. Después se puede añadir lo que a uno le salga.',
          'Y se reza con el cuerpo: de pie, con la señal de la cruz, con inclinaciones. El cuerpo no es un estorbo para el espíritu; también él será resucitado.',
        ],
        seeAlso: [{ label: 'Los oficios del día', path: '/orar' }],
      },
      {
        id: 'oracion-jesus',
        question: '¿Qué es la oración de Jesús?',
        level: 'catecumeno',
        answer: [
          '«Señor Jesucristo, Hijo de Dios, ten piedad de mí, pecador.» Una frase que se repite despacio, muchas veces, hasta que deja de ser algo que uno dice y pasa a ser algo que ocurre dentro.',
          'Es el centro de la tradición hesicasta y se puede rezar en cualquier sitio: andando, esperando, sin que nadie lo note. Muchos usan un komboskini —una cuerda de nudos— para contar sin pensar en la cuenta.',
          'La tradición también avisa: buscar sensaciones, luces o calor es el camino corto hacia el autoengaño, que los Padres llaman plani. Si aparece algo llamativo, se ignora y se sigue. Y quien quiera ir más allá de la repetición sencilla necesita a alguien que lo guíe; no es un ejercicio para hacer solo a partir de un libro.',
        ],
        seeAlso: [{ label: 'Komboskini', path: '/orar/komboskini' }],
      },
      {
        id: 'ayuno',
        question: '¿Por qué se ayuna, y cómo?',
        level: 'nuevo',
        answer: [
          'No para castigarse ni para adelgazar, y desde luego no porque la carne sea mala: Dios la creó y la llamó buena. Se ayuna para aprender a decir que no a algo lícito, porque quien no sabe negarse lo lícito no podrá negarse lo demás.',
          'El ayuno ortodoxo es sobre todo de tipo de alimento, no de cantidad: se dejan la carne, los lácteos, los huevos y, según el día, el pescado, el aceite y el vino. Los miércoles y viernes de todo el año, y en los cuatro periodos de ayuno, el mayor de los cuales es la Gran Cuaresma.',
          'Y va siempre con lo otro: sin oración y sin limosna es una dieta. San Juan Crisóstomo lo dijo mejor: ¿de qué sirve no comer carne si devoras a tu hermano?',
          'La medida concreta se habla con el padre espiritual. La enfermedad, el embarazo, la edad y el trabajo duro cambian lo que a cada uno le corresponde, y decidirlo por cuenta propia suele acabar en vanidad o en abandono.',
        ],
        seeAlso: [{ label: 'El ayuno de hoy', path: '/calendario/ayuno' }],
      },
      {
        id: 'iconos',
        question: '¿No es idolatría venerar iconos?',
        level: 'nuevo',
        answer: [
          'No, y la Iglesia tardó un siglo de conflicto en decir por qué. El argumento decisivo es de san Juan Damasceno: en el Antiguo Testamento no se podía representar a Dios porque nadie lo había visto; desde que Dios se hizo hombre, sí, porque tiene rostro. Prohibir el icono es, en el fondo, negar que la encarnación fuera real.',
          'La Iglesia distingue además dos cosas que el castellano confunde: la adoración —latría—, que sólo se da a Dios, y la veneración —proskýnesis—, que se dirige a la persona representada y pasa a través de la imagen. Se besa el icono como se besa la foto de alguien a quien se quiere: nadie confunde el papel con la persona.',
          'El icono tampoco es un cuadro devoto. Sigue reglas: no busca el realismo ni la emoción, invierte la perspectiva para que el que mira quede dentro de la escena, y no se firma, porque no es la expresión de un artista.',
        ],
        seeAlso: [{ label: 'Iconografía', path: '/biblioteca/iconos' }],
      },
      {
        id: 'santos-y-maria',
        question: '¿Por qué se reza a los santos y a la Virgen?',
        level: 'nuevo',
        answer: [
          'No se les reza como se le reza a Dios: se les pide que recen con nosotros. Es lo mismo que pedirle a un amigo que rece por ti, con la diferencia de que a estos la muerte no los ha apartado, porque Dios no es Dios de muertos sino de vivos.',
          'A la Madre de Dios se le da el primer lugar entre todos. El título que la Iglesia le dio en Éfeso el año 431 es Theotokos, la que dio a luz a Dios, y se definió para decir algo sobre su Hijo antes que sobre ella: si lo que nació de ella era Dios, entonces la unión de las dos naturalezas es real desde el primer instante.',
          'La Iglesia ortodoxa no ha definido la Inmaculada Concepción tal como la formuló Roma en 1854, y la mayoría de los teólogos ortodoxos la rechazan —no por rebajar a María, sino porque la doctrina presupone una manera occidental de entender el pecado original que Oriente no comparte.',
        ],
        scripture: ['Lucas 1, 48', 'Apocalipsis 8, 3-4'],
        disputed:
          'La Inmaculada Concepción es dogma en la Iglesia católica desde 1854 y no lo es en la ortodoxa. La diferencia es más sobre el pecado original que sobre la Virgen.',
      },
    ],
  },

  /* ═══════════════════ 8. Las últimas cosas ═══════════════════ */
  {
    id: 'ultimas',
    title: 'Las últimas cosas',
    summary: 'La muerte, el juicio y lo que la Iglesia no ha definido.',
    entries: [
      {
        id: 'que-pasa-al-morir',
        question: '¿Qué pasa cuando uno muere?',
        level: 'catecumeno',
        answer: [
          'El alma se separa del cuerpo y entra en un estado de espera que no es todavía definitivo: hay una anticipación del gozo o de la pena, pero el juicio final y la resurrección de los cuerpos están por venir. Nadie ha llegado aún a su destino último.',
          'Por eso la Iglesia reza por los difuntos, y mucho: en la Liturgia, en las panijidas, en los sábados de difuntos. Si todo estuviera cerrado en el instante de morir, esas oraciones no tendrían sentido, y la Iglesia lleva veinte siglos haciéndolas.',
          'La esperanza cristiana no es la inmortalidad del alma —eso lo enseñaban ya los filósofos griegos— sino la resurrección del cuerpo. Lo que se espera no es escapar de la materia, sino recuperarla transfigurada.',
        ],
        scripture: ['1 Corintios 15, 42-44', '2 Macabeos 12, 44-45'],
        undefined_:
          'Los detalles de ese estado intermedio no están definidos. Lo que en la piedad rusa se llama «aduanas aéreas» es una imagen tradicional, no un dogma, y hay teólogos ortodoxos serios que la rechazan.',
      },
      {
        id: 'infierno',
        question: '¿Existe el infierno?',
        level: 'catecumeno',
        answer: [
          'Sí, y el Evangelio habla de él con una seriedad que no permite tratarlo como una metáfora pedagógica. La Iglesia no enseña que todos se salven necesariamente.',
          'Sobre qué es, la tradición oriental se inclina por una explicación que sorprende a mucha gente: no un lugar donde Dios castiga, sino el mismo amor de Dios experimentado como tormento por quien lo rechazó. El mismo fuego que es gozo para unos quema a otros. San Isaac el Sirio lo formuló así.',
          'Que Dios quiere que todos se salven es doctrina. Que todos se salvarán de hecho no lo es, y quien lo afirme como enseñanza de la Iglesia se excede. La esperanza de que nadie se pierda es legítima y la han tenido santos; presentarla como certeza, no.',
        ],
        scripture: ['Mateo 25, 41-46', '1 Timoteo 2, 4'],
        undefined_:
          'La Iglesia condenó el apocatástasis de Orígenes —la afirmación de que todos, incluidos los demonios, serán restaurados—, pero no ha definido lo contrario como certeza. Es terreno donde conviene hablar con humildad.',
      },
      {
        id: 'purgatorio',
        question: '¿Hay purgatorio?',
        level: 'iniciado',
        answer: [
          'No como lo formuló la teología latina medieval: un lugar y un tiempo determinados de pena expiatoria que salda una deuda pendiente. La Iglesia ortodoxa rechazó esa doctrina expresamente en el Concilio de Florencia, por boca de san Marcos de Éfeso.',
          'Lo que sí sostiene es que los difuntos pueden recibir ayuda de las oraciones de la Iglesia y que su situación no está congelada. Cómo ocurre eso no se explica.',
          'La diferencia real, más que sobre la existencia de una purificación, es sobre el marco: Occidente lo pensó en términos de deuda y satisfacción; Oriente se niega a cuantificar y prefiere no decir más de lo que le ha sido revelado.',
        ],
        disputed:
          'Es una diferencia doctrinal formal con la Iglesia católica, definida en Florencia (1439) y no aceptada por Oriente.',
      },
    ],
  },

  /* ═══════════════════ 9. El fondo ═══════════════════ */
  {
    id: 'fondo',
    title: 'El fondo',
    summary: 'Distinciones que separan al que sabe rezar del que además entiende lo que reza.',
    entries: [
      {
        id: 'dogma-teologumeno',
        question: '¿Todo lo que dice un santo es doctrina de la Iglesia?',
        level: 'iniciado',
        answer: [
          'No, y confundirlo es una de las causas más frecuentes de discusiones estériles. La tradición distingue tres cosas. El dogma es lo definido por un Concilio Ecuménico y recibido por la Iglesia: obliga. El teologúmeno es una opinión teológica respetable, sostenida por Padres, que la Iglesia no ha definido: se puede sostener y se puede no sostener. Y la opinión privada es lo que un autor piensa por su cuenta, por santo que sea.',
          'Ejemplos: que Cristo tiene dos naturalezas es dogma. Que el infierno sea el amor de Dios sentido como tormento es teologúmeno. Que existan las aduanas aéreas es, para muchos teólogos, opinión.',
          'Un santo puede equivocarse en lo que no es dogma, y varios lo hicieron. Venerar a alguien no obliga a suscribir cada frase que escribió, y la Iglesia nunca lo ha entendido así.',
        ],
      },
      {
        id: 'sinergia',
        question: 'Si la salvación es un don, ¿para qué sirve lo que yo haga?',
        level: 'iniciado',
        answer: [
          'La tradición oriental responde con la palabra sinergia: obra conjunta. Dios da la gracia y el hombre coopera; ninguna de las dos partes sobra y ninguna sustituye a la otra. San Pablo lo dice en una sola frase: «trabajad vuestra salvación, porque Dios es el que obra en vosotros».',
          'Eso descarta los dos extremos. Ni el hombre se salva por sus méritos, como si Dios le debiera algo, ni la gracia opera sobre él como sobre una piedra, sin que su libertad cuente. Dios no fuerza: llama, espera y respeta la negativa.',
          'La discusión occidental entre gracia y libre albedrío —Pelagio, Agustín, después Lutero y Trento— apenas tuvo eco en Oriente, porque el marco era otro desde el principio. Muchos malentendidos entre confesiones vienen de plantear a un ortodoxo una pregunta formulada dentro de ese debate.',
        ],
        scripture: ['Filipenses 2, 12-13', 'Apocalipsis 3, 20'],
        undefined_:
          'Oriente nunca ha elaborado un tratado sistemático sobre la relación entre gracia y libertad, y desconfía de los que lo hacen: la considera una realidad vivida antes que un problema por resolver.',
      },
      {
        id: 'calendarios',
        question: '¿Por qué unas Iglesias ortodoxas celebran la Navidad el 7 de enero?',
        level: 'iniciado',
        answer: [
          'Porque siguen el calendario juliano, que va trece días por detrás del gregoriano que usa el mundo civil. Su 25 de diciembre cae en nuestro 7 de enero. No celebran otra fiesta: celebran la misma en otra fecha.',
          'En los años veinte del siglo pasado, varias Iglesias adoptaron el llamado calendario juliano revisado, que coincide con el gregoriano para las fiestas fijas. Otras —Rusia, Serbia, Jerusalén, el Monte Athos— mantuvieron el juliano. La Pascua, en cambio, la calculan todas por el cómputo juliano, y por eso suele caer en fecha distinta de la occidental.',
          'La cuestión ha producido cismas dolorosos, con comunidades que consideran el cambio una traición. Conviene tratarla con cuidado: no es un asunto de exactitud astronómica, sino de qué se rompe cuando una parte de la Iglesia deja de rezar el mismo día que la otra.',
        ],
        seeAlso: [{ label: 'El calendario', path: '/calendario' }],
      },
      {
        id: 'oikonomia',
        question: '¿Por qué a veces la Iglesia aplica la norma y a veces no?',
        level: 'iniciado',
        answer: [
          'Porque distingue entre akribeia —el rigor, la norma en su exactitud— y oikonomía, que es su aplicación adaptada a un caso concreto por el bien de la persona. La palabra significa administración de la casa: lo que hace un padre de familia, no lo que hace un juez.',
          'La oikonomía no deroga la norma ni la declara injusta: la aplica a alguien que no puede con ella entera, sin fingir que el ideal ha cambiado. Por eso se admite un segundo matrimonio con rito penitencial, o se recibe por crismación a quien viene de otra confesión.',
          'No es discrecionalidad ni indulgencia general. La ejerce el obispo o el padre espiritual, caso por caso, y su abuso es una crítica interna frecuente y fundada. Pero la alternativa —aplicar la norma sin mirar a quién— la tradición oriental la considera una forma de crueldad.',
        ],
      },
      {
        id: 'no-hay-estatuas',
        question: '¿Por qué no hay estatuas en las iglesias ortodoxas?',
        level: 'iniciado',
        answer: [
          'No hay una prohibición dogmática de la escultura, y de hecho existen relieves antiguos. Lo que hay es una decisión práctica y estética sostenida durante siglos: la imagen de bulto redondo se asoció al ídolo pagano, y el icono plano resultaba menos equívoco.',
          'Hay además una razón teológica sobre cómo se pinta. El icono no busca representar la carne como es, sino como será transfigurada: por eso invierte la perspectiva, evita las sombras y no imita el volumen. Una estatua realista tira en la dirección contraria.',
          'Es un punto donde la práctica oriental y la occidental divergieron sin que ningún concilio lo decidiera. Quien venga del catolicismo hará bien en no interpretar la ausencia de estatuas como una condena de las suyas.',
        ],
        seeAlso: [{ label: 'Iconografía', path: '/biblioteca/iconos' }],
      },
    ],
  },

  /* ═══════════════════ 10. Preguntas difíciles ═══════════════════ */
  {
    id: 'dificiles',
    title: 'Las preguntas difíciles',
    summary: 'Lo que la gente pregunta de verdad y los catecismos suelen esquivar.',
    entries: [
      {
        id: 'el-mal',
        question: 'Si Dios es bueno, ¿por qué hay tanto sufrimiento?',
        level: 'nuevo',
        answer: [
          'No hay una respuesta que deje satisfecho a quien está sufriendo, y conviene decirlo antes que nada. Cualquier explicación que funcione sobre el papel suena obscena junto a una cama de hospital.',
          'Lo que la Iglesia afirma es que el mal no es una cosa que Dios creara: es una privación, un bien que falta, como la ceguera no es algo sino la ausencia de vista. Dios no hizo el mal ni lo quiere. Entró por una libertad usada contra su fin, y sigue entrando por ahí.',
          'Y afirma algo más incómodo de refutar que de aceptar: que Dios no se limitó a permitirlo desde fuera. Se metió dentro. La respuesta del cristianismo al sufrimiento no es una teoría, es un crucifijo. Eso no explica el dolor de nadie, pero cambia con quién se está mientras dura.',
        ],
        undefined_:
          'La Iglesia no ha definido una explicación del mal, y sospecha de las que se ofrecen con demasiada seguridad. Job termina sin recibir la explicación que pedía.',
      },
      {
        id: 'ciencia',
        question: '¿Hay que elegir entre la fe y la ciencia?',
        level: 'nuevo',
        answer: [
          'No, y la Iglesia ortodoxa no ha tenido nunca un conflicto institucional con la ciencia comparable al que hubo en Occidente. No hay ningún pronunciamiento ortodoxo contra la evolución ni contra la edad del universo.',
          'El Génesis no es un informe de laboratorio. San Basilio ya explicaba en el siglo IV que los días de la creación no tienen por qué ser jornadas de veinticuatro horas, y usaba la ciencia natural de su tiempo en sus homilías sin ver problema. La pregunta que responde el Génesis es quién y para qué, no cómo ni cuándo.',
          'Hay ortodoxos creacionistas literales, sobre todo por influencia protestante norteamericana, pero no es la posición de la Iglesia ni la tradicional.',
        ],
        seeAlso: [{ label: 'San Basilio el Grande', path: '/biblioteca/padres/basilio-magno' }],
      },
      {
        id: 'no-siento-nada',
        question: 'Rezo y no siento nada. ¿Lo estoy haciendo mal?',
        level: 'catecumeno',
        answer: [
          'Casi seguro que no. La sequedad es la experiencia normal de la mayor parte del tiempo, y toda la literatura ascética la da por descontada. San Isaac el Sirio dedica páginas enteras a ella.',
          'La tradición avisa incluso de lo contrario: quien busca sensaciones y las encuentra tiene más motivos de sospecha que quien no siente nada. El consuelo se recibe si viene, no se persigue.',
          'Lo que se pide no es sentir, sino estar. Rezar sin ganas y sin fruto aparente, sólo porque toca, vale más que rezar arrebatado, porque es lo único que uno puede ofrecer cuando no tiene nada.',
        ],
        seeAlso: [{ label: 'San Isaac el Sirio', path: '/biblioteca/padres/isaac-sirio' }],
      },
      {
        id: 'como-me-hago-ortodoxo',
        question: 'Quiero entrar en la Iglesia ortodoxa. ¿Qué hago?',
        level: 'catecumeno',
        answer: [
          'Ir a una parroquia, varias veces, antes de decidir nada. No se entra en la Iglesia leyendo sobre ella; se entra en una comunidad concreta, con su lengua, su horario y su gente. Conviene saber en cuál va uno a acabar.',
          'Después, hablar con el sacerdote y decirle que quieres entrar. Empieza entonces el catecumenado: un tiempo de preparación que suele durar entre unos meses y un par de años, según el caso, y que no conviene acortar. Sirve tanto para que aprendas como para que compruebes si esto es lo tuyo.',
          'La recepción será por bautismo si no estás bautizado, y si vienes de otra confesión cristiana puede ser por crismación o por confesión de fe: lo decide el obispo según de dónde vengas. Nadie te va a cobrar nada en ningún momento.',
          'Un consejo que dan casi todos los sacerdotes a los convertidos: no empieces por el rigor. Los recién llegados tienden a ayunar más que los monjes y a corregir a los que llevan cuarenta años dentro. Casi siempre acaba mal.',
        ],
        seeAlso: [{ label: 'Cómo se pide la bendición', path: '/orar/oraciones/pedir-la-bendicion' }],
      },
    ],
  },
];

/**
 * Las dos tandas, montadas en un solo catecismo.
 *
 * Las partes nuevas se intercalan donde les toca —la Escritura después de la
 * Iglesia, el templo después de los Misterios— y no al final, porque un
 * catecismo con un apéndice es un catecismo que no se lee entero. Las
 * preguntas añadidas a una parte que ya existía van detrás de las suyas.
 */
const DONDE_VA: Record<string, string> = {
  // parte nueva -> detrás de qué parte existente
  escritura: 'iglesia',
  'en-la-iglesia': 'misterios',
  'vida-diaria': 'vida',
};

function montar(): CatechismPart[] {
  const conExtras = BASE_PARTS.map((parte) => {
    const mas = EXTRA_ENTRIES[parte.id];
    return mas ? { ...parte, entries: [...parte.entries, ...mas] } : parte;
  });

  const salida: CatechismPart[] = [];
  for (const parte of conExtras) {
    salida.push(parte);
    for (const nueva of EXTRA_PARTS) {
      if (DONDE_VA[nueva.id] === parte.id) salida.push(nueva);
    }
  }
  // Si alguna parte nueva apunta a una que no existe, no se pierde: va al final.
  for (const nueva of EXTRA_PARTS) {
    if (!salida.some((p) => p.id === nueva.id)) salida.push(nueva);
  }
  return salida;
}

export const CATECHISM_PARTS: CatechismPart[] = montar();

/** Todas las preguntas, sueltas, con la parte a la que pertenecen. */
export const CATECHISM_INDEX = CATECHISM_PARTS.flatMap((parte) =>
  parte.entries.map((entry) => ({ entry, partId: parte.id, partTitle: parte.title })),
);
