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
    resume: { type: String }, // We'll store file name or URL if uploaded
    jobTitle: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apply", applySchema);
