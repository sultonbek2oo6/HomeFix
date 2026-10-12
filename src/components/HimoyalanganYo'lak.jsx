import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HimoyalanganYoLak = ({ ruxsatEtilganRollar }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (ruxsatEtilganRollar && !ruxsatEtilganRollar.includes(user.role)) {
    // Roliga qarab o'zining bosh sahifasiga yuborish
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'usta') return <Navigate to="/usta" replace />;
    return <Navigate to="/mijoz" replace />;
  }

  return <Outlet />;
};

export default HimoyalanganYoLak;
