import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { env } from "../config/env";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("Refresh token is required");

  try {
    jwt.verify(refreshToken, env.REFRESH_SECRET);
  } catch {
    throw new Error("Refresh token expired or invalid");
  }

  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!user) throw new Error("Invalid refresh token");

  const accessToken = generateAccessToken(user);

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
};

export const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("Refresh token is required");

  await prisma.user.updateMany({
    where: { refreshToken },
    data: { refreshToken: null },
  });
};
