import React, { useMemo, useState } from 'react';
import { Search, ShieldCheck, Wallet, Sparkles, Droplets, PlugZap, Fan, Hammer, Sofa, ArrowRight, Wrench, Clock, User, MessageSquare, Paintbrush, Flame, Lock, CreditCard, Plus, X, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MijozYordamOynasi from '../../components/MijozYordamOynasi';

const quickServices = [
  { id: 'cleaning', title: 'Cleaning', keywords: 'tozalash', icon: Sparkles, color: 'bg-emerald-50 text-[#00b894]' },
  { id: 'santexnika', title: 'Santexnika', keywords: 'quvur kran suv', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
  { id: 'elektrik', title: 'Elektrik', keywords: 'elektr elektrchi rozetka sim chiroq', icon: PlugZap, color: 'bg-amber-50 text-amber-600' },
  { id: 'konditsioner', title: 'Konditsioner', keywords: 'konditsioner sovutgich', icon: Fan, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'texnika', title: 'Maishiy texnika', keywords: 'muzlatgich kir yuvish mashina', icon: Hammer, color: 'bg-rose-50 text-rose-600' },
  { id: 'mebel', title: 'Mebel yig‘ish', keywords: 'mebel shkaf stol', icon: Sofa, color: 'bg-indigo-50 text-indigo-600' },
  { id: 'boshqa', title: 'Bo‘yoq ishlari', keywords: 'bo‘yoq remont', icon: Paintbrush, color: 'bg-purple-50 text-purple-600' },
  { id: 'isitish', title: 'Isitish tizimi', keywords: 'isitish radiator', icon: Flame, color: 'bg-orange-50 text-orange-600' },
  { id: 'boshqa', title: 'Qulf va eshik', keywords: 'qulf eshik', icon: Lock, color: 'bg-teal-50 text-teal-600' },
];

function readCards() {
  try { return JSON.parse(localStorage.getItem('homefix_payment_cards') || '[]'); } catch { return []; }
}

function readWalletBalance() {
  const saved = Number(localStorage.getItem('homefix_wallet_balance'));
  return Number.isFinite(saved) && saved >= 0 ? saved : 12500;
}

export default function BoshSahifa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState(readCards);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardForm, setCardForm] = useState({ holder: '', number: '', expiry: '' });
  const [cardError, setCardError] = useState('');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(readWalletBalance);
  const [topUpAmount, setTopUpAmount] = useState('50000');
  const [selectedCardId, setSelectedCardId] = useState('');
  const [walletMessage, setWalletMessage] = useState('');
  const [supportOpen, setSupportOpen] = useState(false);
  const { user } = useAuth();
  const searchActive = Boolean(searchQuery.trim());
  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('uz');
    return quickServices.filter((service) => `${service.title} ${service.keywords}`.toLocaleLowerCase('uz').includes(query));
  }, [searchQuery]);

  const addCard = (event) => {
    event.preventDefault();
    const digits = cardForm.number.replace(/\D/g, '');
    if (digits.length < 12 || digits.length > 19) { setCardError('Karta raqamini 12–19 ta raqam bilan kiriting.'); return; }
    const card = { id: `${Date.now()}`, holder: cardForm.holder.trim(), last4: digits.slice(-4), expiry: cardForm.expiry };
    const updated = [...cards, card];
    setCards(updated);
    setSelectedCardId(card.id);
    localStorage.setItem('homefix_payment_cards', JSON.stringify(updated));
    setCardForm({ holder: '', number: '', expiry: '' });
    setCardError('');
    setCardModalOpen(false);
  };

  const removeCard = (id) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    localStorage.setItem('homefix_payment_cards', JSON.stringify(updated));
    if (selectedCardId === id) setSelectedCardId('');
  };

  const topUpWallet = (event) => {
    event.preventDefault();
    const amount = Number(topUpAmount);
    const paymentCard = cards.find((card) => card.id === selectedCardId) || cards[0];
    if (!paymentCard) {
      setWalletMessage('Avval to‘lov kartasini qo‘shing.');
      setWalletModalOpen(false);
      setCardModalOpen(true);
      return;
    }
    if (!Number.isFinite(amount) || amount < 10000) return;
    const nextBalance = walletBalance + amount;
    setWalletBalance(nextBalance);
    localStorage.setItem('homefix_wallet_balance', String(nextBalance));
    setWalletMessage(`${amount.toLocaleString('uz-UZ')} so‘m demo balansga qo‘shildi (${paymentCard.last4}).`);
    setWalletModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Greeting & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#defaf4] text-[#00b894] font-bold shadow-inner">
            <User size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block leading-none">Xayrli kun 👋</span>
            <h2 className="text-lg font-extrabold text-[#102f50] mt-1">{user?.name || 'Mijoz'}</h2>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-80">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Xizmatlarni qidiring..." 
            aria-label="Xizmatlarni qidirish"
            className="w-full rounded-2xl border border-slate-200 bg-[#f3faff] py-3 pl-10 pr-4 text-xs shadow-sm outline-none transition focus:border-[#00b894] focus:bg-white"
          />
        </div>
      </div>

      {searchActive && (
        <section className="space-y-4" aria-live="polite">
          <div><h3 className="text-sm font-extrabold text-[#102f50]">Qidiruv natijalari ({filteredServices.length})</h3><p className="mt-1 text-xs text-slate-500">“{searchQuery.trim()}” bo‘yicha mos xizmatlar</p></div>
          {filteredServices.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {filteredServices.map((srv) => <Link to="/mijoz/buyurtmaberish" state={{ category: srv.id }} key={srv.title} className="group flex min-h-32 flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#00b894] hover:shadow-md sm:p-5"><span className={`mb-2.5 flex h-12 w-12 items-center justify-center rounded-2xl ${srv.color}`}><srv.icon size={22} /></span><span className="text-center text-xs font-bold text-[#102f50]">{srv.title}</span></Link>)}
          </div> : <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center"><Search size={24} className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-[#102f50]">Xizmat topilmadi</p><p className="mt-1 text-xs text-slate-500">Boshqa nom bilan qidirib ko‘ring.</p></div>}
        </section>
      )}

      {/* Wallet and payment cards */}
      {!searchActive && <section className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102f50] via-[#16456c] to-[#087d70] p-5 text-white shadow-lg sm:p-7">
          <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-white/5 blur-2xl" />
          <div className="relative flex items-start justify-between gap-3"><div><span className="text-xs font-medium text-blue-100">HomeFix hamyon balansi</span><div className="mt-2 flex items-baseline gap-2"><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{walletBalance.toLocaleString('uz-UZ')}</h2><span className="text-sm font-semibold text-emerald-200">so‘m</span></div></div><span className="rounded-xl bg-white/10 p-3 text-emerald-200"><Wallet size={22} /></span></div>
          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4"><span className="flex items-center gap-2 text-xs text-blue-50"><ShieldCheck size={16} className="text-emerald-200" /> To‘lovlar himoyalangan</span><button type="button" onClick={() => { setWalletMessage(''); setWalletModalOpen(true); }} className="inline-flex items-center gap-1 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold text-[#102f50] transition hover:bg-emerald-50">Hamyonni to‘ldirish <ArrowRight size={14} /></button></div>
          {walletMessage && <p aria-live="polite" className="relative mt-2 text-[11px] leading-4 text-emerald-100">{walletMessage}</p>}
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-extrabold text-[#102f50]">To‘lov kartalarim</h3><p className="mt-1 text-xs text-slate-500">Kartani saqlab, to‘lovda tez tanlang</p></div><CreditCard className="text-[#00a987]" size={21} /></div>
          {cards.length ? <div className="mt-4 space-y-2">{cards.map((card) => <div key={card.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#f7fbfd] p-3"><span className="flex min-w-0 items-center gap-3"><span className="rounded-xl bg-white p-2 text-[#00a987]"><CreditCard size={18} /></span><span className="min-w-0"><b className="block truncate text-xs text-[#102f50]">•••• •••• •••• {card.last4}</b><span className="block truncate text-[10px] text-slate-500">{card.holder} · {card.expiry}</span></span></span><button onClick={() => removeCard(card.id)} aria-label={`Oxiri ${card.last4} bilan tugaydigan kartani o‘chirish`} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15} /></button></div>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center"><CreditCard size={23} className="mx-auto text-slate-300" /><p className="mt-2 text-xs font-semibold text-slate-600">Hozircha karta qo‘shilmagan</p></div>}
          <button onClick={() => setCardModalOpen(true)} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#bceee1] bg-emerald-50/60 px-4 py-2.5 text-xs font-bold text-[#008c70] transition hover:bg-emerald-100"><Plus size={16} />Yangi karta qo‘shish</button>
        </div>
      </section>}

      {/* Quick Action Buttons (4 grid cards) */}
      {!searchActive && <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: 'Usta chaqirish', icon: Wrench, link: '/mijoz/buyurtmaberish', color: 'bg-[#defaf4] text-[#00b894]' },
          { title: 'Buyurtmalar', icon: Clock, link: '/mijoz/buyurtmalar', color: 'bg-blue-50 text-blue-600' },
          { title: 'AI Diagnostika', icon: Sparkles, link: '/mijoz/aidiagnostika', color: 'bg-purple-50 text-purple-600' },
          { title: 'Chat / Yordam', icon: MessageSquare, support: true, link: '/mijoz/chat', color: 'bg-amber-50 text-amber-600' },
        ].map((item, idx) => (
          item.support ? <button key={idx} type="button" onClick={() => setSupportOpen(true)} className="flex items-center gap-3.5 text-left sm:flex-col sm:items-center sm:text-center rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition hover:border-[#00b894] hover:shadow-md">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color} shadow-sm`}>
              <item.icon size={22} />
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#102f50] sm:text-center">{item.title}</span>
          </button> : <Link key={idx} to={item.link} className="flex items-center gap-3.5 sm:flex-col sm:items-center rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition hover:border-[#00b894] hover:shadow-md">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color} shadow-sm`}><item.icon size={22} /></span>
            <span className="text-xs sm:text-sm font-bold text-[#102f50] sm:text-center">{item.title}</span>
          </Link>
        ))}
      </div>}

      {/* Active Order Banner */}
      {!searchActive && <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400">Joriy buyurtmangiz</span>
          <span className="text-[11px] font-bold px-3.5 py-1 rounded-full text-amber-600 bg-amber-50">
            Usta yo‘lda 🚗
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-[#102f50]">Santexnika ta’mirlash</h4>
            <p className="text-xs text-slate-500 mt-0.5">Usta: Sardorbek Y. · Bugun, 14:30</p>
          </div>
          <Link to="/mijoz/buyurtmakuzatuvi" className="rounded-2xl bg-[#00b894] px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-[#009d7c] text-center">
            Kuzatish
          </Link>
        </div>
      </div>}

      {/* Categories / Services Grid */}
      {!searchActive && <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{searchQuery ? `Qidiruv natijalari (${filteredServices.length})` : 'Xizmatlar kategoriyasi'}</h3>
          <Link to="/mijoz/ustalarroyxati" className="text-xs font-bold text-[#00b894] hover:underline">Barcha ustalar</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {filteredServices.map((srv) => (
            <Link to="/mijoz/buyurtmaberish" state={{ category: srv.id }} key={srv.title} className="group flex min-h-32 flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#00b894] hover:shadow-md sm:p-5">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${srv.color} mb-2.5 shadow-sm`}>
                <srv.icon size={22} />
              </span>
              <span className="text-xs font-bold text-[#102f50] text-center">{srv.title}</span>
            </Link>
          ))}
        </div>
        {filteredServices.length === 0 && <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center"><Search size={24} className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-[#102f50]">Xizmat topilmadi</p><p className="mt-1 text-xs text-slate-500">Boshqa nom bilan qidirib ko‘ring.</p></div>}
      </div>}

      {cardModalOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#102f50]/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setCardModalOpen(false); }}><form onSubmit={addCard} className="w-full max-w-md space-y-4 rounded-3xl bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-lg font-extrabold text-[#102f50]">Yangi karta qo‘shish</h2><p className="mt-1 text-xs text-slate-500">Karta raqami xavfsizlik uchun to‘liq saqlanmaydi.</p></div><button type="button" onClick={() => setCardModalOpen(false)} aria-label="Yopish" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div><label className="block text-xs font-bold text-slate-600">Karta egasining ismi<input required maxLength={60} autoComplete="cc-name" value={cardForm.holder} onChange={(event) => setCardForm({ ...cardForm, holder: event.target.value })} placeholder="Ism Familiya" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-3 text-sm outline-none focus:border-[#00b894]" /></label><label className="block text-xs font-bold text-slate-600">Karta raqami<input required inputMode="numeric" autoComplete="cc-number" value={cardForm.number} onChange={(event) => setCardForm({ ...cardForm, number: event.target.value.replace(/[^\d\s]/g, '').slice(0, 23) })} placeholder="0000 0000 0000 0000" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-3 text-sm outline-none focus:border-[#00b894]" /></label><label className="block text-xs font-bold text-slate-600">Amal qilish muddati<input required autoComplete="cc-exp" value={cardForm.expiry} onChange={(event) => setCardForm({ ...cardForm, expiry: event.target.value.slice(0, 5) })} placeholder="OO/YY" pattern="(0[1-9]|1[0-2])/[0-9]{2}" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-3 text-sm outline-none focus:border-[#00b894]" /></label>{cardError && <p role="alert" className="text-xs text-rose-600">{cardError}</p>}<div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800"><ShieldCheck size={15} className="mt-0.5 shrink-0" />Demo rejimida faqat karta egasi, oxirgi 4 raqam va muddat saqlanadi. To‘lov tizimiga ulanish hali yo‘q.</div><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b894] py-3 text-sm font-bold text-white hover:bg-[#009d7c]"><Check size={16} />Kartani saqlash</button></form></div>}

      {walletModalOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#102f50]/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setWalletModalOpen(false); }}><form onSubmit={topUpWallet} className="w-full max-w-md space-y-5 rounded-3xl bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-[#00a987]">HomeFix hamyon</p><h2 className="mt-1 text-xl font-extrabold text-[#102f50]">Balansni to‘ldirish</h2></div><button type="button" onClick={() => setWalletModalOpen(false)} aria-label="Yopish" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div><div><label htmlFor="wallet-amount" className="mb-2 block text-xs font-bold text-slate-600">To‘ldirish summasi</label><div className="relative"><input id="wallet-amount" type="number" min="10000" step="10000" required value={topUpAmount} onChange={(event) => setTopUpAmount(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-4 py-3 pr-14 text-lg font-bold text-[#102f50] outline-none focus:border-[#00b894]" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">so‘m</span></div><div className="mt-2 flex flex-wrap gap-2">{[50000, 100000, 200000].map((amount) => <button type="button" key={amount} onClick={() => setTopUpAmount(String(amount))} className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${Number(topUpAmount) === amount ? 'bg-emerald-100 text-[#008c70]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{amount.toLocaleString('uz-UZ')}</button>)}</div></div><div><label htmlFor="wallet-card" className="mb-2 block text-xs font-bold text-slate-600">To‘lov kartasi</label>{cards.length ? <select id="wallet-card" value={selectedCardId || cards[0].id} onChange={(event) => setSelectedCardId(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-[#102f50] outline-none focus:border-[#00b894]">{cards.map((card) => <option key={card.id} value={card.id}>•••• {card.last4} · {card.holder}</option>)}</select> : <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-slate-200 p-3"><span className="text-xs text-slate-500">To‘lov uchun karta qo‘shing.</span><button type="button" onClick={() => { setWalletModalOpen(false); setCardModalOpen(true); }} className="shrink-0 text-xs font-bold text-[#008c70]">Karta qo‘shish</button></div>}</div><p className="rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">Bu demo amali: summa faqat ekrandagi hamyon balansiga qo‘shiladi, bankdan haqiqiy pul yechilmaydi.</p><button type="submit" disabled={!cards.length} className="w-full rounded-xl bg-[#00b894] py-3.5 text-sm font-bold text-white transition hover:bg-[#009d7c] disabled:cursor-not-allowed disabled:bg-slate-300">{Number(topUpAmount).toLocaleString('uz-UZ')} so‘m qo‘shish</button></form></div>}

      {supportOpen && <MijozYordamOynasi onClose={() => setSupportOpen(false)} />}

    </div>
  );
}
