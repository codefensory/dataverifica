import { getIronSession, IronSessionOptions } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export function ironMiddleware(ironConfigs: IronSessionOptions) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    const session = await getIronSession(req, res, ironConfigs);
    req.session = session;
    next();
  };
}
