import {
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { sha256 } from "crypto-hash";
import { FC, useState } from "react";
import { toast } from "react-toastify";

export const SigninPage: FC = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const passwordHash = await sha256(password);

      const response = await axios.post("/api/auth/signin", {
        username,
        password: passwordHash,
      });

      toast.success("Login correcto");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.error ?? "Hubo un error al iniciar sesion"
      );
    }

    setIsLoading(false);
  };

  return (
    <Stack w="100vw" h="100vh" bg="primary.200">
      <Box
        alignItems="start-flex"
        m="auto"
        w="30rem"
        bg="white"
        borderRadius="8"
        p="6"
        shadow="lg"
      >
        <VStack alignItems="start-flex" spacing="1">
          <Heading as="h4" size="md" color="text.dark">
            Bienvenido
          </Heading>
          <Text color="gray.500">Ingresa tus credenciales para acceder</Text>
        </VStack>
        <Divider my="4" />
        <VStack spacing="4">
          <FormControl>
            <Input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            disabled={!!!username || !!!password}
            isLoading={isLoading}
            w="full"
            onClick={onSubmit}
          >
            Iniciar sesión
          </Button>
        </VStack>
      </Box>
    </Stack>
  );
};
