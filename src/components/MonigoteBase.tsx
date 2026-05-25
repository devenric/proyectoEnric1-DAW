import { motion } from 'motion/react';
import { CharacterState } from '../types';

interface MonigoteBaseProps {
  state: CharacterState;
  onEyeClick?: () => void;
}

export default function MonigoteBase({ state, onEyeClick }: MonigoteBaseProps) {
  const { skinColor, eyeStyle, animationState, selectedCabeza, selectedCuerpo, selectedAura } = state;

  // Animation variants
  const containerVariants = {
    idle: {
      y: [0, -6, 0],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
    },
    dancing: {
      y: [0, -12, 0],
      x: [0, 8, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
    },
    walking: {
      y: [0, -4, 0],
      rotate: [-3, 3, -3],
      skewX: [-4, 4, -4],
      transition: { duration: 0.6, repeat: Infinity, ease: 'linear' },
    },
    jumping: {
      y: [0, -45, 0],
      scaleY: [1, 0.8, 1.15, 1],
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const auraVariants = {
    idle: {
      y: [-4, 6, -4],
      rotate: [-3, 3, -3],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    dancing: {
      scale: [1, 1.15, 0.9, 1],
      rotate: [0, 180, 360],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' },
    },
    walking: {
      y: [-2, 2, -2],
      x: [-5, 5, -5],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
    },
    jumping: {
      y: [0, -30, 0],
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  // Helper to draw eyes based on style
  const renderEyes = () => {
    switch (eyeStyle) {
      case 'derp':
        return (
          <>
            <rect id="eye-l" x="38" y="38" width="6" height="6" fill="#111827" />
            <rect id="eye-r" x="56" y="42" width="6" height="6" fill="#111827" />
            <rect x="40" y="38" width="2" height="2" fill="#FFFFFF" />
            <rect x="58" y="44" width="2" height="2" fill="#FFFFFF" />
          </>
        );
      case 'cute':
        return (
          <>
            <rect id="eye-l-cute" x="36" y="38" width="8" height="8" rx="1" fill="#111827" />
            <rect id="eye-r-cute" x="56" y="38" width="8" height="8" rx="1" fill="#111827" />
            <rect x="37" y="39" width="3" height="3" fill="#FFFFFF" />
            <rect x="57" y="39" width="3" height="3" fill="#FFFFFF" />
            <rect x="41" y="43" width="2" height="2" fill="#FFFFFF" />
            <rect x="61" y="43" width="2" height="2" fill="#FFFFFF" />
          </>
        );
      case 'angry':
        return (
          <>
            <rect id="eye-l" x="38" y="40" width="8" height="5" fill="#111827" />
            <rect id="eye-r" x="54" y="40" width="8" height="5" fill="#111827" />
            <path d="M 36,36 L 46,39" stroke="#111827" strokeWidth="2" strokeLinecap="square" />
            <path d="M 64,36 L 54,39" stroke="#111827" strokeWidth="2" strokeLinecap="square" />
          </>
        );
      case 'cool':
        return (
          <>
            <rect id="sunglasses" x="32" y="36" width="36" height="8" fill="#111827" rx="1" />
            <rect x="34" y="44" width="12" height="4" fill="#111827" />
            <rect x="54" y="44" width="12" height="4" fill="#111827" />
            <rect x="34" y="38" width="32" height="2" fill="#00FFFF" opacity="0.8" />
          </>
        );
      case 'classic':
      default:
        return (
          <>
            <rect id="eye-l" x="38" y="38" width="6" height="6" fill="#111827" />
            <rect id="eye-r" x="56" y="38" width="6" height="6" fill="#111827" />
            <rect x="38" y="38" width="2" height="2" fill="#FFFFFF" />
            <rect x="56" y="38" width="2" height="2" fill="#FFFFFF" />
          </>
        );
    }
  };

  // Render SVG heads
  const renderCabezaSvg = () => {
    if (!selectedCabeza) return null;

    if (selectedCabeza?.isUgc && selectedCabeza?.ugcUrl) {
      return (
        <g id="capa-ugc-head-sticker">
          {/* CAJA NATIVA SVG: <image> no falla nunca */}
          <image
            href={selectedCabeza.ugcUrl}
            x="28" y="11" width="44" height="44"
            /* PINTURA: 'meet' es el equivalente SVG a object-contain (que se vea entera) */
            preserveAspectRatio="xMidYMid meet"
            style={{ imageRendering: 'pixelated' }}
          />
        </g>
      );
    }

    const col1 = selectedCabeza.svgColor1 || '#FFF';
    const col2 = selectedCabeza.svgColor2 || '#AAA';

    switch (selectedCabeza.itemCode) {
      case 'gato':
        return (
          <g id="capa-gato" className="origin-bottom">
            <rect x="30" y="8" width="40" height="22" rx="6" fill={col1} />
            <polygon points="30,10 24,0 36,6" fill={col1} />
            <polygon points="70,10 76,0 64,6" fill={col1} />
            <polygon points="30,10 26,2 34,7" fill={col2} />
            <polygon points="70,10 74,2 66,7" fill={col2} />
            <rect x="42" y="16" width="3" height="3" fill="#D1D5DB" />
            <rect x="55" y="16" width="3" height="3" fill="#D1D5DB" />
            <path d="M 47,21 Q 50,23 53,21" stroke="#D1D5DB" strokeWidth="2" fill="none" />
            <path d="M 32,22 Q 22,25 24,35" stroke={col1} strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'cerebro':
        return (
          <g id="capa-cerebro">
            <rect x="25" y="2" width="50" height="32" rx="14" fill={col1} opacity="0.9" className="animate-pulse" />
            <rect x="32" y="6" width="36" height="24" rx="10" fill={col2} opacity="0.4" />
            <rect x="36" y="12" width="16" height="4" fill="#22C55E" rx="1" />
            <rect x="48" y="20" width="16" height="4" fill="#22C55E" rx="1" />
            <rect x="42" y="16" width="18" height="3" fill="#15803D" />
            <rect x="20" y="0" width="60" height="38" rx="20" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="6,4" opacity="0.7" />
          </g>
        );
      case 'tostadora':
        return (
          <g id="capa-tostadora">
            <rect x="22" y="4" width="56" height="32" rx="4" fill={col1} stroke="#374151" strokeWidth="2" />
            <rect x="68" y="12" width="6" height="16" fill="#1F2937" />
            <circle cx="28" cy="24" r="3" fill={col2} />
            <motion.rect x="30" y="-4" width="18" height="12" fill="#D97706" rx="1" animate={{ y: [-4, -14, -4] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.rect x="50" y="-1" width="18" height="12" fill="#F59E0B" rx="1" animate={{ y: [-1, -11, -1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
          </g>
        );
      case 'corona':
        return (
          <g id="capa-corona">
            <path d="M 22,28 L 22,10 L 32,22 L 42,8 L 50,22 L 58,8 L 68,22 L 78,10 L 78,28 Z" fill={col1} stroke="#B45309" strokeWidth="2" />
            <line x1="30" y1="20" x2="30" y2="26" stroke={col2} strokeWidth="2" />
            <line x1="42" y1="18" x2="42" y2="26" stroke={col2} strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="26" stroke={col2} strokeWidth="2" />
            <line x1="58" y1="18" x2="58" y2="26" stroke={col2} strokeWidth="2" />
            <line x1="70" y1="20" x2="70" y2="26" stroke={col2} strokeWidth="2" />
            <text x="44" y="24" fill="#EF4444" className="font-sans font-bold text-xs">★</text>
          </g>
        );
      case 'hongo':
        return (
          <g id="capa-hongo">
            <path d="M 20,24 C 20,8 80,8 80,24" fill={col1} stroke="#1F2937" strokeWidth="2" />
            <circle cx="34" cy="18" r="4" fill={col2} />
            <circle cx="50" cy="14" r="5" fill={col2} />
            <circle cx="66" cy="18" r="4" fill={col2} />
            <circle cx="50" cy="22" r="2.5" fill={col2} />
          </g>
        );
      case 'gafas':
        return (
          <g id="capa-gafas">
            <polygon points="18,34 82,34 76,46 24,46" fill={col1} opacity="0.85" />
            <polygon points="22,36 78,36 74,44 26,44" fill={col2} opacity="0.5" />
            <rect x="14" y="32" width="6" height="8" fill="#1F2937" />
            <rect x="80" y="32" width="6" height="8" fill="#1F2937" />
          </g>
        );
      default:
        return null;
    }
  };

  // Render SVG bodies
  const renderCuerpoSvg = () => {
    if (selectedCuerpo?.isUgc && selectedCuerpo?.ugcUrl) {
      return (
        <g id="capa-ugc-body-sticker">
          {/* CAJA NATIVA: <image> puro, sin HTML y sin tijeras que se rompan */}
          <image
            href={selectedCuerpo.ugcUrl}
            x="30" y="48" width="40" height="30"
            /* PINTURA BÁRBARA: "none" obliga a la foto a deformarse para rellenar exactamente la caja, sin sobresalir */
            preserveAspectRatio="none"
            style={{ imageRendering: 'pixelated' }}
          />
        </g>
      );
    }

    const col1 = selectedCuerpo?.svgColor1 || '#FFF';
    const col2 = selectedCuerpo?.svgColor2 || '#AAA';

    switch (selectedCuerpo?.itemCode) {
      case 'jersey':
        return (
          <g id="capa-jersey">
            <rect x="22" y="46" width="56" height="34" rx="4" fill={col1} />
            <rect x="14" y="48" width="8" height="24" rx="2" fill={col1} />
            <rect x="78" y="48" width="8" height="24" rx="2" fill={col1} />
            <rect x="22" y="58" width="56" height="8" fill={col2} opacity="0.7" />
            <path d="M 24,62 L 76,62" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
            <rect x="42" y="46" width="16" height="4" fill="#10B981" />
          </g>
        );
      case 'dino':
        return (
          <g id="capa-dino">
            <rect x="22" y="46" width="56" height="35" rx="6" fill={col1} />
            <path d="M 22,46 L 78,46 L 72,36 L 28,36 Z" fill={col1} />
            <polygon points="17,42 22,48 17,54" fill={col2} />
            <polygon points="17,58 22,64 17,70" fill={col2} />
            <polygon points="17,74 22,80 17,86" fill={col2} />
            <ellipse cx="50" cy="65" rx="14" ry="10" fill="#FEF3C7" />
            <rect x="18" y="58" width="6" height="8" rx="2" fill={col1} />
            <rect x="76" y="58" width="6" height="8" rx="2" fill={col1} />
          </g>
        );
      case 'armadura':
        return (
          <g id="capa-armadura">
            <rect x="20" y="45" width="60" height="36" rx="4" fill={col1} stroke="#78350F" strokeWidth="2" />
            <rect x="28" y="45" width="8" height="36" fill={col2} opacity="0.8" />
            <rect x="64" y="45" width="8" height="36" fill={col2} opacity="0.8" />
            <rect x="22" y="49" width="4" height="4" fill="#3B82F6" />
            <circle cx="50" cy="63" r="8" fill="#9CA3AF" stroke="#374151" strokeWidth="2.5" />
            <circle cx="50" cy="63" r="4" fill="#EF4444" />
          </g>
        );
      case 'tuxedo':
        return (
          <g id="capa-tuxedo">
            <rect x="22" y="46" width="56" height="34" rx="4" fill={col1} />
            <polygon points="40,46 60,46 50,60" fill="#FFFFFF" />
            <polygon points="44,50 56,50 50,55" fill={col2} />
            <polygon points="44,55 56,55 50,50" fill={col2} />
            <circle cx="50" cy="52.5" r="2" fill="#E11D48" />
            <rect x="28" y="52" width="8" height="3" fill="#F59E0B" />
          </g>
        );
      case 'slime':
        return (
          <g id="capa-slime">
            <rect x="22" y="46" width="56" height="30" rx="15" fill={col1} opacity="0.8" />
            <circle cx="34" cy="54" r="4" fill={col2} opacity="0.6" />
            <circle cx="48" cy="66" r="3.5" fill={col2} opacity="0.6" />
            <circle cx="62" cy="58" r="4.5" fill={col2} opacity="0.6" />
            <path d="M 30,76 Q 32,84 34,76" stroke={col1} strokeWidth="6" strokeLinecap="round" />
            <path d="M 50,76 Q 52,86 54,76" stroke={col1} strokeWidth="8" strokeLinecap="round" />
            <path d="M 68,76 Q 70,82 72,76" stroke={col1} strokeWidth="5" strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  };

  // Render SVG auras
  const renderAuraSvg = () => {
    if (!selectedAura) return null;

    const col1 = selectedAura.svgColor1 || '#FFF';
    const col2 = selectedAura.svgColor2 || '#AAA';

    switch (selectedAura.itemCode) {
      case 'fantasma':
        return (
          <motion.g id="aura-fantasma" style={{ x: -65, y: -20 }} animate={{ y: [-10, 10, -10], x: [-62, -68, -62] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M 10,25 C 10,5 34,5 34,25 L 34,42 L 28,37 L 22,42 L 16,37 L 10,42 Z" fill={col1} stroke={col2} strokeWidth="1.5" opacity="0.85" />
            <path d="M 14,25 C 14,12 30,12 30,25" fill="none" stroke="#E0F2FE" strokeWidth="2" opacity="0.5" />
            <ellipse cx="17" cy="22" rx="2" ry="3" fill="#0369A1" />
            <ellipse cx="27" cy="22" rx="2" ry="3" fill="#0369A1" />
            <circle cx="14" cy="25" r="2" fill="#F43F5E" opacity="0.6" />
            <circle cx="30" cy="25" r="2" fill="#F43F5E" opacity="0.6" />
          </motion.g>
        );
      case 'nube':
        return (
          <motion.g id="aura-nube" style={{ y: -65, x: 25 }} animate={{ y: [-62, -72, -62] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M 10,20 Q 5,12 14,10 Q 20,4 32,8 Q 38,4 46,10 Q 55,8 52,20 Q 55,28 44,28 L 16,28 Q 5,28 10,20 Z" fill={col1} stroke="#374151" strokeWidth="2" />
            <path d="M 22,17 L 26,19" stroke="#111827" strokeWidth="2" />
            <path d="M 36,17 L 32,19" stroke="#111827" strokeWidth="2" />
            <motion.rect x="18" y="32" width="3" height="6" fill="#3B82F6" animate={{ y: [0, 24, 0], opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            <motion.rect x="30" y="32" width="3" height="6" fill="#60A5FA" animate={{ y: [0, 28, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: 0.3 }} />
            <motion.rect x="42" y="32" width="3" height="6" fill="#3B82F6" animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.6 }} />
            <path d="M 28,26 L 24,35 L 30,35 L 26,46" stroke={col2} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </motion.g>
        );
      case 'brillos':
        return (
          <g id="aura-sparkles">
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="origin-center" style={{ transformOrigin: '50px 50px' }}>
              <polygon points="10,14 12,8 14,14 20,16 14,18 12,24 10,18 4,16" fill={col1} />
              <polygon points="86,14 88,8 90,14 96,16 90,18 88,24 86,18 80,16" fill={col2} />
              <polygon points="86,86 88,80 90,86 96,88 90,90 88,96 86,90 80,88" fill={col1} />
              <polygon points="10,86 12,80 14,86 20,88 14,90 12,96 10,90 4,88" fill={col2} />
            </motion.g>
          </g>
        );
      case 'glitch':
        return (
          <g id="aura-glitch">
            <motion.rect x="-15" y="-10" width="6" height="16" fill={col1} animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 0.9, repeat: Infinity }} />
            <motion.rect x="110" y="20" width="4" height="24" fill={col1} animate={{ opacity: [0.9, 0.1, 0.9] }} transition={{ duration: 1.3, repeat: Infinity }} />
            <motion.rect x="-22" y="60" width="6" height="12" fill={col2} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }} />
            <motion.line x1="-35" y1="40" x2="135" y2="40" stroke="#22C55E" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.3" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
        style={{ 
          backgroundColor: selectedAura?.svgColor1 
            ? selectedAura.svgColor1 
            : selectedCabeza?.svgColor1 
            ? selectedCabeza.svgColor1 
            : '#ccff00' 
        }}
      />

      <div className="w-[280px] h-[280px] bg-[#020202] rounded border-2 border-[#ccff00]/30 flex items-center justify-center relative shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 pixel-grid opacity-80 pointer-events-none" />

        <motion.div
          variants={containerVariants}
          animate={animationState}
          className="w-[200px] h-[200px] flex items-center justify-center relative select-none"
        >
          <svg
            viewBox="-40 -40 180 180"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(204,255,0,0.15)] overflow-visible"
            style={{ imageRendering: 'pixelated' }}
          >
            {/* LAYER -1: AURA BEHIND */}
            {selectedAura && (selectedAura.itemCode === 'glitch' || selectedAura.itemCode === 'brillos') && renderAuraSvg()}

            {/* LAYER 0: SHADOW */}
            <ellipse cx="50" cy="94" rx="28" ry="6" fill="#000000" opacity="0.65" />

            {/* LAYER 1: BASE MONIGOTE (BODY) */}
            <rect id="base-body" x="30" y="48" width="40" height="30" rx="2" fill={skinColor} stroke="#000000" strokeWidth="3" />
            <rect x="34" y="52" width="32" height="22" fill="#FFFFFF" opacity="0.1" />

            {/* Arms */}
            <rect id="arm-l" x="18" y="52" width="12" height="10" rx="1" fill={skinColor} stroke="#000000" strokeWidth="2.5" />
            <rect id="arm-r" x="70" y="52" width="12" height="10" rx="1" fill={skinColor} stroke="#000000" strokeWidth="2.5" />

            {/* LAYER 2: OVERLAY BODY CLOTHES (Justo debajo de las piernas y encima de los brazos/torso) */}
            {renderCuerpoSvg()}

            {/* Legs */}
            <rect id="leg-l" x="34" y="78" width="10" height="14" rx="1" fill={skinColor} stroke="#000000" strokeWidth="3" />
            <rect id="leg-r" x="56" y="78" width="10" height="14" rx="1" fill={skinColor} stroke="#000000" strokeWidth="3" />

            {/* LAYER 3: BASE MONIGOTE (HEAD) */}
            <g id="base-head" className="cursor-pointer" onClick={onEyeClick}>
              <rect x="24" y="16" width="52" height="34" rx="3" fill={skinColor} stroke="#000000" strokeWidth="3" />
              {renderEyes()}
              <rect x="28" y="44" width="6" height="3" fill="#F472B6" />
              <rect x="66" y="44" width="6" height="3" fill="#F472B6" />
              <rect x="48" y="45" width="4" height="2" fill="#111827" />
            </g>

            {/* LAYER 4: OVERLAY HEAD COSMETICS */}
            {renderCabezaSvg()}

            {/* LAYER 5: AURA COMPANION FRONT */}
            {selectedAura && (selectedAura.itemCode === 'fantasma' || selectedAura.itemCode === 'nube') && renderAuraSvg()}
          </svg>
        </motion.div>

        {/* Dynamic Label */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none bg-black/90 px-3 py-1.5 rounded border border-[#ccff00]/20">
          <span className="text-slate-300">ANIM: {animationState?.toUpperCase() || 'IDLE'}</span>
          <span className="text-[#ccff00] font-black">SYS_FPS_STABLE [60]</span>
        </div>
      </div>
    </div>
  );
}