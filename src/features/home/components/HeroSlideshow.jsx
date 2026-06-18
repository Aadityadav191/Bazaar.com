import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero1 from "../../../assets/Hero/Hero1.png";
import Hero2 from "../../../assets/Hero/Hero2.png";
import Hero3 from "../../../assets/Hero/Hero3.png";
import Hero4 from "../../../assets/Hero/Hero4.png";
import Hero5 from "../../../assets/Hero/Hero5.png";
import Hero6 from "../../../assets/Hero/Hero6.png";

const HERO_IMAGES = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6];

export const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full aspect-[21/6] min-h-[350px] bg-gray-900 overflow-hidden flex items-center">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_IMAGES.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img src={image} alt={`Bazaar Slide ${index + 1}`} className="w-full h-full object-cover opacity-60" />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/50 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 px-3 py-1 rounded-full mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Curated Collections</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tighter leading-none">
          Elevate Your <br />
          <span className="text-indigo-400">Everyday Space.</span>
        </h2>
        <p className="text-base md:text-lg mb-8 max-w-md text-gray-300">
          Discover minimalist design and premium essentials tailored around contemporary lifestyle concepts.
        </p>
        <Link to="/shop" className="inline-flex bg-white text-[#c01015] px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all items-center gap-2 group shadow-lg">
          Explore Bazaar
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-[#c01015]" : "w-2 bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};