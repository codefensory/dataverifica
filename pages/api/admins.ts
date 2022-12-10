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

  if (!user || !user.isAdmin) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  let page = 0;

  const { page: pageString } = req.query;

  if (typeof pageString === "string") {
    page = parseInt(pageString);
  }

  const itemsByPage = 10;

  const usersResponse = await prisma.user.findMany({
    where: { isAdmin: true },
    select: {
      id: true,
      companyName: true,
      username: true,
      ruc: true,
      email: true,
      phone: true,
    },
    skip: page * itemsByPage,
    take: itemsByPage,
  });

  const totalPages = await prisma.user.count({
    where: { isAdmin: true },
  });

  res
    .status(200)
    .json({ data: usersResponse, pages: Math.ceil(totalPages / itemsByPage) });
});

export default router.handler(defaultRouterHandler);
