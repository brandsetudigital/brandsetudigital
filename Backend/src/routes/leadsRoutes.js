const express = require("express");
const {
  getLeads,
  updateLeadStatus,
  deleteLead,
} = require("../controllers/leadsController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protectAdmin, getLeads);
router.patch("/:id/status", protectAdmin, updateLeadStatus);
router.delete("/:id", protectAdmin, deleteLead);

module.exports = router;
