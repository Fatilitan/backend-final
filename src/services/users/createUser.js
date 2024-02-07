import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        name,
        phoneNumber,
        profilePicture,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export default createUser;
