/**
 * La Divina Liturgia de san Basilio el Grande: lo que tiene de propio.
 *
 * Su estructura es la de la Liturgia de san Juan Crisóstomo, y lo que oye el
 * pueblo es casi lo mismo. Lo que cambia son las oraciones del sacerdote, y
 * sobre todo la Anáfora: la de san Basilio es mucho más larga y recorre entera
 * la historia de la salvación, de la creación del hombre a la segunda venida.
 * Hasta la versión 1.25 ATHOS decía que estas oraciones faltaban; aquí están.
 *
 * Se han traducido del Hieratikón griego, en la edición digital de la
 * Archidiócesis Ortodoxa Griega de América (glt.goarch.org), comparándolo
 * línea a línea con el de la Liturgia de san Juan Crisóstomo para tomar sólo
 * lo que es distinto. La traducción es de ATHOS y no procede de ningún libro
 * litúrgico español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const AMEN = ref('Amén.');

export const LITURGIA_BASILIO: OfficeSection[] = [
  section('estructura', 'Cuándo y cómo', [
    rub('Se celebra diez veces al año: los cinco primeros domingos de la Gran Cuaresma, el Jueves y el Sábado Santos, las vísperas de Navidad y de Teofanía y el 1 de enero, fiesta de san Basilio.'),
    t('Todo lo que no se da aquí —las letanías, las antífonas, las lecturas, el Querúbico, la comunión, la despedida— es igual que en la Liturgia de san Juan Crisóstomo, que está entera en Biblioteca → Oficios. Lo que cambia son las oraciones del sacerdote, que se dan a continuación en su orden, y el himno a la Theotokos después de la consagración.'),
    rub('En la despedida se nombra a san Basilio el Grande, arzobispo de Cesarea de Capadocia, en lugar de san Juan Crisóstomo.'),
  ]),

  section('ofrenda', 'La oración de la ofrenda', [
    rub('Después de la gran entrada, durante la letanía de la ofrenda, el sacerdote reza en voz baja:'),
    t('Señor, Dios nuestro, que nos creaste y nos trajiste a esta vida, que nos mostraste los caminos de la salvación, que nos concediste la revelación de los misterios celestiales: Tú eres quien nos ha puesto en este ministerio con el poder de tu Espíritu Santo. Dígnate, pues, Señor, que seamos servidores de tu nueva Alianza, ministros de tus santos misterios; recíbenos cuando nos acercamos a tu santo altar, según la abundancia de tu misericordia, para que seamos dignos de ofrecerte este sacrificio espiritual y sin sangre por nuestros pecados y por las faltas que el pueblo comete por ignorancia; y, recibiéndolo en tu altar santo, celeste y espiritual en olor de fragancia, envíanos a cambio la gracia de tu Espíritu Santo.'),
    t('Míranos, oh Dios, y contempla este culto nuestro, y recíbelo como recibiste los dones de Abel, los sacrificios de Noé, los holocaustos de Abraham, los sacerdocios de Moisés y de Aarón, las ofrendas de paz de Samuel. Como recibiste de tus santos apóstoles este culto verdadero, recibe también estos dones de las manos de nosotros, pecadores, en tu bondad, Señor, para que, hechos dignos de servir sin reproche a tu santo altar, encontremos la recompensa de los administradores fieles y prudentes en el día temible de tu justa retribución.'),
  ]),

  section('anafora', 'La Anáfora de san Basilio', [
    rub('Los diálogos del comienzo son los mismos: «Estemos de pie con dignidad», «La gracia de nuestro Señor Jesucristo», «Levantemos el corazón», «Demos gracias al Señor». Después el sacerdote reza en voz baja:'),
    t('Tú que eres, Soberano, Señor Dios, Padre todopoderoso y adorable: es en verdad digno, justo y conveniente a la magnificencia de tu santidad alabarte, cantarte, bendecirte, adorarte, darte gracias y glorificarte a Ti, el único Dios que verdaderamente existe, y ofrecerte con el corazón contrito y el espíritu humillado este culto espiritual nuestro, porque Tú nos has concedido el conocimiento de tu verdad. ¿Y quién es capaz de contar tus proezas, de hacer oír todas tus alabanzas o de narrar todas tus maravillas en todo tiempo?'),
    t('Soberano de todo, Señor del cielo y de la tierra y de toda la creación, visible e invisible, que estás sentado en el trono de la gloria y miras los abismos; sin principio, invisible, incomprensible, que nada puede abarcar, inmutable; Padre de nuestro Señor Jesucristo, el gran Dios y Salvador, nuestra esperanza, que es imagen de tu bondad, sello idéntico que en sí mismo te muestra a Ti, el Padre: Verbo vivo, Dios verdadero, Sabiduría anterior a los siglos, vida, santificación, poder, la luz verdadera; por quien se manifestó el Espíritu Santo, el Espíritu de la verdad, el don de la adopción, las arras de la herencia futura, las primicias de los bienes eternos, el poder que da la vida, la fuente de la santificación; fortalecida por quien toda criatura racional y espiritual te sirve y te eleva la glorificación eterna, porque todo es siervo tuyo.'),
    t('Porque te alaban los ángeles, los arcángeles, los tronos, las dominaciones, los principados, las potestades, las virtudes y los querubines de muchos ojos; están a tu alrededor los serafines, seis alas el uno y seis alas el otro: con dos se cubren el rostro, con dos los pies y con dos vuelan, y se gritan el uno al otro con bocas que no descansan y alabanzas que no callan…'),
    rub('En voz alta:'),
    t('…cantando, aclamando, clamando y diciendo el himno de victoria:'),
    ref('Santo, santo, santo es el Señor de los ejércitos; llenos están el cielo y la tierra de tu gloria. Hosanna en las alturas. Bendito el que viene en el nombre del Señor. Hosanna en las alturas.'),
    rub('Sacerdote, en voz baja:'),
    t('Con estos poderes bienaventurados, Soberano amigo de los hombres, también nosotros, pecadores, clamamos y decimos: Santo eres en verdad y santísimo, y no hay medida para la magnificencia de tu santidad, y eres santo en todas tus obras, porque todo lo has dispuesto para nosotros con justicia y juicio verdadero.'),
    t('Porque, habiendo formado al hombre tomando polvo de la tierra y habiéndolo honrado con tu imagen, oh Dios, lo pusiste en el paraíso de las delicias, prometiéndole la inmortalidad de la vida y el gozo de los bienes eternos si guardaba tus mandamientos. Pero cuando te desobedeció a Ti, el Dios verdadero que lo había creado, se dejó llevar por el engaño de la serpiente y quedó muerto por sus propias faltas, lo expulsaste en tu justo juicio, oh Dios, del paraíso a este mundo, y lo devolviste a la tierra de la que había sido tomado, disponiéndole la salvación por el nuevo nacimiento, que está en tu mismo Cristo.'),
    t('Porque no te apartaste para siempre, oh Bueno, de la criatura que habías hecho, ni olvidaste la obra de tus manos, sino que la visitaste de muchas maneras por las entrañas de tu misericordia. Enviaste profetas; obraste prodigios por tus santos, que en cada generación te agradaron; nos hablaste por boca de tus siervos los profetas, anunciándonos de antemano la salvación que había de venir; diste la Ley como ayuda; pusiste ángeles como guardianes.'),
    t('Y cuando llegó la plenitud de los tiempos, nos hablaste en tu mismo Hijo, por quien hiciste también los siglos; el cual, siendo resplandor de tu gloria e impronta de tu ser, y sosteniendo todo con la palabra de su poder, no consideró una presa a la que aferrarse ser igual a Ti, Dios y Padre, sino que, siendo Dios antes de los siglos, apareció en la tierra y vivió entre los hombres; y, encarnado de una Virgen santa, se vació de sí mismo tomando la forma de siervo, hecho semejante al cuerpo de nuestra humillación, para hacernos semejantes a la imagen de su gloria.'),
    t('Porque, como por un hombre entró el pecado en el mundo, y por el pecado la muerte, tu Hijo unigénito, que está en el seno de Ti, Dios y Padre, quiso nacer de mujer, la santa Theotokos y siempre Virgen María, nacer bajo la Ley, para condenar el pecado en su carne, a fin de que los que mueren en Adán reciban la vida en tu mismo Cristo.'),
    t('Y habiendo vivido en este mundo, nos dio los preceptos de la salvación, nos apartó del extravío de los ídolos y nos condujo al conocimiento de Ti, el Dios y Padre verdadero, adquiriéndonos como pueblo suyo, sacerdocio real, nación santa. Y habiéndonos purificado en el agua y santificado por el Espíritu Santo, se entregó a sí mismo en rescate a la muerte, en cuyo poder estábamos, vendidos al pecado; y habiendo bajado por la Cruz al infierno para llenarlo todo de sí mismo, deshizo los dolores de la muerte; y resucitando al tercer día y abriendo a toda carne el camino de la resurrección de entre los muertos —porque no era posible que el autor de la vida quedara sujeto a la corrupción—, se hizo primicia de los que duermen, primogénito de entre los muertos, para ser Él el primero en todo; y habiendo subido a los cielos, se sentó a la derecha de tu majestad en las alturas, y vendrá a dar a cada uno según sus obras.'),
    t('Y nos dejó como memorial de su Pasión salvadora estos dones, que hemos presentado ante Ti según sus mandamientos. Porque, cuando iba a salir hacia su muerte voluntaria, gloriosa y vivificante, en la noche en que se entregaba a sí mismo por la vida del mundo, tomó el pan en sus manos santas y purísimas, lo presentó a Ti, Dios y Padre, dio gracias, lo bendijo, lo santificó, lo partió…'),
    rub('En voz alta:'),
    t('…y lo dio a sus santos discípulos y apóstoles, diciendo: Tomad, comed: esto es mi Cuerpo, que por vosotros es partido para el perdón de los pecados.'),
    AMEN,
    rub('En voz baja: «Del mismo modo, tomando el cáliz del fruto de la vid, lo mezcló, dio gracias, lo bendijo y lo santificó…». En voz alta:'),
    t('…y lo dio a sus santos discípulos y apóstoles, diciendo: Bebed de él todos: ésta es mi Sangre, la de la nueva Alianza, que por vosotros y por muchos es derramada para el perdón de los pecados.'),
    AMEN,
    rub('En voz baja:'),
    t('Haced esto en memoria mía: porque cada vez que comáis este pan y bebáis este cáliz, anunciáis mi muerte y confesáis mi resurrección. Recordando, pues, también nosotros, Soberano, su Pasión salvadora, la Cruz vivificante, la sepultura de tres días, la resurrección de entre los muertos, la subida a los cielos, el estar sentado a tu derecha, Dios y Padre, y su gloriosa y temible segunda venida…'),
    rub('En voz alta:'),
    t('Lo tuyo, de lo tuyo, te lo ofrecemos, en todo y por todo.'),
    ref('A Ti te cantamos, a Ti te bendecimos, a Ti te damos gracias, Señor, y te suplicamos, Dios nuestro.'),
    rub('En voz baja, la epíclesis:'),
    t('Por eso, Soberano santísimo, también nosotros, tus siervos pecadores e indignos, a quienes has hecho dignos de servir a tu santo altar, no por nuestras justicias —porque no hemos hecho nada bueno en la tierra—, sino por tus misericordias y tus compasiones, que has derramado abundantemente sobre nosotros, nos acercamos con confianza a tu santo altar; y, presentando los antitipos del santo Cuerpo y de la Sangre de tu Cristo, te suplicamos y te invocamos, Santo de los santos, que por el beneplácito de tu bondad venga tu Espíritu Santo sobre nosotros y sobre estos dones presentados, y los bendiga, los santifique y muestre…'),
    rub('Bendiciendo el pan:'),
    t('…este pan, el precioso Cuerpo mismo de nuestro Señor, Dios y Salvador Jesucristo.'),
    rub('Diácono: «Amén». Bendiciendo el cáliz:'),
    t('Y lo que hay en este cáliz, la preciosa Sangre misma de nuestro Señor, Dios y Salvador Jesucristo.'),
    rub('Diácono: «Amén». Bendiciendo los dos:'),
    t('Derramada por la vida y la salvación del mundo.'),
    rub('Diácono: «Amén, amén, amén». El sacerdote sigue en voz baja:'),
    t('Y a todos nosotros, que participamos del único Pan y del único Cáliz, únenos unos a otros en la comunión del único Espíritu Santo, y haz que ninguno de nosotros participe del santo Cuerpo y de la Sangre de tu Cristo para juicio o condena, sino que encontremos misericordia y gracia con todos los santos que te han agradado desde siempre: antepasados, padres, patriarcas, profetas, apóstoles, predicadores, evangelistas, mártires, confesores, maestros y todo espíritu justo que ha llegado a la perfección en la fe…'),
    rub('En voz alta, incensando:'),
    t('…especialmente por nuestra santísima, purísima, bendita sobre todas y gloriosa Señora, la Theotokos y siempre Virgen María.'),
    rub('En lugar de «Digno es en verdad», el coro canta, en el tono quinto:'),
    ref('En ti se alegra, llena de gracia, toda la creación: la asamblea de los ángeles y el linaje de los hombres. Templo santificado y paraíso espiritual, gloria de las vírgenes, de la que Dios se encarnó y se hizo niño, Él, nuestro Dios, que existe antes de los siglos; porque hizo de tu seno un trono y lo hizo más amplio que los cielos. En ti se alegra, llena de gracia, toda la creación: gloria a ti.'),
  ]),

  section('conmemoraciones', 'Las conmemoraciones', [
    rub('Mientras se canta, el sacerdote conmemora, como en la Liturgia de san Juan Crisóstomo, al Precursor, a los apóstoles, al santo del día y a los difuntos, y sigue en voz baja:'),
    t('Acuérdate, Señor, de todo el episcopado ortodoxo, que dispensa rectamente la palabra de tu verdad. Acuérdate, Señor, según la abundancia de tus compasiones, también de mi indignidad: perdóname toda falta, voluntaria e involuntaria, y no retires por mis pecados la gracia de tu Espíritu Santo de los dones presentados. Acuérdate, Señor, del presbiterio, del diaconado en Cristo y de todo el orden sacerdotal, y no confundas a ninguno de los que rodeamos tu santo altar.'),
    t('Visítanos en tu bondad, Señor; muéstrate a nosotros en tus ricas compasiones; danos un clima templado y provechoso; concede a la tierra lluvias apacibles para que dé fruto. Bendice la corona del año de tu bondad; haz cesar los cismas de las Iglesias; apaga la arrogancia de los pueblos; deshaz pronto, con el poder de tu Espíritu Santo, los levantamientos de las herejías. Recíbenos a todos en tu Reino, haciéndonos hijos de la luz e hijos del día; concédenos tu paz y tu amor, Señor Dios nuestro, porque todo nos lo has dado.'),
    rub('En los libros completos estas conmemoraciones son más largas que en la edición griega usada aquí: piden también por los que traen ofrendas, por los que viven en los desiertos, en los montes y en las cuevas, por los matrimonios, los niños, los ancianos y los que no tienen quien los recuerde. Después, en voz alta, la conmemoración del arzobispo y el final, como en la Liturgia de san Juan Crisóstomo.'),
  ]),

  section('padre-nuestro', 'Antes del Padre Nuestro', [
    rub('Durante la letanía que precede al Padre Nuestro, el sacerdote reza en voz baja:'),
    t('Dios nuestro, Dios que salva: enséñanos Tú a darte gracias dignamente por los beneficios que nos has hecho y nos haces. Tú, Dios nuestro, que has recibido estos dones, purifícanos de toda mancha de la carne y del espíritu, y enséñanos a llevar a término la santidad en tu temor, para que, recibiendo con el testimonio limpio de nuestra conciencia la parte de tus dones santos, nos unamos al santo Cuerpo y a la Sangre de tu Cristo; y, habiéndolos recibido dignamente, tengamos a Cristo habitando en nuestros corazones y nos hagamos templo de tu Espíritu Santo.'),
    t('Sí, Dios nuestro: no hagas culpable a ninguno de nosotros de estos misterios tuyos, temibles y celestiales, ni débil en el alma y en el cuerpo por recibirlos indignamente; sino concédenos, hasta nuestro último aliento, recibir dignamente la parte de tus dones santos, como viático de vida eterna y como defensa aceptable ante el temible tribunal de tu Cristo, para que también nosotros, con todos los santos que te han agradado desde siempre, participemos de tus bienes eternos, que has preparado para los que te aman, Señor.'),
    rub('Oración de la inclinación, después del Padre Nuestro:'),
    t('Soberano Señor, Padre de las compasiones y Dios de todo consuelo: bendice, santifica, guarda, fortalece y afianza a los que han inclinado ante Ti la cabeza; apártalos de toda obra mala, únelos a toda obra buena y hazlos dignos de participar sin condena de estos misterios tuyos, purísimos y vivificantes, para el perdón de los pecados y la comunión del Espíritu Santo.'),
  ]),

  section('despues-de-comulgar', 'Después de la comunión', [
    rub('Oración de acción de gracias, en voz baja, durante la letanía:'),
    t('Te damos gracias, Señor Dios nuestro, por la comunión de tus misterios santos, purísimos, inmortales y celestiales, que nos has dado para beneficio, santificación y curación de nuestras almas y de nuestros cuerpos. Tú mismo, Soberano de todo, haz que la comunión del santo Cuerpo y de la Sangre de tu Cristo sea para nosotros fe que no avergüenza, amor sin fingimiento, plenitud de sabiduría, curación del alma y del cuerpo, alejamiento de todo lo contrario, cumplimiento de tus mandamientos y defensa aceptable ante el temible tribunal de tu Cristo.'),
    rub('Al consumir los dones que quedan, el sacerdote dice:'),
    t('Cristo, Dios nuestro, que recibes el sacrificio de alabanza y el culto agradable, este sacrificio espiritual y sin sangre, de los que te invocan con todo el corazón; Cordero e Hijo de Dios, que quitas el pecado del mundo; novillo sin mancha, que no aceptó el yugo del pecado y fue inmolado voluntariamente por nosotros; que te partes y no te divides, que eres comido y nunca te consumes, sino que santificas a los que comen; que, en memoria de tu Pasión voluntaria y de tu Resurrección vivificante al tercer día, nos has hecho partícipes de tus misterios inefables, celestiales y temibles, de tu santo Cuerpo y de tu preciosa Sangre: guarda en tu santificación a tus siervos, a los diáconos, a los que nos gobiernan, a los que nos protegen y al pueblo aquí presente.'),
    t('Y concédenos meditar en todo tiempo y ocasión tu justicia, para que, guiados hacia tu voluntad y haciendo lo que te agrada, seamos dignos también de estar a tu derecha cuando vengas a juzgar a vivos y muertos. Libra a nuestros hermanos cautivos, visita a los enfermos, gobierna a los que están en peligro en el mar, da descanso a las almas de los que se durmieron antes en la esperanza de la vida eterna, donde brilla la luz de tu rostro, y escucha a todos los que necesitan tu ayuda; y a Ti te damos gloria, acción de gracias y adoración, al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.'),
    t('Se ha cumplido y acabado, en cuanto está a nuestro alcance, oh Cristo Dios nuestro, el misterio de tu economía: porque hemos tenido el recuerdo de tu muerte, hemos visto la figura de tu Resurrección, nos hemos llenado de tu vida sin fin, hemos gozado de tu delicia inagotable. Dígnate hacernos dignos de ella a todos también en el siglo venidero, por la gracia de tu Padre sin principio y de tu santo, bueno y vivificante Espíritu, ahora y siempre, y por los siglos de los siglos. Amén.'),
  ]),
];
