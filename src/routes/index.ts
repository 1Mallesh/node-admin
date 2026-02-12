import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import fileRoutes from "./file.routes";
import productRoutes from "./product.routes";

const router = Router();

/* -------------------- Register all modules -------------------- */
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/files", fileRoutes); 
router.use("/products", productRoutes);


export default router;
