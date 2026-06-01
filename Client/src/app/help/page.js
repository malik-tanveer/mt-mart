// Help.js

"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  MessageSquare, 
  Info, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function HelpCenter() {
  // State for Accordion / Dropdown FAQs
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How can I track the live status of my shipment?",
      answer: "Once your order invoice is generated, a unique tracking parameter is dispatched via electronic mail. You can inject this tracking index into our global logistics module to observe real-time transit routing updates."
    },
    {
      question: "What is your return and automated replacement policy?",
      answer: "We offer a zero-friction 7-day return policy ecosystem. If the verified product exhibits architectural faults or doesn't match your catalog selection, you can initiate a ticket through our dedicated support dashboard."
    },
    {
      question: "Are the components and products on your catalog 100% genuine?",
      answer: "Absolutely. We bypass secondary local distributors to source inventory directly from authenticated global manufacturers. Every item undergoes strict validation protocols before warehouse placement."
    },
    {
      question: "Which cryptographic secure payment gateways do you support?",
      answer: "Our dynamic checkout pipeline integrates secure encrypted processing tokens supporting major global credit/debit networks, standard localized electronic wallets, and premium encrypted banking links."
    }
  ];

  return (
<ProtectedRoute>
 <div className="bg-white text-gray-900 min-h-screen font-sans">


      {/* 1. HERO SEARCH & HEADER */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs uppercase px-4 py-1.5 rounded-full font-bold tracking-widest">
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none">
            How Can We <span className="text-blue-400">Assist You</span> Today?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Access immediate platform guides, browse system operations, or utilize our interconnected routing pathways to solve layout challenges.
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC INTERCONNECTED PLATFORM ROUTING NAV LINKS */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Link to Contact Page */}
          <div className="bg-white p-6 rounded-2xl border shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Need Live Support?</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Skip automated database documentation and transmit a direct digital query token straight to our active customer agents.
              </p>
            </div>
            <Link href="/contact" className="text-sm font-bold text-blue-600 flex items-center gap-1 mt-6 group-hover:text-blue-700 transition">
              Open Support Ticket <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Link to About Page */}
          <div className="bg-white p-6 rounded-2xl border shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Info size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Learn Our Values</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Discover our corporate history, strict sourcing methodologies, operational infrastructure parameters, and technological architecture.
              </p>
            </div>
            <Link href="/about" className="text-sm font-bold text-blue-600 flex items-center gap-1 mt-6 group-hover:text-blue-700 transition">
              Read Our Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Link to Products Page */}
          <div className="bg-white p-6 rounded-2xl border shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Ready to Shop?</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Explore our fully optimized catalog loaded with premium genuine lifestyle products, elite gear, and verified components.
              </p>
            </div>
            <Link href="/product" className="text-sm font-bold text-blue-600 flex items-center gap-1 mt-6 group-hover:text-blue-700 transition">
              Browse Store Dashboard <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE ACCORDION FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <div className="text-center space-y-2">
          <div className="flex justify-center text-blue-600 mb-2">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Quickly resolve technical issues by analyzing our structured platform parameters database answers.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="border border-gray-100 rounded-3xl p-4 bg-gray-50/50 space-y-3">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border rounded-2xl overflow-hidden transition duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-gray-800 hover:bg-gray-50/50 transition"
              >
                <span className="text-sm md:text-base">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={18} className="text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 shrink-0" />
                )}
              </button>
              
              {/* Dynamic Answer Panel Expand */}
              {openIndex === index && (
                <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-gray-600 border-t border-gray-50/50 leading-relaxed bg-gray-50/20">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE SELF-SERVICE UTILITY GRIDS */}
      <section className="bg-gray-50 border-t border-b border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Explore Quick Help Channels</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">Self-service control boards for instantly modifying standard account settings.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border rounded-2xl shadow-sm space-y-3 text-center md:text-left">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto md:mx-0"><Truck size={22} /></div>
              <h4 className="font-extrabold text-lg">Logistics Processing</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Learn about international shipping matrices, duty fees configurations, and tracking systems.</p>
            </div>

            <div className="bg-white p-8 border rounded-2xl shadow-sm space-y-3 text-center md:text-left">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto md:mx-0"><RefreshCw size={22} /></div>
              <h4 className="font-extrabold text-lg">Refund Management</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Access automatic return parameters, dynamic merchant cancellation metrics, and payment reversal timelines.</p>
            </div>

            <div className="bg-white p-8 border rounded-2xl shadow-sm space-y-3 text-center md:text-left">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto md:mx-0"><ShieldCheck size={22} /></div>
              <h4 className="font-extrabold text-lg">Account Data Privacy</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Configure specialized secure 2FA tokens, session encryption data parameters, and tracking metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OVERALL FOOTER CTA */}
      <section className="bg-white py-20 text-center px-6 max-w-3xl mx-auto space-y-6">
        <h3 className="text-3xl font-extrabold tracking-tight">Still stranded? Let our engineers step in.</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          If your layout challenges or custom invoice adjustments cannot be answered within this documentation, create a high-priority support dashboard pipeline.
        </p>
        <div className="pt-2">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-black hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md text-sm">
            Connect to Live Representative <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
    </ProtectedRoute>
  );
}