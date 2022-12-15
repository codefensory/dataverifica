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
  informationOrdersOptions,
  informationsOrderKeys,
  personTypeOptions,
} from "../utils";
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
    console.log(data);
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
          <ModalHeader color="text.dark">Agregar Lote</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" spacing="6">
              <HStack w="full" spacing="6">
                <FormControl>
                  <FormLabel>Archivo Excel</FormLabel>
                  <Controller
                    name="excel"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <ChooseFileInput
                        onChange={(files: any) => {
                          field.onChange(files[0]);
                        }}
                      />
                    )}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Observaciones generales</FormLabel>
                <Textarea {...register("observations")} />
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
