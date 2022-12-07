import { authSessionOption } from "@server/lib";
import { prisma } from "@server/modules/shared/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { ironMiddleware } from "@server/middlewares";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(ironMiddleware(authSessionOption));

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  try {
    let orders;

    let userId: number | undefined;

    if (user.isAdmin) {
      const { userId: userIdString } = req.query;

      if (typeof userIdString === "string") {
        userId = parseInt(userIdString);
      }
    } else {
      userId = user.id;
    }

    orders = await prisma.informationOrder.findMany({
      where: { userId: userId },
      orderBy: { id: "desc" },
    });

    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  const body = req.body;

  if (!user.isAdmin) {
    body.userId = user.id;
  }

  try {
    const order = await prisma.informationOrder.create({ data: req.body });

    return res.status(200).json({ ...order });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router.handler(defaultRouterHandler);
