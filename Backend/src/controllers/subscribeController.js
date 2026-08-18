const Subscribe = require("../models/Subscribe");

// Subscribe email
const addSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await Subscribe.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscribe = await Subscribe.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscribe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSubscribe };
