const router = require("express").Router();
const controller = require("../controllers/course.controller");
const { authenticate, authorize } = require("../middleware/auth");

// Public
router.get("/", controller.getCourses);
router.get("/:id", controller.getCourse);

// Admin-only
router.post("/", authenticate, authorize("admin"), controller.createCourse);
router.patch("/:id", authenticate, authorize("admin"), controller.updateCourse);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  controller.deleteCourse
);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: List all courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of courses
 */

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Course created
 */

