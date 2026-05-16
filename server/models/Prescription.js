import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true
    },
    dosage: {
        type: String, // e.g., "1-0-1" or "5ml" or "Once daily"
        required: [true, 'Dosage pattern is required'],
        trim: true
    },
    duration: {
        type: String, // e.g., "3 Days" or "2 Weeks"
        required: [true, 'Duration is required'],
        trim: true
    }
});

const prescriptionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient', // Establishes the relationship back to the Patient model
            required: [true, 'Prescription must be linked to a valid patient profile'],
            index: true // Optimized to fetch history instantly on the profile timeline
        },
        visitDate: {
            type: Date,
            default: Date.now  
        },
        symptoms: {
            type: String,
            required: [true, 'Symptoms description is required'],
            trim: true
        },
        diagnosis: {
            type: String,
            required: [true, 'Diagnosis is required'],
            trim: true
        },
        medicines: [medicineSchema],  
        instructions: {
            type: String,  
            trim: true,
            default: ''
        },
        followUpDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;