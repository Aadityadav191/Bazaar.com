import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react'; // optional icons

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="text-center">
        {/* Animated 404 Header */}
        <p className="text-sm font-bold text-green-600 uppercase tracking-widest">
          Lost in Space?
        </p>
        <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
          404 - Page Not Found
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-600 max-w-lg mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, 
          deleted, or perhaps it never existed in this dimension.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-none transition-all"
          >
            <Home size={18} />
            Back to Homepage
          </Link>
        </div>

        {/* Helpful Links Section */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <p className="text-sm text-gray-500 font-medium mb-4">Try checking these out instead:</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/shop" className="text-green-600 hover:underline font-semibold">Our Shop</Link>
            <Link to="/contact" className="text-green-600 hover:underline font-semibold">Contact Support</Link>
            <Link to="/faq" className="text-green-600 hover:underline font-semibold">FAQs</Link>
          </div>
        </div>
      </div>
    </section>
  );
}