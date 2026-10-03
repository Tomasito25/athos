/**
 * Troparios y kontakia propios del Menaion, santo a santo.
 *
 * El Menaion griego (glt.goarch.org) trae para cada día el apolytíkion y el
 * kontakion del santo principal. Aquí están, traducidos, los de los santos de
 * ATHOS que coinciden con ese santo: se ha comprobado uno a uno que el himno
 * es suyo —casi siempre lo nombra— y no de otro santo del mismo día o del
 * mismo nombre. Cuando el Menaion da para un santo el tropario general de su
 * rango, no se repite aquí: ATHOS ya lo muestra como general.
 *
 * Los santos que no están aquí —muchos occidentales, eslavos y del siglo XX—
 * no figuran en ese Menaion o tienen himnos compuestos en nuestro tiempo, con
 * derechos. Siguen con el general de su rango y, en las Horas, con el
 * kontakion del día de la semana.
 *
 * La traducción es de ATHOS y no procede de ningún libro litúrgico español
 * publicado.
 */
export interface MenaionHymn {
  tone: string;
  text: string;
}

export interface MenaionEntry {
  /** Cómo se nombra en el título: «san Silvestre». */
  nombre: string;
  tropario?: MenaionHymn;
  kontakion?: MenaionHymn;
}

const h = (tono: number, text: string): MenaionHymn => ({ tone: `Tono ${tono}`, text });

export const MENAION_HYMNS: Record<string, MenaionEntry> = {
  /* ---------------- Enero ---------------- */
  'silvestre-roma': {
    nombre: 'san Silvestre',
    kontakion: h(2, 'Llenando tu boca de la sabiduría de Dios, nos diste a conocer con claridad la Trinidad, y derribaste, Silvestre, la impiedad de los tiranos con la honda de tus palabras. Por eso suplica al Señor por nosotros.'),
  },
  'malaquias-profeta': {
    nombre: 'el profeta Malaquías',
    kontakion: h(3, 'Lleno de la sabiduría divina, que está por encima de toda sabiduría, grandísimo Malaquías, como profeta mostraste a todos desde lo alto a la misma Sabiduría de Dios, que habitaría aquí abajo entre nosotros. Por eso te honramos, celebrando con fe tu divina memoria.'),
  },
  'setenta-apostoles': {
    nombre: 'los Setenta Apóstoles',
    kontakion: h(2, 'Cantemos hoy, fieles, con espíritu divino, y celebremos al coro de los Setenta discípulos de Cristo; porque por ellos aprendimos todos a venerar a la Trinidad indivisible, pues son lámparas de la fe divina.'),
  },
  'polieucto-melitene': {
    nombre: 'san Polieucto',
    kontakion: h(4, 'El Soberano, al inclinar la cabeza en el Jordán, quebrantó las cabezas de los dragones; y la cabeza del atleta, al ser cortada, cubrió de vergüenza al engañador.'),
  },
  'gregorio-nisa': {
    nombre: 'san Gregorio de Nisa',
    kontakion: h(6, 'El divino jerarca de la Iglesia y venerable cantor de la sabiduría, Gregorio, mente vigilante de Nisa, danzando con los ángeles y gozando de la luz divina, intercede sin cesar por todos nosotros.'),
  },
  'teodosio-cenobiarca': {
    nombre: 'san Teodosio el Cenobiarca',
    kontakion: h(8, 'Plantado en los atrios de tu Señor, hiciste florecer con gracia las virtudes más luminosas, y multiplicaste en el desierto a tus hijos, regados por la lluvia de tus lágrimas, pastor de los rebaños divinos de Dios. Por eso clamamos: Alégrate, padre Teodosio.'),
  },
  'juan-calibita': {
    nombre: 'san Juan Calibita',
    tropario: h(4, 'Deseando ardientemente al Señor desde niño, dejaste el mundo y lo que en el mundo agrada, y te ejercitaste de la mejor manera: plantaste tu choza ante las puertas de tus padres y quebrantaste las asechanzas de los demonios, bienaventurado. Por eso, Juan, Cristo te ha glorificado dignamente.'),
    kontakion: h(2, 'Deseando, sabio, la pobreza a imitación de Cristo, dejaste la riqueza de tus padres; y, llevando en tus manos el Evangelio, seguiste a Cristo Dios, Juan, intercediendo sin cesar por todos nosotros.'),
  },
  'cadenas-pedro': {
    nombre: 'las cadenas de san Pedro',
    tropario: h(4, 'Sin dejar Roma, viniste a nosotros por las preciosas cadenas que llevaste, primero de los apóstoles; y venerándolas con fe te suplicamos: por tus intercesiones ante Dios, concédenos la gran misericordia.'),
    kontakion: h(6, 'Alabemos al corifeo y primero de los apóstoles, al divino intérprete de la verdad, al grandísimo Pedro, y besemos con fe su cadena, recibiendo la liberación de nuestras faltas.'),
  },
  'macario-egipcio': {
    nombre: 'san Macario el Egipcio',
    kontakion: h(4, 'En la casa de la templanza el Señor te puso en verdad como astro que no se extravía, para iluminar los confines, padre de los padres, venerable Macario.'),
  },
  'eutimio-grande': {
    nombre: 'san Eutimio el Grande',
    tropario: h(4, 'Alégrate, desierto que no dabas a luz; regocíjate, tú que no conocías los dolores del parto: porque un hombre de deseos del Espíritu te ha multiplicado los hijos, plantándolos en la piedad y criándolos en la templanza hasta la perfección de las virtudes. Por sus súplicas, oh Cristo Dios, da la paz a nuestra vida.'),
    kontakion: h(8, 'En tu venerable nacimiento la creación halló la alegría, y en tu divina memoria, venerable, ha recibido el buen ánimo de tus muchos milagros; concede de ellos con abundancia a nuestras almas, y limpia las manchas de los pecados, para que cantemos: Aleluya.'),
  },
  'maximo-confesor': {
    nombre: 'san Máximo el Confesor',
    kontakion: h(8, 'Al amante de la Trinidad, al gran Máximo, que enseñó con claridad la fe divina —glorificar a Cristo en dos naturalezas, con dos operaciones y dos voluntades—, alabémoslo dignamente, fieles, clamando: Alégrate, heraldo de la fe.'),
  },
  'anastasio-persa': {
    nombre: 'san Anastasio el Persa',
    tropario: h(1, 'Gloria de los mártires, orgullo de los monjes, tesoro de Persia, sabio Anastasio, gran protector de los fieles y heraldo de nuestra fe: con himnos de ángeles te alabamos diciendo: Gloria al que te dio la fuerza, gloria al que te coronó, gloria al que por ti obra curaciones para todos.'),
    kontakion: h(1, 'Al divino discípulo y compañero de viaje de Pablo, a Timoteo, cantémosle todos, fieles, y honremos con él al sabio Anastasio, que brilló como un astro desde Persia y ahuyenta las pasiones de nuestras almas y las enfermedades del cuerpo.'),
  },
  'timoteo-apostol': {
    nombre: 'san Timoteo',
    kontakion: h(1, 'Al divino discípulo y compañero de viaje de Pablo, a Timoteo, cantémosle todos, fieles, y honremos con él al sabio Anastasio, que brilló como un astro desde Persia y ahuyenta las pasiones de nuestras almas y las enfermedades del cuerpo.'),
  },
  'clemente-ancira': {
    nombre: 'san Clemente de Ancira',
    tropario: h(4, 'Sarmiento de santidad y tallo del martirio, flor sacratísima y fruto dado por Dios, brotaste dulcísimo para los fieles, santísimo; como compañero de combate de los mártires y compañero de trono de los jerarcas, intercede ante Cristo Dios por la salvación de nuestras almas.'),
    kontakion: h(4, 'Te hiciste sarmiento precioso de la vid, que es Cristo, gloriosísimo Clemente, y, mostrándote atleta de muchos combates, clamabas con tus compañeros: Cristo, alegría radiante de los mártires.'),
  },
  'xenofonte-familia': {
    nombre: 'san Xenofonte y su familia',
    kontakion: h(4, 'Escapados del mar de esta vida, el justo Xenofonte, con su venerable esposa, se alegra en los cielos con sus hijos, engrandeciendo a Cristo.'),
  },
  'juan-crisostomo-reliquias': {
    nombre: 'el traslado de las reliquias de san Juan Crisóstomo',
    tropario: h(8, 'La gracia de tu boca, que resplandeció como una antorcha, iluminó el orbe; depositó en el mundo tesoros de desprendimiento y nos mostró la altura de la humildad. Tú que nos educas con tus palabras, padre Juan Crisóstomo, intercede ante el Verbo, Cristo Dios, para que salve nuestras almas.'),
    kontakion: h(1, 'La venerable Iglesia se ha alegrado místicamente con el traslado de tus venerables reliquias; y, guardándolas escondidas como oro de gran precio, concede sin cesar a los que te cantan, por tus intercesiones, la gracia de las curaciones, Juan Crisóstomo.'),
  },
  'efren-sirio-santo': {
    nombre: 'san Efrén el Sirio',
    kontakion: h(2, 'Previendo siempre la hora del juicio, llorabas amargamente, Efrén, amante de la quietud; y te hiciste maestro práctico en las obras, venerable. Por eso, padre de todo el mundo, despiertas a los perezosos al arrepentimiento.'),
  },
  'ignacio-antioquia': {
    nombre: 'san Ignacio de Antioquía',
    kontakion: h(4, 'Elevándose hoy desde el Oriente e iluminando con sus enseñanzas toda la creación, se ha adornado con el martirio el divino Ignacio, portador de Dios.'),
  },
  'ciro-juan': {
    nombre: 'los santos Ciro y Juan',
    kontakion: h(3, 'Habiendo recibido de la gracia divina el don de los milagros, santos, obráis milagros sin cesar, cortando todas nuestras pasiones con cirugía invisible, Ciro de mente divina, con el divino Juan; porque sois médicos divinos.'),
  },

  /* ---------------- Febrero ---------------- */
  'trifon-martir': {
    nombre: 'san Trifón',
    kontakion: h(8, 'Con la firmeza de la Trinidad deshiciste el politeísmo hasta los confines de la tierra, digno de alabanza, hecho precioso en el Señor; y, vencidos los tiranos en Cristo Salvador, recibiste la corona de tu martirio y los dones de las curaciones divinas, como invencible.'),
  },
  'fotio-constantinopla': {
    nombre: 'san Focio el Grande',
    tropario: h(4, 'Semejante en tu vida a los apóstoles y maestro del mundo entero, Focio, suplica al Soberano de todas las cosas que conceda la paz al mundo y a nuestras almas la gran misericordia.'),
  },
  'lucas-estirio': {
    nombre: 'san Lucas de Estirio',
    tropario: h(1, 'A la gloria de Grecia y orgullo de los monjes, a la lumbrera y santo habitante de Estirio, a Lucas portador de Dios, honrémoslo piadosamente con himnos y cantos; porque siempre hace de Cristo a los que clamamos con fe: Gloria al que te dio la fuerza, gloria al que te coronó, gloria al que por ti obra curaciones para todos.'),
    kontakion: h(8, 'Dios, que te eligió antes de formarte para que le agradaras, según los juicios que Él conoce, te tomó desde el seno materno y te santificó, y te mostró siervo suyo, enderezando tus pasos, Lucas, Él, el amigo de los hombres, ante quien ahora estás con alegría.'),
  },
  'teodoro-estratelates': {
    nombre: 'san Teodoro Estratelates',
    tropario: h(4, 'Por tu verdadera milicia, atleta, te hiciste hermosísimo general del Rey celestial, Teodoro; porque con las armas de la fe te pusiste en orden de batalla con prudencia y exterminaste las huestes de los demonios, y te mostraste atleta victorioso. Por eso te llamamos siempre bienaventurado con fe.'),
    kontakion: h(2, 'Armado de la fe con valentía de alma, y empuñando la palabra de Dios como una lanza, heriste al enemigo, Teodoro, gloria de los mártires; con ellos no dejes de interceder ante Cristo Dios por todos nosotros.'),
  },
  'niceforo-antioquia': {
    nombre: 'san Nicéforo',
    kontakion: h(3, 'Con las alas del amor del Señor, digno de alabanza, y llevando sobre los hombros su Cruz, glorioso, cubriste de vergüenza las asechanzas del diablo y combatiste hasta la muerte por la verdad. Por eso te mostraste soldado e iniciado en la gracia de Dios.'),
  },
  haralambos: {
    nombre: 'san Haralampo',
    tropario: h(4, 'Te mostraste columna inconmovible de la Iglesia de Cristo y lámpara siempre encendida del mundo, sabio Haralampo; brillaste en el mundo por el martirio y disipaste, bienaventurado, la oscuridad de los ídolos. Por eso, con confianza, intercede ante Cristo por nuestra salvación.'),
    kontakion: h(4, 'La Iglesia posee como tesoro preciosísimo tu cabeza, atleta y hieromártir, victorioso Haralampo; por eso se alegra glorificando al Creador.'),
  },
  'blas-sebaste': {
    nombre: 'san Blas',
    kontakion: h(2, 'Brote divino, flor que no se marchita, sarmiento fecundo de la vid, que es Cristo, Blas portador de Dios: llena de tu alegría a los que celebran con fe tu memoria, intercediendo sin cesar por todos nosotros.'),
  },
  'meletio-antioquia': {
    nombre: 'san Meletio de Antioquía',
    kontakion: h(2, 'Adornado con la vida de la ortodoxia, te mostraste, bienaventurado Meletio, protector y defensor de la Iglesia, iluminando los confines con tus enseñanzas, lámpara resplandeciente de la Iglesia.'),
  },
  'martiniano-ermitano': {
    nombre: 'san Martiniano',
    tropario: h(4, 'Apagaste con los torrentes de tus lágrimas la llama de las tentaciones, bienaventurado, y, frenando las olas del mar y los asaltos de las fieras, clamabas: Glorificado eres, Todopoderoso, que me salvaste del fuego y de la tempestad.'),
    kontakion: h(2, 'Como asceta probado de la piedad, atleta honrado por su decisión, habitante y testigo constante del desierto, alabemos dignamente con himnos a Martiniano, siempre venerable; porque él pisoteó a la serpiente.'),
  },
  onesimo: {
    nombre: 'san Onésimo',
    kontakion: h(4, 'Brillaste en el mundo como un rayo, bienaventurado, iluminado por los destellos del sol resplandeciente, Pablo, que iluminó el mundo; por eso todos te honramos, Onésimo.'),
  },
  'panfilo-cesarea': {
    nombre: 'san Pánfilo',
    kontakion: h(2, 'Amando la voluntad divina de Cristo, te mostraste médico de los fieles, amigo de Cristo, Pánfilo de alma generosa; por eso llamamos bienaventurada tu venerable fiesta. No dejes de interceder por todos nosotros.'),
  },
  'teodoro-tiron': {
    nombre: 'san Teodoro Tirón',
    tropario: h(2, '¡Grandes son las hazañas de la fe! En la fuente de la llama, como junto a un agua de reposo, se alegraba el santo mártir Teodoro; porque, consumido por el fuego como un holocausto, fue ofrecido a la Trinidad como pan sabroso. Por sus súplicas, oh Cristo Dios, ten piedad de nosotros.'),
    kontakion: h(8, 'Tomando dentro de tu corazón la fe de Cristo como coraza, pisoteaste las potencias enemigas, atleta de muchos combates, y fuiste coronado para siempre con la corona celestial, como invencible.'),
  },
  'leon-magno': {
    nombre: 'san León Magno',
    kontakion: h(3, 'Sentado, glorioso, en el trono del sacerdocio, y cerrando las bocas de los leones espirituales con las enseñanzas inspiradas por Dios sobre la venerable Trinidad, hiciste brillar para tu rebaño la luz del conocimiento de Dios. Por eso fuiste glorificado, como divino iniciado en la gracia de Dios.'),
  },
  'arquipo-filemon': {
    nombre: 'san Arquipo',
    kontakion: h(4, 'La Iglesia, que te tiene como gran astro, Arquipo, iluminada por los destellos de tus milagros, te clama: Salva a los que honran con fe tu memoria.'),
  },
  'leon-catania': {
    nombre: 'san León de Catania',
    kontakion: h(6, 'Al consagrado al Señor desde niño, al que recibió la gracia desde los pañales, coronémoslo todos con cantos, a León, lumbrera y defensor de la Iglesia; porque él es su sostén.'),
  },
  'policarpo-esmirna': {
    nombre: 'san Policarpo de Esmirna',
    kontakion: h(1, 'Ofreciendo al Señor frutos espirituales, sabio Policarpo, te mostraste digno de Dios por tus virtudes divinas, jerarca bienaventurado; por eso hoy nosotros, iluminados por tus palabras, cantamos tu memoria digna de alabanza, glorificando al Señor.'),
  },
  'cabeza-bautista': {
    nombre: 'el hallazgo de la cabeza del Precursor',
    tropario: h(4, 'Elevándose de la tierra, la cabeza del Precursor envía a los fieles rayos de incorrupción, de curaciones; reúne arriba a la multitud de los ángeles y convoca abajo al linaje de los hombres para que a una voz den gloria a Cristo Dios.'),
    kontakion: h(2, 'Profeta de Dios y Precursor de la gracia: hallamos en la tierra tu cabeza como una rosa santísima, y recibimos siempre curaciones; porque de nuevo, como antes, predicas en el mundo el arrepentimiento.'),
  },
  tarasio: {
    nombre: 'san Tarasio',
    kontakion: h(4, 'Como un gran sol, con los resplandores de tus enseñanzas y de tus milagros iluminas siempre la plenitud del mundo, iniciado en los misterios del cielo, bienaventurado Tarasio.'),
  },
  'porfirio-gaza': {
    nombre: 'san Porfirio de Gaza',
    kontakion: h(2, 'Adornado con una vida santísima, resplandeciste con las vestiduras del sacerdocio, bienaventurado Porfirio de mente divina, y brillas en la cumbre de las curaciones, intercediendo sin cesar por todos nosotros.'),
  },
  'basilio-confesor': {
    nombre: 'san Basilio el Confesor',
    kontakion: h(2, 'Recibiendo de lo alto la revelación divina, saliste, sabio, de en medio de los alborotos; y, haciéndote monje santamente, recibiste el poder de los milagros y de curar las enfermedades por la gracia, Basilio, bienaventurado y sacratísimo.'),
  },

  /* ---------------- Marzo ---------------- */
  'cuarenta-dos-amorion': {
    nombre: 'los cuarenta y dos mártires de Amorion',
    kontakion: h(2, 'A los nuevos soldados de la fe, que combatieron con presteza por Cristo, coronémoslos todos dignamente con coronas de alabanzas, porque interceden por nosotros ante Cristo, como torres y guardianes del imperio de los romanos.'),
  },
  'teofilacto-nicomedia': {
    nombre: 'san Teofilacto de Nicomedia',
    tropario: h(6, 'Viviste escondido, digno de toda alabanza; pero Cristo te mostró a todos como lumbrera que habla, poniéndote sobre el candelero espiritual, y puso en tus manos las tablas de las enseñanzas del Espíritu: ilumínanos con ellas.'),
  },
  'cuarenta-sebaste': {
    nombre: 'los cuarenta mártires de Sebaste',
    kontakion: h(6, 'Dejando todo el ejército del mundo, os unisteis al Soberano que está en los cielos, cuarenta atletas del Señor; porque, habiendo pasado por el fuego y por el agua, bienaventurados, recibisteis dignamente la gloria de los cielos y una multitud de coronas.'),
  },
  'teofano-cronista': {
    nombre: 'san Teófanes el Confesor',
    kontakion: h(2, 'Recibiendo de lo alto la revelación divina, saliste con prontitud de en medio de los alborotos; y, haciéndote monje, venerable, recibiste el poder de los milagros y los dones de la profecía, privándote de esposa y de riquezas.'),
  },
  'alexis-hombre-dios': {
    nombre: 'san Alejo, el hombre de Dios',
    tropario: h(2, 'Brotaste de una raíz ilustre y famosa, floreciste en una ciudad imperial y espléndida, sapientísimo Alejo; y, despreciando todas las cosas como corruptibles y pasajeras, te apresuraste a unirte a Cristo, el Soberano. Suplícale siempre por nuestras almas.'),
    kontakion: h(4, 'Celebrando hoy piadosamente la venerabilísima fiesta del felicísimo Alejo, cantémosle diciendo: Alégrate, gozoso adorno de los monjes.'),
  },
  'juan-escala-marzo': {
    nombre: 'san Juan Clímaco',
    kontakion: h(1, 'Ofreciendo los frutos siempre verdes de tu libro, sabio, endulzas con tus enseñanzas los corazones de los que las atienden con vigilancia, bienaventurado; porque es una escala que eleva las almas desde la tierra a la gloria celestial y perdurable de los que te honran con fe.'),
  },

  /* ---------------- Abril ---------------- */
  'maria-egipcia': {
    nombre: 'santa María Egipcíaca',
    kontakion: h(3, 'La que antes estaba llena de toda clase de fornicaciones se muestra hoy esposa de Cristo por el arrepentimiento; deseando la vida de los ángeles, pisotea a los demonios con el arma de la Cruz. Por eso te mostraste esposa del Reino, María gloriosa.'),
  },
  'antipas-pergamo': {
    nombre: 'san Antipas de Pérgamo',
    tropario: h(1, 'Al divino que mana mirra, compañero de combate de los mártires, al gloriosísimo jerarca y obispo de Pérgamo, a Antipas, honrémoslo, fieles, como médico grande y rapidísimo de la terrible enfermedad de los dientes, y clamémosle con toda el alma: Gloria a Cristo, que te glorificó; gloria al que te coronó; gloria al que por ti obra curaciones para todos.'),
    kontakion: h(8, 'Al jerarca y glorioso gran mártir, al excelentísimo protector de la ciudad de Pérgamo, a Antipas, adversario del enemigo común, alabémoslo como es debido con cantos, porque cura a los que sufren de los dientes, clamándole con amor: Alégrate, padre tres veces bienaventurado.'),
  },
  'teodoro-siceota': {
    nombre: 'san Teodoro el Siceota',
    kontakion: h(3, 'Subiendo a las virtudes como a un carro de fuego, portador de Dios, corriste a las moradas celestiales; ángel que convivías con los hombres, hombre que danzas con los ángeles: por eso te mostraste divino recipiente de milagros, Teodoro.'),
  },
  'marcos-evangelista': {
    nombre: 'san Marcos Evangelista',
    kontakion: h(2, 'Recibiendo de lo alto la gracia del Espíritu, deshiciste los enredos de los oradores, apóstol, y, tras pescar a todas las naciones, glorioso Marcos, las condujiste al Soberano, predicando el divino Evangelio.'),
  },
  'juan-atalla': {
    nombre: 'san Simeón, pariente del Señor',
    tropario: h(1, 'Pariente de Cristo, jerarca Simeón y mártir firme, te alabamos santamente, porque destruiste el error y guardaste la fe; por eso hoy, celebrando tu santísima memoria, recibimos por tus oraciones la liberación de los pecados.'),
    kontakion: h(2, 'Hecho ciudadano de la Sión de lo alto, recibiste el trono de la Sión de aquí abajo, y, después de guiar bien al rebaño hacia el redil celestial, fuiste crucificado por Cristo, Simeón, imitando su pasión divina.'),
  },
  'jason-sosipatro': {
    nombre: 'los santos Jasón y Sosípatro',
    kontakion: h(2, 'Iluminados por las enseñanzas de Pablo, os hicisteis lumbreras del mundo, tres veces bienaventurados, porque lo iluminais siempre con vuestros milagros: Jasón, fuente de las curaciones, y Sosípatro, gloria de los mártires de Cristo, apóstoles portadores de Dios, protectores de los que están en necesidad, suplicad a Dios por la salvación de nuestras almas.'),
  },
  'santiago-zebedeo': {
    nombre: 'Santiago el Apóstol',
    kontakion: h(2, 'Al oír la voz divina que te llamaba, dejaste a un lado el amor de tu padre y corriste a Cristo, Santiago, con tu hermano, glorioso; con él fuiste hecho digno de ver la divina Transfiguración del Señor.'),
  },

  /* ---------------- Mayo ---------------- */
  'atanasio-mayo': {
    nombre: 'san Atanasio el Grande',
    tropario: h(3, 'Fuiste columna de la ortodoxia, sosteniendo a la Iglesia con enseñanzas divinas, jerarca Atanasio; porque, proclamando al Hijo consustancial al Padre, cubriste de vergüenza a Arrio. Padre venerable, suplica a Cristo Dios que nos conceda la gran misericordia.'),
    kontakion: h(2, 'Plantando las enseñanzas de la ortodoxia, cortaste las espinas de la falsa doctrina, y multiplicaste la semilla de la fe con la lluvia del Espíritu, venerable; por eso alabamos tu memoria.'),
  },
  'irene-tesalonica': {
    nombre: 'santa Irene',
    tropario: h(1, 'Cristo, que es la paz, te llamó Irene; porque tú concedes la paz a los que celebran tu memoria y acuden con himnos y cantos espirituales a tu divino templo, e intercedes por todos, de pie ante la Divinidad de tres soles. Celebremos, pues, todos con alegría su memoria, engrandeciendo a Cristo, que la glorificó a su vez.'),
    kontakion: h(4, 'Cantemos todos a la hermosa virgen, esposa de Cristo, que resucitó de entre los muertos, a la que Dios glorificó con señales temibles; porque atrajo a la fe a una multitud incontable de impíos, y recibió de Dios el nombre de cristiana: el ángel de Dios vino y a Penélope la llamó Irene.'),
  },
  'job-paciente': {
    nombre: 'el justo Job',
    kontakion: h(8, 'Te mostraste verdadero y justo, temeroso de Dios e irreprochable, y santificado, gloriosísimo, siervo auténtico de Dios, y enseñaste al mundo con tu paciencia, Job, atleta de muchos combates; por eso todos, honrándote, cantamos tu memoria.'),
  },
  'aparicion-cruz': {
    nombre: 'la Aparición de la Cruz',
    tropario: h(1, 'La figura de tu Cruz resplandece ahora más que el sol, la que extendiste desde el monte santo hasta el lugar del Calvario, y en ella mostraste claramente tu fuerza, Salvador; fortalece por ella también a los que nos gobiernan, y guárdalos siempre en paz, por las intercesiones de la Theotokos, oh Cristo Dios, y sálvanos.'),
    kontakion: h(8, 'Oh Cruz tres veces bienaventurada y venerabilísima: cantándote y venerándote soy ahora santificado; en ti Cristo, elevado, salvó al mundo. Adelántate tú y sálvame con tu poder, y líbrame de toda clase de peligros, para que te clame: Alégrate, leño bienaventurado.'),
  },
  'profeta-isaias': {
    nombre: 'el profeta Isaías',
    kontakion: h(6, 'Habiendo recibido el don de la profecía, profeta y mártir Isaías, heraldo de Dios, anunciaste claramente a todos los que viven bajo el sol la encarnación de Dios, clamando con gran voz: He aquí que la Virgen concebirá.'),
  },
  cristobal: {
    nombre: 'san Cristóbal',
    tropario: h(4, 'Adornado con vestiduras de sangre, estás ante el Señor, Rey de los cielos, glorioso Cristóbal; por eso, con los coros de los incorpóreos y de los mártires, cantas la melodía tres veces santa y temible. Salva, pues, a tus siervos con tus súplicas.'),
  },
  'simon-zelote': {
    nombre: 'san Simón el Zelote',
    kontakion: h(2, 'Al que puso con firmeza las enseñanzas de la sabiduría en las almas de los piadosos, alabémoslo todos y llamémoslo bienaventurado, a Simón, que hablaba de Dios; porque ahora está ante el trono de la gloria y se alegra con los incorpóreos, intercediendo sin cesar por todos nosotros.'),
  },
  'epifanio-chipre': {
    nombre: 'san Epifanio y san Germán',
    tropario: h(1, 'A la pareja de trompetas de la divina Iglesia, al sabio jerarca Germán y al glorioso Epifanio, honrémoslos con prontitud, fieles: a aquél, porque con ánimo firme refutó por la imagen de Cristo a León, enemigo de Dios; a éste, el santo Epifanio, como látigo terrible de las herejías. Porque ellos interceden siempre con fervor por nosotros.'),
    kontakion: h(4, 'Alabemos como es debido, fieles, a la admirable pareja de jerarcas, al divino Epifanio con Germán; porque ellos abrasaron las lenguas de los impíos, dejando enseñanzas sapientísimas a todos los que cantan siempre con recta fe el gran misterio de la piedad.'),
  },
  'german-constantinopla': {
    nombre: 'san Germán y san Epifanio',
    tropario: h(1, 'A la pareja de trompetas de la divina Iglesia, al sabio jerarca Germán y al glorioso Epifanio, honrémoslos con prontitud, fieles: a aquél, porque con ánimo firme refutó por la imagen de Cristo a León, enemigo de Dios; a éste, el santo Epifanio, como látigo terrible de las herejías. Porque ellos interceden siempre con fervor por nosotros.'),
    kontakion: h(4, 'Alabemos como es debido, fieles, a la admirable pareja de jerarcas, al divino Epifanio con Germán; porque ellos abrasaron las lenguas de los impíos, dejando enseñanzas sapientísimas a todos los que cantan siempre con recta fe el gran misterio de la piedad.'),
  },
  'glicera-martir': {
    nombre: 'santa Glicera',
    tropario: h(5, 'Venid, todos los amantes de las fiestas, reunámonos ahora en el templo de Glicera, la hermosa mártir, y celebremos su memoria anual; porque, arrancada cruelmente la piel de su cabeza, ahogó a Belial, y, estando junto a Cristo, intercede siempre ante Él por nosotros.'),
  },
  'isidoro-quios': {
    nombre: 'san Isidoro de Quíos',
    tropario: h(4, 'Te mostraste, santo, grandísimo piloto para el mundo con tus oraciones a Dios; por eso te cantamos hoy, mártir de mente divina, glorioso Isidoro.'),
  },
  'pacomio-grande': {
    nombre: 'san Pacomio el Grande',
    tropario: h(5, 'Te mostraste guía de rebaños del Pastor supremo, padre Pacomio, conduciendo los rebaños de los monjes al redil celestial; de allí aprendiste el hábito propio de los ascetas y en él los iniciaste; y ahora te alegras con ellos y danzas en las moradas celestiales.'),
    kontakion: h(2, 'Te mostraste lumbrera resplandeciente hasta los confines, y poblaste el desierto con multitudes; te crucificaste a ti mismo, llevando tu cruz sobre los hombros, y consumiste el cuerpo con la ascesis, intercediendo sin cesar por todos nosotros.'),
  },
  'teodoro-santificado': {
    nombre: 'san Teodoro el Santificado',
    kontakion: h(2, 'En la casa de Dios floreciste como una palmera, y le ofreciste los frutos de las virtudes por la mejor ascesis, padre Teodoro; por eso eres ahora bienaventurado, igual a los incorpóreos.'),
  },
  'patricio-prusa': {
    nombre: 'san Patricio de Prusa',
    kontakion: h(8, 'Como sagrado tesoro de Jesús, Patricio, la Iglesia, que recibió tu cuerpo, te clama con júbilo: Por ti todo el mundo se guarda en paz profunda, intacto e invencible ante toda herejía.'),
  },
  'talaleo-martir': {
    nombre: 'san Talaleo',
    kontakion: h(3, 'Mostrado compañero de combate de los mártires y soldado, excelente guerrero del Rey de la gloria, por los tormentos y los castigos pisoteaste la soberbia de los idólatras; por eso cantamos tu venerable memoria, sabio Talaleo.'),
  },
  'miguel-sinada': {
    nombre: 'san Miguel de Sinada',
    kontakion: h(4, 'Como un gran sol que se levanta, iluminas a todos con la luz de tus virtudes y con los resplandores de tus milagros, taumaturgo que llevas el nombre de los ángeles.'),
  },
  'simeon-monte-admirable': {
    nombre: 'san Simeón del Monte Admirable',
    kontakion: h(2, 'Deseando las cosas de arriba y dejando las de abajo, y construyendo la columna como otro cielo, resplandeciste desde ella con el brillo de los milagros, venerable, e intercedes sin cesar ante Cristo, Dios de todos, por todos nosotros.'),
  },
  'tercer-hallazgo-cabeza': {
    nombre: 'el tercer hallazgo de la cabeza del Precursor',
    tropario: h(4, 'Como tesoro divino escondido en la tierra, Cristo nos reveló tu cabeza, profeta y Precursor; reunidos todos en este hallazgo, cantamos con cantos divinos al Salvador, que por tus súplicas nos salva de la corrupción.'),
    kontakion: h(6, 'La columna luminosa y divina en el mundo, la lámpara Precursora del Sol espiritual, mostrando en los confines su cabeza portadora de luz y divina, santifica a los que la veneran con fe y claman: Sabio Bautista de Cristo, sálvanos a todos.'),
  },
  'teodosia-constantinopla': {
    nombre: 'santa Teodosia de Constantinopla',
    kontakion: h(2, 'Por tus trabajos recibiste en herencia la vida sin fatigas, y con tu sangre ahogaste a León, el enemigo profano de la Iglesia de Cristo, gloriosísima; alegrándote ahora con Él, suplica sin cesar por todos nosotros.'),
  },

  /* ---------------- Junio ---------------- */
  'nicéforo-confesor': {
    nombre: 'san Nicéforo el Confesor',
    kontakion: h(4, 'Habiendo recibido hoy de Dios, desde el cielo, la corona de la victoria, oh Nicéforo, salva a los que te honran con fe, como jerarca y a la vez maestro.'),
  },
  metrofanes: {
    nombre: 'san Metrófanes',
    tropario: h(5, 'Predicando el gran misterio de la Trinidad, diste a conocer claramente a todos la economía de Cristo; como pastor del rebaño espiritual, ahuyentaste a los lobos espirituales y salvaste de su peste destructora a las ovejas, que clamaban: Gloria al que te dio la fuerza, gloria al que te exaltó, gloria al que por ti afianza la fe ortodoxa.'),
    kontakion: h(4, 'Al jerarca de Cristo Metrófanes, lámpara luminosa de la Iglesia, que proclamó al Verbo consustancial al Padre en medio de los Padres portadores de Dios, que adornó el primero el trono de la ciudad imperial y recibió claramente de Dios la gracia de la profecía, cantémosle a una voz.'),
  },
  'doroteo-tiro': {
    nombre: 'san Doroteo de Tiro',
    kontakion: h(3, 'Habiendo predicado las enseñanzas ortodoxas, hieromártir, te ofreciste al Creador como don divino y santo: primero brillaste en la ascesis, después combatiste con firmeza en el martirio, y recibiste legítimamente de Cristo Dios el premio de la victoria.'),
  },
  'teodoro-estratelates-tr': {
    nombre: 'san Teodoro Estratelates',
    tropario: h(4, 'Por tu verdadera milicia, atleta, te hiciste hermosísimo general del Rey celestial, Teodoro; porque con las armas de la fe te pusiste en orden de batalla con prudencia y exterminaste las huestes de los demonios, y te mostraste atleta victorioso. Por eso te llamamos siempre bienaventurado con fe.'),
    kontakion: h(2, 'Revestido de la fe como coraza con valentía de alma, y empuñando la palabra de Dios como una lanza, heriste al enemigo, Teodoro, el más grande de los mártires; con ellos intercede sin cesar ante Cristo Dios por todos nosotros.'),
  },
  'ciril-alejandria': {
    nombre: 'san Cirilo de Alejandría',
    tropario: h(1, 'A la lumbrera del mundo y príncipe de los oradores, al luchador y defensor de María siempre Virgen, que con enseñanzas de fuego abrasó en verdad las palabras impías y anticristianas de la terrible herejía del profano Nestorio, cantémosle ahora con toda piedad, diciendo: Divino Cirilo, intercede para que Cristo afiance la fe ortodoxa.'),
    kontakion: h(6, 'Hiciste manar claramente para nosotros, de las fuentes del Salvador, un abismo de enseñanzas de teología, bienaventurado, que anega las herejías y guarda indemne al rebaño de las tempestades; porque eres maestro de los confines, venerable, que haces claras las cosas divinas.'),
  },
  'bartolome-apostol': {
    nombre: 'san Bartolomé',
    kontakion: h(4, 'Te mostraste gran sol para la Iglesia, iluminando con los resplandores de tus enseñanzas y de tus temibles milagros a los que te honran, Bartolomé, apóstol del Señor.'),
  },
  'onofre-grande': {
    nombre: 'san Onofre el Grande',
    kontakion: h(8, 'Recibiendo dentro de tu corazón la luz espiritual y celestial, te mostraste recipiente de la Trinidad purísima, Onofre, y ahora estás contado entre los ángeles, clamando: Aleluya.'),
  },
  'aquilina-biblos': {
    nombre: 'santa Aquilina',
    kontakion: h(3, 'A ti, virgen, purificada por la aspersión de tu sangre y coronada, Aquilina, con las coronas de los mártires, tu Esposo, Cristo, que hace brotar la vida eterna, te ha dado para que concedas la curación y la salvación a los que en la necesidad de las enfermedades acuden a ti con fe.'),
  },
  'profeta-eliseo': {
    nombre: 'el profeta Eliseo',
    kontakion: h(8, 'Habiendo recibido del Espíritu doble gracia, te mostraste profeta admirable en todos los confines, librando de los peligros a los que te cantan y concediendo la gracia de tus milagros a los que acuden a ella con fe y te claman: Alégrate, profeta divino.'),
  },
  'leoncio-tripoli': {
    nombre: 'san Leoncio',
    kontakion: h(3, 'Refutaste los malvados designios de los tiranos y cubriste de vergüenza el error impiísimo de los paganos; alegraste a los coros de los ángeles, y das a los fieles la curación de las enfermedades. Por eso honramos con amor tu memoria, sabio Leoncio.'),
  },
  'apostol-judas': {
    nombre: 'san Judas Apóstol',
    kontakion: h(1, 'Sarmiento dado por Dios, brotaste para nosotros de una raíz gloriosa, testigo ocular del Señor, apóstol hermano de Dios, sapientísimo heraldo de Cristo, alimentando a todo el mundo con los frutos de tus palabras y enseñando la fe ortodoxa del Señor, como iniciado en la gracia.'),
  },
  'natividad-bautista': {
    nombre: 'la Natividad del Precursor',
    tropario: h(4, 'Profeta y Precursor de la venida de Cristo, no somos capaces de alabarte dignamente los que te honramos con amor; porque con tu glorioso y venerable nacimiento quedaron deshechas la esterilidad de la que te dio a luz y la mudez de tu padre, y se anuncia al mundo la encarnación del Hijo de Dios.'),
    kontakion: h(3, 'La que antes era estéril da hoy a luz al Precursor de Cristo, que es la plenitud de toda profecía; porque aquel a quien anunciaron de antemano los profetas, a ése le impuso las manos en el Jordán, y se mostró profeta, heraldo y a la vez Precursor del Verbo de Dios.'),
  },
  'sampson-hospedador': {
    nombre: 'san Sansón el Hospedador',
    tropario: h(8, 'Por tu paciencia alcanzaste tu recompensa, padre venerable, perseverando sin cesar en las oraciones, amando a los pobres y socorriéndolos. Intercede ante Cristo Dios, Sansón de mente divina, bienaventurado, por la salvación de nuestras almas.'),
    kontakion: h(8, 'Como a médico excelentísimo y servidor agradable a Dios, nosotros, que acudimos a tu divino sepulcro, Sansón de mente divina, venerable, reunidos te cantamos con himnos y salmos, glorificando a Cristo, que te concede tal gracia de curaciones.'),
  },

  /* ---------------- Julio ---------------- */
  'manto-theotokos': {
    nombre: 'la Deposición del manto de la Theotokos',
    tropario: h(8, 'Theotokos siempre virgen, protección de los hombres, diste a tu ciudad como vestidura poderosa el vestido y el cinturón de tu cuerpo purísimo, que por tu parto sin semilla permanecieron incorruptos; porque en ti se renuevan la naturaleza y el tiempo. Por eso te suplicamos que concedas la paz al mundo y a nuestras almas la gran misericordia.'),
    kontakion: h(4, 'Diste a todos los fieles un vestido de incorrupción, oh Pura llena de la gracia de Dios: tu sagrado vestido, con el que cubriste tu santo cuerpo, protección divina de los hombres. Celebramos con amor su deposición y te clamamos con fe: Alégrate, Virgen, gloria de los cristianos.'),
  },
  'jacinto-cesarea': {
    nombre: 'san Jacinto',
    kontakion: h(4, 'Tejamos hoy todos, fieles, para Jacinto una corona de jacintos que no se marchitan, clamando a gran voz: Alégrate, Jacinto, gloria de los mártires.'),
  },
  'andres-creta': {
    nombre: 'san Andrés de Creta',
    kontakion: h(2, 'Tocando con fuerza la trompeta de las melodías divinas, te mostraste lumbrera resplandeciente para el mundo, brillando con la luz de la Trinidad, venerable Andrés; por eso todos te clamamos: No dejes de interceder por nuestra salvación.'),
  },
  'atanasio-athonita': {
    nombre: 'san Atanasio el Athonita',
    tropario: h(3, 'Las órdenes de los ángeles quedaron asombradas de tu vida en la carne: cómo, con el cuerpo, pudiste afrontar combates invisibles, gloriosísimo, e hiriste a las falanges de los demonios. Por eso, Atanasio, Cristo te recompensó con ricos dones. Intercede, padre, ante Cristo Dios por la salvación de nuestras almas.'),
    kontakion: h(8, 'Como contemplador excelente de las realidades inmateriales y guía práctico verdaderísimo, te alabamos nosotros, tu rebaño, y clamamos: No dejes de suplicar al Señor que libre de tentaciones y peligros a los que te claman: Alégrate, padre Atanasio.'),
  },
  'kyriaki-martir': {
    nombre: 'santa Kyriakí',
    tropario: h(5, 'Te mostraste ofrenda hermosa y sacrificio santo, ofreciendo al Creador tu alma pura, que Cristo glorificó, oh mujer de alma fuerte; por eso, por ti, hace brotar para los fieles que te honran gracias más numerosas que la arena, Kyriakí, atleta, porque es misericordioso y amigo de los hombres.'),
    kontakion: h(2, 'La mártir de Cristo nos ha convocado para cantar ahora con alabanzas sus combates y luchas divinas; porque ella se mostró digna de su nombre, valiente de espíritu, señora de la mente y de las pasiones indecorosas.'),
  },
  'procopio-cesarea': {
    nombre: 'san Procopio',
    tropario: h(5, 'Cazado desde el cielo para la piedad, seguiste con alegría a Cristo, como Pablo, Procopio, mártir, belleza de los mártires; y así, venciendo gloriosamente por el poder de la Cruz, cubriste de vergüenza a Belial. Guarda de su maldad a los que te honran con amor.'),
    kontakion: h(2, 'Abrasado por el celo divino de Cristo y guardado por la preciosa Cruz, abatiste la insolencia y la audacia de los enemigos, Procopio, y exaltaste a la venerable Iglesia, progresando en la fe e iluminándonos.'),
  },
  'eufemia-calcedonia': {
    nombre: 'santa Eufemia',
    tropario: h(3, 'Alegraste mucho a los ortodoxos y cubriste de vergüenza a los heterodoxos, Eufemia, hermosa virgen de Cristo; porque confirmaste lo que los Padres del cuarto Concilio definieron rectamente. Mártir gloriosa, suplica a Cristo Dios que nos conceda la gran misericordia.'),
    kontakion: h(2, 'Sostuviste con fervor combates en el martirio y combates en la fe por Cristo, tu Esposo; también ahora intercede, por medio de la Theotokos, para que las herejías y la insolencia de los enemigos queden sometidas bajo los pies de los que nos gobiernan, tú, gloriosísima, que recibiste y guardas la definición de los seiscientos treinta Padres portadores de Dios.'),
  },
  'apostol-aquila': {
    nombre: 'san Aquila',
    kontakion: h(4, 'Hecho compañero de trono y de camino de los apóstoles, apóstol, iluminaste el mundo con tus enseñanzas y milagros, recibiendo, Aquila, la corona de la gloria.'),
  },
  'marina-antioquia': {
    nombre: 'santa Marina',
    kontakion: h(3, 'Adornada con las bellezas de la virginidad, virgen, coronada con las marcas del martirio, Marina, rociada con sangre de atleta e iluminada con los milagros de las curaciones, recibiste piadosamente, mártir, el premio de la victoria de tu combate.'),
  },
  'simeon-loco': {
    nombre: 'san Simeón y san Juan',
    kontakion: h(1, 'Habiendo acabado piadosamente la vida con fe y mostrados recipientes puros de la Trinidad, Simeón y Juan, portadores de Dios, gloriosísimos, pedid ahora que se envíe con abundancia a nuestras almas la propiciación y la paz, padres bienaventurados.'),
  },
  'maria-magdalena': {
    nombre: 'santa María Magdalena',
    tropario: h(1, 'A Cristo, que por nosotros nació de la Virgen, lo seguías, venerable María Magdalena, guardando sus preceptos y sus leyes; por eso hoy, celebrando tu santísima memoria, te alabamos con fe y te honramos con amor.'),
    kontakion: h(4, 'Dios, que está por encima de todo ser, al venir al mundo con la carne, te recibió, mirófora, como verdadera discípula, que tenías todo tu deseo puesto en Él; por eso obraste muchísimas curaciones, y ahora, trasladada a los cielos, intercedes sin cesar por el mundo.'),
  },
  'cristina-tiro': {
    nombre: 'santa Cristina',
    kontakion: h(4, 'Te diste a conocer como paloma luminosa, con alas de oro, y te posaste en la altura de los cielos, venerable Cristina; por eso celebramos tu gloriosa fiesta, venerando con fe la urna de tus reliquias, de la que mana en verdad para todos la curación divina del alma y del cuerpo.'),
  },
  'ana-madre': {
    nombre: 'la Dormición de santa Ana',
    tropario: h(4, 'Llevaste en tu seno a la que dio a luz a la Vida, a la pura Madre de Dios, Ana de mente divina; por eso te has trasladado ahora con alegría a la herencia celestial, morada de los que se alegran en la gloria, pidiendo para los que te honran con amor el perdón de las faltas, siempre bienaventurada.'),
    kontakion: h(2, 'Celebramos la memoria de los antepasados de Cristo, pidiendo con fe su ayuda, para que seamos librados de toda aflicción todos los que clamamos: Dios nuestro, sé con nosotros, Tú que los glorificaste como quisiste.'),
  },
  'parasceva-roma': {
    nombre: 'santa Parasceva',
    tropario: h(1, 'Habiendo puesto un empeño a la altura de tu nombre, que significa «preparación», recibiste como morada la fe que se llama como tú, Parasceva, atleta; por eso derramas curaciones e intercedes por nuestras almas.'),
    kontakion: h(4, 'Habiendo hallado tu templo, venerabilísima, como dispensario de las almas, todos los fieles te honramos en él a gran voz, monja mártir Parasceva digna de alabanza.'),
  },
  'eudocimo-justo': {
    nombre: 'san Eudocimo el Justo',
    tropario: h(4, 'El que te llamó de la tierra a las moradas eternas guarda también después de la muerte tu cuerpo incorrupto, santo; porque viviste, bienaventurado, en castidad y vida venerable, sin manchar la carne. Por eso intercede con confianza ante Cristo por nuestra salvación.'),
  },

  /* ---------------- Agosto ---------------- */
  'siete-macabeos': {
    nombre: 'los santos Macabeos',
    kontakion: h(2, 'Columnas de la sabiduría de Dios, siete en número, lámparas de siete luces de la luz divina, sapientísimos Macabeos, mártires grandísimos antes de los mártires: pedid con ellos al Dios de todos la salvación de los que os cantan.'),
  },
  'esteban-hallazgo': {
    nombre: 'el hallazgo de las reliquias de san Esteban',
    tropario: h(4, 'Tu cabeza fue coronada con una diadema real por los combates que soportaste por Cristo Dios, primero de los mártires; porque, refutando la locura de los judíos, viste a tu Salvador a la derecha del Padre. Suplícale siempre por nuestras almas.'),
    kontakion: h(8, 'Fuiste el primero sembrado en la tierra por el Labrador celestial, gloriosísimo; el primero que derramó su sangre en la tierra por Cristo, bienaventurado; el primero que recibió de Él en el cielo la corona de la victoria, como comienzo de los atletas, Esteban, primero de los mártires.'),
  },
  'isaac-dalmato-fausto': {
    nombre: 'los santos Isaac, Dalmato y Fausto',
    kontakion: h(6, 'A los que brillaron en el mundo por la ascesis y derribaron las herejías con la fe, alabemos con himnos a Isaac, con Dalmato y Fausto, como servidores de Cristo; porque ellos claman por todos nosotros.'),
  },
  'lorenzo-roma': {
    nombre: 'san Lorenzo',
    kontakion: h(2, 'Abrasado el corazón por el fuego divino, reduciste a ceniza el fuego de las pasiones, sostén de los atletas, Lorenzo, mártir portador de Dios; y en el combate clamabas con fe: Nadie me separará del amor de Cristo.'),
  },
  'focio-aniceto': {
    nombre: 'los santos Focio y Aniceto',
    kontakion: h(2, 'Alabemos, fieles, a los divinos soldados, a la pareja de Cristo; ensalcemos a los firmes heraldos de la gloria, y coronemos todos con cantos y himnos, amantes de los combates, a los que amaron de verdad a Dios.'),
  },
  diomedes: {
    nombre: 'san Diomedes',
    tropario: h(1, 'Curando las enfermedades de los cuerpos, Diomedes, concedías con la palabra de la verdad la salud de las almas; porque, habiendo recibido el don divino, socorres a los que sufren de muchas maneras, e iluminado por los rayos de los mártires salvas a los que te claman: Gloria a Cristo, que te glorificó; gloria al que te coronó; gloria al que por ti obra curaciones para todos.'),
  },
  'miron-creta': {
    nombre: 'san Mirón',
    kontakion: h(2, 'Deseando a Cristo desde niño, gloriosísimo, y guardando sus divinos mandamientos, corriste por entero hacia Él, Mirón, y descansaste glorificándolo con los ángeles, pidiendo para todos el perdón divino.'),
  },
  'tadeo-apostol': {
    nombre: 'san Tadeo',
    kontakion: h(3, 'Ha llegado la fiesta gozosa del apóstol: celebrémosla hoy con alegría; porque concede a los que lo honran siempre con fe la liberación de los pecados y la salud divina, pues tiene confianza ante Dios, como divino iniciado en la gracia de Cristo.'),
  },
  'agatonico-martir': {
    nombre: 'san Agatónico',
    kontakion: h(1, 'Teniendo un buen nombre, de mente divina, rechazaste el culto de los hombres malvados, sin temer ninguna clase de castigo, Agatónico; por eso te hiciste heredero de los bienes, y recibiste dignamente con tus compañeros de combate la corona incorruptible.'),
  },
  'natalia-adrian': {
    nombre: 'los santos Adrián y Natalia',
    tropario: h(3, 'Tuviste por riqueza que nadie puede arrebatar la fe salvadora, tres veces bienaventurado; dejando la impiedad de tus padres y siguiendo las huellas del Soberano, fuiste enriquecido con dones divinos, glorioso Adrián. Suplica a Cristo Dios por la salvación de nuestras almas.'),
    kontakion: h(4, 'Poniendo en tu corazón las palabras divinas de tu esposa de mente divina, Adrián, mártir de Cristo, corriste a los tormentos y recibiste la corona con tu esposa.'),
  },
  'pimen-grande': {
    nombre: 'san Pimen el Grande',
    kontakion: h(4, 'La santa memoria de tus combates luminosos, padre venerable, ha llegado hoy alegrando las almas de los piadosos, pastor de mente divina, padre nuestro venerable.'),
  },
  'moises-etiope': {
    nombre: 'san Moisés el Etíope',
    kontakion: h(4, 'Abofeteando los rostros de los etíopes espirituales, resplandeciste como un sol brillante, iluminando las almas de los que te honran, Moisés bienaventuradísimo.'),
  },
  'cinturon-theotokos': {
    nombre: 'la Deposición del cinturón de la Theotokos',
    tropario: h(8, 'Theotokos siempre virgen, protección de los hombres, diste a tu ciudad como vestidura poderosa el vestido y el cinturón de tu cuerpo purísimo, que por tu parto sin semilla permanecieron incorruptos; porque en ti se renuevan la naturaleza y el tiempo. Por eso te suplicamos que concedas la paz al mundo y a nuestras almas la gran misericordia.'),
    kontakion: h(6, 'Tu precioso cinturón, oh Theotokos, que ciñó tu seno, que recibió a Dios, es para tu ciudad fuerza invencible y tesoro inagotable de bienes, tú, la única que diste a luz permaneciendo siempre virgen.'),
  },
};
