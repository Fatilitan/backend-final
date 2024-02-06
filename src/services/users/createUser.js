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
  return await prisma.user.create({
    data: {
      username,
      password,
      email,
      name,
      phoneNumber,
      profilePicture,
    },
  });
};

export default createUser;
