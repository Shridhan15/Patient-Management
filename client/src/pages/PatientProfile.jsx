import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { patientService, prescriptionService } from '../services/api.js';

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
          prescriptionService.getByPatientId(id)
        ]);

        setPatient(patientRes.data);
        setPrescriptions(prescriptionRes.data);
      } catch (error) {
        console.error('Error fetching file profile details:', error);
        toast.error('Failed to locate the requested patient record history.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPatientAndPrescriptions();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="main-container text-center py-20">
        <div className="text-xl font-medium text-slate-500 animate-pulse">
          📡 Syncing clinical history records...
        </div>
      </div>
    );
  }

  if (!patient) return null;

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
  };

  return (
    <div className="main-container max-w-7xl">
      {/* 1. Profile Summary Header (Now including Permanent Clinical Notes) */}
      <div className="card mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Patient Identity & Bio */}
        <div className="flex flex-col sm:flex-row items-start gap-5 w-full md:w-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl font-black tracking-wide flex-shrink-0 mt-1">
            {getInitials(patient.name)}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800">{patient.name}</h2>
            <p className="text-slate-500 font-medium text-sm">
              {patient.age} Years • {patient.gender} • {patient.phone || <span className="text-slate-300 italic">No Mobile Phone</span>}
            </p>
            {patient.address && (
              <p className="text-xs text-slate-400 flex items-center gap-1">
                📍 {patient.address}
              </p>
            )}
          </div>
        </div>

        {/* Shifetd: Permanent Clinical Notes Column Block */}
        <div className="flex-1 max-w-xl w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">
            Permanent Clinical Notes
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 title={patient.notes}">
            {patient.notes || "No chronic history or allergies recorded."}
          </p>
        </div>

        {/* Dynamic Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto self-stretch md:self-auto justify-end">
          <button 
            onClick={() => toast('Edit functionality component coming in Phase 2!', { icon: '⚙️' })}
            className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all text-sm shadow-sm text-center"
          >
            ✏️ Edit Profile
          </button>
          
          <Link 
            to={`/patient/${patient._id}/new-prescription`} 
            className="btn-primary px-5 py-2.5 text-center shadow-md text-sm font-semibold block whitespace-nowrap"
          >
            + New Consultation Visit
          </Link>
        </div>
      </div>

      {/* 2. Treatment Timeline (Refactored into a 2-Column Grid Layout) */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          📋 Treatment Timeline ({prescriptions.length})
        </h3>
        
        {prescriptions.length === 0 ? (
          <div className="card border-dashed border-2 text-center py-12 text-slate-400 bg-white max-w-xl mx-auto">
            <span className="text-2xl block mb-2">🩹</span>
            <p className="text-sm font-medium">No diagnostic history logged yet.</p>
            <p className="text-xs text-slate-400 mt-0.5">Click '+ New Consultation Visit' to write the first digital prescription.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {prescriptions.map((visit) => (
              <div key={visit._id} className="card border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all bg-white">
                <div>
                  {/* Visit Badge Header */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Clinical Visit
                      </span>
                      <p className="text-xs text-slate-400 mt-1.5 font-medium">
                        🗓️ {new Date(visit.visitDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Medical Specifics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider mb-1">Symptoms</p>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">{visit.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider mb-1">Diagnosis</p>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap line-clamp-3">{visit.diagnosis}</p>
                    </div>
                  </div>

                  {/* Dynamic Pharmacology Subtable */}
                  <div className="border border-slate-100 rounded-lg overflow-hidden mb-4">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase font-bold tracking-wider">
                        <tr>
                          <th className="px-3 py-2">Rx Medication</th>
                          <th className="px-3 py-2">Dosage</th>
                          <th className="px-3 py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {visit.medicines.map((med, index) => (
                          <tr key={index} className="hover:bg-slate-50/40">
                            <td className="px-3 py-2.5 font-bold text-slate-800 truncate max-w-[150px]">{med.name}</td>
                            <td className="px-3 py-2.5"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono font-bold text-slate-600">{med.dosage}</span></td>
                            <td className="px-3 py-2.5 text-slate-500 text-xs">{med.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Footer Details (Keeps layout uniformly aligned) */}
                <div className="space-y-2 mt-auto pt-2 border-t border-slate-50">
                  {visit.instructions && (
                    <div className="text-xs bg-amber-50/40 border border-amber-100 p-2.5 rounded-lg text-slate-600">
                      <span className="font-bold text-amber-800">💡 Advice:</span> {visit.instructions}
                    </div>
                  )}

                  {visit.followUpDate && (
                    <div className="text-[11px] text-right font-medium text-emerald-600">
                      🔄 Follow-up Scheduled: {new Date(visit.followUpDate).toLocaleDateString()}
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