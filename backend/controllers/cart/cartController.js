import { Product } from "../../models/product.model.js";
import { Cart } from "../../models/cart.model.js";

 const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // ensure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    const qty = Number(quantity) || 1;

    // If user has no cart → create one
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: qty }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += qty;
      } else {
        // Add new item
        cart.items.push({ product: productId, quantity: qty });
      }

      await cart.save();
    }

    res.status(200).json({ message: "Product added to cart", cart });
    
  } catch (error) {
    console.log("Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserCart = async(req,res)=>{
    try {
        const userId = req.user?.id;
        const cart = await Cart.findOne({user :userId}).populate("items.product")
        if(!cart || cart.items.length === 0){
            return res.status(200).json({message: "No Item Added "})
        }

    res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


//!update cart items
const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity)
      return res.status(400).json({ message: "Required fields missing" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;

    await cart.save();

    res.json({ message: "Quantity updated", cart });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// clear all cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] }
    );

    res.json({ message: "Cart cleared" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed", cart });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {getUserCart,addToCart ,removeFromCart, updateCartQuantity,clearCart}