import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { adminsKey, usersKey } from "../utils";
import { createUser } from "../services";
import { sha256 } from "crypto-hash";

type ModalCreateUserProps = {
  onClose: () => void;
  isOpen?: boolean;
  isAdmin?: boolean;
};

export const ModalCreateUser: FC<ModalCreateUserProps> = (props) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsCreating(true);

    data.isAdmin = props.isAdmin;

    data.password = await sha256(data.password);

    try {
      await createUser(data);

      await queryClient.invalidateQueries(props.isAdmin ? adminsKey : usersKey);

      props.onClose();

      toast.success("¡Usuario creado!");

      reset();
    } catch (error) {
      toast.error("Hubo un error al crear al usuario");

      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      reset();

      props.onClose();
    }
  };

  return (
    <Modal
      onClose={handleClose}
      isOpen={!!props.isOpen}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <ModalContent minW="40rem">
          <ModalHeader color="text.dark">Agregar usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" spacing="6">
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Usuario</FormLabel>
                  <Input {...register("username")} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input {...register("password")} required type="password" />
                </FormControl>
              </HStack>
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input {...register("companyName")} />
                </FormControl>
                <FormControl>
                  <FormLabel>RUC / DNI</FormLabel>
                  <Input {...register("ruc")} />
                </FormControl>
              </HStack>
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <Input {...register("phone")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Correo</FormLabel>
                  <Input {...register("email")} />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr="1rem"
              colorScheme="gray"
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancelar
            </Button>
            <Button isLoading={isCreating} type="submit">
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
