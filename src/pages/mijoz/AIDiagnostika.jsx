import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, Droplets, Fan, Flame, Lightbulb, PlugZap, Send, ShieldAlert, Sparkles, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const options = [
  { id: 'santexnika', label: 'Santexnika', icon: Droplets },
  { id: 'elektrik', label: 'Elektrik', icon: PlugZap },
  { id: 'konditsioner', label: 'Konditsioner', icon: Fan },
  { id: 'isitish', label: 'Isitish', icon: Flame },
  { id: 'boshqa', label: 'Boshqa', icon: Wrench },
];

function diagnose(category, text) {
  const normalized = text.toLocaleLowerCase('uz');
  const urgent = /gaz hidi|tutun|uchqun|yong['’`]in|tok ur|sim ochiq|suv tosh|quvur yoril/.test(normalized);
  const matched = /suv|kran|quvur|rakovina|unitaz/.test(normalized) ? 'santexnika'
    : /tok|rozetka|sim|elektr|chiroq/.test(normalized) ? 'elektrik'
      : /konditsioner|sovut/.test(normalized) ? 'konditsioner'
        : /radiator|isitish|qozon/.test(normalized) ? 'isitish' : category;
  const advice = {
    santexnika: 'Suv oqayotgan bo‘lsa, asosiy ventilni yoping. Oqish joyiga elektr jihozlarini yaqinlashtirmang.',
    elektrik: 'Nam joydagi rozetka yoki ochiq simga yaqinlashmang. Xavfsiz bo‘lsa, elektrni avtomatdan o‘chiring.',
    konditsioner: 'Qurilmani o‘chirib, filtrini tekshiring. Ichki qismlarini ochishdan oldin mutaxassisni kuting.',
    isitish: 'Tizimni o‘chirib, bosim yoki haroratni o‘zboshimchalik bilan o‘zgartirmang.',
    boshqa: 'Muammo joyini xavfsiz saqlang va shikastlangan qurilmani ishlatishni vaqtincha to‘xtating.',
  }[matched];
  return { category: matched, urgent, advice };
}

const greeting = {
  id: 'welcome',
  from: 'bot',
  text: 'Assalomu alaykum! Uyingizdagi muammoni yozing, men dastlabki tahlil va xavfsizlik bo‘yicha tavsiya beraman.',
};

export default function AIDiagnostika() {
  const [category, setCategory] = useState('santexnika');
  const [messages, setMessages] = useState([greeting]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), [messages, sending]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (text.length < 8 || sending) return;
    const result = diagnose(category, text);
    const label = options.find((item) => item.id === result.category)?.label || 'Mutaxassis';
    const response = {
      id: `answer-${Date.now()}`,
      from: 'bot',
      description: text,
      result,
      text: `${result.urgent ? '⚠️ Xavfsizlikni birinchi o‘ringa qo‘ying. Agar xavf bo‘lsa, joyni tark etib, tegishli favqulodda xizmatga qo‘ng‘iroq qiling. ' : ''}${result.advice}\n\nTa’rifingizga ko‘ra, ${label.toLocaleLowerCase('uz')} mutaxassisi kerak bo‘lishi mumkin.`,
    };
    setMessages((current) => [...current, { id: `user-${Date.now()}`, from: 'user', text }]);
    setCategory(result.category);
    setDraft('');
    setSending(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setMessages((current) => [...current, response]);
    setSending(false);
  };

  const resetChat = () => {
    setMessages([greeting]);
    setDraft('');
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 pb-8 sm:gap-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102f50] via-[#164a70] to-[#00a987] p-5 text-white shadow-xl sm:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15"><Bot size={25} /></span>
          <div className="min-w-0"><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100"><Sparkles size={14} /> HomeFix AI yordamchisi</span><h1 className="mt-1 text-xl font-extrabold sm:text-2xl">AI diagnostika chat</h1><p className="mt-1 text-xs leading-5 text-blue-50 sm:text-sm">Muammoingizni yozing — dastlabki tavsiya shu chatda chiqadi.</p></div>
          <span className="ml-auto hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Onlayn</span>
        </div>
      </section>

      <section className="flex min-h-[min(68vh,680px)] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00a987]"><Bot size={20} /></span><div><h2 className="text-sm font-bold text-[#102f50]">Diagnostika yordamchisi</h2><p className="text-[11px] text-slate-500">Muammoni aniqlash va yo‘naltirish</p></div></div>
          <button type="button" onClick={resetChat} className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#008c70]">Yangi suhbat</button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f7fafc] p-4 sm:p-6" aria-live="polite" aria-relevant="additions text">
          <div className="mb-2 flex flex-wrap gap-2" aria-label="Muammo kategoriyasini tanlang">
            {options.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setCategory(id)} aria-pressed={category === id} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-semibold transition sm:text-xs ${category === id ? 'border-[#00b894] bg-emerald-50 text-[#008c70]' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'}`}><Icon size={14} />{label}</button>)}
          </div>
          {messages.map((message) => <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.from === 'bot' && <span className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#00a987] shadow-sm"><Sparkles size={16} /></span>}
            <div className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[78%] ${message.from === 'user' ? 'rounded-br-md bg-[#00a987] text-white' : `rounded-bl-md border bg-white text-slate-700 shadow-sm ${message.result?.urgent ? 'border-rose-200' : 'border-slate-100'}`}`}>
              {message.result && <div className={`mb-2 flex items-center gap-1.5 text-xs font-bold ${message.result.urgent ? 'text-rose-600' : 'text-[#008c70]'}`}>{message.result.urgent ? <ShieldAlert size={15} /> : <CheckCircle2 size={15} />}{message.result.urgent ? 'Xavfsizlik ogohlantirishi' : 'Dastlabki tahlil'}</div>}
              <p className="whitespace-pre-line text-xs leading-6 sm:text-sm">{message.text}</p>
              {message.result && <><div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800"><Lightbulb size={15} className="mt-0.5 shrink-0" /><span>Bu matn asosidagi dastlabki tavsiya. Aniq tashxis uchun mutaxassis ko‘rigi kerak.</span></div><button type="button" onClick={() => navigate('/mijoz/buyurtmaberish', { state: { category: message.result.category, description: message.description } })} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#102f50] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#1a4975]">Mutaxassis chaqirish <ArrowRight size={14} /></button></>}
            </div>
          </div>)}
          {sending && <div className="flex items-center gap-2 pl-10 text-xs text-slate-400"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:240ms]" /></span>Yordamchi javob bermoqda</div>}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="border-t border-slate-100 bg-white p-3 sm:p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-[#f7fbfd] p-2 transition focus-within:border-[#00b894] focus-within:bg-white">
            <label className="sr-only" htmlFor="ai-chat-input">Muammoni yozing</label>
            <textarea id="ai-chat-input" rows={1} maxLength={1000} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form.requestSubmit(); } }} placeholder="Uyingizdagi muammoni yozing..." className="max-h-32 min-h-11 min-w-0 flex-1 resize-y bg-transparent px-2 py-3 text-sm outline-none placeholder:text-slate-400" />
            <button type="submit" disabled={draft.trim().length < 8 || sending} aria-label="Xabarni yuborish" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00b894] text-white shadow-sm transition hover:bg-[#009d7c] disabled:cursor-not-allowed disabled:bg-slate-300"><Send size={18} /></button>
          </div>
          <p className="mt-2 px-1 text-[10px] leading-4 text-slate-400">Enter — yuborish · Shift+Enter — yangi qator. AI javobi dastlabki tavsiya hisoblanadi.</p>
        </form>
      </section>
    </div>
  );
}
