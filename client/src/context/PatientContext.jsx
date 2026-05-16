import React, { createContext, useState, useEffect, useContext } from 'react';
import { patientService } from '../services/api.js';
import toast from 'react-hot-toast';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Core API fetcher function
  const fetchPatients = async (query = '') => {
    setLoading(true);
    try {
      const response = await patientService.getAll(query);
      setPatients(response.data);
    } catch (error) {
      console.error('Error syncing global patient data:', error);
      toast.error('Failed to pull records from the server.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search watcher
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatients(search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Expose a quick trigger to refresh data (useful after a new registration)
  const refreshPatients = () => fetchPatients(search);

  return (
    <PatientContext.Provider value={{ 
      patients, 
      search, 
      setSearch, 
      loading, 
      refreshPatients 
    }}>
      {children}
    </PatientContext.Provider>
  );
};

// Custom hook for easier execution in components
export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be utilized within a PatientProvider hierarchy');
  }
  return context;
};