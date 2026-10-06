import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getConsultationsAdmin, deleteConsultation } from '../../../api/konsultasiApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';
import { formatDate } from '../../../utils/formatter';

// Enhanced Icons
const Icons = {
  Consultation: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Delete: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
  Refresh: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  ChevronLeft: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
  User: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const KonsultasiAdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getConsultationsAdmin({ page, search });
      setData(res.data.data || []);
      setPagination(res.data.pagination || {});
    } catch (error) {
      console.error('Error fetch consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteConsultation(deleteId);
      setConfirmOpen(false);
      await fetchData();
    } catch (error) {
      console.error('Error delete:', error);
    } finally {
      setDeleting(false);
    }
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

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
    hover: {
      scale: 1.01,
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      transition: { duration: 0.2 }
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
      {/* Header with Animated Gradient */}
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
              <Icons.Consultation className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Data Konsultasi
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm sm:text-base mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Kelola semua data konsultasi member
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
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData()}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-white"
            >
              <Icons.Refresh className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Calendar className="w-3 h-3 text-white/70" />
            <span className="text-white text-xs">
              Total: {pagination.total || 0} data
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="text-white text-xs">
              Halaman: {pagination.current_page || 1}/{pagination.last_page || 1}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari konsultasi berdasarkan member atau tujuan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 shadow-sm"
        >
          <Icons.Filter className="w-4 h-4" />
          Filter
        </motion.button>
      </motion.div>

      {/* Table */}
      <motion.div 
        variants={itemVariants}
        className="card bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50"
      >
        <AnimatePresence mode="wait">
          {data.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                {search ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data konsultasi'}
              </p>
              <p className="text-sm text-gray-400">
                {search ? 'Coba ubah kata kunci pencarian' : 'Konsultasi akan muncul setelah member melakukan konsultasi'}
              </p>
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
                    {['Member', 'Tanggal', 'BMI', 'Tujuan', 'Program', 'Aksi'].map((header, i) => (
                      <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          {header === 'Member' && <Icons.User className="w-3 h-3" />}
                          {header === 'Tanggal' && <Icons.Calendar className="w-3 h-3" />}
                          {header}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence>
                    {data.map((item, index) => {
                      const hasilList = item.hasil || [];
                      const hasResult = hasilList.length > 0;
                      
                      const getProgramNames = () => {
                        if (!hasResult) return ['-'];
                        return hasilList.map((h) => 
                          h.training_program?.name || 
                          h.training_program?.training_name || 
                          'Program'
                        );
                      };

                      const programNames = getProgramNames();
                      const isHovered = hoveredRow === item.id;

                      return (
                        <motion.tr
                          key={item.id}
                          custom={index}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className="cursor-pointer transition-colors duration-200"
                          onMouseEnter={() => setHoveredRow(item.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-medium shadow-lg shadow-blue-500/25"
                              >
                                {item.member?.user?.name?.charAt(0).toUpperCase() || 'U'}
                              </motion.div>
                              <span className="text-gray-900 dark:text-white font-medium">
                                {item.member?.user?.name || '-'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {formatDate(item.tanggal)}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              {item.bmi || '-'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                            {item.tujuan?.nama || '-'}
                          </td>
                          <td className="px-4 py-3">
                            {hasResult ? (
                              <div className="flex flex-wrap gap-1.5">
                                {programNames.map((name, idx) => (
                                  <motion.span
                                    key={idx}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium border border-green-200 dark:border-green-800"
                                  >
                                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                                    {name}
                                  </motion.span>
                                ))}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                                Proses
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <motion.button
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteId(item.id);
                                setConfirmOpen(true);
                              }}
                              disabled={deleting}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 group"
                            >
                              <Icons.Delete className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan {pagination.from || 0} - {pagination.to || 0} dari {pagination.total || 0} data
          </span>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Icons.ChevronLeft />
            </motion.button>
            <div className="flex items-center gap-1.5">
              {[...Array(Math.min(5, pagination.last_page))].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pagination.current_page;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fetchData(pageNum)}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData(pagination.current_page + 1)}
              disabled={!pagination.next_page_url}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Icons.ChevronRight />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Konsultasi"
        message="Apakah Anda yakin ingin menghapus data konsultasi ini? Tindakan ini tidak dapat dibatalkan."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </motion.div>
  );
};

export default KonsultasiAdminPage;