import React, { useState } from 'react';
import { Headset, Send, User, CheckCheck } from 'lucide-react';

const STORAGE_KEY = 'homefix_admin_chat_messages';
const welcome = { id: 'welcome', sender: 'admin', text: 'Assalomu alaykum! HomeFix yordam xizmatiga xush kelibsiz. Sizga qanday yordam bera olamiz?', time: '' };

export function Yozishma({ recipient = 'admin', compact = false }) {
  const isAdmin = recipient === 'admin';
  const storageKey = isAdmin ? STORAGE_KEY : 'homefix_master_chat_messages';
  const initial = isAdmin ? [welcome] : [{ id: 'master-welcome', sender: 'master', text: 'Assalomu alaykum! Buyurtmangiz bo‘yicha savollaringiz bo‘lsa, yozing.', time: '' }];
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || initial; } catch { return initial; }
  });
  const [input, setInput] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { id: Date.now(), sender: 'client', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setMessages(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setInput('');
  };
  return <section className={`flex min-h-0 flex-col overflow-hidden bg-white ${compact ? 'h-[420px] rounded-3xl border border-slate-100 shadow-sm' : 'mx-auto h-[calc(100dvh-170px)] max-h-[760px] w-full max-w-3xl rounded-3xl border border-slate-100 shadow-sm'}`}>
    <header className="flex items-center gap-3 border-b border-slate-100 p-4 sm:p-5"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#00b894]">{isAdmin ? <Headset size={22} /> : <User size={22} />}</span><div><h2 className="text-sm font-bold text-[#102f50]">{isAdmin ? 'HomeFix yordam' : 'Sardorbek Yoldoshev'}</h2><p className="text-[11px] font-medium text-emerald-600">{isAdmin ? 'Admin bilan bog‘lanish' : 'Usta · Buyurtma bo‘yicha chat'}</p></div></header>
    <div className="flex-1 space-y-4 overflow-y-auto bg-[#f3faff]/50 p-4 sm:p-6" aria-live="polite">{messages.map((message) => { const mine = message.sender === 'client'; return <div key={message.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm ${mine ? 'rounded-br-none bg-[#00b894] text-white' : 'rounded-bl-none border border-slate-100 bg-white text-[#102f50]'}`}><p className="leading-relaxed">{message.text}</p><div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${mine ? 'text-emerald-100' : 'text-slate-400'}`}><span>{message.time || (isAdmin ? 'Yordam' : 'Usta')}</span>{mine && <CheckCheck size={13} />}</div></div></div>; })}</div>
    <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 sm:p-4"><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Xabar yozing" placeholder="Xabar yozing..." className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-[#f3faff] px-4 py-3 text-xs outline-none focus:border-[#00b894]" /><button type="submit" disabled={!input.trim()} aria-label="Xabarni yuborish" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00b894] text-white disabled:bg-slate-300"><Send size={18} /></button></form>
    {isAdmin && <p className="border-t border-slate-100 py-2 text-center text-[10px] text-slate-400">Demo rejimida xabarlar ushbu qurilmada saqlanadi.</p>}
  </section>;
}

export default function Chat() {
  return <div className="space-y-4"><div><h1 className="text-xl font-extrabold text-[#102f50] sm:text-2xl">Xabarlar</h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Savol va murojaatlaringiz bo‘yicha admin bilan bog‘laning.</p></div><Yozishma /></div>;
}
