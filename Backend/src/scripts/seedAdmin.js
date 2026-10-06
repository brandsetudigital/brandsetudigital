require("../../config/cryptoPolyfill");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/brandsetu";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for admin seeding...");

    const email = (process.env.ADMIN_EMAIL || "admin@brandsetudigital.com").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "BrandSetuAdmin@2026";
    const name = "BrandSetu Master Admin";

    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log(`Admin user with email ${email} already exists.`);
      // Update password to ensure it matches .env
      admin.password = password;
      await admin.save();
      console.log("Admin password synchronized with environment variables.");
    } else {
      admin = await Admin.create({
        name,
        email,
        password,
        role: "admin",
      });
      console.log(`✅ Default admin created successfully: ${email}`);
    }

    console.log("Admin seeding complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
