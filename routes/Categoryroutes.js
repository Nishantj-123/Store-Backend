import express from "express";
import {
  createCategory,
  getCategoriesWithProducts,
  getCategories,   // renamed from getsCategory for clarity
  updateCategory,
  deleteCategory,
} from "../controller/CategoryController.js";

const router = express.Router();

// CREATE
router.post("/post", createCategory);

// READ all categories with products
router.get("/get/para", getCategoriesWithProducts);

// READ all categories simple list
router.get("/get", getCategories);

// UPDATE
router.put("/put/:id", updateCategory);

// DELETE
router.delete("/delete/:id", deleteCategory);

export default router;
