import express from "express";
import { createPaymentIntent } from "../controllers/payments/payment.controller.js";
import { authMiddleware} from "../middleware/userAuthMiddleware.js "

const router = express.Router();

router.post("/create-intent",authMiddleware, createPaymentIntent);

export default router;
