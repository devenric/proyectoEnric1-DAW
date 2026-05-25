import React, { useState, useRef } from 'react';
import { WardrobeItem } from '../types';
import { Cpu, Upload } from 'lucide-react';

interface UgcScannerProps {
  onApprovedItem: (newItem: WardrobeItem) => void;
}

// He dejado un par de plantillas falsas para que puedas probar rápido sin descargar nada
const MOCK_UGC_TEMPLATES = [
  { id: 'tpl_banana', name: 'Sombrero Plátano', img: 'https://picsum.photos/seed/banana/80/80', displayName: '👒 Plátano Loco.png' },
  { id: 'tpl_scraps', name: 'Alitas pixeladas', img: 'https://picsum.photos/seed/chicken/80/80', displayName: '👕 Alitas_Crujientes.png' }
];

export default function UgcScanner({ onApprovedItem }: UgcScannerProps) {
  // MEMORIA: Solo necesitamos saber si el ratón arrastra algo, y en qué ranura lo va a meter.
  const [dragActive, setDragActive] = useState(false);
  const [targetCategory, setTargetCategory] = useState<'cabeza' | 'cuerpo'>('cabeza');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // GATILLO: Coge la imagen, empaqueta la caja "WardrobeItem" y la manda al armario directamente.
  const handleApprove = (fileName: string, fileUrl: string) => {
    const newItem: WardrobeItem = {
      id: 'ugc_' + Math.random().toString(36).substring(2, 9),
      name: fileName.split('.')[0] || 'Objeto UGC',
      category: targetCategory,
      rarity: 'silly',
      description: 'Inyectado directamente sin preguntar.',
      creator: 'UGC',
      isUgc: true,
      ugcUrl: fileUrl,
      itemCode: 'ugc_dynamic'
    };
    onApprovedItem(newItem);
  };

  return (
    <div className="bg-black/90 border-2 border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-2xl">
      
      {/* Selector de Ranura */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-[#ccff00]" />
          <h2 className="text-sm font-bold text-slate-200 tracking-wider uppercase">INYECCIÓN UGC DIRECTA</h2>
        </div>
        <div className="flex items-center gap-1 bg-black border border-slate-900 p-0.5 rounded">
          <span className="text-[9px] font-mono text-slate-500 px-1.5 pt-0.5">RANURA:</span>
          {(['cabeza', 'cuerpo'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setTargetCategory(cat)}
              className={`text-[9px] font-mono uppercase px-2.5 py-1 rounded cursor-pointer ${
                targetCategory === cat ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]' : 'text-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Zona de Drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files[0]) handleApprove(e.dataTransfer.files[0].name, URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`flex-1 border-2 border-dashed rounded flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${
          dragActive ? 'border-[#ccff00] bg-[#ccff00]/5' : 'border-slate-800 hover:border-slate-600'
        }`}
      >
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
          if (e.target.files?.[0]) handleApprove(e.target.files[0].name, URL.createObjectURL(e.target.files[0]));
        }} />
        <Upload className="w-5 h-5 text-[#ccff00] mb-3" />
        <p className="text-xs font-bold text-slate-200 tracking-wider">SUELTA TU IMAGEN AQUÍ</p>
      </div>

      {/* Botones rápidos de prueba (Gatillos) */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {MOCK_UGC_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => handleApprove(tmpl.name + '.png', tmpl.img)}
            className="p-2 border border-slate-900 bg-slate-950 rounded text-left hover:border-[#ccff00]/40 text-[9px] font-mono text-slate-300"
          >
            {tmpl.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}