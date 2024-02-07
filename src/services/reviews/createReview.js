import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  try {
    return await prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment,
      },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
};

export default createReview;
