import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, updateProfileMember } from '../../api/memberApi';
import Loader from '../../components/common/Loader';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatter';

// Icons (disingkat untuk kejelasan)
const Icons = {
  Profile: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Email: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Phone: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Gender: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-4-4h8" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Spinner: ({ className = "animate-spin h-4 w-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        const data = res.data;
        setProfile(data);
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.member?.phone || '',
          gender: data.member?.gender || 'L',
          birth_date: data.member?.birth_date || '',
        });
      } catch (error) {
        console.error(error);
        addNotification('Gagal mengambil data profil', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [addNotification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Nama wajib diisi';
    if (!form.email?.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid';
    if (!form.phone?.trim()) newErrors.phone = 'Telepon wajib diisi';
    if (!form.birth_date) newErrors.birth_date = 'Tanggal lahir wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      await updateProfileMember(form);
      setProfile({
        ...profile,
        name: form.name,
        email: form.email,
        member: {
          ...profile.member,
          phone: form.phone,
          gender: form.gender,
          birth_date: form.birth_date,
        },
      });
      setEditing(false);
      addNotification('Profil berhasil diperbarui', 'success');
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal update profil';
      addNotification(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!profile) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md mx-auto text-center py-12"
      >
        <Icons.Profile className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400 mt-4">Data tidak ditemukan</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 sm:p-8 shadow-xl shadow-blue-500/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
            <Icons.Profile className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Profil Saya</h1>
            <p className="text-white/80 text-sm sm:text-base mt-1">Kelola informasi data diri Anda</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Clock className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">
                {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
        {!editing ? (
          <div className="space-y-6 p-6 sm:p-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg shadow-blue-500/25">
                  {profile.name?.charAt(0).toUpperCase() || 'U'}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>
              </div>
              
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{profile.email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    profile.member?.membership?.status === 'aktif'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600'
                  }`}>
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {profile.member?.membership?.status === 'aktif' ? 'Member Aktif' : 'Member'}
                  </span>
                  {profile.member?.membership?.package && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800">
                      {profile.member.membership.package}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Detail Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
              {[
                { icon: Icons.Email, label: 'Email', value: profile.email, color: 'blue' },
                { icon: Icons.Phone, label: 'Telepon', value: profile.member?.phone || '-', color: 'green' },
                { icon: Icons.Gender, label: 'Jenis Kelamin', value: profile.member?.gender === 'L' ? 'Laki-laki' : 'Perempuan', color: 'purple' },
                { icon: Icons.Calendar, label: 'Tanggal Lahir', value: profile.member?.birth_date ? formatDate(profile.member.birth_date) : '-', color: 'pink' },
              ].map((field, index) => (
                <div key={index} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <p className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <field.icon className={`w-3 h-3 text-${field.color}-500`} />
                    {field.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 truncate">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Edit Button - PASTIKAN INI BEKERJA */}
            <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 font-medium cursor-pointer"
                type="button"
              >
                <Icons.Edit className="w-4 h-4" />
                Edit Profil
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Icons.Edit className="w-5 h-5 text-blue-500" />
                Edit Profil
              </h3>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200 cursor-pointer"
                aria-label="Tutup edit"
              >
                <Icons.Close />
              </button>
            </div>

            {[
              { id: 'name', label: 'Nama', type: 'text', required: true, icon: Icons.Profile },
              { id: 'email', label: 'Email', type: 'email', required: true, icon: Icons.Email },
              { id: 'phone', label: 'Telepon', type: 'tel', required: true, icon: Icons.Phone },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={`edit-${field.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <field.icon className="w-4 h-4" />
                  </div>
                  <input
                    id={`edit-${field.id}`}
                    name={field.id}
                    type={field.type}
                    value={form[field.id] || ''}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                      errors[field.id] 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    required={field.required}
                  />
                </div>
                {errors[field.id] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="edit-gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Jenis Kelamin
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Icons.Gender className="w-4 h-4" />
                </div>
                <select
                  id="edit-gender"
                  name="gender"
                  value={form.gender || 'L'}
                  onChange={handleChange}
                  className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm appearance-none"
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
            </div>

            <div>
              <label htmlFor="edit-birth_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Icons.Calendar className="w-4 h-4" />
                </div>
                <input
                  id="edit-birth_date"
                  name="birth_date"
                  type="date"
                  value={form.birth_date || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                    errors.birth_date 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                  required
                />
              </div>
              {errors.birth_date && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.birth_date}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 min-w-[120px] px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icons.Spinner className="animate-spin h-4 w-4" />
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Icons.Check className="w-4 h-4" />
                    Simpan Perubahan
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex justify-center text-xs text-gray-400">
        <span>Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
};

export default Profile;