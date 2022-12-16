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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createInformationOrders } from "../services";
import { informationsOrderKeys } from "../utils";
import { ChooseFileInput } from "./ChooseFileInput";

type ModalCreateBulkInfoOrderProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCreateBulkInfoOrder: FC<ModalCreateBulkInfoOrderProps> = (
  props
) => {
  const { register, handleSubmit, reset, control } = useForm({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data: FieldValues) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <ModalContent minW="40rem">
          <ModalHeader color="text.dark">Agregar Lote</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" spacing="6">
              <Text color="text.dark">
                En este modal puedes subir un archivo excel con las personas que
                quieres solicitar, puedes usar la plantilla de personas{" "}
                <span style={{ textDecoration: "underline", color: "blue" }}>
                  naturales
                </span>
                , o{" "}
                <span style={{ textDecoration: "underline", color: "blue" }}>
                  jurídicas
                </span>
              </Text>
              <FormControl>
                <FormLabel>Nombre de peticion</FormLabel>
                <Input {...register("name")} />
              </FormControl>
              <FormControl>
                <FormLabel>Archivo Excel</FormLabel>
                <Controller
                  name="bulkFile"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <ChooseFileInput
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={(files: any) => {
                        field.onChange(files[0]);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Observaciones generales</FormLabel>
                <Textarea {...register("description")} />
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
