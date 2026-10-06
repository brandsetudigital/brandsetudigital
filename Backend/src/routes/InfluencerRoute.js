const express = require("express");
const {
  submitCollab,
  getCollabsAdmin,
  updateCollabStatus,
  deleteCollab,
} = require("../controllers/InfluencerController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public submission
router.post("/", submitCollab);

// Protected Admin Routes
router.get("/admin", protectAdmin, getCollabsAdmin);
router.patch("/admin/:id/status", protectAdmin, updateCollabStatus);
router.delete("/admin/:id", protectAdmin, deleteCollab);

module.exports = router;
