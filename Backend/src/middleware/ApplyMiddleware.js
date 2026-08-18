const validateApply = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Name, email, and phone are required");
  }
  next();
};

module.exports = { validateApply };
