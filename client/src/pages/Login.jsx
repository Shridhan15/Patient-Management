import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../services/api.js";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "General Physician",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isRegistering) {
        response = await authService.register(formData);
        toast.success(`Account built! Welcome, Dr. ${response.data.name}`, {
          icon: "✨",
        });
      } else {
        response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
        toast.success(`Welcome back, Dr. ${response.data.name}`);
      }

      // Save token metrics inside local storage
      localStorage.setItem("doctorToken", response.data.token);
      localStorage.setItem("doctorProfile", JSON.stringify(response.data));

      onLoginSuccess(response.data); // Updates root state parameters inside App.jsx
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Authentication processing error.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-6 md:p-8 space-y-6 shadow-xl border border-slate-100 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            <span className="text-emerald-600">Med</span>Track
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            {isRegistering
              ? "Register provider credentials"
              : "Clinical Workspace Access Port"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="input-field text-sm"
                  placeholder="e.g. Shridhan Suman"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Medical Specialization
                </label>
                <select
                  className="input-field text-sm"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                >
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Dermatologist">Dermatologist</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              required
              className="input-field text-sm"
              placeholder="doctor@clinic.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Secure Password
            </label>
            <input
              type="password"
              required
              className="input-field text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 font-semibold mt-2 shadow-sm text-sm disabled:opacity-50"
          >
            {loading
              ? "Validating Session..."
              : isRegistering
                ? "Create Account"
                : "Secure Login →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-50">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {isRegistering
              ? "Already registered? Log in here"
              : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
