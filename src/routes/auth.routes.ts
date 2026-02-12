import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { verifyToken, permit } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

/* Role based example */
router.get(
  "/admin",
  verifyToken,
  permit("ADMIN"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

export default router;