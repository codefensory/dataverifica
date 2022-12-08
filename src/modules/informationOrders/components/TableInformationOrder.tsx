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
  Button,
} from "@chakra-ui/react";
import { InformationOrder } from "@prisma/client";

type TableInformationOrderProps = {
  informationOrders?: InformationOrder[];
  isAdmin?: boolean;
};

const UserHeader = () => (
  <>
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
  </>
);

const UserBody = (props: { informationOrders: InformationOrder[] }) => {
  const { informationOrders } = props;

  return (
    <>
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
            <Td
              fontWeight="bold"
              color={info.isComplete ? "green" : "yellow.600"}
            >
              {info.isComplete ? "Completado" : "Pendiente"}
            </Td>
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
    </>
  );
};

const AdminHeader = () => (
  <>
    <Th pl="0" color="gray.500">
      User ID
    </Th>
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
    <Th pr="0" color="gray.500">
      Actualizar
    </Th>
  </>
);

const AdminBody = (props: { informationOrders: InformationOrder[] }) => {
  const { informationOrders } = props;

  return (
    <>
      {informationOrders.map((info, index) => {
        return (
          <Tr
            key={`informationOrderTableItem-${index}`}
            fontSize="sm"
            color="text.dark"
          >
            <Td pl="0">{info.id}</Td>
            <Td pl="0" fontWeight="bold">
              {info.personType}
            </Td>
            <Td fontWeight="bold">{info.documentType}</Td>
            <Td>{info.documentNumber}</Td>
            <Td>{info.name}</Td>
            <Td
              fontWeight="bold"
              color={info.isComplete ? "green" : "yellow.600"}
            >
              {info.isComplete ? "Completado" : "Pendiente"}
            </Td>
            <Td
              pr="0"
              color={info.isComplete ? undefined : "gray.200"}
              cursor={info.isComplete ? "pointer" : "default"}
              textDecor="underline"
            >
              Descargar
            </Td>
            <Td>
              <Button
                size="sm"
                colorScheme={info.isComplete ? "gray" : "primary"}
                left="50%"
                transform="translateX(-50%)"
              >
                {info.isComplete ? "Editar" : "Completar"}
              </Button>
            </Td>
          </Tr>
        );
      })}
    </>
  );
};

export const TableInformationOrder: FC<
  TableInformationOrderProps
> = ({ informationOrders = [], isAdmin }) => {
  return (
    <TableContainer h="full" overflowY="auto" w="full">
      <Table variant="simple">
        {informationOrders.length === 0 && (
          <TableCaption>Aun no hay peticiones</TableCaption>
        )}
        <Thead position="sticky" top="0" bg="white" zIndex="1">
          <Tr>{isAdmin ? <AdminHeader /> : <UserHeader />}</Tr>
        </Thead>
        <Tbody>
          {isAdmin ? (
            <AdminBody informationOrders={informationOrders} />
          ) : (
            <UserBody informationOrders={informationOrders} />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
