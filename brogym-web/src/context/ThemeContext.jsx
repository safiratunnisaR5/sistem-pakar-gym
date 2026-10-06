import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Deteksi preferensi sistem
  const getSystemTheme = useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }, []);

  // Ambil tema dari localStorage atau fallback ke sistem
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return getSystemTheme();
  });

  // State untuk mencegah flash saat load
  const [isMounted, setIsMounted] = useState(false);

  // Toggle tema
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Set tema spesifik
  const setThemeMode = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  // Reset ke tema sistem
  const resetToSystemTheme = useCallback(() => {
    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
    localStorage.removeItem('theme');
  }, [getSystemTheme]);

  // Efek untuk menyimpan tema dan mengupdate DOM
  useEffect(() => {
    // Tandai sudah di-mount
    setIsMounted(true);

    // Simpan ke localStorage
    localStorage.setItem('theme', theme);

    // Update class di html
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set meta theme-color untuk mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#f9fafb';
    }
  }, [theme]);

  // Listen perubahan preferensi sistem (real-time)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Hanya update jika tidak ada preferensi tersimpan
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };

    // Event listener untuk perubahan sistem
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback untuk browser lama
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Nilai context
  const value = useMemo(() => ({
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setThemeMode,
    resetToSystemTheme,
    isMounted,
  }), [theme, toggleTheme, setThemeMode, resetToSystemTheme, isMounted]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};