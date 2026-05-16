import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { prescriptionService } from '../services/api.js';

const NewPrescription = () => {
  const { id } = useParams(); // Patient ID pulled straight from address bar
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [instructions, setInstructions] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  
  // Dynamic medicines layout block array tracking
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', duration: '' }
  ]);

  // Handle updates to specific cells within the dynamic rows array
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  // Append an empty row field mapping structure to the view state grid
  const addMedicineRow = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  // Strip a medicine item row out of the target collection index layout block
  const removeMedicineRow = (index) => {
    if (medicines.length === 1) {
      toast.error('A minimum of one medicine item row entry is mandatory.');
      return;
    }
    setMedicines(medicines.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prescriptionPayload = {
      patientId: id,
      symptoms,
      diagnosis,
      medicines,
      instructions,
      followUpDate: followUpDate || null
    };

    try {
      await prescriptionService.create(prescriptionPayload);
      toast.success('Prescription generated and filed securely.', { icon: '📝' });
      navigate(`/patient/${id}`); // Jump doctor right back to updated timeline
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to sync diagnostic log.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container max-w-4xl">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">New Consultation</h2>
        <p className="text-slate-500">Record clinical vitals, diagnosis, and plan treatment.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Narrative Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card space-y-2">
            <label className="text-sm font-semibold text-slate-700">Presenting Symptoms</label>
            <textarea 
              required className="input-field h-28 resize-none" placeholder="e.g. High fever for 3 days, dry cough..."
              value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <div className="card space-y-2">
            <label className="text-sm font-semibold text-slate-700">Clinical Diagnosis</label>
            <textarea 
              required className="input-field h-28 resize-none" placeholder="e.g. Suspected Viral Respiratory Tract Infection..."
              value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Treatment Medicine Table Block */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-800">Prescribed Rx Pharmacology</h4>
            <button type="button" onClick={addMedicineRow} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
              + Add Medicine Row
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex-1 w-full">
                  <input 
                    type="text" required className="input-field bg-white" placeholder="Medicine Name (e.g. Paracetamol 650)"
                    value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-44">
                  <input 
                    type="text" required className="input-field bg-white" placeholder="Dosage Pattern (1-0-1)"
                    value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-44">
                  <input 
                    type="text" required className="input-field bg-white" placeholder="Duration (5 Days)"
                    value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                  />
                </div>
                <button type="button" onClick={() => removeMedicineRow(index)} className="text-red-500 hover:text-red-700 text-sm p-2 font-bold">
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Layout Operations block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Special Instructions (Optional)</label>
            <input 
              type="text" className="input-field" placeholder="Take post meals with lukewarm water..."
              value={instructions} onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="card space-y-2">
            <label className="text-sm font-semibold text-slate-700">Follow-up Date (Optional)</label>
            <input 
              type="date" className="input-field"
              value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button type="button" onClick={() => navigate(`/patient/${id}`)} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-all">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary px-8 disabled:opacity-50">
            {loading ? 'Filing Rx Summary...' : 'Save Prescription'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPrescription;