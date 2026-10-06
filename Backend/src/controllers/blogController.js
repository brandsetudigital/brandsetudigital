const Blog = require("../models/Blog");

// Helper to calculate reading time
const calculateReadingTime = (text) => {
  if (!text) return "3 min read";
  const words = text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

// Helper to sanitize slug
const sanitizeSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// ========================================================
// PUBLIC APIS
// ========================================================

// @desc    Get published blogs with search, filtering & pagination
// @route   GET /api/blogs
// @access  Public
exports.getPublicBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      category = "",
      serviceSlug = "",
    } = req.query;

    const query = { status: "published" };

    if (category && category !== "All") {
      query.category = category;
    }

    if (serviceSlug) {
      query.serviceSlug = serviceSlug;
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { category: searchRegex },
        { tags: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select(
          "title slug serviceSlug category excerpt featuredImage author status readingTime publishedAt tags canonicalUrl"
        )
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Blog.countDocuments(query),
    ]);

    // Also get all distinct categories from published blogs
    const categories = await Blog.distinct("category", { status: "published" });

    return res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      categories,
    });
  } catch (error) {
    console.error("getPublicBlogs error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving blogs",
    });
  }
};

// @desc    Get single published blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getPublicBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug: slug.toLowerCase().trim(),
      status: "published",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found or has been unpublished",
      });
    }

    // Get 3 related blogs from the same category or service
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      status: "published",
      $or: [{ category: blog.category }, { serviceSlug: blog.serviceSlug }],
    })
      .select("title slug serviceSlug category excerpt featuredImage author readingTime publishedAt")
      .limit(3);

    return res.status(200).json({
      success: true,
      blog,
      relatedBlogs,
    });
  } catch (error) {
    console.error("getPublicBlogBySlug error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving blog article",
    });
  }
};

// ========================================================
// ADMIN APIS (PROTECTED)
// ========================================================

// @desc    Get all blogs for Admin (drafts, published, unpublished)
// @route   GET /api/admin/blogs
// @access  Private (Admin)
exports.getAdminBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "", category = "", status = "" } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { slug: searchRegex },
        { category: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select("title slug serviceSlug category status readingTime publishedAt createdAt updatedAt featuredImage author")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Blog.countDocuments(query),
    ]);

    const categories = await Blog.distinct("category");

    return res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      categories,
    });
  } catch (error) {
    console.error("getAdminBlogs error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving admin blog list",
    });
  }
};

// @desc    Get single blog by ID for Admin Editor/Preview
// @route   GET /api/admin/blogs/:id
// @access  Private (Admin)
exports.getAdminBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving blog",
    });
  }
};

// @desc    Create a new blog
// @route   POST /api/admin/blogs
// @access  Private (Admin)
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      serviceSlug,
      category,
      excerpt,
      content,
      featuredImage,
      author,
      status = "draft",
      readingTime,
      metaTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      faqs,
      tags,
      serviceLink,
      serviceName,
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Category, and Content are required fields.",
      });
    }

    // Generate or clean slug
    const finalSlug = slug ? sanitizeSlug(slug) : sanitizeSlug(title);

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A blog with the slug "${finalSlug}" already exists. Please choose a unique slug.`,
      });
    }

    const calculatedReadTime = readingTime || calculateReadingTime(content);

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      serviceSlug: serviceSlug || "general",
      category,
      excerpt: excerpt || title,
      content,
      featuredImage: featuredImage || "",
      author: {
        name: author?.name || req.admin.name || "BrandSetu Editorial Team",
        role: author?.role || "Digital Marketing Strategist",
        avatar: author?.avatar || "/assets/Founder-brandsetu-digital.webp",
      },
      status: ["draft", "published", "unpublished"].includes(status) ? status : "draft",
      readingTime: calculatedReadTime,
      publishedAt: status === "published" ? new Date() : null,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || title,
      focusKeyword: focusKeyword || "",
      canonicalUrl: canonicalUrl || `/blog/${finalSlug}`,
      ogTitle: ogTitle || metaTitle || title,
      ogDescription: ogDescription || metaDescription || excerpt,
      ogImage: ogImage || featuredImage || "",
      faqs: Array.isArray(faqs) ? faqs : [],
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(t => t.trim()) : [],
      serviceLink: serviceLink || "",
      serviceName: serviceName || "",
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("createBlog error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

// @desc    Update an existing blog
// @route   PUT /api/admin/blogs/:id
// @access  Private (Admin)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updateData = { ...req.body };

    // If slug is changed, ensure uniqueness
    if (updateData.slug && updateData.slug !== blog.slug) {
      const sanitized = sanitizeSlug(updateData.slug);
      const existing = await Blog.findOne({
        slug: sanitized,
        _id: { $ne: blog._id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Slug "${sanitized}" is already taken by another blog.`,
        });
      }
      updateData.slug = sanitized;
    }

    // Auto calculate read time if content updated
    if (updateData.content && !updateData.readingTime) {
      updateData.readingTime = calculateReadingTime(updateData.content);
    }

    // If publishing newly
    if (updateData.status === "published" && blog.status !== "published" && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("updateBlog error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update blog",
    });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private (Admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};

// @desc    Publish a blog
// @route   POST /api/admin/blogs/:id/publish
// @access  Private (Admin)
exports.publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.status = "published";
    if (!blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog published successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to publish blog" });
  }
};

// @desc    Unpublish a blog
// @route   POST /api/admin/blogs/:id/unpublish
// @access  Private (Admin)
exports.unpublishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.status = "unpublished";
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog unpublished successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to unpublish blog" });
  }
};
