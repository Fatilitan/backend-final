import { PrismaClient } from "@prisma/client";

const getProperties = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathroomCount,
  maxGuestCount,
  hostId,
  rating,
  amenityIds
) => {
  const prisma = new PrismaClient();

  return prisma.property.findMany({
    where: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      Host: hostId
        ? {
            connect: { id: hostId },
          }
        : undefined,
      rating,
      Amenities: amenityIds
        ? {
            set: amenityIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });
};

export default getProperties;
