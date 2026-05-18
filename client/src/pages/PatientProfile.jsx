import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { patientService, prescriptionService } from "../services/api.js";

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Error fetching file profile details:", error);
        toast.error("Failed to locate the requested patient record history.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPatientAndPrescriptions();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="main-container text-center py-20 px-4">
        <div className="text-xl font-medium text-slate-500 animate-pulse">
          📡 Syncing clinical history records...
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
    <div className="main-container max-w-7xl px-4 mx-auto">
      {/* 1. Profile Summary Header (Responsive Padding and Flex Direction) */}
      <div className="card mb-6 md:mb-8 p-4 md:p-6 flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 md:gap-6">
        {/* Patient Identity & Bio */}
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

        {/* Permanent Clinical Notes Block */}
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

        {/* Dynamic Action Controls (Stretches full width on mobile, auto width on desktop) */}
        <div className="flex flex-row sm:flex-row gap-2.5 w-full xl:w-auto justify-end">
          <button
            onClick={() =>
              toast("Edit functionality component coming in Phase 2!", {
                icon: "⚙️",
              })
            }
            className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all text-xs md:text-sm shadow-sm text-center whitespace-nowrap"
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

      {/* 2. Treatment Timeline (Maintains 2-Column Grid on desktop, 1 on mobile) */}
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
            <p className="text-xs text-slate-400 mt-0.5">
              Click '+ New Consultation Visit' to write the first digital
              prescription.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {prescriptions.map((visit) => (
              <div
                key={visit._id}
                className="card p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all bg-white"
              >
                <div>
                  {/* Visit Badge Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Clinical Visit
                      </span>
                      <p className="text-[11px] md:text-xs text-slate-400 mt-1.5 font-medium">
                        🗓️{" "}
                        {new Date(visit.visitDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Medical Specifics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 text-xs md:text-sm">
                    <div>
                      <p className="text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-1">
                        Symptoms
                      </p>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">
                        {visit.symptoms}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-1">
                        Diagnosis
                      </p>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">
                        {visit.diagnosis}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Pharmacology Subtable with horizontal swiping protection */}
                  <div className="border border-slate-100 rounded-lg overflow-x-auto mb-4 w-full">
                    <table className="w-full text-left text-xs md:text-sm min-w-[280px]">
                      <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] md:text-xs uppercase font-bold tracking-wider">
                        <tr>
                          <th className="px-3 py-2">Rx Medication</th>
                          <th className="px-3 py-2">Dosage</th>
                          <th className="px-3 py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {visit.medicines.map((med, index) => (
                          <tr key={index} className="hover:bg-slate-50/40">
                            <td className="px-3 py-2.5 font-bold text-slate-800 truncate max-w-[120px] md:max-w-[150px]">
                              {med.name}
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] md:text-xs font-mono font-bold text-slate-600 whitespace-nowrap">
                                {med.dosage}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-slate-500 text-[11px] md:text-xs whitespace-nowrap">
                              {med.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Footer Details */}
                <div className="space-y-2 mt-auto pt-2 border-t border-slate-50">
                  {visit.instructions && (
                    <div className="text-[11px] md:text-xs bg-amber-50/40 border border-amber-100 p-2.5 rounded-lg text-slate-600">
                      <span className="font-bold text-amber-800">
                        💡 Advice:
                      </span>{" "}
                      {visit.instructions}
                    </div>
                  )}

                  {visit.followUpDate && (
                    <div className="text-[10px] md:text-[11px] text-right font-medium text-emerald-600">
                      🔄 Follow-up Scheduled:{" "}
                      {new Date(visit.followUpDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
