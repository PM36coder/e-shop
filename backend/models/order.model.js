import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" }
    },

    //* IMPORTANT FOR STRIPE
    paymentIntentId: String, // Stripe payment intent ID
    clientSecret: String,    // Stripe client secret for frontend

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing"
    }

  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
