import { authSessionOption } from "@server/lib";
import { ironMiddleware } from "@server/middlewares";
import { prisma } from "@server/modules/shared/db";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { saltRounds } from "@server/modules/shared/utils/constants";

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
    where: { isAdmin: false },
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
    where: { isAdmin: false },
  });

  res
    .status(200)
    .json({ data: usersResponse, pages: Math.ceil(totalPages / itemsByPage) });
});

router.put(async (req, res) => {
  const user = req.session.user;

  if (!user || !user.isAdmin) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);

    const order = await prisma.user.create({ data: req.body });

    return res.status(200).json({ ...order });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post(async (req, res) => {
  const user = req.session.user;

  if (!user || !user.isAdmin) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  try {
    const id = req.body.id;

    delete req.body.id;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    const order = await prisma.user.update({
      data: req.body,
      where: {
        id,
      },
    });

    return res.status(200).json(order);
  } catch (error: any) {
    throw res.status(500).json({ error: error.message });
  }
});

router.delete(async (req, res) => {
  const user = req.session.user;

  if (!user || !user.isAdmin) {
    return res.status(401).json({
      error: "You do not have access to this resource",
    });
  }

  let id;

  const { id: idString } = req.query;

  if (typeof idString === "string") {
    id = parseInt(idString);
  }

  if (!id) {
    return res.status(401).json({
      error: "ID not found",
    });
  }

  try {
    const order = await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(order);
  } catch (error: any) {
    throw res.status(500).json({ error: error.message });
  }
});

export default router.handler(defaultRouterHandler);
