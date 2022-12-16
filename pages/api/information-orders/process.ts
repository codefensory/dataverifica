import { authSessionOption } from "@server/lib";
import { ironMiddleware } from "@server/middlewares";
import { prisma } from "@server/modules/shared/db";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, NextHandler } from "next-connect";
import multer from "multer";

const router = createRouter<NextApiRequest, NextApiResponse>();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./static/pdf",
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      const extSplit = file.originalname.split(".");

      const ext = extSplit[extSplit.length - 1];

      cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    },
  }),
});

router.use(ironMiddleware(authSessionOption));

router.use(upload.single("pdf") as any);

router.post(async (req, res) => {
  const user = req.session.user;

  if (!user || !user.isAdmin) {
    res.status(401).json({ error: "You do not have access to this resource" });
    return;
  }

  const file = req.file;

  let pdf;

  if (file) {
    pdf = await prisma.pDF.create({
      data: {
        path: file.path,
        name: file.originalname,
      },
    });
  }

  let informationOrderId = req.body?.id;

  if (!informationOrderId) {
    res.status(403).json({ error: "id property is required" });
    return;
  }

  const informationOrderUpdated = await prisma.informationOrder.update({
    data: {
      pdfId: pdf?.id,
      isComplete: true,
    },
    where: {
      id: parseInt(informationOrderId),
    },
  });

  if (!informationOrderUpdated) {
    res.status(403).json({ error: "Information order not found" });
    return;
  }

  res.status(200).json(informationOrderUpdated);
});

export default router.handler(defaultRouterHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
