/**
 * Doce Padres más, con lo que enseñaron.
 *
 * La primera tanda cubría bien el siglo IV y la espiritualidad rusa moderna, y
 * dejaba fuera cosas que no se pueden dejar fuera: los Padres apostólicos, el
 * siglo II, el monacato sirio y sinaíta, la crisis de los iconos vista desde
 * dentro de un monasterio, la Filocalia y el siglo XX.
 *
 * Como en la primera tanda, esto NO es texto patrístico: es prosa redactada
 * para ATHOS. De cada uno se dice qué enseñó, de qué trata cada obra suya, por
 * dónde empezar a leerlo y —cuando lo hay— qué conviene saber antes.
 */

/** Ficha de autor, sin las obras: eso se monta en fathers.ts. */
export interface FatherMoreSeed {
  id: string;
  name: string;
  fullName: string;
  century: string;
  feastDay?: string;
  biography: string;
  /** id, título, género. */
  works: Array<[string, string, 'tratado' | 'homilia' | 'carta' | 'sentencias' | 'comentario']>;
}

export const MORE_FATHERS: FatherMoreSeed[] = [
  {
    id: 'ignacio-antioquia',
    name: 'San Ignacio de Antioquía',
    fullName: 'San Ignacio el Teóforo, obispo de Antioquía',
    century: 'siglos I-II',
    feastDay: '12-20',
    biography:
      'Obispo de Antioquía, la tercera ciudad del Imperio, y probablemente discípulo directo de los apóstoles. Hacia el año 107 fue condenado a las fieras y llevado a Roma bajo escolta, por tierra y a través de Asia Menor. Durante ese viaje escribió siete cartas —a seis iglesias y a san Policarpo— que son el testimonio cristiano más antiguo que tenemos después del Nuevo Testamento. Murió en el anfiteatro romano. Sus cartas se leían en voz alta en las iglesias de Asia mientras él todavía viajaba hacia su muerte.',
    works: [
      ['ignacio-cartas', 'Las siete cartas', 'carta'],
      ['ignacio-romanos', 'Carta a los Romanos', 'carta'],
    ],
  },
  {
    id: 'ireneo-lyon',
    name: 'San Ireneo de Lyon',
    fullName: 'San Ireneo, obispo de Lyon',
    century: 'siglo II',
    feastDay: '08-23',
    biography:
      'Nació en Esmirna hacia el 130 y de niño escuchó predicar a san Policarpo, que a su vez había conocido al apóstol Juan: por él pasa la cadena más corta que une el siglo II con el Evangelio. Emigró a la Galia y fue obispo de Lyon tras la matanza de cristianos del año 177. Escribió contra el gnosticismo, la primera gran deformación del cristianismo, y su refutación es también la fuente principal para conocer aquellas doctrinas, que sin él se habrían perdido. Medió para que Roma no rompiera con las iglesias de Asia por la fecha de la Pascua, y su nombre —que significa pacífico— dio pie a un juego de palabras que ya hicieron sus contemporáneos.',
    works: [
      ['ireneo-herejias', 'Contra las herejías', 'tratado'],
      ['ireneo-demostracion', 'Demostración de la predicación apostólica', 'tratado'],
    ],
  },
  {
    id: 'efren-sirio',
    name: 'San Efrén el Sirio',
    fullName: 'San Efrén el Sirio, diácono de Edesa',
    century: 'siglo IV',
    feastDay: '01-28',
    biography:
      'Diácono de Nísibis y luego de Edesa († 373), llamado «el arpa del Espíritu Santo». No escribió en griego sino en siríaco, y casi nunca en prosa: compuso millares de himnos y los enseñó a coros de mujeres que los cantaban en las iglesias, con lo que la doctrina llegaba a quien no sabía leer. Cuando los persas tomaron Nísibis huyó a Edesa; en la hambruna de sus últimos años organizó él mismo el reparto de víveres y montó trescientas camillas para los enfermos. Murió a las pocas semanas, contagiado.',
    works: [
      ['efren-himnos-fe', 'Himnos sobre la fe', 'sentencias'],
      ['efren-himnos-natividad', 'Himnos sobre la Natividad', 'sentencias'],
      ['efren-comentario-diatessaron', 'Comentario al Diatessaron', 'comentario'],
    ],
  },
  {
    id: 'gregorio-nisa',
    name: 'San Gregorio de Nisa',
    fullName: 'San Gregorio, obispo de Nisa',
    century: 'siglo IV',
    feastDay: '01-10',
    biography:
      'Hermano menor de san Basilio, que lo hizo obispo de un pueblo insignificante para reforzar su bando en la disputa arriana; era el menos político de los tres capadocios y el más especulativo. Se casó, enviudó y sólo entonces se dedicó del todo a la Iglesia. Escribió el diálogo con su hermana santa Macrina en el lecho de muerte de ella, una de las páginas más hermosas de la Antigüedad cristiana, y llegó más lejos que nadie en su siglo pensando qué es el alma y qué es el progreso sin fin hacia Dios. El Segundo Concilio Ecuménico lo tuvo por uno de sus teólogos de referencia.',
    works: [
      ['nisa-vida-moises', 'Vida de Moisés', 'tratado'],
      ['nisa-alma-resurreccion', 'Sobre el alma y la resurrección', 'tratado'],
      ['nisa-gran-catequesis', 'Gran discurso catequético', 'tratado'],
    ],
  },
  {
    id: 'cirilo-alejandria',
    name: 'San Cirilo de Alejandría',
    fullName: 'San Cirilo, arzobispo de Alejandría',
    century: 'siglos IV-V',
    feastDay: '06-09',
    biography:
      'Patriarca de Alejandría († 444) y la figura decisiva del Tercer Concilio Ecuménico. Su choque con Nestorio, patriarca de Constantinopla, sobre si a la Virgen se la puede llamar Theotokos —Madre de Dios— acabó definiendo que en Cristo hay una sola persona, y que por tanto quien nació de María es Dios. Fue un teólogo de primer orden y un hombre de mano dura, y las dos cosas constan. Su fórmula sobre la unión de las naturalezas, que él tomaba por atanasiana, resultó ser de origen apolinarista, y ese equívoco pesó en la ruptura de Calcedonia veinte años después de su muerte.',
    works: [
      ['cirilo-comentario-juan', 'Comentario al Evangelio de san Juan', 'comentario'],
      ['cirilo-cartas-nestorio', 'Cartas a Nestorio', 'carta'],
      ['cirilo-encarnacion', 'Que Cristo es uno', 'tratado'],
    ],
  },
  {
    id: 'juan-climaco',
    name: 'San Juan Clímaco',
    fullName: 'San Juan Clímaco, higúmeno del Monte Sinaí',
    century: 'siglos VI-VII',
    feastDay: '03-30',
    biography:
      'Entró en el monasterio del Sinaí a los dieciséis años y vivió cuarenta en una celda apartada del valle de Tholas, saliendo los sábados y domingos al oficio. Ya anciano fue elegido higúmeno, y el abad de un monasterio vecino le pidió por escrito una regla de vida; lo que le envió fue La Escala. Le viene de ahí el sobrenombre: Klímax, escalera. Murió hacia el 649. El cuarto domingo de Gran Cuaresma la Iglesia lo conmemora, y en los monasterios su libro se lee entero durante esas semanas, año tras año.',
    works: [
      ['climaco-escala', 'La Escala del Paraíso', 'tratado'],
      ['climaco-pastor', 'Al pastor', 'tratado'],
    ],
  },
  {
    id: 'teodoro-estudita',
    name: 'San Teodoro Estudita',
    fullName: 'San Teodoro, higúmeno del monasterio de Estudion',
    century: 'siglos VIII-IX',
    feastDay: '11-11',
    biography:
      'Higúmeno de Estudion, en Constantinopla († 826). Reorganizó la vida monástica bizantina con una regla que fijaba el trabajo manual, la lectura y el oficio hasta en sus detalles, y su typikón acabó rigiendo, con variantes, en casi todo el Oriente: también en el Athos y en Rusia. Se enfrentó tres veces al poder imperial —una por un matrimonio ilegítimo del emperador, dos por los iconos— y otras tantas fue desterrado y azotado. Escribió cientos de cartas desde el destierro para sostener a los suyos, y organizó desde allí la resistencia. Es el modelo bizantino del monje que no se calla.',
    works: [
      ['estudita-catequesis', 'Catequesis menores', 'homilia'],
      ['estudita-cartas', 'Cartas', 'carta'],
      ['estudita-antirreticos', 'Discursos contra los iconoclastas', 'tratado'],
    ],
  },
  {
    id: 'simeon-nuevo-teologo',
    name: 'San Simeón el Nuevo Teólogo',
    fullName: 'San Simeón el Nuevo Teólogo, higúmeno de San Mamás',
    century: 'siglos X-XI',
    feastDay: '10-12',
    biography:
      'Funcionario de la corte bizantina que a los veintisiete años dejó el mundo por el monasterio de Estudion y acabó siendo higúmeno de San Mamás, en Constantinopla († 1022). Es el tercero y último a quien la Iglesia ha dado el nombre de Teólogo, después del apóstol Juan y de Gregorio Nacianceno. Su insistencia en que la experiencia consciente de Dios es lo normal del cristiano —y no un privilegio de los antiguos— le enfrentó con las autoridades eclesiásticas de su tiempo, que lo desterraron a la otra orilla del Bósforo. Murió fuera de la ciudad; treinta años después sus reliquias volvieron a ella.',
    works: [
      ['simeon-himnos', 'Himnos del amor divino', 'sentencias'],
      ['simeon-catequesis', 'Catequesis', 'homilia'],
      ['simeon-capitulos', 'Capítulos teológicos y prácticos', 'sentencias'],
    ],
  },
  {
    id: 'nicodemo-hagiorita',
    name: 'San Nicodemo el Hagiorita',
    fullName: 'San Nicodemo del Monte Athos',
    century: 'siglo XVIII',
    feastDay: '07-14',
    biography:
      'Monje del Monte Athos († 1809) y el editor más importante que ha tenido la ortodoxia. Con san Macario de Corinto reunió y publicó en Venecia, en 1782, la Filocalia: una antología de textos sobre la oración que abarcaba mil años y que estaba dispersa en manuscritos de monasterios. También compiló el Pedalion, la colección comentada de los cánones, y adaptó al uso ortodoxo libros espirituales de origen occidental. Vivió sus últimos años en una celda diminuta, escribiendo sin parar y prestando sus libros a quien se los pedía.',
    works: [
      ['nicodemo-filocalia', 'La Filocalia', 'sentencias'],
      ['nicodemo-guerra-invisible', 'Guerra invisible', 'tratado'],
      ['nicodemo-pedalion', 'El Pedalion', 'tratado'],
    ],
  },
  {
    id: 'ignacio-brianchaninov',
    name: 'San Ignacio Briantchaninov',
    fullName: 'San Ignacio Briantchaninov, obispo del Cáucaso',
    century: 'siglo XIX',
    feastDay: '04-30',
    biography:
      'Oficial de ingenieros de la nobleza rusa que dejó una carrera brillante por el monasterio, contra la voluntad expresa del zar Nicolás I († 1867). Fue higúmeno de la Sergievskaya Pustyn, junto a San Petersburgo, y luego obispo del Cáucaso. Escribió para un público nuevo: laicos cultos del siglo XIX que querían rezar en serio y no tenían quien les enseñara. Su tesis constante es que la época carece ya de guías espirituales de verdad y que, a falta de ellos, hay que atenerse a los escritos de los Padres con extrema prudencia. Se retiró enfermo a un monasterio y allí terminó sus obras.',
    works: [
      ['brianchaninov-ofrenda', 'Ofrenda a los monjes de hoy', 'tratado'],
      ['brianchaninov-arrepentimiento', 'La oración de Jesús', 'tratado'],
    ],
  },
  {
    id: 'justino-popovic',
    name: 'San Justino Popović',
    fullName: 'San Justino de Ćelije',
    century: 'siglo XX',
    feastDay: '06-01',
    biography:
      'Teólogo serbio († 1979). Formado en Oxford y en Atenas, fue apartado de la cátedra por el régimen comunista y pasó los últimos treinta años de su vida confinado en el monasterio de Ćelije, celebrando a diario y escribiendo. Su Dogmática es la exposición sistemática más ambiciosa de la teología ortodoxa del siglo XX, y su crítica del humanismo europeo —que él llamaba «el hombre sin Dios»— es de las más duras que se han escrito desde dentro de la tradición. Tradujo al serbio a los Padres griegos y compuso una Vida de los santos en doce tomos. Fue canonizado en 2010.',
    works: [
      ['justino-dogmatica', 'Dogmática de la Iglesia ortodoxa', 'tratado'],
      ['justino-abismos', 'El hombre y el Dios-hombre', 'tratado'],
    ],
  },
  {
    id: 'sofronio-essex',
    name: 'San Sofronio de Essex',
    fullName: 'San Sofronio Sájarov, archimandrita',
    century: 'siglo XX',
    feastDay: '07-11',
    biography:
      'Pintor ruso emigrado a París que abandonó el arte por la oración y entró en el monasterio de San Panteleimón del Monte Athos († 1993). Allí fue discípulo de san Silvano durante ocho años y, tras su muerte, publicó sus cuadernos con un comentario que es en sí mismo una obra teológica. Vivió después en una cueva de Karoulia y acabó fundando en Essex, en Inglaterra, un monasterio con comunidad de hombres y mujeres, uno de los primeros de tradición athonita en Occidente. Fue canonizado en 2019.',
    works: [
      ['sofronio-silvano', 'San Silvano del Monte Athos', 'tratado'],
      ['sofronio-ver-a-dios', 'Ver a Dios como Él es', 'tratado'],
    ],
  },
];
