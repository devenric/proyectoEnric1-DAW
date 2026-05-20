import { useState, useEffect } from 'react';
import { CORE_HEADS, CORE_BODIES, CORE_AURAS } from './data/items';
import { CharacterState, WardrobeItem } from './types';
import MonigoteBase from './components/MonigoteBase';
import WardrobePanel from './components/WardrobePanel';
import UgcScanner from './components/UgcScanner';

import { 
  Sparkles, 
  Dices, 
  MessageSquareOff, 
  RotateCcw, 
  HelpCircle,
  TrendingUp,
  Coins,
  Smile,
  Info
} from 'lucide-react';

// Skin colors for simulation
const SKIN_COLORS = [
  { name: 'Gris Dummy', value: '#CBD5E1' },
  { name: 'Alienígena', value: '#34D399' },
  { name: 'Cibernético', value: '#38BDF8' },
  { name: 'Silly Pink', value: '#F472B6' },
  { name: 'Oro Puro', value: '#F59E0B' },
  { name: 'Slime Morado', value: '#A78BFA' }
];

// Exclusive collectible pool for the Gachapón Machine!
const GACHAPON_LOCKED_POOL: WardrobeItem[] = [
  {
    id: 'gacha_hamburguesa',
    name: 'Hamburger Voladora',
    category: 'aura',
    rarity: 'legendario',
    description: 'Bate las alitas de murciélago velozmente mientras suelta migas de sésamo cósmicas.',
    creator: 'GachaGod',
    itemCode: 'fantasma', // We fallback beautifully to ghost svg style with colors
    svgColor1: '#FBBF24', // golden yellow bun
    svgColor2: '#DC2626', // crimson tomato
  },
  {
    id: 'gacha_antena',
    name: 'Antena de Televisión Analógica',
    category: 'cabeza',
    rarity: 'epico',
    description: 'Sintoniza las noticias de las tres de la tarde del año 1994. Incluye estática.',
    creator: 'RetroCraft',
    itemCode: 'tostadora',
    svgColor1: '#4B5563', 
    svgColor2: '#10B981',
  },
  {
    id: 'gacha_papas',
    name: 'Sombrero Caja de Patatas',
    category: 'cabeza',
    rarity: 'raro',
    description: 'Huele exactamente a aceite de freír fresco. Atrae moscas pixeladas amistosas.',
    creator: 'BurgaSilly',
    itemCode: 'corona',
    svgColor1: '#EF4444',
    svgColor2: '#FBBF24',
  },
  {
    id: 'gacha_superhero',
    name: 'Capa de Toalla Casera',
    category: 'cuerpo',
    rarity: 'comun',
    description: 'Una toalla vieja atada con una pinza de ropa azul. Te otorga un +3 de confianza extrema.',
    creator: 'PacoElMapache',
    itemCode: 'jersey',
    svgColor1: '#3B82F6', 
    svgColor2: '#F3F4F6',
  },
  {
    id: 'gacha_wood_sword',
    name: 'Uniforme Medieval Trágico',
    category: 'cuerpo',
    rarity: 'legendario',
    description: 'Un escudo de caballero atado en la espalda con cuerdas que rechina al dar cualquier salto.',
    creator: 'SmithyRetro',
    itemCode: 'armadura',
    svgColor1: '#4B5563',
    svgColor2: '#D1D5DB',
  }
];

export default function App() {
  // Available item lists matching types
  const [heads, setHeads] = useState<WardrobeItem[]>(CORE_HEADS);
  const [bodies, setBodies] = useState<WardrobeItem[]>(CORE_BODIES);
  const [auras, setAuras] = useState<WardrobeItem[]>(CORE_AURAS);

  // Character States
  const [charState, setCharState] = useState<CharacterState>({
    skinColor: '#CBD5E1',
    eyeStyle: 'classic',
    animationState: 'idle',
    selectedCabeza: CORE_HEADS[0], // Gato curioso as default
    selectedCuerpo: CORE_BODIES[0], // Jersey navideño as default
    selectedAura: CORE_AURAS[0],    // Fantasguito as default
  });

  // Gachapón simulation states
  const [gachaTokens, setGachaTokens] = useState(5);
  const [gachaItemResult, setGachaItemResult] = useState<WardrobeItem | null>(null);
  const [gachaRolling, setGachaRolling] = useState(false);
  const [gachaStatusMsg, setGachaStatusMsg] = useState('PULSA PARA PROCEDER');

  // Interactive Notification Feed for that "gamberro/silly" vibe
  const [feedMessage, setFeedMessage] = useState('¡Bienvenido al Patio Pixelado! Pruébate algo de ropa.');

  // Auto-clear feed message after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedMessage('Sugerencia: Cambia el estilo de ojos del monigote haciendo clic en su cara.');
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const triggerFeed = (msg: string) => {
    setFeedMessage(msg);
  };

  // Change selected clothes item
  const handleSelectItem = (item: WardrobeItem) => {
    setCharState((prev) => ({
      ...prev,
      [`selected${item.category.charAt(0).toUpperCase() + item.category.slice(1)}` as any]: item
    }));
    triggerFeed(`Te has puesto: "${item.name}" (Creador: ${item.creator})`);
  };

  // Clear specific category of clothes
  const handleClearCategory = (category: 'cabeza' | 'cuerpo' | 'aura') => {
    setCharState((prev) => ({
      ...prev,
      [`selected${category.charAt(0).toUpperCase() + category.slice(1)}` as any]: null
    }));
    triggerFeed(`Te has quitado el outfit de la zona: ${category.toUpperCase()}`);
  };

  // Cycle body eyes randomly on click
  const handleCycleEyes = () => {
    const eyeStyles: CharacterState['eyeStyle'][] = ['classic', 'derp', 'cute', 'angry', 'cool'];
    const currentIndex = eyeStyles.indexOf(charState.eyeStyle);
    const nextIndex = (currentIndex + 1) % eyeStyles.length;
    
    setCharState((prev) => ({
      ...prev,
      eyeStyle: eyeStyles[nextIndex]
    }));
    
    const eyeNames = {
      classic: 'Clásico Sencillo',
      derp: 'Bizco Derp (¡Silly!)',
      cute: 'Ojos Brillantes Kawaii',
      angry: 'Mirada Intensa Gamberra',
      cool: 'Gafas de Sol Radiactivas'
    };

    triggerFeed(`Expresión facial modificada a: ${eyeNames[eyeStyles[nextIndex]]}`);
  };

  // Mix dynamic random dress
  const handleRandomizeOutfit = () => {
    const randomHead = heads[Math.floor(Math.random() * heads.length)] || null;
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)] || null;
    const randomAura = auras[Math.floor(Math.random() * auras.length)] || null;
    const randomEyes: CharacterState['eyeStyle'][] = ['classic', 'derp', 'cute', 'angry', 'cool'];
    const selectedEye = randomEyes[Math.floor(Math.random() * randomEyes.length)];

    setCharState((prev) => ({
      ...prev,
      selectedCabeza: randomHead,
      selectedCuerpo: randomBody,
      selectedAura: randomAura,
      eyeStyle: selectedEye
    }));

    triggerFeed('🎲 ¡Armario barajado! ¡Qué combinación más estrafalaria!');
  };

  // Reset character customizator
  const handleResetOutfit = () => {
    setCharState((prev) => ({
      ...prev,
      selectedCabeza: null,
      selectedCuerpo: null,
      selectedAura: null,
      eyeStyle: 'classic'
    }));
    triggerFeed('🧹 Limpieza de armario completada. Monigote base al desnudo.');
  };

  // Receive approved UGC item from Customs AI
  const handleAddApprovedUgc = (newItem: WardrobeItem) => {
    if (newItem.category === 'cabeza') {
      setHeads((prev) => [newItem, ...prev]);
    } else {
      setBodies((prev) => [newItem, ...prev]);
    }
    
    // Auto equip!
    setCharState((prev) => ({
      ...prev,
      [`selected${newItem.category.charAt(0).toUpperCase() + newItem.category.slice(1)}` as any]: newItem
    }));
    
    triggerFeed(`🎉 ¡UGC Aprobado! Equipada automáticamente tu creación: "${newItem.name}"`);
  };

  // Pull Lever from the Permanent Community Gachapon slot machine!
  const handlePullGachapon = () => {
    if (gachaRolling) return;
    if (gachaTokens <= 0) {
      setGachaStatusMsg('❌ SIN FICHAS');
      triggerFeed('¡Te has quedado sin fichas gachapón! Pero Paco te regala 3 más de estrangis.');
      setTimeout(() => {
        setGachaTokens(3);
        setGachaStatusMsg('PULSA PARA PROCEDER');
      }, 1500);
      return;
    }

    setGachaRolling(true);
    setGachaItemResult(null);
    setGachaTokens((prev) => prev - 1);
    setGachaStatusMsg('VOLTEANDO POZO COLECTIVO...');
    triggerFeed('🎲 Tirando de la palanca de la tragaperras comunitaria...');

    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      // Create a fancy cycling message to mimic the slot rolling
      const tempItems = [...heads, ...bodies, ...auras];
      const randomItem = tempItems[Math.floor(Math.random() * tempItems.length)];
      if (randomItem) {
        setGachaStatusMsg(`🎰 [ ${randomItem.name.toUpperCase()} ] 🎰`);
      }

      if (ticks === 12) {
        clearInterval(interval);
        
        // Pick a guaranteed collectible item from GACHAPON_LOCKED_POOL
        const unlockedCollectible = GACHAPON_LOCKED_POOL[Math.floor(Math.random() * GACHAPON_LOCKED_POOL.length)];
        
        if (unlockedCollectible) {
          // Add it to our wardrobe state lists so user can browse and wear it!
          if (unlockedCollectible.category === 'cabeza') {
            setHeads((prev) => {
              if (prev.some((h) => h.id === unlockedCollectible.id)) return prev;
              return [unlockedCollectible, ...prev];
            });
          } else if (unlockedCollectible.category === 'cuerpo') {
            setBodies((prev) => {
              if (prev.some((b) => b.id === unlockedCollectible.id)) return prev;
              return [unlockedCollectible, ...prev];
            });
          } else {
            setAuras((prev) => {
              if (prev.some((a) => a.id === unlockedCollectible.id)) return prev;
              return [unlockedCollectible, ...prev];
            });
          }

          setGachaItemResult(unlockedCollectible);
          // Auto equip the reward
          handleSelectItem(unlockedCollectible);
          setGachaStatusMsg('✨ ¡COSMÉTICO DESBLOQUEADO! ✨');
          triggerFeed(`🎁 GACHAPÓN: ¡Has conseguido "${unlockedCollectible.name}" creado por ${unlockedCollectible.creator}!`);
        }
        setGachaRolling(false);
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-mono relative overflow-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Immersive CRT Monocromatic Scanline Overlay */}
      <div className="crt-overlay" />
      
      {/* Top Header Row with Flourescent Neon Theme */}
      <header className="border-b border-[#ccff00]/30 bg-slate-950/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 select-none">
        <div className="flex items-center gap-3">
          {/* Animated Retro Logo with outline glow */}
          <div className="w-10 h-10 bg-[#ccff00] rounded flex items-center justify-center font-mono font-black text-black text-2xl shadow-[0_0_15px_rgba(204,255,0,0.4)] relative overflow-hidden group">
            <span className="relative z-10 animate-bounce">P</span>
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black neon-text tracking-wide m-0">
                EL PATIO PIXELADO
              </h1>
              <span className="text-[9px] font-bold bg-[#ff00ff]/10 text-[#ff00ff] border border-[#ff00ff]/30 px-1.5 py-0.5 rounded uppercase tracking-widest">
                V.0.4.1 ALPHA PREVIEW // ARQUITECTO: ENFP-CORE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight uppercase">
              SISTEMA PAPER-DOLL ONLINE // AMBIENTE TOTALMENTE INMERSIVO
            </p>
          </div>
        </div>

        {/* Live System Tickers in Immersive Style */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex bg-black px-4 py-2 border border-[#ccff00]/30 rounded">
            <span className="text-slate-500 text-[9px] block uppercase tracking-wider">IA ADUANAS</span>
            <span className="text-[#00ff00] text-xs font-bold font-mono">SECURE // SEC_LOCK_OK</span>
          </div>
          <div className="bg-black px-4 py-2 border border-[#ff00ff]/30 rounded">
            <span className="text-slate-500 text-[9px] block uppercase tracking-wider">GACHA COINS</span>
            <span className="text-[#ff00ff] text-xs font-bold font-mono flex items-center gap-1">
              {1240 + gachaTokens * 10} ✦
            </span>
          </div>
        </div>
      </header>

      {/* Main Multi-grid Workspace Wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* LEFT COLUMN (1/3) - Character canvas and cosmetic behaviors */}
        <section className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Main Character Stage & Interactive Canvas */}
          <div className="bg-black/90 border-2 border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[430px] arcade-glow">
            {/* Stage Title */}
            <div className="flex justify-between items-center select-none shrink-0 border-b border-[#ccff00]/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-[#ccff00]" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                  [03] MINI AVATAR VISUALIZER
                </span>
              </div>
              
              {/* Reset to naked options */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRandomizeOutfit}
                  title="Aleatorio"
                  className="p-1 px-2.5 text-[10px] text-[#ccff00] hover:bg-[#ccff00] hover:text-black bg-black border border-[#ccff00]/40 transition-all rounded font-bold uppercase"
                >
                  MIX
                </button>
                <button
                  onClick={handleResetOutfit}
                  title="Quitar todo"
                  className="p-1 px-2.5 text-[10px] text-red-400 hover:bg-red-500/20 bg-black border border-red-900 transition-all rounded font-bold uppercase"
                >
                  CLEAR
                </button>
              </div>
            </div>

            {/* Inner concentric overlay lines for retro feeling */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-[450px] h-[450px] border border-white rounded-full" />
              <div className="w-[320px] h-[320px] border border-white/50 rounded-full" />
            </div>

            {/* Render center base dynamic avatar dolls */}
            <MonigoteBase 
              state={charState} 
              onEyeClick={handleCycleEyes} 
            />

            {/* Bottom Color Selectors / Expressions */}
            <div className="space-y-3 shrink-0 pt-3 border-t border-[#ccff00]/10">
              
              {/* Skin Tone Selector */}
              <div>
                <span className="text-[10px] text-slate-400 uppercase block mb-1.5 font-bold tracking-wider">
                  Color de Piel (Monigote Base):
                </span>
                <div className="flex gap-2">
                  {SKIN_COLORS.map((col) => (
                    <button
                      key={col.value}
                      onClick={() => {
                        setCharState(v => ({ ...v, skinColor: col.value }));
                        triggerFeed(`Tonalidad del cuerpo modificada a: "${col.name}"`);
                      }}
                      title={col.name}
                      style={{ backgroundColor: col.value }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer hover:scale-115 ${
                        charState.skinColor === col.value ? 'border-[#ccff00] scale-110 shadow-[0_0_8px_#ccff00]' : 'border-[#1a1a1a]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Expression selector info notice */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Simulador Movimiento:
                </span>
                <div className="flex gap-1">
                  {(['idle', 'dancing', 'walking', 'jumping'] as const).map((anim) => (
                    <button
                      key={anim}
                      onClick={() => {
                        setCharState(v => ({ ...v, animationState: anim }));
                        triggerFeed(`Cambiando animación de movimiento a: ${anim.toUpperCase()}`);
                      }}
                      className={`text-[9.5px] uppercase px-2 py-1 rounded transition-all cursor-pointer ${
                        charState.animationState === anim
                          ? 'bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00] font-black'
                          : 'bg-black text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {anim === 'idle' && 'Básica'}
                      {anim === 'dancing' && 'Baile'}
                      {anim === 'walking' && 'Walk'}
                      {anim === 'jumping' && 'Boot'}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Community Gachapon slot machine widget */}
          <div className="bg-black/95 border-2 border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col select-none arcade-glow-pink">
            <div className="flex items-center justify-between mb-3 border-b border-[#ff00ff]/20 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff00ff] animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                  [04] TRAGAPERRAS COMUNITARIA
                </span>
              </div>
              <span className="text-[10.5px] text-[#ff00ff] flex items-center gap-1.5 font-bold">
                FICHAS: {gachaTokens}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-4 uppercase">
              Consigue cosméticos aleatorios creados por otros vecinos que la IA de Aduanas ha aprobado. ¡Pozo permanente!
            </p>

            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded border border-slate-850 relative">
              {/* Status slot readout */}
              <div className="flex-1 bg-black px-3 py-2.5 rounded border border-[#ff00ff]/20 text-center text-xs font-bold truncate text-[#ff00ff] min-h-[38px] flex items-center justify-center">
                {gachaStatusMsg}
              </div>

              {/* Animated lever pull button */}
              <button
                disabled={gachaRolling}
                onClick={handlePullGachapon}
                className={`px-4 py-2.5 rounded text-xs font-black bg-[#ff00ff] text-black hover:bg-white transition-all shadow-[0_0_12px_rgba(255,0,255,0.4)] active:scale-95 cursor-pointer flex items-center justify-center uppercase`}
              >
                {gachaRolling ? 'ROLLING' : 'X-PALANCA'}
              </button>
            </div>

            {/* Display reward window if available */}
            {gachaItemResult && (
              <div className="mt-3 p-2.5 bg-[#ff00ff]/10 border border-[#ff00ff]/30 rounded flex items-center gap-2.5">
                <span className="text-xl">🎁</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[#ff00ff] uppercase font-bold">¡Premio obtenido!</div>
                  <div className="text-xs text-white font-bold truncate leading-none">
                    {gachaItemResult.name}
                  </div>
                </div>
                <div className="text-[9px] bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/40 px-1.5 py-0.5 rounded font-black uppercase">
                  {gachaItemResult.rarity}
                </div>
              </div>
            )}
          </div>

        </section>

        {/* CENTER COLUMN (2/3) - Wardrobe Explorer panel lists */}
        <section className="lg:col-span-4 flex flex-col h-full">
          <WardrobePanel
            heads={heads}
            bodies={bodies}
            auras={auras}
            selectedCabeza={charState.selectedCabeza}
            selectedCuerpo={charState.selectedCuerpo}
            selectedAura={charState.selectedAura}
            onSelectItem={handleSelectItem}
            onClearCategory={handleClearCategory}
          />
        </section>

        {/* RIGHT COLUMN (3/3) - UGC Aduanas scanner AI simulator */}
        <section className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full">
          
          {/* UGC Drag/Drop Scanner Panel */}
          <div className="flex-1">
            <UgcScanner onApprovedItem={handleAddApprovedUgc} />
          </div>

          {/* SILLY NEWS FEED TICKER BAR (Bottom row info) */}
          <div className="bg-black border-2 border-slate-800 rounded-2xl p-4 shadow-sm shrink-0 select-none">
            <div className="flex items-center gap-2 mb-1.5 text-slate-400 border-b border-[#ccff00]/10 pb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#ccff00]" />
              <span className="text-[10.5px] uppercase tracking-wider font-bold text-[#ccff00]">
                VECINDARIO FEED // CONSOLA ACTIVA
              </span>
            </div>
            <div className="p-2.5 bg-black rounded border border-slate-850 min-h-[46px] flex items-center justify-between">
              <p className="text-[11px] text-slate-300 leading-snug">
                {feedMessage}
              </p>
            </div>
          </div>

          {/* Quick specs notes block for Creative Director */}
          <div className="bg-slate-950 border border-slate-850 p-3 rounded flex gap-2.5 select-none shrink-0">
            <Info className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#ccff00] uppercase font-black block tracking-widest">ARQUITECTURA DE CAPAS:</span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono uppercase">
                Paper doll renderiza en tiempo real sobre capas de superposición inercial sincrónica ({charState.animationState.toUpperCase()}).
              </p>
            </div>
          </div>

        </section>

      </main>

      {/* Footer System Credits */}
      <footer className="border-t border-[#ccff00]/10 py-3 text-center text-[10px] text-slate-500 select-none shrink-0 uppercase tracking-widest bg-black">
        EL PATIO PIXELADO SYSTEM v0.4.1 // COMPONENT: SCREEN_CRT_V2 // 2026
      </footer>

    </div>
  );
}
