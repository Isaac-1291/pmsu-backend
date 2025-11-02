import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  staffId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  position: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  dateJoined: { type: Date, default: Date.now },
  status: { type: String, default: "Active" },
});

export default mongoose.model("Member", memberSchema);