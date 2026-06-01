import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
  getOrderById,
  getAllOrdersAdmin,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", getMyOrders);
router.get("/admin/all", protect, authorize("admin"), getAllOrdersAdmin); 
router.get("/:id", protect, getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", protect, authorize("admin"), deleteOrder);

export default router;