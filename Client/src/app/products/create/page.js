"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Send } from "lucide-react";
import { createProduct } from "@/services/productService"; // Centralized service
import Swal from "sweetalert2"; 

export default function CreateProductPage() {
  const router = useRouter();

  // Product schema fields configuration
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  	try {
      // Formatting payload types correctly before passing to the service layer
      const productPayload = {
        ...form,
        price: Number(form.price), 
        stock: Number(form.stock),
      };

      // Calling your product making service layer directly
      await createProduct(productPayload);

      // SweetAlert Premium Success Modal with Async Routing Callback
      Swal.fire({
        title: "Product Created!",
        text: "The new inventory asset has been added successfully via ProductService.",
        icon: "success",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "rounded-3xl font-sans",
        }
      }).then(() => {
        // User ke "OK" click karne ke baad redirect aur refresh hoga taake data instant render ho
        router.push("/products"); 
        router.refresh();
      });

    } catch (error) {
      console.error("Communication failure on product service channel:", error);
      Swal.fire({
        title: "Creation Failed",
        text: "The service layer rejected the request or encountered an authorization token issue.",
        icon: "error",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "rounded-3xl font-sans",
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-20 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-4">
            <PlusCircle className="w-4 h-4" />
            Product Management System
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Add New Product
          </h1>
          <p className="text-gray-500 mt-3 font-medium">
            Register a new inventory component node into the marketplace catalog
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* TITLE */}
          <div>
            <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Product Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={form.title}
              placeholder="e.g., Wireless Mechanical Keyboard"
              className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-medium focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* PRICE & STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Price ($)</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                value={form.price}
                placeholder="e.g., 99.99"
                step="any"
                className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-mono font-bold focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Stock Units Available</label>
              <input
                type="number"
                name="stock"
                onChange={handleChange}
                value={form.stock}
                placeholder="e.g., 50"
                className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-mono font-bold focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Inventory Category</label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              value={form.category}
              placeholder="e.g., Electronics, Accessories, Peripherals"
              className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-medium focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Product Image URL</label>
            <input
              type="url"
              name="image"
              onChange={handleChange}
              value={form.image}
              placeholder="https://example.com/assets/product-image.jpg"
              className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-mono text-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-bold text-sm text-gray-700 uppercase tracking-wider">Product Specifications</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={form.description}
              placeholder="Provide detailed operational characteristics of the item..."
              rows={5}
              className="w-full mt-2 p-4 border border-gray-200 rounded-2xl outline-none font-medium leading-relaxed focus:ring-2 focus:ring-blue-500 transition"
              required
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition shadow-lg disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? "Registering Asset..." : "Register Product Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}