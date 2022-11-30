import { authSessionOption } from "@server/lib";
import { prisma } from "@server/modules/shared/db";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  informationOrdersHandler,
  authSessionOption
);

async function informationOrdersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return create(req, res);
    case "GET":
      return get(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
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
    throw res.status(500).json({ error: error.message });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
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
    });

    return res.status(200).json(orders);
  } catch (error: any) {
    throw res.status(500).json({ error: error.message });
  }
}
