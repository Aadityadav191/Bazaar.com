import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, ShieldCheck, Truck, 
  Lock, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';
import { fetchProducts } from "../../services/productService";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form State Nodes
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', 
    address: '', city: '', postalCode: '', phone: '',
    cardName: '', cardNumber: '', cardExpiry: '', cardCvc: ''
  });

  // INITIAL INVENTORY SYNC
  useEffect(() => {
    const loadCheckoutSummary = async () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (savedCart.length === 0) {
          navigate('/cart');
          return;
        }
        const catalogProducts = await fetchProducts();
        const mappedItems = savedCart.map(cartRow => {
          const liveMatch = catalogProducts.find(p => p.id === cartRow.id);
          return liveMatch ? {
            id: liveMatch.id,
            name: liveMatch.title,
            price: liveMatch.price,
            quantity: cartRow.quantity,
            image: liveMatch.images?.[0]
          } : null;
        }).filter(Boolean);

        setCartItems(mappedItems);
      } catch (err) {
        console.error("Checkout inventory sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCheckoutSummary();
  }, [navigate]);

  // Financial Ledger Calculations
  const orderSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const logisticsFee = orderSubtotal > 150 ? 0.00 : 9.99;
  const estimatedTax = orderSubtotal * 0.08;
  const definitiveTotal = orderSubtotal + logisticsFee + estimatedTax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // TRANSACTION SUBMISSION SIMULATION ==========================================
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock API Payment Processing Cycle (2 seconds delay)
    setTimeout(() => {
      setSubmitting(false);
      setOrderComplete(true);
      localStorage.removeItem("cart"); // Flush basket state upon execution success
      window.dispatchEvent(new Event("storage"));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center font-sans space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Securing Gateway Channels...</p>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center font-sans px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-[#c01015] rounded-2xl flex items-center justify-center border border-emerald-100 shadow-xs animate-bounce">
          <CheckCircle2 size={32} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-[#c01015]">Transaction Confirmed!</h1>
          <p className="text-xs text-red-500 max-w-sm mx-auto leading-relaxed">
            Your ledger authorization processed successfully. A confirmation summary tracking dispatch parameters has been dispatched to <span className="font-bold text-[#c01015]">{formData.email || 'your email'}</span>.
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#c01015] hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
        >
          Return to Terminal Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900 selection:bg-zinc-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-6 border-zinc-200">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
              <Lock size={10} className="text-zinc-400" /> Secure Transport Layer (SSL)
            </p>
            <h1 className="text-3xl font-black tracking-tight mt-0.5 text-[#c01015]">Secure Checkout</h1>
          </div>
          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500 hover:text-zinc-900 transition"
          >
            <ArrowLeft size={14} /> Review Basket
          </button>
        </div>

        {/* WORKFLOW MATRIX */}
        <form onSubmit={handleSubmitOrder} className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT FORM FIELD FIELDS FRAME */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. CONTACT RECORD */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 border-zinc-100">
                <span className="w-5 h-5 rounded-md bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">01</span>
                <h3 className="font-black text-sm uppercase tracking-wide text-[#c01015]">Contact Manifest</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Email Address</label>
                <input 
                  type="email" required name="email" value={formData.email} onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                />
              </div>
            </div>

            {/* 2. SHIPPING ARCHITECTURE */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b pb-3 border-zinc-100">
                <span className="w-5 h-5 rounded-md bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">02</span>
                <h3 className="font-black text-sm uppercase tracking-wide text-[#c01015]">Logistics Destination</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">First Name</label>
                  <input 
                    type="text" required name="firstName" value={formData.firstName} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Last Name</label>
                  <input 
                    type="text" required name="lastName" value={formData.lastName} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Street Address</label>
                <input 
                  type="text" required name="address" value={formData.address} onChange={handleInputChange}
                  placeholder="Suite, Building, Street Line"
                  className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">City</label>
                  <input 
                    type="text" required name="city" value={formData.city} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Postal Code</label>
                  <input 
                    type="text" required name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                    placeholder="XXXXX"
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Phone Number</label>
                <input 
                  type="tel" required name="phone" value={formData.phone} onChange={handleInputChange}
                  placeholder="+977 98271828292"
                  className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                />
              </div>
            </div>

            {/* 3. CARD SETTLEMENT MODULE */}
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">03</span>
                  <h3 className="font-black text-sm uppercase tracking-wide text-[#c01015]">Payment Node</h3>
                </div>
                <div className="flex gap-1 text-zinc-300">
                  <CreditCard size={16} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Name on Card</label>
                <input 
                  type="text" required name="cardName" value={formData.cardName} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-medium outline-none transition focus:border-zinc-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000" maxLength="19"
                    className="w-full pl-4 pr-10 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none transition focus:border-zinc-900"
                  />
                  <Lock size={12} className="absolute right-3.5 top-3.5 text-zinc-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Expiration Date</label>
                  <input 
                    type="text" required name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange}
                    placeholder="MM / YY" maxLength="5"
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none transition focus:border-zinc-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wide">Security Code (CVC)</label>
                  <input 
                    type="password" required name="cardCvc" value={formData.cardCvc} onChange={handleInputChange}
                    placeholder="•••" maxLength="4"
                    className="w-full px-4 py-2.5 bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ESCROW OVERVIEW PANEL */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Escrow Summary Verify
            </h3>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs space-y-5">
              
              {/* Product Layout Manifest Strip */}
              <div className="max-h-48 overflow-y-auto divide-y divide-zinc-100 pr-1 space-y-3 pb-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pt-3 first:pt-0 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-zinc-100 border border-zinc-200/50 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 truncate max-w-[140px]">{item.name}</h4>
                        <p className="text-[10px] text-zinc-400 font-medium">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Balances Summary Ledger */}
              <div className="space-y-2.5 pt-4 border-t border-zinc-100 text-[11px] font-medium text-zinc-500">
                <div className="flex justify-between">
                  <span>Subtotal Matrix</span>
                  <span className="font-mono text-zinc-900">${orderSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Transport</span>
                  <span className="font-mono text-zinc-900">{logisticsFee === 0 ? "FREE" : `$${logisticsFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>State Protection Tax (8%)</span>
                  <span className="font-mono text-zinc-900">${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Balance Due Row */}
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Charge</span>
                <span className="text-xl font-black text-zinc-900 font-mono tracking-tight">
                  ${definitiveTotal.toFixed(2)}
                </span>
              </div>

              {/* Submit Execution Action */}
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-[#c01014] hover:bg-[#a80e12] disabled:bg-zinc-400 transition text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xs"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Authorizing Remittance...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} /> Authorize Order Settlement
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 text-center pt-1">
                <AlertCircle size={11} /> 
                <span>Finalized values locked in upon gateway execution.</span>
              </div>

            </div>
          </div>

        </form>
        
      </div>
    </div>
  );
}