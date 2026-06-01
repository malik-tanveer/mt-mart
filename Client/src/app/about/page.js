"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { 
  ShoppingBag, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Target, 
  Zap, 
  Heart 
} from "lucide-react";

export default function About() {
  return (
    <ProtectedRoute>
      <div className="bg-white text-gray-900 min-h-screen font-sans antialiased">
        
        {/* 1. HERO SECTION */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 text-white py-28 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs uppercase px-4 py-1.5 rounded-full font-bold tracking-widest">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none">
              We Are Redefining The <br />
              <span className="text-blue-400">Future of E-Commerce</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We don't just sell products; we build a lightning-fast, seamless shopping experience powered by the robust capabilities of Next.js and the MERN stack.
            </p>
          </div>
        </section>

        {/* 2. OUR STORY SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <span className="w-6 h-0.5 bg-blue-600 inline-block"></span> Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              How It All Started & What We Are Building
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Our project began with a simple yet critical question: *“Why do modern e-commerce platforms feel so slow and complicated?”* To solve this bottleneck, we laid the foundation of this next-generation marketplace, bypassing traditional supply chains to connect directly with premium, verified global vendors.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              The core objective of this project is ultimate performance. When a user interacts with our UI, items are added to the cart instantly without lagging or page buffering. Every single gadget, fashion item, or lifestyle product undergoes rigorous quality testing because we stand firmly against low-quality inventory and fake reviews.
            </p>
            <div className="pt-4">
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 font-medium">
                "Quality is not an act, it is a habit. With every package delivered, we ship a promise of absolute trust straight to your doorstep."
              </blockquote>
            </div>
          </div>
          
          {/* IMAGE 1 */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" 
              alt="Premium Warehouse and Quality Check" 
              className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-semibold">Our Dedicated Inventory Control & Quality Assurance Hub</p>
            </div>
          </div>
        </section>

        {/* 3. CORE MISSION & VISION */}
        <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
          <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Pillars of Our Brand</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              We operate on three core principles that define the engineering and service standards of our brand.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold">100% Genuine Sourcing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We strictly forbid replicas or counterfeits. Every catalog item is scanned and verified directly from the brand manufacturers or their authorized global distributors.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">Ultra-Fast Infrastructure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Utilizing Next.js server optimization alongside highly tuned API endpoint rendering, our checkout processing speeds outperform industry standards.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold">Customer-First Ecosystem</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Customer satisfaction is paramount. If a product doesn’t match your expectations, our zero-friction 7-day return policy guarantees a smooth refund or replacement.
              </p>
            </div>
          </div>
        </section>

        {/* 4. STANDARDS SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1 group">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
              alt="Customer Support and Packaging" 
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-semibold">Transparency is our core value—No hidden charges ever.</p>
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm uppercase tracking-wider">
              <span className="w-6 h-0.5 bg-purple-600 inline-block"></span> Our Standards
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Why Choose Our Marketplace?</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              The modern e-commerce landscape is flooded with misleading advertising, where what you see is rarely what you get. We are actively shifting this culture toward complete data transparency and strict quality benchmarks.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <p className="text-gray-700 text-sm font-medium"><strong className="text-gray-900">What we do:</strong> Provide real-time parcel dispatch tracking, dynamic order status updates, and strictly encrypted secure data handling.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold text-lg">✕</span>
                <p className="text-gray-700 text-sm font-medium"><strong className="text-gray-900">What we don't:</strong> Apply hidden handling fees, deploy artificial countdown scarcity timers, or compromise customer privacy metrics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. METRICS BAR */}
        <section className="bg-black text-white py-16 px-6 text-center relative">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-blue-500">15,000+</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Orders Delivered</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-blue-500">100%</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Secure Gateway</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-blue-500">24 / 7</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Live Chat Help</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-blue-500">4.9 / 5</h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Customer Rating</p>
            </div>
          </div>
        </section>

        {/* 6. TEAM / VALUES GRIDS */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">Driven by Innovation</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Our engineering team focuses heavily on continuous asset optimization and performance analytics to deliver a polished experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4 border rounded-2xl p-4 bg-gray-50/50">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12" 
                alt="UX Design UI Section" 
                className="w-full h-48 object-cover rounded-xl shadow-sm"
              />
              <h4 className="font-bold text-lg">Sleek User Interface</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                We design with a minimalist philosophy, making sure that navigation remains highly intuitive for users of all technical backgrounds.
              </p>
            </div>

            <div className="space-y-4 border rounded-2xl p-4 bg-gray-50/50">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" 
                alt="Engineering Tech Team" 
                className="w-full h-48 object-cover rounded-xl shadow-sm"
              />
              <h4 className="font-bold text-lg">Robust Next.js Architecture</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Leveraging Next.js App Router and optimized server interactions to drastically minimize cumulative layout shifts and improve page load metrics.
              </p>
            </div>

            <div className="space-y-4 border rounded-2xl p-4 bg-gray-50/50">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                alt="Customer Happiness" 
                className="w-full h-48 object-cover rounded-xl shadow-sm"
              />
              <h4 className="font-bold text-lg">Real Human Support</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Say goodbye to frustrating automated loops. We connect you directly with live product support specialists via integrated help channels.
              </p>
            </div>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="bg-gradient-to-t from-gray-100 to-white border-t py-16 text-center px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Ready to explore our curated catalog?</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            Now that you know our philosophy and operational standards, let's step into our premium store dashboard.
          </p>
          <Link href="/products" className="mt-6 inline-flex items-center gap-2 bg-black hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md">
            Start Shopping Now <ArrowRight size={16} />
          </Link>
        </section>

      </div>
    </ProtectedRoute>
  );
}