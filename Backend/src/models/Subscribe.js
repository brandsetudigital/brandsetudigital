const mongoose = require("mongoose");

const subscribeSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscribe", subscribeSchema);
