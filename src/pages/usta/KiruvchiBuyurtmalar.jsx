import React, { useState } from 'react';
import { MapPin, Check, X, Clock3, Clock, AlertCircle } from 'lucide-react';
import AktivBuyurtma from './AktivBuyurtma';

export default function KiruvchiBuyurtmalar() {
  const [activeTab, setActiveTab] = useState('kiruvchi');
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: "#HF-2026-001234",
      title: "Konditsioner ta'miri",
      time: "12:45",
      client: "Murodov Jamshid",
      phone: "+998 90 123 45 67",
      address: "Toshkent, Yakkasaroy tumani, Amir Temur ko'chasi 12",
      distance: "0.4 km",
      price: "180 000 so'm",
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      code: "#HF-2026-001235",
      title: "Elektrik ishlari",
      time: "11:32",
      client: "Dilshodbek To'xtashev",
      phone: "+998 93 333 22 11",
      address: "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi",
      distance: "1.4 km",
      price: "130 000 so'm",
      img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300&auto=format&fit=crop"
    }
  ]);

  const [activeOrder, setActiveOrder] = useState(orders[0] || null);

  const handleAccept = (order) => {
    setActiveOrder(order);
    setActiveTab('aktiv');
  };

  const handleReject = (id) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Tab almashtirish paneli (Segmented Control - Mobilda moslashuvchan) */}
      <div className="bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2EBF0] grid grid-cols-2 gap-1">
        <button
          onClick={() => setActiveTab('kiruvchi')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'kiruvchi'
              ? 'bg-[#10B981] text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Clock3 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Kiruvchi</span>
          <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${activeTab === 'kiruvchi' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#10B981]'}`}>
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('aktiv')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'aktiv'
              ? 'bg-[#10B981] text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Aktiv buyurtma</span>
        </button>
      </div>

      {/* 1. KIRUVCHI BUYURTMALAR TABI */}
      {activeTab === 'kiruvchi' && (
        <div className="space-y-3.5">
          <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E2EBF0] shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-gray-900">Yangi takliflar</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Yangi kelib tushgan buyurtmalar</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-[#10B981] text-[11px] font-bold rounded-xl border border-emerald-100">
              {orders.length} ta
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E2EBF0] text-center space-y-2">
              <AlertCircle className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-xs sm:text-sm font-bold text-gray-600">Hozircha kiruvchi buyurtmalar mavjud emas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {orders.map((item) => (
                <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E2EBF0] shadow-xs space-y-3.5">
                  
                  {/* Tepa qism */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block mb-0.5">{item.code}</span>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-[#10B981] shrink-0" /> 
                        <span className="truncate max-w-[200px] sm:max-w-none">{item.address}</span>
                        <span className="text-emerald-600 font-bold shrink-0">({item.distance})</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2EBF0] shrink-0">
                      {item.time}
                    </span>
                  </div>

                  {/* Mijoz va tugmalar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F8FAFC] p-3 sm:p-4 rounded-2xl border border-[#E2EBF0]">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt="Mijoz" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{item.client}</h4>
                        <p className="text-xs text-[#10B981] font-extrabold">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
                      <button 
                        onClick={() => handleAccept(item)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" /> Qabul qilish
                      </button>
                      <button 
                        onClick={() => handleReject(item.id)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 active:scale-95"
                      >
                        <X className="w-3.5 h-3.5" /> Rad etish
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. AKTIV BUYURTMA TABI */}
      {activeTab === 'aktiv' && (
        <AktivBuyurtma order={activeOrder} />
      )}
    </div>
  );
}
