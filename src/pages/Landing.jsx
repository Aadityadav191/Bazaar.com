import React from 'react'

export default function Landing() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-green-500 to-green-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 text-center space-y-6 animate-fadeIn">
        <div className="text-6xl animate-bounce">🚧</div>
        <h1 className="text-4xl font-extrabold text-gray-800">
          Our E-Commerce Store is Almost Here!
        </h1>
        <p className="text-lg text-gray-600">
          We’re working hard behind the scenes to build something amazing. Sign up below to be the first to know when we launch.
        </p>

        {/* Email signup (non-functional placeholder) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-auto rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Notify Me
          </button>
        </div>

        <div className="text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </div>
    </>
  )
}
