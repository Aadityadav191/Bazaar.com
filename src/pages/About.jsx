import React from 'react';
import { Target, Users, Heart, Shield ,Check } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            We’re redefining <span className="text-indigo-600">modern living.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Founded in 2023, LUMINA was born out of a simple idea: high-quality design shouldn't be a luxury reserved for the few.
          </p>
        </div>
      </section>

      {/* Our Story / Split Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Our team collaborating" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              LUMINA started in a small studio apartment with a single goal: to create products that blend functionality with a timeless aesthetic. We noticed that the market was filled with items that were either beautiful but fragile, or durable but dull.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Today, we are a global team of designers and creators working to bring you essentials that make your daily routines feel special. We don't just sell products; we curate experiences.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t pt-8">
              <div>
                <p className="text-3xl font-bold text-indigo-600">50k+</p>
                <p className="text-sm text-gray-500 font-medium uppercase">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-600">12</p>
                <p className="text-sm text-gray-500 font-medium uppercase">Global Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-gray-400">The principles that guide every decision we make.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
              <Heart className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Conscious Craft</h3>
              <p className="text-gray-400">We prioritize sustainable materials and ethical manufacturing in every single piece.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
              <Target className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Radical Clarity</h3>
              <p className="text-gray-400">Honest pricing and transparent sourcing. You deserve to know where your products come from.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
              <Users className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-gray-400">Our customers are our co-creators. Your feedback directly shapes our future collections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Team / CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Want to be part of our journey?</h2>
          <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto">
            We're always looking for passionate designers, developers, and thinkers to join our remote-first team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">
              View Openings
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;