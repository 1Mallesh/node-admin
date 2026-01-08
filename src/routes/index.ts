import { Router } from "express";
import userRoutes from "./user.routes";
import fileRoutes from "./file.routes";

const router = Router();

/* -------------------- Register all modules -------------------- */
router.use("/user", userRoutes);
router.use("/files", fileRoutes); 


export default router;
