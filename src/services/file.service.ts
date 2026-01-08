// src/services/file.service.ts
import prisma from "../config/db";

export const createFile = async (fileData: {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}) => {
  return await prisma.file.create({ data: fileData });
};

export const getFiles = async () => {
  return await prisma.file.findMany();
};

export const getFileById = async (id: string) => {
  return await prisma.file.findUnique({ where: { id } });
};

export const deleteFileById = async (id: string) => {
  return await prisma.file.delete({ where: { id } });
};
