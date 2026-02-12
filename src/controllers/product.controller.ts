import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
