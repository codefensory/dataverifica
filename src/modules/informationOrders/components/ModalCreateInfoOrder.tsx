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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createInformationOrders } from "../services";
import {
  documentTypeOptions,
  informationsOrderKeys,
  personTypeOptions,
} from "../utils";

type ModalCreateInfoOrderProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCreateInfoOrder: FC<ModalCreateInfoOrderProps> = (props) => {
  const { register, handleSubmit, reset, control, watch } = useForm({
    mode: "onBlur",
  });

  const documentType = watch("documentType")?.value;

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    data.documentType = data.documentType.value;

    data.personType = data.personType.value;

    setIsCreating(true);

    try {
      await createInformationOrders(data);

      await queryClient.invalidateQueries(informationsOrderKeys.MAIN);

      setIsCreating(false);

      props.onClose();

      toast.success("¡Petición creada!");

      reset();
    } catch (error) {
      toast.error("Hubo un error al crear la petición");

      throw error;
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
          <ModalHeader color="text.dark">Agregar petición</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" spacing="6">
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Tipo de persona</FormLabel>
                  <Controller
                    name="personType"
                    control={control}
                    defaultValue={personTypeOptions[0]}
                    render={({ field }) => (
                      <ReactSelect {...field} options={personTypeOptions} />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nombre o Razón social</FormLabel>
                  <Input {...register("name")} required placeholder="Nombres" />
                </FormControl>
              </HStack>
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Controller
                    name="documentType"
                    control={control}
                    defaultValue={documentTypeOptions[0]}
                    render={({ field }) => (
                      <ReactSelect {...field} options={documentTypeOptions} />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Numero de DNI o RUC</FormLabel>
                  <Input
                    {...register("documentNumber")}
                    onInput={(e: any) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                    maxLength={documentType === "DNI" ? 8 : 11}
                    required
                    type="number"
                    placeholder="12345678"
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Observaciones</FormLabel>
                <Textarea
                  isRequired
                  maxLength={200}
                  placeholder="Solo puede escribir 200 caracteres..."
                  {...register("requestInformation")}
                />
              </FormControl>
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
