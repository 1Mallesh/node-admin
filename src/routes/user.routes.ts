import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Mallesh
 *               lastName:
 *                 type: string
 *                 example: N
 *               email:
 *                 type: string
 *                 example: mallesh@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: mallesh@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: mallesh@test.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post("/forgot-password", userController.forgotPassword);

export default router;