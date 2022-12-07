import { axios } from "@app/modules/shared";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
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
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createInformationOrders } from "../services";
import { informationsOrderKeys } from "../utils";

type ModalCreateInfoOrderProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCreateInfoOrder: FC<ModalCreateInfoOrderProps> = (props) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsCreating(true);

    try {
      const value = await createInformationOrders(data);

      await queryClient.invalidateQueries(informationsOrderKeys.MAIN);

      setIsCreating(false);

      console.log(value);

      props.onClose();

      toast.success("Petición creada!!");
    } catch (error) {
      toast.error("Hubo un error al crear la petición");
      throw error;
    }
  };

  const handleClose = () => {
    reset();
    props.onClose();
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
          <ModalHeader color="text.dark">Agregar petición</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" spacing="6">
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Tipo de persona</FormLabel>
                  <Select defaultValue="Natural" {...register("personType")}>
                    <option value="Natural">Natural</option>
                    <option value="Juridical">Juridica</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    {...register("name")}
                    required
                    placeholder="First Name Last Name"
                  />
                </FormControl>
              </HStack>
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select defaultValue="DNI" {...register("documentType")}>
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Numero de documento</FormLabel>
                  <Input
                    {...register("documentNumber")}
                    required
                    type="number"
                    placeholder="12345678"
                  />
                </FormControl>

                <Input hidden {...register("requestInformation")} />
              </HStack>
              <Text w="full" fontSize="lg" color="text.dark">
                Información a solicitar
              </Text>
              <CheckboxGroup>
                <VStack w="full" divider={<Divider />}>
                  <HStack w="full" spacing="8">
                    <HStack w="full" justifyContent="space-between">
                      <Text>Documento</Text>
                      <Checkbox />
                    </HStack>
                    <HStack w="full" justifyContent="space-between">
                      <Text>Seniat</Text>
                      <Checkbox />
                    </HStack>
                  </HStack>
                  <HStack w="full" spacing="8">
                    <HStack w="full" justifyContent="space-between">
                      <Text>Trabajos</Text>
                      <Checkbox />
                    </HStack>
                    <HStack w="full" justifyContent="space-between">
                      <Text>Impuestos</Text>
                      <Checkbox />
                    </HStack>
                  </HStack>
                </VStack>
              </CheckboxGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr="1rem" colorScheme="gray" onClick={handleClose}>
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
