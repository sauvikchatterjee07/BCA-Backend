const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    req.user = user; // attach full user doc
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: insufficient role" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
