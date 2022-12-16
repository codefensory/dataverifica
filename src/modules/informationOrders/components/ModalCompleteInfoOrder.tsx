import { FC, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { InformationOrderData } from "../domain";
import { ChooseFileInput } from "./ChooseFileInput";
import { completeInformationOrder, saveInformationOrder } from "../services";
import { useQueryClient } from "@tanstack/react-query";
import { informationsOrderKeys } from "../utils";
import { toast } from "react-toastify";

type ModalCompleteInfoOrderProps = {
  informationOrders?: InformationOrderData;
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCompleteInfoOrder: FC<ModalCompleteInfoOrderProps> = (
  props
) => {
  const queryClient = useQueryClient();

  const { informationOrders: infoOrders } = props;

  const { handleSubmit, reset, control, watch } = useForm({
    mode: "onBlur",
  });

  const pdfInput = watch("pdf");

  const [isCompleting, setIsCompleting] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsCompleting(true);

    data.id = infoOrders?.id;

    try {
      await completeInformationOrder(data);

      await queryClient.invalidateQueries(informationsOrderKeys.MAIN);

      props.onClose();

      toast.success("Peticion completada!!");

      reset();
    } catch (error) {
      toast.error("Hubo un error al crear la petición");

      throw error;
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSave = async (data: FieldValues) => {
    setIsSaving(true);

    data.id = infoOrders?.id;

    try {
      await saveInformationOrder(data);

      await queryClient.invalidateQueries(informationsOrderKeys.MAIN);

      props.onClose();

      toast.success("Peticion completada!!");

      reset();
    } catch (error) {
      toast.error("Hubo un error al crear la petición");

      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving || !isCompleting) {
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
        <ModalContent minW="40rem" maxH="calc(100vh - 2rem)" m="0">
          <ModalHeader
            color="text.dark"
            borderBottom="solid 1px"
            borderColor="gray.200"
          >
            Completar petición
          </ModalHeader>
          <ModalCloseButton top="0.9rem" />
          <ModalBody maxH="100%" overflow="auto">
            <VStack spacing="6" w="full">
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Heading as="h2" size="md" color="text.dark">
                  {infoOrders?.name}
                </Heading>
              </FormControl>
              <HStack spacing="6" w="full">
                <FormControl>
                  <FormLabel>Tipo de persona</FormLabel>
                  <Text>{infoOrders?.personType}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Documento</FormLabel>
                  <Text>
                    {infoOrders?.documentType} {infoOrders?.documentNumber}
                  </Text>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Informacion requerida</FormLabel>
                <Wrap>
                  {infoOrders?.requestInformation
                    ?.split(";")
                    .map((value, index) => (
                      <WrapItem key={index}>
                        <Tag>{value}</Tag>
                      </WrapItem>
                    ))}
                </Wrap>
              </FormControl>
              <FormControl>
                <FormLabel>Archivo PDF</FormLabel>
                <Controller
                  name="pdf"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <ChooseFileInput
                      accept=".pdf"
                      onChange={(files: any) => {
                        field.onChange(files[0]);
                      }}
                      name={infoOrders?.PDF?.name}
                      path={infoOrders?.PDF?.path}
                    />
                  )}
                />
              </FormControl>
              <Divider />
              <Heading as="h2" size="sm" color="text.dark" w="full">
                Cliente solicitante
              </Heading>
              <HStack w="full">
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Text>{infoOrders?.User?.companyName}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>RUC</FormLabel>
                  <Text>{infoOrders?.User?.ruc}</Text>
                </FormControl>
              </HStack>
              <HStack w="full">
                <FormControl>
                  <FormLabel>Correo</FormLabel>
                  <Text>{infoOrders?.User?.email ?? "--"}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Telefono</FormLabel>
                  <Text>{infoOrders?.User?.phone}</Text>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderTop="solid 1px" borderColor="gray.200">
            <Button
              mr="1rem"
              colorScheme="gray"
              onClick={handleClose}
              disabled={isSaving || isCompleting}
            >
              Cancelar
            </Button>
            <Button
              mr="1rem"
              colorScheme="gray"
              isLoading={isSaving}
              disabled={isCompleting || (!!!pdfInput && !!!infoOrders?.pdfId)}
              onClick={handleSubmit(handleSave)}
            >
              Guardar
            </Button>
            <Button
              isLoading={isCompleting}
              disabled={isSaving || (!!!pdfInput && !!!infoOrders?.pdfId)}
              type="submit"
            >
              Completar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
