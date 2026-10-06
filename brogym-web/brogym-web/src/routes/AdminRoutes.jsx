import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';

import Dashboard from '../pages/admin/Dashboard';
import GymProfile from '../pages/admin/gym-profile';
import Members from '../pages/admin/members';
import Membership from '../pages/admin/membership';
import Kondisi from '../pages/admin/kondisi';
import Tujuan from '../pages/admin/tujuan';
import Penyakit from '../pages/admin/penyakit';
// ===== HAPUS IMPORT LAMA =====
// import ProgramLatihan from '../pages/admin/program-latihan';
// import PolaMakan from '../pages/admin/pola-makan';
// import CertaintyFactor from '../pages/admin/certainty-factor';

// ===== TAMBAH IMPORT BARU =====
import TrainingPrograms from '../pages/admin/training-programs';
import MealPlans from '../pages/admin/meal-plans';
import Facts from '../pages/admin/facts';
import FactCf from '../pages/admin/fact-cf';
import Recommendations from '../pages/admin/recommendations';

import Rules from '../pages/admin/rules';
import Konsultasi from '../pages/admin/konsultasi';
import Laporan from '../pages/admin/laporan';
import ActivityLog from '../pages/admin/activity-log';


const AdminRoutes = () => {
  return (
    <Routes>

      <Route element={<AdminLayout />}>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gym-profile" element={<GymProfile />} />
        <Route path="members" element={<Members />} />
        <Route path="membership" element={<Membership />} />
        <Route path="kondisi" element={<Kondisi />} />
        <Route path="tujuan" element={<Tujuan />} />
        <Route path="penyakit" element={<Penyakit />} />
        
        {/* ===== ROUTE BARU ===== */}
        <Route path="training-programs" element={<TrainingPrograms />} />
        <Route path="meal-plans" element={<MealPlans />} />
        <Route path="facts" element={<Facts />} />
        <Route path="fact-cf" element={<FactCf />} />
        <Route path="recommendations" element={<Recommendations />} />
        
        <Route path="rules" element={<Rules />} />
        <Route path="konsultasi" element={<Konsultasi />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="activity-log" element={<ActivityLog />} />

        <Route path="*" element={<Navigate to="dashboard" />} />

      </Route>

    </Routes>
  );
};

export default AdminRoutes;