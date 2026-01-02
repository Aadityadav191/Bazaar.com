import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import Logo from "../../assets/Logo.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className=" font-sans bg-white bg-opacity-30 backdrop-blur-sm shadow-lg sticky top-3 z-50 rounded-xl mx-auto my-2 max-w-[89rem] border-2 ">
        <nav className="flex items-center justify-between px-4 sm:px-8 ">
          <NavLink
            to="/"
            className="flex items-center hover:opacity-90 transition"
          >
            <img
              src={"https://img.freepik.com/premium-vector/bazaar-portable-store-logo-design-template_529200-416.jpg"}
              alt="Zeenopay"
              className="h-20 sm:h-30 w-auto rounded-full"
            />
          </NavLink>

          <div className="hidden lg:flex  gap-0 items-center space-x-1 font-semibold text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              Home 
            </NavLink>
            <NavLink
              to="/Shop"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/FAQ"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/return-refunds"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 transition ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              Returns & Refunds
            </NavLink>
           
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/login">
              <button className="px-6 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:border-gray-400 hover:text-gray-900 transition duration-300">
                Login / Register
              </button>
            </NavLink>
            <NavLink to="/create-order">
              <button
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white 
                           bg-gradient-to-r from-[#36b6ff] to-indigo-600 rounded-lg shadow-md transition duration-300  hover:from-indigo-600 hover:to-[#36b6ff]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Create Order
              </button>
            </NavLink>
          </div>

          <button
            className="lg:hidden p-2.5 text-indigo-600 border border-gray-200 rounded-full hover:bg-indigo-50 transition duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`${
            isOpen ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0"
          } lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-3 px-4">
            <hr className="border-gray-200 mt-2 mb-2" />

            {/* Main Navigation NavLinks */}
            <NavLink
              to="/about"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              About
            </NavLink>
            <NavLink
              to="/Contact"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              Contact
            </NavLink>
            <NavLink
              to="/Blog"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              Blog
            </NavLink>
            <NavLink
              to="/FAQ"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              FAQ
            </NavLink>
            <NavLink
              to="/Returns & Refunds"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              Returns & Refunds
            </NavLink>
            <NavLink
              to="/Cost Calculator"
              onClick={closeMenu}
              className="py-1.5 text-gray-700 hover:text-indigo-600 transition"
            >
              Cost Calculator
            </NavLink>

            <hr className="border-gray-200 mt-2 mb-2" />

            {/* Login/Register Button */}
            <NavLink to="/login" className="w-full" onClick={closeMenu}>
              <button className="w-full px-6 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:border-gray-400 hover:text-gray-900 transition">
                Login / Register
              </button>
            </NavLink>

            {/* Theme Toggle (Example) */}
            <NavLink to="/create-order" className="w-full" onClick={closeMenu}>
              <button className="flex items-center justify-center w-full gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Create Order
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
