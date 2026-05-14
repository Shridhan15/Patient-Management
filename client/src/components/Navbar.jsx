import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Add Patient", path: "/add-patient" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 1. Left Section: Logo */}
          <div className="flex-shrink-0 flex items-center w-40">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              <span className="text-emerald-600">Med</span>Track
            </Link>
          </div>

          {/* 2. Middle Section: Navigation Links */}
          <div className="flex flex-1 justify-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-semibold transition-all py-5 ${
                  location.pathname === item.path
                    ? "text-emerald-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.name}
                {/* Active Indicator Line */}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* 3. Right Section: Doctor Profile */}
          <div className="flex justify-end w-40">
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-black">
                S
              </div>
              <span className="text-sm font-bold text-slate-700 hidden sm:block">
                Dr. Shridhan
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
