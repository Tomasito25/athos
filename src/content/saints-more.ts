/**
 * Ampliación del santoral.
 *
 * Segunda tanda de conmemoraciones, con el mismo criterio que la primera: las
 * biografías son reseñas históricas redactadas para ATHOS a partir de fuentes
 * hagiográficas comunes, y los troparios sólo se incluyen si hay versión
 * española verificable. Aquí no hay ninguno todavía, así que todos figuran
 * como pendientes.
 */
import type { SaintCategory } from '@/types';

export interface SaintSeedMore {
  id: string;
  name: string;
  fullName?: string;
  day: string;
  category: SaintCategory[];
  century?: string;
  place?: string;
}

export const MORE_SAINTS: SaintSeedMore[] = [
  /* ---------------- Enero ---------------- */
  { id: 'silvestre-roma', name: 'San Silvestre de Roma', day: '01-02', category: ['obispo'], century: 'IV', place: 'Roma' },
  { id: 'teodosio-cenobiarca', name: 'San Teodosio el Cenobiarca', day: '01-11', category: ['monje'], century: 'V–VI', place: 'Desierto de Judea' },
  { id: 'pablo-tebas', name: 'San Pablo de Tebas', fullName: 'San Pablo, primer ermitaño', day: '01-15', category: ['monje'], century: 'III–IV', place: 'Tebaida, Egipto' },
  { id: 'eutimio-grande', name: 'San Eutimio el Grande', day: '01-20', category: ['monje'], century: 'IV–V', place: 'Palestina' },
  { id: 'timoteo-apostol', name: 'San Timoteo Apóstol', day: '01-22', category: ['apostol', 'martir'], century: 'I', place: 'Éfeso' },
  { id: 'xenia-petersburgo', name: 'Santa Xenia de San Petersburgo', day: '01-24', category: ['justo'], century: 'XVIII', place: 'San Petersburgo' },
  { id: 'efren-sirio-santo', name: 'San Efrén el Sirio', day: '01-28', category: ['monje', 'padre'], century: 'IV', place: 'Nísibis y Edesa' },
  { id: 'ignacio-antioquia', name: 'San Ignacio de Antioquía', fullName: 'San Ignacio el Teóforo', day: '01-29', category: ['obispo', 'martir', 'padre'], century: 'I–II', place: 'Antioquía y Roma' },

  /* ---------------- Febrero ---------------- */
  { id: 'simeon-justo', name: 'San Simeón el Justo y Santa Ana profetisa', day: '02-03', category: ['justo', 'profeta'], century: 'I', place: 'Jerusalén' },
  { id: 'isidoro-pelusiota', name: 'San Isidoro de Pelusio', day: '02-04', category: ['monje', 'padre'], century: 'IV–V', place: 'Egipto' },
  { id: 'fotio-constantinopla', name: 'San Focio el Grande', day: '02-06', category: ['obispo', 'padre'], century: 'IX', place: 'Constantinopla' },
  { id: 'meletio-antioquia', name: 'San Meletio de Antioquía', day: '02-12', category: ['obispo'], century: 'IV', place: 'Antioquía' },
  { id: 'onesimo', name: 'San Onésimo', day: '02-15', category: ['apostol'], century: 'I' },
  { id: 'leon-magno', name: 'San León Magno', day: '02-18', category: ['obispo', 'padre'], century: 'V', place: 'Roma' },
  { id: 'tarasio', name: 'San Tarasio de Constantinopla', day: '02-25', category: ['obispo'], century: 'VIII–IX', place: 'Constantinopla' },

  /* ---------------- Marzo ---------------- */
  { id: 'gerasimo-jordan', name: 'San Gerásimo del Jordán', day: '03-04', category: ['monje'], century: 'V', place: 'Valle del Jordán' },
  { id: 'obispos-quersoneso', name: 'Los santos obispos de Quersoneso', day: '03-07', category: ['obispo', 'martir'], century: 'IV', place: 'Crimea' },
  { id: 'sofronio-jerusalen', name: 'San Sofronio de Jerusalén', day: '03-11', category: ['obispo', 'padre'], century: 'VI–VII', place: 'Jerusalén' },
  { id: 'teofano-cronista', name: 'San Teófanes el Confesor', day: '03-12', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Bitinia' },
  { id: 'benito-nursia', name: 'San Benito de Nursia', day: '03-14', category: ['monje'], century: 'V–VI', place: 'Montecasino' },
  { id: 'alexis-hombre-dios', name: 'San Alejo, el hombre de Dios', day: '03-17', category: ['justo'], century: 'V', place: 'Roma y Edesa' },
  { id: 'cirilo-jerusalen', name: 'San Cirilo de Jerusalén', day: '03-18', category: ['obispo', 'padre'], century: 'IV', place: 'Jerusalén' },
  { id: 'juan-escala-marzo', name: 'San Juan Clímaco', day: '03-30', category: ['monje', 'padre'], century: 'VI–VII', place: 'Monte Sinaí' },

  /* ---------------- Abril ---------------- */
  { id: 'tito-taumaturgo', name: 'San Tito el Taumaturgo', day: '04-02', category: ['monje'], century: 'IX', place: 'Constantinopla' },
  { id: 'jorge-maleo', name: 'San Jorge de Maleo', day: '04-04', category: ['monje'], century: 'IX', place: 'Peloponeso' },
  { id: 'metodio-eslavos', name: 'San Metodio, igual a los Apóstoles', day: '04-06', category: ['obispo'], century: 'IX', place: 'Moravia' },
  { id: 'antipas-pergamo', name: 'San Antipas de Pérgamo', day: '04-11', category: ['obispo', 'martir'], century: 'I', place: 'Pérgamo' },
  { id: 'martin-confesor', name: 'San Martín el Confesor', day: '04-14', category: ['obispo', 'confesor'], century: 'VII', place: 'Roma y Quersoneso' },
  { id: 'sabas-godo', name: 'San Sabas el Godo', day: '04-15', category: ['martir'], century: 'IV', place: 'Dacia' },
  { id: 'juan-antiguo', name: 'San Juan de la Laura Antigua', day: '04-19', category: ['monje'], century: 'VIII', place: 'Laura de Farán, Palestina' },
  { id: 'teodoro-siceota', name: 'San Teodoro el Siceota', day: '04-22', category: ['obispo', 'monje'], century: 'VI–VII', place: 'Galacia' },
  { id: 'juan-atalla', name: 'San Simeón, pariente del Señor', day: '04-27', category: ['obispo', 'martir'], century: 'I–II', place: 'Jerusalén' },

  /* ---------------- Mayo ---------------- */
  { id: 'atanasio-mayo', name: 'San Atanasio el Grande (traslación)', day: '05-02', category: ['obispo', 'padre'], century: 'IV', place: 'Alejandría' },
  { id: 'job-paciente', name: 'Santo Job el Paciente', day: '05-06', category: ['justo'], century: 'antes de Cristo', place: 'Uz' },
  { id: 'simon-zelote', name: 'San Simón el Zelote', day: '05-10', category: ['apostol'], century: 'I' },
  { id: 'epifanio-chipre', name: 'San Epifanio de Chipre', day: '05-12', category: ['obispo', 'padre'], century: 'IV–V', place: 'Salamina de Chipre' },
  { id: 'pacomio-grande', name: 'San Pacomio el Grande', day: '05-15', category: ['monje'], century: 'IV', place: 'Tabenna, Egipto' },
  { id: 'teodoro-estudita', name: 'San Teodoro Estudita', day: '11-11', category: ['monje', 'confesor'], century: 'VIII–IX', place: 'Constantinopla' },
  { id: 'juan-ruso', name: 'San Juan el Ruso', day: '05-27', category: ['justo'], century: 'XVIII', place: 'Prokopi, Eubea' },

  /* ---------------- Junio ---------------- */
  { id: 'nicéforo-confesor', name: 'San Nicéforo el Confesor', day: '06-02', category: ['obispo', 'confesor'], century: 'VIII–IX', place: 'Constantinopla' },
  { id: 'metrofanes', name: 'San Metrófanes de Constantinopla', day: '06-04', category: ['obispo'], century: 'IV', place: 'Constantinopla' },
  { id: 'ciril-alejandria', name: 'San Cirilo de Alejandría', day: '06-09', category: ['obispo', 'padre'], century: 'IV–V', place: 'Alejandría' },
  { id: 'bartolome-apostol', name: 'San Bartolomé Apóstol', day: '06-11', category: ['apostol'], century: 'I', place: 'Armenia' },
  { id: 'onofre-grande', name: 'San Onofre el Grande', day: '06-12', category: ['monje'], century: 'IV', place: 'Tebaida' },
  { id: 'ciriaco-anacoreta', name: 'San Ciriaco el Anacoreta', day: '09-29', category: ['monje'], century: 'V–VI', place: 'Palestina' },
  { id: 'metodio-patara', name: 'San Metodio de Patara', day: '06-20', category: ['obispo', 'martir'], century: 'III–IV', place: 'Licia' },
  { id: 'david-tesalonica', name: 'San David de Tesalónica', day: '06-26', category: ['monje'], century: 'V–VI', place: 'Tesalónica' },
  { id: 'sampson-hospedador', name: 'San Sansón el Hospedador', day: '06-27', category: ['justo'], century: 'VI', place: 'Constantinopla' },

  /* ---------------- Julio ---------------- */
  { id: 'andres-creta', name: 'San Andrés de Creta', day: '07-04', category: ['obispo', 'padre'], century: 'VII–VIII', place: 'Creta' },
  { id: 'sergio-german-valaam', name: 'Santos Sergio y Germán de Valaam', day: '06-28', category: ['monje'], century: 'XIV', place: 'Lago Ladoga' },
  { id: 'tomas-apostol', name: 'Santo Tomás Apóstol', day: '10-06', category: ['apostol'], century: 'I', place: 'India' },
  { id: 'padres-nicea-julio', name: 'Los Padres de los Seis Concilios', day: '07-13', category: ['obispo'] },
  { id: 'marina-antioquia', name: 'Santa Marina de Antioquía', day: '07-17', category: ['granmartir'], century: 'III–IV', place: 'Antioquía de Pisidia' },
  { id: 'macrina-joven', name: 'Santa Macrina la Joven', day: '07-19', category: ['justo'], century: 'IV', place: 'Capadocia' },
  { id: 'maria-magdalena', name: 'Santa María Magdalena', fullName: 'Santa María Magdalena, igual a los Apóstoles', day: '07-22', category: ['justo', 'apostol'], century: 'I', place: 'Éfeso' },
  { id: 'ana-madre', name: 'Dormición de santa Ana', day: '07-25', category: ['justo'], century: 'I a. C.' },

  /* ---------------- Agosto ---------------- */
  { id: 'siete-macabeos', name: 'Los siete santos Macabeos', day: '08-01', category: ['martir'], century: 'II a. C.', place: 'Jerusalén' },
  { id: 'esteban-hallazgo', name: 'Hallazgo de las reliquias de san Esteban', day: '08-02', category: ['martir'], century: 'V', place: 'Jerusalén' },
  { id: 'siete-durmientes', name: 'Los siete jóvenes de Éfeso', day: '08-04', category: ['martir'], century: 'III', place: 'Éfeso' },
  { id: 'maximo-agosto', name: 'San Máximo el Confesor (traslación)', day: '08-13', category: ['monje', 'confesor', 'padre'], century: 'VII' },
  { id: 'diomedes', name: 'San Diomedes el Médico', day: '08-16', category: ['martir'], century: 'III–IV', place: 'Nicea' },
  { id: 'tadeo-apostol', name: 'San Tadeo Apóstol', day: '08-21', category: ['apostol'], century: 'I', place: 'Edesa' },
  { id: 'natalia-adrian', name: 'Santos Adrián y Natalia', day: '08-26', category: ['martir'], century: 'IV', place: 'Nicomedia' },
  { id: 'moises-etiope', name: 'San Moisés el Etíope', day: '08-28', category: ['monje'], century: 'IV', place: 'Escete, Egipto' },

  /* ---------------- Septiembre ---------------- */
  { id: 'mamas', name: 'San Mamante de Cesarea', day: '09-02', category: ['martir'], century: 'III', place: 'Capadocia' },
  { id: 'joaquin-ana', name: 'Santos Joaquín y Ana', day: '09-09', category: ['justo'], century: 'I a. C.' },
  { id: 'teodora-alejandria', name: 'Santa Teodora de Alejandría', day: '09-11', category: ['monje'], century: 'V', place: 'Alejandría' },
  { id: 'cornelio-centurion', name: 'San Cornelio el Centurión', day: '09-13', category: ['obispo'], century: 'I', place: 'Cesarea' },
  { id: 'nicetas-godo', name: 'San Nicetas el Godo', day: '09-15', category: ['granmartir'], century: 'IV', place: 'Dacia' },
  { id: 'sofia-fe-esperanza-caridad', name: 'Santas Fe, Esperanza y Caridad y su madre Sofía', day: '09-17', category: ['martir'], century: 'II', place: 'Roma' },
  { id: 'eustaquio', name: 'San Eustaquio Plácidas', day: '09-20', category: ['granmartir'], century: 'II', place: 'Roma' },
  { id: 'tecla', name: 'Santa Tecla, igual a los Apóstoles', day: '09-24', category: ['martir'], century: 'I', place: 'Iconio y Seleucia' },

  /* ---------------- Octubre ---------------- */
  { id: 'romano-meloda', name: 'San Romano el Meloda', day: '10-01', category: ['justo'], century: 'V–VI', place: 'Constantinopla' },
  { id: 'ciprian-justina', name: 'Santos Cipriano y Justina', day: '10-02', category: ['martir'], century: 'III', place: 'Antioquía' },
  { id: 'juan-kukuzelis', name: 'San Juan Kukuzelis', day: '10-01', category: ['monje'], century: 'XIII–XIV', place: 'Monte Athos' },
  { id: 'pelagia', name: 'Santa Pelagia de Antioquía', day: '10-08', category: ['monje'], century: 'V', place: 'Antioquía y Jerusalén' },
  { id: 'padres-nicea-ii', name: 'Los Padres del VII Concilio Ecuménico', day: '10-11', category: ['obispo'], century: 'VIII', place: 'Nicea' },
  { id: 'lucas-octubre', name: 'San Lucas Evangelista', day: '10-18', category: ['apostol'], century: 'I', place: 'Antioquía y Beocia' },
  { id: 'anastasia-romana', name: 'Santa Anastasia la Romana', day: '10-29', category: ['martir'], century: 'III', place: 'Roma' },

  /* ---------------- Noviembre ---------------- */
  { id: 'cosme-damian-nov', name: 'Santos Cosme y Damián de Asia', day: '11-01', category: ['justo'], century: 'III', place: 'Asia Menor' },
  { id: 'pablo-confesor', name: 'San Pablo el Confesor', day: '11-06', category: ['obispo', 'confesor'], century: 'IV', place: 'Constantinopla' },
  { id: 'nectario-noviembre', name: 'San Nectario de Egina', day: '11-09', category: ['obispo'], century: 'XIX–XX', place: 'Egina' },
  { id: 'juan-limosnero', name: 'San Juan el Limosnero', day: '11-12', category: ['obispo'], century: 'VI–VII', place: 'Alejandría' },
  { id: 'felipe-apostol', name: 'San Felipe Apóstol', day: '11-14', category: ['apostol'], century: 'I', place: 'Hierápolis' },
  { id: 'mateo-evangelista', name: 'San Mateo Evangelista', day: '11-16', category: ['apostol'], century: 'I', place: 'Etiopía' },
  { id: 'gregorio-neocesarea', name: 'San Gregorio el Taumaturgo', day: '11-17', category: ['obispo', 'padre'], century: 'III', place: 'Neocesarea del Ponto' },
  { id: 'catalina-alejandria', name: 'Santa Catalina de Alejandría', day: '11-25', category: ['granmartir'], century: 'IV', place: 'Alejandría' },

  /* ---------------- Diciembre ---------------- */
  { id: 'habacuc', name: 'Santo Profeta Habacuc', day: '12-02', category: ['profeta'], century: 'VII a. C.' },
  { id: 'sabas-santificado', name: 'San Sabas el Santificado', day: '12-05', category: ['monje'], century: 'V–VI', place: 'Palestina' },
  { id: 'ambrosio-milan', name: 'San Ambrosio de Milán', day: '12-07', category: ['obispo', 'padre'], century: 'IV', place: 'Milán' },
  { id: 'daniel-estilita', name: 'San Daniel el Estilita', day: '12-11', category: ['monje'], century: 'V', place: 'Constantinopla' },
  { id: 'espiridón-diciembre', name: 'San Espiridón de Trimitonte', day: '12-12', category: ['obispo'], century: 'IV', place: 'Chipre y Corfú' },
  { id: 'eleuterio', name: 'San Eleuterio', day: '12-15', category: ['obispo', 'martir'], century: 'II', place: 'Iliria' },
  { id: 'anastasia-farmacolitria', name: 'Santa Anastasia la Libradora de venenos', day: '12-22', category: ['granmartir'], century: 'III–IV', place: 'Sirmio' },
  { id: 'eugenia', name: 'Santa Eugenia de Roma', day: '12-24', category: ['martir'], century: 'III', place: 'Roma y Alejandría' },
  { id: 'melania-romana', name: 'Santa Melania la Joven', day: '12-31', category: ['justo'], century: 'IV–V', place: 'Roma y Jerusalén' },
];
