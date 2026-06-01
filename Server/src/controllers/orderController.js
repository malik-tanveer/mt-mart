import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      paymentMethod,
      orderNotes,
      status,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products found" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ success: false, message: "Shipping address is required" });
    }

    let orderProducts = [];
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `${product.title} is out of stock` });
      }

      totalPrice += product.price * item.quantity;

      orderProducts.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id, 
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentMethod,
      orderNotes,
      status: status || "pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      //  user: req.user._id 
      }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    //   return res.status(403).json({ success: false, message: "Access denied" });
    // }

    Object.assign(order, req.body);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Restore Stock Logic
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully by Admin",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};