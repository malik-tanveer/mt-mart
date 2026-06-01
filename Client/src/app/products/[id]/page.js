"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Layers, Activity, Trash2, Edit, ShoppingCart } from "lucide-react";
import { getProducts, deleteProduct } from "@/services/productService";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2"; 

export default function ProductDetailsPage({ params }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const list = allProducts.products || allProducts || [];
        const foundProduct = list.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Error communicating via productService:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
  Swal.fire({
    title: "Delete Product?",
    text: "Are you sure you want to delete this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
    background: "#ffffff",
    customClass: {
      popup: "rounded-3xl font-sans",
      confirmButton:
        "rounded-xl text-xs uppercase font-black tracking-wider px-4 py-2",
      cancelButton:
        "rounded-xl text-xs uppercase font-black tracking-wider px-4 py-2",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteProduct(id);

        // Success Popup
        Swal.fire({
          title: "Deleted!",
          text: "The product has been removed successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-3xl font-sans",
          },
        });

        router.push("/products");
        router.refresh();
      } catch (err) {
        console.error("Delete operation failed:", err);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete the product due to an authorization or server issue.",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    }
  });
};

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-blue-600 animate-pulse">Loading Asset via Service...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Product Not Found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-gray-900 antialiased py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* TOP TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/60 backdrop-blur p-4 rounded-2xl border border-gray-200/60 shadow-sm">
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-black uppercase text-blue-700 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/products/edit/${id}`} className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-xl text-xs font-black uppercase transition shadow-sm">
              <Edit className="w-3.5 h-3.5" /> Edit Product
            </Link>
            <button onClick={handleDeleteProduct} className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl text-xs font-black uppercase transition shadow-sm">
              <Trash2 className="w-3.5 h-3.5" /> Delete Product
            </button>
          </div>
        </div>

        {/* DETAILS LAYOUT */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-[36px] shadow-xl border border-gray-200/80 overflow-hidden p-6 sm:p-10">
          <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center min-h-[350px]">
            <img src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} alt={product.title} className="max-h-80 object-contain drop-shadow-md" />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase px-3 py-1 rounded-md">{product.category || "General Inventory"}</span>
              <h1 className="text-3xl font-black text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-6 text-xs text-gray-500 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100 w-max">
                <span><Layers className="w-4 h-4 inline mr-1 text-gray-400" /> Stock: <strong className="text-gray-900 font-mono font-black">{product.stock ?? 12}</strong></span>
                <span><Activity className="w-4 h-4 inline mr-1 text-gray-400" /> Status: <strong className="text-green-600 font-black">Active</strong></span>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Product Price</p>
                <p className="text-2xl font-black text-gray-950">{formatPrice(product.price)}</p>
              </div>
              <Link href={`/order/create?productId=${id}`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xs font-black uppercase transition shadow-md">
                <ShoppingCart className="w-4 h-4" /> Order Now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}