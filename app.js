import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Internal imports
import connectDB from "./config/db.js";
import Categoryroutes from "./routes/Categoryroutes.js";
import Productroutes from "./routes/Productroutes.js";
import Settingroutes from "./routes/Settingroutes.js";
import Cartroutes from "./routes/Cartroutes.js";
import Userroutes from "./routes/Userroutes.js";
import Orderroutes from "./routes/Orderroutes.js";

// Environment config
dotenv.config();

// App initialization
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/category", Categoryroutes);
app.use("/api/product", Productroutes);
app.use("/api/setting", Settingroutes);
app.use("/api/cart", Cartroutes);
app.use("/api/user", Userroutes);
app.use("/api/order", Orderroutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
