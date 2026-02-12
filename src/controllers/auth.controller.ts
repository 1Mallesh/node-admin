import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const tokenData = await authService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      data: tokenData,
    });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    await authService.logoutUser(refreshToken);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
