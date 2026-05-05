// /api/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { connDB } from "../config/db.js"; // make sure this path is correct

// Routes
import authRoutes from "../routes/auth.route.js";
import utilsRoutes from "../routes/utils.route.js";
import userRoutes from "../routes/user.route.js";
import adminRoutes from "../routes/admin.route.js";

dotenv.config();

const app = express();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(
  express.json({
    limit: "100mb",
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, "https://www.kothasongkolon.com","https://kothasongkolon.com"],
    credentials: true,
  }),
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/utils", utilsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// ===== MongoDB connection (serverless-safe) =====
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = connDB(); // your connDB should return mongoose.connect promise
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ===== Serverless handler =====
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
