import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import logger from "../utils/logger.ts";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

/**
 * REGISTER USER
 */
export const registerUser = async (data: any) => {
  try {
    const { firstName, lastName, email, password } = data;

    logger.info(`Register attempt for email: ${email}`);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`User already exists: ${email}`);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    logger.info(`User registered successfully: ${email}`);

    return user;
  } catch (error: any) {
    logger.error(`Register DB Error: ${error.message}`);
    throw error;
  }
};

/**
 * LOGIN USER
 */
export const loginUser = async (email: string, password: string) => {
  try {
    logger.info(`Login attempt for email: ${email}`);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Invalid credentials for: ${email}`);
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`Login success for email: ${email}`);

    return { user, token };
  } catch (error: any) {
    logger.error(`Login Error: ${error.message}`);
    throw error;
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (email: string) => {
  try {
    logger.info(`Forgot password request for email: ${email}`);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn(`Forgot password - user not found: ${email}`);
      throw new Error("User not found");
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Your temporary password is: ${tempPassword}`,
    });

    logger.info(`Temporary password sent to email: ${email}`);

    return { message: "Temporary password sent to your email" };
  } catch (error: any) {
    logger.error(`Forgot Password Error: ${error.message}`);
    throw error;
  }
};
