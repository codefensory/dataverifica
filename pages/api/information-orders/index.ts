import { authSessionOption } from "@server/lib";
import { prisma } from "@server/modules/shared/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { ironMiddleware } from "@server/middlewares";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";
import multer from "multer";

const router = createRouter<NextApiRequest, NextApiResponse>();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./static/bulk",
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      const extSplit = file.originalname.split(".");

      const ext = extSplit[extSplit.length - 1];

      cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    },
  }),
});

router.use(ironMiddleware(authSessionOption));

router.use(upload.single("bulkFile") as any);

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

    let page = 0;

    const { userId: userIdString, page: pageString } = req.query;

    if (user.isAdmin) {
      if (typeof userIdString === "string") {
        userId = parseInt(userIdString);
      }
    } else {
      userId = user.id;
    }

    if (typeof pageString === "string") {
      page = parseInt(pageString);
    }

    const itemsByPage = 10;

    orders = await prisma.informationOrder.findMany({
      where: { userId: userId },
      include: {
        User: {
          select: {
            ruc: true,
            companyName: true,
            phone: true,
            email: true,
          },
        },
        PDF: true,
      },
      skip: itemsByPage * page,
      take: itemsByPage,
      orderBy: { id: "desc" },
    });

    const totalItems = await prisma.informationOrder.count({
      where: { userId: userId },
    });

    return res
      .status(200)
      .json({ orders: orders, pages: Math.ceil(totalItems / itemsByPage) });
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

  const file = req.file;

  let bulkFile;

  if (file) {
    bulkFile = await prisma.bulkFile.create({
      data: {
        path: file.path,
        name: file.originalname,
      },
    });
  }

  try {
    const order = await prisma.informationOrder.create({
      data: {
        ...req.body,
        bulkFileId: bulkFile?.id,
      },
    });

    return res.status(200).json({ ...order });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router.handler(defaultRouterHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
