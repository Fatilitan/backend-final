import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { amenities } = amenityData;
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { users } = userData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathroomCount: property.bathroomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
        Host: {
          connect: { id: property.hostId },
        },
        Amenities: {
          connect: property.amenityIds.map((id) => ({ id })),
        },
      },
    });
  }
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        rating: review.rating,
        comment: review.comment,
        Property: {
          connect: { id: review.propertyId },
        },
        User: {
          connect: { id: review.userId },
        },
      },
    });
  }
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        User: {
          connect: { id: booking.userId },
        },
        Property: {
          connect: { id: booking.propertyId },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
