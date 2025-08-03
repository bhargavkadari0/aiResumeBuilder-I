const express = require("express");
const router = express.Router();
const { enhanceSection } = require("../controllers/geminiController");

router.post("/", enhanceSection); // POST /api/enhance

module.exports = router;
