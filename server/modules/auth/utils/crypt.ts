import bcrypt from "bcrypt";

export const verifyHash = (text: string, hash: string) => {
  return bcrypt.compare(text, hash);
};
