import api from './axios';

// Admin PDF
export const generateKonsultasiPDF = (id) => api.get(`/admin/pdf/konsultasi/${id}`, { responseType: 'blob' });
export const generateMemberPDF = (id) => api.get(`/admin/pdf/member/${id}`, { responseType: 'blob' });
export const generateSummaryPDF = (params) => api.get('/admin/pdf/summary', { params, responseType: 'blob' });

// Member PDF
export const generateMemberKonsultasiPDF = (id) => api.get(`/member/pdf/konsultasi/${id}`, { responseType: 'blob' });
export const generateMemberRiwayatPDF = () => api.get('/member/pdf/riwayat', { responseType: 'blob' });