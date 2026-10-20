/**
 * El santoral, quinta ampliación.
 *
 * Figuras del Evangelio y del Antiguo Testamento que faltaban —Lázaro, Marta y
 * María, José de Arimatea, Juana, Cleofás, Ananías, Felipe el diácono,
 * Abrahán—; santas de la Iglesia antigua; mártires y obispos hispanos de los
 * himnos de Prudencio y de la escuela de Isidoro; y santos del siglo XX, entre
 * ellos santa María de París, san Sofronio de Essex y la familia imperial rusa,
 * con el matiz con que la Iglesia rusa los canonizó.
 *
 * Mismo criterio de fechas que la tercera ampliación.
 */
import type { SaintSeedYear } from './saints-year-1';

export const YEAR_SAINTS_5: SaintSeedYear[] = [
  /* ═══════════════ Enero ═══════════════ */
  { id: 'fulgencio-ecija', name: 'San Fulgencio de Écija', day: '01-16', category: ['obispo'], century: 'VI–VII', place: 'Cartagena y Écija' },
  { id: 'eutimio-tarnovo', name: 'San Eutimio de Tárnovo', day: '01-20', category: ['obispo'], century: 'XIV', place: 'Tárnovo, Bulgaria' },
  { id: 'maximo-griego', name: 'San Máximo el Griego', day: '01-21', category: ['monje', 'confesor'], century: 'XV–XVI', place: 'Arta, Italia, Monte Athos y Moscú' },
  { id: 'david-constructor', name: 'San David el Constructor', fullName: 'San David IV, rey de Georgia', day: '01-26', category: ['justo'], century: 'XI–XII', place: 'Georgia' },
  /* ═══════════════ Marzo ═══════════════ */
  { id: 'emeterio-celedonio', name: 'Santos Emeterio y Celedonio', day: '03-03', category: ['martir'], century: 'III–IV', place: 'Calahorra' },
  { id: 'serafin-vyritsa', name: 'San Serafín de Výritsa', day: '03-21', category: ['monje'], century: 'XIX–XX', place: 'San Petersburgo y Výritsa' },
  { id: 'braulio-zaragoza', name: 'San Braulio de Zaragoza', day: '03-26', category: ['obispo'], century: 'VI–VII', place: 'Zaragoza' },
  /* ═══════════════ Abril ═══════════════ */
  { id: 'engracia-zaragoza', name: 'Santa Engracia y los mártires de Zaragoza', day: '04-16', category: ['martir'], century: 'IV', place: 'Zaragoza' },
  /* ═══════════════ Mayo ═══════════════ */
  { id: 'cristobal', name: 'San Cristóbal', day: '05-09', category: ['martir'], century: 'III', place: 'Licia' },
  { id: 'eufrosina-polotsk', name: 'Santa Eufrosina de Pólotsk', day: '05-23', category: ['monje'], century: 'XII', place: 'Pólotsk y Jerusalén' },
  /* ═══════════════ Junio ═══════════════ */
  { id: 'marta-maria', name: 'Santas Marta y María', fullName: 'Santas Marta y María, hermanas de Lázaro', day: '06-04', category: ['justo'], century: 'I', place: 'Betania' },
  { id: 'florentina', name: 'Santa Florentina', day: '06-20', category: ['monje'], century: 'VI–VII', place: 'Sevilla y Écija' },
  { id: 'juana-mirofora', name: 'Santa Juana la Mirófora', day: '06-27', category: ['justo'], century: 'I', place: 'Galilea y Jerusalén' },
  /* ═══════════════ Julio ═══════════════ */
  { id: 'pasionarios-romanov', name: 'Santos Pasionarios de la familia imperial', fullName: 'Santos Nicolás, Alejandra, Alexis, Olga, Tatiana, María y Anastasia', day: '07-04', category: ['neomartir'], century: 'XX', place: 'Rusia' },
  { id: 'jose-damasco', name: 'San José de Damasco', day: '07-10', category: ['neomartir'], century: 'XIX', place: 'Damasco' },
  { id: 'sofronio-essex', name: 'San Sofronio de Essex', fullName: 'San Sofronio el Athonita', day: '07-11', category: ['monje'], century: 'XX', place: 'Moscú, Monte Athos y Essex' },
  { id: 'alejandro-munich', name: 'San Alejandro de Múnich', fullName: 'San Alexander Schmorell', day: '07-13', category: ['neomartir'], century: 'XX', place: 'Oremburgo y Múnich' },
  { id: 'maria-skobtsova', name: 'Santa María de París', fullName: 'Santa María Skobtsova, monja y mártir', day: '07-20', category: ['neomartir', 'monje'], century: 'XX', place: 'Rusia y París' },
  { id: 'cristina-tiro', name: 'Santa Cristina', fullName: 'Santa Cristina, gran mártir', day: '07-24', category: ['granmartir'], century: 'III', place: 'Tiro' },
  { id: 'olimpiada-diaconisa', name: 'Santa Olimpíada la Diaconisa', day: '07-25', category: ['justo'], century: 'IV–V', place: 'Constantinopla' },
  { id: 'cucufate', name: 'San Cucufate', day: '07-25', category: ['martir'], century: 'IV', place: 'Barcelona' },
  { id: 'jose-arimatea', name: 'San José de Arimatea', day: '07-31', category: ['justo'], century: 'I', place: 'Jerusalén' },
  { id: 'benjamin-petrogrado', name: 'San Benjamín de Petrogrado', day: '07-31', category: ['obispo', 'neomartir'], century: 'XX', place: 'Petrogrado' },
  /* ═══════════════ Agosto ═══════════════ */
  { id: 'felix-gerona', name: 'San Félix de Gerona', day: '08-01', category: ['martir'], century: 'IV', place: 'Gerona' },
  { id: 'nona', name: 'Santa Nona', day: '08-05', category: ['justo'], century: 'IV', place: 'Nacianzo, Capadocia' },
  /* ═══════════════ Septiembre ═══════════════ */
  { id: 'pulqueria', name: 'Santa Pulqueria', day: '09-10', category: ['justo'], century: 'V', place: 'Constantinopla' },
  /* ═══════════════ Octubre ═══════════════ */
  { id: 'ananias-damasco', name: 'Apóstol Ananías', day: '10-01', category: ['apostol'], century: 'I', place: 'Damasco' },
  { id: 'abrahan', name: 'Santo Abrahán el Patriarca', day: '10-09', category: ['profeta', 'justo'], century: 'Antiguo Testamento', place: 'Ur, Harán y Canaán' },
  { id: 'felipe-diacono', name: 'Apóstol Felipe el Diácono', day: '10-11', category: ['apostol'], century: 'I', place: 'Jerusalén, Samaria y Cesarea' },
  { id: 'lazaro-betania', name: 'San Lázaro de Betania', fullName: 'San Lázaro, el de los cuatro días, amigo del Señor', day: '10-17', category: ['justo', 'obispo'], century: 'I', place: 'Betania y Chipre' },
  { id: 'cleofas-apostol', name: 'Apóstol Cleofás', day: '10-30', category: ['apostol'], century: 'I', place: 'Emaús y Jerusalén' },
  /* ═══════════════ Noviembre ═══════════════ */
  { id: 'acisclo-victoria', name: 'Santos Acisclo y Victoria', day: '11-17', category: ['martir'], century: 'IV', place: 'Córdoba' },
  /* ═══════════════ Diciembre ═══════════════ */
  { id: 'leocadia-toledo', name: 'Santa Leocadia de Toledo', day: '12-09', category: ['martir'], century: 'IV', place: 'Toledo' },
  { id: 'hilarion-troitski', name: 'San Hilarión Troitski', day: '12-15', category: ['obispo', 'neomartir'], century: 'XX', place: 'Moscú y Solovki' },
];
