// app/login/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, ShoppingBag } from "lucide-react";
import { loginUser } from "@/services/authService";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 text-gray-900 font-sans">
      
      {/* LEFT SIDE: SHOP SMART BRAND ACCENT DISPLAY */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full"></div>
        
        {/* Top Logo branding */}
        <div className="relative z-10 flex items-center gap-2 font-black text-xl tracking-tight uppercase">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShoppingBag size={16} className="text-white" />
          </div>
          Shop<span className="text-blue-400">Smart</span>
        </div>

        {/* Dynamic Display Text */}
        <div className="relative z-10 space-y-4 max-w-md">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Elevate Your Smart Online Shopping Pipeline.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Access secure full-stack customer dashboard modules, track localized order logs, and analyze exclusive dynamic pricing inventories.
          </p>
        </div>

        {/* Footer info tag */}
        <div className="relative z-10 text-xs font-semibold text-gray-500 tracking-wide uppercase">
          ShopSmart Next-Gen Ecosystem &copy; 2026
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM BOX */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="space-y-2">
            {/* Small visible brand logo for mobile viewports */}
            <div className="lg:hidden flex items-center gap-2 font-black text-lg tracking-tight uppercase mb-6">
              <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center">
                <ShoppingBag size={14} />
              </div>
              ShopSmart
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Welcome Back 👋</h1>
            <p className="text-sm text-gray-500">Sign in to check out your dynamic basket pipeline</p>
          </div>

          {/* Dynamic Error Container */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3.5 rounded-xl transition-all">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL PORTAL INPUT */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/60 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition text-sm text-gray-900"
                />
              </div>
            </div>

            {/* PASSWORD PORTAL INPUT */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/60 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition text-sm text-gray-900"
                />
              </div>
            </div>

            {/* SECURE DISPATCH TRIGGER */}
            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-4 rounded-xl transition font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed pt-4"
            >
              <LogIn size={18} />
              {loading ? "Authenticating Parameters..." : "Sign In to Store"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            New to our marketplace?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}