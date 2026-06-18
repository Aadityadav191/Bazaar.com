import React from "react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aashish Shrestha",
    role: "Verified Buyer",
    rating: 5,
    text: "The delivery window was remarkably fast. The architectural build profile of the premium minimalist items exceeded my expectations.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
  },
  {
    id: 2,
    name: "Rohan Tamang",
    role: "Interior Designer",
    rating: 5,
    text: "Finding high-quality catalog items with clean API transparency is tough. Bazaar's catalog structure and customer service are outstanding.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
  },
  {
    id: 3,
    name: "Sneha Dixit",
    role: "Product Enthusiast",
    rating: 4,
    text: "Minimalist layout structures, sturdy packaging designs, and straightforward checkout routines. Will absolutely place another order next week.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
  }
];

export const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-zinc-50">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">
          What Our Community <span className="text-[#c01015]">Says</span>
        </h3>
        <p className="text-sm text-zinc-500 mt-2">
          Real stories and feedback from verified purchasers worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review) => (
          <div 
            key={review.id} 
            className="bg-white border border-zinc-100 rounded-2xl p-6 relative shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-100 group-hover:text-red-50 transition-colors pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-0.5 text-amber-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-50">
              <img 
                src={review.avatar} 
                alt={review.name} 
                className="w-10 h-10 rounded-full object-cover border border-zinc-100"
              />
              <div>
                <h5 className="font-bold text-sm tracking-tight text-zinc-900">{review.name}</h5>
                <p className="text-xs text-zinc-400 font-medium">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};