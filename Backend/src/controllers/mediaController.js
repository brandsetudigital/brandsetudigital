const fs = require("fs");
const path = require("path");
const Media = require("../models/Media");

// @desc    Get all media assets with pagination & search
// @route   GET /api/admin/media
// @access  Private (Admin)
exports.getMediaList = async (req, res) => {
  try {
    const { page = 1, limit = 24, search = "" } = req.query;

    const query = {};
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [{ filename: searchRegex }, { originalName: searchRegex }];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 24;
    const skip = (pageNum - 1) * limitNum;

    const [mediaItems, total] = await Promise.all([
      Media.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Media.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      media: mediaItems,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("getMediaList error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching media library",
    });
  }
};

// @desc    Upload new image(s)
// @route   POST /api/admin/media/upload
// @access  Private (Admin)
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      });
    }

    const file = req.file || req.files[0];
    const relativeUrl = `/uploads/media/${file.filename}`;

    const newMedia = await Media.create({
      filename: file.filename,
      originalName: file.originalname,
      url: relativeUrl,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      altText: req.body.altText || file.originalname.split(".")[0],
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      media: newMedia,
    });
  } catch (error) {
    console.error("uploadMedia error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image",
    });
  }
};

// @desc    Delete media file
// @route   DELETE /api/admin/media/:id
// @access  Private (Admin)
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media item not found",
      });
    }

    // Attempt to remove file from disk
    if (media.path && fs.existsSync(media.path)) {
      try {
        fs.unlinkSync(media.path);
      } catch (err) {
        console.warn("Could not delete file from disk:", err.message);
      }
    }

    await Media.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("deleteMedia error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting media item",
    });
  }
};
