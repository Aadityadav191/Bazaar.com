import React, { useState, useEffect } from "react";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  Grid,
  Star,
  Heart,
  ShoppingBag,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, fetchTopCategories } from "../services/productService";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const { addToCart } = useCart();

  // Interactive Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // PAGINATION ENGINE STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const fetchShopData = async () => {
      try {
        // CLEAN REFACTOR: Executing decoupled abstractions from productService
        const [prodData, catData] = await Promise.all([
          fetchProducts(),
          fetchTopCategories(5),
        ]);

        setProducts(prodData);
        setCategories(catData);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-50 text-center px-4">
        <p className="text-zinc-900 font-bold mb-1 text-sm">
          Catalog Initialization Failure
        </p>
        <p className="text-zinc-400 text-xs max-w-sm">{error}</p>
      </div>
    );

  // --- FILTER & SORT LOGIC ENGINE ---
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category?.name.toLowerCase() === selectedCategory.toLowerCase();

      let matchesPrice = true;
      if (selectedPriceRange === "under50") matchesPrice = product.price < 50;
      else if (selectedPriceRange === "50to150")
        matchesPrice = product.price >= 50 && product.price <= 150;
      else if (selectedPriceRange === "over150")
        matchesPrice = product.price > 150;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  // --- COMPUTE PAGINATION SLICES ---
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPagedProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 font-sans selection:bg-zinc-200">
      {/* PREMIUM MINIMALIST HERO HEADER */}
      <div className="bg-[#c01015] border-b border-zinc-200 py-12 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1.5">
              Bazaar Studio <ChevronRight className="w-3 h-3 text-zinc-300" />{" "}
              Catalog Index
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Explore Collection Frame
            </h1>
            <p className="text-zinc-200 text-xs sm:text-sm max-w-md mt-1.5 leading-relaxed">
              Filter through clean architectural lifestyle components,
              minimalist hardware, and modern design sets.
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-2xl font-black tracking-tight text-white font-mono">
              {totalItems}
            </span>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-200">
              Available units live
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* DESKTOP SIDEBAR FILTERS CONTROL */}
          <aside className="hidden lg:block w-60 flex-shrink-0 space-y-7 top-24 sticky h-fit">
            {/* Category Node Layout */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Hub Frames
              </h3>
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-left text-xs py-2 px-3 rounded-xl font-semibold transition-all ${selectedCategory === "all" ? "bg-[#c01015] text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-950"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-left text-xs py-2 px-3 rounded-xl font-semibold transition-all truncate ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "bg-[#c01015] text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-950"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            {/* Price Threshold Layout */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Price Threshold
              </h3>
              <div className="flex flex-col gap-0.5">
                {[
                  { value: "all", label: "Any Price" },
                  { value: "under50", label: "Under Rs 50" },
                  { value: "50to150", label: "Rs 50 — Rs 150" },
                  { value: "over150", label: "Over Rs 150" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-left text-xs py-2 px-3 rounded-xl font-semibold transition-all ${selectedPriceRange === range.value ? "bg-[#c01015] text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-950"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CATALOG INTERFACE CONTAINER */}
          <main className="flex-1 space-y-6">
            {/* UPPER NAVBAR TOOLBAR CONTROLS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-zinc-200/80 p-3.5 rounded-2xl shadow-xs">
              {/* Interactive Search Field */}
              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Search item assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:border-zinc-900 outline-none transition-all"
                />
              </div>

              {/* Utility Actions */}
              <div className="flex gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 border border-zinc-200 px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition"
                >
                  <SlidersHorizontal size={13} /> Filters
                </button>

                <div className="relative flex items-center">
                  <ArrowUpDown
                    size={12}
                    className="absolute left-3.5 pointer-events-none text-zinc-400"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-8 pr-8 py-2 text-xs font-bold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-900 cursor-pointer appearance-none hover:bg-zinc-100 transition"
                  >
                    <option value="default">Sort Parameters</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="title">Alphabetical A-Z</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none text-zinc-400 text-[8px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* STATUS MATRIX SUMMARY */}
            <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between px-1">
              <span>
                Showing {indexOfFirstItem + 1}–
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} items
                indexed
              </span>
              {(selectedCategory !== "all" ||
                selectedPriceRange !== "all" ||
                searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedPriceRange("all");
                    setSearchQuery("");
                  }}
                  className="text-zinc-900 hover:underline flex items-center gap-1 normal-case font-bold"
                >
                  Clear System Filters <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>

            {/* PRODUCT CARD GRID LAYOUT */}
            {currentPagedProducts.length === 0 ? (
              <div className="text-center bg-white border border-dashed border-zinc-200/80 py-24 rounded-2xl text-zinc-400 font-medium text-xs shadow-inner">
                No Products Match the Current Search. <br />
                Try adjusting your search query or filter settings to discover
                available items.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPagedProducts.map((product) => {
                  const isFav = !!favorites[product.id];
                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/ProductDetails/${product.id}`)}
                      className="cursor-pointer relative group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Area Container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                        <img
                          src={
                            product.images[0] &&
                            product.images[0].startsWith("http")
                              ? product.images[0]
                              : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
                          }
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
                          }}
                        />

                        {/* Categorization Tag */}
                        <span className="absolute top-3 left-3 bg-white/95 border border-zinc-200 text-zinc-800 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider z-10 shadow-xs">
                          {product.category?.name || "Premium"}
                        </span>

                        {/* Favorite Button Overlay */}
                        <button
                          onClick={(e) => toggleFavorite(product.id, e)}
                          className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-xs border border-zinc-100 text-zinc-900 rounded-xl hover:bg-white transition shadow-xs"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-colors ${isFav ? "fill-rose-500 text-rose-500" : "text-zinc-500"}`}
                          />
                        </button>

                        {/* Purchase Slide-up Overlay Panel */}
                        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents layout from routing to Details screen
                              addToCart(product); // Stream the actual API asset node to global state
                              toast.success(`Added ${product.title} to Cart`, {
                                autoClose: 1500,
                              });
                            }}
                            className="w-full bg-zinc-950 hover:bg-zinc-900 text-white py-2.5 rounded-xl font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <ShoppingBag size={12} /> Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Info Typography Cluster */}
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 text-zinc-200 fill-current" />
                            <span className="text-zinc-400 font-bold ml-1">
                              (4.5)
                            </span>
                          </div>

                          <h2 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1 tracking-tight">
                            {product.title}
                          </h2>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                          <span className="text-sm font-black text-zinc-950 font-mono">
                            Rs {product.price}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-bold group-hover:text-zinc-900 transition-colors flex items-center gap-0.5">
                            Details <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* --- PREMIUM DYNAMIC PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>

                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center border ${
                          currentPage === page
                            ? "bg-[#c01015] text-white border-zinc-950 shadow-xs"
                            : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FULL DRAWER INTERFACE FILTERS */}
      <div
        className={`fixed inset-0 bg-zinc-950/40 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden ${mobileFiltersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-76 bg-white shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-out flex flex-col justify-between ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Grid size={14} /> Filter Options
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Node Mobile */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Hub Frames
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all border ${selectedCategory === "all" ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-600 border-zinc-200/60"}`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all border max-w-[120px] truncate ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-600 border-zinc-200/60"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Node Mobile */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Price Threshold
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: "all", label: "Any" },
                  { value: "under50", label: "< Rs 50" },
                  { value: "50to150", label: "Rs 50—150" },
                  { value: "over150", label: "> Rs 150" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-[11px] py-2 px-2 rounded-xl font-bold text-center transition-all border ${selectedPriceRange === range.value ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-50 text-zinc-600 border-zinc-200/60"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition shadow-md"
          >
            Apply Configurations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
