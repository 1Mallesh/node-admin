import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"];
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"];

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    env.ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    env.REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
};
