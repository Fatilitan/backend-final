import { PrismaClient } from "@prisma/client";

const updateHostById = async (
  id,
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const updatedHost = await prisma.host.updateMany({
    where: {
      id,
    },
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

  return updatedHost.count > 0 ? id : null;
};

export default updateHostById;
