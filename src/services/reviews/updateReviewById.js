import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const updatedReview = prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  if (!updatedReview) {
    throw new NotFoundError("Reviews", id);
  }

  return {
    message: `review with id ${id} was updated!`,
  };
};

export default updateReviewById;
