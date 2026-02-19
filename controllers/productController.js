const Product = require("../modal/productModal")

// Create product use by admin
const createProduct = async (req, res) => {
  try {
    const { ProductName, description, price, stock, imageUrl } = req.body
    const product = await Product.create({
      ProductName,
      description,
      price,
      stock,
      imageUrl
    })
    res.status(200).json({
      message: "Product created sucessfully",
      product
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// get all product

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.status(200).json({ products })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// get a single product 

const getaProduct = async (req, res) => {
  try {
    const id = req.params
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { ProductName, description, price, stock, imageUrl }=req.body
    const product = await Product.findByPk(req.params.id)
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await product.update({
      ProductName,
      description,
      price,
      stock,
      imageUrl
    })
    res.status(200).json({ message: "Product updated", product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports={createProduct,getAllProducts,getaProduct,updateProduct,deleteProduct}