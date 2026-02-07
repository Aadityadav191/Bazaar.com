import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export default function Authlayout() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen bg-white">
      {/* --- Left Side: Content & Forms --- */}
      <section className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Navigation Shortcuts */}
          <div className="flex items-center justify-between mb-10">
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

          {/* This is where Login.js or Signup.js will render */}
          <div className="mt-6">
            <Outlet />
          </div>
          
        </div>
      </section>

      {/* --- Right Side: Visual/Branding (Hidden on Mobile) --- */}
      <section className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Office branding"
        />
        {/* Overlay with a bit of branding text */}
        <div className="absolute inset-0 bg-green-600/10 backdrop-blur-[2px] flex items-center justify-center">
          <div className="max-w-md text-center p-8 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
             <h2 className="text-3xl font-bold text-[#225635] mb-4">Start your Shoping today.</h2>
             <p className="text-green-50">Join over 10,000+ creators building the future of commerce.</p>
          </div>
        </div>
      </section>
    </main>
  );
}