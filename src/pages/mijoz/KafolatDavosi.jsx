import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function KafolatDavosi() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ orderId: '#HF-8100', reason: '', desc: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Kafolat da’vosi</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Bajarilgan ish sifatidan norozisizmi? Kafolat doirasida bepul bartaraf etamiz.</p>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 flex items-center gap-3.5">
            <ShieldCheck className="text-[#00b894] shrink-0" size={24} />
            <p className="text-xs text-slate-600 leading-relaxed">
              Barcha rasmiy xizmatlarimizga 1 yillik kafolat taqdim etiladi. Murojaatingiz 24 soat ichida ko‘rib chiqiladi.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Buyurtma raqami</label>
            <input 
              type="text" 
              value={form.orderId}
              onChange={(e) => setForm({...form, orderId: e.target.value})}
              required
              className="w-full bg-[#f3faff] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Muammo sababi</label>
            <select 
              className="w-full bg-[#f3faff] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
              value={form.reason}
              onChange={(e) => setForm({...form, reason: e.target.value})}
            >
              <option value="suv_oqishi">Qayta suv oqishi boshlandi</option>
              <option value="chala_ish">Ish to‘liq bajarilmagan</option>
              <option value="boshqa">Boshqa sabab</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Batafsil tushuntring</label>
            <textarea 
              rows="4"
              required
              value={form.desc}
              onChange={(e) => setForm({...form, desc: e.target.value})}
              placeholder="Muammoni qisqacha yozib qoldiring..."
              className="w-full bg-[#f3faff] border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm outline-none focus:border-[#00b894]"
            ></textarea>
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-[#00b894] text-white font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-[#009d7c] transition">
            Kafolat arizasini yuborish
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-3xl border border-emerald-100 p-8 text-center space-y-4 shadow-sm">
          <div className="h-16 w-16 bg-emerald-100 text-[#00b894] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#102f50]">Arizangiz qabul qilindi!</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Mutaxassis tez orada siz bilan bog‘lanadi va muammoni bepul hal qilib beradi.
          </p>
          <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-[#f3faff] text-[#102f50] rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-100 transition">
            Yangi ariza berish
          </button>
        </div>
      )}
    </div>
  );
}