'use client';
import { useState } from 'react';
import { useGlobalContext } from '@/store';


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const { user } = useGlobalContext();
  
  if (!user) return <div>Loading...</div>;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100">
      {/* Logo and Search Bar */}
      <div className="flex items-center gap-4">
        <h1 
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => {/* Navigate to home */}}
        >
          Socialize
        </h1>
        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-gray-200 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
          <button className="text-gray-600 hover:text-gray-800">
            🔍
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-6">
        <button className="text-gray-600 hover:text-gray-800">
          ☀️ {/* Toggle light/dark mode */}
        </button>
        <button className="text-gray-600 hover:text-gray-800">💬</button>
        <button className="text-gray-600 hover:text-gray-800">🔔</button>
        <button className="text-gray-600 hover:text-gray-800">❓</button>
        <div className="relative">
          <select
            className="bg-gray-200 rounded-full px-4 py-2 outline-none cursor-pointer"
          >
            <option value="User Name">{user.firstName}</option>
            <option value="logout">Log Out</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-600 hover:text-gray-800"
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        {isMobileMenuToggled ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuToggled && (
        <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="text-gray-600 hover:text-gray-800 text-2xl"
            onClick={() => setIsMobileMenuToggled(false)}
          >
            ✖
          </button>
          <button className="text-gray-600 hover:text-gray-800">☀️</button>
          <button className="text-gray-600 hover:text-gray-800">💬</button>
          <button className="text-gray-600 hover:text-gray-800">🔔</button>
          <button className="text-gray-600 hover:text-gray-800">❓</button>
          <select
            className="bg-gray-200 rounded-full px-4 py-2 outline-none cursor-pointer"
          >
            <option value="User Name">User Name</option>
            <option value="logout">Log Out</option>
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
