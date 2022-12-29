import { FC, PropsWithChildren } from "react";
import {
  Stack,
  Box,
  Divider,
  HStack,
  Heading,
  Button,
  Text,
  SystemStyleObject,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { userIsAdminAtom } from "../atoms";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { axios } from "../axios";
import Image from "next/image";

const headerStyle = (isActive: boolean): SystemStyleObject => ({
  position: "relative",
  h: "full",
  justifyContent: "center",
  px: "1rem",
  color: "text.dark",
  cursor: "pointer",
  userSelect: "none",
  _hover: {
    _before: {
      transform: "translateY(0px)",
    },
  },
  _before: {
    content: "' '",
    position: "absolute",
    transform: `translateY(${isActive ? "0" : "-4px"})`,
    transition: "transform 400ms",
    top: 0,
    left: 0,
    borderRadius: "8",
    w: "full",
    h: "4px",
    bg: "primary.500",
  },
});

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const isAdmin = useAtomValue(userIsAdminAtom);

  const router = useRouter();

  const handleSignout = async () => {
    try {
      await axios.post("/api/auth/signout");

      window.location.pathname = "/auth/signin";
    } catch (error) {
      toast.error("Error al cerrar sesión");

      throw error;
    }
  };

  return (
    <Stack w="100vw" h="100vh" bg="primary.200" position="relative" spacing="0">
      <HStack w="full" h="3.5rem" bg="white" px="6" spacing="12">
        <Box>
          <Image src="/logo.jpg" alt="logo" height={64} width={64} />
        </Box>
        <HStack flex="1" h="full">
          {isAdmin && (
            <>
              <Stack
                sx={headerStyle(router.pathname === "/")}
                onClick={() => {
                  router.push("/");
                }}
              >
                <Text>Peticiones</Text>
              </Stack>
              <Stack
                sx={headerStyle(router.pathname === "/users")}
                onClick={() => {
                  router.push("/users");
                }}
              >
                <Text>Usuarios</Text>
              </Stack>
              <Stack
                sx={headerStyle(router.pathname === "/admins")}
                onClick={() => {
                  router.push("/admins");
                }}
              >
                <Text>Administradores</Text>
              </Stack>
            </>
          )}
        </HStack>
        <Box>
          <Button
            colorScheme="red"
            size="sm"
            rounded="full"
            onClick={handleSignout}
          >
            Cerrar sesión
          </Button>
        </Box>
      </HStack>
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
