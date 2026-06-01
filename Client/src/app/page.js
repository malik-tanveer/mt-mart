"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  PackageX,
  Zap,
  Bookmark,
  Sparkles,
  Info
} from "lucide-react";
import { getProducts } from "@/services/productService";
import ProtectedRoute from "@/components/ProtectedRoute"
import formatPrice from "@/utils/formatPrice"; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <ProtectedRoute>
      <div className="bg-white text-gray-900 min-h-screen font-sans antialiased">
        
        {/* 1. TOP PREMIUM ANNOUNCEMENT BAR */}
        <div className="bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 text-white text-[11px] py-2.5 text-center font-bold uppercase tracking-widest border-b border-white/5 flex items-center justify-center gap-2 px-4">
          <Sparkles size={12} className="text-blue-400 animate-pulse" /> 
          Free delivery on orders over {formatPrice(50)}! • ⚡ Enterprise Operational Speed 24/7
        </div>

        {/* 2. PREMIUM HERO MATRIX */}
        <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-16 relative z-10">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs uppercase px-3 py-1.5 rounded-xl font-black tracking-widest">
                <Zap size={12} fill="currentColor" /> System Core Drop v2.0
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight uppercase">
                Next-Gen Sourcing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Marketplace</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed font-medium">
                Curated architectural ecosystem housing elite gadget configurations, dynamic product parameters, and state-locked client pipelines. Optimized via Next.js 14 stack mechanics.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5">
                  Explore Pipeline <ArrowRight size={14} />
                </Link>
                <Link href="/about" className="border border-gray-800 hover:border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition bg-white/5 backdrop-blur-sm">
                  Documentation
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 hidden md:block bg-gray-900 group">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10 opacity-60"></div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Premium Product Banner"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </section>

        {/* 3. COHESIVE SYSTEM TRUST LABELS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-b border-gray-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide text-gray-900 mb-1">Global Node Dispatch</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-semibold">Consolidated freight protocols targeting 24–48 hour delivery matrix cycles.</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 border border-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide text-gray-900 mb-1">Encrypted Pipelines</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-semibold">Tokenized secure transaction networks guaranteeing database protection modules.</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <Bookmark size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide text-gray-900 mb-1">Verified Authenticity</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-semibold">100% genuine origin trace indices mapped direct from verified partner storage nodes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT INVENTORY STREAM */}
        <section className="py-20 bg-gray-50/50 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Active Stock Ledger</span>
                <h2 className="text-3xl font-black text-gray-900 mt-1 uppercase tracking-tight">🔥 Curated Inventory Drops</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 tracking-wider uppercase bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition">
                View Master Catalog &rarr;
              </Link>
            </div>

            {/* SKELETON DISPLAY ENGINE */}
            {loading && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="border border-gray-100 bg-white rounded-3xl p-5 space-y-4">
                    <div className="bg-gray-100 h-48 w-full rounded-2xl animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-1/4 animate-pulse"></div>
                    <div className="h-11 bg-gray-100 rounded-xl w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            )}

            {/* EMPTY API FALLBACK PROTOCOL */}
            {!loading && products.length === 0 && (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl max-w-md mx-auto p-8 shadow-sm">
                <PackageX className="mx-auto text-gray-300 mb-4 animate-bounce" size={44} />
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">Empty Inventory Array</h3>
                <p className="text-gray-500 text-xs mt-2 font-semibold leading-relaxed">
                  Hamein afsos hai, is waqt backend endpoint database se products stream nahi kar raha. Naya admin account banayein aur catalog panel se content seed karein.
                </p>
                <button onClick={() => window.location.reload()} className="mt-6 bg-gray-950 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-900 transition shadow-sm">
                  Retry Fetch Session
                </button>
              </div>
            )}

            {/* DYNAMIC PRODUCT DATA ELEMENT */}
            {!loading && products.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((p) => (
                  <div key={p._id} className="group border border-gray-200/80 bg-white rounded-3xl p-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 relative h-48 w-full flex items-center justify-center">
                        <img 
                          src={p.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} 
                          alt={p.title}
                          className="h-full w-full object-cover group-hover:scale-102 transition duration-500" 
                        />
                      </div>
                      <div className="space-y-1 px-1">
                        <h3 className="font-black text-gray-900 text-md tracking-tight group-hover:text-blue-600 transition line-clamp-1">{p.title}</h3>
                        <p className="text-lg font-black text-gray-950 font-sans">{formatPrice(p.price)}</p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <Link
                        href={`/products/${p._id}`}
                        className="text-center bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-black text-xs uppercase tracking-wider border border-gray-200 transition"
                      >
                        Inspect
                      </Link>
                      <button className="bg-gray-950 hover:bg-blue-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. USER METRICS / POLICY FRAMEWORK SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-3 gap-12 border-b border-gray-100">
          <div className="md:col-span-1 space-y-4">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Store Policy Nodes</span>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">System Operational Rules</h2>
            <p className="text-gray-500 text-xs font-semibold leading-relaxed">
              Humare infrastructure ke rules aur security tokens har customer lifecycle entry ko protection provide karte hain.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 text-sm">
            <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl space-y-2">
              <h4 className="font-black text-gray-900 uppercase text-xs tracking-wider flex items-center gap-1.5"><Info size={14} className="text-blue-500" /> Admin Restrictions</h4>
              <p className="text-gray-500 text-xs font-semibold leading-relaxed">Naye product elements sirf authed administrative endpoints se create ho sakte hain. Normal accounts catalog modifications bypass nahi kar sakte.</p>
            </div>
            <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl space-y-2">
              <h4 className="font-black text-gray-900 uppercase text-xs tracking-wider flex items-center gap-1.5"><Info size={14} className="text-blue-500" /> Identity Token Lifespans</h4>
              <p className="text-gray-500 text-xs font-semibold leading-relaxed">System tokens local validation keys ke sath persist kiye jate hain. Validation drop hotay hi system security check user session log-out clear kar deta hai.</p>
            </div>
          </div>
        </section>

        {/* 6. SYSTEM FAQ ACCORDION ENGINE */}
        <section className="bg-gray-50/60 py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 border border-blue-200 text-blue-600 rounded-xl mb-3">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-3xl font-black tracking-tight uppercase text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-xs font-semibold mt-1">Ecosystem configuration aur processing loops ke aam sawalat</p>
            </div>

            <div className="space-y-3">
              {[
                { q: "How fast is the delivery process?", a: "Standard pipeline dispatch updates require 24–48 runtime hours. Detailed tracking states can be extracted natively from your profile dashboard system logs." },
                { q: "Is my session token completely secure?", a: "Affirmative. Global request channels routing via our Axios configuration utilize encrypted bearer storage structures preserving data boundary integrity." },
                { q: "What is your system return protocol?", a: "Every invoice item logs automated support hooks valid up to 7 calendar days. Initialization routines can be toggled manually within order ledgers." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-black text-xs uppercase tracking-wider text-gray-800 hover:bg-gray-50/50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? "rotate-180 text-blue-600" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-gray-500 text-xs font-semibold leading-relaxed border-t border-gray-50 bg-gray-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. ACTION TARGET CALL-TO-ACTION (CTA) */}
        <section className="bg-gray-950 text-white text-center py-24 px-6 relative overflow-hidden border-t border-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Deploy Your Procurement Route</h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-medium">
              Join thousands of active identity entities scaling inventory networks via modular MERN deployment metrics.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-950 hover:bg-gray-100 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition shadow-lg transform hover:scale-[1.02] mt-2"
            >
              Launch Core Store Grid
            </Link>
          </div>
        </section>

      </div>
    </ProtectedRoute>
  );
}