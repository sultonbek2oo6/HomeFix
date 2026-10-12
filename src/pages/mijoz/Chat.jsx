import React, { useState } from 'react';
import { Send, Phone, User, CheckCheck, Paperclip } from 'lucide-react';

const initialMessages = [
  { id: 1, sender: 'master', text: 'Assalomu alaykum! Buyurtmangizni qabul qildim, 10 daqiqada yetib boraman.', time: '14:05' },
  { id: 2, sender: 'client', text: 'Va alaykum assalom. Kutyapman, iltimos tezroq keling.', time: '14:06' },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'client', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-[#defaf4] text-[#00b894] flex items-center justify-center font-bold">
              <User size={22} />
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#102f50]">Sardorbek Yoldoshev</h3>
            <p className="text-[11px] text-emerald-600 font-medium">Onlayn · Santexnik</p>
          </div>
        </div>
        <a href="tel:+998901234567" className="p-2.5 rounded-xl bg-emerald-50 text-[#00b894] hover:bg-emerald-100 transition">
          <Phone size={18} />
        </a>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#f3faff]/40">
        {messages.map((m) => {
          const isMe = m.sender === 'client';
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] sm:max-w-md rounded-2xl p-4 shadow-sm text-xs sm:text-sm ${isMe ? 'bg-[#00b894] text-white rounded-br-none' : 'bg-white text-[#102f50] rounded-bl-none border border-slate-100'}`}>
                <p className="leading-relaxed">{m.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                  <span>{m.time}</span>
                  {isMe && <CheckCheck size={13} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2">
        <button type="button" className="p-2.5 text-slate-400 hover:text-slate-600 transition">
          <Paperclip size={20} />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Xabar yozing..." 
          className="flex-1 bg-[#f3faff] border border-slate-200 rounded-2xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#00b894] focus:bg-white"
        />
        <button type="submit" className="h-11 w-11 rounded-2xl bg-[#00b894] text-white flex items-center justify-center shadow-md shadow-emerald-200 hover:bg-[#009d7c] transition shrink-0">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}