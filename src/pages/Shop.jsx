import React, { useState, useEffect } from 'react';
import { Loader2, Search, SlidersHorizontal, Grid, Star, Heart, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  
  // Interactive Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
    const fetchShopData = async () => {
      try {
        // Fetch products and categories simultaneously
        const [prodRes, catRes] = await Promise.all([
          fetch('https://api.escuelajs.co/api/v1/products'),
          fetch('https://api.escuelajs.co/api/v1/categories?limit=5')
        ]);

        if (!prodRes.ok || !catRes.ok) throw new Error('Failed to retrieve catalog dataset.');
        
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        // Data processing: clean broken stringified array brackets if present in API
        const cleanProducts = prodData.map(p => ({
          ...p,
          // images: p.images.map(img => img.replace(/[\[\]"]/g, ""))  //error line 
          images: p.images.map(img => img.replace(/[[\]"]/g, ""))
        }));

        setProducts(cleanProducts);
        setCategories(catData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchShopData();
  }, []);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-50">
      <div className="relative flex items-center justify-center">
        <Loader2 className="animate-spin h-14 w-14 text-zinc-900" />
        <div className="absolute w-8 h-8 bg-[#f9b685] rounded-full animate-ping opacity-40"></div>
      </div>
      <p className="text-zinc-900 font-semibold tracking-widest uppercase text-xs mt-6 animate-pulse">
        Initializing Catalog Space...
      </p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-50 text-center px-4">
      <p className="text-red-500 font-bold mb-2">System Error Frame:</p>
      <p className="text-zinc-600 text-sm max-w-sm">{error}</p>
    </div>
  );

  // --- FILTER & SORT LOGIC ENGINE ---
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                              product.category?.name.toLowerCase() === selectedCategory.toLowerCase();
      
      let matchesPrice = true;
      if (selectedPriceRange === "under50") matchesPrice = product.price < 50;
      else if (selectedPriceRange === "50to150") matchesPrice = product.price >= 50 && product.price <= 150;
      else if (selectedPriceRange === "over150") matchesPrice = product.price > 150;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0; // Default sorting
    });

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 font-sans selection:bg-[#f9b786]">
      
      {/* SHOP PAGE HERO HEADER */}
      <div className="bg-[#da171d] text-white py-12 px-4 sm:px-6 lg:px-8 mb-10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#f9b685] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#000000] mb-2 flex items-center gap-1">
            Bazaar Studio <ChevronRight className="w-3 h-3" /> Catalog Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Explore Collection Frame</h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
            Filter through clean architectural lifestyle components, minimalist hardware, and modern design sets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* DESKTOP SIDEBAR FILTERS CONTROL */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 bg-white border border-zinc-200/60 p-6 rounded-2xl h-fit shadow-sm top-20 sticky">
            
            {/* Category Node */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Hub Frames</h3>
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`text-left text-sm py-1.5 px-3 rounded-xl font-medium transition-all ${selectedCategory === "all" ? "bg-zinc-900 text-white font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-left text-sm py-1.5 px-3 rounded-xl font-medium transition-all truncate ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "bg-zinc-900 text-white font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-zinc-100" />

            {/* Price Node */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Price Threshold</h3>
              <div className="flex flex-col gap-1">
                {[
                  { value: "all", label: "Any Price" },
                  { value: "under50", label: "Under Rs 50" },
                  { value: "50to150", label: "Rs 50 — Rs 150" },
                  { value: "over150", label: "Over Rs 150" }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-left text-sm py-1.5 px-3 rounded-xl font-medium transition-all Rs{selectedPriceRange === range.value ? "bg-zinc-900 text-black font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CATALOG INTERFACE CONTAINER */}
          <main className="flex-1 space-y-6">
            
            {/* UPPER TOOLBAR BAR (Search & Quick Sort) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-zinc-200/60 p-4 rounded-2xl shadow-sm">
              
              {/* Dynamic Interactive Search Module */}
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search catalog framework..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 outline-none transition-all"
                />
              </div>

              {/* Utility Dropdowns & Responsive Triggers */}
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 border border-zinc-200 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                </button>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-900 cursor-pointer shadow-inner"
                >
                  <option value="default">Sort Matrix</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="title">Alphabetical A-Z</option>
                </select>
              </div>
            </div>

            {/* LIVE SYSTEM SUMMARY METRICS */}
            <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center justify-between px-1">
              <span>System Output: {filteredProducts.length} Items Indexed</span>
              {(selectedCategory !== "all" || selectedPriceRange !== "all" || searchQuery) && (
                <button 
                  onClick={() => { setSelectedCategory("all"); setSelectedPriceRange("all"); setSearchQuery(""); }}
                  className="text-indigo-600 hover:underline flex items-center gap-1"
                >
                  Clear System Filters <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* PRODUCT CARD GRID LAYOUT */}
            {filteredProducts.length === 0 ? (
              <div className="text-center bg-white border border-dashed border-zinc-200 py-24 rounded-3xl text-zinc-400 font-medium text-sm shadow-inner">
                No components match your current data filter coordinates.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isFav = !!favorites[product.id];
                  return (
                    <div 
                      key={product.id} 
                      onClick={() => navigate(`/ProductDetails/${product.id}`)}
                      className="cursor-pointer relative group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Area Wrapper */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                        <img
                          src={product.images[0] && product.images[0].startsWith('http') ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'; }}
                        />
                        
                        {/* Categorization Node Label */}
                        <span className="absolute top-4 left-4 bg-zinc-900/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider z-10">
                          {product.category?.name || "Premium Item"}
                        </span>

                        {/* Interactive Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(product.id, e)}
                          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-zinc-900 rounded-xl hover:bg-white transition-all transform hover:scale-110 z-10 shadow-sm"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                        </button>

                        {/* Quick-action flyout panel */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              alert(`Added ${product.title} to selection framework!`); 
                            }}
                            className="w-full bg-zinc-900/90 hover:bg-zinc-900 text-white backdrop-blur-md py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Quick Purchase
                          </button>
                        </div>
                      </div>

                      {/* Content Informational Cluster */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 text-zinc-200 fill-current" />
                          <span className="text-zinc-400 font-bold ml-1 text-[10px]">(4.5)</span>
                        </div>

                        <h2 className="text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight">
                          {product.title}
                        </h2>

                        <div className="pt-2 flex items-center justify-between border-t border-zinc-50">
                          <span className="text-xl font-extrabold text-zinc-900">Rs {product.price}</span>
                          <span className="text-[11px] text-zinc-400 font-bold group-hover:text-indigo-600 transition-colors group-hover:underline flex items-center gap-0.5">
                            Configuration details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FULL DRAWER COMPONENT INTERFACE FILTERS */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${mobileFiltersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-out flex flex-col justify-between ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"><Grid className="w-4 h-4"/> Filter Options</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5"/></button>
            </div>
            
            {/* Category Cluster Mobile */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Hub Frames</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`text-xs px-3 py-2 rounded-xl font-bold transition-all ${selectedCategory === "all" ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-600"}`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-xs px-3 py-2 rounded-xl font-bold transition-all max-w-[120px] truncate ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-600"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Cluster Mobile */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Price Threshold</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "all", label: "Any" },
                  { value: "under50", label: "< Rs 50" },
                  { value: "50to150", label: "Rs 50 — Rs 150" },
                  { value: "over150", label: "> Rs 150" }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-xs py-2 px-3 rounded-xl font-bold text-center transition-all Rs{selectedPriceRange === range.value ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-600"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md"
          >
            Apply Matrix Setup
          </button>
        </div>
      </div>

    </div>
  );
};

export default Shop;