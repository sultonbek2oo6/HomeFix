import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, CircleUserRound, Mail, MapPin, Phone, Save, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MijozProfil() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' });
  }, [user]);

  const update = (event) => { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setSaved(false); };
  const submit = (event) => {
    event.preventDefault();
    setUser({ ...user, ...form, role: user?.role || 'mijoz' });
    setSaved(true);
  };
  const initials = (form.name || 'M').trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');

  return <div className="mx-auto w-full max-w-4xl space-y-6 pb-12">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-[#00a987]">Hisobingiz</p><h1 className="mt-1 text-2xl font-extrabold text-[#102f50]">Mening profilim</h1><p className="mt-1 text-sm text-slate-500">Aloqa va manzil ma’lumotlaringizni boshqaring.</p></div><Link to="/mijoz" className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-white"><ChevronLeft size={17} />Bosh sahifa</Link></div>
    <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
      <section className="rounded-3xl bg-gradient-to-br from-[#102f50] to-[#17604f] p-6 text-white shadow-lg sm:p-8"><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-2xl font-extrabold ring-1 ring-white/20">{initials || <CircleUserRound size={34} />}</div><h2 className="mt-5 text-xl font-bold">{form.name || 'Ism kiritilmagan'}</h2><p className="mt-1 text-sm text-emerald-100">HomeFix mijoz</p><div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-emerald-50"><ShieldCheck size={17} /> Ma’lumotlaringiz profil bilan sinxron saqlanadi</div></section>
      <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8"><div><h2 className="text-lg font-bold text-[#102f50]">Shaxsiy ma’lumotlar</h2><p className="mt-1 text-sm text-slate-500">Buyurtma berishda ma’lumotlaringizdan foydalanamiz.</p></div>
        <Field name="name" label="Ism va familiya" value={form.name} onChange={update} icon={UserRound} placeholder="Ismingiz" required />
        <div className="grid gap-4 sm:grid-cols-2"><Field name="phone" label="Telefon raqam" value={form.phone} onChange={update} icon={Phone} placeholder="+998 90 000 00 00" type="tel" /><Field name="email" label="Elektron pochta" value={form.email} onChange={update} icon={Mail} placeholder="email@example.com" type="email" /></div>
        <Field name="address" label="Asosiy manzil" value={form.address} onChange={update} icon={MapPin} placeholder="Shahar, ko‘cha, uy" />
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><p className={`flex items-center gap-1.5 text-sm ${saved ? 'text-emerald-700' : 'text-slate-400'}`} aria-live="polite">{saved && <><Check size={16} /> O‘zgarishlar saqlandi</>}</p><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00b894] px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-100 transition hover:bg-[#009d7c]"><Save size={17} />Saqlash</button></div>
      </form>
    </div>
  </div>;
}

function Field({ name, label, value, onChange, icon: Icon, ...props }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-slate-600">{label}</span><span className="relative block"><Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input name={name} value={value} onChange={onChange} className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] py-3 pl-10 pr-3 text-sm text-[#102f50] outline-none transition placeholder:text-slate-400 focus:border-[#00b894] focus:bg-white" {...props} /></span></label>;
}
