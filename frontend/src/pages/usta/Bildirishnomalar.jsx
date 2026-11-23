import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CreditCard, 
  MessageCircle, 
  AlertTriangle, 
  Info, 
  Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Bildirishnomalar() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'buyurtma',
      title: 'Yangi buyurtma',
      desc: 'Konditsioner ta’miri – 180 000 so’m',
      time: '12:45',
      isNew: true,
      link: '/usta/buyurtmalar',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      id: 2,
      type: 'tolov',
      title: 'To’lov tasdiqlandi',
      desc: '+130 000 so’m hisobingizga kelib tushdi',
      time: '10:32',
      isNew: false,
      link: '/usta/moliya',
      icon: CreditCard,
      color: 'bg-emerald-50 text-[#10B981]'
    },
    {
      id: 3,
      type: 'chat',
      title: 'Mijozdan xabar',
      desc: 'Jamshid Murodov siz bilan bog’landi',
      time: '09:20',
      isNew: false,
      link: '/usta/buyurtmalar',
      icon: MessageCircle,
      color: 'bg-amber-50 text-amber-500'
    },
    {
      id: 4,
      type: 'kafolat',
      title: 'Kafolat da’vosi',
      desc: 'Mijoz yangi da’vo yubordi',
      time: '08:15',
      isNew: false,
      link: '/usta/kafolat',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-500'
    },
    {
      id: 5,
      type: 'tizim',
      title: 'Tizim yangilanishi',
      desc: 'Yangi funksiya va qulayliklar qo’shildi',
      time: 'kecha',
      isNew: false,
      link: '/usta',
      icon: Info,
      color: 'bg-purple-50 text-purple-500'
    }
  ]);

  const handleNotificationClick = (notif) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isNew: false } : n));
    navigate(notif.link);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        {/* Tepa header */}
        <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-4">
          <h2 className="text-xl font-bold text-gray-900">Bildirishnomalar</h2>
          {notifications.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Tozalash
            </button>
          )}
        </div>

        {/* Bildirishnomalar ro'yxati */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs font-semibold">
              Hozircha bildirishnomalar mavjud emas.
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div 
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    n.isNew 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : 'bg-[#F8FAFC] border-[#E2EBF0] hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{n.title}</h4>
                        {n.isNew && (
                          <span className="px-2 py-0.5 bg-[#10B981] text-white text-[9px] font-extrabold rounded-md">
                            Yangi
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 font-medium shrink-0">{n.time}</span>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
