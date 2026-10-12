import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

export default function KafolatDavosi() {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    alert("Izoh yuborildi!");
    setComment('');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E2EBF0] shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
        <button className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-bold text-slate-900 text-sm">Kafolat da'vosi</h3>
          <span className="text-[10px] text-slate-400 font-semibold">#HF-2026-001234</span>
        </div>
        <span className="w-5"></span>
      </div>

      {/* Details Grid */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Muxlat:</span>
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> 00:36
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Mijoz:</span>
          <span className="font-bold text-slate-800">Murodov Jamshid</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Xizmat:</span>
          <span className="font-bold text-slate-800">Konditsioner ta'miri</span>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-slate-400 font-medium">Muammo:</span>
          <span className="font-bold text-slate-800 text-right max-w-[200px]">3 kun ichida qaytadan nosozlik</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-400 font-medium">Holat:</span>
          <span className="px-3 py-1 bg-amber-50 text-amber-600 font-bold rounded-full text-[10px] border border-amber-200">
            Ko'rib chiqilmoqda
          </span>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Izoh qo'shing..."
          className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl p-3 text-xs outline-none focus:border-[#10B981] resize-none"
        />

        <button
          type="submit"
          className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold text-xs rounded-2xl transition shadow-md shadow-[#10B981]/20"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}
