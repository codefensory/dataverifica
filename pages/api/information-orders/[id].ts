import { authSessionOption } from "@server/lib";
import { prisma } from "@server/modules/shared/db";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  informationOrderHandler,
  authSessionOption
);

async function informationOrderHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return update(req, res);
    case "GET":
      return get(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function update(req: NextApiRequest, res: NextApiResponse) {
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
}

async function get(req: NextApiRequest, res: NextApiResponse) {
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
}
