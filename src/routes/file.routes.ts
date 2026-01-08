import { Router } from "express";
import multer from "multer";
import * as fileController from "../controllers/file.controller";

const router = Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for allowed formats
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    "application/pdf",
    "application/zip",
    "text/csv",
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/", fileController.getFiles);
router.get("/:id", fileController.getFile);
router.delete("/:id", fileController.deleteFile);

export default router;

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file (PDF, ZIP, CSV, images)
 *     tags:
 *       - Files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file type
 */

