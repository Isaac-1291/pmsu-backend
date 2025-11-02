import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// GET all notifications (optionally unread only)
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;