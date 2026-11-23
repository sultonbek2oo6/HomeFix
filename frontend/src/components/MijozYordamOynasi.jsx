import React from 'react';
import { X } from 'lucide-react';
import { Yozishma } from '../pages/mijoz/Chat';

export default function MijozYordamOynasi({ onClose }) {
  return <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#102f50]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-label="Admin bilan yozishma" className="relative w-full max-w-lg rounded-t-3xl bg-white p-3 shadow-2xl sm:rounded-3xl sm:p-4"><button onClick={onClose} aria-label="Yordam oynasini yopish" className="absolute right-5 top-5 z-10 rounded-lg bg-white/90 p-1.5 text-slate-500 shadow"><X size={18} /></button><Yozishma compact /></section>
  </div>;
}
