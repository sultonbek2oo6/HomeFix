import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, ChevronRight, Lock } from 'lucide-react';

export default function XavfsizlikSos() {
  const [shaxsiyHimoya, setShaxsiyHimoya] = useState(true);
  const [doimiyJoylashuv, setDoimiyJoylashuv] = useState(true);
  const [sosActive, setSosActive] = useState(false);

  const handleSos = () => {
    setSosActive(true);
    alert("SOS Signali uzatildi! Tezkor guruh bilan bog'lanilmoqda.");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E2EBF0] shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
        <button className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-slate-900 text-sm">Xavfsizlik</h3>
        <span className="w-5"></span>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        {/* Shaxsiy himoya */}
        <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-[#10B981] rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Shaxsiy himoya</span>
          </div>
          <input
            type="checkbox"
            checked={shaxsiyHimoya}
            onChange={(e) => setShaxsiyHimoya(e.target.checked)}
            className="toggle accent-[#10B981] w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Doimiy joylashuvni ulashish */}
        <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-[#10B981] rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Doimiy joylashuvni ulashish</span>
          </div>
          <input
            type="checkbox"
            checked={doimiyJoylashuv}
            onChange={(e) => setDoimiyJoylashuv(e.target.checked)}
            className="toggle accent-[#10B981] w-5 h-5 cursor-pointer"
          />
        </div>

        {/* SOS Card */}
        <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-[10px]">
              SOS
            </div>
            <span>SOS</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Fevqulodda holatda bosing</p>
          <button
            onClick={handleSos}
            className={`w-full py-3.5 rounded-2xl font-bold text-xs text-white transition shadow-lg ${
              sosActive
                ? 'bg-red-700 animate-pulse'
                : 'bg-red-400 hover:bg-red-500 shadow-red-300'
            }`}
          >
            {sosActive ? 'SOS SIGNAL UZATILDII' : 'SOS'}
          </button>
        </div>

        {/* Ishlash uchun xavfsiz hududlar */}
        <button className="w-full flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0] hover:bg-slate-100 transition">
          <div className="text-left">
            <span className="text-xs font-bold text-slate-800 block">Ishlash uchun xavfsiz hududlar</span>
            <span className="text-[10px] text-slate-400">Faqat tanlangan hududlarda buyurtma</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
