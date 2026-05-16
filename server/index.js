import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Added CORS package to talk securely with React frontend
import connectDB from './config/db.js';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Cross-Origin Resource Sharing initialization
app.use(express.json());

// Main Resource Routing
app.use('/api/patients', patientRoutes);

// Simple Health Check
app.get('/', (req, res) => res.send('MedTrack API is active.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running smoothly on port ${PORT}`);
});