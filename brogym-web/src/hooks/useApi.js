import { useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      return { data: response.data, error: null };
    } catch (err) {
      const message = err.response?.data?.message || 'Terjadi kesalahan';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, callApi };
};