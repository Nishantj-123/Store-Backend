import express from "express";

import {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getSingleOrder,
  getAllOrders,
} from "../controller/OrderController.js";

import verifyToken from "../middleware/Verifytoken.js";

const router = express.Router();

// USER ROUTES
router.post("/post", verifyToken, createOrder);
router.get("/get", verifyToken, getMyOrders);        // removed :id
router.get("/order/:id", verifyToken, getSingleOrder); // added missing "/"

// ADMIN ROUTES
router.get("/all", verifyToken, getAllOrders);       // removed :id
router.put("/put/:id", verifyToken, updateOrderStatus); //  added :id

export default router;
