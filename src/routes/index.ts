import { Router } from "express";
import userRoutes from "./user.routes";
// import blogRoutes from "./blog.routes";

const router = Router();

/* -------------------- Register all modules -------------------- */
router.use("/users", userRoutes);
// router.use("/blogs", blogRoutes);

export default router;
