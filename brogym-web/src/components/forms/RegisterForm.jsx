import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Enhanced Icons
const Icons = {
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Email: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Password: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Phone: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Gender: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-4-4h8" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Spinner: ({ className = "animate-spin h-5 w-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.977 9.977 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
};

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    gender: 'L',
    birth_date: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid';
    if (!form.password) newErrors.password = 'Password wajib diisi';
    else if (form.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    if (!form.password_confirmation) newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
    else if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = 'Password tidak cocok';
    }
    if (!form.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    else if (!/^[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid (10-13 digit)';
    }
    if (!form.birth_date) newErrors.birth_date = 'Tanggal lahir wajib diisi';
    else {
      const age = new Date().getFullYear() - new Date(form.birth_date).getFullYear();
      if (age < 10) newErrors.birth_date = 'Usia minimal 10 tahun';
      if (age > 100) newErrors.birth_date = 'Usia maksimal 100 tahun';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      addNotification('Pendaftaran berhasil! Selamat datang di BroGym.', 'success');
      navigate('/');
    } else {
      addNotification((result.message || 'Pendaftaran gagal'), 'error');
      setErrors({ global: result.message || 'Pendaftaran gagal. Silakan coba lagi.' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.01,
      boxShadow: '0 0 0 3px rgba(52, 211, 153, 0.1)',
      transition: { duration: 0.2 }
    },
    blurred: {
      scale: 1,
      boxShadow: '0 0 0 0px rgba(52, 211, 153, 0)',
      transition: { duration: 0.2 }
    }
  };

  const passwordMatch = form.password && form.password_confirmation && form.password === form.password_confirmation;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />

      {/* Animated background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/5 rounded-full blur-2xl" />

      <div className="relative">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            variants={iconVariants}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 mb-4 relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-sm animate-pulse" />
            <svg className="w-10 h-10 text-emerald-500 dark:text-emerald-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Buat Akun
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Daftar untuk mulai menggunakan BroGym
          </motion.p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {errors.global && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2.5"
            >
              <span className="text-lg">⚠️</span>
              <span>{errors.global}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Nama Lengkap
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'name' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.User />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Nama lengkap"
                required
                autoFocus
              />
            </motion.div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Alamat Email
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'email' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Email />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="contoh@email.com"
                required
              />
            </motion.div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Kata Sandi
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'password' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Password />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Minimal 6 karakter"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <Icons.Eye className="w-4 h-4" /> : <Icons.EyeOff className="w-4 h-4" />}
              </button>
            </motion.div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Konfirmasi Password */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Konfirmasi Kata Sandi
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'password_confirmation' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Password />
              </div>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.password_confirmation}
                onChange={handleChange}
                onFocus={() => setFocusedField('password_confirmation')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Ulangi kata sandi"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {showConfirmPassword ? <Icons.Eye className="w-4 h-4" /> : <Icons.EyeOff className="w-4 h-4" />}
              </button>
            </motion.div>
            <AnimatePresence>
              {errors.password_confirmation && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.password_confirmation}
                </motion.p>
              )}
              {form.password && form.password_confirmation && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-1 text-xs flex items-center gap-1.5 ${
                    passwordMatch ? 'text-emerald-500' : 'text-red-500'
                  }`}
                >
                  {passwordMatch ? (
                    <>
                      <Icons.Check className="w-3 h-3" />
                      Password cocok
                    </>
                  ) : (
                    <>
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      Password tidak cocok
                    </>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Telepon */}
          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Nomor Telepon
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'phone' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Phone />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="081234567890"
                required
              />
            </motion.div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Jenis Kelamin */}
          <motion.div variants={itemVariants}>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Jenis Kelamin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Gender />
              </div>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm appearance-none"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Tanggal Lahir */}
          <motion.div variants={itemVariants}>
            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Tanggal Lahir
            </label>
            <motion.div 
              className="relative"
              variants={inputVariants}
              animate={focusedField === 'birth_date' ? 'focused' : 'blurred'}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Icons.Calendar />
              </div>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                value={form.birth_date}
                onChange={handleChange}
                onFocus={() => setFocusedField('birth_date')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm ${
                  errors.birth_date ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                required
              />
            </motion.div>
            <AnimatePresence>
              {errors.birth_date && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.birth_date}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Spinner />
                  Mendaftar...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Daftar
                  <Icons.ArrowRight />
                </span>
              )}
            </motion.button>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            variants={itemVariants}
            className="text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Sudah punya akun?{' '}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05, color: '#34D399' }}
              className="text-emerald-600 dark:text-emerald-400 font-medium transition-colors duration-200"
            >
              Masuk sekarang
            </motion.a>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-1 h-1 rounded-full bg-emerald-500/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-teal-500/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterForm;