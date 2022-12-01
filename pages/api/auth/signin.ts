import type { NextApiRequest, NextApiResponse } from "next";
import { authSessionOption } from "@server/lib";
import { SigninApplication } from "@server/modules/auth";
import { createRouter } from "next-connect";
import { ironMiddleware } from "@server/middlewares";
import { defaultRouterHandler } from "@server/utils/defaultRouterHandler";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(ironMiddleware(authSessionOption));

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password: passwordHash } = req.body;

  if (!username || !passwordHash) {
    return res.status(401).json({
      error: "username and password properties are required",
    });
  }

  const signinValidationApplication = new SigninApplication();

  const userValidForCredentials = await signinValidationApplication.execute({
    username,
    passwordHash,
  });

  if (!userValidForCredentials) {
    return res.status(403).json({
      error: "username or passowrd invalid",
    });
  }

  req.session.user = {
    id: userValidForCredentials.id,
    isAdmin: userValidForCredentials.isAdmin,
  };

  await req.session.save();

  res.status(200).end();
});

export default router.handler(defaultRouterHandler);
