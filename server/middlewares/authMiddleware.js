import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from "Bearer <token>" string
            token = req.headers.authorization.split(' ')[1];

            // Decode and verify the token payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the doctor from database and attach to the request object (excluding password)
            req.doctor = await Doctor.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token validation failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no session token found' });
    }
};