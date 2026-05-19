import Patient from '../models/Patient.js';

// @desc    Register a new patient
// @route   POST /api/patients
export const registerPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, address, notes } = req.body;

        // Create the new patient profile (phone uniqueness check removed)
        const newPatient = new Patient({
            name,
            age,
            gender,
            phone: phone || '', // Safe fallback if empty
            address,
            notes
        });

        const savedPatient = await newPatient.save();
        console.log(` New patient registered: ${savedPatient.name} (ID: ${savedPatient._id})`);
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: `Failed to register patient: ${error.message}` });
    }
};

// @desc    Get all patients or filter by search query (Instant Lookup)
// @route   GET /api/patients
export const getPatients = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        // If a search term exists, search name or phone using partial matching (regex)
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive text search
                    { phone: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Fetch matching patients, sort by newest registration first
        const patients = await Patient.find(query).sort({ createdAt: -1 });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

// @desc    Get a single patient profile by MongoDB ID
// @route   GET /api/patients/:id
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

// @desc    Update an existing patient profile
// @route   PUT /api/patients/:id
// Inside server/controllers/patientController.js

export const updatePatient = async (req, res) => {
    try {
        const { name, age, gender, phone, address, notes } = req.body;

        // 1. Fetch the existing document by ID
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        // 2. Manually overwrite the updated properties
        patient.name = name;
        patient.age = age;
        patient.gender = gender;
        patient.phone = phone || '';
        patient.address = address;
        patient.notes = notes;

        // 3. Save the document. This natively returns the fully updated data 
        // to the 'savedPatient' variable with zero driver warnings!
        const savedPatient = await patient.save();

        // 4. Stream the freshly saved data straight back to your React frontend
        res.status(200).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: `Update failed: ${error.message}` });
    }
};