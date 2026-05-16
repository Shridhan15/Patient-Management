import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true,
            index: true // Kept for fast searching by name
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age cannot be negative']
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other']
        },
        phone: {
            type: String,
            trim: true,
            default: '', // Schema safely defaults to an empty string if left blank
            index: true  // Crucial: Kept as a sparse-friendly index for fast queries
        },
        address: {
            type: String,
            trim: true,
            default: ''
        },
        notes: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;