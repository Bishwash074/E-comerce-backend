const { Cart, CartItem, Product } = require('../modal')


const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user.id
    // find or creatusers cart
    let cart = await Cart.findOne({ where: { userId } })
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

const getCart = async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId)

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ["quantity"] }
      }
    })

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.status(200).json(cart)
  } catch (error) {
    console.error("GET CART ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

const UpdateCardItem = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params
    const { quantity } = req.body

    const cart = await Cart.findOne({ where: { userId } })
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" })
    }

    const cartItem = await CartItem.findOne({
      where: { CartId: cart.id, productId: productId }
    })

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { addToCart, getCart,UpdateCardItem }