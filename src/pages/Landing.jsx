import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  Star, 
  ArrowRight, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 1. Import your local assets correctly
import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Hero3 from "../assets/Hero3.png";
import Hero4 from "../assets/Hero4.png";
import Hero5 from "../assets/Hero5.png";
import Hero6 from "../assets/Hero6.png";
import Loader from "../Components/Loader";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState({});

  // 2. Track the active slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // Array of imported images for the background slideshow loop
  const heroImages = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6];

  // Fetch API data for categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=12",
        );
        const prodData = await prodRes.json();
        // Clean any broken stringified array brackets from images if present in API data
        const cleanProducts = prodData.map(p => ({
          ...p,
          // images: p.images.map(img => img.replace(/[\[\]"]/g, ""))   //error line 
          images: p.images.map(img => img.replace(/[[\]"]/g, ""))

        }));
        setProducts(cleanProducts);

        const catRes = await fetch(
          "https://api.escuelajs.co/api/v1/categories?limit=3",
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

  // 3. Slideshow interval logic: advances slide index every 4000ms
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      // <Loader/>
      <Loader/>
    );
  }

  // Simple clean handling for filter tabs
  const filteredProducts = activeTab === "all" 
    ? products.slice(0, 8)
    : products.filter(p => p.category?.name.toLowerCase() === activeTab.toLowerCase()).slice(0, 8);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-[#f9b685] selection:text-zinc-900">
      
      {/* 4. HERO SECTION: UNTOUCHED - Sliders, timers, and absolute layouts preserved exactly */}
      <section className="relative w-full aspect-[21/6] min-h-[350px] bg-gray-900 overflow-hidden flex items-center">
        {/* Sliding Image Strip Layer */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image}
                alt={`Bazaar Slide ${index + 1}`}
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          ))}
        </div>

        {/* Ambient Gradient Overlays for optimal content legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Static Hero Text Layer */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 px-3 py-1 rounded-full mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Curated Collections
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tighter leading-none">
            Elevate Your <br />
            <span className="text-indigo-400">Everyday Space.</span>
          </h2>

          <p className="text-base md:text-lg mb-8 max-w-md text-gray-300">
            Discover minimalist design and premium essentials tailored around
            contemporary lifestyle concepts.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                const targetSection =
                  document.getElementById("trending-products");
                if (targetSection)
                  targetSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 group shadow-lg"
            >
              Explore Bazaar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 5. Slide Position Indicators/Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-[#c01015]" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CORE VALUE BRAND PROPOSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 p-2 group">
            <div className="p-3 rounded-2xl bg-[#c01015]/50 text-zinc-900 group-hover:bg-[#f9b685] group-hover:text-white transition-all duration-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">Global Express Delivery</h4>
              <p className="text-xs text-[#c01015]">Free shipping on orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 group">
            <div className="p-3 rounded-2xl  bg-[#c01015]/50 text-zinc-900 group-hover:bg-[#f9b685] group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">Secure Payment Gateway</h4>
              <p className="text-xs text-[#c01015]">Fully encrypted transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 group">
            <div className="p-3 rounded-2xl  bg-[#c01015]/50 text-zinc-900 group-hover:bg-[#f9b685] group-hover:text-white transition-all duration-300">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">30-Day Return Evaluation</h4>
              <p className="text-xs text-[#c01015]">Hassle-free dynamic exchanges</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 group">
            <div className="p-3 rounded-2xl  bg-[#c01015]/50 text-zinc-900 group-hover:bg-[#f9b685] group-hover:text-white transition-all duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">Eco-Conscious Packaging</h4>
              <p className="text-xs text-[#c01015]">100% biodegradable materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-6 h-[2px] bg-[#f9b685]"></span> Architectural Design
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-[#c01015]">
              Shop by Category
            </h3>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold border-b-2 border-zinc-900 pb-1 hover:text-[#f9b685] hover:border-[#f9b685] transition-all">
            See All Design Hubs <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative h-[420px] overflow-hidden rounded-3xl bg-zinc-200 cursor-pointer shadow-sm border border-zinc-100"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent安全 z-10 opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
              <img
                src={cat.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                alt={cat.name}
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f9b685] mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Premium Quality
                </p>
                <h4 className="text-3xl font-extrabold mb-3 tracking-tight">{cat.name}</h4>
                <div className="h-[2px] w-12 bg-white mb-4 group-hover:w-full transition-all duration-500 ease-in-out"></div>
                <p className="font-medium flex items-center gap-2 text-sm opacity-90 group-hover:text-[#f9b685] transition-colors">
                  Browse Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL SPLIT INTERACTIVE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-[32px] overflow-hidden relative shadow-xl border border-zinc-800">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#f9b685] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 sm:p-12 md:p-16 text-white space-y-6">
              <span className="bg-white/10 text-[#f9b685] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/5">
                Limited Season Offer
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                Experience Comfort, <br />Redefined.
              </h3>
              <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
                Join our premium tier network today. Unlock early production drops, personalized item consultations, and a 15% initialization coupon.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button className="bg-[#f9b685] text-zinc-900 px-8 py-4 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[#f9b685]/10">
                  Claim Your Coupon <ShoppingBag className="w-4 h-4" />
                </button>
                <span className="text-xs text-zinc-500 font-medium tracking-tight block">T&C Apply. Offers expire bi-weekly.</span>
              </div>
            </div>
            <div className="relative h-64 lg:h-[450px] bg-zinc-800 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200" 
                alt="Minimal lifestyle architectural layout" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 cursor-zoom-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING ITEMS CONTAINER */}
      <section id="trending-products" className="bg-white border-y border-zinc-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                <span className="w-6 h-[2px] bg-[#f9b685]"></span> Verified Selections
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
                Trending Items
              </h3>
            </div>
            
            {/* Interactive Tab Filters */}
            <div className="flex flex-wrap gap-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100">
              {["all", "electronics", "shoes", "furniture"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? "bg-zinc-900 text-white shadow-md" 
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 font-medium">
              No matching items available in this category frame right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => {
                const isFav = !!favorites[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/ProductDetails/${product.id}`)}
                    className="group cursor-pointer relative"
                  >
                    {/* Image Area with Actions Overlay */}
                    <div className="relative aspect-[3/4] rounded-2xl bg-zinc-50 overflow-hidden mb-5 border border-zinc-100 shadow-sm">
                      <img
                        src={
                          product.images[0] && product.images[0].startsWith("http")
                            ? product.images[0]
                            : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
                        }
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
                        }}
                      />
                      
                      {/* Dynamic Sale/Category Tag */}
                      <span className="absolute top-4 left-4 bg-zinc-900/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider z-10">
                        {product.category?.name || "Premium"}
                      </span>

                      {/* Interactive Heart Button */}
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-zinc-900 rounded-xl hover:bg-white transition-all transform hover:scale-110 z-10 shadow-sm"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
                      </button>

                      {/* Quick Add to Cart Panel slide-in */}
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

                    {/* Metadata block */}
                    <div className="space-y-2 px-1">
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current text-zinc-200" />
                        <span className="text-zinc-400 font-bold ml-1 text-[11px]">(4.2)</span>
                      </div>
                      
                      <h4 className="font-bold text-base text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight">
                        {product.title}
                      </h4>
                      
                      <div className="flex items-center justify-between pt-1">
                        <p className="font-extrabold text-lg text-zinc-900">
                          ${product.price}
                        </p>
                        <span className="text-xs text-zinc-400 font-bold group-hover:text-indigo-600 transition-colors group-hover:underline flex items-center gap-0.5">
                          View details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SOCIAL TRUST HUB / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f9b685] bg-[#f9b685]/10 px-3 py-1 rounded-full">
            Global Community Echo
          </span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mt-4">
            Trusted by Connoisseurs
          </h3>
          <p className="text-zinc-500 text-sm mt-2">
            Read real-time design feedback from verification layers across our distribution networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Aarusi Sharma ", role: "Interior Architect", text: "The architectural lines of the minimalism pieces sourced here transformed our interior studio deployment. Fast shipping." },
            { name: "Sneha Verma ", role: "Product Consultant", text: "Bazaar delivers consistently higher quality material sets than competitors at this optimization level. Highly recommended." },
            { name: "Devense marik", role: "Collector Enthusiast", text: "The item interfaces are pristine. Contextual support helped resolve a custom routing setup perfectly within an hour." }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm space-y-4 hover:border-[#f9b685] transition-all duration-300">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed italic">"{item.text}"</p>
              <div className="pt-2 border-t border-zinc-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 rounded-full font-bold text-xs text-zinc-700 flex items-center justify-center uppercase border border-zinc-200">
                  {item.name.substring(0, 2)}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-zinc-900 tracking-tight">{item.name}</h5>
                  <p className="text-xs text-zinc-400 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#c01015] text-zinc-400 border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-black text-lg font-black tracking-tighter">Bazaar</p>
          <p className="text-xs max-w-xs mx-auto text-black leading-relaxed">
            Curating state of the art minimalist furniture components and architectural design accessories for modern ecosystems.
          </p>
          <div className="h-[1px] w-12 bg-zinc-800 mx-auto my-4"></div>
          <p className="text-black text-[11px] font-medium">
            © {new Date().getFullYear()} Bazaar Lifestyle Inc. All premium structures reserved globally.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;