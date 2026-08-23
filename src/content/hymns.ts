/**
 * Akathistos y cánones.
 *
 * Los himnos completos son extensos y su versión española no siempre está
 * disponible con una licencia compatible. ATHOS mantiene la ficha íntegra de
 * cada uno —autor, ocasión, estructura— e incorpora el texto sólo cuando puede
 * verificarlo. El resto queda marcado como pendiente.
 */
import type { Akathist, Canon, OfficeSection, SourceMeta, TextBlock } from '@/types';

const meta: SourceMeta = {
  source: 'Triodion, Menaion y colecciones de himnografía bizantina',
  tradition: 'Rito bizantino',
  language: 'es',
  license: 'traditional',
  dateAdded: '2026-01-01',
};

const pendingMeta = (notes: string): SourceMeta => ({ ...meta, license: 'pending', notes });

const t = (content: string): TextBlock => ({ kind: 'text', content });
const rub = (content: string): TextBlock => ({ kind: 'rubric', content });
const ref = (content: string): TextBlock => ({ kind: 'refrain', content });
const pending = (what: string): TextBlock => ({
  kind: 'pending',
  content: `Contenido pendiente de incorporar: ${what}`,
});

const s = (id: string, title: string, blocks: TextBlock[]): OfficeSection => ({ id, title, blocks });

/* ---------------- Akathistos ---------------- */

interface AkathistSeed {
  id: string;
  title: string;
  dedication: string;
  sections: OfficeSection[];
  status: Akathist['status'];
  meta: SourceMeta;
}

const akathistSeeds: AkathistSeed[] = [
  {
    id: 'akathistos-theotokos',
    title: 'Himno Akáthistos a la Santísima Theotokos',
    dedication: 'Theotokos',
    status: 'partial',
    meta: {
      ...meta,
      author: 'Atribuido a san Romano el Meloda (siglo VI)',
      source: 'Triodion. Se canta por partes los cinco primeros viernes de la Gran Cuaresma.',
      notes: 'Se incorporan el kontakion inicial y la estructura; las veinticuatro estrofas están pendientes.',
    },
    sections: [
      s('presentacion', 'El himno', [
        rub('Akáthistos significa «de pie»: es el himno que se canta sin sentarse. Consta de veinticuatro estrofas alternas —trece kontakia y doce ikoi— que siguen el orden del alfabeto griego. Los ikoi terminan siempre con el mismo saludo.'),
      ]),
      s('kontakion', 'Kontakion inicial', [
        t('A Ti, invencible caudilla, entonamos el himno de victoria; y por habernos librado de los peligros, a Ti, Theotokos, damos gracias los que somos tu ciudad. Y Tú, que tienes un poder invencible, líbranos de toda clase de peligros, para que te aclamemos: ¡Salve, Esposa siempre Virgen!'),
        rub('Este kontakion se compuso, según la tradición, tras la liberación de Constantinopla en el año 626.'),
      ]),
      s('saludos', 'Los saludos', [
        ref('¡Salve, Esposa siempre Virgen!'),
        ref('¡Aleluya!'),
        rub('Los ikoi terminan con el primero de estos estribillos; los kontakia, con el segundo.'),
        pending('las veinticuatro estrofas del himno.'),
      ]),
    ],
  },
  {
    id: 'akathistos-jesus',
    title: 'Akáthistos al Dulcísimo Señor Jesús',
    dedication: 'Cristo',
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    sections: [
      s('ficha', 'Ficha', [
        rub('Akáthistos al Nombre de Jesús, muy usado en la piedad rusa y griega. Su estribillo es «¡Jesús, Hijo de Dios, ten piedad de mí!».'),
        pending('el texto completo.'),
      ]),
    ],
  },
  {
    id: 'akathistos-nicolas',
    title: 'Akáthistos a san Nicolás de Mira',
    dedication: 'San Nicolás',
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    sections: [s('ficha', 'Ficha', [pending('el texto completo.')])],
  },
  {
    id: 'akathistos-difuntos',
    title: 'Akáthistos por los difuntos',
    dedication: 'Difuntos',
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    sections: [s('ficha', 'Ficha', [pending('el texto completo.')])],
  },
  {
    id: 'akathistos-pasion',
    title: 'Akáthistos a la Pasión de Cristo',
    dedication: 'Cristo',
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    sections: [s('ficha', 'Ficha', [pending('el texto completo.')])],
  },
];

export const AKATHISTS: Akathist[] = akathistSeeds.map((a) => ({
  ...a,
  searchText: `${a.title} ${a.dedication} ${a.sections
    .flatMap((x) => x.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content))
    .join(' ')}`
    .replace(/<[^>]+>/g, '')
    .toLowerCase(),
}));

/* ---------------- Cánones ---------------- */

interface CanonSeed {
  id: string;
  title: string;
  dedication: string;
  tone?: number;
  odes: OfficeSection[];
  status: Canon['status'];
  meta: SourceMeta;
}

const ODE_TITLES = [
  'Oda 1 — El cántico de Moisés tras el paso del mar Rojo',
  'Oda 3 — El cántico de Ana, madre de Samuel',
  'Oda 4 — El cántico del profeta Habacuc',
  'Oda 5 — El cántico del profeta Isaías',
  'Oda 6 — El cántico del profeta Jonás',
  'Oda 7 — El cántico de los tres jóvenes en el horno',
  'Oda 8 — La continuación del cántico de los tres jóvenes',
  'Oda 9 — El cántico de la Theotokos y el de Zacarías',
];

const canonSeeds: CanonSeed[] = [
  {
    id: 'gran-canon-andres',
    title: 'Gran Canon de san Andrés de Creta',
    dedication: 'Arrepentimiento',
    status: 'partial',
    meta: {
      ...meta,
      author: 'San Andrés de Creta († 740)',
      source: 'Triodion. Se canta partido las cuatro primeras noches de la Gran Cuaresma y entero el jueves de la quinta semana.',
      notes: 'Se incorporan la estructura y el estribillo; las cerca de doscientas cincuenta estrofas están pendientes.',
    },
    odes: [
      s('presentacion', 'El canon', [
        rub('El canon penitencial más extenso de la Iglesia. Recorre toda la Escritura, del Génesis al Evangelio, poniendo al alma frente a cada figura bíblica: «¿A quién te has parecido, alma mía?».'),
        ref('Ten piedad de mí, oh Dios, ten piedad de mí.'),
        rub('Este estribillo se repite con una postración después de cada estrofa.'),
      ]),
      s('irmos-oda1', 'Irmos de la primera oda', [
        t('Auxiliador y protector se ha hecho para mi salvación. Éste es mi Dios, y le glorificaré; el Dios de mi padre, y le exaltaré, porque gloriosamente se ha glorificado.'),
        pending('las estrofas de las nueve odas.'),
      ]),
      s('odas', 'Estructura', ODE_TITLES.map((title) => rub(title))),
    ],
  },
  {
    id: 'canon-comunion',
    title: 'Canon de preparación para la Santa Comunión',
    dedication: 'Comunión',
    tone: 2,
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    odes: [
      s('ficha', 'Ficha', [
        rub('Se lee la víspera de comulgar, junto con el canon al Ángel de la Guarda y el de la Theotokos, y seguido de las oraciones ante la Comunión.'),
        rub('Las oraciones ante la Comunión ya están incorporadas: Orar → Oraciones → Preparación para la comunión.'),
        pending('las nueve odas del canon.'),
      ]),
    ],
  },
  {
    id: 'canon-angel',
    title: 'Canon al Ángel de la Guarda',
    dedication: 'Ángel custodio',
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    odes: [s('ficha', 'Ficha', [pending('las nueve odas del canon.')])],
  },
  {
    id: 'canon-theotokos-paraclisis',
    title: 'Canon de la Pequeña Paráclesis',
    dedication: 'Theotokos',
    tone: 8,
    status: 'pending',
    meta: pendingMeta('Texto español pendiente de verificar.'),
    odes: [
      s('ficha', 'Ficha', [
        rub('Se canta en las dos primeras semanas de agosto y en cualquier momento de aflicción.'),
        pending('las nueve odas del canon.'),
      ]),
    ],
  },
  {
    id: 'canon-pascual',
    title: 'Canon Pascual',
    dedication: 'Pascua',
    tone: 1,
    status: 'partial',
    meta: { ...meta, author: 'San Juan Damasceno', source: 'Pentecostario' },
    odes: [
      s('irmos', 'Irmos de la primera oda', [
        t('Éste es el día de la Resurrección: resplandezcamos, pueblos. ¡Pascua, Pascua del Señor! De la muerte a la vida y de la tierra al cielo nos ha llevado Cristo Dios, a los que cantamos el himno de victoria.'),
        pending('las restantes odas del canon.'),
      ]),
      s('estribillo', 'Estribillo', [ref('¡Cristo ha resucitado de entre los muertos!')]),
    ],
  },
];

export const CANONS: Canon[] = canonSeeds.map((c) => ({
  ...c,
  searchText: `${c.title} ${c.dedication} ${c.odes
    .flatMap((x) => x.blocks.filter((b) => b.kind !== 'pending').map((b) => b.content))
    .join(' ')}`
    .replace(/<[^>]+>/g, '')
    .toLowerCase(),
}));

export const HYMNS_NOTE =
  'Los himnos marcados como pendientes conservan su ficha completa. ATHOS prefiere una ficha ' +
  'honesta a un texto aproximado.';
