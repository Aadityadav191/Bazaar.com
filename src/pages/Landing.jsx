import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useHomeData } from "../features/home/hooks/useHomeData";
import { HeroSlideshow } from "../features/home/components/HeroSlideshow";
import { ProductCard } from "../Components/ui/ProductCard";
import Loader from "../Components/Loader";
import { CategorySection } from "../features/home/components/CategorySection";
import { PromoBanner } from "../features/home/components/PromoBanner";
import { Testimonials } from "../features/home/components/Testimonials";

// Static UI Assets can safely live compiled right below the imports
const PROPOSITIONS = [
  {
    title: "Global Express Delivery",
    desc: "Free shipping on orders over $150",
  },
  { title: "Secure Payment Gateway", desc: "Fully encrypted transactions" },
  { title: "30-Day Return Evaluation", desc: "Hassle-free dynamic exchanges" },
  { title: "Eco-Conscious Packaging", desc: "100% biodegradable materials" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const {
    loading,
    activeTab,
    setActiveTab,
    favorites,
    toggleFavorite,
    filteredProducts,
  } = useHomeData();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-[#f9b685]">
      {/* 1. HERO SLIDESHOW DOMAIN LAYER */}
      <HeroSlideshow />

      {/* 2. VALUE PROPOSITIONS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm">
          {PROPOSITIONS.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-2 group">
              <div className="p-3 rounded-2xl bg-[#c01015]/50 text-zinc-900 group-hover:bg-[#f9b685] group-hover:text-white transition-all duration-300" />
              <div>
                <h4 className="font-bold text-sm tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#c01015]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE PRODUCT ARCHIVE FILTER MODULE */}
      {/* PRODUCT SECTION */}
      <section
        id="trending-products"
        className="bg-white border-y border-zinc-100 py-24 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-[#c01015]">
              Trending Items
            </h3>
            <div className="flex flex-wrap gap-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100">
              {/* Syncing exact matching string categories with your state engine array */}
              {["all", "electronics", "shoes", "furniture"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab.toLowerCase() === tab.toLowerCase()
                      ? "bg-[#c01015] text-white shadow-md"
                      : "text-zinc-500 hover:bg-zinc-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* FALLBACK MATRIX RENDERING IF ARRAY RETURNS EMPTY */}
          {filteredProducts.length === 0 ? (
            <div className="text-center bg-white border border-dashed border-zinc-200/80 py-24 rounded-2xl text-zinc-400 font-medium text-xs shadow-inner">
              No Products Match the Current Search. <br />
              Try adjusting your filter settings to discover available items.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {/* Slice down to 8 to maintain a clean landing page layout profile */}
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFav={!!favorites[product.id]}
                  onToggleFav={(id, e) => toggleFavorite(id, e)}
                  onClick={() => navigate(`/ProductDetails/${product.id}`)}
                  onAddToCart={(prod) =>
                    toast.success(`Added ${prod.title.slice(0, 20)} to Cart`, {
                      autoClose: 1500,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <CategorySection />
      </section>

      <section>
        <PromoBanner />
      </section>

      <section>
        <Testimonials />
      </section>
    </div>
  );
};

export default HomePage;
