import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, ClipboardList, Home, Settings, Users, Wrench } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Bosh sahifa', icon: Home, end: true },
  { to: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
  { to: '/admin/orders', label: 'Buyurtmalar', icon: ClipboardList },
  { to: '/admin/services', label: 'Xizmatlar', icon: Wrench },
  { to: '/admin/reports', label: 'Hisobotlar', icon: BarChart3 },
  { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
];

export default function AdminQolipi() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="bg-slate-900 p-5 text-white md:min-h-screen md:w-64">
        <div className="mb-8 flex items-center gap-3 text-xl font-bold"><Wrench className="text-emerald-400" /> HomeFix <span className="text-xs font-medium text-slate-400">ADMIN</span></div>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}><Icon size={18} />{label}</NavLink>)}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-5 md:p-9"><Outlet /></main>
    </div>
  );
}
