import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Bazaar
              <span className="text-blue-6000">.</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/shop" className="text-gray-600 hover:text-blue-600">Shop</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
            <a href="/signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                   viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block text-gray-600 hover:text-blue-600">Home</a>
          <a href="/shop" className="block text-gray-600 hover:text-blue-600">Shop</a>
          <a href="/about" className="block text-gray-600 hover:text-blue-600">About</a>
          <a href="/contact" className="block text-gray-600 hover:text-blue-600">Contact</a>
          <a href="/login" className="block text-gray-600 hover:text-blue-600">Login</a>
          <a href="/signup" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
