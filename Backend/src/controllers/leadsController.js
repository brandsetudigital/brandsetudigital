const Enquiry = require("../models/Enquiry");

// @desc    Get all leads / contact enquiries with filters & pagination
// @route   GET /api/admin/leads
// @access  Private (Admin)
exports.getLeads = async (req, res) => {
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
        { service: searchRegex },
        { city: searchRegex },
        { domain: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Enquiry.countDocuments(query),
    ]);

    // Summary counts by status
    const [countNew, countContacted, countQualified, countClosed] =
      await Promise.all([
        Enquiry.countDocuments({ status: "New" }),
        Enquiry.countDocuments({ status: "Contacted" }),
        Enquiry.countDocuments({ status: "Qualified" }),
        Enquiry.countDocuments({ status: "Closed" }),
      ]);

    return res.status(200).json({
      success: true,
      leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
      statusCounts: {
        all: total,
        new: countNew,
        contacted: countContacted,
        qualified: countQualified,
        closed: countClosed,
      },
    });
  } catch (error) {
    console.error("getLeads error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

// @desc    Update lead status (New, Contacted, Qualified, Closed)
// @route   PATCH /api/admin/leads/:id/status
// @access  Private (Admin)
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["New", "Contacted", "Qualified", "Closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const lead = await Enquiry.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead inquiry not found",
      });
    }

    lead.status = status;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead,
    });
  } catch (error) {
    console.error("updateLeadStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lead status",
    });
  }
};

// @desc    Delete a lead inquiry
// @route   DELETE /api/admin/leads/:id
// @access  Private (Admin)
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Enquiry.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead inquiry not found",
      });
    }

    await Enquiry.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};
