import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook untuk mengakses AuthContext
 * Gunakan di komponen manapun yang membutuhkan data auth
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Default export
export default useAuth;