import api from './axios';

// ============================================================
// PUBLIC ENDPOINTS
// ============================================================

/**
 * Get all facts - public
 */
export const getFacts = () => api.get('/facts');

/**
 * Get fact detail by code - public
 */
export const getFact = (code) => api.get(`/facts/${code}`);

// ============================================================
// ADMIN ENDPOINTS
// ============================================================

/**
 * Create new fact
 * @param {Object} data - Fact data (code, fact_name, condition_codes, description, cf_value)
 */
export const createFact = (data) => api.post('/admin/master/facts', data);

/**
 * Update fact
 * @param {string} code - Fact code
 * @param {Object} data - Fact data
 */
export const updateFact = (code, data) => api.put(`/admin/master/facts/${code}`, data);

/**
 * Delete fact
 * @param {string} code - Fact code
 */
export const deleteFact = (code) => api.delete(`/admin/master/facts/${code}`);

// ============================================================
// FACT CF
// ============================================================

/**
 * Get all fact CFs
 */
export const getFactCfs = () => api.get('/admin/master/fact-cf');

/**
 * Get fact CF by ID
 * @param {number} id - CF ID
 */
export const getFactCf = (id) => api.get(`/admin/master/fact-cf/${id}`);

/**
 * Get fact CF by fact code
 * @param {string} factCode - Fact code
 */
export const getFactCfByFact = (factCode) => api.get(`/admin/master/fact-cf/by-fact/${factCode}`);

/**
 * Create new fact CF
 * @param {Object} data - CF data (fact_code, cf_value)
 */
export const createFactCf = (data) => api.post('/admin/master/fact-cf', data);

/**
 * Update fact CF
 * @param {number} id - CF ID
 * @param {Object} data - CF data (cf_value)
 */
export const updateFactCf = (id, data) => api.put(`/admin/master/fact-cf/${id}`, data);

/**
 * Delete fact CF
 * @param {number} id - CF ID
 */
export const deleteFactCf = (id) => api.delete(`/admin/master/fact-cf/${id}`);

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
    getFacts,
    getFact,
    createFact,
    updateFact,
    deleteFact,
    getFactCfs,
    getFactCf,
    getFactCfByFact,
    createFactCf,
    updateFactCf,
    deleteFactCf,
};