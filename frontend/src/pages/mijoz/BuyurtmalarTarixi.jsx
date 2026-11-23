import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, ChevronRight, Wrench, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { readCompletedOrders } from '../../utils/buyurtmaSaqlash';

const myOrders = [
  { id: '#HF-8492', title: 'Santexnika ta’mirlash', date: 'Bugun, 14:00', price: '120 000 so‘m', status: 'Jarayonda', type: 'jarayonda', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { id: '#HF-8100', title: 'Konditsioner tozalash', date: '12 Okt, 10:30', price: '150 000 so‘m', status: 'Bajarildi', type: 'bajarildi', color: 'bg-emerald-50 text-[#00b894] border-emerald-100' },
  { id: '#HF-7932', title: 'Elektrik rozetka o‘rnatish', date: '05 Okt, 16:00', price: '90 000 so‘m', status: 'Bajarildi', type: 'bajarildi', color: 'bg-emerald-50 text-[#00b894] border-emerald-100' },
];

export default function BuyurtmalarTarixi() {
  const [filter, setFilter] = useState('barchasi');
  const [completedOrders, setCompletedOrders] = useState(readCompletedOrders);

  useEffect(() => {
    const refresh = () => setCompletedOrders(readCompletedOrders());
    window.addEventListener('storage', refresh);
    window.addEventListener('homefix-orders-updated', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('homefix-orders-updated', refresh);
    };
  }, []);

  const orders = myOrders.map((order) => {
    const completion = completedOrders[order.id];
    return completion ? {
      ...order,
      type: 'bajarildi',
      status: 'Bajarildi',
      color: 'bg-emerald-50 text-[#00b894] border-emerald-100',
      completion,
    } : order;
  });

  // Filtr mantig'i to'liq ulandi
  const filteredOrders = filter === 'barchasi' 
    ? orders
    : orders.filter(ord => ord.type === filter);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Buyurtmalarim</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Barcha joriy va yakunlangan buyurtmalaringiz tarixi.</p>
        </div>
        <Link to="/mijoz/buyurtmaberish" className="inline-flex items-center justify-center rounded-2xl bg-[#00b894] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-[#009d7c] active:scale-95">
          + Yangi buyurtma
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'barchasi', label: 'Barchasi' },
          { id: 'jarayonda', label: 'Jarayonda' },
          { id: 'bajarildi', label: 'Bajarildi' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              filter === tab.id 
                ? 'bg-[#102f50] text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#00b894]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3.5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:shadow-md hover:border-emerald-100">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#defaf4] text-[#00b894] shrink-0">
                  <Wrench size={22} />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-extrabold text-slate-400">{ord.id}</span>
                    <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full border ${ord.color}`}>{ord.status}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#102f50] mt-1">{ord.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{ord.date} · <b className="text-slate-700">{ord.price}</b></p>
                  {ord.completion && <div className="mt-2 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3"><p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800"><ShieldCheck size={14} />{ord.completion.warrantyMonths} oy kafolat</p>{ord.completion.workNote && <p className="mt-1 text-xs leading-5 text-slate-600">{ord.completion.workNote}</p>}{ord.completion.photo && <img src={ord.completion.photo} alt="Usta yuborgan bajarilgan ish rasmi" className="mt-2 max-h-40 rounded-lg object-cover" />}</div>}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {ord.type === 'bajarildi' && <Link to="/mijoz/sharhqoldirish" state={{ order: ord }} className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold text-amber-700 transition hover:bg-amber-100"><Star size={15} /> Sharh qoldirish</Link>}
                <Link to="/mijoz/buyurtmakuzatuvi" className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#f3faff] px-5 py-3 text-xs font-bold text-[#102f50] border border-slate-200 transition hover:bg-[#00b894] hover:text-white hover:border-[#00b894]">Batafsil <ChevronRight size={16} /></Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
            <p className="text-sm text-slate-400">Bu bo'limda buyurtmalar topilmadi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
