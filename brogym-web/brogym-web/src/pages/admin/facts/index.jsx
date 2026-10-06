import React, { useState, useEffect } from 'react';
import { getFacts, createFact, updateFact, deleteFact } from '../../../api/factApi';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

// Enhanced Icons
const Icons = {
  Fact: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
  Code: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8l-4 4 4 4m10-8l4 4-4 4M15 4l-6 16" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Brain: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Link: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  Percent: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M5 5l14 14" />
    </svg>
  ),
};

const FactsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [form, setForm] = useState({
    code: '',
    fact_name: '',
    condition_codes: '',
    description: '',
    cf_value: '',
  });
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getFacts();
      setData(res.data || []);
    } catch (error) {
      console.error(error);
      setError('Gagal mengambil data fakta');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditing(item);
      setForm({
        code: item.code,
        fact_name: item.fact_name,
        condition_codes: item.condition_codes || '',
        description: item.description || '',
        cf_value: item.cf?.cf_value || '',
      });
    } else {
      setEditing(null);
      setForm({ code: '', fact_name: '', condition_codes: '', description: '', cf_value: '' });
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
        cf_value: form.cf_value ? parseFloat(form.cf_value) : null,
      };
      if (editing) {
        await updateFact(editing.code, payload);
      } else {
        await createFact(payload);
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
      await deleteFact(deleteId);
      setConfirmOpen(false);
      fetchData();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  // Handler untuk tombol Edit
  const handleEditClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit clicked for:', item.code);
    openModal(item);
  };

  // Handler untuk tombol Delete
  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete clicked for:', id);
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const filteredData = data.filter(item =>
    item.fact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.condition_codes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header with Gradient - Knowledge/Science Theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-6 sm:p-8 shadow-xl shadow-purple-500/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-300 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
            <Icons.Fact className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Data Fakta</h1>
            <p className="text-white/80 text-sm sm:text-base mt-1">Kelola data fakta sistem pakar (F1-F27)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Database className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">{data.length} Facts</span>
            </div>
            <button
              onClick={() => { fetchData(); setRefreshKey(prev => prev + 1); }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-white"
            >
              <Icons.Refresh className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Brain className="w-3 h-3 text-white/70" />
            <span className="text-white text-xs">Fakta Sistem Pakar</span>
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
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari fakta berdasarkan kode, nama, atau kondisi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 text-sm font-medium flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          Tambah Fakta
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Icons.Fact, title: 'Fakta Sistem', description: 'F1 - F27 untuk knowledge base' },
          { icon: Icons.Link, title: 'Kondisi Pembentuk', description: 'Fakta dibangun dari kondisi-kondisi' },
          { icon: Icons.Percent, title: 'Nilai CF', description: 'Certainty Factor untuk akurasi' }
        ].map((info, index) => (
          <div key={index} className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <info.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{info.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{info.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50">
        {error && (
          <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <Icons.Fact className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data fakta'}
            </p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Tambahkan fakta baru untuk sistem pakar'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal()}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <Icons.Plus className="w-4 h-4 inline-block mr-2" />
                Tambah Fakta
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kode</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Fakta</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kondisi</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">CF</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.map((item) => (
                  <tr key={item.code} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-mono font-semibold border border-purple-200 dark:border-purple-800">
                        {item.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                      {item.fact_name}
                    </td>
                    <td className="px-4 py-3">
                      {item.condition_codes ? (
                        <div className="flex flex-wrap gap-1">
                          {item.condition_codes.split(',').map((code, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs font-mono border border-blue-200 dark:border-blue-800"
                            >
                              <Icons.Link className="w-2.5 h-2.5" />
                              {code.trim()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.cf ? (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          item.cf.cf_value >= 0.8
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                            : item.cf.cf_value >= 0.5
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.cf.cf_value >= 0.8 ? 'bg-green-500' :
                            item.cf.cf_value >= 0.5 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                          {(item.cf.cf_value * 100).toFixed(0)}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td 
                      className="px-4 py-3 text-center"
                      style={{ position: 'relative', zIndex: 9999 }}
                    >
                      <div 
                        className="flex items-center justify-center gap-1.5"
                        style={{ position: 'relative', zIndex: 9999 }}
                      >
                        {/* Tombol Edit */}
                        <button
                          type="button"
                          onClick={(e) => handleEditClick(e, item)}
                          style={{ 
                            pointerEvents: 'auto', 
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 9999
                          }}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
                        >
                          <Icons.Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        
                        {/* Tombol Delete */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteClick(e, item.code)}
                          style={{ 
                            pointerEvents: 'auto', 
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 9999
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
                        >
                          <Icons.Delete className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Icons.Fact className="w-5 h-5 text-purple-500" />
                {editing ? 'Edit' : 'Tambah'} Fakta
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <Icons.Close className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Kode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Code className="w-4 h-4" />
                  </div>
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Contoh: F1"
                    required
                    disabled={!!editing}
                  />
                </div>
                {editing && (
                  <p className="mt-1 text-xs text-gray-400">Kode tidak dapat diubah</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama Fakta <span className="text-red-500">*</span>
                </label>
                <input
                  name="fact_name"
                  value={form.fact_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Masukkan nama fakta"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Kondisi Pembentuk
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Link className="w-4 h-4" />
                  </div>
                  <input
                    name="condition_codes"
                    value={form.condition_codes}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Contoh: K1, K4, K6, K8"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">Pisahkan dengan koma (,) untuk multiple conditions</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm resize-y min-h-[80px]"
                  placeholder="Masukkan deskripsi fakta"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nilai CF (0-1)
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
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Contoh: 0.85"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">Nilai antara 0 (tidak yakin) hingga 1 (sangat yakin)</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
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
        title="Hapus Fakta"
        message="Apakah Anda yakin ingin menghapus fakta ini? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi sistem pakar."
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 bg-purple-400 rounded-full" />
          Data fakta digunakan sebagai knowledge base sistem pakar konsultasi
        </span>
        <span>Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
};

export default FactsPage;