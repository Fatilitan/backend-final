import { PrismaClient } from "@prisma/client";

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const deletedAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });

  return deletedAmenity.count > 0 ? id : null;
};

export default deleteAmenity;
