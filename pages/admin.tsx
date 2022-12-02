import { Heading } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { authSessionOption } from "@server/lib";

export default function Admin() {
  return <Heading>Welcome admin</Heading>;
}

export const getServerSideProps = withIronSessionSsr<any>(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    if (user === undefined) {
      res.setHeader("location", "/auth/signin");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    if (!user.isAdmin) {
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user: req.session.user },
    };
  },
  authSessionOption
);
