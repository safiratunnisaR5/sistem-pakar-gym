import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getKondisis, getTujuans, getFacts, getRecommendations } from '../../api/masterApi';
import { createRule, updateRule } from '../../api/ruleApi';
import { useNotification } from '../../context/NotificationContext';

// Enhanced Icons
const Icons = {
  Code: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Name: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Condition: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Fact: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Recommendation: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Status: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Spinner: ({ className = "animate-spin h-5 w-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Info: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const RuleForm = ({ rule = null, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    kode_rule: '',
    nama_rule: '',
    fact_code: '',
    tujuan_id: '',
    recommendation_code: '',
    status: true,
    kondisi_ids: [],
    cf_expert: 0.8,
  });
  const [kondisis, setKondisis] = useState([]);
  const [tujuans, setTujuans] = useState([]);
  const [facts, setFacts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const { addNotification } = useNotification();

  const isTahap1 = form.fact_code && !form.tujuan_id && !form.recommendation_code;
  const isTahap2 = form.fact_code && form.tujuan_id && form.recommendation_code;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [k, t, f, r] = await Promise.all([
          getKondisis(),
          getTujuans(),
          getFacts(),
          getRecommendations(),
        ]);
        
        const kondisiData = k.data?.data || k.data || k || [];
        const tujuanData = t.data?.data || t.data || t || [];
        const factsData = f.data?.data || f.data || f || [];
        const recommendationsData = r.data?.data || r.data || r || [];
        
        setKondisis(kondisiData);
        setTujuans(tujuanData);
        setFacts(factsData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching master data:', error);
        addNotification('Gagal memuat data master', 'error');
      }
    };
    fetchData();
  }, [addNotification]);

  useEffect(() => {
    if (rule) {
      setForm({
        kode_rule: rule.kode_rule || '',
        nama_rule: rule.nama_rule || '',
        fact_code: rule.fact_code || '',
        tujuan_id: rule.tujuan_id || '',
        recommendation_code: rule.recommendation_code || '',
        status: rule.status !== undefined ? rule.status : true,
        kondisi_ids: rule.details?.map(d => d.condition_code) || [],
        cf_expert: rule.details?.[0]?.cf_expert || 0.8,
      });
    }
  }, [rule]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleKondisiChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setForm(prev => ({ ...prev, kondisi_ids: selected }));
    if (errors.kondisi_ids) {
      setErrors(prev => ({ ...prev, kondisi_ids: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.kode_rule.trim()) newErrors.kode_rule = 'Kode rule wajib diisi';
    if (!form.nama_rule.trim()) newErrors.nama_rule = 'Nama rule wajib diisi';
    if (!form.fact_code) newErrors.fact_code = 'Fakta wajib dipilih';
    if (!form.kondisi_ids || form.kondisi_ids.length === 0) {
      newErrors.kondisi_ids = 'Pilih minimal 1 kondisi';
    }
    if (form.tujuan_id && !form.recommendation_code) {
      newErrors.recommendation_code = 'Rekomendasi wajib dipilih untuk rule Tahap 2';
    }
    if (form.recommendation_code && !form.tujuan_id) {
      newErrors.tujuan_id = 'Tujuan wajib dipilih untuk rule Tahap 2';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        tujuan_id: form.tujuan_id || null,
        recommendation_code: form.recommendation_code || null,
      };

      if (rule) {
        await updateRule(rule.id, payload);
        addNotification('Rule berhasil diperbarui', 'success');
      } else {
        await createRule(payload);
        addNotification('Rule berhasil dibuat', 'success');
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal menyimpan rule';
      addNotification(message, 'error');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
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
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
      transition: { duration: 0.2 }
    },
    blurred: {
      scale: 1,
      boxShadow: '0 0 0 0px rgba(99, 102, 241, 0)',
      transition: { duration: 0.2 }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Animated background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="relative">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl"
          >
            <svg className="w-6 h-6 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {rule ? 'Edit Rule' : 'Buat Rule Baru'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTahap1 ? '🔵 Tahap 1: Kondisi → Fakta' : 
               isTahap2 ? '🟢 Tahap 2: Fakta + Tujuan → Rekomendasi' : 
               'Atur kondisi, fakta, tujuan, dan rekomendasi'}
            </p>
          </div>
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <Icons.Close />
            </motion.button>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Kode Rule & Nama Rule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="kode_rule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Icons.Code className="w-4 h-4 text-indigo-500" />
                  Kode Rule
                </span>
              </label>
              <motion.div 
                className="relative"
                variants={inputVariants}
                animate={focusedField === 'kode_rule' ? 'focused' : 'blurred'}
              >
                <input
                  id="kode_rule"
                  type="text"
                  name="kode_rule"
                  value={form.kode_rule}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('kode_rule')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm ${
                    errors.kode_rule ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="Contoh: R1"
                  disabled={!!rule}
                  required
                />
              </motion.div>
              <AnimatePresence>
                {errors.kode_rule && (
                  <motion.p
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors.kode_rule}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="nama_rule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Icons.Name className="w-4 h-4 text-indigo-500" />
                  Nama Rule
                </span>
              </label>
              <motion.div 
                className="relative"
                variants={inputVariants}
                animate={focusedField === 'nama_rule' ? 'focused' : 'blurred'}
              >
                <input
                  id="nama_rule"
                  type="text"
                  name="nama_rule"
                  value={form.nama_rule}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('nama_rule')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm ${
                    errors.nama_rule ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="Nama rule"
                  required
                />
              </motion.div>
              <AnimatePresence>
                {errors.nama_rule && (
                  <motion.p
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors.nama_rule}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Fakta */}
          <motion.div variants={itemVariants}>
            <label htmlFor="fact_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Fact className="w-4 h-4 text-indigo-500" />
                Fakta
              </span>
            </label>
            <div className="relative">
              <select
                id="fact_code"
                name="fact_code"
                value={form.fact_code}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm appearance-none ${
                  errors.fact_code ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                required
              >
                <option value="">Pilih Fakta</option>
                {Array.isArray(facts) && facts.map((f) => (
                  <option key={f.code} value={f.code}>
                    {f.code} - {f.fact_name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.fact_code && (
                <motion.p
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.fact_code}
                </motion.p>
              )}
            </AnimatePresence>
            {form.fact_code && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 text-xs text-gray-400 flex items-center gap-1.5"
              >
                <Icons.Info className="w-3 h-3" />
                {isTahap1 ? '🔵 Rule Tahap 1: Kondisi → Fakta' : 
                 form.tujuan_id && form.recommendation_code ? '🟢 Rule Tahap 2: Fakta + Tujuan → Rekomendasi' : 
                 '⚠️ Pilih Tujuan dan Rekomendasi untuk Tahap 2'}
              </motion.p>
            )}
          </motion.div>

          {/* Kondisi */}
          <motion.div variants={itemVariants}>
            <label htmlFor="kondisi_ids" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Condition className="w-4 h-4 text-indigo-500" />
                Kondisi (pilih lebih dari satu)
              </span>
            </label>
            <select
              id="kondisi_ids"
              multiple
              name="kondisi_ids"
              value={form.kondisi_ids}
              onChange={handleKondisiChange}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm h-32 ${
                errors.kondisi_ids ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              {Array.isArray(kondisis) && kondisis.map((k) => (
                <option key={k.id} value={k.kode}>
                  {k.kode} - {k.nama}
                </option>
              ))}
            </select>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Tekan Ctrl (Cmd) untuk memilih lebih dari satu</span>
              {form.kondisi_ids.length > 0 && (
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-full">
                  {form.kondisi_ids.length} kondisi dipilih
                </span>
              )}
            </div>
            <AnimatePresence>
              {errors.kondisi_ids && (
                <motion.p
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.kondisi_ids}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CF Expert */}
          <motion.div variants={itemVariants}>
            <label htmlFor="cf_expert" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              CF Expert (0 - 1)
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="range"
                  id="cf_expert"
                  name="cf_expert"
                  min="0"
                  max="1"
                  step="0.01"
                  value={form.cf_expert}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${form.cf_expert * 100}%, #e5e7eb ${form.cf_expert * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <motion.span 
                className="text-sm font-bold text-indigo-600 dark:text-indigo-400 min-w-[50px] text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={form.cf_expert}
              >
                {Math.round(form.cf_expert * 100)}%
              </motion.span>
            </div>
            <AnimatePresence>
              {errors.cf_expert && (
                <motion.p
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.cf_expert}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tahap 2: Tujuan & Rekomendasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="tujuan_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Icons.Target className="w-4 h-4 text-indigo-500" />
                  Tujuan
                </span>
              </label>
              <div className="relative">
                <select
                  id="tujuan_id"
                  name="tujuan_id"
                  value={form.tujuan_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm appearance-none ${
                    errors.tujuan_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <option value="">Tahap 1 (Tanpa Tujuan)</option>
                  {Array.isArray(tujuans) && tujuans.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.kode} - {t.nama}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {errors.tujuan_id && (
                  <motion.p
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors.tujuan_id}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="recommendation_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Icons.Recommendation className="w-4 h-4 text-indigo-500" />
                  Rekomendasi
                </span>
              </label>
              <div className="relative">
                <select
                  id="recommendation_code"
                  name="recommendation_code"
                  value={form.recommendation_code}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm appearance-none ${
                    errors.recommendation_code ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <option value="">Tahap 1 (Tanpa Rekomendasi)</option>
                  {Array.isArray(recommendations) && recommendations.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code} - {r.recommendation_name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {errors.recommendation_code && (
                  <motion.p
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors.recommendation_code}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Status */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-700">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={form.status}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 transition-colors duration-200"
              />
              <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2">
                <Icons.Status className="w-4 h-4 text-indigo-500" />
                Status Aktif
              </label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Spinner />
                  {rule ? 'Memperbarui...' : 'Menyimpan...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Check className="w-5 h-5" />
                  {rule ? 'Perbarui Rule' : 'Simpan Rule'}
                </span>
              )}
            </motion.button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-1 h-1 rounded-full bg-indigo-500/30"
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
            className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-purple-500/30"
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

export default RuleForm;