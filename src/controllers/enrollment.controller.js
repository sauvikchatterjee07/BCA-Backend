const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

// Create enrollment for current user
exports.enroll = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) return fail(res, "courseId is required", 400);
  if (!mongoose.Types.ObjectId.isValid(courseId))
    return fail(res, "Invalid courseId", 400);

  const course = await Course.findById(courseId);
  if (!course) return fail(res, "Course not found", 404);

  try {
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: course._id,
      paid: false,
      amount: course.price || 0,
    });
    return success(res, { enrollment }, 201);
  } catch (err) {
    if (err && err.code === 11000) {
      return fail(res, "Already enrolled in this course", 409);
    }
    throw err;
  }
});

// List my enrollments
exports.getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id })
    .populate("course", "title price")
    .sort({ createdAt: -1 });
  return success(res, { enrollments });
});

// Cancel my enrollment
exports.cancelMyEnrollment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return fail(res, "Invalid enrollment id", 400);

  const enrollment = await Enrollment.findOne({
    _id: id,
    student: req.user._id,
  });
  if (!enrollment) return fail(res, "Enrollment not found", 404);

  await enrollment.deleteOne();
  return success(res, { message: "Enrollment canceled" });
});

// Admin: list enrollments
exports.adminList = asyncHandler(async (req, res) => {
  const { paid, courseId, studentName, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (paid === "true") filter.paid = true;
  if (paid === "false") filter.paid = false;
  if (courseId && mongoose.Types.ObjectId.isValid(courseId)) {
    filter.course = courseId;
  }

  let query = Enrollment.find(filter)
    .populate("student", "name email")
    .populate("course", "title price")
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  let enrollments = await query;

  if (studentName) {
    enrollments = enrollments.filter((e) =>
      e.student?.name?.toLowerCase().includes(studentName.toLowerCase())
    );
  }

  return success(res, {
    enrollments,
    page: Number(page),
    limit: Number(limit),
  });
});

// Admin: mark paid/unpaid
exports.setPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paid, amount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return fail(res, "Invalid enrollment id", 400);

  const enrollment = await Enrollment.findById(id)
    .populate("student", "name email")
    .populate("course", "title");

  if (!enrollment) return fail(res, "Enrollment not found", 404);

  enrollment.paid = Boolean(paid);
  if (amount !== undefined) enrollment.amount = amount;
  enrollment.paymentDate = enrollment.paid ? new Date() : undefined;

  await enrollment.save();
  return success(res, { enrollment });
});
