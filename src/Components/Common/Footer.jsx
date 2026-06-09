import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-200 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter & Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-gray-100">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter text-indigo-600 mb-4">Bazaar</h2>
            <p className="text-gray-500 max-w-sm mb-6">
              Curating minimalist essentials for the modern home and lifestyle. Design-led, quality-driven, and sustainably made.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:text-indigo-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:text-indigo-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-indigo-50 rounded-3xl p-8 md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900">Join the Bazaar Club</h3>
                <p className="text-gray-600">Get 10% off your first order and early access to drops.</p>
              </div>
              <div className="relative w-full md:w-80">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-indigo-500 outline-none pr-12 shadow-sm"
                />
                <button className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Home Decor</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Payments & Copyright */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs">
            © 2025 Bazaar Lifestyle Inc. All rights reserved. Built with precision.
          </p>
          <div className="flex gap-4 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Simple representation of payment icons */}
            <div className="w-10 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold">VISA</div>
            <div className="w-10 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold">MC</div>
            <div className="w-10 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold">PAYPAL</div>
            <div className="w-10 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold">APPLE</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;