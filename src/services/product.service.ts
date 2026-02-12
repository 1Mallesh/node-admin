import prisma from "../config/db";

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
