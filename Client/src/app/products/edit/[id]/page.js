"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getProducts, updateProduct } from "@/services/productService";
import Swal from "sweetalert2"; // SweetAlert Import

export default function EditProductPage({ params }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: ""
  });

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    async function fetchProductDetails() {
      try {
        const allProducts = await getProducts();
        const list = allProducts.products || allProducts || [];
        const product = list.find((p) => p._id === id);
        
        if (product) {
          setFormData({
            title: product.title || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "",
            stock: product.stock || "",
            image: product.image || ""
          });
        }
      } catch (err) {
        console.error("Error setting up edit form values:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);

const handleSubmitUpdate = async (e) => {
  e.preventDefault();

  try {
    await updateProduct(id, formData);

    // Success Alert
    Swal.fire({
      title: "Success!",
      text: "Product details have been updated successfully.",
      icon: "success",
      confirmButtonColor: "#d97706",
      customClass: {
        popup: "rounded-3xl font-sans",
      },
    });

    router.push(`/products/${id}`);
    router.refresh();

  } catch (err) {
    console.error("Error executing update operation:", err);

    Swal.fire({
      title: "Update Failed!",
      text: "The server failed to save the updated product details.",
      icon: "error",
      confirmButtonColor: "#d97706",
    });
  }
};
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-amber-600 animate-pulse">Mounting Form Context...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/40 py-12 text-gray-900">
      <div className="max-w-2xl mx-auto px-6">
        
        <Link href={`/products/${id}`} className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-700 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Cancel & Go Back
        </Link>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl">
          <h1 className="text-2xl font-black uppercase tracking-tight mb-6">Modify Product Specifications</h1>
          
          <form onSubmit={handleSubmitUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Product Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-semibold" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Cost Price</label>
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-mono font-bold" required />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Stock Allocation</label>
                <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-mono font-bold" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Inventory Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-semibold" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Image Asset URL</label>
              <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-mono" />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-1.5">Description</label>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 font-medium leading-relaxed"></textarea>
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase text-xs py-4 rounded-xl shadow-md transition">
              <Save className="w-4 h-4" /> Save Updated Record
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}