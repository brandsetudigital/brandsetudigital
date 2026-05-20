const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    city: String,
    domain: String,
    service: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
