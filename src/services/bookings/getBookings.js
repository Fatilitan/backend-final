import { PrismaClient } from "@prisma/client";

const getBookings = async () => {
  const prisma = new PrismaClient();

  return prisma.booking.findMany();
};

export default getBookings;
