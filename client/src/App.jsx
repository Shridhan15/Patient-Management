import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Top Navigation */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="py-6 text-center text-slate-400 text-xs border-t bg-white">
          © 2026 MedTrack AI Clinic System
        </footer>
      </div>
    </Router>
  );
}

export default App;
