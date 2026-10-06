const mongoose = require("mongoose");

const applySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String },
    experience: { type: String },
    profile: { type: String },
    about: { type: String },
    resume: { type: String }, // Stored file name in uploads
    jobTitle: { type: String },
    status: {
      type: String,
      enum: ["New", "Reviewed", "Shortlisted", "Interview", "Rejected", "Hired"],
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apply", applySchema);
