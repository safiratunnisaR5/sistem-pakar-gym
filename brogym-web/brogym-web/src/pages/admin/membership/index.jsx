import React, { useState, useEffect } from 'react';
import { getMemberships, createMembership, updateMembership, deleteMembership } from '../../../api/membershipApi';
import { getMembers } from '../../../api/memberApi';
import { getPackages } from '../../../api/masterApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

// Ikon
const Icons = {
  Membership: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
};

const MembershipPage = () => {
  const [data, setData] = useState([]);
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    member_id: '',
    package_id: '',
    start_date: '',
    end_date: '',
  });
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [membershipsRes, membersRes, packagesRes] = await Promise.all([
        getMemberships(),
        getMembers(),
        getPackages(),
      ]);

      setData(membershipsRes?.data?.data || membershipsRes?.data || []);
      setMembers(membersRes?.data?.data || membersRes?.data || []);
      setPackages(packagesRes?.data?.data || packagesRes?.data || []);
    } catch (error) {
      console.error('Error fetch data:', error);
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditing(item);
      setForm({
        member_id: item.member_id,
        package_id: item.package_id,
        start_date: item.start_date?.split('T')[0] || '',
        end_date: item.end_date?.split('T')[0] || '',
      });
    } else {
      setEditing(null);
      setForm({
        member_id: '',
        package_id: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
      });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.member_id) return 'Silakan pilih member';
    if (!form.package_id) return 'Silakan pilih paket';
    if (!form.start_date) return 'Tanggal mulai wajib diisi';
    if (!form.end_date) return 'Tanggal berakhir wajib diisi';
    if (new Date(form.end_date) <= new Date(form.start_date)) {
      return 'Tanggal berakhir harus setelah tanggal mulai';
    }
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
      if (editing) {
        await updateMembership(editing.id, form);
        alert('Membership berhasil diperbarui');
      } else {
        await createMembership(form);
        alert('Membership berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error save:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMembership(deleteId);
      alert('Membership dinonaktifkan');
      setConfirmOpen(false);
      fetchData();
    } catch (error) {
      alert('Gagal menonaktifkan');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            <Icons.Membership />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Data Membership</h1>
            <p className="text-sm text-secondary">Kelola seluruh data membership member</p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors shadow-sm"
        >
          <Icons.Plus />
          Tambah Membership
        </button>
      </div>

      {/* Tabel */}
      <div className="card p-0 overflow-hidden">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button onClick={fetchData} className="mt-4 btn-primary">Coba Lagi</button>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16">
            <Icons.Empty />
            <p className="mt-4 text-lg text-secondary">Belum ada data membership</p>
            <p className="text-sm text-muted">Klik "Tambah Membership" untuk menambahkan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-soft">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Paket
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Mulai
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Berakhir
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft">
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-accent/5 transition-colors ${
                      index % 2 === 0 ? 'bg-card' : 'bg-gray-50/50 dark:bg-gray-800/30'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-medium">
                          {item.member?.user?.name?.charAt(0).toUpperCase() || 'M'}
                        </div>
                        <span className="text-primary">{item.member?.user?.name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary">{item.package?.name || '-'}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {item.start_date ? new Date(item.start_date).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {item.end_date ? new Date(item.end_date).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'aktif'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openModal(item)}
                          className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                          aria-label="Edit membership"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => {
                            if (item.status === 'aktif') {
                              setDeleteId(item.id);
                              setConfirmOpen(true);
                            } else {
                              alert('Membership sudah tidak aktif');
                            }
                          }}
                          disabled={item.status !== 'aktif'}
                          className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            item.status === 'aktif'
                              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                          }`}
                          aria-label="Nonaktifkan membership"
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

      {/* Modal Form */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="membership-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-elevated max-w-md w-full mx-4 p-6 border border-soft transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex items-center justify-between mb-4">
              <h3 id="membership-modal-title" className="text-xl font-semibold text-primary">
                {editing ? 'Edit' : 'Tambah'} Membership
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
                <label htmlFor="member_id" className="block text-sm font-medium text-secondary mb-1">
                  Member <span className="text-red-500">*</span>
                </label>
                <select
                  id="member_id"
                  name="member_id"
                  value={form.member_id}
                  onChange={handleChange}
                  className="input-elegant"
                  required
                  disabled={editing}
                >
                  <option value="">Pilih Member</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.user?.name} ({m.user?.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="package_id" className="block text-sm font-medium text-secondary mb-1">
                  Paket <span className="text-red-500">*</span>
                </label>
                <select
                  id="package_id"
                  name="package_id"
                  value={form.package_id}
                  onChange={handleChange}
                  className="input-elegant"
                  required
                >
                  <option value="">Pilih Paket</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - Rp{p.price} / {p.duration_days} hari
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium text-secondary mb-1">
                    Mulai <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="input-elegant"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium text-secondary mb-1">
                    Berakhir <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="input-elegant"
                    required
                  />
                </div>
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
        title="Nonaktifkan Membership"
        message="Apakah Anda yakin ingin menonaktifkan membership ini? Member akan kehilangan akses ke fasilitas gym."
        variant="danger"
        confirmText="Ya, Nonaktifkan"
        cancelText="Batal"
      />
    </div>
  );
};

export default MembershipPage;