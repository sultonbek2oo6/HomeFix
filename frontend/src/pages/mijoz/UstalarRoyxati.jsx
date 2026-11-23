import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock3, MapPin, Star, ShieldCheck, SlidersHorizontal, Wrench } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Demo ma'lumotlari: haqiqiy bandlik va masofa uchun backend xizmatiga ulash kerak.
const masters = [
  { id: 1, name: 'Sardorbek Yoldoshev', category: 'santexnika', categoryName: 'Santexnik', rating: 4.9, reviews: 98, availableIn: 0, distance: 1.2 },
  { id: 2, name: 'Anvar Karimov', category: 'elektrik', categoryName: 'Elektrik', rating: 4.8, reviews: 74, availableIn: 35, distance: 2.4 },
  { id: 3, name: 'Jasurbek Toshmatov', category: 'konditsioner', categoryName: 'Konditsioner ustasi', rating: 5.0, reviews: 112, availableIn: 0, distance: 3.1 },
  { id: 4, name: 'Shuhrat Aliyev', category: 'texnika', categoryName: 'Maishiy texnika ustasi', rating: 4.7, reviews: 53, availableIn: 55, distance: 1.8 },
  { id: 5, name: 'Diyorbek Rahimov', category: 'mebel', categoryName: 'Mebel ustasi', rating: 4.9, reviews: 61, availableIn: 0, distance: 4.6 },
  { id: 6, name: 'Akmal Norboyev', category: 'isitish', categoryName: 'Isitish ustasi', rating: 4.8, reviews: 46, availableIn: 20, distance: 2.1 },
  { id: 7, name: 'Malika Usmonova', category: 'cleaning', categoryName: 'Tozalash xizmati', rating: 4.9, reviews: 87, availableIn: 0, distance: 1.6 },
  { id: 8, name: 'Rustam Eshonqulov', category: 'boshqa', categoryName: 'Uy ta’miri ustasi', rating: 4.8, reviews: 39, availableIn: 70, distance: 3.8 },
  { id: 9, name: 'Bekzod Ismoilov', category: 'santexnika', categoryName: 'Santexnik', rating: 4.7, reviews: 65, availableIn: 15, distance: 2.7 },
  { id: 10, name: 'Aziza Qodirova', category: 'elektrik', categoryName: 'Elektrik', rating: 4.9, reviews: 89, availableIn: 0, distance: 5.2 },
  { id: 11, name: 'Odiljon Mamatqulov', category: 'konditsioner', categoryName: 'Konditsioner ustasi', rating: 4.8, reviews: 76, availableIn: 40, distance: 1.9 },
  { id: 12, name: 'Javohir Tursunov', category: 'texnika', categoryName: 'Maishiy texnika ustasi', rating: 4.9, reviews: 91, availableIn: 0, distance: 3.4 },
];

const categoryLabels = { cleaning: 'Cleaning', santexnika: 'Santexnika', elektrik: 'Elektrik', konditsioner: 'Konditsioner', texnika: 'Maishiy texnika', mebel: 'Mebel yig‘ish', isitish: 'Isitish tizimi', boshqa: 'Boshqa xizmat' };

export default function UstalarRoyxati() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const [filter, setFilter] = useState('barchasi');
  const [sort, setSort] = useState('tavsiya');

  const visibleMasters = useMemo(() => {
    let result = [...masters];
    if (filter === 'bosh') result = result.filter((master) => master.availableIn === 0);
    if (filter === 'mos' && order?.category) result = result.filter((master) => master.category === order.category);
    return result.sort((a, b) => {
      if (sort === 'reyting') return b.rating - a.rating || b.reviews - a.reviews;
      if (sort === 'masofa') return a.distance - b.distance;
      return (a.availableIn > 0) - (b.availableIn > 0) || b.rating - a.rating || a.distance - b.distance;
    });
  }, [filter, order?.category, sort]);

  const chooseMaster = (master) => {
    if (order) {
      navigate('/mijoz/buyurtmatasdiqlash', { state: { ...order, master } });
      return;
    }
    navigate('/mijoz/buyurtmaberish', { state: { selectedMaster: master } });
  };

  return <div className="mx-auto w-full max-w-6xl space-y-4 pb-12 sm:space-y-5">
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wider text-[#00a987]">Mutaxassis tanlash · {masters.length} usta</p><h1 className="mt-1 text-xl font-extrabold text-[#102f50] sm:text-2xl">Barcha ustalar</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Bandlik, bo‘shash vaqti, masofa va reytingni solishtiring.</p></div>
      {order ? <button onClick={() => navigate('/mijoz/buyurtmaberish', { state: order })} className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 sm:text-sm"><ArrowLeft size={16} />Buyurtmani tahrirlash</button> : <Link to="/mijoz/buyurtmaberish" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00b894] px-4 py-2.5 text-xs font-bold text-white sm:text-sm">Buyurtma berish <ArrowRight size={15} /></Link>}
    </div>

    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" aria-label="Ustalarni filtrlash">
        {[['barchasi', 'Barchasi'], ['bosh', 'Hozir bo‘sh'], ...(order?.category ? [['mos', 'Xizmatga mos']] : [])].map(([id, label]) => <button key={id} onClick={() => setFilter(id)} className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${filter === id ? 'bg-[#102f50] text-white' : 'bg-slate-50 text-slate-600 hover:bg-emerald-50'}`}>{label}</button>)}
      </div>
      <label className="flex items-center gap-2 text-xs font-semibold text-slate-500"><SlidersHorizontal size={15} /><span className="shrink-0">Saralash:</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#102f50] outline-none focus:border-[#00b894] sm:flex-none"><option value="tavsiya">Bo‘sh va tavsiya etilgan</option><option value="reyting">Reyting bo‘yicha</option><option value="masofa">Eng yaqin</option></select></label>
    </div>

    <p className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5 text-[11px] leading-5 text-slate-600">Narx soatbay emas: usta muammo tavsifini ko‘rib, ish hajmiga qarab yakuniy narxni buyurtmani tasdiqlashdan oldin kelishadi. Masofa va bandlik hozircha namuna ma’lumotlari.</p>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {visibleMasters.map((master) => {
        const available = master.availableIn === 0;
        const categoryMatches = !order?.category || master.category === order.category;
        return <article key={master.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7faf5] text-[#00a987]"><Wrench size={20} /></span>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-1"><h2 className="truncate text-sm font-bold text-[#102f50]">{master.name}</h2><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${available ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{available ? 'Hozir bo‘sh' : 'Band'}</span></div><p className="mt-0.5 truncate text-[11px] text-slate-500">{master.categoryName}</p></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-[#f7fbfd] px-2.5 py-2.5">
            <div className="min-w-0"><span className="flex items-center gap-1 text-[10px] text-slate-400"><Star size={12} className="fill-amber-400 text-amber-400" /> Reyting</span><p className="mt-1 truncate text-xs font-extrabold text-[#102f50]">{master.rating} <span className="font-normal text-slate-400">({master.reviews})</span></p></div>
            <div className="min-w-0"><span className="flex items-center gap-1 text-[10px] text-slate-400"><MapPin size={12} /> Masofa</span><p className="mt-1 truncate text-xs font-extrabold text-[#102f50]">{master.distance} km</p></div>
            <div className="min-w-0"><span className="flex items-center gap-1 text-[10px] text-slate-400"><Clock3 size={12} /> {available ? 'Jadval' : 'Bo‘shaydi'}</span><p className="mt-1 truncate text-xs font-extrabold text-[#102f50]">{available ? 'Darhol' : `${master.availableIn} daq.`}</p></div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2"><p className="truncate text-[11px] font-bold text-[#008c70]">Narx: muammo bo‘yicha</p><span className="flex shrink-0 items-center gap-1 text-[10px] text-slate-400"><ShieldCheck size={13} className="text-[#00b894]" />Tasdiqlangan</span></div>
          <button disabled={!categoryMatches} onClick={() => chooseMaster(master)} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#00b894] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#009d7c] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">{categoryMatches ? (order ? 'Shu ustani tanlash' : 'Usta tanlash') : 'Xizmat turi mos emas'}{categoryMatches && <ArrowRight size={14} />}</button>
        </article>;
      })}
    </div>
    {visibleMasters.length === 0 && <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">Bu filtr bo‘yicha usta topilmadi.</div>}
  </div>;
}
