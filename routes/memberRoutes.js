import express from "express";
import Member from "../models/Member.js";
import Notification from "../models/Notification.js";

const router = express.Router();

// Try to import sendEmail if it exists, otherwise use a placeholder
let sendEmail;
try {
  sendEmail = (await import("../utils/sendEmail.js")).default;
} catch (err) {
  console.warn("⚠️ sendEmail.js not found, emails will be skipped");
  sendEmail = async () => {}; // noop function
}

/**
 * @route   POST /api/members
 * @desc    Register a new member and create a notification
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const newMember = await Member.create(req.body);

    // Create notification
    await Notification.create({
      type: "member",
      message: `New member registered: ${newMember.fullName}`,
      recipientEmail: newMember.email,
    });

    // Optional: send email
    if (newMember.email) {
      await sendEmail({
        to: newMember.email,
        subject: "Welcome to PMSU",
        text: `Hello ${newMember.fullName}, your membership has been successfully registered.`,
      });
    }

    res.status(201).json({ message: "Member registered successfully", member: newMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   GET /api/members
 * @desc    Get all members
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;