import { Admin } from "@prisma/client";
import { prisma } from "../shared/db";
import { verifyHash } from "./utils";

export type SigninApplicationDTO = {
  username: string;
  passwordHash: string;
};

export type SigninApplicationReturn = {
  user: Admin | null;
  isValid: boolean;
};

export class SigninApplication {
  async execute(dto: SigninApplicationDTO): Promise<Admin | null | undefined> {
    const user = await prisma.admin.findFirst({
      where: { username: dto.username },
    });

    if (!user) {
      return;
    }

    const validCredentials = await verifyHash(dto.passwordHash, user.password);

    if (!validCredentials) {
      return;
    }

    return user;
  }
}
