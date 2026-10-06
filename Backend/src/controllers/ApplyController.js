const Apply = require("../models/Apply");

// @desc    Submit new job application (Public)
// @route   POST /api/careers
// @access  Public
const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      experience,
      profile,
      about,
      jobTitle,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    // Save resume filename if uploaded
    const resume = req.file ? req.file.filename : "";

    const application = await Apply.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      location: location ? location.trim() : "",
      experience: experience ? experience.trim() : "",
      profile: profile ? profile.trim() : "",
      about: about ? about.trim() : "",
      jobTitle: jobTitle ? jobTitle.trim() : "General Application",
      resume,
      status: "New",
    });

    console.log(`[CAREER APPLICATION] New submission from ${name} (${email}) for role "${jobTitle}". Target: brandsetudigital@gmail.com`);

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("submitApplication error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications (Legacy / Basic)
// @route   GET /api/careers
// @access  Private / Public fallback
const getApplications = async (req, res) => {
  try {
    const applications = await Apply.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications with search, filter, pagination for Admin
// @route   GET /api/careers/admin
// @access  Private (Admin)
const getApplicationsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, status = "all", search = "" } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { jobTitle: searchRegex },
        { location: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [applications, total] = await Promise.all([
      Apply.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Apply.countDocuments(query),
    ]);

    // Status counts for tabs
    const [countNew, countReviewed, countShortlisted, countHired, countRejected] =
      await Promise.all([
        Apply.countDocuments({ status: "New" }),
        Apply.countDocuments({ status: "Reviewed" }),
        Apply.countDocuments({ status: "Shortlisted" }),
        Apply.countDocuments({ status: "Hired" }),
        Apply.countDocuments({ status: "Rejected" }),
      ]);

    return res.status(200).json({
      success: true,
      applications,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
      statusCounts: {
        all: await Apply.countDocuments(),
        new: countNew,
        reviewed: countReviewed,
        shortlisted: countShortlisted,
        hired: countHired,
        rejected: countRejected,
      },
    });
  } catch (error) {
    console.error("getApplicationsAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

// @desc    Update application status / notes
// @route   PATCH /api/careers/admin/:id/status
// @access  Private (Admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = [
      "New",
      "Reviewed",
      "Shortlisted",
      "Interview",
      "Rejected",
      "Hired",
    ];

    const application = await Apply.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }
      application.status = status;
    }

    if (typeof notes === "string") {
      application.notes = notes;
    }

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

// @desc    Delete job application
// @route   DELETE /api/careers/admin/:id
// @access  Private (Admin)
const deleteApplication = async (req, res) => {
  try {
    const application = await Apply.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await Apply.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("deleteApplication error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
};
