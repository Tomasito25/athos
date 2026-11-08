/**
 * Tercera parte: el amor. Los mandamientos.
 *
 * La última de las tres. La fe se enseña sobre el Símbolo, la esperanza sobre
 * el Padre Nuestro y las Bienaventuranzas, y el amor sobre la Ley: los dos
 * mandamientos en que Cristo la resumió y los diez de Moisés, que son su
 * desarrollo.
 *
 * Sobre la numeración: la ortodoxa sigue la de Filón y la de los Padres
 * griegos, que cuenta como primero «no tendrás otros dioses» y como segundo
 * «no te harás imagen para adorarla», y deja los dos deseos —la mujer y los
 * bienes del prójimo— juntos en el décimo. La numeración católica romana y la
 * luterana unen los dos primeros y parten el último en dos. Es la misma Ley
 * contada de otra manera, y conviene saberlo antes de discutir por un número.
 */
import type { CatechismEntry } from './catechism';

export const LOVE_ENTRIES: CatechismEntry[] = [
  {
    id: 'los-dos-mandamientos',
    question: '¿Cuál es el mandamiento más grande?',
    level: 'nuevo',
    answer: [
      'Se lo preguntaron a Cristo para ponerlo a prueba, y respondió con dos: amar a Dios con todo el corazón, con toda el alma y con toda la mente, y amar al prójimo como a uno mismo. Y añadió que de esos dos penden toda la Ley y los Profetas.',
      'No son dos amores separados. San Juan lo dice con dureza: el que no ama a su hermano, a quien ve, no puede amar a Dios, a quien no ve. La medida del primero es el segundo, y no al revés.',
      'Los diez mandamientos son el desarrollo de esos dos: los cuatro primeros dicen cómo se ama a Dios y los seis restantes cómo se ama al prójimo. Por eso la tradición los enseña juntos y en este orden.',
    ],
    scripture: ['Mateo 22, 37-40', '1 Juan 4, 20'],
  },
  {
    id: 'mandamiento-1',
    question: '¿Qué manda el primero, «No tendrás otros dioses delante de mí»?',
    level: 'nuevo',
    answer: [
      'Manda conocer al verdadero Dios y honrarlo sólo a Él. Y prohíbe no sólo adorar ídolos de piedra, que es la lectura fácil, sino poner en el sitio de Dios cualquier otra cosa: el dinero, el trabajo, un hijo, la propia imagen, una causa. San Pablo llama expresamente idolatría a la avaricia.',
      'Contra este mandamiento van también la superstición, la adivinación, la astrología y el ocultismo, que los cánones antiguos castigaban con años de exclusión de la comunión. No porque la Iglesia crea que funcionan, sino porque cambian de sitio la confianza.',
      'Y una falta que suele pasar desapercibida: la desesperación. Dar por hecho que Dios no puede o no quiere perdonarme es también una manera de negarle lo que es.',
    ],
    scripture: ['Éxodo 20, 2-3', 'Colosenses 3, 5', 'Deuteronomio 18, 10-12'],
  },
  {
    id: 'mandamiento-2',
    question: '¿Qué manda el segundo, «No te harás imagen para postrarte ante ella»?',
    level: 'catecumeno',
    answer: [
      'Es el mandamiento que se esgrime contra los iconos, así que conviene leerlo entero. Lo que prohíbe es hacerse una imagen **para adorarla como a Dios**: el becerro de oro, no la representación en sí.',
      'La prueba está en el mismo Éxodo: pocos capítulos después de este mandamiento, Dios manda hacer dos querubines de oro sobre el arca y bordar otros en el velo. No puede prohibir en un capítulo lo que manda en otro; lo que prohíbe es otra cosa.',
      'El argumento decisivo, sin embargo, es posterior: en el Antiguo Testamento no se podía representar a Dios porque nadie lo había visto. Desde la encarnación sí, porque tiene rostro. Y la Iglesia distingue la adoración —latría, sólo a Dios— de la veneración, que pasa por la imagen hasta la persona representada. El Séptimo Concilio Ecuménico lo definió así el año 787.',
    ],
    scripture: ['Éxodo 20, 4-5', 'Éxodo 25, 18-20', 'Juan 1, 18'],
    disputed:
      'Las confesiones protestantes leen este mandamiento como una prohibición de las imágenes religiosas, y algunas unen los dos primeros en uno solo. La respuesta ortodoxa es la del Séptimo Concilio: se venera al representado, no la tabla, y la encarnación cambió lo que se puede representar.',
    seeAlso: [{ label: 'Los iconos', path: '/biblioteca/iconos' }],
  },
  {
    id: 'mandamiento-3',
    question: '¿Qué manda el tercero, «No tomarás el nombre de Dios en vano»?',
    level: 'nuevo',
    answer: [
      'Prohíbe usar el nombre de Dios a la ligera: en el juramento falso, en la blasfemia, en la maldición, y también en la costumbre de meterlo en cualquier frase sin pensar. La Escritura añade que no quedará sin castigo quien lo haga, y es de los pocos mandamientos que lleva esa coletilla.',
      'Hay una falta menos evidente que los Padres incluyen aquí: rezar sin atención. Decir palabras sagradas con la cabeza en otro sitio es también tomar el nombre en vano, y le pasa a todo el mundo. No se resuelve rezando menos, sino volviendo a empezar cada vez que uno se da cuenta.',
      'Sobre el juramento, el Evangelio va más lejos que la Ley: no juréis en absoluto, sino que vuestro sí sea sí y vuestro no, no. La Iglesia ha admitido con todo el juramento ante los tribunales, por necesidad civil, y lo trata como una concesión y no como un derecho.',
    ],
    scripture: ['Éxodo 20, 7', 'Mateo 5, 34-37', 'Isaías 29, 13'],
  },
  {
    id: 'mandamiento-4',
    question: '¿Qué manda el cuarto, «Acuérdate del día de reposo»?',
    level: 'catecumeno',
    answer: [
      'Manda dedicar un día de cada siete a Dios. Los cristianos no lo guardan el sábado sino el domingo, y no por comodidad: porque es el día de la Resurrección, y desde el principio se llamó el día del Señor, kyriakè hēméra.',
      'Santificarlo no es sólo no trabajar. Es ir a la Liturgia —que es lo que hace del domingo un domingo—, y dedicar el resto del día a lo que la semana no deja: leer, visitar a un enfermo, estar con la familia, descansar de verdad.',
      'Y bajo este mandamiento entran los demás tiempos que la Iglesia señala: las fiestas y los ayunos. No como una carga añadida, sino porque un año sin ritmo se convierte en una sucesión de días iguales, y de eso no sale nada.',
    ],
    scripture: ['Éxodo 20, 8-11', 'Hechos 20, 7', 'Apocalipsis 1, 10'],
    seeAlso: [{ label: 'El calendario', path: '/calendario' }],
  },
  {
    id: 'mandamiento-5',
    question: '¿Qué manda el quinto, «Honra a tu padre y a tu madre»?',
    level: 'nuevo',
    answer: [
      'Es el primer mandamiento de la segunda tabla, la que trata del prójimo, y san Pablo hace notar que es el primero que lleva una promesa: para que te vaya bien y vivas muchos años sobre la tierra.',
      'Honrar es más que obedecer, y dura más: obedecer se acaba con la mayoría de edad, honrar no se acaba nunca. Incluye cuidarlos cuando ya no pueden, y también cuando cuidarlos cuesta.',
      'La tradición extiende este mandamiento a toda autoridad legítima: los mayores, los maestros, los que gobiernan, el padre espiritual. Con un límite que la Iglesia ha sostenido siempre y que le ha costado mártires: hay que obedecer a Dios antes que a los hombres. La obediencia no llega hasta el pecado.',
    ],
    scripture: ['Éxodo 20, 12', 'Efesios 6, 1-3', 'Hechos 5, 29'],
  },
  {
    id: 'mandamiento-6',
    question: '¿Qué manda el sexto, «No matarás»?',
    level: 'catecumeno',
    answer: [
      'Prohíbe quitar la vida a un inocente. Y el Evangelio lo lleva más adentro: el que se enoja contra su hermano es reo de juicio, porque el homicidio empieza mucho antes en el corazón. San Juan lo dice sin rodeos: todo el que aborrece a su hermano es homicida.',
      'Bajo este mandamiento la Iglesia trata el aborto —prohibido desde la Didajé, en el siglo I— y el suicidio, aunque en este segundo la práctica actual reconoce lo que los cánones antiguos no podían: que casi siempre ocurre en un estado de enfermedad que quita la libertad, y por tanto la culpa.',
      'Sobre la guerra, la ortodoxia nunca desarrolló una doctrina de la guerra justa. Lo más cercano es un canon atribuido a san Basilio que aparta de la comunión tres años al soldado que ha matado en combate, aunque fuera defendiéndose. Casi nunca se ha aplicado y nunca se ha derogado, y eso dice bastante: matar puede ser inevitable y no por eso deja de ser algo de lo que hay que curarse.',
    ],
    scripture: ['Éxodo 20, 13', 'Mateo 5, 21-22', '1 Juan 3, 15'],
    seeAlso: [{ label: 'Qué dice la Iglesia sobre la guerra', path: '/orar/oraciones/la-iglesia-y-la-guerra' }],
  },
  {
    id: 'mandamiento-7',
    question: '¿Qué manda el séptimo, «No cometerás adulterio»?',
    level: 'catecumeno',
    answer: [
      'Prohíbe la infidelidad conyugal y, por extensión, toda relación sexual fuera del matrimonio. El Evangelio otra vez va más adentro: el que mira a una mujer para desearla ya adulteró con ella en su corazón.',
      'Conviene decir lo que este mandamiento **no** significa, porque se malinterpreta con facilidad: no es una condena del cuerpo ni del deseo. La ortodoxia no ha tenido nunca una teología que trate el placer como malo en sí, y condenó a los grupos antiguos que lo sostenían. El matrimonio es un sacramento, no una concesión a los débiles.',
      'La manera de tratar las faltas contra este mandamiento es la confesión, no el escrutinio. El confesor trabaja con lo que la persona trae, a su ritmo; que la norma sea clara no significa que su aplicación sea automática.',
    ],
    scripture: ['Éxodo 20, 14', 'Mateo 5, 27-28', 'Hebreos 13, 4'],
    seeAlso: [{ label: 'La sexualidad', path: '/biblioteca/catecismo/vida-diaria' }],
  },
  {
    id: 'mandamiento-8',
    question: '¿Qué manda el octavo, «No robarás»?',
    level: 'nuevo',
    answer: [
      'Prohíbe apropiarse de lo ajeno. Y la tradición patrística incluye aquí cosas que hoy no se llaman robo: el fraude, la usura, no pagar el jornal a tiempo, quedarse con lo que se encontró sabiendo de quién es, y vender por más de lo que vale aprovechando la necesidad del otro.',
      'San Basilio y san Juan Crisóstomo van más lejos y llaman robo a algo que incomoda: retener lo que sobra mientras otro no tiene. «El pan que guardas es del hambriento; el manto que tienes en el arca, del desnudo.» No es una hipérbole retórica: es la enseñanza patrística sobre la propiedad, y la Iglesia no la ha suavizado.',
      'La reparación forma parte del arrepentimiento. Confesar un robo sin devolver lo robado, cuando se puede devolver, no cierra nada.',
    ],
    scripture: ['Éxodo 20, 15', 'Efesios 4, 28', 'Santiago 5, 4'],
    seeAlso: [{ label: 'Qué dice la Iglesia sobre el dinero', path: '/biblioteca/catecismo/vida-diaria' }],
  },
  {
    id: 'mandamiento-9',
    question: '¿Qué manda el noveno, «No darás falso testimonio»?',
    level: 'nuevo',
    answer: [
      'Prohíbe mentir en perjuicio de otro: el testimonio falso ante un tribunal, la calumnia, la difamación y el chisme. La tradición ascética le dedica una atención desproporcionada respecto de su fama, porque es el pecado que más a mano tiene todo el mundo.',
      'Aquí entra también la murmuración: contar de otro lo que es verdad pero no hace falta decir. San Juan Clímaco la trata como una pasión propia y observa que se disfraza de compasión —«lo digo porque me da pena»— con más frecuencia que de malicia.',
      'Y el reverso: escuchar. Los Padres del desierto sostenían que el murmurador no puede existir sin oyente, y que el que corta la conversación hace más que el que se abstiene de empezarla.',
    ],
    scripture: ['Éxodo 20, 16', 'Santiago 4, 11', 'Proverbios 18, 21'],
  },
  {
    id: 'mandamiento-10',
    question: '¿Qué manda el décimo, «No codiciarás»?',
    level: 'catecumeno',
    answer: [
      'El único mandamiento del Decálogo que no prohíbe un acto sino un deseo: no codiciar la casa del prójimo, ni su mujer, ni nada de lo suyo. Por eso va al final, como resumen: cierra el círculo llevando la Ley del comportamiento a la intención.',
      'La numeración ortodoxa deja los dos deseos juntos en este mandamiento; la católica romana y la luterana los separan en un noveno y un décimo, y para cuadrar el número unen los dos primeros. Es la misma Ley contada de otra manera.',
      'La tradición ascética construye sobre este mandamiento toda su enseñanza del logismós, el pensamiento que llega: no es pecado que aparezca, lo es entretenerse con él. San Juan Clímaco describe los pasos con precisión —sugerencia, diálogo, consentimiento, cautiverio, pasión— y sostiene que la lucha se gana o se pierde en el segundo, no en el último.',
    ],
    scripture: ['Éxodo 20, 17', 'Santiago 1, 14-15'],
    seeAlso: [{ label: 'San Juan Clímaco', path: '/biblioteca/padres/juan-climaco' }],
  },
  {
    id: 'para-que-la-ley',
    question: 'Si Cristo nos libró de la Ley, ¿para qué los mandamientos?',
    level: 'iniciado',
    answer: [
      'Porque de lo que libró san Pablo no es de la ley moral sino de la ley como sistema de salvación: de la idea de que cumpliendo preceptos uno se gana a Dios. Eso es lo que no funciona, y por eso dice que nadie se justifica por las obras de la ley.',
      'Los mandamientos siguen valiendo, pero cambian de función. Ya no son la manera de conseguir la salvación: son la descripción de cómo vive el que la ha recibido. San Máximo el Confesor lo dice así: los mandamientos no son un precio, son un retrato.',
      'Y hay una advertencia clásica sobre esto que conviene tener cerca: cumplirlos todos y no tener amor no sirve de nada. Es literalmente lo que dice san Pablo en el capítulo trece de la primera a los Corintios, que es donde arranca esta tercera parte del catecismo. Por eso la Ley se enseña bajo el título del amor y no al revés.',
    ],
    scripture: ['Gálatas 2, 16', 'Juan 14, 15', '1 Corintios 13, 1-3'],
    seeAlso: [{ label: 'San Máximo el Confesor', path: '/biblioteca/padres/maximo-confesor' }],
  },
];
