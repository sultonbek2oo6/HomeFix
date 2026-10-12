import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import YoNaltirgich from './router/Yo\'naltirgich';

// Test rejimi uchun rol almashtiradigan qulay panel
const TestRolSwitch = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (name, role, path) => {
    setUser({ name, role });
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 right-20 bg-slate-900 text-white p-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs border border-slate-700">
      <span className="text-gray-400">Rolni o'zgartirish:</span>
      <button 
        onClick={() => handleRoleChange('Admin', 'admin', '/admin')}
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition font-medium text-emerald-400"
      >
        Admin
      </button>
      <button 
        onClick={() => handleRoleChange('Azizbek (Usta)', 'usta', '/usta')}
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition font-medium text-emerald-400"
      >
        Usta
      </button>
      <button 
        onClick={() => handleRoleChange('Mijoz', 'mijoz', '/mijoz')}
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition font-medium text-emerald-400"
      >
        Mijoz
      </button>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <YoNaltirgich />
        <TestRolSwitch />
      </BrowserRouter>
    </AuthProvider>
  );
}
