const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({
      error: "Admin login is not configured. Set ADMIN_PASSWORD on the server.",
    });
  }

  const password = req.body && req.body.password != null ? String(req.body.password) : "";
  if (password !== adminPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

module.exports = router;
