/**
 * Qué enseñó cada Padre y de qué trata cada obra suya.
 *
 * Esto NO es texto patrístico: es prosa redactada para ATHOS. La distinción
 * importa y se mantiene en las fichas: los pasajes de los Padres llevan su
 * procedencia y su licencia; esto lleva la de ATHOS.
 *
 * Existe porque una ficha que sólo dice «Sobre el Espíritu Santo — contenido
 * pendiente de incorporar» no enseña nada. Mientras no se pueda incorporar una
 * traducción española con licencia compatible, al menos que se sepa qué dijo
 * ese hombre, en qué obra lo dijo y por qué la Iglesia sigue leyéndolo.
 */

/** Lo que enseñó un Padre, un párrafo por idea. */
export const TEACHING: Record<string, string[]> = {
  'juan-crisostomo': [
    'Que la Escritura es para todos. Contra quienes reservaban la Biblia a los monjes, predicó capítulo a capítulo ante artesanos y comerciantes, explicando el texto entero sin saltarse lo incómodo. Sus homilías son el comentario continuado más extenso que nos ha llegado de la Antigüedad cristiana.',
    'Que la limosna no es caridad, sino justicia. Repitió que lo que sobra al rico pertenece al pobre y que retenerlo es robo, no falta de generosidad. «¿No es un robo tomar lo que no es tuyo? Lo que has recibido lo has recibido para administrarlo.» Le costó el destierro.',
    'Que la liturgia y la calle no se separan. Su frase más citada: de nada sirve honrar el cuerpo de Cristo en el altar con cálices de oro si se le desprecia fuera, desnudo y con frío. El altar del templo y el altar del pobre son el mismo.',
    'Que el sacerdocio es una carga temible. En Sobre el sacerdocio explica por qué huyó de la ordenación: el que cura almas no puede forzar, ni castigar, ni encerrar; sólo persuadir. Tiene toda la responsabilidad y ninguna de las herramientas del poder.',
  ],
  'basilio-magno': [
    'Que el Espíritu Santo es Dios. Cuando el arrianismo ya había sido condenado, quedaba el paso siguiente: unos aceptaban al Hijo pero rebajaban al Espíritu a criatura. Basilio demostró, desde la práctica del bautismo y de la doxología, que a quien se adora con el Padre y el Hijo no se le puede llamar criatura. Ese trabajo desembocó en el artículo del Credo de Constantinopla.',
    'Que la vida monástica es vida en común. Frente al ermitaño solitario, sostuvo que el mandamiento del amor necesita a alguien a quien amar: «¿A quién lavarás los pies si vives solo?». Sus Reglas ordenaron el monacato oriental en torno al trabajo, la oración y la obediencia compartida, y siguen siendo su base.',
    'Que la caridad se organiza. No se limitó a predicarla: levantó a las afueras de Cesarea un complejo con hospital, hospedería, talleres y leprosería —la Basiliada—, atendido por los propios monjes. Gregorio Nacianceno la llamó «una ciudad nueva». Es el antepasado del hospital europeo.',
    'Que la cultura pagana se puede aprovechar. En su discurso a los jóvenes defendió leer a los clásicos griegos como la abeja toma de la flor: sin quedarse en la flor y sin envenenarse. Esa página salvó buena parte de la literatura antigua en los monasterios bizantinos.',
  ],
  'gregorio-nacianceno': [
    'Que de Dios se puede decir que es, pero no qué es. Distinguió lo que se conoce de Dios —que existe, y sus obras— de su esencia, que ninguna criatura alcanza. Ese límite es el suelo de toda la teología ortodoxa posterior, y por él la Iglesia le dio el título de «el Teólogo», que sólo comparte con el apóstol Juan y con Simeón.',
    'Que lo no asumido no es sanado. Contra quienes decían que Cristo tomó carne humana pero no mente humana, respondió con la frase que zanjó la cuestión: lo que no ha sido asumido no ha sido curado. Si Cristo no tomó una mente humana, la mente humana sigue enferma. La encarnación es completa o no salva.',
    'Que la Trinidad no se explica, se confiesa. Sus cinco Discursos teológicos, predicados en una capilla diminuta de una Constantinopla arriana, fijaron el lenguaje: una esencia, tres hipóstasis; ni tres dioses ni un dios con tres máscaras. De ahí sale la formulación que todavía se usa.',
    'Que el pastor debe temer su oficio. Huyó de la ordenación como Crisóstomo, y escribió su Apología para explicarse: gobernar almas es «el arte de las artes», más difícil que curar cuerpos, porque el enfermo del alma esconde su enfermedad.',
  ],
  atanasio: [
    'Que Dios se hizo hombre para que el hombre fuese hecho dios. Es la frase de La encarnación del Verbo, y no significa que el hombre se vuelva Dios por naturaleza, sino que participa de su vida por gracia. Toda la doctrina ortodoxa de la deificación —la théosis— arranca ahí.',
    'Que el Hijo no es criatura. Frente a Arrio, que sostenía «hubo un tiempo en que no era», Atanasio vio lo que estaba en juego: si el Hijo es criatura, entonces no nos ha unido a Dios y el cristianismo se derrumba. Consustancial —homooúsios— no era una sutileza griega, era la diferencia entre ser salvado y no serlo.',
    'Que se puede tener razón contra todos. Pasó diecisiete de sus cuarenta y cinco años de episcopado en el destierro, cinco veces expulsado, mientras la mayoría de los obispos aceptaba fórmulas de compromiso. De ahí la expresión «Athanasius contra mundum».',
    'Que la vida monástica se puede contar. Su Vida de Antonio fue el libro de mayor difusión de la Antigüedad cristiana después de la Biblia; se tradujo enseguida al latín y llevó el monacato a Occidente. Agustín cuenta en sus Confesiones que su lectura precipitó su conversión.',
  ],
  'maximo-confesor': [
    'Que Cristo tiene dos voluntades, divina y humana. Cuando el imperio propuso el monotelismo —una sola voluntad— como fórmula de paz con los monofisitas, Máximo se opuso solo, siendo un simple monje sin cargo. Si Cristo no tuvo voluntad humana, no hubo Getsemaní ni obediencia libre, y la humanidad no fue redimida en su punto más decisivo: el querer.',
    'Que la creación entera está hecha para unirse a Dios. Su visión abarca cinco divisiones que Cristo va cerrando —entre increado y creado, cielo y tierra, paraíso y mundo, varón y mujer— hasta reunir todo en Dios. El hombre es el que cose esas costuras, y por eso su caída desgarra el cosmos entero.',
    'Que cada cosa creada tiene su lógos, su razón en Dios. Conocer el mundo no es apartarse de Dios sino leer sus intenciones. Esa idea es el fundamento de la contemplación natural de la tradición hesicasta.',
    'Que las pasiones no son malas en sí. Son energías buenas mal dirigidas: el deseo puesto en lo que no sacia, la ira vuelta contra el hermano en vez de contra el pecado. La ascesis no las mata, las reorienta. Los Capítulos sobre la caridad desarrollan esto en sentencias breves.',
    'Le cortaron la lengua y la mano derecha para que no pudiera hablar ni escribir. Murió poco después, en el destierro, el año 662. Diecinueve años más tarde, el Sexto Concilio Ecuménico le dio la razón palabra por palabra.',
  ],
  'juan-damasceno': [
    'Que el icono no es un ídolo, porque Dios se ha hecho visible. Su argumento decisivo contra los iconoclastas: en el Antiguo Testamento no se podía representar a Dios porque nadie lo había visto; desde la encarnación sí, porque tiene rostro. Prohibir el icono es negar que Dios se hizo carne de verdad.',
    'Que se venera al representado, no a la tabla. Distinguió la adoración —latría—, que sólo a Dios se debe, de la veneración —proskýnesis—, que pasa a través de la imagen hasta la persona. Esa distinción es la que adoptó el Séptimo Concilio Ecuménico y la que la Iglesia sigue usando.',
    'Que la fe se puede ordenar entera. La Fuente del conocimiento reúne por primera vez toda la doctrina cristiana en un sistema: filosofía, herejías y exposición de la fe. Fue el manual de Oriente durante mil años y, traducido, llegó a Tomás de Aquino.',
    'Escribía desde territorio musulmán, bajo el califa, fuera del alcance del emperador iconoclasta que lo condenaba. Es el último de los Padres griegos en el sentido clásico: después de él, Oriente comenta más que crea.',
  ],
  'isaac-sirio': [
    'Que el conocimiento de Dios pasa por la humildad, no por el esfuerzo. Sus Discursos ascéticos describen con una precisión casi clínica lo que le ocurre a quien reza en serio: la sequedad, el desaliento, la tentación de medirse. Es el autor más leído en los monasterios del Athos después de la Escritura.',
    'Que hay que tener un corazón ardiente por toda la creación. Su página más célebre: por los hombres, por los pájaros, por los animales, por los demonios, por toda criatura; y de tanta compasión el corazón se estremece y no soporta oír o ver el menor daño hecho a un ser vivo.',
    'Que el infierno es el amor de Dios sentido como tormento. Sostuvo que Dios no castiga: es el mismo amor el que goza el que lo ha acogido y quema al que lo rechazó. La idea es discutida y no es doctrina definida, pero recorre toda la espiritualidad oriental posterior.',
    'Era obispo de Nínive y duró cinco meses en el cargo. Renunció y se volvió al desierto, donde quedó ciego de tanto leer. Pertenecía a la Iglesia de Oriente —la llamada nestoriana— y aun así la Iglesia ortodoxa lo lee y lo venera: es un caso singular de reconocimiento por encima de la división.',
  ],
  'gregorio-palamas': [
    'Que a Dios se le puede conocer de verdad sin conocer su esencia. Distinguió en Dios la esencia, inaccesible para siempre, y las energías increadas, por las que se comunica. No son dos dioses ni dos partes: es Dios entero inaccesible en su ser y entero dado en su obrar.',
    'Que la luz del Tabor no era un símbolo. Contra Barlaam, que la tenía por un fenómeno creado y pasajero, sostuvo que los apóstoles vieron la divinidad misma con ojos transfigurados. Lo que puede ver el hombre no es una idea de Dios sino a Dios.',
    'Que el cuerpo participa de la oración. Frente a quienes despreciaban las posturas y la respiración de los hesicastas, defendió que el hombre reza entero, no sólo con la mente: el cuerpo también será resucitado, y también ahora se santifica.',
    'Los concilios de Constantinopla de 1341, 1347 y 1351 le dieron la razón. El segundo domingo de Gran Cuaresma la Iglesia ortodoxa lo conmemora, junto al domingo de la Ortodoxia: es la victoria sobre la última gran discusión doctrinal de Bizancio.',
  ],
  'serafin-sarov': [
    'Que el fin de la vida cristiana es adquirir el Espíritu Santo. Lo dijo en su conversación con Motovílov, quizá el texto espiritual ruso más leído: el ayuno, la vigilia y la limosna son medios, y sólo valen en la medida en que consiguen eso. Un negocio, decía: comprar el Espíritu con lo que uno tenga.',
    'Que la alegría es signo de esa presencia. Recibía a cuantos llegaban —llegaron a ser miles al día— con el saludo pascual: «Alegría mía, ¡Cristo ha resucitado!», en cualquier época del año.',
    'Que la salvación de uno alcanza a muchos. Su frase más repetida: adquiere el espíritu de paz y mil se salvarán a tu alrededor.',
    'Durante aquella conversación, Motovílov cuenta que el rostro del santo se volvió luminoso y que no podía mirarle, y que sintió a la vez calor y una paz desacostumbrada, en pleno bosque nevado. La escena se lee como una Transfiguración en miniatura, y así la entiende la tradición rusa.',
  ],
  'juan-kronstadt': [
    'Que la Eucaristía es para recibirla, no para contemplarla. En una Rusia donde la gente comulgaba una vez al año, celebró a diario y empujó a comulgar con frecuencia. Aquello cambió la práctica de la Iglesia rusa y, a través de la emigración, la de casi toda la ortodoxia.',
    'Que la oración es un trato con alguien presente. Mi vida en Cristo es su diario, escrito a ráfagas: no expone un método, anota lo que le va pasando mientras reza, incluidos el desgano, la distracción y la vergüenza. Por eso se lee como se lee a un contemporáneo.',
    'Que el sacerdote se debe a los pobres de su ciudad. Kronstadt era un puerto militar con barrios miserables; organizó comedores, casas de acogida y talleres, y repartía cuanto le daban, que era mucho, porque llegó a ser el sacerdote más conocido del imperio.',
    'Murió en 1908, antes de la revolución que arrasaría la Iglesia que él había servido. Sus escritos circularon clandestinamente durante el periodo soviético, copiados a mano y pasados de una casa a otra, y fue canonizado en 1990, en cuanto se pudo. Es uno de los pocos santos rusos modernos venerados por igual dentro y fuera de Rusia.',
  ],
  'teofano-recluso': [
    'Que la vida espiritual tiene etapas y se puede describir. Sus obras —El camino a la salvación sobre todo— trazan el itinerario del que empieza: el despertar, la lucha, la costumbre del bien. Escribía sobre todo cartas, miles, a gente corriente que le preguntaba qué hacer.',
    'Que la oración empieza en los labios y baja al corazón. Explicó el paso de la oración leída a la oración de la mente y de ésta a la del corazón sin envolverlo en misterio, con la sobriedad de quien ha visto los errores de los que corren.',
    'Que un laico puede vivir en serio. Insistió en que lo esencial no es el estado —monje o casado— sino la atención sostenida a Dios en lo que a cada uno le toque, y dio consejos concretos a comerciantes, funcionarios y madres de familia.',
    'Tradujo al ruso la Filocalia y la difundió. Buena parte de lo que Occidente conoce de la espiritualidad rusa del XIX pasa por su versión. Se recluyó veintiocho años en el monasterio de Vysha, donde siguió respondiendo cartas hasta su muerte en 1894.',
  ],
  'silvano-athonita': [
    'Que hay que mantener la mente en el infierno y no desesperar. Es la palabra que recibió y que resume su camino: mirar de frente la propia miseria sin que eso arranque la esperanza. Ni presunción ni desesperación; las dos son formas de dejar de mirar a Dios.',
    'Que se conoce a Dios por el amor a los enemigos. Repitió que quien no ama a sus enemigos no ha conocido al Espíritu Santo, y que ésa es la señal que no engaña, más segura que las lágrimas o las visiones.',
    'Que se puede llorar por el mundo entero. Su escrito vuelve una y otra vez a la compasión por todos los hombres, incluidos los que no creen y los que hacen daño: «Rezar por los demás es derramar sangre».',
    'Era un campesino ruso sin instrucción, monje en el Rossikon del Athos, y pasó allí cuarenta y seis años, buena parte en el molino y en el almacén. Sus escritos los publicó su discípulo Sofronio en 1948, y desde entonces no han dejado de reeditarse.',
  ],
};

/** Por dónde empezar a leer a cada uno, y qué esperar. */
export const READING: Record<string, string> = {
  'juan-crisostomo':
    'Empieza por la Homilía catequética pascual, que dura tres minutos y se lee entera en esta aplicación. Después, las homilías sobre Mateo, que se pueden tomar de una en una sin seguir un orden.',
  'basilio-magno':
    'El Hexamerón se lee como lo que fue: nueve charlas a un público que venía de trabajar. Sobre el Espíritu Santo exige más y conviene leerlo sabiendo qué se discutía.',
  'gregorio-nacianceno':
    'Los Discursos teológicos son cinco y son difíciles, pero cortos. Si prefieres empezar por algo más humano, sus poemas y su oración fúnebre por Basilio.',
  atanasio:
    'La encarnación del Verbo es breve, ordenado y se entiende sin preparación: es una de las mejores puertas de entrada a toda la patrística. La Vida de Antonio se lee como una narración.',
  'maximo-confesor':
    'No empieces por las Ambigua, que son de lo más difícil que se ha escrito en griego cristiano. Los Capítulos sobre la caridad son sentencias sueltas y admiten leerse de a poco.',
  'juan-damasceno':
    'Los tres Discursos contra los iconoclastas son directos y polémicos. La Exposición exacta de la fe ortodoxa es un manual: se consulta más que se lee de corrido.',
  'isaac-sirio':
    'Se lee despacio y en poca cantidad: un discurso, o media página, y parar. Leerlo de corrido no aprovecha. Es de los pocos Padres que hablan de lo que sale mal.',
  'gregorio-palamas':
    'Las Tríadas son una polémica y se entienden mal sin saber contra quién van. Para asomarse, sus homilías, que predicó a la gente de Tesalónica y son mucho más llanas.',
  'serafin-sarov':
    'La conversación con Motovílov, y poco más: no escribió tratados. Lo demás son dichos recogidos por otros.',
  'juan-kronstadt':
    'Mi vida en Cristo se abre por cualquier página. Es un diario, no un tratado, y está pensado para leerse así.',
  'teofano-recluso':
    'El camino a la salvación para el conjunto, y sus cartas para lo concreto. Escribe claro y sin adornos, dirigiéndose a gente que trabaja.',
  'silvano-athonita':
    'El libro de Sofronio —vida y escritos juntos— es la manera habitual de leerlo, y conviene: sus páginas sueltas se entienden mejor sabiendo de dónde salen.',
};

/** Lo que conviene aclarar antes de que alguien se lleve una idea equivocada. */
export const CAUTION: Record<string, string> = {
  'isaac-sirio':
    'Su idea de que el infierno es el amor de Dios sentido como tormento se cita mucho y a veces como si fuera doctrina de la Iglesia. No lo es: es la opinión de un santo, discutida, y la Iglesia no la ha definido ni en un sentido ni en otro.',
  'maximo-confesor':
    'Se le atribuyen escritos que no son suyos, y algunos de los que sí lo son circulan en versiones muy retocadas. Al leerlo conviene mirar de qué edición se trata.',
  'juan-crisostomo':
    'Predicó contra los judaizantes de Antioquía en un tono durísimo, en un contexto de disputa interna del siglo IV. Esas homilías se han usado después para justificar el antisemitismo, y la Iglesia ortodoxa no las excusa ni las esconde: se leen sabiendo lo que son.',
};

/**
 * De qué trata cada obra.
 *
 * Es lo que ATHOS puede dar mientras no pueda dar el texto: qué se va a
 * encontrar quien la abra, cuándo se escribió y para qué.
 */
export const WORK_SUMMARY: Record<string, { summary: string; written?: string }> = {
  'crisostomo-catequesis-pascual': {
    summary:
      'Tres minutos de sermón que llaman a la mesa a todos: al que ayunó desde el principio y al que llegó a la última hora, al que trabajó y al que no. Termina desafiando a la muerte con las palabras de Oseas y de san Pablo. Es el texto que más veces se ha leído en voz alta en la historia de la Iglesia ortodoxa.',
    written: 'Antioquía o Constantinopla, finales del siglo IV. Se lee cada año en la noche de Pascua.',
  },
  'crisostomo-homilias-mateo': {
    summary:
      'Noventa homilías que recorren el primer Evangelio versículo a versículo. No es un comentario de escritorio: se predicaron ante una asamblea que respondía en voz alta, y Crisóstomo interrumpe la exégesis para reñir a los que aplaudían o a los que se habían ido al hipódromo. La lectura más completa de Mateo que nos ha llegado de la Antigüedad.',
    written: 'Antioquía, hacia el 390.',
  },
  'crisostomo-sacerdocio': {
    summary:
      'Un diálogo con su amigo Basilio en el que explica por qué se escondió para no ser ordenado. El argumento: el que gobierna almas no puede obligar a nadie —no puede encerrar, ni multar, ni forzar—, sólo persuadir; tiene toda la responsabilidad y ninguna herramienta. Es el tratado sobre el ministerio más influyente del cristianismo oriental.',
    written: 'Antioquía, hacia el 386, poco después de su ordenación.',
  },
  'crisostomo-estatuas': {
    summary:
      'Veintiuna homilías predicadas durante las semanas en que Antioquía esperaba el castigo imperial: la ciudad había derribado las estatuas del emperador en un motín por los impuestos, y temía ser arrasada. Crisóstomo predicó cada día a una población aterrada, y de esa urgencia salen algunas de sus páginas más directas sobre el miedo, la penitencia y la providencia.',
    written: 'Antioquía, Cuaresma del 387.',
  },
  'basilio-espiritu-santo': {
    summary:
      'La demostración de que el Espíritu Santo es Dios, hecha desde un sitio inesperado: la manera en que la Iglesia bautiza y da gloria. Si se bautiza en el nombre de los tres, y si a los tres se les glorifica juntos, entonces no cabe llamar criatura a uno de ellos. De este tratado sale el artículo sobre el Espíritu del Credo de Constantinopla.',
    written: 'Cesarea, hacia el 375, a petición de su amigo Anfiloquio de Iconio.',
  },
  'basilio-hexameron': {
    summary:
      'Nueve homilías sobre los seis días de la creación, predicadas por la mañana y por la tarde a gente que venía de trabajar. Mezcla exégesis con todo lo que la ciencia de su tiempo sabía de animales, plantas y astros, y se detiene a describir un cangrejo o el modo en que crece una semilla. Se leyó durante siglos como manual de historia natural además de como comentario.',
    written: 'Cesarea, Cuaresma, hacia el 378.',
  },
  'basilio-reglas': {
    summary:
      'Las Reglas mayores y menores no son un reglamento sino respuestas a preguntas de monjes, ordenadas después. Fijan la vida común, el trabajo manual, la obediencia y la atención a los pobres como forma normal del monacato oriental. Benito las conoció y las usó al escribir la suya.',
    written: 'Ponto y Cesarea, entre el 358 y el 378.',
  },
  'gregorio-discursos-teologicos': {
    summary:
      'Cinco sermones predicados en una capilla pequeña —la Anastasía— cuando toda Constantinopla era arriana y él tenía una congregación diminuta. Fijan lo que se puede decir de Dios y lo que no, y el lenguaje de una esencia y tres hipóstasis con el que la Iglesia habla desde entonces. Le valieron el título de «el Teólogo».',
    written: 'Constantinopla, año 380.',
  },
  'gregorio-poemas': {
    summary:
      'Miles de versos en los que cuenta su vida sin adornarla: la ordenación que no quiso, el fracaso en Constantinopla, la traición de sus amigos, la vejez enferma. Es la primera autobiografía cristiana en verso y uno de los testimonios más francos que dejó un Padre sobre sus propias derrotas.',
    written: 'Arianzo, retirado, después del 381.',
  },
  'atanasio-encarnacion': {
    summary:
      'Explica por qué Dios tuvo que hacerse hombre: el hombre había vuelto a la nada de la que salió, y sólo quien lo creó podía rehacerlo. Contiene la frase que resume toda la soteriología oriental —Dios se hizo hombre para que el hombre fuese hecho dios— y es breve, ordenado y legible sin preparación previa.',
    written: 'Alejandría, hacia el 318, siendo aún muy joven.',
  },
  'atanasio-vida-antonio': {
    summary:
      'La vida del primer gran ermitaño del desierto egipcio, contada por alguien que lo conoció. Fue el libro cristiano más difundido de la Antigüedad después de la Biblia: se tradujo enseguida al latín, llevó el monacato a Occidente y Agustín cuenta en las Confesiones que oírlo leer precipitó su conversión.',
    written: 'Hacia el 357, poco después de la muerte de Antonio.',
  },
  'maximo-caridad': {
    summary:
      'Cuatrocientas sentencias breves, en cuatro centurias, sobre el amor y las pasiones. Sostiene que las pasiones no son malas en sí sino energías buenas mal dirigidas, y que la ascesis no las mata sino que las reorienta. Al estar en sentencias sueltas, admite leerse de a poco, que es como está pensado.',
    written: 'Norte de África, hacia el 626.',
  },
  'maximo-mistagogia': {
    summary:
      'Una lectura de la Divina Liturgia entera como imagen de lo que le pasa al mundo y al alma: la iglesia como figura del cosmos, la entrada, la lectura, el beso de paz, la comunión. Es el comentario litúrgico que más ha marcado la manera oriental de entender lo que ocurre en la iglesia.',
    written: 'Hacia el 630.',
  },
  'maximo-ambigua': {
    summary:
      'Respuestas a los pasajes difíciles de Gregorio Nacianceno y del Areopagita, y de lo más difícil que se escribió en griego cristiano. Aquí desarrolla los lógoi —las razones de cada cosa creada en Dios— y las cinco divisiones que Cristo reúne. No es una obra por la que empezar.',
    written: 'Entre el 628 y el 634.',
  },
  'damasceno-iconos': {
    summary:
      'Tres discursos escritos mientras el emperador destruía las imágenes en Constantinopla y él escribía a salvo bajo el califa, fuera de su alcance. El argumento que zanjó la cuestión: antes no se podía representar a Dios porque nadie lo había visto; desde la encarnación sí, porque tiene rostro. Y la distinción entre adorar y venerar, que adoptó el Séptimo Concilio.',
    written: 'Monasterio de San Sabas, Palestina, hacia el 730.',
  },
  'damasceno-fe-ortodoxa': {
    summary:
      'Tercera parte de la Fuente del conocimiento y primera exposición sistemática de la fe cristiana: Dios, la creación, el hombre, Cristo, los sacramentos, los últimos tiempos. Fue el manual de Oriente durante mil años y, traducido al latín en el siglo XII, lo usó Tomás de Aquino.',
    written: 'Palestina, mediados del siglo VIII.',
  },
  'isaac-discursos': {
    summary:
      'Ochenta y dos discursos sobre lo que le ocurre de verdad al que reza: la sequedad, el desánimo, la tentación de medir el propio progreso, la noche. Contiene la página sobre el corazón compasivo por toda criatura y su idea discutida del infierno como el amor de Dios sentido como tormento. Es el libro más leído en los monasterios del Athos después de la Escritura.',
    written: 'Mesopotamia, siglo VII, en siríaco; traducido al griego en San Sabas hacia el siglo IX.',
  },
  'palamas-triadas': {
    summary:
      'Nueve tratados en tres grupos, escritos contra Barlaam de Calabria, que se burlaba de los monjes del Athos por su manera corporal de rezar y negaba que se pudiera ver la luz increada. Palamas defiende que el hombre reza entero, cuerpo incluido, y distingue en Dios la esencia inaccesible de las energías por las que se da. Los concilios de 1341, 1347 y 1351 le dieron la razón.',
    written: 'Monte Athos y Tesalónica, entre 1338 y 1341.',
  },
  'palamas-capitulos': {
    summary:
      'Ciento cincuenta capítulos breves que recorren la creación, el conocimiento de Dios, la Trinidad y la deificación. Es su obra más ordenada y la manera más llevadera de entrar en su pensamiento sin la polémica de las Tríadas.',
    written: 'Hacia 1349.',
  },
  'serafin-motovilov': {
    summary:
      'La conversación que Nicolás Motovílov anotó y que no se publicó hasta 1903. Serafín le explica que el fin de la vida cristiana es adquirir el Espíritu Santo, y que el ayuno y la limosna son sólo medios para eso; y cuando Motovílov pregunta cómo se sabe si se ha adquirido, el santo le hace mirar su propio rostro. Ocurre en el bosque nevado, y el relato se lee como una Transfiguración en pequeño.',
    written: 'Sarov, noviembre de 1831. Publicado en 1903.',
  },
  'kronstadt-mi-vida': {
    summary:
      'Su diario, escrito a ráfagas durante décadas y sin ordenar: anota lo que le va pasando mientras reza y celebra, incluidos el desgano, la distracción y la vergüenza de sentirse frío ante el altar. Por eso se lee como se lee a un contemporáneo, y por eso se abre por cualquier página.',
    written: 'Kronstadt, entre 1856 y 1908.',
  },
  'teofano-camino': {
    summary:
      'El itinerario del que empieza, en tres tramos: el despertar de la conciencia, la lucha por arrancar los hábitos viejos y el asentamiento en el bien. Escribe claro, sin misterio, dirigiéndose a gente que trabaja y tiene familia, no a monjes.',
    written: 'Rusia, hacia 1868.',
  },
  'teofano-cartas': {
    summary:
      'Escribió miles de cartas desde su reclusión, respondiendo a comerciantes, funcionarios, madres de familia y monjas que le preguntaban qué hacer con cosas concretas. Las colecciones publicadas son la parte más práctica de su obra, y la que mejor muestra que no separaba la vida espiritual de la vida a secas.',
    written: 'Monasterio de Vysha, entre 1866 y 1894.',
  },
  'silvano-escritos': {
    summary:
      'Cuadernos de un campesino ruso sin instrucción que pasó cuarenta y seis años de monje en el Athos, trabajando en el molino y en el almacén. Vuelven una y otra vez sobre lo mismo: la palabra que recibió —ten tu mente en el infierno y no desesperes—, el amor a los enemigos como única señal segura de haber conocido al Espíritu, y la compasión por el mundo entero. Los publicó su discípulo Sofronio en 1948.',
    written: 'Monte Athos, entre 1892 y 1938.',
  },
};
