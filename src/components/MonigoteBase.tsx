import { CharacterState } from '../types';

export default function MonigoteBase({ state }: { state: CharacterState }) {  
  return (
    // CONTENEDOR PRINCIPAL: La columna vertebral del muñeco.
    // 'items-center' asegura que todo esté centrado horizontalmente.
    // 'relative' es necesario para que el 'absolute' del pelo sepa dónde anclarse.
    <div className="w-full h-[28rem] flex flex-col items-center justify-center relative">
      
      {/* 1. CAPA DE PELO/GORRO (Flotante) */}
      {/* Ocupa el 25% superior del total. Es un "fantasma" que se pone encima. */}
      <div className="absolute top-0 w-full h-[25%] z-30 flex justify-center">
        {/* {state.selectedCabeza && (
          <img 
            src=""
            className="h-full object-contain" 
            alt="pelo"
          />
        )} */}
      </div>

      {/* 2. CABEZA (Base estable) */}
      {/* mt-[10%] hace que se suba un poco para "abrazar" la capa del pelo. */}
        {/* Aquí podrías añadir una capa de cara si quisieras */}
      <div 
        className="w-32 h-32 mt-[10%] rounded-full relative z-20 overflow-hidden shadow-md border-2 border-slate-800"
        style={{ backgroundColor: state.skinColor }}
      >
      </div>

      {/* 3. CUERPO (Base estable) */}
      {/* -mt-4 lo une a la cabeza.rounded-t-[3rem] da la forma de hombros. */}
      <div 
        className="w-40 h-48 -mt-4 rounded-t-[3rem] rounded-b-2xl relative z-10 overflow-hidden shadow-lg border-2 border-slate-800"
        style={{ backgroundColor: state.skinColor }}
      >
        {/* {state.selectedCuerpo && (
          <img 
            src={`/imagenes/${state.selectedCuerpo.imagen}.png`} 
            className="w-full h-full object-cover" 
            alt="cuerpo"
          /> */}
        {/* )} */}
      </div>

    </div>
  );
}