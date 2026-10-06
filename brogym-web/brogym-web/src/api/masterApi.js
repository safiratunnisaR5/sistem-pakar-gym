import api from './axios';

// ============================================================
// PUBLIC ENDPOINTS (untuk Member & semua user login)
// ============================================================

/**
 * Get all goals (tujuan) - public
 */
export const getTujuans = () => api.get('/tujuan');

/**
 * Get all diseases (penyakit) - public
 */
export const getPenyakits = () => api.get('/penyakit');

/**
 * Get all conditions (kondisi) - public
 */
export const getKondisisPublic = () => api.get('/kondisi');

/**
 * Get all facts - public
 */
export const getFacts = () => api.get('/facts');

/**
 * Get fact detail by code - public
 */
export const getFactDetail = (code) => api.get(`/facts/${code}`);

/**
 * Get all recommendations - public
 */
export const getRecommendations = (params) => api.get('/recommendations', { params });

/**
 * Get recommendation detail by code - public
 */
export const getRecommendationDetail = (code) => api.get(`/recommendations/${code}`);

// ============================================================
// ADMIN ENDPOINTS (hanya Admin)
// ============================================================

// ========== GYM PROFILE ==========
export const getGymProfile = () => api.get('/admin/master/gym-profile');
export const updateGymProfile = (data) => api.put('/admin/master/gym-profile', data);

// ========== KONDISI (CRUD Admin) ==========
export const getKondisis = () => api.get('/admin/master/kondisi');
export const createKondisi = (data) => api.post('/admin/master/kondisi', data);
export const updateKondisi = (id, data) => api.put(`/admin/master/kondisi/${id}`, data);
export const deleteKondisi = (id) => api.delete(`/admin/master/kondisi/${id}`);

// ========== TUJUAN (CRUD Admin) ==========
export const createTujuan = (data) => api.post('/admin/master/tujuan', data);
export const updateTujuan = (id, data) => api.put(`/admin/master/tujuan/${id}`, data);
export const deleteTujuan = (id) => api.delete(`/admin/master/tujuan/${id}`);

// ========== PENYAKIT (CRUD Admin) ==========
export const createPenyakit = (data) => api.post('/admin/master/penyakit', data);
export const updatePenyakit = (id, data) => api.put(`/admin/master/penyakit/${id}`, data);
export const deletePenyakit = (id) => api.delete(`/admin/master/penyakit/${id}`);

// ========== MEMBERSHIP PACKAGES ==========
export const getPackages = () => api.get('/admin/master/packages');
export const createPackage = (data) => api.post('/admin/master/packages', data);
export const updatePackage = (id, data) => api.put(`/admin/master/packages/${id}`, data);
export const deletePackage = (id) => api.delete(`/admin/master/packages/${id}`);

// ========== FACTS (CRUD Admin) ==========
export const createFact = (data) => api.post('/admin/master/facts', data);
export const updateFact = (code, data) => api.put(`/admin/master/facts/${code}`, data);
export const deleteFact = (code) => api.delete(`/admin/master/facts/${code}`);

// ========== FACT CF (CRUD Admin) ==========
export const getFactCfs = () => api.get('/admin/master/fact-cf');
export const getFactCf = (id) => api.get(`/admin/master/fact-cf/${id}`);
export const getFactCfByFact = (factCode) => api.get(`/admin/master/fact-cf/by-fact/${factCode}`);
export const createFactCf = (data) => api.post('/admin/master/fact-cf', data);
export const updateFactCf = (id, data) => api.put(`/admin/master/fact-cf/${id}`, data);
export const deleteFactCf = (id) => api.delete(`/admin/master/fact-cf/${id}`);

// ========== MEAL PLANS (CRUD Admin) ==========
export const getMealPlans = () => api.get('/admin/master/meal-plans');
export const createMealPlan = (data) => api.post('/admin/master/meal-plans', data);
export const updateMealPlan = (code, data) => api.put(`/admin/master/meal-plans/${code}`, data);
export const deleteMealPlan = (code) => api.delete(`/admin/master/meal-plans/${code}`);

// ========== TRAINING PROGRAMS (CRUD Admin) ==========
export const getTrainingPrograms = () => api.get('/admin/master/training-programs');
export const createTrainingProgram = (data) => api.post('/admin/master/training-programs', data);
export const updateTrainingProgram = (code, data) => api.put(`/admin/master/training-programs/${code}`, data);
export const deleteTrainingProgram = (code) => api.delete(`/admin/master/training-programs/${code}`);

// ============================================================
// ========== RECOMMENDATIONS (CRUD Admin) ==========
// ============================================================

/**
 * Get all recommendations for admin
 */
export const getRecommendationsAdmin = () => api.get('/admin/recommendations');

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
    // Public
    getTujuans,
    getPenyakits,
    getKondisisPublic,
    getFacts,
    getFactDetail,
    getRecommendations,
    getRecommendationDetail,

    // Gym Profile
    getGymProfile,
    updateGymProfile,

    // Kondisi
    getKondisis,
    createKondisi,
    updateKondisi,
    deleteKondisi,

    // Tujuan
    createTujuan,
    updateTujuan,
    deleteTujuan,

    // Penyakit
    createPenyakit,
    updatePenyakit,
    deletePenyakit,

    // Membership Packages
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,

    // Facts
    createFact,
    updateFact,
    deleteFact,

    // Fact CF
    getFactCfs,
    getFactCf,
    getFactCfByFact,
    createFactCf,
    updateFactCf,
    deleteFactCf,

    // Meal Plans
    getMealPlans,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan,

    // Training Programs
    getTrainingPrograms,
    createTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,

    // Recommendations (Admin)
    getRecommendationsAdmin,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
};