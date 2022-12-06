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
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type ModalCreateInfoOrderProps = {
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalCreateInfoOrder: FC<ModalCreateInfoOrderProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: FieldValues) => console.log(data);

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
          <ModalHeader color="text.dark">Agregar peticion</ModalHeader>
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
                    type="number"
                    placeholder="12345678"
                  />
                </FormControl>
              </HStack>
              <Text w="full" fontSize="lg" color="text.dark">
                Informacion a solicitar
              </Text>
              <CheckboxGroup>
                <VStack w="full" divider={<Divider />}>
                  <HStack w="full" spacing="8">
                    <HStack w="full" justifyContent="space-between">
                      <Text>Curriculum</Text>
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
            <Button type="submit">Crear</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
