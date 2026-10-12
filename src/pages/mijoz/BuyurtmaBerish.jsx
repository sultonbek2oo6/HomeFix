import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, PlugZap, Fan, Hammer, Sofa, MapPin, ArrowRight, Flame, Wrench, LocateFixed, LoaderCircle } from 'lucide-react';

const categories = [
  { id: 'cleaning', title: 'Cleaning', icon: Sparkles },
  { id: 'santexnika', title: 'Santexnika', icon: Droplets },
  { id: 'elektrik', title: 'Elektrik', icon: PlugZap },
  { id: 'konditsioner', title: 'Konditsioner', icon: Fan },
  { id: 'texnika', title: 'Maishiy texnika', icon: Hammer },
  { id: 'mebel', title: 'Mebel yig‘ish', icon: Sofa },
  { id: 'isitish', title: 'Isitish tizimi', icon: Flame },
  { id: 'boshqa', title: 'Boshqa xizmat', icon: Wrench },
];

export default function BuyurtmaBerish() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || location.state?.selectedMaster?.category || 'santexnika');
  const [selectedMaster, setSelectedMaster] = useState(location.state?.selectedMaster || null);
  const [locating, setLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [formData, setFormData] = useState({
    description: location.state?.description || '',
    address: 'Toshkent sh., Amir Temur ko‘ch., 15-uy',
    phone: '+998 90 123-45-67',
    coordinates: null,
  });

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Bu brauzer lokatsiyani aniqlashni qo‘llab-quvvatlamaydi.');
      return;
    }
    setLocating(true);
    setLocationMessage('Lokatsiya aniqlanmoqda…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = { latitude: Number(coords.latitude.toFixed(6)), longitude: Number(coords.longitude.toFixed(6)) };
        setFormData((current) => ({ ...current, coordinates }));
        setLocationMessage(`Lokatsiya aniqlandi: ${coordinates.latitude}, ${coordinates.longitude}. Ko‘cha manzilini ham kiriting.`);
        setLocating(false);
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Lokatsiyaga ruxsat berilmadi. Brauzer sozlamalaridan ruxsat bering yoki manzilni qo‘lda kiriting.'
          : 'Lokatsiyani aniqlab bo‘lmadi. Manzilni qo‘lda kiriting.';
        setLocationMessage(message);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { category: selectedCategory, ...formData };
    if (selectedMaster) {
      navigate('/mijoz/buyurtmatasdiqlash', { state: { ...order, master: selectedMaster } });
      return;
    }
    navigate('/mijoz/ustalarroyxati', {
      state: { order },
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#102f50]">Yangi buyurtma berish</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Muammoni yozib qoldiring va malakali mutaxassisni chaqiring.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Kategoriya tanlash */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">1. Xizmat turini tanlang</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedMaster(null); }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left ${
                    isSelected 
                      ? 'border-[#00b894] bg-[#defaf4]/50 text-[#102f50] shadow-sm' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${isSelected ? 'bg-[#00b894] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <b className="block text-xs font-bold">{cat.title}</b>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Muammo tavsifi */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Muammoni qisqacha yozing</h3>
          <textarea 
            rows="3" 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Masalan: Vannaxona krani oqmoqda, almashtirish kerak..." 
            className="w-full rounded-2xl border border-slate-200 bg-[#f3faff] p-4 text-xs sm:text-sm outline-none transition focus:border-[#00b894] focus:bg-white"
          ></textarea>
        </div>

        {/* 3. Manzil va Telefon */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Manzil va aloqa</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2"><label htmlFor="order-address" className="block text-[11px] font-bold text-slate-500">Manzil</label><button type="button" onClick={detectLocation} disabled={locating} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-[#008c70] transition hover:bg-emerald-100 disabled:opacity-60">{locating ? <LoaderCircle size={13} className="animate-spin" /> : <LocateFixed size={13} />}{locating ? 'Aniqlanmoqda' : 'Lokatsiyamni aniqlash'}</button></div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400"><MapPin size={16} /></span>
                <input 
                  id="order-address"
                  type="text" 
                  required
                  value={formData.address}
                  onChange={(e) => { setFormData({...formData, address: e.target.value, coordinates: null}); if (formData.coordinates) setLocationMessage('Manzil o‘zgartirildi. GPS lokatsiyasini yangidan aniqlashingiz mumkin.'); }}
                  className="w-full rounded-xl border border-slate-200 bg-[#f3faff] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00b894] focus:bg-white" 
                />
              </div>
              {locationMessage && <p aria-live="polite" className={`mt-1.5 text-[10px] leading-4 ${formData.coordinates ? 'text-emerald-700' : locationMessage.includes('aniqlanmoqda') ? 'text-slate-500' : 'text-amber-700'}`}>{locationMessage}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Telefon raqami</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full rounded-xl border border-slate-200 bg-[#f3faff] py-2.5 px-3 text-xs outline-none focus:border-[#00b894] focus:bg-white" 
              />
            </div>
          </div>
        </div>

        {/* Tasdiqlash tugmasi */}
        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#00b894] py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-[#009d7c] active:scale-95"
        >
          {selectedMaster ? `${selectedMaster.name}ni tanlab davom etish` : 'Ustalarni ko‘rish va tanlash'} <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
