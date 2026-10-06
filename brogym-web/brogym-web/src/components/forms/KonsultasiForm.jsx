import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createKonsultasi } from '../../api/konsultasiApi';
import { getTujuans, getPenyakits } from '../../api/masterApi';

// Enhanced Icons (sama seperti sebelumnya)
const Icons = {
  Weight: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  Activity: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Meal: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Level: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Target: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  Disease: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Spinner: ({ className = "animate-spin h-4 w-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Close: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Confidence: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

const KonsultasiForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tujuans, setTujuans] = useState([]);
  const [penyakits, setPenyakits] = useState([]);
  const [errors, setErrors] = useState({});
  const [manualPenyakit, setManualPenyakit] = useState('');
  const [customPenyakits, setCustomPenyakits] = useState([]);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  
  // Ref untuk tombol submit
  const submitButtonRef = useRef(null);

  const [form, setForm] = useState({
    tinggi_badan: '',
    berat_badan: '',
    aktivitas_olahraga: 'jarang',
    pola_makan_harian: 'tidak_teratur',
    level_latihan: 'pemula',
    tujuan_id: '',
    penyakit_ids: [],
    user_cf: 1.0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, pRes] = await Promise.all([getTujuans(), getPenyakits()]);
        setTujuans(tRes.data.data || tRes.data || []);
        setPenyakits(pRes.data.data || pRes.data || []);
      } catch (error) {
        console.error('Gagal load data master:', error);
        setErrors({ global: 'Gagal memuat data form. Silakan refresh halaman.' });
      }
    };
    fetchData();
  }, []);

  // Calculate form progress
  useEffect(() => {
    let progress = 0;
    const fields = ['tinggi_badan', 'berat_badan', 'tujuan_id'];
    const filled = fields.filter(f => form[f] && form[f] !== '').length;
    progress = (filled / fields.length) * 60;
    if (form.penyakit_ids.length > 0) progress += 20;
    if (form.user_cf > 0) progress += 20;
    setFormProgress(Math.min(progress, 100));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const id = parseInt(value);
      let newIds = form.penyakit_ids.includes(id)
        ? form.penyakit_ids.filter(item => item !== id)
        : [...form.penyakit_ids, id];
      setForm({ ...form, penyakit_ids: newIds });
      setErrors({ ...errors, penyakit_ids: undefined });
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleAddManualPenyakit = () => {
    const trimmed = manualPenyakit.trim();
    if (!trimmed) return;

    const existingInForm = form.penyakit_ids.some(id => 
      penyakits.find(p => p.id === id && p.nama.toLowerCase() === trimmed.toLowerCase())
    );

    const existingInCustom = customPenyakits.some(p => 
      p.nama.toLowerCase() === trimmed.toLowerCase()
    );

    if (existingInForm || existingInCustom) {
      alert(`Penyakit "${trimmed}" sudah ditambahkan`);
      return;
    }

    const newId = -(customPenyakits.length + 1);
    const newCustom = { id: newId, nama: trimmed };
    
    setCustomPenyakits([...customPenyakits, newCustom]);
    setForm({
      ...form,
      penyakit_ids: [...form.penyakit_ids, newId]
    });
    
    setManualPenyakit('');
  };

  const handleRemoveCustomPenyakit = (id) => {
    setCustomPenyakits(customPenyakits.filter(p => p.id !== id));
    setForm({
      ...form,
      penyakit_ids: form.penyakit_ids.filter(item => item !== id)
    });
  };

  const handleCustomPenyakitToggle = (id) => {
    let newIds = [...form.penyakit_ids];
    if (newIds.includes(id)) {
      newIds = newIds.filter(item => item !== id);
    } else {
      newIds.push(id);
    }
    setForm({ ...form, penyakit_ids: newIds });
  };

  const handlePenyakitCheckbox = (id, isCustom) => {
    if (isCustom) {
      handleCustomPenyakitToggle(id);
    } else {
      let newIds = [...form.penyakit_ids];
      if (newIds.includes(id)) {
        newIds = newIds.filter(item => item !== id);
      } else {
        newIds.push(id);
      }
      setForm({ ...form, penyakit_ids: newIds });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.tinggi_badan || form.tinggi_badan < 50 || form.tinggi_badan > 250) {
      newErrors.tinggi_badan = 'Tinggi badan harus antara 50-250 cm';
    }
    if (!form.berat_badan || form.berat_badan < 20 || form.berat_badan > 300) {
      newErrors.berat_badan = 'Berat badan harus antara 20-300 kg';
    }
    if (!form.tujuan_id) {
      newErrors.tujuan_id = 'Pilih 1 tujuan';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked!'); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed'); // Debug log
      return;
    }

    setLoading(true);
    try {
      const penyakitIds = form.penyakit_ids.filter(id => id > 0);
      const penyakitCustom = form.penyakit_ids
        .filter(id => id < 0)
        .map(id => {
          const found = customPenyakits.find(p => p.id === id);
          return found?.nama || '';
        })
        .filter(Boolean);

      const payload = {
        ...form,
        tinggi_badan: parseFloat(form.tinggi_badan) || 0,
        berat_badan: parseFloat(form.berat_badan) || 0,
        tujuan_id: parseInt(form.tujuan_id) || 0,
        penyakit_ids: penyakitIds,
        penyakit_custom: penyakitCustom,
        user_cf: parseFloat(form.user_cf) || 1.0,
      };

      console.log('Submitting payload:', payload); // Debug log

      const response = await createKonsultasi(payload);
      const konsultasiId = response.data.data.konsultasi_id;
      navigate(`/member/hasil-konsultasi/${konsultasiId}`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error konsultasi:', error);
      if (error.response?.data?.errors) {
        const formatted = {};
        Object.entries(error.response.data.errors).forEach(([key, val]) => {
          formatted[key] = Array.isArray(val) ? val.join(', ') : val;
        });
        setErrors(formatted);
      } else {
        setErrors({ global: error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const allPenyakits = [...penyakits, ...customPenyakits];

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

  const fieldVariants = {
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
    })
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${formProgress}%`,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto"
      style={{ pointerEvents: 'auto' }}
    >
      <motion.div 
        variants={itemVariants}
        className="card bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"
          >
            <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Form Konsultasi</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Isi data berikut untuk mendapatkan rekomendasi program latihan</p>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Progress Form</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{Math.round(formProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {errors.global && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
          >
            <span className="text-lg">⚠️</span>
            {errors.global}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" style={{ pointerEvents: 'auto' }}>
          {/* Tinggi & Berat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'tinggi_badan', label: 'Tinggi Badan (cm)', icon: Icons.Weight, type: 'text', inputMode: 'numeric', pattern: '[0-9]*', placeholder: 'Misal: 170' },
              { name: 'berat_badan', label: 'Berat Badan (kg)', icon: Icons.Weight, type: 'text', inputMode: 'numeric', pattern: '[0-9]*', placeholder: 'Misal: 65' },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                custom={index}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                style={{ pointerEvents: 'auto' }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <field.icon className="w-4 h-4 text-blue-500" />
                    {field.label}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    inputMode={field.inputMode}
                    pattern={field.pattern}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                      errors[field.name] 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 dark:border-gray-600'
                    } ${focusedField === field.name ? 'ring-2 ring-blue-500/20' : ''}`}
                    required
                    placeholder={field.placeholder}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {errors[field.name]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Aktivitas Olahraga */}
          <motion.div 
            variants={fieldVariants} 
            custom={2}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Activity className="w-4 h-4 text-blue-500" />
                Aktivitas Olahraga
              </span>
            </label>
            <select
              name="aktivitas_olahraga"
              value={form.aktivitas_olahraga}
              onChange={handleSelectChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none cursor-pointer"
              style={{ 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 11
              }}
            >
              <option value="jarang">Jarang</option>
              <option value="sering">Sering</option>
            </select>
          </motion.div>

          {/* Pola Makan */}
          <motion.div 
            variants={fieldVariants} 
            custom={3}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Meal className="w-4 h-4 text-blue-500" />
                Pola Makan Harian
              </span>
            </label>
            <select
              name="pola_makan_harian"
              value={form.pola_makan_harian}
              onChange={handleSelectChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none cursor-pointer"
              style={{ 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 11
              }}
            >
              <option value="tidak_teratur">Tidak Teratur</option>
              <option value="sehat">Sehat</option>
            </select>
          </motion.div>

          {/* Level Latihan */}
          <motion.div 
            variants={fieldVariants} 
            custom={4}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Level className="w-4 h-4 text-blue-500" />
                Level Latihan
              </span>
            </label>
            <select
              name="level_latihan"
              value={form.level_latihan}
              onChange={handleSelectChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none cursor-pointer"
              style={{ 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 11
              }}
            >
              <option value="pemula">Pemula</option>
              <option value="menengah">Menengah</option>
              <option value="lanjutan">Lanjutan</option>
            </select>
          </motion.div>

          {/* Tujuan */}
          <motion.div 
            variants={fieldVariants} 
            custom={5}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Target className="w-4 h-4 text-blue-500" />
                Tujuan
              </span>
              {errors.tujuan_id && (
                <span className="ml-2 text-xs text-red-500">{errors.tujuan_id}</span>
              )}
            </label>
            <select
              name="tujuan_id"
              value={form.tujuan_id}
              onChange={handleSelectChange}
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none cursor-pointer ${
                errors.tujuan_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
              }`}
              style={{ 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 11
              }}
              required
            >
              <option value="">-- Pilih Tujuan --</option>
              {tujuans.map(t => (
                <option key={t.id} value={t.id}>{t.nama}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">Pilih 1 tujuan yang ingin Anda capai</p>
          </motion.div>

          {/* CF USER (SLIDER) */}
          <motion.div variants={fieldVariants} custom={6}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Icons.Confidence className="w-4 h-4 text-blue-500" />
                Tingkat Keyakinan Data
              </span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="range"
                  name="user_cf"
                  min="0"
                  max="1"
                  step="0.01"
                  value={form.user_cf}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${form.user_cf * 100}%, #e5e7eb ${form.user_cf * 100}%, #e5e7eb 100%)`,
                    pointerEvents: 'auto'
                  }}
                />
              </div>
              <motion.span 
                className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[50px] text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={form.user_cf}
              >
                {Math.round(form.user_cf * 100)}%
              </motion.span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Tidak Yakin</span>
              <span>Sangat Yakin</span>
            </div>
          </motion.div>

          {/* PENYAKIT */}
          <motion.div 
            variants={fieldVariants} 
            custom={7}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Icons.Disease className="w-4 h-4 text-blue-500" />
                Penyakit (pilih dari daftar atau tulis sendiri)
              </span>
            </label>

            {/* Input Penyakit Manual */}
            <div className="flex gap-2 mb-3" style={{ pointerEvents: 'auto' }}>
              <input
                type="text"
                value={manualPenyakit}
                onChange={(e) => setManualPenyakit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddManualPenyakit();
                  }
                }}
                placeholder="Tulis penyakit lain..."
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                style={{ pointerEvents: 'auto' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleAddManualPenyakit}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-1.5 text-sm font-medium"
                style={{ pointerEvents: 'auto' }}
              >
                <Icons.Plus className="w-4 h-4" />
                Tambah
              </motion.button>
            </div>

            {/* Daftar Penyakit */}
            <div className="flex flex-wrap gap-2 min-h-[40px]" style={{ pointerEvents: 'auto' }}>
              <AnimatePresence>
                {allPenyakits.length === 0 ? (
                  <span className="text-gray-400 text-sm">Tidak ada data penyakit</span>
                ) : (
                  allPenyakits.map(p => {
                    const isSelected = form.penyakit_ids.includes(p.id);
                    const isCustom = p.id < 0;
                    return (
                      <motion.div
                        key={p.id}
                        variants={chipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? isCustom
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30'
                              : 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg shadow-red-500/30'
                            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                        }`}
                        onClick={() => handlePenyakitCheckbox(p.id, isCustom)}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <input
                          type="checkbox"
                          name="penyakit_ids"
                          value={p.id}
                          checked={isSelected}
                          onChange={() => handlePenyakitCheckbox(p.id, isCustom)}
                          className="hidden"
                          style={{ pointerEvents: 'auto' }}
                        />
                        {isSelected && <Icons.Check className="w-3 h-3" />}
                        {p.nama}
                        {isCustom && isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCustomPenyakit(p.id);
                            }}
                            className="ml-0.5 text-white/70 hover:text-white transition-colors"
                            style={{ pointerEvents: 'auto' }}
                          >
                            <Icons.Close className="w-3 h-3" />
                          </button>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
            <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
              <span className="text-lg">💡</span>
              Penyakit yang ditulis sendiri akan muncul dengan warna ungu
            </p>
          </motion.div>

          {/* Submit Button - FIXED with highest z-index */}
          <motion.div 
            variants={itemVariants} 
            className="pt-2 relative"
            style={{ 
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 9999
            }}
          >
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={loading}
              id="submit-konsultasi"
              className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 font-medium disabled:opacity-60 text-base"
              style={{ 
                pointerEvents: 'auto !important',
                cursor: loading ? 'not-allowed' : 'pointer',
                position: 'relative',
                zIndex: 99999,
                opacity: loading ? 0.6 : 1
              }}
              onClick={(e) => {
                console.log('Button clicked manually!');
                // If for some reason the form submit doesn't work, trigger it manually
                if (e.target.closest('form')) {
                  // Let the form handle it
                }
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Spinner className="animate-spin h-5 w-5" />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Check className="w-5 h-5" />
                  Konsultasi
                </span>
              )}
            </button>
            
            {/* Debug overlay - akan hilang jika tombol bisa diklik */}
            <div 
              className="absolute inset-0 pointer-events-none border-2 border-red-500 border-dashed rounded-xl opacity-50"
              style={{ zIndex: 99998 }}
            />
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default KonsultasiForm;