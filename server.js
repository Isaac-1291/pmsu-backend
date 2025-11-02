import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import memberRoutes from "./routes/memberRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; // <-- move this up

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection Error:", err));

// Routes
app.use("/api/members", memberRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/notifications", notificationRoutes); // <-- use before listen

app.get("/", (req, res) => {
  res.send("PMSU API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});