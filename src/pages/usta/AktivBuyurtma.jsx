import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Check, 
  Navigation, 
  X, 
  Send,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { readCompletedOrders, saveCompletedOrder } from '../../utils/buyurtmaSaqlash';

export default function AktivBuyurtma({ order }) {
  const currentOrder = order || {
    code: "#HF-8492",
    title: "Santexnika ta’mirlash",
    client: "Murodov Jamshid",
    phone: "+998 90 123 45 67",
    address: "Toshkent, Yakkasaroy tumani, Amir Temur ko'chasi 12",
    price: "120 000 so‘m",
    status: "jarayonda"
  };

  const [savedDetails, setSavedDetails] = useState(() => readCompletedOrders()[currentOrder.code]);
  const [status, setStatus] = useState(savedDetails ? 'tugallandi' : (currentOrder.status || 'jarayonda'));
  const [completionOpen, setCompletionOpen] = useState(false);
  const [warrantyMonths, setWarrantyMonths] = useState('3');
  const [workNote, setWorkNote] = useState('');
  const [completionPhoto, setCompletionPhoto] = useState('');
  const [completionError, setCompletionError] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'chat' yoki 'marshrut'
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Chat holati
  const [messages, setMessages] = useState([
    { sender: 'client', text: 'Salom, konditsioner ishlamayapti. Bugun kelib ko\'rishingiz mumkinmi?', time: '11:30' },
    { sender: 'usta', text: 'Ha, albatta. 14:00 da boraman.', time: '11:32' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleCompletionPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setCompletionError('Faqat rasm faylini tanlang.'); return; }
    if (file.size > 2 * 1024 * 1024) { setCompletionError('Rasm hajmi 2 MB dan kichik bo‘lishi kerak.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setCompletionPhoto(String(reader.result)); setCompletionError(''); };
    reader.readAsDataURL(file);
  };

  const finishOrder = (event) => {
    event.preventDefault();
    const months = Number(warrantyMonths);
    if (!Number.isInteger(months) || months < 1 || months > 60) {
      setCompletionError('Kafolat muddatini 1–60 oy oralig‘ida kiriting.');
      return;
    }
    const details = {
      completed: true,
      completedAt: new Date().toISOString(),
      warrantyMonths: months,
      workNote: workNote.trim(),
      photo: completionPhoto,
    };
    try {
      saveCompletedOrder(currentOrder.code, details);
    } catch {
      setCompletionError('Ma’lumotni saqlab bo‘lmadi. Rasm hajmini kichraytirib qayta urinib ko‘ring.');
      return;
    }
    setSavedDetails(details);
    setStatus('tugallandi');
    setCompletionOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'usta', text: inputText, time: 'Hozir' }]);
    setInputText('');
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#E2EBF0] shadow-sm space-y-5 sm:space-y-6">
        
        {/* Tepa qism: Xizmat nomi va ID */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E2EBF0] pb-3.5 gap-2">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              {status === 'tugallandi' ? 'Yakunlandi' : 'Faol jarayonda'}
            </span>
            <h2 className="text-base sm:text-xl font-black text-gray-900 mt-1.5">{currentOrder.title}</h2>
          </div>
          <span className="text-[11px] font-bold text-gray-400 bg-[#F8FAFC] px-3 py-1 rounded-xl border border-[#E2EBF0]">
            {currentOrder.code}
          </span>
        </div>

        {/* Mijoz kartasi va tezkor amallar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F8FAFC] p-3.5 sm:p-4 rounded-2xl border border-[#E2EBF0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-[#10B981] flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
              MJ
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{currentOrder.client}</h4>
              <a href={`tel:${currentOrder.phone}`} className="text-[11px] sm:text-xs text-[#10B981] font-semibold flex items-center gap-1 mt-0.5 hover:underline">
                <Phone className="w-3 h-3" /> {currentOrder.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
            <button 
              onClick={() => setActiveModal('chat')}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-emerald-50 text-[#10B981] border border-[#E2EBF0] hover:border-[#10B981] font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Chat
            </button>
            <button 
              onClick={() => setActiveModal('marshrut')}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" /> Xarita
            </button>
          </div>
        </div>

        {/* Manzil va Narx Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 sm:p-4 rounded-2xl border border-[#E2EBF0] bg-[#F8FAFC]/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Mijoz manzili</span>
            <p className="font-bold text-gray-800 flex items-start gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" /> {currentOrder.address}
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl border border-[#E2EBF0] bg-[#F8FAFC]/50 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Xizmat narxi</span>
            <p className="font-black text-[#10B981] text-base sm:text-lg">{currentOrder.price}</p>
          </div>
        </div>

        {/* Buyurtma Holati (Timeline) */}
        <div className="space-y-3 pt-2 border-t border-[#E2EBF0]">
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Bosqichlar</h3>
          
          <div className="space-y-4 relative pl-5 border-l-2 border-[#10B981] ml-2">
            <div className="relative flex items-center justify-between">
              <span className="absolute -left-[25px] w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white shadow-xs"></span>
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Qabul qilindi
              </span>
              <span className="text-[10px] text-gray-400 font-medium">12:45</span>
            </div>

            <div className="relative flex items-center justify-between">
              <span className={`absolute -left-[25px] w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${status === 'jarayonda' || status === 'tugallandi' ? 'bg-[#10B981]' : 'bg-gray-300'}`}></span>
              <span className={`text-xs font-bold ${status === 'jarayonda' ? 'text-[#10B981]' : 'text-gray-700'}`}>
                Jarayonda
              </span>
              <span className="text-[10px] text-gray-400 font-medium">14:10</span>
            </div>

            <div className="relative flex items-center justify-between">
              <span className={`absolute -left-[25px] w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${status === 'tugallandi' ? 'bg-[#10B981]' : 'bg-gray-300'}`}></span>
              <span className={`text-xs font-medium ${status === 'tugallandi' ? 'text-[#10B981] font-bold' : 'text-gray-400'}`}>
                Tugallandi
              </span>
              <span className="text-[10px] text-gray-400 font-medium">--:--</span>
            </div>
          </div>
        </div>

        {/* Ishni yakunlash tugmasi */}
        {status === 'jarayonda' ? (
          <button 
            onClick={() => setCompletionOpen(true)}
            className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95"
          >
            <Check className="w-4 h-4" /> Ishni yakunlash va tasdiqlash
          </button>
        ) : (
          <div className="p-3.5 bg-emerald-50 text-[#10B981] font-bold text-center rounded-2xl text-xs sm:text-sm border border-emerald-100 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Buyurtma muvaffaqiyatli yakunlandi! 🎉
          </div>
        )}
        {savedDetails && (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 space-y-2">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-800"><ShieldCheck className="h-4 w-4" />Mijozga yuborilgan kafolat: {savedDetails.warrantyMonths} oy</p>
            {savedDetails.workNote && <p className="text-xs leading-5 text-slate-700">{savedDetails.workNote}</p>}
            {savedDetails.photo && <img src={savedDetails.photo} alt="Bajarilgan ish rasmi" className="max-h-56 rounded-xl object-cover" />}
          </div>
        )}
      </div>

      {completionOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompletionOpen(false); }}>
          <form onSubmit={finishOrder} className="w-full max-w-lg space-y-4 rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-extrabold text-slate-900">Ishni yakunlash</h2><p className="mt-1 text-xs text-slate-500">Bajarilgan ish va kafolat ma’lumoti mijozga ko‘rinadi.</p></div><button type="button" onClick={() => setCompletionOpen(false)} aria-label="Yopish" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>
            <label className="block text-xs font-bold text-slate-700">Kafolat muddati (oy)<input type="number" min="1" max="60" required value={warrantyMonths} onChange={(event) => setWarrantyMonths(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:border-emerald-500" /></label>
            <label className="block text-xs font-bold text-slate-700">Bajarilgan ish haqida<input type="text" maxLength="300" value={workNote} onChange={(event) => setWorkNote(event.target.value)} placeholder="Masalan: quvur almashtirildi va sizib chiqish bartaraf etildi" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:border-emerald-500" /></label>
            <label className="block text-xs font-bold text-slate-700">Bajarilgan ish rasmi (ixtiyoriy)<input type="file" accept="image/*" onChange={handleCompletionPhoto} className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs" /></label>
            {completionPhoto && <img src={completionPhoto} alt="Tanlangan ish rasmi" className="max-h-40 rounded-xl object-cover" />}
            {completionError && <p role="alert" className="text-xs font-medium text-rose-600">{completionError}</p>}
            <button type="submit" className="w-full rounded-xl bg-[#10B981] py-3 text-sm font-bold text-white hover:bg-emerald-600">Kafolatni saqlash va ishni yakunlash</button>
          </form>
        </div>
      )}

      {/* CHAT MODALI */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full flex flex-col h-[85vh] sm:h-[500px] shadow-2xl border border-[#E2EBF0] overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="p-4 border-b border-[#E2EBF0] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 text-[#10B981] rounded-xl flex items-center justify-center font-bold text-xs">MJ</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{currentOrder.client}</h4>
                  <span className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'usta' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs ${msg.sender === 'usta' ? 'bg-[#10B981] text-white rounded-br-none' : 'bg-white border border-[#E2EBF0] text-slate-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#E2EBF0] flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Xabar yozing..." 
                className="flex-1 bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#10B981]"
              />
              <button type="submit" className="p-2.5 bg-[#10B981] text-white rounded-xl transition shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MARSHRUT MODALI */}
      {activeModal === 'marshrut' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E2EBF0] animate-in slide-in-from-bottom duration-200">
            <div className="p-4 border-b border-[#E2EBF0] flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Marshrut & Check-in</h3>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=500&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-85" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#10B981] text-white p-2.5 rounded-full shadow-lg ring-4 ring-emerald-100">
                <Navigation className="w-4 h-4 fill-white animate-pulse" />
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center gap-2.5 bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2EBF0]">
                <MapPin className="w-4 h-4 text-[#10B981] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] text-gray-400 block font-semibold">Mijoz manzili</span>
                  <span className="text-xs font-bold text-slate-800 truncate block">{currentOrder.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button 
                  onClick={() => alert("Yo'lga chiqildi!")}
                  className="py-2.5 bg-emerald-50 text-[#10B981] font-bold text-xs rounded-xl border border-emerald-200 transition active:scale-95"
                >
                  Yo'lga chiqish
                </button>
                <button 
                  onClick={() => setIsCheckedIn(!isCheckedIn)}
                  className={`py-2.5 font-bold text-xs rounded-xl transition shadow-xs active:scale-95 ${isCheckedIn ? 'bg-blue-600 text-white' : 'bg-[#10B981] text-white'}`}
                >
                  {isCheckedIn ? 'Checked-In ✓' : 'Check-in'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
