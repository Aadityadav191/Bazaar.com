import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroProduct, setHeroProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch more products than we need so we have a pool for the random hero
        const prodRes = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"
        );
        const prodData = await prodRes.json();

        // --- RANDOM SELECTION LOGIC ---
        // Pick a random product from the returned list for the Hero section
        const randomIndex = Math.floor(Math.random() * prodData.length);
        const selectedHero = prodData[randomIndex];
        setHeroProduct(selectedHero);

        // Filter the hero out of the trending list so it doesn't appear twice
        const filteredTrending = prodData
          .filter(p => p.id !== selectedHero.id)
          .slice(0, 8); // Keep only 8 for the grid
        
        setProducts(filteredTrending);
        // ------------------------------

        // 2. Fetch categories
        const catRes = await fetch(
          "https://api.escuelajs.co/api/v1/categories?limit=3"
        );
        const catData = await catRes.json();
        setCategories(catData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading LUMINA Experience...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-gray-900 h-[600px] flex items-center overflow-hidden">
        {heroProduct && (
          <>
            <div className="absolute inset-0">
              <img
                src={heroProduct.images[0].startsWith('http') ? heroProduct.images[0] : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000"}
                alt="Hero background"
                className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
              <div className="inline-flex items-center gap-2 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 px-3 py-1 rounded-full mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  New Discovery
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter leading-none">
                {heroProduct.title.split(" ").slice(0, 2).join(" ")} <br />
                <span className="text-indigo-400">Essentials.</span>
              </h2>

              <p className="text-lg md:text-xl mb-8 max-w-md text-gray-300 line-clamp-2">
                {heroProduct.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(`/ProductDetails/${heroProduct.id}`)}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 group"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-col justify-center">
                  <span className="text-gray-400 text-sm">Starting from</span>
                  <span className="text-2xl font-bold">${heroProduct.price}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight">Shop by Category</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative h-80 overflow-hidden rounded-3xl bg-gray-200 cursor-pointer shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.name} />
              <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                <h4 className="text-3xl font-bold mb-1">{cat.name}</h4>
                <p className="text-indigo-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm">
                  Browse Collection <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING ITEMS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 tracking-tight">Trending Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.id} onClick={() => navigate(`/ProductDetails/${product.id}`)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-2xl bg-gray-50 overflow-hidden mb-5">
                  <img
                    src={product.images[0].startsWith('http') ? product.images[0] : "https://via.placeholder.com/600x800"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={product.title}
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.title}</h4>
                  <p className="font-black text-xl text-indigo-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;