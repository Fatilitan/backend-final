import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (
  id,
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

  const updatedProperty = await prisma.property.updateMany({
    where: {
      id,
    },
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

  return updatedProperty.count > 0 ? id : null;
};

export default updatePropertyById;
