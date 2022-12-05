import { prisma } from "../modules/shared/db";

async function main() {
  const userUpdated = await prisma.user.update({
    data: {
      isAdmin: true,
    },
    where: {
      id: 2,
    },
  });

  console.log(userUpdated);
}

main();
