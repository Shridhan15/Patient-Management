import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import the notification anchor

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Global Toast Notification Container Configuration */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              fontWeight: "500",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            },
          }}
        />

        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
          </Routes>
        </main>

        <footer className="py-6 text-center text-slate-400 text-xs border-t bg-white">
          © 2026 MedTrack AI Clinic System
        </footer>
      </div>
    </Router>
  );
}

export default App;
