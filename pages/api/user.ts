import { authSessionOption } from "@server/lib";
import { ironMiddleware } from "@server/middlewares";
import { prisma } from "@server/modules/shared/db";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(ironMiddleware(authSessionOption));

router.get(async (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.status(200).json({
      user: null,
      isLoggedIn: false,
    });
    return;
  }

  const userResponse = await prisma.user.findFirst({
    where: { id: user.id, deleteAt: null },
  });

  if (!userResponse) {
    res.status(400).json({
      error: "User not found",
    });
    return;
  }

  res.status(200).json({
    user: {
      id: userResponse.id,
      isAdmin: userResponse.isAdmin,
    },
    isLoggedIn: true,
  });
});

export default router.handler(defaultRouterHandler);
