"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, MapPin, CreditCard, FileText, RefreshCw, ArrowLeft, Wallet, CheckCircle2 } from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2";
import API from "@/lib/axios"; 
import { createOrder } from "@/services/orderService";

export default function CreateOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
const [country, setCountry] = useState("Pakistan");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default
  const [orderNotes, setOrderNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Extra Fields for Online Payments
  const [accountNumber, setAccountNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        Swal.fire("Error", "No product selected for checkout pipeline", "error");
        router.push("/");
        return;
      }
      
      try {
        setLoading(true);
        const res = await API.get(`/products/${productId}`);
        const productData = res.data.product || res.data;
        setProduct(productData);
      } catch (error) {
        console.error("Product fetch breakdown:", error);
        Swal.fire("Error", "Could not fetch product node parameters", "error");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!fullName || !address || !city || !phone) {
      Swal.fire("Missing Info", "Please fill required fields to lock dispatch", "warning");
      return;
    }

    // Validation for Mobile Wallets
    if ((paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") && !accountNumber) {
      Swal.fire("Mobile Wallet", `Please enter your ${paymentMethod} account number`, "warning");
      return;
    }

    // Validation for Cards
    if (paymentMethod === "Card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      Swal.fire("Card Details", "Please enter complete card credentials", "warning");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    // Dynamic compilation of payment metadata based on selection
    let paymentDetails = {};
    if (paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") {
      paymentDetails = { account: accountNumber };
    } else if (paymentMethod === "Card") {
      paymentDetails = { holder: cardHolder, lastFour: cardNumber.slice(-4) };
    }

    const orderPayload = {
      products: [
        {
          productId: product._id,
          quantity: Number(quantity),
        },
      ],
      shippingAddress: {
        fullName,
        address,
        city,
        postalCode,
        phone,
        country,
      },
      paymentMethod,
      paymentDetails, // Transmitting extra data parameters securely
      orderNotes,
    };

    try {
      const data = await createOrder(orderPayload, token);
      if (data.success) {
        Swal.fire({
          title: "Order Secured!",
          text: `Your order has been registered via ${paymentMethod} successfully.`,
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
        router.push("/order"); 
      }
    } catch (error) {
      Swal.fire("Placement Refused", error.response?.data?.message || "Checkout pipe crashed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!product) return <div className="text-center py-12 font-black">Target Node Missing</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SECURE SHIPPING CHECKOUT FORM */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white rounded-[32px] border shadow-2xl p-6 sm:p-8 space-y-6">
          <div>
            <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-gray-950 mb-3 transition">
              <ArrowLeft className="w-4 h-4" /> Cancel Checkout
            </button>
            <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" /> Dispatch Destination
            </h1>
          </div>

          {/* SHIPPING PARAMS */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Full Name *</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="John Doe" />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Street Address *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="House #, Street name, Sector..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">City *</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="Karachi" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Postal Code</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="75500" />
              </div>
              <div>
    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Country *</label>
    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="Pakistan" />
  </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Active Phone Link *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition" placeholder="03XXXXXXXXX" />
            </div>

            {/* GATEWAY PARAMETERS DYNAMIC SELECTION */}
            <div className="pt-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">Select Payment Channel *</label>
              <div className="grid grid-cols-2 gap-3">
                
                {/* COD */}
                <button type="button" onClick={() => setPaymentMethod("COD")} className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition ${paymentMethod === "COD" ? "bg-slate-950 border-slate-950 text-white shadow-md" : "bg-slate-50 text-gray-500 hover:bg-gray-100"}`}>
                  <ShoppingBag className="w-5 h-5" /> Cash on Delivery
                </button>

                {/* Card */}
                <button type="button" onClick={() => setPaymentMethod("Card")} className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition ${paymentMethod === "Card" ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-slate-50 text-gray-500 hover:bg-gray-100"}`}>
                  <CreditCard className="w-5 h-5" /> Visa / Mastercard
                </button>

                {/* Easypaisa */}
                <button type="button" onClick={() => setPaymentMethod("Easypaisa")} className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition ${paymentMethod === "Easypaisa" ? "bg-emerald-600 border-emerald-600 text-white shadow-md" : "bg-slate-50 text-gray-500 hover:bg-gray-100"}`}>
                  <Wallet className="w-5 h-5" /> Easypaisa Mobile
                </button>

                {/* JazzCash */}
                <button type="button" onClick={() => setPaymentMethod("JazzCash")} className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition ${paymentMethod === "JazzCash" ? "bg-amber-500 border-amber-500 text-white shadow-md" : "bg-slate-50 text-gray-500 hover:bg-gray-100"}`}>
                  <Wallet className="w-5 h-5" /> JazzCash Mobile
                </button>

              </div>
            </div>

            {/* DYNAMIC SUB-FORMS BASED ON PAYMENT SELECTION */}
            {paymentMethod === "Card" && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-3 animate-fadeIn">
                <p className="text-[11px] font-black uppercase text-blue-800 tracking-wider flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Credit/Debit Verification</p>
                <div>
                  <input type="text" placeholder="Cardholder Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none" />
                </div>
                <div>
                  <input type="text" maxLength={16} placeholder="Card Number (16 digits)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                  <input type="password" maxLength={3} placeholder="CVC" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none font-mono" />
                </div>
              </div>
            )}

            {(paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") && (
              <div className={`border rounded-2xl p-4 space-y-3 animate-fadeIn ${paymentMethod === "Easypaisa" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-amber-50 border-amber-100 text-amber-800"}`}>
                <p className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> Mobile Wallet Transaction Hub</p>
                <div>
                  <label className="text-[9px] font-bold block mb-1">Enter registered {paymentMethod} Mobile Number</label>
                  <input type="tel" placeholder="03XXXXXXXXX" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg bg-white text-gray-900 outline-none font-mono" />
                </div>
                <p className="text-[9px] font-medium opacity-75">* Make sure your phone is unlocked to accept the digital prompt request ping.</p>
              </div>
            )}

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Special Delivery Notes</label>
              <textarea rows={2} value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="w-full text-xs font-semibold p-3 border rounded-xl bg-slate-50 outline-none focus:border-blue-500 transition resize-none" placeholder="Drop near main reception terminal..." />
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-slate-950 text-white text-xs font-black uppercase tracking-widest py-4 rounded-xl shadow-lg hover:bg-slate-900 transition disabled:bg-gray-400">
            {submitting ? "Processing Transaction..." : "Lock and Place Order Request"}
          </button>
        </form>

        {/* RIGHT COLUMN: MANIFEST SUMMARY SUMMARY */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-800">
          <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 border-b border-slate-800 pb-4">
            <ShoppingBag className="w-5 h-5 text-blue-500" /> Manifest Summary
          </h2>

          <div className="flex gap-4 items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-white rounded-xl p-1 border" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-black tracking-tight text-white truncate">{product.title}</h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">{formatPrice(product.price)} per unit</p>
              <p className="text-[10px] font-bold text-amber-400 uppercase mt-1">Available Stock: {product.stock}</p>
            </div>
          </div>

          {/* QUANTITY CONFIGURE NODE */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Target Quantity</span>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-lg font-black text-slate-400 hover:text-white px-1">-</button>
              <span className="text-xs font-mono font-black">{quantity}</span>
              <button type="button" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-lg font-black text-slate-400 hover:text-white px-1">+</button>
            </div>
          </div>

          {/* TOTAL AGGREGATION BILL */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Subtotal Summary</span>
              <span className="font-mono">{formatPrice(product.price * quantity)}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Logistics Shipping</span>
              <span className="text-emerald-400 font-mono">FREE</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Bill</span>
              <span className="text-xl font-mono font-black text-blue-500">{formatPrice(product.price * quantity)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}