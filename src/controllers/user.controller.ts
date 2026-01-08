import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import logger from "../utils/logger.ts";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Register request: ${req.body.email}`);
    const user = await userService.registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
