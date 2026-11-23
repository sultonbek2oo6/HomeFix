import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock, Plus, Trash2, Check } from 'lucide-react';

export default function Kalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sentabr 2026
  const [selectedDate, setSelectedDate] = useState(16);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tanlangan sana uchun mavjudlik sozlamalari state-i
  const [schedules, setSchedules] = useState([
    { id: 1, from: '08:00', to: '12:00', type: 'Ish vaqti' },
    { id: 2, from: '13:00', to: '18:00', type: 'Ish vaqti' },
  ]);
  const [isDayOff, setIsDayOff] = useState(false);

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 
    'Iyul', 'Avgust', 'Sentabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Oy kunlarini hisoblash
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Dushanbadan boshlash
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push({ day: '', currentMonth: false });
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, currentMonth: true });
  }

  const handleAddSchedule = () => {
    setSchedules([...schedules, { id: Date.now(), from: '18:00', to: '21:00', type: 'Ish vaqti' }]);
  };

  const handleRemoveSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        {/* Tepa Sarlavha */}
        <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
          <h2 className="text-xl font-bold text-gray-900">Kalendar va mavjudlik</h2>
          <span className="text-xs font-semibold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-xl">
            Sana: {selectedDate} {months[month]} {year}
          </span>
        </div>

        {/* Oy navigatori */}
        <div className="flex items-center justify-between px-2">
          <button 
            onClick={prevMonth}
            className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2EBF0] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 text-base">
            {months[month]} {year}
          </h3>
          <button 
            onClick={nextMonth}
            className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2EBF0] flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hafta kunlari */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400">
          {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((wd) => (
            <div key={wd}>{wd}</div>
          ))}
        </div>

        {/* Kalendar Kataklari */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {days.map((item, index) => {
            if (!item.currentMonth) {
              return <div key={index} className="py-2.5"></div>;
            }
            const isSelected = item.day === selectedDate;
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(item.day)}
                className={`py-2.5 rounded-2xl font-medium transition flex items-center justify-center ${
                  isSelected 
                    ? 'bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/30 scale-105' 
                    : 'text-gray-700 hover:bg-[#F8FAFC]'
                }`}
              >
                {item.day}
              </button>
            );
          })}
        </div>

        {/* Mavjudlik Ko'rsatkichlari */}
        <div className="pt-6 border-t border-[#E2EBF0] space-y-3">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            {selectedDate}-{months[month]} uchun mavjudlik
          </h4>
          
          {isDayOff ? (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Dam olish kuni qilib belgilangan
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {schedules.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                    <span className="text-gray-800 font-bold">{s.from} - {s.to}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-emerald-50 text-[#10B981] px-2 py-0.5 rounded-md font-semibold">
                    {s.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modalni ochish tugmasi */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl shadow-lg shadow-[#10B981]/30 transition text-sm active:scale-[0.99]"
        >
          Mavjudlikni o'zgartirish
        </button>

      </div>

      {/* TAHRIRLASH MODAL OYNASI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
              <h3 className="font-bold text-gray-900 text-lg">
                Mavjudlikni tahrirlash ({selectedDate} {months[month]})
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dam olish kuni checkbox */}
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0] cursor-pointer">
              <input 
                type="checkbox" 
                checked={isDayOff}
                onChange={(e) => setIsDayOff(e.target.checked)}
                className="w-5 h-5 accent-[#10B981] rounded cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-800">Ushbu kunni dam olish kuni deb belgilash</span>
            </label>

            {/* Ish vaqtlarini sozlash */}
            {!isDayOff && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Ish vaqti oralig'i</span>
                  <button 
                    onClick={handleAddSchedule}
                    className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Vaqt qo'shish
                  </button>
                </div>

                {schedules.map((s, idx) => (
                  <div key={s.id} className="flex items-center gap-2 bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2EBF0]">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    <input 
                      type="time" 
                      defaultValue={s.from} 
                      className="bg-white border border-[#E2EBF0] rounded-xl px-2 py-1 text-xs font-bold text-gray-800 outline-none"
                    />
                    <span className="text-xs text-gray-400">-</span>
                    <input 
                      type="time" 
                      defaultValue={s.to} 
                      className="bg-white border border-[#E2EBF0] rounded-xl px-2 py-1 text-xs font-bold text-gray-800 outline-none"
                    />
                    <button 
                      onClick={() => handleRemoveSchedule(s.id)}
                      className="ml-auto text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Saqlash tugmasi */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm"
            >
              <Check className="w-4 h-4" /> O'zgarishlarni saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
