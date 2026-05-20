import Doctor from '../models/Doctor.js';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new doctor
// @route   POST /api/auth/register
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization } = req.body;

        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({ message: 'A doctor with this email is already registered.' });
        }

        const doctor = await Doctor.create({
            name,
            email,
            password,
            specialization
        });

        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            specialization: doctor.specialization,
            token: generateToken(doctor._id)
        });
    } catch (error) {
        res.status(500).json({ message: `Registration failed: ${error.message}` });
    }
};

// @desc    Auth doctor & get token (Login)
// @route   POST /api/auth/login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });
        if (doctor && (await doctor.matchPassword(password))) {
            res.json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                token: generateToken(doctor._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password credentials.' });
        }
    } catch (error) {
        res.status(500).json({ message: `Login failed: ${error.message}` });
    }
};