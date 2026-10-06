const express = require("express");
const {
  adminLogin,
  getAdminProfile,
  updateAdminPassword,
} = require("../controllers/authController");
const { protectAdmin } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: {
    success: false,
    message:
      "Too many login attempts from this IP address. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router();

router.post("/login", loginLimiter, adminLogin);
router.get("/me", protectAdmin, getAdminProfile);
router.put("/password", protectAdmin, updateAdminPassword);

module.exports = router;
