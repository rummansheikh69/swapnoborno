import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { connDB } from "./config/db.js";

const app = express();
dotenv.config();

// routes
import authRoutes from "./routes/auth.route.js";
import utilsRoutes from "./routes/utils.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 4002;

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
    origin: [
      `${process.env.CLIENT_URL}`,
      "http://localhost:3001",
<<<<<<< HEAD
      "https://www.swapnoborno.com",
=======
"https://www.swapnoborno.com",
>>>>>>> 09bf66e79e5d5c9b4795431e749839e373a5acf4
    ],
    credentials: true,
  }),
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/utils", utilsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  connDB();
  console.log(`Server running → http://localhost:${PORT}`);
});
