"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Package, ShieldAlert, Trash2, RefreshCw, User, Edit3, DollarSign, ShoppingBag, Truck } from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import Swal from "sweetalert2";
import { getOrders, getOrdersAdmin, updateOrder, deleteOrder } from "@/services/orderService"; 

export default function OrdersPage() {
  const router = useRouter(); 
  const [myOrders, setMyOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("user"); 
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUserRole(user.role || "user");
    fetchOrdersPipeline();
  }, []);

  const fetchOrdersPipeline = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")) || {};
    try {
      const resMy = await getOrders(token);
      if (resMy.success) setMyOrders(resMy.orders);

      if (user.role === "admin") {
        const resAdmin = await getOrdersAdmin(token);
        if (resAdmin.success) setAdminOrders(resAdmin.orders);
      }
    } catch (error) {
      Swal.fire("Fetch Error", "Could not load order registries.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await updateOrder(orderId, { status: newStatus }, localStorage.getItem("token"));
      if (res.success) {
        Swal.fire({ title: "Status Mutated!", text: `Set to: ${newStatus}`, icon: "success" });
        fetchOrdersPipeline(); 
      }
    } catch (error) {
      Swal.fire("Action Halted", "Status update failed", "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the order record and rollback inventory!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteOrder(orderId, localStorage.getItem("token"));
          if (res.success) {
            Swal.fire("Deleted!", "Order record destroyed.", "success");
            fetchOrdersPipeline(); 
          }
        } catch (error) {
          Swal.fire("Error", "Failed to drop data node", "error");
        }
      }
    });
  };

  const currentDisplayList = activeTab === "admin" ? adminOrders : myOrders;

  // 🔥 STATS ANALYTICS ENGINE
  const totalOrdersCount = currentDisplayList.length;
  const totalRevenueSum = currentDisplayList.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const pendingShipmentsCount = currentDisplayList.filter(o => o.status === "pending" || o.status === "shipped").length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b pb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Package className="text-blue-600" /> Logistics Ledger
            </h1>
          </div>

          {userRole === "admin" && (
            <div className="flex bg-gray-200/60 p-1 rounded-xl border">
              <button onClick={() => setActiveTab("user")} className={`text-xs font-bold uppercase px-4 py-2 rounded-lg transition ${activeTab === "user" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>My Dashboard</button>
              <button onClick={() => setActiveTab("admin")} className={`text-xs font-bold uppercase px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === "admin" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}><ShieldAlert className="w-3.5 h-3.5" /> Admin Console</button>
            </div>
          )}
        </div>

        {/* 🔥 KPI METRICS CARDS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><DollarSign className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block">Total {activeTab === "admin" ? "Sales Revenue" : "Your Spending"}</span>
              <span className="text-lg font-black font-mono">{formatPrice(totalRevenueSum)}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><ShoppingBag className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block">Total Orders Matrix</span>
              <span className="text-lg font-black font-mono">{totalOrdersCount} Orders</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Truck className="w-5 h-5" /></div>
            <div>
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider block">Active Pipeline / Processing</span>
              <span className="text-lg font-black font-mono">{pendingShipmentsCount} In-Flight</span>
            </div>
          </div>
        </div>

        {/* ORDERS LIST */}
        {currentDisplayList.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center text-gray-400 font-bold uppercase text-xs">No active transactions logged</div>
        ) : (
          <div className="space-y-4">
            {currentDisplayList.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* META INFO */}
                <div className="lg:col-span-4 space-y-2 lg:border-r lg:pr-6 border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-gray-400">ID: {order._id}</span>
                    <span className={`text-[9px] uppercase font-black border px-2 py-0.5 rounded ${order.status === "delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{order.status}</span>
                  </div>
                  {activeTab === "admin" && <p className="font-bold text-gray-900 flex items-center gap-1"><User className="w-3.5 h-3.5 text-gray-400" /> {order.shippingAddress?.fullName || "Guest"}</p>}
                  <p><strong className="text-gray-800">Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                  <p><strong className="text-gray-800">Phone:</strong> {order.shippingAddress?.phone}</p>
                </div>

                {/* PRODUCTS LIST */}
                <div className="lg:col-span-5 space-y-2">
                  {order.products?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-8 h-8 object-contain rounded bg-slate-50 border p-1" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 font-mono">{formatPrice(item.price)} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ACTIONS & TOTAL AMOUNT */}
                <div className="lg:col-span-3 flex lg:flex-col justify-between items-center lg:items-end gap-3 lg:pl-6">
                  <div className="lg:text-right">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Aggregation</span>
                    <span className="text-xl font-black font-mono text-gray-950">{formatPrice(order.totalPrice)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeTab === "admin" ? (
                      <>
                        <select value={order.status} onChange={(e) => handleUpdateStatus(order._id, e.target.value)} className="text-xs font-semibold p-1.5 border rounded-lg bg-gray-50 outline-none cursor-pointer">
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <button onClick={() => router.push(`/order/edit/${order._id}`)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteOrder(order._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      order.status === "pending" && (
                        <>
                          <button onClick={() => router.push(`/order/edit/${order._id}`)} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition">Edit</button>
                          <button onClick={() => handleDeleteOrder(order._id)} className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-100 transition">Cancel</button>
                        </>
                      )
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}