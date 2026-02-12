import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
