import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import the emitter
import { patientService } from "../services/api.js";

const AddPatient = () => {
  const navigate = useNavigate();
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

      // Fire Success Toast Notification!
      toast.success(`${formData.name} registered successfully!`, {
        icon: "👤",
        style: {
          borderLeft: "4px solid #059669", // Custom emerald border line
        },
      });

      navigate("/");
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Failed to sync with system servers.";

      // Fire Error Toast Notification!
      toast.error(errMsg, {
        style: {
          borderLeft: "4px solid #dc2626", // Custom red error line
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container max-w-3xl">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Register New Patient
        </h2>
        <p className="text-slate-500">
          Create a digital file for a new clinic visitor.
        </p>
      </header>

      {/* The form JSX remains identical and clean without notification wrappers inside */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
              className="input-field"
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
            className="input-field h-24 resize-none"
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
            className="input-field h-24 border-emerald-100 bg-emerald-50/30 resize-none"
            placeholder="Allergies, chronic conditions..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          ></textarea>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Patient"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
