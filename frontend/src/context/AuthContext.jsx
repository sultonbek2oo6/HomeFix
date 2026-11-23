import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Sahifa yangilansa ham rol yo'qolmasligi uchun localStorage'dan olinadi
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('homefix_user');
    return savedUser ? JSON.parse(savedUser) : { name: 'Mijoz', role: 'mijoz' };
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('homefix_user', JSON.stringify(userData));
  };

  const updateUserRole = (userData) => {
    setUser(userData);
    localStorage.setItem('homefix_user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUserRole, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
