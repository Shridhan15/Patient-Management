import React from "react";
import { Link } from "react-router-dom";
import { usePatients } from "../context/PatientContext.jsx";

const Dashboard = () => {
  const { patients, search, setSearch, loading } = usePatients();

  return (
    // Added responsive padding layout boundaries (px-4 on mobile devices)
    <div className="main-container px-4 mx-auto">
      <header className="mb-6 md:mb-10 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Welcome Back, Doctor
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Here is what's happening in your clinic today.
        </p>
      </header>

      {/* Main Layout Grid wrapper stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Section Container Area */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
          {/* Patient Lookup Input Card Block */}
          <div className="card p-4 md:p-6">
            <h4 className="font-bold text-slate-800 text-sm md:text-base mb-3 md:mb-4">
              Patient Lookup
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or phone..."
                className="input-field pl-11 h-11 md:h-12 text-sm md:text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute left-4 top-3 md:top-3.5 text-sm md:text-base text-slate-400">
                {loading ? "⏳" : "🔍"}
              </span>
            </div>
          </div>

          {/* Patient Database Logs (Overflow Managed for Smartphones) */}
          <div className="card p-0 md:p-6 overflow-hidden border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm md:text-base pt-4 px-4 md:pt-0 md:px-2 mb-3 md:mb-4">
              Patient Database
            </h4>

            {/* The outer block allows horizontal swiping on mobile viewports instead of breaking the entire app wrapper */}
            <div className="w-full overflow-x-auto min-w-full inline-block align-middle">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-y border-slate-100">
                  <tr className="text-slate-500 text-[11px] md:text-xs uppercase tracking-wider whitespace-nowrap">
                    <th className="px-4 py-3 font-semibold">Patient</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                      Registered
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {patients.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-slate-400 text-sm px-4"
                      >
                        No active records found matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr
                        key={patient._id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Patient Core Info Cell */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="font-bold text-slate-700 text-sm md:text-base">
                            {patient.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {patient.age} Yrs • {patient.gender}
                          </p>
                        </td>

                        {/* Contact Cell */}
                        <td className="px-4 py-3.5 text-slate-500 text-xs md:text-sm whitespace-nowrap">
                          {patient.phone || (
                            <span className="text-slate-300 italic">
                              None Provided
                            </span>
                          )}
                        </td>

                        {/* Date Registered Cell (Safely hidden away on smartphones to prevent squishing) */}
                        <td className="px-4 py-3.5 text-slate-500 text-xs md:text-sm whitespace-nowrap hidden sm:table-cell">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions Control Link Anchor */}
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <Link
                            to={`/patient/${patient._id}`}
                            className="text-emerald-600 hover:text-emerald-700 font-bold text-xs md:text-sm bg-emerald-50 md:bg-transparent px-2.5 py-1.5 md:p-0 rounded-md inline-block md:inline"
                          >
                            View Profile{" "}
                            <span className="hidden md:inline">→</span>
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

        {/* Right Section Call-To-Action Side Container */}
        {/* order-1 shifts this card to the very top when viewed on phone layouts */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="card bg-emerald-600 text-white p-5 md:p-6 shadow-md shadow-emerald-900/10">
            <h4 className="font-bold text-base md:text-lg mb-1 md:mb-2">
              New Consultation?
            </h4>
            <p className="text-emerald-100 text-xs md:text-sm mb-4 md:mb-6">
              Register a new patient to start a digital prescription layout file
              file.
            </p>
            <Link
              to="/add-patient"
              className="block w-full text-center bg-white text-emerald-600 font-bold py-2.5 md:py-3 rounded-lg hover:bg-emerald-50 transition-colors text-sm md:text-base shadow-sm"
            >
              + Register Patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
