const router = require("express").Router();
const controller = require("../controllers/enrollment.controller");
const { authenticate, authorize } = require("../middleware/auth");

// Student
router.post(
  "/",
  authenticate,
  authorize("student", "admin"),
  controller.enroll
);

router.get(
  "/my",
  authenticate,
  authorize("student", "admin"),
  controller.getMyEnrollments
);

router.delete(
  "/:id",
  authenticate,
  authorize("student", "admin"),
  controller.cancelMyEnrollment
);

// Admin
router.get(
  "/admin/list",
  authenticate,
  authorize("admin"),
  controller.adminList
);

router.patch(
  "/admin/:id/paid",
  authenticate,
  authorize("admin"),
  controller.setPaid
);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Student course enrollments
 */

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment created
 */

/**
 * @swagger
 * /enrollments/my:
 *   get:
 *     summary: Get my enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my enrollments
 */

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Cancel my enrollment
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment canceled
 */

/**
 * @swagger
 * /enrollments/admin/list:
 *   get:
 *     summary: List all enrollments (Admin only)
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: paid
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: studentName
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of enrollments
 */

/**
 * @swagger
 * /enrollments/admin/{id}/paid:
 *   patch:
 *     summary: Mark enrollment as paid/unpaid
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paid:
 *                 type: boolean
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Enrollment updated
 */
