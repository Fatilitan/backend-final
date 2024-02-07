import { PrismaClient } from "@prisma/client";

const updateUserById = async (
  id,
  username,
  password,
  email,
  name,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedUser = await prisma.user.updateMany({
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
    },
  });

  return updatedUser.count > 0 ? id : null;
};

export default updateUserById;
