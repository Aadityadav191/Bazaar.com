import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, 
  CreditCard, ShieldCheck, Truck, RefreshCw 
} from 'lucide-react';
import { useCart } from '../../context/CartContext'; // Central hook invocation

export default function Cart() {
  const navigate = useNavigate();
  
  // Destructure direct state slices from your specialized context layer
  const { 
    cartItems, 
    updateQuantity, // Context mapping handler for incremental modifications
    removeFromCart, 
    cartTotalBalance 
  } = useCart();

  // ==========================================
  // RE-CALCULATE FINANCIAL BALANCES IN REAL-TIME
  // ==========================================
  const logisticsFee = cartTotalBalance > 150 || cartTotalBalance === 0 ? 0.00 : 9.99;
  const estimatedTax = cartTotalBalance * 0.08; // 8% State Base Tax Rule
  const definitiveTotal = cartTotalBalance + logisticsFee + estimatedTax;

  // ==========================================
  // EMPTY STATE FALLBACK SCREEN
  // ==========================================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center font-sans px-4 text-center space-y-5">
        <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 text-zinc-400 rounded-2xl flex items-center justify-center shadow-xs">
          <ShoppingBag size={24} />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-black tracking-tight text-zinc-900">Your bag is empty</h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Looks like you haven't added anything to your digital inventory registry yet.
          </p>
        </div>
        <Link to="/Shop">
          <button className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm">
            Continue Exploration
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900 selection:bg-zinc-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b pb-6 border-zinc-200">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Transaction Setup</p>
            <h1 className="text-3xl text-[#c01015] font-black tracking-tight mt-0.5">Shopping Bag</h1>
          </div>
          <button 
            onClick={() => navigate('/Shop')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#c01015] hover:text-zinc-900 transition"
          >
            <ArrowLeft size={14} /> Back to Buy
          </button>
        </div>

        {/* INTERFACE GRID METRIC */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: PRODUCT MANIFEST LIST */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Allocated Line Items ({cartItems.length})
            </h3>

            <div className="bg-white border border-zinc-200/60 rounded-2xl divide-y divide-zinc-100 overflow-hidden shadow-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  
                  {/* Image + Meta Details */}
                  <div className="flex items-start gap-4 w-full sm:w-auto text-left">
                    <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200/50 flex-shrink-0 flex items-center justify-center p-1 bg-white">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition duration-300" 
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#c01014] bg-red-50 px-2 py-0.5 rounded border border-red-100/40">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm tracking-tight text-zinc-900 mt-1">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400 font-medium">Standard Release Matrix</p>
                      <p className="text-[11px] font-mono text-zinc-400 pt-0.5">ID: {item.id}</p>
                    </div>
                  </div>

                  {/* Quantity and Ledger Pricing Adjusters */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8 pt-3 sm:pt-0 border-t sm:border-0 border-zinc-50">
                    
                    {/* Quantity Selector Matrix */}
                    <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white rounded-lg text-zinc-500 hover:text-zinc-900 transition"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-zinc-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white rounded-lg text-zinc-500 hover:text-zinc-900 transition"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Price and Bin Action */}
                    <div className="flex items-center gap-4 text-right">
                      <p className="text-sm font-black text-zinc-900 font-mono">
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </p>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                        aria-label="Remove item configuration"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* TRUST MARK FRAMEWORK */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              <div className="p-4 bg-white border border-zinc-200/50 rounded-xl flex items-center gap-3">
                <Truck size={16} className="text-zinc-400 flex-shrink-0" />
                <div>
                  <h5 className="text-[11px] font-bold text-zinc-800">Free Logistics Tier</h5>
                  <p className="text-[10px] text-zinc-400 leading-tight">Complementary delivery on purchases over Rs 150.</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-zinc-200/50 rounded-xl flex items-center gap-3">
                <ShieldCheck size={16} className="text-zinc-400 flex-shrink-0" />
                <div>
                  <h5 className="text-[11px] font-bold text-zinc-800">Encrypted Nodes</h5>
                  <p className="text-[10px] text-zinc-400 leading-tight">Banking processing endpoints remain fully secure.</p>
                </div>
              </div>
              <div className="p-4 bg-white border border-zinc-200/50 rounded-xl flex items-center gap-3">
                <RefreshCw size={16} className="text-zinc-400 flex-shrink-0" />
                <div>
                  <h5 className="text-[11px] font-bold text-zinc-800">14-Day Returns</h5>
                  <p className="text-[10px] text-zinc-400 leading-tight">Simplified automated reversal and claims path.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FINANCIAL BALANCE SUMMARY CARD */}
          <div className="space-y-6 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Checkout Ledger Statement
            </h3>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-5">
              
              {/* Summary Lines */}
              <div className="space-y-3 pb-4 border-b border-zinc-100 text-xs font-medium">
                <div className="flex justify-between text-zinc-500">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-zinc-900">Rs {cartTotalBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Estimated Logistics (Shipping)</span>
                  <span className="font-mono text-zinc-900">
                    {logisticsFee === 0 ? "FREE" : `Rs ${logisticsFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>State Value Added Tax (8%)</span>
                  <span className="font-mono text-zinc-900">Rs {estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Definitive Total</span>
                <span className="text-2xl font-black text-zinc-900 font-mono tracking-tight">
                  Rs {definitiveTotal.toFixed(2)}
                </span>
              </div>

              {/* Promo Input Node */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide block">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER CODE" 
                    className="w-full px-3 py-2 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none transition focus:border-zinc-900"
                  />
                  <button className="px-3.5 py-2 border bg-zinc-50 text-zinc-700 font-bold rounded-xl text-xs hover:bg-zinc-100 transition uppercase">
                    Apply
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#c01015] hover:bg-zinc-800 transition text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <CreditCard size={14} /> Commit Checkout Path
                </button>
                <p className="text-[10px] text-center text-zinc-400 leading-normal px-2">
                  Tax liabilities and shipping rates remain subject to configuration matching on destination entries.
                </p>
              </div>

            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}