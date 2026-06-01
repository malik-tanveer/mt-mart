"use client";

import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* BIG GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-900 pb-12">
          
          {/* COL 1: BRAND LOGO & MOTTO */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight uppercase text-white">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <ShoppingBag size={16} />
              </div>
              Shop<span className="text-blue-500">Smart</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Next-generation MERN stack architecture delivering curated enterprise-grade retail inventory pipelines with dynamic checkout speeds.
            </p>
          </div>

          {/* COL 2: QUICK MARKETPLACE LINKS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-white tracking-wider">Marketplace</h3>
            <ul className="space-y-2 text-sm font-semibold">
              <li><Link href="/products" className="hover:text-blue-400 transition">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-blue-400 transition">Featured Tech</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400 transition">Shopping Basket</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition">Our Blog & News</Link></li>
            </ul>
          </div>

          {/* COL 3: COMPANY & TRUST CENTRIC */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-white tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm font-semibold">
              <li><Link href="/about" className="hover:text-blue-400 transition">About Our Journey</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Protocols</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Usage</Link></li>
              <li><Link href="/returns" className="hover:text-blue-400 transition">Returns Framework</Link></li>
            </ul>
          </div>

          {/* COL 4: STORE SUPPORT & HEADQUARTERS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase text-white tracking-wider">Support Node</h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li className="flex items-center gap-2"><MapPin size={16} className="text-blue-500" /> Karachi, Sindh, PK</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-blue-500" /> support@shopsmart.com</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-blue-500" /> +92 (21) 111-SMART</li>
              <li><Link href="/contact" className="text-blue-500 hover:underline font-bold">Open Help Desk Ticket &rarr;</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM METRICS BAR */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-semibold text-gray-600 tracking-wide">
            &copy; 2026 ShopSmart Ecosystem Inc. Developed natively via Next.js 14 App Router.
          </p>
          
          {/* SOCIAL FOOTPRINT TAGS */}
          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" className="hover:text-white transition">
                {/* <Github size={18} /> */}
                </a>
            <a href="#" className="hover:text-white transition">
                {/* <Linkedin size={18} /> */}
                </a>
          </div>
        </div>

      </div>
    </footer>
  );
}