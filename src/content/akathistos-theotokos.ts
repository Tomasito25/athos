/**
 * El Himno Akáthistos a la Santísima Theotokos, entero.
 *
 * Es el himno mariano más antiguo que se canta sin interrupción desde el siglo
 * VI, y el modelo de todos los demás akathistos. Veinticuatro estrofas cuyas
 * iniciales siguen el alfabeto griego de la alfa a la omega: doce ikoi, que
 * terminan con doce saludos y el estribillo «Alégrate, Esposa no desposada», y
 * doce kontakia, que terminan con «Aleluya». Delante va el proimion «A ti,
 * caudilla defensora», añadido en el año 626 tras el asedio de Constantinopla.
 *
 * Sobre esta versión, y hay que decirlo antes de leerla:
 *
 * El original griego es de dominio público y tiene mil quinientos años. Lo que
 * no está disponible con licencia compatible es una traducción española
 * publicada. Así que ésta la ha traducido ATHOS del griego, y eso significa
 * dos cosas: que el texto es auténtico —no hay una sola estrofa inventada— y
 * que la versión castellana es nuestra y no la que se canta en ninguna
 * parroquia concreta. Los saludos admiten lecturas distintas y las
 * traducciones publicadas difieren entre sí; ésta es una más, hecha con
 * cuidado y sin cotejar todavía con una edición crítica.
 *
 * Quien encuentre un error, que lo diga: para eso está dicho de dónde sale.
 */
import type { OfficeSection, SourceMeta, TextBlock } from '@/types';

export const AKATHISTOS_META: SourceMeta = {
  author: 'Anónimo del siglo VI; atribuido a san Romano el Meloda y a san Germán de Constantinopla',
  title: 'Ὕμνος Ἀκάθιστος',
  source:
    'Himno Akáthistos, del Triodion. Traducción al español hecha para ATHOS a partir del original griego, que es de dominio público',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'cc-by-sa-4.0',
  dateAdded: '2026-09-01',
  copyright:
    'Texto litúrgico del siglo VI; el original griego es de dominio público. Esta versión española es una traducción hecha para ATHOS y se publica bajo CC BY-SA 4.0.',
  notes:
    'El texto es auténtico y está completo: veinticuatro estrofas y el proimion. Lo que es de ATHOS es la traducción, que no procede de ningún libro litúrgico español publicado y no ha sido cotejada todavía con una edición crítica del griego. Las traducciones publicadas del Akáthistos difieren entre sí, sobre todo en los saludos.',
};

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });

/** El estribillo de los ikoi. */
const SALUDO = 'Alégrate, Esposa no desposada.';
/** El de los kontakia. */
const ALELUYA = 'Aleluya.';

/** Un ikos: su relato, sus doce saludos y el estribillo. */
const ikos = (id: string, letra: string, relato: string, saludos: string[]): OfficeSection => ({
  id,
  title: `Ikos ${id.replace('ikos-', '')} · ${letra}`,
  blocks: [
    t(relato),
    ...saludos.map((linea) => t(linea)),
    ref(SALUDO),
  ],
});

/** Un kontakion: su relato y el Aleluya. */
const kontakion = (id: string, letra: string, relato: string): OfficeSection => ({
  id,
  title: `Kontakion ${id.replace('kontakion-', '')} · ${letra}`,
  blocks: [t(relato), ref(ALELUYA)],
});

export const AKATHISTOS_SECTIONS: OfficeSection[] = [
  {
    id: 'como-se-canta',
    title: 'Cómo se canta',
    blocks: [
      rub('Akáthistos significa «de pie»: es el himno que se escucha sin sentarse. En Cuaresma se canta por cuartas partes los cinco primeros viernes, y entero el quinto, en el oficio llamado Sábado del Akáthistos.'),
      rub('Los ikoi terminan siempre con «Alégrate, Esposa no desposada»; los kontakia, con «Aleluya», que se dice tres veces.'),
      rub('Las veinticuatro estrofas empiezan por las veinticuatro letras del alfabeto griego, de la alfa a la omega. La letra va indicada en cada título.'),
    ],
  },

  {
    id: 'proimion',
    title: 'Proimion',
    blocks: [
      rub('No forma parte del acróstico: se añadió en el año 626, cuando Constantinopla se vio libre del asedio ávaro, y desde entonces abre el himno.'),
      t('A ti, caudilla defensora, los cantos de victoria; a ti, que me libraste de lo terrible, las acciones de gracias te dedico yo, tu ciudad, oh Theotokos. Y tú, que tienes un poder invencible, líbrame de toda clase de peligros, para que te aclame: Alégrate, Esposa no desposada.'),
    ],
  },

  ikos('ikos-1', 'Α', 'Un ángel de los primeros fue enviado del cielo para decir a la Theotokos «Alégrate». Y viéndote, Señor, hecho carne al son de aquella voz incorpórea, quedó fuera de sí y se detuvo, aclamándola así:', [
    'Alégrate, tú por quien resplandece la alegría; alégrate, tú por quien se apaga la maldición.',
    'Alégrate, llamamiento de Adán caído; alégrate, rescate de las lágrimas de Eva.',
    'Alégrate, altura inaccesible a los pensamientos humanos; alégrate, hondura que ni los ojos de los ángeles alcanzan.',
    'Alégrate, porque eres el trono del Rey; alégrate, porque llevas al que todo lo lleva.',
    'Alégrate, estrella que anuncia el sol; alégrate, seno de la encarnación divina.',
    'Alégrate, tú por quien se renueva la creación; alégrate, tú por quien el Creador se hace niño.',
  ]),

  kontakion('kontakion-2', 'Β', 'Viéndose la santa en su pureza, dice a Gabriel con firmeza: «Lo extraño de tu palabra le resulta a mi alma difícil de admitir: ¿de un embarazo sin varón me anuncias un parto, y me clamas: Aleluya?»'),

  ikos('ikos-2', 'Γ', 'Buscando la Virgen conocer un conocimiento que no se conoce, gritó al ministro: «De unas entrañas puras, ¿cómo es posible que nazca un hijo? Dímelo». Y él le respondió con temor, aclamándola así:', [
    'Alégrate, iniciada en el consejo inefable; alégrate, fe de lo que pide silencio.',
    'Alégrate, comienzo de los milagros de Cristo; alégrate, resumen de sus mandamientos.',
    'Alégrate, escala celestial por la que Dios bajó; alégrate, puente que lleva de la tierra al cielo.',
    'Alégrate, prodigio muy hablado de los ángeles; alégrate, herida muy llorada de los demonios.',
    'Alégrate, tú que engendraste inefablemente la Luz; alégrate, tú que a nadie enseñaste el cómo.',
    'Alégrate, tú que superas el saber de los sabios; alégrate, tú que alumbras el sentido de los fieles.',
  ]),

  kontakion('kontakion-3', 'Δ', 'El poder del Altísimo cubrió entonces con su sombra, para la concepción, a la que no conocía varón, y mostró su seno fecundo como un campo dulce para todos los que quieren cosechar la salvación, cantando así: Aleluya.'),

  ikos('ikos-3', 'Ε', 'Teniendo en su seno a Dios recibido, la Virgen corrió hacia Isabel; y el niño de ésta, reconociendo al punto el saludo, saltó de gozo, y con saltos como cantos aclamaba a la Theotokos:', [
    'Alégrate, sarmiento del brote que no se marchita; alégrate, campo del fruto que no se corrompe.',
    'Alégrate, tú que cultivas al Cultivador de los hombres; alégrate, tú que plantas al que planta nuestra vida.',
    'Alégrate, tierra que das a luz la abundancia de las misericordias; alégrate, mesa colmada de propiciación.',
    'Alégrate, porque haces florecer un prado de delicias; alégrate, porque preparas un refugio a las almas.',
    'Alégrate, incienso agradable de intercesión; alégrate, expiación del mundo entero.',
    'Alégrate, benevolencia de Dios hacia los mortales; alégrate, confianza de los mortales ante Dios.',
  ]),

  kontakion('kontakion-4', 'Ζ', 'Llevando dentro una tempestad de pensamientos contrarios, el casto José se turbó, mirándote a ti, la no casada, y sospechando en ti un desposorio robado, oh irreprochable. Pero al saber que tu concepción venía del Espíritu Santo, dijo: Aleluya.'),

  ikos('ikos-4', 'Η', 'Oyeron los pastores a los ángeles cantar la venida de Cristo en la carne, y corriendo hacia él como hacia un pastor, lo vieron como cordero sin mancha apacentado en el vientre de María, a la que cantaron:', [
    'Alégrate, madre del Cordero y del Pastor; alégrate, redil de las ovejas racionales.',
    'Alégrate, defensa contra los enemigos invisibles; alégrate, llave que abre las puertas del paraíso.',
    'Alégrate, porque el cielo se alegra con la tierra; alégrate, porque la tierra danza con el cielo.',
    'Alégrate, boca de los apóstoles que no calla; alégrate, valentía invencible de los mártires.',
    'Alégrate, sostén firme de la fe; alégrate, señal luminosa de la gracia.',
    'Alégrate, tú por quien quedó desnudo el infierno; alégrate, tú por quien fuimos vestidos de gloria.',
  ]),

  kontakion('kontakion-5', 'Θ', 'Habiendo visto los magos la estrella que corría hacia Dios, siguieron su resplandor; y teniéndola como una lámpara, buscaban con ella al Rey poderoso. Y al alcanzar al Inalcanzable, se alegraron, aclamándole: Aleluya.'),

  ikos('ikos-5', 'Ι', 'Vieron los hijos de los caldeos en las manos de la Virgen al que con su mano formó a los hombres; y reconociéndolo como Señor, aunque había tomado la forma de siervo, se apresuraron a honrarlo con sus dones y a aclamar a la Bendita:', [
    'Alégrate, madre del astro que no se pone; alégrate, aurora del día místico.',
    'Alégrate, tú que apagaste el horno del engaño; alégrate, tú que iluminas a los iniciados en la Trinidad.',
    'Alégrate, tú que echaste del poder al tirano inhumano; alégrate, tú que mostraste al Señor que ama a los hombres.',
    'Alégrate, tú que nos libras del culto de los bárbaros; alégrate, tú que nos sacas de las obras del fango.',
    'Alégrate, tú que hiciste cesar la adoración del fuego; alégrate, tú que nos libras de la llama de las pasiones.',
    'Alégrate, guía de los fieles hacia la templanza; alégrate, gozo de todas las generaciones.',
  ]),

  kontakion('kontakion-6', 'Κ', 'Convertidos en heraldos portadores de Dios, volvieron los magos a Babilonia, cumpliendo tu oráculo y anunciándote a todos como Cristo, dejando a Herodes como a un necio que no sabía cantar: Aleluya.'),

  ikos('ikos-6', 'Λ', 'Haciendo brillar en Egipto la luz de la verdad, expulsaste las tinieblas de la mentira; porque sus ídolos, oh Salvador, no soportando tu fuerza, cayeron, y los que de ellos se vieron libres aclamaban a la Theotokos:', [
    'Alégrate, enderezamiento de los hombres; alégrate, caída de los demonios.',
    'Alégrate, tú que pisaste el engaño de la mentira; alégrate, tú que desenmascaraste el fraude de los ídolos.',
    'Alégrate, mar que anegó al faraón espiritual; alégrate, roca que diste de beber a los sedientos de vida.',
    'Alégrate, columna de fuego que guía a los que están en tinieblas; alégrate, protección del mundo más ancha que la nube.',
    'Alégrate, alimento que sucede al maná; alégrate, servidora del deleite santo.',
    'Alégrate, tierra de la promesa; alégrate, tú de quien mana leche y miel.',
  ]),

  kontakion('kontakion-7', 'Μ', 'Cuando Simeón estaba a punto de dejar este siglo engañoso, le fuiste entregado como niño, y te reconoció como Dios perfecto. Por eso quedó asombrado de tu sabiduría inefable, clamando: Aleluya.'),

  ikos('ikos-7', 'Ν', 'Una creación nueva mostró el Creador, apareciéndose a nosotros, sus criaturas: brotó de un seno sin simiente y lo guardó incorrupto como era, para que, viendo el prodigio, la cantáramos, aclamando:', [
    'Alégrate, flor de la incorrupción; alégrate, corona de la continencia.',
    'Alégrate, tú que haces brillar la imagen de la resurrección; alégrate, tú que muestras la vida de los ángeles.',
    'Alégrate, árbol de fruto hermoso del que se alimentan los fieles; alégrate, ramaje frondoso bajo el que muchos se cobijan.',
    'Alégrate, tú que llevaste en el seno al guía de los extraviados; alégrate, tú que engendraste al que redime a los cautivos.',
    'Alégrate, súplica ante el Juez justo; alégrate, perdón de muchos que caen.',
    'Alégrate, vestidura de los que están desnudos de confianza; alégrate, ternura que vence a todo deseo.',
  ]),

  kontakion('kontakion-8', 'Ξ', 'Habiendo visto un parto extraño, hagámonos extraños al mundo, poniendo la mente en el cielo; porque para esto el Dios altísimo apareció en la tierra como hombre humilde, queriendo atraer hacia lo alto a los que le aclaman: Aleluya.'),

  ikos('ikos-8', 'Ο', 'Entero estaba entre los de abajo y en nada se apartó de los de arriba el Verbo incircunscrito; porque hubo un descenso divino y no un cambio de lugar, y un nacimiento de una Virgen que había recibido a Dios y que oye esto:', [
    'Alégrate, espacio del Dios que no cabe en espacio; alégrate, puerta del misterio venerable.',
    'Alégrate, noticia dudosa para los que no creen; alégrate, orgullo indudable de los que creen.',
    'Alégrate, carro santísimo del que se sienta sobre los querubines; alégrate, morada hermosísima del que está sobre los serafines.',
    'Alégrate, tú que reúnes lo contrario en una misma cosa; alégrate, tú que juntas la virginidad y el parto.',
    'Alégrate, tú por quien fue desatada la transgresión; alégrate, tú por quien se abrió el paraíso.',
    'Alégrate, llave del reino de Cristo; alégrate, esperanza de los bienes eternos.',
  ]),

  kontakion('kontakion-9', 'Π', 'Toda la naturaleza de los ángeles quedó asombrada ante la gran obra de tu encarnación; porque vio al Dios inaccesible hecho hombre accesible a todos, viviendo entre nosotros y oyendo de todos: Aleluya.'),

  ikos('ikos-9', 'Ρ', 'A los oradores de muchas palabras los vemos mudos como peces delante de ti, Theotokos; porque no aciertan a decir cómo, siendo Virgen, pudiste dar a luz. Nosotros, en cambio, admirando el misterio, aclamamos con fe:', [
    'Alégrate, receptáculo de la sabiduría de Dios; alégrate, tesoro de su providencia.',
    'Alégrate, tú que muestras necios a los sabios; alégrate, tú que dejas sin palabras a los diestros en razones.',
    'Alégrate, porque quedaron atontados los que buscan sutilezas; alégrate, porque se marchitaron los que inventan fábulas.',
    'Alégrate, tú que rompes las redes de los atenienses; alégrate, tú que llenas las redes de los pescadores.',
    'Alégrate, tú que nos sacas del fondo de la ignorancia; alégrate, tú que iluminas a muchos con el conocimiento.',
    'Alégrate, barca de los que quieren salvarse; alégrate, puerto de los que navegan la vida.',
  ]),

  kontakion('kontakion-10', 'Σ', 'Queriendo salvar al mundo, vino a él el que todo lo ordena, según su propia promesa; y siendo pastor como Dios, apareció por nosotros como hombre igual a nosotros: porque llamando a lo semejante por lo semejante, oye como Dios: Aleluya.'),

  ikos('ikos-10', 'Τ', 'Muro eres de las vírgenes, Theotokos Virgen, y de todos los que a ti acuden; porque así te dispuso el Hacedor del cielo y de la tierra, oh purísima, que habitaste en tu seno y enseñaste a todos a aclamarte:', [
    'Alégrate, columna de la virginidad; alégrate, puerta de la salvación.',
    'Alégrate, principio de la nueva creación espiritual; alégrate, dispensadora de la bondad divina.',
    'Alégrate, porque diste nueva vida a los engendrados en la vergüenza; alégrate, porque devolviste el juicio a los robados de mente.',
    'Alégrate, tú que dejaste sin obra al que corrompe las mentes; alégrate, tú que engendraste al sembrador de la pureza.',
    'Alégrate, cámara nupcial de las bodas sin simiente; alégrate, tú que uniste con el Señor a los fieles.',
    'Alégrate, nodriza hermosa de las vírgenes; alégrate, que ataviaste a las almas santas para el Esposo.',
  ]),

  kontakion('kontakion-11', 'Υ', 'Todo himno queda vencido al querer alcanzar la muchedumbre de tus muchas misericordias; porque aunque te ofreciéramos cantos iguales en número a las arenas, oh Rey santo, nada haríamos digno de lo que nos has dado a los que te aclamamos: Aleluya.'),

  ikos('ikos-11', 'Φ', 'Como una antorcha portadora de luz aparecida a los que están en tinieblas vemos a la santa Virgen; porque encendiendo la luz inmaterial, guía a todos al conocimiento divino, alumbrando la mente con su resplandor, y es honrada con esta aclamación:', [
    'Alégrate, rayo del sol espiritual; alégrate, destello de la luz que no se pone.',
    'Alégrate, relámpago que alumbra las almas; alégrate, trueno que espanta a los enemigos.',
    'Alégrate, porque haces brotar la iluminación de muchas luces; alégrate, porque haces manar el río de muchas aguas.',
    'Alégrate, tú que pintas la imagen de la piscina; alégrate, tú que borras la mancha del pecado.',
    'Alégrate, baño que lava la conciencia; alégrate, copa que rebosa alegría.',
    'Alégrate, aroma del perfume de Cristo; alégrate, vida del banquete místico.',
  ]),

  kontakion('kontakion-12', 'Χ', 'Queriendo dar la gracia de las deudas antiguas, el que salda las deudas de todos los hombres vino por sí mismo a los que se habían apartado de su gracia; y rasgando el escrito de la condena, oye de todos: Aleluya.'),

  ikos('ikos-12', 'Ψ', 'Cantando tu parto, te alabamos todos como templo animado, oh Theotokos; porque habitando en tu seno el Señor que sostiene todo con su mano, te santificó, te glorificó y enseñó a todos a aclamarte:', [
    'Alégrate, tabernáculo de Dios y del Verbo; alégrate, más santa que los santos.',
    'Alégrate, arca dorada por el Espíritu; alégrate, tesoro inagotable de la vida.',
    'Alégrate, diadema preciosa de los reyes piadosos; alégrate, gloria venerable de los sacerdotes santos.',
    'Alégrate, torre inconmovible de la Iglesia; alégrate, muralla inexpugnable del reino.',
    'Alégrate, tú por quien se levantan los trofeos; alégrate, tú por quien caen los enemigos.',
    'Alégrate, curación de mi cuerpo; alégrate, salvación de mi alma.',
  ]),

  {
    id: 'kontakion-13',
    title: 'Kontakion 13 · Ω',
    blocks: [
      rub('Este último se dice tres veces, y después se repiten el primer ikos y el proimion.'),
      t('Oh Madre digna de todo canto, que diste a luz al Verbo más santo que todos los santos: recibe esta ofrenda y líbranos de toda desgracia, y arranca del castigo futuro a los que juntos te aclaman: Aleluya.'),
      ref(ALELUYA),
    ],
  },

  {
    id: 'cierre',
    title: 'Después del himno',
    blocks: [
      rub('Se repiten el Ikos 1 y el Proimion, y con eso se cierra el Akáthistos.'),
    ],
  },
];
