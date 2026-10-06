import React, { useState, useEffect } from 'react';
import { getMembers, updateMember, deleteMember } from '../../../api/memberApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

// Ikon
const Icons = {
  Members: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Delete: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Empty: () => (
    <svg className="w-16 h-16 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getMembers();
      setMembers(res.data.data || []);
    } catch (error) {
      setError('Gagal mengambil data member');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEdit = (member) => {
    setEditing(member);
    setFormData({
      name: member.user.name,
      email: member.user.email,
      phone: member.phone || '',
      gender: member.gender || 'L',
      birth_date: member.birth_date || '',
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name?.trim()) return 'Nama wajib diisi';
    if (!formData.email?.trim()) return 'Email wajib diisi';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Format email tidak valid';
    if (!formData.phone?.trim()) return 'Telepon wajib diisi';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setSaving(true);
    try {
      await updateMember(editing.id, formData);
      alert('Member berhasil diperbarui');
      setModalOpen(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal update member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMember(deleteId);
      alert('Member berhasil dihapus');
      setConfirmOpen(false);
      fetchData();
    } catch (error) {
      alert('Gagal hapus member');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <Icons.Members />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Data Member</h1>
          <p className="text-sm text-secondary">Kelola seluruh data member gym</p>
        </div>
      </div>

      {/* Tabel */}
      <div className="card p-0 overflow-hidden">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button onClick={fetchData} className="mt-4 btn-primary">Coba Lagi</button>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <Icons.Empty />
            <p className="mt-4 text-lg text-secondary">Belum ada data member</p>
            <p className="text-sm text-muted">Data member akan muncul setelah pendaftaran</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-soft">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Telepon
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft">
                {members.map((m, index) => (
                  <tr
                    key={m.id}
                    className={`hover:bg-accent/5 transition-colors ${
                      index % 2 === 0 ? 'bg-card' : 'bg-gray-50/50 dark:bg-gray-800/30'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-medium">
                          {m.user?.name?.charAt(0).toUpperCase() || 'M'}
                        </div>
                        <span className="text-primary font-medium">{m.user?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary">{m.user?.email}</td>
                    <td className="px-4 py-3 text-primary">{m.phone || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        m.gender === 'L' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                          : 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300'
                      }`}>
                        {m.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEdit(m)}
                          className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                          aria-label="Edit member"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(m.id);
                            setConfirmOpen(true);
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label="Hapus member"
                        >
                          <Icons.Delete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Edit */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-elevated max-w-md w-full mx-4 p-6 border border-soft transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex items-center justify-between mb-4">
              <h3 id="edit-modal-title" className="text-xl font-semibold text-primary">
                Edit Member
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-muted hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Tutup modal"
              >
                <Icons.Close />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-secondary mb-1">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="input-elegant"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-email" className="block text-sm font-medium text-secondary mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="input-elegant"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-phone" className="block text-sm font-medium text-secondary mb-1">
                  Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="input-elegant"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-gender" className="block text-sm font-medium text-secondary mb-1">
                  Gender
                </label>
                <select
                  id="edit-gender"
                  name="gender"
                  value={formData.gender || 'L'}
                  onChange={handleChange}
                  className="input-elegant"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div>
                <label htmlFor="edit-birth_date" className="block text-sm font-medium text-secondary mb-1">
                  Tanggal Lahir
                </label>
                <input
                  id="edit-birth_date"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date || ''}
                  onChange={handleChange}
                  className="input-elegant"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-secondary bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Menyimpan...
                    </span>
                  ) : (
                    'Simpan'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Member"
        message="Apakah Anda yakin ingin menghapus data member ini? Data yang dihapus tidak dapat dikembalikan."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default MembersPage;