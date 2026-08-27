/**
 * Qué es cada himno y cada oficio, y cómo está construido.
 *
 * Prosa de ATHOS, no texto litúrgico: por eso lleva su propia licencia y no la
 * de los libros de los que habla.
 *
 * Existe por el mismo motivo que los resúmenes de las obras patrísticas. Un
 * akáthistos cuya ficha sólo dice «contenido pendiente de incorporar» no
 * enseña nada a nadie. Mientras ATHOS no pueda incorporar una versión española
 * con licencia comprobada, al menos que se sepa qué es ese himno, cuándo se
 * canta, cómo está hecho por dentro y qué dice.
 */

export interface Explicacion {
  about: string;
  structure?: string;
}

export const HYMN_ABOUT: Record<string, Explicacion> = {
  /* ---------------- Akathistos ---------------- */
  'akathistos-theotokos': {
    about:
      'El himno akáthistos por excelencia, del siglo VI y atribuido a san Romano el Meloda. «Akáthistos» significa «no sentado»: se canta de pie, entero. Nació como acción de gracias de Constantinopla por haberse librado de un asedio, y su proemio —«A ti, invencible caudilla»— sigue siendo el canto de una ciudad agradecida. Es el modelo del que salen todos los demás akáthistos.',
    structure:
      'Veinticuatro estrofas alternas, una por cada letra del alfabeto griego: doce kontakia, que terminan en «Aleluya», y doce ikos, más largos, con doce saludos que empiezan por «Alégrate» y cierran con «Alégrate, Esposa no desposada». Se canta entero el quinto sábado de Gran Cuaresma, y por partes los cuatro viernes anteriores.',
  },
  'akathistos-jesus': {
    about:
      'Akáthistos al Dulcísimo Señor Jesús, compuesto en el ámbito eslavo y muy extendido en la piedad rusa y griega. Donde el de la Theotokos saluda a la Madre, éste invoca el Nombre: cada ikos termina llamando a Jesús con una cadena de títulos —Hijo de Dios, pastor, médico, luz—. Es la oración de Jesús desplegada en himno.',
    structure:
      'La misma forma que el de la Theotokos: doce kontakia y doce ikos, con «Aleluya» y el estribillo «Jesús, Hijo de Dios, ten piedad de mí». Se reza en cualquier momento; no está atado a un día del año.',
  },
  'akathistos-nicolas': {
    about:
      'Uno de los akáthistos a un santo más difundidos, sobre todo en Rusia y en Grecia. Recorre lo que se cuenta de san Nicolás —las dotes echadas por la ventana, los inocentes salvados del verdugo, los marineros socorridos— y de cada episodio saca un saludo. Se reza los jueves, día en que la semana litúrgica lo conmemora junto a los apóstoles.',
    structure:
      'Doce kontakia y doce ikos, como todos. El estribillo de los ikos es «Alégrate, Nicolás, gran taumaturgo».',
  },
  'akathistos-difuntos': {
    about:
      'Akáthistos por los que se han dormido en el Señor, de uso extendido en la tradición rusa. No es un lamento: pide descanso, y a la vez pone delante la esperanza de la resurrección. Se canta en los días de conmemoración de los difuntos y en los aniversarios.',
    structure:
      'Doce kontakia y doce ikos. El estribillo recurrente es «Da descanso, Señor, a tus siervos difuntos».',
  },
  'akathistos-pasion': {
    about:
      'Akáthistos a la Pasión de Cristo, que recorre paso a paso lo que ocurrió desde Getsemaní hasta el sepulcro: el sudor de sangre, el beso, el juicio, los azotes, la cruz, las tres horas de oscuridad. No narra desde fuera, como una crónica: en cada estación se detiene a decirle algo al que padece. Se reza sobre todo en Gran Cuaresma y en Semana Santa, junto a los oficios de esos días, y en muchas parroquias los viernes de todo el año.',
    structure:
      'Doce kontakia y doce ikos, con el estribillo «Jesús mío, Dios mío, gloria a Ti».',
  },

  /* ---------------- Cánones ---------------- */
  'gran-canon-andres': {
    about:
      'El canon más largo de la Iglesia ortodoxa: unas doscientas cincuenta estrofas de san Andrés de Creta, del siglo VIII. No cuenta la historia de la salvación desde fuera, sino que la aplica al que canta: va recorriendo el Antiguo y el Nuevo Testamento y en cada figura —Adán, Caín, Esaú, David, la hemorroísa— reconoce algo propio. «¿A quién me pareceré yo, alma mía?» es su pregunta constante.',
    structure:
      'Nueve odas, cada una con su irmos y sus estrofas, con el estribillo «Ten piedad de mí, oh Dios, ten piedad de mí» y una postración tras cada una. Se canta partido en cuatro durante la primera semana de Gran Cuaresma, y entero el jueves de la quinta semana, junto con la vida de santa María Egipcíaca.',
  },
  'canon-comunion': {
    about:
      'El canon que se reza antes de comulgar, parte del oficio de preparación junto con las oraciones antes de la Comunión. Alterna la conciencia de la propia indignidad con la confianza en que se acerca al que perdona: no es un examen que desanime, sino el modo en que la Iglesia enseña a acercarse sin ligereza y sin miedo.',
    structure:
      'Nueve odas —en la práctica ocho, porque la segunda se omite fuera de Cuaresma—, seguidas de las oraciones antes de la Comunión. Se reza la noche anterior o esa misma mañana.',
  },
  'canon-angel': {
    about:
      'Canon al Ángel de la Guarda, que se reza sobre todo antes de dormir y forma parte del oficio de preparación para la Comunión. Pide perdón por haberlo entristecido y le encomienda la noche. Es de los textos que mejor muestran hasta qué punto la tradición oriental cuenta con el ángel como con alguien presente.',
    structure: 'Nueve odas breves, con estribillo dirigido al ángel.',
  },
  'canon-theotokos-paraclisis': {
    about:
      'El Pequeño Paráclisis, el canon de súplica a la Madre de Dios. Se canta en la aflicción, en la enfermedad y por cualquier necesidad, y todas las tardes durante el ayuno de la Dormición, del 1 al 14 de agosto. Es probablemente el canon que más veces se ha cantado en la historia de la Iglesia ortodoxa.',
    structure:
      'Nueve odas con el estribillo «Santísima Theotokos, sálvanos», intercaladas con salmos y troparios. Hay también un Gran Paráclisis, que se usa en las mismas fechas alternando con éste.',
  },
  'canon-pascual': {
    about:
      'El canon de san Juan Damasceno que se canta en Maitines de Pascua, y el único que la Iglesia repite entero cada día durante toda la Semana Radiante. Es puro júbilo, sin una línea de penitencia: «Día de la resurrección, alegrémonos, pueblos». De él sale el irmos que todo ortodoxo reconoce, «Ilumínate, ilumínate, nueva Jerusalén».',
    structure:
      'Ocho odas —la segunda se omite—, cada una empezando por su irmos, con el estribillo «Cristo ha resucitado de entre los muertos». Se canta con las puertas abiertas y a toda voz.',
  },
};

/* ---------------- Oficios ---------------- */
export const OFFICE_ABOUT: Record<string, Explicacion> = {
  'liturgia-crisostomo': {
    about:
      'La Divina Liturgia que se celebra la mayor parte del año: unos trescientos días de los trescientos sesenta y cinco. Su forma actual se fijó en Constantinopla entre los siglos IX y XIV, aunque su núcleo —la anáfora— es mucho más antiguo y lleva el nombre de san Juan Crisóstomo desde entonces. Es más breve que la de san Basilio, sobre todo en las oraciones que el sacerdote dice en voz baja.',
    structure:
      'Tres partes. La Proscomidia, preparación de los dones, que ocurre antes y aparte. La Liturgia de los catecúmenos, con las antífonas, la Pequeña Entrada, la Epístola y el Evangelio. Y la Liturgia de los fieles, con la Gran Entrada, el Símbolo de la Fe, la anáfora —donde se invoca al Espíritu sobre los dones—, el Padre Nuestro y la Comunión.',
  },
  'liturgia-basilio': {
    about:
      'Se celebra sólo diez veces al año: los cinco domingos de Gran Cuaresma, el Jueves y el Sábado Santos, las vísperas de Navidad y de Teofanía, y el 1 de enero, día de su memoria. Su anáfora es de las más antiguas que se conservan y bastante más larga que la de Crisóstomo: recorre entera la historia de la salvación, desde la creación hasta la Iglesia. Por fuera, quien asiste apenas nota la diferencia; por dentro, el sacerdote reza mucho más.',
    structure:
      'La misma estructura que la de Crisóstomo. Cambian las oraciones de la anáfora, más extensas, y algunos himnos: en lugar de «Digno es en verdad» se canta «En ti se alegra».',
  },
  presantificados: {
    about:
      'No es propiamente una Liturgia, porque en ella no se consagra: se comulga de los dones consagrados el domingo anterior, de ahí el nombre. La Iglesia no celebra la Eucaristía en los días de ayuno estricto de Gran Cuaresma, pero tampoco quiere dejar al pueblo sin comunión, y de esa tensión nace este oficio. Lleva el nombre de san Gregorio Dialogista, papa de Roma.',
    structure:
      'Es una Vísperas a la que se añade la comunión. Se celebra los miércoles y viernes de Gran Cuaresma, y algunos otros días; siempre por la tarde, porque quien va a comulgar ha ayunado todo el día. En ella se canta «Ahora las potestades celestiales», y las lecturas son del Génesis y de los Proverbios, no del Evangelio.',
  },
  visperas: {
    about:
      'Con las Vísperas empieza el día litúrgico, porque el día bíblico empieza al atardecer: «Y fue la tarde y la mañana, un día». Por eso la fiesta del domingo empieza el sábado por la tarde. El oficio recorre la creación —salmo 103—, la caída, la promesa, y culmina con el cántico de Simeón, el anciano que ya puede morir en paz.',
    structure:
      'Salmo introductorio, letanía, «Señor, a Ti clamo» con sus estíquiras, la Entrada con el incienso, «Luz gozosa» —uno de los himnos cristianos más antiguos que se siguen cantando—, el prokímenon del día, las letanías y el cántico de Simeón.',
  },
  maitines: {
    about:
      'El oficio de la mañana, y el más largo del día. Empieza en la oscuridad con el Hexapsalmo —seis salmos que se escuchan de pie y en silencio, sin moverse— y termina con la Gran Doxología, cuando ya ha amanecido: «Gloria a Ti, que nos has mostrado la luz». Los domingos incluye la lectura de uno de los once Evangelios de la resurrección.',
    structure:
      'Hexapsalmo, la gran letanía, «Dios es el Señor» con los troparios, las kathismas del Salterio, el polieleos en las fiestas, el Evangelio de Maitines, el canon en nueve odas, los ainoi y la Gran Doxología.',
  },
  completas: {
    about:
      'El último oficio antes de dormir. Las Pequeñas Completas son breves y se rezan a diario; las Grandes Completas se usan en Gran Cuaresma y en las vísperas de las grandes fiestas, y en ellas se canta «Dios está con nosotros» y se lee la oración de Manasés. Terminan con el rito del perdón mutuo antes de retirarse.',
    structure:
      'Salmos 50, 69 y 142 en las Pequeñas; en las Grandes, tres partes con más salmos, el canto «Dios está con nosotros» y los troparios de compunción. Después, la oración de san Juan Damasceno ante el lecho y el perdón mutuo.',
  },
  medianoche: {
    about:
      'El oficio de medianoche, que en los monasterios se reza al levantarse, mucho antes del alba. Su sentido es la espera del Esposo que llega a deshora: «He aquí que el Esposo viene a medianoche». Es el oficio menos conocido fuera del monasterio, porque en las parroquias casi nunca se celebra.',
    structure:
      'Salmo 50, salmo 118 entero los días de diario, el Símbolo de la Fe, los troparios y las conmemoraciones. Los domingos cambia y se centra en la Trinidad.',
  },
  horas: {
    about:
      'Primera, Tercera, Sexta y Novena: cuatro oficios breves que reparten el día. Cada uno recuerda algo: la Tercera, la venida del Espíritu; la Sexta, la crucifixión; la Novena, la muerte del Señor. Están pensados para hacerse un hueco entre el trabajo, y por eso son cortos: tres salmos, un tropario y poco más.',
    structure:
      'Tres salmos fijos, el tropario y el kontakion del día, el Trisagio, cuarenta veces «Señor, ten piedad» y la oración de las Horas. En ATHOS, la Hora Sexta es el oficio del mediodía.',
  },
  moleben: {
    about:
      'Oficio breve de súplica por una necesidad concreta: la salud de alguien, un viaje, el comienzo del curso, una acción de gracias. Se celebra a petición de los fieles, fuera del ciclo fijo, y por eso es el oficio que más veces se adapta.',
    structure:
      'Gran letanía, «Dios es el Señor», el canon del santo o de la ocasión, el Evangelio, la letanía de súplica con los nombres y la despedida.',
  },
  paraclesis: {
    about:
      'El oficio de súplica a la Madre de Dios, construido alrededor del canon del Paráclisis. Se celebra en la aflicción, en la enfermedad y ante cualquier necesidad que se quiera poner en sus manos, y cada tarde durante los catorce días del ayuno de la Dormición. Es el oficio en el que se leen en voz alta los nombres de aquellos por quienes se pide, uno a uno, de modo que la asamblea entera reza por gente a la que no conoce.',
    structure:
      'Salmo 142, «Dios es el Señor», el canon del Pequeño Paráclisis con el estribillo «Santísima Theotokos, sálvanos», el Evangelio y la letanía con los nombres de aquellos por quienes se pide.',
  },
};
