const mongoose = require("mongoose");

const influencerCollabSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    platform: { type: String, default: "Instagram" },
    socialHandle: { type: String, default: "" },
    followers: { type: String, default: "" },
    niche: { type: String, default: "" },
    about: { type: String, default: "" },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Talks", "Approved", "Declined"],
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfluencerCollab", influencerCollabSchema);
