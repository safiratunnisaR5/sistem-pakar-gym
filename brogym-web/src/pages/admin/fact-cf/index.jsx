import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFactCfs, getFacts, createFactCf, updateFactCf, deleteFactCf } from '../../../api/factApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

// Enhanced Icons
const Icons = {
  Cf: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
  Close: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
  Percent: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M5 5l14 14" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Code: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8l-4 4 4 4m10-8l4 4-4 4M15 4l-6 16" />
    </svg>
  ),
  Chart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
};

const FactCfPage = () => {
  const [data, setData] = useState([]);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [form, setForm] = useState({
    fact_code: '',
    cf_value: '',
  });
  const [error, setError] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cfRes, fRes] = await Promise.all([
        getFactCfs(),
        getFacts()
      ]);
      setData(cfRes.data || []);
      setFacts(fRes.data || []);
    } catch (error) {
      console.error(error);
      setError('Gagal mengambil data CF');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditing(item);
      setForm({
        fact_code: item.fact_code,
        cf_value: item.cf_value || '',
      });
    } else {
      setEditing(null);
      setForm({ fact_code: '', cf_value: '' });
    }
    setError('');
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        cf_value: parseFloat(form.cf_value),
      };
      if (editing) {
        await updateFactCf(editing.id, payload);
      } else {
        await createFactCf(payload);
      }
      setModalOpen(false);
      fetchData();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      setError(error.response?.data?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFactCf(deleteId);
      setConfirmOpen(false);
      fetchData();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  // Facts with CF already assigned
  const factsWithCf = data.map(d => d.fact_code);
  const availableFacts = facts.filter(f => !factsWithCf.includes(f.code));

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
        delay: i * 0.05,
        type: 'spring',
        stiffness: 150,
        damping: 15
      }
    }),
    hover: {
      scale: 1.01,
      backgroundColor: 'rgba(236, 72, 153, 0.05)',
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
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

  const filteredData = data.filter(item => {
    const fact = facts.find(f => f.code === item.fact_code);
    return item.fact_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           fact?.fact_name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <Loader />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Animated Gradient - Probability/Statistics Theme */}
      <motion.div
        variants={headerVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 p-6 sm:p-8 shadow-xl shadow-cyan-500/20"
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
            className="absolute -bottom-20 -left-20 w-48 h-48 bg-teal-300 rounded-full blur-3xl opacity-20"
          />
          {/* Floating math/probability symbols */}
          {['📊', '📈', '🎯', '💯', '⚡', '🔢'].map((emoji, i) => (
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
            <Icons.Cf className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Certainty Factor (Fakta)
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm sm:text-base mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Kelola nilai CF untuk setiap fakta sistem pakar
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
              <span className="text-white text-xs font-medium">{data.length} CF Values</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { fetchData(); setRefreshKey(prev => prev + 1); }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-white"
            >
              <Icons.Refresh className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Chart className="w-3 h-3 text-white/70" />
            <span className="text-white text-xs">Nilai Keyakinan</span>
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
            placeholder="Cari CF berdasarkan kode atau nama fakta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          disabled={availableFacts.length === 0}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icons.Plus className="w-4 h-4" />
          Tambah CF
          {availableFacts.length === 0 && (
            <span className="text-xs opacity-70">(Semua fakta sudah punya CF)</span>
          )}
        </motion.button>
      </motion.div>

      {/* Info Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Icons.Cf,
            title: 'Certainty Factor',
            description: 'Tingkat keyakinan sistem terhadap fakta',
            color: 'cyan'
          },
          {
            icon: Icons.Target,
            title: 'Akurasi Diagnosis',
            description: 'CF menentukan akurasi hasil konsultasi',
            color: 'teal'
          },
          {
            icon: Icons.Chart,
            title: 'Nilai 0-1',
            description: '0 = tidak yakin, 1 = sangat yakin',
            color: 'emerald'
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
        {error && (
          <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        
        <AnimatePresence mode="wait">
          {filteredData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <Icons.Cf className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data CF'}
              </p>
              <p className="text-sm text-gray-400">
                {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Tambahkan nilai CF untuk fakta yang tersedia'}
              </p>
              {!searchTerm && availableFacts.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal()}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Icons.Plus className="w-4 h-4 inline-block mr-2" />
                  Tambah CF
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
                    {['Kode Fakta', 'Nama Fakta', 'Nilai CF', 'Aksi'].map((header, i) => (
                      <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {header === 'Kode Fakta' && <Icons.Code className="w-3 h-3 inline-block mr-1" />}
                        {header === 'Nilai CF' && <Icons.Percent className="w-3 h-3 inline-block mr-1" />}
                        {header === 'Aksi' && '⚡'}
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence>
                    {filteredData.map((item, index) => {
                      const fact = facts.find(f => f.code === item.fact_code);
                      const cfPercentage = (item.cf_value * 100).toFixed(0);
                      const isHovered = hoveredRow === item.id;
                      
                      let cfColor = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
                      if (item.cf_value >= 0.7) {
                        cfColor = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
                      } else if (item.cf_value >= 0.4) {
                        cfColor = 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
                      } else {
                        cfColor = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
                      }

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
                        >
                          <td className="px-4 py-3">
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-mono font-semibold border border-cyan-200 dark:border-cyan-800"
                            >
                              {item.fact_code}
                            </motion.span>
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                            {fact?.fact_name || '-'}
                          </td>
                          <td className="px-4 py-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2"
                            >
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${cfColor}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  item.cf_value >= 0.7 ? 'bg-green-500' :
                                  item.cf_value >= 0.4 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} />
                                {cfPercentage}%
                              </span>
                              {/* Progress bar */}
                              <div className="flex-1 max-w-[80px] h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cfPercentage}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.05 }}
                                  className={`h-full rounded-full ${
                                    item.cf_value >= 0.7 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                    item.cf_value >= 0.4 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                                    'bg-gradient-to-r from-red-500 to-rose-500'
                                  }`}
                                />
                              </div>
                            </motion.div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openModal(item)}
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
                              >
                                <Icons.Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { setDeleteId(item.id); setConfirmOpen(true); }}
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
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Icons.Cf className="w-5 h-5 text-cyan-500" />
                  {editing ? 'Edit' : 'Tambah'} Certainty Factor
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {!editing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Pilih Fakta <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icons.Code className="w-4 h-4" />
                      </div>
                      <select
                        name="fact_code"
                        value={form.fact_code}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm appearance-none"
                        required
                      >
                        <option value="">Pilih Fakta</option>
                        {availableFacts.map(f => (
                          <option key={f.code} value={f.code}>{f.code} - {f.fact_name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {availableFacts.length === 0 && (
                      <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                        <span>⚠️</span> Semua fakta sudah memiliki nilai CF
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Fakta
                    </label>
                    <div className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700/30 rounded-xl text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {form.fact_code}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nilai CF (0-1) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Icons.Percent className="w-4 h-4" />
                    </div>
                    <input
                      name="cf_value"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={form.cf_value}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Contoh: 0.85"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Nilai antara 0 (tidak yakin) hingga 1 (sangat yakin)
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <span className="text-lg">⚠️</span>
                    {error}
                  </motion.div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Icons.Check className="w-4 h-4" />
                        Simpan
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={confirmOpen} 
        onClose={() => setConfirmOpen(false)} 
        onConfirm={handleDelete}
        title="Hapus Certainty Factor"
        message="Apakah Anda yakin ingin menghapus nilai CF ini? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi akurasi sistem pakar."
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
          <span className="w-1 h-1 bg-cyan-400 rounded-full" />
          Nilai CF menentukan tingkat keyakinan sistem terhadap fakta dalam diagnosis
        </span>
        <span>Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
      </motion.div>
    </motion.div>
  );
};

export default FactCfPage;