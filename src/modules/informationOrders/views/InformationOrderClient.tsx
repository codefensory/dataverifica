import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  Tfoot,
} from "@chakra-ui/react";
import { InformationOrder } from "@prisma/client";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { informationOrderDefaultDataAtom } from "../atoms";

const HeaderInformation = () => {
  return (
    <VStack alignItems="flex-start">
      <Heading as="h2" size="md" color="text.dark">
        Peticiones
      </Heading>
      <Text color="gray.500">
        Lista de todas las peticiones que has solicitado
      </Text>
    </VStack>
  );
};

const TableInformationOrderClient = ({
  informationOrders = [],
}: {
  informationOrders?: InformationOrder[];
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
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
                <Td>{info.isComplete ? "Completado" : "Pendiente"}</Td>
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

export const InformationOrderClient: FC = () => {
  const informationOrders = useAtomValue(informationOrderDefaultDataAtom);

  return (
    <Box minW="60rem">
      <HStack justifyContent="space-between">
        <HeaderInformation />
        <Box>
          <Button>+ Agregar Nuevo</Button>
        </Box>
      </HStack>
      <Box mt="1rem">
        <TableInformationOrderClient informationOrders={informationOrders} />
      </Box>
    </Box>
  );
};
