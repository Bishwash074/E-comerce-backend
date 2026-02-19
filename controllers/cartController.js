const { Cart, CartItem, Product } = require('../modal')


const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user.id
    // find or creatusers cart
    const cart = await Cart.findOne({ where: { userId } })
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const cartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });
    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add new product to cart
      await CartItem.create({
        CartId: cart.id,
        ProductId: productId,
        quantity,
      });
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}