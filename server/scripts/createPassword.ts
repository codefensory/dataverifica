import bcrypt from "bcrypt";
import { sha256 } from "crypto-hash";

async function main() {
  const saltRounds = 10;
  const myPlaintextPassword = await sha256("1234");

  console.log(myPlaintextPassword);

  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

  console.log(hash);
}

main();
