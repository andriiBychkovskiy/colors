import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/images.js";
import paletteRoutes from "./routes/palettes.js";
import progressRoutes from "./routes/progress.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? true  // In production, allow same-origin since frontend is served by same server
    : [
        "http://localhost:5173", // Vite dev server
        "http://localhost:5174", // Alternative Vite port
        "http://localhost:3000", // Alternative port
        "http://127.0.0.1:5173", // Alternative localhost
        "http://localhost:4173", // Vite preview
      ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// MongoDB connection
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn("⚠️  MONGODB_URI not set - running without database");
    return;
  }
  
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("Connection string format:", process.env.MONGODB_URI.replace(/\/\/.*@/, "//<credentials>@"));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("Full error:", error);
    
    // Don't exit - allow server to run without DB for debugging
    console.log("⚠️  Server will continue without database connection");
  }
};

// Connect to database
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/images", imageRoutes);
app.use("/palettes", paletteRoutes);
app.use("/progress", progressRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../react/dist");
  console.log("Serving static files from:", distPath);
  
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
