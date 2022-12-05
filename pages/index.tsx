import { Box, Heading, Stack } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { authSessionOption } from "@server/lib";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { simpleUserAtom } from "@app/modules/shared/atoms";
import { InformationOrderClient } from "@app/modules/informationOrders/views";

export default function Home(props: any) {
  const user = useAtomValue(simpleUserAtom);

  if (!user) {
    return null
  }

  if (user?.isAdmin) {
    return <Heading>Welcome Admin</Heading>;
  }

  return (
    <Stack w="100vw" h="100vh" bg="primary.200">
      <Box
        alignItems="start-flex"
        m="auto"
        bg="white"
        borderRadius="12"
        p="6"
        shadow="lg"
      >
        <InformationOrderClient />
      </Box>
    </Stack>
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
