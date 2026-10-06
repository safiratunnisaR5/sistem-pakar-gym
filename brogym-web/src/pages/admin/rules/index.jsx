import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRules, createRule, updateRule, deleteRule } from '../../../api/ruleApi';
import { getKondisis, getTujuans, getFacts, getRecommendations } from '../../../api/masterApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';
import RuleForm from '../../../components/forms/RuleForm';

// Enhanced Icons
const Icons = {
  Rules: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Delete: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Spinner: ({ className = "animate-spin h-4 w-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Database: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Refresh: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Rule: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Layer: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

const RulesPage = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);

  const fetchRules = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getRules();
      setRules(res.data.data || res.data || []);
    } catch (error) {
      console.error('Error fetch rules:', error);
      setError('Gagal mengambil data rules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const openModal = (rule = null) => {
    setEditing(rule);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteRule(deleteId);
      setConfirmOpen(false);
      fetchRules();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      alert('Gagal hapus rule');
    }
  };

  const handleSuccess = () => {
    setModalOpen(false);
    fetchRules();
    setRefreshKey(prev => prev + 1);
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

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
    hover: {
      scale: 1.01,
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      transition: { duration: 0.2 }
    }
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const filteredRules = rules.filter(rule =>
    rule.nama_rule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.kode_rule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.fact?.fact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.tujuan?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6 sm:p-8 shadow-xl shadow-violet-500/20"
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
          {/* Floating rule symbols */}
          {['⚖️', '📋', '📌', '🔍', '📊', '🎯'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut"
              }}
              className="absolute text-white/10 text-3xl"
              style={{
                top: `${5 + i * 14}%`,
                right: `${5 + i * 10}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
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
            <Icons.Rules className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Data Rules
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm sm:text-base mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Kelola aturan sistem pakar (Tahap 1: Kondisi → Fakta, Tahap 2: Fakta + Tujuan → Rekomendasi)
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Database className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">{rules.length} Rules</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { fetchRules(); setRefreshKey(prev => prev + 1); }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-white"
            >
              <Icons.Refresh className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Rule className="w-3 h-3 text-white/70" />
            <span className="text-white text-xs">Aturan Sistem</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-xs">Sistem Aktif</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white text-xs">
              {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Search and Add Button */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari rule berdasarkan kode, nama, fakta, atau tujuan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 text-sm font-medium flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          Tambah Rule
        </motion.button>
      </motion.div>

      {/* Info Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Icons.Rule,
            title: 'Tahap 1 Rules',
            description: 'Kondisi → Fakta (CF User)',
            color: 'violet'
          },
          {
            icon: Icons.Layer,
            title: 'Tahap 2 Rules',
            description: 'Fakta + Tujuan → Rekomendasi',
            color: 'purple'
          },
          {
            icon: Icons.Check,
            title: 'Status Aktif',
            description: 'Rules yang aktif digunakan',
            color: 'indigo'
          }
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
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {info.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {info.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div 
        variants={itemVariants}
        className="card bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50"
      >
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-red-500 text-lg">{error}</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchRules} 
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            >
              Coba Lagi
            </motion.button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredRules.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data rule'}
                </p>
                <p className="text-sm text-gray-400">
                  {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Klik "Tambah Rule" untuk membuat aturan baru'}
                </p>
                {!searchTerm && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                  >
                    <Icons.Plus className="w-4 h-4 inline-block mr-2" />
                    Tambah Rule
                  </motion.button>
                )}
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
                      {['Kode', 'Nama Rule', 'Fakta', 'Tujuan', 'Rekomendasi', 'Status', 'Aksi'].map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {header === 'Kode'}
                          {header === 'Status' && '●'}
                          {header === 'Aksi' && '⚡'}
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {filteredRules.map((r, index) => {
                        const isTahap1 = !r.tujuan_id && !r.recommendation_code;
                        const isTahap2 = r.tujuan_id && r.recommendation_code;
                        const isHovered = hoveredRow === r.id;

                        return (
                          <motion.tr
                            key={r.id}
                            custom={index}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="cursor-pointer transition-colors duration-200"
                            onMouseEnter={() => setHoveredRow(r.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td className="px-4 py-3">
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-mono font-semibold border border-violet-200 dark:border-violet-800"
                              >
                                {r.kode_rule}
                              </motion.span>
                            </td>
                            <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                              {r.nama_rule}
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {r.fact ? `${r.fact.code} - ${r.fact.fact_name}` : '-'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {r.tujuan ? `${r.tujuan.kode} - ${r.tujuan.nama}` : 
                                 isTahap1 ? <span className="text-gray-400 text-xs">Tahap 1</span> : '-'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {r.recommendation ? `${r.recommendation.code} - ${r.recommendation.recommendation_name}` : 
                                 isTahap1 ? <span className="text-gray-400 text-xs">Tahap 1</span> : '-'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                  r.status
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  r.status ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                                {r.status ? 'Aktif' : 'Nonaktif'}
                              </motion.span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <motion.button
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => openModal(r)}
                                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
                                >
                                  <Icons.Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    setDeleteId(r.id);
                                    setConfirmOpen(true);
                                  }}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
                                >
                                  <Icons.Delete className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </motion.button>
                              </div>
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
        )}
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Icons.Rules className="w-5 h-5 text-violet-500" />
                  {editing ? 'Edit' : 'Tambah'} Rule
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <Icons.Close className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6">
                <RuleForm 
                  rule={editing} 
                  onSuccess={handleSuccess} 
                  onCancel={() => setModalOpen(false)} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Rule"
        message="Apakah Anda yakin ingin menghapus rule ini? Data yang dihapus tidak dapat dikembalikan dan akan mempengaruhi sistem pakar."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />

      {/* Footer Info */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 bg-violet-400 rounded-full" />
          Rules digunakan sebagai logika inferensi dalam sistem pakar konsultasi
        </span>
        <span>Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
      </motion.div>
    </motion.div>
  );
};

export default RulesPage;