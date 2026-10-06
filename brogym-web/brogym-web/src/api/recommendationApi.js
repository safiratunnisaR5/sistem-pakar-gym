import api from './axios';

// ============================================================
// PUBLIC ENDPOINTS
// ============================================================

/**
 * Get all recommendations
 * @param {Object} params - Filter params (search, code)
 */
export const getRecommendations = (params) => api.get('/recommendations', { params });

/**
 * Get recommendation detail by code
 * @param {string} code - Recommendation code
 */
export const getRecommendation = (code) => api.get(`/recommendations/${code}`);

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

// ============================================================
// ADMIN ENDPOINTS
// ============================================================

/**
 * Create new recommendation
 * @param {Object} data - Recommendation data (code, recommendation_name, description, meal_codes, training_codes)
 */
export const createRecommendation = (data) => api.post('/admin/recommendations', data);

/**
 * Update recommendation
 * @param {string} code - Recommendation code
 * @param {Object} data - Recommendation data
 */
export const updateRecommendation = (code, data) => api.put(`/admin/recommendations/${code}`, data);

/**
 * Delete recommendation
 * @param {string} code - Recommendation code
 */
export const deleteRecommendation = (code) => api.delete(`/admin/recommendations/${code}`);

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
    getRecommendations,
    getRecommendation,
    getTopRecommendations,
    getRecommendationsByGoal,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
};