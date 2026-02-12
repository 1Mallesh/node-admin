import dotenv from "dotenv";
import "dotenv/config";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",
  DATABASE_URL: process.env.DATABASE_URL!,
  ACCESS_SECRET: process.env.ACCESS_SECRET!,
  REFRESH_SECRET: process.env.REFRESH_SECRET!,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "1m",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  JWT_SECRET: process.env.JWT_SECRET!,
  EMAIL_USER: process.env.EMAIL_USER!,
  EMAIL_PASS: process.env.EMAIL_PASS!,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID!,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET!,
};
