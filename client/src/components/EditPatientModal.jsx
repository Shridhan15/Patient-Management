import React, { useState } from "react";
import toast from "react-hot-toast";
import { patientService } from "../services/api.js";

const EditPatientModal = ({
  isOpen,
  onClose,
  patientData,
  onUpdateSuccess,
}) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editData, setEditData] = useState({
    name: patientData.name || "",
    age: patientData.age || "",
    gender: patientData.gender || "Male",
    phone: patientData.phone || "",
    address: patientData.address || "",
    notes: patientData.notes || "",
  });

  if (!isOpen) return null;

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const response = await patientService.update(patientData._id, editData);
      toast.success("Patient metrics revised cleanly!", { icon: "📝" });
      onUpdateSuccess(response.data); // Pass the updated data back to the parent component
      onClose(); // Shut the modal window overlay
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to revise patient records.",
      );
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">
            Modify Patient Profile Metrics
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm p-1 font-bold"
          >
            ❌
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleEditSubmit}
          className="p-6 space-y-4 overflow-y-auto flex-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                required
                className="input-field text-sm"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">
                Phone Number
              </label>
              <input
                type="tel"
                className="input-field text-sm"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">
                Age Metrics
              </label>
              <input
                type="number"
                required
                className="input-field text-sm"
                value={editData.age}
                onChange={(e) =>
                  setEditData({ ...editData, age: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">
                Gender Selection
              </label>
              <select
                className="input-field text-sm"
                value={editData.gender}
                onChange={(e) =>
                  setEditData({ ...editData, gender: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">
              Residential Address
            </label>
            <textarea
              className="input-field text-sm h-16 resize-none"
              value={editData.address}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 text-emerald-600">
              Permanent Clinical History Notes
            </label>
            <textarea
              className="input-field text-sm h-20 border-emerald-100 bg-emerald-50/20"
              value={editData.notes}
              onChange={(e) =>
                setEditData({ ...editData, notes: e.target.value })
              }
            />
          </div>

          {/* Footer Action Bars */}
          <div className="flex flex-row justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs md:text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editLoading}
              className="btn-primary px-6 py-2 text-xs md:text-sm font-semibold disabled:opacity-50"
            >
              {editLoading ? "Updating..." : "Save Revisions"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
