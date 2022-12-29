import { FC } from "react";
import { UserResponseData } from "../domain";
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  TableCaption,
  Button,
} from "@chakra-ui/react";

type TableUserProps = {
  users?: UserResponseData[];
  isLoading?: boolean;
  onClickEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export const TableUser: FC<TableUserProps> = ({
  users = [],
  isLoading,
  onClickEdit,
  onDelete,
}) => {
  return (
    <TableContainer h="full" overflowY="auto" w="full">
      <Table variant="simple">
        <TableCaption hidden={isLoading || users.length > 0}>
          Aún no hay usuarios
        </TableCaption>
        <TableCaption hidden={!isLoading}>Cargando...</TableCaption>
        <Thead position="sticky" top="0" bg="white" zIndex="1">
          <Th pl="0" color="gray.500">
            Usuario
          </Th>
          <Th color="gray.500">Nombre</Th>
          <Th color="gray.500">RUC / DNI</Th>
          <Th color="gray.500">Teléfono</Th>
          <Th color="gray.500">Correo</Th>
          <Th color="gray.500">Actualizar</Th>
        </Thead>
        <Tbody>
          {users.map((info, index) => {
            return (
              <Tr key={`userItem-${index}`} fontSize="sm" color="text.dark">
                <Td pl="0" fontWeight="bold">
                  {info.username ?? "--"}
                </Td>
                <Td fontWeight="bold">{info.companyName}</Td>
                <Td>{info.ruc ?? "--"}</Td>
                <Td>{info.phone ?? "--"}</Td>
                <Td>{info.email ?? "--"}</Td>
                <Td w="0">
                  <Button
                    size="sm"
                    colorScheme="gray"
                    onClick={() => onClickEdit?.(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    ml="4"
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete?.(index)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
