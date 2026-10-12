import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Calendar, 
  Info, 
  LogOut, 
  ChevronRight,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sozlamalar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [language, setLanguage] = useState("O'zbekcha");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('homefix_user');
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2EBF0] shadow-sm space-y-6">
        
        <h2 className="text-xl font-bold text-gray-900 border-b border-[#E2EBF0] pb-4">
          Sozlamalar
        </h2>

        {/* Sozlamalar menyulari ro'yxati */}
        <div className="space-y-2">
          
          <button 
            onClick={() => navigate('/usta/profil')}
            className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-gray-100 rounded-2xl border border-[#E2EBF0] transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Shaxsiy ma'lumotlar</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/usta/xavfsizlik')}
            className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-gray-100 rounded-2xl border border-[#E2EBF0] transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Xavfsizlik</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0]">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Bildirishnomalar</span>
            </div>
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="toggle accent-[#10B981] w-5 h-5 cursor-pointer" 
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0]">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Til</span>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#10B981] outline-none cursor-pointer"
            >
              <option>O'zbekcha</option>
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>

          <button 
            onClick={() => navigate('/usta/kalendar')}
            className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-gray-100 rounded-2xl border border-[#E2EBF0] transition"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Mavjudlik</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2EBF0]">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Ilova haqida</span>
            </div>
            <span className="text-xs text-gray-400 font-semibold">v1.0.4</span>
          </div>

        </div>

        {/* Chiqish tugmasi */}
        <button 
          onClick={handleLogout}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Chiqish
        </button>

      </div>
    </div>
  );
}
