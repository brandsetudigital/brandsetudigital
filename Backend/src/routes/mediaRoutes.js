const express = require("express");
const {
  getMediaList,
  uploadMedia,
  deleteMedia,
} = require("../controllers/mediaController");
const { protectAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/mediaUpload");

const router = express.Router();

router.get("/", protectAdmin, getMediaList);
router.post("/upload", protectAdmin, upload.single("image"), uploadMedia);
router.delete("/:id", protectAdmin, deleteMedia);

module.exports = router;
