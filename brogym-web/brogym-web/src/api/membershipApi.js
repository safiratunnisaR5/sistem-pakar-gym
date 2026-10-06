import api from './axios';

// Admin
export const getMemberships = (params) => api.get('/admin/memberships', { params });
export const createMembership = (data) => api.post('/admin/memberships', data);
export const updateMembership = (id, data) => api.put(`/admin/memberships/${id}`, data);
export const deleteMembership = (id) => api.delete(`/admin/memberships/${id}`);
export const getMembershipDetail = (id) => api.get(`/admin/memberships/${id}`);
export const getMyMembership = () => api.get('/my-membership');