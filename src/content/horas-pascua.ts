/**
 * Las Horas de Pascua.
 *
 * Desde la noche de Pascua hasta el sábado siguiente —la Semana Luminosa, que
 * la Iglesia vive como un solo día— no se rezan las Horas ordinarias ni las
 * Completas: en su lugar se canta este oficio breve, siempre igual. Hasta
 * ahora ATHOS lo nombraba en esos días y no lo tenía.
 *
 * Traducido del Pentecostarion griego («Αἱ Ὧραι τοῦ Πάσχα»). El tropario
 * pascual y el kontakion llevan las mismas palabras que en el resto de
 * ATHOS. La traducción es de ATHOS y no procede de ningún libro litúrgico
 * español publicado.
 */
import type { OfficeSection, TextBlock } from '@/types';

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const section = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

const POR_LOS_SIGLOS = 'ahora y siempre, y por los siglos de los siglos.';
const GLORIA = rub('Gloria al Padre, y al Hijo, y al Espíritu Santo.');
const AHORA = rub('Ahora y siempre, y por los siglos de los siglos. Amén.');
const TRADUCCION = rub('Traducción para ATHOS a partir del original griego, que es de dominio público; no procede de un libro litúrgico español publicado.');

/** El tropario pascual, con su griego. */
export const CRISTO_HA_RESUCITADO: TextBlock = {
  kind: 'text',
  content: 'Cristo ha resucitado de entre los muertos, con su muerte ha vencido a la muerte y a los que estaban en los sepulcros les ha dado la vida.',
  greek: 'Χριστὸς ἀνέστη ἐκ νεκρῶν, θανάτῳ θάνατον πατήσας, καὶ τοῖς ἐν τοῖς μνήμασι ζωὴν χαρισάμενος.',
  roman: 'Christós anésti ek nekrón, thanáto thánaton patísas, ke tis en tis mnímasi zoín charisámenos.',
};

export const HORAS_DE_PASCUA: OfficeSection[] = [
  section('sentido', 'Cuándo se rezan', [
    rub('Toda la Semana Luminosa, del domingo de Pascua al sábado siguiente, en lugar de las Horas Primera, Tercera, Sexta y Novena y de las Completas. Es el mismo oficio cada vez, y entero se canta.'),
    rub('En el uso eslavo se reza también en casa esos días en lugar de las oraciones de la mañana y de la noche.'),
    t('No hay salmos ni Trisagio: la semana de Pascua no se lee, se canta. Lo que en otro tiempo serían salmos es aquí el anuncio, una y otra vez, de que Cristo ha resucitado.'),
  ]),

  section('comienzo', 'Comienzo', [
    rub(`Sacerdote: «Bendito sea nuestro Dios, ${POR_LOS_SIGLOS}». Sin sacerdote: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Amén.`),
    { ...CRISTO_HA_RESUCITADO, times: 3 },
    rub('Ni «Rey celestial» ni el Trisagio: toda esta semana el oficio empieza así.'),
  ]),

  section('habiendo-contemplado', 'Habiendo contemplado la Resurrección', [
    {
      kind: 'text',
      content:
        'Habiendo contemplado la Resurrección de Cristo, adoremos al santo Señor Jesús, el único sin pecado. Tu Cruz adoramos, oh Cristo, y tu santa Resurrección cantamos y glorificamos; porque Tú eres nuestro Dios, fuera de Ti no conocemos otro, tu nombre invocamos. Venid, fieles todos, adoremos la santa Resurrección de Cristo: porque he aquí que por la Cruz ha venido la alegría al mundo entero. Bendiciendo siempre al Señor, cantamos su Resurrección: porque, habiendo soportado por nosotros la Cruz, con la muerte destruyó la muerte.',
      greek:
        'Ἀνάστασιν Χριστοῦ θεασάμενοι, προσκυνήσωμεν ἅγιον, Κύριον, Ἰησοῦν, τὸν μόνον ἀναμάρτητον. Τὸν Σταυρόν σου, Χριστέ, προσκυνοῦμεν, καὶ τὴν ἁγίαν σου Ἀνάστασιν ὑμνοῦμεν καὶ δοξάζομεν· σὺ γὰρ εἶ Θεὸς ἡμῶν, ἐκτός σου ἄλλον οὐκ οἴδαμεν, τὸ ὄνομά σου ὀνομάζομεν. Δεῦτε πάντες οἱ πιστοί, προσκυνήσωμεν τὴν τοῦ Χριστοῦ ἁγίαν Ἀνάστασιν· ἰδοὺ γὰρ ἦλθε διὰ τοῦ Σταυροῦ χαρὰ ἐν ὅλῳ τῷ κόσμῳ. Διὰ παντὸς εὐλογοῦντες τὸν Κύριον, ὑμνοῦμεν τὴν Ἀνάστασιν αὐτοῦ· σταυρὸν γὰρ ὑπομείνας δι’ ἡμᾶς, θανάτῳ θάνατον ὤλεσεν.',
      times: 3,
    },
    rub('Es el himno que en los Maitines de cada domingo sigue al Evangelio de la Resurrección.'),
  ]),

  section('hipakoi', 'Hipakoí · tono 4', [
    t('Adelantándose a la aurora, las que estaban con María hallaron la piedra quitada del sepulcro, y oyeron al ángel: «¿Por qué buscáis entre los muertos, como a un hombre, al que habita en la luz eterna? Mirad los lienzos de la sepultura; corred y anunciad al mundo que el Señor ha resucitado, dando muerte a la muerte, porque es el Hijo de Dios, que salva al género humano».'),
  ]),

  section('kontakion', 'Kontakion · tono 8', [
    t('Aunque bajaste al sepulcro, oh Inmortal, destruiste el poder del infierno y resucitaste vencedor, oh Cristo Dios, diciendo a las mujeres miróforas: Alegraos, y dando la paz a tus apóstoles, Tú que concedes la resurrección a los caídos.'),
  ]),

  section('troparios', 'Troparios', [
    t('En el sepulcro con el cuerpo, en el infierno con el alma como Dios, en el paraíso con el ladrón, y en el trono estabas, oh Cristo, con el Padre y el Espíritu, llenándolo todo, Tú, a quien nada puede contener.'),
    GLORIA,
    t('Portador de vida, más hermoso que el paraíso y en verdad más resplandeciente que toda cámara real, se ha mostrado, oh Cristo, tu sepulcro, la fuente de nuestra resurrección.'),
    AHORA,
    t('Alégrate, santificada y divina morada del Altísimo; porque por ti, oh Theotokos, se ha dado la alegría a los que clamamos: Bendita tú entre las mujeres, Soberana toda inmaculada.'),
  ]),

  section('kyrie', 'Señor, ten piedad', [
    { kind: 'text', content: 'Señor, ten piedad.', times: 40 },
    GLORIA,
    AHORA,
    t('Más honorable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios, verdadera Theotokos, te engrandecemos.'),
  ]),

  section('despedida', 'Despedida', [
    rub('En el nombre del Señor, bendice, padre.'),
    rub('Sacerdote: «Por las oraciones de nuestros santos padres, Señor Jesucristo, Dios nuestro, ten piedad de nosotros y sálvanos». Sin sacerdote lo dice quien reza.'),
    t('Amén.'),
    rub('Con sacerdote, el oficio termina con la despedida de Pascua.'),
    TRADUCCION,
  ]),
];
