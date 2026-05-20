const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./src/routes/contactRoutes");
const subscribeRoutes = require("./src/routes/subscribeRoutes");
const applyRoutes = require("./src/routes/ApplyRoute");
const { errorHandler } = require("./src/middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Routes
app.use("/api/contact/enquiry", contactRoutes);
app.use("/api/contact/subscribe", subscribeRoutes);
app.use("/api/careers", applyRoutes);

// Error handler (must be last middleware)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
