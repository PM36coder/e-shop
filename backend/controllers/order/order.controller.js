import { Order } from "../../models/order.model.js";
import { Cart } from "../../models/cart.model.js";

const createOrder =  async(req,res)=>{
    try {
        const userId = req.user?.id;
        const {paymentIntentId, shippingAddress} = req.body

        if (!shippingAddress || !paymentIntentId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    //!check the user cart 
    const cart = await Cart.findOne({ user: userId}).populate("items.product")

    if(!cart || cart.items.length ===0){
        return res.status(400).json({message : "Cart is empty"})
    }

      //? Calculate total

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    // Create order pi_3SXNb5DRkNcnvcuL10BltP1Y
    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount,
      shippingAddress,
      paymentIntentId,
      paymentStatus: "paid",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

    } catch (error) {
            console.log("Order Error:", error);
    res.status(500).json({ message: "Server error" });
    }
}

//Get user orders
 const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get single order by id
 const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export {createOrder,getUserOrders,getSingleOrder}