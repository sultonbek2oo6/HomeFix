import React, { useState } from 'react';
import { Send, Paperclip, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function ChatMijoz() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      text: 'Salom, konditsioner ishlamayapti. Bugun kelib ko\'rishingiz mumkinmi?',
      time: '11:30',
      type: 'text'
    },
    {
      id: 2,
      sender: 'usta',
      text: 'Ha, albatta. 14:00 da boraman. Muammoni aniqlab, narxini aytaman.',
      time: '11:32',
      type: 'text'
    },
    {
      id: 3,
      sender: 'usta',
      imgUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop',
      time: '11:33',
      type: 'image'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'usta',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E2EBF0] shadow-sm flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#E2EBF0] flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
              alt="Murodov Jamshid"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="w-3 h-3 bg-[#10B981] border-2 border-white rounded-full absolute bottom-0 right-0"></span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Murodov Jamshid</h3>
            <span className="text-[11px] text-[#10B981] font-semibold">Online</span>
          </div>
        </div>
      </div>

      {/* Messages body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
        {messages.map((msg) => {
          const isUsta = msg.sender === 'usta';
          return (
            <div key={msg.id} className={`flex flex-col ${isUsta ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm shadow-xs ${
                  isUsta
                    ? 'bg-emerald-50 border border-emerald-200/60 text-slate-800 rounded-br-none'
                    : 'bg-white border border-[#E2EBF0] text-slate-800 rounded-bl-none'
                }`}
              >
                {msg.type === 'text' && <p>{msg.text}</p>}
                {msg.type === 'image' && (
                  <div className="space-y-1.5">
                    <img src={msg.imgUrl} alt="Konditsioner" className="rounded-xl max-h-48 w-full object-cover" />
                    <span className="text-[10px] text-slate-400 block font-medium">Rasm qo'shildi</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E2EBF0] flex items-center gap-2">
        <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition rounded-xl">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Xabar yozing..."
          className="flex-1 bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#10B981]"
        />
        <button
          type="submit"
          className="p-2.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white rounded-2xl transition shadow-md shadow-[#10B981]/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
