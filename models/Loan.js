import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  loanType: { type: String, required: true },
  amountRequested: { type: Number, required: true },
  purpose: { type: String },
  repaymentPeriod: { type: String },
  status: { type: String, default: "Pending" },
  applicationDate: { type: Date, default: Date.now },
});

export default mongoose.model("Loan", loanSchema);