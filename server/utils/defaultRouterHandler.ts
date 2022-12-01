import { NextApiRequest, NextApiResponse } from "next";

export const defaultRouterHandler = {
  onError: (err: any, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
};
