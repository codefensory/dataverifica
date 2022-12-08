import { FC } from "react";
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  TableCaption,
} from "@chakra-ui/react";
import { InformationOrder } from "@prisma/client";

type TableInformationOrderClientProps = {
  informationOrders?: InformationOrder[];
};

export const TableInformationOrderClient: FC<
  TableInformationOrderClientProps
> = ({ informationOrders = [] }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        {informationOrders.length === 0 && (
          <TableCaption>Aun no hay peticiones</TableCaption>
        )}
        <Thead>
          <Tr>
            <Th pl="0" color="gray.500">
              T. Persona
            </Th>
            <Th color="gray.500">T. Documento</Th>
            <Th color="gray.500">Nro. Documento</Th>
            <Th color="gray.500">Nombre</Th>
            <Th color="gray.500">Estado</Th>
            <Th pr="0" color="gray.500">
              PDF
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {informationOrders.map((info, index) => {
            return (
              <Tr
                key={`informationOrderTableItem-${index}`}
                fontSize="sm"
                color="text.dark"
              >
                <Td pl="0" fontWeight="bold">
                  {info.personType}
                </Td>
                <Td fontWeight="bold">{info.documentType}</Td>
                <Td>{info.documentNumber}</Td>
                <Td>{info.name}</Td>
                <Td fontWeight="bold" color={info.isComplete ? "green" : "yellow.600"}>{info.isComplete ? "Completado" : "Pendiente"}</Td>
                <Td
                  pr="0"
                  color={info.isComplete ? undefined : "gray.200"}
                  cursor={info.isComplete ? "pointer" : "default"}
                  textDecor="underline"
                >
                  Descargar
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
