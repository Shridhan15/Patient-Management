import React from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext.jsx'; // Hook up your context

const Dashboard = () => {
  // Pull state managers cleanly straight out of context
  const { patients, search, setSearch, loading } = usePatients();

  return (
    <div className="main-container">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Welcome Back, Doctor</h2>
        <p className="text-slate-500 mt-1">Here is what's happening in your clinic today.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h4 className="font-bold text-slate-800 mb-4">Patient Lookup</h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name or phone..." 
                className="input-field pl-11 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Mutates shared state query instantly
              />
              <span className="absolute left-4 top-3.5 text-slate-400">
                {loading ? '⏳' : '🔍'}
              </span>
            </div>
          </div>

          <div className="card overflow-hidden">
            <h4 className="font-bold text-slate-800 mb-4 px-2">Patient Database</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-y border-slate-100">
                  <tr className="text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Patient</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Registered</th>
                    <th className="px-4 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-slate-400 text-sm">
                        No active records found matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr key={patient._id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-4 py-4">
                          <p className="font-bold text-slate-700">{patient.name}</p>
                          <p className="text-xs text-slate-400">{patient.age} Yrs • {patient.gender}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm">
                          {patient.phone || <span className="text-slate-300 italic">None Provided</span>}
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Link to={`/patient/${patient._id}`} className="text-emerald-600 hover:text-emerald-700 font-bold text-sm">
                            View Profile →
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-emerald-600 text-white">
            <h4 className="font-bold mb-2">New Consultation?</h4>
            <p className="text-emerald-100 text-sm mb-6">Register a new patient to start a digital prescription.</p>
            <Link to="/add-patient" className="block w-full text-center bg-white text-emerald-600 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              + Register Patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;