import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) throw new Error('Failed to fetch products');
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

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Loader2 className="animate-spin h-10 w-10 text-blue-500 mb-2" />
      <p>Loading Shop...</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/ProductDetails/${product.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-200">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/640x640?text=No+Image'; }}
              />
            </div>

            <div className="p-5">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {product.category?.name}
              </span>
              <h2 className="mt-1 text-lg font-bold text-gray-800 truncate">{product.title}</h2>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">${product.price}</span>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); // Prevents navigating to details when clicking button
                    alert("Added to cart"); 
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
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

export default Shop;