import { FC } from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalDeleteInfoOrderProps = {
  onClose: () => void;
  onDelete: () => void;
  isOpen?: boolean;
  isLoading?: boolean;
};

export const ModalDeleteUser: FC<ModalDeleteInfoOrderProps> = (props) => {
  return (
    <Modal onClose={props.onClose} isOpen={!!props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="40rem" maxH="calc(100vh - 2rem)" m="0">
        <ModalHeader color="text.dark">Eliminar Usuario</ModalHeader>
        <ModalCloseButton top="0.9rem" />
        <ModalBody maxH="100%" overflow="auto">
          <Heading as="h2" size="sm" color="text.dark">
            ¿Estás seguro de que deseas eliminar este usuario?
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button mr="1rem" colorScheme="gray" onClick={() => props.onClose()}>
            Cancelar
          </Button>
          <Button
            colorScheme="red"
            onClick={() => props.onDelete()}
            isLoading={props.isLoading}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
