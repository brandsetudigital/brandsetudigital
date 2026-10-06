require("./config/cryptoPolyfill");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./src/routes/contactRoutes");
const subscribeRoutes = require("./src/routes/subscribeRoutes");
const applyRoutes = require("./src/routes/ApplyRoute");
const influencerRoutes = require("./src/routes/InfluencerRoute");
const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const mediaRoutes = require("./src/routes/mediaRoutes");
const leadsRoutes = require("./src/routes/leadsRoutes");
const { getSitemap } = require("./src/controllers/sitemapController");
const { errorHandler } = require("./src/middleware/errorMiddleware");

const mongoose = require("mongoose");
const Admin = require("./src/models/Admin");

// Load environment variables (supports running from Backend/ or root)
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();
connectDB();

// Auto-seed default admin on database connection if not already present
const autoSeedAdmin = async () => {
  try {
    const email = (process.env.ADMIN_EMAIL || "admin@brandsetudigital.com").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "BrandSetuAdmin@2026";

    let admin = await Admin.findOne({ email });
    if (!admin) {
      await Admin.create({
        name: "BrandSetu Master Admin",
        email,
        password,
        role: "admin",
      });
      console.log(`✅ [Auto-Seed] Default admin created successfully: ${email}`);
    } else if (process.env.FORCE_SYNC_ADMIN === "true") {
      admin.password = password;
      await admin.save();
      console.log(`🔄 [Auto-Seed] Admin password resynchronized with environment variables: ${email}`);
    } else {
      console.log(`ℹ️ [Auto-Seed] Admin user verified: ${email}`);
    }
  } catch (error) {
    console.error("⚠️ [Auto-Seed] Error initializing admin:", error.message);
  }
};

if (mongoose.connection.readyState === 1) {
  autoSeedAdmin();
} else {
  mongoose.connection.once("open", autoSeedAdmin);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Dynamic XML Sitemap
app.get("/sitemap.xml", getSitemap);
app.get("/api/sitemap.xml", getSitemap);

// Root & Health Check Endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BrandSetu Digital Backend API is live and running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BrandSetu Digital API Base Endpoint",
    version: "1.0.0",
  });
});

app.get(["/health", "/api/health"], (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/contact/enquiry", contactRoutes);
app.use("/api/contact/subscribe", subscribeRoutes);
app.use("/api/careers", applyRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/media", mediaRoutes);
app.use("/api/admin/leads", leadsRoutes);
app.use("/api/blogs", blogRoutes);

// Catch-all 404 handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Error handler (must be last middleware)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
