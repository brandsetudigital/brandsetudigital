const InfluencerCollab = require("../models/InfluencerCollab");

// @desc    Submit Influencer / Creator Collaboration (Public)
// @route   POST /api/influencers
// @access  Public
const submitCollab = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      platform,
      socialHandle,
      followers,
      niche,
      about,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone/WhatsApp number are required",
      });
    }

    const collab = await InfluencerCollab.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      platform: platform ? platform.trim() : "Instagram",
      socialHandle: socialHandle ? socialHandle.trim() : "",
      followers: followers ? followers.trim() : "",
      niche: niche ? niche.trim() : "",
      about: about ? about.trim() : "",
      status: "New",
    });

    console.log(`[INFLUENCER COLLAB] New application from ${name} (${email}) - ${platform} @${socialHandle}. Target: brandsetudigital@gmail.com`);

    return res.status(201).json({
      success: true,
      message: "Collaboration application submitted successfully",
      collab,
    });
  } catch (error) {
    console.error("submitCollab error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get influencer applications with search, filter, pagination for Admin
// @route   GET /api/influencers/admin
// @access  Private (Admin)
const getCollabsAdmin = async (req, res) => {
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
        { platform: searchRegex },
        { socialHandle: searchRegex },
        { niche: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [collabs, total] = await Promise.all([
      InfluencerCollab.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      InfluencerCollab.countDocuments(query),
    ]);

    // Status counts for tabs
    const [countNew, countContacted, countInTalks, countApproved, countDeclined] =
      await Promise.all([
        InfluencerCollab.countDocuments({ status: "New" }),
        InfluencerCollab.countDocuments({ status: "Contacted" }),
        InfluencerCollab.countDocuments({ status: "In Talks" }),
        InfluencerCollab.countDocuments({ status: "Approved" }),
        InfluencerCollab.countDocuments({ status: "Declined" }),
      ]);

    return res.status(200).json({
      success: true,
      collabs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
      statusCounts: {
        all: await InfluencerCollab.countDocuments(),
        new: countNew,
        contacted: countContacted,
        inTalks: countInTalks,
        approved: countApproved,
        declined: countDeclined,
      },
    });
  } catch (error) {
    console.error("getCollabsAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch influencer collaborations",
    });
  }
};

// @desc    Update influencer collaboration status / notes
// @route   PATCH /api/influencers/admin/:id/status
// @access  Private (Admin)
const updateCollabStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = [
      "New",
      "Contacted",
      "In Talks",
      "Approved",
      "Declined",
    ];

    const collab = await InfluencerCollab.findById(req.params.id);
    if (!collab) {
      return res.status(404).json({
        success: false,
        message: "Collaboration record not found",
      });
    }

    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }
      collab.status = status;
    }

    if (typeof notes === "string") {
      collab.notes = notes;
    }

    await collab.save();

    return res.status(200).json({
      success: true,
      message: "Collaboration status updated successfully",
      collab,
    });
  } catch (error) {
    console.error("updateCollabStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update collaboration status",
    });
  }
};

// @desc    Delete influencer collaboration record
// @route   DELETE /api/influencers/admin/:id
// @access  Private (Admin)
const deleteCollab = async (req, res) => {
  try {
    const collab = await InfluencerCollab.findById(req.params.id);
    if (!collab) {
      return res.status(404).json({
        success: false,
        message: "Collaboration record not found",
      });
    }

    await InfluencerCollab.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Collaboration record deleted successfully",
    });
  } catch (error) {
    console.error("deleteCollab error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete collaboration record",
    });
  }
};

module.exports = {
  submitCollab,
  getCollabsAdmin,
  updateCollabStatus,
  deleteCollab,
};
