/**
 * Monte Athos — la Montaña Santa.
 *
 * Los veinte monasterios soberanos, en el orden jerárquico fijado por el
 * Estatuto de la Comunidad Monástica. Las coordenadas son las de cada
 * monasterio en Wikidata (CC0), y el mapa las pone sobre la costa de Natural
 * Earth: ya no es un esquema.
 *
 * La revisión de 2026 corrigió lo que la primera versión mezclaba: el skete
 * de Kavsokalyvia y san Porfirio son de la Gran Laura, no de Pantokrátoros; el
 * del Profeta Elías es de Pantokrátoros y el de San Andrés, de Vatopedi, no
 * del monasterio ruso; y quien no está canonizado no se llama santo.
 */
import type { AthosArticle, Monastery, MonasteryFeast, SourceMeta, TextBlock } from '@/types';
import { MORE_ATHOS_ARTICLES } from './athos-articles';

const meta: SourceMeta = {
  source:
    'Reseñas redactadas para ATHOS a partir de la historia documentada de la Comunidad Monástica del Monte Athos; coordenadas de Wikidata (CC0)',
  tradition: 'Monacato athonita',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-01-01',
  notes:
    'Revisadas en noviembre de 2026: dependencias, fiestas, renovaciones y quién está canonizado. Las fechas de las fiestas son del calendario juliano, el de la Montaña.',
};

interface MonasterySeed {
  id: string;
  name: string;
  greekName: string;
  rank: number;
  founded: string;
  tradition: string;
  feast: MonasteryFeast;
  side: Monastery['side'];
  shore: boolean;
  wikidata: string;
  lat: number;
  lon: number;
  renewal?: string;
  description: string;
  today: string;
  saints: string[];
  treasures?: string[];
  dependencies?: string[];
}

const seeds: MonasterySeed[] = [
  {
    id: 'megisti-lavra',
    name: 'Gran Laura',
    greekName: 'Μεγίστη Λαύρα',
    rank: 1,
    founded: '963',
    tradition: 'Griega',
    feast: { name: 'San Atanasio el Athonita', day: '07-05' },
    side: 'este',
    shore: true,
    wikidata: 'Q546516',
    lat: 40.170876,
    lon: 24.382728,
    renewal: 'Cenobítico desde 1980',
    description:
      'El más antiguo de los veinte y el primero en la jerarquía. Lo fundó san Atanasio el Athonita en 963 con el apoyo del emperador Nicéforo Focas, y con él empieza en la Montaña la vida cenobítica organizada: regla, refectorio común y oficio coral, frente a la dispersión de los ermitaños que vivían allí antes.',
    today:
      'Es el mayor de los veinte en extensión y el que más dependencias tiene: suyos son los sketes de Santa Ana, de Kavsokalyvia y el rumano de Prodromu, y todo el desierto del extremo sur —Katounakia, Karoulia, Kerasia—, donde todavía viven ermitaños en celdas colgadas sobre el mar. En el patio siguen los cipreses que la tradición atribuye a san Atanasio, y la iglesia y el refectorio conservan frescos de Teófanes el Cretense, del siglo XVI. Volvió a la vida cenobítica en 1980.',
    saints: [
      'San Atanasio el Athonita, su fundador',
      'San Gregorio Palamás, que vivió aquí y en su ermita de San Sabas',
      'San Juan Kukuzelis, el gran maestro del canto bizantino',
      'San Máximo Kavsokalivita, el que quemaba su choza',
      'San Nilo el Mirobleta, en el desierto del sur',
      'San Porfirio Kavsokalivita, tonsurado en Kavsokalyvia',
    ],
    treasures: [
      'La tumba de san Atanasio',
      'Los iconos de la Kukuzelissa y de la Ikonómissa',
      'Una de las mayores bibliotecas de manuscritos de la Montaña',
    ],
    dependencies: ['El desierto del sur: Katounakia, Karoulia, Kerasia y la Pequeña Santa Ana'],
  },
  {
    id: 'vatopedi',
    name: 'Vatopedi',
    greekName: 'Βατοπέδι',
    rank: 2,
    founded: 'c. 972-985',
    tradition: 'Griega',
    feast: { name: 'Anunciación de la Theotokos', day: '03-25' },
    side: 'este',
    shore: true,
    wikidata: 'Q911432',
    lat: 40.314166666,
    lon: 24.211111111,
    renewal: 'Cenobítico desde 1990',
    description:
      'Segundo en la jerarquía y uno de los mayores, en una bahía de la costa nororiental. Su nombre, «la zarza del niño», viene de una leyenda: el príncipe Arcadio, hijo de Teodosio el Grande, apareció vivo bajo una zarza tras un naufragio. Fue durante siglos un centro de estudio y de copia de manuscritos, y a su lado funcionó en el siglo XVIII la Academia Athonita.',
    today:
      'Es hoy uno de los más poblados. Lo devolvió a la vida cenobítica en 1990 la comunidad del archimandrita Efrén, venida de la Nueva Skete y con muchos chipriotas, y hoy reúne monjes de varias lenguas. Guarda el cinturón de la Theotokos, que sus monjes llevan a las Iglesias que lo piden —en 2011 lo veneraron en Rusia más de tres millones de personas—, y algunos de los iconos más venerados de la Montaña: la Vimatárissa, la Paramythía y la Pantánassa. Su archivo conserva documentos imperiales desde el siglo X.',
    saints: [
      'San Gregorio Palamás, que empezó aquí su vida monástica',
      'San Máximo el Griego, que llevó a Moscú la cultura bizantina',
      'San Eutimio y los doce monjes de Vatopedi, mártires bajo los latinos en el siglo XIII',
      'San Cosme de Etolia, alumno de la Academia Athonita',
    ],
    treasures: [
      'El cinturón de la Theotokos',
      'La cabeza de san Juan Crisóstomo',
      'Los iconos de la Vimatárissa, la Paramythía y la Pantánassa',
    ],
  },
  {
    id: 'iviron',
    name: 'Ivirón',
    greekName: 'Ιβήρων',
    rank: 3,
    founded: 'c. 980',
    tradition: 'Griega (fundación georgiana)',
    feast: { name: 'Dormición de la Theotokos', day: '08-15' },
    side: 'este',
    shore: true,
    wikidata: 'Q853354',
    lat: 40.245515,
    lon: 24.284888,
    renewal: 'Cenobítico desde 1990',
    description:
      'Lo fundaron hacia 980 monjes georgianos —de ahí el nombre, «de los iberos», como llamaban los griegos a Georgia—: san Juan el Ibero, su hijo Eutimio y el general Juan Tornikios. Durante siglos fue el puente entre el Athos y el Cáucaso, y sus manuscritos georgianos son fuente principal de la literatura antigua de aquel país.',
    today:
      'Custodia la Portaítissa, la Guardiana de la Puerta, uno de los iconos más venerados del mundo ortodoxo. Está en una capilla junto a la entrada y no en el katholikón, porque según el relato volvía sola a la puerta cada vez que la llevaban dentro; el martes de la Semana Luminosa se saca en procesión hasta la orilla donde se recogió. Es el único de los veinte que cuenta las horas a la manera caldea, desde la salida del sol. Volvió a la vida cenobítica en 1990 con monjes venidos de Stavronikita.',
    saints: [
      'San Juan el Ibero y su hijo san Eutimio, fundadores',
      'San Jorge el Hagiorita, que tradujo al georgiano los libros griegos',
      'San Gabriel el Ibero, que recogió del mar la Portaítissa',
    ],
    treasures: ['El icono de la Portaítissa', 'Manuscritos georgianos de los siglos X y XI'],
  },
  {
    id: 'hilandar',
    name: 'Hilandar',
    greekName: 'Χιλανδαρίου',
    rank: 4,
    founded: '1198',
    tradition: 'Serbia',
    feast: { name: 'Entrada de la Theotokos en el Templo', day: '11-21' },
    side: 'este',
    shore: false,
    wikidata: 'Q849914',
    lat: 40.339861111,
    lon: 24.120916666,
    description:
      'Lo refundaron en 1198 san Sava y su padre, el antiguo gran zupán Esteban Nemanja, que acabó aquí sus días como el monje Simeón. Es el monasterio serbio de la Montaña y la cuna de la literatura y de la Iglesia serbias: aquí se formó san Sava antes de volver a su tierra como su primer arzobispo.',
    today:
      'La Trikherousa, la Virgen de las tres manos, está puesta en el sitial del higúmeno, porque la tradición la tiene por la abadesa de la casa. El incendio de marzo de 2004 destruyó más de la mitad del recinto, y la reconstrucción, sostenida por el Estado serbio y por donativos, ha durado veinte años. Junto al katholikón sigue dando fruto la vid que, según la tradición, brotó de la tumba de san Simeón; en Karyés, el monasterio conserva la celda donde san Sava escribió su Típico.',
    saints: ['San Sava, primer arzobispo de Serbia', 'San Simeón el Mirobleta, su padre, Esteban Nemanja'],
    treasures: ['El icono de la Trikherousa', 'La vid de san Simeón'],
    dependencies: ['La celda de san Sava en Karyés, la Tipikárnica'],
  },
  {
    id: 'dionysiou',
    name: 'Dionisiou',
    greekName: 'Διονυσίου',
    rank: 5,
    founded: 'c. 1375',
    tradition: 'Griega',
    feast: { name: 'Natividad de san Juan Bautista', day: '06-24' },
    side: 'oeste',
    shore: true,
    wikidata: 'Q1059939',
    lat: 40.168251,
    lon: 24.274255,
    description:
      'Encaramado en una roca sobre el mar, en la costa suroeste. Lo fundó hacia 1375 san Dionisio de Korisós con el apoyo del emperador de Trebisonda Alejo III Comneno, cuya crisóbula —un pergamino iluminado de más de cuatro metros— sigue en el monasterio.',
    today:
      'Tiene fama de guardar el orden de los oficios sin abreviarlo. El refectorio está pintado con el Apocalipsis y el katholikón con frescos de Tzortzis, del siglo XVI, de la escuela cretense. Custodia el icono de la Akáthistos, ante el cual, según la tradición, se cantó por primera vez el himno de ese nombre en Constantinopla, en 626. Está tan encajado en la roca que el huerto se hizo en terrazas sobre el mar.',
    saints: [
      'San Dionisio de Korisós, fundador',
      'San Nifón II, patriarca de Constantinopla, que murió aquí como un monje más',
    ],
    treasures: [
      'El icono de la Akáthistos',
      'La crisóbula de Alejo III de Trebisonda',
      'Frescos de Tzortzis en el refectorio y el katholikón',
    ],
  },
  {
    id: 'koutloumousiou',
    name: 'Kutlumusiu',
    greekName: 'Κουτλουμουσίου',
    rank: 6,
    founded: 'siglo XII',
    tradition: 'Griega',
    feast: { name: 'Transfiguración del Señor', day: '08-06' },
    side: 'centro',
    shore: false,
    wikidata: 'Q1067463',
    lat: 40.253148,
    lon: 24.247534,
    description:
      'Está al pie de Karyés, la capital, y es el vecino más cercano de la Sagrada Comunidad, lo que le da un papel constante en la vida administrativa de la Montaña. Aparece en los documentos desde 1169, y en el siglo XIV lo reconstruyeron los príncipes de Valaquia, los primeros de una larga serie de benefactores rumanos del Athos.',
    today:
      'De él dependen el skete de San Panteleimón y la celda de Panagouda, donde vivió san Paisios de 1979 a 1993, recibiendo cada día a decenas de personas que subían a verlo. Su katholikón, del siglo XVI, conserva los frescos de entonces. Por su vecindad con Karyés es la primera parada de quien llega a la capital, y de los monasterios que más trato tienen con los peregrinos.',
    saints: [
      'San Paisios del Monte Athos, en su celda de Panagouda',
      'San Cipriano el Nuevo, neomártir, monje de la casa',
    ],
    dependencies: ['La celda de Panagouda'],
  },
  {
    id: 'pantokratoros',
    name: 'Pantokrátoros',
    greekName: 'Παντοκράτορος',
    rank: 7,
    founded: 'c. 1363',
    tradition: 'Griega',
    feast: { name: 'Transfiguración del Señor', day: '08-06' },
    side: 'este',
    shore: true,
    wikidata: 'Q1059902',
    lat: 40.283572222,
    lon: 24.26655,
    renewal: 'Cenobítico desde 1992',
    description:
      'Lo fundaron hacia 1363 dos altos dignatarios bizantinos, el estratopedarca Alejo y su hermano Juan el primicerio, sobre un saliente rocoso de la costa nororiental, con su pequeño puerto al pie.',
    today:
      'Custodia el icono de la Gerontissa, «la Anciana», de los más venerados de la vertiente oriental. De él depende el skete del Profeta Elías, nacido de la celda donde vivió en el siglo XVIII san Paisio Velichkovski, que desde la Montaña llevó la oración del corazón a Moldavia y a Rusia. Fue el último de los veinte en volver a la vida cenobítica, en 1992: desde entonces no queda ninguno idiorrítmico.',
    saints: ['San Paisio Velichkovski, en la celda del Profeta Elías'],
    treasures: ['El icono de la Gerontissa'],
  },
  {
    id: 'xiropotamou',
    name: 'Xiropótamu',
    greekName: 'Ξηροποτάμου',
    rank: 8,
    founded: 'siglo X',
    tradition: 'Griega',
    feast: { name: 'Los Cuarenta Mártires de Sebaste', day: '03-09' },
    side: 'oeste',
    shore: false,
    wikidata: 'Q849348',
    lat: 40.228417,
    lon: 24.220889,
    description:
      'Uno de los más antiguos, tierra adentro sobre el puerto de Dafni. La tradición atribuye su fundación a la emperatriz Pulqueria, en el siglo V; los documentos lo muestran en el siglo X, ligado a san Pablo el Xiropotamita.',
    today:
      'Custodia el fragmento más grande que se conoce de la Cruz, con el orificio de uno de los clavos, y lo expone a los peregrinos en sus fiestas. Sufrió los saqueos de la Compañía Catalana a comienzos del siglo XIV, terremotos e incendios, y se reconstruyó cada vez: lo que se ve hoy es en buena parte del siglo XVIII. Su comunidad es pequeña y muy recogida.',
    saints: [
      'San Pablo el Xiropotamita, que lo restauró en el siglo X',
      'Santa Pulqueria, emperatriz, fundadora según la tradición',
    ],
    treasures: ['El fragmento mayor de la Preciosa Cruz'],
  },
  {
    id: 'zographou',
    name: 'Zográfu',
    greekName: 'Ζωγράφου',
    rank: 9,
    founded: 'siglo X',
    tradition: 'Búlgara',
    feast: { name: 'San Jorge el Trofeóforo', day: '04-23' },
    side: 'oeste',
    shore: false,
    wikidata: 'Q218382',
    lat: 40.305833,
    lon: 24.160278,
    description:
      'El monasterio búlgaro de la Montaña, tierra adentro en la vertiente occidental. Su nombre, «del pintor», viene del icono de san Jorge que, según la tradición, apareció pintado por sí solo en la tabla que los monjes habían preparado.',
    today:
      'Recuerda cada año a sus veintiséis mártires, quemados en la torre en 1276 por no aceptar la unión con Roma que había firmado el emperador Miguel VIII. Durante buena parte del siglo XX, con Bulgaria bajo un régimen comunista, casi no le llegaron novicios y quedó en manos de unos pocos ancianos; hoy vuelve a tener comunidad. Guarda varios iconos de san Jorge muy venerados.',
    saints: ['Los veintiséis mártires de Zográfu (1276)', 'San Cosme de Zográfu, asceta del siglo XIV'],
    treasures: ['Los iconos de san Jorge'],
  },
  {
    id: 'docheiariou',
    name: 'Dojiaríu',
    greekName: 'Δοχειαρίου',
    rank: 10,
    founded: 'siglo X',
    tradition: 'Griega',
    feast: { name: 'Los Arcángeles Miguel y Gabriel', day: '11-08' },
    side: 'oeste',
    shore: true,
    wikidata: 'Q726733',
    lat: 40.266574,
    lon: 24.172843,
    description:
      'A pie de playa en la costa occidental. El nombre le viene de su fundador, san Eutimio, que había sido el docheiaris —el despensero— de la Gran Laura en tiempos de san Atanasio.',
    today:
      'Custodia el icono de la Gorgoepíkoos, «la que pronto escucha», en una capilla junto al refectorio, adonde acuden peregrinos de toda Grecia a pedir ayuda en lo urgente. Su katholikón, de 1568, es de los más altos de la Montaña y está pintado entero por la escuela cretense. Lo renovó desde 1980 el anciano Gregorio, que fue su higúmeno durante cuarenta años.',
    saints: ['San Eutimio, el despensero de la Gran Laura, fundador'],
    treasures: ['El icono de la Gorgoepíkoos'],
  },
  {
    id: 'karakalou',
    name: 'Karakalu',
    greekName: 'Καρακάλλου',
    rank: 11,
    founded: 'siglo XI',
    tradition: 'Griega',
    feast: { name: 'Santos Apóstoles Pedro y Pablo', day: '06-29' },
    side: 'este',
    shore: false,
    wikidata: 'Q967055',
    lat: 40.223888888,
    lon: 24.308333333,
    description:
      'Tierra adentro en la vertiente oriental, entre olivares, a poca distancia de su puerto. Se documenta en el siglo XI y tuvo que levantarse de nuevo varias veces tras los saqueos de los piratas.',
    today:
      'Su gran torre del siglo XVI, que costeó el príncipe de Moldavia Pedro Rareș, es una de las mejor conservadas de la Montaña. Los príncipes rumanos lo sostuvieron durante siglos. La comunidad vive de sus huertos y de su olivar, que trabajan los propios monjes, y guarda el recuerdo de san Gedeón, monje de la casa martirizado en 1818.',
    saints: ['San Gedeón de Karakalu, neomártir (1818)'],
  },
  {
    id: 'filotheou',
    name: 'Filoteu',
    greekName: 'Φιλοθέου',
    rank: 12,
    founded: 'c. 990',
    tradition: 'Griega',
    feast: { name: 'Anunciación de la Theotokos', day: '03-25' },
    side: 'este',
    shore: false,
    wikidata: 'Q771246',
    lat: 40.225555555,
    lon: 24.290833333,
    renewal: 'Renovado en 1973',
    description:
      'En una meseta boscosa de la vertiente oriental, tierra adentro. Lo fundó a finales del siglo X un monje llamado Filoteo, contemporáneo de san Atanasio, y de él salió en el siglo XVIII san Cosme de Etolia a predicar por los pueblos griegos y albaneses.',
    today:
      'Fue el foco de la renovación del siglo XX: en 1973 llegó con sus discípulos el anciano Efrén, hijo espiritual de san José el Hesicasta, y de Filoteu salieron después las comunidades que repoblaron otros monasterios de la Montaña y, con el propio Efrén, una veintena de monasterios en América del Norte. Custodia el icono de la Glykophilousa, «la del dulce beso».',
    saints: [
      'San Cosme de Etolia, que tomó aquí el hábito antes de salir a predicar',
      'El anciano Efrén (1928-2019), higúmeno desde 1973',
    ],
    treasures: ['El icono de la Glykophilousa'],
  },
  {
    id: 'simonopetra',
    name: 'Simonopetra',
    greekName: 'Σίμωνος Πέτρα',
    rank: 13,
    founded: 'siglo XIII',
    tradition: 'Griega',
    feast: { name: 'Natividad de Cristo', day: '12-25' },
    side: 'oeste',
    shore: false,
    wikidata: 'Q911413',
    lat: 40.190277777,
    lon: 24.247222222,
    renewal: 'Renovado en 1973',
    description:
      'La imagen más reconocible del Athos: siete pisos de balcones de madera sobre una roca que cae a pico más de trescientos metros sobre el mar. Lo fundó en el siglo XIII san Simón el Mirobleta, después de ver una noche de Navidad una estrella posarse sobre el peñasco; en el XIV lo reconstruyó el déspota serbio Juan Uglješa.',
    today:
      'Su comunidad, renovada en 1973 por el archimandrita Emiliano con monjes venidos de Metéora, es de las más numerosas, y su coro, de los más grabados: por sus discos se ha conocido el canto bizantino lejos de Grecia. Tiene dependencias en Grecia y en Francia, y custodia la mano izquierda de santa María Magdalena. Ardió varias veces; lo que se ve es en buena parte de después del incendio de 1891.',
    saints: ['San Simón el Mirobleta, fundador'],
    treasures: ['La mano de santa María Magdalena'],
  },
  {
    id: 'agiou-pavlou',
    name: 'San Pablo',
    greekName: 'Αγίου Παύλου',
    rank: 14,
    founded: 'siglo X',
    tradition: 'Griega',
    feast: { name: 'Encuentro del Señor en el Templo', day: '02-02' },
    side: 'oeste',
    shore: false,
    wikidata: 'Q1140481',
    lat: 40.160615,
    lon: 24.289499,
    description:
      'Al pie del monte Athos, en la boca de un barranco por el que baja un torrente. Lo fundó a finales del siglo X san Pablo el Xiropotamita, y en la Edad Media lo sostuvieron sobre todo los príncipes serbios.',
    today:
      'Conserva los dones de los Magos —oro, incienso y mirra—, que según la tradición trajo de Serbia la princesa Mara Branković, viuda del sultán Murad II, y que a veces se llevan a las Iglesias que los piden: en 2014 los veneraron en Rusia más de un millón de personas. De él dependen la Nueva Skete, donde murió san José el Hesicasta, y el skete rumano de San Demetrio del Lakkos.',
    saints: [
      'San Pablo el Xiropotamita, fundador',
      'San José el Hesicasta, que murió en la Nueva Skete en 1959',
    ],
    treasures: ['Los dones de los Magos'],
  },
  {
    id: 'stavronikita',
    name: 'Stavronikita',
    greekName: 'Σταυρονικήτα',
    rank: 15,
    founded: '1541',
    tradition: 'Griega',
    feast: { name: 'San Nicolás', day: '12-06' },
    side: 'este',
    shore: true,
    wikidata: 'Q1141004',
    lat: 40.267996,
    lon: 24.276773,
    renewal: 'Renovado en 1968',
    description:
      'El más pequeño de los veinte y el último en alcanzar ese rango: lo levantó como monasterio en 1541 el patriarca Jeremías I, sobre un cenobio anterior, en un saliente rocoso de la costa nororiental.',
    today:
      'Sus frescos, de Teófanes el Cretense hacia 1546, están entre los mejor conservados del Athos. Guarda un icono en mosaico de san Nicolás hallado en el mar con una ostra pegada a la frente, de donde le viene el nombre de Streidás. Se renovó en 1968 con el archimandrita Basilio Gondikakis, y de él depende la celda de la Preciosa Cruz, donde vivió san Paisios en los años setenta.',
    saints: [
      'San Paisios del Monte Athos, en su celda de la Preciosa Cruz',
      'El patriarca Jeremías I, que lo refundó',
    ],
    treasures: ['El icono en mosaico de san Nicolás Streidás', 'Frescos de Teófanes el Cretense'],
    dependencies: ['La celda de la Preciosa Cruz'],
  },
  {
    id: 'xenophontos',
    name: 'Xenofontos',
    greekName: 'Ξενοφώντος',
    rank: 16,
    founded: 'siglo X',
    tradition: 'Griega',
    feast: { name: 'San Jorge el Trofeóforo', day: '04-23' },
    side: 'oeste',
    shore: true,
    wikidata: 'Q1067065',
    lat: 40.258462,
    lon: 24.178677,
    description:
      'A pie de playa en la costa occidental, y de los más fáciles de alcanzar. Lo fundó en el siglo X un monje llamado Xenofonte, y su nombre aparece ya en los documentos de la época de san Atanasio.',
    today:
      'Es el único de los veinte con dos katholikón: el antiguo, del siglo XVI, se quedó pequeño, y en el XIX se levantó otro mayor sin derribar el primero. Custodia el icono de la Hodigitria, que según la tradición pasó sola desde Vatopedi en 1730. De él depende el skete de la Anunciación, y su comunidad se renovó en 1976 con monjes venidos de Filoteu.',
    saints: ['San Xenofonte, fundador'],
    treasures: ['El icono de la Hodigitria'],
  },
  {
    id: 'osiou-grigoriou',
    name: 'San Gregorio',
    greekName: 'Οσίου Γρηγορίου',
    rank: 17,
    founded: 'siglo XIV',
    tradition: 'Griega',
    feast: { name: 'San Nicolás', day: '12-06' },
    side: 'oeste',
    shore: true,
    wikidata: 'Q1140986',
    lat: 40.179455,
    lon: 24.255839,
    renewal: 'Renovado en 1974',
    description:
      'Sobre una roca a pocos metros del agua, en la costa suroeste. Lo fundó en el siglo XIV san Gregorio, discípulo de san Gregorio el Sinaíta, y está ligado desde entonces a la tradición hesicasta.',
    today:
      'Es uno de los más poblados. Su comunidad se renovó en 1974 con el archimandrita Jorge Kapsanis, su higúmeno durante cuarenta años, y de ella salió el padre Cosme, que levantó la misión ortodoxa del Congo y murió allí en 1989. Ardió en 1761 y se reconstruyó casi entero; en los temporales, el mar lo ha alcanzado más de una vez.',
    saints: [
      'San Gregorio, discípulo del Sinaíta, fundador',
      'El padre Cosme de Grigoriu, misionero en el Congo (†1989)',
    ],
  },
  {
    id: 'esphigmenou',
    name: 'Esfigmenu',
    greekName: 'Εσφιγμένου',
    rank: 18,
    founded: 'siglo X',
    tradition: 'Griega',
    feast: { name: 'Ascensión del Señor', paschaOffset: 39 },
    side: 'este',
    shore: true,
    wikidata: 'Q1141010',
    lat: 40.352688888,
    lon: 24.138052777,
    description:
      'En el extremo norte de la costa oriental, junto al mar. Su nombre, «el apretado», se explica por su sitio, encajado entre colinas. Cerca está la cueva donde, según la tradición, vivió san Antonio antes de llevar a Kiev el monacato athonita y fundar la Laura de las Cuevas.',
    today:
      'Desde 1972 su comunidad dejó de conmemorar al Patriarca Ecuménico en protesta por el ecumenismo, y en 2002 el Patriarcado la declaró cismática; desde 2005 hay otra comunidad, reconocida por la Montaña, que reclama el monasterio, y la disputa —por la propiedad y por la fe— lleva años en los tribunales griegos. Es la única ruptura abierta entre los veinte, y su bandera con el lema «Ortodoxia o muerte» la ha hecho conocida lejos del Athos.',
    saints: [
      'San Antonio de las Cuevas de Kiev, que tomó aquí el hábito según la tradición',
      'San Gregorio Palamás, higúmeno hacia 1335',
      'San Agatángelo de Esfigmenu, neomártir (1819)',
    ],
  },
  {
    id: 'agiou-panteleimonos',
    name: 'San Panteleimón',
    greekName: 'Αγίου Παντελεήμονος',
    rank: 19,
    founded: 'siglo XI',
    tradition: 'Rusa',
    feast: { name: 'San Panteleimón', day: '07-27' },
    side: 'oeste',
    shore: true,
    wikidata: 'Q588387',
    lat: 40.238899,
    lon: 24.199941,
    description:
      'El monasterio ruso de la Montaña, llamado también Rossikón. Hay monjes rusos en el Athos desde el siglo XI —primero en Xylurgu, después en el viejo Rossikón de la montaña—, y a finales del XVIII la comunidad bajó a la orilla del mar, donde a lo largo del XIX se levantó el monasterio de cúpulas verdes que se ve hoy.',
    today:
      'Hacia 1900 tenía más de mil monjes, y en 1970 apenas una docena de ancianos, porque la Unión Soviética no dejaba salir novicios. Hoy vuelve a tener comunidad numerosa y sus edificios se han restaurado con dinero ruso, no sin polémica por la influencia que eso da a Moscú en la Montaña. Aquí vivió y murió san Silvano el Athonita, y aquí fue monje su discípulo san Sofronio antes de fundar en Essex. Su campana mayor, de trece toneladas, se oye desde el mar.',
    saints: [
      'San Silvano el Athonita (1866-1938)',
      'San Sofronio de Essex, su discípulo, monje aquí desde 1925',
    ],
    treasures: ['La cabeza de san Panteleimón', 'Reliquias de san Silvano', 'La campana mayor, de trece toneladas'],
    dependencies: ['La Nueva Tebaida', 'El viejo Rossikón, en la montaña'],
  },
  {
    id: 'konstamonitou',
    name: 'Konstamonitu',
    greekName: 'Κωνσταμονίτου',
    rank: 20,
    founded: 'siglo XI',
    tradition: 'Griega',
    feast: { name: 'San Esteban Protomártir', day: '12-27' },
    side: 'oeste',
    shore: false,
    wikidata: 'Q1148615',
    lat: 40.288611111,
    lon: 24.174722222,
    description:
      'El más apartado de los veinte, escondido en un valle boscoso de la vertiente occidental, sin vista al mar. La tradición lo hace fundación de Constancio, hijo de Constantino el Grande, de quien le vendría el nombre; los documentos lo muestran en el siglo XI.',
    today:
      'Es el último en la jerarquía y el que menos visitantes recibe: no está de paso hacia ningún otro sitio. Vive de sus huertos y de la limosna, y su comunidad se renovó en 1978 con monjes venidos de Filoteu. Por su aislamiento es de los que mejor guardan el silencio de la Montaña, y la casa entera conserva el aire de los monasterios pobres de antes.',
    saints: ['San Esteban Protomártir, a quien está dedicado'],
  },
];

export const MONASTERIES: Monastery[] = seeds.map((s) => ({
  id: s.id,
  name: s.name,
  greekName: s.greekName,
  rank: s.rank,
  founded: s.founded,
  tradition: s.tradition,
  feast: s.feast,
  description: s.description,
  coords: { lat: s.lat, lon: s.lon },
  side: s.side,
  shore: s.shore,
  wikidata: s.wikidata,
  renewal: s.renewal,
  treasures: s.treasures,
  today: s.today,
  saints: s.saints,
  dependencies: s.dependencies,
  status: 'complete',
  meta,
  searchText: [s.name, s.greekName, s.tradition, s.feast.name, s.description, s.today, ...s.saints, ...(s.treasures ?? [])]
    .join(' ')
    .toLowerCase(),
}));

const p = (content: string): TextBlock => ({ kind: 'text', content });
const h = (content: string): TextBlock => ({ kind: 'heading', content });

const baseArticles: AthosArticle[] = [
  {
    id: 'historia',
    title: 'Historia de la Montaña Santa',
    topic: 'historia',
    blocks: [
      p('La península de Athos aparece ya en Heródoto, que cuenta cómo Jerjes hizo excavar un canal en el istmo para evitar el naufragio que su flota había sufrido al doblar el cabo. La tradición monástica sitúa allí ermitaños desde los primeros siglos cristianos, aunque las primeras noticias firmes son del siglo IX.'),
      h('La fundación cenobítica'),
      p('En 963, san Atanasio el Athonita funda la Gran Laura con el apoyo del emperador Nicéforo Focas. La novedad no fue la presencia de monjes, sino la organización: una comunidad con regla, refectorio común y oficio coral, frente a la dispersión de los eremitas. El modelo se extendió con rapidez, y en 972 el emperador Juan Tzimiskés firmó el primer estatuto de la Montaña, el Tragos, escrito en un pergamino de piel de macho cabrío.'),
      h('El Athos multinacional'),
      p('A partir del siglo X llegan georgianos, rusos, serbios y búlgaros. Ivirón nace de una fundación georgiana; Hilandar es refundado por san Sava de Serbia en 1198; Zográfu se convierte en el monasterio búlgaro; el Rossikón, en el ruso. Los príncipes de Valaquia y Moldavia sostendrán después durante siglos a casi todos los monasterios. La Montaña es desde entonces el lugar donde toda la ortodoxia convive en un mismo territorio.'),
      h('Decadencias y renacimientos'),
      p('Tras la caída de Constantinopla en 1453, los monasterios sobrevivieron pagando tributo al sultán. El siglo XVIII trajo el movimiento kollyvadista y la publicación de la Filocalia, que reavivó la oración hesicasta en todo el mundo ortodoxo. El siglo XX empezó con un declive demográfico severo —de casi ocho mil monjes en 1900 a poco más de mil en 1970— y se cerró con una recuperación inesperada: monjes jóvenes y con estudios repoblaron los monasterios idiorrítmicos, que volvieron uno tras otro a la vida cenobítica. En 1992 lo hizo el último.'),
      h('Hoy'),
      p('El Monte Athos es una región autónoma dentro del Estado griego, bajo la jurisdicción espiritual del Patriarcado Ecuménico, con unos dos mil monjes. Los veinte monasterios soberanos se gobiernan por la Sagrada Comunidad, con sede en Karyés. Rige el ávaton, la prohibición de acceso a las mujeres, en vigor desde hace más de mil años, y desde 1988 la Montaña es patrimonio de la humanidad.'),
    ],
    status: 'complete',
    meta,
    searchText: 'historia monte athos atanasio athonita gran laura tragos tzimiskes filocalia karyes avaton'.toLowerCase(),
  },
  {
    id: 'geografia',
    title: 'Geografía y vida cotidiana',
    topic: 'geografia',
    blocks: [
      p('El Athos es la más oriental de las tres penínsulas de Calcídica: unos cincuenta kilómetros de largo por entre siete y doce de ancho, que terminan en un monte de 2.033 metros que cae casi a pico sobre el mar Egeo. La vertiente oriental mira al mar abierto; la occidental, al golfo Singítico, más resguardado.'),
      h('Los veinte y los demás'),
      p('Además de los veinte monasterios soberanos, la Montaña alberga doce sketes —comunidades dependientes—, celdas, kalyvas, kathismata y ermitas. En el extremo sur, en los acantilados de Karoulia, viven todavía anacoretas casi inaccesibles.'),
      h('El tiempo bizantino'),
      p('Salvo en Ivirón, el día no empieza a medianoche sino a la puesta de sol, cuando el reloj se pone a las doce. Como el ocaso cambia a lo largo del año, los relojes se ajustan cada pocos días. El calendario es el juliano, trece días por detrás del civil: la Navidad de la Montaña es el 7 de enero.'),
      h('La jornada'),
      p('Los oficios ocupan entre seis y ocho horas diarias, repartidas de manera que el grueso caiga en la noche: se duerme en dos tramos, con las vigilias en medio. El resto del tiempo se dedica al diakonima, el trabajo asignado a cada monje, y a la oración personal.'),
    ],
    status: 'complete',
    meta,
    searchText: 'geografia athos karyes sketes ermitas tiempo bizantino calendario juliano singitico'.toLowerCase(),
  },
  {
    id: 'hesicasmo',
    title: 'El hesicasmo',
    topic: 'hesicasmo',
    blocks: [
      p('Hesychía significa quietud: no la ausencia de ruido, sino un estado del alma en que cesa la agitación de los pensamientos y la atención puede volverse hacia Dios.'),
      h('La oración del corazón'),
      p('El método consiste en repetir la oración de Jesús —«Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador»— hasta que deja de ser un ejercicio de la boca o de la mente y pasa al corazón, donde continúa por sí sola. La tradición insiste en que no es una técnica, sino un modo de arrepentimiento, y en que sin obediencia y sin guía puede volverse peligrosa.'),
      h('La controversia del siglo XIV'),
      p('Barlaam de Calabria ridiculizó a los monjes que decían ver la luz increada. San Gregorio Palamás respondió distinguiendo entre la esencia de Dios, absolutamente inaccesible, y sus energías increadas, en las que la criatura participa de verdad. Los concilios de Constantinopla de 1341, 1347 y 1351 le dieron la razón, y el segundo domingo de Cuaresma quedó dedicado a su memoria.'),
      h('La Filocalia'),
      p('En 1782 san Nicodemo el Hagiorita y san Macario de Corinto publicaron en Venecia una antología de textos sobre la oración que abarcaba mil años. Traducida al eslavo por san Paisio Velichkovski y al ruso por san Teófano el Recluso, la Filocalia llevó el hesicasmo athonita mucho más allá de los monasterios.'),
    ],
    status: 'complete',
    meta,
    searchText: 'hesicasmo oracion del corazon jesus palamas barlaam energias increadas filocalia nicodemo'.toLowerCase(),
  },
  {
    id: 'monacato',
    title: 'El monacato athonita',
    topic: 'monacato',
    blocks: [
      p('Se entra en la Montaña como dokimos, novicio, y se permanece así de uno a tres años, según el monasterio y el anciano. Después viene la tonsura, en dos o tres grados según la tradición de la casa: rasóforo, estavróforo y, finalmente, el gran hábito o gran esquema.'),
      h('Los tres votos'),
      p('Obediencia, castidad y pobreza. De los tres, la tradición athonita subraya la obediencia: no como sumisión ciega, sino como el modo concreto de renunciar a la propia voluntad, que es la raíz de todo lo demás.'),
      h('Cenobitismo e idiorritmia'),
      p('En el monasterio cenobítico todo es común: la mesa, el horario, la bolsa. En el idiorrítmico, cada monje administraba su tiempo y sus bienes. Durante siglos convivieron ambas formas; desde 1992 los veinte monasterios son cenobíticos.'),
      h('El anciano'),
      p('La figura del gerondas o starets es central: un monje experimentado a quien se abren los pensamientos. La relación no es de dirección espiritual entendida como consejo ocasional, sino de transparencia continua.'),
    ],
    status: 'complete',
    meta,
    searchText: 'monacato novicio tonsura rasoforo esquema obediencia cenobitico idiorritmico gerondas starets'.toLowerCase(),
  },
  {
    id: 'ancianos',
    title: 'Ancianos del Athos',
    topic: 'ancianos',
    blocks: [
      p('El siglo XX dejó en la Montaña una generación de ancianos cuya influencia desbordó con mucho los muros de los monasterios. Cuatro de ellos ya han sido canonizados.'),
      h('San Silvano el Athonita (1866-1938)'),
      p('Campesino ruso llegado a San Panteleimón en 1892. Tras años de lucha con los pensamientos recibió la palabra: «Ten tu mente en el infierno y no desesperes». Sus escritos, publicados por su discípulo san Sofronio, giran en torno a la oración por el mundo entero. Fue canonizado en 1987.'),
      h('San José el Hesicasta (1897-1959)'),
      p('Vivió en cuevas y kalyvas del desierto de Santa Ana practicando la oración del corazón con extremo rigor, y murió en la Nueva Skete. Sus discípulos —Efrén de Filoteu, José de Vatopedi, Efrén de Katounakia, Carálambos de Dionisiou— repoblaron media Montaña en la segunda mitad del siglo XX. Fue canonizado en 2020.'),
      h('San Porfirio Kavsokalivita (1906-1991)'),
      p('Entró en el Athos siendo un muchacho y tomó el hábito en Kavsokalyvia. Capellán durante más de treinta años de una policlínica de Atenas, insistía en que la vida cristiana no se sostiene sobre el miedo, sino sobre el amor y la belleza. Fue canonizado en 2013.'),
      h('San Paisios del Monte Athos (1924-1994)'),
      p('Vivió en varias celdas de la Montaña, la última la de Panagouda, junto a Kutlumusiu. Recibía cada día a decenas de visitantes y respondía con un humor seco y una franqueza desconcertante. Fue canonizado en 2015.'),
    ],
    status: 'complete',
    meta,
    searchText: 'ancianos silvano paisios porfirio jose hesicasta sofronio panagouda efren'.toLowerCase(),
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura e iconografía',
    topic: 'arquitectura',
    blocks: [
      p('El monasterio athonita es un recinto cerrado, casi una fortaleza, con una sola puerta que se cierra al ponerse el sol. En el centro del patio está el katholikón, la iglesia principal, y casi todos tienen una torre alta junto al mar, defensa contra los piratas y refugio de los manuscritos.'),
      h('El katholikón'),
      p('Sigue el plano cruciforme bizantino con una particularidad athonita: los choroí, dos ábsides laterales donde se sitúan los coros. Delante se abre el lité, y ante él el exonártex.'),
      h('La fiala y el refectorio'),
      p('Frente a la iglesia se levanta la fiala, la fuente cubierta donde se hace la bendición de las aguas. El refectorio, casi siempre enfrentado al katholikón, está cubierto de frescos: se come mientras un monje lee en voz alta.'),
      h('Las escuelas de pintura'),
      p('En los frescos de la Montaña se distinguen sobre todo dos manos: la escuela macedonia, más dramática y monumental, representada por Manuel Panselinos en el Protaton de Karyés, y la escuela cretense de Teófanes, más contenida y refinada, que dejó obra en la Gran Laura y en Stavronikita.'),
    ],
    status: 'complete',
    meta,
    searchText: 'arquitectura katholikon fiala refectorio frescos panselinos teofanes cretense macedonia torre'.toLowerCase(),
  },
];

export const ATHOS_ARTICLES: AthosArticle[] = [...baseArticles, ...MORE_ATHOS_ARTICLES];

export const ATHOS_INTRO =
  'Ὄρος Ἄθως, el Jardín de la Theotokos: una península de la Calcídica griega donde desde ' +
  'hace más de mil años sólo se vive para orar.';
