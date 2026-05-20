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
    update: (id, patientData) => API.put(`/patients/${id}`, patientData),
};

export const prescriptionService = {
    create: (prescriptionData) => API.post('/prescriptions', prescriptionData),
    getByPatientId: (patientId) => API.get(`/prescriptions/patient/${patientId}`),
};

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('doctorToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export const authService = {
    login: (credentials) => API.post('/auth/login', credentials),
    register: (doctorData) => API.post('/auth/register', doctorData),
};

export default API;