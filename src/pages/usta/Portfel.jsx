import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  CheckCircle2, 
  X, 
  Trash2, 
  Eye, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';

export default function Portfel() {
  const [activeTab, setActiveTab] = useState('oldin'); // 'oldin' yoki 'keyin'
  const [selectedImg, setSelectedImg] = useState(null); // Modal uchun
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Initial rasm ma'lumotlari (backendga ulanadigan real state)
  const [portfolio, setPortfolio] = useState({
    oldin: [
      {
        id: 1,
        title: "Konditsioner filtri va ichki qismi (Eski)",
        service: "Konditsioner ta'miri",
        date: "10.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Nosoz konditsioner blok paneli",
        service: "Konditsioner ta'miri",
        date: "12.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Isitish qozoni (Ta'mirdan oldin)",
        service: "Isitish tizimi",
        date: "14.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Santexnika quvurlari tizimi (Eski)",
        service: "Santexnika",
        date: "15.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop"
      }
    ],
    keyin: [
      {
        id: 101,
        title: "Tozalangan va sozlangan konditsioner",
        service: "Konditsioner ta'miri",
        date: "10.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 102,
        title: "Yangi freon quyilgan va ishga tushirilgan",
        service: "Konditsioner ta'miri",
        date: "12.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 103,
        title: "To'liq ta'mirlangan isitish qozoni",
        service: "Isitish tizimi",
        date: "14.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 104,
        title: "Yangi plastik quvurlar va kranlar",
        service: "Santexnika",
        date: "15.09.2026",
        status: "Tasdiqlangan",
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop"
      }
    ]
  });

  // Yangi rasm qo'shish simulyatsiyasi
  const [newTitle, setNewTitle] = useState('');
  const [newService, setNewService] = useState('Konditsioner ta\'miri');
  const [newUrl, setNewUrl] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPhoto = {
      id: Date.now(),
      title: newTitle,
      service: newService,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'Tasdiqlangan',
      url: newUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'
    };

    setPortfolio({
      ...portfolio,
      [activeTab]: [newPhoto, ...portfolio[activeTab]]
    });

    setNewTitle('');
    setNewUrl('');
    setIsUploadOpen(false);
  };

  const handleDelete = (id) => {
    setPortfolio({
      ...portfolio,
      [activeTab]: portfolio[activeTab].filter(item => item.id !== id)
    });
    setSelectedImg(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Asosiy Portfel Kartasi */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        {/* Tepa Header va Tab almashtirgich */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E2EBF0] pb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab(activeTab === 'oldin' ? 'keyin' : 'oldin')}
              className="p-2 hover:bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0] text-gray-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Portfel (ishdan oldin/keyin)</h2>
              <p className="text-xs text-gray-500">Bajargan ishlaringiz sifatini mijozlarga ko'rsating</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2EBF0] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('oldin')}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'oldin'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Oldin
            </button>
            <button
              onClick={() => setActiveTab('keyin')}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'keyin'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Keyin
            </button>
          </div>
        </div>

        {/* Action bar: Rasm qo'shish tugmasi */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {activeTab === 'oldin' ? 'Ta\'mirdan oldingi rasmlar' : 'Ta\'mirdan keyingi rasmlar'} ({portfolio[activeTab].length})
          </span>
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-[#10B981] text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> Rasm yuklash
          </button>
        </div>

        {/* Rasmlar Grid paneli (2x2 responsiv) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portfolio[activeTab].map((item) => (
            <div 
              key={item.id} 
              className="group relative rounded-2xl overflow-hidden border border-[#E2EBF0] bg-[#F8FAFC] aspect-video cursor-pointer shadow-sm hover:shadow-md transition"
              onClick={() => setSelectedImg(item)}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              
              {/* Overlay gradient va ma'lumotlar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs font-bold truncate max-w-[180px]">{item.title}</span>
                  <span className="px-2 py-0.5 bg-[#10B981] text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {item.status}
                  </span>
                </div>
              </div>

              {/* Hover vaqtidagi Ko'rish iconi */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-2">
                <Eye className="w-6 h-6" />
                <span className="text-xs font-bold">Kattalashtirish</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 1. RASMNI SHAKLLANTIRISH VA KO'RISH MODALI */}
      {selectedImg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">{selectedImg.service}</span>
                <h3 className="font-bold text-gray-900 text-base">{selectedImg.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedImg(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#E2EBF0] bg-black/5">
              <img src={selectedImg.url} alt={selectedImg.title} className="w-full h-72 object-cover" />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span className="flex items-center gap-1 text-[#10B981] font-bold">
                <CheckCircle2 className="w-4 h-4" /> {selectedImg.status}
              </span>
              <span>Sana: {selectedImg.date}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => handleDelete(selectedImg.id)}
                className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Rasmni o'chirish
              </button>
              <button 
                onClick={() => setSelectedImg(null)}
                className="flex-1 py-3 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold text-xs rounded-2xl shadow-md transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. YANGI RASM YUKLASH MODALI */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUpload} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E2EBF0]">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <h3 className="font-bold text-gray-900 text-base">
                Yangi rasm yuklash ({activeTab === 'oldin' ? 'Ishdan oldin' : 'Ishdan keyin'})
              </h3>
              <button 
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Rasm nomi / tavsifi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masalan: Konditsioner ta'miridan oldin..." 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Xizmat turi</label>
                <select 
                  value={newService} 
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#10B981]"
                >
                  <option>Konditsioner ta'miri</option>
                  <option>Elektrik ishlari</option>
                  <option>Santexnika</option>
                  <option>Isitish tizimi</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Rasm URL manzili (ixtiyoriy)</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:border-[#10B981]"
                />
              </div>

              {/* Drag and drop ko'rinishi */}
              <div className="border-2 border-dashed border-[#E2EBF0] rounded-2xl p-6 text-center bg-[#F8FAFC]">
                <ImageIcon className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-700">Faylni shu yerga tashlang</p>
                <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG 5MB gacha</p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl shadow-md transition text-xs"
            >
              Saqlash va yuklash
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
