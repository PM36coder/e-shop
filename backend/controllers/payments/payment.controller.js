import { stripe } from "../../utils/stripe.js";
import { Cart } from "../../models/cart.model.js";

//! first payment intent creation
const createPaymentIntent = async (req, res) => {
  try {
    const userID = req.user?.id;

    //! find the user cart
    const cart = await Cart.findOne({ user: userID }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
//! calculate total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

//? stripe accepts amount in paise
const amountToCharge = totalAmount * 100

//! create payment intent with stripe
const paymentIntent = await stripe.paymentIntents.create({
    amount: amountToCharge,
    currency: "inr",
    metadata: {userID}
})

res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
    });

  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ message: "Payment error" });
  }
};

export { createPaymentIntent}