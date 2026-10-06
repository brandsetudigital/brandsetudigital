const express = require("express");
const {
  getPublicBlogs,
  getPublicBlogBySlug,
  getAdminBlogs,
  getAdminBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} = require("../controllers/blogController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes (Protected) - Must be registered BEFORE /:slug
router.get("/admin", protectAdmin, getAdminBlogs);
router.get("/admin/list/all", protectAdmin, getAdminBlogs);
router.get("/admin/detail/:id", protectAdmin, getAdminBlogById);
router.post("/admin", protectAdmin, createBlog);
router.put("/admin/:id", protectAdmin, updateBlog);
router.delete("/admin/:id", protectAdmin, deleteBlog);
router.post("/admin/:id/publish", protectAdmin, publishBlog);
router.post("/admin/:id/unpublish", protectAdmin, unpublishBlog);

// Public routes
router.get("/", getPublicBlogs);
router.get("/:slug", getPublicBlogBySlug);

module.exports = router;
