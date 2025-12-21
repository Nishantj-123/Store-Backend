import Product from "../model/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : "";

    const newProduct = await Product.create({ name, price, category, image });

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    let updateData = { name, price, category };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
  }
};

export const getsProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch products",
        error: err.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted",
        product: deletedProduct,
      });
  } catch (err) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
  }
};
