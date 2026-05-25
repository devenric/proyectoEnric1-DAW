import { useState } from 'react';
import { WardrobeItem, RarityType } from '../types';
import { Sparkles, Crown, User, HelpCircle, AlertCircle } from 'lucide-react';

interface WardrobePanelProps { //interfaz para las el "CRUD" de cada cosmético
  heads: WardrobeItem[];
  hairs: WardrobeItem[];
  bodies: WardrobeItem[];
  auras: WardrobeItem[];
  selectedCabeza: WardrobeItem | null;
  selectedPelo: WardrobeItem | null;
  selectedCuerpo: WardrobeItem | null;
  selectedAura: WardrobeItem | null;
  onSelectItem: (item: WardrobeItem) => void;
  onClearCategory: (category: 'cabeza' | 'cuerpo' | 'aura') => void;
}

export default function WardrobePanel({
  heads,
  hairs,
  bodies,
  auras,
  selectedCabeza,
  selectedPelo,
  selectedCuerpo,
  selectedAura,
  onSelectItem,
  onClearCategory,
}: WardrobePanelProps) {
  const [activeTab, setActiveTab] = useState<'cabeza' | 'pelo' | 'cuerpo' | 'aura'>('cabeza'); //esto es para la pestaña activa

  const getRarityStyles = (rarity: RarityType) => {
    switch (rarity) { //switch para los estilos de cada rareza
      case 'comun':
        return {
          bg: 'bg-black/40 hover:bg-black/80',
          border: 'border-slate-800',
          badge: 'bg-slate-900 text-slate-400 border-slate-800',
          glow: '',
          text: 'text-slate-300',
        };
      case 'raro':
        return {
          bg: 'bg-black/50 hover:bg-[#00ffff]/5',
          border: 'border-[#00ffff]/20 hover:border-[#00ffff]',
          badge: 'bg-[#00ffff]/10 text-[#00ffff] border-[#00ffff]/30',
          glow: 'hover:shadow-[0_0_10px_rgba(0,255,255,0.2)]',
          text: 'text-[#00ffff]',
        };
      case 'epico':
        return {
          bg: 'bg-black/50 hover:bg-[#ff00ff]/5',
          border: 'border-[#ff00ff]/20 hover:border-[#ff00ff]',
          badge: 'bg-[#ff00ff]/10 text-[#ff00ff] border-[#ff00ff]/30',
          glow: 'hover:shadow-[0_0_12px_rgba(255,0,255,0.35)]',
          text: 'text-[#ff00ff]',
        };
      case 'legendario':
        return {
          bg: 'bg-black/60 hover:bg-[#ccff00]/5',
          border: 'border-[#ccff00]/30 hover:border-[#ccff00]',
          badge: 'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30',
          glow: 'hover:shadow-[0_0_15px_rgba(204,255,0,0.4)]',
          text: 'text-[#ccff00]',
        };
      case 'silly':
        return {
          bg: 'bg-black/60 hover:bg-[#ff00ff]/10',
          border: 'border-[#ff00ff]/40 hover:border-white',
          badge: 'bg-[#ff00ff]/15 text-[#ff00ff] border-pink-500/30',
          glow: 'hover:shadow-[0_0_15px_rgba(255,0,255,0.45)]',
          text: 'text-pink-300',
        };
    }
  };

  const currentItems =  //esto sé que se basa en activeTab, pero no sé muy bien a que se refiere lo del ? y el : 
    activeTab === 'cabeza' ? heads : 
    activeTab === 'pelo' ? hairs : 
    activeTab === 'cuerpo' ? bodies : auras;

  const currentSelectedItem = 
    activeTab === 'cabeza' ? selectedCabeza : 
    activeTab === 'pelo' ? selectedPelo :
    activeTab === 'cuerpo' ? selectedCuerpo : selectedAura;

  return ( //esto devuelve el HTML
    <div className="flex flex-col h-full bg-black/90 border-2 border-slate-800 rounded-2xl overflow-hidden p-5 shadow-2xl arcade-glow">
      {/* Visual Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="p-2.5 bg-[#ccff00]/10 rounded border border-[#ccff00]/30 text-[#ccff00]">
          <Crown className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-md font-bold text-slate-200 tracking-wider uppercase">[01] EQUIPAR ARMARIO MODULAR</h2>
          <p className="text-[10px] font-mono text-slate-500">SELECCIONE PIEZA DEL ARCHIVO COMUNAL</p>
        </div>
      </div>

      {/* Premium Category Tabs */}
      <div className="flex gap-1.5 p-1 bg-black rounded border border-slate-900 shrink-0 mb-4">
        {(['cabeza','pelo','cuerpo', 'aura'] as const).map((tab) => ( //como que as const? no entiendo esta parte de sintaxis, pero sé que se refiere a que recorre lo que hay en cada tab
          <button
            key={tab}
            onClick={() => setActiveTab(tab)} //aaaah, claro! con este estado, al hacer click en cada pestaña, se cambia el estado, pero 
            className={`flex-1 py-1.5 text-xs font-bold rounded uppercase transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00] font-black shadow-[0_0_8px_rgba(204,255,0,0.25)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            {tab === 'cabeza' && 'Cabeza'} 
            {tab === 'pelo' && 'Pelo'}
            {tab === 'cuerpo' && 'Cuerpo'}
            {tab === 'aura' && 'Aura / Pet'}
          </button>//esto no sé a qué se refiere (lo de &&)
        ))}
      </div>

      {/* Wardrobe Items Grid */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
            <AlertCircle className="w-8 h-8 opacity-40 mb-2 text-[#ccff00]" />
            <span className="text-xs font-mono">ARMARIO ACCESORIO VACÍO</span>
            <span className="text-[10px] text-slate-600 uppercase">Use el escáner IA para subir nuevos cosméticos.</span>
          </div>
        ) : ( // y esos 2 puntos? no entiendo 
          <div className="grid grid-cols-2 gap-2.5">
            {currentItems.map((item) => {
              const styles = getRarityStyles(item.rarity);
              const isSelected = currentSelectedItem?.id === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  style={{ imageRendering: 'pixelated' }}
                  className={`relative flex flex-col p-3 rounded border text-left transition-all duration-200 cursor-pointer ${styles.bg} ${styles.glow} ${
                    isSelected ? 'border-[#ccff00] bg-[#ccff00]/5 shadow-[0_0_10px_rgba(204,255,0,0.25)]' : styles.border
                  }`}
                >
                  {/* Item mini-display wrapper */}
                  <div className="flex justify-between items-start mb-2 w-full">
                    <span className={`text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded border ${styles.badge}`}>
                      {item.rarity}
                    </span>
                    {item.isUgc && (
                      <span className="text-[8px] font-mono bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-1 rounded">
                        UGC IA
                      </span>
                    )}
                  </div>

                  {/* Icon illustration block inside item button */}
                  <div className="w-10 h-10 rounded bg-[#020202] flex items-center justify-center shrink-0 mb-2.5 self-center border border-slate-800">
                    {item.isUgc && item.ugcUrl ? (
                      <img src={item.ugcUrl} alt={item.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      // Custom pixel styling drawing indicator
                      <div className="text-xl select-none filter drop-shadow">
                        {item.itemCode === 'gato' && '🐱'}
                        {item.itemCode === 'cerebro' && '🧠'}
                        {item.itemCode === 'tostadora' && '🍞'}
                        {item.itemCode === 'corona' && '👑'}
                        {item.itemCode === 'hongo' && '🍄'}
                        {item.itemCode === 'gafas' && '🕶️'}
                        {item.itemCode === 'jersey' && '👕'}
                        {item.itemCode === 'dino' && '🐉'}
                        {item.itemCode === 'armadura' && '🛡️'}
                        {item.itemCode === 'tuxedo' && '🕴️'}
                        {item.itemCode === 'slime' && '🧬'}
                        {item.itemCode === 'fantasma' && '👻'}
                        {item.itemCode === 'nube' && '⛈️'}
                        {item.itemCode === 'brillos' && '✨'}
                        {item.itemCode === 'glitch' && '👾'}
                      </div>
                    )}
                  </div>

                  {/* Text titles */}
                  <div className="space-y-0.5 w-full">
                    <h3 className={`font-mono font-bold text-xs leading-snug truncate ${styles.text}`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
                      <User className="w-2.5 h-2.5" />
                      <span className="truncate">{item.creator}</span>
                    </div>
                  </div>

                  {/* Selected Tick badge */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded bg-[#ccff00] flex items-center justify-center text-black font-mono font-black text-[9px] shadow-[0_0_8px_#ccff00]">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Sandbox Preview Description Panel */}
      <div className="mt-4 pt-3.5 border-t border-slate-900 shrink-0 select-none">
        {currentSelectedItem ? (
          <div className="p-3 bg-black/90 border border-slate-800 rounded space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-100 font-mono font-black text-xs truncate">
                {currentSelectedItem.name}
              </span>
              <button 
                onClick={() => onClearCategory(activeTab)} 
                className="text-[10px] font-mono text-red-400 hover:text-white border border-red-500/20 px-2 py-0.5 rounded hover:bg-red-500/20 transition-all cursor-pointer uppercase"
              >
                DESEQUIPAR
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 uppercase">
              "{currentSelectedItem.description}"
            </p>
            <div className="flex items-center justify-between text-[9px] font-mono pt-1 text-slate-500 border-t border-slate-900">
              <span className="flex items-center gap-1">
                <User className="w-2.5 h-2.5" /> VECINO: {currentSelectedItem.creator}
              </span>
              <span className="uppercase text-[#ccff00] font-bold">
                CAPA {activeTab}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-black/40 border border-dashed border-slate-800 rounded flex items-center justify-center gap-2.5 text-center text-slate-500">
            <HelpCircle className="w-4 h-4 text-[#ccff00] self-start mt-0.5 shrink-0" />
            <p className="text-[10px] leading-relaxed font-mono text-left uppercase">
              Seleccione cualquier cosmético del archivo para ver su ficha de sintonización y equipamiento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
