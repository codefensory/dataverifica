import type { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    file?: {
      originalname: string;
      path: string;
    };
    originalName: string;
  }
}
