import express from "express";
import {
  createCart,
  deleteCartItem,
  getCart,
  updateCart,
  clearCart,
} from "../controller/CartController.js";
// import verifyToken from "../middleware/Verifytoken.js";

const router = express.Router();

router.post("/post",  createCart);     // Add to cart
router.get("/get", getCart);          // Get cart
router.put("/put", updateCart);       // Update qty
router.delete("/delete", deleteCartItem); // Remove item
router.delete("/clear", clearCart);   // Clear cart

export default router;
