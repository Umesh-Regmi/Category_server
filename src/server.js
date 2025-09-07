import express from "express";

// importing routes
import "dotenv/config";
import cookieParser from "cookie-parser";
// import userRoute from './routes/userRoute.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "../middlewares/userHandler_middleware.js";
import { mongodb_conn } from "./config/mongodb_config.js";
import categoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import wishListRoute from "./routes/wishListRoute.js";
import cartRoute from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoute.js";
const port = process.env.PORT;
// const MONGO_URL = process.env.MONGODB_URL

//creating expess app instance
const app = express();

// middleware
// req-authMiddleware-post order
// Types of Middleware
//1. Custom 2. Built 3. Third-party

// variety
// 1. app level 2. route level 3. error handler
const authMiddleware = (req, res, next) => {
  console.log("Middleware run");
  next();
};
// connecting to database
mongodb_conn();

// middleware
app.use(cookieParser());
app.use(authMiddleware);
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "10mb" }));
//ping routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

// using routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/wishlist", wishListRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// path not found
app.use((req, res, next) => {
  next({
    message: `Can not ${req.method} on ${req.path}`,
    statusCode: 501,
    success: false,
    status: "fail",
  });
});

// listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorHandler);
