import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {user ? (
          user.role?.name === 'Admin' ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/member/*" element={<MemberRoutes />} />
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route
          path="/"
          element={
            user ? (
              user.role?.name === 'Admin'
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/member/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;