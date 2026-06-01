// Blog.js

"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Calendar, User, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export default function BlogListing() {
  const [activeFilter, setActiveFilter] = useState("All");

  const blogPosts = [
    {
      id: "why-shopsmart-is-faster",
      title: "Why ShopSmart is Faster Than Traditional E-Commerce Stores",
      excerpt: "A simple breakdown of how our modern Next.js and MERN stack system cuts down loading times, making your online shopping experience smooth and lag-free.",
      date: "May 24, 2026",
      readTime: "4 min read",
      author: "ShopSmart Team",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", 
      category: "Shopping"
    },
    {
      id: "secure-payments-framework",
      title: "How We Keep Your Payments and Data 100% Safe",
      excerpt: "Your security is our priority. Learn about the encryption and verified payment gateways we use to ensure every transaction you make is completely protected.",
      date: "May 18, 2026",
      readTime: "5 min read",
      author: "Security Desk",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      category: "Security"
    },
    {
      id: "smart-tips-best-deals",
      title: "5 Smart Tips to Find the Best Deals on Our Platform",
      excerpt: "Want to save more? Here is a quick, handy guide on how to navigate our product filters, dynamic catalog, and seasonal discounts effectively.",
      date: "May 12, 2026",
      readTime: "3 min read",
      author: "Shopping Guide",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      category: "Guides"
    },
    {
      id: "understanding-delivery-timelines",
      title: "Behind the Scenes: How Our Shipping and Logistics Work",
      excerpt: "Ever wondered what happens after you click order? Get a transparent look at our warehousing, quality checks, and fast delivery dispatch network.",
      date: "May 05, 2026",
      readTime: "6 min read",
      author: "Logistics Hub",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      category: "Shipping"
    },
    {
      id: "future-of-digital-marketplaces",
      title: "The Future of Online Shopping: Trends to Watch in 2026",
      excerpt: "From personalized interfaces to single-click checkouts, explore the next generation of e-commerce technologies that are reshaping how we shop online.",
      date: "April 28, 2026",
      readTime: "4 min read",
      author: "Tech Insights",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      category: "Tech"
    },
    {
      id: "hassle-free-returns-guide",
      title: "Your Guide to Smooth Returns and Easy Exchanges",
      excerpt: "We believe shopping should be risk-free. Read our simple guide on how our 7-day return policy parameters protect you if a product doesn't meet your expectations.",
      date: "April 15, 2026",
      readTime: "3 min read",
      author: "Support Center",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      category: "Guides"
    }
  ];

  const categories = ["All", "Shopping", "Security", "Guides", "Shipping", "Tech"];

  const filteredPosts = activeFilter === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <ProtectedRoute>
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <BookOpen size={14} /> ShopSmart Feed
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The ShopSmart <span className="text-blue-400">Blog</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Your go-to hub for shopping guides, security announcements, tech updates, and delivery insights.
          </p>

          {/* DYNAMIC CATEGORY FILTER PILLS */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeFilter === cat 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EXTENDED BLOG CARDS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <Tag size={10} /> {post.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  
                  <h3 className="font-extrabold text-lg text-gray-900 leading-snug hover:text-blue-600 transition line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button & Author Footer */}
              <div className="p-6 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                  <User size={12} /> By {post.author}
                </span>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION BAR FOR EXTRA FEEL */}
        <div className="text-center pt-12">
          <button className="px-6 py-3 border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold bg-white transition shadow-sm">
            Load Older Articles
          </button>
        </div>
      </section>

    </div>
    </ProtectedRoute>
  );
}