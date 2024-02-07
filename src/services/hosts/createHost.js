import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  try {
    return await prisma.host.create({
      data: {
        username,
        password,
        email,
        name,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });
  } catch (error) {
    console.error("Error creating host:", error);
    return null;
  }
};

export default createHost;
