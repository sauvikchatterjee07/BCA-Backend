const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");
const adminController = require("../controllers/admin.controller");

router.use(authenticate, authorize("admin"));

router.get("/overview", adminController.overview);
router.get("/students", adminController.listStudents);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin dashboard
 */

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get admin overview stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview metrics
 */

/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: List all students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
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
 *         description: Paginated list of students
 */
