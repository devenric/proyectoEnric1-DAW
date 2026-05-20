import React, { useState, useRef } from 'react';
import { WardrobeItem } from '../types';
import { ShieldCheck, ShieldAlert, Cpu, Upload, Loader2, Sparkles } from 'lucide-react';

interface UgcScannerProps {
  onApprovedItem: (newItem: WardrobeItem) => void;
}

// Default mock templates to let users test instantly without uploading a local file
const MOCK_UGC_TEMPLATES = [
  {
    id: 'tpl_banana',
    name: 'Sombrero Plátano Silly',
    category: 'cabeza' as const,
    img: 'https://picsum.photos/seed/banana/80/80', // We can use mock visuals or draw icons
    type: 'pixel_safe',
    displayName: '👒 Plátano Loco.png (Pixel Art)',
    desc: 'Un alegre plátano pelado que sirve de gorra gángster.',
  },
  {
    id: 'tpl_real_photo',
    name: 'Foto Real del Director',
    category: 'cabeza' as const,
    img: 'https://picsum.photos/seed/face/80/80',
    type: 'real_human',
    displayName: '📷 Mi_Cara_Serio.jpg (Foto Real)',
    desc: 'La foto de carné real del Creative Director mirando a cámara.',
  },
  {
    id: 'tpl_scraps',
    name: 'Alitas de pollo pixeladas',
    category: 'cuerpo' as const,
    img: 'https://picsum.photos/seed/chicken/80/80',
    type: 'pixel_safe',
    displayName: '👕 Alitas_Crujientes_UGC.png (Safe)',
    desc: 'Un adorable arnés de alitas de pollo pixeladas rojas y amarillas.',
  },
  {
    id: 'tpl_gore',
    name: 'Calavera Zombie Gore',
    category: 'cabeza' as const,
    img: 'https://picsum.photos/seed/zombie/80/80',
    type: 'nsfw_gore',
    displayName: '💀 Zombie_Gore_Splatter.png (NSFW)',
    desc: 'Un dibujo de terror hiperrealista con fluidos sospechosos.',
  }
];

export default function UgcScanner({ onApprovedItem }: UgcScannerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'passed' | 'failed'>('idle');
  const [scannedItemName, setScannedItemName] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [approvedTargetCategory, setApprovedTargetCategory] = useState<'cabeza' | 'cuerpo'>('cabeza');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setTerminalLogs((prev) => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const processFileToAIAsistente = (fileName: string, isPixelSafe: boolean, fileUrl: string) => {
    setStatus('scanning');
    setTerminalLogs([]);
    addLog(`Iniciando escaneo de aduanas: "${fileName}"...`);
    addLog('Cargando Filtro IA Local de El Patio Pixelado...');
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        addLog('IA: Ejecutando clasificador de contorno vector...');
      } else if (step === 2) {
        addLog('IA: Buscando patrones faciales / fotos reales...');
      } else if (step === 3) {
        addLog('IA: Escaneando filtros de seguridad, sangre, y NSFW...');
      } else if (step === 4) {
        clearInterval(interval);
        
        if (isPixelSafe) {
          setStatus('passed');
          addLog('✅ APROBADO: Arte de pixel legítimo detectado.');
          addLog('Añadiendo artículo al armario modular del jugador...');
          
          // Trigger approval and integration
          const randomId = 'ugc_' + Math.random().toString(36).substring(2, 9);
          const newItem: WardrobeItem = {
            id: randomId,
            name: fileName.split('.')[0] || 'Objeto UGC',
            category: approvedTargetCategory,
            rarity: 'silly',
            description: `Código UGC: #${randomId.toUpperCase()}. Arte verificado por el Filtro de IA de Aduanas local.`,
            creator: 'Diseño de la Comunidad (UGC)',
            isUgc: true,
            ugcUrl: fileUrl,
            itemCode: 'ugc_dynamic'
          };
          onApprovedItem(newItem);
        } else {
          setStatus('failed');
          const isGore = fileName.toLowerCase().includes('gore') || fileName.toLowerCase().includes('zombie');
          const reason = isGore 
            ? '🚨 RECHAZADO: DETECTADO CONTENIDO SANGRIENTO / GORE NO APTO' 
            : '🚨 RECHAZADO: FOTO HUMANA REAL O EXTRAÑA DETECTADA. SOLO SE ADMITE PIXEL ART.';
          setRejectReason(reason);
          addLog(`❌ ADUANAS LOCKOUT: ${reason}`);
        }
      }
    }, 700);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSelectedFile(e.target.files[0]);
    }
  };

  const handleSelectedFile = (file: File) => {
    setScannedItemName(file.name);
    // Real dynamic upload uses ObjectURL! This allows seeing their own clothes on the paper doll!
    const objectUrl = URL.createObjectURL(file);
    
    // Check if name or type suggests real photo. Safe is assumption of pixel files.
    // If name contains face, nsfw, gore or similar, trigger rejection for demo fun
    const lowerName = file.name.toLowerCase();
    const isSafe = !lowerName.includes('real') && !lowerName.includes('cara') && !lowerName.includes('face') && !lowerName.includes('gore') && !lowerName.includes('nsfw');
    
    processFileToAIAsistente(file.name, isSafe, objectUrl);
  };

  const resetScanner = () => {
    setStatus('idle');
    setScannedItemName('');
    setTerminalLogs([]);
  };

  return (
    <div className="bg-black/90 border-2 border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-2xl relative overflow-hidden arcade-glow">
      
      {/* Visual scanning grid accent lines */}
      {status === 'scanning' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#ccff00]/80 animate-bounce shadow-[0_0_15px_rgba(204,255,0,0.8)] z-10" />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0 justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#ccff00]/10 rounded border border-[#ccff00]/30 text-[#ccff00]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200 tracking-wider uppercase">[02] FILTRO IA DE ADUANAS</h2>
            <p className="text-[10px] font-mono text-slate-500">MCLUS CLASIFICADOR UGC DE VECINOS</p>
          </div>
        </div>

        {/* Selected target slot for uploaded custom content */}
        <div className="flex items-center gap-1 bg-black border border-slate-900 p-0.5 rounded select-none">
          <span className="text-[9px] font-mono text-slate-500 px-1.5 pt-0.5">RANURA:</span>
          {(['cabeza', 'cuerpo'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setApprovedTargetCategory(cat);
                addLog(`Modificado ranura destino para UGC aprobado a: ${cat.toUpperCase()}`);
              }}
              className={`text-[9px] font-mono uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                approvedTargetCategory === cat 
                  ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="flex-1 flex flex-col space-y-3">
        {status === 'idle' && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-[#ccff00] bg-[#ccff00]/5 shadow-[0_0_15px_rgba(204,255,0,0.15)]' 
                : 'border-slate-800 bg-slate-950/40 hover:bg-black hover:border-slate-705'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 rounded bg-black flex items-center justify-center border border-slate-850 mb-3 text-[#ccff00] hover:text-white transition-colors">
              <Upload className="w-5 h-5 text-[#ccff00]" />
            </div>
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Subir Archivos Pegatina (.png/.jpg)
            </p>
            <p className="text-[9px] text-slate-500 font-mono mt-1 max-w-[190px] mx-auto uppercase">
              Arrastra o haz clic para enviar al módulo de análisis
            </p>
          </div>
        )}

        {/* Scanning & Loading Animation Screen */}
        {status === 'scanning' && (
          <div className="flex-1 bg-black rounded flex flex-col items-center justify-center p-6 text-center border-2 border-[#ccff00]/20">
            <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin mb-3.5" />
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-widest animate-pulse font-black">Escaneando Ropa UGC...</span>
            <span className="text-[10px] text-slate-500 font-mono mt-1 max-w-[200px] truncate uppercase">
              {scannedItemName}
            </span>
          </div>
        )}

        {/* Passed Verification Screen */}
        {status === 'passed' && (
          <div className="flex-1 bg-[#ccff00]/5 rounded flex flex-col items-center justify-center p-5 text-center border-2 border-[#ccff00]/30">
            <div className="w-10 h-10 rounded bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] mb-3 border border-[#ccff00]/30 animate-pulse">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#ccff00] tracking-wider uppercase px-2.5 py-1 rounded bg-[#ccff00]/10 border border-[#ccff00]/20">
              VAL_OK: APROBADO
            </span>
            <p className="text-slate-300 font-mono text-xs mt-2.5 font-bold uppercase">
              ¡{scannedItemName.split('.')[0] || 'La Prenda'} se aprobó con éxito!
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">
              Sintonizado con éxito en el armario modular del jugador.
            </p>
            <button
              onClick={resetScanner}
              className="mt-4 px-3.5 py-1.5 text-[10px] font-mono text-white bg-black border border-slate-800 rounded hover:border-[#ccff00]/50 transition-colors cursor-pointer uppercase"
            >
              Nuevo Archivo
            </button>
          </div>
        )}

        {/* Failed Verification Screen */}
        {status === 'failed' && (
          <div className="flex-1 bg-[#ff00ff]/5 rounded flex flex-col items-center justify-center p-5 text-center border-2 border-[#ff00ff]/30 animate-pulse">
            <div className="w-10 h-10 rounded bg-[#ff00ff]/10 flex items-center justify-center text-[#ff00ff] mb-3 border border-[#ff00ff]/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#ff00ff] tracking-wider uppercase px-2.5 py-1 rounded bg-[#ff00ff]/10 border border-[#ff00ff]/20">
              RECHAZADO POR SEGURIDAD
            </span>
            <p className="text-slate-200 font-mono text-xs mt-2.5 font-bold leading-relaxed max-w-[200px] uppercase">
              {rejectReason}
            </p>
            <p className="text-[9px] text-[#ff00ff] font-mono mt-1 select-none font-bold">
              [ ERROR CODE: FX-886_LOCK ]
            </p>
            <button
              onClick={resetScanner}
              className="mt-4 px-3.5 py-1.5 text-[10px] font-mono text-white bg-black border border-slate-800 rounded hover:border-[#ff00ff]/50 transition-colors cursor-pointer uppercase"
            >
              Cargar Otro Archivo
            </button>
          </div>
        )}

        {/* Real-time terminal diagnostic console logging */}
        <div className="bg-black p-2.5 rounded border border-slate-900 h-24 overflow-hidden shrink-0 select-none">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase pb-1.5 border-b border-slate-900 mb-1.5 justify-between">
            <span>Terminal IA de Aduanas</span>
            <span className="text-[#ccff00]/80 animate-pulse">STANDBY</span>
          </div>
          <div className="space-y-0.5">
            {terminalLogs.length === 0 ? (
              <span className="text-[10px] font-mono text-slate-600 block italic uppercase">Sistema listo. Esperando archivo PNG o simulador...</span>
            ) : (
              terminalLogs.map((log, idx) => (
                <span key={idx} className="text-[9px] font-mono text-slate-400 block truncate uppercase">
                  {log}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Instant Sandbox Probe Templates to test compliance */}
        <div className="shrink-0 pt-1 select-none">
          <span className="text-[10px] font-mono text-slate-500 block mb-1.5 uppercase font-bold tracking-wider">
            Simulador de Pruebas Rápidas:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {MOCK_UGC_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                disabled={status === 'scanning'}
                onClick={() => {
                  setScannedItemName(tmpl.name + '.png');
                  const isSafe = tmpl.type === 'pixel_safe';
                  processFileToAIAsistente(tmpl.name + '.png', isSafe, tmpl.img);
                }}
                className="p-1 px-2 border border-slate-900 bg-slate-950 rounded text-left hover:border-[#ccff00]/40 hover:bg-black transition-all cursor-pointer truncate"
              >
                <div className="text-[9px] font-mono text-slate-300 truncate font-semibold uppercase">
                  {tmpl.displayName}
                </div>
                <div className="text-[8px] font-mono text-slate-500 truncate col-span-2 uppercase">
                  {tmpl.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
