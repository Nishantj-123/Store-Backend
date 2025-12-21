import Category from "../model/Category.js";
import Product from "../model/Product.js";

// CREATE
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Error creating category", error: error.message });
  }
};

// READ ALL (simple)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: "Failed to fetch categories", error: err.message });
  }
};

// READ ALL with Products
export const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find();

    const categoriesWithProducts = await Promise.all(

      categories.map(async (category) => {
        const products = await Product.find({ category: category._id });

        return {
          _id: category._id,
          name: category.name,
          products,
        };
      })
    );

    res.status(200).json({
      success: true,
      categories: categoriesWithProducts,
    });
  } catch (err) {
    console.error("Error fetching categories with products:", err);
    res.status(500).json({ success: false, message: "Failed to fetch categories with products", error: err.message });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, update, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated",
      category: updatedCategory,
    });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted",
      category: deletedCategory,
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};



 // category .find()  Return a array of all categories (e.g., Electronics, Clothing, etc.).

  // Promise.all():
//       Runs all Product.find()  in parallel, making it faster than sequential awaits.

//         Product.find({ category: category._id }):

//        Finds products that reference the current category via their category field.