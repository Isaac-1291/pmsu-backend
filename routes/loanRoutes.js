import express from "express";
import Loan from "../models/Loan.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js"; // optional, if email is set up

const router = express.Router();

/**
 * @route   POST /api/loans
 * @desc    Submit a new loan application
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json({ message: "Loan application submitted successfully", loan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/loans
 * @desc    Get all loan applications
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find().populate("memberId");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/loans/:id
 * @desc    Update a loan application status and notify the applicant
 * @access  Public
 */
router.put("/:id", async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // Create notification
    const msg = `Your loan application has been ${loan.approval}`;
    await Notification.create({
      type: "loan",
      message: msg,
      recipientEmail: loan.email,
    });

    // Optional: send email
    if (loan.email) {
      await sendEmail({
        to: loan.email,
        subject: "Loan Application Update",
        text: msg,
      });
    }

    res.json({ message: "Loan updated successfully", loan });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;