"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Sparkles,
  Layers,
  PlusCircle,
  ShoppingCart,
  Search,
  Grid
} from "lucide-react";
import { getProducts } from "@/services/productService";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Interactive UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(16); 

  useEffect(() => {
    async function loadInventory() {
      try {
        const data = await getProducts();
        setProducts(data.products || data || []);
      } catch (err) {
        console.error("Failed to stream layout indices:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInventory();
  }, []);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      Swal.fire({
        title: "Out of Stock",
        text: "Sorry, this product currently holds no active units.",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isExist = existingCart.find((item) => item._id === product._id);
    
    if (isExist) {
      Swal.fire({
        title: "Already in Cart!",
        text: `${product.title} has already been added to your shopping cart.`,
        icon: "info",
        confirmButtonColor: "#2563eb",
        customClass: { popup: "rounded-2xl font-sans" }
      });
      return;
    }

    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
      title: "Added!",
      text: `${product.title} added successfully.`,
      icon: "success",
      confirmButtonColor: "#2563eb",
      customClass: { popup: "rounded-2xl font-sans" }
    });
  };

  // Extract unique categories dynamically from pipeline data stream
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  // Pipeline Filter Logic (Search + Category Filter Matching)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Splice array chunk to enforce pagination parameters
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Streaming Global Inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-gray-900">
      
      {/* HEADER HERO MATRIX */}
      <section className="bg-white border-b border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Premium Curated Hub
            </div>
            <h1 className="text-3xl font-black text-gray-950 uppercase tracking-tight">Core Product Archive</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Explore our decentralized inventory indices</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white text-xs font-black uppercase tracking-widest px-5 py-3.5 rounded-xl transition shadow-md">
              <ShoppingCart className="w-4 h-4 text-blue-400" /> Open Cart
            </Link>
            <Link href="/products/create" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition">
              <PlusCircle className="w-4 h-4" /> Seed Stock
            </Link>
          </div>
        </div>
      </section>

      {/* FILTER CONTROL & CONTENT MATRIX STATION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        
        {/* CONTROL STATION BOARD */}
        <div className="bg-white rounded-2xl border p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          {/* Live Search Node Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search product matrix node..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(15); }}
              className="w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-gray-200 outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Categories Pill Stream */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(15); }}
                className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl border transition whitespace-nowrap ${selectedCategory === cat ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-500 border-gray-200 hover:text-gray-900"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE GRID */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border p-16 text-center max-w-md mx-auto shadow-sm">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-md font-black text-gray-800 uppercase tracking-tight">No Matching Inventions</h3>
            <p className="text-xs text-gray-400 font-medium mt-1">We couldn't locate any active nodes match your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => {
                const isOutOfStock = (product.stock ?? 0) <= 0;

                return (
                  <article
                    key={product._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col hover:-translate-y-1"
                  >
                    {/* Media Node Frame */}
                    <div className="h-48 bg-slate-50/50 border-b flex items-center justify-center relative p-6">
                      <img 
                        src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} 
                        alt={product.title} 
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />
                      <div className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white ${isOutOfStock ? "bg-red-500 animate-pulse" : "bg-gray-900"}`}>
                        {isOutOfStock ? "Out of Stock" : (product.category || "General")}
                      </div>
                    </div>

                    {/* Metadata Content Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          <Layers className="w-3 h-3 text-blue-500" />
                          <span>Stock Availability: <span className={`font-mono font-black ${isOutOfStock ? "text-red-500" : "text-gray-900"}`}>{product.stock ?? 0}</span></span>
                        </div>
                        <h3 className="text-sm font-black text-gray-900 tracking-tight line-clamp-1 uppercase" title={product.title}>{product.title}</h3>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">{product.description}</p>
                      </div>

                      <div className="pt-3 border-t flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Valuation</span>
                          <span className="text-md font-black font-mono text-gray-950">{formatPrice(product.price)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/products/${product._id}`}
                            className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-700 px-2.5 py-2 rounded-xl hover:bg-gray-200 transition"
                          >
                            Inspect
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={isOutOfStock}
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-2 rounded-xl transition flex items-center gap-1 ${isOutOfStock ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                          >
                            <ShoppingCart className="w-3 h-3" /> {isOutOfStock ? "Sold" : "+Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 🔥 CONDITIONAL PAGINATION LOAD MORE STATION BUTTON */}
            {filteredProducts.length > visibleCount && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 15)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-gray-950 text-xs font-black uppercase tracking-widest px-8 py-3.5 border rounded-xl transition shadow-sm hover:shadow-md"
                >
                  <Grid className="w-4 h-4 text-blue-600 animate-spin" /> Load More Artifacts
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}