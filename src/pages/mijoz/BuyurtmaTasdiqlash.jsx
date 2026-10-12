import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';

export default function BuyurtmaTasdiqlash() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {
    category: 'Santexnika',
    description: 'Vannaxona krani oqmoqda, almashtirish kerak.',
    address: 'Toshkent sh., Amir Temur ko‘ch., 15-uy',
    phone: '+998 90 123-45-67',
  };

  const handleConfirm = () => {
    navigate('/mijoz/buyurtmakuzatuvi', { state: { ...data, orderId: '#HF-8492' } });
  };
  const categoryName = { cleaning: 'Cleaning', santexnika: 'Santexnika', elektrik: 'Elektrik', konditsioner: 'Konditsioner', texnika: 'Maishiy texnika', mebel: 'Mebel yig‘ish', isitish: 'Isitish tizimi', boshqa: 'Boshqa xizmat' }[data.category] || data.category;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Buyurtmani tasdiqlash</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Kiritilgan ma'lumotlarni oxirgi marta tekshiring va tasdiqlang.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#defaf4] text-[#00b894]">
            <Wrench size={24} />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tanlangan xizmat</span>
            <h3 className="text-base font-bold text-[#102f50]">{categoryName}</h3>
          </div>
        </div>

        {data.master && <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"><span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Siz tanlagan usta</span><div className="mt-2 flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold text-[#102f50]">{data.master.name}</p><p className="mt-0.5 text-xs text-slate-500">⭐ {data.master.rating} · {data.master.categoryName}</p></div><Link to="/mijoz/ustalarroyxati" state={{ order: data }} className="text-xs font-bold text-[#008c70] hover:underline">Ustani almashtirish</Link></div></div>}

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 block text-[11px] font-bold mb-1">Muammo tavsifi:</span>
            <p className="text-slate-700 bg-[#f3faff] p-4 rounded-2xl border border-slate-100 leading-relaxed">{data.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[#00b894] mt-0.5"><MapPin size={18} /></span>
              <div>
                <b className="block text-slate-400 text-[11px]">Manzil</b>
                <span className="text-slate-700 font-medium">{data.address}</span>
                {data.coordinates && <span className="mt-1 block text-[10px] text-emerald-700">GPS: {data.coordinates.latitude}, {data.coordinates.longitude}</span>}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[#00b894] mt-0.5"><Phone size={18} /></span>
              <div>
                <b className="block text-slate-400 text-[11px]">Telefon raqam</b>
                <span className="text-slate-700 font-medium">{data.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4 flex items-center gap-3.5">
          <ShieldCheck className="text-[#00b894] shrink-0" size={24} />
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
            Buyurtma tasdiqlangandan so‘ng 5 daqiqa ichida eng yaqin usta biriktiriladi va 1 yillik rasmiy kafolat taqdim etiladi.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link to="/mijoz/buyurtmaberish" className="w-1/3 text-center rounded-2xl border border-slate-200 py-3.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
            Orqaga
          </Link>
          <button 
            onClick={handleConfirm}
            className="w-2/3 flex items-center justify-center gap-2 rounded-2xl bg-[#00b894] py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-[#009d7c] active:scale-95"
          >
            Tasdiqlash va usta chaqirish <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
