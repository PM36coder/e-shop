import express from "express";
import { authMiddleware } from "../middleware/userAuthMiddleware.js"; 
import {
  addToCart,
  getUserCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
} from '../controllers/cart/cartController.js';

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getUserCart);
router.put("/update", authMiddleware, updateCartQuantity);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;
