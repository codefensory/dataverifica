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
import ReactSelect from "react-select";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createInformationOrders } from "../services";
import {
  documentTypeOptions,
  informationOrdersOptions,
  informationsOrderKeys,
  personTypeOptions,
} from "../utils";

type ModalCreateInfoOrderProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCreateInfoOrder: FC<ModalCreateInfoOrderProps> = (props) => {
  const { register, handleSubmit, reset, control } = useForm({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    data.documentType = data.documentType.value;

    data.personType = data.personType.value;

    data.requestInformation = data.requestInformation
      .map((values: any) => values.value)
      .join(";");

    setIsCreating(true);

    try {
      await createInformationOrders(data);

      await queryClient.invalidateQueries(informationsOrderKeys.MAIN);

      setIsCreating(false);

      props.onClose();

      toast.success("Petición creada!!");

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
                  <FormLabel>Numero de documento</FormLabel>
                  <Input
                    {...register("documentNumber")}
                    required
                    type="number"
                    placeholder="12345678"
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Información a solicitar</FormLabel>
                <Controller
                  name="requestInformation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      isMulti
                      options={informationOrdersOptions}
                    />
                  )}
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
