import React, { useEffect, useState } from 'react';
import { getMyMembership } from '../../api/membershipApi';
import Loader from '../../components/common/Loader';
import { formatDate } from '../../utils/formatter';

// Ikon
const Icons = {
  Membership: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  History: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Empty: () => (
    <svg className="w-16 h-16 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
};

const Membership = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyMembership();
        setData(res.data.data);
      } catch (error) {
        console.error('Gagal ambil membership:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <Icons.Membership />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Membership Saya</h1>
          <p className="text-sm text-secondary">Lihat status dan riwayat membership Anda</p>
        </div>
      </div>

      {/* Membership Aktif */}
      <div className="card">
        {data?.active ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                <Icons.Check />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Membership Aktif
                </h3>
                <p className="text-sm text-secondary">
                  <span className="font-medium">Paket:</span>{' '}
                  {data.active.package?.name || '-'}
                </p>
                <p className="text-sm text-secondary">
                  <span className="font-medium">Berlaku hingga:</span>{' '}
                  {formatDate(data.active.end_date)}
                </p>
                <p className="text-sm text-secondary">
                  <span className="font-medium">Mulai:</span>{' '}
                  {formatDate(data.active.start_date)}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Aktif
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 mb-3">
              <Icons.Clock />
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
              Belum Ada Membership Aktif
            </h3>
            <p className="text-sm text-secondary mt-1">
              Anda belum memiliki membership aktif. Silakan hubungi admin untuk mendaftar.
            </p>
          </div>
        )}
      </div>

      {/* Riwayat Membership */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Icons.History className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-semibold text-primary">Riwayat Membership</h3>
        </div>

        {!data?.history || data.history.length === 0 ? (
          <div className="text-center py-8">
            <Icons.Empty />
            <p className="mt-4 text-secondary">Belum ada riwayat membership</p>
            <p className="text-sm text-muted">Anda belum memiliki riwayat membership sebelumnya</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-soft">
                <tr>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-soft">
                {data.history.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-accent/5 transition-colors ${
                      index % 2 === 0 ? 'bg-card' : 'bg-gray-50/50 dark:bg-gray-800/30'
                    }`}
                  >
                    <td className="px-4 py-3 text-primary font-medium">
                      {item.package?.name || '-'}
                    </td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {formatDate(item.start_date)}
                    </td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {formatDate(item.end_date)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;