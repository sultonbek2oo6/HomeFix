import React, { useState } from 'react';
import { Headset, MessageCircle, Send, X } from 'lucide-react';

export default function MijozYordamOynasi({ onClose }) {
  const [messages, setMessages] = useState([{ id: 1, from: 'support', text: 'Assalomu alaykum! HomeFix yordam xizmatiga xush kelibsiz. Sizga qanday yordam bera olamiz?' }]);
  const [text, setText] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    const message = text.trim();
    if (!message) return;
    setMessages((current) => [...current, { id: Date.now(), from: 'customer', text: message }]);
    setText('');
  };

  return <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#102f50]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="support-title" className="flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
      <header className="flex items-center justify-between bg-gradient-to-r from-[#102f50] to-[#087d70] px-4 py-4 text-white sm:px-5"><div className="flex items-center gap-3"><span className="rounded-xl bg-white/15 p-2"><Headset size={20} /></span><div><h2 id="support-title" className="text-sm font-extrabold">HomeFix yordam</h2><p className="mt-0.5 text-[10px] text-emerald-100">Mijozlarga yordam xizmati</p></div></div><button onClick={onClose} aria-label="Yordam oynasini yopish" className="rounded-xl p-2 text-white/80 hover:bg-white/10"><X size={18} /></button></header>
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f5f9fc] p-4 sm:p-5" aria-live="polite">{messages.map((message) => <div key={message.id} className={`flex ${message.from === 'customer' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${message.from === 'customer' ? 'rounded-br-md bg-[#00b894] text-white' : 'rounded-bl-md border border-slate-100 bg-white text-[#102f50]'}`}><p>{message.text}</p><span className={`mt-1 block text-right text-[9px] ${message.from === 'customer' ? 'text-emerald-100' : 'text-slate-400'}`}>{message.from === 'customer' ? 'Siz' : 'Yordam'}</span></div></div>)}</div>
      <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 sm:p-4"><label className="sr-only" htmlFor="support-message">Yordamga xabar yozing</label><input id="support-message" value={text} onChange={(event) => setText(event.target.value)} placeholder="Savolingizni yozing..." className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-3 text-xs outline-none focus:border-[#00b894]" /><button type="submit" disabled={!text.trim()} aria-label="Xabar yuborish" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00b894] text-white transition hover:bg-[#009d7c] disabled:bg-slate-300"><Send size={17} /></button></form>
      <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 px-3 py-2 text-[10px] text-slate-400"><MessageCircle size={12} /> Yordam demo oynasi · xabarlar operatorga yuborilmaydi</div>
    </section>
  </div>;
}
