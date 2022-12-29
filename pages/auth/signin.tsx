import { SigninPage } from "@app/modules/auth/views";
import { Head } from "next/document";

export default function Signin() {
  return (
    <>
      <Head>
        <title>Dataverifica - Login</title>
      </Head>
      <SigninPage />
    </>
  );
}
