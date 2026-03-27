const mongoose = require("mongoose");

const PreOrderSchema = new mongoose.Schema({
  receiverName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  contactNo: { type: String, required: true },
  product: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  size: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ["received", "in_progress", "packed", "dispatched"],
    default: "received",
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PreOrder", PreOrderSchema);
