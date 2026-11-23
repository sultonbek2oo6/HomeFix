import React, { useState } from 'react';
import { ArrowRight, Bell, Check, CheckCircle2, CircleHelp, Droplets, Fan, Hammer, Heart, House, LockKeyhole, Menu, X, PlugZap, Search, ShieldCheck, Sofa, Sparkles, Star, Wrench, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Cleaning', subtitle: 'Tozalash', icon: Sparkles },
  { title: 'Santexnika', subtitle: 'Suv va quvur', icon: Droplets },
  { title: 'Elektrik', subtitle: 'Elektr ishlari', icon: PlugZap },
  { title: 'Konditsioner', subtitle: 'Iqlim tizimi', icon: Fan },
  { title: 'Maishiy texnika', subtitle: 'Ta’mirlash', icon: Hammer },
  { title: 'Mebel', subtitle: 'Yig‘ish va o‘rnatish', icon: Sofa },
];

const artisans = [
  { name: 'Azizbek Karimov', job: 'Konditsioner ustasi', score: '4.8', reviews: '124', price: '150 000 so‘m', image: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Sardorbek Yo‘ldoshev', job: 'Santexnik', score: '4.9', reviews: '98', price: '120 000 so‘m', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Javohir Ismoilov', job: 'Elektrik', score: '5.0', reviews: '76', price: '100 000 so‘m', image: 'photo-1506794778202-cad84cf45f1d' },
];

const steps = [
  { num: '01', title: 'Buyurtma qoldirish', desc: 'Kerakli xizmatni tanlang va muammoni yozing.' },
  { num: '02', title: 'Ustani tanlash', desc: 'Eng yaqin va reytingi baland mutaxassisni tanlang.' },
  { num: '03', title: 'Kafolatli bajarish', desc: 'Usta ishni sifatli bajaradi va kafolat beradi.' },
];

const testimonials = [
  { name: 'Malika Umarova', text: 'Santexnika muammosi chiqgandi, 30 daqiqada kelib tuzatib berishdi. Rahmat!', role: 'Toshkent sh.' },
  { name: 'Jasur Bekmurodov', text: 'Konditsionerni tozalattirdim. Narxlari adolatli, ustalar o‘z ishining professionali.', role: 'Samarqand sh.' },
];

function Brand({ light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2 transition-transform duration-300 hover:scale-105 ${light ? 'text-white' : 'text-[#102f50]'}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00b894] text-white shadow-md shadow-emerald-200">
        <House size={20} strokeWidth={2.8} />
      </span>
      <span>
        <span className="block text-[18px] font-extrabold leading-none tracking-tight">HomeFix</span>
        <span className={`mt-0.5 block text-[9px] font-medium ${light ? 'text-emerald-50' : 'text-slate-500'}`}>Uy xizmatlari</span>
      </span>
    </Link>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3faff] text-[#102f50] selection:bg-[#00b894] selection:text-white">
      {/* Header */}
      <header className="sticky top-3 z-50 mx-auto max-w-[1440px] px-3 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-3.5 py-2.5 shadow-[0_8px_30px_rgba(20,77,112,.07)] backdrop-blur-md md:px-6">
          <Brand />
          
          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-[#284b68] lg:flex">
            <a className="text-[#00a982] transition hover:text-[#00b894]" href="#bosh-sahifa">Bosh sahifa</a>
            <a className="transition hover:text-[#00a982]" href="#xizmatlar">Xizmatlar</a>
            <a className="transition hover:text-[#00a982]" href="#ustalar">Ustalar</a>
            <a className="transition hover:text-[#00a982]" href="#biz-haqimizda">Biz haqimizda</a>
            <a className="transition hover:text-[#00a982]" href="#aloqa">Aloqa</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 sm:block">
              Kirish
            </Link>
            <Link to="/register" className="rounded-xl bg-[#00b894] px-3.5 py-2 text-[11px] sm:text-xs font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-[#009d7c]">
              Ro‘yxatdan o‘tish
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Menyu" 
              className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-3 top-16 animate-in fade-in slide-in-from-top-4 duration-300 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl backdrop-blur-lg lg:hidden">
            <nav className="flex flex-col gap-3 text-xs font-semibold text-[#284b68]">
              <a onClick={() => setMobileMenuOpen(false)} className="text-[#00a982]" href="#bosh-sahifa">Bosh sahifa</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#xizmatlar">Xizmatlar</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#ustalar">Ustalar</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#biz-haqimizda">Biz haqimizda</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#aloqa">Aloqa</a>
              <div className="mt-1 flex flex-col gap-2 pt-3 border-t border-slate-100">
                <Link to="/login" className="w-full text-center rounded-xl py-2 text-xs font-bold text-slate-700 bg-slate-100">Kirish</Link>
                <Link to="/register" className="w-full text-center rounded-xl py-2 text-xs font-bold text-white bg-[#00b894]">Ro‘yxatdan o‘tish</Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="bosh-sahifa" className="mx-auto max-w-[1440px]">
        
        {/* Hero Section */}
        <section className="relative grid min-h-[460px] items-center gap-6 px-4 py-6 sm:px-8 md:px-10 lg:grid-cols-[.95fr_1.05fr] lg:py-10">
          <div className="relative z-[1] max-w-[590px]">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#b9f2e7] bg-[#defaf4] px-3 py-1.5 text-[11px] font-semibold text-[#087d70]">
              <House size={13} /> Uy xizmatlarini topish platformasi
            </div>
            <h1 className="text-2xl font-extrabold leading-[1.2] tracking-tight text-[#102f50] sm:text-4xl lg:text-[52px]">
              Muammo chiqdi.<br />
              <span className="text-[#00ac88]">Yechimini topish.</span>
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-[#59738c] sm:text-sm sm:leading-6">
              HomeFix — uyingizdagi har qanday muammoni hal qilish uchun ishonchli ustalar va zamonaviy texnologiyalar bir platformada.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href="#xizmatlar" className="inline-flex items-center gap-1.5 rounded-xl bg-[#00b894] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-[#009d7c]">
                Usta topish <ArrowRight size={15} />
              </a>
              <a href="#biz-haqimizda" className="inline-flex items-center gap-1.5 rounded-xl border border-[#d9e8f0] bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#244767] transition hover:border-[#00b894]">
                <CircleHelp size={15} /> Qanday ishlaydi?
              </a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#dceaf1] pt-4">
              {[
                { title: 'Verified', sub: 'Mutaxassislar' },
                { title: 'Xavfsiz', sub: 'Kafolatli' },
                { title: 'Tezkor', sub: 'Yetib kelish' }
              ].map((item) => (
                <div key={item.title} className="text-left">
                  <b className="block text-[11px] text-[#173b5c]">{item.title}</b>
                  <small className="text-[9px] text-[#7690a5]">{item.sub}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[280px] w-full max-w-[500px] sm:h-[380px] lg:h-[440px]">
            <div className="absolute inset-x-2 bottom-2 top-5 rounded-[40%] bg-gradient-to-br from-[#d8faf3] via-[#e8f7ff] to-[#caeee7]" />
            <div className="absolute bottom-0 right-[4%] h-[85%] w-[78%] overflow-hidden rounded-[30%] bg-[#e2f1f4] shadow-lg">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1100&q=85" alt="Mutaxassis" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c3042]/30 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-[8%] left-0 flex items-center gap-2.5 rounded-xl border border-white bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00b894] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              <span>
                <b className="block text-[11px] text-[#173b5c]">Sizning uyingiz</b>
                <small className="text-[9px] text-slate-500">bizning nazoratda</small>
              </span>
            </div>
          </div>
        </section>

        {/* Services Section (Compact Mobile-Friendly Grid) */}
        <section id="xizmatlar" className="scroll-mt-20 px-4 py-8 sm:px-8 md:px-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#00a986]">Kategoriyalar</p>
              <h2 className="text-xl font-extrabold text-[#102f50]">Xizmat turlari</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {services.map(({ title, subtitle, icon: Icon }) => (
              <Link to="/register" key={title} className="group flex flex-col justify-between rounded-2xl border border-[#dceaf1] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#00b894] hover:shadow-md">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f9f6] text-[#00a986] transition group-hover:bg-[#00b894] group-hover:text-white">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#183c5c]">{title}</h3>
                  <p className="mt-0.5 text-[10px] text-[#7590a4]">{subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Artisans Section (Compact Cards) */}
        <section id="ustalar" className="scroll-mt-20 bg-white/70 px-4 py-8 sm:px-8 md:px-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#00a986]">Mutaxassislar</p>
              <h2 className="text-xl font-extrabold text-[#102f50]">Sizga yaqin ustalar</h2>
            </div>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
            {artisans.map((person) => (
              <article key={person.name} className="flex items-center justify-between rounded-2xl border border-[#dceaf1] bg-white p-3.5 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <img className="h-12 w-12 rounded-xl object-cover" src={`https://images.unsplash.com/${person.image}?auto=format&fit=crop&w=160&q=80`} alt={person.name} />
                  <div>
                    <h3 className="text-xs font-bold text-[#173b5c]">{person.name}</h3>
                    <p className="text-[10px] text-slate-500">{person.job}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                      <Star size={11} className="fill-[#f6ad22] text-[#f6ad22]" /> 
                      <b className="text-slate-700">{person.score}</b> ({person.reviews})
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <b className="block text-[11px] text-[#173b5c]">{person.price}</b>
                  <Link to="/register" className="mt-1.5 inline-block rounded-lg bg-[#00b894] px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-[#009d7c]">
                    Tanlash
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Biz haqimizda & Qanday ishlaydi */}
        <section id="biz-haqimizda" className="scroll-mt-20 px-4 py-8 sm:px-8 md:px-10">
          <div className="mb-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#00a986]">Qulay va oson</p>
            <h2 className="text-xl font-extrabold text-[#102f50]">Qanday ishlaydi?</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.num} className="rounded-2xl border border-[#dceaf1] bg-white p-4 shadow-sm">
                <span className="mb-2 inline-block text-lg font-black text-[#00b894]">{item.num}</span>
                <h3 className="text-xs font-bold text-[#173b5c]">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* About Company Banner */}
          <div className="mt-8 rounded-2xl bg-[#0f3150] p-6 text-white sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#51ddbd]">HomeFix haqida</p>
            <h2 className="mt-1.5 text-lg font-extrabold">Uyingizdagi barcha muammolarga yechim</h2>
            <p className="mt-2 text-xs leading-relaxed text-blue-100/80">
              Biz professional va ishonchli ustalarni bir platformada jamladik. Tezkor chaqiruv va sifat kafolati bilan xizmatingizdamiz.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 p-3">
                <b className="block text-base font-extrabold text-[#51ddbd]">5,000+</b>
                <small className="text-[10px] text-blue-100">Buyurtmalar</small>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <b className="block text-base font-extrabold text-[#51ddbd]">350+</b>
                <small className="text-[10px] text-blue-100">Ustalar</small>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <b className="block text-base font-extrabold text-[#51ddbd]">99%</b>
                <small className="text-[10px] text-blue-100">Mamnuniyat</small>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <b className="block text-base font-extrabold text-[#51ddbd]">1 yil</b>
                <small className="text-[10px] text-blue-100">Kafolat</small>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-8 sm:px-8 md:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-extrabold text-[#102f50]">Mijozlarimiz fikri</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-2xl border border-[#dceaf1] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-1 text-[#f6ad22] mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">"{t.text}"</p>
                <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                  <b className="text-[11px] font-bold text-[#173b5c]">{t.name}</b>
                  <small className="text-[10px] text-slate-400">{t.role}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Aloqa Section */}
        <section id="aloqa" className="scroll-mt-20 px-4 py-8 sm:px-8 md:px-10">
          <div className="grid gap-6 rounded-2xl border border-[#dceaf1] bg-white p-6 sm:p-8 md:grid-cols-2 shadow-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#00a986]">Aloqa</p>
              <h2 className="mt-1.5 text-xl font-extrabold text-[#102f50]">Biz bilan bog‘laning</h2>
              <p className="mt-2 text-xs text-slate-500">Savollar yoki takliflaringiz bo‘lsa bizga yozing.</p>
              
              <div className="mt-6 space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f9f6] text-[#00a986]"><Phone size={15} /></span>
                  <span>+998 (71) 200-00-00</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f9f6] text-[#00a986]"><Mail size={15} /></span>
                  <span>info@homefix.uz</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f9f6] text-[#00a986]"><MapPin size={15} /></span>
                  <span>Toshkent shahri, Amir Temur ko‘chasi, 15-uy</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-[#f8fbff] p-5 border border-slate-100">
              <h3 className="text-xs font-bold text-[#102f50]">Tezkor xabar yuborish</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Xabaringiz yuborildi!"); }} className="mt-3 space-y-2.5">
                <input type="text" placeholder="Ismingiz" required className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#00b894]" />
                <input type="tel" placeholder="Telefon raqamingiz" required className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#00b894]" />
                <textarea rows="2" placeholder="Xabaringiz..." required className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-[#00b894]"></textarea>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00b894] py-2.5 text-xs font-bold text-white transition hover:bg-[#009d7c]">
                  Yuborish <Send size={13} />
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#dceaf1] bg-white px-4 py-5 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <Brand />
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-[#4e6d86]">
            <a href="#xizmatlar" className="transition hover:text-[#00a986]">Xizmatlar</a>
            <a href="#ustalar" className="transition hover:text-[#00a986]">Ustalar</a>
            <a href="#biz-haqimizda" className="transition hover:text-[#00a986]">Biz haqimizda</a>
            <a href="#aloqa" className="transition hover:text-[#00a986]">Aloqa</a>
          </div>
          <p className="text-[10px] text-slate-400">© 2026 HomeFix.</p>
        </div>
      </footer>
    </div>
  );
}