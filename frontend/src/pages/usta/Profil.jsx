import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tv, 
  Plug, 
  Droplets, 
  Flame, 
  ChevronRight, 
  FileText, 
  Star,
  Eye,
  X,
  CheckCircle2
} from 'lucide-react';

export default function Profil() {
  const [activeTab, setActiveTab] = useState('asosiy');
  const [viewingDoc, setViewingDoc] = useState(null); // Modal uchun tanlangan hujjat

  const xizmatlar = [
    { name: "Konditsioner ta'miri", price: "150 000 - 300 000 so'm", icon: Tv },
    { name: "Elektrik ishlari", price: "100 000 - 250 000 so'm", icon: Plug },
    { name: "Santexnika", price: "80 000 - 200 000 so'm", icon: Droplets },
    { name: "Isitish tizimlari", price: "120 000 - 250 000 so'm", icon: Flame },
  ];

  const hujjatlar = [
    {
      id: 1,
      title: "Pasport nusxasi / ID karta",
      status: "Tasdiqlangan",
      date: "12.01.2025",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Malaka sertifikati",
      status: "Tekshirilgan",
      date: "05.03.2025",
      img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        {/* Avatar va Profil Ma'lumoti */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-6 border-b border-[#E2EBF0] text-center sm:text-left">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" 
              alt="Azizbek Karimov" 
              className="w-20 h-20 rounded-2xl object-cover shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs shadow">
              ✓
            </span>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-gray-900">Azizbek Karimov</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#10B981] text-xs font-bold rounded-xl border border-emerald-100 self-center sm:self-auto">
                <ShieldCheck className="w-4 h-4" /> Verified
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1">
              Usta <span className="text-gray-300">•</span> 
              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.8
              </span> 
              <span className="text-gray-400">(124 ta baho)</span>
            </p>
          </div>
        </div>

        {/* Tab Tugmalari */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2EBF0]">
          <button
            onClick={() => setActiveTab('asosiy')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'asosiy'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Asosiy ma'lumotlar
          </button>
          <button
            onClick={() => setActiveTab('hujjatlar')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'hujjatlar'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Hujjatlar
          </button>
        </div>

        {/* 1. ASOSIY MA'LUMOTLAR TABI */}
        {activeTab === 'asosiy' && (
          <div className="space-y-3">
            {xizmatlar.map((xizmat, index) => {
              const Icon = xizmat.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0] hover:border-[#10B981]/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800">{xizmat.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-gray-900">{xizmat.price}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. HUJJATLAR TABI */}
        {activeTab === 'hujjatlar' && (
          <div className="space-y-3">
            {hujjatlar.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-800">{doc.title}</h4>
                    <p className="text-[10px] text-emerald-600 font-semibold">{doc.status}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingDoc(doc)}
                  className="px-4 py-2 bg-white hover:bg-emerald-50 border border-[#E2EBF0] hover:border-[#10B981] text-xs font-bold text-gray-700 hover:text-[#10B981] rounded-xl transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Ko'rish
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* HUJJATNI KO'RISH MODALI */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <h3 className="font-bold text-gray-900 text-base">{viewingDoc.title}</h3>
              <button 
                onClick={() => setViewingDoc(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#E2EBF0]">
              <img src={viewingDoc.img} alt={viewingDoc.title} className="w-full h-64 object-cover" />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" /> {viewingDoc.status}
              </span>
              <span>Yuklangan sana: {viewingDoc.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
