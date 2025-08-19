const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paid: { type: Boolean, default: false },
    amount: { type: Number, default: 0 },
    paymentDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
