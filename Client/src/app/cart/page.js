"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2, ShieldCheck, Plus, Minus, MapPin, Phone, User, Notebook, CreditCard, Wallet } from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  
  // Shipping form architecture state (Country dynamic initialized)
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan", // Default placeholder value but editable now
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderNotes, setOrderNotes] = useState("");

  // Extra Transaction States for Online Channels
  const [accountNumber, setAccountNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const newQuantity = (item.quantity || 1) + amount;
        return { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock || 10)) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveItem = (id, title) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    Swal.fire({ title: "Removed!", text: `${title} drop successful.`, icon: "success", confirmButtonColor: "#2563eb" });
  };

  const cartTotalValue = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // 🔥 CORE INTEGRATION INTERACTION HANDLER
  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();

    // Base Coordinate Validation Checks
    if (!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.country) {
      Swal.fire({ title: "Missing fields", text: "Please populate all mandatory delivery coordinates.", icon: "warning", confirmButtonColor: "#2563eb" });
      return;
    }

    // Dynamic Wallet & Card Constraint Checks
    if ((paymentMethod === "EasyPaisa" || paymentMethod === "JazzCash") && !accountNumber) {
      Swal.fire({ title: "Wallet Missing", text: `Please enter your registered ${paymentMethod} account phone number.`, icon: "warning", confirmButtonColor: "#2563eb" });
      return;
    }

    if (paymentMethod === "Card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      Swal.fire({ title: "Card Incomplete", text: "Please input full secure credit credentials.", icon: "warning", confirmButtonColor: "#2563eb" });
      return;
    }

    setLoadingCheckout(true);

    try {
      const token = localStorage.getItem("token"); // Pulling authentic user JWT token context
      
      // Formatting mapping logic array precisely for backend schema parser
      const structuredProductsPayload = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity || 1,
      }));

      // Extra payload data parameters compilation
      let paymentDetails = {};
      if (paymentMethod === "EasyPaisa" || paymentMethod === "JazzCash") {
        paymentDetails = { account: accountNumber };
      } else if (paymentMethod === "Card") {
        paymentDetails = { holder: cardHolder, lastFour: cardNumber.slice(-4) };
      }

      const response = await fetch("http://localhost:5000/api/orders", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          products: structuredProductsPayload,
          shippingAddress: shippingDetails,
          paymentMethod,
          paymentDetails, 
          orderNotes
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Order Dispatched!",
          text: `Transaction successful! Order Reference ID: ${data.order._id}`,
          icon: "success",
          confirmButtonColor: "#2563eb",
          customClass: { popup: "rounded-3xl font-sans" }
        });

        // Clear localized user storage session caches on transaction success
        localStorage.removeItem("cart");
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated")); // Notify global state interfaces
      } else {
        throw new Error(data.message || "Failed processing order array payload streams.");
      }
    } catch (error) {
      Swal.fire({ title: "Checkout Halted", text: error.message, icon: "error", confirmButtonColor: "#ef4444" });
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-gray-900 antialiased py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-black uppercase text-blue-700 tracking-wider hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog Stream
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CART ITEMS STRUCTURAL PANEL */}
          <div className="bg-white rounded-[36px] shadow-2xl border border-gray-100 p-8 lg:col-span-7">
            <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 border-b pb-4 mb-6">
              <ShoppingCart className="w-6 h-6 text-blue-600" /> Cart Summary
            </h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-lg font-black text-gray-400 uppercase">Your cart is empty</h2>
                <Link href="/products" className="inline-block bg-blue-600 text-white text-xs font-black uppercase px-6 py-3 rounded-xl shadow-md mt-4">Shop Products</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/products/${item._id}`} className="shrink-0 block relative group">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-contain rounded-xl bg-gray-50 border p-1" />
                      </Link>
                      <div>
                        <Link href={`/products/${item._id}`} className="font-black text-sm text-gray-900 tracking-tight hover:text-blue-600 line-clamp-1">{item.title}</Link>
                        <span className="text-[10px] bg-slate-100 font-bold uppercase tracking-widest text-slate-500 px-2 rounded mt-1 inline-block">{item.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-2 sm:pt-0">
                      <div className="flex items-center gap-2 border rounded-xl p-1 bg-gray-50">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-1 rounded bg-white border shadow-sm"><Minus className="w-3" /></button>
                        <span className="w-6 text-center font-mono font-black text-xs">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-1 rounded bg-white border shadow-sm"><Plus className="w-3" /></button>
                      </div>
                      <p className="font-mono font-black text-gray-950 text-sm min-w-[60px] text-right">{formatPrice(item.price * (item.quantity || 1))}</p>
                      <button onClick={() => handleRemoveItem(item._id, item.title)} className="text-red-500 hover:text-red-700 p-1.5 rounded-lg bg-red-50 border border-red-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 border-t flex justify-between items-center bg-slate-50 rounded-2xl p-4 mt-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Inventory Value</span>
                  <span className="text-xl font-black text-gray-950 font-mono">{formatPrice(cartTotalValue)}</span>
                </div>
              </div>
            )}
          </div>

          {/* SHIPPING LOGISTICS REGISTRATION INTERFACE FORM */}
          <div className="bg-white rounded-[36px] shadow-2xl border border-gray-100 p-8 lg:col-span-5">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 border-b pb-4 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" /> Delivery Matrix
            </h2>

            <form onSubmit={handlePlaceOrderSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Full Name *</label>
                <div className="relative"><User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input type="text" required placeholder="Ahmed Raza Khan" value={shippingDetails.fullName} onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})} className="w-full text-xs font-semibold pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Contact Phone *</label>
                <div className="relative"><Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input type="tel" required placeholder="03011234567" value={shippingDetails.phone} onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})} className="w-full text-xs font-semibold pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Street Address *</label>
                <textarea required rows={2} placeholder="House 42, Street 12, North Nazimabad" value={shippingDetails.address} onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})} className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">City *</label>
                  <input type="text" required placeholder="Karachi" value={shippingDetails.city} onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})} className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Postal Code *</label>
                  <input type="text" required placeholder="74700" value={shippingDetails.postalCode} onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})} className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Payment Method</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full text-xs font-bold p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none cursor-pointer">
                    <option value="COD">Cash On Delivery</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="Card">Visa / Mastercard</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Country *</label>
                  <input type="text" required placeholder="Pakistan" value={shippingDetails.country} onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})} className="w-full text-xs font-semibold p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              {/* DYNAMIC CARD LOGIC FIELDS */}
              {paymentMethod === "Card" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-3 transition duration-200">
                  <p className="text-[11px] font-black uppercase text-blue-800 tracking-wider flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Credit/Debit Card Credentials</p>
                  <input type="text" placeholder="Cardholder Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none" />
                  <input type="text" maxLength={16} placeholder="Card Number (16 Digits)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                    <input type="password" maxLength={3} placeholder="CVC" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                  </div>
                </div>
              )}

              {/* DYNAMIC WALLET LOGIC FIELDS */}
              {(paymentMethod === "EasyPaisa" || paymentMethod === "JazzCash") && (
                <div className={`border rounded-2xl p-4 space-y-3 transition duration-200 ${paymentMethod === "EasyPaisa" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-amber-50 border-amber-100 text-amber-800"}`}>
                  <p className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> Mobile Wallet Account</p>
                  <div>
                    <label className="text-[9px] font-bold block mb-1">Registered {paymentMethod} Phone Number</label>
                    <input type="tel" placeholder="03XXXXXXXXX" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white text-gray-900 outline-none font-mono" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Order Notes (Optional)</label>
                <div className="relative"><Notebook className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input type="text" placeholder="Call before delivery..." value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="w-full text-xs font-semibold pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0 || loadingCheckout}
                className={`w-full inline-flex items-center justify-center gap-2 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition ${cartItems.length === 0 || loadingCheckout ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                <ShieldCheck className="w-4 h-4" /> {loadingCheckout ? "Processing Transaction..." : "Confirm & Dispatch Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}