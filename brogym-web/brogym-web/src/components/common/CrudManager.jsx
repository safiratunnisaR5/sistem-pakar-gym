import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import ConfirmModal from './ConfirmModal';

// Enhanced Icons
const Icons = {
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
  Empty: ({ className = "w-20 h-20" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
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
  Search: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Database: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Refresh: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

const CrudManager = ({
  title,
  apiGet,
  apiCreate,
  apiUpdate,
  apiDelete,
  fields,
  primaryKey = 'id',
  defaultValues = {},
  onSuccess = null,
  onError = null,
  searchTerm = '',
  onRefresh = null,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet();
      setData(res.data.data || res.data || []);
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.');
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item = null) => {
    setEditingItem(item);
    const initial = {};
    fields.forEach((f) => {
      initial[f.key] = item ? (item[f.key] ?? defaultValues[f.key] ?? '') : (defaultValues[f.key] ?? '');
    });
    setFormData(initial);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editingItem) {
        await apiUpdate(editingItem[primaryKey], formData);
      } else {
        await apiCreate(formData);
      }
      if (onSuccess) onSuccess();
      closeModal();
      fetchData();
      setRefreshKey(prev => prev + 1);
      if (onRefresh) onRefresh();
    } catch (err) {
      const message = err.response?.data?.message || 'Terjadi kesalahan';
      alert(message);
      if (onError) onError(err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await apiDelete(deleteId);
      setConfirmOpen(false);
      fetchData();
      setRefreshKey(prev => prev + 1);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Gagal menghapus data');
      if (onError) onError(err);
    }
  };

  // Filter data berdasarkan search
  const filteredData = searchTerm
    ? data.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return fields.some((f) => {
          const value = item[f.key];
          return value && String(value).toLowerCase().includes(searchLower);
        });
      })
    : data;

  // Handler untuk tombol Edit - menggunakan onMouseDown
  const handleEditClick = (item) => {
    console.log('Edit clicked for:', item);
    openModal(item);
  };

  // Handler untuk tombol Delete - menggunakan onMouseDown
  const handleDeleteClick = (id) => {
    console.log('Delete clicked for:', id);
    setDeleteId(id);
    setConfirmOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="card p-0 overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <span className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/20">
            <Icons.Database className="w-6 h-6" />
          </span>
          {title}
          <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
            {data.length}
          </span>
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto relative z-10">
          <button
            onClick={() => { fetchData(); setRefreshKey(prev => prev + 1); if (onRefresh) onRefresh(); }}
            className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
          >
            <Icons.Refresh className="w-4 h-4" />
          </button>

          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 dark:bg-gray-200 dark:text-indigo-800 dark:hover:bg-gray-100 whitespace-nowrap"
          >
            <Icons.Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>

      {/* Tabel / Konten */}
      <div className="p-4">
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16">
            <Icons.Empty className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Data tidak ditemukan' : 'Belum ada data'}
            </p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Coba kata kunci lain' : 'Klik "Tambah" untuk memulai'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal()}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                <Icons.Plus className="w-4 h-4 inline-block mr-2" />
                Tambah Data
              </button>
            )}
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto" ref={tableRef}>
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    {fields.map((f) => (
                      <th
                        key={f.key}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {f.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      ⚡ Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.map((item) => (
                    <tr 
                      key={item[primaryKey]} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      {fields.map((f) => (
                        <td key={f.key} className="px-4 py-3 text-gray-900 dark:text-white">
                          {f.render ? f.render(item[f.key], item) : (item[f.key] ?? '-')}
                        </td>
                      ))}
                      <td 
                        className="px-4 py-3 text-center"
                        style={{ position: 'relative', zIndex: 10 }}
                      >
                        <div 
                          className="flex items-center justify-center gap-1"
                          style={{ position: 'relative', zIndex: 20 }}
                        >
                          {/* Tombol Edit - menggunakan onMouseDown */}
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEditClick(item);
                            }}
                            className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200 group cursor-pointer"
                            type="button"
                            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
                          >
                            <Icons.Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                          
                          {/* Tombol Delete - menggunakan onMouseDown */}
                          <button
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteClick(item[primaryKey]);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group cursor-pointer"
                            type="button"
                            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
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
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={closeModal}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full mx-4 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-6 pt-6 pb-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 id="form-modal-title" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">
                    {editingItem ? '✏️' : '➕'}
                  </span>
                  {editingItem ? 'Edit' : 'Tambah'} {title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <Icons.Close />
                </button>
              </div>

              <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <label
                        htmlFor={`field-${f.key}`}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      >
                        {f.label}
                        {f.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {f.type === 'select' ? (
                        <div className="relative">
                          <select
                            id={`field-${f.key}`}
                            name={f.key}
                            value={formData[f.key] || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm appearance-none"
                            required={f.required}
                          >
                            <option value="">Pilih...</option>
                            {f.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      ) : f.type === 'textarea' ? (
                        <textarea
                          id={`field-${f.key}`}
                          name={f.key}
                          value={formData[f.key] || ''}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm resize-y"
                          required={f.required}
                          placeholder={f.placeholder || ''}
                        />
                      ) : f.type === 'checkbox' ? (
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            type="checkbox"
                            id={`field-${f.key}`}
                            name={f.key}
                            checked={formData[f.key] || false}
                            onChange={handleChange}
                            className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 transition-colors duration-200"
                          />
                          <label htmlFor={`field-${f.key}`} className="text-sm text-gray-600 dark:text-gray-400">
                            {f.label}
                          </label>
                        </div>
                      ) : (
                        <input
                          type={f.type || 'text'}
                          id={`field-${f.key}`}
                          name={f.key}
                          value={formData[f.key] || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                          required={f.required}
                          placeholder={f.placeholder || ''}
                        />
                      )}
                      {f.help && (
                        <p className="mt-1 text-xs text-gray-400">{f.help}</p>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={modalLoading}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {modalLoading ? (
                        <>
                          <Icons.Spinner />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Icons.Plus className="w-4 h-4" />
                          Simpan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Data"
        message="Data yang dihapus tidak dapat dikembalikan. Lanjutkan?"
        variant="danger"
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />

      {/* CSS untuk memastikan tombol dapat diklik */}
      <style jsx>{`
        .crud-action-cell {
          position: relative;
          z-index: 9999 !important;
        }
        .crud-action-cell button {
          position: relative;
          z-index: 9999 !important;
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        .crud-action-cell .flex {
          position: relative;
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  );
};

export default CrudManager;