const Blog = require("../models/Blog");
const Enquiry = require("../models/Enquiry");
const Apply = require("../models/Apply");
const InfluencerCollab = require("../models/InfluencerCollab");

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalLeads,
      totalApplications,
      totalInfluencers,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Enquiry.countDocuments(),
      Apply.countDocuments(),
      InfluencerCollab.countDocuments(),
    ]);

    const recentBlogs = await Blog.find()
      .select("title slug category status publishedAt createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentLeads = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentApplications = await Apply.find()
      .select("name email phone jobTitle location status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInfluencers = await InfluencerCollab.find()
      .select("name email phone platform socialHandle followers niche status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalLeads,
        totalApplications,
        totalInfluencers,
      },
      recentBlogs,
      recentLeads,
      recentApplications,
      recentInfluencers,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};
