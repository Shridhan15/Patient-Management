import express from 'express';
import { createPrescription, getPrescriptionsByPatient } from '../controllers/prescriptionController.js';
import { protect } from '../middlewares/authMiddleware.js';
 

const router = express.Router();

router.route('/').post(protect, createPrescription);
router.route('/patient/:patientId').get(getPrescriptionsByPatient);

export default router;