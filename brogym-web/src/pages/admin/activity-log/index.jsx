import React, { useState, useEffect } from 'react';
import { getActivityLogs } from '../../../api/dashboardApi';
import Loader from '../../../components/common/Loader';
import { useNotification } from '../../../context/NotificationContext';

// Ikon
const Icons = {
  Activity: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

const ActivityLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const { addNotification } = useNotification();

  const fetchData = async (page = 1, params = {}) => {
    try {
      setLoading(true);
      const payload = { page, ...params };
      if (search) payload.search = search;
      if (dateRange.start) payload.start_date = dateRange.start;
      if (dateRange.end) payload.end_date = dateRange.end;

      const res = await getActivityLogs(payload);
      setLogs(res.data.data || []);
      setPagination(res.data.pagination || {
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
      });
    } catch (error) {
      console.error('Gagal mengambil activity log:', error);
      addNotification('Gagal mengambil data activity log', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  const handleReset = () => {
    setSearch('');
    setDateRange({ start: '', end: '' });
    fetchData(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchData(newPage);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="card p-6">
      {/* Header dengan ikon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <Icons.Activity />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Activity Log</h1>
          <p className="text-sm text-secondary">Riwayat aktivitas pengguna di sistem</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Icons.Search />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-elegant pl-10"
                placeholder="Cari aktivitas atau user..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="input-elegant w-auto"
              placeholder="Mulai"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="input-elegant w-auto"
              placeholder="Selesai"
            />
          </div>
          <button type="submit" className="btn-primary">
            Filter
          </button>
        </form>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <Icons.Refresh />
          Reset
        </button>
      </div>

      {/* Total data */}
      <div className="text-sm text-secondary mb-3">
        Menampilkan {logs.length} dari {pagination.total} data
      </div>

      {/* Tabel */}
      {logs.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mt-4 text-secondary">Tidak ada aktivitas ditemukan</p>
          <p className="text-sm text-muted">Coba ubah filter atau cari dengan kata kunci lain</p>
        </div>
      ) : (
        <div className="border border-soft rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-soft">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Icons.User />
                    User
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Aktivitas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Icons.Clock />
                    Waktu
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft">
              {logs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors ${
                    index % 2 === 0 ? 'bg-card' : 'bg-gray-50/50 dark:bg-gray-800/30'
                  }`}
                >
                  <td className="px-4 py-3 text-primary">
                    {log.user?.name || '-'}
                  </td>
                  <td className="px-4 py-3 text-primary">
                    {log.activity || '-'}
                  </td>
                  <td className="px-4 py-3 text-secondary whitespace-nowrap">
                    {log.created_at ? new Date(log.created_at).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          <div className="text-sm text-secondary">
            Halaman {pagination.current_page} dari {pagination.last_page}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
              className="p-2 text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Halaman sebelumnya"
            >
              <Icons.ChevronLeft />
            </button>
            <span className="px-3 py-1 text-sm font-medium bg-accent text-white rounded-lg">
              {pagination.current_page}
            </span>
            {pagination.current_page < pagination.last_page && (
              <span className="text-muted">...</span>
            )}
            {pagination.current_page + 1 < pagination.last_page && (
              <span className="text-muted">...</span>
            )}
            {pagination.current_page !== pagination.last_page && (
              <button
                onClick={() => handlePageChange(pagination.last_page)}
                className="px-3 py-1 text-sm text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                {pagination.last_page}
              </button>
            )}
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
              className="p-2 text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Halaman berikutnya"
            >
              <Icons.ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogPage;