import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getHistoryDetail } from '../../api/konsultasiApi';
import { generateMemberKonsultasiPDF } from '../../api/pdfApi';
import Loader from '../../components/common/Loader';

// Enhanced Icons
const Icons = {
  Back: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  PDF: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Calendar: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  BMI: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Program: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Meal: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Note: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  NewConsult: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Detail: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Trophy: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Award: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const HasilKonsultasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('ID konsultasi tidak ditemukan');
        setLoading(false);
        return;
      }
      try {
        const res = await getHistoryDetail(id);
        setData(res.data.data);
      } catch (err) {
        console.error('Gagal ambil detail konsultasi:', err);
        setError('Data konsultasi tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await generateMemberKonsultasiPDF(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `konsultasi-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error download PDF:', error);
      alert('Gagal download PDF');
    } finally {
      setDownloading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        stiffness: 150,
        damping: 20
      }
    },
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    }
  };

  if (loading) return <Loader />;
  
  if (error) return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card max-w-3xl mx-auto text-center py-12"
    >
      <div className="text-red-500 text-6xl mb-4">😕</div>
      <p className="text-red-500 text-lg font-medium">{error}</p>
      <button 
        onClick={() => navigate('/member/riwayat-konsultasi')} 
        className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
      >
        Kembali ke Riwayat
      </button>
    </motion.div>
  );

  if (!data) return (
    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
      <p>Data tidak tersedia</p>
    </div>
  );

  const hasilList = data.hasil || [];
  const consultationDetails = data.consultation_details || [];
  const tujuanNama = data.tujuan?.nama || 'Tanpa Tujuan';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Header Section with Animated Gradient */}
      <motion.div
        variants={headerVariants}
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
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                top: `${5 + i * 11}%`,
                left: `${10 + i * 9}%`,
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
            <Icons.Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hasil Konsultasi
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm sm:text-base mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Rekomendasi program latihan dan pola makan yang dipersonalisasi
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Check className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">Selesai</span>
            </div>
          </motion.div>
        </div>

        {/* Status badge */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-xs">Konsultasi Selesai</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Calendar className="w-3 h-3 text-white" />
            <span className="text-white text-xs">
              {new Date(data.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        {[
          { icon: Icons.Calendar, label: 'Tanggal', value: new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), color: 'blue' },
          { icon: Icons.BMI, label: 'BMI', value: data.bmi, color: 'purple' },
          { icon: Icons.Target, label: 'Tujuan', value: tujuanNama, color: 'pink' },
          { icon: Icons.User, label: 'Status', value: 'Selesai', color: 'green' },
        ].map((info, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-${info.color}-50 dark:bg-${info.color}-900/20 text-${info.color}-600 dark:text-${info.color}-400`}>
                <info.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {info.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Consultation Details */}
      {consultationDetails.length > 0 && (
        <motion.div variants={itemVariants} className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Icons.Detail className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Detail Kondisi & CF User</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kode</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kondisi</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">CF User</th>
                </tr>
              </thead>
              <tbody>
                {consultationDetails.map((detail, index) => (
                  <motion.tr
                    key={detail.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                    className="border-t border-gray-200 dark:border-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-400">{detail.condition_code}</td>
                    <td className="p-3 text-gray-900 dark:text-white">{detail.condition_name || '-'}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        detail.user_cf >= 0.8 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        detail.user_cf >= 0.5 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          detail.user_cf >= 0.8 ? 'bg-green-500' :
                          detail.user_cf >= 0.5 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        {Math.round(detail.user_cf * 100)}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
            <Icons.Note className="w-3 h-3" />
            CF User = Tingkat keyakinan Anda terhadap data yang diisi
          </p>
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rekomendasi ({hasilList.length})
          </h3>
          <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
            {hasilList.length} Program
          </span>
        </div>
      </motion.div>

      {hasilList.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="card text-center py-12"
        >
          <Icons.Note className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400 mt-4">Tidak ada rekomendasi untuk konsultasi ini.</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {hasilList.map((item, index) => {
              const program = item.training_program || null;
              const mealPlan = item.meal_plan || null;
              const rank = index + 1;
              const isExpanded = expandedCard === index;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                >
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/30' :
                          rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg shadow-gray-500/30' :
                          rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/30' :
                          'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30'
                        }`}
                      >
                        {rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.rule_nama || 'Rule'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          CF: {item.cf_value}
                        </p>
                      </div>
                    </div>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        item.persentase >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' :
                        item.persentase >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}
                    >
                      {item.persentase}%
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Icons.Program className="w-4 h-4 text-blue-500" />
                              <span>Program Latihan</span>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                              <p className="font-medium text-gray-900 dark:text-white">{program?.name || '-'}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{program?.description || ''}</p>
                            </div>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Icons.Meal className="w-4 h-4 text-purple-500" />
                              <span>Pola Makan</span>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                              <p className="font-medium text-gray-900 dark:text-white">{mealPlan?.name || '-'}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{mealPlan?.description || ''}</p>
                              {mealPlan?.calories && (
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                  <span className="font-medium">Kalori:</span> {mealPlan.calories} kcal
                                </p>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      {isExpanded ? '👆 Ketuk untuk tutup' : '👆 Ketuk untuk detail'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}

      {/* Catatan Penyakit */}
      {data.catatan_penyakit && (
        <motion.div 
          variants={itemVariants}
          className="card border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="text-yellow-500 mt-0.5">
              <Icons.Note className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Catatan Penyakit</p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {data.catatan_penyakit}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-3 pt-4 pb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/member/riwayat-konsultasi')}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
        >
          <Icons.Back className="w-4 h-4" />
          Riwayat
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/member/konsultasi')}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
        >
          <Icons.NewConsult className="w-4 h-4" />
          Konsultasi Lagi
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadPDF}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <Icons.PDF className="w-4 h-4" />
              Download PDF
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HasilKonsultasi;