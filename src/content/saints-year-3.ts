/**
 * El santoral, tercera ampliación: los que más se echaban de menos.
 *
 * Tres grupos. Grandes santos del Oriente que faltaban —san Gregorio de Nisa,
 * san Marcos de Éfeso, el apóstol Bernabé, santa Olga, san Menas, san Sava—.
 * Santos de la Iglesia hispana y occidental anterior a 1054, que las
 * comunidades ortodoxas de lengua española veneran como propios: san Isidoro y
 * san Leandro, santa Eulalia, san Vicente, san Ildefonso, san Martín de Tours.
 * Y santos eslavos y del siglo XX: san Tijón de Moscú, san Lucas de Crimea,
 * san Juan de Shanghái, santa Isabel Feodorovna, los apóstoles de Alaska y del
 * Japón.
 *
 * Mismo criterio que el resto: reseñas históricas escritas para ATHOS, que
 * distinguen lo que consta de lo que cuenta la tradición, y ningún texto
 * litúrgico inventado.
 *
 * ## Las fechas
 *
 * `day` es la fecha del Menaion de la Iglesia que venera al santo, como en el
 * resto del santoral. Para los santos rusos, serbios y georgianos es la del
 * calendario juliano —san Lucas de Crimea, el 29 de mayo, que cae el 11 de
 * junio civil—, igual que ya estaban san Serafín o san Sergio. Para los
 * griegos, la del calendario nuevo. Para los occidentales, la del martirologio
 * latino, salvo san Martín de Tours, que va en su fecha bizantina. Cuando la
 * fecha puede confundir, la vida lo explica.
 */
import type { SaintSeedYear } from './saints-year-1';

export const YEAR_SAINTS_3: SaintSeedYear[] = [
  /* ═══════════════ Enero ═══════════════ */
  { id: 'gregorio-nisa', name: 'San Gregorio de Nisa', day: '01-10', category: ['obispo', 'padre'], century: 'IV', place: 'Nisa, Capadocia' },
  { id: 'hilario-poitiers', name: 'San Hilario de Poitiers', day: '01-13', category: ['obispo', 'padre'], century: 'IV', place: 'Poitiers y Frigia' },
  { id: 'sava-serbia', name: 'San Sava de Serbia', fullName: 'San Sava, primer arzobispo de Serbia', day: '01-14', category: ['obispo', 'monje'], century: 'XII–XIII', place: 'Serbia y Monte Athos' },
  { id: 'marcos-efeso', name: 'San Marcos de Éfeso', fullName: 'San Marcos Eugénico, metropolita de Éfeso', day: '01-19', category: ['obispo', 'padre', 'confesor'], century: 'XV', place: 'Constantinopla, Éfeso y Florencia' },
  { id: 'fructuoso-tarragona', name: 'Santos Fructuoso, Augurio y Eulogio', day: '01-21', category: ['obispo', 'martir'], century: 'III', place: 'Tarragona' },
  { id: 'vicente-zaragoza', name: 'San Vicente de Zaragoza', fullName: 'San Vicente, diácono y mártir', day: '01-22', category: ['martir'], century: 'IV', place: 'Zaragoza y Valencia' },
  { id: 'anastasio-persa', name: 'San Anastasio el Persa', day: '01-22', category: ['martir'], century: 'VII', place: 'Persia y Jerusalén' },
  { id: 'ildefonso-toledo', name: 'San Ildefonso de Toledo', day: '01-23', category: ['obispo'], century: 'VII', place: 'Toledo' },
  /* ═══════════════ Febrero ═══════════════ */
  { id: 'brigida-kildare', name: 'Santa Brígida de Kildare', day: '02-01', category: ['monje'], century: 'V–VI', place: 'Irlanda' },
  { id: 'nicolas-japon', name: 'San Nicolás del Japón', fullName: 'San Nicolás, igual a los Apóstoles, arzobispo del Japón', day: '02-03', category: ['obispo'], century: 'XIX–XX', place: 'Japón' },
  { id: 'partenio-lampsaco', name: 'San Partenio de Lámpsaco', day: '02-07', category: ['obispo'], century: 'IV', place: 'Helesponto' },
  { id: 'martiniano-ermitano', name: 'San Martiniano', day: '02-13', category: ['monje'], century: 'IV–V', place: 'Cesarea de Palestina y Atenas' },
  { id: 'flaviano-constantinopla', name: 'San Flaviano de Constantinopla', day: '02-18', category: ['obispo', 'confesor'], century: 'V', place: 'Constantinopla y Éfeso' },
  /* ═══════════════ Marzo ═══════════════ */
  { id: 'paciano-barcelona', name: 'San Paciano de Barcelona', day: '03-09', category: ['obispo', 'padre'], century: 'IV', place: 'Barcelona' },
  { id: 'eulogio-cordoba', name: 'San Eulogio de Córdoba', day: '03-11', category: ['martir'], century: 'IX', place: 'Córdoba' },
  { id: 'leandro-sevilla', name: 'San Leandro de Sevilla', day: '03-13', category: ['obispo'], century: 'VI', place: 'Sevilla y Constantinopla' },
  { id: 'patricio-irlanda', name: 'San Patricio de Irlanda', day: '03-17', category: ['obispo'], century: 'V', place: 'Britania e Irlanda' },
  { id: 'martin-braga', name: 'San Martín de Braga', day: '03-20', category: ['obispo'], century: 'VI', place: 'Panonia y Galicia' },
  { id: 'tijon-moscu', name: 'San Tijón de Moscú', fullName: 'San Tijón, patriarca de Moscú y de toda Rusia', day: '03-25', category: ['obispo', 'confesor'], century: 'XIX–XX', place: 'Rusia y Norteamérica' },
  { id: 'inocencio-alaska', name: 'San Inocencio de Alaska', fullName: 'San Inocencio, metropolita de Moscú, apóstol de América', day: '03-31', category: ['obispo'], century: 'XIX', place: 'Alaska, Siberia y Moscú' },
  /* ═══════════════ Abril ═══════════════ */
  { id: 'isidoro-sevilla', name: 'San Isidoro de Sevilla', day: '04-04', category: ['obispo', 'padre'], century: 'VI–VII', place: 'Sevilla' },
  { id: 'hermenegildo', name: 'San Hermenegildo', day: '04-13', category: ['martir'], century: 'VI', place: 'Sevilla y Tarragona' },
  { id: 'fructuoso-braga', name: 'San Fructuoso de Braga', day: '04-16', category: ['obispo', 'monje'], century: 'VII', place: 'El Bierzo y Braga' },
  { id: 'matrona-moscu', name: 'Santa Matrona de Moscú', day: '04-19', category: ['justo'], century: 'XIX–XX', place: 'Tula y Moscú' },
  { id: 'esteban-perm', name: 'San Esteban de Perm', day: '04-26', category: ['obispo'], century: 'XIV', place: 'Ústiug y el país de los komi' },
  { id: 'basilio-ostrog', name: 'San Basilio de Ostrog', day: '04-29', category: ['obispo', 'monje'], century: 'XVII', place: 'Herzegovina y Montenegro' },
  /* ═══════════════ Mayo ═══════════════ */
  { id: 'tamar-georgia', name: 'Santa Tamar de Georgia', day: '05-01', category: ['justo'], century: 'XII–XIII', place: 'Georgia' },
  { id: 'nilo-sora', name: 'San Nilo de Sora', day: '05-07', category: ['monje'], century: 'XV–XVI', place: 'Belozersk, Monte Athos y río Sora' },
  { id: 'arsenio-grande', name: 'San Arsenio el Grande', day: '05-08', category: ['monje'], century: 'IV–V', place: 'Roma, Constantinopla y Escete' },
  { id: 'nicolas-traslacion', name: 'Traslado de las reliquias de san Nicolás', day: '05-09', category: ['obispo'], century: 'XI', place: 'Mira y Bari' },
  { id: 'lucas-crimea', name: 'San Lucas de Crimea', fullName: 'San Lucas, arzobispo de Simferópol y de Crimea', day: '05-29', category: ['obispo', 'confesor'], century: 'XX', place: 'Taskent, Siberia y Crimea' },
  /* ═══════════════ Junio ═══════════════ */
  { id: 'justino-popovic', name: 'San Justino Popović', fullName: 'San Justino de Ćelije', day: '06-01', category: ['monje', 'padre'], century: 'XX', place: 'Serbia' },
  { id: 'columba-iona', name: 'San Columba de Iona', day: '06-09', category: ['monje'], century: 'VI', place: 'Irlanda y Escocia' },
  { id: 'bernabe-apostol', name: 'Apóstol Bernabé', day: '06-11', category: ['apostol'], century: 'I', place: 'Chipre, Jerusalén y Antioquía' },
  { id: 'pedro-athonita', name: 'San Pedro el Athonita', day: '06-12', category: ['monje'], century: 'IX', place: 'Monte Athos' },
  { id: 'juan-shanghai', name: 'San Juan de Shanghái y San Francisco', day: '06-19', category: ['obispo'], century: 'XX', place: 'Belgrado, Shanghái, París y San Francisco' },
  { id: 'pelayo-cordoba', name: 'San Pelayo de Córdoba', day: '06-26', category: ['martir'], century: 'X', place: 'Galicia y Córdoba' },
  /* ═══════════════ Julio ═══════════════ */
  { id: 'andrei-rubliov', name: 'San Andréi Rubliov', day: '07-04', category: ['monje'], century: 'XIV–XV', place: 'Moscú' },
  { id: 'isabel-feodorovna', name: 'Santa Isabel Feodorovna', fullName: 'Santa Isabel, gran duquesa, nueva mártir', day: '07-05', category: ['neomartir'], century: 'XIX–XX', place: 'Darmstadt, Moscú y Alapáyevsk' },
  { id: 'olga-kiev', name: 'Santa Olga de Kiev', fullName: 'Santa Olga, igual a los Apóstoles, princesa de Kiev', day: '07-11', category: ['justo'], century: 'X', place: 'Kiev y Constantinopla' },
  { id: 'nicodemo-hagiorita', name: 'San Nicodemo el Hagiorita', day: '07-14', category: ['monje'], century: 'XVIII', place: 'Naxos y Monte Athos' },
  { id: 'justa-rufina', name: 'Santas Justa y Rufina', day: '07-19', category: ['martir'], century: 'III', place: 'Sevilla' },
  { id: 'clemente-ocrida', name: 'San Clemente de Ócrida', day: '07-27', category: ['obispo'], century: 'IX–X', place: 'Moravia y Ócrida' },
  /* ═══════════════ Agosto ═══════════════ */
  { id: 'tijon-zadonsk', name: 'San Tijón de Zadonsk', day: '08-13', category: ['obispo', 'monje'], century: 'XVIII', place: 'Vorónezh y Zadonsk' },
  /* ═══════════════ Septiembre ═══════════════ */
  { id: 'jose-volokolamsk', name: 'San José de Volokolamsk', day: '09-09', category: ['monje'], century: 'XV–XVI', place: 'Volokolamsk' },
  { id: 'ludmila-bohemia', name: 'Santa Ludmila de Bohemia', day: '09-16', category: ['martir'], century: 'IX–X', place: 'Bohemia' },
  { id: 'eufrosina-alejandria', name: 'Santa Eufrosina de Alejandría', day: '09-25', category: ['monje'], century: 'V', place: 'Alejandría' },
  { id: 'wenceslao-bohemia', name: 'San Wenceslao de Bohemia', day: '09-28', category: ['martir'], century: 'X', place: 'Bohemia' },
  /* ═══════════════ Octubre ═══════════════ */
  { id: 'martin-tours', name: 'San Martín de Tours', fullName: 'San Martín el Misericordioso, obispo de Tours', day: '10-12', category: ['obispo', 'monje'], century: 'IV', place: 'Panonia y Galia' },
  /* ═══════════════ Noviembre ═══════════════ */
  { id: 'arsenio-capadocia', name: 'San Arsenio de Capadocia', day: '11-10', category: ['monje'], century: 'XIX–XX', place: 'Fárasa, Capadocia, y Corfú' },
  { id: 'menas-egipto', name: 'San Menas de Egipto', fullName: 'San Menas, gran mártir', day: '11-11', category: ['granmartir'], century: 'III–IV', place: 'Frigia y Egipto' },
  { id: 'millan-cogolla', name: 'San Millán de la Cogolla', fullName: 'San Emiliano de la Cogolla', day: '11-12', category: ['monje'], century: 'V–VI', place: 'La Rioja' },
  { id: 'paisio-velichkovski', name: 'San Paisio Velichkovski', day: '11-15', category: ['monje'], century: 'XVIII', place: 'Ucrania, Monte Athos y Moldavia' },
  { id: 'iakovos-tsalikis', name: 'San Iakovos de Eubea', fullName: 'San Iakovos Tsalikis', day: '11-22', category: ['monje'], century: 'XX', place: 'Asia Menor y Eubea' },
  { id: 'alejandro-nevski', name: 'San Alejandro Nevski', day: '11-23', category: ['justo'], century: 'XIII', place: 'Nóvgorod y Vladímir' },
  { id: 'mercurio-cesarea', name: 'San Mercurio', fullName: 'San Mercurio, gran mártir', day: '11-25', category: ['granmartir'], century: 'III', place: 'Capadocia' },
  /* ═══════════════ Diciembre ═══════════════ */
  { id: 'eulalia-merida', name: 'Santa Eulalia de Mérida', day: '12-10', category: ['martir'], century: 'IV', place: 'Mérida' },
  { id: 'german-alaska', name: 'San Germán de Alaska', day: '12-13', category: ['monje'], century: 'XVIII–XIX', place: 'Valaam y Alaska' },
  { id: 'naum-ocrida', name: 'San Naum de Ócrida', day: '12-23', category: ['monje'], century: 'IX–X', place: 'Moravia, Preslav y Ócrida' },
];
