import express from 'express';
import {
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient
} from '../controllers/patientController.js';

const router = express.Router();

// Route: /api/patients
router.route('/')
    .post(registerPatient) // Handles form submission from AddPatient.jsx
    .get(getPatients);     // Handles instant search field filtering

// Route: /api/patients/:id
router.route('/:id')
    .get(getPatientById) // Handles profile load in PatientProfile.jsx
    .put(updatePatient);

export default router;