const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, isActive } = req.body;
  if (!title) return fail(res, "title is required", 400);
  const course = await Course.create({ title, description, price, isActive });
  return success(res, { course }, 201);
});

exports.getCourses = asyncHandler(async (req, res) => {
  const { active } = req.query;
  const filter = {};
  if (active === "true") filter.isActive = true;
  if (active === "false") filter.isActive = false;
  const courses = await Course.find(filter).sort({ createdAt: -1 });
  return success(res, { courses });
});

exports.getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return fail(res, "Course not found", 404);
  return success(res, { course });
});

exports.updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) return fail(res, "Course not found", 404);
  return success(res, { course });
});

exports.deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return fail(res, "Course not found", 404);
  return success(res, { message: "Course deleted" });
});
