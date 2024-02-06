import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  return await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default createReview;
