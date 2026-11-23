import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Plus, 
  CheckCircle2, 
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  Filter
} from 'lucide-react';

export default function MoliyaVaTolovlar() {
  const [activeTab, setActiveTab] = useState('tranzaksiyalar');
  const [filterType, setFilterType] = useState('all'); // 'all', 'in', 'out'
  
  // Modallar holati
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Moliya va Balans holatlari
  const [balance, setBalance] = useState(4250000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Kartalar ro'yxati
  const [cards, setCards] = useState([
    { id: 1, number: '8600 **** **** 1234', fullNumber: '8600 4801 2345 1234', bank: 'Uzcard', expiry: '08/28', isMain: true },
    { id: 2, number: '9860 **** **** 5678', fullNumber: '9860 1209 8765 5678', bank: 'Humo', expiry: '11/27', isMain: false }
  ]);
  const [selectedCard, setSelectedCard] = useState(cards[0].number);

  // Yangi karta formasi
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');

  // Tranzaksiyalar ro'yxati
  const [transactions, setTransactions] = useState([
    { id: 1, date: "12.09.2026", time: "14:20", amount: 180000, code: "#HF-001234", title: "Konditsioner ta'miri", type: 'in' },
    { id: 2, date: "10.09.2026", time: "11:15", amount: 120000, code: "#HF-001215", title: "Elektrik ishlari", type: 'in' },
    { id: 3, date: "08.09.2026", time: "09:45", amount: 90000, code: "#HF-001112", title: "Santexnika xizmati", type: 'in' },
    { id: 4, date: "05.09.2026", time: "18:30", amount: 500000, code: "#WD-00041", title: "Kartaga yechib olindi", type: 'out' }
  ]);

  // Pul chiqarish amali
  const handleWithdraw = (e) => {
    e.preventDefault();
    const num = Number(withdrawAmount);
    if (num <= 0) {
      alert("Iltimos, to'g'ri summa kiriting!");
      return;
    }
    if (num > balance) {
      alert("Mablag' yetarli emas!");
      return;
    }

    const today = new Date().toLocaleDateString('ru-RU');
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Balansni kamaytirish va tranzaksiyaga qo'shish
    setBalance(prev => prev - num);
    setTransactions([
      {
        id: Date.now(),
        date: today,
        time: timeNow,
        amount: num,
        code: `#WD-${Math.floor(1000 + Math.random() * 9000)}`,
        title: "Kartaga yechib olindi",
        type: 'out'
      },
      ...transactions
    ]);

    alert(`${num.toLocaleString()} so'm kartangizga muvaffaqiyatli o'tkazildi!`);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount('');
  };

  // Yangi karta qo'shish amali
  const handleAddCard = (e) => {
    e.preventDefault();
    const cleanNum = newCardNumber.replace(/\s/g, '');
    if (cleanNum.length !== 16) {
      alert("Karta raqami 16 xonali bo'lishi kerak!");
      return;
    }

    const isUzcard = cleanNum.startsWith('8600');
    const isHumo = cleanNum.startsWith('9860');

    const newCardObj = {
      id: Date.now(),
      number: `${cleanNum.slice(0, 4)} **** **** ${cleanNum.slice(12)}`,
      fullNumber: cleanNum.match(/.{1,4}/g).join(' '),
      bank: isUzcard ? 'Uzcard' : isHumo ? 'Humo' : 'Plastik Karta',
      expiry: newCardExpiry || '12/28',
      isMain: cards.length === 0
    };

    setCards([...cards, newCardObj]);
    alert("Yangi karta muvaffaqiyatli biriktirildi!");
    setNewCardNumber('');
    setNewCardExpiry('');
    setIsAddCardModalOpen(false);
  };

  // Karta raqamini formatlash inputi
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setNewCardNumber(formatted);
  };

  // Filtrlangan tranzaksiyalar
  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'in') return t.type === 'in';
    if (filterType === 'out') return t.type === 'out';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Asosiy Karta */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Moliya va tranzaksiyalar</h2>
            <p className="text-xs text-gray-500 mt-0.5">Mablag'laringiz va plastik kartalar hisobi</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#10B981] text-xs font-bold rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4" /> Faol
          </span>
        </div>

        {/* Zamonaviy Neo-Card Balans Paneli */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wider">Asosiy Balans</span>
              <button 
                onClick={() => setShowCardDetails(!showCardDetails)} 
                className="text-emerald-400 hover:text-white transition p-1"
              >
                {showCardDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {showCardDetails ? '••••••••' : `${balance.toLocaleString()} so'm`}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Oylik daromad o'sishi +12%</span>
            </div>
          </div>

          {/* Tezkor Harakatlar */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <div className="text-xs text-slate-300 font-medium w-full sm:w-auto">
              Asosiy karta: <span className="text-white font-bold">{cards.find(c => c.isMain)?.number || 'Biriktirilmagan'}</span>
            </div>
            <button 
              onClick={() => setIsWithdrawModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl shadow-lg shadow-[#10B981]/30 transition text-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <ArrowUpRight className="w-4 h-4" /> Hisobni chiqarish
            </button>
          </div>
        </div>

        {/* Tablar */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2EBF0]">
          <button
            onClick={() => setActiveTab('tranzaksiyalar')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'tranzaksiyalar'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Tranzaksiyalar
          </button>
          <button
            onClick={() => setActiveTab('hisob')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'hisob'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Hisob va Kartalar ({cards.length})
          </button>
        </div>

        {/* 1. TRANZAKSIYALAR TABI */}
        {activeTab === 'tranzaksiyalar' && (
          <div className="space-y-4">
            
            {/* Filter tugmalari */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filtr:
              </span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-[#F8FAFC] text-gray-500 border border-[#E2EBF0] hover:bg-gray-100'
                }`}
              >
                Barchasi
              </button>
              <button
                onClick={() => setFilterType('in')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterType === 'in'
                    ? 'bg-emerald-100 text-[#10B981] border border-emerald-200'
                    : 'bg-[#F8FAFC] text-gray-500 border border-[#E2EBF0] hover:bg-gray-100'
                }`}
              >
                Kirim (+)
              </button>
              <button
                onClick={() => setFilterType('out')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterType === 'out'
                    ? 'bg-red-100 text-red-500 border border-red-200'
                    : 'bg-[#F8FAFC] text-gray-500 border border-[#E2EBF0] hover:bg-gray-100'
                }`}
              >
                Chiqim (-)
              </button>
            </div>

            {/* Tranzaksiyalar Ro'yxati */}
            <div className="space-y-2.5">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs font-semibold bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2EBF0]">
                  Ushbu turdagi tranzaksiyalar topilmadi.
                </div>
              ) : (
                filteredTransactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-emerald-50/30 rounded-2xl border border-[#E2EBF0] transition">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${t.type === 'in' ? 'bg-emerald-100 text-[#10B981]' : 'bg-red-100 text-red-500'}`}>
                        {t.type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{t.title}</h4>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">{t.date} • {t.time} • <span className="text-gray-500">{t.code}</span></p>
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm font-black ${t.type === 'in' ? 'text-[#10B981]' : 'text-red-500'}`}>
                      {t.type === 'in' ? '+' : '-'}{t.amount.toLocaleString()} so'm
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 2. HISOB VA KARTALAR TABI */}
        {activeTab === 'hisob' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {cards.map((card) => (
                <div key={card.id} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                      {card.bank}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">{card.number}</h4>
                      <p className="text-[10px] text-gray-400">Amal qilish muddati: {card.expiry}</p>
                    </div>
                  </div>
                  {card.isMain ? (
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-xl">
                      Asosiy
                    </span>
                  ) : (
                    <button 
                      onClick={() => setCards(cards.map(c => ({ ...c, isMain: c.id === card.id })))}
                      className="text-[10px] font-bold text-gray-500 hover:text-gray-900 bg-white border border-[#E2EBF0] px-3 py-1 rounded-xl transition"
                    >
                      Asosiy qilish
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsAddCardModalOpen(true)}
              className="w-full py-3.5 border-2 border-dashed border-[#E2EBF0] hover:border-[#10B981] text-gray-700 font-bold rounded-2xl transition text-xs flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-emerald-50/50"
            >
              <Plus className="w-4 h-4 text-[#10B981]" /> Yangi plastink karta biriktirish
            </button>
          </div>
        )}

      </div>

      {/* 1. PUL YECHISH MODALI */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleWithdraw} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <h3 className="font-bold text-gray-900 text-base">Kartaga pul yechib olish</h3>
              <button type="button" onClick={() => setIsWithdrawModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Mablag' o'tkaziladigan karta</label>
                <select 
                  value={selectedCard} 
                  onChange={(e) => setSelectedCard(e.target.value)} 
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#10B981]"
                >
                  {cards.map(c => (
                    <option key={c.id} value={c.number}>{c.bank} – {c.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Chiqarish summasi (so'm)</label>
                  <span className="text-[10px] text-gray-400 font-semibold">Mavjud: {balance.toLocaleString()} so'm</span>
                </div>
                <input 
                  type="number" 
                  required
                  placeholder="Masalan: 200000" 
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#10B981]"
                />
              </div>

              {/* Tezkor Summa Tugmalari */}
              <div className="grid grid-cols-4 gap-2">
                {[100000, 250000, 500000, balance].map((amt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setWithdrawAmount(amt.toString())}
                    className="py-1.5 bg-[#F8FAFC] border border-[#E2EBF0] hover:border-[#10B981] hover:bg-emerald-50 rounded-xl text-[10px] font-bold text-gray-700 transition"
                  >
                    {amt === balance ? 'Barchasi' : `${amt / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-[#10B981]/30 active:scale-95">
              Tasdiqlash va o'tkazish
            </button>
          </form>
        </div>
      )}

      {/* 2. YANGI KARTA QO'SHISH MODALI */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddCard} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <h3 className="font-bold text-gray-900 text-base">Yangi karta biriktirish</h3>
              <button type="button" onClick={() => setIsAddCardModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Karta raqami</label>
                <input 
                  type="text" 
                  required
                  placeholder="8600 0000 0000 0000" 
                  value={newCardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Amal qilish muddati (MM/YY)</label>
                <input 
                  type="text" 
                  required
                  placeholder="12/28" 
                  maxLength="5"
                  value={newCardExpiry}
                  onChange={(e) => setNewCardExpiry(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#10B981]"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-[#10B981]/30 active:scale-95">
              Kartani saqlash
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
