import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* ThemeProvider harus di luar AuthProvider agar tema tersedia di seluruh aplikasi */}
    <ThemeProvider>
      {/* AuthProvider membutuhkan akses ke theme untuk UI auth */}
      <AuthProvider>
        {/* NotificationProvider membutuhkan akses ke theme dan auth untuk notifikasi */}
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);