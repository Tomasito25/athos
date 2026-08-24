/**
 * Fórmulas litúrgicas en griego.
 *
 * Las oraciones breves del oficio se rezan en griego en buena parte del mundo
 * ortodoxo, y muchos hispanohablantes las conocen así: «Kyrie eleison» antes
 * que «Señor, ten piedad». ATHOS las ofrece en las tres formas —griego,
 * transliteración y español— para que cada cual rece como sepa.
 *
 * El texto griego es el de uso litúrgico corriente. La transliteración sigue la
 * pronunciación griega moderna, que es la que se oye en las iglesias, no la
 * reconstrucción erasmiana de las aulas.
 */

export interface GreekFormula {
  id: string;
  /** Griego litúrgico. */
  greek: string;
  /** Transliteración según la pronunciación actual. */
  roman: string;
  /** Español. */
  spanish: string;
}

export const GREEK_FORMULAS: Record<string, GreekFormula> = {
  kyrie: {
    id: 'kyrie',
    greek: 'Κύριε, ἐλέησον.',
    roman: 'Kírie, eléison.',
    spanish: 'Señor, ten piedad.',
  },
  christe: {
    id: 'christe',
    greek: 'Χριστέ, ἐλέησον.',
    roman: 'Jristé, eléison.',
    spanish: 'Cristo, ten piedad.',
  },
  trisagion: {
    id: 'trisagion',
    greek: 'Ἅγιος ὁ Θεός, Ἅγιος Ἰσχυρός, Ἅγιος Ἀθάνατος, ἐλέησον ἡμᾶς.',
    roman: 'Áyios o Theós, Áyios Isjirós, Áyios Athánatos, eléison imás.',
    spanish: 'Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros.',
  },
  doxa: {
    id: 'doxa',
    greek:
      'Δόξα Πατρὶ καὶ Υἱῷ καὶ Ἁγίῳ Πνεύματι, καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.',
    roman:
      'Dhóxa Patrí ke Iió ke Ayío Pnévmati, ke nin ke aí ke is tus eónas ton eónon. Amín.',
    spanish:
      'Gloria al Padre, y al Hijo, y al Espíritu Santo, ahora y siempre, y por los siglos de los siglos. Amén.',
  },
  basileuOuranie: {
    id: 'basileuOuranie',
    greek:
      'Βασιλεῦ Οὐράνιε, Παράκλητε, τὸ Πνεῦμα τῆς ἀληθείας, ὁ πανταχοῦ παρὼν καὶ τὰ πάντα πληρῶν, ὁ θησαυρὸς τῶν ἀγαθῶν καὶ ζωῆς χορηγός, ἐλθὲ καὶ σκήνωσον ἐν ἡμῖν καὶ καθάρισον ἡμᾶς ἀπὸ πάσης κηλῖδος καὶ σῶσον, Ἀγαθέ, τὰς ψυχὰς ἡμῶν.',
    roman:
      'Vasiléf Uránie, Paráklite, to Pnévma tis alithías, o pantajú parón ke ta pánta plirón, o thisavrós ton agathón ke zoís jorigós, elthé ke skínoson en imín ke kathárison imás apó pásis kilídos ke sóson, Agathé, tas psijás imón.',
    spanish:
      'Rey celestial, Consolador, Espíritu de verdad, que estás en todo lugar y todo lo llenas, tesoro de bienes y dador de vida: ven y habita en nosotros, purifícanos de toda mancha y salva, oh Bueno, nuestras almas.',
  },
  panagiaTrias: {
    id: 'panagiaTrias',
    greek:
      'Παναγία Τριάς, ἐλέησον ἡμᾶς. Κύριε, ἱλάσθητι ταῖς ἁμαρτίαις ἡμῶν. Δέσποτα, συγχώρησον τὰς ἀνομίας ἡμῖν. Ἅγιε, ἐπίσκεψαι καὶ ἴασαι τὰς ἀσθενείας ἡμῶν, ἕνεκεν τοῦ ὀνόματός σου.',
    roman:
      'Panayía Triás, eléison imás. Kírie, ilásthiti tes amartíes imón. Déspota, sinjórison tas anomías imín. Áyie, epískepse ke íase tas asthenías imón, éneken tu onómatós su.',
    spanish:
      'Santísima Trinidad, ten piedad de nosotros. Señor, purifica nuestros pecados. Soberano, perdona nuestras iniquidades. Santo, visita y sana nuestras enfermedades, por tu nombre.',
  },
  paterImon: {
    id: 'paterImon',
    greek:
      'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου· ἐλθέτω ἡ βασιλεία σου· γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς. Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον· καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν· καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.',
    roman:
      'Páter imón o en tis uranís, ayiasthíto to ónomá su; elthéto i vasilía su; yenithíto to thélimá su, os en uranó ke epí tis yis. Ton árton imón ton epiúsion dhos imín símeron; ke áfes imín ta ofilímata imón, os ke imís afíemen tis ofilétes imón; ke mi isenéngis imás is pirasmón, allá ríse imás apó tu ponirú.',
    spanish:
      'Padre nuestro, que estás en los cielos, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad, así en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del maligno.',
  },
  deute: {
    id: 'deute',
    greek:
      'Δεῦτε προσκυνήσωμεν καὶ προσπέσωμεν τῷ βασιλεῖ ἡμῶν Θεῷ. Δεῦτε προσκυνήσωμεν καὶ προσπέσωμεν Χριστῷ τῷ βασιλεῖ ἡμῶν Θεῷ. Δεῦτε προσκυνήσωμεν καὶ προσπέσωμεν αὐτῷ Χριστῷ τῷ βασιλεῖ καὶ Θεῷ ἡμῶν.',
    roman:
      'Défte proskinísomen ke prospésomen to vasilí imón Theó. Défte proskinísomen ke prospésomen Jristó to vasilí imón Theó. Défte proskinísomen ke prospésomen aftó Jristó to vasilí ke Theó imón.',
    spanish:
      'Venid, adoremos y postrémonos ante Dios, nuestro Rey. Venid, adoremos y postrémonos ante Cristo, nuestro Rey y nuestro Dios. Venid, adoremos y postrémonos ante el mismo Cristo, Rey y Dios nuestro.',
  },
  theotokeParthene: {
    id: 'theotokeParthene',
    greek:
      'Θεοτόκε Παρθένε, χαῖρε, κεχαριτωμένη Μαρία, ὁ Κύριος μετὰ σοῦ. Εὐλογημένη σὺ ἐν γυναιξί, καὶ εὐλογημένος ὁ καρπὸς τῆς κοιλίας σου, ὅτι Σωτῆρα ἔτεκες τῶν ψυχῶν ἡμῶν.',
    roman:
      'Theotóke Parthéne, jére, kejaritoméni María, o Kírios metá su. Evloyiméni si en yinexí, ke evloyiménos o karpós tis kilías su, óti Sotíra étekes ton psijón imón.',
    spanish:
      'Theotokos Virgen, alégrate, María llena de gracia, el Señor es contigo. Bendita tú eres entre las mujeres y bendito es el fruto de tu vientre, porque diste a luz al Salvador de nuestras almas.',
  },
  axionEstin: {
    id: 'axionEstin',
    greek:
      'Ἄξιόν ἐστιν ὡς ἀληθῶς μακαρίζειν σε τὴν Θεοτόκον, τὴν ἀειμακάριστον καὶ παναμώμητον καὶ μητέρα τοῦ Θεοῦ ἡμῶν. Τὴν τιμιωτέραν τῶν Χερουβὶμ καὶ ἐνδοξοτέραν ἀσυγκρίτως τῶν Σεραφίμ, τὴν ἀδιαφθόρως Θεὸν Λόγον τεκοῦσαν, τὴν ὄντως Θεοτόκον, σὲ μεγαλύνομεν.',
    roman:
      'Áxión estin os alithós makarízin se tin Theotókon, tin aimakáriston ke panamómiton ke mitéra tu Theú imón. Tin timiotéran ton Jeruvím ke endhoxotéran asinkrítos ton Serafím, tin adhiafthóros Theón Lógon tekúsan, tin óntos Theotókon, se megalínomen.',
    spanish:
      'Digno es en verdad bendecirte a Ti, Theotokos, siempre bienaventurada y toda pura, y Madre de nuestro Dios. Más venerable que los querubines e incomparablemente más gloriosa que los serafines, tú que sin mancha diste a luz al Verbo de Dios: verdadera Theotokos, te magnificamos.',
  },
  jesusPrayer: {
    id: 'jesusPrayer',
    greek: 'Κύριε Ἰησοῦ Χριστέ, Υἱὲ τοῦ Θεοῦ, ἐλέησόν με τὸν ἁμαρτωλόν.',
    roman: 'Kírie Iisú Jristé, Ié tu Theú, eléisón me ton amartolón.',
    spanish: 'Señor Jesucristo, Hijo de Dios, ten misericordia de mí, pecador.',
  },
  apolysis: {
    id: 'apolysis',
    greek:
      'Δι᾽ εὐχῶν τῶν ἁγίων Πατέρων ἡμῶν, Κύριε Ἰησοῦ Χριστὲ ὁ Θεός, ἐλέησον καὶ σῶσον ἡμᾶς. Ἀμήν.',
    roman:
      'Dhi efjón ton ayíon Patéron imón, Kírie Iisú Jristé o Theós, eléison ke sóson imás. Amín.',
    spanish:
      'Por las oraciones de nuestros santos Padres, Señor Jesucristo Dios nuestro, ten piedad de nosotros y sálvanos. Amén.',
  },
  doxaSi: {
    id: 'doxaSi',
    greek: 'Δόξα σοι, ὁ Θεὸς ἡμῶν, δόξα σοι.',
    roman: 'Dhóxa si, o Theós imón, dhóxa si.',
    spanish: 'Gloria a Ti, Dios nuestro, gloria a Ti.',
  },
};

export const GREEK_NOTE =
  'El texto griego es el de uso litúrgico. La transliteración sigue la pronunciación ' +
  'griega actual, la que se oye en las iglesias, no la reconstrucción de las aulas.';
