import { PrismaClient } from "@prisma/client";

const createProperty = async (
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
  return await prisma.property.create({
    data: {
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

export default createProperty;
