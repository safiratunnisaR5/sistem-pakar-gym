import React, { useState } from 'react';
import { generateSummaryPDF, generateKonsultasiPDF, generateMemberPDF } from '../../../api/pdfApi';

// Ikon
const Icons = {
  Summary: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Consultation: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Member: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  PDF: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
};

const LaporanPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const [form, setForm] = useState({ start_date: '', end_date: '' });
  const [memberId, setMemberId] = useState('');
  const [konsultasiId, setKonsultasiId] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const downloadPDF = async (apiCall, filename, type) => {
    setLoading(true);
    setLoadingType(type);
    try {
      const response = await apiCall();
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error download PDF:', error);
      alert('Gagal generate PDF: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      setLoadingType('');
    }
  };

  const reportSections = [
    {
      id: 'summary',
      title: 'Laporan Summary',
      description: 'Ringkasan data gym dalam periode tertentu',
      icon: Icons.Summary,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      content: (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary">Dari</span>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="input-elegant w-auto min-w-[150px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary">Sampai</span>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="input-elegant w-auto min-w-[150px]"
              />
            </div>
            <button
              onClick={() => downloadPDF(
                () => generateSummaryPDF({ start_date: form.start_date, end_date: form.end_date }),
                `laporan-summary-${form.start_date || 'all'}-${form.end_date || 'all'}.pdf`,
                'summary'
              )}
              disabled={loading}
              className="btn-primary ml-auto"
            >
              {loadingType === 'summary' ? (
                <span className="flex items-center gap-2">
                  <Icons.Spinner />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icons.PDF />
                  Download Summary
                </span>
              )}
            </button>
          </div>
        </>
      ),
    },
    {
      id: 'consultation',
      title: 'Laporan Detail Konsultasi',
      description: 'Laporan lengkap hasil konsultasi member',
      icon: Icons.Consultation,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      content: (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <input
                type="number"
                placeholder="ID Konsultasi"
                value={konsultasiId}
                onChange={(e) => setKonsultasiId(e.target.value)}
                className="input-elegant"
              />
            </div>
            <button
              onClick={() => downloadPDF(
                () => generateKonsultasiPDF(konsultasiId),
                `konsultasi-${konsultasiId}.pdf`,
                'consultation'
              )}
              disabled={loading || !konsultasiId}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {loadingType === 'consultation' ? (
                <span className="flex items-center gap-2">
                  <Icons.Spinner />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icons.PDF />
                  Download
                </span>
              )}
            </button>
          </div>
        </>
      ),
    },
    {
      id: 'member',
      title: 'Laporan Data Member',
      description: 'Laporan lengkap data member gym',
      icon: Icons.Member,
      iconColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      content: (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <input
                type="number"
                placeholder="ID Member"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="input-elegant"
              />
            </div>
            <button
              onClick={() => downloadPDF(
                () => generateMemberPDF(memberId),
                `member-${memberId}.pdf`,
                'member'
              )}
              disabled={loading || !memberId}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {loadingType === 'member' ? (
                <span className="flex items-center gap-2">
                  <Icons.Spinner />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icons.PDF />
                  Download
                </span>
              )}
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Laporan</h1>
          <p className="text-sm text-secondary">Generate dan download berbagai jenis laporan</p>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-4">
        {reportSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="card hover:shadow-elevated transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${section.bgColor} flex-shrink-0`}>
                  <div className={section.iconColor}>
                    <Icon />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
                  <p className="text-sm text-secondary mb-3">{section.description}</p>
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LaporanPage;