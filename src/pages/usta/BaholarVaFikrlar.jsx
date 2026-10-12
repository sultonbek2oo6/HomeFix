import React, { useState } from 'react';
import { Star, MessageSquare, Reply, ThumbsUp, Filter, CheckCircle2 } from 'lucide-react';

export default function BaholarVaFikrlar() {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 5, 4, 3, 2, 1
  const [replyingTo, setReplyingTo] = useState(null); // Javob berilayotgan fikr ID-si
  const [replyText, setReplyText] = useState('');

  // Initial fikrlar ro'yxati (backendga ulaganda API orqali keladi)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      clientName: "Murodov Jamshid",
      clientAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      date: "12.09.2026",
      comment: "Juda tez va sifatli xizmat ko'rsatdi. Tavsiya qilaman!",
      service: "Konditsioner ta'miri",
      likes: 4,
      reply: "Rahmat, Jamshid aka! Mamnun bo'lganingizdan xursandman."
    },
    {
      id: 2,
      clientName: "Dilshodbek To'xtashev",
      clientAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      date: "10.09.2026",
      comment: "Elektrik bo'yicha barcha muammolarni 1 soatda hal qilib berdi. Ishiga haqiqiy usta!",
      service: "Elektrik ishlari",
      likes: 2,
      reply: null
    },
    {
      id: 3,
      clientName: "Sardor Salimov",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      rating: 4,
      date: "05.09.2026",
      comment: "Yaxshi ta'mirladi, lekin ozgina kechikib keldi. Umuman olganda xizmat sifati a'lo.",
      service: "Santexnika",
      likes: 1,
      reply: null
    }
  ]);

  // Yulduzchalar statistikasi
  const totalReviews = 134;
  const averageRating = 4.8;
  const stats = [
    { stars: 5, percent: 92, count: 123 },
    { stars: 4, percent: 6, count: 8 },
    { stars: 3, percent: 2, count: 2 },
    { stars: 2, percent: 0, count: 0 },
    { stars: 1, percent: 0, count: 0 },
  ];

  // Javob yuborish
  const handleSendReply = (id) => {
    if (!replyText.trim()) return;
    setReviews(reviews.map(item => {
      if (item.id === id) {
        return { ...item, reply: replyText };
      }
      return item;
    }));
    setReplyingTo(null);
    setReplyText('');
  };

  // Filtrlangan fikrlar
  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === Number(selectedFilter));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Asosiy Baholar Kartasi (Dizaynga 1 ga 1 mos) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        <h2 className="text-xl font-bold text-gray-900 border-b border-[#E2EBF0] pb-4">
          Baholar va fikrlar
        </h2>

        {/* Reyting va Yulduzlar Umumiy Statistikasi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#F8FAFC] p-6 rounded-3xl border border-[#E2EBF0]">
          
          {/* Umumiy Reyting Balli */}
          <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#E2EBF0] pb-4 md:pb-0 md:pr-6">
            <h3 className="text-5xl font-extrabold text-gray-900 tracking-tight">{averageRating}</h3>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-400">({totalReviews} ta baho)</p>
          </div>

          {/* Progress Bar shaklidagi foizlar (5★ - 1★) */}
          <div className="md:col-span-2 space-y-2">
            {stats.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-xs">
                <span className="font-bold text-gray-600 w-4 text-right">{item.stars}★</span>
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-gray-400 w-10 text-right">{item.percent}%</span>
              </div>
            ))}
          </div>

        </div>

        {/* Filtrlash Tugmalari */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtr:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedFilter === 'all'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'bg-[#F8FAFC] text-gray-600 border border-[#E2EBF0] hover:bg-gray-100'
            }`}
          >
            Barchasi ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedFilter(star)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
                selectedFilter === star
                  ? 'bg-[#10B981] text-white shadow-md'
                  : 'bg-[#F8FAFC] text-gray-600 border border-[#E2EBF0] hover:bg-gray-100'
              }`}
            >
              <span>{star}</span>
              <Star className={`w-3 h-3 ${selectedFilter === star ? 'fill-white' : 'fill-amber-400 text-amber-400'}`} />
            </button>
          ))}
        </div>

        {/* Mijozlar Izohlari Ro'yxati */}
        <div className="space-y-4 pt-2">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs font-medium">
              Ushbu filtr bo'yicha izohlar topilmadi.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-3 hover:border-emerald-200 transition">
                
                {/* Mijoz Ma'lumoti va Reytingi */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={rev.clientAvatar} alt={rev.clientName} className="w-10 h-10 rounded-full object-cover border border-[#E2EBF0]" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">{rev.clientName}</h4>
                      <p className="text-[10px] text-gray-400">{rev.date} • <span className="text-[#10B981] font-semibold">{rev.service}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Fikr Matni */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2EBF0]/60">
                  "{rev.comment}"
                </p>

                {/* Ustaning Javobi (Mavjud bo'lsa) */}
                {rev.reply && (
                  <div className="ml-4 sm:ml-6 p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sizning javobingiz:
                    </div>
                    <p className="text-xs text-gray-700 font-medium">{rev.reply}</p>
                  </div>
                )}

                {/* Javob Yozish Shakli */}
                {replyingTo === rev.id ? (
                  <div className="space-y-2 pt-2">
                    <textarea 
                      rows="2"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Mijozga muloyim va professional javob qoldiring..."
                      className="w-full bg-[#F8FAFC] border border-[#E2EBF0] rounded-2xl p-3 text-xs outline-none focus:border-[#10B981]"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 transition"
                      >
                        Bekor qilish
                      </button>
                      <button 
                        onClick={() => handleSendReply(rev.id)}
                        className="px-4 py-2 bg-[#10B981] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#0e9f6e] transition"
                      >
                        Javobni yuborish
                      </button>
                    </div>
                  </div>
                ) : (
                  !rev.reply && (
                    <div className="flex justify-end pt-1">
                      <button 
                        onClick={() => { setReplyingTo(rev.id); setReplyText(''); }}
                        className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1"
                      >
                        <Reply className="w-3.5 h-3.5" /> Javob berish
                      </button>
                    </div>
                  )
                )}

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
