"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Globe, 
  Sparkles,
  Users
} from "lucide-react";
import Swal from "sweetalert2";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: "Empty Fields Detected",
        text: "Please make sure to fill out all required fields (Name, Email, and Message).",
        icon: "warning",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    Swal.fire({
      title: "Message Sent Successfully!",
      text: `Thank you, ${formData.name}. Your ticket has been assigned to our ${formData.department} desk. We will reach out within a few hours.`,
      icon: "success",
      iconColor: "#10b981",
      confirmButtonText: "Awesome!",
      confirmButtonColor: "#000000",
      background: "#ffffff",
      customClass: {
        popup: "rounded-3xl shadow-xl border border-gray-100",
        confirmButton: "rounded-xl px-6 py-3 font-semibold",
      }
    });

    setFormData({ name: "", email: "", subject: "", department: "General Inquiry", message: "" });
  };

  return (
    <ProtectedRoute>
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-4 py-1.5 rounded-full font-bold tracking-wide animate-pulse">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Live Support Desk Online
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none">
            Let’s Start a <span className="text-blue-400">Conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have an inquiry about an order routing, custom dynamic bulk shipping, or custom integration? Our administrative desk is standing by.
          </p>
        </div>
      </section>

      {/* 2. THREE-COLUMN DEPARTMENT QUICK CONNECTS */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Users size={20} /></div>
            <h3 className="font-bold text-lg">Sales & Retail Partners</h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">For wholesale deals, inventory supply configurations, and commercial vendor accounts.</p>
            <p className="text-blue-600 text-xs font-bold mt-4 block">sales@dreamstore.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4"><Sparkles size={20} /></div>
            <h3 className="font-bold text-lg">Press & Marketing</h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">For brand collaborations, public relations assets, global media inquiries, and sponsorship programs.</p>
            <p className="text-purple-600 text-xs font-bold mt-4 block">media@dreamstore.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border shadow-xl hover:-translate-y-1 transition duration-300">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4"><HelpCircle size={20} /></div>
            <h3 className="font-bold text-lg">General Help Desk</h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">Need instant modifications to your dynamic cart invoice or tracking status parameters?</p>
            <p className="text-green-600 text-xs font-bold mt-4 block">support@dreamstore.com</p>
          </div>
        </div>
      </section>

      {/* 3. CORE INTERACTIVE LAYOUT (INFO VS MAIN FORM) */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-16">
        
        {/* INFO COLUMN */}
        <div className="space-y-8 md:col-span-1">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Direct Channels</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Skip the contact framework entirely by accessing our direct physical corporate branches and operational timing parameters.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-center p-5 border rounded-2xl bg-gray-50/50 hover:bg-white transition duration-200">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Mail size={20} /></div>
              <div>
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Corporate Mail</h4>
                <p className="font-bold text-gray-800 text-sm">support@dreamstore.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-5 border rounded-2xl bg-gray-50/50 hover:bg-white transition duration-200">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl"><Phone size={20} /></div>
              <div>
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Hotline Registry</h4>
                <p className="font-bold text-gray-800 text-sm">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-5 border rounded-2xl bg-gray-50/50 hover:bg-white transition duration-200">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl"><Clock size={20} /></div>
              <div>
                <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Operational Hours</h4>
                <p className="font-bold text-gray-800 text-sm">Mon - Sat: 09:00 AM - 06:00 PM</p>
              </div>
            </div>
          </div>

          {/* SLA Response Guarantee Ticket */}
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl space-y-2">
            <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              🛡️ Response Guarantee Token
            </h4>
            <p className="text-blue-700 text-xs leading-relaxed">
              Every incoming transmission creates an automatic tracking index. We guarantee a formal human response inside a strict 4-hour monitoring lifecycle Window.
            </p>
          </div>
        </div>

        {/* UPGRADED CONTENT FORM COLUMN */}
        <div className="md:col-span-2 border rounded-3xl p-6 md:p-10 shadow-sm bg-white relative">
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight">Transmit Digital Ticket</h3>
            <p className="text-sm text-gray-500 mt-1">Please configure your specifications accurately for dynamic agent distribution.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Legal Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3.5 text-sm bg-gray-50/30 outline-none transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Electronic Mail *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3.5 text-sm bg-gray-50/30 outline-none transition"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Subject Context</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Shipment dynamic indexing" 
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3.5 text-sm bg-gray-50/30 outline-none transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Target Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3.5 text-sm bg-gray-50/30 outline-none transition appearance-none cursor-pointer"
                >
                  <option value="General Inquiry">General Customer Desk</option>
                  <option value="Technical Support">Technical API Pipeline Support</option>
                  <option value="Returns & Logistics">Returns & Product Logistics</option>
                  <option value="Wholesale Business">B2B Wholesale Procurement</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Detailed Message Body *</label>
              <textarea 
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your architectural query or package deployment parameters in absolute detail..." 
                className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3.5 text-sm bg-gray-50/30 outline-none transition resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full sm:w-auto bg-black hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              Dispatch Ticket <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* 4. BRAND CORE OFFICE LOCATIONS TILES */}
      <section className="bg-gray-50 border-t border-b border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Our Global Operations</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">Visit our physical customer centers and administrative validation hubs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm grid sm:grid-cols-2 items-center">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" 
                alt="Karachi Office Hub" 
                className="w-full h-48 sm:h-full object-cover"
              />
              <div className="p-6 space-y-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">Main Corporate HQ</span>
                <h4 className="font-extrabold text-lg">Karachi Office</h4>
                <p className="text-gray-500 text-xs leading-relaxed flex items-start gap-1"><MapPin size={14} className="mt-0.5 shrink-0" /> Tech Hub Zone, Shahrah-e-Faisal, Karachi, Pakistan</p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm grid sm:grid-cols-2 items-center">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                alt="Logistics Distribution Depot" 
                className="w-full h-48 sm:h-full object-cover"
              />
              <div className="p-6 space-y-3">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md">Distribution Depot</span>
                <h4 className="font-extrabold text-lg">Lahore Fulfillment</h4>
                <p className="text-gray-500 text-xs leading-relaxed flex items-start gap-1"><MapPin size={14} className="mt-0.5 shrink-0" /> Logistics Grid Alpha, Industrial Block, Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK BRAND REDIRECTION CALLOUT */}
      <section className="bg-white py-16 text-center px-6 max-w-3xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">Looking for quick self-service instead?</h3>
        <p className="text-gray-500 text-sm">Save time by instantly browsing through our automated system answers database grid.</p>
        <div className="pt-2">
          <a href="/help" className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline">
            Read Frequent Platform FAQs <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
    </ProtectedRoute>
  );
}