import { PrismaClient } from "@prisma/client";

const getHosts = async (
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  return prisma.host.findMany({
    where: {
      username,
      password,
      email,
      name,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};

export default getHosts;
