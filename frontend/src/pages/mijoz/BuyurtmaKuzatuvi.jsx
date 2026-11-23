import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Yozishma } from './Chat';

export default function BuyurtmaKuzatuvi() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const { state } = useLocation();
  const master = state?.master || { name: 'Sardorbek Yoldoshev', categoryName: 'Tajribali Santexnik', rating: 4.9 };
  const orderTitle = state?.category ? ({ cleaning: 'Cleaning', santexnika: 'Santexnika ta’mirlash', elektrik: 'Elektrik ishlari', konditsioner: 'Konditsioner xizmati', texnika: 'Maishiy texnika ta’miri', mebel: 'Mebel yig‘ish', isitish: 'Isitish tizimi', boshqa: 'Uy ta’miri' }[state.category] || state.category) : 'Santexnika ta’mirlash';
  const orderId = state?.orderId || '#HF-8492';
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Buyurtma kuzatuvi</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Usta hozir qayerda ekanligini va buyurtma holatini kuzating.</p>
        </div>
        <Link to="/mijoz/buyurtmalar" className="text-xs font-bold text-[#00b894] hover:underline">
          ← Buyurtmalarga qaytish
        </Link>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-r from-[#102f50] to-[#1a4975] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-white/5 blur-2xl"></div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-blue-200 font-medium">Buyurtma {orderId}</span>
          <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Usta yo‘lda 🚗
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold">{orderTitle}</h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Taxminiy kelish vaqti: <b>15 daqiqa</b></p>
      </div>

      {/* Timeline steps */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Jarayon bosqichlari</h3>
        
        <div className="space-y-6 relative before:absolute before:inset-y-3 before:left-3.5 before:w-0.5 before:bg-slate-100">
          <div className="flex items-center gap-4 relative">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00b894] text-white z-10 shadow-sm"><CheckCircle2 size={18} /></span>
            <div>
              <b className="block text-xs sm:text-sm text-[#102f50]">Buyurtma qabul qilindi</b>
              <small className="text-[11px] text-slate-400">Bugun, 14:00</small>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00b894] text-white z-10 shadow-sm"><CheckCircle2 size={18} /></span>
            <div>
              <b className="block text-xs sm:text-sm text-[#102f50]">Usta tayinlandi: {master.name}</b>
              <small className="text-[11px] text-slate-400">Reyting: {master.rating}</small>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white z-10 shadow-sm animate-pulse"><Clock size={18} /></span>
            <div>
              <b className="block text-xs sm:text-sm text-amber-600 font-bold">Usta manzilga harakatlanmoqda</b>
              <small className="text-[11px] text-slate-400">Hozirda sizga yaqinlashmoqda</small>
            </div>
          </div>

          <div className="flex items-center gap-4 relative opacity-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500 z-10 font-bold text-xs">4</span>
            <div>
              <b className="block text-xs sm:text-sm text-slate-500">Ish bajarildi va yakunlandi</b>
              <small className="text-[11px] text-slate-400">Kutilmoqda</small>
            </div>
          </div>
        </div>
      </div>

      {/* Master Contact Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[#f3faff] flex items-center justify-center text-[#102f50] font-bold text-lg border border-slate-100">
            <User size={28} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#102f50]">{master.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{master.categoryName} · ⭐ {master.rating}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <a href="tel:+998901234567" aria-label="Qo'ng'iroq qilish" className="p-3 rounded-2xl bg-emerald-50 text-[#00b894] hover:bg-emerald-100 transition shadow-sm">
            <Phone size={20} />
          </a>
          <button type="button" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label="Usta bilan chatni ochish" className="p-3 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition shadow-sm">
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      {chatOpen && <Yozishma recipient="master" compact />}

      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 sm:p-6">
        <h3 className="font-bold text-[#102f50]">Ish tugadimi?</h3>
        <p className="mt-1 text-sm text-slate-600">Buyurtma yakunlangach, usta faoliyatiga baho berishingiz mumkin.</p>
        <button onClick={() => navigate('/mijoz/sharhqoldirish', { state: { order: { id: orderId, title: orderTitle } } })} className="mt-4 rounded-xl bg-[#00b894] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#009d7c]">Ish yakunlandi · sharh qoldirish</button>
      </div>
    </div>
  );
}
