const express = require("express");
const router = express.Router();

const scanCode = require("../scanner/securityScanner");

router.post("/", (req, res) => {
  const { code } = req.body;

  const issues = scanCode(code);

  let score = 100;

  issues.forEach((issue) => {
    if (issue.severity === "Critical") score -= 30;
    if (issue.severity === "High") score -= 20;
    if (issue.severity === "Medium") score -= 10;
  });

  if (score < 0) score = 0;

  res.json({
    score,
    issues
  });
});

module.exports = router;