const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-set-jwt-secret-in-env";

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(match[1], JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.admin = true;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { requireAdmin, JWT_SECRET };
