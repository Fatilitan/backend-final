import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();

  return prisma.property.findMany();
};

export default getProperties;
