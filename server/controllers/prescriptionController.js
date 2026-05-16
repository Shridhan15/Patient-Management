import Prescription from '../models/Prescription.js';

// @desc    Create a new prescription for a patient
// @route   POST /api/prescriptions
export const createPrescription = async (req, res) => {
  try {
    const { patientId, symptoms, diagnosis, medicines, instructions, followUpDate } = req.body;

    // Strict validation check
    if (!patientId || !symptoms || !diagnosis || !medicines || medicines.length === 0) {
      return res.status(400).json({ message: 'Missing mandatory medical assessment fields.' });
    }

    const newPrescription = new Prescription({
      patientId,
      symptoms,
      diagnosis,
      medicines,
      instructions,
      followUpDate: followUpDate || null
    });

    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    res.status(500).json({ message: `Prescription generation failed: ${error.message}` });
  }
};

// @desc    Get complete prescription history for a specific patient
// @route   GET /api/prescriptions/patient/:patientId
export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const history = await Prescription.find({ patientId: req.params.patientId })
      .sort({ visitDate: -1 }); // Newest consultations on top of timeline
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve records: ${error.message}` });
  }
};