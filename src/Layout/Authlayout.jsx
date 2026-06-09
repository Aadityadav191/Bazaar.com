import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import LoginImage from '../assets/LoginImage.png'; // Ensure this path is correct

export default function Authlayout() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen bg-white">
      {/* --- Left Side: Content & Forms --- */}
      <section className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          
          {/* This is where Login.js or Signup.js will render */}
          <div className="mt-6">
            <Outlet />
          </div>


          {/* Navigation Shortcuts */}
          <div className="flex items-center justify-between mt-20">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
            >
              <Home className="mr-1.5 h-4 w-4" />
              Home
            </Link>
          </div>
          
        </div>
      </section>

      {/* --- Right Side: Visual/Branding (Hidden on Mobile) --- */}
      <section className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginImage}
          alt="Office branding"
        />
      </section>
    </main>
  );
}