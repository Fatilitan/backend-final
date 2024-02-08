import { PrismaClient } from "@prisma/client";

const getUsers = async (
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      username,
      password,
      email,
      name,
      phoneNumber,
      profilePicture,
    },
  });
};

export default getUsers;
