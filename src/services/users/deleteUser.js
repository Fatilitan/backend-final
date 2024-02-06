import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();
  const deleteUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });

  return deleteUser.count > 0 ? id : null;
};

export default deleteUser;
