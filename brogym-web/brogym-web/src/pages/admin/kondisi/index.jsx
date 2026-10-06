import React, { useState } from 'react';
import CrudManager from '../../../components/common/CrudManager';
import { getKondisis, createKondisi, updateKondisi, deleteKondisi } from '../../../api/masterApi';

// Enhanced Icons
const Icons = {
  Conditions: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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
};

const KondisiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 sm:p-8 shadow-xl shadow-blue-500/20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
            <Icons.Conditions className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Data Kondisi</h1>
            <p className="text-white/80 text-sm sm:text-base mt-1">Kelola data kondisi kesehatan member</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Icons.Database className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Master Data</span>
            </div>
            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-white"
            >
              <Icons.Refresh className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-xs">Data Terbaru</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white text-xs">
              {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Cari kondisi berdasarkan kode atau nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
          />
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 shadow-sm">
          <Icons.Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Crud Manager */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-30" />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 overflow-hidden">
          <div className="p-6">
            <CrudManager
              key={refreshKey}
              title=""
              apiGet={getKondisis}
              apiCreate={createKondisi}
              apiUpdate={updateKondisi}
              apiDelete={deleteKondisi}
              fields={[
                { 
                  key: 'kode', 
                  label: 'Kode', 
                  type: 'text', 
                  required: true,
                  placeholder: 'Masukkan kode kondisi',
                },
                { 
                  key: 'nama', 
                  label: 'Nama', 
                  type: 'text', 
                  required: true,
                  placeholder: 'Masukkan nama kondisi',
                },
              ]}
              searchTerm={searchTerm}
              onRefresh={() => setRefreshKey(prev => prev + 1)}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-center text-xs text-gray-400">
        <span>Data kondisi digunakan untuk diagnosis konsultasi • Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
};

export default KondisiPage;