// src/server.js

import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import DBconnect from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// ENV
dotenv.config();

// DB
DBconnect();

// App initalize and PORT
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorMiddleware);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});