import { FC, PropsWithChildren } from "react";
import { Stack, Box, Divider } from "@chakra-ui/react";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  return (
    <Stack w="100vw" h="100vh" bg="primary.200" position="relative" spacing="0">
      <Box w="full" h="3.5rem" bg="white" px="6"></Box>
      <Divider />
      <Box flex="1" height="0" px="6" py="4">
        <Box
          alignItems="start-flex"
          bg="white"
          borderRadius="12"
          p="6"
          shadow="lg"
          w="full"
          h="full"
          overflow="hidden"
        >
          {props.children}
        </Box>
      </Box>
    </Stack>
  );
};
