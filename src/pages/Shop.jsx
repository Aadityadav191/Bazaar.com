import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star } from 'lucide-react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Modern Store</h1>
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            0
          </span>
        </div>
      </header>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-200">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/640x640?text=No+Image'; }}
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-gray-700">4.5</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {product.category?.name || 'General'}
              </span>
              <h2 className="mt-1 text-lg font-bold text-gray-800 truncate" title={product.title}>
                {product.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                {product.description}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">
                  ${product.price}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 active:scale-95">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;