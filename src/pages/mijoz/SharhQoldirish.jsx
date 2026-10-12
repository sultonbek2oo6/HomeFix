import React, { useMemo, useState } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SharhQoldirish() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || { id: '#HF-8100', title: 'Yakunlangan buyurtma' };
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const savedReviews = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('homefix_reviews') || '[]'); } catch { return []; }
  }, []);
  const alreadyReviewed = savedReviews.some((review) => review.orderId === order.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (alreadyReviewed) { setError('Bu buyurtma uchun sharh avval yuborilgan.'); return; }
    const nextReviews = [...savedReviews, { orderId: order.id, title: order.title, rating, comment: comment.trim(), createdAt: new Date().toISOString() }];
    localStorage.setItem('homefix_reviews', JSON.stringify(nextReviews));
    navigate('/mijoz/buyurtmalar', { replace: true, state: { reviewSaved: true } });
  };

  return <div className="mx-auto w-full max-w-xl space-y-6 pb-12">
    <div><p className="text-xs font-bold uppercase tracking-wider text-[#00a987]">Buyurtma yakunlandi</p><h1 className="mt-1 text-2xl font-extrabold text-[#102f50]">Ustaga baho bering</h1><p className="mt-1 text-sm text-slate-500">Fikringiz boshqa mijozlarga usta tanlashda yordam beradi.</p></div>
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4"><p className="text-xs font-semibold text-emerald-800">{order.id} <span className="mx-1 text-emerald-300">·</span> {order.title}</p></div>
    {alreadyReviewed ? <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm"><CheckCircle2 size={36} className="mx-auto text-[#00b894]" /><h2 className="mt-3 font-bold text-[#102f50]">Sharh yuborilgan</h2><p className="mt-1 text-sm text-slate-500">Ushbu buyurtmaga baho berib bo‘lgansiz.</p><Link to="/mijoz/buyurtmalar" className="mt-5 inline-flex rounded-xl bg-[#00b894] px-5 py-3 text-sm font-bold text-white">Buyurtmalarga qaytish</Link></div> : <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
      <div><span className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-400">Umumiy baho</span><div className="flex justify-center gap-2" role="group" aria-label="Baho tanlang">{[1, 2, 3, 4, 5].map((star) => <button aria-label={`${star} yulduz`} aria-pressed={rating === star} type="button" key={star} onClick={() => setRating(star)} className={`rounded-xl p-2 transition hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-slate-200'}`}><Star size={30} fill={rating >= star ? 'currentColor' : 'none'} /></button>)}</div><p className="mt-1 text-xs text-slate-400">{rating}/5 baho</p></div>
      <div className="text-left"><label htmlFor="review-comment" className="mb-2 block text-xs font-bold text-slate-600">Izoh (ixtiyoriy)</label><textarea id="review-comment" rows={4} maxLength={700} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Usta ishi va xizmat haqida fikringiz..." className="w-full rounded-2xl border border-slate-200 bg-[#f7fbfd] p-4 text-sm outline-none transition focus:border-[#00b894] focus:bg-white" /><span className="mt-1 block text-right text-xs text-slate-400">{comment.length}/700</span></div>
      {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
      <button type="submit" className="w-full rounded-2xl bg-[#00b894] py-4 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-[#009d7c]">Sharhni saqlash</button>
    </form>}
  </div>;
}
