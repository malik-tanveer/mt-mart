"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0); 

  // 🔥 CORE FLOW: SYNC CART UNIT TOTAL QUANTITIES DYNAMICALLY
  useEffect(() => {
    const calculateCartQuantity = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalUnits = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalUnits);
    };

    // Run once on load
    calculateCartQuantity();

    // Listeners for multi-page storage cross communication sync 
    window.addEventListener("storage", calculateCartQuantity);
    window.addEventListener("cartUpdated", calculateCartQuantity);

    return () => {
      window.removeEventListener("storage", calculateCartQuantity);
      window.removeEventListener("cartUpdated", calculateCartQuantity);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Help", href: "/help" }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* WEBSITES MAIN NAME & LOGO */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight uppercase text-gray-900">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag size={16} />
            </div>
            Shop<span className="text-blue-600">Smart</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold tracking-wider uppercase transition ${
                    isActive ? "text-blue-600" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* ICONS ACTIONS */}
          <div className="hidden md:flex items-center gap-4 relative">
            
            {/* CART ICON WITH DYNAMIC COUNT OVERLAY */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-black relative transition group">
              <ShoppingCart size={20} className="group-hover:scale-105 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE PORTAL CONTROL */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 text-gray-600 hover:text-black rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center transition"
              >
                <User size={18} />
              </button>

              {isProfileOpen && (
                <div className="cursor-pointer absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider"
                      >
                        <User size={14} /> My Profile
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 text-left uppercase tracking-wider"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 uppercase tracking-wider"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* MOBILE RESPONSIVE BUTTONS */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="p-2 text-gray-600 relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE INTERFACE SLIDEOUT */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-black uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-100 my-2" />
          {isLoggedIn ? (
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="cursor-pointer block px-3 py-2.5 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 uppercase tracking-wider"
            >
              My Profile
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-gray-50 uppercase tracking-wider"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}