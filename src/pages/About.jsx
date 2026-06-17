import React from 'react';
import { 
  Target, Users, Heart, Shield, Check, 
  Globe2, Layers, ShieldCheck, Zap, ArrowRight, Activity 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-[#c01015] font-sans">
      
      {/* HERO BANNER EDITORIAL BLOCK */}
      <section className="bg-white border-b border-zinc-200/80 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-black">
            Bazaar Global Manifesto — Est. 2023
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-[#c01015] leading-none">
            We are redefining the <br />
            <span className="bg-gradient-to-r from-[#c01015] bg-clip-text text-transparent">
              architecture of modern living.
            </span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed pt-2">
            Bazaar was engineered to dismantle a frustrating industry compromise: the choice between high-end architectural design and accessible, everyday durability. We construct essentials for the modern citizen.
          </p>
        </div>
      </section>

      {/* CORE ORIGIN SPLIT STORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 relative group">
            <div className="absolute inset-0 bg-[#c01015]/5 rounded-3xl transition duration-300 group-hover:bg-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
              alt="Bazaar curated studio space layout" 
              className="w-full h-[450px] object-cover rounded-3xl border border-zinc-200/60 shadow-xs"
            />
            <div className="absolute -bottom-6 -right-6 hidden lg:block bg-white border border-zinc-200 rounded-2xl p-4 shadow-md max-w-[200px] text-left space-y-1">
              <span className="text-xs font-mono font-black text-[#c01015] flex items-center gap-1">
                <Activity size={12} className="text-emerald-500" /> Live Pipeline
              </span>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-tight">Direct-to-consumer node optimization</p>
            </div>
          </div>

          <div className="md:col-span-6 space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Historical Context</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#c01015]">Our Studio Evolution</h2>
            </div>
            
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Bazaar trace-mapped its very first blueprints within a high-density city micro-apartment. Our baseline objective was clear: filter out the bloated marketing overhead of traditional retail channels and invest that value entirely back into raw material integrity.
            </p>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              We look past fleeting weekly trends. Instead, we collaborate alongside independent industrial designers and precision manufacturing plants globally to build product systems that transition beautifully across changing spaces.
            </p>

            {/* METRICS INDEX LEDGER */}
            <div className="grid grid-cols-3 gap-6 border-t border-zinc-200/60 pt-8">
              <div className="space-y-0.5">
                <p className="text-2xl font-mono font-black tracking-tight text-[#c01015]">140k+</p>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Dispatches Settled</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-mono font-black tracking-tight text-[#c01015]">99.4%</p>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Fulfillment Score</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-mono font-black tracking-tight text-[#c01015]">24/7</p>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Node Monitoring</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION: ECOSYSTEM INFRASTRUCTURE PIPELINE */}
      <section className="bg-white border-y border-zinc-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl space-y-2 mb-12">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-black">Quality Assurance Matrix</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#c01015]">How We Maintain Integrity</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { idx: "01", name: "Material Synthesis", desc: "We source custom-milled alloys, organic long-staple cotton fibers, and high-density polymers built to last." },
              { idx: "02", name: "Zero-Middlemen Sourcing", desc: "By bypassing traditional wholesale distributors, we route pure value directly to your doorstep." },
              { idx: "03", name: "Stress Testing Protocols", desc: "Every inventory collection undergoes physical friction and structural load testing before distribution approval." },
              { idx: "04", name: "Carbon-Balanced Logistics", desc: "Our localized shipping networks are systematically batched to offset freight distribution footprints." }
            ].map((step) => (
              <div key={step.idx} className="border-l border-zinc-200 pl-6 space-y-2 text-left hover:border-[#c01015] transition duration-200">
                <span className="font-mono text-xs font-black text-zinc-300 block">{step.idx}</span>
                <h4 className="text-xs font-bold uppercase tracking-wide text-[#c01015]">{step.name}</h4>
                <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM OPERATIONS LOGISTICS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4 md:sticky md:top-24 space-y-3">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Logistics Architecture</span>
            <h3 className="text-2xl font-black tracking-tight text-[#c01015]">Engineered Platform Operations</h3>
            <p className="text-xs font-medium text-zinc-400 leading-relaxed">
              Bazaar functions as an integrated e-commerce engine. We synchronize inventory states in real time to guarantee a frictionless transaction journey.
            </p>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#c01015]">
                <Zap size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c01015]">Accelerated Dispatch Framework</h4>
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                Orders are mapped and pushed to active localized fulfillment centers within 120 minutes of cryptographic validation confirmation.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#c01015]">
                <ShieldCheck size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c01015]">Secured Transaction Vaults</h4>
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                All checkout endpoints use advanced modern tokenization. This isolates and fully safeguards your payment credentials from leaking.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#c01015]">
                <Layers size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c01015]">Strict Structural Curation</h4>
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                We strictly limit our active stock. Instead of carrying thousands of generic options, we maintain a small, highly curated selection of premium catalog items.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#c01015]">
                <Globe2 size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c01015]">Global Supply Integrity</h4>
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                Our global supply network operates under verified fair-wage standards. We balance our dynamic scaling needs with absolute human ethics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* HIGH-CONTRAST MONOCHROME VALUES LEDGER */}
      <section className="bg-[#c01015] py-24 text-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-2">
            <p className="text-[9px] tracking-widest text-zinc-500 font-bold uppercase">Operating Vectors</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">The Tenets That Govern Bazaar</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-4 p-2">
              <div className="text-zinc-400 font-mono text-xs">// SYSTEM OPERATION 01</div>
              <h3 className="text-base font-bold uppercase tracking-wide">Conscious Material Selection</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                We consciously select high-performance materials from sustainable vendors. We build our products to minimize environmental waste through lasting durability.
              </p>
            </div>

            <div className="space-y-4 p-2">
              <div className="text-zinc-400 font-mono text-xs">// SYSTEM OPERATION 02</div>
              <h3 className="text-base font-bold uppercase tracking-wide">Absolute Ledger Honesty</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                No hidden luxury markups or artificial price inflations. We provide realistic, honest pricing built around true manufacturing costs.
              </p>
            </div>

            <div className="space-y-4 p-2">
              <div className="text-zinc-400 font-mono text-xs">// SYSTEM OPERATION 03</div>
              <h3 className="text-base font-bold uppercase tracking-wide">User Feedback Co-Authoring</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our user community directly shapes our future collections. We actively refine our design iterations based on real-world transaction logs and customer reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODERN CTA ENGAGEMENT BOARD */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white border border-zinc-200 shadow-xs rounded-[2rem] p-12 md:p-16 space-y-6 max-w-4xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Join Our Network</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#c01015]">
            Want to follow along with our journey?
          </h2>
          <p className="text-xs text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
            We are regularly looking for creative designers, system engineers, and strategic thinkers to join our fully remote product team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button className="bg-[#c01015] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition flex items-center justify-center gap-1.5 shadow-sm">
              Explore Active Openings <ArrowRight size={13} />
            </button>
            <button className="border border-zinc-200 bg-white text-zinc-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 transition">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}