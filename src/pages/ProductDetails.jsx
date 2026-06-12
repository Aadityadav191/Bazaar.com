import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, ShoppingBag, Truck, ShieldCheck, ArrowRight,
  RefreshCw, Loader2, Heart, Plus, Minus, CheckCircle2 
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedNotify, setAddedNotify] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // 1. Stream primary specific item dataset
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) throw new Error("Product data unavailable");
        const data = await response.json();
        
        // Clean image array formatting string errors if existing in database
        const cleanImages = data.images.map(img => img.replace(/[[\]"]/g, ""));
        const cleanedProduct = { ...data, images: cleanImages };

        setProduct(cleanedProduct);
        setMainImage(cleanImages[0]);

        // 2. Stream relative items mapped directly by shared category constraint
        const relatedRes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${data.category?.id || 1}&limit=5`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          const cleanRelated = relatedData
            .map(p => ({ ...p, images: p.images.map(img => img.replace(/[[\]"]/g, "")) }))
            .filter(p => p.id !== parseInt(id))
            .slice(0, 4);
          setRelatedProducts(cleanRelated);
        }
      } catch (err) {
        console.error("Operational breakdown fetching product matrix data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // ==========================================
  // ADD TO CART LOCAL STORAGE INTEGRATION
  // ==========================================
  const handleAddToCart = () => {
    if (!product) return;
    
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemMatchIndex = existingCart.findIndex(item => item.id === product.id);

    if (itemMatchIndex > -1) {
      existingCart[itemMatchIndex].quantity += quantity;
    } else {
      existingCart.push({ id: product.id, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage")); // Dispatch global layout notification
    
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  // ==========================================
  // LOADING STATE COMPONENT
  // ==========================================
  if (loading) return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-zinc-50 font-sans space-y-3">
      <Loader2 className="animate-spin h-8 w-8 text-[#c01015]" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Constructing Asset Frame...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-zinc-50 font-sans space-y-4">
      <p className="text-sm font-bold tracking-tight text-zinc-400">PRODUCT NOT RESOLVED IN MATRIX</p>
      <button onClick={() => navigate('/shop')} className="px-4 py-2 border border-[#c01015] text-xs font-bold uppercase tracking-wide rounded-xl bg-white hover:bg-zinc-50 transition">
        Return to Catalog
      </button>
    </div>
  );

  return (
    <div className="bg-zinc-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans text-[#c01015] selection:bg-zinc-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b pb-4 border-zinc-200/60">
          <span className="hover:text-[#c01015] cursor-pointer transition" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#c01015] cursor-pointer transition" onClick={() => navigate('/shop')}>Shop</span>
          <span>/</span>
          <span className="text-[#c01015] normal-case font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* MAIN PRODUCT VIEWPORT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT INTERFACE PANEL: GALLERY MATRIX (COL-SPAN 5) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200/60 p-4 flex items-center justify-center group shadow-xs">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600";
                }}
              />
              <button className="absolute top-4 right-4 p-2.5 bg-white/90 border border-zinc-200/50 backdrop-blur-md rounded-xl shadow-xs hover:bg-white transition group">
                <Heart className="w-4 h-4 text-zinc-400 group-hover:text-red-600 group-hover:fill-red-600 transition" />
              </button>
            </div>
            
            {/* THUMBNAIL TRACK SLIDER */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {product.images?.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl bg-white p-1 overflow-hidden border transition ${mainImage === img ? 'border-[#c01015] ring-2 ring-zinc-200/50' : 'border-zinc-200/60 opacity-60 hover:opacity-100'}`}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                    alt="" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT INTERFACE PANEL: INFORMATION SPECIFICATIONS (COL-SPAN 7) */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            
            {/* ITEM IDENTIFIERS */}
            <div className="border-b border-zinc-100 pb-5 space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-red-50 text-[#c01014] text-[9px] font-bold rounded border border-red-100/50 uppercase tracking-widest">
                {product.category?.name || "General Asset"}
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-[#c01015]">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium pt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#c01015]">4.8</span>
                  <span className="text-zinc-400 font-normal text-[11px]">(1.2k Verified Logs)</span>
                </div>
                <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> IN STOCK / AVAILABLE
                </div>
              </div>
            </div>

            {/* LEDGER PRICING SYSTEM */}
            <div className="py-2 flex items-baseline gap-4">
              <span className="text-4xl font-black font-mono text-[#c01015]">${product.price}</span>
              <span className="text-sm font-mono text-zinc-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded">
                SAVE 20%
              </span>
            </div>

            {/* QUANTITY CONSTRAINTS & INTERACTION PACK */}
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Select Allocation Volume</label>
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* Quantity Toggle Block */}
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1 h-12 self-start sm:self-auto shadow-xs">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-[#c01015] transition"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-zinc-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 hover:bg-white rounded-lg text-zinc-500 hover:text-[#c01015] transition"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Primary Add Action */}
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#c01015] hover:bg-zinc-800 text-white h-12 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-98 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> Mount into Cart Array
                </button>
              </div>

              {/* Instant Secondary Settlement Action */}
              <button 
                onClick={handleBuyNow}
                className="w-full border border-zinc-200 bg-white text-zinc-800 h-12 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 hover:border-zinc-300 transition active:scale-98 shadow-xs"
              >
                Instantaneous Direct Purchase
              </button>

              {/* Added to Cart Dynamic Toast Drawer Notification */}
              {addedNotify && (
                <div className="p-3 bg-[#c01015] text-white text-xs font-medium rounded-xl flex items-center justify-between shadow-md animate-fade-in-up">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Allocated {quantity} unit(s) into your session ledger.
                  </span>
                  <button onClick={() => navigate('/cart')} className="text-[10px] uppercase font-bold tracking-wider text-red-400 hover:text-red-300 underline pl-2">
                    Open Cart
                  </button>
                </div>
              )}
            </div>

            {/* TAB ACCORDION INFRASTRUCTURE */}
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <div className="flex gap-6 border-b border-zinc-100 mb-4">
                {['description', 'specifications', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[10px] font-bold uppercase tracking-widest transition relative ${activeTab === tab ? 'text-[#c01015]' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c01015] rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="text-xs text-zinc-500 leading-relaxed min-h-[80px] font-medium">
                {activeTab === 'description' && product.description}
                {activeTab === 'specifications' && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-zinc-600">
                    <li className="flex items-center gap-2 py-1 border-b border-zinc-50"><div className="w-1 h-1 bg-zinc-400 rounded-full" /> <span className="font-bold text-zinc-800">Quality:</span> Premium Grade Matrix</li>
                    <li className="flex items-center gap-2 py-1 border-b border-zinc-50"><div className="w-1 h-1 bg-zinc-400 rounded-full" /> <span className="font-bold text-zinc-800">Footprint:</span> Certified Eco-conscious</li>
                    <li className="flex items-center gap-2 py-1 border-b border-zinc-50"><div className="w-1 h-1 bg-zinc-400 rounded-full" /> <span className="font-bold text-zinc-800">Design:</span> Minimalist Architecture</li>
                    <li className="flex items-center gap-2 py-1 border-b border-zinc-50"><div className="w-1 h-1 bg-zinc-400 rounded-full" /> <span className="font-bold text-zinc-800">Release:</span> 2026 Sovereign Edition</li>
                  </ul>
                )}
                {activeTab === 'shipping' && "Complimentary automated standard freight shipping applied automatically across checking balances exceeding $150. Base transit window sets standard landing variables at roughly 3–5 structural operational business cycles."}
              </div>
            </div>

            {/* COMPLIANCE TRUST TRUST NODES */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-zinc-100 text-center">
              <div className="p-3 bg-zinc-50/60 border border-zinc-200/40 rounded-xl flex flex-col items-center gap-1.5">
                <Truck className="w-4 h-4 text-zinc-400" />
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-wide">Secure Freight</span>
              </div>
              <div className="p-3 bg-zinc-50/60 border border-zinc-200/40 rounded-xl flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-wide">SSL Encrypted</span>
              </div>
              <div className="p-3 bg-zinc-50/60 border border-zinc-200/40 rounded-xl flex flex-col items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-wide">14-Day Return</span>
              </div>
            </div>

          </div>
        </div>

        {/* RELATED COMPLEMENTARY RECOMMENDATIONS TRACK */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-zinc-200/60">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Curated Options</p>
                <h3 className="text-xl font-black tracking-tight mt-0.5">You Might Also Require</h3>
              </div>
              <div className="w-1/3 h-[1px] bg-zinc-200/60 hidden sm:block"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => navigate(`/ProductDetails/${p.id}`)}
                  className="group cursor-pointer bg-white border border-zinc-200/60 rounded-2xl p-3 shadow-xs hover:border-zinc-300 transition flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-zinc-50 p-2 flex items-center justify-center mb-3">
                    <img 
                      src={p.images?.[0]} 
                      alt={p.title} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-102 transition duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-[#c01015] truncate tracking-tight group-hover:text-zinc-600 transition">{p.title}</h4>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono font-black text-[#c01015]">${p.price}</span>
                      <span className="text-[9px] font-bold uppercase text-zinc-400 flex items-center gap-0.5 group-hover:text-[#c01015] transition">
                        View <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}