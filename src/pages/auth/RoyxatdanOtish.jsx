import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Wrench, User, Mail, Lock, ShieldCheck } from 'lucide-react';

const RoyxatdanOtish = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mijoz'); // 'mijoz' yoki 'usta'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    login({ name, role });

    // Tanlangan rolga qarab yo'naltirish
    if (role === 'usta') navigate('/usta');
    else navigate('/mijoz');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#E2EBF0] p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#10B981]/30">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#6F172A]">HomeFix</h1>
            <p className="text-xs text-gray-500">Uy xizmatlari topish platformasi</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Yangi hisob yaratish</h2>
        <p className="text-sm text-gray-500 mb-6">Platformada kim bo'lib ro'yxatdan o'tmoqchisiz?</p>

        {/* Forma */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Rol tanlash tugmalari */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => setRole('mijoz')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border transition ${
                role === 'mijoz'
                  ? 'bg-[#10B981]/10 border-[#10B981] text-[#10B981]'
                  : 'bg-[#F8FAFC] border-[#E2EBF0] text-gray-600'
              }`}
            >
              <User className="w-4 h-4" />
              Mijoz
            </button>
            <button
              type="button"
              onClick={() => setRole('usta')}
              className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border transition ${
                role === 'usta'
                  ? 'bg-[#10B981]/10 border-[#10B981] text-[#10B981]'
                  : 'bg-[#F8FAFC] border-[#E2EBF0] text-gray-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Usta
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ism va familiya</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Azizbek Karimov"
                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Elektron pochta</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Parol</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2EBF0] rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-semibold rounded-xl shadow-lg shadow-[#10B981]/30 transition flex items-center justify-center gap-2 mt-2"
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        {/* Kirishga qaytish */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="text-[#10B981] font-semibold hover:underline">
            Tizimga kirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoyxatdanOtish;
