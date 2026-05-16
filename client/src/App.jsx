import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PatientProvider } from './context/PatientContext.jsx';  

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/AddPatient';
import PatientProfile from './pages/PatientProfile';
import NewPrescription from './pages/NewPrescription.jsx';

function App() {
  return (
    <Router>
      <PatientProvider>  
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Toaster 
            position="top-right"
            toastOptions={{ duration: 4000, style: { borderRadius: '0.75rem' } }}
          />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/patient/:id" element={<PatientProfile />} />
              <Route path="/patient/:id/new-prescription" element={<NewPrescription />} />
            </Routes>
          </main>
          <footer className="py-6 text-center text-slate-400 text-xs border-t bg-white">
            © 2026 MedTrack AI Clinic System
          </footer>
        </div>
      </PatientProvider>
    </Router>
  );
}

export default App;