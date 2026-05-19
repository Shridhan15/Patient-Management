import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { patientService, prescriptionService } from "../services/api.js";
import { usePatients } from "../context/PatientContext.jsx";
import PrescriptionCard from "../components/PrescriptionCard.jsx";
import EditPatientModal from "../components/EditPatientModal.jsx"; // <-- Imported New Modular Modal

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshPatients } = usePatients();

  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Visibility controller flag

  const fetchPatientAndPrescriptions = async () => {
    try {
      setLoading(true);
      const [patientRes, prescriptionRes] = await Promise.all([
        patientService.getById(id),
        prescriptionService.getByPatientId(id),
      ]);
      setPatient(patientRes.data);
      setPrescriptions(prescriptionRes.data);
    } catch (error) {
      console.error("Error fetching profile details:", error);
      toast.error("Failed to locate requested records.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPatientAndPrescriptions();
  }, [id, navigate]);

  // Executed from inside the child modal component when a successful update lands in MongoDB Atlas
  const handleUpdateSuccess = (updatedPatientData) => {
  // 🔥 Force React to recognize a brand new object structure for an instant re-render
  setPatient({ ...updatedPatientData }); 
  
  // Synchronize the global search context cache list immediately
  refreshPatients(); 
};

  if (loading) {
    return (
      <div className="main-container text-center py-20 px-4">
        <div className="text-xl font-medium text-slate-500 animate-pulse">
          📡 Syncing history records...
        </div>
      </div>
    );
  }

  if (!patient) return null;

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "??";
  };

  return (
    <div className="main-container max-w-7xl px-4 mx-auto relative">
      {/* 1. Profile Summary Header */}
      <div className="card mb-6 md:mb-8 p-4 md:p-6 flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-4 w-full xl:w-auto">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-xl md:text-2xl font-black tracking-wide shrink-0">
            {getInitials(patient.name)}
          </div>
          <div className="space-y-0.5 md:space-y-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 truncate">
              {patient.name}
            </h2>
            <p className="text-slate-500 font-medium text-xs md:text-sm">
              {patient.age} Yrs • {patient.gender} •{" "}
              <span className="inline-block">
                {patient.phone || (
                  <span className="text-slate-300 italic">No Mobile</span>
                )}
              </span>
            </p>
            {patient.address && (
              <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                📍 {patient.address}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 w-full bg-slate-50 border border-slate-100 p-3 md:p-3.5 rounded-xl">
          <h4 className="font-bold text-slate-700 text-[11px] md:text-xs uppercase tracking-wider mb-1">
            Permanent Clinical Notes
          </h4>
          <p
            className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2"
            title={patient.notes}
          >
            {patient.notes || "No chronic history or allergies recorded."}
          </p>
        </div>

        <div className="flex flex-row gap-2.5 w-full xl:w-auto justify-end">
          <button
            onClick={() => setIsModalOpen(true)} // Toggles the separate component trigger flag layer
            className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all text-xs md:text-sm shadow-sm text-center"
          >
            ✏️ Edit Profile
          </button>
          <Link
            to={`/patient/${patient._id}/new-prescription`}
            className="flex-1 sm:flex-none btn-primary px-4 md:px-5 py-2.5 text-center shadow-md text-xs md:text-sm font-semibold block whitespace-nowrap"
          >
            + New Visit
          </Link>
        </div>
      </div>

      {/* 2. Timeline Rendering Section */}
      <div className="space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
          📋 Treatment Timeline ({prescriptions.length})
        </h3>
        {prescriptions.length === 0 ? (
          <div className="card border-dashed border-2 text-center py-12 text-slate-400 bg-white max-w-xl mx-auto px-4">
            <span className="text-2xl block mb-2">🩹</span>
            <p className="text-sm font-medium">
              No diagnostic history logged yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {prescriptions.map((visit) => (
              <PrescriptionCard key={visit._id} visit={visit} />
            ))}
          </div>
        )}
      </div>

      {/* 3. The Separated Modal Component Mounting Point */}
      <EditPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientData={patient}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default PatientProfile;
