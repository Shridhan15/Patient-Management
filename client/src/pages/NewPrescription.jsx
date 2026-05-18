import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { prescriptionService } from "../services/api.js";

const NewPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [instructions, setInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicineRow = (index) => {
    if (medicines.length === 1) {
      toast.error("A minimum of one medicine item row entry is mandatory.");
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
      followUpDate: followUpDate || null,
    };

    try {
      await prescriptionService.create(prescriptionPayload);
      toast.success("Prescription generated and filed securely.", {
        icon: "📝",
      });
      navigate(`/patient/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to sync diagnostic log.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container max-w-4xl px-4 mx-auto">
      <header className="mb-6 md:mb-8 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          New Consultation
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Record clinical vitals, diagnosis, and plan treatment.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Core Narrative Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="card p-4 md:p-6 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Presenting Symptoms
            </label>
            <textarea
              required
              className="input-field h-24 md:h-28 text-sm md:text-base resize-none"
              placeholder="e.g. High fever for 3 days, dry cough..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <div className="card p-4 md:p-6 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Clinical Diagnosis
            </label>
            <textarea
              required
              className="input-field h-24 md:h-28 text-sm md:text-base resize-none"
              placeholder="e.g. Suspected Viral Respiratory Tract Infection..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Treatment Medicine Table Block */}
        <div className="card p-4 md:p-6">
          <div className="flex flex-row justify-between items-center mb-4 pb-2 border-b border-slate-50">
            <h4 className="font-bold text-slate-800 text-sm md:text-base">
              Prescribed Rx Pharmacology
            </h4>
            <button
              type="button"
              onClick={addMedicineRow}
              className="text-xs md:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              + Add Medicine Row
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row gap-3 items-center bg-slate-50/60 p-4 md:p-3 rounded-xl border border-slate-100"
              >
                {/* Medicine Name Input */}
                <div className="flex-1 w-full">
                  <label className="block md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field bg-white text-sm md:text-base"
                    placeholder="e.g. Paracetamol 650"
                    value={med.name}
                    onChange={(e) =>
                      handleMedicineChange(index, "name", e.target.value)
                    }
                  />
                </div>

                {/* Dosage Pattern Input */}
                <div className="w-full md:w-44">
                  <label className="block md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Dosage Pattern
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field bg-white text-sm md:text-base"
                    placeholder="e.g. 1-0-1"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicineChange(index, "dosage", e.target.value)
                    }
                  />
                </div>

                {/* Duration Input */}
                <div className="w-full md:w-44">
                  <label className="block md:hidden text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field bg-white text-sm md:text-base"
                    placeholder="e.g. 5 Days"
                    value={med.duration}
                    onChange={(e) =>
                      handleMedicineChange(index, "duration", e.target.value)
                    }
                  />
                </div>

                {/* Delete Trigger Button */}
                {/* On mobile, this maps to an absolute top-right location for clean access without displacing the grid layout */}
                <button
                  type="button"
                  onClick={() => removeMedicineRow(index)}
                  className="absolute right-2 top-2 md:relative md:top-auto md:right-auto text-red-500 hover:text-red-700 text-sm p-2 font-bold bg-white md:bg-transparent rounded-lg shadow-sm md:shadow-none border border-slate-100 md:border-none"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Layout Operations block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="card p-4 md:p-6 md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              className="input-field text-sm md:text-base"
              placeholder="Take post meals with lukewarm water..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="card p-4 md:p-6 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Follow-up Date (Optional)
            </label>
            <input
              type="date"
              className="input-field text-sm md:text-base"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
        </div>

        {/* Action Controls Footer Bar */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate(`/patient/${id}`)}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-all text-center border border-transparent sm:border-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto btn-primary px-8 py-2.5 text-sm font-semibold disabled:opacity-50 text-center"
          >
            {loading ? "Filing Rx Summary..." : "Save Prescription"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPrescription;
