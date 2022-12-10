import { FC, useEffect, useState } from "react";
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
import { updateUser } from "../services";
import { sha256 } from "crypto-hash";
import { UserResponseData } from "../domain";

type ModalUpdateUserProps = {
  user?: UserResponseData;
  onClose: () => void;
  isOpen?: boolean;
  isAdmin?: boolean;
};

export const ModalUpdateUser: FC<ModalUpdateUserProps> = (props) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (props.user) {
      const user = props.user as any;

      Object.keys(user).forEach((key) => {
        setValue(key, user?.[key]);
      });
    }
  }, [props.user]);

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsCreating(true);

    data.id = props.user?.id;

    if (data.password) {
      data.password = await sha256(data.password);
    }

    try {
      await updateUser(data);

      await queryClient.invalidateQueries(props.isAdmin ? adminsKey : usersKey);

      setIsCreating(false);

      props.onClose();

      toast.success("Usuario actualizado!!");
    } catch (error) {
      toast.error("Hubo un error al actualizar al usuario");

      throw error;
    }
  };

  const handleClose = () => {
    if (!isCreating) {
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
          <ModalHeader color="text.dark">Actualizar usuario</ModalHeader>
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
                  <Input {...register("password")} type="password" />
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
                  <FormLabel>Telefono</FormLabel>
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
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
