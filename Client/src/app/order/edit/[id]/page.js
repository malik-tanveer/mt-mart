"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, RefreshCw, MapPin, Phone, User, Package, Tag } from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2";
import { getOrders, getOrdersAdmin, updateOrder } from "@/services/orderService"; 

export default function EditOrderPage({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Form inputs states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [status, setStatus] = useState("pending");
  const [discount, setDiscount] = useState(0); 
  const [productQuantities, setProductQuantities] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const isAdmin = user.role === "admin";
      setIsAdminUser(isAdmin);

      try {
        const res = isAdmin ? await getOrdersAdmin(token) : await getOrders(token);
        if (res.success) {
          const order = res.orders.find((o) => o._id === orderId);
          if (order) {
            setFullName(order.shippingAddress?.fullName || "");
            setPhone(order.shippingAddress?.phone || "");
            setAddress(order.shippingAddress?.address || "");
            setCity(order.shippingAddress?.city || "");
            setPostalCode(order.shippingAddress?.postalCode || "");
            setCountry(order.shippingAddress?.country || "Pakistan");
            setStatus(order.status || "pending");
            setProductQuantities(order.products || []);
          }
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleQtyChange = (prodId, newQty) => {
    setProductQuantities(prev => 
      prev.map(item => item.productId === prodId ? { ...item, quantity: Math.max(1, Number(newQty)) } : item)
    );
  };

  const calculateLiveTotal = () => {
    const subtotal = productQuantities.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    return Math.max(0, subtotal - Number(discount)); 
  };

  const handleUpdateOrderSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    // 🔥 FIX: Mapping full object data (title, price, image) to pass MongoDB Validation
    const payload = {
      products: productQuantities.map(p => ({ 
        productId: p.productId, 
        quantity: p.quantity,
        title: p.title,   
        price: p.price,   
        image: p.image    
      })),
      totalPrice: calculateLiveTotal(),
      status,
      shippingAddress: { fullName, phone, address, city, postalCode, country }
    };

    try {
      const res = await updateOrder(orderId, payload, localStorage.getItem("token"));
      if (res.success) {
        await Swal.fire({ title: "Updated!", text: "Saved successfully.", icon: "success" });
        router.push("/order"); 
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed saving payload", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><RefreshCw className="animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.push("/order")} className="inline-flex items-center gap-2 text-xs font-bold uppercase text-blue-700 tracking-wider hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Discard & Return
        </button>

        <div className="bg-white rounded-3xl shadow-xl border p-8">
          <h1 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-6">
            <Package className="text-blue-600" /> Modify Order Details
          </h1>

          <form onSubmit={handleUpdateOrderSubmit} className="space-y-5">
            {/* PRODUCTS */}
            <div className="bg-blue-50/50 p-4 rounded-2xl space-y-3">
              <label className="text-[11px] font-black uppercase tracking-wider text-blue-800">Products Control</label>
              {productQuantities.map((product) => (
                <div key={product.productId} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-blue-100">
                  <img src={product.image} alt={product.title} className="w-10 h-10 object-contain bg-gray-50 rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{product.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{formatPrice(product.price)} Each</p>
                  </div>
                  <input type="number" min="1" required value={product.quantity} onChange={(e) => handleQtyChange(product.productId, e.target.value)} className="w-16 text-center font-mono text-xs p-1.5 border rounded-lg outline-none" />
                </div>
              ))}
            </div>

            {/* STATUS DROP-ZONE */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={!isAdminUser} className="w-full text-xs font-bold p-3 rounded-xl border bg-gray-50 outline-none disabled:opacity-60">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* DISCOUNT */}
            {isAdminUser && (
              <div className="bg-emerald-50/50 p-4 rounded-2xl">
                <label className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1 mb-1"><Tag className="w-3.5 h-3.5" /> Discount ($)</label>
                <input type="number" min="0" value={discount} onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))} className="w-full text-xs p-3 rounded-xl border outline-none font-mono" />
              </div>
            )}

            {/* CUSTOMER PROFILE FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />
              <input type="text" required value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />
            </div>

            <input type="text" required value={address} placeholder="Street Address" onChange={(e) => setAddress(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" required value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />
              <input type="text" required value={postalCode} placeholder="Postal Code" onChange={(e) => setPostalCode(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />
            </div>

            <input type="text" required value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} className="w-full text-xs p-3 rounded-xl border bg-gray-50 outline-none" />

            {/* SUBMIT */}
            <div className="pt-4 border-t flex justify-between items-center">
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase block">Total Payable</span>
                <span className="text-xl font-black font-mono text-gray-950">{formatPrice(calculateLiveTotal())}</span>
              </div>
              <button type="submit" disabled={updating} className="bg-blue-600 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}