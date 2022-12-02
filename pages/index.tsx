import { Heading } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { authSessionOption } from "@server/lib";

export default function Home(props: {
  user: { id: number; isAdmin: boolean } | undefined;
}) {
  return <Heading>Welcome client with id: {props.user?.id}</Heading>;
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

    if (user.isAdmin) {
      res.setHeader("location", "/admin");
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
