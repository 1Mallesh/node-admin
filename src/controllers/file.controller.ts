import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/custom-error";
import * as fileService from "../services/file.service";
import fs from "fs";
import path from "path";

/* -------------------- Upload File -------------------- */
export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new CustomError(400, "No file uploaded");
    }

    const fileData = {
      filename: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    const file = await fileService.createFile(fileData);

    res.status(201).json({ success: true, data: file });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Get All Files -------------------- */
export const getFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = await fileService.getFiles();
    res.json({ success: true, data: files });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Get File by ID -------------------- */
export const getFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = await fileService.getFileById(req.params.id); // ✅ string, not Number
    if (!file) throw new CustomError(404, "File not found");
    res.json({ success: true, data: file });
  } catch (err) {
    next(err);
  }
};

/* -------------------- Delete File -------------------- */
export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = await fileService.getFileById(req.params.id); // ✅ string
    if (!file) throw new CustomError(404, "File not found");

    // Delete physical file
    fs.unlinkSync(path.resolve(file.path));

    // Delete from DB
    await fileService.deleteFileById(file.id); // ✅ id is string

    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};
