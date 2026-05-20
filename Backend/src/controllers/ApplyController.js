const Apply = require("../models/Apply");

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
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    // Save resume filename
    const resume = req.file ? req.file.filename : "";

    const application = await Apply.create({
      name,
      email,
      phone,
      location,
      experience,
      profile,
      about,
      jobTitle,
      resume,
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Apply.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitApplication, getApplications };
