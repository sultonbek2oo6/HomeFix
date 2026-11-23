import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingBag, 
  CreditCard, 
  MessageCircle, 
  AlertTriangle, 
  Info, 
  Trash2, 
  X,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Bildirishnomalar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Usta yo‘lga chiqdi',
      desc: 'Sardorbek Y. manzilingizga harakatlanmoqda (15 daqiqa)',
      time: '14:05',
      isNew: true,
      link: '/mijoz/buyurtmakuzatuvi',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      id: 2,
      title: 'Keshbek qo’shildi',
      desc: '+14 500 so’m keshbek hisobingizga tushdi',
      time: '12:30',
      isNew: true,
      link: '/mijoz',
      icon: CreditCard,
      color: 'bg-emerald-50 text-[#00b894]'
    },
    {
      id: 3,
      title: 'Usta xabar yubordi',
      desc: 'Sardorbek Yoldoshev: "Yetib keldim"',
      time: '11:20',
      isNew: false,
      link: '/mijoz/chat',
      icon: MessageCircle,
      color: 'bg-amber-50 text-amber-500'
    },
    {
      id: 4,
      title: 'Kafolat faollashdi',
      desc: 'Santexnika ishlari uchun 1 yillik kafolat berildi',
      time: 'Kecha',
      isNew: false,
      link: '/mijoz/buyurtmalar',
      icon: AlertTriangle,
      color: 'bg-teal-50 text-teal-600'
    }
  ]);

  const unreadCount = notifications.filter(n => n.isNew).length;

  const handleNotificationClick = (notif) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isNew: false } : n));
    setIsOpen(false);
    navigate(notif.link);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Bildirishnoma qo'ng'iroqcha tugmasi (Header yoki Sidebar'ga qo'yish uchun) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 hover:text-[#00b894] transition hover:border-emerald-200"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Shaffof va zamonaviy Popup Oyna (Dropdown) */}
      {isOpen && (
        <>
          {/* Orqa fonni bosganda yopilishi uchun shaffof qatlam */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#102f50]">Bildirishnomalar</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#00b894] text-[10px] font-bold">
                    {unreadCount} ta yangi
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button 
                    onClick={handleClearAll}
                    className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 transition"
                  >
                    Tozalash
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-200/50 transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Ro'yxat qismi */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-2">
              {notifications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs font-semibold">
                  Hozircha bildirishnomalar yo'q.
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div 
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                        n.isNew 
                          ? 'bg-emerald-50/60 border-emerald-200/80 shadow-sm' 
                          : 'bg-white border-slate-100 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-[#102f50] truncate">{n.title}</h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{n.desc}</p>
                      </div>
                      {n.isNew && <span className="w-2 h-2 rounded-full bg-[#00b894] shrink-0 mt-1.5"></span>}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
              <button 
                onClick={() => { setIsOpen(false); navigate('/mijoz/buyurtmalar'); }}
                className="text-xs font-bold text-[#00b894] hover:underline"
              >
                Barcha buyurtmalarni ko'rish →
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}