import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PatientProvider } from "./context/PatientContext.jsx";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientProfile from "./pages/PatientProfile";
import NewPrescription from "./pages/NewPrescription";
import Login from "./pages/Login"; // <-- Import the new Login view page

function App() {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Read saved doctor profiles out of localStorage on initial system initialization boot
  useEffect(() => {
    const savedProfile = localStorage.getItem("doctorProfile");
    if (savedProfile) {
      setActiveDoctor(JSON.parse(savedProfile));
    }
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorProfile");
    setActiveDoctor(null);
  };

  if (checkingAuth) return null;

  return (
    <Router>
      <PatientProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { borderRadius: "0.75rem" },
            }}
          />

          {/* If the doctor isn't authenticated yet, do not display navigation layouts */}
          {activeDoctor && (
            <Navbar activeDoctor={activeDoctor} onLogout={handleLogout} />
          )}

          <main className="flex-1">
            <Routes>
              {activeDoctor ? (
                <>
                  {/* Secure Authenticated System Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-patient" element={<AddPatient />} />
                  <Route path="/patient/:id" element={<PatientProfile />} />
                  <Route
                    path="/patient/:id/new-prescription"
                    element={<NewPrescription />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  {/* Catch-all Auth Access Lockout redirect */}
                  <Route
                    path="/login"
                    element={
                      <Login onLoginSuccess={(doc) => setActiveDoctor(doc)} />
                    }
                  />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </main>

          <footer className="py-6 text-center text-slate-400 text-xs border-t bg-white">
            © 2026 MedTrack Multi-Doctor Integrated Clinical Ecosystem
          </footer>
        </div>
      </PatientProvider>
    </Router>
  );
}

export default App;
