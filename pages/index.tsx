import { withIronSessionSsr } from "iron-session/next";
import { authSessionOption } from "@server/lib";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { simpleUserAtom } from "@app/modules/shared/atoms";
import {
  InformationOrder,
} from "@app/modules/informationOrders/views";
import { MainLayout } from "@app/modules/shared/layouts";

export default function Home(props: any) {
  const user = useAtomValue(simpleUserAtom);

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <InformationOrder />
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

    queryClient.setQueryData(["user"], { user: user, isLoggedIn: true });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  authSessionOption
);
