// terms/page.js

"use client";

import { Scale, CreditCard, ShoppingBag } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="space-y-4 border-b pb-8">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <Scale size={28} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm">Last Updated: May 2026</p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag size={20} className="text-purple-600" /> 1. Terms of Store Usage
            </h2>
            <p>
              By navigating this marketplace layout dashboard, you accept that you are accessing our network files for authentic personal shopping actions. Any tracing of automated scrapping scripts, endpoint flooding, or brute-forcing accounts yields quick terminal blacklisting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard size={20} className="text-purple-600" /> 2. Payment Frameworks & Verification
            </h2>
            <p>
              Pricing models shown across our products catalog index can change seamlessly based on real-time raw vendor changes. Transactions handled via our checkout gateways are audited on-the-fly; verified unauthorized checkout routes will be immediately blocked.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}