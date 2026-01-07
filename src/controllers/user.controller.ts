import { Request, Response } from "express";
import * as userService from "../services/user.service";
import logger from "../utils/logger.ts";

export const register = async (req: Request, res: Response) => {
  try {
      logger.info(`Register request: ${req.body.email}`);
    const user = await userService.registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err: any) {
     logger.error(`Register failed: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);
    res.status(200).json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
