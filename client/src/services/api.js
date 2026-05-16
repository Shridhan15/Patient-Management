import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Points directly to your Node.js server port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Centralized API calls for Patients
export const patientService = {
    register: (patientData) => API.post('/patients', patientData),
    getAll: (searchTerm = '') => API.get(`/patients?search=${searchTerm}`),
    getById: (id) => API.get(`/patients/${id}`),
};

export const prescriptionService = {
  create: (prescriptionData) => API.post('/prescriptions', prescriptionData),
  getByPatientId: (patientId) => API.get(`/prescriptions/patient/${patientId}`),
};

export default API;