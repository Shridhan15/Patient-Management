import React from "react";
import PrescriptionCard from "../components/PrescriptionCard";

const PatientProfile = () => {
  // Mock data for UI development
  const history = [
    {
      date: "12 May 2026",
      diagnosis: "Acute Viral Fever",
      medicines: [
        { name: "Paracetamol 500mg", dosage: "1-0-1", duration: "3 Days" },
        { name: "Vitamin C", dosage: "0-1-0", duration: "5 Days" },
      ],
    },
    {
      date: "05 Jan 2026",
      diagnosis: "Common Cold & Cough",
      medicines: [
        { name: "Cough Syrup", dosage: "5ml", duration: "Once daily" },
      ],
    },
  ];

  return (
    <div className="ml-64 p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="card mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">John Doe</h2>
              <p className="text-slate-500">28 Years • Male • +91 9876543210</p>
            </div>
          </div>
          <button className="btn-primary">+ New Prescription</button>
        </div>

        {/* Treatment History */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Treatment History
          </h3>
          <div className="mt-4">
            {history.map((visit, idx) => (
              <PrescriptionCard key={idx} {...visit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
