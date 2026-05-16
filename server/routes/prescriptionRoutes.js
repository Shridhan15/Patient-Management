import express from 'express';
import { createPrescription, getPrescriptionsByPatient } from '../controllers/prescriptionController.js';

const router = express.Router();

router.route('/').post(createPrescription);
router.route('/patient/:patientId').get(getPrescriptionsByPatient);

export default router;