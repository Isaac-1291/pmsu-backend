import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// Add new member
router.post("/", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json({ message: "Member registered successfully", member });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;