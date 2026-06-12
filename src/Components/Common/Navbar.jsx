import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Search, ShoppingBag, Menu, X, ArrowRight, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Sync state if other windows alter localStorage data keys
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }, 500);
  };

  return (
    <>
      <div className="font-sans bg-white/70 backdrop-blur-md shadow-sm border border-zinc-200/50 sticky top-4 z-50 rounded-2xl mx-auto my-3 max-w-[89rem] w-[95%]">

        <nav className="flex items-center justify-between px-4 sm:px-6 py-2.5">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 overflow-hidden">
              <img
                src="https://img.freepik.com/premium-vector/bazaar-portable-store-logo-design-template_529200-416.jpg"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-black text-xl hidden sm:block">
              BAZAAR<span className="text-[#f9b685]">.</span>
            </span>
          </NavLink>

          {/* NAV LINKS */}
          <div className="hidden lg:flex gap-2 text-sm">
            {[
              { path: "/", label: "Home" },
              { path: "/Shop", label: "Shop" },
              { path: "/About", label: "About" },
              { path: "/Contact", label: "Contact" },
              { path: "/FAQ", label: "FAQ" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                    isActive
                      ? "bg-[#c01014] text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* SEARCH + ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 rounded-xl border text-sm"
              />
            </div>

            {/* DESKTOP ADD TO CART BUTTON LINK */}
            <button 
              onClick={() => navigate("/cart")}
              className="p-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-900 rounded-xl transition duration-150 relative group"
              title="View Shopping Cart"
            >
              <ShoppingBag size={16} />
              {/* Optional: You can attach item count badges right here later */}
            </button>

            {/* AUTH STATE WITH HOVER DROPDOWN CONTAINER */}
            {user ? (
              <div className="relative group/menu py-2">
                
                {/* User Trigger Pill */}
                <button className="flex items-center gap-2.5 px-4 py-2 bg-[#c01015] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition duration-200 group-hover/menu:bg-zinc-800">
                  {user.avatar || user.profilePicture ? (
                    <img 
                      src={user.avatar || user.profilePicture} 
                      alt="Profile" 
                      className="w-5 h-5 rounded-full object-cover ring-2 ring-white/20"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                  <span>{user.name}</span>
                </button>

                {/* Floating Dropdown Frame (Reveals on Hover) */}
                <div className="absolute right-0 top-full pt-1.5 w-48 opacity-0 pointer-events-none translate-y-2 transition-all duration-200 group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto group-hover/menu:translate-y-0 z-50">
                  <div className="bg-white border border-zinc-200 shadow-xl rounded-xl overflow-hidden p-1.5 flex flex-col space-y-0.5">
                    
                    <NavLink 
                      to="/profile" 
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition"
                    >
                      <Settings size={14} className="text-zinc-400" /> Profile
                    </NavLink>

                    <hr className="border-zinc-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                    
                  </div>
                </div>

              </div>
            ) : (
              <NavLink to="/auth/login">
                <button className="px-5 py-2 bg-[#c01014] text-white rounded-xl text-xs font-bold uppercase">
                  Login / Register
                </button>
              </NavLink>
            )}
          </div>

          {/* MOBILE ACTIONS PLATFORM BLOCK */}
          <div className="flex lg:hidden items-center gap-2">
            {/* MOBILE ONLY CART TRIGGER */}
            <button 
              onClick={() => navigate("/cart")}
              className="p-2 bg-zinc-50 border rounded-xl text-zinc-700"
            >
              <ShoppingBag size={18} />
            </button>

            {/* MOBILE MENU INTERFACE TRIGGER BUTTON */}
            <button
              className="p-2 border rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </nav>

        {/* MOBILE DRAWER MENU OVERLAY */}
        {isOpen && (
          <div className="lg:hidden p-4 border-t bg-white rounded-b-2xl">

            {/* AUTH MOBILE */}
            <div className="mb-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <NavLink to="/profile" onClick={closeMenu}>
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-100 text-zinc-900 rounded-xl font-bold text-xs uppercase tracking-wider">
                      {user.avatar || user.profilePicture ? (
                        <img 
                          src={user.avatar || user.profilePicture} 
                          alt="Profile" 
                          className="w-6 h-6 rounded-full object-cover border border-zinc-300"
                        />
                      ) : <User size={14} />}
                      {user.name}
                    </button>
                  </NavLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink to="/auth/login" onClick={closeMenu}>
                  <button className="w-full py-2 bg-[#c01014] text-white rounded-xl text-xs font-bold uppercase">
                    Login / Register
                  </button>
                </NavLink>
              )}
            </div>

            {/* MOBILE NAVIGATION LINKS */}
            <div className="flex flex-col gap-2">
              {[
                { path: "/", label: "Home" },
                { path: "/Shop", label: "Shop" },
                { path: "/About", label: "About" },
                { path: "/Contact", label: "Contact" },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                  className="p-3 border rounded-xl text-xs font-bold uppercase text-zinc-600 hover:bg-zinc-50 block"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

          </div>
        )}

      </div>
    </>
  )};