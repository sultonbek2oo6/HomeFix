import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, 
  AlertTriangle, Clock, UserX, MessageSquare, Wrench, FileText, Send, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Namuna uchun mijozning faol kafolatlari
const mockWarranties = [
  {
    id: '#HF-8100',
    service: 'Santexnika ta’mirlash (Kran va quvur)',
    master: 'Sardorbek Y.',
    date: '12-Oktyabr, 2026',
    warrantyDaysLeft: 340,
    status: 'Faol',
  },
  {
    id: '#HF-7940',
    service: 'Konditsioner freon to‘ldirish',
    master: 'Anvar M.',
    date: '15-Avgust, 2026',
    warrantyDaysLeft: 180,
    status: 'Faol',
  }
];

export default function KafolatDavosi() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kafolat'); // 'kafolat' | 'jalba'
  const [sent, setSent] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('#HF-8100');

  // Form holatlari
  const [form, setForm] = useState({
    orderId: '#HF-8100',
    reason: 'suv_oqishi',
    complainReason: 'kechikish',
    desc: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Sarlavha qismi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Kafolat va Shikoyatlar Markazi</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mijoz huquqlarini himoya qilish, bepul kafolatli ta'mirlash va xizmat sifatini nazorat qilish
          </p>
        </div>
        
        {/* Chat / Admin Yordamiga o'tish tugmasi */}
        <button 
          onClick={() => navigate('/mijoz/chat')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 text-[#102f50] font-bold text-xs hover:bg-slate-200 transition"
        >
          <MessageSquare size={16} className="text-[#00b894]" />
          Admin bilan chat / Yordam
        </button>
      </div>

      {/* 1. MAVJUD FAOL KAFOLATLAR RO'YXATI (KARTONLAR) */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-[#102f50] flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#00b894]" /> Sizdagi faol kafolatlar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockWarranties.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-3xl border transition bg-white shadow-sm flex flex-col justify-between ${
                selectedOrder === item.id ? 'border-[#00b894] ring-2 ring-[#00b894]/20' : 'border-slate-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-emerald-50 text-[#008c70]">
                    {item.id}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Clock size={12} /> {item.warrantyDaysLeft} kun kafolat qoldi
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#102f50]">{item.service}</h3>
                <p className="text-xs text-slate-500 mt-1">Usta: <span className="font-semibold text-slate-700">{item.master}</span> · {item.date}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">1 yillik kafolat doirasida</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(item.id);
                    setForm({ ...form, orderId: item.id });
                  }}
                  className="text-xs font-bold text-[#00b894] hover:underline flex items-center gap-1"
                >
                  Murojaat qilish <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TAB Murojaat turini tanlash (Kafolat vs Shikoyat) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => { setActiveTab('kafolat'); setSent(false); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'kafolat' 
              ? 'bg-white text-[#102f50] shadow-sm' 
              : 'text-slate-500 hover:text-[#102f50]'
          }`}
        >
          <Wrench size={16} className={activeTab === 'kafolat' ? 'text-[#00b894]' : ''} />
          Kafolat da’vosi (Bepul ta’mirlash)
        </button>

        <button
          onClick={() => { setActiveTab('jalba'); setSent(false); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'jalba' 
              ? 'bg-white text-rose-600 shadow-sm' 
              : 'text-slate-500 hover:text-rose-600'
          }`}
        >
          <AlertTriangle size={16} className={activeTab === 'jalba' ? 'text-rose-500' : ''} />
          Usta ustidan shikoyat (Jalba)
        </button>
      </div>

      {/* 3. FORMA YOKI MUVAFFAQIYAT XABARI */}
      {!sent ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-5">
          
          {/* Kafolat formasi informatori */}
          {activeTab === 'kafolat' ? (
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 flex items-center gap-3.5">
              <ShieldCheck className="text-[#00b894] shrink-0" size={24} />
              <p className="text-xs text-slate-600 leading-relaxed">
                <b>1 Yillik Kafolat Kafolati:</b> Ish sifatidan norozi bo‘lsangiz yoki muammo qayta takrorlansa, mutaxassisimiz kelib bepul bartaraf etib beradi.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-rose-50/70 border border-rose-100 p-4 flex items-center gap-3.5">
              <ShieldAlert className="text-rose-500 shrink-0" size={24} />
              <p className="text-xs text-rose-800 leading-relaxed">
                <b>Kompaniya Nazorati:</b> Ustaning nojo‘ya xatti-harakati, kelishilgan summani asossiz oshirishi yoki intizomsizligi bo‘yicha shikoyat qiling. Adminlar 1 soat ichida javob berishadi.
              </p>
            </div>
          )}

          {/* Buyurtma tanlash */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Buyurtma raqami</label>
            <select
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
            >
              {mockWarranties.map((w) => (
                <option key={w.id} value={w.id}>{w.id} — {w.service} ({w.master})</option>
              ))}
              <option value="boshqa">Boshqa eski buyurtma</option>
            </select>
          </div>

          {/* Sababi */}
          {activeTab === 'kafolat' ? (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Kafolat muammosi sababi</label>
              <select 
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              >
                <option value="suv_oqishi">Qayta suv oqishi / buzilishi boshlandi</option>
                <option value="chala_ish">Ish to‘liq va sifatli bajarilmagan</option>
                <option value="qurilma_nosoz">O‘rnatilgan ehtiyot qism nosoz chiqdi</option>
                <option value="boshqa">Boshqa texnik sabab</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Shikoyat (Jalba) turi</label>
              <select 
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
                value={form.complainReason}
                onChange={(e) => setForm({ ...form, complainReason: e.target.value })}
              >
                <option value="kechikish">Usta kelishilgan vaqtga kelmadi yoki kechikdi</option>
                <option value="qopollik">Muomala madaniyati yo‘q / Qo‘pollik qildi</option>
                <option value="ortiqcha_pul">Asossiz ravishda ko‘p pul talab qildi</option>
                <option value="zarar_yetkazish">Uy jihozlariga yoki mulkka zarar yetkazdi</option>
                <option value="boshqa">Boshqa sabab</option>
              </select>
            </div>
          )}

          {/* Batafsil tushuntirish */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Batafsil tushuntirish</label>
            <textarea 
              rows="4"
              required
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder={activeTab === 'kafolat' ? "Muammo qayerda va qanday yuz berganini yozing..." : "Usta nima qildi va vaziyatni batafsil tasvirlab bering..."}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
            ></textarea>
          </div>

          {/* Yuborish tugmasi */}
          <button 
            type="submit" 
            className={`w-full py-4 rounded-2xl font-bold text-sm text-white shadow-lg transition flex items-center justify-center gap-2 ${
              activeTab === 'kafolat'
                ? 'bg-[#00b894] hover:bg-[#009d7c] shadow-emerald-200'
                : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
            }`}
          >
            <Send size={18} />
            {activeTab === 'kafolat' ? 'Kafolat arizasini yuborish' : 'Shikoyatni kompaniyaga yuborish'}
          </button>
        </form>
      ) : (
        /* Muvaffaqiyatli yuborilgandagi ekran */
        <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-4 shadow-sm">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto ${
            activeTab === 'kafolat' ? 'bg-emerald-100 text-[#00b894]' : 'bg-rose-100 text-rose-600'
          }`}>
            <CheckCircle2 size={36} />
          </div>
          
          <h3 className="text-lg font-bold text-[#102f50]">
            {activeTab === 'kafolat' ? 'Kafolat arizangiz qabul qilindi!' : 'Shikoyat ko‘rib chiqishga olindi!'}
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {activeTab === 'kafolat' 
              ? "Mutaxassisimiz 24 soat ichida siz bilan bog‘lanadi va muammoni bepul bartaraf etadi."
              : "Kompaniya ma’muriyati (Admin) holatni tekshirib, usta bilan bog‘lanadi hamda sizga natija bo‘yicha aloqaga chiqadi."}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setSent(false)} 
              className="px-5 py-2.5 bg-slate-100 text-[#102f50] rounded-xl text-xs font-bold hover:bg-slate-200 transition"
            >
              Yangi murojaat
            </button>
            <button 
              onClick={() => navigate('/mijoz/chat')} 
              className="px-5 py-2.5 bg-[#102f50] text-white rounded-xl text-xs font-bold hover:bg-[#184878] transition flex items-center gap-1.5"
            >
              <MessageSquare size={14} /> Admin chatini ochish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
