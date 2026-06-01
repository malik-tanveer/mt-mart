// privacy-policy

"use client";

import { ShieldCheck, Lock, Eye, Cookie } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="space-y-4 border-b pb-8">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last Updated: May 2026</p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Eye size={20} className="text-blue-600" /> 1. Information We Collect
            </h2>
            <p>
              We collect essential details required to process your store orders securely. This includes your full name, email address, physical shipping destination, and transaction tokens generated during checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Lock size={20} className="text-blue-600" /> 2. Data Security Protocols
            </h2>
            <p>
              Your personal data matrix is handled utilizing industry-standard encryption protocols. We strictly restrict unauthorized access to ensure your profile details remain absolutely safe on our secure cloud nodes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Cookie size={20} className="text-blue-600" /> 3. Cookie Management
            </h2>
            <p>
              Our platform uses persistence cookies to handle your cart items, keep you logged into your secure account sessions, and save layout preferences. You can toggle or block cookies via your system browser preferences at any time.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}