import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductDetails = ({ productId = 1 }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading product...</div>;
  if (!product) return <div className="h-screen flex justify-center items-center">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {/* Breadcrumb / Back Button */}
        <button className="flex items-center text-gray-500 hover:text-gray-800 mb-8 transition">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img 
                src={mainImage} 
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/640x640?text=No+Image'; }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${mainImage === img ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              {product.category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">4.8</span>
              </div>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500 underline cursor-pointer">128 Reviews</span>
            </div>

            <div className="mt-8">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 space-y-4">
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-4 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <span className="text-2xl">♡</span>
                </button>
              </div>
              <button className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold transition">
                Buy It Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;