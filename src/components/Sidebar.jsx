import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
  ];

  return (
    <>
      {/* === Burger Button (Mobile Only) === */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* === Sidebar === */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // close menu after navigation
              className={`block px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors ${
                location.pathname === item.path ? "bg-gray-800" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 text-center border-t border-gray-700 text-sm text-gray-400">
          © 2025 Bintang
        </div>
      </div>

      {/* === Dark overlay when sidebar open (mobile only) === */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
