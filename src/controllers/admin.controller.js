const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");

exports.overview = asyncHandler(async (req, res) => {
  const [students, courses, enrollments, paidEnrollments] = await Promise.all([
    User.countDocuments({ role: "student" }),
    Course.countDocuments({}),
    Enrollment.countDocuments({}),
    Enrollment.countDocuments({ paid: true }),
  ]);

  return success(res, {
    metrics: {
      students,
      courses,
      enrollments,
      paidEnrollments,
    },
  });
});

exports.listStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, q } = req.query;
  const filter = { role: "student" };
  if (q) filter.name = new RegExp(q, "i");
  const students = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return success(res, { students, page: Number(page), limit: Number(limit) });
});
