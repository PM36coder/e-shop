import { Order } from "../../models/order.model.js";


 const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort("-createdAt");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status; // processing → shipped → delivered
    await order.save();

    res.json({ message: "Order updated", order });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllOrders, updateOrderStatus}
