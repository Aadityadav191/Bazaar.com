import React from "react";
import { Star, Heart, ShoppingBag, ChevronRight } from "lucide-react";

export const ProductCard = ({ product, isFav, onToggleFav, onAddToCart, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer relative">
      <div className="relative aspect-[3/4] rounded-2xl bg-zinc-50 overflow-hidden mb-5 border border-zinc-100 shadow-sm">
        <img
          src={product.images[0]?.startsWith("http") ? product.images[0] : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          alt={product.title}
        />
        <span className="absolute top-4 left-4 bg-[#c01015] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider z-10">
          {product.category?.name || "Premium"}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(product.id); }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-red-900 rounded-xl hover:bg-white transition-all z-10 shadow-sm"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-900" : "text-zinc-600"}`} />
        </button>
        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full bg-zinc-900/90 hover:bg-zinc-900 text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart 
          </button>
        </div>
      </div>
      <div className="space-y-2 px-1">
        <div className="flex items-center gap-1 text-amber-500 text-xs">
          {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
          <Star className="w-3.5 h-3.5 fill-current text-zinc-200" />
          <span className="text-[#c01015] font-bold ml-1 text-[11px]">(4.2)</span>
        </div>
        <h4 className="font-bold text-base text-zinc-900 group-hover:text-[#C01015] transition-colors line-clamp-1 tracking-tight">
          {product.title}
        </h4>
        <div className="flex items-center justify-between pt-1">
          <p className="font-extrabold text-lg text-zinc-900">Rs {product.price}</p>
          <span className="text-xs text-[#c01015] font-bold group-hover:underline flex items-center gap-0.5">
            View details <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};