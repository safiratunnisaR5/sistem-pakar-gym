import api from './axios';

export const updateProfileMember = (data) => api.put('/member/profile', data);
// ========== MEMBER PROFILE (untuk member yang login) ==========
export const updateProfile = (data) => api.put('/admin/members/' + data.id, data); // butuh id member

// ========== ADMIN CRUD MEMBER ==========
export const getMember = (id) => api.get(`/admin/members/${id}`);
export const createMember = (data) => api.post('/admin/members', data);
export const getMembers = (params) => api.get('/admin/members', { params });
export const getMemberDetail = (id) => api.get(`/admin/members/${id}`);
export const updateMember = (id, data) => api.put(`/admin/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/admin/members/${id}`);

// Member own profile (jika ada endpoint)
export const getMyProfile = () => api.get('/member/profile');
export const updateMyProfile = (data) => api.put('/member/profile', data);
export const getProfile = () => api.get('/me'); // atau endpoint member profile
