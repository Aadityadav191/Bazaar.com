import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Star, ShoppingBag, Truck, ShieldCheck, 
  RefreshCw, Loader2, Heart, Share2, Plus, Minus, CheckCircle2 
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);

        // Fetching Related Products (same category)
        const relatedRes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${data.category.id}&limit=4`);
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter(p => p.id !== parseInt(id)));
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    if (id) fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
      <p className="text-gray-500 font-medium animate-pulse">Loading perfection...</p>
    </div>
  );

  if (!product) return <div className="h-screen flex justify-center items-center text-xl font-bold">Product Not Found</div>;

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-gray-50 border-b border-gray-100 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="space-y-6">
            <div className="group relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:fill-red-500 hover:text-red-500" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-6">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-widest mb-4">
                {product.category?.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`} />)}
                  <span className="ml-2 text-sm font-bold text-gray-900">4.8</span>
                  <span className="ml-1 text-sm text-gray-400 font-medium">(1.2k Reviews)</span>
                </div>
                <div className="h-4 w-[1px] bg-gray-200"></div>
                <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </div>
              </div>
            </div>

            <div className="py-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                <span className="text-xl text-gray-400 line-through font-medium">${(product.price * 1.2).toFixed(0)}</span>
                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">20% OFF</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-14 bg-gray-50">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 hover:bg-white transition-colors"
                  ><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 hover:bg-white transition-colors"
                  ><Plus className="w-4 h-4" /></button>
                </div>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-blue-200">
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
              </div>
              <button className="w-full border-2 border-gray-900 text-gray-900 h-14 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all">
                Buy It Now
              </button>
            </div>

            {/* Features Accordion-style Tabs */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <div className="flex gap-8 border-b border-gray-100 mb-6">
                {['description', 'details', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="text-gray-600 leading-relaxed min-h-[100px]">
                {activeTab === 'description' && product.description}
                {activeTab === 'details' && (
                  <ul className="grid grid-cols-2 gap-4">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Premium Quality</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Eco-friendly</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Modern Design</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> 2025 Edition</li>
                  </ul>
                )}
                {activeTab === 'shipping' && "Free standard shipping on orders over $100. Delivered within 3-5 business days."}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-gray-50 rounded-full"><Truck className="w-5 h-5 text-blue-600" /></div>
                <span className="text-[10px] font-bold uppercase text-gray-500">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-gray-50 rounded-full"><ShieldCheck className="w-5 h-5 text-blue-600" /></div>
                <span className="text-[10px] font-bold uppercase text-gray-500">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-gray-50 rounded-full"><RefreshCw className="w-5 h-5 text-blue-600" /></div>
                <span className="text-[10px] font-bold uppercase text-gray-500">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <div className="mt-24 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            You might also like
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigate(`/ProductDetails/${p.id}`)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-4 border border-gray-100 shadow-sm transition-all group-hover:shadow-md">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{p.title}</h4>
                <p className="text-blue-600 font-bold mt-1">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;