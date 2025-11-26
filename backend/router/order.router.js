import express from "express"
import { createOrder,getUserOrders,getSingleOrder } from "../controllers/order/order.controller.js";

//admin route
import { getAllOrders,updateOrderStatus } from "../controllers/order/admin.order.controller.js";
import { authMiddleware } from "../middleware/userAuthMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

//user routes
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getSingleOrder);

//admin routes
router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);
router.put("/admin/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;