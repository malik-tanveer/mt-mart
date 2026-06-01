"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/services/authService";
import { getOrders } from "@/services/orderService"; 
import formatPrice from "@/utils/formatPrice"; 
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { User, Mail, ShieldAlert, Calendar, PlusCircle, ShoppingBag, ShieldCheck, Key, DollarSign, Layers } from "lucide-react";

export default function ProfileDashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // 1. Fetch Profile Credentials
        const userResponse = await getProfile(token);
        const userData = userResponse?.user || userResponse;
        setProfileData(userData);

        // 2. Fetch Orders Payload array directly from backend service
        const orderResponse = await getOrders();
        const rawOrdersArray = orderResponse?.orders || orderResponse || [];
        
        if (Array.isArray(rawOrdersArray)) {
          // Filter out orders matching our current user node session identifier
          const filteredUserOrders = rawOrdersArray.filter(
            (order) => order.user === userData._id
          );
          setOrders(filteredUserOrders);

          // Calculate overall pipeline cash summary using array reduce math
          const overallCash = filteredUserOrders.reduce(
            (sum, currentOrder) => sum + (currentOrder.totalPrice || 0), 
            0
          );
          setTotalSpent(overallCash);
        }

      } catch (err) {
        setError(err.response?.data?.message || "Failed to parse API inventory arrays.");
      } finally {
        setFetching(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen font-sans py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3.5 rounded-xl">
              {error}
            </div>
          )}

          {profileData && (
            <>
              {/* BRAND AUTH USER CORE BAR */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
                    {profileData.name?.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight">{profileData.name}</h1>
                    <p className="text-sm text-gray-500 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                      <Mail size={14} className="text-gray-400" /> {profileData.email}
                    </p>
                    <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5 w-max mx-auto sm:mx-0">
                      <Key size={12} /> Testing Pass: <span className="font-bold">{profileData.password || "N/A"}</span>
                    </p>
                  </div>
                </div>

                <div>
                  {profileData.role === "admin" ? (
                    <span className="bg-purple-600 text-white text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <ShieldAlert size={14} /> System Role: Admin
                    </span>
                  ) : (
                    <span className="bg-gray-900 text-white text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <ShieldCheck size={14} /> System Role: User
                    </span>
                  )}
                </div>
              </div>

              {/* TWO ANALYTICS HIGHLIGHT OVERVIEWS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* METRIC 1: TOTAL MONEY INVESTED IN PIPELINE */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100">
                    <DollarSign size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Total Cash Pipeline</p>
                    <p className="text-xl font-black text-gray-900 mt-0.5">{formatPrice(totalSpent)}</p>
                  </div>
                </div>

                {/* METRIC 2: VOLUME COUNT OF ORDERS IN SYSTEM */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                    <Layers size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Total Invoices</p>
                    <p className="text-xl font-black text-gray-900 mt-0.5">{orders.length} Nodes Placed</p>
                  </div>
                </div>

                {/* METRIC 3: ACCOUNT LIFECYCLE DATE CHRONO */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center border border-gray-100">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Node Instance</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric"
                      }) : "May 2026"}
                    </p>
                  </div>
                </div>

              </div>

              {/* ADMIN PANEL EXTRA PRIVILEGE SHORTCUT */}
              {profileData.role === "admin" && (
                <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
                  <div className="space-y-1">
                    <h2 className="text-md font-black tracking-wider uppercase text-purple-300">Administrative Store Operations</h2>
                    <p className="text-xs text-gray-400 max-w-xl">
                      Aapka active account authorization scope admin dashboard hooks inject karne ki complete dynamic capability access hold karta hai.
                    </p>
                  </div>
                  <button 
                    onClick={() => router.push("/products/create")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-950 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition shadow-md shrink-0"
                  >
                    <PlusCircle size={14} /> Create Product
                  </button>
                </div>
              )}

              {/* REAL-TIME COMPLEX DEEP DATA ORDER LIST */}
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Dynamic Sourcing Order Logs</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Aapke specific identity document array se fetch kiye gaye orders ka structural item status ledger</p>
                </div>

                {orders.length === 0 ? (
                  <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 text-xs font-semibold">
                    <ShoppingBag size={28} className="mx-auto mb-2 text-gray-300" />
                    No real transactional order records matched this user block on the database node cluster.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/30">
                        
                        {/* HEADER SPECIFICATION OF THE ORDER BOX */}
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2 text-xs font-bold text-gray-500">
                          <div className="flex gap-4">
                            <span>ID: <span className="font-mono text-gray-900">{order._id}</span></span>
                            <span>Date: <span className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span></span>
                          </div>
                          
                          <span className={`px-2.5 py-0.5 rounded-md border text-[10px] uppercase font-black tracking-wide ${
                            order.status === "shipped" 
                              ? "text-green-600 bg-green-50 border-green-100" 
                              : "text-amber-600 bg-amber-50 border-amber-100"
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        {/* PRODUCT ARRAY ROWS DISPATCH BLOCK */}
                        <div className="p-4 space-y-3">
                          {order.products?.map((item) => (
                            <div key={item._id} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center font-mono text-[10px] text-gray-400 p-1 overflow-hidden shrink-0">
                                  {item.image ? (
                                    <img src={`/images/${item.image}`} alt={item.title} className="w-full h-full object-contain rounded-md" onError={(e) => { e.target.style.display = 'none'; }} />
                                  ) : "IMG"}
                                </div>
                                <div>
                                  <p className="font-black text-gray-900">{item.title}</p>
                                  <p className="text-xs text-gray-400 font-semibold mt-0.5">
                                    Single Unit: {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="font-mono text-xs font-black text-gray-500">
                                  Qty Selected: <span className="text-gray-900 font-sans">{item.quantity}</span>
                                </p>
                                <p className="text-xs font-bold text-gray-400 mt-0.5">
                                  Sub: {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* FINAL CONSOLIDATED SUMMARY TOTAL OF BOX */}
                        <div className="bg-white p-3.5 px-4 border-t border-gray-50 flex justify-between items-center text-xs font-bold text-gray-500">
                          <span>Total Calculated Invoice Cost:</span>
                          <span className="text-sm font-black text-gray-900">{formatPrice(order.totalPrice)}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}