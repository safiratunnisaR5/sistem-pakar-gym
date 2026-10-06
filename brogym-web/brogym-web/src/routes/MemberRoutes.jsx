import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MemberLayout from '../layouts/MemberLayout';
import Dashboard from '../pages/member/Dashboard';
import Profile from '../pages/member/Profile';
import Membership from '../pages/member/Membership';
import Konsultasi from '../pages/member/Konsultasi';
import HasilKonsultasi from '../pages/member/HasilKonsultasi';
import RiwayatKonsultasi from '../pages/member/RiwayatKonsultasi';

const MemberRoutes = () => {
  return (
    <Routes>

      <Route element={<MemberLayout />}>

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="membership" element={<Membership />} />

        <Route path="konsultasi" element={<Konsultasi />} />

        <Route 
          path="hasil-konsultasi/:id" 
          element={<HasilKonsultasi />} 
        />

        <Route 
          path="riwayat-konsultasi" 
          element={<RiwayatKonsultasi />} 
        />

        <Route 
          path="*" 
          element={<Navigate to="dashboard" replace />} 
        />

      </Route>

    </Routes>
  );
};

export default MemberRoutes;