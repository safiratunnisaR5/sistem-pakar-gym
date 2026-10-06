import api from './axios';

// ===============================
// RULES (CRUD)
// ===============================

export const getRules = () =>
    api.get('/admin/rules');

export const getRule = (id) =>
    api.get(`/admin/rules/${id}`);

export const createRule = (data) =>
    api.post('/admin/rules', data);

export const updateRule = (id, data) =>
    api.put(`/admin/rules/${id}`, data);

export const deleteRule = (id) =>
    api.delete(`/admin/rules/${id}`);

// ===============================
// RULES - FILTERS
// ===============================

export const getRulesByFact = (factCode) =>
    api.get(`/admin/rules/by-fact/${factCode}`);

export const getRulesByGoal = (tujuanId) =>
    api.get(`/admin/rules/by-goal/${tujuanId}`);

export const getRulesTahap1 = () =>
    api.get('/admin/rules/tahap1');

export const getRulesTahap2 = () =>
    api.get('/admin/rules/tahap2');

// ===============================
// EXPORT DEFAULT
// ===============================

export default {
    getRules,
    getRule,
    createRule,
    updateRule,
    deleteRule,
    getRulesByFact,
    getRulesByGoal,
    getRulesTahap1,
    getRulesTahap2,
};