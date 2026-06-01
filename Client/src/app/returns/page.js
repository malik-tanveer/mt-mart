// returns/page.js

"use client";

import { RefreshCw, CheckCircle, XCircle, Truck } from "lucide-react";

export default function Returns() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="space-y-4 border-b pb-8">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
            <RefreshCw size={28} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Returns & Refund Policy</h1>
          <p className="text-gray-500 text-sm">Last Updated: May 2026</p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> 1. Return Window Eligibility
            </h2>
            <p>
              We operate a strict zero-friction 7-day structural guarantee. To qualify for a complete asset reversal, your received product components must remain inside their factory-sealed packaging without structural modifications or tampering traces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" /> 2. Non-Returnable Items
            </h2>
            <p>
              Custom-built electronic configurations, personalized software licenses code strings, components showing physical damage from user installation errors, and item packages missing serial token labels cannot be allocated for return protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Truck size={20} className="text-green-600" /> 3. Processing Timeline
            </h2>
            <p>
              Once your return authorization ticket is validated by our system agents, dispatch the components back to our designated Fulfillment center layout. Following package inspection benchmarks, your financial refund parameter is initialized inside a 3 to 5 business day pipeline.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}