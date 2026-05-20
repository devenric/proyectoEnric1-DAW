export type RarityType = 'comun' | 'raro' | 'epico' | 'legendario' | 'silly';

export interface WardrobeItem {
  id: string;
  name: string;
  category: 'cabeza' | 'cuerpo' | 'aura';
  rarity: RarityType;
  description: string;
  creator: string;
  svgColor1?: string;
  svgColor2?: string;
  // customIsUgc indicates custom client-uploaded image
  isUgc?: boolean;
  ugcUrl?: string; // Generated ObjectURL
  // To draw SVG representation easily without heavy bitmaps
  itemCode: string;
}

export interface CharacterState {
  skinColor: string;
  eyeStyle: 'classic' | 'derp' | 'cute' | 'angry' | 'cool';
  animationState: 'idle' | 'dancing' | 'walking' | 'jumping';
  selectedCabeza: WardrobeItem | null;
  selectedCuerpo: WardrobeItem | null;
  selectedAura: WardrobeItem | null;
}
