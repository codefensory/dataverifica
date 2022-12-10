import { authSessionOption } from "@server/lib";
import { ironMiddleware } from "@server/middlewares";
import { prisma } from "@server/modules/shared/db";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(ironMiddleware(authSessionOption));

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!user || !user.isAdmin) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  const { id: idString } = req.query;

  if (typeof idString !== "string") {
    return res.status(403).json({
      error: "There was an error with obtaining the id",
    });
  }

  try {
    const id = parseInt(idString);

    const order = await prisma.informationOrder.update({
      data: req.body,
      where: {
        id,
      },
    });

    res.status(200).json(order);
  } catch (error: any) {
    throw res.status(500).json({ error: error.message });
  }
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  const { id: idString } = req.query;

  if (typeof idString !== "string") {
    return res.status(403).json({
      error: "There was an error with obtaining the id",
    });
  }

  try {
    const id = parseInt(idString);

    let userId;

    if (!user.isAdmin) {
      userId = user.id;
    }

    const order = await prisma.informationOrder.findFirst({
      where: {
        id,
        userId: userId,
      },
    });

    return res.status(200).json(order);
  } catch (error: any) {
    throw res.status(500).json({ error: error.message });
  }
});

export default router.handler(defaultRouterHandler);
