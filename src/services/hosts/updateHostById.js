import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

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
  const updatedHost = prisma.host.updateMany({
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

  if (!updatedHost) {
    throw new NotFoundError("Hosts", id);
  }

  return {
    message: `Host with id ${id} was updated!`,
  };
};

export default updateHostById;
