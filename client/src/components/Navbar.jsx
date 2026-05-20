import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ activeDoctor, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Tracks mobile menu toggle state

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Add Patient", path: "/add-patient" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 1. Left Section: Logo */}
          <div className="flex-shrink-0 flex items-center md:w-40">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              <span className="text-emerald-600">Med</span>Track
            </Link>
          </div>

          {/* 2. Middle Section: Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
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

          {/* 3. Right Section: Doctor Profile & Hamburger Toggle */}
          <div className="flex items-center justify-end md:w-40 gap-4">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 md:px-3 md:py-1.5 rounded-lg border border-slate-100">
              <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-black">
                {activeDoctor?.name ? activeDoctor.name[0].toUpperCase() : "D"}
              </div>
              <span className="text-sm font-bold text-slate-700 hidden lg:block">
                Dr. {activeDoctor?.name.split(" ")[0]}{" "}
                {/* Dynamically prints logged-in doctor's first name */}
              </span>
            </div>

            {/* Optional: Add a subtle logout trigger asset beside it for layout accessibility */}
            <button
              onClick={onLogout}
              className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Expandable Menu Dropdown Panel */}
      <div
        className={`md:hidden bg-white border-b border-slate-100 transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 block" : "max-h-0 opacity-0 hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Auto-closes menu dropdown drawer on link click
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                location.pathname === item.path
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
