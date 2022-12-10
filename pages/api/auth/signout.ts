import type { NextApiRequest, NextApiResponse } from "next";
import { authSessionOption } from "@server/lib";
import { createRouter } from "next-connect";
import { ironMiddleware } from "@server/middlewares";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(ironMiddleware(authSessionOption));

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();

  res.status(200).end();
});

export default router.handler(defaultRouterHandler);
