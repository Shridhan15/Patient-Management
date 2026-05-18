import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { patientService } from "../services/api.js";
import { usePatients } from "../context/PatientContext.jsx"; // Ensure the data hook updates context global state

const AddPatient = () => {
  const navigate = useNavigate();
  const { refreshPatients } = usePatients(); // Pull the refresh functionality from global context
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await patientService.register(formData);

      toast.success(`${formData.name} registered successfully!`, {
        icon: "👤",
        style: {
          borderLeft: "4px solid #059669",
        },
      });

      refreshPatients(); // Instantly update global patient database cache array
      navigate("/");
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Failed to sync with system servers.";

      toast.error(errMsg, {
        style: {
          borderLeft: "4px solid #dc2626",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Updated responsive padding (px-4 for mobile viewports, sm:px-6/lg:px-8 handled by main-container)
    <div className="main-container max-w-3xl px-4 mx-auto">
      <header className="mb-6 md:mb-8 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Register New Patient
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Create a digital file for a new clinic visitor.
        </p>
      </header>

      {/* Form Card Layout Padding optimized using p-4 on mobile and sm:p-6 for desktop */}
      <form
        onSubmit={handleSubmit}
        className="card p-4 sm:p-6 space-y-5 md:space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className="input-field text-sm md:text-base"
              placeholder="e.g. Rahul Sharma"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              className="input-field text-sm md:text-base"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Age</label>
            <input
              type="number"
              className="input-field text-sm md:text-base"
              placeholder="Years"
              required
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Gender
            </label>
            <select
              className="input-field text-sm md:text-base"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Address
          </label>
          <textarea
            className="input-field h-24 resize-none text-sm md:text-base"
            placeholder="Full address..."
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 text-emerald-600">
            Initial Medical Notes (Optional)
          </label>
          <textarea
            className="input-field h-24 border-emerald-100 bg-emerald-50/30 resize-none text-sm md:text-base"
            placeholder="Allergies, chronic conditions..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          ></textarea>
        </div>

        {/* Responsive Controls Bar: Columns stack on mobile viewports and flex horizontally on desktop */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-all border border-transparent sm:border-none text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto btn-primary px-8 py-2.5 text-sm font-semibold disabled:opacity-50 text-center"
          >
            {loading ? "Registering..." : "Register Patient"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
