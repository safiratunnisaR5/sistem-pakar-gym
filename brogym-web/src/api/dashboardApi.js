import api from './axios';

export const getAdminDashboard = () =>
  api.get("/admin/dashboard");

export const getMemberDashboard = () =>
  api.get("/member/dashboard");

export const getActivityLogs = (params = {}) =>
  api.get("/admin/activity-logs", { params });

export const generateKonsultasiPdf = (id) =>
  api.get(`/pdf/konsultasi/${id}`, {
    responseType: 'blob'
  });

export const generateMemberPdf = (id) =>
  api.get(`/pdf/member/${id}`, {
    responseType: 'blob'
  });

export const generateSummaryPdf = (params = {}) =>
  api.get('/pdf/summary', {
    params,
    responseType: 'blob'
  });