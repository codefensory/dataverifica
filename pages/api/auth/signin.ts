import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { authSessionOption } from "@server/lib";
import { SigninApplication } from "@server/modules/auth";

export default withIronSessionApiRoute(signinHandler, authSessionOption);

async function signinHandler(req: NextApiRequest, res: NextApiResponse) {
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

  console.log(userValidForCredentials);

  if (!userValidForCredentials) {
    return res.status(403).json({
      error: "username or passowrd invalid",
    });
  }

  req.session.user = {
    id: userValidForCredentials.id,
  };

  await req.session.save();

  res.status(200).json({ ok: true });
}
