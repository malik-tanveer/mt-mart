import API from "@/lib/axios";

/**
 * 1. CREATE ORDER (User)
 * Cart se order place karne ke liye.
 */
export const createOrder = async (orderData, token) => {
  const response = await API.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * 2. GET MY ORDERS (User)
 * Logged-in user ke apne personal orders dashboard par lane ke liye.
 */
export const getOrders = async (token) => {
  const response = await API.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * 3. GET ALL ORDERS FOR ADMIN (Admin Only)
 * 🔥 NEW ADDED: Admin Console ke liye poori duniya ke saare orders ek sath lane ke liye.
 */
export const getOrdersAdmin = async (token) => {
  const response = await API.get("/orders/admin/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * 4. GET SINGLE ORDER (Shared)
 * Kisi specific order ki deep details track karne ke liye.
 */
export const getSingleOrder = async (id, token) => {
  const response = await API.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const updateOrder = async (id, orderData, token) => {
  const response = await API.put(`/orders/${id}`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteOrder = async (id, token) => {
  const response = await API.delete(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};