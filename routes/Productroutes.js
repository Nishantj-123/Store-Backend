import express from "express";
import {
  createProduct,
  getsProduct,
  deleteProduct,
  updateProduct,
} from "../controller/ProductController.js";
import upload from "../middleware/multer.js";
// import verifyToken from "../middleware/Verifytoken.js";

const router = express.Router();

router.post("/post", upload.single("image"), createProduct);
router.get("/get", getsProduct);
router.put("/put/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;