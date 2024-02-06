import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

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
  const updatedUser = prisma.user.updateMany({
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

  if (!updatedUser) {
    throw new NotFoundError("Users", id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
