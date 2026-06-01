import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function productsostpage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6">

      <div className="bg-white max-w-xl w-full p-10 rounded-3xl shadow-2xl border text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600 w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4">
          No product Selected
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          You are trying to access the edit page directly.  
          Please select a product first to edit it.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go To Products
        </Link>

      </div>

    </div>
  );
}