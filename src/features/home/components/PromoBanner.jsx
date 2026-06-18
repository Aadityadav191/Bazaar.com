import React from "react";
import { Percent, ArrowRight } from "lucide-react";

export const PromoBanner = ({ onActionClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="relative bg-gradient-to-br from-[#c01015] to-red-900 rounded-3xl overflow-hidden p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Background decorative vector shapes */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-72 h-72 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hidden sm:block">
            <Percent className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-200 bg-red-950/40 px-3 py-1 rounded-full inline-block mb-3">
              Limited Mid-Season Event
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
              Get Up To 40% Off Premium Items
            </h3>
            <p className="text-sm text-red-100 mt-2 max-w-md">
              Upgrade your setup or living space with top-tier designs. Use code <span className="font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">BAZAAR40</span> at checkout.
            </p>
          </div>
        </div>

        <button 
          onClick={onActionClick}
          className="relative z-10 bg-white text-[#c01015] px-6 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all flex items-center gap-2 group shrink-0 shadow-lg text-sm uppercase tracking-wider"
        >
          Claim Discount
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </section>
  );
};