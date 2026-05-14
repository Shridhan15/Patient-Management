import React from "react";

const Dashboard = () => {
  return (
    <div className="ml-64 p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back, Doctor
        </h2>
        <p className="text-slate-500">
          Here is what's happening in your clinic today.
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-slate-500 text-sm">Total Patients</p>
          <h3 className="text-2xl font-bold text-slate-800">1,284</h3>
        </div>
        <div className="card border-l-4 border-l-blue-500">
          <p className="text-slate-500 text-sm">Today's Visits</p>
          <h3 className="text-2xl font-bold text-slate-800">12</h3>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="card mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Instant Patient Lookup
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or phone number..."
            className="input-field pl-10"
          />
          <span className="absolute left-3 top-3 opacity-40">🔍</span>
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className="card">
        <h4 className="font-bold text-slate-800 mb-4">Recent Visits</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b">
                <th className="pb-3 font-medium">Patient Name</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Last Visit</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* This will be mapped from your API later */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-medium text-slate-700">John Doe</td>
                <td className="py-4 text-slate-500">+91 9876543210</td>
                <td className="py-4 text-slate-500">2 Hours ago</td>
                <td className="py-4 text-right">
                  <button className="text-emerald-600 hover:underline font-medium">
                    View Profile
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
