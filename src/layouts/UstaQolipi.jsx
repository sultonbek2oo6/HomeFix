import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Wallet, 
  Calendar, 
  Wrench, 
  User, 
  MessageSquare, 
  ShieldCheck, 
  Settings, 
  Image as ImageIcon,
  Menu, 
  X, 
  Search, 
  Bell, 
  LogOut,
  FileText,
  ShoppingBag as ShoppingBagIcon,
  CreditCard,
  MessageCircle,
  AlertTriangle,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UstaQolipi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notifRef = useRef(null);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Zamonaviy Sidebar menyulari (Bildirishnoma sahifasi olib tashlandi, chunki u endi dropdown)
  const menuItems = [
    { name: 'Bosh sahifa', path: '/usta', icon: Home },
    { name: 'Buyurtmalar', path: '/usta/buyurtmalar', icon: ShoppingBag },
    { name: 'Moliya', path: '/usta/moliya', icon: Wallet },
    { name: 'Kalendar', path: '/usta/kalendar', icon: Calendar },
    { name: 'Xizmatlar', path: '/usta/xizmatlar', icon: Wrench },
    { name: 'Portfel', path: '/usta/portfel', icon: ImageIcon },
    { name: 'Profil', path: '/usta/profil', icon: User },
    { name: 'Fikrlar', path: '/usta/fikrlar', icon: MessageSquare },
    { name: 'Kafolat da\'vosi', path: '/usta/kafolat', icon: FileText },
    { name: 'Xavfsizlik & SOS', path: '/usta/xavfsizlik', icon: ShieldCheck },
    { name: 'Sozlamalar', path: '/usta/sozlamalar', icon: Settings },
  ];

  // Zamonaviy Bildirishnomalar ro'yxati
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Yangi buyurtma',
      desc: 'Konditsioner ta’miri – 180 000 so’m',
      time: '12:45',
      isNew: true,
      link: '/usta/buyurtmalar',
      icon: ShoppingBagIcon,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      id: 2,
      title: 'To’lov tasdiqlandi',
      desc: '+130 000 so’m hisobingizga tushdi',
      time: '10:32',
      isNew: true,
      link: '/usta/moliya',
      icon: CreditCard,
      color: 'bg-emerald-50 text-[#10B981]'
    },
    {
      id: 3,
      title: 'Mijozdan xabar',
      desc: 'Jamshid Murodov chatda yozdi',
      time: '09:20',
      isNew: false,
      link: '/usta/buyurtmalar',
      icon: MessageCircle,
      color: 'bg-amber-50 text-amber-500'
    }
  ]);

  // Tashqariga bosilganda bildirishnoma oynasini yopish
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotifClick = (notif) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isNew: false } : n));
    setIsNotificationsOpen(false);
    navigate(notif.link);
  };

  const unreadCount = notifications.filter(n => n.isNew).length;
  const searchableOrders = [
    { code: '#HF-2026-001234', title: "Konditsioner ta'miri", client: 'Murodov Jamshid', address: 'Toshkent, Yakkasaroy tumani', price: '180 000 so‘m' },
    { code: '#HF-2026-001235', title: 'Elektrik ishlari', client: "Dilshodbek To‘xtashev", address: 'Toshkent, Chilonzor tumani', price: '130 000 so‘m' },
    { code: '#HF-2026-001236', title: 'Santexnika servisi', client: 'Sardor Salimov', address: 'Toshkent, Yunusobod tumani', price: '90 000 so‘m' },
  ];
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('uz');
  const searchResults = normalizedQuery
    ? searchableOrders.filter(order => `${order.code} ${order.title} ${order.client} ${order.address} ${order.price}`.toLocaleLowerCase('uz').includes(normalizedQuery))
    : [];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('homefix_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row relative">
      
      {/* 1. MOBIL HEADER */}
      <div className="md:hidden bg-[#0F172A] text-white p-4 flex items-center justify-between sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center text-white font-bold shadow-md">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-white">HomeFix</span>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800 text-gray-300 hover:text-white transition active:scale-95"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 2. SIDEBAR */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-50 md:z-30
        w-64 bg-[#0F172A] text-white flex flex-col justify-between p-5 h-screen
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          <div className="hidden md:flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-[#10B981]/30">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-white tracking-wide">HomeFix</h1>
                <p className="text-[10px] text-emerald-400 font-semibold">Usta paneli</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/usta'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition
                    ${isActive 
                      ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30 font-bold' 
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-3 mt-auto">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center font-bold text-xs shrink-0">
              AK
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Azizbek Karimov'}</h4>
              <p className="text-[10px] text-emerald-400 font-medium">Usta</p>
            </div>
            <button 
              onClick={handleLogout} 
              title="Tizimdan chiqish"
              className="text-gray-400 hover:text-red-400 transition p-1.5 rounded-lg hover:bg-slate-800 shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 3. MOBIL OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* 4. ASOSIY KONTENT */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        
        {/* Topbar */}
        <header className="bg-white border-b border-[#E2EBF0] p-4 sm:p-6 sticky top-0 z-30 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buyurtma, mijoz yoki xizmat qidirish..." 
              aria-label="Buyurtma, mijoz yoki xizmat qidirish"
              className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl pl-10 pr-4 py-2 text-xs outline-none focus:border-[#10B981] transition"
            />
          </div>

          <div className="flex items-center gap-3 relative" ref={notifRef}>
            {/* ZAMONAVIY BİDRISHNOMA DROPDOWN TUGMASI */}
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0] text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-2 right-2 ring-2 ring-white animate-pulse"></span>
              )}
            </button>

            {/* ZAMONAVIY DROPDOWN PANEL */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#E2EBF0] p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-[#E2EBF0] pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-sm">Bildirishnomalar</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#10B981] text-[10px] font-extrabold rounded-md">
                        {unreadCount} ta yangi
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, isNew: false })))}
                    className="text-[11px] font-semibold text-[#10B981] hover:underline"
                  >
                    Barchasini o'qish
                  </button>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-gray-400 text-xs font-semibold">
                      Bildirishnomalar yo'q
                    </div>
                  ) : (
                    notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div 
                          key={n.id}
                          onClick={() => handleNotifClick(n)}
                          className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                            n.isNew 
                              ? 'bg-emerald-50/50 border-emerald-200' 
                              : 'bg-[#F8FAFC] border-[#E2EBF0] hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${n.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-gray-900">{n.title}</h4>
                              <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-600 mt-0.5">{n.desc}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Asosiy sahifalar */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {normalizedQuery ? (
            <section className="mx-auto max-w-4xl space-y-3" aria-live="polite">
              <h2 className="text-sm font-extrabold text-slate-800">Qidiruv natijalari ({searchResults.length})</h2>
              {searchResults.length ? searchResults.map(order => (
                <button key={order.code} type="button" onClick={() => { setSearchQuery(''); navigate('/usta/buyurtmalar'); }} className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#E2EBF0] bg-white p-4 text-left shadow-sm transition hover:border-[#10B981]">
                  <span className="min-w-0"><span className="block text-[10px] font-bold text-slate-400">{order.code} · {order.client}</span><span className="mt-1 block truncate text-sm font-bold text-slate-900">{order.title}</span><span className="mt-1 block truncate text-xs text-slate-500">{order.address}</span></span>
                  <span className="shrink-0 text-xs font-extrabold text-[#10B981]">{order.price}</span>
                </button>
              )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">“{searchQuery.trim()}” bo‘yicha buyurtma topilmadi.</p>}
            </section>
          ) : <Outlet />}
        </main>
      </div>

    </div>
  );
}
