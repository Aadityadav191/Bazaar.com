import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

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

          {/* SEARCH + AUTH */}
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

            {/* AUTH STATE (Updated to support user profile pictures) */}
            {user ? (
              <div className="flex items-center gap-2">
                <NavLink to="/profile">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#c01014] text-white rounded-xl font-bold text-sm">
                    {user.avatar || user.profilePicture ? (
                      <img 
                        src={user.avatar || user.profilePicture} 
                        alt="Profile" 
                        className="w-5 h-5 rounded-full object-cover border border-white/40"
                        onError={(e) => {
                          // Fallback to text icon if the image URL fails to load
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    Mr. {user.name}
                  </button>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/auth/login">
                <button className="px-5 py-2 bg-[#c01014] text-white rounded-xl text-xs font-bold uppercase">
                  Login / Register
                </button>
              </NavLink>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 border rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden p-4 border-t">

            {/* AUTH MOBILE (Updated to support user profile pictures) */}
            <div className="mb-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <NavLink to="/profile" onClick={closeMenu}>
                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-orange-100 rounded-xl font-bold">
                      {user.avatar || user.profilePicture ? (
                        <img 
                          src={user.avatar || user.profilePicture} 
                          alt="Profile" 
                          className="w-6 h-6 rounded-full object-cover border border-zinc-300"
                        />
                      ) : null}
                      {user.name}
                    </button>
                  </NavLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full py-2 bg-red-500 text-white rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink to="/auth/login" onClick={closeMenu}>
                  <button className="w-full py-2 bg-[#c01014] text-white rounded-xl">
                    Login / Register
                  </button>
                </NavLink>
              )}
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={"/" + item.toLowerCase()}
                  onClick={closeMenu}
                  className="p-3 border rounded-xl text-sm"
                >
                  {item}
                </NavLink>
              ))}
            </div>

          </div>
        )}

      </div>
    </>
  );
}