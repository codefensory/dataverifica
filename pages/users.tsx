import { simpleUserAtom } from "@app/modules/shared/atoms";
import { MainLayout } from "@app/modules/shared/layouts";
import { UserManagerView } from "@app/modules/usersManager/views";
import { authSessionOption } from "@server/lib";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { withIronSessionSsr } from "iron-session/next";
import { useAtomValue } from "jotai";

export default function Home() {
  const user = useAtomValue(simpleUserAtom);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <MainLayout>
      <UserManagerView />
    </MainLayout>
  );
}

export const getServerSideProps = withIronSessionSsr<any>(
  async function getServerSideProps({ req, res }) {
    const queryClient = new QueryClient();

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

    queryClient.setQueryData(["user"], { user: user, isLoggedIn: true });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  authSessionOption
);
