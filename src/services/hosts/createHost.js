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
};

export default createHost;
