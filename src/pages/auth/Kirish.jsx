import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Wrench, ArrowRight, Lock, Mail } from 'lucide-react';

const Kirish = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Test uchun kiritilgan email yoki rolga qarab aniqlaymiz (yoki default mijoz)
    let role = 'mijoz';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('usta')) role = 'usta';

    login({ name: email.split('@')[0] || 'Foydalanuvchi', role });

    // Rolga qarab yo'naltirish
    if (role === 'admin') navigate('/admin');
    else if (role === 'usta') navigate('/usta');
    else navigate('/mijoz');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#E2EBF0] p-8">
        {/* Logo va Sarlavha */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#10B981]/30">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#6F172A]">HomeFix</h1>
            <p className="text-xs text-gray-500">Uy xizmatlari topish platformasi</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">Tizimga xush kelibsiz!</h2>
        <p className="text-sm text-gray-500 mb-6">Davom etish uchun elektron pochta va parolingizni kiriting.</p>

        {/* Forma */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Elektron pochta</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com (admin / usta / mijoz)"
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
            className="w-full py-3.5 bg-[#10B981] hover:bg-[#0e9f6e] text-white font-semibold rounded-xl shadow-lg shadow-[#10B981]/30 transition flex items-center justify-center gap-2"
          >
            Kirish
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Ro'yxatdan o'tishga o'tish */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Hisobingiz yo'qmi?{' '}
          <Link to="/register" className="text-[#10B981] font-semibold hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Kirish;
