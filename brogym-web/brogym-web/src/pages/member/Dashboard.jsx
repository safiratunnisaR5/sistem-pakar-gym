import React, { useEffect, useState } from 'react';
import { getMemberDashboard } from '../../api/dashboardApi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/common/Loader';
import GoalChart from '../../components/charts/GoalChart';
import MonthlyConsultationChart from '../../components/charts/MonthlyConsultationChart';
import { formatDate } from '../../utils/formatter';

// Enhanced Icons with animations
const Icons = {
  Dashboard: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Consultation: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Membership: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Chart: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
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
  Phone: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  History: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const MemberDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMemberDashboard();
        setData(res.data.data);
      } catch (error) {
        console.error('Gagal ambil dashboard member:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
    hover: {
      y: -6,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  if (loading) return <Loader />;
  if (!data) return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card text-center py-12"
    >
      <Icons.Empty className="w-20 h-20 mx-auto text-gray-400" />
      <p className="text-secondary mt-4">Gagal memuat data dashboard</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
      >
        Muat Ulang
      </button>
    </motion.div>
  );

  // Data untuk chart
  const monthlyData = [2, 3, 1, 4, 2, 5, 3, 2, 4, 6, 5, 8];
  const goalData = [
    { label: 'Turun Berat Badan', value: 5 },
    { label: 'Tambah Massa Otot', value: 3 },
    { label: 'Jaga Kebugaran', value: 2 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with animated gradient */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 shadow-xl shadow-blue-500/20"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
          >
            <Icons.Dashboard className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              Dashboard Member
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-sm"
            >
              Selamat datang di dashboard member BroGym
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="ml-auto"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Info Member */}
      <motion.div 
        variants={itemVariants}
        className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/25"
          >
            {data?.member?.name?.charAt(0).toUpperCase() || 'M'}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Halo, {data?.member?.name}!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2"
              >
                <Icons.Email className="w-4 h-4 text-blue-500" />
                <span>{data?.member?.email}</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2"
              >
                <Icons.Phone className="w-4 h-4 text-purple-500" />
                <span>{data?.member?.phone || '-'}</span>
              </motion.div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${
              data?.stats?.membership_aktif
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
            }`}>
              {data?.stats?.membership_aktif ? '🟢 Member Aktif' : '⚪ Member Tidak Aktif'}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistik */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'Total Konsultasi',
            value: data?.stats?.total_konsultasi || 0,
            icon: Icons.Consultation,
            color: 'blue',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-600 dark:text-blue-400',
            gradient: 'from-blue-500 to-blue-600'
          },
          {
            label: 'Status Membership',
            value: data?.stats?.membership_aktif ? 'Aktif' : 'Tidak Aktif',
            icon: Icons.Membership,
            color: data?.stats?.membership_aktif ? 'green' : 'red',
            bgColor: data?.stats?.membership_aktif 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-red-50 dark:bg-red-900/20',
            textColor: data?.stats?.membership_aktif
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400',
            gradient: data?.stats?.membership_aktif
              ? 'from-green-500 to-green-600'
              : 'from-red-500 to-red-600'
          },
          {
            label: 'Program Aktif',
            value: data?.stats?.program_aktif || 0,
            icon: Icons.Target,
            color: 'purple',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            textColor: 'text-purple-600 dark:text-purple-400',
            gradient: 'from-purple-500 to-purple-600'
          },
          {
            label: 'Persentase Progress',
            value: `${data?.stats?.progress_persen || 0}%`,
            icon: Icons.TrendingUp,
            color: 'indigo',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
            textColor: 'text-indigo-600 dark:text-indigo-400',
            gradient: 'from-indigo-500 to-indigo-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={statCardVariants}
            whileHover="hover"
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated background gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: hoveredCard === index ? 1 : 0, scale: hoveredCard === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-5`}
            />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <motion.p 
                  className={`text-3xl font-bold mt-1 ${stat.textColor}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                {stat.label === 'Status Membership' && data?.stats?.membership_package && (
                  <p className="text-xs text-gray-400 mt-1">{data?.stats?.membership_package}</p>
                )}
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor}`}
              >
                <stat.icon />
              </motion.div>
            </div>
            
            {/* Animated progress bar for progress stat */}
            {stat.label === 'Persentase Progress' && (
              <div className="relative mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data?.stats?.progress_persen || 0}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Aksi Cepat */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/member/konsultasi"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Konsultasi Sekarang
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/member/profile"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 font-medium"
            >
              <Icons.User className="w-5 h-5" />
              Edit Profil
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/member/riwayat-konsultasi"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all duration-300 font-medium"
            >
              <Icons.History className="w-5 h-5" />
              Riwayat Konsultasi
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div 
          variants={itemVariants}
          className="card shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icons.Chart className="w-5 h-5 text-blue-500" />
              Konsultasi Bulanan
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {new Date().getFullYear()}
            </span>
          </div>
          <MonthlyConsultationChart data={monthlyData} />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="card shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icons.Target className="w-5 h-5 text-purple-500" />
              Tujuan Populer
            </h3>
          </div>
          <GoalChart data={goalData} />
        </motion.div>
      </motion.div>

      {/* Riwayat Konsultasi Terbaru */}
      <motion.div 
        variants={itemVariants}
        className="card shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Icons.History className="w-5 h-5 text-indigo-500" />
            Riwayat Konsultasi Terbaru
          </h3>
          {data?.recent_konsultasi?.length > 0 && (
            <Link
              to="/member/riwayat-konsultasi"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition flex items-center gap-1 group"
            >
              Lihat Semua
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <AnimatePresence mode="wait">
          {data?.recent_konsultasi?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">Belum ada konsultasi</p>
              <p className="text-sm text-gray-400">Mulai konsultasi sekarang untuk mendapatkan rekomendasi</p>
              <Link to="/member/konsultasi" className="mt-4 inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                Konsultasi Sekarang
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    {['Tanggal', 'Tujuan', 'BMI', 'Program', 'Persentase', 'Status'].map((header, i) => (
                      <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data?.recent_konsultasi?.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                      className="transition-colors duration-200"
                    >
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(item.tanggal)}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{item.tujuan || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {item.bmi || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{item.hasil?.program || '-'}</td>
                      <td className="px-4 py-3">
                        {item.hasil?.persentase ? (
                          <span className={`font-semibold ${
                            item.hasil.persentase >= 80
                              ? 'text-green-600 dark:text-green-400'
                              : item.hasil.persentase >= 60
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {item.hasil.persentase}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {item.hasil?.persentase ? (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.hasil.persentase >= 80
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : item.hasil.persentase >= 60
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {item.hasil.persentase >= 80 ? '✅ Selesai' : 
                             item.hasil.persentase >= 60 ? '🔄 Proses' : '⏳ Baru'}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MemberDashboard;