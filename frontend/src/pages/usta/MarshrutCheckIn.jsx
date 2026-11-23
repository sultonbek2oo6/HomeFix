import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, CheckCircle2 } from 'lucide-react';

export default function MarshrutCheckIn() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E2EBF0] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#E2EBF0] flex items-center justify-between">
        <button className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-slate-900 text-sm">Buyurtma #HF-2026-001234</h3>
        <span className="w-5"></span>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative h-64 bg-slate-100 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
          alt="Map"
          className="w-full h-full object-cover opacity-80"
        />
        {/* SVG Route Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 120 180 Q 200 120 280 70" stroke="#3B82F6" strokeWidth="4" fill="none" strokeDasharray="6 6" />
        </svg>

        {/* Start Pin */}
        <div className="absolute bottom-12 left-24 bg-[#10B981] text-white p-2 rounded-full shadow-lg border-2 border-white">
          <Navigation className="w-4 h-4 fill-white" />
        </div>

        {/* End Pin */}
        <div className="absolute top-12 right-24 bg-red-500 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
          <MapPin className="w-4 h-4 fill-white" />
        </div>
      </div>

      {/* Info & Actions */}
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3 bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2EBF0]">
          <div className="p-2 bg-emerald-100 text-[#10B981] rounded-xl mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Mijoz manzili</span>
            <span className="text-xs text-slate-500">Toshkent, Yakkasaroy</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-emerald-50 hover:bg-emerald-100 text-[#10B981] font-bold text-xs rounded-2xl transition border border-emerald-200">
            Yo'lga chiqish
          </button>
          <button
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className={`py-3 font-bold text-xs rounded-2xl transition shadow-md ${
              isCheckedIn
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-[#10B981] text-white hover:bg-[#0e9f6e]'
            }`}
          >
            {isCheckedIn ? 'Checked-In ✓' : 'Check-in'}
          </button>
        </div>
      </div>
    </div>
  );
}
