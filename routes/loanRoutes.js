import express from "express";
import Loan from "../models/Loan.js";

const router = express.Router();

// Submit a loan application
router.post("/", async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json({ message: "Loan application submitted successfully", loan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all loan applications
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find().populate("memberId");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;