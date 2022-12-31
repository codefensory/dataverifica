import { User } from "@prisma/client";
import { prisma } from "../shared/db";
import { verifyHash } from "./utils";

export type SigninApplicationDTO = {
  username: string;
  passwordHash: string;
};

export type SigninApplicationReturn = {
  user: User | null;
  isValid: boolean;
};

export class SigninApplication {
  async execute(dto: SigninApplicationDTO): Promise<User | null | undefined> {
    const user = await prisma.user.findFirst({
      where: { username: dto.username, deleteAt: null },
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
