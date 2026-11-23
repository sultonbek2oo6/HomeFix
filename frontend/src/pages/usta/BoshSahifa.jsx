import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Bell, 
  ChevronRight, 
  Zap, 
  Calendar, 
  Wallet, 
  Clock, 
  MapPin, 
  Check, 
  X,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BoshSahifa() {
  const navigate = useNavigate();
  const [isOnlin, setIsOnlin] = useState(true);
  const [statsPeriod, setStatsPeriod] = useState('7 kun');
  const [activeChartBar, setActiveChartBar] = useState(4); // Default 16-Sen tanlangan
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);

  // Chart Ma'lumotlari (7 kun va 30 kun uchun)
  const chartData7Days = [
    { day: '12 Sen', amount: '850 000', height: 45 },
    { day: '13 Sen', amount: '1 100 000', height: 60 },
    { day: '14 Sen', amount: '600 000', height: 35 },
    { day: '15 Sen', amount: '950 000', height: 50 },
    { day: '16 Sen', amount: '1 250 000', height: 80 },
    { day: '17 Sen', amount: '1 400 000', height: 90 },
    { day: '18 Sen', amount: '700 000', height: 40 },
  ];

  const chartData30Days = [
    { day: '1-Hafta', amount: '3 800 000', height: 55 },
    { day: '2-Hafta', amount: '4 500 000', height: 75 },
    { day: '3-Hafta', amount: '5 200 000', height: 95 },
    { day: '4-Hafta', amount: '4 100 000', height: 65 },
  ];

  const currentChart = statsPeriod === '7 kun' ? chartData7Days : chartData30Days;

  // Buyurtmalar ro'yxati
  const recentOrders = [
    {
      id: 1,
      code: '#HF-2026-001234',
      title: "Konditsioner ta'miri",
      client: "Murodov Jamshid",
      phone: "+998 90 123 45 67",
      address: "Toshkent, Yakkasaroy tumani",
      price: "180 000 so'm",
      time: "12:45",
      badge: "Yangi"
    },
    {
      id: 2,
      code: '#HF-2026-001235',
      title: "Elektrik ishlari",
      client: "Dilshodbek To'xtashev",
      phone: "+998 93 333 22 11",
      address: "Toshkent, Chilonzor tumani",
      price: "120 000 so'm",
      time: "11:32",
      badge: "Yangi"
    },
    {
      id: 3,
      code: '#HF-2026-001236',
      title: "Santexnika servisi",
      client: "Sardor Salimov",
      phone: "+998 97 777 88 99",
      address: "Toshkent, Yunusobod tumani",
      price: "90 000 so'm",
      time: "09:15",
      badge: "Kutilmoqda"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header & Onlayn Toggle */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2EBF0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Assalomu alaykum, Azizbek!
            </h2>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Bugun sizni <span className="font-bold text-[#10B981]">3 ta yangi buyurtma</span> kutmoqda.
          </p>
        </div>

        {/* Onlayn / Offlayn Tugmasi */}
        <div className="flex items-center justify-between sm:justify-end gap-3 bg-[#F8FAFC] p-2 sm:px-4 sm:py-2.5 rounded-2xl border border-[#E2EBF0] w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full transition-all ${isOnlin ? 'bg-[#10B981] animate-pulse ring-4 ring-emerald-100' : 'bg-gray-400'}`} />
            <span className="text-xs sm:text-sm font-bold text-gray-800">
              {isOnlin ? 'Onlayn (Buyurtmalar qabul qilinmoqda)' : 'Offlayn'}
            </span>
          </div>

          <button
            onClick={() => setIsOnlin(!isOnlin)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isOnlin ? 'bg-[#10B981]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                isOnlin ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Mobil Tezkor Harakatlar (Quick Actions) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button 
          onClick={() => navigate('/usta/buyurtmalar')}
          className="p-4 bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-100 rounded-2xl transition flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold shadow-md shadow-[#10B981]/20 group-hover:scale-105 transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Buyurtmalar</span>
            <span className="text-[10px] text-emerald-600 font-semibold">3 ta yangi</span>
          </div>
        </button>

        <button 
          onClick={() => navigate('/usta/moliya')}
          className="p-4 bg-blue-50/60 hover:bg-blue-100/60 border border-blue-100 rounded-2xl transition flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Moliya</span>
            <span className="text-[10px] text-blue-600 font-semibold">Balansni ko'rish</span>
          </div>
        </button>

        <button 
          onClick={() => navigate('/usta/kalendar')}
          className="p-4 bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 rounded-2xl transition flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Kalendar</span>
            <span className="text-[10px] text-purple-600 font-semibold">Ish vaqti</span>
          </div>
        </button>

        <button 
          onClick={() => navigate('/usta/profil')}
          className="p-4 bg-amber-50/60 hover:bg-amber-100/60 border border-amber-100 rounded-2xl transition flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Profil</span>
            <span className="text-[10px] text-amber-600 font-semibold">Verified 4.8★</span>
          </div>
        </button>
      </div>

      {/* 3. Statistik Kartalar (3 ta) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Jami Daromad */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2EBF0] shadow-sm relative overflow-hidden group hover:border-[#10B981]/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jami daromad</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            4 250 000 <span className="text-xs font-semibold text-gray-400">so'm</span>
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[#10B981]">
            <span className="bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">↑ +12%</span>
            <span className="text-gray-400 font-medium">o'tgan haftaga nisbatan</span>
          </div>
        </div>

        {/* Aktiv Buyurtmalar */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2EBF0] shadow-sm relative overflow-hidden group hover:border-blue-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aktiv buyurtmalar</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">3 ta</h3>
          <p className="text-xs text-gray-500 font-medium mt-2">
            <span className="text-blue-600 font-bold">1 jarayonda</span>, 2 ta tayyor
          </p>
        </div>

        {/* Bugungi Qo'ng'iroqlar */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2EBF0] shadow-sm sm:col-span-2 lg:col-span-1 group hover:border-amber-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bugungi qo'ng'iroqlar</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">5 ta</h3>
          <p className="text-xs text-gray-500 font-medium mt-2">
            Mijozlar tomonidan bog'lanildi
          </p>
        </div>

      </div>

      {/* 4. Grafik & Yaqinda kelgan buyurtmalar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Daromad Statistikasi */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">Daromad statistikasi</h3>
              <p className="text-xs text-gray-400 mt-0.5">Kunlik tushumlarni ustunlar ustiga bosib ko'ring</p>
            </div>

            <select 
              value={statsPeriod} 
              onChange={(e) => {
                setStatsPeriod(e.target.value);
                setActiveChartBar(0);
              }}
              className="bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl px-3 py-2 text-xs font-bold text-gray-700 outline-none cursor-pointer focus:border-[#10B981]"
            >
              <option value="7 kun">So'nggi 7 kun</option>
              <option value="30 kun">So'nggi 30 kun</option>
            </select>
          </div>
          
          {/* Chart ustunlari */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-10 px-2 sm:px-6 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2EBF0] relative">
            
            {/* Hovered/Selected Tooltip Indicator */}
            {activeChartBar !== null && currentChart[activeChartBar] && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in zoom-in-95">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>{currentChart[activeChartBar].day}: {currentChart[activeChartBar].amount} so'm</span>
              </div>
            )}

            {currentChart.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveChartBar(idx)}
                className="flex flex-col items-center gap-2 flex-1 h-full justify-end cursor-pointer group"
              >
                <div 
                  className={`w-full rounded-2xl transition-all duration-300 relative ${
                    activeChartBar === idx 
                      ? 'bg-[#10B981] shadow-lg shadow-[#10B981]/30 scale-x-105' 
                      : 'bg-[#10B981]/20 hover:bg-[#10B981]/40'
                  }`}
                  style={{ height: `${item.height}%` }}
                />
                <span className={`text-[10px] sm:text-xs font-bold transition ${
                  activeChartBar === idx ? 'text-[#10B981]' : 'text-gray-400'
                }`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Yaqinda kelgan buyurtmalar Ro'yxati */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-900 text-base">Yaqinda kelganlar</h3>
              <button 
                onClick={() => navigate('/usta/buyurtmalar')} 
                className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-0.5"
              >
                Barchasi <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => setSelectedOrderModal(order)}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0] hover:border-[#10B981] transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#10B981] text-[10px] font-extrabold rounded-md">
                        {order.badge}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">{order.code}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#10B981] transition">
                      {order.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#10B981]" /> {order.address}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-extrabold text-gray-900 block">{order.price}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => navigate('/usta/buyurtmalar')}
            className="w-full py-3 bg-[#F8FAFC] hover:bg-emerald-50 border border-[#E2EBF0] hover:border-emerald-200 text-xs font-bold text-gray-700 hover:text-[#10B981] rounded-2xl transition flex items-center justify-center gap-1.5"
          >
            Barcha buyurtmalarni ko'rish <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Buyurtmani Tezkor Ko'rish Modali */}
      {selectedOrderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E2EBF0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400">{selectedOrderModal.code}</span>
                <h3 className="font-bold text-gray-900 text-base">{selectedOrderModal.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrderModal(null)} 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2EBF0]">
              <div className="flex justify-between">
                <span className="text-gray-400">Mijoz:</span>
                <span className="font-bold text-gray-800">{selectedOrderModal.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Telefon:</span>
                <a href={`tel:${selectedOrderModal.phone}`} className="font-bold text-[#10B981] hover:underline">
                  {selectedOrderModal.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Manzil:</span>
                <span className="font-bold text-gray-800">{selectedOrderModal.address}</span>
              </div>
              <div className="flex justify-between border-t border-[#E2EBF0] pt-2">
                <span className="text-gray-400">Xizmat narxi:</span>
                <span className="font-extrabold text-[#10B981] text-sm">{selectedOrderModal.price}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedOrderModal(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-2xl transition"
              >
                Yopish
              </button>
              <button 
                onClick={() => {
                  alert("Buyurtma qabul qilindi!");
                  setSelectedOrderModal(null);
                  navigate('/usta/buyurtmalar');
                }}
                className="flex-1 py-3 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Qabul qilish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
