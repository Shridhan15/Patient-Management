import React, { useState } from "react";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data Captured:", formData);
    // Backend logic will go here
  };

  return (
    <div className="ml-64 p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Register New Patient
        </h2>
        <p className="text-slate-500">
          Create a digital file for a new clinic visitor.
        </p>
      </header>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                className="input-field"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className="input-field"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Age
              </label>
              <input
                type="number"
                placeholder="Years"
                className="input-field"
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Gender
              </label>
              <select
                className="input-field"
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

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Address
            </label>
            <textarea
              placeholder="Full address..."
              className="input-field h-24 resize-none"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>

          {/* Medical Notes */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 text-emerald-600">
              Initial Medical Notes (Optional)
            </label>
            <textarea
              placeholder="Allergies, chronic conditions, etc."
              className="input-field h-24 border-emerald-100 bg-emerald-50/30 resize-none"
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary px-8">
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
