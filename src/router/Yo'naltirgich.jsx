import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HimoyalanganYoLak from "../components/HimoyalanganYo'lak";

// Layoutlar
import AdminQolipi from '../layouts/AdminQolipi';
import UstaQolipi from '../layouts/UstaQolipi';
import MijozQolipi from '../layouts/MijozQolipi';

// Auth va Landing sahifalari
import LandingPage from '../pages/LandingPage';
import Kirish from '../pages/auth/Kirish';
import RoyxatdanOtish from '../pages/auth/RoyxatdanOtish';

// Admin sahifalari
import AdminBoshSahifa from '../pages/admin/BoshSaxifa';

// Usta sahifalari
import UstaBoshSahifa from '../pages/usta/BoshSahifa';
import KiruvchiBuyurtmalar from '../pages/usta/KiruvchiBuyurtmalar';
import AktivBuyurtma from '../pages/usta/AktivBuyurtma';
import Kalendar from '../pages/usta/Kalendar';
import Profil from '../pages/usta/Profil';
import Portfel from '../pages/usta/Portfel';
import BaholarVaFikrlar from '../pages/usta/BaholarVaFikrlar';
import ChatMijoz from '../pages/usta/ChatMijoz';
import MarshrutCheckIn from '../pages/usta/MarshrutCheckIn';
import XavfsizlikSos from '../pages/usta/XavfsizlikSos';
import KafolatDavosi from '../pages/usta/KafolatDavosi';
import MoliyaVaTolovlar from '../pages/usta/MoliyaVaTolovlar';
import Bildirishnomalar from '../pages/usta/Bildirishnomalar';
import Sozlamalar from '../pages/usta/Sozlamalar';

// Mijoz sahifalari
import MijozBoshSahifa from '../pages/mijoz/BoshSahifa';
import BuyurtmaBerish from '../pages/mijoz/BuyurtmaBerish';
import BuyurtmaTasdiqlash from '../pages/mijoz/BuyurtmaTasdiqlash';
import BuyurtmaKuzatuvi from '../pages/mijoz/BuyurtmaKuzatuvi';
import BuyurtmalarTarixi from '../pages/mijoz/BuyurtmalarTarixi';
import MijozBildirishnomalar from '../pages/mijoz/Bildirishnomalar';
import Chat from '../pages/mijoz/Chat';
import MijozKafolatDavosi from '../pages/mijoz/KafolatDavosi';
import SharhQoldirish from '../pages/mijoz/SharhQoldirish';
import UstalarRoyxati from '../pages/mijoz/UstalarRoyxati';
import AIDiagnostika from '../pages/mijoz/AIDiagnostika';
import MijozProfil from '../pages/mijoz/Profil';


const YoNaltirgich = () => {
  return (
    <Routes>
      {/* Ochiq yo'laklar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Kirish />} />
      <Route path="/register" element={<RoyxatdanOtish />} />

      {/* Admin uchun */}
      <Route element={<HimoyalanganYoLak ruxsatEtilganRollar={['admin']} />}>
        <Route path="/admin" element={<AdminQolipi />}>
          <Route index element={<AdminBoshSahifa />} />
        </Route>
      </Route>

      {/* Usta uchun */}
      <Route element={<HimoyalanganYoLak ruxsatEtilganRollar={['usta']} />}>
        <Route path="/usta" element={<UstaQolipi />}>
          <Route index element={<UstaBoshSahifa />} />
          <Route path="buyurtmalar" element={<KiruvchiBuyurtmalar />} />
          <Route path="aktiv-buyurtma" element={<AktivBuyurtma />} />
          <Route path="kalendar" element={<Kalendar />} />
          <Route path="profil" element={<Profil />} />
          <Route path="portfel" element={<Portfel />} />
          <Route path="fikrlar" element={<BaholarVaFikrlar />} />
          <Route path="chat" element={<ChatMijoz />} />
          <Route path="marshrut" element={<MarshrutCheckIn />} />
          <Route path="xavfsizlik" element={<XavfsizlikSos />} />
          <Route path="kafolat" element={<KafolatDavosi />} />
          <Route path="moliya" element={<MoliyaVaTolovlar />} />
          <Route path="bildirishnomalar" element={<Bildirishnomalar />} />
          <Route path="sozlamalar" element={<Sozlamalar />} />
        </Route>
      </Route>

      {/* Mijoz uchun */}
      <Route element={<HimoyalanganYoLak ruxsatEtilganRollar={['mijoz']} />}>
        <Route path="/mijoz" element={<MijozQolipi />}>
          <Route index element={<MijozBoshSahifa />} />
          <Route path="buyurtmaberish" element={<BuyurtmaBerish />} />
          <Route path="buyurtmatasdiqlash" element={<BuyurtmaTasdiqlash />} />
          <Route path="buyurtmakuzatuvi" element={<BuyurtmaKuzatuvi />} />
          <Route path="buyurtmalar" element={<BuyurtmalarTarixi />} />
          <Route path="aidiagnostika" element={<AIDiagnostika />} />
          <Route path="profil" element={<MijozProfil />} />
          <Route path="bildirishnomalar" element={<MijozBildirishnomalar />} />
          <Route path="chat" element={<Chat />} />
          <Route path="kafolatdavosi" element={<MijozKafolatDavosi />} />
          <Route path="sharhqoldirish" element={<SharhQoldirish />} />
          <Route path="ustalarroyxati" element={<UstalarRoyxati />} />

        </Route>
      </Route>

      {/* Noto'g'ri yo'l kiritilsa bosh sahifaga yo'naltirish */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default YoNaltirgich;
