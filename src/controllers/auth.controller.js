const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return fail(res, "name, email, password are required", 400);
  const user = await User.create({ name, email, password, role: "student" });
  const token = signToken(user);
  return success(res, { user, token }, 201);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return fail(res, "email and password are required", 400);
  const user = await User.findOne({ email });
  if (!user) return fail(res, "Invalid credentials", 401);
  const ok = await user.comparePassword(password);
  if (!ok) return fail(res, "Invalid credentials", 401);
  const token = signToken(user);
  return success(res, { user, token });
});

exports.me = asyncHandler(async (req, res) => {
  return success(res, { user: req.user });
});
