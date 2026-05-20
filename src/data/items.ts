import { WardrobeItem } from '../types';

export const CORE_HEADS: WardrobeItem[] = [
  {
    id: 'gato_furioso',
    name: 'Gato Curioso Místico',
    category: 'cabeza',
    rarity: 'epico',
    description: 'Un gatete de orejas gachas que ha decidido acampar en tu cocorota. No araña... casi nunca.',
    creator: 'MemeMaster99',
    itemCode: 'gato',
    svgColor1: '#1F2937', // charcoal
    svgColor2: '#F87171', // soft red inside ears
  },
  {
    id: 'cerebro_alien',
    name: 'Cerebro Fluorescente',
    category: 'cabeza',
    rarity: 'legendario',
    description: 'Emana una sabiduría interestelar y un sutil zumbido a 415Hz. Puede sintonizar radios espaciales.',
    creator: 'CosmicDev',
    itemCode: 'cerebro',
    svgColor1: '#4ADE80', // neon-green
    svgColor2: '#22C55E', // deep-green
  },
  {
    id: 'tostadora_retro',
    name: 'Tostadora Atómica v2',
    category: 'cabeza',
    rarity: 'raro',
    description: 'Perfectamente aislada. Sigue tostando pan integral de sésamo a pesar de los viajes de portal.',
    creator: 'RetroFanatic',
    itemCode: 'tostadora',
    svgColor1: '#9CA3AF', // chrome
    svgColor2: '#F97316', // orange heat
  },
  {
    id: 'corona_carton',
    name: 'Corona de Cartón Silly',
    category: 'cabeza',
    rarity: 'silly',
    description: 'Fabricada con material 100% reciclado de cajas de mudanza. El pegamento todavía huele.',
    creator: 'PacoElMapache',
    itemCode: 'corona',
    svgColor1: '#FBBF24', // golden yellow cardboard
    svgColor2: '#D97706', // dark gold accent
  },
  {
    id: 'hongo_gamberro',
    name: 'Boletus Gamberro',
    category: 'cabeza',
    rarity: 'comun',
    description: 'Un hongo misterioso. Cada vez que parpadeas, sus puntos de colores cambian ligeramente.',
    creator: 'PixForest',
    itemCode: 'hongo',
    svgColor1: '#EC4899', // hot pink cap
    svgColor2: '#FFFFFF', // white specks
  },
  {
    id: 'gafas_cyber',
    name: 'A-shades Holográficas',
    category: 'cabeza',
    rarity: 'epico',
    description: 'Unas gafas que no te dejan ver nada, pero la interfaz holográfica que proyectan es tremenda.',
    creator: 'NeonHacker',
    itemCode: 'gafas',
    svgColor1: '#06B6D4', // cyan frame
    svgColor2: '#8B5CF6', // purple shine
  }
];

export const CORE_BODIES: WardrobeItem[] = [
  {
    id: 'jersey_navideno',
    name: 'Jersey de Llama Feo',
    category: 'cuerpo',
    rarity: 'comun',
    description: 'Pica bastante, pero abriga más. Tiene una llama pixelada distorsionada en el pecho.',
    creator: 'AbuelaPixel',
    itemCode: 'jersey',
    svgColor1: '#EF4444', // red
    svgColor2: '#FFFFFF', // white llama
  },
  {
    id: 'pijama_dino',
    name: 'Dino-Kigurumi de Felpa',
    category: 'cuerpo',
    rarity: 'epico',
    description: 'Te otorga un +10 de agresividad tierna y ganas incontrolables de masticar galletas.',
    creator: 'KigurumiKing',
    itemCode: 'dino',
    svgColor1: '#10B981', // green
    svgColor2: '#F59E0B', // gold back-spikes
  },
  {
    id: 'armadura_carton',
    name: 'Armadura "Caballero Barato"',
    category: 'cuerpo',
    rarity: 'raro',
    description: 'Armadura ultra ligera hecha a mano con cinta de carrocero y cartón corrugado de alta resistencia.',
    creator: 'PacoElMapache',
    itemCode: 'armadura',
    svgColor1: '#B45309', // scotch brown
    svgColor2: '#4B5563', // dark tape stripes
  },
  {
    id: 'esmoquin_pixel',
    name: 'Esmoquin de Agente Secreto',
    category: 'cuerpo',
    rarity: 'legendario',
    description: 'Impecable. Repelente a manchas de refresco, grasa de pizza y paradojas temporales.',
    creator: 'AgentSilly',
    itemCode: 'tuxedo',
    svgColor1: '#111827', // ultra black
    svgColor2: '#3B82F6', // blue bow-tie
  },
  {
    id: 'slime_viscoso',
    name: 'Cuerpo de Slime Flotante',
    category: 'cuerpo',
    rarity: 'silly',
    description: 'Sustituyes tus extremidades inferiores por gelatina burbujeante. Deja rastro brillante.',
    creator: 'SlimeLab',
    itemCode: 'slime',
    svgColor1: '#A855F7', // bright purple slimy
    svgColor2: '#C084FC', // highlight purple
  }
];

export const CORE_AURAS: WardrobeItem[] = [
  {
    id: 'fantasguito',
    name: 'Espectro Amigo Mini',
    category: 'aura',
    rarity: 'legendario',
    description: 'Un espíritu curioso que vigila tu hombro izquierdo y emite un suave quejido de afecto.',
    creator: 'GhostWhisper',
    itemCode: 'fantasma',
    svgColor1: '#E0F2FE', // light blue ghostly
    svgColor2: '#38BDF8', // soft blue outline
  },
  {
    id: 'nube_lluviosa',
    name: 'Nube de Tormenta Berrinchuda',
    category: 'aura',
    rarity: 'epico',
    description: 'Siempre está de mal humor. Te rocía con microgotitas pixeladas y mini-truenos estáticos.',
    creator: 'SkyMaster',
    itemCode: 'nube',
    svgColor1: '#6B7280', // grey cloud
    svgColor2: '#FBBF24', // lightning flash
  },
  {
    id: 'sparkles_magicos',
    name: 'Aura Astral de Purpurina',
    category: 'aura',
    rarity: 'raro',
    description: 'Brillitos cósmicos y destellos retro de 8 bits que giran perezosamente a tu alrededor.',
    creator: 'AstralTailor',
    itemCode: 'brillos',
    svgColor1: '#F472B6', // pink sparkles
    svgColor2: '#60A5FA', // blue sparkles
  },
  {
    id: 'glitch_matrix',
    name: 'Fallo Temporal de Red',
    category: 'aura',
    rarity: 'silly',
    description: 'Código de error verdoso cayendo. Hace que parte de tu monigote parpadee intermitentemente.',
    creator: 'SystemOperator',
    itemCode: 'glitch',
    svgColor1: '#22C55E', // matrix green
    svgColor2: '#000000', // shadow green
  }
];
