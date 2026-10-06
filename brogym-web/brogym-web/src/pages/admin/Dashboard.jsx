import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdminDashboard } from '../../api/dashboardApi';
import Loader from '../../components/common/Loader';
import MonthlyConsultationChart from '../../components/charts/MonthlyConsultationChart';
import DiseaseChart from '../../components/charts/DiseaseChart';
import GoalChart from '../../components/charts/GoalChart';
import { formatDate } from '../../utils/formatter';

// Enhanced Icons
const Icons = {
  Dashboard: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Members: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Consultation: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Today: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Rules: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Chart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Award: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminDashboard();
        setData(res.data.data);
      } catch (error) {
        console.error('Gagal ambil dashboard admin:', error);
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

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
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

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const memberVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      transition: { duration: 0.2 }
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
      <p className="text-gray-500 dark:text-gray-400 mt-4">Gagal memuat data dashboard</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
      >
        Muat Ulang
      </button>
    </motion.div>
  );

  // Data chart
  const monthlyData = [4, 7, 3, 8, 12, 15, 10, 8, 14, 20, 18, 25];
  const diseaseData = [
    { label: 'Diabetes', value: 8 },
    { label: 'Hipertensi', value: 12 },
    { label: 'Asam Urat', value: 5 },
    { label: 'Jantung', value: 3 },
  ];
  const goalData = [
    { label: 'Turun Berat Badan', value: 25 },
    { label: 'Tambah Massa Otot', value: 18 },
    { label: 'Jaga Kebugaran', value: 22 },
    { label: 'Bentuk Tubuh', value: 12 },
  ];

  const stats = [
    {
      label: 'Total Member',
      value: data?.stats?.total_members || 0,
      icon: Icons.Members,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Total Konsultasi',
      value: data?.stats?.total_consultations || 0,
      icon: Icons.Consultation,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      label: 'Konsultasi Hari Ini',
      value: data?.stats?.today_consultations || 0,
      icon: Icons.Today,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Rule Aktif',
      value: data?.stats?.active_rules || 0,
      icon: Icons.Rules,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      gradient: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Animated Gradient */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 sm:p-8 shadow-xl shadow-blue-500/20"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-20"
          />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -25, 0],
                x: [0, 10, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${5 + i * 12}%`,
                left: `${10 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20"
          >
            <Icons.Dashboard className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Dashboard Admin
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm sm:text-base mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ringkasan data dan statistik gym
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs font-medium">System Online</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Today className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistik Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              custom={index}
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
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
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <motion.p 
                    className={`text-3xl font-bold mt-1 ${stat.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`p-3 rounded-xl ${stat.bg}`}
                >
                  <div className={stat.color}>
                    <Icon />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div 
          variants={chartVariants}
          className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
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
          variants={chartVariants}
          className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icons.Award className="w-5 h-5 text-purple-500" />
              Penyakit Terbanyak
            </h3>
          </div>
          <DiseaseChart data={diseaseData} />
        </motion.div>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div 
          variants={chartVariants}
          className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icons.TrendingUp className="w-5 h-5 text-green-500" />
              Tujuan Populer
            </h3>
          </div>
          <GoalChart data={goalData} />
        </motion.div>

        <motion.div 
          variants={chartVariants}
          className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icons.User className="w-5 h-5 text-indigo-500" />
              Member Terbaru
            </h3>
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {data?.recent_members?.length || 0} Member
            </span>
          </div>

          <AnimatePresence mode="wait">
            {data?.recent_members?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">Belum ada member</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {data?.recent_members?.map((member, index) => (
                  <motion.div
                    key={member.id}
                    custom={index}
                    variants={memberVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-medium text-sm flex-shrink-0 shadow-lg shadow-blue-500/25"
                    >
                      {member.name?.charAt(0).toUpperCase() || 'U'}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                        <Icons.User className="w-3 h-3" />
                        {member.email}
                      </p>
                    </div>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-full"
                    >
                      {member.created_at ? formatDate(member.created_at) : '-'}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center text-xs text-gray-400"
      >
        <span>Dashboard diperbarui secara real-time • {new Date().toLocaleTimeString('id-ID')}</span>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;