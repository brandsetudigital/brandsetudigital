const express = require("express");
const router = express.Router();
const { addSubscribe } = require("../controllers/subscribeController");

router.post("/", addSubscribe);

module.exports = router;
