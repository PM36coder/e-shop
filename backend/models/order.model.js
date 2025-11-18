import {Schema, model} from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "pending", // pending, paid, failed
    },

    paymentInfo: {
      id: String,
      method: String,
      status: String,
    },

    orderStatus: {
      type: String,
      default: "processing", // processing, shipped, delivered
    },
  },
  { timestamps: true }
);

export const Order =  model("Order", orderSchema);
