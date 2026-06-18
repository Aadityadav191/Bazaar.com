import React from "react";
import { ArrowUpRight } from "lucide-react";

export const CategorySection = ({ categories }) => {
  // Fallback data if the API limit returns empty
  const defaultCategories = [
    { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600" },
    { id: 2, name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600" },
    { id: 3, name: "Furniture", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600" }
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col mb-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">
          Shop by <span className="text-[#c01015]">Category</span>
        </h3>
        <p className="text-sm text-zinc-500 mt-1">Explore carefully curated essential edits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayCategories.slice(0, 3).map((category) => (
          <div 
            key={category.id} 
            className="group relative h-80 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm cursor-pointer"
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark overlay vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
            
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <h4 className="text-xl font-bold tracking-tight">{category.name}</h4>
                <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                  Discover Collection
                </p>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white group-hover:bg-[#c01015] group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};