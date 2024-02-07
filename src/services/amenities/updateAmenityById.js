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

  return updatedAmenity.count > 0 ? id : null;
};

export default updateAmenityById;
