import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();

  const updatedAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!updatedAmenity) {
    throw new NotFoundError("Amenities", id);
  }

  return {
    message: `Amenity with id ${id} was updated!`,
  };
};

export default updateAmenityById;
