import React, { useState, useEffect } from 'react';
import { getGymProfile, updateGymProfile } from '../../../api/masterApi';
import Loader from '../../../components/common/Loader';

// Ikon
const Icons = {
  Gym: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Spinner: () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
};

const GymProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getGymProfile();
      const data = res.data.data || res.data || {};
      setProfile(data);
      setForm(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Gagal mengambil profil gym');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Nama gym wajib diisi';
    if (!form.address?.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!form.phone?.trim()) newErrors.phone = 'Telepon wajib diisi';
    if (!form.email?.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid';
    if (!form.operational_hours?.trim()) newErrors.operational_hours = 'Jam operasional wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      await updateGymProfile(form);
      alert('Profil gym berhasil diperbarui');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal update profil gym');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <Icons.Gym />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Profil Gym</h1>
          <p className="text-sm text-secondary">Kelola informasi dan data gym Anda</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Gym */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
              Nama Gym <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name || ''}
              onChange={handleChange}
              className={`input-elegant ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Masukkan nama gym"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Alamat */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-secondary mb-1">
              Alamat <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address || ''}
              onChange={handleChange}
              rows="3"
              className={`input-elegant ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Masukkan alamat lengkap gym"
              required
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
          </div>

          {/* Telepon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1">
              Telepon <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone || ''}
              onChange={handleChange}
              className={`input-elegant ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Contoh: 081234567890"
              required
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email || ''}
              onChange={handleChange}
              className={`input-elegant ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="contoh@gym.com"
              required
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Jam Operasional */}
          <div>
            <label htmlFor="operational_hours" className="block text-sm font-medium text-secondary mb-1">
              Jam Operasional <span className="text-red-500">*</span>
            </label>
            <input
              id="operational_hours"
              name="operational_hours"
              type="text"
              value={form.operational_hours || ''}
              onChange={handleChange}
              className={`input-elegant ${errors.operational_hours ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Contoh: Senin-Jumat 08:00-22:00"
              required
            />
            {errors.operational_hours && <p className="mt-1 text-xs text-red-500">{errors.operational_hours}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-secondary mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description || ''}
              onChange={handleChange}
              rows="3"
              className="input-elegant"
              placeholder="Deskripsi singkat tentang gym Anda"
            />
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Icons.Spinner />
                  Menyimpan...
                </span>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GymProfilePage;