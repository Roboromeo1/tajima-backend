import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import colorSetRoutes from "./routes/colorSetRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debugging middleware for CORS (before setting CORS headers)
app.use((req, res, next) => {
  console.log("Received request with headers: ", req.headers);
  next();
});

// Configure CORS
const corsOptions = {
  origin: "https://tajima-frontend.vercel.app",
  credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

// Debugging middleware for CORS (after setting CORS headers)
app.use((req, res, next) => {
  console.log("Response headers after CORS middleware: ", res.getHeaders());
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/colorsets", colorSetRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: "Af-ANrFTv95TdZ9VlV3QeL_xASsH29zbCItiPyXtkHPbQrgVriFxLvtqZepGdRTuGsL4iVTyCbv2vnid",
  })
);

const uploadsDir = path.resolve(__dirname, '../uploads');
console.log("Uploads directory:", uploadsDir);

console.log(`Current environment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static(uploadsDir));
} else {
  app.use("/uploads", express.static(uploadsDir));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
