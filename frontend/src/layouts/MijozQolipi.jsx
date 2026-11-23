import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  MessageCircle, 
  Wrench, 
  User,
  UserRound,
  Menu,
  X,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BildirishnomalarPopup from '../pages/mijoz/Bildirishnomalar'; // Shaffof bildirishnoma popup komponenti

const links = [
  { to: '/mijoz', label: 'Bosh sahifa', icon: Home, end: true },
  { to: '/mijoz/buyurtmalar', label: 'Buyurtmalarim', icon: ClipboardList },
  { to: '/mijoz/aidiagnostika', label: 'AI Diagnostika', icon: Sparkles },
  { to: '/mijoz/kafolatdavosi', label: 'Kafolat da’vosi', icon: ShieldAlert },
  { to: '/mijoz/chat', label: 'Xabarlar', icon: MessageCircle },
  { to: '/mijoz/profil', label: 'Profilim', icon: UserRound },
];

export default function MijozQolipi() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showAiHelper = pathname.replace(/\/$/, '') !== '/mijoz/aidiagnostika';

  return (
    <div className="min-h-screen bg-[#f3faff] flex text-[#102f50]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#102f50] p-6 text-white fixed inset-y-0 left-0 z-30 flex-col justify-between shadow-xl">
        <div>
          <Link to="/mijoz" className="mb-8 flex items-center gap-3 text-xl font-bold text-white group">
            <div className="w-10 h-10 bg-[#00b894] rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-lg tracking-tight">HomeFix</span>
              <span className="block text-[10px] text-emerald-200 font-normal">Mijoz paneli</span>
            </div>
          </Link>

          <nav className="space-y-1.5">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#00b894] text-white shadow-md shadow-emerald-900/20 font-bold'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#00b894] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold truncate text-white">{user?.name || 'Islombek'}</h4>
            <p className="text-xs text-slate-400">Mijoz</p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#102f50]/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-3 right-3 top-[4.5rem] mx-auto flex max-h-[calc(100dvh-6rem)] max-w-md flex-col overflow-y-auto rounded-3xl border border-slate-100 bg-white p-4 text-[#102f50] shadow-2xl sm:left-auto sm:right-6 sm:p-5" onClick={e => e.stopPropagation()}>
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xl font-bold text-[#102f50]">
                  <div className="w-9 h-9 bg-[#00b894] rounded-xl flex items-center justify-center text-white">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div><span className="block text-base">HomeFix</span><span className="block text-[10px] font-medium text-slate-400">Mijoz menyusi</span></div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Menyuni yopish" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1.5">
                {links.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive ? 'bg-emerald-50 text-[#008c70] font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-[#102f50]'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00b894] flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#102f50]">{user?.name || 'Islombek'}</h4>
                <p className="text-[10px] text-slate-400">Mijoz</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 pb-20 lg:pb-0">
        
        {/* Header (Mobil va Desktop uchun umumiy tepa qism) */}
        <header className="h-16 bg-white/90 border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label="Menyuni ochish"
              aria-expanded={mobileMenuOpen}
              className="rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <span className="text-xs sm:text-sm font-bold text-[#102f50]">Mijoz boshqaruv paneli</span>
          </div>

          {/* Shaffof Popup Bildirishnoma qo'ng'iroqchasi */}
          <div className="flex items-center gap-3">
            <BildirishnomalarPopup />
          </div>
        </header>

        {/* Content Outlet */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 border-t border-slate-200 px-4 py-2 shadow-lg backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <NavLink to="/mijoz" end className={({isActive}) => `flex flex-col items-center transition ${isActive ? 'text-[#00b894]' : 'text-slate-400'}`}>
            <Home size={18} />
            <span className="text-[10px] font-bold mt-0.5">Asosiy</span>
          </NavLink>
          <NavLink to="/mijoz/buyurtmalar" className={({isActive}) => `flex flex-col items-center transition ${isActive ? 'text-[#00b894]' : 'text-slate-400'}`}>
            <ClipboardList size={18} />
            <span className="text-[10px] font-medium mt-0.5">Buyurtmalar</span>
          </NavLink>
          <NavLink to="/mijoz/aidiagnostika" className={({isActive}) => `flex flex-col items-center transition ${isActive ? 'text-[#00b894]' : 'text-slate-400'}`}>
            <Sparkles size={18} />
            <span className="text-[10px] font-medium mt-0.5">AI</span>
          </NavLink>
          <NavLink to="/mijoz/chat" className={({isActive}) => `flex flex-col items-center transition ${isActive ? 'text-[#00b894]' : 'text-slate-400'}`}>
            <MessageCircle size={18} />
            <span className="text-[10px] font-medium mt-0.5">Chat</span>
          </NavLink>
          <NavLink to="/mijoz/profil" className={({isActive}) => `flex flex-col items-center transition ${isActive ? 'text-[#00b894]' : 'text-slate-400'}`}>
            <UserRound size={18} />
            <span className="text-[10px] font-medium mt-0.5">Profil</span>
          </NavLink>
        </div>
      </div>

      {showAiHelper && !mobileMenuOpen && <>
        <style>{`
          @keyframes aiFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes aiSpin { to { transform: rotate(360deg); } }
        `}</style>
        <Link
          to="/mijoz/aidiagnostika"
          aria-label="AI chatga o‘tish"
          className="group fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6"
          style={{ animation: 'aiFloat 3s ease-in-out infinite' }}
        >
          <span className="absolute inset-0 rounded-full bg-[#00b894] opacity-40 animate-ping" />
          <span className="absolute -inset-2 rounded-full bg-[#00b894]/20 animate-pulse" />
          <span className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#00b894,#7c3aed,#3b82f6,#00b894)] opacity-80 blur-[2px]" style={{ animation: 'aiSpin 4s linear infinite' }} />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00b894] via-[#16456c] to-[#102f50] text-white shadow-lg shadow-emerald-500/40 ring-4 ring-white transition duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:scale-95">
            <Sparkles size={24} className="animate-pulse" />
          </span>
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-xl bg-[#102f50] px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            AI yordamchi ✨
          </span>
        </Link>
      </>}
    </div>
  );
}
