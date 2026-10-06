import api from './axios';

// ============================================================
// MEMBER ENDPOINTS
// ============================================================

/**
 * Create new consultation
 * @param {Object} data - Consultation data (tinggi_badan, berat_badan, aktivitas_olahraga, pola_makan_harian, level_latihan, tujuan_id, penyakit_ids, penyakit_custom, user_cf)
 */
export const createKonsultasi = (data) => api.post('/konsultasi', data);

/**
 * Get consultation history for current member
 * @param {Object} params - Pagination params (per_page, page)
 */
export const getHistories = (params) => api.get('/history', { params });

/**
 * Get consultation history (alias for getHistories)
 */
export const getConsultationHistory = (params) => api.get('/history', { params });

/**
 * Get detail of a specific consultation by ID
 * @param {number|string} id - Consultation ID
 */
export const getHistoryDetail = (id) => api.get(`/history/${id}`);

/**
 * Get consultation detail (alias for getHistoryDetail)
 */
export const getConsultationDetail = (id) => api.get(`/history/${id}`);

/**
 * Get latest consultation for current member
 */
export const getLatestConsultation = () => api.get('/history/latest');

/**
 * Get consultation details (consultation_details) for current member
 * @param {number|string} id - Consultation ID
 */
export const getConsultationDetails = (id) => api.get(`/history/${id}/details`);

// ============================================================
// ADMIN ENDPOINTS
// ============================================================

/**
 * Get all consultations for admin (with pagination)
 * @param {Object} params - Filter and pagination params (per_page, page, search, date_from, date_to)
 */
export const getConsultationsAdmin = (params) => api.get('/admin/konsultasi', { params });

/**
 * Get consultations for admin (alias for getConsultationsAdmin)
 */
export const getConsultations = (params) => api.get('/admin/konsultasi', { params });

/**
 * Delete a consultation by ID (admin only)
 * @param {number|string} id - Consultation ID
 */
export const deleteConsultation = (id) => api.delete(`/admin/konsultasi/${id}`);

/**
 * Get consultation detail for admin
 * @param {number|string} id - Consultation ID
 */
export const getConsultationDetailAdmin = (id) => api.get(`/admin/konsultasi/${id}`);

// ============================================================
// RECOMMENDATION ENDPOINTS
// ============================================================

/**
 * Get all recommendations
 * @param {Object} params - Filter params (search, code)
 */
export const getRecommendations = (params) => api.get('/recommendations', { params });

/**
 * Get top recommendations (most popular)
 * @param {Object} params - Params (limit)
 */
export const getTopRecommendations = (params) => api.get('/recommendations/top', { params });

/**
 * Get recommendations by goal code
 * @param {string} goalCode - Goal code (T1, T2, T3, T4)
 */
export const getRecommendationsByGoal = (goalCode) => api.get(`/recommendations/by-goal/${goalCode}`);

/**
 * Get recommendation detail by code
 * @param {string} code - Recommendation code
 */
export const getRecommendationDetail = (code) => api.get(`/recommendations/${code}`);

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
    // Member
    createKonsultasi,
    getHistories,
    getConsultationHistory,
    getHistoryDetail,
    getConsultationDetail,
    getLatestConsultation,
    getConsultationDetails,

    // Admin
    getConsultationsAdmin,
    getConsultations,
    deleteConsultation,
    getConsultationDetailAdmin,

    // Recommendations
    getRecommendations,
    getTopRecommendations,
    getRecommendationsByGoal,
    getRecommendationDetail,
};