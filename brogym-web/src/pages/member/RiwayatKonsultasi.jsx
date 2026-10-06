import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHistories } from '../../api/konsultasiApi';
import { generateMemberRiwayatPDF } from '../../api/pdfApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';

// Enhanced Icons
const Icons = {
  History: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Download: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
  Detail: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const RiwayatKonsultasi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHistories();
        setData(res.data.data || []);
      } catch (error) {
        console.error('Error fetch history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadRiwayatPDF = async () => {
    setDownloading(true);
    try {
      const response = await generateMemberRiwayatPDF();
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `riwayat-konsultasi.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error download PDF:', error);
      alert('Gagal download PDF');
    } finally {
      setDownloading(false);
    }
  };

  // Filter data
  const filteredData = data.filter(item => {
    const matchesSearch = item.tujuan?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.hasil?.[0]?.training_program?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          false;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'completed' && item.hasil?.length > 0) ||
                          (filterStatus === 'pending' && (!item.hasil || item.hasil.length === 0));
    return matchesSearch && matchesStatus;
  });

  // Handle detail click dengan window.location
  const handleDetailClick = (id) => {
    console.log('Detail clicked for ID:', id);
    // Coba dengan window.location
    window.location.href = `/member/hasil-konsultasi/${id}`;
    // Atau coba dengan navigate
    // navigate(`/member/hasil-konsultasi/${id}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
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
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
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
                top: `${10 + i * 15}%`,
                left: `${15 + i * 12}%`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <Icons.History className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Riwayat Konsultasi
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm sm:text-base mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Lihat seluruh riwayat konsultasi Anda
              </motion.p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs font-medium">{data.length} Konsultasi</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadRiwayatPDF}
              disabled={downloading || data.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <Icons.Download className="w-4 h-4" />
              )}
              {downloading ? 'Memproses...' : 'Download PDF'}
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white text-xs">Total: {data.length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="text-white text-xs">Selesai: {data.filter(item => item.hasil?.length > 0).length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            <span className="text-white text-xs">Proses: {data.filter(item => !item.hasil || item.hasil.length === 0).length}</span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari konsultasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none"
          >
            <option value="all">Semua Status</option>
            <option value="completed">Selesai</option>
            <option value="pending">Proses</option>
          </select>
          <Icons.Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="card p-0 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50">
        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {data.length === 0 ? 'Belum ada riwayat konsultasi' : 'Tidak ada hasil yang ditemukan'}
            </p>
            <p className="text-sm text-gray-400">
              {data.length === 0 ? 'Mulai konsultasi sekarang untuk mendapatkan rekomendasi' : 'Coba ubah kata kunci pencarian'}
            </p>
            {data.length === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/member/konsultasi')}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
              >
                Konsultasi Sekarang
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Icons.Calendar className="w-4 h-4" />
                      Tanggal
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Icons.BMI className="w-4 h-4" />
                      BMI
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Icons.Target className="w-4 h-4" />
                      Tujuan
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hasil</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Detail CF</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center justify-center gap-1">
                      <Icons.Detail className="w-4 h-4" />
                      Aksi
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.map((item) => {
                  const firstResult = item.hasil && item.hasil.length > 0 ? item.hasil[0] : null;
                  const programName = firstResult?.training_program?.name || 
                                      firstResult?.program_latihan?.nama_program || '-';
                  const persentase = firstResult?.persentase || 0;
                  const hasResult = item.hasil && item.hasil.length > 0;
                  
                  const consultationDetails = item.consultation_details || [];
                  const totalConditions = consultationDetails.length;
                  const avgCf = consultationDetails.length > 0
                    ? consultationDetails.reduce((sum, d) => sum + (d.user_cf || 0), 0) / consultationDetails.length
                    : 0;

                  return (
                    <tr 
                      key={item.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {item.bmi || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                        {item.tujuan?.nama || '-'}
                      </td>
                      <td className="px-4 py-3">
                        {hasResult ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 dark:text-white">{programName}</span>
                            <span className={`text-xs font-semibold ${
                              persentase >= 80 ? 'text-green-600 dark:text-green-400' :
                              persentase >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              ({persentase}%)
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                            Proses
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {consultationDetails.length > 0 ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {totalConditions} kondisi
                            </span>
                            <span className={`text-xs font-medium ${
                              avgCf >= 0.8 ? 'text-green-600 dark:text-green-400' :
                              avgCf >= 0.5 ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              Rata-rata CF: {Math.round(avgCf * 100)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {hasResult ? (
                          <a
                            href={`/member/hasil-konsultasi/${item.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Navigating to detail:', item.id);
                              // Coba dengan window.location
                              window.location.href = `/member/hasil-konsultasi/${item.id}`;
                              // Atau paksa navigate
                              // navigate(`/member/hasil-konsultasi/${item.id}`);
                            }}
                          >
                            <Icons.Detail className="w-4 h-4" />
                            Detail
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Pagination/Info */}
      {filteredData.length > 0 && (
        <motion.div variants={itemVariants} className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-2">
          <span>Menampilkan {filteredData.length} dari {data.length} konsultasi</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Terakhir diperbarui: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RiwayatKonsultasi;