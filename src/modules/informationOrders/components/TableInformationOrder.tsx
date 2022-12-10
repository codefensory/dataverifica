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
import { InformationOrderData } from "../domain";
import { PDF } from "@prisma/client";

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

const UserBody = (props: {
  informationOrders: InformationOrderData[];
  onOpenPdf?: (pdf: PDF | undefined) => void;
}) => {
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
              textDecor="underline"
              color={!!info.PDF ? undefined : "gray.200"}
              cursor={!!info.PDF ? "pointer" : "default"}
              onClick={() => props.onOpenPdf?.(info.PDF)}
            >
              Ver PDF
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

const AdminBody = (props: {
  informationOrders: InformationOrderData[];
  onClick?: (index: number) => void;
  onOpenPdf?: (pdf: PDF | undefined) => void;
}) => {
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
              color={!!info.PDF ? undefined : "gray.200"}
              cursor={!!info.PDF ? "pointer" : "default"}
              textDecor="underline"
              onClick={() => props.onOpenPdf?.(info.PDF)}
            >
              Ver PDF
            </Td>
            <Td>
              <Button
                size="sm"
                colorScheme={info.isComplete ? "gray" : "primary"}
                left="50%"
                transform="translateX(-50%)"
                onClick={() => props.onClick?.(index)}
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

type TableInformationOrderProps = {
  informationOrders?: InformationOrderData[];
  isAdmin?: boolean;
  isLoading?: boolean;
  onClickEdit?: (index: number) => void;
};

export const TableInformationOrder: FC<TableInformationOrderProps> = ({
  informationOrders = [],
  isAdmin,
  isLoading,
  onClickEdit,
}) => {
  const handlerOpenPDF = (pdf?: PDF) => {
    if (!pdf) {
      return;
    }

    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pdf.path?.replace(
        "public/",
        ""
      )}`
    );
  };

  return (
    <TableContainer h="full" overflowY="auto" w="full">
      <Table variant="simple">
        <TableCaption hidden={isLoading || informationOrders.length > 0}>
          Aun no hay peticiones
        </TableCaption>
        <TableCaption hidden={!isLoading}>Cargando...</TableCaption>
        <Thead position="sticky" top="0" bg="white" zIndex="1">
          <Tr>{isAdmin ? <AdminHeader /> : <UserHeader />}</Tr>
        </Thead>
        <Tbody>
          {isAdmin ? (
            <AdminBody
              informationOrders={informationOrders}
              onClick={onClickEdit}
              onOpenPdf={handlerOpenPDF}
            />
          ) : (
            <UserBody
              informationOrders={informationOrders}
              onOpenPdf={handlerOpenPDF}
            />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
