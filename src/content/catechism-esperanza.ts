/**
 * Segunda parte: la esperanza. La oración, el Padre Nuestro y las
 * Bienaventuranzas.
 *
 * Si la fe se enseña sobre el Símbolo, la esperanza se enseña sobre lo que el
 * Señor mismo dio: la oración que enseñó a sus discípulos y las nueve
 * bienaventuranzas con que abrió el Sermón de la Montaña. El catecismo clásico
 * las trata así desde hace siglos, y con razón: son los dos únicos textos que
 * Cristo dictó palabra por palabra.
 *
 * El texto del Padre Nuestro no se transcribe aquí —está en Orar → Oraciones—:
 * esto es la explicación de cada petición.
 */
import type { CatechismEntry } from './catechism';

export const HOPE_ENTRIES: CatechismEntry[] = [
  {
    id: 'que-es-la-esperanza',
    question: '¿Qué es la esperanza cristiana?',
    level: 'nuevo',
    answer: [
      'No es optimismo ni el cálculo de que las cosas saldrán bien. Es la certeza de que Dios cuida de mi salvación y de que cumplirá lo que ha prometido, sostenida cuando las cosas no salen bien, que es cuando hace falta.',
      'Se distingue de la fe y del amor por lo que mira. La fe mira lo que Dios ha hecho; el amor, a Dios y al prójimo ahora; la esperanza, lo que aún no está. Por eso san Pablo dice que de las tres sólo el amor permanece: en el Reino ya no hará falta esperar nada.',
      'Y tiene dos medios, según el catecismo clásico: la oración, que es pedirla, y las bienaventuranzas, que son el camino por donde llega. De ahí que esta parte trate de esas dos cosas y de nada más.',
    ],
    scripture: ['1 Corintios 13, 13', 'Romanos 8, 24-25', '1 Pedro 1, 13'],
  },
  {
    id: 'que-es-la-oracion',
    question: '¿Qué es la oración?',
    level: 'nuevo',
    answer: [
      'La definición clásica es breve: elevar la mente y el corazón a Dios. Ni más ni menos. Ni un trámite, ni una fórmula mágica, ni un ejercicio de concentración.',
      'Tiene tres formas, y conviene saberlo porque casi todo el mundo empieza por la última y se queda ahí: la alabanza —decirle a Dios lo que es—, la acción de gracias —agradecerle lo recibido— y la petición —pedir lo que hace falta. Las tres son legítimas; la tradición sólo advierte que una vida de oración hecha únicamente de peticiones se seca.',
      'Y se puede rezar sin palabras. La oración interior, la del corazón, es la que sostiene la tradición hesicasta; la exterior es la que se dice con la boca y con el cuerpo. No se oponen: el hombre es cuerpo y alma, y reza entero. La oración exterior sin la interior, decían los Padres, no llega a ninguna parte.',
    ],
    scripture: ['Mateo 6, 6', '1 Tesalonicenses 5, 17'],
    seeAlso: [{ label: 'La oración de Jesús', path: '/orar/oracion-de-jesus' }],
  },
  {
    id: 'padrenuestro-invocacion',
    question: '¿Qué significa la invocación, «Padre nuestro, que estás en los cielos»?',
    level: 'nuevo',
    answer: [
      'La invocación, antes de pedir nada. Y lo primero que hay que ver es el atrevimiento: nadie tiene derecho por sí mismo a llamar Padre a Dios. Se puede porque el Hijo lo autorizó; por eso en la Liturgia el sacerdote la introduce diciendo «y concédenos que con confianza y sin condenación nos atrevamos a invocarte Padre».',
      'Y dice «nuestro», no «mío», incluso cuando se reza a solas. No hay oración cristiana privada en el sentido de excluyente: al decir Padre nuestro uno mete en la frase a todos los demás, incluidos aquellos con quienes no se habla.',
      '«Que estás en los cielos» no lo sitúa arriba. Es una indicación para el que reza: al empezar, deja lo de aquí abajo y levanta la mente. Dios no está lejos —está en todo lugar y todo lo llena—, pero el que reza sí necesita moverse.',
    ],
    scripture: ['Mateo 6, 9', 'Romanos 8, 15'],
    seeAlso: [{ label: 'El texto del Padre Nuestro', path: '/orar/oraciones/comienzo-habitual' }],
  },
  {
    id: 'peticion-1',
    question: '¿Qué se pide en «Santificado sea tu nombre»?',
    level: 'nuevo',
    answer: [
      'El nombre de Dios es santo en sí mismo y no puede hacerse más santo: nada de lo que hagamos le añade nada. Lo que se pide, entonces, es que sea santificado **en nosotros**, es decir, que se vea en cómo vivimos.',
      'De dos maneras, dice el catecismo. Primero, cuando el que lleva ese nombre en la cabeza y en el corazón vive como corresponde. Segundo, cuando otros, viendo esa vida, glorifican a Dios y no a él: «brille así vuestra luz delante de los hombres, para que vean vuestras buenas obras y glorifiquen a vuestro Padre».',
      'De ahí que la petición sea también, del revés, una advertencia. San Pablo cita a Isaías sin suavizarlo: por vuestra causa el nombre de Dios es blasfemado entre las naciones. Un cristiano que vive mal no perjudica sólo a su alma.',
    ],
    scripture: ['Mateo 5, 16', 'Romanos 2, 24'],
  },
  {
    id: 'peticion-2',
    question: '¿Qué se pide en «Venga a nosotros tu reino»?',
    level: 'catecumeno',
    answer: [
      'El Reino de Dios no es un territorio ni una época futura. San Pablo lo define: justicia, paz y alegría en el Espíritu Santo. Y el Evangelio dice dónde está: dentro de vosotros, o entre vosotros —el griego admite las dos lecturas y la tradición ha guardado las dos.',
      'Se pide en tres sentidos a la vez, y el catecismo no elige entre ellos. Que venga ahora, secretamente, en el que reza. Que venga en el mundo, allí donde todavía reina otra cosa. Y que venga del todo al final, cuando Dios sea todo en todos.',
      'Una advertencia antigua sobre esta petición: en algunos manuscritos de san Lucas aparece «venga tu Espíritu Santo sobre nosotros y nos purifique», y varios Padres la citan así. No es la lectura recibida, pero indica cómo se entendía: pedir el Reino es pedir el Espíritu.',
    ],
    scripture: ['Romanos 14, 17', 'Lucas 17, 20-21'],
  },
  {
    id: 'peticion-3',
    question: '¿Qué se pide en «Hágase tu voluntad, así en la tierra como en el cielo»?',
    level: 'nuevo',
    answer: [
      'Es la petición más difícil de rezar de verdad, porque pedirla en serio es renunciar a algo. No se pide que Dios apruebe lo que uno ya ha decidido: se pide lo contrario.',
      'La razón que da el catecismo es sobria y no piadosa: nos equivocamos constantemente en lo que deseamos, y Dios no. No se pide por resignación ante lo inevitable, sino porque el que pide sabe que su propio juicio sobre lo que le conviene es poco fiable.',
      '«Como en el cielo» da la medida: allí los ángeles y los santos la cumplen todos, siempre y en todo. Ésa es la vara, y por eso la petición no se agota nunca.',
    ],
    scripture: ['Mateo 26, 39', 'Salmo 142, 10'],
    seeAlso: [{ label: 'Ante una decisión', path: '/orar/oraciones/ante-una-decision' }],
  },
  {
    id: 'peticion-4',
    question: '¿Qué se pide en «Danos hoy nuestro pan de cada día»?',
    level: 'catecumeno',
    answer: [
      'La palabra que se traduce «de cada día» es epioúsios, y es un enigma: no aparece en ningún otro texto griego anterior. Puede significar «necesario para subsistir», «para el día de hoy» o «suprasustancial», es decir, el pan que está por encima de toda sustancia. La Iglesia ha leído las tres a la vez y nunca ha elegido.',
      'En el primer sentido, se pide lo necesario y no más: comida, ropa, techo. Lo que pase de ahí, dice el catecismo, se deja a la voluntad de Dios, y si no llega, se le da gracias igual. La petición es un freno tanto como una súplica.',
      'En el segundo, se pide sólo para hoy, porque no hay que angustiarse por mañana. Y en el tercero, el pan es el Cuerpo de Cristo: el hombre está hecho de cuerpo y alma, y el alma también pasa hambre.',
    ],
    scripture: ['Mateo 6, 34', 'Juan 6, 55', 'Proverbios 30, 8'],
  },
  {
    id: 'peticion-5',
    question: '¿Qué se pide en «Perdónanos nuestras deudas, como nosotros perdonamos»?',
    level: 'nuevo',
    answer: [
      'La única petición con una condición dentro, y el Señor se detuvo a subrayarla después de enseñarla: si perdonáis, se os perdonará; si no perdonáis, tampoco a vosotros. No es una amenaza, es una descripción de cómo funciona: quien tiene el puño cerrado no puede recibir nada.',
      'Se llaman deudas y no faltas porque lo hemos recibido todo de Dios y estamos obligados a devolvérselo; al no hacerlo quedamos debiéndolo. Y «nuestros deudores» son los que no nos dieron lo que la ley del amor les pedía: los que en vez de amor nos mostraron enemistad.',
      'Los Padres avisan de una cosa incómoda: quien reza esta petición sin haber perdonado está pidiendo, literalmente, que no se le perdone. San Juan Crisóstomo decía que era mejor callarse esa línea que decirla con rencor. La Iglesia, sin embargo, no la quita: la deja ahí para que incomode.',
    ],
    scripture: ['Mateo 6, 14-15', 'Mateo 18, 32-35'],
    seeAlso: [{ label: 'Por los enemigos', path: '/orar/oraciones/por-los-enemigos' }],
  },
  {
    id: 'peticion-6',
    question: '¿Qué se pide en «Y no nos dejes caer en la tentación»?',
    level: 'catecumeno',
    answer: [
      'La traducción literal del griego sería «no nos metas en tentación», y eso ha inquietado a los lectores desde el principio, porque Santiago dice expresamente que Dios no tienta a nadie. La tradición ha entendido siempre la frase como «no permitas que entremos» o «no nos dejes caer en ella», que es lo que dicen la mayoría de las versiones españolas.',
      'No se pide una vida sin pruebas: eso no se le concede a nadie y la Escritura las llama necesarias. Se pide no ser probado por encima de las fuerzas, y no quedarse dentro de la prueba.',
      'Y hay una distinción práctica que los Padres repiten: una cosa es la tentación que llega y otra la que uno se busca. Rezar esta petición y ponerse después en la ocasión es, decía san Juan Clímaco, pedir a Dios que le salve a uno del agua mientras se tira al río.',
    ],
    scripture: ['Santiago 1, 13-14', '1 Corintios 10, 13'],
    disputed:
      'En 2017 la Iglesia católica romana modificó su traducción litúrgica al «no nos dejes caer en la tentación», que es lo que las Iglesias ortodoxas de lengua española venían diciendo. El griego del Evangelio no ha cambiado; lo que se discute es cómo verterlo sin sugerir que Dios tienta.',
  },
  {
    id: 'peticion-7',
    question: '¿Qué se pide en «Mas líbranos del maligno»?',
    level: 'catecumeno',
    answer: [
      'El griego admite «del mal» en abstracto o «del maligno» en persona, y la tradición oriental lee lo segundo: no se pide librarse de las desgracias, sino de aquel que quiere nuestra perdición.',
      'Eso cambia el sentido de la petición entera. No se pide una vida sin dificultades —la Iglesia no ha prometido nunca eso—, sino no caer en manos del enemigo; y de hecho muchos santos pasaron por todas las desgracias posibles y esta petición les fue concedida.',
      'Con ella termina lo que se pide, y el orden no es casual: se empezó por el nombre de Dios y se acaba por la propia miseria. La oración del Señor va de arriba abajo, y sólo cuando ha puesto a Dios en su sitio se atreve a hablar de uno mismo.',
    ],
    scripture: ['Juan 17, 15', '2 Tesalonicenses 3, 3'],
  },
  {
    id: 'doxologia',
    question: '¿Por qué la doxología final la dice el sacerdote y no el pueblo?',
    level: 'catecumeno',
    answer: [
      'No la dice el pueblo, la dice el sacerdote, y eso extraña a quien viene de otra confesión. En el uso bizantino el Padre Nuestro lo reza la asamblea y el celebrante lo remata con esta exclamación.',
      'La razón de que esté es litúrgica antes que textual: los manuscritos más antiguos del Evangelio de Mateo no la traen, y por eso las Biblias críticas la ponen en nota. Pero está en la Didajé, un texto del siglo I, lo que significa que los cristianos la decían antes de que se fijara el Evangelio.',
      'Y cierra la oración devolviendo el peso a donde estaba: después de siete peticiones sobre lo que nos falta, la última palabra no es nuestra necesidad sino su reino.',
    ],
    disputed:
      'Las Biblias protestantes suelen incluirla en el texto y las católicas la separan de él; las ediciones críticas coinciden en que es un añadido litúrgico antiquísimo y no parte del Evangelio original. La Iglesia ortodoxa la reza sin discutirlo, porque su lugar nunca fue el libro sino el oficio.',
  },
  {
    id: 'que-son-bienaventuranzas',
    question: '¿Qué son las Bienaventuranzas?',
    level: 'nuevo',
    answer: [
      'Las nueve frases con que Cristo abre el Sermón de la Montaña, y con las que la Iglesia enseña la esperanza: describen quién es feliz de verdad, y la lista no coincide con ninguna que hubiéramos hecho nosotros.',
      'La palabra griega makários no significa «contento». Significa dichoso en el sentido más fuerte, el que se aplicaba a los dioses: alguien a quien no le falta nada. Decir eso de un pobre, de uno que llora o de un perseguido es una provocación deliberada, y así se entendió desde el principio.',
      'En la Liturgia bizantina se cantan durante la pequeña entrada, intercaladas con troparios, y muchos las oyen cada domingo sin saber de dónde son.',
    ],
    scripture: ['Mateo 5, 3-12'],
  },
  {
    id: 'bienaventuranzas-1-3',
    question: '¿Qué dicen las tres primeras bienaventuranzas?',
    level: 'nuevo',
    answer: [
      '**Bienaventurados los pobres de espíritu.** No los tontos ni los apocados: los que no se apoyan en lo que tienen ni en lo que son. Ser pobre de espíritu es saber que uno no se sostiene solo, y ésa es la puerta de todo lo demás; por eso va primero.',
      '**Bienaventurados los que lloran.** No cualquier tristeza: la que nace de ver el propio pecado y el mal del mundo. Los Padres la llaman penthos y la distinguen con cuidado del desánimo, que hunde. Ésta deja el alma ligera.',
      '**Bienaventurados los mansos.** La mansedumbre no es blandura ni cobardía; es la fuerza que no necesita imponerse. Moisés es llamado el más manso de los hombres y no era un hombre tímido. «Heredarán la tierra»: los violentos la ocupan, los mansos la heredan.',
    ],
    scripture: ['Mateo 5, 3-5', 'Números 12, 3'],
  },
  {
    id: 'bienaventuranzas-4-6',
    question: '¿Qué dicen las bienaventuranzas cuarta, quinta y sexta?',
    level: 'nuevo',
    answer: [
      '**Bienaventurados los que tienen hambre y sed de justicia.** No se dice «los justos» sino los que tienen hambre de serlo. Lo que se declara dichoso es el deseo, no el logro, y eso deja la puerta abierta a quien todavía no ha llegado a ninguna parte.',
      '**Bienaventurados los misericordiosos.** Es la única bienaventuranza cuya recompensa es lo mismo que se pide: alcanzarán misericordia. Vuelve a aparecer aquí la ley de la quinta petición del Padre Nuestro, y no por casualidad.',
      '**Bienaventurados los limpios de corazón, porque verán a Dios.** La pureza no es sólo la del cuerpo: es tener el corazón sin doblez, sin dos intenciones a la vez. Y la promesa es la mayor de las nueve, porque ver a Dios es aquello para lo que el hombre fue hecho.',
    ],
    scripture: ['Mateo 5, 6-8', 'Salmo 23, 3-4'],
  },
  {
    id: 'bienaventuranzas-7-9',
    question: '¿Qué dicen las tres últimas bienaventuranzas?',
    level: 'catecumeno',
    answer: [
      '**Bienaventurados los que trabajan por la paz, porque serán llamados hijos de Dios.** No los pacíficos, que es más fácil: los que hacen la paz donde no la hay. Y el título que reciben es el más alto que da el Evangelio.',
      '**Bienaventurados los perseguidos por causa de la justicia.** La octava, y aquí el Sermón cambia de tono. Hasta ahora hablaba en tercera persona; en la novena pasa a la segunda: «bienaventurados vosotros cuando os injurien y os persigan y digan contra vosotros toda clase de mal, mintiendo, por mi causa».',
      'Conviene una precisión que ahorra bastante daño: se dice «por causa de la justicia» y «mintiendo». No toda antipatía que uno se gana es persecución, y no toda incomodidad es martirio. La bienaventuranza es para quien lo padece injustamente, no para quien lo provoca.',
    ],
    scripture: ['Mateo 5, 9-12', '1 Pedro 4, 15-16'],
  },
];
