// server/routes/resumeTemplateRoutes/resumeTemplate1Route.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Template 1 route working" });
});

module.exports = router;
