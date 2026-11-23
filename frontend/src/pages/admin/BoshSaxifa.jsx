import { Activity, ClipboardList, Users, Wallet } from 'lucide-react';

const stats = [
  { title: 'Jami foydalanuvchilar', value: '1,284', note: '+12% bu oy', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { title: 'Faol buyurtmalar', value: '86', note: '24 tasi yangi', icon: ClipboardList, color: 'bg-emerald-50 text-emerald-600' },
  { title: 'Oylik tushum', value: '48,6 mln so‘m', note: '+8,4% o‘tgan oyga', icon: Wallet, color: 'bg-violet-50 text-violet-600' },
];

export default function AdminBoshSahifa() {
  return <div className="mx-auto max-w-7xl">
    <div className="mb-8"><p className="text-sm font-medium text-emerald-600">Boshqaruv paneli</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Xush kelibsiz, administrator</h1><p className="mt-2 text-slate-500">HomeFix platformasining bugungi holati.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map(({ title, value, note, icon: Icon, color }) => <section key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{title}</span><span className={`rounded-xl p-2.5 ${color}`}><Icon size={20} /></span></div><p className="mt-5 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-sm text-emerald-600">{note}</p></section>)}</div>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><span className="rounded-xl bg-amber-50 p-2.5 text-amber-600"><Activity size={20} /></span><div><h2 className="font-semibold text-slate-900">Tizim faoliyati</h2><p className="text-sm text-slate-500">Platforma xizmatlari normal ishlayapti</p></div><span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-500" /></div><div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 text-sm sm:grid-cols-3"><div><p className="text-slate-500">Kutilayotgan tekshiruvlar</p><p className="mt-1 font-semibold text-slate-900">12 ta usta</p></div><div><p className="text-slate-500">Yechilmagan murojaatlar</p><p className="mt-1 font-semibold text-slate-900">5 ta</p></div><div><p className="text-slate-500">Bugungi buyurtmalar</p><p className="mt-1 font-semibold text-slate-900">34 ta</p></div></div></section>
  </div>;
}
