// External imports
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

// Environment config
dotenv.config();

// App initialization
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/category", Categoryroutes);
app.use("/api/product", Productroutes);
app.use("/api/setting", Settingroutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
