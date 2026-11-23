import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Wrench } from 'lucide-react';

const STORAGE_KEY = 'homefix_usta_xizmatlari';
const boshlangichXizmatlar = [
  { id: 'konditsioner', nomi: "Konditsioner ta'miri", narx: "150 000 – 300 000 so'm", faol: true },
  { id: 'elektrik', nomi: 'Elektrik ishlari', narx: "100 000 – 250 000 so'm", faol: true },
  { id: 'santexnika', nomi: 'Santexnika', narx: "80 000 – 200 000 so'm", faol: true },
  { id: 'isitish', nomi: 'Isitish tizimlari', narx: "120 000 – 250 000 so'm", faol: true },
];

function xizmatlarniOqish() {
  try {
    const saqlangan = localStorage.getItem(STORAGE_KEY);
    return saqlangan ? JSON.parse(saqlangan) : boshlangichXizmatlar;
  } catch {
    return boshlangichXizmatlar;
  }
}

export default function Xizmatlar() {
  const [xizmatlar, setXizmatlar] = useState(xizmatlarniOqish);
  const [yangiNomi, setYangiNomi] = useState('');
  const [yangiNarxi, setYangiNarxi] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(xizmatlar));
  }, [xizmatlar]);

  const xizmatHolatiniAlmashtir = (id) => {
    setXizmatlar((oldingi) => oldingi.map((x) => x.id === id ? { ...x, faol: !x.faol } : x));
  };

  const xizmatQosh = (event) => {
    event.preventDefault();
    const nomi = yangiNomi.trim();
    if (!nomi) return;
    setXizmatlar((oldingi) => [...oldingi, {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nomi,
      narx: yangiNarxi.trim() || 'Narx kelishiladi',
      faol: true,
    }]);
    setYangiNomi('');
    setYangiNarxi('');
  };

  const xizmatniOchir = (id) => setXizmatlar((oldingi) => oldingi.filter((x) => x.id !== id));

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Xizmatlarim</h2>
        <p className="mt-1 text-sm text-gray-500">Faol xizmatlaringiz bo‘yicha buyurtma olishni boshqaring.</p>
      </div>

      <section className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-3">
        {xizmatlar.length === 0 && <p className="py-6 text-center text-sm text-gray-500">Hozircha xizmat qo‘shilmagan.</p>}
        {xizmatlar.map((xizmat) => (
          <div key={xizmat.id} className="flex items-center gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2EBF0]">
            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${xizmat.faol ? 'bg-emerald-50 text-[#10B981]' : 'bg-gray-100 text-gray-400'}`}>
              <Wrench className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-bold ${xizmat.faol ? 'text-gray-800' : 'text-gray-400'}`}>{xizmat.nomi}</p>
              <p className="mt-0.5 text-xs text-gray-500">{xizmat.narx}</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-600">
              <span className="hidden sm:inline">{xizmat.faol ? 'Faol' : 'O‘chiq'}</span>
              <input
                type="checkbox"
                checked={xizmat.faol}
                onChange={() => xizmatHolatiniAlmashtir(xizmat.id)}
                aria-label={`${xizmat.nomi} xizmatini ${xizmat.faol ? 'o‘chirish' : 'yoqish'}`}
                className="h-5 w-5 accent-[#10B981]"
              />
            </label>
            <button type="button" onClick={() => xizmatniOchir(xizmat.id)} aria-label={`${xizmat.nomi} xizmatini o‘chirish`} className="p-2 text-gray-400 hover:text-red-500 rounded-lg" title="Ro‘yxatdan o‘chirish">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      <form onSubmit={xizmatQosh} className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900">Yangi xizmat qo‘shish</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-gray-600">
            Xizmat nomi
            <input value={yangiNomi} onChange={(e) => setYangiNomi(e.target.value)} required maxLength={80} placeholder="Masalan, kir yuvish mashinasi ta'miri" className="mt-1.5 w-full rounded-xl border border-[#E2EBF0] px-3 py-2.5 text-sm font-normal text-gray-900 outline-none focus:border-[#10B981]" />
          </label>
          <label className="text-xs font-semibold text-gray-600">
            Narx (ixtiyoriy)
            <input value={yangiNarxi} onChange={(e) => setYangiNarxi(e.target.value)} maxLength={60} placeholder="Masalan, 100 000 so‘mdan" className="mt-1.5 w-full rounded-xl border border-[#E2EBF0] px-3 py-2.5 text-sm font-normal text-gray-900 outline-none focus:border-[#10B981]" />
          </label>
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
          <Plus className="w-4 h-4" /> Xizmat qo‘shish
        </button>
      </form>
    </div>
  );
}
